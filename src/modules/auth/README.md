# Auth Module

Este módulo é responsável por toda a lógica de autenticação e gestão de tokens da API Frida.

## 📁 Estrutura

O módulo segue uma arquitetura modular simplificada:

- **controllers/**: Controladores HTTP (Express). Recebem requisições e chamam Services.
- **services/**: Regras de negócio (Register, Login, Refresh Token).
- **repositories/**: Acesso a dados (Prisma). Gerencia `RefreshToken`. (`User` ainda é acessado via `UserRepository` global).
- **CHANGELOG.md**: Histórico de mudanças.

## 🛠️ Funcionalidades

### 1. Registro (`POST /auth/register`)

Cria uma nova usuária no sistema. Valida CPF único e Email único.

- **Input**: Nome, CPF, Email, Senha, Telefone.
- **Output**: Usuário criado (sem senha).

### 2. Login (`POST /auth/login`)

Autentica uma usuária e retorna tokens.

- **Input**: Email, Senha.
- **Output**:
  - `accessToken`: JWT de curta duração (15m).
  - `refreshToken`: Token opaco de longa duração (1d) salvo no banco.

### 3. Refresh Token (`POST /auth/refresh`)

Renova o `accessToken` usando um `refreshToken` válido.

- **Input**: `refreshToken`.
- **Output**: Novo `accessToken`.

### 4. Logout (`POST /auth/logout`)

Revoga o `refreshToken`, impedindo novas renovações de acesso.

- **Input**: `refreshToken`.
- **Output**: 204 No Content.

### 5. Recuperação de Senha

#### A. Esqueci Minha Senha (`POST /auth/password/forgot`)

- **Input**: Email.
- **Output**: 204 No Content. (Envia email com token).

#### B. Redefinir Senha (`POST /auth/password/reset`)

- **Input**: Token, Password.
- **Output**: 204 No Content.

## 🛡️ Segurança

### Rate Limiting

- Proteção contra Brute Force em `/login` e `/register`.
- Limite: 10 tentativas a cada 15 minutos por IP.

### Bloqueio de Conta

- Após 5 tentativas falhas de login, a conta é bloqueada por 15 minutos.

### Política de Senha

- Mínimo 8 caracteres.
- Obrigatório: Maiúscula, minúscula, número e caractere especial.

## 📦 Dependências e Providers

- **UserRepository**: Injetado globalmente (`src/repositories`).
- **UserTokensRepository**: Gerencia tokens de recuperação.
- **MailProvider**: Envio de emails (Ethereal/Nodemailer em Dev).
- **Bcrypt**: Hash de senhas.
- **JWT**: Geração de tokens.
