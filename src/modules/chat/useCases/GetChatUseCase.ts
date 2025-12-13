import { inject, injectable } from 'tsyringe';
import { IChatRepository } from '../repositories/IChatRepository';
import { AppError } from '../../../errors/AppError';

@injectable()
export class GetChatUseCase {
    constructor(
        @inject('ChatRepository')
        private chatRepository: IChatRepository
    ) { }

    async execute(chatId: string, userId: string, limit?: number, before?: string) {
        const chat = await this.chatRepository.findById(chatId, limit, before);

        if (!chat) {
            throw new AppError('Chat not found', 404);
        }

        const isParticipant = chat.users.some((u) => u.id === userId);
        if (!isParticipant) {
            throw new AppError('Access denied', 403);
        }

        return chat;
    }
}
