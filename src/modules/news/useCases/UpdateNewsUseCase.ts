import { inject, injectable } from 'tsyringe';
import { INewsRepository, IUpdateNewsDTO } from '../repositories/INewsRepository';
import { AppError } from '../../../errors/AppError';

@injectable()
export class UpdateNewsUseCase {
    constructor(
        @inject('NewsRepository')
        private newsRepository: INewsRepository
    ) { }

    async execute(id: string, data: IUpdateNewsDTO) {
        const news = await this.newsRepository.findById(id);

        if (!news) {
            throw new AppError('News not found', 404);
        }

        return this.newsRepository.update(id, data);
    }
}
