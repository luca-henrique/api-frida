# Changelog - User Module

All notable changes to the **User** module will be documented in this file.

## [1.0.0] - 2025-12-12

### Added

- **Architecture**: Modular structure (`src/modules/users`).
- **Use Cases**: Implemented `CreateUserUseCase`, `ListUsersUseCase`, `ShowUserUseCase`, `UpdateUserUseCase`, `DeleteUserUseCase`.
- **Controller**: `UserController` with dependency injection.
- **Validation**: Zod schemas (`createUserSchema`, `updateUserSchema`).
- **Repositories**: Moved `IUserRepository` and `UserRepository` to this module.

### Changed

- **Refactor**: Migrated from legacy `UserService` to Use Case pattern.
- **Routes**: Updated `user.routes.ts` to use the new `UserController`.
