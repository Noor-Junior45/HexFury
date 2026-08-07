import { Snowflake, ShieldCheck } from 'lucide-react';
import Tooltip from './Tooltip';

type Props = {
  total: number;
  used: number;
  available: boolean;
  onApply?: () => void;
  appliedToDay?: number | null;
  variant?: 'card' | 'badge';
};

export default function StreakFreeze({
  total,
  used,
  available,
  onApply,
  appliedToDay,
  variant = 'card',
}: Props) {
  const remaining = total - used;
  const isApplied = appliedToDay != null;

  if (variant === 'badge') {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
        <Snowflake size={13} className={available ? 'animate-pulse text-sky-600' : ''} />
        <span>Streak Freeze {available ? `× ${remaining}` : 'used'}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 border transition-all ${
        isApplied
          ? 'bg-gradient-to-r from-sky-50 to-blue-50/60 border-sky-300 shadow-xs'
          : available
          ? 'bg-gradient-to-r from-sky-50/80 via-white to-blue-50/40 border-sky-200/90 shadow-xs hover:border-sky-300'
          : 'bg-slate-50 border-slate-200 opacity-80'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold shadow-2xs ${
            isApplied
              ? 'bg-sky-600 text-white'
              : available
              ? 'bg-sky-500 text-white'
              : 'bg-slate-200 text-slate-400'
          }`}
        >
          {isApplied ? <ShieldCheck size={20} /> : <Snowflake size={20} className={available ? 'animate-pulse' : ''} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-extrabold text-slate-900">Streak Freeze Protection Pass</h3>
            <Tooltip text="A Streak Freeze protects your streak on a day you can't submit. You get one free pass per 60-day cycle. Apply it to a missed day and your streak continues as if you'd shipped." />
          </div>
          <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
            {isApplied
              ? `Applied to Day ${appliedToDay} — your streak is protected.`
              : available
              ? `${remaining} of ${total} pass available. Use it to cover a missed day.`
              : 'No passes remaining this cycle.'}
          </p>

          {onApply && !isApplied && available && (
            <div className="mt-3">
              <button
                onClick={onApply}
                className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-700 active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                <Snowflake size={15} />
                <span>Apply Freeze Pass</span>
              </button>
            </div>
          )}
          {isApplied && (
            <div className="mt-3">
              <span className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-100 border border-sky-300 px-4 py-2 text-xs font-bold text-sky-800">
                <ShieldCheck size={15} className="text-sky-600" />
                <span>Streak Protected</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
