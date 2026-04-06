export type Classroom = {
  id: string;
  name: string;
  gradeId?: string;
  isActive?: boolean;
};

export type CreateClassroomPayload = {
  gradeName: string;
  name: string; // room number as string, e.g. "4"
  year: number | null;
  term: number | null;
};

export type UpdateClassroomPayload = {
  roomNumber?: number;
  isActive?: boolean;
};
