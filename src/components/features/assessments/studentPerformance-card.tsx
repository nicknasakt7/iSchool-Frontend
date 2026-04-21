'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateScoreItem } from '@/lib/api/assessment/hooks/useUpdateScoreItem';
import { useGetTeacherComment } from '@/lib/api/teacher-comment/hooks/useGetTeacherComment';
import { useUpsertTeacherComment } from '@/lib/api/teacher-comment/hooks/useUpsertTeacherComment';
import { Loader } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type ScoreItem = {
  scoreItemId?: string;
  label: string;
  score: number;
  max: number;
};

type StudentPerformanceCardProps = {
  studentId: string;
  name: string;
  nickName?: string;
  profileImageUrl?: string | null;
  scores: ScoreItem[];
  subjectId: string;
  term: number;
  year: number;
  studentIndex: number;
};

const computeGrade = (total: number): string => {
  if (total >= 80) return 'A';
  if (total >= 70) return 'B';
  if (total >= 60) return 'C';
  if (total >= 50) return 'D';
  return 'F';
};

function StudentAvatar({
  profileImageUrl,
  firstName,
  lastName,
}: {
  profileImageUrl?: string | null;
  firstName: string;
  lastName: string;
}) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  if (profileImageUrl) {
    return (
      <div className="w-12 h-12 rounded-xl overflow-hidden border border-border shrink-0">
        <Image
          src={profileImageUrl}
          alt={`${firstName} ${lastName}`}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
      <span className="text-white font-bold text-sm">{initials}</span>
    </div>
  );
}

export default function StudentPerformanceCard({
  studentId,
  name,
  nickName,
  profileImageUrl,
  scores,
  subjectId,
  term,
  year,
  studentIndex,
}: StudentPerformanceCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localScores, setLocalScores] = useState(scores);
  const [comment, setComment] = useState('');
  const [isEditingComment, setIsEditingComment] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync: saveScore, isPending: isSaving } = useUpdateScoreItem();
  const { data: commentData } = useGetTeacherComment({ studentId, subjectId, term, year });
  const { mutate: saveComment, isPending: isSavingComment } = useUpsertTeacherComment();

  useEffect(() => {
    if (!isEditing) {
      setLocalScores(scores);
    }
  }, [scores, isEditing]);

  useEffect(() => {
    if (commentData?.content !== undefined) {
      setComment(commentData.content);
    }
  }, [commentData]);

  const localTotal = localScores.reduce((sum, item) => sum + item.score, 0);
  const localGrade = computeGrade(localTotal);

  const [firstName, ...lastParts] = name.split(' ');
  const lastName = lastParts.join(' ');

  const handleChange = (index: number, value: number) => {
    const item = localScores[index];
    const clamped = Math.min(Math.max(0, value), item.max);
    setLocalScores(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], score: clamped };
      return updated;
    });
  };

  const handleSave = async () => {
    const itemsToSave = localScores.filter(item => item.scoreItemId);

    if (itemsToSave.length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      for (const item of itemsToSave) {
        await saveScore({ scoreItemId: item.scoreItemId!, value: item.score });
      }
      setIsEditing(false);
      toast.success('Scores saved');
      queryClient.invalidateQueries({ queryKey: ['full-assessment'] });
    } catch {
      // onError in useUpdateScoreItem already shows toast.error
    }
  };

  const handleDiscard = () => {
    setLocalScores(scores);
    setIsEditing(false);
  };

  const handleSaveComment = () => {
    if (!comment.trim()) return;
    saveComment(
      { studentId, subjectId, term, year, content: comment.trim() },
      { onSuccess: () => setIsEditingComment(false) },
    );
  };

  const handleDiscardComment = () => {
    setComment(commentData?.content ?? '');
    setIsEditingComment(false);
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
            {studentIndex + 1}
          </div>

          <StudentAvatar
            profileImageUrl={profileImageUrl}
            firstName={firstName}
            lastName={lastName || ' '}
          />

          <div>
            <p className="font-semibold text-lg leading-tight">{name}</p>
            {nickName && (
              <p className="text-sm text-muted-foreground">({nickName})</p>
            )}
          </div>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {localScores.map((item, i) => (
            <div key={i} className="bg-muted rounded-xl p-3 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">{i + 1}.</p>
              <Input value={item.label} readOnly className="h-7 text-xs" />

              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={item.score}
                  readOnly={!isEditing}
                  min={0}
                  max={item.max}
                  onChange={e => handleChange(i, Number(e.target.value))}
                  className="w-12 h-7 text-center px-1 text-sm"
                />
                <span className="text-xs">/</span>
                <Input
                  type="number"
                  value={item.max}
                  readOnly
                  className="w-12 h-7 text-center px-1 text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total + Grade */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col text-xl items-center font-bold">
            Total
            <p className="text-lg font-bold text-primary">{localTotal}/100</p>
          </div>
          <div className="flex flex-col items-center text-lg font-bold">
            Grade
            <p className="text-lg font-bold text-primary">{localGrade}</p>
          </div>
        </div>

        {/* Score Edit Buttons */}
        <div className="flex gap-4">
          {!isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              disabled={localScores.every(s => !s.scoreItemId)}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outline" onClick={handleDiscard} disabled={isSaving}>
                Discard
              </Button>
            </>
          )}
        </div>

        {/* Teacher Comment */}
        <div className="space-y-2 border-t pt-4">
          <p className="text-sm font-semibold text-muted-foreground">Teacher Comment</p>
          <Textarea
            value={comment}
            onChange={e => {
              setComment(e.target.value);
              if (!isEditingComment) setIsEditingComment(true);
            }}
            placeholder="Write a comment for this student..."
            className="resize-none text-sm min-h-20"
          />
          {isEditingComment && (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSaveComment}
                disabled={isSavingComment || !comment.trim()}
              >
                {isSavingComment ? (
                  <>Saving... <Loader className="animate-spin ml-1" /></>
                ) : (
                  'Save Comment'
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDiscardComment}
                disabled={isSavingComment}
              >
                Discard
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
