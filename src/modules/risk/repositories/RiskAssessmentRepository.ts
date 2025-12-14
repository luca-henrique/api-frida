import { injectable } from 'tsyringe';
import prisma from '../../../config/database';
import { RiskAssessment } from '@prisma/client';
import { ICreateAssessmentData, IRiskAssessmentRepository, IUpdateAssessmentData } from './IRiskAssessmentRepository';

@injectable()
export class RiskAssessmentRepository implements IRiskAssessmentRepository {
    async create(data: ICreateAssessmentData): Promise<RiskAssessment> {
        return prisma.riskAssessment.create({
            data: {
                userId: data.userId,
                score: data.score,
                riskLevel: data.riskLevel,
                answers: {
                    create: data.answers.map((a) => ({
                        questionId: a.questionId,
                        value: a.value,
                    })),
                },
            },
            include: {
                answers: true,
            },
        });
    }

    async findManyByUserId(userId: string): Promise<RiskAssessment[]> {
        return prisma.riskAssessment.findMany({
            where: { userId },
            include: {
                answers: {
                    include: { question: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findLatestByUserId(userId: string): Promise<RiskAssessment | null> {
        return prisma.riskAssessment.findFirst({
            where: { userId },
            include: {
                answers: {
                    include: { question: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async update(id: string, data: IUpdateAssessmentData): Promise<RiskAssessment> {
        return prisma.$transaction(async (tx) => {
            // 1. Delete old answers
            await tx.riskAssessmentAnswer.deleteMany({
                where: { assessmentId: id },
            });

            // 2. Update assessment and create new answers
            return tx.riskAssessment.update({
                where: { id },
                data: {
                    score: data.score,
                    riskLevel: data.riskLevel,
                    answers: {
                        create: data.answers.map((a) => ({
                            questionId: a.questionId,
                            value: a.value,
                        })),
                    },
                },
                include: {
                    answers: true,
                },
            });
        });
    }
    async countAssessmentsToday(): Promise<number> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return prisma.riskAssessment.count({
            where: {
                createdAt: {
                    gte: today,
                },
            },
        });
    }

    async countByRiskLevel(): Promise<{ riskLevel: string; count: number }[]> {
        const result = await prisma.riskAssessment.groupBy({
            by: ['riskLevel'],
            _count: {
                riskLevel: true,
            },
        });

        return result.map((item) => ({
            riskLevel: item.riskLevel,
            count: item._count.riskLevel,
        }));
    }
}
