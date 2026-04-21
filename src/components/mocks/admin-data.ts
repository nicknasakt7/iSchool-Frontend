// mocks/admin-data.ts

export type Status = 'phoned' | 'waiting';

export type Student = {
  id: string;
  name: string;
  email: string;
  grade: string;
  date: string;
  status: Status;
};

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Dr. Elena Rodriguez',
    email: 'elena@school.edu',
    grade: 'P.1',
    date: 'Oct 12, 2024',
    status: 'phoned',
  },
  {
    id: '2',
    name: 'Marcus Bennett',
    email: 'm.bennett@school.edu',
    grade: 'P.2',
    date: 'Oct 14, 2024',
    status: 'waiting',
  },
  {
    id: '3',
    name: 'Sarah Thompson',
    email: 's.thompson@school.edu',
    grade: 'P.1',
    date: 'Oct 15, 2024',
    status: 'phoned',
  },
];
