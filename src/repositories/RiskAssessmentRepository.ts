import { injectable } from 'tsyringe';
import prisma from '../config/database';
import { Prisma, RiskAssessment } from '@prisma/client';

@injectable()
export class RiskAssessmentRepository {
    async create(data: {
        userId: string;
        score: number;
        riskLevel: string;
        answers: { questionId: string; value: number }[];
    }): Promise<RiskAssessment> {
        return prisma.riskAssessment.create({
            data: {
                userId: data.userId,
                score: data.score,
                riskLevel: data.riskLevel,
                // A mágica do Prisma: cria o Assessment E as Respostas tudo junto
                answers: {
                    create: data.answers.map((a) => ({
                        questionId: a.questionId,
                        value: a.value,
                    })),
                },
            },
            include: {
                answers: true, // Retorna as respostas salvas
            },
        });
    }

    async findManyByUserId(userId: string): Promise<RiskAssessment[]> {
        return prisma.riskAssessment.findMany({
            where: { userId },
            include: {
                answers: {
                    include: { question: true }, // Traz o texto da pergunta junto!
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

    async update(
        id: string,
        data: {
            score: number;
            riskLevel: string;
            answers: { questionId: string; value: number }[];
        },
    ): Promise<RiskAssessment> {
        return prisma.$transaction(async (tx) => {
            // 1. Deleta respostas antigas
            await tx.riskAssessmentAnswer.deleteMany({
                where: { assessmentId: id },
            });

            // 2. Atualiza o assessment e cria novas respostas
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
}
