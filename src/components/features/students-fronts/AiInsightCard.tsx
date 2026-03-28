// components/students/AIInsightsCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Student } from "@/components/mocks/mock-student-types";

type AIInsightsCardProps = {
  student: Student;
  title: string;
  tips: string[];
  aiConclusion: string[];
  aiTips: string[];
};

export default function AIInsightsCard({
  student,
  title,
}: AIInsightsCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{title}</h3>

          <Button>Generate Analysis</Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Conclusion */}
          <Card className="border">
            <CardContent className="p-4">
              <p className="text-xs text-blue-600 mb-2">CORE CONCLUSION</p>
              <p className="text-sm text-muted-foreground">
                {student.aiConclusion}
              </p>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border">
            <CardContent className="p-4">
              <p className="text-xs text-blue-600 mb-2">ACTIONABLE TIPS</p>

              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                {student.aiConclusion.map((tips, i) => (
                  <li key={i}>{tips}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
