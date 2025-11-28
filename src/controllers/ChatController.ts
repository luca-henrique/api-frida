import { Request, Response, NextFunction } from 'express';
import { ChatService } from '../services/ChatService';
import { z } from 'zod';

import { injectable, inject } from 'tsyringe';

@injectable()
export class ChatController {
    constructor(@inject(ChatService) private chatService: ChatService) { }

    listChats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId!;
            const chats = await this.chatService.listChats(userId);
            res.json(chats);
        } catch (error) {
            next(error);
        }
    };

    getChat = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const userId = req.userId!;
            const chat = await this.chatService.getChat(id, userId);
            res.json(chat);
        } catch (error) {
            next(error);
        }
    };

    createChat = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = z.object({
                participantId: z.string(),
            });

            const { participantId } = schema.parse(req.body);
            const userId = req.userId!;

            const chat = await this.chatService.createChat(userId, participantId);
            res.status(201).json(chat);
        } catch (error) {
            next(error);
        }
    };
}
