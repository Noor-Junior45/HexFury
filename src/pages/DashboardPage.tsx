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
  BarChart3,
  Check,
  Zap,
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
  const completionPercentage = Math.round((completed.length / appData.brand.cycleDays) * 100);

  return (
    <MobileShell>
      <TopBar />

      <div className="px-4 sm:px-5 pt-4 pb-24 space-y-6">
        {/* Header / Greeting */}
        <div className="animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="inline-self-start text-[11px] font-semibold text-mist-400 bg-obsidian-850 px-3 py-1 rounded-lg">
              {formatDate(todayTask?.date ?? '2025-11-23')} · {appData.brand.edition}
            </span>
            <Link
              to="/calendar"
              className="w-full sm:w-auto text-center rounded-xl bg-obsidian-800 hover:bg-obsidian-750 px-4 py-2 text-xs font-bold text-mist-200 transition-colors cursor-pointer"
            >
              View 60-Day Calendar →
            </Link>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-mist-50">
            Hey, {student.name.split(' ')[0]}.
          </h1>
          <p className="mt-0.5 text-xs text-mist-400 leading-relaxed">
            {streak.count > 0
              ? `You're on a ${effectiveStreak}-day streak. Keep your momentum going today.`
              : 'Your streak starts with your first submission.'}
          </p>
        </div>

        {/* SECTION 1: CURRENT STREAK */}
        <section className="animate-fade-up delay-1 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ember-500/20 text-ember-400">
                <Flame size={13} />
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-mist-300">
                1. Current Streak
              </h2>
            </div>
            <span className="text-[10px] font-bold text-ember-400 bg-ember-500/10 px-2.5 py-0.5 rounded-md">
              Active Run
            </span>
          </div>

          <div className="rounded-2xl bg-obsidian-850 p-4 shadow-none space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-ember-500/15 text-ember-400">
                <Flame
                  size={36}
                  className={streak.count > 0 ? 'animate-flame' : ''}
                  strokeWidth={2}
                />
              </div>
              <div className="min-w-0 flex-1">
                {streak.count > 0 ? (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ember-400">Streak Active</p>
                    <p className="text-2xl font-extrabold tracking-tight text-mist-50">
                      {effectiveStreak} <span className="text-xs font-medium text-mist-400">Days</span>
                    </p>
                    <p className="text-[11px] text-mist-400">
                      Best: {streak.longestStreak} days · Last shipped Day {streak.lastCompletedDay}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-mist-500">No streak yet</p>
                    <p className="text-base font-bold text-mist-100">Light your first flame</p>
                    <p className="text-[11px] text-mist-400">
                      Submit Day {student.currentDay} to begin.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Stacked Actions on Phone View */}
            <div className="pt-2 border-t border-obsidian-750 flex flex-col sm:flex-row gap-2 w-full">
              <Link
                to="/calendar"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-obsidian-800 py-2.5 px-4 text-xs font-semibold text-mist-200 hover:bg-obsidian-750 transition-all text-center cursor-pointer"
              >
                <CalendarDays size={14} className="text-ember-400" />
                <span>Open Streak Calendar</span>
              </Link>

              {missed.length > 0 && freezeAppliedDay === null && (
                <button
                  onClick={handleApplyFreeze}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500/20 py-2.5 px-4 text-xs font-bold text-sky-300 hover:bg-sky-500/30 transition-all text-center cursor-pointer"
                >
                  <Snowflake size={14} />
                  <span>Protect Streak with Freeze</span>
                </button>
              )}
            </div>
          </div>

          {/* Missed day callout if applicable */}
          {missed.length > 0 && freezeAppliedDay === null && (
            <div className="rounded-2xl bg-rose-500/10 p-4 space-y-2">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                  <Snowflake size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-mist-100">Missed Day {missed[0].day}</p>
                  <p className="text-[11px] text-mist-400 mt-0.5">
                    {missed[0].missReason ?? 'No submission recorded.'} Apply your freeze pass to keep your streak intact.
                  </p>
                </div>
              </div>
              <button
                onClick={handleApplyFreeze}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-all text-center cursor-pointer"
              >
                Use Streak Freeze Pass
              </button>
            </div>
          )}

          {/* Streak Freeze power-up component */}
          <StreakFreeze
            total={student.streakFreeze.total}
            used={student.streakFreeze.used}
            available={student.streakFreeze.available && freezeAppliedDay === null}
            onApply={handleApplyFreeze}
            appliedToDay={freezeAppliedDay}
          />
        </section>

        {/* SECTION 2: TODAY'S TASK */}
        <section className="animate-fade-up delay-2 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ember-500/20 text-ember-400">
                <Zap size={13} />
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-mist-300">
                2. Today's Task
              </h2>
            </div>
            <span className="text-[10px] font-bold text-mist-400 bg-obsidian-800 px-2.5 py-0.5 rounded-md">
              Day {student.currentDay}
            </span>
          </div>

          {todayTask && (
            <div className="rounded-2xl bg-obsidian-850 p-4 shadow-none space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-ember-500/15 px-2.5 py-0.5 text-[10px] font-bold text-ember-300">
                    {track.shortName}
                  </span>
                  <span className="rounded-md bg-obsidian-800 px-2.5 py-0.5 text-[10px] font-semibold text-mist-400">
                    {todayTask.difficulty}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-bold leading-snug text-mist-50">
                  {todayTask.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-mist-400 line-clamp-2">
                  {todayTask.summary}
                </p>
              </div>

              {/* Requirement highlights & Stacked Action Button */}
              <div className="pt-3 border-t border-obsidian-750 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-mist-400">
                  <span className="inline-flex items-center gap-1"><Sparkles size={12} className="text-amber-400" /> {todayTask.duration}</span>
                  <span className="inline-flex items-center gap-1"><TrendingUp size={12} className="text-emerald-400" /> {todayTask.difficulty} Level</span>
                </div>

                {/* Stacked Action Button for Phone */}
                <Link
                  to={`/day/${todayTask.day}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-ember-500 text-white font-bold text-xs hover:bg-ember-400 active:scale-[0.99] transition-all cursor-pointer shadow-none"
                >
                  <span>Start Day {todayTask.day} Problem</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 3: PROGRESS THROUGH THE CHALLENGE */}
        <section className="animate-fade-up delay-3 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                <BarChart3 size={13} />
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-mist-300">
                3. Challenge Progress
              </h2>
            </div>
            <span className="text-[10px] font-bold text-mist-400 bg-obsidian-800 px-2.5 py-0.5 rounded-md">
              {completionPercentage}% Shipped
            </span>
          </div>

          <div className="rounded-2xl bg-obsidian-850 p-4 space-y-3 shadow-none">
            {/* Overall Bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className="font-semibold text-mist-200">60-Day Challenge Completion</span>
                <span className="font-bold text-ember-400">{student.currentDay} / {appData.brand.cycleDays} Days</span>
              </div>
              <ProgressBar current={student.currentDay} total={appData.brand.cycleDays} />
            </div>

            {/* Streak Strip */}
            <div className="pt-2 border-t border-obsidian-750">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-mist-400">Recent Days History</span>
                <span className="text-[11px] text-mist-500">{completed.length} shipped · {missed.length} missed</span>
              </div>
              <StreakStrip />
            </div>
          </div>

          {/* 30-Day Activity Chart */}
          <CodingActivityChart />
        </section>

        {/* SECTION 4: OVERALL COMPLETION & SHIPPED PROJECTS */}
        <section className="animate-fade-up delay-4 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 size={13} />
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-mist-300">
                4. Shipped Projects & Proof
              </h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
              {completed.length} Completed
            </span>
          </div>

          {hasSubmissions ? (
            <div className="space-y-2">
              {[...completed].slice(-4).reverse().map((d) => (
                <div
                  key={d.day}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-obsidian-850 p-3.5 shadow-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-obsidian-800 text-xs font-bold text-ember-400">
                      D{d.day}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-mist-100">{d.project}</p>
                      <p className="text-[10px] text-mist-500">{formatDate(d.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={d.github ?? '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="rounded-lg bg-obsidian-800 p-2 text-mist-300 hover:text-white transition-colors"
                    >
                      <Github size={13} />
                    </a>
                    <a
                      href={d.linkedin ?? '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="rounded-lg bg-obsidian-800 p-2 text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      <Linkedin size={13} />
                    </a>
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Check size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-obsidian-850 p-5 text-center space-y-3">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian-800 text-mist-400">
                <Github size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-mist-200">No submissions recorded yet</p>
                <p className="text-[11px] text-mist-500 mt-0.5">
                  Your shipped work will appear here after you submit proof.
                </p>
              </div>
              <Link
                to={`/day/${student.currentDay}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-ember-500 text-white font-bold text-xs hover:bg-ember-400 transition-all cursor-pointer"
              >
                <span>Submit Day {student.currentDay} Build</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </section>

        {/* SECTION 5: STUDENT STANDING & ACHIEVEMENTS */}
        <section className="animate-fade-up delay-5 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                <Trophy size={13} />
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-mist-300">
                5. Standing & Achievements
              </h2>
            </div>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
              Rank #{student.rankTier}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-obsidian-850 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Trophy size={15} />
                <span className="text-[10px] font-bold text-mist-400 uppercase">Campus Rank</span>
              </div>
              <p className="text-sm font-extrabold text-mist-50">{student.rank}</p>
              <p className="text-[10px] text-mist-500 truncate">{student.rankLabel}</p>
            </div>

            <div className="rounded-2xl bg-obsidian-850 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-sky-400">
                <Eye size={15} />
                <span className="text-[10px] font-bold text-mist-400 uppercase">Visibility</span>
              </div>
              <p className="text-sm font-extrabold text-mist-50">{appData.stats.recruitersWatching}</p>
              <p className="text-[10px] text-mist-500 truncate">Tech recruiters watching</p>
            </div>
          </div>

          {/* Badges showcase */}
          <div className="pt-1">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-mist-400">Earned Badges</span>
              <span className="text-[11px] font-bold text-amber-400">{earned.length} Total</span>
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

          {/* Track metadata footer */}
          <div className="rounded-2xl bg-obsidian-850 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[10px] uppercase font-bold text-mist-500">Track & Campus</p>
              <p className="text-xs font-bold text-mist-100">{track.name}</p>
              <p className="text-[11px] text-mist-400">{student.college}</p>
            </div>
            <span className="inline-self-start sm:inline-self-auto text-[10px] font-semibold text-mist-300 bg-obsidian-800 px-3 py-1 rounded-md">
              {student.bio}
            </span>
          </div>
        </section>
      </div>

      {/* Freeze toast notification */}
      {showFreezeToast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 animate-scale-in">
          <div className="flex items-center gap-2 rounded-xl bg-sky-500/20 border-0 px-4 py-2.5 text-xs font-semibold text-sky-200 backdrop-blur-xl shadow-2xl">
            <ShieldCheck size={16} />
            <span>Streak Freeze applied — Day {freezeAppliedDay} protected!</span>
          </div>
        </div>
      )}
    </MobileShell>
  );
}
