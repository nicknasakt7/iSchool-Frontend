'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMyStudents } from '@/lib/api/parent/hooks/useMyStudents';
import { useStudentDetail } from '@/lib/api/student/hooks/useStudentDetail';
import { useSession } from 'next-auth/react';
import { Printer, Download, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── helpers ────────────────────────────────────────────────────────────────

function gradeLabel(g: number): string {
  if (g >= 3.75) return 'A';
  if (g >= 3.25) return 'A-';
  if (g >= 2.75) return 'B+';
  if (g >= 2.25) return 'B';
  if (g >= 1.75) return 'B-';
  if (g >= 1.25) return 'C+';
  if (g >= 0.75) return 'C';
  return 'F';
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

function genDocId(studentCode: string, term: number, year: number) {
  const suffix = `${studentCode.slice(-4)}-T${term}${String(year).slice(-2)}`;
  return `TR-${suffix}`.toUpperCase();
}

// ─── inner component (uses useSearchParams — must be wrapped in Suspense) ───

function AcademicResultContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: session } = useSession();

  const studentId = params.get('studentId') ?? '';
  const term = Number(params.get('term') ?? 1);
  const year = Number(params.get('year') ?? new Date().getFullYear());

  const { data: students = [] } = useMyStudents();
  const { data: detail, isLoading } = useStudentDetail(studentId, { term, year });

  const student = students.find(s => s.id === studentId) ?? students[0];

  const issuedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const docId = student?.studentCode
    ? genDocId(student.studentCode, term, year)
    : '—';

  const parentName = session?.user?.parent
    ? `${session.user.parent.firstName} ${session.user.parent.lastName ?? ''}`.trim()
    : student
      ? `${student.parentsFirstName ?? ''} ${student.parentsLastName ?? ''}`.trim()
      : '—';

  const gpa = useMemo(() => {
    const scores = detail?.scores ?? [];
    if (!scores.length) return null;
    const avg = scores.reduce((s, c) => s + c.subjectGrade, 0) / scores.length;
    return avg.toFixed(2);
  }, [detail?.scores]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      {/* Toolbar — hidden when printing */}
      <div className="max-w-3xl mx-auto mb-4 flex items-center justify-between print:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft size={16} /> Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer size={15} /> Print
          </Button>
          <Button size="sm" onClick={handlePrint} className="gap-2">
            <Download size={15} /> Download PDF
          </Button>
        </div>
      </div>

      {/* Document */}
      <div
        id="transcript"
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 print:shadow-none print:rounded-none print:p-8"
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="animate-spin size-8 text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* ── Header ── */}
            <div className="flex items-start justify-between border-b pb-5 mb-6">
              <div className="flex items-center gap-4">
                {/* School logo placeholder */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xl">iS</span>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground tracking-tight">iSchool</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-0.5">
                    Official Academic Transcript
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Document ID</p>
                <p className="font-bold text-primary text-sm font-mono">{docId}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Issued on: {issuedDate}</p>
              </div>
            </div>

            {/* ── Student Info ── */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 mb-8">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Student Name</p>
                <p className="font-semibold text-sm text-foreground">
                  {student ? `${student.firstName} ${student.lastName}` : '—'}
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Student ID</p>
                <p className="font-semibold text-sm text-foreground font-mono">
                  {student?.studentCode ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Date of Birth</p>
                <p className="font-semibold text-sm text-foreground">
                  {student?.dob ? formatDob(student.dob) : '—'}
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Current Grade</p>
                {detail?.grade ? (
                  <span className="inline-block px-2.5 py-0.5 rounded bg-muted text-[11px] font-semibold uppercase tracking-wide">
                    {detail.grade.name}
                  </span>
                ) : (
                  <p className="font-semibold text-sm">—</p>
                )}
              </div>
              <div className="col-span-2">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Parents / Guardians</p>
                <p className="font-semibold text-sm text-foreground">{parentName || '—'}</p>
              </div>
            </div>

            {/* ── Performance Summary ── */}
            <div className="mb-8">
              <h2 className="text-base font-bold mb-4 text-foreground">
                Semester {term === 1 ? 'I' : 'II'} — {year} Performance Summary
              </h2>

              {!detail?.scores?.length ? (
                <div className="text-center py-10 text-muted-foreground text-sm border rounded-xl">
                  No academic records found for this term.
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left text-[9px] uppercase tracking-widest text-muted-foreground pb-2 font-semibold">
                        Subject Name
                      </th>
                      <th className="text-center text-[9px] uppercase tracking-widest text-muted-foreground pb-2 font-semibold w-16">
                        Grade
                      </th>
                      <th className="text-center text-[9px] uppercase tracking-widest text-muted-foreground pb-2 font-semibold w-16">
                        Score
                      </th>
                      <th className="text-left text-[9px] uppercase tracking-widest text-muted-foreground pb-2 font-semibold">
                        Teacher Comments
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.scores.map(score => {
                      const comment = detail.comments?.find(
                        c => c.subjectId === score.subjectId,
                      );
                      return (
                        <tr key={score.id} className="border-b last:border-0">
                          <td className="py-3.5 font-medium text-foreground">
                            {score.subject.name}
                          </td>
                          <td className="py-3.5 text-center font-bold text-foreground">
                            {gradeLabel(score.subjectGrade)}
                          </td>
                          <td className="py-3.5 text-center text-muted-foreground">
                            {score.totalScore}
                          </td>
                          <td className="py-3.5 text-muted-foreground italic text-xs max-w-xs">
                            {comment
                              ? `"${comment.content}"`
                              : <span className="not-italic text-muted-foreground/50">—</span>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* ── GPA Summary ── */}
            {gpa && (
              <div className="mb-8 rounded-xl bg-muted/40 border px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">
                    Cumulative GPA — Term {term} / {year}
                  </p>
                  <p className="text-3xl font-bold text-foreground">{gpa}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Total Subjects</p>
                  <p className="text-2xl font-bold text-foreground">{detail?.scores?.length ?? 0}</p>
                </div>
              </div>
            )}

            {/* ── Footer ── */}
            <div className="border-t pt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-3">
                  Registrar Signature
                </p>
                <div className="w-16 h-16 rounded-lg bg-muted/50 border flex items-center justify-center">
                  <span className="text-muted-foreground/40 text-xs">SEAL</span>
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center mx-auto">
                  <div className="text-center">
                    <p className="text-[7px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight">
                      Official<br />Seal of<br />Authenticity
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-right max-w-48">
                <p className="text-[8px] text-muted-foreground/60 leading-relaxed">
                  This document is an electronically verified transcript.
                  Any alteration renders this document null and void.
                  For verification, use Document ID above.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── page export (Suspense wrapper required for useSearchParams) ─────────────

export default function AcademicResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin size-8 text-muted-foreground" />
        </div>
      }
    >
      <AcademicResultContent />
    </Suspense>
  );
}
