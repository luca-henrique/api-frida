# Changelog - Reports Module

All notable changes to the **Reports** module will be documented in this file.

## [1.0.0] - 2025-12-12

### Added

- **Architecture**: Modular structure (`src/modules/reports`).
- **Use Cases**: `CreateReport`, `ListReports`, `UpdateReportStatus`.
- **Repository**: `ReportRepository` with `IReportRepository` interface.
- **Controller**: `ReportController`.
- **Validation**: Zod schemas (`report.schema.ts`).
- **Routes**: `POST /reports`, `GET /reports`, `PATCH /reports/:id/status`.
