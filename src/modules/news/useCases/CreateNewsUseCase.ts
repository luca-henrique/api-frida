import { inject, injectable } from 'tsyringe';
import { INewsRepository, ICreateNewsDTO } from '../repositories/INewsRepository';

@injectable()
export class CreateNewsUseCase {
    constructor(
        @inject('NewsRepository')
        private newsRepository: INewsRepository
    ) { }

    async execute(data: ICreateNewsDTO) {
        return this.newsRepository.create(data);
    }
}
