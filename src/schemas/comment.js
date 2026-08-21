import { z } from 'zod';

export const commentSchema = z.object({
    body: z
        .string()
        .min(1, 'Comment is required')
        .max(5000, 'Comment must not exceed 5000 characters'),

    parent_id: z
        .string()
        .optional()
        .or(z.literal('')),
});