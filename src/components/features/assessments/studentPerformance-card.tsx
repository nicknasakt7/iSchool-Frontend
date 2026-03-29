'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type ScoreItem = {
  label: string;
  score: number;
  max: number;
};

type StudentPerformanceCardProps = {
  name: string;
  nickname?: string;
  scores: ScoreItem[];
  total: number;
  gpa: number;

  studentIndex: number;
  onScoreChange: (
    studentIndex: number,
    scoreIndex: number,
    value: number,
  ) => void;
};

export default function StudentPerformanceCard({
  name,
  nickname,
  scores,
  total,
  gpa,
  onScoreChange,
  studentIndex,
}: StudentPerformanceCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localScores, setLocalScores] = useState(scores);

  useEffect(() => {
    setLocalScores(scores);
  }, [scores]);

  const handleChange = (index: number, value: number) => {
    setLocalScores(prev => {
      const updated = [...prev];
      updated[index].score = value;
      return updated;
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setLocalScores(scores);
    setIsEditing(false);
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm">
            {studentIndex + 1}
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
              {/* เลขลำดับ */}
              <p className="text-xs font-semibold text-muted-foreground">
                {i + 1}.
              </p>
              {/* label (ล็อก) */}
              <Input value={item.label} readOnly className="h-7 text-xs" />

              {/* score */}
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={item.score}
                  readOnly={!isEditing}
                  onChange={e => {
                    const value = Number(e.target.value);

                    handleChange(i, value);
                    onScoreChange(studentIndex, i, value);
                  }}
                  className="w-12 h-7 text-center px-1 text-sm"
                />

                <span className="text-xs">/</span>

                {/* max (ล็อก) */}
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

        {/* ลบ Add Score ไปแล้ว */}

        {/* Total */}
        <div className="flex items-center gap-6">
          <p className="text-xl font-bold text-blue-600">{total}/100</p>
          <p className="text-new-blue-500">GPA {gpa}</p>
        </div>

        {/* Comment */}
        <Textarea
          placeholder="Enter feedback..."
          readOnly={!isEditing}
          className="min-h-25 max-h-40 resize-none overflow-y-auto"
        />

        {/* Buttons */}
        <div className="flex gap-4">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          ) : (
            <>
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={handleDiscard}>
                Discard
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
