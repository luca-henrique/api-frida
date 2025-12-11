import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export async function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return next();
    }

    const [, token] = authorization.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const { id } = decoded as TokenPayload;

        req.userId = id;

        return next();
    } catch (_error) {
        // Se o token for inválido, apenas seguimos sem setar o userId
        // Ou poderíamos retornar erro?
        // Para "optional", geralmente ignoramos erro de token e tratamos como não autenticado.
        return next();
    }
}
