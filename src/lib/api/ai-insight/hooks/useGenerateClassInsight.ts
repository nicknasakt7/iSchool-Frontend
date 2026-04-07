'use client';

// Using TanStack Query for mutation lifecycle (loading, error, success)
// API calls are abstracted in service layer
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { aiInsightService } from '../ai-insight.service';

type GenerateClassInsightParams = {
  classroomId: string;
  term: number;
  year: number;
};

export const useGenerateClassInsight = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classroomId, term, year }: GenerateClassInsightParams) =>
      aiInsightService.generateClassInsight(classroomId, term, year, session?.user?.accessToken),
    onSuccess: (data, { classroomId, term, year }) => {
      // Update the query cache immediately so the UI reflects new data without refetching
      queryClient.setQueryData(['class-insight', classroomId, term, year], data);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'Failed to generate class insight';
      toast.error(message);
      console.error('[generateClassInsight]', error);
    },
  });
};
