import { inject, injectable } from 'tsyringe';
import { IRiskQuestionRepository } from '../repositories/IRiskQuestionRepository';
import { AppError } from '../../../errors/AppError';
import { Prisma } from '@prisma/client';

@injectable()
export class CreateQuestionUseCase {
    constructor(
        @inject('RiskQuestionRepository')
        private riskQuestionRepository: IRiskQuestionRepository
    ) { }

    async execute(data: Prisma.RiskQuestionCreateInput) {
        const questionWithSameOrder = await this.riskQuestionRepository.findByOrder(data.order);

        if (questionWithSameOrder) {
            throw new AppError('A question with this order already exists');
        }

        const question = await this.riskQuestionRepository.create(data);

        return question;
    }
}
