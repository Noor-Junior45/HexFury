import BottomNav from './BottomNav';

type Props = {
  children: React.ReactNode;
  showNav?: boolean;
};

export default function MobileShell({ children, showNav = true }: Props) {
  return (
    <div className="relative min-h-screen w-full bg-slate-50">
      <div className="min-h-screen pb-24 sm:pb-28">{children}</div>
      {showNav && <BottomNav />}
    </div>
  );
}

