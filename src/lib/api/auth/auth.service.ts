import { api } from '@/lib/api/client';
import { User } from '@/lib/api/user/user.type';


const login = (input: unknown) =>
  api.post<{ accessToken: string; user: User; expiresIn: number }>(
    '/auth/login',
    input
  );

export const authService = { login };
