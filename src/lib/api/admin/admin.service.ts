import { AdminFormValues } from '@/components/features/create/form/NewAdminForm';
import { Admin } from './admin.type';
import { api } from '../api-server';

const createAdmin = (input: AdminFormValues) =>
  api.post<Admin>('/users', input);

export const adminService = { createAdmin };
