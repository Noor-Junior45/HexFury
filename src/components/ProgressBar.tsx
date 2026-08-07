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
          <span className="text-xs font-semibold text-slate-600">Challenge Cycle Progress</span>
          <span className="text-xs font-bold text-slate-800">
            <span className="text-orange-600 font-extrabold">{current}</span> / {total} Days
          </span>
        </div>
      )}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200/80 p-0.5 border border-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 transition-all duration-700 ease-out shadow-xs"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] font-bold text-slate-400">
        <span className={pct >= 0 ? 'text-orange-600' : ''}>D0</span>
        <span className={pct >= 25 ? 'text-orange-600' : ''}>15d (25%)</span>
        <span className={pct >= 50 ? 'text-orange-600' : ''}>30d (50%)</span>
        <span className={pct >= 75 ? 'text-orange-600' : ''}>45d (75%)</span>
        <span className={pct >= 100 ? 'text-orange-600' : ''}>60d ★</span>
      </div>
    </div>
  );
}
