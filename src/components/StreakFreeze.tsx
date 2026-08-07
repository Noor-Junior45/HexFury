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
      <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-sky-500/10 text-sky-300 border border-sky-400/30">
        <Snowflake size={12} className={available ? 'animate-pulse' : ''} />
        <span>Streak Freeze {available ? `× ${remaining}` : 'used'}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-4 transition-colors ${
        isApplied
          ? 'border-sky-400/40 bg-sky-500/10'
          : available
          ? 'border-obsidian-600 bg-obsidian-850'
          : 'border-obsidian-700 bg-obsidian-850/60 opacity-70'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isApplied ? 'bg-sky-500/20 text-sky-300' : available ? 'bg-sky-500/15 text-sky-300' : 'bg-obsidian-700 text-mist-500'
          }`}
        >
          {isApplied ? <ShieldCheck size={20} /> : <Snowflake size={20} className={available ? 'animate-pulse' : ''} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-mist-100">Streak Freeze</h3>
            <Tooltip text="A Streak Freeze protects your streak on a day you can't submit. You get one free pass per 60-day cycle. Apply it to a missed day and your streak continues as if you'd shipped — no guilt, no reset." />
          </div>
          <p className="mt-0.5 text-xs text-mist-400">
            {isApplied
              ? `Applied to Day ${appliedToDay} — your streak is protected.`
              : available
              ? `${remaining} of ${total} remaining. Use it to cover a missed day.`
              : 'No freezes left this cycle. Stay consistent from here.'}
          </p>

          {onApply && !isApplied && available && (
            <button
              onClick={onApply}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-300 border border-sky-400/30 hover:bg-sky-500/25 hover:text-sky-200 transition-colors active:scale-95"
            >
              <Snowflake size={13} /> Apply to missed day
            </button>
          )}
          {isApplied && (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-300 border border-sky-400/30">
              <ShieldCheck size={13} /> Streak protected
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
