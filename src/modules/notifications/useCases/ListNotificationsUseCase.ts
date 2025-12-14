import { inject, injectable } from 'tsyringe';
import { INotificationsRepository } from '../repositories/INotificationsRepository';
import { Notification } from '@prisma/client';

@injectable()
export class ListNotificationsUseCase {
    constructor(
        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository
    ) { }

    async execute(userId: string): Promise<{ notifications: Notification[]; unreadCount: number }> {
        const notifications = await this.notificationsRepository.listByUserId(userId);
        const unreadCount = await this.notificationsRepository.countUnread(userId);

        return { notifications, unreadCount };
    }
}
