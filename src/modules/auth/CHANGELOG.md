# Changelog - Auth Module

All notable changes to the **Auth** module will be documented in this file.

## [1.2.0] - 2025-12-12

### Added

- **Architecture**: Use Case layer (`src/modules/auth/useCases`) for better separation of concerns.
- **Architecture**: Repository Interfaces (`IUserRepository`, etc.) for Dependency Inversion.
- **Documentation**: `docs/ENVIRONMENT_VARIABLES.md` detailing all env vars.
- **Configuration**: moved `IUserRepository` and `UserRepository` to `src/modules/users/repositories`.
- **User Module**: Refactored User module to use Use Case pattern.
  - Implemented `CreateUserUseCase`, `ListUsersUseCase`, `ShowUserUseCase`, `UpdateUserUseCase`, `DeleteUserUseCase`.
  - Created `UserController` in `src/modules/users/controllers`.
  - Updated `user.routes.ts` to use new controller.
  - Removed legacy `UserService` and `UserController`.
- **Refactor**: Externalized configuration variables to `.env`.s, lockout, rate limit) to `.env`.

### Changed

- **Refactor**: Replaced `AuthService` with individual Use Cases (`RegisterUseCase`, `AuthenticateUserUseCase`, etc.).
- **Refactor**: `AuthController` now depends on Use Cases instead of Service.
- **Cleanup**: Removed legacy `AuthService` and helper service files.

## [1.1.0] - 2025-12-12

### Added

- **Security**: Rate limiting middleware for `/login` and `/register`.
- **Security**: Account lockout mechanism (lock for 15m after 5 failed attempts).
- **Security**: Secure Logout endpoint (`DELETE` token logic).
- **Functionality**: Password Recovery flow (`SendForgotPasswordEmailService`, `ResetPasswordService`).
- **Infrastructure**: `MailProvider` (Ethereal) and `UserTokensRepository`.

### Changed

- Refactored `AuthController` to include logout and password recovery methods.
- Updated `registerSchema` to enforce strong password policy.

## [1.0.0] - 2025-12-11

### Added

- Modular structure (`src/modules/auth`).
- `AuthController`, `AuthService`, and `RefreshTokenRepository` moved to this module.
- `README.md` documentation.

### Changed

- Refactored from legacy layered architecture (`src/controllers`, `src/services`) to Modular Monolith.
- Simplified structure: Flattened `domain` and `infra` layers into `controllers`, `services`, `repositories`.
