import { Server, Socket } from 'socket.io';
import { container } from 'tsyringe';
import { SendMessageUseCase } from '../../useCases/SendMessageUseCase';
import { MarkMessageAsReadUseCase } from '../../useCases/MarkMessageAsReadUseCase';
import prisma from '../../../../config/database';

export const registerChatHandlers = (io: Server, socket: Socket) => {
  const userId = socket.data.user.id;

  socket.on('join_chat', (chatId: string) => {
    socket.join(chatId);
    console.log(`User ${userId} joined chat ${chatId}`);
  });

  socket.on('typing', (data: { chatId: string; isTyping: boolean }) => {
    socket.to(data.chatId).emit('typing', {
      chatId: data.chatId,
      userId,
      isTyping: data.isTyping,
    });
  });

  socket.on('mark_as_read', async (data: { chatId: string }) => {
    try {
      const markMessageAsReadUseCase = container.resolve(MarkMessageAsReadUseCase);
      await markMessageAsReadUseCase.execute(data.chatId, userId);

      // Notify others in chat that messages were read
      socket.to(data.chatId).emit('messages_read', {
        chatId: data.chatId,
        readBy: userId,
        readAt: new Date(),
      });
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  });

  socket.on('send_message', async (data: { chatId: string; content: string; type?: 'TEXT' | 'IMAGE' | 'FILE'; fileUrl?: string }) => {
    try {
      const { chatId, content, type = 'TEXT', fileUrl } = data;

      // TODO: Remove this DEV logic once frontend is fully integrated with correct flow
      // Keeping it specifically because the previous code relied on auto-creating chats/users for testing

      // Ensure Chat exists (using UseCase if possible, but UseCase requires participantId)
      // Fallback to direct check for this specific legacy dev behavior, or try to infer.
      // For now, let's assume the chat SHOULD exist. If not, we might fail or try to create it.
      // The original code created it with just an ID, which is risky.
      // Let's stick to the safer path: Try to send, if it fails, log it.
      // However, to respect the previous robust "DEV" behavior:

      let chat = await prisma.chat.findUnique({ where: { id: chatId } });
      if (!chat) {
        // Create dummy chat for dev if it doesn't exist
        chat = await prisma.chat.create({ data: { id: chatId } });
        console.log(`[DEV] Created missing chat: ${chatId}`);
      }

      // End DEV logic

      const sendMessageUseCase = container.resolve(SendMessageUseCase);
      const message = await sendMessageUseCase.execute(chatId, userId, content, type, fileUrl);

      io.to(chatId).emit('receive_message', message);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });
};
