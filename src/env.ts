import {
  API_URL as RAW_API_URL,
  ONE_SIGNAL_APP_ID as ENV_ONE_SIGNAL_APP_ID,
} from '@env';
import {z} from 'zod';

const EnvSchema = z.object({
  API_URL: z.string().url({
    message: 'API_URL must be a valid URL',
  }),
  ONE_SIGNAL_APP_ID: z.string(),
});

export const env = EnvSchema.parse({
  API_URL: RAW_API_URL,
  ONE_SIGNAL_APP_ID: ENV_ONE_SIGNAL_APP_ID,
});
