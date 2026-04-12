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
  FindSubjectAssignmentParams,
  SubjectAssignmentItem,
  FullAssessmentResponse,
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

  // POST /assessment-config/create — creates or updates config items (preserve mode)
  // Returns the full updated list sorted by order
  createOrUpdateConfig: (input: UpsertAssessmentConfigDto, token?: string) =>
    apiClient.post<AssessmentConfigItem[]>(
      '/assessment-config/create',
      input,
      token,
    ),

  // POST /assessment-config/apply — upserts Score + ScoreItem records for every student
  applyAssessment: (input: ApplyConfigDto, token?: string) =>
    apiClient.post<ApplyConfigResult>(
      '/assessment-config/apply',
      input,
      token,
    ),

  // DELETE /assessment-config/:configId — removes config + all linked score items
  deleteAssessmentConfig: (configId: string, token?: string) =>
    apiClient.delete<DeleteConfigResult>(`/assessment-config/${configId}`, token),

  // PATCH /score-item — updates a single student score item by its id
  updateScoreItem: (input: UpdateScoreItemDto, token?: string) =>
    apiClient.patch('/score-item', input, token),

  // GET /assessment-config/full — configs + all students with real scoreItemIds
  getFullAssessment: (params: GetAssessmentConfigParams, token?: string) =>
    apiClient.get<FullAssessmentResponse>('/assessment-config/full', params, token),

  // GET /subject-assignments/find?classroomId=&subjectId=
  // Returns the subjectAssignment id for a given classroom + subject pair
  findSubjectAssignment: (
    params: FindSubjectAssignmentParams,
    token?: string,
  ) =>
    apiClient.get<SubjectAssignmentItem>(
      '/subject-assignments/find',
      params,
      token,
    ),
};
