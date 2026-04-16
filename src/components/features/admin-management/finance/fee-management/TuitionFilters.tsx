'use client';

import { useState } from 'react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function TuitionFilters() {
  const [grade, setGrade] = useState('Grade 10');
  const [classroom, setClassroom] = useState('Classroom A');
  const [status, setStatus] = useState('All Status');

  return (
    <div className="bg-card p-6 rounded-2xl border shadow-sm flex justify-between items-center">
      <div className="flex gap-6">
        {/* 🔥 Grade */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground font-medium">SELECT GRADE</p>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger className="w-160px">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Grade 10">Grade 10</SelectItem>
              <SelectItem value="Grade 11">Grade 11</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 🔥 Classroom */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground font-medium">SELECT CLASSROOM</p>
          <Select value={classroom} onValueChange={setClassroom}>
            <SelectTrigger className="w-160px">
              <SelectValue placeholder="Select Classroom" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Classroom A">Classroom A</SelectItem>
              <SelectItem value="Classroom B">Classroom B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 🔥 Status */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground font-medium">PAYMENT STATUS</p>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-160px">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 🔥 Advanced Filters */}
      <button className="px-4 py-2 rounded-lg border text-primary hover:bg-muted transition">
        Advanced Filters
      </button>
    </div>
  );
}
