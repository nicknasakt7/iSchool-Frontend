import z from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.url(),
});

const clientResult = clientEnvSchema.safeParse(process.env);
if (!clientResult.success) {
  throw new Error(
    `Invalid client environment variables:\n${z.prettifyError(clientResult.error)}`,
  );
}

export const clientEnv = clientResult.data;
