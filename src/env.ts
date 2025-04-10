import {API_URL as RAW_API_URL} from '@env';
import {z} from 'zod';

const EnvSchema = z.object({
  API_URL: z.string().url({
    message: 'API_URL must be a valid URL',
  }),
});

export const env = EnvSchema.parse({
  API_URL: RAW_API_URL,
});
