import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { appData } from '@/data/mockData';

type Props = {
  showBack?: boolean;
  backTo?: string;
  rightSlot?: React.ReactNode;
};

export default function TopBar({ showBack, backTo = '/dashboard', rightSlot }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-obsidian-700/60 bg-obsidian-900/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[460px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {showBack ? (
            <Link
              to={backTo}
              aria-label="Back"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-mist-400 hover:bg-obsidian-800 hover:text-mist-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-ember-500 to-ember-700 text-white shadow-lg shadow-ember-500/20">
                <Flame size={17} strokeWidth={2.5} />
              </span>
              <span className="text-base font-bold tracking-tight text-mist-50">
                {appData.brand.name}
              </span>
            </Link>
          )}
        </div>
        {rightSlot}
      </div>
    </header>
  );
}
