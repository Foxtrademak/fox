import React from 'react';
import { Target, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';
import { SectionLabel } from '../ui/SectionLabel';
import { useUI } from '../../context/UIContext';
import { useData } from '../../context/DataContext';

export const TargetProgress = React.memo(function TargetProgress() {
  const { theme } = useUI();
  const { showTargetsOnHome, targetProgress } = useData();
  if (!showTargetsOnHome) return null;

  return (
    <div className="space-y-4 px-2 sm:px-0">
      <SectionLabel label="Profit Ambitions" theme={theme} dotColor="bg-blue-500/40" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Weekly Target */}
        <Card variant="mini" className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Target className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className={cn("text-[7px] font-black uppercase tracking-widest", theme === 'light' ? "text-slate-400" : "text-white/20")}>Weekly Goal</p>
                <h4 className={cn("text-[10px] font-black uppercase tracking-wider", theme === 'light' ? "text-slate-800" : "text-white")}>
                  ${Math.round(targetProgress.weekly.profit).toLocaleString()} <span className="text-blue-500/50">/ ${Math.round(targetProgress.weekly.target).toLocaleString()}</span>
                </h4>
              </div>
            </div>
            <span className={cn("text-[10px] font-black tracking-tighter", theme === 'light' ? "text-slate-900" : "text-blue-500")}>
              {Math.round(targetProgress.weekly.percentage)}%
            </span>
          </div>
          <div className={cn("h-1.5 w-full rounded-full overflow-hidden", theme === 'light' ? "bg-black/5" : "bg-white/5")}>
            <div 
              className="h-full bg-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(targetProgress.weekly.percentage, 100)}%` }}
            />
          </div>
        </Card>

        {/* Monthly Target */}
        <Card variant="mini" className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Trophy className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className={cn("text-[7px] font-black uppercase tracking-widest", theme === 'light' ? "text-slate-400" : "text-white/20")}>Monthly Goal</p>
                <h4 className={cn("text-[10px] font-black uppercase tracking-wider", theme === 'light' ? "text-slate-800" : "text-white")}>
                  ${Math.round(targetProgress.monthly.profit).toLocaleString()} <span className="text-purple-500/50">/ ${Math.round(targetProgress.monthly.target).toLocaleString()}</span>
                </h4>
              </div>
            </div>
            <span className={cn("text-[10px] font-black tracking-tighter", theme === 'light' ? "text-slate-900" : "text-purple-500")}>
              {Math.round(targetProgress.monthly.percentage)}%
            </span>
          </div>
          <div className={cn("h-1.5 w-full rounded-full overflow-hidden", theme === 'light' ? "bg-black/5" : "bg-white/5")}>
            <div 
              className="h-full bg-purple-500 transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(targetProgress.monthly.percentage, 100)}%` }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
});
