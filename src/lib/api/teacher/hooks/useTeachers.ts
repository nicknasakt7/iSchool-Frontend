import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { teacherService } from '../teacher.service';

type Params = {
  page?: number;
  limit?: number;
  search?: string;
  subjectId?: string;
  classId?: string;
  gradeId?: string;
};
export const useTeachers = (params: Params) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['teachers', params],
    queryFn: async () => {
      return teacherService.getTeachers(params, session?.user?.accessToken);
    },
  });
};
