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
  ChevronDown,
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

  const handleSelectTrack = (tId: string) => {
    changeTrack(tId);
  };

  return (
    <MobileShell>
      <TopBar />

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

        <div className="relative max-w-5xl mx-auto space-y-6">
          {/* Season Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-xs font-bold text-orange-700 shadow-xs backdrop-blur-xs">
            <Sparkles size={14} className="text-orange-500 animate-pulse" />
            <span>Season 4 · Live for College Developers</span>
          </div>

          {/* Headline */}
          <h1 className="font-baskerville text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.15] tracking-tight text-slate-900" style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>
            60 Days. 1 Build per Day.
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 bg-clip-text text-transparent">
              A Real Coding Streak That Gets You Hired.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-700 max-w-3xl font-medium">
            ABTalks is India's premier 60-day proof-of-work challenge built specifically for engineering & CS students. Choose your specialization track, ship a real production-grade project every single day, verify your code with dual GitHub commits and LinkedIn posts, and build an unbroken streak that recruiters actually trust over static resumes.
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
          <div className="mt-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 text-left">
              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-orange-300 hover:-translate-y-0.5 transition-all duration-200">
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-sm shadow-md shadow-orange-500/25">
                  100%
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">Free Access</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">For all college devs</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-200">
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-sm shadow-md shadow-emerald-500/25">
                  <ShieldCheck size={22} strokeWidth={2.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">Verified Proof</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">GitHub & LinkedIn</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-sky-300 hover:-translate-y-0.5 transition-all duration-200">
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-black text-sm shadow-md shadow-sky-500/25">
                  <Users size={22} strokeWidth={2.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">4,200+ Active</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Students shipping</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-amber-300 hover:-translate-y-0.5 transition-all duration-200">
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white font-black text-sm shadow-md shadow-amber-500/25">
                  <Award size={22} strokeWidth={2.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">Leaderboard</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Recruiter hiring list</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ABTalks Works - Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ScrollReveal className="h-full" delay={50}>
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

            <ScrollReveal className="h-full" delay={100}>
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

            <ScrollReveal className="h-full" delay={150}>
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

            <ScrollReveal className="h-full" delay={200}>
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

      {/* The 3-Step Daily Loop */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Simple Daily System
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">How your daily loop works</h2>
              <p className="mt-1.5 text-xs text-slate-500">Repeat this 4-step sequence every day to stay on top of the campus leaderboard.</p>
            </div>
          </ScrollReveal>

          {/* Sequential Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <ScrollReveal key={label} className="h-full" delay={index * 80}>
                <div
                  className={`flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all h-full ${accent}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm border shadow-xs ${color}`}>
                        <Icon size={20} />
                      </span>
                      <span className="text-[10px] font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60 tracking-wider">
                        STEP {step}
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-slate-900">{label}</h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-medium">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cohort Live Stats */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
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

      {/* Student Testimonials with Initials Avatar & Visual Separation */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appData.testimonials.map((t, idx) => {
              const initials = t.name
                .split(' ')
                .map((n) => n[0])
                .join('');
              return (
                <ScrollReveal key={t.name} className="h-full" delay={idx * 80}>
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

      {/* Frequently Asked Questions Section */}
      <FaqSection />

      {/* Available Tracks - Moved Below FAQ & Made Bigger */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 bg-orange-100/90 px-4 py-1.5 rounded-full border border-orange-200 shadow-2xs">
                Interactive Specialization Picker
              </span>
              <h2 className="mt-3.5 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Pick your specialization
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Click any track below to customize your 60-day daily projects, questions, and dashboard proof.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {appData.tracks.map((t, idx) => {
              const isSelected = t.id === trackId;
              const badgeList = [
                { label: '🔥 Most Popular • High Hiring Rate', color: 'bg-orange-100 text-orange-800 border-orange-200' },
                { label: '🧠 Top Package Scope in AI', color: 'bg-amber-100 text-amber-900 border-amber-200' },
                { label: '⚡ High Demand at Tech Giants', color: 'bg-sky-100 text-sky-900 border-sky-200' },
                { label: '📱 Fast Launch & Recruiter Favorite', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
              ];
              const badge = badgeList[idx % badgeList.length];

              return (
                <ScrollReveal key={t.id} className="h-full" delay={idx * 70}>
                  <div
                    onClick={() => handleSelectTrack(t.id)}
                    className={`group relative cursor-pointer rounded-3xl border-2 p-6 sm:p-8 transition-all duration-300 h-full flex flex-col justify-between ${
                      isSelected
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50/90 via-amber-50/60 to-orange-50/30 shadow-xl ring-4 ring-orange-500/20 scale-[1.01]'
                        : 'border-slate-200/90 bg-white hover:border-orange-400 hover:shadow-xl hover:bg-slate-50/80 hover:-translate-y-1'
                    }`}
                  >
                    <div>
                      {/* Top Attraction Badge */}
                      <div className="flex items-center justify-between mb-3.5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black border shadow-2xs ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-black text-sm transition-all ${
                            isSelected
                              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                              : 'bg-slate-100 text-slate-700 group-hover:bg-orange-100 group-hover:text-orange-700'
                          }`}
                        >
                          0{idx + 1}
                        </span>

                        <div className="min-w-0 flex-1">
                          {/* Heading with Circular Box Beside It */}
                          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                            <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight">
                              {t.name}
                            </h3>

                            {/* Circular Selection Box Beside Heading */}
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                                isSelected
                                  ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/30 ring-4 ring-orange-500/20 scale-105'
                                  : 'border-slate-300 bg-white text-slate-300 group-hover:border-orange-400 group-hover:bg-orange-50'
                              }`}
                            >
                              <Check
                                size={16}
                                strokeWidth={3.5}
                                className={isSelected ? 'scale-100 opacity-100 transition-transform' : 'scale-0 opacity-0'}
                              />
                            </div>
                          </div>

                          <p className="text-xs font-bold text-slate-500 mt-0.5">{t.shortName}</p>
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-slate-600 leading-relaxed font-medium">{t.description}</p>
                    </div>

                    <div>
                      <div className="mt-5 pt-4 flex flex-wrap gap-2 border-t border-slate-200/70">
                        {t.skills.map((s) => (
                          <span
                            key={s}
                            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                              isSelected
                                ? 'bg-orange-100 text-orange-900 border border-orange-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-200/80'
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Active Selected Banner */}
                      {isSelected && (
                        <div className="mt-4 pt-3 border-t border-emerald-200/80 flex items-center justify-between text-xs font-black text-emerald-950 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 px-4 py-2.5 rounded-2xl animate-fade-in border border-emerald-300/70 shadow-2xs">
                          <span className="flex items-center gap-2 text-emerald-950 font-black">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                              <Check size={13} strokeWidth={3.5} />
                            </span>
                            <span>Active 60-Day Curriculum</span>
                          </span>
                          <span className="text-[11px] font-extrabold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-300/80 shadow-2xs">
                            Dashboard Ready ✓
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Commitment CTA - Premium Dark Card */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 pt-2">
        <div className="max-w-5xl mx-auto">
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
    <div className={`rounded-2xl border p-5 transition-all shadow-xs hover:shadow-md ${boxStyle} h-full flex flex-col justify-between`}>
      <div>
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
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What if I miss a day during the 60-day challenge?',
      a: 'Life happens! Every builder receives a free Streak Freeze pass per 60-day cycle to safeguard their streak during college exams, sick days, or emergencies. You can also catch up on previous days anytime from your calendar.',
    },
    {
      q: 'Is ABTalks completely free for college students?',
      a: 'Yes, 100% free! There are no hidden fees, paywalls, or premium tiers. ABTalks is built specifically to help engineering and CS students build real proof-of-work portfolios.',
    },
    {
      q: 'What if I am a beginner or new to coding?',
      a: 'The challenge is structured progressively. Daily tasks are carefully scoped to take 45–90 minutes with clear requirements, architectural hints, and definitions of done so you never feel lost.',
    },
    {
      q: 'How does the dual-verification (GitHub + LinkedIn) work?',
      a: 'To maintain an active daily streak and grow your flame, you submit your public GitHub repo commit URL and a short LinkedIn post URL showing what you built. This builds your code history and personal brand simultaneously.',
    },
    {
      q: 'Do tech companies and recruiters actually view these projects?',
      a: 'Yes! Recruiters track our public leaderboards to discover student developers who demonstrate genuine consistency, problem-solving stamina, and proof of work over static resume claims.',
    },
    {
      q: 'Can I switch my track or specialization midway?',
      a: 'Absolutely! You can switch between Full Stack & AI, Backend Systems, DevOps & Cloud, or Data & ML anytime from the interactive track picker on your home or dashboard.',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 border-t border-slate-200/90">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/80 px-3.5 py-1 rounded-full border border-orange-200 shadow-2xs">
              Got Questions?
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Everything you need to know about the 60-Day ABTalks challenge before getting started.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={faq.q} delay={idx * 50}>
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-orange-500 bg-white shadow-md ring-1 ring-orange-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 text-sm sm:text-base gap-4 cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold transition-colors ${
                          isOpen ? 'bg-orange-500 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        Q{idx + 1}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100/80 animate-fade-in font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
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
