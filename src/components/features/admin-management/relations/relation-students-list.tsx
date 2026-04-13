'use client';

import { useEffect, useRef, useState } from 'react';
import { useStudents } from '@/lib/api/student/hooks/useStudents';
import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useClassrooms } from '@/lib/api/classroom/hook/useClassrooms';
import { useDebounce } from '@/lib/api/student/hooks/useDebounce';
import { Student } from '@/lib/api/student/student.type';
import SearchInput from '@/components/shared/search-input';
import FilterDropdown from '@/components/shared/filter-dropdown';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

type Props = {
  selectedStudent: Student | null;
  onSelect: (student: Student) => void;
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function RelationStudentsList({ selectedStudent, onSelect }: Props) {
  const [gradeId, setGradeId] = useState('');
  const [classId, setClassId] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);
  const listRef = useRef<HTMLDivElement>(null);

  const { data: grades } = useGrades();
  const { data: classrooms } = useClassrooms(gradeId ? { gradeId } : undefined);

  const { data, isLoading, isFetching } = useStudents(
    {
      page,
      limit: 8,
      search: debouncedSearch || undefined,
      gradeId: gradeId || undefined,
      classId: classId || undefined,
    },
    { keepPreviousData: true },
  );

  // Scroll list to top whenever page changes
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const students = data?.data ?? [];
  const total = data?.meta.total ?? 0;
  const limit = data?.meta.limit ?? 8;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const gradeOptions = [
    { label: 'All Grades', value: '' },
    ...(grades ?? []).map(g => ({ label: g.name, value: g.id })),
  ];

  const classroomOptions = [
    { label: 'All Classrooms', value: '' },
    ...(classrooms ?? []).map(c => ({ label: c.name, value: c.id })),
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users size={20} className="text-muted-foreground" />
            Students
          </h2>
          <p className="text-sm text-muted-foreground">Select a student to manage their parent link</p>
        </div>
        {total > 0 && (
          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full font-medium">
            {total} total
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <SearchInput
          onSearch={v => { setSearch(v); setPage(1); }}
          placeholder="Search student..."
        />
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
      <div
        ref={listRef}
        className="space-y-2 overflow-y-auto flex-1 min-h-0 max-h-[480px] pr-1 transition-opacity duration-150"
        style={{ opacity: isFetching ? 0.6 : 1 }}
      >
        {isLoading && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border bg-muted/40 h-[68px]" />
            ))}
          </div>
        )}

        {!isLoading && students.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
            <Users size={32} className="text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No students found</p>
          </div>
        )}

        {students.map(s => {
          const isSelected = selectedStudent?.id === s.id;
          const isLinked = !!s.parentId;
          const initials = getInitials(s.firstName, s.lastName);
          const color = avatarColor(s.firstName + s.lastName);

          return (
            <div
              key={s.id}
              onClick={() => onSelect(s)}
              className={`cursor-pointer rounded-xl border p-3 transition-all bg-card hover:border-primary/50 hover:shadow-sm ${
                isSelected
                  ? 'border-primary ring-1 ring-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${color}`}>
                  {initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="font-medium text-sm leading-tight">
                      {s.firstName} {s.lastName}
                    </p>
                    {s.nickName && (
                      <span className="text-xs text-muted-foreground">({s.nickName})</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {s.parentsEmail || 'No parent email registered'}
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge
                    variant={isLinked ? 'default' : 'secondary'}
                    className={`text-xs ${
                      isLinked
                        ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-100'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isLinked ? 'Linked' : 'Unlinked'}
                  </Badge>
                  {s.studentCode && (
                    <span className="text-[10px] text-muted-foreground font-mono">{s.studentCode}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1 border-t">
          <button
            disabled={!hasPrev || isFetching}
            onClick={() => setPage(p => p - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border bg-card hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={15} />
            Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Show pages around current page
              let p: number;
              if (totalPages <= 5) {
                p = i + 1;
              } else if (page <= 3) {
                p = i + 1;
              } else if (page >= totalPages - 2) {
                p = totalPages - 4 + i;
              } else {
                p = page - 2 + i;
              }
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                    p === page
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <button
            disabled={!hasNext || isFetching}
            onClick={() => setPage(p => p + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border bg-card hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
