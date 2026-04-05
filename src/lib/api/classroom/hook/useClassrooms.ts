import { useQuery } from '@tanstack/react-query';
import { classroomService } from '../classroom.service';

export const useClassrooms = (gradeId?: string) => {
  return useQuery({
    queryKey: ['classrooms', gradeId],
    queryFn: () => classroomService.getClassrooms(gradeId!),
    enabled: !!gradeId, //
  });
};
