import { injectable } from 'tsyringe';
import prisma from '../../../config/database';

@injectable()
export class GetNewsAnalyticsUseCase {
    async execute() {
        // Top 5 most viewed news
        const topViewed = await prisma.news.findMany({
            where: { active: true },
            orderBy: { views: 'desc' },
            take: 5,
            select: {
                id: true,
                title: true,
                views: true,
                category: true,
            },
        });

        return {
            topViewed,
        };
    }
}
