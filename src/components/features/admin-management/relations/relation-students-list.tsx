'use client';

import { useState } from 'react';
import { useStudents } from '@/lib/api/student/hooks/useStudents';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';
import { useDebounce } from '@/lib/api/student/hooks/useDebounce';
import { Student } from '@/lib/api/student/student.type';
import SearchInput from '@/components/shared/search-input';
import FilterDropdown from '@/components/shared/filter-dropdown';
import { Badge } from '@/components/ui/badge';

type Props = {
  selectedStudent: Student | null;
  onSelect: (student: Student) => void;
};

export default function RelationStudentsList({ selectedStudent, onSelect }: Props) {
  const [gradeId, setGradeId] = useState('');
  const [classId, setClassId] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  const { data: grades } = useGrades();
  const { data: classrooms } = useClassrooms(gradeId ? { gradeId } : undefined);

  const { data, isLoading } = useStudents({
    page,
    limit: 8,
    search: debouncedSearch || undefined,
    gradeId: gradeId || undefined,
    classId: classId || undefined,
  });

  const total = data?.meta.total ?? 0;
  const limit = data?.meta.limit ?? 8;
  const hasNext = page * limit < total;

  const gradeOptions = [
    { label: 'All Grades', value: '' },
    ...(grades ?? []).map(g => ({ label: g.name, value: g.id })),
  ];

  const classroomOptions = [
    { label: 'All Classrooms', value: '' },
    ...(classrooms ?? []).map(c => ({ label: c.name, value: c.id })),
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold">Students</h2>
        <p className="text-sm text-muted-foreground">Select a student to manage their parent link</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <SearchInput onSearch={v => { setSearch(v); setPage(1); }} placeholder="Search student..." />
        <FilterDropdown
          label="All Grades"
          value={gradeId}
          options={gradeOptions}
          onChange={v => { setGradeId(v); setClassId(''); setPage(1); }}
        />
        {gradeId && (
          <FilterDropdown
            label="All Classrooms"
            value={classId}
            options={classroomOptions}
            onChange={v => { setClassId(v); setPage(1); }}
          />
        )}
      </div>

      {/* List */}
      <div className="space-y-2 overflow-y-auto max-h-[520px] pr-1">
        {isLoading && (
          <p className="text-center text-muted-foreground py-6">Loading...</p>
        )}
        {!isLoading && !data?.data.length && (
          <p className="text-center text-muted-foreground py-6">No students found</p>
        )}
        {(data?.data ?? []).map(s => {
          const isSelected = selectedStudent?.id === s.id;
          const isLinked = !!s.parentId;

          return (
            <div
              key={s.id}
              onClick={() => onSelect(s)}
              className={`cursor-pointer rounded-xl border p-3 transition-all bg-card hover:border-primary/60 ${
                isSelected ? 'border-primary ring-1 ring-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {s.firstName} {s.lastName}
                    {s.nickName ? <span className="text-muted-foreground text-sm"> ({s.nickName})</span> : null}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Parent email: {s.parentsEmail || '—'}
                  </p>
                </div>
                <Badge
                  variant={isLinked ? 'default' : 'secondary'}
                  className={`shrink-0 text-xs ${isLinked ? 'bg-green-100 text-green-700 border-green-200' : ''}`}
                >
                  {isLinked ? 'Linked' : 'Unlinked'}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex items-center justify-between text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-muted-foreground">Page {page} · {total} students</span>
          <button
            disabled={!hasNext}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 rounded border disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
