'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';

type Status = 'contacted' | 'waiting';

export default function ActivityRow() {
  const status: Status = 'contacted'; // mock ไว้ก่อน

  return (
    <div className="grid grid-cols-5 items-center px-4 py-4 border-t text-sm hover:bg-muted/40 transition">
      {/* Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold">
          DR
        </div>

        <div>
          <p className="font-medium">Dr. Elena Rodriguez</p>
          <p className="text-xs text-muted-foreground">elena@school.edu</p>
        </div>
      </div>

      {/* Grade */}
      <div>P.1</div>

      {/* Date */}
      <div>Oct 12, 2024</div>

      {/* Status Select */}
      <div>
        <Select defaultValue={status}>
          <SelectTrigger className="w-32 h-8 rounded-full text-xs">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="waiting">Waiting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex justify-end text-right">
        <Trash2 className="text-destructive" />
      </div>
    </div>
  );
}
