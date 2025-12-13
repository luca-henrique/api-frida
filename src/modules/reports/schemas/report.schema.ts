import { z } from 'zod';

export const createReportSchema = z.object({
    type: z.enum(['PHYSICAL', 'PSYCHOLOGICAL', 'EMERGENCY']),
    description: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    neighborhood: z.string().optional(),
    delegacia: z.string().optional(),
    mediaUrl: z.string().optional(),
    mediaType: z.enum(['IMAGE', 'VIDEO', 'AUDIO']).optional(),
});

export const updateReportStatusSchema = z.object({
    status: z.enum(['PENDING', 'PROCESSING', 'RESOLVED']),
});

export const listReportSchema = z.object({
    status: z.string().optional(),
    type: z.string().optional(),
    startDate: z.string().transform((str) => new Date(str)).optional(),
    endDate: z.string().transform((str) => new Date(str)).optional(),
});
