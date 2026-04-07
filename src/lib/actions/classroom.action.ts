'use server';

import { api } from '../api/api-server';
import { ApiError } from '../api/api.error';
import {
  CreateClassroomPayload,
  UpdateClassroomPayload,
} from '../api/classroom/classroom.type';
import { revalidatePath } from 'next/cache';

type ActionResult = { error?: string };

const REVALIDATE_PATH =
  '/admin-managements/academic-setup/grade-architecture';

export const createClassroomAction = async (
  payload: CreateClassroomPayload,
): Promise<ActionResult> => {
  console.log('payload:', payload);
  try {
    const result = await api.post('/classrooms', payload);
    console.log('response:', result);
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};

export const updateClassroomAction = async (
  id: string,
  payload: UpdateClassroomPayload,
): Promise<ActionResult> => {
  console.log('payload:', payload);
  try {
    const result = await api.patch(`/classrooms/${id}`, payload);
    console.log('response:', result);
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};
