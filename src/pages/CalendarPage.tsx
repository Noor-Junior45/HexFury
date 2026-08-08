import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  CalendarDays,
  CheckCircle2,
  Award,
  Zap,
  Check,
  XCircle,
  Clock,
} from 'lucide-react';
import { appData, completedDays, getDay } from '@/data/mockData';
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

  const handleUnfreeze = () => {
    setFreezeAppliedDay(null);
  };

  const currentDayTask = getDay(student.currentDay);
  const cycleTotal = appData.brand.cycleDays;
  const completedCount = completedDays().length;

  const missedHistoryDays = appData.streakHistory.filter((day) => day.status === 'missed');
  const primaryMissedDay = missedHistoryDays[0] ?? { day: 8, missReason: 'College mid-sem exam — no submission recorded.' };

  const activeMissedList = appData.streakHistory.filter(
    (day) => day.status === 'missed' && freezeAppliedDay !== day.day
  );
  const missedCount = activeMissedList.length;
  const toGoCount = cycleTotal - completedCount - missedCount;

  return (
    <MobileShell>
      <TopBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24 space-y-6">
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

        {/* Today's Active Build - Prominent Stacked Card at the Top */}
        <div className="mt-5 rounded-2xl border border-orange-200/80 bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-orange-500/5 p-4 shadow-xs animate-fade-up delay-1">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white font-black text-base shadow-sm ring-2 ring-orange-400/30">
              {student.currentDay}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold text-orange-700 uppercase tracking-wide">
                  <Zap size={11} className="fill-orange-600" /> Today's Active Build
                </span>
              </div>
              <h3 className="mt-1.5 text-sm font-extrabold text-slate-900 leading-snug line-clamp-1">
                {currentDayTask?.title ?? `Day ${student.currentDay}: Building a Semantic Search API`}
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-600">
                Submit GitHub commit + LinkedIn post to secure your streak!
              </p>
            </div>
          </div>

          {/* Stacked Big Build CTA Button */}
          <Link
            to={`/day/${student.currentDay}`}
            className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 px-4 text-sm font-extrabold text-white shadow-md shadow-orange-500/25 transition-all hover:bg-orange-600 active:scale-[0.98] group"
          >
            <span>Build & Submit Day {student.currentDay} Task</span>
            <Zap size={16} className="fill-white/20 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Unified All-In-One Streak & Calendar Metrics Grid */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs animate-fade-up delay-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 px-1">
            Challenge Progress Metrics
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-orange-500">
                <Flame size={14} />
                <span className="text-[10px] font-semibold text-slate-600">Current</span>
              </div>
              <p className="mt-1 text-lg font-extrabold text-slate-900">
                {freezeAppliedDay ? currentStreak.count + 1 : currentStreak.count}{' '}
                <span className="text-[10px] font-normal text-slate-500">days</span>
              </p>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500">
                <Award size={14} />
                <span className="text-[10px] font-semibold text-slate-600">Best</span>
              </div>
              <p className="mt-1 text-lg font-extrabold text-slate-900">{currentStreak.longestStreak} <span className="text-[10px] font-normal text-slate-500">days</span></p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-600">
                <CheckCircle2 size={14} />
                <span className="text-[10px] font-semibold text-slate-600">Shipped</span>
              </div>
              <p className="mt-1 text-lg font-extrabold text-slate-900">{completedCount} <span className="text-[10px] font-normal text-slate-500">/ {cycleTotal}</span></p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-600">
                <Check size={14} />
                <span className="text-[10px] font-semibold text-slate-600">Done</span>
              </div>
              <p className="mt-1 text-lg font-extrabold text-emerald-700">{completedCount}</p>
            </div>

            <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-rose-500">
                <XCircle size={14} />
                <span className="text-[10px] font-semibold text-slate-600">Missed</span>
              </div>
              <p className="mt-1 text-lg font-extrabold text-rose-600">{missedCount}</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-500">
                <Clock size={14} />
                <span className="text-[10px] font-semibold text-slate-600">To Go</span>
              </div>
              <p className="mt-1 text-lg font-extrabold text-slate-700">{toGoCount}</p>
            </div>
          </div>
        </div>

        {/* Full 60-Day Interactive Calendar */}
        <div className="mt-5 animate-fade-up delay-3">
          <StreakCalendar freezeAppliedDay={freezeAppliedDay} />
        </div>

        {/* Merged Streak Protection Boarding Pass Ticket */}
        <div className="mt-5 animate-fade-up delay-4">
          <StreakFreeze
            total={student.streakFreeze.total}
            used={student.streakFreeze.used}
            available={student.streakFreeze.available}
            onApply={() => handleApplyFreeze(primaryMissedDay?.day ?? 8)}
            onUnfreeze={handleUnfreeze}
            appliedToDay={freezeAppliedDay}
            missedDayNumber={primaryMissedDay?.day ?? 8}
            missedReason={primaryMissedDay?.missReason ?? 'College mid-sem exam — no submission recorded.'}
            variant="ticket"
          />
        </div>
      </div>
    </MobileShell>
  );
}

