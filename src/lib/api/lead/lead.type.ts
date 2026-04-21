export type LeadStatus = 'WAITING' | 'CONTACTED';

export type Lead = {
  id: string;
  parentFirstName: string;
  parentLastName: string;
  email: string;
  tel: string | null;
  studentFirstName: string;
  studentLastName: string;
  gradeId: string;
  grade: { id: string; name: string; level: number };
  status: LeadStatus;
  createdAt: string;
};

export type CreateLeadPayload = {
  parentFirstName: string;
  parentLastName: string;
  email: string;
  tel?: string;
  studentFirstName: string;
  studentLastName: string;
  gradeId: string;
};
