import {z} from 'zod';

export const createAlertSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  body: z.string().min(1),
  alertType: z.enum(['INTERVAL', 'DAILY', 'WEEKLY', 'DATE']),
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
  date: z.string().optional(),
  week: z
    .array(
      z.enum([
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ]),
    )
    .optional(),
});

export type CreateAlertForm = z.infer<typeof createAlertSchema>;
