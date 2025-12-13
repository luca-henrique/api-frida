import { Chat, Message, User } from '@prisma/client';

export interface ICreateChatDTO {
    userId: string;
    participantId: string;
}

export interface ISendMessageDTO {
    chatId: string;
    senderId: string;
    content: string;
    type?: 'TEXT' | 'IMAGE' | 'FILE';
    fileUrl?: string;
}

export interface IChatRepository {
    create(data: ICreateChatDTO): Promise<Chat>;
    findExisting(userId: string, participantId: string): Promise<Chat | null>;
    findById(id: string, limit?: number, before?: string): Promise<(Chat & { users: { id: string; name: string }[]; messages: Message[] }) | null>;
    findManyByUserId(userId: string): Promise<(Chat & { users: { id: string; name: string; email: string }[]; messages: Message[] })[]>;
    createMessage(data: ISendMessageDTO): Promise<Message & { sender: { id: string; name: string } }>;
    markMessagesAsRead(chatId: string, userId: string): Promise<void>;
    updateUpdatedAt(chatId: string): Promise<void>;
}
