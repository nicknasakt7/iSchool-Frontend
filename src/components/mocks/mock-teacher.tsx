export type Teacher = {
  id: number;
  firstName: string;
  lastName: string;
  grade: string[];
  subject: string[];
  classroom: string;
};

export const mockTeachers: Teacher[] = [
  {
    id: 1,
    firstName: "Jennifer",
    lastName: "Martinez",
    grade: ["5"],
    subject: ["Mathematics"],
    classroom: "1",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    grade: ["3"],
    subject: ["Science"],
    classroom: "2",
  },
];
