import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { gradeService } from '../classroom.service';

export const useGrades = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['grades'],
    queryFn: () => gradeService.getGrades(session?.user?.accessToken),
  });
};
