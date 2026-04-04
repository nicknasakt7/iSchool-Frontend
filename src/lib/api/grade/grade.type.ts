import { Classroom } from '../classroom/classroom.type';

export type Grade = {
  id: string;
  name: string;
  level: number;
  isActive: boolean;
  classrooms?: Classroom[] | null;
};
