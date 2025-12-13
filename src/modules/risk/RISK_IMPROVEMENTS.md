# Risk Module Improvements

This document tracks future improvements and technical debt for the Risk module.

## Logic & Validation

- [x] **Zod Schemas**: Move inline validation from Controllers to dedicated schema files (`risk.schema.ts`).
- [x] **Strict Types**: Strengthen the typing for `answers` JSON field (currently relying on loose objects).
- [x] **Question Versioning**: Implement versioning for questions so that old assessments reference the text/context of the question at the time it was answered.

## Performance

- [x] **Caching**: Cache the "Latest Assessment" (`findLatestByUserId`) result in Redis, as it is frequently accessed by the dashboard.
- [ ] **Bulk Insert**: Optimize answer saving if the number of questions grows significantly.

## Testing

- [ ] **Unit Tests**: Critical need for unit tests on `CreateAssessmentUseCase` to verify the "High/Medium/Low" risk calculation logic against various answer combinations.
- [ ] **Integration Tests**: Verify the full flow of answering questions -> calculating risk -> updating user profile.

## Features

- [x] **Admin API**: Separate/Start Admin-only endpoints for creating and managing Risk Questions (currently mixed).
- [x] **Analytics**: Aggregated view of risk levels across the user base.
