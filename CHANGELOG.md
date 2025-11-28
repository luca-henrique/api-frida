# Changelog

## [Unreleased]

### Fixed

- Configured Helmet CSP to allow Scalar API documentation CDN scripts.

### Added

- Added detailed recommendations for Scalable Real-time Architecture (Redis, Kafka) in `docs/IMPROVEMENTS.md`.
- Implemented Repository Pattern to decouple data access.
- Refactored Services to use Repositories instead of direct Prisma calls.
- Added ESLint and Prettier for code linting and formatting.
- Created `UserRepository`, `ChatRepository`, and `RiskAssessmentRepository`.
- Created `AuthService`, `ChatService`, and `RiskAssessmentService` to handle business logic.
- Created `AppError` class for standardized error handling.
- Created Zod schemas for authentication validation (`auth.schema.ts`).
- Added global `errorMiddleware` to handle `AppError` and `ZodError`.
- Added Scalar API documentation at `/docs`.
- Added OpenAPI specification (`docs/openapi.yaml`).

### Changed

- Refactored `AuthController` to use `AuthService` and remove business logic from the controller.
- Refactored `ChatController` to use `ChatService`.
- Refactored `RiskAssessmentController` to use `RiskAssessmentService`.
- Updated `app.ts` to include `errorMiddleware` and Scalar documentation.
- Updated `prisma/seed.ts` to use hashed passwords and ensure user creation.
