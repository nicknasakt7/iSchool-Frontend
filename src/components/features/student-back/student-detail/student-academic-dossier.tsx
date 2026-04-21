import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { Calendar, Heart, Activity, Phone } from 'lucide-react';
import type { StudentDetail } from '@/lib/api/student/student.type';

type Props = {
  student: StudentDetail;
};

export default function StudentAcademicDossier({ student }: Props) {
  const dob = student.dob
    ? format(new Date(student.dob), 'd MMMM yyyy', { locale: th })
    : '—';

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-5 h-full">
      <h3 className="font-semibold text-base text-foreground">Academic Dossier</h3>

      <div className="space-y-4">
        <Row icon={Calendar} label="วันเกิด" value={dob} />
        <Row icon={Heart} label="วิชาโปรด" value={student.favorite ?? '—'} />

        {student.healthNote && (
          <div className="flex gap-3">
            <Activity className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">สุขภาพ</p>
              <p className="text-sm text-foreground leading-relaxed">{student.healthNote}</p>
            </div>
          </div>
        )}
      </div>

      {/* Parent contact */}
      {(student.parentsFirstName || student.parentsEmail) && (
        <div className="bg-muted/40 rounded-xl p-4 flex gap-3">
          <Phone className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="space-y-0.5 min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">ผู้ปกครอง</p>
            <p className="font-medium text-sm text-foreground">
              {student.parentsFirstName} {student.parentsLastName}
            </p>
            {student.parentsEmail && (
              <p className="text-sm text-muted-foreground truncate">{student.parentsEmail}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
        <p className="font-medium text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}