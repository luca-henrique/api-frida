# Reports Module Improvements

## Features

- [x] **Media Evidence**: Allow attaching photos, audio, or video to reports (`mediaUrl`, `mediaType`).
- [x] **Admin Notifications**: Send email or push notifications to admins/delegates when a critical report is created.
- [x] **Reverse Geocoding**: Automatically convert `latitude`/`longitude` to a readable address (City, Neighborhood).
- [x] **Anonymous Reporting**: Allow submitting reports without a user ID (optional).
- [x] **Status History**: Track _who_ changed the status and _when_ (audit log).

## Admin / Dashboard

- [x] **CSV Export**: Allow exporting reports to CSV/Excel for analysis.
- [ ] **Filters**: Advanced filtering by date range, type (Physical, Emergency), and status.
- [ ] **Heatmap**: Visualization of report locations (if frontend supported).

## Security

- [ ] **Rate Limiting**: Prevent spamming reports.
