import { injectable } from 'tsyringe';

@injectable()
export class NotificationService {
    async notifyAdmins(message: string): Promise<void> {
        // TODO: Integrate with Email/Push provider
        console.log(`[NotificationService] Notify Admins: ${message}`);
    }
}
