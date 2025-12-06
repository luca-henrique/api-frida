import { z } from 'zod';

export const registerSchema = z
    .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
        cpf: z.string(),
        phone: z.string(),
        birthDate: z.string(),
        cep: z.string(),
        street: z.string(),
        number: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string().length(2),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string(),
});
