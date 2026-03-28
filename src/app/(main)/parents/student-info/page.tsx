"use client";

import AcademicRecordCard from "@/components/features/students-fronts/AcademicRecordCard";
import AIInsightsCard from "@/components/features/students-fronts/AiInsightCard";
import GradeQueryCard from "@/components/features/students-fronts/GradeQueryCard";
import StandingCard from "@/components/features/students-fronts/StandingCard";
import StudentProfileCard from "@/components/features/students-fronts/StudentprofileCard";
import { mockStudent } from "@/components/mocks/mock-student-data";
// shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// next

export default function StudentsPage() {
  const student = mockStudent;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-center items-center">
        {/* dropdown */}
        <Select>
          <SelectTrigger className="w-200px">
            <SelectValue placeholder="Select Student..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Julian Thorne</SelectItem>
            <SelectItem value="2">Another Student</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 🧩 Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* 🟦 Left */}
        <div className="col-span-3 space-y-6">
          <StudentProfileCard student={student} />
          <AcademicRecordCard student={student} />
        </div>

        {/* 🟩 Middle */}
        <div className="col-span-6 space-y-6">
          <GradeQueryCard student={student} />
          <AIInsightsCard
            student={student}
            title="AI Insights"
            tips={["Focus on weak subjects", "Keep consistency"]}
            aiConclusion={["Strong performance in STEM"]}
            aiTips={["Improve English writing", "Practice more exercises"]}
          />
        </div>

        {/* 🟥 Right */}
        <div className="col-span-3">
          <StandingCard student={student} />
        </div>
      </div>
    </div>
  );
}
