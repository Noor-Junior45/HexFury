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
} from 'lucide-react';
import { Github, Linkedin } from '@/components/BrandIcons';
import { appData } from '@/data/mockData';
import { getTrack } from '@/data/mockData';
import AnimatedCounter from '@/components/AnimatedCounter';
import TopBar from '@/components/TopBar';
import StreakCalendar from '@/components/StreakCalendar';

export default function LandingPage() {
  const track = getTrack(appData.student.trackId);

  return (
    <>
      <TopBar />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-8 pb-6">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-ember-500/15 blur-[100px]"
          aria-hidden
        />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ember-500/30 bg-ember-500/10 px-3 py-1 text-[11px] font-medium text-ember-300 animate-fade-in">
            <Sparkles size={12} /> {appData.brand.edition} · Now running
          </span>

          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-mist-50 text-balance animate-fade-up">
            60 days.
            <br />
            <span className="bg-gradient-to-r from-ember-400 to-ember-600 bg-clip-text text-transparent">
              One build a day.
            </span>
            <br />
            A streak recruiters notice.
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-mist-400 animate-fade-up delay-1">
            ABTalks is a 60-day coding challenge for Indian college students. Pick a track, ship
            something real every day, and prove it publicly — your GitHub commit and LinkedIn post
            keep your streak alive.
          </p>

          <div className="mt-6 flex flex-col gap-3 animate-fade-up delay-2">
            <Link
              to="/dashboard"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-ember-500 to-ember-600 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-ember-500/25 transition-all hover:shadow-ember-500/40 active:scale-[0.98]"
            >
              <Flame size={19} strokeWidth={2.5} className="group-hover:animate-flame" />
              Start your streak
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/day/12"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-obsidian-600 bg-obsidian-850 px-5 py-3 text-sm font-semibold text-mist-200 transition-colors hover:border-obsidian-500 hover:text-mist-100"
            >
              See today's task →
            </Link>
          </div>
        </div>
      </section>

      {/* The daily loop */}
      <section className="px-5 py-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-mist-500">
          The daily loop
        </h2>
        <div className="mt-3 space-y-2.5">
          {[
            { icon: GitCommitVertical, label: 'Build', desc: 'Ship one real, scoped project per day.', color: 'text-ember-400 bg-ember-500/10' },
            { icon: Github, label: 'Commit', desc: 'Push your code to a public GitHub repo.', color: 'text-mist-200 bg-obsidian-800' },
            { icon: Linkedin, label: 'Post', desc: 'Write a LinkedIn post about what you built.', color: 'text-sky-300 bg-sky-500/10' },
            { icon: Flame, label: 'Streak', desc: 'Both submitted? Your streak stays alive.', color: 'text-ember-300 bg-ember-500/15' },
          ].map(({ icon: Icon, label, desc, color }, i) => (
            <div
              key={label}
              className={`flex items-center gap-3.5 rounded-2xl border border-obsidian-700 bg-obsidian-850 p-3.5 animate-fade-up`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-mist-100">{label}</p>
                <p className="text-xs text-mist-400">{desc}</p>
              </div>
              {i < 3 && (
                <span className="ml-auto text-mist-600">
                  <ArrowRight size={16} />
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Live stats */}
      <section className="px-5 py-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-mist-500">
          Live in the cohort
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <StatCard icon={Users} label="Active builders" value={appData.stats.activeBuilders} />
          <StatCard icon={Flame} label="Streaks kept" value={appData.stats.streaksKept} />
          <StatCard icon={Eye} label="Recruiters watching" value={appData.stats.recruitersWatching} />
          <StatCard icon={Github} label="Projects shipped" value={appData.stats.projectsShipped} />
        </div>
      </section>

      {/* Two-part submission explainer */}
      <section className="px-5 py-6">
        <div className="rounded-2xl border border-obsidian-700 bg-gradient-to-br from-obsidian-850 to-obsidian-800 p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-500/15 text-ember-400">
              <CheckCircle2 size={16} />
            </span>
            <h2 className="text-sm font-semibold text-mist-100">How a day counts</h2>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-mist-400">
            A day is only streak-safe when <span className="font-semibold text-mist-200">both</span> parts are
            submitted:
          </p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2.5 rounded-xl bg-obsidian-900/60 p-3">
              <Github size={16} className="text-mist-300" />
              <span className="text-xs text-mist-300">A public GitHub repo or commit link</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-obsidian-900/60 p-3">
              <Linkedin size={16} className="text-sky-400" />
              <span className="text-xs text-mist-300">A LinkedIn post about your build</span>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-mist-500">
            One without the other doesn't protect your streak. The point is proof — code that runs and
            a story others can read.
          </p>
        </div>
      </section>

      {/* Tracks */}
      {track && (
        <section className="px-5 py-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-mist-500">
            Pick your track
          </h2>
          <div className="mt-3 space-y-2">
            {appData.tracks.map((t) => (
              <div
                key={t.id}
                className={`rounded-2xl border p-3.5 ${
                  t.id === track.id
                    ? 'border-ember-500/40 bg-ember-500/5'
                    : 'border-obsidian-700 bg-obsidian-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-mist-100">{t.name}</p>
                  {t.id === track.id && (
                    <span className="rounded-full bg-ember-500/15 px-2 py-0.5 text-[10px] font-semibold text-ember-300">
                      Noor's track
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-mist-400">{t.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {t.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-obsidian-700/60 px-2 py-0.5 text-[10px] font-medium text-mist-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="px-5 py-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-mist-500">
          Builders who stuck it out
        </h2>
        <div className="mt-3 space-y-3">
          {appData.testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-obsidian-700 bg-obsidian-850 p-4"
            >
              <Quote size={18} className="text-ember-500/40" />
              <p className="mt-2 text-sm leading-relaxed text-mist-200">"{t.quote}"</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-mist-100">{t.name}</p>
                  <p className="text-[11px] text-mist-500">{t.college}</p>
                </div>
                <span className="rounded-full bg-sage-500/10 px-2.5 py-1 text-[10px] font-semibold text-sage-400">
                  {t.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-10 pt-2">
        <div className="relative overflow-hidden rounded-3xl border border-ember-500/30 bg-gradient-to-br from-obsidian-850 to-obsidian-800 p-6 text-center">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-ember-500/20 blur-[60px]" />
          <div className="relative">
            <Flame size={28} className="mx-auto text-ember-400 animate-flame" />
            <h2 className="mt-3 text-lg font-bold text-mist-50">Day 1 starts the moment you commit.</h2>
            <p className="mt-1.5 text-sm text-mist-400">No sign-up. No fee. Just today's task and a streak to protect.</p>
            <Link
              to="/dashboard"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-ember-500 to-ember-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-ember-500/25 transition-all hover:shadow-ember-500/40 active:scale-[0.98]"
            >
              Start your streak <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Public streak preview */}
      <section className="px-5 pb-10" aria-label="60-day streak preview">
        <StreakCalendar freezeAppliedDay={null} />
      </section>
    </>
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
    <div className="rounded-2xl border border-obsidian-700 bg-obsidian-850 p-3.5">
      <Icon size={18} className="text-ember-400" />
      <p className="mt-2 text-2xl font-extrabold tracking-tight text-mist-50">
        <AnimatedCounter to={value} />
      </p>
      <p className="text-[11px] text-mist-500">{label}</p>
    </div>
  );
}
