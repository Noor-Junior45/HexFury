import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Flame,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Target,
  Briefcase,
  ClipboardCheck,
  Link2,
  AlertCircle,
  Snowflake,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/BrandIcons';
import {
  appData,
  getDay,
  getTrack,
  getStreakDay,
  formatDate,
  formatFullDate,
} from '@/data/mockData';
import TopBar from '@/components/TopBar';
import MobileShell from '@/components/MobileShell';
import StreakFreeze from '@/components/StreakFreeze';

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

  if (!task) {
    return (
      <MobileShell>
        <TopBar showBack backTo="/dashboard" />
        <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
          <AlertCircle size={32} className="text-mist-500" />
          <h1 className="mt-4 text-lg font-bold text-mist-100">Day {dayNum} isn't unlocked yet</h1>
          <p className="mt-1.5 text-sm text-mist-400">Tasks open as your streak progresses. Head back to your dashboard.</p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-ember-500/15 px-4 py-2 text-sm font-semibold text-ember-300 border border-ember-400/30"
          >
            <ArrowLeft size={15} /> Back to dashboard
          </Link>
        </div>
      </MobileShell>
    );
  }

  const track = getTrack(task.trackId)!;
  const bothSubmitted = submitted.github && submitted.linkedin;
  const oneSubmitted = submitted.github || submitted.linkedin;

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
  };

  const handleEdit = (field: 'github' | 'linkedin') => {
    setSubmitted((s) => ({ ...s, [field]: false }));
  };

  return (
    <MobileShell>
      <TopBar showBack backTo="/dashboard" />

      <div className="px-5 pt-5 pb-4">
        {/* Day header */}
        <div className="animate-fade-up">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ember-500/15 px-2.5 py-1 text-[11px] font-semibold text-ember-300">
              Day {task.day}
            </span>
            <span className="text-[11px] text-mist-500">{formatFullDate(task.date)}</span>
          </div>
          <h1 className="mt-3 text-xl font-bold leading-snug tracking-tight text-mist-50 text-balance">
            {task.title}
          </h1>
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-mist-400">
            <span className="inline-flex items-center gap-1 rounded-md bg-obsidian-800 px-2 py-1">{track.shortName}</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-obsidian-800 px-2 py-1">{task.difficulty}</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-obsidian-800 px-2 py-1">{task.duration}</span>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 rounded-2xl border border-obsidian-700 bg-obsidian-850 p-4 animate-fade-up delay-1">
          <p className="text-sm leading-relaxed text-mist-200">{task.summary}</p>
        </div>

        {/* Why it matters */}
        <Section icon={Target} title="Why it matters" delay={2}>
          <p className="text-sm leading-relaxed text-mist-300">{task.why}</p>
        </Section>

        {/* Requirements */}
        <Section icon={ClipboardCheck} title="Definition of done" delay={3}>
          <ul className="space-y-2">
            {task.requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-mist-300">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/15 text-[10px] font-bold text-ember-300">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Hints */}
        <Section icon={Lightbulb} title="Hints" delay={4} accent="amber">
          <ul className="space-y-2">
            {task.hints.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-mist-300">
                <Lightbulb size={14} className="mt-0.5 shrink-0 text-amber-400/70" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Recruiter note */}
        <Section icon={Briefcase} title="Recruiter relevance" delay={5} accent="sky">
          <p className="text-sm leading-relaxed text-mist-300">{task.recruiterNote}</p>
        </Section>

        {/* Submission flow */}
        <div className="mt-6 animate-fade-up delay-5">
          <div className="mb-2 flex items-center gap-1.5 px-1">
            <Link2 size={13} className="text-ember-400" />
            <span className="text-xs font-semibold text-mist-400">Submit your work</span>
          </div>

          <div
            className={`rounded-2xl border p-4 transition-colors ${
              bothSubmitted
                ? 'border-sage-500/40 bg-sage-500/5'
                : 'border-obsidian-700 bg-obsidian-850'
            }`}
          >
            {/* Streak-safe badge */}
            {bothSubmitted && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-sage-500/15 border border-sage-400/30 px-3 py-2.5 animate-scale-in">
                <ShieldCheck size={18} className="text-sage-400" />
                <div>
                  <p className="text-sm font-semibold text-sage-300">Streak-safe</p>
                  <p className="text-[11px] text-sage-400/80">{task.submission.streakSafeWhen}. Your streak is protected for today.</p>
                </div>
              </div>
            )}

            {/* Partial state banner */}
            {oneSubmitted && !bothSubmitted && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-400/30 px-3 py-2.5">
                <AlertCircle size={16} className="text-amber-400" />
                <p className="text-xs text-amber-300">
                  One part done — submit the other to make today streak-safe.
                </p>
              </div>
            )}

            {/* GitHub field */}
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
              accentClass="text-mist-200"
            />

            <div className="my-3 flex items-center gap-3 text-mist-600">
              <span className="h-px flex-1 bg-obsidian-700" />
              <span className="text-[10px] font-medium uppercase tracking-wider">and</span>
              <span className="h-px flex-1 bg-obsidian-700" />
            </div>

            {/* LinkedIn field */}
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
              accentClass="text-sky-400"
            />

            {/* Status summary */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-obsidian-900/60 px-3 py-2.5">
              <div className="flex items-center gap-3 text-[11px]">
                <StatusPill ok={submitted.github} label="GitHub" />
                <StatusPill ok={submitted.linkedin} label="LinkedIn" />
              </div>
              {bothSubmitted ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-sage-400">
                  <Flame size={13} /> Streak +1
                </span>
              ) : (
                <span className="text-[11px] text-mist-500">Streak pending</span>
              )}
            </div>
          </div>
        </div>

        {/* Streak Freeze on day view */}
        <div className="mt-4 animate-fade-up delay-6">
          <StreakFreeze
            total={appData.student.streakFreeze.total}
            used={appData.student.streakFreeze.used}
            available={appData.student.streakFreeze.available}
            variant="card"
          />
        </div>

        {/* Nav footer */}
        <div className="mt-6 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-mist-400 hover:text-mist-200 transition-colors"
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-mist-400 hover:text-mist-200 transition-colors"
          >
            About ABTalks <ArrowRight size={14} />
          </Link>
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
  accent = 'ember',
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
  delay: number;
  accent?: 'ember' | 'amber' | 'sky';
}) {
  const colors = {
    ember: 'text-ember-400 bg-ember-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
    sky: 'text-sky-400 bg-sky-500/10',
  };
  const delayStyle = { animationDelay: `${delay * 0.06}s` };
  return (
    <div className="mt-4 animate-fade-up" style={delayStyle}>
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${colors[accent]}`}>
          <Icon size={13} />
        </span>
        <span className="text-xs font-semibold text-mist-300">{title}</span>
      </div>
      <div className="rounded-2xl border border-obsidian-700 bg-obsidian-850 p-4">
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
  accentClass,
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
  accentClass: string;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-mist-300">
        <Icon size={13} className={accentClass} /> {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-obsidian-900/60 px-3 py-2.5 transition-colors ${
          error ? 'border-rose-500/40' : submitted ? 'border-sage-500/40' : 'border-obsidian-600 focus-within:border-ember-500/50'
        }`}
      >
        <input
          type="url"
          inputMode="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={submitted}
          className="min-w-0 flex-1 bg-transparent text-sm text-mist-100 placeholder:text-mist-600 focus:outline-none disabled:text-mist-400"
        />
        {submitted ? (
          <button
            onClick={onEdit}
            className="shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-sage-400 hover:bg-sage-500/10 transition-colors"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="shrink-0 rounded-lg bg-ember-500/15 px-3 py-1.5 text-[11px] font-semibold text-ember-300 border border-ember-400/30 hover:bg-ember-500/25 transition-colors active:scale-95"
          >
            Submit
          </button>
        )}
      </div>
      {submitted && (
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-sage-400">
          <CheckCircle2 size={12} /> Submitted
        </p>
      )}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${ok ? 'text-sage-400' : 'text-mist-500'}`}>
      {ok ? <CheckCircle2 size={12} /> : <span className="h-2 w-2 rounded-full border border-mist-600" />}
      {label}
    </span>
  );
}
