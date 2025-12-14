# Arquitetura do Frida Backend

O backend do Frida segue uma **Arquitetura Modular Monolítica**. O sistema é dividido em módulos baseados em funcionalidades/domínios, promovendo alta coesão e baixo acoplamento.

## Estrutura de Diretórios (`src/modules`)

Cada funcionalidade principal possui sua própria pasta em `src/modules`. A estrutura interna padrão de um módulo é:

```
src/modules/
  └── [nome-do-modulo]/
      ├── controllers/      # Controladores HTTP (Express)
      ├── useCases/         # Regras de Negócio (Casos de Uso)
      ├── repositories/     # Acesso a Dados (Interfaces e Implementações)
      ├── schemas/          # Validação (Zod)
      ├── dtos/             # Interfaces de Transferência de Dados
      ├── [MODULO]_IMPROVEMENTS.md  # Backlog técnico do módulo
      └── CHANGELOG.md              # Histórico de mudanças
```

### Exemplo: Módulo de Localização (`src/modules/location`)

- **Repositories**: Contém `ILocationRepository` (contrato) e `LocationRepository` (implementação com Prisma).
- **UseCases**: Contém `UpdateLocationUseCase`, `GetLocationUseCase`. Cada arquivo exporta uma única classe responsável por uma ação.
- **Controllers**: Contém `LocationController`, que recebe `Request/Response`, valida dados e chama os UseCases.

## Injeção de Dependência

Utilizamos a biblioteca `tsyringe` para Injeção de Dependência.

- As implementações dos repositórios são registradas no container global (`src/shared/container/index.ts`).
- Os UseCases recebem os repositórios injetados via construtor.
- Os Controllers resolvem os UseCases via `container.resolve()`.

## Shared (`src/shared`)

Código compartilhado entre módulos reside em `src/shared`:

- **container**: Configuração da DI.
- **infra**: Configuração de HTTP (Express, Rotas globais) e Banco de Dados.
- **errors**: Classes de erro padronizadas (`AppError`).

## Fluxo de uma Requisição

1. **Rota**: `src/routes/location.routes.ts` recebe a requisição.
2. **Controller**: `LocationController` valida o input (Zod) e resolve o UseCase.
3. **UseCase**: `UpdateLocationUseCase` executa a regra de negócio e chama o Repositório.
4. **Repository**: `LocationRepository` interage com o banco (Prisma).

## Padrões Adotados

- **Repository Pattern**: Desacopla o domínio da implementação do banco.
- **Dependency Injection**: Facilita testes e troca de implementações.
- **DTOs**: Definem o formato dos dados trafegados entre camadas.
