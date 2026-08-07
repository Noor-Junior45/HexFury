import { Link } from 'react-router-dom';
import { Check, X, Circle } from 'lucide-react';
import { appData, getStreakDay } from '@/data/mockData';

export default function StreakStrip() {
  const days = appData.streakHistory;
  return (
    <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1">
      {days.map((d) => {
        const today = d.day === appData.student.currentDay;
        return (
          <Link
            key={d.day}
            to={d.day === 12 ? '/day/12' : '#'}
            onClick={(e) => d.day !== 12 && e.preventDefault()}
            className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl border text-[10px] font-semibold transition-all ${
              d.status === 'complete'
                ? 'border-ember-500/40 bg-ember-500/15 text-ember-300'
                : d.status === 'missed'
                ? 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                : today
                ? 'border-ember-400 bg-obsidian-800 text-ember-400 animate-pulse-ring'
                : 'border-obsidian-700 bg-obsidian-850 text-mist-500'
            }`}
            title={`Day ${d.day} — ${d.status}`}
          >
            <span className="leading-none">{d.day}</span>
            <span className="mt-0.5 leading-none">
              {d.status === 'complete' ? (
                <Check size={10} strokeWidth={3} />
              ) : d.status === 'missed' ? (
                <X size={10} strokeWidth={3} />
              ) : (
                <Circle size={8} strokeWidth={3} />
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
