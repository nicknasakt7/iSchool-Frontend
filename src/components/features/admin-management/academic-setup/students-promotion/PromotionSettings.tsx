'use client';

import { ArrowRight } from 'lucide-react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type PromotionSettingsProps = {
  year: string;
  setYear: (v: string) => void;
  currentGrade: string;
  setCurrentGrade: (v: string) => void;
  nextGrade: string;
  setNextGrade: (v: string) => void;
  classroom: string;
  setClassroom: (v: string) => void;
};

export default function PromotionSettings({
  year,
  setYear,
  currentGrade,
  setCurrentGrade,
  nextGrade,
  setNextGrade,
  classroom,
  setClassroom,
}: PromotionSettingsProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Promotion Settings</h2>

      {/* 🔥 ACADEMIC YEAR (CURRENT) */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 font-medium">ACADEMIC YEAR</p>

        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-full bg-gray-50">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔥 CURRENT GRADE */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 font-medium">CURRENT GRADE</p>

        <Select value={currentGrade} onValueChange={setCurrentGrade}>
          <SelectTrigger className="w-full bg-gray-50">
            <SelectValue placeholder="Select Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Grade 1">Grade 1</SelectItem>
            <SelectItem value="Grade 2">Grade 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔥 ARROW */}
      <div className="flex justify-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <ArrowRight className="text-blue-600" size={20} />
        </div>
      </div>

      {/* 🔥 PROMOTE TO (NEW YEAR + NEW GRADE) */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500 font-medium">PROMOTE TO</p>

        {/* ✅ YEAR ตอน promote */}
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-full border-blue-400 bg-blue-50">
            <SelectValue placeholder="Select Academic Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
          </SelectContent>
        </Select>

        {/* ✅ GRADE ตอน promote */}
        <Select value={nextGrade} onValueChange={setNextGrade}>
          <SelectTrigger className="w-full border-blue-400 bg-blue-50">
            <SelectValue placeholder="Select Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Grade 2">Grade 2</SelectItem>
            <SelectItem value="Grade 3">Grade 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔥 CLASSROOM FILTER */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 font-medium">FILTER BY CLASSROOM</p>

        <Select value={classroom} onValueChange={setClassroom}>
          <SelectTrigger className="w-full bg-gray-50">
            <SelectValue placeholder="Select Classroom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Classrooms</SelectItem>
            <SelectItem value="1/A">1/A</SelectItem>
            <SelectItem value="1/B">1/B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🔥 STATISTICS */}
      <div className="pt-4 border-t space-y-3">
        <p className="text-sm font-medium text-gray-500">STUDENT STATISTICS</p>

        <div className="space-y-2">
          <div className="flex justify-between bg-green-100 text-green-600 px-4 py-2 rounded-lg">
            <span>Eligible</span>
            <span>3</span>
          </div>

          <div className="flex justify-between bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg">
            <span>On Hold</span>
            <span>1</span>
          </div>

          <div className="flex justify-between bg-orange-100 text-orange-600 px-4 py-2 rounded-lg">
            <span>Repeat Year</span>
            <span>1</span>
          </div>
        </div>
      </div>

      {/* 🔥 WARNING */}
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 p-4 rounded-xl text-sm">
        <p className="font-medium mb-1">⚠ Important</p>
        <p>
          Grade promotion is permanent and will update all student records.
          Please review carefully before confirming.
        </p>
      </div>
    </div>
  );
}
