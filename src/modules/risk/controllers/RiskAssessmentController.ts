import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAssessmentUseCase } from '../useCases/CreateAssessmentUseCase';
import { ListAssessmentsUseCase } from '../useCases/ListAssessmentsUseCase';
import { ShowLatestAssessmentUseCase } from '../useCases/ShowLatestAssessmentUseCase';
import { createAssessmentSchema } from '../schemas/risk.schema';
import { GetRiskAnalyticsUseCase } from '../useCases/GetRiskAnalyticsUseCase';
import { GetDashboardStatsUseCase } from '../useCases/GetDashboardStatsUseCase';

export class RiskAssessmentController {
    async create(req: Request, res: Response): Promise<Response> {
        const { answers } = createAssessmentSchema.parse(req.body);
        const userId = req.userId!;

        const createAssessmentUseCase = container.resolve(CreateAssessmentUseCase);

        const assessment = await createAssessmentUseCase.execute(userId, answers);

        return res.status(201).json(assessment);
    }

    async list(req: Request, res: Response): Promise<Response> {
        const userId = req.userId!;

        const listAssessmentsUseCase = container.resolve(ListAssessmentsUseCase);

        const assessments = await listAssessmentsUseCase.execute(userId);

        return res.json(assessments);
    }

    async showLatest(req: Request, res: Response): Promise<Response> {
        const userId = req.userId!;

        const showLatestAssessmentUseCase = container.resolve(ShowLatestAssessmentUseCase);

        const assessment = await showLatestAssessmentUseCase.execute(userId);

        return res.json(assessment);
    }

    async getAnalytics(req: Request, res: Response): Promise<Response> {
        const getRiskAnalyticsUseCase = container.resolve(GetRiskAnalyticsUseCase);
        const analytics = await getRiskAnalyticsUseCase.execute();
        return res.json(analytics);
    }

    async getDashboard(req: Request, res: Response): Promise<Response> {
        const getDashboardStatsUseCase = container.resolve(GetDashboardStatsUseCase);
        const stats = await getDashboardStatsUseCase.execute();
        return res.json(stats);
    }
}

