import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateChatUseCase } from '../useCases/CreateChatUseCase';
import { ListChatsUseCase } from '../useCases/ListChatsUseCase';
import { GetChatUseCase } from '../useCases/GetChatUseCase';
import { MarkMessageAsReadUseCase } from '../useCases/MarkMessageAsReadUseCase';
import { SendMessageUseCase } from '../useCases/SendMessageUseCase';
import { createChatSchema, sendMessageSchema } from '../schemas/chat.schema';

export class ChatController {
    async listChats(req: Request, res: Response): Promise<Response> {
        const userId = req.userId!;
        const listChatsUseCase = container.resolve(ListChatsUseCase);
        const chats = await listChatsUseCase.execute(userId);
        return res.json(chats);
    }

    async getChat(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { limit, before } = req.query; // Pagination
        const userId = req.userId!;

        const getChatUseCase = container.resolve(GetChatUseCase);
        const chat = await getChatUseCase.execute(
            id,
            userId,
            limit ? Number(limit) : undefined,
            before ? String(before) : undefined
        );
        return res.json(chat);
    }

    async createChat(req: Request, res: Response): Promise<Response> {
        const { participantId } = createChatSchema.parse(req.body);
        const userId = req.userId!;

        const createChatUseCase = container.resolve(CreateChatUseCase);
        const chat = await createChatUseCase.execute(userId, participantId);
        return res.status(201).json(chat);
    }

    async sendMessage(req: Request, res: Response): Promise<Response> {
        const { chatId } = req.params;
        const { content } = req.body; // Basic validation, can use schema
        const userId = req.userId!;
        let type: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT';
        let fileUrl: string | undefined;

        if (req.file) {
            type = 'IMAGE'; // Or FILE based on mimetype
            fileUrl = req.file.filename;
        }

        const sendMessageUseCase = container.resolve(SendMessageUseCase);
        const message = await sendMessageUseCase.execute(chatId, userId, content || '', type, fileUrl);

        return res.status(201).json(message);
    }

    async markAsRead(req: Request, res: Response): Promise<Response> {
        const { id } = req.params; // Chat ID
        const userId = req.userId!;

        const markMessageAsReadUseCase = container.resolve(MarkMessageAsReadUseCase);
        await markMessageAsReadUseCase.execute(id, userId);

        return res.status(204).send();
    }
}
