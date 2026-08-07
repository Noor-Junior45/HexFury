type Props = {
  current: number;
  total: number;
  className?: string;
  showLabel?: boolean;
};

export default function ProgressBar({ current, total, className = '', showLabel = true }: Props) {
  const pct = Math.min((current / total) * 100, 100);
  return (
    <div className={className}>
      {showLabel && (
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-xs font-medium text-mist-400">Cycle progress</span>
          <span className="text-xs font-semibold text-mist-200">
            <span className="text-ember-400">{current}</span> / {total} days
          </span>
        </div>
      )}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-obsidian-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ember-500 to-ember-400 transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
