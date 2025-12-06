import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { UserService } from '../services/UserService';
import { Role } from '@prisma/client';

@injectable()
export class UserController {
    constructor(@inject(UserService) private userService: UserService) { }

    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const role = req.query.role as Role | undefined;
            const type = req.query.type as 'COMMON' | 'SYSTEM' | undefined;

            const result = await this.userService.list(page, limit, role, type);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.userService.show(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await this.userService.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await this.userService.update(id, data);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.userService.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
