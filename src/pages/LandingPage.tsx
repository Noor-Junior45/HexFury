import { useEffect, useRef, useState } from 'react';
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
  Check,
  Star,
  ArrowUpRight,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/BrandIcons';
import { appData, getTrack, useActiveTrack } from '@/data/mockData';
import AnimatedCounter from '@/components/AnimatedCounter';
import TopBar from '@/components/TopBar';
import MobileShell from '@/components/MobileShell';

// Scroll reveal hook for buttery smooth entry animations
function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const { trackId, track: selectedTrack, changeTrack } = useActiveTrack();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectTrack = (tId: string, tName: string) => {
    changeTrack(tId);
    setToastMessage(`Selected Specialization: ${tName}! Your dashboard and daily curriculum are now set.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <MobileShell>
      <TopBar />

      {/* Floating Track Selected Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-extrabold text-white shadow-2xl border border-orange-500/50 animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-6 pb-10 text-left">
        {/* Glowing background ambient lights */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-400/15 blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-40 -right-20 h-64 w-64 rounded-full bg-amber-400/10 blur-[80px]"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto space-y-6">
          {/* Season Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-xs font-bold text-orange-700 shadow-xs backdrop-blur-xs">
            <Sparkles size={14} className="text-orange-500 animate-pulse" />
            <span>Season 4 · Live for College Developers</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight text-slate-900">
            60 Days. 1 Build a Day.
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 bg-clip-text text-transparent">
              A Portfolio Recruiters Can't Ignore.
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl font-normal">
            ABTalks is India's premier 60-day proof-of-work challenge. Pick a track, ship a real project daily, and build an unbroken streak on GitHub and LinkedIn that top engineering companies actually respect.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 pt-1 max-w-2xl">
            <Link
              to="/dashboard"
              className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-6 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-lg shadow-orange-500/25 border border-orange-400/30 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98] cursor-pointer text-center"
            >
              <Flame size={20} strokeWidth={2.5} className="shrink-0 text-white animate-flame" />
              <span>Commit to 60-Day Challenge</span>
            </Link>

            <Link
              to="/day/12"
              className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-slate-900 border border-slate-800 px-6 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:border-slate-700 hover:-translate-y-0.5 transition-all active:scale-[0.98] cursor-pointer text-center"
            >
              <Code2 size={20} strokeWidth={2.5} className="shrink-0 text-orange-400" />
              <span>See Today's Build</span>
            </Link>
          </div>

          {/* Hero Visual Motif: Interactive Proof & Contribution Widget */}
          <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xs">
                  <Flame size={20} className="animate-flame" />
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-extrabold text-slate-900">Active Proof-of-Work Run</p>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      <Check size={10} /> Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Day 12 of 60 · Full-Stack Web Track</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Cohort Activity</span>
              </div>
            </div>

            {/* 7-Day Contribution Row */}
            <div className="mt-3 flex items-center justify-between gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {[
                { day: 'D6', status: 'shipped', label: 'Day 6 Shipped' },
                { day: 'D7', status: 'shipped', label: 'Day 7 Shipped' },
                { day: 'D8', status: 'shipped', label: 'Day 8 Shipped' },
                { day: 'D9', status: 'freeze', label: 'Streak Freeze' },
                { day: 'D10', status: 'shipped', label: 'Day 10 Shipped' },
                { day: 'D11', status: 'shipped', label: 'Day 11 Shipped' },
                { day: 'D12', status: 'today', label: 'Day 12 In Progress' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 min-w-[38px] flex flex-col items-center gap-1 rounded-xl bg-slate-50 border border-slate-200/80 p-2 text-center"
                >
                  <span className="text-[10px] font-bold text-slate-500">{item.day}</span>
                  <span
                    className={`h-4 w-4 rounded-md flex items-center justify-center text-[9px] font-bold ${
                      item.status === 'shipped'
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : item.status === 'freeze'
                        ? 'bg-sky-400 text-white shadow-xs'
                        : 'bg-amber-500 text-white ring-2 ring-amber-200 animate-pulse'
                    }`}
                  >
                    {item.status === 'freeze' ? '❄' : item.status === 'today' ? '⚡' : '✓'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Github size={12} className="text-slate-700" />
                Auto-synced GitHub Commits
              </span>
              <span className="font-semibold text-orange-600">12 Days Flame Preserved</span>
            </div>
          </div>

          {/* Quick Trust Highlights */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3.5 sm:p-4 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-700 font-extrabold text-xs">
                  100%
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800">Free Access</p>
                  <p className="text-[10px] text-slate-500">For all college devs</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700 font-bold text-xs">
                  <ShieldCheck size={16} />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800">Verified Proof</p>
                  <p className="text-[10px] text-slate-500">GitHub & LinkedIn</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-700 font-bold text-xs">
                  <Users size={16} />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800">4,200+ Active</p>
                  <p className="text-[10px] text-slate-500">Students shipping</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 font-bold text-xs">
                  <Award size={16} />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800">Leaderboard</p>
                  <p className="text-[10px] text-slate-500">Recruiter hiring list</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ABTalks Works - Section */}
      <section className="px-4 sm:px-6 py-10 bg-white border-y border-slate-200/80">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60">
                Why ABTalks Works
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
                Built specifically for ambitious engineering students
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Traditional courses give you certificates nobody looks at. ABTalks gives you proof recruiters can verify directly on your profile.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScrollReveal delay={50}>
              <FeatureBox
                icon={Code2}
                title="Resumes lie. Code doesn't."
                desc="Recruiters ignore generic certificates. An unbroken 60-day GitHub contribution graph proves genuine coding discipline and technical stamina."
                badge="Proof of Work"
                badgeStyle="bg-orange-100 text-orange-700 border-orange-200"
                boxStyle="bg-gradient-to-br from-orange-50/80 via-white to-amber-50/30 border-orange-200/80 hover:border-orange-300"
                iconBg="bg-orange-500 text-white"
              />
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <FeatureBox
                icon={Zap}
                title="Bite-Sized Daily Projects"
                desc="Tasks are carefully scoped to take 45–90 minutes daily. Designed to fit easily around college lectures, assignments, and semester exams."
                badge="Anti-Burnout"
                badgeStyle="bg-sky-100 text-sky-700 border-sky-200"
                boxStyle="bg-gradient-to-br from-sky-50/80 via-white to-blue-50/30 border-sky-200/80 hover:border-sky-300"
                iconBg="bg-sky-500 text-white"
              />
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <FeatureBox
                icon={Linkedin}
                title="Dual-Verification System"
                desc="Your daily flame stays alive only when you submit both a GitHub repo link AND write a LinkedIn post showcasing what you built."
                badge="Public Visibility"
                badgeStyle="bg-emerald-100 text-emerald-700 border-emerald-200"
                boxStyle="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/30 border-emerald-200/80 hover:border-emerald-300"
                iconBg="bg-emerald-600 text-white"
              />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <FeatureBox
                icon={ShieldCheck}
                title="Safety Net: Streak Freeze"
                desc="Exams or emergencies? You receive a free Streak Freeze token to protect your run without losing your motivation or progress."
                badge="Protection"
                badgeStyle="bg-purple-100 text-purple-700 border-purple-200"
                boxStyle="bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/30 border-purple-200/80 hover:border-purple-300"
                iconBg="bg-purple-600 text-white"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The 3-Step Daily Loop with Visual Connected Timeline */}
      <section className="px-4 sm:px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Simple Daily System
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">How your daily loop works</h2>
              <p className="mt-1.5 text-xs text-slate-500">Repeat this 4-step sequence every day to stay on top of the campus leaderboard.</p>
            </div>
          </ScrollReveal>

          {/* Sequential Timeline Container */}
          <div className="relative space-y-4">
            {/* Connecting Vertical Line */}
            <div
              className="pointer-events-none absolute left-6 top-7 bottom-7 w-0.5 bg-gradient-to-b from-orange-400 via-sky-400 via-amber-400 to-emerald-400 z-0 hidden sm:block"
              aria-hidden="true"
            />

            {[
              {
                step: '01',
                icon: GitCommitVertical,
                label: 'Choose a Task & Build',
                desc: 'Open today’s scoped task card, read the requirements, and code the solution in React, Python, or Node.js.',
                color: 'text-orange-600 bg-orange-100 border-orange-200',
                accent: 'border-l-4 border-l-orange-500',
              },
              {
                step: '02',
                icon: Github,
                label: 'Push Code to GitHub',
                desc: 'Commit your project code to a public GitHub repository. Your code history is your real resume.',
                color: 'text-slate-800 bg-slate-100 border-slate-300',
                accent: 'border-l-4 border-l-slate-700',
              },
              {
                step: '03',
                icon: Linkedin,
                label: 'Post Build Story on LinkedIn',
                desc: 'Write a short post sharing key learnings and screenshot. Recruiters follow #ABTalks to discover active builders.',
                color: 'text-sky-600 bg-sky-100 border-sky-200',
                accent: 'border-l-4 border-l-sky-500',
              },
              {
                step: '04',
                icon: Flame,
                label: 'Light Flame & Extend Streak',
                desc: 'Paste both URLs in your dashboard. Both verified? Your daily streak increments and your flame grows brighter!',
                color: 'text-amber-600 bg-amber-100 border-amber-200',
                accent: 'border-l-4 border-l-amber-500',
              },
            ].map(({ step, icon: Icon, label, desc, color, accent }, index) => (
              <ScrollReveal key={label} delay={index * 80}>
                <div
                  className={`relative z-10 flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs hover:shadow-md transition-all ${accent}`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold text-base border shadow-xs ${color}`}>
                    <Icon size={22} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60 tracking-wider">
                        STEP {step}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{label}</h3>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{desc}</p>
                  </div>

                  {index < 3 && (
                    <span className="hidden sm:flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 self-center">
                      ↓
                    </span>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cohort Live Stats */}
      <section className="px-4 sm:px-6 py-10 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live Cohort Activity
              </h2>
              <p className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900">
                Join thousands of students building in public right now
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ScrollReveal delay={50}>
              <StatCard icon={Users} label="Active Builders" value={appData.stats.activeBuilders} />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <StatCard icon={Flame} label="Streaks Kept" value={appData.stats.streaksKept} />
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <StatCard icon={Eye} label="Recruiters Watching" value={appData.stats.recruitersWatching} />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <StatCard icon={Github} label="Projects Shipped" value={appData.stats.projectsShipped} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Available Tracks */}
      <section className="px-4 sm:px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200/80 shadow-2xs">
                Interactive Specialization Picker
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">Pick your specialization</h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600">Click any track below to customize your 60-day daily projects, questions, and dashboard proof.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-3.5">
            {appData.tracks.map((t, idx) => {
              const isSelected = t.id === trackId;
              return (
                <ScrollReveal key={t.id} delay={idx * 70}>
                  <div
                    onClick={() => handleSelectTrack(t.id, t.name)}
                    className={`group relative cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                      isSelected
                        ? 'border-orange-500 bg-gradient-to-r from-orange-50/90 via-amber-50/70 to-orange-50/40 shadow-md ring-2 ring-orange-500/30'
                        : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-md hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-xs transition-colors ${
                            isSelected
                              ? 'bg-orange-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 group-hover:bg-orange-100 group-hover:text-orange-700'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div>
                          <p className="text-base font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {t.name}
                          </p>
                          <p className="text-[11px] font-semibold text-slate-500">{t.shortName} · 60 Days Scope</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-xs animate-fade-in">
                            <Check size={14} strokeWidth={3} /> Active Specialization
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTrack(t.id, t.name);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer shadow-2xs"
                          >
                            <span>Pick Option</span>
                            <ArrowRight size={13} />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed font-medium">{t.description}</p>

                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {t.skills.map((s) => (
                        <span
                          key={s}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                            isSelected
                              ? 'bg-orange-100 text-orange-800 border border-orange-200/80'
                              : 'bg-slate-100 text-slate-700 border border-slate-200/80'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Testimonials with Initials Avatar & Visual Separation */}
      <section className="px-4 sm:px-6 py-10 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Proven Outcomes
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
                What builders say after completing the streak
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {appData.testimonials.map((t, idx) => {
              const initials = t.name
                .split(' ')
                .map((n) => n[0])
                .join('');
              return (
                <ScrollReveal key={t.name} delay={idx * 80}>
                  <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/90 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all h-full">
                    <div>
                      <div className="flex items-center justify-between">
                        <Quote size={22} className="text-orange-400" />
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          <Check size={10} /> {t.outcome}
                        </span>
                      </div>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed font-medium text-slate-700 italic">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-extrabold text-xs shadow-xs ring-2 ring-white">
                        {initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold text-slate-900">{t.name}</p>
                        <p className="text-[11px] font-medium text-slate-500 truncate">{t.college}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Commitment CTA - Premium Dark Card */}
      <section className="px-4 sm:px-6 pb-12 pt-2">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-7 sm:p-10 text-center text-white shadow-2xl border border-slate-800">
              <div
                className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-orange-500/25 blur-[80px]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 right-10 h-48 w-48 rounded-full bg-amber-500/15 blur-[70px]"
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-4">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.25)]">
                  <Flame size={32} className="animate-flame" />
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Day 1 starts the moment you commit.
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  No subscription. No sign-up fee. Just today's challenge, a code editor, and an unbroken streak to build.
                </p>

                <div className="pt-2">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-98 transition-all cursor-pointer"
                  >
                    <span>Start Your 60-Day Streak</span>
                  </Link>
                </div>

                <p className="text-[11px] text-slate-400 pt-2">
                  ✓ Free forever for college developers · Instant access to Day 1 problem
                </p>
              </div>
            </div>
          </ScrollReveal>
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
  badgeStyle,
  boxStyle,
  iconBg,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  badge: string;
  badgeStyle: string;
  boxStyle: string;
  iconBg: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 transition-all shadow-xs hover:shadow-md ${boxStyle}`}>
      <div className="flex items-center justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold shadow-xs ${iconBg}`}>
          <Icon size={20} />
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${badgeStyle}`}>
          {badge}
        </span>
      </div>
      <h3 className="mt-3.5 text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{desc}</p>
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
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-xs hover:border-slate-300 transition-colors">
      <Icon size={22} className="mx-auto text-orange-600" />
      <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
        <AnimatedCounter to={value} />
      </p>
      <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}
