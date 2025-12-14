import { injectable } from 'tsyringe';

@injectable()
export class NotificationService {
    async notifyAdmins(message: string): Promise<void> {
        // Implement real notification logic here (Email, Push, etc.)
        console.log(`[ADMIN NOTIFICATION]: ${message}`);
    }

    async notifyUser(userId: string, message: string): Promise<void> {
        console.log(`[USER NOTIFICATION] To ${userId}: ${message}`);
    }
}
