import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  GitCommitVertical,
  Eye,
  Users,
  CheckCircle2,
  Sparkles,
  Quote,
  ShieldCheck,
  Code2,
  Calendar,
  Award,
  Zap,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/BrandIcons';
import { appData, getTrack } from '@/data/mockData';
import AnimatedCounter from '@/components/AnimatedCounter';
import TopBar from '@/components/TopBar';
import StreakCalendar from '@/components/StreakCalendar';
import MobileShell from '@/components/MobileShell';

export default function LandingPage() {
  const selectedTrack = getTrack(appData.student.trackId);

  return (
    <MobileShell>
      <TopBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-5 pt-8 pb-8 text-center sm:text-left">
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-400/20 blur-[90px]"
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-semibold text-orange-700 shadow-sm animate-fade-in">
            <Sparkles size={14} className="text-orange-500" />
            <span>Season 4 · Live for College Developers</span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight text-slate-900 animate-fade-up">
            60 Days. 1 Build a Day.
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 bg-clip-text text-transparent">
              A Portfolio Recruiters Can't Ignore.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl animate-fade-up delay-1">
            ABTalks is India's premier 60-day proof-of-work challenge. Pick a track, ship a real project daily, and build an unbroken streak on GitHub and LinkedIn that top engineering companies actually respect.
          </p>

          {/* Call to Actions */}
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-fade-up delay-2">
            <Link
              to="/dashboard"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all active:scale-[0.98]"
            >
              <Flame size={20} strokeWidth={2.5} className="group-hover:animate-flame" />
              <span>Commit to 60-Day Challenge</span>
            </Link>

            <Link
              to="/day/12"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-colors"
            >
              <span>See Today's Build (Day 12)</span>
            </Link>
          </div>

          {/* Quick Trust Highlights */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80 text-left">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 font-bold text-xs">
                100%
              </span>
              <p className="text-xs font-semibold text-slate-700">Free for College Students</p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-bold text-xs">
                <ShieldCheck size={16} />
              </span>
              <p className="text-xs font-semibold text-slate-700">Verified GitHub Proof</p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 font-bold text-xs">
                <Users size={16} />
              </span>
              <p className="text-xs font-semibold text-slate-700">4,200+ Active Builders</p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 font-bold text-xs">
                <Award size={16} />
              </span>
              <p className="text-xs font-semibold text-slate-700">Recruiter Leaderboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why ABTalks Works - Clarity & Trust Section */}
      <section className="px-5 py-8 bg-white border-y border-slate-200/80">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Why ABTalks Works
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Built specifically for ambitious engineering students
            </h2>
            <p className="mt-1.5 text-xs text-slate-500">
              Traditional courses give you certificates nobody looks at. ABTalks gives you proof recruiters can verify.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureBox
              icon={Code2}
              title="Resumes lie. Code doesn't."
              desc="Recruiters ignore generic certificates. An unbroken 60-day GitHub contribution graph proves genuine coding discipline."
              badge="Proof of Work"
              badgeColor="bg-orange-100 text-orange-700"
            />

            <FeatureBox
              icon={Zap}
              title="Bite-Sized Daily Projects"
              desc="Tasks are carefully scoped to take 45–90 minutes daily. Designed to fit easily around college lectures, assignments, and exams."
              badge="Anti-Burnout"
              badgeColor="bg-sky-100 text-sky-700"
            />

            <FeatureBox
              icon={Linkedin}
              title="Dual-Verification System"
              desc="Your daily flame stays alive only when you submit both a GitHub repo link AND write a LinkedIn post showcasing what you built."
              badge="Public Visibility"
              badgeColor="bg-emerald-100 text-emerald-700"
            />

            <FeatureBox
              icon={ShieldCheck}
              title="Safety Net: Streak Freeze"
              desc="Exams or emergencies? You receive a free Streak Freeze token to protect your run without losing your motivation."
              badge="Protection"
              badgeColor="bg-purple-100 text-purple-700"
            />
          </div>
        </div>
      </section>

      {/* The 3-Step Daily Loop */}
      <section className="px-5 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Simple Daily System
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">How your daily loop works</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                step: '01',
                icon: GitCommitVertical,
                label: 'Choose a Task & Build',
                desc: 'Open today’s scoped task card, read the requirements, and code the solution in React, Python, or Node.js.',
                color: 'text-orange-600 bg-orange-100',
              },
              {
                step: '02',
                icon: Github,
                label: 'Push Code to GitHub',
                desc: 'Commit your project code to a public GitHub repository. Your code history is your real resume.',
                color: 'text-slate-800 bg-slate-100',
              },
              {
                step: '03',
                icon: Linkedin,
                label: 'Post Build Story on LinkedIn',
                desc: 'Write a short post sharing key learnings and screenshot. Recruiters follow #ABTalks to discover active builders.',
                color: 'text-sky-600 bg-sky-100',
              },
              {
                step: '04',
                icon: Flame,
                label: 'Light Flame & Extend Streak',
                desc: 'Paste both URLs in your dashboard. Both verified? Your daily streak increments and your flame grows brighter!',
                color: 'text-amber-600 bg-amber-100',
              },
            ].map(({ step, icon: Icon, label, desc, color }, i) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-orange-300 transition-colors"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold text-base ${color}`}>
                  <Icon size={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-orange-600 tracking-wider">STEP {step}</span>
                    <h3 className="text-base font-bold text-slate-900">{label}</h3>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cohort Live Stats */}
      <section className="px-5 py-8 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Cohort Activity
            </h2>
            <p className="mt-1 text-xl font-extrabold text-slate-900">
              Join thousands of students building in public right now
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={Users} label="Active Builders" value={appData.stats.activeBuilders} />
            <StatCard icon={Flame} label="Streaks Kept" value={appData.stats.streaksKept} />
            <StatCard icon={Eye} label="Recruiters Watching" value={appData.stats.recruitersWatching} />
            <StatCard icon={Github} label="Projects Shipped" value={appData.stats.projectsShipped} />
          </div>
        </div>
      </section>

      {/* Available Tracks */}
      {selectedTrack && (
        <section className="px-5 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Curriculum Tracks
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">Pick your specialization</h2>
              <p className="mt-1 text-xs text-slate-500">Every track is structured with 60 daily progressive challenges.</p>
            </div>

            <div className="space-y-3">
              {appData.tracks.map((t) => (
                <div
                  key={t.id}
                  className={`rounded-2xl border p-4.5 transition-all ${
                    t.id === selectedTrack.id
                      ? 'border-orange-400 bg-gradient-to-r from-orange-50/80 to-amber-50/50 shadow-md ring-1 ring-orange-400/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-slate-900">{t.name}</p>
                      {t.id === selectedTrack.id && (
                        <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                          Active Student Choice
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-500">60 Days</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{t.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {t.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Student Testimonials */}
      <section className="px-5 py-8 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Proven Outcomes
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              What builders say after completing the streak
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {appData.testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs"
              >
                <div>
                  <Quote size={20} className="text-orange-400" />
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed font-medium text-slate-700">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{t.name}</p>
                    <p className="text-[11px] font-medium text-slate-500">{t.college}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                    {t.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 60-Day Interactive Calendar Preview */}
      <section className="px-5 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-slate-900">Your 60-Day Progress Map</h2>
            <p className="text-xs text-slate-500">Every box is a project pushed. Complete all 60 to unlock your Recruiter Verified Badge.</p>
          </div>
          <StreakCalendar freezeAppliedDay={null} />
        </div>
      </section>

      {/* Final Commitment CTA */}
      <section className="px-5 pb-12 pt-2">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-center text-white shadow-xl">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-orange-500/20 blur-[70px]" />
            <div className="relative">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                <Flame size={28} className="animate-flame" />
              </span>
              <h2 className="mt-4 text-2xl font-extrabold">Day 1 starts the moment you commit.</h2>
              <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
                No subscription. No sign-up fee. Just today's challenge, a code editor, and an unbroken streak to build.
              </p>
              <Link
                to="/dashboard"
                className="mt-6 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 hover:scale-105 transition-all active:scale-98"
              >
                <span>Start Your 60-Day Streak</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MobileShell>
  );
}

function FeatureBox({
  icon: Icon,
  title,
  desc,
  badge,
  badgeColor,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  badge: string;
  badgeColor: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4.5 hover:border-orange-200 transition-colors">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-800 shadow-xs">
          <Icon size={18} />
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badgeColor}`}>
          {badge}
        </span>
      </div>
      <h3 className="mt-3 text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 text-center shadow-xs">
      <Icon size={20} className="mx-auto text-orange-600" />
      <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
        <AnimatedCounter to={value} />
      </p>
      <p className="text-[11px] font-semibold text-slate-500">{label}</p>
    </div>
  );
}

