# Variáveis de Ambiente

Este documento descreve todas as variáveis de ambiente utilizadas na aplicação backend Frida.
Configure essas variáveis no arquivo `.env` na raiz do projeto. Você pode usar o `.env.example` como base.

## 🔧 Configuração Geral

| Variável | Descrição                                     | Padrão | Obrigatório |
| :------- | :-------------------------------------------- | :----- | :---------: |
| `PORT`   | Porta onde o servidor Express será executado. | `3000` |     Não     |

## 🛢️ Banco de Dados

| Variável       | Descrição                                                   | Exemplo                                                  | Obrigatório |
| :------------- | :---------------------------------------------------------- | :------------------------------------------------------- | :---------: |
| `DATABASE_URL` | String de conexão com o banco de dados PostgreSQL (Prisma). | `postgresql://user:pass@localhost:5432/db?schema=public` |   **Sim**   |
| `REDIS_URL`    | String de conexão com o Redis (para filas/cache).           | `redis://localhost:6379`                                 |     Não     |

## 🔐 Autenticação e Segurança (Auth)

### Tokens JWT

| Variável                        | Descrição                                                                 | Padrão            | Obrigatório |
| :------------------------------ | :------------------------------------------------------------------------ | :---------------- | :---------: |
| `JWT_SECRET`                    | Chave secreta para assinar os tokens JWT. **Deve ser forte em produção.** | `frida_secret...` |   **Sim**   |
| `JWT_EXPIRES_IN`                | Tempo de expiração do Access Token. Formato `vercel/ms` (ex: 15m, 1h).    | `15m`             |     Não     |
| `REFRESH_TOKEN_EXPIRES_IN_DAYS` | Dias para expiração do Refresh Token.                                     | `1`               |     Não     |

### Recuperação de Senha

| Variável                                 | Descrição                                                             | Padrão | Obrigatório |
| :--------------------------------------- | :-------------------------------------------------------------------- | :----- | :---------: |
| `FORGOT_PASSWORD_TOKEN_EXPIRES_IN_HOURS` | Horas de validade do token de recuperação de senha enviado por email. | `3`    |     Não     |

### Bloqueio de Conta (Lockout)

| Variável                   | Descrição                                                               | Padrão | Obrigatório |
| :------------------------- | :---------------------------------------------------------------------- | :----- | :---------: |
| `MAX_LOGIN_ATTEMPTS`       | Número máximo de tentativas falhas de login antes do bloqueio da conta. | `5`    |     Não     |
| `LOCKOUT_DURATION_MINUTES` | Tempo em minutos que a conta permanece bloqueada.                       | `15`   |     Não     |

## 🛡️ Rate Limiting

| Variável                 | Descrição                                                                         | Padrão   | Obrigatório |
| :----------------------- | :-------------------------------------------------------------------------------- | :------- | :---------: |
| `MAX_REQUEST_PER_WINDOW` | Máximo de requisições por IP dentro da janela de tempo.                           | `10`     |     Não     |
| `RATE_LIMIT_WINDOW_MS`   | Tamanho da janela de tempo em milissegundos para o Rate Limit. (900000ms = 15min) | `900000` |     Não     |

## 📧 Serviço de Email

| Variável                                                               | Descrição | Exemplo | Obrigatório |
| :--------------------------------------------------------------------- | :-------- | :------ | :---------: |
| _Configurações futuras para provedores reais (AWS SES, SendGrid, etc)_ |           |         |             |
