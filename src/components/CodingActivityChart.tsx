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
    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600 font-bold">
              <BarChart3 size={16} />
            </span>
            <h2 className="text-sm font-extrabold text-slate-900">30-Day Activity Volume</h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Automated code intensity & commit frequency across your challenge
          </p>
        </div>

        {/* View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200/60">
            <button
              onClick={() => setMetric('commits')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer min-h-[32px] ${
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
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer min-h-[32px] ${
                metric === 'lines'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 size={13} />
              <span>Lines</span>
            </button>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200/60">
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer min-h-[32px] ${
                chartType === 'area' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer min-h-[32px] ${
                chartType === 'bar' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Bar
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Strip */}
      <div className="grid grid-cols-3 gap-2 py-0.5">
        <div className="rounded-xl bg-slate-50 p-2.5 text-center border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Total Commits</p>
          <p className="mt-0.5 text-base font-extrabold text-slate-900">{totalCommits}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2.5 text-center border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Code Written</p>
          <p className="mt-0.5 text-base font-extrabold text-orange-600">{totalLines.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">loc</span></p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2.5 text-center border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Active Days</p>
          <p className="mt-0.5 text-base font-extrabold text-emerald-600">{activeDays} / 30</p>
        </div>
      </div>

      {/* Recharts Visualization */}
      <div className="h-48 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCommitsLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorLinesLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="day"
                tickFormatter={(value) => `D${value}`}
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Area
                type="monotone"
                dataKey={metric === 'commits' ? 'commits' : 'linesOfCode'}
                stroke={metric === 'commits' ? '#ea580c' : '#d97706'}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={metric === 'commits' ? 'url(#colorCommitsLight)' : 'url(#colorLinesLight)'}
                activeDot={{ r: 5, stroke: '#ffffff', strokeWidth: 2, fill: '#ea580c' }}
              />
            </AreaChart>
          ) : (
            <BarChart data={activityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="day"
                tickFormatter={(value) => `D${value}`}
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip metric={metric} />} />
              <Bar
                dataKey={metric === 'commits' ? 'commits' : 'linesOfCode'}
                fill={metric === 'commits' ? '#ea580c' : '#d97706'}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        <span className="flex items-center gap-1 font-semibold">
          <Zap size={13} className="text-amber-500" />
          Average {avgCommitsPerActiveDay} commits per active day
        </span>
        <span className="flex items-center gap-1 text-emerald-700 font-bold">
          <TrendingUp size={13} />
          {Math.round((activeDays / 12) * 100)}% track consistency
        </span>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, metric }: any) {
  if (active && payload && payload.length) {
    const data: ActivityPoint = payload[0].payload;
    return (
      <div className="rounded-xl bg-slate-900 p-3 text-white shadow-xl border border-slate-800 text-xs">
        <p className="font-extrabold text-white">
          Day {data.day} ({data.date})
        </p>
        <div className="mt-1.5 space-y-1 text-[11px]">
          <p className="flex items-center justify-between gap-4 text-orange-400 font-bold">
            <span>Commits:</span>
            <span>{data.commits}</span>
          </p>
          <p className="flex items-center justify-between gap-4 text-amber-300 font-semibold">
            <span>Lines Written:</span>
            <span>{data.linesOfCode}</span>
          </p>
          <p className="flex items-center justify-between gap-4 text-slate-300 pt-1 border-t border-slate-800">
            <span>Status:</span>
            <span className={data.completed ? 'text-emerald-400 font-bold' : data.day === 12 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
              {data.completed ? 'Completed' : data.day === 12 ? 'In Progress' : 'Pending'}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}
