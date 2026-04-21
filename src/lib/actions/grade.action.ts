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
  try {
    await api.post('/classrooms/grades', payload);
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
  try {
    await api.patch(`/classrooms/grades/${id}`, payload);
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};
