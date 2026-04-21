'use client';

import { Menu, GraduationCap, Sparkles, Clock } from 'lucide-react';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { useAcademic } from '@/lib/context/academic-context';
import { cn } from '@/lib/utils';

type DashboardHeaderProps = {
  onOpenSidebar?: () => void;
};

export default function MainHeader({ onOpenSidebar }: DashboardHeaderProps) {
  const session = useSession();
  const { year, term, setYear, setTerm } = useAcademic();
  const [now, setNow] = useState<Date | null>(null);
  const YEAR_OPTIONS = [new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1];

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = now?.toLocaleDateString('th-TH', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) ?? '';
  const timeStr = now?.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }) ?? '--:--:--';

  return (
    // <div className="flex flex-col gap-4 mb-6 bg-background shadow-sm rounded-xl p-4">
    <div className="flex flex-col gap-2 px-4 md:px-6 py-2 border-b border-border/80 bg-muted-header">
      {/*  TOP BAR (มือถือเท่านั้น) */}
      <div className="flex items-center justify-between md:hidden ">
        {/*  เพิ่ม: ปุ่ม hamburger */}
        <button onClick={onOpenSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        {/*  เพิ่ม: logo เล็ก */}
        {/*  LOGO (mobile) */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>

          <span className="font-bold text-primary">iSchool</span>
        </div>
        <div className="w-6" /> {/* balance layout */}
      </div>

      {/* MAIN HEADER */}
      <div className="flex items-center gap-4 w-full">
        {/* LEFT — AI Insight */}
        <div className="bg-linear-to-r from-blue-600 via-sky-400 to-white/80 border border-blue-300/50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/20 transition-all duration-200 cursor-pointer rounded-xl px-5 py-3 flex items-center gap-3 min-w-65 shrink-0">
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-2 shrink-0">
            <Sparkles className="w-5 h-5 text-white drop-shadow" />
          </div>
          <div>
            <p className="font-bold text-sm text-white drop-shadow leading-tight">AI Insight</p>
            <p className="text-xs text-blue-900/80 leading-snug mt-0.5 font-medium">
              Understand every student in seconds.<br />
              Let AI highlight strengths, weaknesses,<br />
              and learning risks for you.
            </p>
          </div>
        </div>

        {/* ACADEMIC SELECTOR */}
        <div className="flex items-center gap-1 bg-card border border-border rounded-xl px-3 py-1.5">
          <select
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            className="text-sm font-medium bg-transparent outline-none cursor-pointer pr-1"
          >
            {YEAR_OPTIONS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <span className="text-muted-foreground text-xs">·</span>
          {([1, 2] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm(t)}
              className={cn(
                'text-xs font-semibold px-2.5 py-1 rounded-lg transition',
                term === t
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted',
              )}
            >
              เทอม {t}
            </button>
          ))}
        </div>

        {/* SPACER */}
        <div className="flex-1" />

        {/* RIGHT — Date/Time + Toggle + User */}
        <div className="flex items-center gap-3 shrink-0">
          {/* DATE TIME CARD */}
          <div className="bg-card border border-border rounded-xl px-4 py-2 flex items-center gap-3">
            <Clock className="w-4 h-4 text-blue-500 shrink-0" />
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">{dateStr}</p>
              <p className="text-sm font-bold tabular-nums text-foreground">{timeStr}</p>
            </div>
          </div>

          <ModeToggle />

          {/* USER CARD */}
          <div className="bg-card border border-border rounded-xl px-4 py-1.5 flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage
                alt="user"
                src={session.data?.user?.profileImageUrl ?? '/user.png'}
              />
            </Avatar>
            <div className="text-sm">
              <div>
                Welcome
                <p className="font-bold text-primary">
                  {session.data?.user?.teacher?.firstName}{' '}
                  {session.data?.user?.teacher?.lastName}
                </p>
              </div>
              <p className="text-muted-foreground text-xs font-semibold">
                {session.data?.user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
