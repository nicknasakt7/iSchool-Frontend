'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { subjectService } from '../subject.service';

export const useSubjectsByClassroom = (classroomId?: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['subjects-by-classroom', classroomId],
    queryFn: () =>
      subjectService.getSubjectsByClassroom(
        classroomId!,
        session?.user?.accessToken,
      ),
    enabled: !!classroomId && !!session?.user?.accessToken,
  });
};
