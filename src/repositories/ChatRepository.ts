import { injectable } from 'tsyringe';
import prisma from '../config/database';
import { Chat } from '@prisma/client';

@injectable()
export class ChatRepository {
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

    async findById(id: string) {
        return prisma.chat.findUnique({
            where: { id },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                messages: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });
    }

    async findExisting(userId: string, participantId: string): Promise<Chat | null> {
        return prisma.chat.findFirst({
            where: {
                AND: [
                    { users: { some: { id: userId } } },
                    { users: { some: { id: participantId } } },
                ],
            },
        });
    }

    async create(userId: string, participantId: string): Promise<Chat> {
        return prisma.chat.create({
            data: {
                users: {
                    connect: [{ id: userId }, { id: participantId }],
                },
            },
        });
    }
}
