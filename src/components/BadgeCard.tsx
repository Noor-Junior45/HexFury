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
  Zap,
  Rocket,
  Cpu,
  ShieldCheck,
  Search,
  Medal,
  Star,
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
  Zap,
  Rocket,
  Cpu,
  ShieldCheck,
  Search,
  Medal,
  Star,
};

export default function BadgeCard({ badge }: { badge: Badge }) {
  const Icon = iconMap[badge.icon] ?? Award;

  return (
    <div
      className={`group relative flex flex-col items-center justify-between rounded-xl p-2.5 text-center transition-all border ${
        badge.earned
          ? 'bg-gradient-to-b from-amber-50/90 via-white to-orange-50/30 border-amber-300/80 shadow-2xs hover:shadow-sm hover:-translate-y-0.5'
          : 'bg-slate-50/80 border-slate-200/80 opacity-80 hover:opacity-100'
      }`}
    >
      {/* Tooltip in top-right corner */}
      <span className="absolute right-1 top-1 z-10">
        <Tooltip text={badge.description} />
      </span>

      {/* Hexagonal Badge Emblem */}
      <div className="relative mt-0.5 flex items-center justify-center">
        {/* Outer Hexagon Border */}
        <div
          className={`flex h-10 w-10 items-center justify-center p-[2px] transition-transform duration-300 group-hover:scale-105 ${
            badge.earned
              ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-xs shadow-orange-500/20'
              : 'bg-slate-300'
          }`}
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          {/* Inner Hexagon Core */}
          <div
            className={`flex h-full w-full items-center justify-center ${
              badge.earned
                ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white'
                : 'bg-slate-200 text-slate-400'
            }`}
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          >
            {badge.earned ? (
              <Icon size={18} className="drop-shadow-xs" />
            ) : (
              <Lock size={14} />
            )}
          </div>
        </div>
      </div>

      {/* Badge Name & Progress */}
      <div className="mt-1.5 w-full">
        <p
          className={`text-[11px] font-extrabold leading-tight line-clamp-1 ${
            badge.earned ? 'text-slate-900' : 'text-slate-600'
          }`}
        >
          {badge.name}
        </p>
        {badge.earned ? (
          <span className="mt-0.5 inline-flex items-center gap-0.5 rounded-md border border-amber-300/80 bg-amber-100/90 px-1.5 py-0.2 text-[8px] font-extrabold uppercase tracking-wider text-amber-900">
            ★ Earned
          </span>
        ) : (
          badge.progress && (
            <div className="mt-1 flex flex-col items-center">
              <div className="h-1 w-10 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-orange-500 transition-all"
                  style={{
                    width: `${Math.min((badge.progress.current / badge.progress.target) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="mt-0.5 text-[8px] font-bold text-slate-500">
                {badge.progress.current}/{badge.progress.target}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

