# API Routes

Base URL: `/api`

## 🔐 Auth (`/auth`)

| Method | Path        | Auth | Description                         |
| :----- | :---------- | :--- | :---------------------------------- |
| `POST` | `/register` | ❌   | Register a new user                 |
| `POST` | `/login`    | ❌   | Login (Returns JWT + Refresh Token) |
| `POST` | `/refresh`  | ❌   | Refresh access token                |

## 👤 User (`/user`)

| Method   | Path   | Auth | Description                                 |
| :------- | :----- | :--- | :------------------------------------------ |
| `GET`    | `/`    | ✅   | List users (Pagination: `?page=1&limit=10`) |
| `GET`    | `/:id` | ✅   | Get user details                            |
| `POST`   | `/`    | ✅   | Create new user (Admin)                     |
| `PUT`    | `/:id` | ✅   | Update user                                 |
| `DELETE` | `/:id` | ✅   | Delete user                                 |

## ⚠️ Risk Assessment (`/risk`)

| Method   | Path             | Auth | Description                                                 |
| :------- | :--------------- | :--- | :---------------------------------------------------------- |
| `GET`    | `/`              | ⚠️   | List history (Public if `?userId` provided, else Auth user) |
| `GET`    | `/questions/all` | ❌   | List all questions (Public)                                 |
| `GET`    | `/questions`     | ✅   | List active questions for App                               |
| `GET`    | `/latest`        | ✅   | Get latest assessment result                                |
| `POST`   | `/`              | ✅   | Submit risk assessment (answers)                            |
| `POST`   | `/questions`     | ✅   | Create question (Admin)                                     |
| `PUT`    | `/questions/:id` | ✅   | Update question (Admin)                                     |
| `DELETE` | `/questions/:id` | ✅   | Delete question (Admin)                                     |

## 📰 News (`/news`)

| Method   | Path           | Auth | Description          |
| :------- | :------------- | :--- | :------------------- |
| `GET`    | `/`            | ❌   | List published news  |
| `GET`    | `/:id`         | ❌   | Get news details     |
| `POST`   | `/`            | ✅   | Create news          |
| `PUT`    | `/:id`         | ✅   | Update news          |
| `DELETE` | `/:id`         | ✅   | Delete news          |
| `PATCH`  | `/:id/disable` | ✅   | Disable/Archive news |

## 💬 Chat (`/chat`)

| Method | Path   | Auth | Description       |
| :----- | :----- | :--- | :---------------- |
| `GET`  | `/`    | ✅   | List my chats     |
| `POST` | `/`    | ✅   | Start new chat    |
| `GET`  | `/:id` | ✅   | Get chat messages |
