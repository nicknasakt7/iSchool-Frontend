'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth/auth';
import { leadClientService } from '@/lib/api/lead/lead.service';

async function getToken() {
  const session = await auth();
  return session?.user?.accessToken ?? '';
}

export async function updateLeadStatusAction(id: string, status: string) {
  try {
    const token = await getToken();
    await leadClientService.updateStatus(id, status, token);
    revalidatePath('/admin-managements/enrollments');
    return { error: undefined };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'เกิดข้อผิดพลาด' };
  }
}

export async function deleteLeadAction(id: string) {
  try {
    const token = await getToken();
    await leadClientService.deleteLead(id, token);
    revalidatePath('/admin-managements/enrollments');
    return { error: undefined };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : 'เกิดข้อผิดพลาด' };
  }
}
