export type TransactionFormData = {
  title: string;
  description: string;
  amount: string; // display value in baht (e.g. "1200")
  term: string;   // "1" | "2"
  year: string;   // "2024" | "2025" | ...
  dueDate: string; // ISO date string or ''
};

export type AudienceSelection = {
  gradeIds: string[];
  classroomIds: string[];
  studentIds: string[];
};

export type Student = {
  id: string;
  name: string;
  code: string;
};
