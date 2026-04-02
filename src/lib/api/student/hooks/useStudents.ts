import { useQuery } from '@tanstack/react-query';
import { studentService } from '../student.service';

type Params = {
  page?: number;
  limit?: number;
  search?: string;
  grade?: string;
};

export const useStudents = (params: Params) => {
  return useQuery({
    queryKey: ['students', params],
    queryFn: async () => {
      const res = await studentService.getStudents(params);
      return res;
    },
  });
};
