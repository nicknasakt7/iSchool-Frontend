import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { parentService } from '../parent.service';

export const useParents = (search: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['parents', search],
    queryFn: () =>
      parentService.getParents({ search: search || undefined }, session?.user?.accessToken),
    enabled: !!session?.user?.accessToken && search.length >= 2,
  });
};
