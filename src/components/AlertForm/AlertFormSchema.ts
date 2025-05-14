import {z} from 'zod';
import {DAYS_OF_WEEK, ALERT_TYPES} from '../../services/alert/alertTypes';

const baseAlertSchema = {
  title: z.string().min(1, 'Nome do remédio é obrigatório'),
  subtitle: z.string().min(1, 'Dosagem é obrigatória'),
  body: z.string().min(1, 'Instruções é obrigatório'),
  alertType: z.enum(ALERT_TYPES),
};

export const createAlertSchema = z
  .object({
    ...baseAlertSchema,
    interval: z.object({
      hours: z.number().default(0),
      minutes: z.number().default(0),
      seconds: z.number().default(0),
    }),
    date: z.string().optional(),
    week: z.array(z.enum(DAYS_OF_WEEK)).optional(),
  })
  .refine(
    data => {
      if (data.alertType === 'INTERVAL') {
        return data.interval.hours > 0 || data.interval.minutes > 0;
      }
      return true;
    },
    {
      message:
        'Para alertas de intervalo, horas ou minutos devem ser maiores que 0',
      path: ['interval'],
    },
  )
  .refine(
    data => {
      if (data.alertType === 'DAILY' || data.alertType === 'WEEKLY') {
        return !!data.date;
      }
      return true;
    },
    {
      message: 'Horário é obrigatório para este tipo de alerta',
      path: ['date'],
    },
  )
  .refine(
    data => {
      if (data.alertType === 'WEEKLY') {
        return Array.isArray(data.week) && data.week.length > 0;
      }
      return true;
    },
    {
      message: 'Selecione pelo menos um dia da semana',
      path: ['week'],
    },
  )
  .refine(
    data => {
      if (data.alertType === 'DATE') {
        return !!data.date;
      }
      return true;
    },
    {
      message: 'Data e hora são obrigatórias para este tipo de alerta',
      path: ['date'],
    },
  );

export type CreateAlertForm = z.infer<typeof createAlertSchema>;
