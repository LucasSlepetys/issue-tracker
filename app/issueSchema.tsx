import { z } from 'zod';

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(63, 'Title cannot be above 63 characters'),
  description: z.string().min(5, 'Please provide a valid description'),
});
