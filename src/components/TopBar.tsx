import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, X, Trophy, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { appData } from '@/data/mockData';

type Props = {
  showBack?: boolean;
  backTo?: string;
  rightSlot?: React.ReactNode;
};

export default function TopBar({ showBack, backTo = '/dashboard', rightSlot }: Props) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const student = appData.student;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            {showBack && (
              <Link
                to={backTo}
                aria-label="Back"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors mr-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </Link>
            )}
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
                <Flame size={19} strokeWidth={2.5} />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                ABTalks
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {rightSlot ? (
              rightSlot
            ) : (
              <button
                onClick={() => setIsProfileOpen(true)}
                aria-label="Open student profile"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 ring-2 ring-orange-500/30 hover:ring-orange-500 hover:scale-105 transition-all active:scale-95"
              >
                <span className="tracking-tight">{student.avatarInitials}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Gmail-style Circular Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 animate-scale-in">
            <button
              onClick={() => setIsProfileOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col items-center text-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-amber-600 text-white text-xl font-bold shadow-lg shadow-orange-500/25 ring-4 ring-orange-100">
                {student.avatarInitials}
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{student.name}</h3>
              <p className="text-xs font-medium text-slate-500">{student.rank} · {student.rankLabel}</p>
              <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-0.5 text-xs text-slate-600 font-medium">
                {student.college}
              </p>
            </div>

            {/* Stats Row */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <div className="rounded-2xl bg-orange-50 border border-orange-200/60 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-orange-600">
                  <Flame size={16} />
                  <span className="text-lg font-extrabold">{appData.currentStreak.count}</span>
                </div>
                <p className="text-[11px] font-medium text-orange-800">Current Streak</p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-700">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span className="text-lg font-extrabold">{student.streakFreeze.available ? '1 Ready' : '0'}</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600">Streak Freeze</p>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="mt-5 space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
              >
                <span>My 60-Day Dashboard</span>
              </Link>
              <Link
                to="/day/12"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center justify-center rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <span>Today's Task (Day 12)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

