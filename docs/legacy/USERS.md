# Documentação da API de Usuários

## Modelo de Dados

| Campo       | Tipo              | Descrição                                                                         |
| :---------- | :---------------- | :-------------------------------------------------------------------------------- |
| `id`        | String (UUID)     | Identificador único do usuário.                                                   |
| `name`      | String            | Nome completo do usuário.                                                         |
| `email`     | String            | Email do usuário (único).                                                         |
| `cpf`       | String            | CPF do usuário (único).                                                           |
| `phone`     | String (Opcional) | Telefone do usuário.                                                              |
| `birthDate` | String (Opcional) | Data de nascimento.                                                               |
| `role`      | Enum              | Papel do usuário (`USER`, `SUPPORT`, `POLICE`, `FIREFIGHTER`, `DELEGATE`, `GOV`). |
| `createdAt` | DateTime          | Data de criação do registro.                                                      |
| `updatedAt` | DateTime          | Data da última atualização.                                                       |

---

## Endpoints

### Autenticação

#### 1. Login

Autentica um usuário e retorna um token JWT.

- **URL:** `/api/auth/login`
- **Método:** `POST`
- **Autenticação:** Não necessária (Público)
- **Corpo da Requisição:**

```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Exemplo de Resposta:**

```json
{
  "user": {
    "id": "...",
    "name": "Maria Silva",
    "email": "maria@example.com",
    "role": "USER",
    ...
  },
  "token": "eyJhbGciOiJIUzI1Ni...",
  "refreshToken": "..."
}
```

#### 2. Registrar Usuário

Cria uma nova conta de usuário (Público).

- **URL:** `/api/auth/register`
- **Método:** `POST`
- **Autenticação:** Não necessária (Público)
- **Corpo da Requisição:**

```json
{
  "name": "Novo Usuário",
  "email": "novo@example.com",
  "password": "password123",
  "cpf": "123.123.123-12",
  "phone": "(11) 99999-9999"
}
```

#### 3. Refresh Token

Renova o token de acesso usando um refresh token.

- **URL:** `/api/auth/refresh`
- **Método:** `POST`
- **Autenticação:** Não necessária (Público)
- **Corpo da Requisição:**

```json
{
  "token": "..."
}
```

### Gestão de Usuários

#### 4. Listar Usuários

Retorna uma lista paginada de usuários.

- **URL:** `/api/users`
- **Método:** `GET`
- **Autenticação:** Bearer Token (Necessária)
- **Parâmetros de Query:**
  - `page` (opcional): Número da página (padrão: 1).
  - `limit` (opcional): Itens por página (padrão: 10).
  - `role` (opcional): Filtrar por papel (`USER`, `SUPPORT`, `POLICE`, `FIREFIGHTER`, `DELEGATE`, `GOV`).
  - `type` (opcional): Filtrar por tipo (`COMMON` = Vítimas, `SYSTEM` = Agentes).

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "...",
      "name": "Maria Silva",
      "email": "maria@example.com",
      "role": "USER",
      ...
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### 5. Detalhar Usuário

Retorna os detalhes de um usuário específico.

- **URL:** `/api/users/:id`
- **Método:** `GET`
- **Autenticação:** Bearer Token (Necessária)

**Exemplo de Resposta:**

```json
{
  "id": "...",
  "name": "Maria Silva",
  ...
}
```

### 6. Criar Usuário

Cria um novo usuário (Admin).

- **URL:** `/api/users`
- **Método:** `POST`
- **Autenticação:** Bearer Token (Necessária)
- **Corpo da Requisição:**

```json
{
  "name": "Novo Usuário",
  "email": "novo@example.com",
  "password": "password123",
  "cpf": "123.123.123-12",
  "role": "USER"
}
```

### 7. Atualizar Usuário

Atualiza os dados de um usuário existente.

- **URL:** `/api/users/:id`
- **Método:** `PUT`
- **Autenticação:** Bearer Token (Necessária)
- **Corpo da Requisição:** (Campos opcionais)

```json
{
  "name": "Nome Atualizado",
  "role": "SUPPORT"
}
```

### 8. Excluir Usuário

Remove permanentemente um usuário do banco de dados.

- **URL:** `/api/users/:id`
- **Método:** `DELETE`
- **Autenticação:** Bearer Token (Necessária)
