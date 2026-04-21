import { History } from 'lucide-react';
import type { EnrollmentHistoryInDetail } from '@/lib/api/student/student.type';

type Props = {
  enrollments: EnrollmentHistoryInDetail[];
};

const STATUS_LABEL: Record<string, { label: string; className: string }> = {
  ACTIVE:      { label: 'กำลังเรียน', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  PROMOTED:    { label: 'เลื่อนชั้น',  className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  REPEATED:    { label: 'ซ้ำชั้น',     className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  TRANSFERRED: { label: 'ย้ายโรงเรียน', className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
};

export default function StudentEnrollmentHistory({ enrollments }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <div className="flex items-center gap-2">
        <History className="size-4 text-muted-foreground" />
        <h3 className="font-semibold text-base text-foreground">ประวัติห้องเรียน</h3>
      </div>

      <div className="space-y-2">
        {enrollments.map((e) => {
          const status = STATUS_LABEL[e.status] ?? { label: e.status, className: 'bg-muted text-muted-foreground' };
          return (
            <div
              key={e.id}
              className="flex items-center justify-between rounded-xl border border-border px-4 py-3 gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="text-sm font-medium text-foreground whitespace-nowrap">
                  เทอม {e.term} / {e.year + 543}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {e.grade.name}{e.classroom ? ` · ${e.classroom.name}` : ''}
                </div>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}>
                {status.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
