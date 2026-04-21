import z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is reqiured'),
});

export type LoginInput = z.infer<typeof loginSchema>;
