import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateNewsUseCase } from '../useCases/CreateNewsUseCase';
import { ListNewsUseCase } from '../useCases/ListNewsUseCase';
import { ShowNewsUseCase } from '../useCases/ShowNewsUseCase';
import { UpdateNewsUseCase } from '../useCases/UpdateNewsUseCase';
import { DeleteNewsUseCase } from '../useCases/DeleteNewsUseCase';
import { DisableNewsUseCase } from '../useCases/DisableNewsUseCase';
import { GetNewsAnalyticsUseCase } from '../useCases/GetNewsAnalyticsUseCase';
import { createNewsSchema, listNewsSchema, updateNewsSchema } from '../schemas/news.schema';

export class NewsController {
    async index(req: Request, res: Response): Promise<Response> {
        const { page, limit, category, search } = listNewsSchema.parse(req.query);

        const listNewsUseCase = container.resolve(ListNewsUseCase);
        const result = await listNewsUseCase.execute(page, limit, category, search);

        return res.json(result);
    }

    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const showNewsUseCase = container.resolve(ShowNewsUseCase);
        const news = await showNewsUseCase.execute(id);
        return res.json(news);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const data = createNewsSchema.parse(req.body);

        // Handle file upload
        if (req.file) {
            data.imageUrl = req.file.filename;
        }

        const createNewsUseCase = container.resolve(CreateNewsUseCase);
        const news = await createNewsUseCase.execute(data);
        return res.status(201).json(news);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const data = updateNewsSchema.parse(req.body);

        // Handle file upload
        if (req.file) {
            data.imageUrl = req.file.filename;
        }

        const updateNewsUseCase = container.resolve(UpdateNewsUseCase);
        const news = await updateNewsUseCase.execute(id, data);
        return res.json(news);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const deleteNewsUseCase = container.resolve(DeleteNewsUseCase);
        await deleteNewsUseCase.execute(id);
        return res.status(204).send();
    }

    async disable(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const disableNewsUseCase = container.resolve(DisableNewsUseCase);
        await disableNewsUseCase.execute(id);
        return res.status(204).send();
    }

    async getAnalytics(req: Request, res: Response): Promise<Response> {
        const getNewsAnalyticsUseCase = container.resolve(GetNewsAnalyticsUseCase);
        const analytics = await getNewsAnalyticsUseCase.execute();
        return res.json(analytics);
    }
}
