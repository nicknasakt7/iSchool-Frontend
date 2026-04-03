import z from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.url(),
});

const clientResult = clientEnvSchema.safeParse(process.env);
if (!clientResult.success) {
  console.error(
    'Invalid client environment variables: \n',
    z.prettifyError(clientResult.error),
  );
  process.exit(1);
}
export const clientEnv = clientResult.data;
