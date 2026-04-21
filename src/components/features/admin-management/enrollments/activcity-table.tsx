import { Lead } from '@/lib/api/lead/lead.type';
import ActivityRow from './activity-row';

type Props = { leads: Lead[] };

export default function ActivityTable({ leads }: Props) {
  return (
    <div className="rounded-xl overflow-hidden border">
      {/* Header */}
      <div className="grid grid-cols-5 px-4 py-3 text-sm bg-muted text-muted-foreground">
        <div>INTERESTED NAME</div>
        <div>ENROLL GRADE</div>
        <div>ENROLLMENT DATE</div>
        <div>STATUS</div>
        <div className="text-right">ACTIONS</div>
      </div>

      {leads.length === 0 && (
        <div className="px-4 py-8 text-center text-base text-muted-foreground">
          ยังไม่มีผู้สนใจสมัครเรียน
        </div>
      )}

      {leads.map(lead => (
        <ActivityRow key={lead.id} lead={lead} />
      ))}
    </div>
  );
}
