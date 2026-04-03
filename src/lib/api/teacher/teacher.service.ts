import { FormValues } from '@/components/features/create/form/NewTeacherForm';

import { Teacher } from './teacher.type';
import { api } from '../api-server';

const createTeacher = (input: FormValues) =>
  api.post<Teacher>('/teachers', input);

export const teacherService = { createTeacher };
