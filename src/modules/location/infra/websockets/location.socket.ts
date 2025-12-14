import { Server, Socket } from 'socket.io';
import { container } from 'tsyringe';
import { UpdateLocationUseCase } from '../../useCases/UpdateLocationUseCase';

export const registerLocationHandlers = (io: Server, socket: Socket) => {
  const userId = socket.data.user.id;
  const userRole = socket.data.user.role;

  socket.on('update_location', async (data: { latitude: number; longitude: number }) => {
    console.log(
      `[DEBUG] SERVER received 'update_location' from User ${userId} (${userRole}):`,
      JSON.stringify(data)
    );
    try {
      const { latitude, longitude } = data;

      // Update location using UseCase
      const updateLocationUseCase = container.resolve(UpdateLocationUseCase);
      await updateLocationUseCase.execute({ userId, latitude, longitude });
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

  socket.on('track_user', (targetUserId: string) => {
    socket.join(`track_${targetUserId}`);
    console.log(`User ${userId} started tracking ${targetUserId}`);
  });

  socket.on('stop_track_user', (targetUserId: string) => {
    socket.leave(`track_${targetUserId}`);
  });
};
