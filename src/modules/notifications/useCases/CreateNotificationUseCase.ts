import { inject, injectable } from 'tsyringe';
import { INotificationsRepository } from '../repositories/INotificationsRepository';
import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO';
import { Notification } from '@prisma/client';

@injectable()
export class CreateNotificationUseCase {
    constructor(
        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository
    ) { }

    async execute(data: ICreateNotificationDTO): Promise<Notification> {
        return this.notificationsRepository.create(data);
    }
}
