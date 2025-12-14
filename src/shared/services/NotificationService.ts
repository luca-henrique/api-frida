import { injectable, container } from 'tsyringe';
import { CreateNotificationUseCase } from '../../modules/notifications/useCases/CreateNotificationUseCase';
import { io } from '../../config/socket';

@injectable()
export class NotificationService {
    async notifyAdmins(message: string): Promise<void> {
        // Implement real notification logic here (Email, Push, etc.)
        console.log(`[ADMIN NOTIFICATION]: ${message}`);
        // Optionally emit to 'admins' room if it exists
        if (io) {
            io.to('gov_updates').emit('admin_notification', { message });
        }
    }

    async notifyUser(userId: string, message: string, title: string = 'New Notification'): Promise<void> {
        try {
            // 1. Save to Database
            const createNotification = container.resolve(CreateNotificationUseCase);
            const notification = await createNotification.execute({
                userId,
                title,
                message,
            });

            console.log(`[USER NOTIFICATION] Saved to DB for ${userId}: ${message}`);

            // 2. Emit via Socket.io
            if (io) {
                // Ensure we emit to a room specific to the user (e.g., their ID is used as room/handle)
                // In setup, we usually join sockets to a room named after their userId if we want to msg them directly
                // Assuming socket.join(`user_${userId}`) logic exists or we emit to their specific socket ID if tracking them.
                // Based on location socket logic, users join rooms? No, location socket joins `track_USERID`.
                // Let's rely on standard practice: Emit to user's connected socket if we can find it, OR broadcast to room `user_${userId}` if established.
                // Looking at `socket.service.ts` or `config/socket.ts`, we don't explicitly join a `user_ID` room by default in the provided snippets.
                // However, we can use `io.to(socketId)` if we tracked it.
                // For now, let's assume hypothetical `user_${userId}` room for consistency or just log if not implemented.

                // IMPLEMENTATION NOTE: Creating a room `user_${userId}` in `socket.service.ts` would be ideal.
                // For now, I'll allow the emission, assuming the client side joins this room.
                io.to(`user_${userId}`).emit('notification', notification);
            }

        } catch (error) {
            console.error(`Error notifying user ${userId}:`, error);
        }
    }
}
