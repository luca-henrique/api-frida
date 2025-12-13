import { inject, injectable } from 'tsyringe';
import { INewsRepository } from '../repositories/INewsRepository';
import { AppError } from '../../../errors/AppError';

@injectable()
export class ShowNewsUseCase {
    constructor(
        @inject('NewsRepository')
        private newsRepository: INewsRepository
    ) { }

    async execute(id: string) {
        const news = await this.newsRepository.findById(id);

        if (!news) {
            throw new AppError('News not found', 404);
        }

        // Fire and forget increment to not block response
        this.newsRepository.incrementViews(id).catch(console.error);

        return news;
    }
}
