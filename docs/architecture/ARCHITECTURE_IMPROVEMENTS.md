# Proposta de Evolução de Arquitetura: Frida API

Este documento descreve uma proposta de evolução arquitetural para o backend do projeto Frida. O objetivo é aumentar a manutenibilidade, testabilidade e escalabilidade do sistema à medida que ele cresce.

## 1. Diagnóstico Atual

O projeto segue uma **Arquitetura em Camadas (Layered Architecture)** clássica:

- `src/controllers`: Camada de Interface (HTTP).
- `src/services`: Camada de Regra de Negócio.
- `src/repositories`: Camada de Acesso a Dados (com acoplamento forte ao Prisma).

### Pontos de Atenção:

- **Acoplamento Tecnológico**: Os _Services_ e _Controllers_ conhecem tipos do Prisma (`RiskAssessment` gerado pelo `@prisma/client`). Se trocarmos o ORM ou o banco, teremos que refatorar toda a aplicação.
- **Organização por Tipo**: Arquivos agrupados por "o que são" (Controller, Service) e não "o que fazem" (Funcionalidade). Conforme o projeto cresce (e.g. 50 services), a navegação fica difícil.
- **Regra de Negócio Mista**: A lógica de cálculo de risco (`calculateRiskLevel`) está encapsulada no Service (o que é bom!), mas o Service mistura isso com chamadas diretas de banco de dados.

---

## 2. Recomendação: Monolito Modular

A primeira e mais impactante mudança é reorganizar o projeto em **Módulos de Domínio**. Em vez de separar por camadas técnicas, separamos por funcionalidades.

### Estrutura Proposta (`src/modules`)

```
src/
  modules/
    risk/               <-- Módulo de Risco
      domain/           <-- Regras de Negócio Puras (Entidades, Lógica)
        entities/       <-- Classes/Tipos que não dependem do Prisma
        services/       <-- Lógica (Use Cases)
      infra/            <-- Detalhes técnicos (Banco, HTTP)
        http/
          controllers/
          routes/
        prisma/
          repositories/ <-- Implementação concreta do repositório
    auth/               <-- Módulo de Autenticação
    user/               <-- Módulo de Usuário
  shared/               <-- Código compartilhado (erros, utils, container DI)
```

**O que melhora?**

- **Coesão Global**: Tudo sobre "Risco" está em um lugar só.
- **Limites Claros**: Fica mais fácil definir o que é público e o que é privado de cada módulo.
- **Microservices Ready**: Se um dia o módulo de Risco precisar virar um microsserviço, é só "recortar" a pasta `risk`.

---

## 3. Adoção de Práticas de Arquitetura Limpa (Clean/Hexagonal)

Para resolver o acoplamento com o banco de dados (Prisma), aplicamos o **Princípio da Inversão de Dependência**.

### A Regra de Ouro

**O Domínio (Services/Entities) NÃO deve depender da Infraestrutura (Prisma/Express). A Infraestrutura é que deve depender do Domínio.**

### Passo a Passo da Refatoração:

#### 1. Definir Interfaces de Repositório no Domínio

O Service não deve saber que existe uma classe `RiskAssessmentRepository` concreta. Ele deve conhecer apenas um contrato.

```typescript
// src/modules/risk/domain/repositories/IRiskAssessmentRepository.ts

import { RiskAssessment } from '../entities/RiskAssessment'; // Entidade Pura

export interface IRiskAssessmentRepository {
  create(data: CreateAssessmentDTO): Promise<RiskAssessment>;
  findByUserId(userId: string): Promise<RiskAssessment | null>;
}
```

#### 2. Implementar na Infraestrutura

```typescript
// src/modules/risk/infra/prisma/repositories/PrismaRiskAssessmentRepository.ts

import { IRiskAssessmentRepository } from '../../domain/repositories/IRiskAssessmentRepository';

export class PrismaRiskAssessmentRepository implements IRiskAssessmentRepository {
  async create(data: any) {
    const prismaData = await prisma.riskAssessment.create(...);
    return RiskMapper.toDomain(prismaData); // Converte Prisma -> Domínio
  }
}
```

#### 3. Injetar Dependência

No `RiskAssessmentService`, injetamos a interface (usando token do tsyringe):

```typescript
@injectable()
export class RiskAssessmentService {
  constructor(@inject('RiskRepository') private riskRepo: IRiskAssessmentRepository) {}
}
```

---

## 4. Resumo: O que muda na prática?

| Característica   | Arquitetura Atual                  | Arquitetura Proposta (Modular/Clean) |
| :--------------- | :--------------------------------- | :----------------------------------- |
| **Organização**  | Por Camada (`/controllers`)        | Por Funcionalidade (`/modules/risk`) |
| **Dependência**  | Service -> Repository Concreto     | Service -> Interface de Repository   |
| **Modelos**      | Tipos do Prisma (`@prisma/client`) | Entidades de Domínio Puras           |
| **Testes**       | Difícil mockar o Prisma            | Fácil mockar a Interface             |
| **Complexidade** | Baixa                              | Média (exige Mappers e Interfaces)   |

## Próximos Passos Sugeridos

1.  **Criar a pasta `src/modules`**.
2.  **Migrar o módulo `Risk`** (que possui a lógica de cálculo mais complexa) como piloto.
3.  **Criar Entidades de Domínio** para `RiskAssessment` para desacoplar do Prisma.
4.  **Implementar Interface de Repositório** para o `RiskAssessmentRepository`.
