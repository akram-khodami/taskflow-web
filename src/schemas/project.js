import { z } from 'zod';

export const projectSchema = z.object({
    name: z
        .string()
        .min(1, 'Project name is required.')
        .max(255, 'Project name must not exceed 255 characters.'),

    description: z
        .string()
        .max(1000, 'Description must not exceed 1000 characters.')
        .optional(),

    members: z
        .array(z.number())
        .optional(),
});