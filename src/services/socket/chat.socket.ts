import { Server, Socket } from 'socket.io';
import prisma from '../../config/database';

export const registerChatHandlers = (io: Server, socket: Socket) => {
    const userId = socket.data.user.id;

    socket.on('join_chat', (chatId: string) => {
        socket.join(chatId);
        console.log(`User ${userId} joined chat ${chatId}`);
    });

    socket.on('send_message', async (data: { chatId: string; content: string }) => {
        try {
            const { chatId, content } = data;

            // Ensure Chat exists (for mock/dev scenarios)
            let chat = await prisma.chat.findUnique({ where: { id: chatId } });
            if (!chat) {
                chat = await prisma.chat.create({
                    data: { id: chatId }
                });
                console.log(`[DEV] Created missing chat: ${chatId}`);
            }

            // Ensure User exists (for mock/dev scenarios)
            let user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                console.log(`[DEV] Creating missing mock user: ${userId}`);
                user = await prisma.user.create({
                    data: {
                        id: userId,
                        name: userId === 'user-123' ? "Usuária Teste" : "Especialista",
                        email: `${userId}@test.com`,
                        password: "mock-password",
                        cpf: userId === 'user-123' ? "123.456.789-00" : "000.000.000-00",
                    }
                });
            }

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

        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    });
};
