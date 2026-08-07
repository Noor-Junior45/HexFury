import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Flame,
  ArrowLeft,
  Target,
  Briefcase,
  ClipboardCheck,
  Link2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Lightbulb,
  Clock,
  Zap,
  Lock,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/BrandIcons';
import {
  getDay,
  getTrack,
  getStreakDay,
  formatFullDate,
  appData,
} from '@/data/mockData';
import TopBar from '@/components/TopBar';
import MobileShell from '@/components/MobileShell';
import StreakFreeze from '@/components/StreakFreeze';
import { triggerSuccessConfetti } from '@/lib/confetti';

export default function DayPage() {
  const { day } = useParams<{ day: string }>();
  const dayNum = Number(day);
  const task = getDay(dayNum);
  const streakDay = getStreakDay(dayNum);

  const [githubUrl, setGithubUrl] = useState(streakDay?.github ?? '');
  const [linkedinUrl, setLinkedinUrl] = useState(streakDay?.linkedin ?? '');
  const [submitted, setSubmitted] = useState<{ github: boolean; linkedin: boolean }>({
    github: !!streakDay?.github,
    linkedin: !!streakDay?.linkedin,
  });
  const [errors, setErrors] = useState<{ github?: string; linkedin?: string }>({});

  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Unlocked check / Locked Empty State
  if (!task || dayNum > appData.student.currentDay) {
    return (
      <MobileShell>
        <TopBar showBack backTo="/dashboard" />
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center min-h-[60vh]">
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 shadow-sm">
            <Lock size={36} />
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white font-extrabold text-xs shadow-xs">
              D{dayNum}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-extrabold text-orange-800 border border-orange-200 mb-2">
            Challenge Locked
          </span>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Day {dayNum} isn't unlocked yet
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
            Challenges unlock sequentially as you complete each day's submission. Head back to your dashboard to view your active day.
          </p>

          <Link
            to="/dashboard"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-orange-600 active:scale-98 transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </MobileShell>
    );
  }

  const track = getTrack(task.trackId)!;
  const bothSubmitted = submitted.github && submitted.linkedin;
  const oneSubmitted = submitted.github || submitted.linkedin;

  const linkedInPostText = `🚀 Day ${task.day} of my 60-Day Build Challenge!

Title: ${task.title}
Summary: ${task.summary}

Definition of Done:
${task.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Follow my building progress on #60DayChallenge #BuildInPublic #SoftwareEngineering #${task.trackId.toUpperCase()}`;

  const handleShareToLinkedIn = () => {
    triggerSuccessConfetti();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(linkedInPostText);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 3000);
    }
    const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(linkedInPostText)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const validateUrl = (val: string, hosts: string[]): boolean => {
    if (!val.trim()) return false;
    try {
      const u = new URL(val);
      return hosts.some((h) => u.hostname.includes(h));
    } catch {
      return false;
    }
  };

  const handleSubmit = (field: 'github' | 'linkedin') => {
    const val = field === 'github' ? githubUrl : linkedinUrl;
    const hosts = field === 'github' ? ['github.com'] : ['linkedin.com'];
    if (!validateUrl(val, hosts)) {
      setErrors((e) => ({
        ...e,
        [field]: field === 'github'
          ? 'Paste a valid github.com link.'
          : 'Paste a valid linkedin.com post link.',
      }));
      return;
    }
    setErrors((e) => ({ ...e, [field]: undefined }));
    setSubmitted((s) => ({ ...s, [field]: true }));
    triggerSuccessConfetti();
  };

  const handleEdit = (field: 'github' | 'linkedin') => {
    setSubmitted((s) => ({ ...s, [field]: false }));
  };

  return (
    <MobileShell>
      <TopBar showBack backTo="/dashboard" />

      <div className="px-4 sm:px-6 pt-4 pb-24 space-y-6">
        {/* Task Header */}
        <div className="animate-fade-up space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 text-white px-3 py-1 text-xs font-extrabold shadow-xs">
              <Flame size={13} className="animate-flame" /> Day {task.day}
            </span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
              {formatFullDate(task.date)}
            </span>
            <span className="text-xs font-extrabold text-orange-700 bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-full">
              {track.name}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
            {task.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1">
              <Zap size={14} className="text-amber-500" /> {task.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1">
              <Clock size={14} className="text-orange-600" /> {task.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1">
              <Sparkles size={14} className="text-sky-600" /> {track.shortName}
            </span>
          </div>
        </div>

        {/* Task Summary Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs animate-fade-up delay-1">
          <p className="text-sm leading-relaxed text-slate-700 font-normal">{task.summary}</p>
        </div>

        {/* Why It Matters Section */}
        <Section icon={Target} title="Why it matters" delay={2} accent="amber">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700">{task.why}</p>
        </Section>

        {/* Requirements / Definition of Done Checklist */}
        <Section icon={ClipboardCheck} title="Definition of done" delay={3} accent="emerald">
          <ul className="space-y-2.5">
            {task.requirements.map((r, i) => (
              <li
                key={i}
                className="group flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 hover:bg-slate-100/80 transition-all"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white font-extrabold text-[10px] shadow-2xs group-hover:scale-110 transition-transform">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed min-w-0 flex-1">
                  {r}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Hints Section */}
        <Section icon={Lightbulb} title="Developer Hints" delay={4} accent="amber">
          <ul className="space-y-2">
            {task.hints.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Recruiter Note Section */}
        <Section icon={Briefcase} title="Recruiter Relevance" delay={5} accent="sky">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700">{task.recruiterNote}</p>
        </Section>

        {/* Submission Flow */}
        <div className="animate-fade-up delay-5 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 text-white shadow-xs">
              <Link2 size={14} />
            </span>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Submit Your Proof of Work
            </h2>
          </div>

          <div
            className={`rounded-3xl border p-5 sm:p-6 transition-all shadow-sm space-y-5 ${
              bothSubmitted
                ? 'border-emerald-300 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 ring-1 ring-emerald-300/60'
                : 'border-slate-200/90 bg-white'
            }`}
          >
            {/* Streak-Safe Banner (When Both Submitted) */}
            {bothSubmitted && (
              <div className="flex items-center gap-3.5 rounded-2xl bg-emerald-500 text-white p-4 shadow-md animate-scale-in">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                  <ShieldCheck size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-extrabold">Day {task.day} Complete & Streak-Safe!</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-slate-900 shadow-2xs">
                      <Flame size={10} /> +1 Streak
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100 mt-0.5 leading-relaxed">
                    {task.submission.streakSafeWhen}. Your daily flame is officially preserved.
                  </p>
                </div>
              </div>
            )}

            {/* Partial State Banner */}
            {oneSubmitted && !bothSubmitted && (
              <div className="flex items-center gap-3 rounded-2xl bg-amber-50 border border-amber-300 p-3.5 text-amber-900 text-xs font-bold shadow-2xs">
                <AlertCircle size={18} className="text-amber-600 shrink-0" />
                <p className="leading-relaxed">
                  Almost there! 1 of 2 submitted — submit both GitHub and LinkedIn proof to lock in today's streak.
                </p>
              </div>
            )}

            {/* GitHub Field */}
            <SubmissionField
              icon={Github}
              label={task.submission.githubLabel}
              placeholder={task.submission.githubPlaceholder}
              value={githubUrl}
              onChange={(v) => {
                setGithubUrl(v);
                if (submitted.github) setSubmitted((s) => ({ ...s, github: false }));
              }}
              submitted={submitted.github}
              error={errors.github}
              onSubmit={() => handleSubmit('github')}
              onEdit={() => handleEdit('github')}
            />

            <div className="flex items-center gap-3 text-slate-400 my-1">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">AND</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            {/* LinkedIn Field */}
            <SubmissionField
              icon={Linkedin}
              label={task.submission.linkedinLabel}
              placeholder={task.submission.linkedinPlaceholder}
              value={linkedinUrl}
              onChange={(v) => {
                setLinkedinUrl(v);
                if (submitted.linkedin) setSubmitted((s) => ({ ...s, linkedin: false }));
              }}
              submitted={submitted.linkedin}
              error={errors.linkedin}
              onSubmit={() => handleSubmit('linkedin')}
              onEdit={() => handleEdit('linkedin')}
              iconColor="text-sky-600"
            />

            {/* Status Summary Bar */}
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200/80 px-4 py-3">
              <div className="flex items-center gap-4 text-xs font-bold">
                <StatusPill ok={submitted.github} label="GitHub Repo" />
                <StatusPill ok={submitted.linkedin} label="LinkedIn Post" />
              </div>

              {bothSubmitted ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full">
                  <Flame size={14} className="text-orange-500 animate-flame" /> Streak Verified
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full">
                  Streak Pending
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pre-filled Share to LinkedIn Card */}
        <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50/90 via-white to-blue-50/50 p-5 shadow-xs space-y-3 animate-fade-up delay-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-xs">
                <Linkedin size={20} />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>Share Day {task.day} Progress</span>
                  <Sparkles size={14} className="text-amber-500" />
                </h3>
                <p className="text-xs text-slate-500">
                  Pre-filled post template optimized for recruiter visibility
                </p>
              </div>
            </div>

            <button
              onClick={handleShareToLinkedIn}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-sky-700 active:scale-98 transition-all shrink-0 cursor-pointer"
            >
              <Linkedin size={15} />
              <span>Share on LinkedIn</span>
              <ExternalLink size={13} />
            </button>
          </div>

          {/* Post Preview Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-200 font-mono relative shadow-inner">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800 text-[11px] font-sans">
              <span className="font-extrabold uppercase tracking-wider text-sky-400">Pre-filled LinkedIn Post Draft</span>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(linkedInPostText);
                    setCopiedTemplate(true);
                    setTimeout(() => setCopiedTemplate(false), 3000);
                  }
                }}
                className="inline-flex min-h-[32px] items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                {copiedTemplate ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span className="font-bold">{copiedTemplate ? 'Copied to Clipboard!' : 'Copy Template'}</span>
              </button>
            </div>
            <p className="whitespace-pre-line leading-relaxed text-[11px] text-slate-300 select-all font-sans">
              {linkedInPostText}
            </p>
          </div>
        </div>

        {/* Streak Freeze Banner */}
        <div className="animate-fade-up delay-6">
          <StreakFreeze
            total={appData.student.streakFreeze.total}
            used={appData.student.streakFreeze.used}
            available={appData.student.streakFreeze.available}
            variant="card"
          />
        </div>
      </div>
    </MobileShell>
  );
}

function Section({
  icon: Icon,
  title,
  children,
  delay,
  accent = 'orange',
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
  delay: number;
  accent?: 'orange' | 'amber' | 'emerald' | 'sky';
}) {
  const colors = {
    orange: 'text-orange-600 bg-orange-100',
    amber: 'text-amber-600 bg-amber-100',
    emerald: 'text-emerald-600 bg-emerald-100',
    sky: 'text-sky-600 bg-sky-100',
  };

  return (
    <div className="animate-fade-up space-y-2">
      <div className="flex items-center gap-2 px-1">
        <span className={`flex h-6 w-6 items-center justify-center rounded-lg font-bold ${colors[accent]}`}>
          <Icon size={14} />
        </span>
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">{title}</h2>
      </div>
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs">
        {children}
      </div>
    </div>
  );
}

function SubmissionField({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  submitted,
  error,
  onSubmit,
  onEdit,
  iconColor = 'text-slate-700',
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  submitted: boolean;
  error?: string;
  onSubmit: () => void;
  onEdit: () => void;
  iconColor?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
        <Icon size={15} className={iconColor} /> {label}
      </label>

      <div
        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl border p-2 transition-all ${
          error
            ? 'border-rose-400 bg-rose-50/60 ring-2 ring-rose-200/50'
            : submitted
            ? 'border-emerald-400 bg-emerald-50/60 ring-2 ring-emerald-200/50'
            : 'border-slate-300 bg-slate-50 focus-within:border-orange-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-200'
        }`}
      >
        <input
          type="url"
          inputMode="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={submitted}
          className="min-h-[44px] min-w-0 flex-1 bg-transparent px-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:text-slate-600"
        />

        {submitted ? (
          <button
            onClick={onEdit}
            className="min-h-[44px] shrink-0 rounded-xl bg-emerald-200/80 hover:bg-emerald-300 px-4 py-2 text-xs font-extrabold text-emerald-900 transition-colors cursor-pointer"
          >
            Edit Link
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="min-h-[44px] shrink-0 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-xs transition-all active:scale-98 cursor-pointer"
          >
            Verify & Submit
          </button>
        )}
      </div>

      {submitted && (
        <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-0.5">
          <CheckCircle2 size={14} /> Link verified and submitted
        </p>
      )}

      {error && (
        <p className="flex items-center gap-1.5 text-xs font-bold text-rose-600 pt-0.5">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${ok ? 'text-emerald-700' : 'text-slate-400'}`}>
      {ok ? (
        <CheckCircle2 size={15} className="text-emerald-600" />
      ) : (
        <span className="h-2.5 w-2.5 rounded-full border-2 border-slate-300" />
      )}
      <span>{label}</span>
    </span>
  );
}
