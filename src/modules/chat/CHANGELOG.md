# Changelog - Chat Module

All notable changes to the **Chat** module will be documented in this file.

## [1.0.0] - 2025-12-12

### Added

- **Architecture**: Modular structure (`src/modules/chat`).
- **Use Cases**: `CreateChat`, `ListChats`, `GetChat`, `SendMessage`.
- **Repository**: `ChatRepository` with `IChatRepository` interface.
- **Controller**: `ChatController`.
- **Validation**: Zod schemas (`chat.schema.ts`).
- **Socket**: Refactored `chat.socket.ts` to use modular components.
- **Features**:
  - **Read Receipts**: `readAt`, `deliveredAt` tracking and `mark_as_read` event.
  - **Typing**: `typing` socket event.
  - **Media**: `type` (TEXT/IMAGE/FILE) field and upload endpoint.
  - **Pagination**: `limit` and `before` cursor in `getChat`.

### Changed

- **Refactor**: Migrated from legacy `ChatService` to Use Case pattern.
- **Routes**: Updated `chat.routes.ts` to use new Controller.
