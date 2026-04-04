export type Classroom = {
  id: string;
  name: string;
};

export type Grade = {
  id: string;
  name: string;
  level: number;
  isActive: boolean;
  classrooms?: Classroom[] | null;
};
