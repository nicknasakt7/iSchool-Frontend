export type Trend = 'IMPROVED' | 'DECLINED' | 'STABLE';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type ClassInsightData = {
  id: string;
  classroomId: string;
  summary: string;
  strength: string;
  weakness: string;
  suggestion: string;
  trend: Trend;
  riskLevel: RiskLevel;
  term: number;
  year: number;
  generatedAt: string;
  avg: number;
  submissionRate: number;
};

export type StudentInsightData = {
  id: string;
  studentId: string;
  summary: string;
  strength: string;
  weakness: string;
  suggestion: string;
  trend: Trend;
  riskLevel: RiskLevel;
  term: number;
  year: number;
  isLocked: boolean;
  generatedAt: string;
};
