'use server';

import { api } from '../api/api-server';
import { ApiError } from '../api/api.error';
import { revalidatePath } from 'next/cache';

type ActionResult = { error?: string };

const REVALIDATE_PATH =
  '/admin-managements/academic-setup/create-subject';

export const createManySubjectsAction = async (
  subjects: { name: string }[],
): Promise<ActionResult> => {
  try {
    await api.post('/subjects/many', { subjects });
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};

export const updateSubjectAction = async (
  id: string,
  name: string,
): Promise<ActionResult> => {
  try {
    await api.patch(`/subjects/${id}`, { name });
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};

export const deleteSubjectAction = async (
  id: string,
): Promise<ActionResult> => {
  try {
    await api.delete(`/subjects/${id}`);
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};
