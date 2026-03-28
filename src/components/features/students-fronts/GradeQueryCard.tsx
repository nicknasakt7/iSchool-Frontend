// components/students/GradeQueryCard.tsx

import { Student } from "@/components/mocks/mock-student-types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type GradeQueryCardProps = {
  student: Student;
};

export default function GradeQueryCard({ student }: GradeQueryCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Grade Query System</h3>

        <div className="flex gap-2">
          <Badge variant="secondary">{student.academicYear}</Badge>
          <Badge variant="secondary">{student.semester}</Badge>
        </div>

        <Separator />

        <div className="space-y-3">
          {student.subjects.map((sub) => (
            <div key={sub.name} className="flex justify-between items-center">
              <span>{sub.name}</span>

              <div className="flex gap-3 items-center">
                <span className="text-blue-600 font-medium">
                  {sub.grade} ({sub.score}%)
                </span>

                <Badge variant="outline">{sub.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
