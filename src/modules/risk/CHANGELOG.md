# Changelog - Risk Module

All notable changes to the **Risk** module will be documented in this file.

## [1.0.0] - 2025-12-12

### Added

- **Architecture**: Modular structure (`src/modules/risk`).
- **Use Cases**:
  - Questions: `CreateQuestion`, `ListQuestions`, `UpdateQuestion`, `DeleteQuestion`.
  - Assessment: `CreateAssessment`, `ListAssessments`, `ShowLatestAssessment`.
- **Controllers**: `RiskQuestionController`, `RiskAssessmentController`.
- **Repositories**: `RiskQuestionRepository`, `RiskAssessmentRepository` (with interfaces).
- **Validation**: Basic Zod validation in Controllers (to be moved to schemas).

### Changed

- **Refactor**: Migrated from legacy `RiskAssessmentService` and `RiskQuestionService` to Use Case pattern.
- **Routes**: Updated `risk.routes.ts` to use new Controllers.

## [1.1.0] - 2025-12-12

### Added

- **Schemas**: Extracted Zod validation to `risk.schema.ts`.
- **Versioning**: Added `version` to Questions and `questionVersion` to Answers.
- **Caching**: Implemented Redis cache for `ShowLatestAssessmentUseCase`.
- **Analytics**: New `GET /risk/analytics` endpoint.
- **Security**: Added `adminMiddleware` to protect question management routes.
