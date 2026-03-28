'use client';

import AlertCard from '@/components/features/dashboard/alert-card';
import LeftStatCard from '@/components/features/dashboard/left-stat-card';
import SummaryCard from '@/components/features/dashboard/summary-card';

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out">
      {/* TITLE */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Institutional Overview
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Real-time intelligence and student performance metrics.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LeftStatCard total={1248} />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <AlertCard />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SummaryCard
              title="Students Present Today"
              value={1214}
              color="green"
            />

            <SummaryCard title="Students Absent Today" value={34} color="red" />
          </div>
        </div>
      </div>
    </div>
  );
}
