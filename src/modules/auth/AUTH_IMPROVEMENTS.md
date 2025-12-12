# Melhorias Recomendadas: Módulo de Autenticação (Auth)

Com base na análise do código atual em `src/modules/auth`, aqui estão as melhorias recomendadas para aumentar a segurança, robustez e qualidade do módulo.

## 1. Segurança (Prioridade Alta)

### A. Validação de Senha Forte (✅ Done)

- **Atual**: Apenas `min(6)` caracteres.
- **Melhoria**: Exigir letras maiúsculas, minúsculas, números e caracteres especiais.
- **Implementação**: Atualizar `src/schemas/auth.schema.ts` com regex.

### B. Rate Limiting (Proteção contra Brute Force) (✅ Done)

- **Atual**: Inexistente. Um atacante pode tentar senhas infinitamente.
- **Melhoria**: Adicionar middleware de rate limit nas rotas de login e registro.
- **Ferramenta**: `express-rate-limit` ou similar.

### C. Logout (Token Revocation) (✅ Done)

- **Atual**: O cliente apenas deleta o token.
- **Melhoria**: Criar endpoint `/auth/logout` que deleta o `refreshToken` do banco de dados, impedindo renovações futuras.

### D. Bloqueio de Conta (Account Lockout) (✅ Done)

- **Atual**: Inexistente.
- **Melhoria**: Bloquear a conta temporariamente após X tentativas falhas de login.

## 2. Funcionalidades (Prioridade Média)

### A. Recuperação de Senha (✅ Done)

- **Atual**: Não existe fluxo para "Esqueci minha senha".
- **Melhoria**: Implementar fluxo de envio de email com token para reset de senha (requer serviço de email).

### B. Confirmação de Email

- **Atual**: O usuário entra direto após cadastro.
- **Melhoria**: Enviar email de confirmação antes de ativar a conta para evitar usuários fake.

### C. Autenticação de Dois Fatores (2FA)

- **Atual**: Apenas Email/Senha.
- **Melhoria**: Adicionar 2FA via App (TOTP) ou SMS para usuários críticos (Admin/Delegado).

## 3. Qualidade de Código e Testes

### A. Testes Unitários e de Integração

- **Atual**: Inexistentes.
- **Melhoria**: Criar testes com **Jest**.
  - Unitários: Testar `AuthService` mockando repositórios.
  - Integração: Testar rotas `/auth/*` com banco de dados de teste (in-memory ou docker).

### B. Tratamento de Erros

- **Atual**: Mensagens genéricas "Invalid credentials".
- **Melhoria**: Padronizar respostas de erro (RFC 7807) e logs estruturados para auditoria (quem tentou logar?).

## 4. Auditoria de Dependências

- Verificar se `jsonwebtoken` e `bcryptjs` estão nas versões mais recentes e seguras.
