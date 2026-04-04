import { apiClient } from '../client';
import { Grade } from './classroom.type';

const getGrades = (token?: string) =>
  apiClient.get<Grade[]>('/grades', undefined, token);

// const getGrades = async (token?: string): Promise<Grade[]> => {
//   const res = await apiClient.get<{ success: boolean; data: Grade[] }>(
//     '/grades',
//     undefined,
//     token,
//   );

//   return res.data.data; // 🔥 แกะตรงนี้
// };

export const gradeService = { getGrades };
