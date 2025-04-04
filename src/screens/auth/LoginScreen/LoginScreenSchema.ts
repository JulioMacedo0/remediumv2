import {z} from 'zod';

export const loginScreenSchema = z.object({
  email: z.string().email('Email Inválido'),
  password: z.string().min(8, 'Senha deve conter no mínimo 8 caracteres'),
});

export type LoginScreenSchema = z.infer<typeof loginScreenSchema>;
