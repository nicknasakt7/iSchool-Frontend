// components/students/AcademicRecordCard.tsx

import { Student } from "@/components/mocks/mock-student-types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type Props = {
  student: Student;
};

export default function AcademicRecordCard({ student }: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-blue-600">📋</span>
          <h3 className="font-semibold text-2xl ">Academic Record</h3>
        </div>

        <Separator />

        {/* Content */}
        <div className="space-y-3 text-sm">
          <Info label="Student ID" value={student.id} />

          <Info label="First Name" value={student.firstName} />

          <Info label="Last Name" value={student.lastName} />

          <Info label="Date of Birth" value={student.dob} />

          {/* Email (ใช้ Link) */}
          <div>
            <p className="text-muted-foreground text-xs mb-1">Email Address</p>
            <Link
              href={`mailto:${student.email}`}
              className="text-blue-600 hover:underline"
            >
              {student.email}
            </Link>
          </div>

          <Info label="Parents/Guardians" value={student.parents} />

          <Info label="Health Note" value={student.healthNote} />

          <Info label="Favorite Subject" value={student.favoriteSubject} />
        </div>
      </CardContent>
    </Card>
  );
}

/* 🧠 reusable field */
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      <p className="font-medium leading-snug">{value}</p>
    </div>
  );
}
