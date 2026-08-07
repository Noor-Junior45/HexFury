import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, CalendarDays, CheckCircle2, Award, Zap } from 'lucide-react';
import { appData, completedDays } from '@/data/mockData';
import TopBar from '@/components/TopBar';
import MobileShell from '@/components/MobileShell';
import StreakCalendar from '@/components/StreakCalendar';
import StreakFreeze from '@/components/StreakFreeze';

export default function CalendarPage() {
  const { student, currentStreak } = appData;
  const [freezeAppliedDay, setFreezeAppliedDay] = useState<number | null>(null);

  const handleApplyFreeze = (dayToFreeze: number) => {
    setFreezeAppliedDay(dayToFreeze);
  };

  return (
    <MobileShell>
      <TopBar />

      <div className="px-5 pt-5 pb-24">
        {/* Header */}
        <div className="animate-fade-up">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <CalendarDays size={16} />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Challenge Schedule
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            60-Day Build Calendar
          </h1>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            Track your unbroken streak, manage freeze power-ups, and review your daily proof-of-work.
          </p>
        </div>

        {/* Quick Streak Stats Bar */}
        <div className="mt-5 grid grid-cols-3 gap-2.5 animate-fade-up delay-1">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1 text-orange-500">
              <Flame size={15} />
              <span className="text-[11px] font-semibold text-slate-500">Current</span>
            </div>
            <p className="mt-1 text-xl font-extrabold text-slate-900">{currentStreak.count} <span className="text-xs font-normal text-slate-500">days</span></p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1 text-amber-500">
              <Award size={15} />
              <span className="text-[11px] font-semibold text-slate-500">Best</span>
            </div>
            <p className="mt-1 text-xl font-extrabold text-slate-900">{currentStreak.longestStreak} <span className="text-xs font-normal text-slate-500">days</span></p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1 text-emerald-500">
              <CheckCircle2 size={15} />
              <span className="text-[11px] font-semibold text-slate-500">Shipped</span>
            </div>
            <p className="mt-1 text-xl font-extrabold text-slate-900">{completedDays().length} <span className="text-xs font-normal text-slate-500">/ 60</span></p>
          </div>
        </div>

        {/* Streak Freeze Banner */}
        <div className="mt-4 animate-fade-up delay-2">
          <StreakFreeze
            total={student.streakFreeze.total}
            used={student.streakFreeze.used}
            available={student.streakFreeze.available}
            onApply={() => handleApplyFreeze(9)}
            appliedToDay={freezeAppliedDay}
            variant="card"
          />
        </div>

        {/* Full 60-Day Interactive Calendar */}
        <div className="mt-5 animate-fade-up delay-3">
          <StreakCalendar freezeAppliedDay={freezeAppliedDay} />
        </div>

        {/* Quick jump to today */}
        <div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50/60 p-4 animate-fade-up delay-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-extrabold text-sm shadow-sm">
                12
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">Today's Active Build</p>
                <p className="text-[11px] text-slate-600">Day 12: Weather Widget with Async API</p>
              </div>
            </div>
            <Link
              to="/day/12"
              className="inline-flex items-center gap-1 rounded-xl bg-orange-500 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              <span>Build</span>
              <Zap size={13} />
            </Link>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
