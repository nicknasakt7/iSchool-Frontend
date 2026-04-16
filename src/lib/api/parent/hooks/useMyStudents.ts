'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { parentService } from '../parent.service';

export const useMyStudents = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['my-students'],
    queryFn: () => parentService.getMyStudents(session?.user?.accessToken),
    enabled: !!session?.user?.accessToken,
  });
};
