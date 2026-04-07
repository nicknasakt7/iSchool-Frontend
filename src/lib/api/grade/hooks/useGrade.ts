import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { gradeService } from '../grade.service';

type UseGradesParams = {
  year?: number | null;
  term?: number | null;
};

export const useGrades = (params?: UseGradesParams) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['grades', params?.year ?? null, params?.term ?? null],
    queryFn: () =>
      gradeService.getGrades(
        { year: params?.year ?? null, term: params?.term ?? null },
        session?.user?.accessToken,
      ),
    enabled: !!session?.user?.accessToken,
  });
};
