'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.registerLocationHandlers = void 0;
const database_1 = __importDefault(require('../../config/database'));
const registerLocationHandlers = (io, socket) => {
  const userId = socket.data.user.id;
  const userRole = socket.data.user.role;
  socket.on('update_location', async (data) => {
    console.log(
      `[DEBUG] SERVER received 'update_location' from User ${userId} (${userRole}):`,
      JSON.stringify(data)
    );
    try {
      const { latitude, longitude } = data;
      // Upsert location
      await database_1.default.location.upsert({
        where: { userId },
        update: { latitude, longitude },
        create: { userId, latitude, longitude },
      });
      console.log(`[DEBUG] SERVER saved location to DB for User ${userId}`);
      // Broadcast to anyone tracking this user (e.g., trusted contacts)
      io.to(`track_${userId}`).emit('location_updated', {
        userId,
        latitude,
        longitude,
        timestamp: new Date(),
      });
      console.log(`[DEBUG] SERVER broadcasted 'location_updated' to room 'track_${userId}'`);
      // Broadcast to government dashboard
      const roomSize = io.sockets.adapter.rooms.get('gov_updates')?.size || 0;
      console.log(`[DEBUG] SERVER broadcasting to 'gov_updates' (Clients: ${roomSize})`);
      io.to('gov_updates').emit('location_updated', {
        userId,
        latitude,
        longitude,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('[ERROR] SERVER Error updating location:', error);
    }
  });
  socket.on('track_user', (targetUserId) => {
    socket.join(`track_${targetUserId}`);
    console.log(`User ${userId} started tracking ${targetUserId}`);
  });
  socket.on('stop_track_user', (targetUserId) => {
    socket.leave(`track_${targetUserId}`);
  });
};
exports.registerLocationHandlers = registerLocationHandlers;
