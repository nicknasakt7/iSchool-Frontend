export type Classroom = {
  id: string;
  name: string;
  gradeId?: string;
  isActive?: boolean;
};

export type CreateClassroomPayload = {
  name: string;
  gradeId: string;
};

export type UpdateClassroomPayload = {
  roomNumber?: number;
  isActive?: boolean;
};
