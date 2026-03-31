'use client';

import { useState } from 'react';
import MatchingParents from '@/components/features/admin-management/relations/matching-parents';
import RelationStudentsList from '@/components/features/admin-management/relations/relation-students-list';

export type Student = {
  id: string;
  name: string;
  email: string;
  grade: string;
  room: string;
  parentsName: string;
};

export type Parent = {
  name: string;
  email: string;
  phone: string;
};

export default function RelationsPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [matchedParent, setMatchedParent] = useState<Parent | null>(null);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Parent Matching</h1>
        <p className="text-muted-foreground">
          Curate the student-guardian ecosystem with intelligent matching
          insights.
        </p>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT */}
        <RelationStudentsList
          selectedStudent={selectedStudent}
          onSelect={setSelectedStudent}
        />

        {/* RIGHT */}
        <MatchingParents
          student={selectedStudent}
          parent={matchedParent}
          onFind={setMatchedParent}
        />
      </div>
    </div>
  );
}
