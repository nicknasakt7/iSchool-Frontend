export type ClassInsightData = {
  summary: string;
  strength: string;
  weakness: string;
  suggestion: string;
  trend: 'IMPROVED' | 'DECLINED' | 'STABLE';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  avg: number;
  submissionRate: number;
};
