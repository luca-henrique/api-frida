# API Routes

## Base URL

`/api`

## Authentication

**Base Path:** `/auth`

| Method | Path        | Description                   | Auth Required |
| :----- | :---------- | :---------------------------- | :------------ |
| `POST` | `/register` | Register a new user           | No            |
| `POST` | `/login`    | Login and receive a JWT token | No            |

## Risk Assessment

**Base Path:** `/risk`

| Method | Path | Description                  | Auth Required |
| :----- | :--- | :--------------------------- | :------------ |
| `POST` | `/`  | Create a new risk assessment | Yes           |
| `GET`  | `/`  | List risk assessments        | Yes           |

## Chat

**Base Path:** `/chat`

| Method | Path   | Description       | Auth Required |
| :----- | :----- | :---------------- | :------------ |
| `GET`  | `/`    | List user chats   | Yes           |
| `POST` | `/`    | Create a new chat | Yes           |
| `GET`  | `/:id` | Get chat details  | Yes           |
