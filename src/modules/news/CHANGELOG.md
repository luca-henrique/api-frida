# Changelog - News Module

All notable changes to the **News** module will be documented in this file.

## [1.0.0] - 2025-12-12

### Added

- **Architecture**: Modular structure (`src/modules/news`).
- **Use Cases**: `CreateNews`, `ListNews`, `ShowNews`, `UpdateNews`, `DeleteNews`, `DisableNews`.
- **Repository**: `NewsRepository` with `INewsRepository` interface.
- **Controller**: `NewsController`.
- **Validation**: Zod schemas (`news.schema.ts`).

### Changed

- **Refactor**: Migrated from legacy `NewsService` to Use Case pattern.
- **Routes**: Updated `news.routes.ts` to use new Controller and Middleware.

## [1.1.0] - 2025-12-12

### Added

- **Performance**: Redis caching for main feed `page=1`.
- **Search**: Full-text search by title/content.
- **Upload**: Local image upload support using `multer`.
- **Analytics**: `views` tracking and "Top Viewed" endpoint.
- **Scheduling**: `publishAt` field for future publishing.
