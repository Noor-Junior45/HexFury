import { Link } from 'react-router-dom';
import { Check, X, Circle, Flame } from 'lucide-react';
import { appData } from '@/data/mockData';

export default function StreakStrip() {
  const days = appData.streakHistory;
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 pt-1">
      {days.map((d) => {
        const today = d.day === appData.student.currentDay;
        const isMissed = d.status === 'missed';
        const isComplete = d.status === 'complete';

        return (
          <Link
            key={d.day}
            to={d.day === 12 ? '/day/12' : '#'}
            onClick={(e) => d.day !== 12 && e.preventDefault()}
            className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border text-[10px] font-extrabold transition-all min-h-[44px] min-w-[44px] ${
              isComplete
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 shadow-2xs hover:bg-emerald-100'
                : isMissed
                ? 'border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100'
                : today
                ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-300/80 animate-pulse'
                : 'border-slate-200 bg-slate-50/80 text-slate-400 hover:border-slate-300'
            }`}
            title={`Day ${d.day} — ${d.status}`}
          >
            <span className="leading-none">D{d.day}</span>
            <span className="mt-1 leading-none">
              {isComplete ? (
                <Check size={12} strokeWidth={3} className="text-emerald-600" />
              ) : isMissed ? (
                <X size={12} strokeWidth={3} className="text-rose-600" />
              ) : today ? (
                <Flame size={12} className="text-orange-500 animate-flame" />
              ) : (
                <Circle size={6} strokeWidth={3} className="text-slate-300" />
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
