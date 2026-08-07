import { useState } from 'react';
import { Info } from 'lucide-react';

type Props = {
  text: string;
  children?: React.ReactNode;
  side?: 'top' | 'bottom';
};

export default function Tooltip({ text, children, side = 'top' }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={text}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center text-mist-500 hover:text-ember-400 transition-colors outline-none focus-visible:text-ember-400"
      >
        {children || <Info size={14} />}
      </button>
      {open && (
        <span
          role="tooltip"
          className={`absolute z-50 w-56 text-left text-xs leading-relaxed font-normal rounded-xl px-3 py-2.5 bg-obsidian-700 border border-obsidian-500 text-mist-300 shadow-xl ${
            side === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : 'top-full mt-2 left-1/2 -translate-x-1/2'
          }`}
        >
          {text}
          <span
            className={`absolute left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-obsidian-700 border-obsidian-500 ${
              side === 'top' ? '-bottom-1 border-b border-r' : '-top-1 border-t border-l'
            }`}
          />
        </span>
      )}
    </span>
  );
}
