'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Student, ParentMatchResult } from '@/lib/api/student/student.type';
import { studentService } from '@/lib/api/student/student.service';
import { useConfirmParentMatch, useAssignParent, useRemoveParent } from '@/lib/api/student/hooks/useParentMatching';
import { useParents } from '@/lib/api/parent/hooks/useParents';
import { useDebounce } from '@/lib/api/student/hooks/useDebounce';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Link2, Link2Off, UserSearch, Mail } from 'lucide-react';

type Props = {
  student: Student | null;
};

export default function MatchingParents({ student }: Props) {
  const { data: session } = useSession();

  /* ── Find-by-email state ── */
  const [findEnabled, setFindEnabled] = useState(false);

  /* ── Manual search state ── */
  const [manualSearch, setManualSearch] = useState('');
  const debouncedManual = useDebounce(manualSearch, 400);

  /* ── Reset when student changes ── */
  useEffect(() => {
    setFindEnabled(false);
    setManualSearch('');
  }, [student?.id]);

  /* ── Auto-match query (manual trigger) ── */
  const {
    data: matchResult,
    isFetching: isFinding,
    refetch: doFind,
  } = useQuery<ParentMatchResult>({
    queryKey: ['parent-match', student?.id],
    queryFn: () =>
      studentService.findParentMatch(student!.id, session?.user?.accessToken),
    enabled: findEnabled && !!student?.id && !!session?.user?.accessToken,
    retry: false,
  });

  /* ── Manual parent search ── */
  const { data: parentSearchResult } = useParents(debouncedManual);

  /* ── Mutations ── */
  const { mutate: confirmMatch, isPending: isConfirming } = useConfirmParentMatch();
  const { mutate: assignParent, isPending: isAssigning } = useAssignParent();
  const { mutate: removeParent, isPending: isRemoving } = useRemoveParent();

  const handleFind = () => {
    setFindEnabled(true);
    // if already enabled, refetch explicitly
    if (findEnabled) doFind();
  };

  useEffect(() => {
    if (findEnabled && student?.id) doFind();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findEnabled]);

  if (!student) {
    return (
      <div className="h-full min-h-100 rounded-2xl border bg-muted/30 flex flex-col items-center justify-center text-center p-6 gap-3">
        <UserSearch size={40} className="text-muted-foreground/40" />
        <p className="text-muted-foreground">Select a student to manage their parent link</p>
      </div>
    );
  }

  const isLinked = !!student.parentId;

  return (
    <div className="flex flex-col gap-5">
      {/* ─── Student info + current relation ─── */}
      <div className="rounded-xl border bg-card p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-lg">{student.firstName} {student.lastName}</p>
            <p className="text-sm text-muted-foreground">
              Registered parent email: <span className="font-medium text-foreground">{student.parentsEmail || '—'}</span>
            </p>
          </div>
          <Badge variant={isLinked ? 'default' : 'secondary'}
            className={isLinked ? 'bg-green-100 text-green-700 border-green-200' : ''}>
            {isLinked ? 'Linked' : 'Unlinked'}
          </Badge>
        </div>

        {isLinked && student.parent && (
          <div className="flex items-center justify-between rounded-lg bg-green-50 border border-green-200 px-4 py-3">
            <div>
              <p className="text-xs text-green-600 font-medium mb-0.5">CURRENT GUARDIAN</p>
              <p className="font-semibold text-sm">{student.parent.firstName} {student.parent.lastName}</p>
              {student.parent.tel && (
                <p className="text-xs text-muted-foreground">{student.parent.tel}</p>
              )}
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive border-destructive/40 hover:bg-destructive/10">
                  <Link2Off size={14} className="mr-1" /> Remove
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Parent Relation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Unlink <strong>{student.parent.firstName} {student.parent.lastName}</strong> from <strong>{student.firstName} {student.lastName}</strong>?
                    This does not delete any accounts.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      removeParent(student.id, {
                        onSuccess: () => toast.success('Parent relation removed'),
                        onError: (e) => toast.error(e.message ?? 'Failed to remove'),
                      })
                    }
                    disabled={isRemoving}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {/* ─── Auto-match by email ─── */}
      <div className="rounded-xl border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-muted-foreground" />
          <p className="font-semibold text-sm">Auto-Match by Email</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Search for a registered parent whose login email matches the student&apos;s registered parent email.
        </p>

        <Button
          size="sm"
          onClick={handleFind}
          disabled={isFinding || !student.parentsEmail}
          className="w-full"
        >
          {isFinding ? 'Searching...' : '✦ Find Parents by Email'}
        </Button>

        {matchResult && (
          <div className="pt-1">
            {!matchResult.matchFound ? (
              <div className="rounded-lg bg-muted/50 border px-4 py-3 text-sm text-center text-muted-foreground">
                No registered parent found for <strong>{matchResult.parentsEmail}</strong>
              </div>
            ) : (
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                    EMAIL MATCH FOUND
                  </span>
                </div>

                <div>
                  <p className="font-semibold">
                    {matchResult.candidate!.firstName} {matchResult.candidate!.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{matchResult.candidate!.email}</p>
                  {matchResult.candidate!.tel && (
                    <p className="text-sm text-muted-foreground">Tel: {matchResult.candidate!.tel}</p>
                  )}
                </div>

                {matchResult.alreadyMatched && matchResult.currentParent?.id === matchResult.candidate?.id ? (
                  <Badge className="bg-green-100 text-green-700 border-green-200">Already linked</Badge>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" className="w-full">
                        <Link2 size={14} className="mr-1.5" /> Confirm Match
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Parent Match</AlertDialogTitle>
                        <AlertDialogDescription>
                          Link <strong>{matchResult.candidate!.firstName} {matchResult.candidate!.lastName}</strong> as guardian of <strong>{student.firstName} {student.lastName}</strong>?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            confirmMatch(
                              { studentId: student.id, parentId: matchResult.candidate!.id },
                              {
                                onSuccess: () => toast.success('Parent matched successfully'),
                                onError: (e) => toast.error(e.message ?? 'Failed to match'),
                              },
                            )
                          }
                          disabled={isConfirming}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── Manual search ─── */}
      <div className="rounded-xl border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-muted-foreground" />
          <p className="font-semibold text-sm">Manual Assignment</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Search parents by name or email — use this when emails don&apos;t match or for reassigning.
        </p>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Type parent name or email..."
            value={manualSearch}
            onChange={e => setManualSearch(e.target.value)}
          />
        </div>

        {debouncedManual.length >= 2 && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {!parentSearchResult?.data.length && (
              <p className="text-sm text-muted-foreground text-center py-3">No parents found</p>
            )}
            {(parentSearchResult?.data ?? []).map(p => {
              const alreadyThisParent = student.parentId === p.id;
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm"
                >
                  <div className="min-w-0">
                    <p className="font-medium">{p.firstName} {p.lastName}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.email}</p>
                    {p.students && p.students.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {p.students.length} student{p.students.length > 1 ? 's' : ''} linked
                      </p>
                    )}
                  </div>

                  {alreadyThisParent ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200 shrink-0">Linked</Badge>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="shrink-0">
                          Assign
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Assign Parent</AlertDialogTitle>
                          <AlertDialogDescription>
                            Assign <strong>{p.firstName} {p.lastName}</strong> as guardian of <strong>{student.firstName} {student.lastName}</strong>?
                            {student.parentId && ' This will replace the current parent link.'}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              assignParent(
                                { studentId: student.id, parentId: p.id },
                                {
                                  onSuccess: () => {
                                    toast.success(`${p.firstName} ${p.lastName} assigned`);
                                    setManualSearch('');
                                  },
                                  onError: (e) => toast.error(e.message ?? 'Failed to assign'),
                                },
                              )
                            }
                            disabled={isAssigning}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {debouncedManual.length > 0 && debouncedManual.length < 2 && (
          <p className="text-xs text-muted-foreground">Type at least 2 characters to search</p>
        )}
      </div>
    </div>
  );
}
