export type ScoreItem = {
  label: string;
  max: number;
};

export type AssessmentGroup = {
  id: string;
  classId: string;
  subjectId?: string | null;
  items: ScoreItem[];
  createdAt: string;
};

export type CreateAssessmentGroupDto = {
  classId: string;
  subjectId?: string;
  items: ScoreItem[];
};
