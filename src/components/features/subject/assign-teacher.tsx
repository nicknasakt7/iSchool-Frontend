"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import TeacherItem from "./teacher-item";

type Teacher = {
  id: number;
  firstName: string;
  lastName: string;
};

type Subject = {
  id: number;
  name: string;
};

type AssignedTeacherProps = {
  subjects: Subject[];
  assigned: AssignedTeacher[];
  setAssigned: React.Dispatch<React.SetStateAction<AssignedTeacher[]>>;
};

type AssignedTeacher = Teacher & {
  role: "primary" | "assistant";
};

export default function AssignedTeacher({
  subjects,
  assigned,
  setAssigned,
}: AssignedTeacherProps) {
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/teachers");
        const data = await res.json();
        setTeachers(data);
      } catch (error) {
        console.error("โหลด teachers ไม่สำเร็จ", error);
      }
    };
    fetchTeachers();
  }, []);

  const filtered = teachers.filter((t) =>
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase()),
  );
  const addTeacher = (teacher: Teacher) => {
    if (assigned.find((t) => t.id === teacher.id)) return;

    setAssigned((prev) => [
      ...prev,
      {
        ...teacher,
        role: prev.length === 0 ? "primary" : "assistant",
      },
    ]);
  };

  const removeTeacher = (id: number) => {
    setAssigned((prev) => prev.filter((t) => t.id !== id));
  };

  const updateRole = (id: number, role: "primary" | "assistant") => {
    setAssigned((prev) =>
      prev.map((t) => {
        if (role === "primary") {
          if (t.id === id) return { ...t, role: "primary" };
          return { ...t, role: "assistant" };
        }
        if (t.id === id) return { ...t, role };
        return t;
      }),
    );
  };

  return (
    <div className="border rounded-2xl p-6 space-y-6 bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Assign Teachers</h2>

        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">
          TEACHING STAFF
        </span>
      </div>

      {/* SEARCH */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium">
          SEARCH & ADD TEACHERS
        </p>

        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* dropdown result */}
        {search && (
          <div className="border rounded-md mt-2 p-2 space-y-1 bg-white shadow">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="p-2 hover:bg-muted rounded cursor-pointer"
                onClick={() => {
                  addTeacher(t);
                  setSearch(""); // clear
                }}
              >
                {t.firstName} {t.lastName}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ASSIGNED */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium">
          ASSIGNED TEACHERS ({assigned.length})
        </p>

        {assigned.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-10">
            <p>No teachers assigned yet</p>
            <p className="text-xs">
              Search and add teachers using the field above
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {assigned.map((t) => (
              <TeacherItem
                key={t.id}
                teacher={t}
                role={t.role}
                onRemove={() => removeTeacher(t.id)}
                onRoleChange={(role) => updateRole(t.id, role)}
              />
            ))}
          </div>
        )}
      </div>

      <hr />

      {/* QUICK ACTION */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">
          QUICK ACTIONS
        </p>

        <div className="flex gap-2">
          <Button variant="outline">Import from Template</Button>
          <Button variant="outline">View All Teachers</Button>
        </div>
      </div>

      {/* MAIN BUTTON */}
      <Button className="w-full mt-4 text-base py-6">
        Create Subject & Assign Teachers +
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        SUBJECT ID WILL BE AUTO-GENERATED
      </p>
    </div>
  );
}
