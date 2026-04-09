import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import type { StudentDetail } from '@/lib/api/student/student.type';

type Props = {
  student: StudentDetail;
};

export default function StudentAcademicDossier({ student }: Props) {
  const dob = student.dob ? format(new Date(student.dob), 'd MMMM yyyy', { locale: th }) : '—';

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4 h-full">
      <h3 className="font-semibold text-base text-foreground">Academic Dossier</h3>

      <div className="space-y-3">
        <Field label="วันเกิด" value={dob} />
        <Field label="วิชาโปรด" value={student.favorite ?? '—'} />

        {student.healthNote && (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">สุขภาพ</p>
            <p className="text-sm text-foreground">{student.healthNote}</p>
          </div>
        )}
      </div>

      {/* Parent contact */}
      {(student.parentsFirstName || student.parentsEmail) && (
        <div className="bg-muted/50 rounded-xl p-4 space-y-1">
          <p className="font-medium text-sm text-foreground">
            {student.parentsFirstName} {student.parentsLastName}
          </p>
          {student.parentsEmail && (
            <p className="text-sm text-muted-foreground">{student.parentsEmail}</p>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
      <p className="font-medium text-sm text-foreground">{value}</p>
    </div>
  );
}
