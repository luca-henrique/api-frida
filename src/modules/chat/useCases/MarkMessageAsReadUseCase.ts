import { inject, injectable } from 'tsyringe';
import { IChatRepository } from '../repositories/IChatRepository';

@injectable()
export class MarkMessageAsReadUseCase {
    constructor(
        @inject('ChatRepository')
        private chatRepository: IChatRepository
    ) { }

    async execute(chatId: string, userId: string) {
        await this.chatRepository.markMessagesAsRead(chatId, userId);
    }
}
