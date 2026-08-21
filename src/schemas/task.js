import { z } from 'zod';

const statuses = [
    'backlog',
    'in_progress',
    'in_review',
    'done',
];

const priorities = [
    'low',
    'medium',
    'high',
    'urgent',
];

export const taskSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(255, 'Title must not exceed 255 characters'),

    description: z
        .string()
        .max(2000, 'Description must not exceed 2000 characters')
        .optional()
        .or(z.literal('')),

    status: z.enum(statuses),

    priority: z.enum(priorities),

    due_date: z
        .string()
        .optional()
        .or(z.literal('')),

    assignee_id: z
        .string()
        .optional()
        .or(z.literal('')),
});