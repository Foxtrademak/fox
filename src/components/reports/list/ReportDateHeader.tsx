import React from 'react';
import { cn } from '../../../lib/utils';

interface ReportDateHeaderProps {
  formattedDate: string;
  dailyPL: number;
  theme: 'light' | 'dark';
}

/**
 * Responsibility 5: Header UI Rendering
 * Renders the date separators and daily P&L badge
 */
export const ReportDateHeader: React.FC<ReportDateHeaderProps> = ({ 
  formattedDate, 
  dailyPL, 
  theme 
}) => {
  return (
    <div className="py-4">
      <div className="flex items-center gap-4 px-2">
        <div className={cn("h-px flex-1", theme === 'light' ? "bg-slate-200" : "bg-white/[0.05]")} />
        <div className="flex flex-col items-center gap-1">
          <h3 className={cn("text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap", 
            theme === 'light' ? "text-slate-400" : "text-white/30")}>
            {formattedDate}
          </h3>
          {dailyPL !== 0 && (
            <div className={cn(
              "px-2 py-0.5 rounded-md text-[9px] font-black tracking-wider uppercase",
              dailyPL > 0 
                ? "bg-green-500/10 text-green-500" 
                : "bg-red-500/10 text-red-500"
            )}>
              {dailyPL > 0 ? '+' : ''}{dailyPL.toLocaleString()}
            </div>
          )}
        </div>
        <div className={cn("h-px flex-1", theme === 'light' ? "bg-slate-200" : "bg-white/[0.05]")} />
      </div>
    </div>
  );
};
