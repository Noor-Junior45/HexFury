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
      className={`relative flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all ${
        badge.earned
          ? 'border-ember-500/30 bg-obsidian-850 hover:border-ember-400/50'
          : 'border-obsidian-700 bg-obsidian-850/50'
      }`}
    >
      <div
        className={`relative flex h-12 w-12 items-center justify-center rounded-full ${
          badge.earned
            ? 'bg-gradient-to-br from-ember-500/25 to-ember-700/10 text-ember-300'
            : 'bg-obsidian-700 text-mist-600'
        }`}
      >
        {badge.earned ? (
          <Icon size={22} />
        ) : (
          <Lock size={18} />
        )}
      </div>
      <div>
        <p className={`text-xs font-semibold leading-tight ${badge.earned ? 'text-mist-100' : 'text-mist-500'}`}>
          {badge.name}
        </p>
        {badge.progress && (
          <p className="mt-1 text-[10px] text-mist-500">
            {badge.progress.current}/{badge.progress.target}
          </p>
        )}
      </div>
      <span className="absolute right-2 top-2">
        <Tooltip text={badge.description} />
      </span>
    </div>
  );
}
