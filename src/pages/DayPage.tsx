import { useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
  Sparkles,
  Lightbulb,
  Clock,
  Zap,
  Lock,
  HelpCircle,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/BrandIcons';
import {
  getDay,
  getTrack,
  getStreakDay,
  formatFullDate,
  appData,
  useActiveTrack,
} from '@/data/mockData';
import TopBar from '@/components/TopBar';
import MobileShell from '@/components/MobileShell';
import { triggerSuccessConfetti } from '@/lib/confetti';

export default function DayPage() {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();
  const { trackId } = useActiveTrack();
  const dayNum = Number(day) || 12;
  const task = getDay(dayNum, trackId);
  const streakDay = getStreakDay(dayNum);

  const [githubUrl, setGithubUrl] = useState(streakDay?.github ?? '');
  const [linkedinUrl, setLinkedinUrl] = useState(streakDay?.linkedin ?? '');
  const [submitted, setSubmitted] = useState<{ github: boolean; linkedin: boolean }>({
    github: !!streakDay?.github,
    linkedin: !!streakDay?.linkedin,
  });
  const [errors, setErrors] = useState<{ github?: string; linkedin?: string }>({});
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Swipe Gesture Handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 55;
    const isRightSwipe = distance < -55;

    if (isLeftSwipe && dayNum < appData.brand.cycleDays) {
      navigate(`/day/${dayNum + 1}`);
    } else if (isRightSwipe && dayNum > 1) {
      navigate(`/day/${dayNum - 1}`);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // If task is unavailable or day is out of bounds
  if (!task) {
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

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Day {dayNum} Task Unavailable
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
            This challenge day is beyond the active 60-day cohort cycle.
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

  // Dynamic LinkedIn draft tailored specifically to this day's task
  const linkedInPostText = `🚀 Day ${task.day} of my 60-Day Build Challenge!

Title: ${task.title}
Summary: ${task.summary}

Definition of Done:
${task.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Key Developer Learnings & Hints:
${task.hints.slice(0, 3).map((h) => `• ${h}`).join('\n')}

Follow my building progress on #60DayChallenge #BuildInPublic #SoftwareEngineering #${task.trackId.replace(/-/g, '')}`;

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

      <div
        className="px-4 sm:px-6 pt-3 pb-24 space-y-6 touch-pan-y min-h-[85vh]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Task Header - Clean Heading without Question Mark */}
        <div className="animate-fade-up space-y-3 pt-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
            {task.title}
          </h1>

          {/* Merged Single-Row Tags Below Heading */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold text-slate-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 text-white px-3 py-1 text-xs font-extrabold shrink-0 shadow-2xs">
              <Flame size={13} className="animate-flame" /> Day {task.day}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/90 text-slate-700 px-3 py-1 shrink-0">
              {formatFullDate(task.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 text-orange-800 px-3 py-1 shrink-0 font-extrabold">
              <Sparkles size={13} className="text-orange-500" /> {track.name}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/90 text-slate-700 px-3 py-1 shrink-0">
              <Zap size={13} className="text-amber-500" /> {task.difficulty}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/90 text-slate-700 px-3 py-1 shrink-0">
              <Clock size={13} className="text-orange-600" /> {task.duration}
            </span>
          </div>
        </div>

        {/* Unified Continuous Document Flow (MS Word / A4 Page Style - No Card Borders) */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 space-y-6 animate-fade-up border-0 shadow-2xs">
          {/* Real Question / Problem Challenge Statement with Question Mark Icon */}
          <Section icon={HelpCircle} title="Task Challenge & Question" accent="orange">
            <p className="text-sm leading-relaxed text-slate-800 font-normal">{task.summary}</p>
          </Section>

          {/* Why It Matters */}
          <Section icon={Target} title="Why it matters" accent="amber">
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700">{task.why}</p>
          </Section>

          {/* Definition of Done Checklist */}
          <Section icon={ClipboardCheck} title="Definition of done" accent="emerald">
            <ul className="space-y-2">
              {task.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white font-extrabold text-[9px]">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed min-w-0 flex-1">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Developer Hints Section */}
          <Section icon={Lightbulb} title="Developer Hints & Strategy" accent="amber">
            <ul className="space-y-2">
              {task.hints.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Lightbulb size={15} className="mt-0.5 shrink-0 text-amber-500" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Recruiter Note Section */}
          <Section icon={Briefcase} title="Recruiter Relevance" accent="sky">
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700">{task.recruiterNote}</p>
          </Section>
        </div>

        {/* Proof of Work Submission Box - Preserved Card Box Style for Student Submissions */}
        <div className="animate-fade-up delay-5 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
              <Link2 size={14} />
            </span>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Submit Your Proof of Work
            </h2>
          </div>

          <div
            className={`rounded-3xl bg-gradient-to-b from-slate-50/90 via-white to-slate-100/70 p-6 sm:p-7 shadow-xl shadow-slate-200/50 space-y-6 relative overflow-hidden backdrop-blur-sm transition-all border border-slate-200/80 ${
              bothSubmitted ? 'ring-2 ring-emerald-500/30 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50' : ''
            }`}
          >
            {/* Soft Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />

            {/* Streak-Safe Banner (When Both Submitted) */}
            {bothSubmitted && (
              <div className="flex items-center gap-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-4 shadow-lg shadow-emerald-600/20 animate-scale-in relative z-10">
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
              <div className="flex items-center gap-3 rounded-2xl bg-amber-500/10 p-3.5 text-amber-900 text-xs font-bold shadow-2xs relative z-10">
                <AlertCircle size={18} className="text-amber-600 shrink-0" />
                <p className="leading-relaxed">
                  Almost there! 1 of 2 submitted — submit both GitHub and LinkedIn proof to lock in Day {task.day}'s streak.
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

            <div className="flex items-center gap-3 text-slate-300 my-1">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AND</span>
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
            <div className="flex items-center justify-between rounded-2xl bg-white shadow-xs px-4 py-3 relative z-10">
              <div className="flex items-center gap-4 text-xs font-bold">
                <StatusPill ok={submitted.github} label="GitHub Repo" />
                <StatusPill ok={submitted.linkedin} label="LinkedIn Post" />
              </div>

              {bothSubmitted ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full">
                  <Flame size={14} className="text-orange-500 animate-flame" /> Streak Verified
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full">
                  Streak Pending
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Pre-filled Share to LinkedIn Card (White Theme) */}
        <div className="rounded-3xl bg-white border border-slate-200/90 text-slate-900 p-5 shadow-xs animate-fade-up delay-6">
          {/* Post Preview Box */}
          <div className="rounded-2xl bg-slate-50/90 border border-slate-200/80 p-4 text-xs font-sans relative shadow-2xs">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200 text-[11px]">
              <span className="font-extrabold uppercase tracking-wider text-sky-600 flex items-center gap-1.5">
                <Linkedin size={14} className="text-sky-600" />
                <span>Day {task.day} LinkedIn Post Draft</span>
              </span>
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(linkedInPostText);
                    setCopiedTemplate(true);
                    setTimeout(() => setCopiedTemplate(false), 3000);
                  }
                }}
                className="inline-flex min-h-[32px] items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer px-2.5 py-1 rounded-lg bg-slate-200/80 hover:bg-slate-300/80 font-bold"
              >
                {copiedTemplate ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copiedTemplate ? 'Copied to Clipboard!' : 'Copy Draft'}</span>
              </button>
            </div>
            <p className="whitespace-pre-line leading-relaxed text-[11px] text-slate-700 select-all font-sans">
              {linkedInPostText}
            </p>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function Section({
  icon: Icon,
  title,
  children,
  accent = 'orange',
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
  delay?: number;
  accent?: 'orange' | 'amber' | 'emerald' | 'sky';
}) {
  const colors = {
    orange: 'text-orange-600 bg-orange-100',
    amber: 'text-amber-600 bg-amber-100',
    emerald: 'text-emerald-600 bg-emerald-100',
    sky: 'text-sky-600 bg-sky-100',
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span className={`flex h-6 w-6 items-center justify-center rounded-lg font-bold shrink-0 ${colors[accent]}`}>
          <Icon size={14} />
        </span>
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">{title}</h2>
      </div>
      <div className="pl-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
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
    <div className="space-y-1.5 relative z-10">
      <label className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
        <Icon size={15} className={iconColor} /> {label}
      </label>

      <div
        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-2xl p-2.5 transition-all shadow-sm ${
          error
            ? 'bg-rose-50/80 ring-2 ring-rose-300'
            : submitted
            ? 'bg-emerald-50/80 ring-2 ring-emerald-300'
            : 'bg-white focus-within:ring-2 focus-within:ring-emerald-500/30'
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
            className="min-h-[44px] shrink-0 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 px-5 py-2.5 text-xs font-black text-white shadow-md shadow-emerald-600/20 transition-all active:scale-98 cursor-pointer"
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

