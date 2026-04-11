import { leadServerService } from '@/lib/api/lead/lead.service';
import ActivityTable from './activcity-table';

export default async function EnrollmentSection() {
  const leads = await leadServerService.getLeads().catch(() => []);

  const total = leads.length;
  const waiting = leads.filter(l => l.status === 'WAITING').length;
  const contacted = leads.filter(l => l.status === 'CONTACTED').length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border p-4 text-center">
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Leads</p>
        </div>
        <div className="bg-white rounded-2xl border p-4 text-center">
          <p className="text-2xl font-bold text-amber-500">{waiting}</p>
          <p className="text-xs text-muted-foreground mt-1">Waiting</p>
        </div>
        <div className="bg-white rounded-2xl border p-4 text-center">
          <p className="text-2xl font-bold text-green-500">{contacted}</p>
          <p className="text-xs text-muted-foreground mt-1">Contacted</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Interested Leads</p>
          <span className="text-xs bg-muted px-2 py-1 rounded-full">
            {total} รายการ
          </span>
        </div>

        <ActivityTable leads={leads} />
      </div>
    </div>
  );
}
