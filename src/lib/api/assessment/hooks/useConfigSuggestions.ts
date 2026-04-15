'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { assessmentService } from '../assessment.service';

export const useConfigSuggestions = (subjectId?: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['config-suggestions', subjectId],
    queryFn: () =>
      assessmentService.getConfigSuggestions(subjectId!, session?.user?.accessToken),
    enabled: !!subjectId && !!session?.user?.accessToken,
  });
};
