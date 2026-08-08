import { Link } from 'react-router-dom';
import { Snowflake, ShieldCheck, RotateCcw, Zap, AlertTriangle, CheckCircle2, Shield, Flame } from 'lucide-react';
import Tooltip from './Tooltip';

type Props = {
  total: number;
  used: number;
  available: boolean;
  onApply?: () => void;
  onUnfreeze?: () => void;
  appliedToDay?: number | null;
  missedDayNumber?: number;
  missedReason?: string;
  variant?: 'ticket' | 'card' | 'badge';
};

export default function StreakFreeze({
  total,
  used,
  available,
  onApply,
  onUnfreeze,
  appliedToDay,
  missedDayNumber = 8,
  missedReason = 'College mid-sem exam — no submission recorded.',
  variant = 'ticket',
}: Props) {
  const remaining = isNaN(total - used) ? 1 : total - used;
  const isApplied = appliedToDay != null;

  if (variant === 'badge') {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
        <Snowflake size={13} className={available ? 'animate-pulse text-sky-600' : ''} />
        <span>Streak Freeze {isApplied ? `(Day ${appliedToDay})` : available ? `× ${remaining}` : 'used'}</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-sky-200/90 bg-white shadow-md transition-all">
      {/* Ticket Header Bar - ABTalks Style */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black tracking-widest uppercase text-slate-100">
            Streak Protection Pass
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-sky-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-sky-300 border border-sky-400/30">
            Pass #01
          </span>
        </div>
      </div>

      {/* Main Ticket Body */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* Top Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/90 rounded-xl p-3 border border-slate-200/80">
          <div>
            <p className="text-[9px] font-black uppercase text-slate-500 tracking-wider">STUDENT BUILDER</p>
            <p className="text-xs font-extrabold text-slate-900 truncate">Noor Hassan</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase text-slate-500 tracking-wider">TARGET RECOVERY</p>
            <p className="text-xs font-extrabold text-slate-900">Day {missedDayNumber} Task</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase text-slate-500 tracking-wider">USAGE LIMIT</p>
            <p className="text-xs font-extrabold text-sky-700">1x Pass per Cycle</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase text-slate-500 tracking-wider">PASS STATUS</p>
            {isApplied ? (
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                Active on Day {appliedToDay}
              </span>
            ) : available ? (
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-sky-700">
                <Shield size={13} className="text-sky-600 shrink-0" />
                1 Pass Ready
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-500">Exhausted</span>
            )}
          </div>
        </div>

        {/* Status Message */}
        <div className="flex items-start gap-3 rounded-xl bg-sky-50/80 p-3.5 border border-sky-200/90">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold shadow-2xs ${
              isApplied ? 'bg-sky-600 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            {isApplied ? <ShieldCheck size={19} /> : <AlertTriangle size={19} />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold text-slate-900">
              {isApplied
                ? `Streak Protection Active on Day ${appliedToDay}`
                : `Day ${missedDayNumber} Recovery Center`}
            </p>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              {isApplied
                ? `Day ${appliedToDay} is shielded by your Streak Freeze pass. You can still complete & submit Day ${appliedToDay} late, or click "Unfreeze Pass" to save your pass for a future day.`
                : `${missedReason} Choose to build Day ${missedDayNumber} late or apply your single-use freeze pass to protect your flame.`}
            </p>
          </div>
        </div>

        {/* Perforated Divider Ticket Line with Circle Notches */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="absolute -left-7 -top-3 h-6 w-6 rounded-full bg-slate-100 border-r border-sky-300" />
          <div className="w-full border-t-2 border-dashed border-sky-300/80" />
          <div className="absolute -right-7 -top-3 h-6 w-6 rounded-full bg-slate-100 border-l border-sky-300" />
        </div>

        {/* Action Stub Controls */}
        <div className="pt-0.5">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2.5">
            STREAK RECOVERY ACTIONS (SELECT OPTION):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Option 1: Build the Day Project */}
            <Link
              to={`/day/${missedDayNumber}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 py-3 px-4 text-xs font-extrabold text-white shadow-xs transition-all active:scale-[0.98]"
            >
              <Zap size={16} />
              <span>Build Day {missedDayNumber} Project</span>
            </Link>

            {/* Option 2: Freeze or Unfreeze Pass */}
            {isApplied ? (
              <button
                onClick={onUnfreeze}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-sky-400 bg-sky-50 hover:bg-sky-100 py-3 px-4 text-xs font-extrabold text-sky-800 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <RotateCcw size={16} />
                <span>Unfreeze Pass (Release Day {appliedToDay})</span>
              </button>
            ) : (
              <button
                onClick={onApply}
                disabled={!available}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-extrabold text-white shadow-md transition-all active:scale-[0.98] cursor-pointer ${
                  available
                    ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                <Snowflake size={16} />
                <span>Apply Freeze Pass for Day {missedDayNumber}</span>
              </button>
            )}
          </div>
        </div>

        {/* Ticket Footer Graphic */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 font-mono text-[9px] text-slate-400 font-bold tracking-widest">
            ||||| | ||||| || |||||| | ||| |||| |
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">
            <Flame size={11} className="text-orange-500" />
            <span>STREAK SHIELD • CYCLE 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}



