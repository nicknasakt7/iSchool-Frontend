import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { classroomService } from '../classroom.service';

type UseClassroomsParams = {
  gradeId?: string;
  year?: number | null;
  term?: number | null;
};

export const useClassrooms = (params?: UseClassroomsParams) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: [
      'classrooms',
      params?.gradeId ?? null,
      params?.year ?? null,
      params?.term ?? null,
    ],
    queryFn: () =>
      classroomService.getClassrooms(
        {
          gradeId: params?.gradeId,
          year: params?.year ?? null,
          term: params?.term ?? null,
        },
        session?.user?.accessToken,
      ),
    enabled: !!params?.gradeId && !!session?.user?.accessToken,
  });
};
