"use client";

import { Teacher } from "@/components/mocks/mock-teacher";
import EditTeacherDialog from "./edit-teacher-dialog";

type TeacherListProps = {
  teachers: Teacher[];
  onDelete: (id: number) => void;
  onUpdate: (teacher: Teacher) => void;
};

export default function TeacherList({
  teachers,
  onDelete,
  onUpdate,
}: TeacherListProps) {
  return (
    <div className="space-y-4">
      {teachers?.map((teacher) => (
        <div
          key={teacher.id}
          className="flex justify-between items-center border p-4 rounded-xl"
        >
          <div>
            <p className="font-medium">
              {teacher.firstName} {teacher.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              Grade {teacher.grade} - {teacher.subject}
            </p>
          </div>

          <div className="flex gap-2">
            <EditTeacherDialog teacher={teacher} onSave={onUpdate} />

            <button
              onClick={() => onDelete(teacher.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
