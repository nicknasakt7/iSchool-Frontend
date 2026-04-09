import { cn } from '@/lib/utils';
import type { ScoreInDetail } from '@/lib/api/student/student.type';

type Props = {
  scores: ScoreInDetail[];
};

export default function StudentSubjectPerformance({ scores }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <h3 className="font-semibold text-base text-foreground">Subjects Performance</h3>

      {scores.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">
          ยังไม่มีคะแนนในเทอมนี้
        </p>
      ) : (
        <>
          {/* Header */}
          <div className="grid grid-cols-3 text-xs text-muted-foreground pb-2 border-b border-border">
            <p>วิชา</p>
            <p className="text-center">คะแนน</p>
            <p className="text-right">เกรด</p>
          </div>

          {/* Rows */}
          {scores.map((score) => (
            <div
              key={score.id}
              className="grid grid-cols-3 items-center border-b border-border/50 py-3"
            >
              <p className="font-medium text-sm text-foreground">{score.subject.name}</p>

              <p className="text-center font-semibold text-primary">
                {score.totalScore.toFixed(1)}
              </p>

              <p
                className={cn(
                  'text-right text-sm font-medium',
                  score.subjectGrade >= 3.5
                    ? 'text-green-500'
                    : score.subjectGrade >= 2
                      ? 'text-yellow-500'
                      : 'text-red-500',
                )}
              >
                {score.subjectGrade.toFixed(1)}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
