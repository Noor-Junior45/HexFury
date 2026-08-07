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
      <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-sky-500/10 text-sky-300">
        <Snowflake size={12} className={available ? 'animate-pulse' : ''} />
        <span>Streak Freeze {available ? `× ${remaining}` : 'used'}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 transition-colors ${
        isApplied
          ? 'bg-sky-500/10'
          : available
          ? 'bg-obsidian-850'
          : 'bg-obsidian-850/60 opacity-70'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isApplied ? 'bg-sky-500/20 text-sky-300' : available ? 'bg-sky-500/15 text-sky-300' : 'bg-obsidian-750 text-mist-500'
          }`}
        >
          {isApplied ? <ShieldCheck size={18} /> : <Snowflake size={18} className={available ? 'animate-pulse' : ''} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-mist-100">Streak Freeze Pass</h3>
            <Tooltip text="A Streak Freeze protects your streak on a day you can't submit. You get one free pass per 60-day cycle. Apply it to a missed day and your streak continues as if you'd shipped." />
          </div>
          <p className="mt-0.5 text-xs text-mist-400 leading-relaxed">
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-sky-500/20 px-4 py-2 text-xs font-bold text-sky-300 hover:bg-sky-500/30 transition-all cursor-pointer"
              >
                <Snowflake size={14} />
                <span>Apply Freeze Pass</span>
              </button>
            </div>
          )}
          {isApplied && (
            <div className="mt-3">
              <span className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-500/20 px-4 py-2 text-xs font-bold text-sky-300">
                <ShieldCheck size={14} />
                <span>Streak Protected</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
