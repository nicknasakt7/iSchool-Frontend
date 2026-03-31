"use client";

import FilterBar from "@/components/features/admin-management/teachers/filter-bar";
import TeacherList from "@/components/features/admin-management/teachers/teacher-list";
import { mockTeachers, Teacher } from "@/components/mocks/mock-teacher";
import { useState } from "react";

export default function TeacherManagementPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);

  const [filter, setFilter] = useState({
    search: "",
    grade: "",
    classroom: "",
    subject: "",
  });

  // 🔥 update teacher
  const handleUpdate = (updatedTeacher: Teacher) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t)),
    );
  };

  // 🔥 delete teacher
  const handleDelete = (id: number) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  // 🔥 filter
  const filteredTeachers = teachers.filter((t) => {
    const matchSearch = t.firstName
      .toLowerCase()
      .includes(filter.search.toLowerCase());

    const matchGrade = filter.grade ? t.grade.includes(filter.grade) : true;

    const matchSubject = filter.subject
      ? t.subject.includes(filter.subject)
      : true;

    const matchClassroom = filter.classroom
      ? t.classroom === filter.classroom
      : true;

    return matchSearch && matchGrade && matchSubject && matchClassroom;
  });

  return (
    <div className="p-6 space-y-6">
      {/* 🔥 HEADER (เอามาจากหน้าแรก) */}
      <div>
        <h2 className="text-4xl font-semibold mb-2">
          Teacher Resource Management
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage teacher capacity and assignments.
        </p>
      </div>

      {/* 🔥 ส่วนจัดการ */}
      <div>
        <h1 className="text-2xl font-semibold">Manage Teachers</h1>
        <p className="text-muted-foreground text-sm">
          View and manage faculty members
        </p>
      </div>

      <FilterBar value={filter} onFilterChange={setFilter} />

      <TeacherList
        teachers={filteredTeachers}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
