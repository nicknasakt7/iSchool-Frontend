import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { classroomService } from '../classroom.service';
import { useAcademic } from '@/lib/context/academic-context';

type UseClassroomsParams = {
  gradeId?: string;
  year?: number | null;
  term?: number | null;
};

export const useClassrooms = (params?: UseClassroomsParams) => {
  const { data: session } = useSession();
  const { year: ctxYear, term: ctxTerm } = useAcademic();

  // ใช้ค่าจาก params ถ้าระบุมาตรงๆ ไม่งั้นใช้จาก global context
  const year = params?.year !== undefined ? params.year : ctxYear;
  const term = params?.term !== undefined ? params.term : ctxTerm;

  return useQuery({
    queryKey: ['classrooms', params?.gradeId ?? null, year, term],
    queryFn: () =>
      classroomService.getClassrooms(
        { gradeId: params?.gradeId, year, term },
        session?.user?.accessToken,
      ),
    enabled: !!params?.gradeId && !!session?.user?.accessToken,
  });
};
