import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListNotificationsUseCase } from '../useCases/ListNotificationsUseCase';
import { MarkNotificationAsReadUseCase } from '../useCases/MarkNotificationAsReadUseCase';

export class NotificationsController {
    async index(request: Request, response: Response): Promise<Response> {
        const { userId } = request;

        if (!userId) {
            return response.status(401).json({ error: 'User not authenticated' });
        }

        const listNotifications = container.resolve(ListNotificationsUseCase);
        const { notifications, unreadCount } = await listNotifications.execute(userId);

        return response.json({ notifications, unreadCount });
    }

    async markAsRead(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { userId } = request;

        if (!userId) {
            return response.status(401).json({ error: 'User not authenticated' });
        }

        const markAsRead = container.resolve(MarkNotificationAsReadUseCase);
        await markAsRead.execute(id, userId);

        return response.status(204).send();
    }
}
