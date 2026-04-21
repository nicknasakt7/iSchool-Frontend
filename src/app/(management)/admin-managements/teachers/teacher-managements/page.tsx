'use client';

import TeacherList from '@/components/features/admin-management/teachers/teacher-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useDebounce } from '@/lib/api/student/hooks/useDebounce';
import FilterBar from '@/components/shared/filter-bar';

export default function TeacherManagementPage() {
  const [search, setSearch] = useState('');
  const [subjectId, setSubjectId] = useState<string | undefined>();
  const [gradeId, setGradeId] = useState<string | undefined>(); //
  const [classId, setClassId] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold mb-2">
            Teacher Resource Management
          </h2>
          <p className="text-sm text-chart-2">
            Manage teacher capacity and assignments.
          </p>
        </div>

        <Button asChild>
          <Link href="/admin-managements/teachers/new-teacher">
            Add Teacher
          </Link>
        </Button>
      </div>

      {/* SECTION */}
      <div>
        <h1 className="text-2xl font-semibold">Manage Teachers</h1>
        <p className="text-chart-2 text-sm">View and manage faculty members</p>
      </div>

      {/* FILTER */}
      <FilterBar
        onSearch={v => {
          setSearch(v);
          setPage(1);
        }}
        onSubjectChange={v => {
          setSubjectId(v || undefined);
          setPage(1);
        }}
        onGradeChange={v => {
          setGradeId(v);
          setClassId(undefined); // 🔥 สำคัญมาก
          setPage(1);
        }}
        onClassroomChange={v => {
          setClassId(v);
          setPage(1);
        }}
      />

      {/* LIST */}
      <TeacherList
        search={debouncedSearch}
        subjectId={subjectId}
        gradeId={gradeId} //
        classId={classId}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
