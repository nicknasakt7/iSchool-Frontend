import { User } from '@/lib/api/user/user.type';
import { api } from '../api-server';

const login = (input: unknown) =>
  api.post<{ accessToken: string; user: User; expiresIn: number }>(
    '/auth/login',
    input,
  );

export const authService = { login };
