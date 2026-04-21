'use client';

import { use, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useStudentDetail } from '@/lib/api/student/hooks/useStudentDetail';
import StudentProfileHeader from '@/components/features/student-back/student-detail/student-profile-header';
import StudentAiInsight from '@/components/features/student-back/student-detail/student-ai-insight';
import StudentAcademicDossier from '@/components/features/student-back/student-detail/student-academic-dossier';
import StudentSubjectPerformance from '@/components/features/student-back/student-detail/student-subject-performance';
import StudentTeacherComments from '@/components/features/student-back/student-detail/student-teacher-comments';
import StudentEnrollmentHistory from '@/components/features/student-back/student-detail/student-enrollment-history';

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ 'student-id': string }>;
}) {
  const { 'student-id': studentId } = use(params);

  const [selectedTerm, setSelectedTerm] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const { data: student, isLoading, isError } = useStudentDetail(studentId, {
    term: selectedTerm,
    year: selectedYear,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">ไม่พบข้อมูลนักเรียน</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header: ชื่อ, ชื่อเล่น, student code, badges, term/year selector */}
      <StudentProfileHeader
        student={student}
        studentId={studentId}
        selectedTerm={selectedTerm}
        selectedYear={selectedYear}
        onTermYearChange={(term, year) => {
          setSelectedTerm(term);
          setSelectedYear(year);
        }}
      />

      {/* AI Insight */}
      <StudentAiInsight
        studentId={studentId}
        term={selectedTerm}
        year={selectedYear}
      />

      {/* Academic Dossier + Subject Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StudentAcademicDossier student={student} />

        <div className="lg:col-span-2">
          <StudentSubjectPerformance scores={student.scores} />
        </div>
      </div>

      {/* Teacher Comments */}
      <StudentTeacherComments
        comments={student.comments}
        term={selectedTerm}
        year={selectedYear}
      />

      {/* Enrollment History */}
      {(student.studentEnrollments?.length ?? 0) > 0 && (
        <StudentEnrollmentHistory enrollments={student.studentEnrollments} />
      )}
    </div>
  );
}
