import { z } from 'zod';

export const createNewsSchema = z.object({
    title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
    date: z.string().transform((str) => new Date(str)),
    category: z.enum(['Legislação', 'Segurança', 'Comunidade', 'Todos']),
    content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
    imageUrl: z.string().optional(),
});

export const updateNewsSchema = createNewsSchema.partial();
