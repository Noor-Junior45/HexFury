import data from './mockData.json';

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  tier: 'milestone' | 'streak' | 'special';
  progress?: { current: number; target: number };
};

export type StreakDay = {
  day: number;
  status: 'complete' | 'missed' | 'pending';
  date: string;
  project: string | null;
  github: string | null;
  linkedin: string | null;
  missReason?: string;
};

export type DayTask = {
  day: number;
  date: string;
  title: string;
  trackId: string;
  duration: string;
  difficulty: string;
  summary: string;
  why: string;
  requirements: string[];
  hints: string[];
  recruiterNote: string;
  submission: {
    githubLabel: string;
    githubPlaceholder: string;
    linkedinLabel: string;
    linkedinPlaceholder: string;
    streakSafeWhen: string;
  };
};

export const appData = data as {
  brand: { name: string; tagline: string; cycleDays: number; edition: string };
  stats: { activeBuilders: number; streaksKept: number; recruitersWatching: number; projectsShipped: number };
  tracks: Array<{ id: string; name: string; shortName: string; color: string; description: string; skills: string[] }>;
  student: {
    name: string;
    college: string;
    trackId: string;
    currentDay: number;
    joinedDate: string;
    avatarInitials: string;
    rank: string;
    rankTier: number;
    rankLabel: string;
    bio: string;
    streakFreeze: { total: number; used: number; available: boolean };
  };
  streakHistory: StreakDay[];
  currentStreak: { count: number; longestStreak: number; lastCompletedDay: number; todayDay: number; status: string };
  day12: DayTask;
  badges: Badge[];
  recruiters: Array<{ company: string; role: string; location: string; watching: boolean }>;
  testimonials: Array<{ name: string; college: string; quote: string; outcome: string }>;
};

export const getTrack = (id: string) => appData.tracks.find((t) => t.id === id);
export const getDay = (n: number): DayTask | undefined => (n === 12 ? appData.day12 : undefined);
export const getStreakDay = (n: number) => appData.streakHistory.find((d) => d.day === n);
export const earnedBadges = () => appData.badges.filter((b) => b.earned);
export const lockedBadges = () => appData.badges.filter((b) => !b.earned);
export const completedDays = () => appData.streakHistory.filter((d) => d.status === 'complete');
export const missedDays = () => appData.streakHistory.filter((d) => d.status === 'missed');

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function formatFullDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
