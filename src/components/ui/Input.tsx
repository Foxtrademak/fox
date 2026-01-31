import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  theme?: 'light' | 'dark';
}

export const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  theme = 'dark',
  ...props
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className={cn(
          "block text-[10px] font-black uppercase tracking-widest ml-1",
          theme === 'light' ? "text-slate-400" : "text-white/30"
        )}>
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-6 py-4 rounded-2xl text-lg font-black tracking-tight outline-none border transition-all",
          theme === 'light' 
            ? "bg-white border-slate-100 text-slate-800 focus:border-primary/50" 
            : "bg-black/20 border-white/5 text-white focus:border-primary/30",
          error && "border-red-500/50",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-[9px] font-black uppercase tracking-widest text-red-500 ml-1">
          {error}
        </p>
      )}
    </div>
  );
};
