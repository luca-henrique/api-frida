# Changelog

All notable changes to the Location module will be documented in this file.

## [Unreleased]

### Added

- **Repository**: `LocationRepository` with `updateLocation` (Upsert) and `findByUserId`.
- **UseCase**: `UpdateLocationUseCase` to update user's last known location.
- **Controller**: `LocationController` exposing `POST /location`.
- **Routes**: Protected route `POST /location` integrated into main router.
