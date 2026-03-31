import EnrollmentSection from '@/components/features/admin-management/enrollments/enrollment-section';

export default function EnrollmentPage() {
  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4">Enrollment Hub</h2>

      {/* ใส่ SummaryCards + Filters + Table ที่เราทำไว้ตรงนี้ */}
      <p className="text-sm text-muted-foreground">
        This is the main enrollment dashboard.
      </p>

      <EnrollmentSection />
    </div>
  );
}
