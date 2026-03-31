import ActivityTable from './activcity-table';
import StatusFilter from './status-filter';

export default function EnrollmentSection() {
  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Active Management Overview</h2>
      </div>

      {/* Filter */}
      <StatusFilter />

      {/* Table Card */}
      <div className="bg-white rounded-2xl border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Recent Admin Activity</p>

          <span className="text-xs bg-muted px-2 py-1 rounded-full">
            Live Updates
          </span>
        </div>

        <ActivityTable />
      </div>
    </div>
  );
}
