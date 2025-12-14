import { Notification } from '@prisma/client';
import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO';

export interface INotificationsRepository {
    create(data: ICreateNotificationDTO): Promise<Notification>;
    listByUserId(userId: string): Promise<Notification[]>;
    markAsRead(id: string): Promise<void>;
    countUnread(userId: string): Promise<number>;
    findById(id: string): Promise<Notification | null>;
}
