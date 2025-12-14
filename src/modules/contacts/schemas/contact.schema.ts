import { z } from 'zod';

export const createContactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    number: z.string().min(8, 'Phone number must have at least 8 digits'),
    relation: z.string().optional(),
});
