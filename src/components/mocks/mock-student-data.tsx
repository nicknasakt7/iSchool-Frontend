// mock/student.ts

import { Student } from "./mock-student-types";

export const mockStudent: Student = {
  id: "IS-2024-9982",
  firstName: "Julian",
  lastName: "Thorne",
  nickname: "Jules",
  gradeLevel: "Grade 11",
  gpa: 3.9,
  avatar: "https://i.pravatar.cc/150?img=12",

  academicYear: "2023 - 2024",
  semester: "Spring Semester",

  subjects: [
    {
      name: "Advanced Calculus II",
      grade: "A+",
      score: 98,
      status: "COMPLETED",
    },
    { name: "English Literature", grade: "B-", score: 82, status: "COMPLETED" },
    { name: "World History", grade: "A", score: 94, status: "COMPLETED" },
  ],

  email: "j.thorne@academy.edu",
  dob: "March 14, 2008",
  parents: "Elena & Marcus Thorne",
  healthNote: "Nut allergy (Peanuts): Carry EpiPen at all times.",
  favoriteSubject: "Theoretical Physics & Varsity Rowing",

  standingPercent: 5,

  aiConclusion:
    "Julian is demonstrating exceptional aptitude in STEM subjects...",

  aiTips: [
    "Enroll in Creative Writing workshop this summer.",
    "Maintain Math focus; consider Math Olympiad.",
    "Schedule peer-tutoring for Literature analysis.",
  ],
};
