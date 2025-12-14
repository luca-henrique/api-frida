# Location Module Improvements

This document tracks future improvements and technical debt for the Location module.

## Features

- [x] **History**: Track location history (currently we only store the _latest_ location per user, overwriting the previous one).
- [x] **Get Location Endpoint**: `GET /location` to retrieve the stored location (useful for debugging or sharing).
- [ ] **Geofencing**: Logic to detect if a user enters/exits a risk zone.
- [ ] **Nearby Users**: Endpoint to find users within a certain radius (e.g., for "Safety Network").
- [x] **Validation**: Add Zod schema validation for latitude/longitude ranges.

## Technical Debt

- [ ] **WebSocket Integration**: Update location via WebSocket for real-time tracking during emergencies.
- [ ] **Validation**: Add Zod schema validation for latitude/longitude ranges.
