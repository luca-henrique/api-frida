import { injectable } from 'tsyringe';
import prisma from '../config/database';

@injectable()
export class NewsService {
    async list(page: number, limit: number, category?: string) {
        const skip = (page - 1) * limit;
        const where: any = { active: true };
        if (category && category !== 'Todos') {
            where.category = category;
        }

        const [news, total] = await Promise.all([
            prisma.news.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    date: 'desc',
                },
            }),
            prisma.news.count({ where }),
        ]);

        return {
            data: news,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findById(id: string) {
        const news = await prisma.news.findUnique({
            where: { id },
        });

        if (!news) {
            throw new Error('News not found');
        }

        return news;
    }

    async create(data: any) {
        return prisma.news.create({
            data,
        });
    }

    async update(id: string, data: any) {
        await this.findById(id);
        return prisma.news.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        await this.findById(id);
        return prisma.news.delete({
            where: { id },
        });
    }

    async disable(id: string) {
        await this.findById(id);
        return prisma.news.update({
            where: { id },
            data: { active: false },
        });
    }
}
