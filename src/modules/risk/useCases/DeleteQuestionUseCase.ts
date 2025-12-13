import { inject, injectable } from 'tsyringe';
import { IRiskQuestionRepository } from '../repositories/IRiskQuestionRepository';

@injectable()
export class DeleteQuestionUseCase {
    constructor(
        @inject('RiskQuestionRepository')
        private riskQuestionRepository: IRiskQuestionRepository
    ) { }

    async execute(id: string) {
        await this.riskQuestionRepository.delete(id);
    }
}
