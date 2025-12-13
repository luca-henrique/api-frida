import { z } from 'zod';
import { Role } from '@prisma/client';
import { validateCPF } from '../../../shared/utils/cpfValidator';

export const createUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
  cpf: z.string().refine((cpf) => validateCPF(cpf), {
    message: 'Invalid CPF',
  }),
  role: z.nativeEnum(Role).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[\W_]/)
    .optional(),
  cpf: z
    .string()
    .refine((cpf) => validateCPF(cpf), {
      message: 'Invalid CPF',
    })
    .optional(),
  role: z.nativeEnum(Role).optional(),
});
