import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { z } from 'zod';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { injectable, inject } from 'tsyringe';
import { UserRepository } from '../repositories/UserRepository';

type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

@injectable()
export class AuthService {
    constructor(@inject(UserRepository) private userRepository: UserRepository) {}

    async register(data: RegisterData) {
        const existingUser = await this.userRepository.findByEmailOrCpf(data.email, data.cpf);

        if (existingUser) {
            throw new AppError('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.userRepository.create({
            ...data,
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
            expiresIn: '1d',
        });

        const { password: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }
}
