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
      className={`relative flex flex-col items-center gap-1.5 rounded-2xl p-3 text-center transition-all border-0 ${
        badge.earned
          ? 'bg-obsidian-850'
          : 'bg-obsidian-850/60'
      }`}
    >
      <div
        className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
          badge.earned
            ? 'bg-ember-500/15 text-ember-400'
            : 'bg-obsidian-800 text-mist-600'
        }`}
      >
        {badge.earned ? (
          <Icon size={20} />
        ) : (
          <Lock size={16} />
        )}
      </div>
      <div>
        <p className={`text-[11px] font-bold leading-tight ${badge.earned ? 'text-mist-100' : 'text-mist-500'}`}>
          {badge.name}
        </p>
        {badge.progress && (
          <p className="mt-0.5 text-[10px] text-mist-500">
            {badge.progress.current}/{badge.progress.target}
          </p>
        )}
      </div>
      <span className="absolute right-1.5 top-1.5">
        <Tooltip text={badge.description} />
      </span>
    </div>
  );
}
