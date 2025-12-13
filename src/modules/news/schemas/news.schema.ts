import { z } from 'zod';

export const createNewsSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    category: z.string().min(1, 'Category is required'),
    content: z.string().min(1, 'Content is required'),
    imageUrl: z.string().optional(),
    date: z.coerce.date().default(() => new Date()),
    publishAt: z.coerce.date().optional(),
});

export const updateNewsSchema = z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    content: z.string().optional(),
    imageUrl: z.string().optional(),
    active: z.boolean().optional(),
    publishAt: z.coerce.date().optional(),
});

export const listNewsSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    category: z.string().optional(),
    search: z.string().optional(),
});
