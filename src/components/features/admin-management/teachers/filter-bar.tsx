"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type FilterValues = {
  search: string;
  grade: string;
  classroom: string;
  subject: string;
};

type FilterBarProps = {
  value: FilterValues;
  onFilterChange: (value: FilterValues) => void;
};

export default function FilterBar({ value, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* 🔍 Search */}
      <Input
        placeholder="Search teachers by name or class"
        className="max-w-sm"
        value={value.search}
        onChange={(e) => onFilterChange({ ...value, search: e.target.value })}
      />

      {/* 🎓 Grade */}
      <Select
        value={value.grade}
        onValueChange={(v) => onFilterChange({ ...value, grade: v })}
      >
        <SelectTrigger className="w-180px">
          <SelectValue placeholder="Grade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Grade 1</SelectItem>
          <SelectItem value="2">Grade 2</SelectItem>
          <SelectItem value="3">Grade 3</SelectItem>
        </SelectContent>
      </Select>

      {/* 🏫 Classroom */}
      <Select
        value={value.classroom}
        onValueChange={(v) => onFilterChange({ ...value, classroom: v })}
      >
        <SelectTrigger className="w-180px">
          <SelectValue placeholder="Classroom" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Class 1</SelectItem>
          <SelectItem value="2">Class 2</SelectItem>
        </SelectContent>
      </Select>

      {/* 📘 Subject */}
      <Select
        value={value.subject}
        onValueChange={(v) => onFilterChange({ ...value, subject: v })}
      >
        <SelectTrigger className="w-180px">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="math">Math</SelectItem>
          <SelectItem value="eng">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
