# Documentação da API de Notícias

## Modelo de Dados

| Campo       | Tipo              | Descrição                                                     |
| :---------- | :---------------- | :------------------------------------------------------------ |
| `id`        | String (UUID)     | Identificador único da notícia.                               |
| `title`     | String            | Título da notícia.                                            |
| `date`      | DateTime          | Data da notícia.                                              |
| `category`  | String            | Categoria ("Legislação", "Segurança", "Comunidade", "Todos"). |
| `content`   | String            | Conteúdo completo da notícia.                                 |
| `imageUrl`  | String (Opcional) | URL da imagem da notícia.                                     |
| `active`    | Boolean           | Indica se a notícia está ativa (padrão: true).                |
| `createdAt` | DateTime          | Data de criação do registro.                                  |
| `updatedAt` | DateTime          | Data da última atualização.                                   |

---

## Endpoints

### 1. Listar Notícias

Retorna uma lista paginada de notícias ativas.

- **URL:** `/api/news`
- **Método:** `GET`
- **Autenticação:** Não necessária (Público)
- **Parâmetros de Query:**
    - `page` (opcional): Número da página (padrão: 1).
    - `limit` (opcional): Itens por página (padrão: 10).
    - `category` (opcional): Filtrar por categoria.

**Exemplo de Resposta:**

```json
{
  "data": [
    {
      "id": "...",
      "title": "Nova Lei...",
      "category": "Legislação",
      ...
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 20,
    "totalPages": 2
  }
}
```

### 2. Detalhar Notícia

Retorna os detalhes de uma notícia específica.

- **URL:** `/api/news/:id`
- **Método:** `GET`
- **Autenticação:** Não necessária (Público)

**Exemplo de Resposta:**

```json
{
  "id": "...",
  "title": "Nova Lei...",
  ...
}
```

### 3. Criar Notícia

Cria uma nova notícia.

- **URL:** `/api/news`
- **Método:** `POST`
- **Autenticação:** Bearer Token (Necessária)
- **Corpo da Requisição:**

```json
{
    "title": "Título da Notícia",
    "date": "2023-12-01T00:00:00.000Z",
    "category": "Comunidade",
    "content": "Conteúdo da notícia...",
    "imageUrl": "http://..."
}
```

### 4. Atualizar Notícia

Atualiza os dados de uma notícia existente.

- **URL:** `/api/news/:id`
- **Método:** `PUT`
- **Autenticação:** Bearer Token (Necessária)
- **Corpo da Requisição:** (Campos opcionais)

```json
{
    "title": "Título Atualizado"
}
```

### 5. Desabilitar Notícia

Desabilita uma notícia (soft delete), removendo-a da listagem pública.

- **URL:** `/api/news/:id/disable`
- **Método:** `PATCH`
- **Autenticação:** Bearer Token (Necessária)

### 6. Excluir Notícia

Remove permanentemente uma notícia do banco de dados.

- **URL:** `/api/news/:id`
- **Método:** `DELETE`
- **Autenticação:** Bearer Token (Necessária)
