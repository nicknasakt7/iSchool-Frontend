export type Classroom = {
  id: string;
  name: string;
  gradeId?: string;
  isActive?: boolean;
  year?: number | null;
  term?: number | null;
};

export type CreateClassroomPayload = {
  gradeId: string;
  name: string;
  year: number | null;
  term: number | null;
};

export type UpdateClassroomPayload = {
  name?: string;
  isActive?: boolean;
};
