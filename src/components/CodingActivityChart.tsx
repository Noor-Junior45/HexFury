import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Code2, GitCommit, Zap, BarChart3, TrendingUp } from 'lucide-react';

interface ActivityPoint {
  day: number;
  date: string;
  shortDate: string;
  commits: number;
  linesOfCode: number;
  completed: boolean;
  intensity: number;
}

const generate30DayActivityData = (): ActivityPoint[] => {
  const data: ActivityPoint[] = [];
  const baseDate = new Date(2025, 10, 1);

  for (let i = 1; i <= 30; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i - 1);
    
    const isCompleted = i <= 11 && i !== 9;
    const isMissed = i === 9;
    
    let commits = 0;
    let lines = 0;
    
    if (isCompleted) {
      commits = 3 + ((i * 7) % 8);
      lines = 120 + ((i * 47) % 280);
    } else if (i === 12) {
      commits = 2;
      lines = 85;
    } else if (isMissed) {
      commits = 0;
      lines = 0;
    } else {
      commits = 0;
      lines = 0;
    }

    const intensity = Math.min(100, Math.round((commits / 10) * 100));

    data.push({
      day: i,
      date: d.toISOString().split('T')[0],
      shortDate: `Day ${i}`,
      commits,
      linesOfCode: lines,
      completed: isCompleted,
      intensity,
    });
  }

  return data;
};

const activityData = generate30DayActivityData();

export default function CodingActivityChart() {
  const [metric, setMetric] = useState<'commits' | 'lines'>('commits');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  const totalCommits = activityData.reduce((acc, curr) => acc + curr.commits, 0);
  const totalLines = activityData.reduce((acc, curr) => acc + curr.linesOfCode, 0);
  const activeDays = activityData.filter((d) => d.commits > 0).length;
  const avgCommitsPerActiveDay = activeDays > 0 ? (totalCommits / activeDays).toFixed(1) : '0';

  return (
    <div className="rounded-2xl bg-obsidian-850 p-4 shadow-none border-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-obsidian-750">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
              <BarChart3 size={15} />
            </span>
            <h2 className="text-sm font-bold text-mist-100">30-Day Activity Log</h2>
          </div>
          <p className="mt-0.5 text-xs text-mist-400">
            Commits & volume metrics across your challenge
          </p>
        </div>

        {/* View Controls - Stacked on mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center justify-center gap-1 rounded-xl bg-obsidian-900 p-1">
            <button
              onClick={() => setMetric('commits')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                metric === 'commits'
                  ? 'bg-amber-500/20 text-amber-300 font-bold'
                  : 'text-mist-400 hover:text-mist-200'
              }`}
            >
              <GitCommit size={13} />
              <span>Commits</span>
            </button>
            <button
              onClick={() => setMetric('lines')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                metric === 'lines'
                  ? 'bg-amber-500/20 text-amber-300 font-bold'
                  : 'text-mist-400 hover:text-mist-200'
              }`}
            >
              <Code2 size={13} />
              <span>Lines</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1 rounded-xl bg-obsidian-900 p-1">
            <button
              onClick={() => setChartType('area')}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                chartType === 'area' ? 'bg-obsidian-750 text-mist-100 font-semibold' : 'text-mist-500'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                chartType === 'bar' ? 'bg-obsidian-750 text-mist-100 font-semibold' : 'text-mist-500'
              }`}
            >
              Bar
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="mt-3 grid grid-cols-3 gap-2 py-1">
        <div className="rounded-xl bg-obsidian-900 p-2 text-center">
          <p className="text-[10px] font-semibold text-mist-400">Total Commits</p>
          <p className="mt-0.5 text-base font-extrabold text-ember-400">{totalCommits}</p>
        </div>
        <div className="rounded-xl bg-obsidian-900 p-2 text-center">
          <p className="text-[10px] font-semibold text-mist-400">Code Written</p>
          <p className="mt-0.5 text-base font-extrabold text-amber-400">{totalLines.toLocaleString()} <span className="text-[10px] font-normal text-mist-500">loc</span></p>
        </div>
        <div className="rounded-xl bg-obsidian-900 p-2 text-center">
          <p className="text-[10px] font-semibold text-mist-400">Active Days</p>
          <p className="mt-0.5 text-base font-extrabold text-emerald-400">{activeDays} / 30</p>
        </div>
      </div>

      {/* Recharts Visualization */}
      <div className="mt-3 h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCommitsDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorLinesDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2a2a" />
              <XAxis
                dataKey="day"
                tickFormatter={(value) => `D${value}`}
                tick={{ fontSize: 10, fill: '#71717a' }}
                axisLine={{ stroke: '#27272a' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#71717a' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Area
                type="monotone"
                dataKey={metric === 'commits' ? 'commits' : 'linesOfCode'}
                stroke={metric === 'commits' ? '#f97316' : '#f59e0b'}
                strokeWidth={2}
                fillOpacity={1}
                fill={metric === 'commits' ? 'url(#colorCommitsDark)' : 'url(#colorLinesDark)'}
                activeDot={{ r: 5, stroke: '#18181b', strokeWidth: 2, fill: '#f97316' }}
              />
            </AreaChart>
          ) : (
            <BarChart data={activityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2a2a" />
              <XAxis
                dataKey="day"
                tickFormatter={(value) => `D${value}`}
                tick={{ fontSize: 10, fill: '#71717a' }}
                axisLine={{ stroke: '#27272a' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#71717a' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Bar
                dataKey={metric === 'commits' ? 'commits' : 'linesOfCode'}
                fill={metric === 'commits' ? '#f97316' : '#f59e0b'}
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-mist-400 pt-2 border-t border-obsidian-750">
        <span className="flex items-center gap-1">
          <Zap size={12} className="text-amber-400" />
          Average {avgCommitsPerActiveDay} commits/active day
        </span>
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <TrendingUp size={12} />
          {Math.round((activeDays / 12) * 100)}% active track consistency
        </span>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, metric }: any) {
  if (active && payload && payload.length) {
    const data: ActivityPoint = payload[0].payload;
    return (
      <div className="rounded-xl bg-obsidian-900 p-2.5 text-white shadow-xl border border-obsidian-700 text-xs">
        <p className="font-bold text-mist-100">
          Day {data.day} ({data.date})
        </p>
        <div className="mt-1 space-y-1 text-[11px]">
          <p className="flex items-center justify-between gap-3 text-ember-400 font-semibold">
            <span>Commits:</span>
            <span>{data.commits}</span>
          </p>
          <p className="flex items-center justify-between gap-3 text-amber-300">
            <span>Lines of Code:</span>
            <span>{data.linesOfCode}</span>
          </p>
          <p className="flex items-center justify-between gap-3 text-mist-400 pt-1 border-t border-obsidian-800">
            <span>Status:</span>
            <span className={data.completed ? 'text-emerald-400 font-bold' : data.day === 12 ? 'text-amber-400 font-bold' : 'text-mist-500'}>
              {data.completed ? 'Completed' : data.day === 12 ? 'In Progress' : 'Pending'}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}
