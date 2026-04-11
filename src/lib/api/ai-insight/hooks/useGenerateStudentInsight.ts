'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { aiInsightService } from '../ai-insight.service';

type GenerateStudentInsightParams = {
  studentId: string;
  term: number;
  year: number;
};

export const useGenerateStudentInsight = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, term, year }: GenerateStudentInsightParams) =>
      aiInsightService.generateStudentInsight(studentId, term, year, session?.user?.accessToken),
    onSuccess: (data, { studentId, term, year }) => {
      queryClient.setQueryData(['student-insight', studentId, term, year], data);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Failed to generate student insight';
      toast.error(message);
      console.error('[generateStudentInsight]', error);
    },
  });
};
