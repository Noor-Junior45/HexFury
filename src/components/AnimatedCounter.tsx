import { useEffect, useState } from 'react';

type Props = {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
};

export default function AnimatedCounter({ to, duration = 1200, className, suffix = '' }: Props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return (
    <span className={className}>
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
