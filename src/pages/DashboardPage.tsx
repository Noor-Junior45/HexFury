import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Trophy,
  Award,
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
  Code2,
  AlertTriangle,
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
  const [badgeTab, setBadgeTab] = useState<'all' | 'earned' | 'locked'>('all');

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

  const displayedBadges =
    badgeTab === 'earned' ? earned : badgeTab === 'locked' ? locked : appData.badges;

  // Milestone calculation for ring visualizer
  const nextMilestone = 15;
  const ringProgress = Math.min((effectiveStreak / nextMilestone) * 100, 100);

  return (
    <MobileShell>
      <TopBar />

      <div className="px-4 sm:px-6 pt-4 pb-24 space-y-7">
        {/* Header / Student Greeting */}
        <div className="animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="inline-self-start text-[11px] font-bold tracking-wide text-orange-700 bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-full shadow-2xs">
              {formatDate(todayTask?.date ?? '2025-11-23')} · {appData.brand.edition}
            </span>
            <Link
              to="/calendar"
              className="w-full sm:w-auto text-center rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition-colors cursor-pointer border border-slate-200"
            >
              View 60-Day Calendar →
            </Link>
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back, {student.name.split(' ')[0]}!
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {streak.count > 0
              ? `You're on an unbroken ${effectiveStreak}-day streak. Ship today's build to keep the momentum going.`
              : 'Your 60-day proof-of-work journey starts with your first build submission.'}
          </p>
        </div>

        {/* SECTION 1: CURRENT STREAK (EMOTIONAL VISUAL CENTERPIECE) */}
        <section className="animate-fade-up delay-1 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 text-white shadow-xs">
                <Flame size={14} className="animate-flame" />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                1. Current Streak
              </h2>
            </div>
            <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200">
              Active Run
            </span>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-orange-200/90 bg-gradient-to-br from-orange-50/90 via-white to-amber-50/60 p-5 sm:p-6 shadow-md">
            {/* Background ambient lighting */}
            <div
              className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-orange-400/20 blur-2xl"
              aria-hidden="true"
            />

            {effectiveStreak > 0 ? (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Radial Progress Ring & Glowing Flame */}
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                    <path
                      className="text-orange-200/80"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-orange-500 transition-all duration-1000 ease-out"
                      strokeDasharray={`${ringProgress}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <Flame size={32} className="text-orange-500 animate-flame drop-shadow-xs" />
                    <span className="text-xs font-extrabold text-orange-700 mt-0.5">DAY {effectiveStreak}</span>
                  </div>
                </div>

                <div className="min-w-0 flex-1 text-center sm:text-left space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 border border-orange-200 px-3 py-0.5 text-[11px] font-extrabold text-orange-800">
                    <Sparkles size={12} className="text-orange-600" />
                    Streak Preserved
                  </span>

                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    {effectiveStreak} Days Unbroken
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Personal Best: <strong className="text-slate-900">{streak.longestStreak} days</strong> · Last shipped: <strong className="text-slate-900">Day {streak.lastCompletedDay}</strong>
                  </p>

                  <div className="pt-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-[11px] font-bold text-slate-600 bg-white/90 border border-slate-200 px-2.5 py-1 rounded-lg">
                      {nextMilestone - effectiveStreak} days to 15-Day Badge 🏆
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Encouraging Zero-Streak State */
              <div className="text-center py-2 space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 border border-orange-200">
                  <Flame size={28} className="animate-bounce-subtle" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Light your first flame today</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                    Every 60-day journey begins with Day 1. Submit your project proof to start your streak.
                  </p>
                </div>
                <Link
                  to={`/day/${student.currentDay}`}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-orange-600 transition-all cursor-pointer"
                >
                  <Flame size={16} />
                  <span>Light First Flame (Day {student.currentDay})</span>
                </Link>
              </div>
            )}

            {/* Quick Actions Bar */}
            <div className="mt-4 pt-3.5 border-t border-orange-200/60 flex flex-col sm:flex-row gap-2 w-full">
              <Link
                to="/calendar"
                className="w-full flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 py-2.5 px-4 text-xs font-bold text-slate-800 transition-all text-center cursor-pointer shadow-2xs"
              >
                <CalendarDays size={15} className="text-orange-600" />
                <span>Open 60-Day Progress Map</span>
              </Link>

              {missed.length > 0 && freezeAppliedDay === null && (
                <button
                  onClick={handleApplyFreeze}
                  className="w-full flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 py-2.5 px-4 text-xs font-bold text-white transition-all text-center cursor-pointer shadow-xs"
                >
                  <Snowflake size={15} />
                  <span>Protect Streak with Freeze Pass</span>
                </button>
              )}
            </div>
          </div>

          {/* Missed Day Recovery Banner */}
          {missed.length > 0 && freezeAppliedDay === null && (
            <div className="rounded-2xl bg-amber-50 border border-amber-300/90 p-4 space-y-2.5 shadow-xs">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white font-bold shadow-2xs">
                  <AlertTriangle size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-extrabold text-amber-900">Missed Day {missed[0].day} Recovery</p>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">
                      Action Needed
                    </span>
                  </div>
                  <p className="text-xs text-amber-800/90 mt-0.5 leading-relaxed">
                    {missed[0].missReason ?? 'No submission recorded for Day 9.'} You can use your Streak Freeze pass to recover this day and keep your flame alive.
                  </p>
                </div>
              </div>
              <button
                onClick={handleApplyFreeze}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-all text-center cursor-pointer shadow-xs"
              >
                Apply Streak Freeze Pass Now
              </button>
            </div>
          )}

          {/* Streak Freeze Sub-component */}
          <StreakFreeze
            total={student.streakFreeze.total}
            used={student.streakFreeze.used}
            available={student.streakFreeze.available && freezeAppliedDay === null}
            onApply={handleApplyFreeze}
            appliedToDay={freezeAppliedDay}
          />
        </section>

        {/* SECTION 2: TODAY'S TASK (PRIMARY ACTION) */}
        <section className="animate-fade-up delay-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 text-white shadow-xs">
                <Zap size={14} />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                2. Today's Primary Task
              </h2>
            </div>
            <span className="text-[10px] font-extrabold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200">
              Day {student.currentDay} Challenge
            </span>
          </div>

          {todayTask && (
            <div className="rounded-3xl border border-orange-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4 hover:border-orange-300 transition-all">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-lg bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1 text-xs font-extrabold">
                  {track.name}
                </span>
                <span className="rounded-lg bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 text-xs font-bold">
                  {todayTask.difficulty}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold leading-snug text-slate-900">
                  {todayTask.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2 font-normal">
                  {todayTask.summary}
                </p>
              </div>

              {/* Requirement Highlights & Primary CTA */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><Sparkles size={14} className="text-amber-500" /> Est: {todayTask.duration}</span>
                  <span className="inline-flex items-center gap-1.5"><TrendingUp size={14} className="text-emerald-600" /> {todayTask.difficulty} Level</span>
                </div>

                <Link
                  to={`/day/${todayTask.day}`}
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-extrabold text-sm sm:text-base hover:shadow-md hover:shadow-orange-500/20 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Start Day {todayTask.day} Problem</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 3: CHALLENGE PROGRESS & ACTIVITY LOG */}
        <section className="animate-fade-up delay-3 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
                <BarChart3 size={14} />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                3. Challenge Progress
              </h2>
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {completionPercentage}% Shipped
            </span>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 space-y-4 shadow-xs">
            {/* Overall Bar */}
            <ProgressBar current={student.currentDay} total={appData.brand.cycleDays} />

            {/* Streak Strip */}
            <div className="pt-3 border-t border-slate-100">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800">Recent Days History</span>
                <span className="text-[11px] font-bold text-slate-500">{completed.length} shipped · {missed.length} missed</span>
              </div>
              <StreakStrip />
            </div>
          </div>

          {/* 30-Day Activity Chart */}
          <CodingActivityChart />
        </section>

        {/* SECTION 4: SHIPPED PROJECTS & PROOF */}
        <section className="animate-fade-up delay-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                <CheckCircle2 size={14} />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                4. Shipped Projects & Proof
              </h2>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {completed.length} Verified
            </span>
          </div>

          {hasSubmissions ? (
            <div className="space-y-2.5">
              {[...completed].slice(-4).reverse().map((d) => (
                <div
                  key={d.day}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 font-extrabold text-xs text-orange-700 border border-orange-200/60 shadow-2xs">
                      D{d.day}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-slate-900">{d.project}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[11px] font-semibold text-slate-500">{formatDate(d.date)}</p>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <div className="flex items-center gap-2">
                      <a
                        href={d.github ?? '#'}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Repository"
                        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 p-2 text-slate-800 transition-colors border border-slate-200"
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href={d.linkedin ?? '#'}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn Post"
                        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-sky-50 hover:bg-sky-100 p-2 text-sky-600 transition-colors border border-sky-200"
                      >
                        <Linkedin size={16} />
                      </a>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">
                      <Check size={16} strokeWidth={3} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 text-center space-y-4 shadow-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 border border-orange-200">
                <Code2 size={24} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">No submissions recorded yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Your shipped repos and LinkedIn proof links will appear here after your first submission.
                </p>
              </div>
              <Link
                to={`/day/${student.currentDay}`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-all cursor-pointer shadow-xs"
              >
                <span>Submit Day {student.currentDay} Build</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </section>

        {/* SECTION 5: STANDING & ACHIEVEMENTS */}
        <section className="animate-fade-up delay-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
                <Trophy size={14} />
              </span>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                5. Standing & Achievements
              </h2>
            </div>
            <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
              Rank #{student.rankTier}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/30 p-4 space-y-1 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-800 uppercase">Campus Leaderboard</span>
                <Trophy size={18} className="text-amber-600" />
              </div>
              <p className="text-lg font-black text-slate-900">{student.rank}</p>
              <p className="text-xs font-semibold text-slate-500">{student.rankLabel}</p>
            </div>

            <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/30 p-4 space-y-1 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-sky-800 uppercase">Recruiter Visibility</span>
                <Eye size={18} className="text-sky-600" />
              </div>
              <p className="text-lg font-black text-slate-900">{appData.stats.recruitersWatching}</p>
              <p className="text-xs font-semibold text-slate-500">Tech recruiters tracking this cohort</p>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="pt-1 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div>
                <div className="flex items-center gap-1.5">
                  <Award size={16} className="text-amber-500 fill-amber-500/20" />
                  <span className="text-xs font-extrabold text-slate-800">Achievements</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">Earned directly from your verified code builds</p>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 border border-slate-200 shrink-0">
                <button
                  onClick={() => setBadgeTab('all')}
                  className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                    badgeTab === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  All ({appData.badges.length})
                </button>
                <button
                  onClick={() => setBadgeTab('earned')}
                  className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                    badgeTab === 'earned'
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Earned ({earned.length})
                </button>
                <button
                  onClick={() => setBadgeTab('locked')}
                  className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                    badgeTab === 'locked'
                      ? 'bg-slate-700 text-white shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Locked ({locked.length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {displayedBadges.map((b) => (
                <BadgeCard key={b.id} badge={b} />
              ))}
            </div>
          </div>

          {/* Student Track & Campus Metadata */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
            <div>
              <p className="text-[10px] uppercase font-extrabold text-slate-400">Enrolled Track & College</p>
              <p className="text-xs font-extrabold text-slate-900">{track.name}</p>
              <p className="text-xs font-semibold text-slate-500">{student.college}</p>
            </div>
            <span className="inline-self-start sm:inline-self-auto text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              {student.bio}
            </span>
          </div>
        </section>
      </div>

      {/* Freeze Toast Notification */}
      {showFreezeToast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 animate-scale-in">
          <div className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 px-5 py-3 text-xs font-bold text-white shadow-2xl">
            <ShieldCheck size={18} className="text-sky-400" />
            <span>Streak Freeze applied — Day {freezeAppliedDay} protected!</span>
          </div>
        </div>
      )}
    </MobileShell>
  );
}
