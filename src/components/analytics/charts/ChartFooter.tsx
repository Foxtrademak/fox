import { cn } from '../../../lib/utils';

interface ChartFooterProps {
  theme: 'light' | 'dark';
}

export function ChartFooter({ theme }: ChartFooterProps) {
  const textClass = theme === 'light' ? "text-slate-900" : "text-white";

  return (
    <div className="mt-4 sm:mt-6 flex items-center justify-between opacity-20 relative z-10">
      <div className="flex gap-2 sm:gap-4">
        <div className="flex items-center gap-1.5">
          <span className={cn("text-[6px] sm:text-[8px] font-black uppercase tracking-widest", textClass)}>
            Live Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn("text-[6px] sm:text-[8px] font-black uppercase tracking-widest", textClass)}>
            Quantum Sync
          </span>
        </div>
      </div>
      <span className={cn("text-[6px] sm:text-[8px] font-black uppercase tracking-widest", textClass)}>
        V36.0 Protocol
      </span>
    </div>
  );
}
