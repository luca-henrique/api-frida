import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { RiskQuestionService } from '../services/RiskQuestionService';
import { z } from 'zod';

@injectable()
export class RiskQuestionController {
  constructor(@inject(RiskQuestionService) private service: RiskQuestionService) {}

  // GET /risk/questions (Para o APP - Lista apenas ativas)
  indexActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? Number(req.query.page) : undefined;
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const result = await this.service.list(true, page, limit);
      res.json(result.data);
    } catch (error) {
      next(error);
    }
  };

  // GET /risk/questions/all (Para o Dashboard - Lista todas)
  indexAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? Number(req.query.page) : undefined;
      const limit = req.query.limit ? Number(req.query.limit) : undefined;

      const result = await this.service.list(false, page, limit);

      if (!page && !limit) {
        return res.json(result.data);
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // POST /risk/questions (Dashboard)
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = z.object({
        text: z.string(),
        order: z.number(),
      });
      const data = schema.parse(req.body);
      const question = await this.service.create(data);
      res.status(201).json(question);
    } catch (error) {
      next(error);
    }
  };

  // PUT /risk/questions/:id (Dashboard)
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const schema = z.object({
        text: z.string().optional(),
        order: z.number().optional(),
        active: z.boolean().optional(),
      });
      const data = schema.parse(req.body);
      const question = await this.service.update(id, data);
      res.json(question);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /risk/questions/:id (Dashboard)
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
