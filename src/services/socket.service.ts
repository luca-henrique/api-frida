import { Server, Socket } from 'socket.io';
import prisma from '../config/database';

export const registerSocketHandlers = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        const userId = socket.data.user.id;

        // --- Chat Events ---
        socket.on('join_chat', (chatId: string) => {
            socket.join(chatId);
            console.log(`User ${userId} joined chat ${chatId}`);
        });

        socket.on('send_message', async (data: { chatId: string; content: string }) => {
            try {
                const { chatId, content } = data;

                // Save to DB
                const message = await prisma.message.create({
                    data: {
                        chatId,
                        senderId: userId,
                        content,
                    },
                    include: {
                        sender: {
                            select: { id: true, name: true },
                        },
                    },
                });

                await prisma.chat.update({
                    where: { id: chatId },
                    data: { updatedAt: new Date() },
                });

                io.to(chatId).emit('receive_message', message);

                // Notify other participants (push notification logic could go here)
            } catch (error) {
                console.error('Error sending message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // --- Location Events ---
        socket.on('update_location', async (data: { latitude: number; longitude: number }) => {
            try {
                const { latitude, longitude } = data;

                // Upsert location
                await prisma.location.upsert({
                    where: { userId },
                    update: { latitude, longitude },
                    create: { userId, latitude, longitude },
                });

                // Broadcast to anyone tracking this user (e.g., trusted contacts)
                // For now, we broadcast to a room named "track_USERID"
                io.to(`track_${userId}`).emit('location_updated', {
                    userId,
                    latitude,
                    longitude,
                    timestamp: new Date(),
                });

            } catch (error) {
                console.error('Error updating location:', error);
            }
        });

        socket.on('track_user', (targetUserId: string) => {
            // In a real app, verify permission here (e.g., is trusted contact?)
            socket.join(`track_${targetUserId}`);
            console.log(`User ${userId} started tracking ${targetUserId}`);
        });

        socket.on('stop_track_user', (targetUserId: string) => {
            socket.leave(`track_${targetUserId}`);
        });
    });
};
