import React from 'react';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';
import { useData } from '../../context/DataContext';
import { useUI } from '../../context/UIContext';

interface SessionAnalysisGridProps {
  className?: string;
}

export const SessionAnalysisGrid = React.memo(function SessionAnalysisGrid({
  className
}: SessionAnalysisGridProps) {
  const { sessionStats } = useData();
  const { theme } = useUI();

  return (
    <Card 
      className={cn(
        "border overflow-hidden p-8 shadow-2xl relative group rounded-[3rem]",
        theme === 'light' ? "bg-white/60 border-white/60" : "bg-white/[0.05] border-white/[0.05]",
        className
      )}
    >
      <div className="flex items-center justify-between relative z-10 mb-8">
        <p className={cn("text-[9px] font-black uppercase tracking-[0.3em]", theme === 'light' ? "text-slate-900/40" : "text-white/30")}>Market Sessions Analysis</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className={cn("text-[8px] font-black uppercase tracking-widest", theme === 'light' ? "text-slate-900/20" : "text-white/20")}>Live Distribution</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {sessionStats.map((session) => (
          <Card 
            key={session.label}
            variant="mini"
            className={cn(
              "p-6 border transition-all duration-500 hover:scale-[1.02] group/session",
              theme === 'light' ? "bg-white/40 border-black/[0.06] hover:bg-white/60" : "bg-white/[0.05] border-white/[0.05] hover:bg-white/[0.06]"
            )}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "p-2.5 rounded-xl transition-colors",
                  theme === 'light' ? "bg-black/[0.06]" : "bg-white/[0.06] group-hover/session:bg-primary/10"
                )}>
                  <p className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'light' ? "text-slate-900/60" : "text-primary/80")}>{session.label}</p>
                </div>
                <div className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black tracking-tighter",
                  session.profit >= 0 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "bg-rose-500/10 text-rose-500"
                )}>
                  {session.profit >= 0 ? '+' : ''}{Math.round(session.profit)}
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <p className={cn("text-[8px] sm:text-[10px] font-bold uppercase tracking-widest", theme === 'light' ? "text-slate-900/20" : "text-white/10")}>Efficiency</p>
                  <p className={cn("text-xl sm:text-2xl font-black tracking-tighter", theme === 'light' ? "text-slate-900" : "text-white")}>
                    {Math.round(session.winRate)}%
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className={cn("text-[8px] sm:text-[10px] font-bold uppercase tracking-widest", theme === 'light' ? "text-slate-900/20" : "text-white/10")}>Volume</p>
                  <p className={cn("text-base sm:text-lg font-black", theme === 'light' ? "text-slate-900/90" : "text-white/90")}>{session.count}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
});
