import { inject, injectable } from 'tsyringe';
import { IChatRepository } from '../repositories/IChatRepository';
import { AppError } from '../../../errors/AppError';

@injectable()
export class CreateChatUseCase {
    constructor(
        @inject('ChatRepository')
        private chatRepository: IChatRepository
    ) { }

    async execute(userId: string, participantId: string) {
        if (userId === participantId) {
            throw new AppError('Cannot create chat with yourself');
        }

        const existingChat = await this.chatRepository.findExisting(userId, participantId);

        if (existingChat) {
            return existingChat;
        }

        return this.chatRepository.create({ userId, participantId });
    }
}
