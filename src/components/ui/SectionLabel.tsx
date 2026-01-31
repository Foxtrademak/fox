import React from 'react';
import { cn } from '../../lib/utils';

interface SectionLabelProps {
  label: string;
  theme?: 'light' | 'dark';
  className?: string;
  dotColor?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ 
  label, 
  theme = 'dark', 
  className,
  dotColor
}) => {
  return (
    <div className={cn("flex items-center gap-1.5 mb-1", className)}>
      {dotColor && <div className={cn("w-1 h-1 rounded-full", dotColor)} />}
      {!dotColor && <div className={cn("w-1 h-1 rounded-full", theme === 'light' ? "bg-black/10" : "bg-white/10")} />}
      <p className={cn(
        "text-[8px] font-black uppercase tracking-[0.2em]", 
        theme === 'light' ? "text-slate-400" : "text-white/20"
      )}>
        {label}
      </p>
    </div>
  );
};
