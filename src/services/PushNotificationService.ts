export class PushNotificationService {
    async send(userId: string, title: string, body: string, data?: any): Promise<void> {
        // Mock implementation
        // In production, integrate with Firebase Cloud Messaging (FCM) or OneSignal
        console.log(`[PUSH] To User ${userId}: ${title} - ${body}`, data);
    }
}
