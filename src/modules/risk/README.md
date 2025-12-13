# Risk Module

This module handles the core business logic for **Risk Assessment** (Evaluación de Riesgo) in the FRIDA application.

## Components

### Risk Questions

Manages the questionnaire used for assessment.

- **Entity**: `RiskQuestion`
- **Features**: CRUD for questions, ordering, and activation status.

### Risk Assessment

Manages user answers and calculates the risk level.

- **Entity**: `RiskAssessment`, `RiskAssessmentAnswer`
- **Logic**:
  - **High**: ≥ 10 "Yes" answers OR ≥ 50% "Yes" (of valid answers).
  - **Medium**: ≥ 10 "Don't Know/NA" OR 25-50% "Yes".
  - **Low**: < 25% "Yes" or mostly N/A (without hitting the Medium threshold).

## Architecture

Follows the **Clean Architecture** / **Modular** pattern:

- **Controllers**: Handle HTTP requests.
- **Use Cases**: Encapsulate specific business rules.
- **Repositories**: Handle database access (Prisma).
- **DTOs**: Define data structures.
