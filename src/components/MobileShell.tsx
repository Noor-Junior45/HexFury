import BottomNav from './BottomNav';

type Props = {
  children: React.ReactNode;
  showNav?: boolean;
};

export default function MobileShell({ children, showNav = true }: Props) {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-5xl bg-slate-50 border-x border-slate-200/60 shadow-sm">
      <div className="min-h-screen pb-24 sm:pb-28">{children}</div>
      {showNav && <BottomNav />}
    </div>
  );
}

