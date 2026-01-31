import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'primary';
  theme?: 'light' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  theme = 'dark',
  className 
}) => {
  const variants = {
    default: theme === 'light' ? "bg-black/5 text-slate-900/40 border-black/5" : "bg-white/5 text-white/30 border-white/5",
    primary: "bg-primary/10 text-primary border-primary/20",
    success: theme === 'light' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-emerald-500/5 text-emerald-500/60 border-emerald-500/15",
    error: theme === 'light' ? "bg-rose-500/10 text-rose-600 border-rose-500/20" : "bg-rose-500/5 text-rose-500/60 border-rose-500/15",
    warning: theme === 'light' ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-amber-500/5 text-amber-500/60 border-amber-500/15",
    info: theme === 'light' ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : "bg-blue-500/5 text-blue-500/60 border-blue-500/15",
  };

  return (
    <div className={cn(
      "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.1em] border inline-flex items-center gap-1.5",
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
};
