import {
  GitCommitHorizontal,
  Flame,
  Sunrise,
  ShieldHalf,
  Trophy,
  GitPullRequestArrow,
  Eye,
  Award,
  Lock,
} from 'lucide-react';
import type { Badge } from '@/data/mockData';
import Tooltip from './Tooltip';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GitCommitHorizontal,
  Flame,
  Sunrise,
  ShieldHalf,
  Trophy,
  GitPullRequestArrow,
  Eye,
  Award,
};

export default function BadgeCard({ badge }: { badge: Badge }) {
  const Icon = iconMap[badge.icon] ?? Award;

  return (
    <div
      className={`relative flex min-h-[96px] flex-col items-center justify-between rounded-2xl p-3 text-center transition-all border ${
        badge.earned
          ? 'bg-gradient-to-b from-amber-50/90 via-white to-orange-50/40 border-amber-300/80 shadow-xs hover:shadow-md hover:-translate-y-0.5'
          : 'bg-slate-50/80 border-slate-200/80 opacity-75'
      }`}
    >
      <div
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl shadow-2xs ${
          badge.earned
            ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-orange-500/20'
            : 'bg-slate-200 text-slate-400'
        }`}
      >
        {badge.earned ? (
          <Icon size={20} />
        ) : (
          <Lock size={16} />
        )}
      </div>

      <div className="w-full">
        <p className={`text-[11px] font-bold leading-snug line-clamp-1 ${badge.earned ? 'text-slate-900' : 'text-slate-500'}`}>
          {badge.name}
        </p>
        {badge.earned ? (
          <span className="mt-0.5 inline-block text-[9px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded-md border border-orange-200/60">
            Earned
          </span>
        ) : (
          badge.progress && (
            <p className="mt-0.5 text-[10px] font-bold text-slate-400">
              {badge.progress.current}/{badge.progress.target}
            </p>
          )
        )}
      </div>

      <span className="absolute right-1.5 top-1.5">
        <Tooltip text={badge.description} />
      </span>
    </div>
  );
}
