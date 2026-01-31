import React from 'react';
import { cn, haptic } from '../../lib/utils';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: 'positive' | 'negative' | 'neutral';
  percentage?: number;
  theme: 'light' | 'dark';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  trend,
  percentage = 0,
  theme
}) => {
  const color = trend === 'positive' ? '#22c55e' : trend === 'negative' ? '#ef4444' : '#3b82f6';

  return (
    <Card 
      variant="mini"
      className={cn(
        "relative group/stat border p-3 sm:p-5 transition-all duration-500 hover:scale-[1.02] rounded-[2rem]",
        theme === 'light' ? "bg-white/60 border-white/60" : "bg-white/[0.05] border-white/[0.05]"
      )}
      onMouseEnter={() => haptic('light')}
    >
      <div className="flex justify-between items-start relative z-10 mb-1 sm:mb-2">
        <p className={cn(
          "text-[7px] xs:text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.1em] truncate pr-1 opacity-40",
          theme === 'light' ? "text-slate-900" : "text-white"
        )}>
          {label}
        </p>
        <div className={cn(
          "w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0",
          trend === 'positive' ? "bg-emerald-500" : 
          trend === 'negative' ? "bg-rose-500" : 
          "bg-blue-500"
        )} />
      </div>

      <div className="flex items-end justify-between relative z-10 mb-2">
        <div className={cn(
          "text-[12px] xs:text-sm sm:text-2xl lg:text-3xl font-black tracking-tighter sm:tracking-tight truncate",
          theme === 'light' ? "text-slate-900" : "text-white"
        )}>
          {value}
        </div>
      </div>

      {/* Progress Bar - Inset and rounded for consistency */}
      <div className={cn("mt-auto w-full h-1 rounded-full overflow-hidden", theme === 'light' ? "bg-black/[0.05]" : "bg-white/[0.05]")}>
        <div 
          className="h-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-full"
          style={{ 
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
            backgroundColor: color
          }}
        />
      </div>
    </Card>
  );
};
