# User Module Improvements

This document tracks future improvements and technical debt for the User module.

## Security & Auth

- [ ] **Email Verification**: Require email confirmation before allowing login.
- [ ] **2FA (Two-Factor Authentication)**: Implement TOTP (Time-based One-Time Password) for extra security.
- [ ] **Password History**: Prevent reuse of recent passwords.

## Data & Validation

- [x] **CPF Validation**: Implement specialized validation for CPF (currently just regex/length).
- [x] **DTOs**: Introduce Data Transfer Objects for stricter type control between layers.

## Testing

- [ ] **Unit Tests**: Add unit tests for all Use Cases (`src/modules/users/useCases/*.spec.ts`).
- [ ] **Integration Tests**: Add integration tests for `UserController` endpoints.

## Features

- [ ] **Profile Picture**: Allow users to upload and update profile pictures.
- [ ] **Soft Delete**: Implement soft delete logic instead of hard delete in `DeleteUserUseCase` (if required by business logic).
