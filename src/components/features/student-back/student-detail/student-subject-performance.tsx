import { cn } from '@/lib/utils';
import type { ScoreInDetail } from '@/lib/api/student/student.type';

type Props = {
  scores: ScoreInDetail[];
};

function gradeLabel(g: number) {
  if (g >= 3.5) return { text: `${g.toFixed(1)}`, color: 'text-emerald-500' };
  if (g >= 2.5) return { text: `${g.toFixed(1)}`, color: 'text-blue-500' };
  if (g >= 1.5) return { text: `${g.toFixed(1)}`, color: 'text-amber-500' };
  return { text: `${g.toFixed(1)}`, color: 'text-red-500' };
}

export default function StudentSubjectPerformance({ scores }: Props) {
  const avg =
    scores.length > 0
      ? (scores.reduce((s, c) => s + c.totalScore, 0) / scores.length).toFixed(1)
      : null;

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base text-foreground">Subjects Performance</h3>
        {avg && (
          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            เฉลี่ย <span className="font-semibold text-foreground">{avg}</span>
          </span>
        )}
      </div>

      {scores.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">
          ยังไม่มีคะแนนในเทอมนี้
        </p>
      ) : (
        <div className="space-y-0">
          {/* Header */}
          <div className="grid grid-cols-3 text-xs text-muted-foreground pb-2 border-b border-border">
            <p>วิชา</p>
            <p className="text-center">คะแนน</p>
            <p className="text-right">เกรด</p>
          </div>

          {/* Rows */}
          {scores.map((score) => {
            const grade = gradeLabel(score.subjectGrade);
            return (
              <div
                key={score.id}
                className="grid grid-cols-3 items-center border-b border-border/50 py-3 last:border-0"
              >
                <p className="font-medium text-sm text-foreground">{score.subject.name}</p>

                <div className="text-center">
                  <span className="font-semibold text-primary">
                    {score.totalScore.toFixed(1)}
                  </span>
                </div>

                <p className={cn('text-right text-sm font-semibold', grade.color)}>
                  {grade.text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}