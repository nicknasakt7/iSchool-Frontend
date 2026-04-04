import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { subjectService } from '../subject.service';

export const useSubjects = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectService.getSubjects(session?.user?.accessToken),
  });
};
