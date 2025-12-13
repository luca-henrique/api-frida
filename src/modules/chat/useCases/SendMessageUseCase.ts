import { inject, injectable } from 'tsyringe';
import { IChatRepository } from '../repositories/IChatRepository';

@injectable()
export class SendMessageUseCase {
    constructor(
        @inject('ChatRepository')
        private chatRepository: IChatRepository
    ) { }

    async execute(chatId: string, senderId: string, content: string, type: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT', fileUrl?: string) {
        // We could add validation here if needed (e.g. check if user is in chat)
        // For now, assuming socket/controller logic handles permissions

        // Save message
        const message = await this.chatRepository.createMessage({ chatId, senderId, content, type, fileUrl });

        // Update chat timestamp
        await this.chatRepository.updateUpdatedAt(chatId);

        // TODO: Get recipient ID and send push notification
        // const recipientId = ...
        // const pushService = new PushNotificationService();
        // await pushService.send(recipientId, 'New Message', content);

        return message;
    }
}
