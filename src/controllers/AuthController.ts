import { Request, Response } from 'express';
import prisma from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const registerSchema = z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string().min(6),
                cpf: z.string(), // Add validation regex if needed
                phone: z.string().optional(),
            });

            const data = registerSchema.parse(req.body);

            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ email: data.email }, { cpf: data.cpf }],
                },
            });

            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            const user = await prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword,
                },
            });

            const { password, ...userWithoutPassword } = user;

            return res.status(201).json(userWithoutPassword);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.issues });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const loginSchema = z.object({
                email: z.string().email(),
                password: z.string(),
            });

            const { email, password } = loginSchema.parse(req.body);

            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
                expiresIn: '1d',
            });

            const { password: _, ...userWithoutPassword } = user;

            return res.json({ user: userWithoutPassword, token });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.issues });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
