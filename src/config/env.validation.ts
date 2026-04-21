import z from 'zod';

const serverEnvSchema = z.object({
  AUTH_SECRET: z.string().min(32),
  GEMINI_API_KEY: z.string().min(1),
});

const serverResult = serverEnvSchema.safeParse(process.env);
if (!serverResult.success) {
  console.error(
    'Invalid server environment variables:\n',
    z.prettifyError(serverResult.error),
  );
  process.exit(1);
}

export const serverEnv = serverResult.data;
