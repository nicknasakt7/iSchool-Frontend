import { auth } from '../auth/auth';
import { apiClient } from './client';

const getToken = async () => {
  const session = await auth();
  return session?.user?.accessToken;
};

export const api = {
  get: async <T>(
    url: string,
    params?: Record<string, string | number | boolean>,
  ) => apiClient.get<T>(url, params, await getToken()),
  post: async <T>(url: string, body: unknown) =>
    apiClient.post<T>(url, body, await getToken()),
  put: async <T>(url: string, body: unknown) =>
    apiClient.put<T>(url, body, await getToken()),
  patch: async <T>(url: string, body: unknown) =>
    apiClient.patch<T>(url, body, await getToken()),
  delete: async <T>(url: string) => apiClient.delete<T>(url, await getToken()),
};
