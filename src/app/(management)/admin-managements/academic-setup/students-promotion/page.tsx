'use client';

import { useState } from 'react';

import PromotionSettings from '@/components/features/admin-management/academic-setup/students-promotion/PromotionSettings';
import StudentPromotionList from '@/components/features/admin-management/academic-setup/students-promotion/StudentList';

export default function StudentsPromotionPage() {
  // 🔥 STATE (ต้องมี)
  const [year, setYear] = useState('2024');
  const [currentGrade, setCurrentGrade] = useState('Grade 1');
  const [nextGrade, setNextGrade] = useState('Grade 2');
  const [classroom, setClassroom] = useState('All');

  return (
    <div className="p-6 space-y-6">
      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Students Promotion</h1>
        <p className="text-muted-foreground">
          Promote students to the next academic grade level
        </p>
      </div>

      {/* 🔥 CONTENT */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT */}
        <PromotionSettings
          year={year}
          setYear={setYear}
          currentGrade={currentGrade}
          setCurrentGrade={setCurrentGrade}
          nextGrade={nextGrade}
          setNextGrade={setNextGrade}
          classroom={classroom}
          setClassroom={setClassroom}
        />

        {/* RIGHT */}
        <div className="col-span-2">
          <StudentPromotionList
            currentGrade={currentGrade}
            nextGrade={nextGrade}
            classroom={classroom}
          />
        </div>
      </div>
    </div>
  );
}
