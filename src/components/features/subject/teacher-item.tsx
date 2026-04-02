"use client";

import { X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type AssignedTeacher = {
  id: number;
  firstName: string;
  lastName: string;
  role: "primary" | "assistant";
};

type TeacherItemProps = {
  teacher: AssignedTeacher;
  role: "primary" | "assistant";
  onRoleChange: (role: "primary" | "assistant") => void;
  onRemove: () => void;
};

export default function TeacherItem({
  teacher,
  role,
  onRoleChange,
  onRemove,
}: TeacherItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
          {teacher.firstName[0]}
          {teacher.lastName[0]}
        </div>

        {/* Info */}
        <div>
          <p className="font-medium">
            {teacher.firstName} {teacher.lastName}
          </p>

          <p className="text-sm text-muted-foreground">
            Grade {teacher.grade.join(", ")} • {teacher.subject.join(", ")}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              {role === "primary" ? "Primary" : "Assistant"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-32 p-2 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => onRoleChange("primary")}
            >
              Primary
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => onRoleChange("assistant")}
            >
              Assistant
            </Button>
          </PopoverContent>
        </Popover>

        <X
          className="w-4 h-4 cursor-pointer text-muted-foreground"
          onClick={onRemove}
        />
      </div>
    </div>
  );
}
