import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { appData, getStreakDay } from '@/data/mockData';
import { triggerSuccessConfetti } from '@/lib/confetti';

type DayStatus = 'complete' | 'missed' | 'pending' | 'future' | 'frozen';

const statusLabel: Record<DayStatus, string> = {
  complete: 'Task done',
  missed: 'Task missed',
  frozen: 'Streak protected',
  pending: 'Today pending',
  future: 'Upcoming day',
};

export default function StreakCalendar({ freezeAppliedDay }: { freezeAppliedDay: number | null }) {
  const total = appData.brand.cycleDays;
  const [userCompletedDays, setUserCompletedDays] = useState<Set<number>>(
    new Set(appData.streakHistory.filter((d) => d.status === 'complete').map((d) => d.day))
  );

  const toggleDayCompletion = (day: number) => {
    setUserCompletedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
        triggerSuccessConfetti();
      }
      return next;
    });
  };

  const getDayStatus = (day: number): DayStatus => {
    if (freezeAppliedDay === day) return 'frozen';
    if (userCompletedDays.has(day)) return 'complete';

    const history = getStreakDay(day);
    if (history?.status === 'missed' && freezeAppliedDay !== day) return 'missed';
    if (day === appData.student.currentDay) return 'pending';
    return 'future';
  };

  const completeCount = userCompletedDays.size;
  const missedCount = appData.streakHistory.filter(
    (day) => day.status === 'missed' && freezeAppliedDay !== day.day && !userCompletedDays.has(day.day)
  ).length;
  const remainingCount = total - completeCount - missedCount;

  return (
    <section className="rounded-2xl border border-obsidian-700 bg-obsidian-850 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember-500/15 text-ember-400">
              <Flame size={16} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-mist-100">Your 60-day streak</h3>
              <p className="text-[10px] text-mist-500">Click any day to toggle completed & celebrate!</p>
            </div>
          </div>
        </div>
        <span className="rounded-full border border-obsidian-600 bg-obsidian-800 px-2 py-1 text-[10px] font-semibold text-mist-400">
          Day {appData.student.currentDay}/{total}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <SummaryCard value={completeCount} label="Done" valueClass="text-sage-400" />
        <SummaryCard value={missedCount} label="Missed" valueClass="text-rose-400" />
        <SummaryCard value={remainingCount} label="To go" valueClass="text-mist-200" />
      </div>

      <div
        className="mt-3 flex flex-wrap gap-1"
        aria-label="60-day streak calendar"
      >
        {Array.from({ length: total }, (_, index) => {
          const day = index + 1;
          const status = getDayStatus(day);
          return (
            <DayBox
              key={day}
              day={day}
              status={status}
              onToggle={() => toggleDayCompletion(day)}
            />
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-obsidian-700 pt-3 text-[10px] text-mist-500">
        <LegendItem marker="+" label="Done" markerClass="text-sage-400" />
        <LegendItem marker="x" label="Missed" markerClass="text-rose-400" />
        <LegendItem marker="-" label="Upcoming" />
        <LegendItem marker="*" label="Freeze" markerClass="text-sky-300" />
      </div>
    </section>
  );
}

function DayBox({
  day,
  status,
  onToggle,
}: {
  day: number;
  status: DayStatus;
  onToggle: () => void;
}) {
  const statusMarker =
    status === 'complete' ? '+' : status === 'missed' ? 'x' : status === 'frozen' ? '*' : status === 'pending' ? 'o' : '-';

  const statusStyle: Record<DayStatus, string> = {
    complete: 'border-sage-500/40 bg-sage-500/10 text-mist-100 shadow-xs shadow-sage-500/10',
    missed: 'border-rose-500/50 bg-rose-500/10 text-mist-100',
    frozen: 'border-sky-400/40 bg-sky-500/10 text-mist-100',
    pending: 'border-ember-400/70 bg-ember-500/10 text-mist-100',
    future: 'border-obsidian-600 bg-obsidian-900/60 text-mist-500',
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Day ${day}: ${statusLabel[status]}`}
      style={{ flex: '0 0 calc((100% - 25px) / 6)' }}
      className={`flex h-9 min-w-0 flex-col items-center justify-center rounded-md border transition-all cursor-pointer ${
        statusStyle[status]
      } ${
        day === appData.student.currentDay
          ? 'ring-1 ring-ember-300/80 ring-offset-1 ring-offset-obsidian-850'
          : ''
      } hover:scale-105 active:scale-95`}
    >
      <span className="text-[10px] font-bold leading-none">{day}</span>
      <span
        className={`mt-0.5 font-mono text-[11px] font-bold leading-none ${
          status === 'complete'
            ? 'text-sage-400'
            : status === 'missed'
            ? 'text-rose-400'
            : status === 'frozen'
            ? 'text-sky-300'
            : 'text-mist-600'
        }`}
      >
        {statusMarker}
      </span>
    </button>
  );
}

function SummaryCard({ value, label, valueClass }: { value: number; label: string; valueClass: string }) {
  return (
    <div className="rounded-lg border border-obsidian-700 bg-obsidian-900/70 px-1.5 py-1.5 text-center">
      <p className={`text-base font-extrabold leading-none ${valueClass}`}>{value}</p>
      <p className="mt-0.5 text-[9px] font-medium text-mist-500">{label}</p>
    </div>
  );
}

function LegendItem({ marker, label, markerClass = 'text-mist-500' }: { marker: string; label: string; markerClass?: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`font-mono text-[11px] font-bold ${markerClass}`}>{marker}</span>
      {label}
    </span>
  );
}
