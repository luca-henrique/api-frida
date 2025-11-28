import { injectable, inject } from 'tsyringe';
import { RiskAssessmentRepository } from '../repositories/RiskAssessmentRepository';

@injectable()
export class RiskAssessmentService {
    constructor(
        @inject(RiskAssessmentRepository) private riskRepository: RiskAssessmentRepository,
    ) {}

    async create(userId: string, answers: number[]) {
        const totalScore = answers.reduce((a, b) => a + b, 0);
        let riskLevel = 'LOW';

        if (totalScore >= 3) {
            riskLevel = 'HIGH';
        } else if (totalScore >= 1) {
            riskLevel = 'MEDIUM';
        }

        return this.riskRepository.create({
            userId,
            score: totalScore,
            riskLevel,
            answers: JSON.stringify(answers),
        });
    }

    async list(userId: string) {
        return this.riskRepository.findManyByUserId(userId);
    }
}
