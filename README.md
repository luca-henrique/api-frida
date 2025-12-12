# Frida Backend

Backend API for the Frida application, built with Node.js, Express, TypeScript, and Prisma.

## Features

- User Authentication (Register/Login)
- Risk Assessment Management
- Real-time Chat (Socket.io)
- Secure Error Handling

## Prerequisites

- Node.js (v18+)
- PostgreSQL (or your configured database)
- Redis (optional, for scaling sockets)

## Code Quality

This project uses **ESLint** and **Prettier** to ensure code quality and consistency.

- **Linting**: Run `npm run lint` to check for issues.
- **Formatting**: Run `npm run format` to fix formatting issues.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file based on `.env.example` (if available) or set:

   ```env
   PORT=3000
   DATABASE_URL="postgresql://user:password@localhost:5432/frida"
   JWT_SECRET="your_secret_key"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

## Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## Docker

To run the application using Docker:

```bash
docker-compose up --build
```

## Documentation

- [API Routes](docs/ROUTES.md)
