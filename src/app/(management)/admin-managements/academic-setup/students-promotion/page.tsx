'use client';

import { useState, useTransition } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  History,
  Loader2,
  RefreshCw,
  Search,
  TrendingUp,
  UserX,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useGrades } from '@/lib/api/grade/hooks/useGrade';
import { useEnrollmentStudents } from '@/lib/api/enrollment/hooks/useEnrollmentStudents';
import { useEnrollmentHistory } from '@/lib/api/enrollment/hooks/useEnrollmentHistory';
import { promoteStudentsAction } from '@/lib/actions/enrollment.action';
import {
  EnrollmentStatus,
  PromotionStudent,
  StudentPromotionItem,
} from '@/lib/api/enrollment/enrollment.type';
import { Grade } from '@/lib/api/grade/grade.type';
import { Classroom } from '@/lib/api/classroom/classroom.type';

// ─── Constants ────────────────────────────────────────────────────────────────

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];

const OUTCOME_OPTIONS: {
  value: EnrollmentStatus;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: 'PROMOTED',
    label: 'ขึ้นชั้น',
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    color: 'text-emerald-600',
  },
  {
    value: 'REPEATED',
    label: 'ซ้ำชั้น',
    icon: <RefreshCw className="w-3.5 h-3.5" />,
    color: 'text-amber-600',
  },
  {
    value: 'TRANSFERRED',
    label: 'ย้ายออก',
    icon: <UserX className="w-3.5 h-3.5" />,
    color: 'text-rose-600',
  },
];

const STATUS_BADGE: Record<
  EnrollmentStatus,
  { label: string; className: string }
> = {
  ACTIVE: {
    label: 'กำลังเรียน',
    className: 'bg-blue-100 text-blue-700',
  },
  PROMOTED: {
    label: 'ขึ้นชั้นแล้ว',
    className: 'bg-emerald-100 text-emerald-700',
  },
  REPEATED: {
    label: 'ซ้ำชั้น',
    className: 'bg-amber-100 text-amber-700',
  },
  TRANSFERRED: {
    label: 'ย้ายออก',
    className: 'bg-rose-100 text-rose-700',
  },
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl?: string | null;
}) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="w-9 h-9 rounded-full object-cover shrink-0"
      />
    );
  }
  const initials = name
    .split(' ')
    .map(p => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
      {initials}
    </div>
  );
}

// ─── Outcome selector per student ────────────────────────────────────────────

type RowOutcome = {
  outcome: EnrollmentStatus;
  targetGradeId?: string;
  targetClassroomId?: string;
};

function OutcomeSelector({
  value,
  onChange,
  grades,
}: {
  value: RowOutcome;
  onChange: (v: RowOutcome) => void;
  grades: Grade[];
}) {
  const selectedGrade = grades.find(g => g.id === value.targetGradeId);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Outcome */}
      <Select
        value={value.outcome}
        onValueChange={v =>
          onChange({ outcome: v as EnrollmentStatus, targetGradeId: undefined, targetClassroomId: undefined })
        }
      >
        <SelectTrigger className="h-8 w-32 text-xs rounded-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {OUTCOME_OPTIONS.map(o => (
            <SelectItem key={o.value} value={o.value}>
              <span className={`flex items-center gap-1.5 ${o.color}`}>
                {o.icon} {o.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Target grade — ถ้า PROMOTED หรือ REPEATED */}
      {(value.outcome === 'PROMOTED' || value.outcome === 'REPEATED') && (
        <Select
          value={value.targetGradeId ?? ''}
          onValueChange={v =>
            onChange({ ...value, targetGradeId: v || undefined, targetClassroomId: undefined })
          }
        >
          <SelectTrigger className="h-8 w-28 text-xs rounded-lg">
            <SelectValue placeholder="เลือกชั้น" />
          </SelectTrigger>
          <SelectContent>
            {grades.map(g => (
              <SelectItem key={g.id} value={g.id}>
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Target classroom */}
      {(value.outcome === 'PROMOTED' || value.outcome === 'REPEATED') &&
        value.targetGradeId &&
        selectedGrade?.classrooms &&
        selectedGrade.classrooms.length > 0 && (
          <Select
            value={value.targetClassroomId ?? ''}
            onValueChange={v =>
              onChange({ ...value, targetClassroomId: v || undefined })
            }
          >
            <SelectTrigger className="h-8 w-24 text-xs rounded-lg">
              <SelectValue placeholder="ห้อง" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">ไม่ระบุห้อง</SelectItem>
              {selectedGrade.classrooms.map((c: Classroom) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
    </div>
  );
}

// ─── Promotion Tab ────────────────────────────────────────────────────────────

function PromotionTab() {
  const queryClient = useQueryClient();
  const { data: grades = [] } = useGrades();

  // Source filters
  const [srcYear, setSrcYear] = useState<number>(CURRENT_YEAR);
  const [srcTerm, setSrcTerm] = useState<number>(1);
  const [srcGradeId, setSrcGradeId] = useState<string>('');
  const [srcClassroomId, setSrcClassroomId] = useState<string>('');

  // Target
  const [tgtYear, setTgtYear] = useState<number>(CURRENT_YEAR);
  const [tgtTerm, setTgtTerm] = useState<number>(2);

  // Whether we've "searched"
  const [searched, setSearched] = useState(false);
  const [search, setSearch] = useState('');

  const srcGrade = grades.find(g => g.id === srcGradeId);
  const srcClassrooms = srcGrade?.classrooms ?? [];

  const { data: rawStudents = [], isLoading } = useEnrollmentStudents({
    gradeId: srcGradeId || undefined,
    classroomId: srcClassroomId || undefined,
    year: srcYear,
    term: srcTerm,
    enabled: searched && !!srcGradeId,
  });

  // Per-student outcome map
  const [outcomes, setOutcomes] = useState<Record<string, RowOutcome>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    promoted: number;
    skipped: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-suggest next grade for PROMOTED
  const nextGrade = grades.find(g => g.level === (srcGrade?.level ?? 0) + 1);

  const handleSearch = () => {
    if (!srcGradeId) return;
    setSearched(true);
    setSelected(new Set());
    setOutcomes({});
    setResult(null);
    setError(null);
  };

  const filteredStudents = rawStudents.filter(s => {
    const name = `${s.firstName} ${s.lastName} ${s.nickName} ${s.studentCode}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  const getOutcome = (studentId: string): RowOutcome => {
    return (
      outcomes[studentId] ?? {
        outcome: 'PROMOTED',
        targetGradeId: nextGrade?.id,
        targetClassroomId: undefined,
      }
    );
  };

  const setOutcome = (studentId: string, v: RowOutcome) => {
    setOutcomes(prev => ({ ...prev, [studentId]: v }));
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filteredStudents.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const handlePromote = () => {
    if (selected.size === 0) return;

    const students: StudentPromotionItem[] = Array.from(selected).map(id => {
      const o = getOutcome(id);
      return {
        studentId: id,
        outcome: o.outcome,
        targetGradeId: o.targetGradeId,
        targetClassroomId: o.targetClassroomId,
      };
    });

    setError(null);
    startTransition(async () => {
      const res = await promoteStudentsAction({
        sourceYear: srcYear,
        sourceTerm: srcTerm,
        targetYear: tgtYear,
        targetTerm: tgtTerm,
        students,
      });

      if (res.error) {
        setError(res.error);
        return;
      }

      setResult({
        promoted: res.data?.promoted ?? 0,
        skipped: res.data?.skipped ?? 0,
      });
      setSelected(new Set());
      await queryClient.invalidateQueries({ queryKey: ['enrollment-students'] });
      await queryClient.invalidateQueries({ queryKey: ['grades'] });
    });
  };

  const countByOutcome = (o: EnrollmentStatus) =>
    Array.from(selected).filter(id => getOutcome(id).outcome === o).length;

  return (
    <div className="space-y-6">
      {/* Settings panel */}
      <div className="border rounded-2xl p-6 bg-card space-y-5">
        <h3 className="font-semibold text-base">ตั้งค่าการเลื่อนชั้น</h3>

        <div className="grid grid-cols-2 gap-6">
          {/* Source */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              ต้นทาง (นักเรียนที่ต้องการเลื่อน)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">ปีการศึกษา</p>
                <Select
                  value={String(srcYear)}
                  onValueChange={v => setSrcYear(Number(v))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {YEAR_OPTIONS.map(y => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">เทอม</p>
                <Select
                  value={String(srcTerm)}
                  onValueChange={v => setSrcTerm(Number(v))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">เทอม 1</SelectItem>
                    <SelectItem value="2">เทอม 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">ระดับชั้น</p>
              <Select
                value={srcGradeId}
                onValueChange={v => {
                  setSrcGradeId(v);
                  setSrcClassroomId('');
                  setSearched(false);
                }}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="เลือกระดับชั้น" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map(g => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {srcClassrooms.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  ห้องเรียน{' '}
                  <span className="text-muted-foreground">(ไม่บังคับ)</span>
                </p>
                <Select
                  value={srcClassroomId}
                  onValueChange={v => {
                    setSrcClassroomId(v);
                    setSearched(false);
                  }}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="ทุกห้อง" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">ทุกห้อง</SelectItem>
                    {srcClassrooms.map((c: Classroom) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              ปลายทาง (ปีการศึกษาใหม่)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">ปีการศึกษา</p>
                <Select
                  value={String(tgtYear)}
                  onValueChange={v => setTgtYear(Number(v))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {YEAR_OPTIONS.map(y => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">เทอม</p>
                <Select
                  value={String(tgtTerm)}
                  onValueChange={v => setTgtTerm(Number(v))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">เทอม 1</SelectItem>
                    <SelectItem value="2">เทอม 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800 mt-2">
              <p className="font-medium mb-1">สรุปการตั้งค่า</p>
              <p className="text-xs text-blue-700">
                จาก{' '}
                <span className="font-semibold">
                  {srcGrade?.name ?? '?'} ปี {srcYear} เทอม {srcTerm}
                </span>
                <br />
                ไปยัง{' '}
                <span className="font-semibold">
                  ปี {tgtYear} เทอม {tgtTerm}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            disabled={!srcGradeId}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            โหลดรายชื่อนักเรียน
          </Button>
        </div>
      </div>

      {/* Result banner */}
      {result && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-800">
            เลื่อนชั้นสำเร็จ{' '}
            <span className="font-semibold">{result.promoted} คน</span>
            {result.skipped > 0 && (
              <span className="ml-2 text-amber-700">
                (ข้าม {result.skipped} คน เพราะมี enrollment ปลายทางแล้ว)
              </span>
            )}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-5 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Student list */}
      {searched && (
        <div className="border rounded-2xl bg-card overflow-hidden">
          {/* List header */}
          <div className="flex items-center justify-between px-5 py-4 border-b gap-3">
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                className="rounded"
                checked={
                  filteredStudents.length > 0 &&
                  selected.size === filteredStudents.length
                }
                onChange={toggleAll}
              />
              <span className="text-sm font-medium">
                เลือกทั้งหมด ({filteredStudents.length} คน)
              </span>
              {selected.size > 0 && (
                <span className="text-xs text-muted-foreground">
                  · เลือกแล้ว {selected.size} คน
                </span>
              )}
            </div>

            <div className="relative w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหานักเรียน..."
                className="pl-9 h-8 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Students */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              กำลังโหลดรายชื่อ...
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Users className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">ไม่พบนักเรียนในเงื่อนไขนี้</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredStudents.map(student => {
                const outcome = getOutcome(student.id);
                const isSelected = selected.has(student.id);
                return (
                  <div
                    key={student.id}
                    className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-muted/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="rounded shrink-0"
                      checked={isSelected}
                      onChange={() => toggleSelect(student.id)}
                    />

                    <Avatar
                      name={`${student.firstName} ${student.lastName}`}
                      imageUrl={student.profileImageUrl}
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {student.firstName} {student.lastName}
                        <span className="ml-2 text-xs text-muted-foreground font-normal">
                          ({student.nickName})
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student.studentCode} ·{' '}
                        {student.classroom?.name ?? student.grade?.name ?? '—'}
                      </p>
                    </div>

                    {isSelected && (
                      <OutcomeSelector
                        value={outcome}
                        onChange={v => setOutcome(student.id, v)}
                        grades={grades}
                      />
                    )}

                    {!isSelected && (
                      <span className="text-xs text-muted-foreground">
                        เลือกเพื่อตั้งค่า
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom action bar */}
          {selected.size > 0 && (
            <div className="border-t px-5 py-4 bg-muted/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                <span>เลือก {selected.size} คน ·</span>
                {countByOutcome('PROMOTED') > 0 && (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    ขึ้นชั้น {countByOutcome('PROMOTED')}
                  </span>
                )}
                {countByOutcome('REPEATED') > 0 && (
                  <span className="text-amber-600 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />
                    ซ้ำชั้น {countByOutcome('REPEATED')}
                  </span>
                )}
                {countByOutcome('TRANSFERRED') > 0 && (
                  <span className="text-rose-600 flex items-center gap-1">
                    <UserX className="w-3 h-3" />
                    ย้ายออก {countByOutcome('TRANSFERRED')}
                  </span>
                )}
              </div>

              <Button
                onClick={handlePromote}
                disabled={isPending}
                className="gap-2"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <GraduationCap className="w-4 h-4" />
                )}
                ยืนยันการเลื่อนชั้น ({selected.size} คน)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── History Tab ──────────────────────────────────────────────────────────────

function HistoryTab() {
  const { data: grades = [] } = useGrades();
  const [filterGradeId, setFilterGradeId] = useState('');
  const [filterYear, setFilterYear] = useState<number | undefined>(CURRENT_YEAR);

  const { data: history = [], isLoading } = useEnrollmentHistory({
    gradeId: filterGradeId || undefined,
    year: filterYear,
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 p-4 rounded-2xl border bg-card">
        <div>
          <p className="text-xs text-muted-foreground mb-1">ระดับชั้น</p>
          <Select
            value={filterGradeId}
            onValueChange={setFilterGradeId}
          >
            <SelectTrigger className="rounded-xl w-36">
              <SelectValue placeholder="ทุกระดับชั้น" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">ทุกระดับชั้น</SelectItem>
              {grades.map(g => (
                <SelectItem key={g.id} value={g.id}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">ปีการศึกษา</p>
          <Select
            value={filterYear ? String(filterYear) : ''}
            onValueChange={v => setFilterYear(v ? Number(v) : undefined)}
          >
            <SelectTrigger className="rounded-xl w-32">
              <SelectValue placeholder="ทุกปี" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">ทุกปี</SelectItem>
              {YEAR_OPTIONS.map(y => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-2xl bg-card overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-sm">
            ประวัติการเลื่อนชั้น ({history.length} รายการ)
          </h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            กำลังโหลด...
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <History className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">ยังไม่มีประวัติ</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-xs text-muted-foreground">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">นักเรียน</th>
                  <th className="text-left px-4 py-3 font-medium">รหัส</th>
                  <th className="text-left px-4 py-3 font-medium">ระดับชั้น</th>
                  <th className="text-left px-4 py-3 font-medium">ห้อง</th>
                  <th className="text-left px-4 py-3 font-medium">ปี / เทอม</th>
                  <th className="text-left px-4 py-3 font-medium">สถานะ</th>
                  <th className="text-left px-4 py-3 font-medium">วันที่</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {history.map(record => {
                  const badge = STATUS_BADGE[record.status] ?? STATUS_BADGE.ACTIVE;
                  return (
                    <tr key={record.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar
                            name={`${record.student.firstName} ${record.student.lastName}`}
                            imageUrl={record.student.profileImageUrl}
                          />
                          <div>
                            <p className="font-medium">
                              {record.student.firstName} {record.student.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {record.student.nickName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                        {record.student.studentCode}
                      </td>
                      <td className="px-4 py-3">{record.grade.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {record.classroom?.name ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {record.year} / เทอม {record.term}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {record.startDate
                          ? new Date(record.startDate).toLocaleDateString('th-TH')
                          : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StudentsPromotionPage() {
  const [tab, setTab] = useState<'promotion' | 'history'>('promotion');

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold mb-1">Student Promotion</h2>
        <p className="text-sm text-muted-foreground">
          เลื่อนชั้น / ซ้ำชั้น / ย้ายโรงเรียน และดูประวัติย้อนหลัง
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-0">
        <button
          type="button"
          onClick={() => setTab('promotion')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
            tab === 'promotion'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            เลื่อนชั้น
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTab('history')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
            tab === 'history'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <History className="w-4 h-4" />
            ประวัติย้อนหลัง
          </span>
        </button>
      </div>

      {tab === 'promotion' ? <PromotionTab /> : <HistoryTab />}
    </div>
  );
}
