import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { z } from 'zod';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { injectable, inject } from 'tsyringe';
import { UserRepository } from '../repositories/UserRepository';

type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

import { v4 as uuidv4 } from 'uuid';
import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository';
import dayjs from 'dayjs';

@injectable()
export class AuthService {
    constructor(
        @inject(UserRepository) private userRepository: UserRepository,
        @inject(RefreshTokenRepository) private refreshTokenRepository: RefreshTokenRepository,
    ) { }

    async register(data: RegisterData) {
        const existingUser = await this.userRepository.findByEmailOrCpf(data.email, data.cpf);

        if (existingUser) {
            throw new AppError('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const { confirmPassword: _, ...userData } = data;

        const user = await this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });

        const { password: _password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    async login({ email, password }: LoginData) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new AppError('Invalid credentials', 401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '15m', // Short-lived access token
        });

        await this.refreshTokenRepository.deleteByUserId(user.id);

        const refreshTokenExpiresIn = dayjs().add(1, 'day').unix();
        const refreshToken = await this.refreshTokenRepository.create(
            user.id,
            uuidv4(),
            refreshTokenExpiresIn,
        );

        const { password: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token, refreshToken: refreshToken.token };
    }

    async refreshToken(token: string) {
        const refreshToken = await this.refreshTokenRepository.findByToken(token);

        if (!refreshToken) {
            throw new AppError('Refresh token invalid', 401);
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        if (refreshTokenExpired) {
            await this.refreshTokenRepository.deleteByUserId(refreshToken.userId);
            throw new AppError('Refresh token expired', 401);
        }

        const tokenNew = jwt.sign({ id: refreshToken.userId }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '15m',
        });

        return { token: tokenNew };
    }
}
