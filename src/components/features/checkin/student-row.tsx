'use client';

import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

type StudentRowProps = {
  student: {
    id: string;
    name: string;
    status: 'present' | 'absent';
  };
};

export default function StudentRow({ student }: StudentRowProps) {
  return (
    <div className="flex items-center justify-between bg-card p-4 rounded-2xl shadow-sm">
      {/* left */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted rounded-full" />
        <div>
          <p className="font-medium">{student.name}</p>
          <p className="text-xs text-muted-foreground">ID: #40201</p>
        </div>
      </div>

      {/* right */}
      <div className="flex gap-2">
        <Button className="rounded-full px-4" variant="default">
          <Check className="mr-1" size={14} />
          Present
        </Button>

        <Button
          className={`rounded-full px-4 ${
            student.status === 'absent' ? 'bg-red-600 text-white' : ''
          }`}
          variant="outline"
        >
          <X className="mr-1" size={14} />
          Absent
        </Button>
      </div>
    </div>
  );
}
