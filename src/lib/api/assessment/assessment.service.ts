import { apiClient } from '../client';
import {
  AssessmentGroup,
  AssessmentConfigItem,
  ApplyConfigResult,
  DeleteConfigResult,
  CreateAssessmentGroupDto,
  GetAssessmentConfigParams,
  UpsertAssessmentConfigDto,
  ApplyConfigDto,
  UpdateScoreItemDto,
} from './assessment.type';

// API calls are abstracted in service layer — consumed by TanStack Query hooks
export const assessmentService = {
  // Legacy — preserved for backward compatibility
  createAssessmentGroup: (body: CreateAssessmentGroupDto, token?: string) =>
    apiClient.post<AssessmentGroup>('/assessment-groups', body, token),

  // GET /assessment-config?classroomId=&subjectId=&term=&year=
  // Returns all config items for a given class + subject + term + year
  getAssessmentConfig: (params: GetAssessmentConfigParams, token?: string) =>
    apiClient.get<AssessmentConfigItem[]>('/assessment-config', params, token),

  // POST /assessment-config — creates or updates config items (preserve mode)
  // Returns the full updated list sorted by order
  createOrUpdateConfig: (input: UpsertAssessmentConfigDto, token?: string) =>
    apiClient.post<AssessmentConfigItem[]>('/assessment-config', input, token),

  // POST /assessment/apply — upserts Score + ScoreItem records for every student
  applyAssessment: (input: ApplyConfigDto, token?: string) =>
    apiClient.post<ApplyConfigResult>('/assessment/apply', input, token),

  // DELETE /assessment-config/:configId — removes config + all linked score items
  deleteAssessmentConfig: (configId: string, token?: string) =>
    apiClient.delete<DeleteConfigResult>(`/assessment-config/${configId}`, token),

  // PATCH /score-item — updates a single student score item by its id
  updateScoreItem: (input: UpdateScoreItemDto, token?: string) =>
    apiClient.patch('/score-item', input, token),
};
