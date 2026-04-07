import { Classroom } from '../classroom/classroom.type';

export type Grade = {
  id: string;
  name: string;
  level: number;
  isActive: boolean;
  classrooms?: Classroom[] | null;
};

export type CreateGradePayload = {
  name: string;
  level: number;
  isActive: boolean;
};

export type UpdateGradePayload = {
  isActive: boolean;
};
