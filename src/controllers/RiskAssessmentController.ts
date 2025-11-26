import { Request, Response } from 'express';
import prisma from '../config/database';
import { z } from 'zod';

export class RiskAssessmentController {
    async create(req: Request, res: Response) {
        try {
            const schema = z.object({
                answers: z.array(z.number()),
            });

            const { answers } = schema.parse(req.body);
            const userId = req.userId;

            if (!userId) {
                return res.status(401).json({ error: 'User not authenticated' });
            }

            // Calculate risk logic (same as frontend)
            const totalScore = answers.reduce((a, b) => a + b, 0);
            let riskLevel = 'LOW';

            if (totalScore >= 3) {
                riskLevel = 'HIGH';
            } else if (totalScore >= 1) {
                riskLevel = 'MEDIUM';
            }

            const assessment = await prisma.riskAssessment.create({
                data: {
                    userId,
                    score: totalScore,
                    riskLevel,
                    answers: JSON.stringify(answers),
                },
            });

            return res.status(201).json(assessment);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.issues });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const userId = req.userId;

            const assessments = await prisma.riskAssessment.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });

            return res.json(assessments);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
