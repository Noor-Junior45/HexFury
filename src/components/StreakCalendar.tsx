import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { appData, getStreakDay } from '@/data/mockData';

type DayStatus = 'complete' | 'missed' | 'pending' | 'future' | 'frozen';

function getDayStatus(day: number, freezeAppliedDay: number | null): DayStatus {
  if (freezeAppliedDay === day) return 'frozen';

  const history = getStreakDay(day);
  if (history?.status === 'complete') return 'complete';
  if (history?.status === 'missed') return 'missed';
  if (history?.status === 'pending' || day === appData.student.currentDay) return 'pending';
  return 'future';
}

const statusLabel: Record<DayStatus, string> = {
  complete: 'Task done',
  missed: 'Task missed',
  frozen: 'Streak protected',
  pending: 'Today pending',
  future: 'Upcoming day',
};

export default function StreakCalendar({ freezeAppliedDay }: { freezeAppliedDay: number | null }) {
  const total = appData.brand.cycleDays;
  const completeCount = appData.streakHistory.filter((day) => day.status === 'complete').length;
  const missedCount = appData.streakHistory.filter((day) => day.status === 'missed').length;
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
              <p className="text-[10px] text-mist-500">One small box for every day.</p>
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
          return (
            <DayBox
              key={day}
              day={day}
              status={getDayStatus(day, freezeAppliedDay)}
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

function DayBox({ day, status }: { day: number; status: DayStatus }) {
  const isClickable = day === 12;
  const statusMarker = status === 'complete' ? '+' : status === 'missed' ? 'x' : status === 'frozen' ? '*' : status === 'pending' ? 'o' : '-';
  const destination = isClickable ? '/day/12' : '#';

  const statusStyle: Record<DayStatus, string> = {
    complete: 'border-sage-500/40 bg-sage-500/10 text-mist-100',
    missed: 'border-rose-500/50 bg-rose-500/10 text-mist-100',
    frozen: 'border-sky-400/40 bg-sky-500/10 text-mist-100',
    pending: 'border-ember-400/70 bg-ember-500/10 text-mist-100',
    future: 'border-obsidian-600 bg-obsidian-900/60 text-mist-500',
  };

  return (
    <Link
      to={destination}
      onClick={(event) => {
        if (!isClickable) event.preventDefault();
      }}
      aria-label={`Day ${day}: ${statusLabel[status]}`}
      style={{ flex: '0 0 calc((100% - 25px) / 6)' }}
      className={`flex h-9 min-w-0 flex-col items-center justify-center rounded-md border transition-all ${statusStyle[status]} ${
        day === appData.student.currentDay ? 'ring-1 ring-ember-300/80 ring-offset-1 ring-offset-obsidian-850' : ''
      } ${isClickable ? 'hover:border-ember-300 hover:bg-ember-500/20 active:scale-95' : ''}`}
    >
      <span className="text-[10px] font-bold leading-none">{day}</span>
      <span
        className={`mt-0.5 font-mono text-[11px] font-bold leading-none ${
          status === 'complete' ? 'text-sage-400' : status === 'missed' ? 'text-rose-400' : status === 'frozen' ? 'text-sky-300' : 'text-mist-600'
        }`}
      >
        {statusMarker}
      </span>
    </Link>
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
