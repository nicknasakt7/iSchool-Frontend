'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
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

  studentIndex: number; // 👈 เพิ่ม
  onScoreChange: (
    studentIndex: number,
    scoreIndex: number,
    value: number,
  ) => void; // 👈 เพิ่ม
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

  // sync ตอน props เปลี่ยน
  useEffect(() => {
    setLocalScores(scores);
  }, [scores]);

  const handleChange = (
    index: number,
    field: keyof ScoreItem,
    value: string | number,
  ) => {
    setLocalScores(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === 'label' ? value : Number(value),
      };
      return updated;
    });
  };

  const handleSave = () => {
    // TODO: ยิงกลับไป parent หรือ API
    console.log('saved', localScores);
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setLocalScores(scores); // rollback
    setIsEditing(false);
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div>
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-sm text-muted-foreground">{nickname}</p>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {localScores.map((item, i) => (
            <div key={i} className="bg-muted rounded-xl p-3 space-y-2 relative">
              <button className="absolute top-1 right-1 text-red-500 opacity-60 hover:opacity-100">
                <X size={14} />
              </button>

              {/* label */}
              <Input
                value={item.label}
                readOnly={!isEditing}
                onChange={e => handleChange(i, 'label', e.target.value)}
                className="h-7 text-xs"
              />

              {/* score */}
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={item.score}
                  readOnly={!isEditing}
                  onChange={e => {
                    const value = Number(e.target.value);

                    handleChange(i, 'score', value); // update local

                    onScoreChange(studentIndex, i, value);
                  }}
                  className="w-12 h-7 text-center px-1 text-sm"
                />

                <span className="text-xs">/</span>

                <Input
                  type="number"
                  value={item.max}
                  readOnly={!isEditing}
                  onChange={e => handleChange(i, 'max', e.target.value)}
                  className="w-12 h-7 text-center px-1 text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add Score */}
        {isEditing && (
          <Button
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() =>
              setLocalScores(prev => [
                ...prev,
                { label: 'New', score: 0, max: 10 },
              ])
            }
          >
            <Plus size={14} className="mr-1" />
            Add Score
          </Button>
        )}

        {/* Total */}
        <div className="flex items-center gap-6">
          <p className="text-xl font-bold text-blue-600">{total}/100</p>
          <p className="text-muted-foreground">GPA {gpa}</p>
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
