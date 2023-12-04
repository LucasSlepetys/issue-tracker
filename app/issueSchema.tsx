import { z } from 'zod';

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(63, 'Title cannot be above 63 characters'),
  description: z.string().min(5, 'Please provide a valid description'),
});

export const updateIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(63, 'Title cannot be above 63 characters')
    .optional(),
  description: z
    .string()
    .min(5, 'Please provide a valid description')
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'Please provide a user')
    .max(255)
    .optional()
    .nullable(),
});
