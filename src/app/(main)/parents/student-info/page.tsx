'use client';

import React, { useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useMyStudents } from '@/lib/api/parent/hooks/useMyStudents';
import { useStudentDetail } from '@/lib/api/student/hooks/useStudentDetail';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import {
  GraduationCap,
  CalendarDays,
  Heart,
  AlertCircle,
  BookOpen,
  Sparkles,
  TrendingUp,
  User,
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

function gradeLabel(g: number): string {
  if (g >= 3.75) return 'A';
  if (g >= 3.25) return 'B+';
  if (g >= 2.75) return 'B';
  if (g >= 2.25) return 'C+';
  if (g >= 1.75) return 'C';
  if (g >= 1.25) return 'D+';
  if (g >= 0.75) return 'D';
  return 'F';
}

function gradeColor(g: number): string {
  if (g >= 3.5) return 'text-emerald-600';
  if (g >= 2.5) return 'text-blue-600';
  if (g >= 1.5) return 'text-amber-600';
  return 'text-red-500';
}

function formatDob(dob: string) {
  try {
    return new Date(dob).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dob;
  }
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// ─── AI Insights Panel ───────────────────────────────────────────────────────

type ScoreItem = { id: string; subjectGrade: number; totalScore: number; subject: { name: string } };
type CommentItem = { id: string; content: string; subject: { name: string }; teacher: { firstName: string; lastName: string } };

type AiInsightsPanelProps = {
  scores: ScoreItem[];
  comments: CommentItem[];
  healthNote?: string | null;
  gpa: string | null;
  studentName: string;
};

function Section({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-muted/40 p-4 space-y-2">
      <p className={`text-xs uppercase tracking-widest font-semibold ${color}`}>{label}</p>
      <div className="text-sm text-foreground/80 space-y-1">{children}</div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-start">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-50" />
      <p>{children}</p>
    </div>
  );
}

function AiInsightsPanel({ scores, comments, healthNote, gpa, studentName }: AiInsightsPanelProps) {
  const name = studentName || 'นักเรียน';
  const gpaNum = gpa ? parseFloat(gpa) : null;

  // หาวิชาที่แข็งแกร่งที่สุดและอ่อนที่สุด
  const sorted = [...scores].sort((a, b) => b.subjectGrade - a.subjectGrade);
  const strongSubjects = sorted.slice(0, 2).map(s => s.subject.name);
  const weakSubjects = sorted.slice(-2).filter(s => s.subjectGrade < 2.5).map(s => s.subject.name);

  // ประมาณสายการเรียนจากวิชาที่เก่ง
  const sciMathKeywords = ['คณิต', 'วิทย', 'ฟิสิกส์', 'เคมี', 'ชีว', 'math', 'science', 'physics', 'chemistry', 'bio'];
  const artLangKeywords = ['ภาษา', 'อังกฤษ', 'จีน', 'ญี่ปุ่น', 'ฝรั่งเศส', 'english', 'language', 'french', 'japanese'];
  const socialKeywords = ['สังคม', 'ประวัติ', 'ภูมิ', 'กฎหมาย', 'social', 'history', 'geography', 'law'];

  const allNames = scores.map(s => s.subject.name.toLowerCase()).join(' ');
  const isSciMath = sciMathKeywords.some(k => allNames.includes(k.toLowerCase()));
  const isArtLang = artLangKeywords.some(k => allNames.includes(k.toLowerCase()));
  const isSocial = socialKeywords.some(k => allNames.includes(k.toLowerCase()));

  const pathSuggestions: string[] = [];
  if (isSciMath && gpaNum && gpaNum >= 3.0) pathSuggestions.push('วิทย์-คณิต');
  if (isSciMath) pathSuggestions.push('ศิลป์คำนวณ');
  if (isArtLang) pathSuggestions.push('ศิลป์ภาษา');
  if (isSocial) pathSuggestions.push('ไทย-สังคม / นิติศาสตร์');
  if (!pathSuggestions.length) pathSuggestions.push('ยังไม่มีข้อมูลเพียงพอสำหรับการคาดเดาสายการเรียน');

  return (
    <div className="space-y-4">

      {/* 1. การเรียน */}
      <Section label="📚 ด้านการเรียน" color="text-blue-600">
        {scores.length === 0 ? (
          <p className="text-muted-foreground">ยังไม่มีข้อมูลคะแนนในเทอมนี้</p>
        ) : (
          <>
            {gpaNum !== null && (
              <Bullet>
                GPA เฉลี่ยอยู่ที่ <strong>{gpa}</strong> —{' '}
                {gpaNum >= 3.5 ? 'ผลการเรียนอยู่ในระดับดีมาก' :
                  gpaNum >= 3.0 ? 'ผลการเรียนอยู่ในระดับดี' :
                    gpaNum >= 2.0 ? 'ผลการเรียนอยู่ในระดับปานกลาง ควรพัฒนาเพิ่มเติม' :
                      'ผลการเรียนยังต้องการการปรับปรุงอย่างเร่งด่วน'}
              </Bullet>
            )}
            {strongSubjects.length > 0 && (
              <Bullet>วิชาที่โดดเด่น: <strong>{strongSubjects.join(', ')}</strong> — ควรส่งเสริมต่อเนื่อง</Bullet>
            )}
            {weakSubjects.length > 0 ? (
              <Bullet>วิชาที่ควรให้ความสนใจเพิ่มเติม: <strong>{weakSubjects.join(', ')}</strong> — แนะนำให้หาครูสอนพิเศษหรือทบทวนเพิ่ม</Bullet>
            ) : (
              <Bullet>ไม่พบวิชาที่มีคะแนนต่ำกว่าเกณฑ์น่าเป็นห่วงในเทอมนี้</Bullet>
            )}
            {comments.length > 0 && (
              <Bullet>ครูได้ฝากข้อสังเกต {comments.length} รายการ — แนะนำให้อ่านและนำไปปรับใช้</Bullet>
            )}
          </>
        )}
      </Section>

      {/* 2. สังคมและเพื่อน */}
      <Section label="🤝 ด้านสังคมและเพื่อน" color="text-violet-600">
        <Bullet>
          {gpaNum && gpaNum >= 3.0
            ? `${name} มีผลการเรียนที่ดี ซึ่งมักสัมพันธ์กับการมีทัศนคติเชิงบวกและความรับผิดชอบต่อหน้าที่ในกลุ่ม`
            : `แนะนำให้ผู้ปกครองพูดคุยถึงสภาพแวดล้อมการเรียนและกลุ่มเพื่อนของ${name} เพื่อให้ทราบว่ามีสิ่งที่รบกวนการเรียนหรือไม่`}
        </Bullet>
        <Bullet>ควรส่งเสริมให้เข้าร่วมกิจกรรมนอกหลักสูตร เช่น ชมรมหรือกีฬา เพื่อพัฒนาทักษะการทำงานร่วมกัน</Bullet>
        <Bullet>หากมีสัญญาณว่า{name}ถูกโดดเดี่ยวหรือเครียดจากสังคมเพื่อน ควรแจ้งครูที่ปรึกษาโดยตรง</Bullet>
      </Section>

      {/* 3. สิ่งที่ควรปรับ */}
      <Section label="🔧 สิ่งที่ควรปรับปรุง" color="text-amber-600">
        {weakSubjects.length > 0 ? (
          <Bullet>ให้ความสำคัญกับ <strong>{weakSubjects.join(' และ ')}</strong> โดยอาจจัดตารางทบทวนหลังเลิกเรียน</Bullet>
        ) : (
          <Bullet>ผลการเรียนในทุกวิชาอยู่ในเกณฑ์ที่ยอมรับได้ ควรรักษาระดับนี้ต่อเนื่อง</Bullet>
        )}
        <Bullet>ฝึกนิสัยการวางแผนการอ่านหนังสือล่วงหน้า แทนการอ่านก่อนสอบ</Bullet>
        <Bullet>ส่งเสริมทักษะการจดบันทึกและการสรุปเนื้อหาด้วยตนเอง</Bullet>
      </Section>

      {/* 4. สิ่งที่ควรส่งเสริม */}
      <Section label="⭐ สิ่งที่ควรส่งเสริม" color="text-emerald-600">
        {strongSubjects.length > 0 && (
          <Bullet>
            ส่งเสริมความเชี่ยวชาญด้าน <strong>{strongSubjects.join(', ')}</strong> ด้วยการเข้าแข่งขันหรือเรียนเพิ่มเติมในระดับที่สูงขึ้น
          </Bullet>
        )}
        <Bullet>สนับสนุนการอ่านหนังสือนอกเวลา หรือดูสารคดีที่เกี่ยวกับสาขาที่สนใจ</Bullet>
        <Bullet>ชื่นชมความพยายามของ{name}เมื่อมีพัฒนาการ แม้จะเป็นเรื่องเล็กน้อย เพื่อสร้างแรงจูงใจ</Bullet>
      </Section>

      {/* 5. สุขภาพ */}
      <Section label="❤️ ด้านสุขภาพ" color="text-rose-600">
        {healthNote ? (
          <>
            <Bullet>บันทึกสุขภาพ: <strong className="text-amber-600">{healthNote}</strong></Bullet>
            <Bullet>โปรดแจ้งครูประจำชั้นและพยาบาลของโรงเรียนให้ทราบถึงข้อมูลนี้เพื่อความปลอดภัย</Bullet>
          </>
        ) : (
          <Bullet>ไม่พบบันทึกข้อมูลสุขภาพพิเศษ — อย่าลืมดูแลการนอนหลับพักผ่อนที่เพียงพอ (8 ชั่วโมง/วัน) และโภชนาการที่ดี</Bullet>
        )}
        <Bullet>นักเรียนในช่วงวัยนี้ควรได้รับการออกกำลังกายอย่างน้อย 3 ครั้งต่อสัปดาห์ เพื่อช่วยให้สมองทำงานได้ดีขึ้น</Bullet>
      </Section>

      {/* 6. สิ่งที่น่าเป็นห่วง vs ไม่ต้องห่วง */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section label="⚠️ สิ่งที่ควรติดตาม" color="text-orange-600">
          {weakSubjects.length > 0 ? (
            <Bullet>คะแนน <strong>{weakSubjects.join(', ')}</strong> ยังต่ำกว่าเป้าหมาย ควรพูดคุยกับครูประจำวิชา</Bullet>
          ) : (
            <Bullet>ยังไม่พบสิ่งที่น่ากังวลด้านวิชาการในเทอมนี้</Bullet>
          )}
          {healthNote && (
            <Bullet>ควรติดตามเรื่องสุขภาพอย่างสม่ำเสมอตามที่บันทึกไว้</Bullet>
          )}
          <Bullet>ความเครียดสะสมจากการเรียน — สังเกตพฤติกรรมของ{name}ที่บ้านด้วย</Bullet>
        </Section>

        <Section label="✅ ไม่ต้องกังวล" color="text-emerald-600">
          {strongSubjects.length > 0 && (
            <Bullet>ด้าน <strong>{strongSubjects[0]}</strong> — {name}มีผลการเรียนที่ดีและสม่ำเสมอ</Bullet>
          )}
          {gpaNum && gpaNum >= 2.5 && (
            <Bullet>ภาพรวม GPA อยู่ในเกณฑ์ที่ดี ไม่มีความเสี่ยงด้านผลการเรียนโดยรวม</Bullet>
          )}
          {!healthNote && (
            <Bullet>ไม่มีข้อจำกัดด้านสุขภาพที่ต้องดูแลเป็นพิเศษ</Bullet>
          )}
        </Section>
      </div>

      {/* 7. คาดเดาสายการเรียน */}
      <Section label="🎓 สายการเรียนที่น่าจะเหมาะสม" color="text-blue-600">
        <div className="flex flex-wrap gap-2 mt-1">
          {pathSuggestions.map((p, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              {p}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          * การคาดเดานี้อิงจากวิชาที่มีคะแนนโดดเด่น ควรปรึกษาครูแนะแนวเพื่อข้อมูลเพิ่มเติม
        </p>
      </Section>

    </div>
  );
}

export default function StudentsPage() {
  const { data: session } = useSession();
  const { data: students = [], isLoading: loadingStudents } = useMyStudents();

  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [term, setTerm] = useState(1);
  const [year, setYear] = useState(CURRENT_YEAR);
  const [aiGenerated, setAiGenerated] = useState(false);

  // Auto-select first student once loaded
  const resolvedId = selectedStudentId || students[0]?.id || '';

  const { data: detail, isLoading: loadingDetail } = useStudentDetail(
    resolvedId,
    { term, year },
  );

  const currentStudent = students.find(s => s.id === resolvedId) ?? students[0];

  // Calculate GPA from scores
  const gpa = useMemo(() => {
    const scores = detail?.scores ?? [];
    if (!scores.length) return null;
    const avg =
      scores.reduce((sum, s) => sum + s.subjectGrade, 0) / scores.length;
    return avg.toFixed(2);
  }, [detail?.scores]);

  const parentName = session?.user?.parent
    ? `${session.user.parent.firstName}`
    : (session?.user?.firstName ?? 'Parent');

  if (loadingStudents) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!students.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3 p-8">
          <GraduationCap
            size={48}
            className="text-muted-foreground/30 mx-auto"
          />
          <p className="text-lg font-semibold">No students linked</p>
          <p className="text-sm text-muted-foreground">
            Your account is not yet linked to any student. Please contact the
            school administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* ── HEADER BANNER ── */}
      <div className="bg-card border-b px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">
              Academic Overview
            </p>
            <h1 className="text-3xl font-bold">
              {getGreeting()}, {parentName}.
            </h1>
            <p className="text-muted-foreground mt-1 max-w-lg">
              {currentStudent
                ? `Here's an academic overview for ${currentStudent.firstName}.`
                : 'Select a student to view their academic overview.'}
            </p>
          </div>

          {/* GPA Card */}
          {gpa && (
            <Card className="min-w-40 text-center shadow-sm">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Cumulative GPA
                </p>
                <p className="text-5xl font-bold text-foreground">{gpa}</p>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-emerald-600">
                  <TrendingUp size={12} />
                  <span>
                    Term {term} / {year}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Student selector — only show if >1 students */}
        {students.length > 1 && (
          <div className="max-w-7xl mx-auto mt-5">
            <Select value={resolvedId} onValueChange={setSelectedStudentId}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select student..." />
              </SelectTrigger>
              <SelectContent>
                {students.map(s => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.firstName} {s.lastName}
                    {s.nickName ? ` (${s.nickName})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ─── LEFT: Student Profile ─── */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                  Student Profile
                </p>

                {/* Avatar */}
                <div className="flex flex-col items-center text-center gap-2 mb-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted ring-2 ring-primary/20">
                    {currentStudent?.profileImageUrl ? (
                      <Image
                        src={currentStudent.profileImageUrl}
                        alt="profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <User size={32} className="text-primary/50" />
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-400 ring-2 ring-white" />
                  </div>

                  <div>
                    <p className="font-semibold text-base leading-tight">
                      {currentStudent?.firstName} {currentStudent?.lastName}
                    </p>
                    {currentStudent?.nickName && (
                      <p className="text-sm text-muted-foreground">
                        {currentStudent.nickName}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {currentStudent?.grade && (
                      <Badge variant="secondary" className="text-xs">
                        {currentStudent.grade.name}
                      </Badge>
                    )}
                    {currentStudent?.classroom && (
                      <Badge variant="outline" className="text-xs">
                        Room {currentStudent.classroom.name}
                      </Badge>
                    )}
                    {gpa && parseFloat(gpa) >= 3.5 && (
                      <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                        Dean&apos;s List
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator className="my-3" />

                {/* Profile details */}
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                      Student ID
                    </p>
                    <p className="font-mono font-medium text-xs">
                      #{currentStudent?.studentCode}
                    </p>
                  </div>

                  {currentStudent?.dob && (
                    <div className="flex gap-2 items-start">
                      <CalendarDays
                        size={14}
                        className="text-muted-foreground mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                          Date of Birth
                        </p>
                        <p className="font-medium text-xs">
                          {formatDob(currentStudent.dob)}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStudent?.favorite && (
                    <div className="flex gap-2 items-start">
                      <Heart
                        size={14}
                        className="text-muted-foreground mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                          Favorite
                        </p>
                        <p className="font-medium text-xs">
                          {currentStudent.favorite}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStudent?.healthNote && (
                    <div className="flex gap-2 items-start">
                      <AlertCircle
                        size={14}
                        className="text-amber-500 mt-0.5 shrink-0"
                      />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                          Health Note
                        </p>
                        <p className="font-medium text-xs text-amber-700">
                          {currentStudent.healthNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─── RIGHT: Scores + AI ─── */}
          <div className="lg:col-span-9 space-y-5">
            {/* Term/Year filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Term</span>
                <Select
                  value={String(term)}
                  onValueChange={v => setTerm(Number(v))}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Term 1</SelectItem>
                    <SelectItem value="2">Term 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Year</span>
                <Select
                  value={String(year)}
                  onValueChange={v => setYear(Number(v))}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map(y => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Scores */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen size={18} className="text-muted-foreground" />
                  <h3 className="font-semibold text-base">Academic Results</h3>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Term {term} · {year}
                  </span>
                </div>

                {loadingDetail ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="animate-pulse h-12 rounded-lg bg-muted/50"
                      />
                    ))}
                  </div>
                ) : !detail?.scores?.length ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <BookOpen size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">
                      No results for Term {term} / {year}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {detail.scores.map(score => (
                      <div
                        key={score.id}
                        className="flex items-center gap-4 rounded-xl border bg-muted/20 px-4 py-3 hover:bg-muted/40 transition"
                      >
                        {/* Subject icon placeholder */}
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen size={15} className="text-primary" />
                        </div>

                        {/* Subject name */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {score.subject.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total score: {score.totalScore}
                          </p>
                        </div>

                        {/* Grade */}
                        <div className="text-right">
                          <p
                            className={`text-xl font-bold ${gradeColor(score.subjectGrade)}`}
                          >
                            {gradeLabel(score.subjectGrade)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {score.subjectGrade.toFixed(1)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Teacher Comments */}
            {!!detail?.comments?.length && (
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-base mb-4">
                    Teacher Comments
                  </h3>
                  <div className="space-y-3">
                    {detail.comments.map(c => (
                      <div
                        key={c.id}
                        className="rounded-xl border bg-muted/20 px-4 py-3"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-primary">
                            {c.subject.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {c.teacher.firstName} {c.teacher.lastName}
                          </p>
                        </div>
                        <p className="text-sm text-foreground/80">
                          {c.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Insights */}
            <Card className="shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-blue-500" />
                    <h3 className="font-semibold text-base">AI Insights</h3>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() => setAiGenerated(v => !v)}
                  >
                    <Sparkles />
                    {aiGenerated ? 'Refresh Analysis' : 'Generate Analysis'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mb-5">
                  การวิเคราะห์เชิงลึกจากข้อมูลผลการเรียนและบันทึกของครู
                </p>

                {!aiGenerated ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <Sparkles size={32} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium">พร้อมวิเคราะห์</p>
                    <p className="text-xs mt-1 opacity-70">
                      กด Generate Analysis เพื่อดูรายงานเชิงลึกสำหรับ{currentStudent?.firstName}
                    </p>
                  </div>
                ) : (
                  <AiInsightsPanel
                    scores={detail?.scores ?? []}
                    comments={detail?.comments ?? []}
                    healthNote={currentStudent?.healthNote}
                    gpa={gpa}
                    studentName={currentStudent?.firstName ?? ''}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
