import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, CalendarDays } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: false },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays, end: false },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 sm:bottom-6 left-1/2 z-40 w-full sm:w-auto sm:min-w-[380px] sm:max-w-md -translate-x-1/2 rounded-none sm:rounded-full border-t sm:border border-slate-200/70 bg-white/75 backdrop-blur-md shadow-lg sm:shadow-xl shadow-slate-900/5 safe-bottom transition-all duration-300">
      <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-2 px-4 py-1.5 sm:px-3 sm:py-1.5">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group relative flex flex-1 sm:flex-initial sm:px-5 flex-col items-center gap-0.5 py-1.5 text-[11px] font-semibold transition-all duration-200 ease-out ${
                isActive
                  ? 'text-orange-600 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                      : 'bg-transparent group-hover:bg-slate-100/80 text-slate-600'
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="transition-transform duration-200 group-hover:scale-105"
                  />
                </span>
                <span className="text-[11px] tracking-tight">{label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 h-1 w-5 rounded-full bg-orange-500 shadow-xs transition-all duration-200" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

