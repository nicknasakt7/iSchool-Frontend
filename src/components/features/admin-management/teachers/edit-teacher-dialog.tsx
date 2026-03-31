"use client";

import { Teacher } from "@/components/mocks/mock-teacher";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { useState } from "react";

type EditTeacherDialogProps = {
  teacher: Teacher;
  onSave?: (teacher: Teacher) => void;
};

const grades = ["1", "2", "3", "4", "5"];
const subjects = ["Mathematics", "Science", "English"];

export default function EditTeacherDialog({
  teacher,
  onSave,
}: EditTeacherDialogProps) {
  const [open, setOpen] = useState(false);

  // 🔥 แก้ให้เป็น array (สำคัญมาก)
  const [form, setForm] = useState<Teacher>({
    ...teacher,
    grade: Array.isArray(teacher.grade) ? teacher.grade : [teacher.grade],
    subject: Array.isArray(teacher.subject)
      ? teacher.subject
      : [teacher.subject],
    classroom: teacher.classroom || "",
  });

  // 🔥 multi select logic
  const toggleGrade = (g: string) => {
    setForm((prev) => ({
      ...prev,
      grade: prev.grade.includes(g)
        ? prev.grade.filter((x) => x !== g)
        : [...prev.grade, g],
    }));
  };

  const toggleSubject = (s: string) => {
    setForm((prev) => ({
      ...prev,
      subject: prev.subject.includes(s)
        ? prev.subject.filter((x) => x !== s)
        : [...prev.subject, s],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl space-y-4">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
        </DialogHeader>

        {/* Name */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <Label>First Name</Label>
            <Input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Last Name</Label>
            <Input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
        </div>

        {/* Grade */}
        <div>
          <Label>Grade</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {form.grade.length > 0
                  ? `Grade: ${form.grade.join(", ")}`
                  : "Select Grade"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="space-y-2">
              {grades.map((g) => (
                <div key={g} className="flex items-center gap-2">
                  <Checkbox
                    checked={form.grade.includes(g)}
                    onCheckedChange={() => toggleGrade(g)}
                  />
                  <span>Grade {g}</span>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        {/* Subject */}
        <div>
          <Label>Subject</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {form.subject.length > 0
                  ? `Subject: ${form.subject.join(", ")}`
                  : "Select Subject"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="space-y-2">
              {subjects.map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <Checkbox
                    checked={form.subject.includes(s)}
                    onCheckedChange={() => toggleSubject(s)}
                  />
                  <span>{s}</span>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        {/* 🔥 Classroom (เพิ่มใหม่) */}
        <div className="flex flex-col gap-1">
          <Label>Classroom</Label>
          <Select
            value={form.classroom}
            onValueChange={(v) => setForm({ ...form, classroom: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Classroom" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">Class 1</SelectItem>
              <SelectItem value="2">Class 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Save */}
        <Button
          className="w-full rounded-full"
          onClick={() => {
            onSave?.(form);
            setOpen(false);
          }}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
