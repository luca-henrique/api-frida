import { Request, Response } from 'express';
import prisma from '../config/database';
import { z } from 'zod';

export class ChatController {
    async listChats(req: Request, res: Response) {
        try {
            const userId = req.userId;

            const chats = await prisma.chat.findMany({
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

            return res.json(chats);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getChat(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.userId;

            const chat = await prisma.chat.findUnique({
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

            if (!chat) {
                return res.status(404).json({ error: 'Chat not found' });
            }

            // Verify if user belongs to chat
            const isParticipant = chat.users.some((u: { id: string }) => u.id === userId);
            if (!isParticipant) {
                return res.status(403).json({ error: 'Access denied' });
            }

            return res.json(chat);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createChat(req: Request, res: Response) {
        try {
            const schema = z.object({
                participantId: z.string(),
            });

            const { participantId } = schema.parse(req.body);
            const userId = req.userId;

            if (userId === participantId) {
                return res.status(400).json({ error: 'Cannot create chat with yourself' });
            }

            // Check if chat already exists
            const existingChat = await prisma.chat.findFirst({
                where: {
                    AND: [
                        { users: { some: { id: userId } } },
                        { users: { some: { id: participantId } } },
                    ],
                },
            });

            if (existingChat) {
                return res.json(existingChat);
            }

            const chat = await prisma.chat.create({
                data: {
                    users: {
                        connect: [{ id: userId }, { id: participantId }],
                    },
                },
            });

            return res.status(201).json(chat);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.issues });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
