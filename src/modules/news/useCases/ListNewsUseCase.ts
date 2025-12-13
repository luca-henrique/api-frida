import { inject, injectable } from 'tsyringe';
import { INewsRepository } from '../repositories/INewsRepository';
import redis from '../../../config/redis';

@injectable()
export class ListNewsUseCase {
    constructor(
        @inject('NewsRepository')
        private newsRepository: INewsRepository
    ) { }

    async execute(page: number, limit: number, category?: string, search?: string) {
        // Cache only first page of main feed (no category/search)
        const canCache = page === 1 && !category && !search;
        const cacheKey = 'news:feed:page1';

        if (canCache) {
            const cached = await redis.get(cacheKey);
            if (cached) {
                return JSON.parse(cached);
            }
        }

        const { data, total } = await this.newsRepository.list(page, limit, category, search);

        const result = {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };

        if (canCache) {
            await redis.set(cacheKey, JSON.stringify(result), 'EX', 60 * 5); // Cache for 5 minutes
        }

        return result;
    }
}
