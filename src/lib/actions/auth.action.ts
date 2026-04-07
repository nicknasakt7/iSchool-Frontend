'use server';

import { ActionResult } from '@/lib/actions/action.type';
import { signIn, signOut } from '@/lib/auth/auth';
import { LoginInput } from '@/lib/schemas/auth.schema';

export const login = async (input: LoginInput): Promise<ActionResult> => {
  try {
    await signIn('credentials', { ...input, redirect: false });
  } catch {
    return { success: false, code: 'INVALID_CREDENTIALS' };
  }
  return { success: true };
};

export const logout = async () => {
  await signOut({ redirectTo: '/' });
};
