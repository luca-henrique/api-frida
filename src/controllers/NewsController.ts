import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { NewsService } from '../services/NewsService';
import { createNewsSchema, updateNewsSchema } from '../schemas/news.schema';

@injectable()
export class NewsController {
    constructor(@inject(NewsService) private newsService: NewsService) { }

    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const category = req.query.category as string | undefined;

            const result = await this.newsService.list(page, limit, category);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.newsService.findById(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = createNewsSchema.parse(req.body);
            const result = await this.newsService.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = updateNewsSchema.parse(req.body);
            const result = await this.newsService.update(id, data);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.newsService.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };

    disable = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.newsService.disable(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
