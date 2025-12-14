import { inject, injectable } from 'tsyringe';
import { INotificationsRepository } from '../repositories/INotificationsRepository';
import { AppError } from '../../../errors/AppError';

@injectable()
export class MarkNotificationAsReadUseCase {
    constructor(
        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository
    ) { }

    async execute(id: string, userId: string): Promise<void> {
        const notification = await this.notificationsRepository.findById(id);

        if (!notification) {
            throw new AppError('Notification not found', 404);
        }

        if (notification.userId !== userId) {
            throw new AppError('Operation not allowed', 403);
        }

        await this.notificationsRepository.markAsRead(id);
    }
}
