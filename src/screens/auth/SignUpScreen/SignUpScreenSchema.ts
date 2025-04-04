import {z} from 'zod';

export const signUpScreenSchema = z.object({
  username: z
    .string()
    .min(3, 'Nome de usuário deve conter no mínimo 3 caracteres'),
  email: z.string().email('Email Inválido'),
  password: z.string().min(8, 'Senha deve conter no mínimo 8 caracteres'),
});

export type SignUpScreenSchema = z.infer<typeof signUpScreenSchema>;
