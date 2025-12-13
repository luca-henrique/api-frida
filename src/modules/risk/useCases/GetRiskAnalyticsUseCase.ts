import { injectable } from 'tsyringe';
import prisma from '../../../config/database';

@injectable()
export class GetRiskAnalyticsUseCase {
    async execute() {
        const totalAssessments = await prisma.riskAssessment.count();

        const byRiskLevel = await prisma.riskAssessment.groupBy({
            by: ['riskLevel'],
            _count: {
                riskLevel: true,
            },
        });

        const formattedRiskLevel = byRiskLevel.reduce((acc, curr) => {
            acc[curr.riskLevel] = curr._count.riskLevel;
            return acc;
        }, {} as Record<string, number>);

        return {
            totalAssessments,
            byRiskLevel: formattedRiskLevel,
        };
    }
}
