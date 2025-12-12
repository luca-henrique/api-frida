import { Request, Response, NextFunction } from 'express';
import { RiskAssessmentService } from '../services/RiskAssessmentService';
import { z } from 'zod';

import { injectable, inject } from 'tsyringe';

@injectable()
export class RiskAssessmentController {
  constructor(@inject(RiskAssessmentService) private riskService: RiskAssessmentService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        answers: z.array(
          z.object({
            questionId: z.string(),
            value: z.number(),
          }),
        ),
      });

      const { answers } = schema.parse(req.body);
      const userId = req.userId!;

      const assessment = await this.riskService.create(userId, answers);
      res.status(201).json(assessment);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId || (req.query.userId as string);

      if (!userId) {
        throw new Error('User ID is required');
      }

      const assessments = await this.riskService.list(userId);
      res.json(assessments);
    } catch (error) {
      next(error);
    }
  };

  showLatest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId!;
      const assessment = await this.riskService.getLatest(userId);
      res.json(assessment);
    } catch (error) {
      next(error);
    }
  };
}
