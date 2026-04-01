"use client";

import { useState } from "react";
import { X, BookOpen, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Subject = {
  id: number;
  name: string;
};

export default function SubjectCardSection() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "" },
    { id: 2, name: "" },
  ]);

  // ➕ เพิ่ม
  const addSubject = () => {
    setSubjects((prev) => [...prev, { id: Date.now(), name: "" }]);
  };

  // ❌ ลบ
  const removeSubject = (id: number) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  // ✏️ แก้ชื่อ
  const updateSubject = (id: number, value: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: value } : s)),
    );
  };
  const handleSave = () => {
    const hasEmpty = subjects.some((s) => !s.name.trim());

    if (hasEmpty) {
      alert("please fill all subject names");
      return;
    }
    console.log("SavedSubject", subjects);
  };

  return (
    <div className="bg-muted/20 p-6 rounded-2xl space-y-6 ">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject, index) => (
          <div
            key={subject.id}
            className="bg-white rounded-xl p-4 shadow-sm border space-y-3"
          >
            {/* DELETE */}
            {subjects.length > 1 && (
              <X
                className="absolute top-3 right-3 w-4 h-4 text-muted-foreground cursor-pointer"
                onClick={() => removeSubject(subject.id)}
              />
            )}

            {/* HEADER */}
            <div className="flex items-center gap-3 border border-red-500">
              <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-lg">
                <BookOpen className="w-5 h-5" />
              </div>

              <p className="font-semibold">Subject {index + 1}</p>
            </div>

            {/* INPUT */}
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Subject Name *
              </p>

              <Input
                placeholder="Enter subject name"
                value={subject.name}
                onChange={(e) => updateSubject(subject.id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ADD BUTTON */}
      <div
        onClick={addSubject}
        className="border-2 border-dashed rounded-xl py-4 flex items-center justify-center gap-2 text-blue-600 cursor-pointer hover:bg-muted transition"
      >
        <Plus className="w-4 h-4" />
        Add Another Subject
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant={"ghost"}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
