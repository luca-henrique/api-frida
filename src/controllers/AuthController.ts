import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

import { injectable, inject } from 'tsyringe';

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = registerSchema.parse(req.body);
            const user = await this.authService.register(data);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = loginSchema.parse(req.body);
            const result = await this.authService.login(data);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };
}
