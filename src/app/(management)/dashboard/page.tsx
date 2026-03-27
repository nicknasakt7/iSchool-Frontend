'use client'; // 🔥 ต้องมี เพราะเราใช้ state (interactive UI)

import AlertCard from '@/components/features/dashboard/alert-card';

import LeftStatCard from '@/components/features/dashboard/left-stat-card';
import MainHeader from '@/components/features/dashboard/main-header';

import SummaryCard from '@/components/features/dashboard/summary-card';
import Sidebar from '@/components/layouts/dashboard/sidebar';

import { useState } from 'react';

/* ================== COMPONENTS ================== */

export default function DashboardPage() {
  /* ================== STATE ================== */
  // 🔥 ใช้ควบคุม sidebar บน mobile
  const [openSidebar, setOpenSidebar] = useState(false);

  /* ================== HANDLERS ================== */
  const handleOpenSidebar = () => setOpenSidebar(true); // เปิด sidebar
  const handleCloseSidebar = () => setOpenSidebar(false); // ปิด sidebar

  return (
    <div className="p-4 md:p-6 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out">
      {/* ================== MOBILE SIDEBAR DRAWER ================== */}
      {/* 🔥 แสดงเฉพาะตอน openSidebar = true */}
      {openSidebar && (
        <div className="fixed inset-0 z-50 flex">
          {/* 🔥 overlay ดำ (กดเพื่อปิด) */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={handleCloseSidebar}
          />

          {/* 🔥 ตัว sidebar ที่ slide ออกมา */}
          <div className="relative w-64 bg-primary-foreground h-full shadow-lg animate-in slide-in-from-left duration-200">
            <Sidebar />
          </div>
        </div>
      )}

      {/* ================== HEADER ================== */}
      {/* 🔥 ส่ง function ไปให้ header ใช้เปิด sidebar */}
      <MainHeader onOpenSidebar={handleOpenSidebar} />

      {/* ================== TITLE ================== */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold ">
          Institutional Overview
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Real-time intelligence and student performance metrics.
        </p>
      </div>

      {/* ================== MAIN GRID ================== */}
      {/* 🔥 responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ===== LEFT STAT CARD ===== */}
        {/* 🔥 desktop = 1 ช่อง */}
        <div className="lg:col-span-1">
          <LeftStatCard total={1248} />
        </div>

        {/* ===== ALERT CARD ===== */}
        {/* 🔥 desktop = กิน 2 ช่อง */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* 🔥 ALERT */}
          <AlertCard />

          {/* 🔥 SUMMARY (อยู่ใต้ alert) */}
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
