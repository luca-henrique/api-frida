import { inject, injectable } from 'tsyringe';
import { IRiskQuestionRepository } from '../repositories/IRiskQuestionRepository';

@injectable()
export class ListQuestionsUseCase {
    constructor(
        @inject('RiskQuestionRepository')
        private riskQuestionRepository: IRiskQuestionRepository
    ) { }

    async execute(page: number, limit: number, activeOnly: boolean = false) {
        const skip = (page - 1) * limit;
        const take = limit;

        const questions = await this.riskQuestionRepository.findAll(activeOnly, skip, take);
        const total = await this.riskQuestionRepository.count(activeOnly);

        return {
            data: questions,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
}
