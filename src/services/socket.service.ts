import { Server, Socket } from 'socket.io';
import { registerChatHandlers } from './socket/chat.socket';
import { registerLocationHandlers } from './socket/location.socket';

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
    registerChatHandlers(io, socket);
    registerLocationHandlers(io, socket);
  });
};
