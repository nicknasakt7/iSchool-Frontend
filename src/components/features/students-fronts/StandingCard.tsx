// components/students/StandingCard.tsx

import { Student } from "@/components/mocks/mock-student-types";
import { Card, CardContent } from "@/components/ui/card";

type StandingCardProps = {
  student: Student;
};

export default function StandingCard({ student }: StandingCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 text-center">
        <p className="text-sm text-muted-foreground mb-4">CURRENT STANDING</p>

        <div className="text-4xl font-bold">{student.gpa}</div>

        <p className="text-sm text-muted-foreground mt-2">
          Top {student.standingPercent}% of class
        </p>
      </CardContent>
    </Card>
  );
}
