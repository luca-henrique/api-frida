import { inject, injectable } from 'tsyringe';
import { IRiskAssessmentRepository } from '../repositories/IRiskAssessmentRepository';
import redis from '../../../config/redis';

@injectable()
export class ShowLatestAssessmentUseCase {
    constructor(
        @inject('RiskAssessmentRepository')
        private riskAssessmentRepository: IRiskAssessmentRepository
    ) { }

    async execute(userId: string) {
        const cacheKey = `risk:latest:${userId}`;
        const cached = await redis.get(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }

        const assessment = await this.riskAssessmentRepository.findLatestByUserId(userId);

        if (assessment) {
            // Cache for 1 hour
            await redis.set(cacheKey, JSON.stringify(assessment), 'EX', 3600);
        }

        return assessment;
    }
}
