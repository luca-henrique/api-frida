import { z } from 'zod';

export const createQuestionSchema = z.object({
    text: z.string().min(1, 'Question text is required'),
    description: z.string().optional(),
    order: z.number().int().positive('Order must be a positive integer'),
    active: z.boolean().optional(),
    version: z.number().int().positive().optional(),
});

export const updateQuestionSchema = z.object({
    text: z.string().optional(),
    description: z.string().optional(),
    order: z.number().int().positive().optional(),
    active: z.boolean().optional(),
    version: z.number().int().positive().optional(),
});

export const listQuestionsSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(100),
    activeOnly: z.enum(['true', 'false']).optional(),
});

export const createAssessmentSchema = z.object({
    answers: z.array(
        z.object({
            questionId: z.string().uuid(),
            value: z.number().int().min(0).max(3), // 0-3 range for answers
        })
    ).min(1, 'At least one answer is required'),
});
