import React from 'react';
import { cn, haptic } from '../../lib/utils';

interface ToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  theme = 'dark',
  className
}) => {
  return (
    <button 
      onClick={() => { onChange(!enabled); haptic('light'); }}
      className={cn(
        "w-12 h-6 rounded-full transition-all duration-300 relative",
        enabled ? "bg-primary" : (theme === 'light' ? "bg-slate-200" : "bg-white/10"),
        className
      )}
    >
      <div className={cn(
        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm",
        enabled ? "left-7" : "left-1"
      )} />
    </button>
  );
};
