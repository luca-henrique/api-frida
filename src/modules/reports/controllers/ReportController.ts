import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateReportUseCase } from '../useCases/CreateReportUseCase';
import { ListReportsUseCase } from '../useCases/ListReportsUseCase';
import { UpdateReportStatusUseCase } from '../useCases/UpdateReportStatusUseCase';
import { ReportExportService } from '../services/ReportExportService';
import { createReportSchema, updateReportStatusSchema, listReportSchema } from '../schemas/report.schema';

export class ReportController {
    async create(req: Request, res: Response): Promise<Response> {
        const userId = req.userId; // Optional for anonymous reports
        const data = createReportSchema.parse(req.body);

        const createReportUseCase = container.resolve(CreateReportUseCase);
        const report = await createReportUseCase.execute({ ...data, userId });

        return res.status(201).json(report);
    }

    async list(req: Request, res: Response): Promise<Response> {
        const filters = listReportSchema.parse(req.query);
        const listReportsUseCase = container.resolve(ListReportsUseCase);
        const reports = await listReportsUseCase.execute(filters);
        return res.json(reports);
    }

    async updateStatus(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { status } = updateReportStatusSchema.parse(req.body);
        const userId = req.userId; // Assuming userId is populated by auth middleware

        const updateReportStatusUseCase = container.resolve(UpdateReportStatusUseCase);
        const report = await updateReportStatusUseCase.execute({ id, status }, userId);

        return res.json(report);
    }

    async export(req: Request, res: Response): Promise<Response> {
        const reportExportService = container.resolve(ReportExportService);
        const csvData = await reportExportService.execute();

        res.header('Content-Type', 'text/csv');
        res.attachment('reports.csv');
        return res.send(csvData);
    }
}
