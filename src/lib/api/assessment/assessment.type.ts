// Legacy types — preserved for backward compatibility with createAssessmentGroup
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

// ─── Template item used in local page state ────────────────────────────────
// id is absent for unsaved items, populated after successful upsert
export type ScoreTemplateItem = {
  id?: string;   // maps to AssessmentConfigItem.id
  label: string; // maps to AssessmentConfigItem.name
  max: number;   // maps to AssessmentConfigItem.maxScore
};

// ─── GET /assessment-config ────────────────────────────────────────────────
// Query params — all four are required by the backend
export type GetAssessmentConfigParams = {
  classroomId: string;
  subjectId: string;
  term: number;
  year: number;
};

// Individual item returned from GET & POST /assessment-config
export type AssessmentConfigItem = {
  id: string;
  subjectAssignmentId: string; // needed for upsert + apply calls
  subjectId: string;
  term: number;
  year: number;
  name: string;
  maxScore: number;
  order: number;
};

// ─── POST /assessment-config (upsert) ─────────────────────────────────────
export type UpsertAssessmentConfigDto = {
  subjectAssignmentId: string;
  term: number;
  year: number;
  items: {
    id?: string;   // present when updating an existing item
    name: string;
    maxScore: number;
    order: number;
  }[];
};

// ─── POST /assessment/apply ────────────────────────────────────────────────
export type ApplyConfigDto = {
  subjectAssignmentId: string;
  classroomId: string;
  subjectId: string;
  term: number;
  year: number;
};

export type ApplyConfigResult = {
  studentsCount: number;
  configsCount: number;
  applied: number;
};

// ─── DELETE /assessment-config/:configId ──────────────────────────────────
export type DeleteConfigResult = {
  deletedConfigId: string;
  affectedStudentsCount: number;
};

// ─── PATCH /score-item ────────────────────────────────────────────────────
// Updates a single student score item by its backend id
export type UpdateScoreItemDto = {
  scoreItemId: string;
  value: number;
};

// ─── GET /subject-assignments/find ────────────────────────────────────────
export type FindSubjectAssignmentParams = {
  classroomId: string;
  subjectId: string;
};

export type SubjectAssignmentItem = {
  id: string;
  classId: string;
  subjectId: string;
};
