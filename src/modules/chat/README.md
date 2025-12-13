# Chat Module

This module handles the real-time messaging functionality in the FRIDA application.

## Components

- **Entity**: `Chat`, `Message`.
- **Features**: Real-time messaging between users.

## Architecture

Follows the **Clean Architecture** / **Modular** pattern:

- **Controllers**: Handle HTTP requests.
- **Use Cases**: Encapsulate specific business logic.
- **Repositories**: Handle database access (Prisma).
- **Socket**: `src/services/socket/chat.socket.ts` handles WebSocket events using the same Use Cases.

## Integration

The socket handler resolves Use Cases from the DI container (`tsyringe`) to ensure consistent logic and proper dependency management regardless of the transport layer (HTTP or WebSocket).
