import { injectable } from 'tsyringe';
import prisma from '../../../config/database';
import { Notification } from '@prisma/client';
import { INotificationsRepository } from './INotificationsRepository';
import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO';

@injectable()
export class NotificationsRepository implements INotificationsRepository {
    async create({ userId, title, message }: ICreateNotificationDTO): Promise<Notification> {
        return prisma.notification.create({
            data: {
                userId,
                title,
                message,
            },
        });
    }

    async listByUserId(userId: string): Promise<Notification[]> {
        return prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async markAsRead(id: string): Promise<void> {
        await prisma.notification.update({
            where: { id },
            data: { read: true },
        });
    }

    async countUnread(userId: string): Promise<number> {
        return prisma.notification.count({
            where: {
                userId,
                read: false,
            },
        });
    }

    async findById(id: string): Promise<Notification | null> {
        return prisma.notification.findUnique({
            where: { id },
        });
    }
}
