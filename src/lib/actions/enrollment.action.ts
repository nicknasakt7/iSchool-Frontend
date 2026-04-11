'use server';

import { api } from '../api/api-server';
import { ApiError } from '../api/api.error';
import { BulkPromotePayload, PromoteResult } from '../api/enrollment/enrollment.type';

type ActionResult<T = void> = { data?: T; error?: string };

export const promoteStudentsAction = async (
  payload: BulkPromotePayload,
): Promise<ActionResult<PromoteResult>> => {
  try {
    const data = await api.post<PromoteResult>('/enrollments/promote', payload);
    return { data };
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' };
  }
};
