type AttendanceStatsProps = {
  total: number;
  present: number;
};

export default function AttendanceStats({
  total,
  present,
}: AttendanceStatsProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Students */}
      <div className="bg-card rounded-2xl px-6 py-4 text-center min-w-25">
        <p className="text-sm text-muted-foreground">Students</p>
        <p className="text-2xl font-semibold">{total}</p>
      </div>

      {/* Present */}
      <div className="bg-primary text-card rounded-2xl px-6 py-4 text-center min-w-25">
        <p className="text-sm opacity-80">Present</p>
        <p className="text-2xl font-semibold">{present}</p>
      </div>
    </div>
  );
}
