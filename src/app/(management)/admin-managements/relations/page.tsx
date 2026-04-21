'use client';

import { useState } from 'react';
import MatchingParents from '@/components/features/admin-management/relations/matching-parents';
import RelationStudentsList from '@/components/features/admin-management/relations/relation-students-list';
import { Student } from '@/lib/api/student/student.type';

export default function RelationsPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Parent Matching</h1>
        <p className="text-muted-foreground">
          Link students to their registered guardians, or manually assign a parent.
        </p>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT — student list */}
        <RelationStudentsList
          selectedStudent={selectedStudent}
          onSelect={setSelectedStudent}
        />

        {/* RIGHT — matching panel */}
        <MatchingParents student={selectedStudent} />
      </div>
    </div>
  );
}
