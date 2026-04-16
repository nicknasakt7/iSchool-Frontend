'use server';

import { api } from '../api/api-server';
import { ApiError } from '../api/api.error';
import {
  CreateClassroomPayload,
  UpdateClassroomPayload,
} from '../api/classroom/classroom.type';

type CreateManyPayload = { classrooms: CreateClassroomPayload[] };
import { revalidatePath } from 'next/cache';

type ActionResult = { error?: string };

const REVALIDATE_PATH =
  '/admin-managements/academic-setup/grade-architecture';

export const createClassroomAction = async (
  payload: CreateClassroomPayload,
): Promise<ActionResult> => {
  try {
    await api.post('/classrooms', payload);
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};

export const createManyClassroomsAction = async (
  payload: CreateManyPayload,
): Promise<ActionResult> => {
  try {
    await api.post('/classrooms/many', payload);
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
  try {
    await api.patch(`/classrooms/${id}`, payload);
    revalidatePath(REVALIDATE_PATH);
    return {};
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: 'Something went wrong' };
  }
};
