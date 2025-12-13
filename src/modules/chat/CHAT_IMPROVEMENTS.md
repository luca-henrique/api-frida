# Chat Module Improvements

## Features

- [ ] **Read Receipts**: Track when a message has been delivered and read by the recipient (`readAt`, `deliveredAt`).
- [ ] **Typing Indicators**: Real-time events (`typing`, `stop_typing`) over Socket.IO to show when a user is writing.
- [ ] **Push Notifications**: Integrate with Firebase/OneSignal to send push notifications when a user receives a message while offline/backgrounded.
- [ ] **Media Support**: Allow sending images/files not just text (update `Message` schema or use `content` as JSON/structure).
- [ ] **Online Status**: Real-time presence system (`user_online`, `user_offline`).

## Performance

- [ ] **Pagination**: Implement cursor-based pagination for messages in `GetChatUseCase` (currently loads all or fixed limit).
- [ ] **Caching**: Cache the list of user chats in Redis (invalidate on new message).

## Security

- [ ] **End-to-End Encryption**: (Advanced) Encrypt messages so only participants can decrypt them.
- [ ] **Rate Limiting**: Prevent socket spam (message flooding).
