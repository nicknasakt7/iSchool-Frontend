import ActivityRow from './activity-row';

export default function ActivityTable() {
  return (
    <div className="rounded-xl overflow-hidden border">
      {/* Header */}
      <div className="grid grid-cols-5 px-4 py-3 text-xs bg-muted text-muted-foreground">
        <div>INTERESTED NAME</div>
        <div>ENROLL GRADE</div>
        <div>ENROLLMENT DATE</div>
        <div>STATUS</div>
        <div className="text-right">ACTIONS</div>
      </div>

      {/* Rows */}
      <ActivityRow />
      <ActivityRow />
      <ActivityRow />
    </div>
  );
}
