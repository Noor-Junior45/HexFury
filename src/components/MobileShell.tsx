import BottomNav from './BottomNav';

type Props = {
  children: React.ReactNode;
  showNav?: boolean;
};

export default function MobileShell({ children, showNav = true }: Props) {
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[460px] bg-obsidian-900 shadow-2xl shadow-black/40">
      <div className="min-h-screen pb-20">{children}</div>
      {showNav && <BottomNav />}
    </div>
  );
}
