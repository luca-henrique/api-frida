import { Server, Socket } from 'socket.io';
import { registerChatHandlers } from '../../../modules/chat/infra/websockets/chat.socket';
import { registerLocationHandlers } from '../../../modules/location/infra/websockets/location.socket';

export const registerSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const userId = socket.data.user.id;
    const userRole = socket.data.user.role;

    // Join government updates room if user is GOV
    if (userRole === 'GOV') {
      socket.join('gov_updates');
      console.log(`User ${userId} (GOV) joined gov_updates`);
    }

    // Register modular handlers
    // Join a room specific to this user for private notifications
    socket.join(`user_${userId}`);
    console.log(`[DEBUG] User ${userId} joined room 'user_${userId}'`);

    // Register module-specific handlers
    registerChatHandlers(io, socket);
    registerLocationHandlers(io, socket);
  });
};
