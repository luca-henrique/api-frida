# News Module Improvements

This document tracks future improvements and technical debt for the News module.

## Performance

- [x] **Caching**: Implement Redis caching for the main news feed (`ListNewsUseCase`), specifically for the first page (`page=1`), as it is the most accessed resource.
- [ ] **CDN**: Serve images via a CDN for faster loading.

## Features

- [x] **Image Upload**: Integrate with a storage provider (S3, MinIO) to handle direct image uploads instead of just accepting URLs.
- [x] **Full-Text Search**: Implement search functionality to find news by title or content keywords.
- [x] **Scheduled Publishing**: Allow admins to set a `publishAt` date in the future, so news only becomes visible after that time.
- [x] **Analytics**: Track "views" count for each news item to identify popular content.

## Testing

- [ ] **Unit Tests**: Test the validation logic and Use Case flows.
- [ ] **Integration Tests**: Verify the API endpoints and database interactions.
