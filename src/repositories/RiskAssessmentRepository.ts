import { injectable } from 'tsyringe';
import prisma from '../config/database';
import { Prisma, RiskAssessment } from '@prisma/client';

@injectable()
export class RiskAssessmentRepository {
    async create(data: Prisma.RiskAssessmentUncheckedCreateInput): Promise<RiskAssessment> {
        return prisma.riskAssessment.create({ data });
    }

    async findManyByUserId(userId: string): Promise<RiskAssessment[]> {
        return prisma.riskAssessment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
}
