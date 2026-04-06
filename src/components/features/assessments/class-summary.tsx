'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGenerateClassInsight } from '@/lib/api/ai-insight/hooks/useGenerateClassInsight';

type Props = {
  classroomId: string;
};

export default function ClassPerformanceSummary({ classroomId }: Props) {
  const { mutate, data, isPending } = useGenerateClassInsight();

  return (
    <Card className="rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Class Performance Summary</p>
          <p className="text-sm opacity-80">
            {data?.summary ?? 'AI พบว่าคะแนนดีขึ้น 12%'}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm opacity-80">AVG</p>
            <p className="text-xl font-bold">{data?.avg ?? 78.4}</p>
          </div>

          <div>
            <p className="text-sm opacity-80">SUBMISSION</p>
            <p className="text-xl font-bold">{data?.submissionRate ?? 94}%</p>
          </div>

          <Button
            variant="secondary"
            disabled={isPending}
            onClick={() => mutate(classroomId)}
          >
            {isPending ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
