import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { Role } from '@prisma/client';
import { container } from 'tsyringe';
import { IUserRepository } from '../modules/users/repositories/IUserRepository';

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    const { userId } = req;

    if (!userId) {
        throw new AppError('User not authenticated', 401);
    }

    const userRepository = container.resolve<IUserRepository>('UserRepository');
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Assuming GOV role is the admin for Risk module management
    if (user.role !== Role.GOV) {
        throw new AppError('Access denied. Admin privileges required.', 403);
    }

    return next();
}
