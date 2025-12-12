# Guia de Boas Práticas - API Frida

Este documento define o padrão "ideal" para o design e desenvolvimento das nossas APIs, baseado nas melhores práticas de mercado.

## 1. Fundamentos (Da Referência)

Estes são os pilares básicos que devemos seguir em todos os novos endpoints:

### 🧩 Nomenclatura Clara e Plural

Use sempre substantivos no plural para representar recursos. A URL deve descrever "o que" é o recurso, não "a ação".

- ✅ `GET /users` (Lista usuários)
- ✅ `POST /users` (Cria usuário)
- ❌ `GET /getUsers` (Verbo na URL é redundante)
- ❌ `POST /createUser` (Verbo na URL é redundante)

### 📌 Versionamento

Sempre versione a API para permitir evoluções sem quebrar clientes antigos.

- Padrão: `/api/v1/recurso`
- Exemplo: `GET /api/v1/posts`

### 🔍 Filtros

Permita refinar os resultados via query params.

- Exemplo: `GET /api/v1/posts?authorId=123&status=published`

### 🔢 Paginação

Obrigatória para qualquer lista que possa crescer indefinidamente. Protege o servidor de sobrecarga.

- Padrão: `page` e `limit` (ou `pageSize`).
- Exemplo: `GET /api/v1/posts?page=2&limit=10`
- _Resposta deve incluir metadados_: total de itens, total de páginas.

### 🔃 Ordenação

Permita que o cliente decida a ordem dos dados.

- Exemplo: `GET /api/v1/posts?sort=createdAt:desc` (ou `sortBy=date&order=desc`)

### 🛡️ Idempotência

Métodos de leitura (`GET`) nunca devem alterar o estado do servidor. Métodos como `PUT` e `DELETE` devem ser idempotentes (rodar a mesma requisição N vezes tem o mesmo efeito final).

---

## 2. Padrões Adicionais (Recomendados para o Frida)

Além do básico, para elevarmos a qualidade da API:

### 🚦 HTTP Status Codes Corretos

Não retorne sempre 200. Use o código que semanticamente descreve o resultado.

- `200 OK`: Sucesso genérico.
- `201 Created`: Recurso criado com sucesso (retornar header `Location` é ideal).
- `204 No Content`: Sucesso, mas sem corpo de resposta (comum em `DELETE` ou `PUT`).
- `400 Bad Request`: Erro de validação do cliente (schema inválido).
- `401 Unauthorized`: Falta autenticação (quem é você?).
- `403 Forbidden`: Falta permissão (você não pode fazer isso).
- `404 Not Found`: Recurso não existe.
- `429 Too Many Requests`: Rate limit excedido.
- `500 Internal Server Error`: Erro nosso (não deve vazar stack trace em prod).

### 📦 Padronização de Erros (RFC 7807)

Evite retornar apenas uma string ou formatos variados. Adote um padrão:

```json
{
  "type": "about:blank",
  "title": "Validation Error",
  "status": 400,
  "detail": "Password is too weak.",
  "instance": "/api/v1/register"
}
```

### 🔒 Segurança (Headers e Validação)

- **SSL/TLS (HTTPS)** obrigatório.
- **HSTS** Header para forçar HTTPS.
- **Rate Limiting** para evitar abusos (DDOS/Brute Force).
- Nunca confie no input: use schemas (Zod/Joi) para validar tudo antes de processar.

### ⚡ Cache (HTTP Caching)

Use headers `Cache-Control` e `ETag` para economizar banda e processamento em dados que mudam pouco (ex: lista de estados/cidades, configurações).

### 📄 Documentação Viva

Mantenha o Swagger/OpenAPI (`/api-docs`) sempre sincronizado com o código. Uma API sem documentação é uma caixa preta inútil.
