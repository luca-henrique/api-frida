import { injectable } from 'tsyringe';
import prisma from '../../../config/database';
import { RiskQuestion, Prisma } from '@prisma/client';
import { IRiskQuestionRepository } from './IRiskQuestionRepository';

@injectable()
export class RiskQuestionRepository implements IRiskQuestionRepository {
    async create(data: Prisma.RiskQuestionCreateInput): Promise<RiskQuestion> {
        return prisma.riskQuestion.create({ data });
    }

    async findAll(
        activeOnly: boolean = false,
        skip?: number,
        take?: number
    ): Promise<RiskQuestion[]> {
        return prisma.riskQuestion.findMany({
            where: activeOnly ? { active: true } : {},
            orderBy: { order: 'asc' },
            skip,
            take,
        });
    }

    async findByOrder(order: number): Promise<RiskQuestion | null> {
        return prisma.riskQuestion.findFirst({
            where: { order },
        });
    }

    async count(activeOnly: boolean = false): Promise<number> {
        return prisma.riskQuestion.count({
            where: activeOnly ? { active: true } : {},
        });
    }

    async update(id: string, data: Prisma.RiskQuestionUpdateInput): Promise<RiskQuestion> {
        return prisma.riskQuestion.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<RiskQuestion> {
        return prisma.riskQuestion.delete({
            where: { id },
        });
    }
}
