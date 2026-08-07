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
import { Code2, GitCommit, Zap, Flame, BarChart3, TrendingUp } from 'lucide-react';

interface ActivityPoint {
  day: number;
  date: string;
  shortDate: string;
  commits: number;
  linesOfCode: number;
  completed: boolean;
  intensity: number; // 0-100%
}

// Generate realistic 30-day coding activity mock data leading up to current day
const generate30DayActivityData = (): ActivityPoint[] => {
  const data: ActivityPoint[] = [];
  const baseDate = new Date(2025, 10, 1); // Nov 1

  for (let i = 1; i <= 30; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i - 1);
    
    // Simulate realistic coding activity for a college builder
    // Days 1-11 are completed, day 12 is today, day 9 was missed initially
    const isCompleted = i <= 11 && i !== 9;
    const isMissed = i === 9;
    
    let commits = 0;
    let lines = 0;
    
    if (isCompleted) {
      // Deterministic pseudo-random values based on day number
      commits = 3 + ((i * 7) % 8);
      lines = 120 + ((i * 47) % 280);
    } else if (i === 12) {
      commits = 2; // In progress today
      lines = 85;
    } else if (isMissed) {
      commits = 0;
      lines = 0;
    } else {
      // Future days (planned activity target)
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
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <BarChart3 size={16} />
            </span>
            <h2 className="text-base font-bold text-slate-900">30-Day Activity Summary</h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Daily GitHub commits & code volume across your 60-day challenge
          </p>
        </div>

        {/* Chart View Controls */}
        <div className="flex items-center gap-2">
          {/* Metric Selector */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/60">
            <button
              onClick={() => setMetric('commits')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                metric === 'commits'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitCommit size={13} />
              <span>Commits</span>
            </button>
            <button
              onClick={() => setMetric('lines')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                metric === 'lines'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 size={13} />
              <span>Lines of Code</span>
            </button>
          </div>

          {/* Type Toggle */}
          <div className="hidden sm:flex rounded-xl bg-slate-100 p-1 border border-slate-200/60">
            <button
              onClick={() => setChartType('area')}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition-all ${
                chartType === 'area' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition-all ${
                chartType === 'bar' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Bar
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="mt-4 grid grid-cols-3 gap-2 py-2">
        <div className="rounded-2xl bg-orange-50/60 border border-orange-100 p-2.5 text-center">
          <p className="text-[11px] font-semibold text-orange-800">Total Commits</p>
          <p className="mt-0.5 text-lg font-extrabold text-orange-600">{totalCommits}</p>
        </div>
        <div className="rounded-2xl bg-amber-50/60 border border-amber-100 p-2.5 text-center">
          <p className="text-[11px] font-semibold text-amber-800">Code Written</p>
          <p className="mt-0.5 text-lg font-extrabold text-amber-600">{totalLines.toLocaleString()} <span className="text-xs font-medium">loc</span></p>
        </div>
        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-2.5 text-center">
          <p className="text-[11px] font-semibold text-emerald-800">Active Days</p>
          <p className="mt-0.5 text-lg font-extrabold text-emerald-600">{activeDays} / 30</p>
        </div>
      </div>

      {/* Recharts Visualization */}
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorLines" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="day"
                tickFormatter={(value) => `D${value}`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Area
                type="monotone"
                dataKey={metric === 'commits' ? 'commits' : 'linesOfCode'}
                stroke={metric === 'commits' ? '#f97316' : '#d97706'}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={metric === 'commits' ? 'url(#colorCommits)' : 'url(#colorLines)'}
                activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2, fill: '#f97316' }}
              />
            </AreaChart>
          ) : (
            <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="day"
                tickFormatter={(value) => `D${value}`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Bar
                dataKey={metric === 'commits' ? 'commits' : 'linesOfCode'}
                fill={metric === 'commits' ? '#f97316' : '#ea580c'}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        <span className="flex items-center gap-1 font-medium text-slate-600">
          <Zap size={13} className="text-amber-500" />
          Average {avgCommitsPerActiveDay} commits/active day
        </span>
        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
          <TrendingUp size={13} />
          Consistency: {Math.round((activeDays / 12) * 100)}% on active track
        </span>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, metric }: any) {
  if (active && payload && payload.length) {
    const data: ActivityPoint = payload[0].payload;
    return (
      <div className="rounded-xl bg-slate-900 p-3 text-white shadow-xl border border-slate-800 text-xs animate-fade-in">
        <p className="font-bold text-slate-200">
          Day {data.day} ({data.date})
        </p>
        <div className="mt-1.5 space-y-1">
          <p className="flex items-center justify-between gap-3 text-orange-400 font-semibold">
            <span>Commits:</span>
            <span>{data.commits}</span>
          </p>
          <p className="flex items-center justify-between gap-3 text-amber-300">
            <span>Lines of Code:</span>
            <span>{data.linesOfCode}</span>
          </p>
          <p className="flex items-center justify-between gap-3 text-slate-400 pt-1 border-t border-slate-800">
            <span>Status:</span>
            <span className={data.completed ? 'text-emerald-400 font-bold' : data.day === 12 ? 'text-amber-400 font-bold' : 'text-slate-500'}>
              {data.completed ? 'Completed' : data.day === 12 ? 'In Progress' : 'Pending'}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}
