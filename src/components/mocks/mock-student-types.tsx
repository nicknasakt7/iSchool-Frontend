// types/student.ts

export type Subject = {
  name: string;
  grade: string;
  score: number;
  status: "Passed" | "Failed" | "In Progress";
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  gradeLevel: string;
  gpa: number;
  avatar: string;

  academicYear: string;
  semester: string;

  subjects: Subject[];

  email: string;
  dob: string;
  parents: string;
  healthNote: string;
  favoriteSubject: string;

  standingPercent: number;

  aiConclusion: string[];
  aiTips: string[];
};
