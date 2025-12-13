import { inject, injectable } from 'tsyringe';
import { IRiskAssessmentRepository } from '../repositories/IRiskAssessmentRepository';

@injectable()
export class ListAssessmentsUseCase {
    constructor(
        @inject('RiskAssessmentRepository')
        private riskAssessmentRepository: IRiskAssessmentRepository
    ) { }

    async execute(userId: string) {
        return this.riskAssessmentRepository.findManyByUserId(userId);
    }
}
