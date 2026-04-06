'use client';

// Using TanStack Query for mutation lifecycle (loading, error, success)
// API calls are abstracted in service layer
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { aiInsightService } from '../ai-insight.service';

export const useGenerateClassInsight = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (classroomId: string) =>
      aiInsightService.generateClassInsight(classroomId, session?.user?.accessToken),
    onError: () => {
      toast.error('Failed to generate class insight');
    },
  });
};
