import { z } from 'zod';

export const createChatSchema = z.object({
    participantId: z.string().uuid(),
});

export const sendMessageSchema = z.object({
    chatId: z.string().uuid(),
    content: z.string().min(1),
});
