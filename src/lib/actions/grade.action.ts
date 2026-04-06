'use server';

import { api } from '../api/api-server';
import { ApiError } from '../api/api.error';
import { CreateGradePayload, UpdateGradePayload } from '../api/grade/grade.type';
import { revalidatePath } from 'next/cache';

type ActionResult = { error?: string };

const REVALIDATE_PATH =
  '/admin-managements/academic-setup/grade-architecture';

export const createGradeAction = async (
  payload: CreateGradePayload,
): Promise<ActionResult> => {
  console.log('payload:', payload);
  try {
    const result = await api.post('/classrooms/grades', payload);
    console.log('response:', result);
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};

export const updateGradeAction = async (
  id: string,
  payload: UpdateGradePayload,
): Promise<ActionResult> => {
  console.log('payload:', payload);
  try {
    const result = await api.patch(`/classrooms/grades/${id}`, payload);
    console.log('response:', result);
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};
