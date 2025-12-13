import { inject, injectable } from 'tsyringe';
import { IRiskAssessmentRepository } from '../repositories/IRiskAssessmentRepository';
import { IUserRepository } from '../../users/repositories/IUserRepository';

const ANSWER_VALUES = {
    NAO: 0,
    SIM: 1,
    NAO_SABE: 2,
    NAO_SE_APLICA: 3,
};

@injectable()
export class CreateAssessmentUseCase {
    constructor(
        @inject('RiskAssessmentRepository')
        private riskAssessmentRepository: IRiskAssessmentRepository,
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) { }

    private calculateRiskLevel(answers: { questionId: string; value: number }[]): {
        riskLevel: string;
        score: number;
    } {
        const countSim = answers.filter((a) => a.value === ANSWER_VALUES.SIM).length;
        const countNao = answers.filter((a) => a.value === ANSWER_VALUES.NAO).length;
        const countNsNa = answers.filter(
            (a) => a.value === ANSWER_VALUES.NAO_SABE || a.value === ANSWER_VALUES.NAO_SE_APLICA
        ).length;

        const validAnswers = countSim + countNao;
        let riskLevel = 'LOW';

        if (countSim >= 10) {
            return { riskLevel: 'HIGH', score: countSim };
        }

        if (countNsNa >= 10) {
            return { riskLevel: 'MEDIUM', score: countSim };
        }

        if (validAnswers > 0) {
            const percentage = countSim / validAnswers;

            if (percentage >= 0.5) {
                riskLevel = 'HIGH';
            } else if (percentage >= 0.25) {
                riskLevel = 'MEDIUM';
            } else {
                riskLevel = 'LOW';
            }
        } else {
            riskLevel = 'LOW';
        }

        return { riskLevel, score: countSim };
    }

    async execute(userId: string, answers: { questionId: string; value: number }[]) {
        // Deduplicate answers, keeping the last one
        const uniqueAnswersMap = new Map<string, { questionId: string; value: number }>();
        answers.forEach((a) => uniqueAnswersMap.set(a.questionId, a));
        const uniqueAnswers = Array.from(uniqueAnswersMap.values());

        const { riskLevel, score } = this.calculateRiskLevel(uniqueAnswers);

        // Update user risk level
        const userExists = await this.userRepository.findById(userId);
        if (userExists) {
            await this.userRepository.update(userId, { riskLevel });
        }

        // Check for existing assessment
        const existingAssessment = await this.riskAssessmentRepository.findLatestByUserId(userId);

        if (existingAssessment) {
            return this.riskAssessmentRepository.update(existingAssessment.id, {
                score,
                riskLevel,
                answers: uniqueAnswers,
            });
        }

        return this.riskAssessmentRepository.create({
            userId,
            score,
            riskLevel,
            answers: uniqueAnswers,
        });
    }
}
