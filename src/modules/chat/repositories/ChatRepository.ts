import { Chat, Message } from '@prisma/client';
import prisma from '../../../config/database';
import { IChatRepository, ICreateChatDTO, ISendMessageDTO } from './IChatRepository';

export class ChatRepository implements IChatRepository {
    async findManyByUserId(userId: string) {
        return prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                messages: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
    }

    async findById(id: string, limit: number = 20, before?: string) {
        const messagesQuery: any = {
            take: limit,
            orderBy: {
                createdAt: 'desc', // Get latest first for pagination logic
            },
        };

        if (before) {
            messagesQuery.skip = 1;
            messagesQuery.cursor = { id: before };
        }

        const chat = await prisma.chat.findUnique({
            where: { id },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                messages: messagesQuery,
            },
        });

        if (chat) {
            // Reverse messages to show in chronological order
            chat.messages.reverse();
        }

        return chat;
    }

    async findExisting(userId: string, participantId: string): Promise<Chat | null> {
        return prisma.chat.findFirst({
            where: {
                AND: [{ users: { some: { id: userId } } }, { users: { some: { id: participantId } } }],
            },
        });
    }

    async create({ userId, participantId }: ICreateChatDTO): Promise<Chat> {
        return prisma.chat.create({
            data: {
                users: {
                    connect: [{ id: userId }, { id: participantId }],
                },
            },
        });
    }

    async createMessage({ chatId, senderId, content, type = 'TEXT', fileUrl }: ISendMessageDTO) {
        return prisma.message.create({
            data: {
                chatId,
                senderId,
                content,
                type,
                fileUrl,
            },
            include: {
                sender: {
                    select: { id: true, name: true },
                },
            },
        });
    }

    async markMessagesAsRead(chatId: string, userId: string): Promise<void> {
        // Mark messages sent by OTHER users as read
        await prisma.message.updateMany({
            where: {
                chatId,
                senderId: { not: userId },
                read: false,
            },
            data: {
                read: true,
                readAt: new Date(),
            },
        });
    }

    async updateUpdatedAt(chatId: string): Promise<void> {
        await prisma.chat.update({
            where: { id: chatId },
            data: { updatedAt: new Date() },
        });
    }
}
