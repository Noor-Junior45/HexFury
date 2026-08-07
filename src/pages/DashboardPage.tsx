import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Trophy,
  Eye,
  Snowflake,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  CalendarDays,
  TrendingUp,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/BrandIcons';
import {
  appData,
  getTrack,
  getDay,
  completedDays,
  missedDays,
  earnedBadges,
  lockedBadges,
  formatDate,
} from '@/data/mockData';
import TopBar from '@/components/TopBar';
import MobileShell from '@/components/MobileShell';
import ProgressBar from '@/components/ProgressBar';
import StreakStrip from '@/components/StreakStrip';
import StreakFreeze from '@/components/StreakFreeze';
import BadgeCard from '@/components/BadgeCard';
import StreakCalendar from '@/components/StreakCalendar';
import CodingActivityChart from '@/components/CodingActivityChart';

export default function DashboardPage() {
  const student = appData.student;
  const track = getTrack(student.trackId)!;
  const todayTask = getDay(student.currentDay);
  const completed = completedDays();
  const missed = missedDays();
  const earned = earnedBadges();
  const locked = lockedBadges();
  const streak = appData.currentStreak;

  const [freezeAppliedDay, setFreezeAppliedDay] = useState<number | null>(null);
  const [showFreezeToast, setShowFreezeToast] = useState(false);

  const handleApplyFreeze = () => {
    const firstMissed = missed[0];
    if (firstMissed) {
      setFreezeAppliedDay(firstMissed.day);
      setShowFreezeToast(true);
      setTimeout(() => setShowFreezeToast(false), 3000);
    }
  };

  const hasSubmissions = completed.length > 0;
  const effectiveStreak = freezeAppliedDay ? streak.count + 1 : streak.count;

  return (
    <MobileShell>
      <TopBar />

      <div className="px-5 pt-5 pb-4">
        {/* Greeting */}
        <div className="animate-fade-up">
          <p className="text-xs text-mist-500">{formatDate(todayTask?.date ?? '2025-11-23')} · {appData.brand.edition}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-mist-50">
            Hey, {student.name.split(' ')[0]}.
          </h1>
          <p className="mt-0.5 text-sm text-mist-400">
            {streak.count > 0
              ? `You're on a ${effectiveStreak}-day streak. Keep it alive today.`
              : 'Your streak starts with your first submission.'}
          </p>
        </div>

        {/* Streak widget */}
        <div className="mt-5 relative overflow-hidden rounded-3xl border border-obsidian-700 bg-gradient-to-br from-obsidian-850 to-obsidian-800 p-5 animate-fade-up delay-1">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ember-500/10 blur-[60px]" />
          <div className="relative flex items-center gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-ember-500/20 to-ember-700/10 border border-ember-500/30">
                <Flame
                  size={40}
                  className={`text-ember-400 ${streak.count > 0 ? 'animate-flame' : ''}`}
                  strokeWidth={2}
                />
              </div>
              {streak.count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-ember-500 px-1 text-xs font-bold text-white shadow-lg shadow-ember-500/30 animate-count">
                  {effectiveStreak}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              {streak.count > 0 ? (
                <>
                  <p className="text-xs font-medium uppercase tracking-wider text-ember-400">Current streak</p>
                  <p className="mt-0.5 text-3xl font-extrabold tracking-tight text-mist-50">
                    {effectiveStreak} <span className="text-base font-semibold text-mist-400">days</span>
                  </p>
                  <p className="mt-0.5 text-xs text-mist-400">
                    Best: {streak.longestStreak} days · Last shipped Day {streak.lastCompletedDay}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-medium uppercase tracking-wider text-mist-500">No streak yet</p>
                  <p className="mt-0.5 text-lg font-bold text-mist-100">Your streak starts today</p>
                  <p className="mt-0.5 text-xs text-mist-400">
                    Submit Day {student.currentDay} to light the first flame.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="relative mt-5">
            <ProgressBar current={student.currentDay} total={appData.brand.cycleDays} />
          </div>
        </div>

        {/* Streak strip */}
        <div className="mt-4 animate-fade-up delay-2">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-mist-400">Your history</span>
            <span className="text-[11px] text-mist-500">{completed.length} shipped · {missed.length} missed</span>
          </div>
          <StreakStrip />
        </div>

        {/* Today's task card */}
        {todayTask && (
          <div className="mt-5 animate-fade-up delay-3">
            <div className="mb-2 flex items-center gap-1.5 px-1">
              <CalendarDays size={13} className="text-ember-400" />
              <span className="text-xs font-semibold text-mist-400">Today's task · Day {todayTask.day}</span>
            </div>
            <Link
              to={`/day/${todayTask.day}`}
              className="group block rounded-2xl border border-ember-500/30 bg-gradient-to-br from-obsidian-850 to-obsidian-800 p-4 transition-all hover:border-ember-400/50 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="inline-block rounded-md bg-ember-500/15 px-2 py-0.5 text-[10px] font-semibold text-ember-300">
                    {track.shortName} · {todayTask.difficulty}
                  </span>
                  <h3 className="mt-2 text-base font-bold leading-snug text-mist-50">
                    {todayTask.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-mist-400 line-clamp-2">
                    {todayTask.summary}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ember-500/15 text-ember-400 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={18} />
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-mist-500">
                <span className="inline-flex items-center gap-1"><Sparkles size={11} /> {todayTask.duration}</span>
                <span className="inline-flex items-center gap-1"><TrendingUp size={11} /> {todayTask.difficulty}</span>
              </div>
            </Link>
          </div>
        )}

        {/* 30-Day Activity Visualization */}
        <div className="mt-5 animate-fade-up delay-3">
          <CodingActivityChart />
        </div>

        {/* Missed day state */}
        {missed.length > 0 && freezeAppliedDay === null && (
          <div className="mt-4 rounded-2xl border border-rose-500/25 bg-rose-500/5 p-4 animate-fade-up delay-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
                <Snowflake size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-mist-100">You missed Day {missed[0].day}</p>
                <p className="mt-0.5 text-xs text-mist-400">
                  {missed[0].missReason ?? 'No submission was made that day.'} That's okay — it happens.
                  Apply your Streak Freeze to protect your run, or ship today to start fresh.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Streak Freeze power-up */}
        <div className="mt-4 animate-fade-up delay-4">
          <StreakFreeze
            total={student.streakFreeze.total}
            used={student.streakFreeze.used}
            available={student.streakFreeze.available && freezeAppliedDay === null}
            onApply={handleApplyFreeze}
            appliedToDay={freezeAppliedDay}
          />
        </div>

        {/* Empty profile state OR recent submissions */}
        <div className="mt-6 animate-fade-up delay-5">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-mist-400">Recent submissions</span>
            <span className="text-[11px] text-mist-500">{completed.length} total</span>
          </div>

          {hasSubmissions ? (
            <div className="space-y-2">
              {[...completed].slice(-4).reverse().map((d) => (
                <div
                  key={d.day}
                  className="flex items-center gap-3 rounded-2xl border border-obsidian-700 bg-obsidian-850 p-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember-500/15 text-xs font-bold text-ember-300">
                    {d.day}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-mist-100">{d.project}</p>
                    <p className="text-[11px] text-mist-500">{formatDate(d.date)}</p>
                  </div>
                  <div className="flex items-center gap-2 text-mist-500">
                    <a href={d.github ?? '#'} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-mist-200 transition-colors">
                      <Github size={15} />
                    </a>
                    <a href={d.linkedin ?? '#'} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-sky-400 transition-colors">
                      <Linkedin size={15} />
                    </a>
                    <CheckCircle2 size={15} className="text-sage-500" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-obsidian-600 bg-obsidian-850/50 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-obsidian-800 text-mist-500">
                <Github size={22} />
              </div>
              <p className="mt-3 text-sm font-semibold text-mist-200">No submissions yet</p>
              <p className="mt-1 text-xs text-mist-500">
                Your first build will appear here. Head to today's task to ship Day {student.currentDay}.
              </p>
              <Link
                to={`/day/${student.currentDay}`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-ember-500/15 px-4 py-2 text-xs font-semibold text-ember-300 border border-ember-400/30 hover:bg-ember-500/25 transition-colors"
              >
                Start Day {student.currentDay} <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Standing / rank */}
        <div className="mt-6 animate-fade-up delay-5">
          <div className="mb-2 px-1">
            <span className="text-xs font-semibold text-mist-400">Your standing</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-2xl border border-obsidian-700 bg-obsidian-850 p-4">
              <Trophy size={18} className="text-amber-400" />
              <p className="mt-2 text-sm font-bold text-mist-50">{student.rank}</p>
              <p className="text-[11px] text-mist-500">{student.rankLabel}</p>
            </div>
            <div className="rounded-2xl border border-obsidian-700 bg-obsidian-850 p-4">
              <Eye size={18} className="text-sky-400" />
              <p className="mt-2 text-sm font-bold text-mist-50">{appData.stats.recruitersWatching}</p>
              <p className="text-[11px] text-mist-500">recruiters watching</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-6 animate-fade-up delay-6">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-mist-400">Badges</span>
            <span className="text-[11px] text-mist-500">{earned.length} earned</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {earned.map((b) => (
              <BadgeCard key={b.id} badge={b} />
            ))}
            {locked.slice(0, 3).map((b) => (
              <BadgeCard key={b.id} badge={b} />
            ))}
          </div>
        </div>

        {/* Track footer */}
        <div className="mt-6 rounded-2xl border border-obsidian-700 bg-obsidian-850 p-4">
          <p className="text-[11px] text-mist-500">Track</p>
          <p className="mt-0.5 text-sm font-semibold text-mist-100">{track.name}</p>
          <p className="mt-1 text-xs text-mist-400">{student.college}</p>
        </div>

        {/* 60-day streak calendar */}
        <div className="mt-6 animate-fade-up">
          <StreakCalendar freezeAppliedDay={freezeAppliedDay} />
        </div>
      </div>

      {/* Freeze toast */}
      {showFreezeToast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 animate-scale-in">
          <div className="flex items-center gap-2 rounded-2xl bg-sky-500/20 border border-sky-400/40 px-4 py-3 text-sm font-medium text-sky-200 backdrop-blur-xl shadow-xl">
            <ShieldCheck size={18} />
            Streak Freeze applied — Day {freezeAppliedDay} is protected.
          </div>
        </div>
      )}
    </MobileShell>
  );
}
