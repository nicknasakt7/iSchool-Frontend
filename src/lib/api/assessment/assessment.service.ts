import { apiClient } from '../client';
import { AssessmentGroup, CreateAssessmentGroupDto } from './assessment.type';

export const assessmentService = {
  createAssessmentGroup: (body: CreateAssessmentGroupDto, token?: string) =>
    apiClient.post<AssessmentGroup>('/assessment-groups', body, token),
};
