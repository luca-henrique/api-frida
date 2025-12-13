import { inject, injectable } from 'tsyringe';
import { IRiskQuestionRepository } from '../repositories/IRiskQuestionRepository';
import { AppError } from '../../../errors/AppError';
import { Prisma } from '@prisma/client';

@injectable()
export class UpdateQuestionUseCase {
    constructor(
        @inject('RiskQuestionRepository')
        private riskQuestionRepository: IRiskQuestionRepository
    ) { }

    async execute(id: string, data: Prisma.RiskQuestionUpdateInput) {
        const question = await this.riskQuestionRepository.update(id, data);
        return question;
    }
}
