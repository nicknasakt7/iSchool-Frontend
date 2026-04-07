'use client';

// Using TanStack Query for mutation lifecycle (loading, error, success)
// API calls are abstracted in service layer
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateScoreItem } from '@/lib/api/assessment/hooks/useUpdateScoreItem';
import { useGetTeacherComment } from '@/lib/api/teacher-comment/hooks/useGetTeacherComment';
import { useUpsertTeacherComment } from '@/lib/api/teacher-comment/hooks/useUpsertTeacherComment';
import { Loader } from 'lucide-react';

type ScoreItem = {
  // scoreItemId is the backend ScoreItem.id — required by PATCH /score-item.
  // It remains undefined until a GET /scores endpoint populates it.
  scoreItemId?: string;
  label: string;
  score: number;
  max: number;
};

type StudentPerformanceCardProps = {
  studentId: string;
  name: string;
  nickname?: string;
  scores: ScoreItem[];
  total: number;
  grade: string;
  subjectId: string;
  term: number;
  year: number;
  studentIndex: number;
  onScoreChange: (
    studentIndex: number,
    scoreIndex: number,
    value: number,
  ) => void;
};

export default function StudentPerformanceCard({
  studentId,
  name,
  nickname,
  scores,
  total,
  grade,
  subjectId,
  term,
  year,
  onScoreChange,
  studentIndex,
}: StudentPerformanceCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localScores, setLocalScores] = useState(scores);
  const [comment, setComment] = useState('');
  const [isEditingComment, setIsEditingComment] = useState(false);

  const { mutate: saveScore, isPending: isSaving } = useUpdateScoreItem();
  const { data: commentData } = useGetTeacherComment({
    studentId,
    subjectId,
    term,
    year,
  });
  const { mutate: saveComment, isPending: isSavingComment } =
    useUpsertTeacherComment();

  useEffect(() => {
    setLocalScores(scores);
  }, [scores]);

  // Sync comment from server
  useEffect(() => {
    if (commentData?.content !== undefined) {
      setComment(commentData.content);
    }
  }, [commentData]);

  const handleChange = (index: number, value: number) => {
    setLocalScores(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], score: value };
      return updated;
    });
    onScoreChange(studentIndex, index, value);
  };

  const handleSave = () => {
    const itemsToSave = localScores.filter(item => item.scoreItemId);

    if (itemsToSave.length === 0) {
      setIsEditing(false);
      return;
    }

    let completed = 0;
    itemsToSave.forEach(item => {
      saveScore(
        { scoreItemId: item.scoreItemId!, value: item.score },
        {
          onSuccess: () => {
            completed++;
            if (completed === itemsToSave.length) {
              setIsEditing(false);
            }
          },
        },
      );
    });
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
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm">
            {studentIndex + 1}
          </div>
          <div className="bg-amber-600 rounded-lg w-15 h-15 flex items-center justify-center">
            SJ
          </div>

          <div>
            <p className="font-semibold text-lg">{name}</p>
            <p className="text-sm text-muted-foreground">{nickname}</p>
          </div>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {localScores.map((item, i) => (
            <div key={i} className="bg-muted rounded-xl p-3 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                {i + 1}.
              </p>
              <Input value={item.label} readOnly className="h-7 text-xs" />

              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={item.score}
                  readOnly={!isEditing}
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
            <p className="text-lg font-bold text-new-blue-500">{total}/100</p>
          </div>
          <div className="flex flex-col items-center text-lg font-bold">
            Grade
            <p className="text-lg font-bold text-new-blue-500">{grade}</p>
          </div>
        </div>

        {/* Score Edit Buttons */}
        <div className="flex gap-4">
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="outline"
                onClick={handleDiscard}
                disabled={isSaving}
              >
                Discard
              </Button>
            </>
          )}
        </div>

        {/* Teacher Comment */}
        <div className="space-y-2 border-t pt-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Teacher Comment
          </p>
          <Textarea
            value={comment}
            onChange={e => {
              setComment(e.target.value);
              if (!isEditingComment) setIsEditingComment(true);
            }}
            placeholder="write the comment to this student ...."
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
                  <>
                    Saving... <Loader className="animate-spin" />
                  </>
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
