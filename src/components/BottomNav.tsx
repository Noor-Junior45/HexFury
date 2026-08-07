import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, CalendarDays } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: false },
  { to: '/day/12', label: 'Day 12', icon: CalendarDays, end: false },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[460px] -translate-x-1/2 border-t border-obsidian-700 bg-obsidian-900/90 backdrop-blur-xl safe-bottom">
      <div className="flex items-stretch justify-around px-2">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                isActive ? 'text-ember-400' : 'text-mist-500 hover:text-mist-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                    isActive ? 'bg-ember-500/15 scale-105' : 'group-hover:bg-obsidian-800'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </span>
                <span>{label}</span>
                {isActive && (
                  <span className="absolute -top-px h-0.5 w-8 rounded-full bg-ember-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
