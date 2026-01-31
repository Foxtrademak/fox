import React from 'react';
import { Trophy } from 'lucide-react';
import { Card } from '../../ui/Card';
import { cn, haptic } from '../../../lib/utils';

interface TargetsSettingCardProps {
  onClick: () => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Profit Goals/Targets Setting Card
 */
export const TargetsSettingCard: React.FC<TargetsSettingCardProps> = ({ onClick, theme }) => {
  return (
    <Card 
      as="button"
      onClick={() => { onClick(); haptic('medium'); }}
      className="group flex flex-col items-start gap-4 active:scale-95 text-left p-8 cursor-pointer"
    >
      <div className="w-12 h-12 bg-blue-500/10 ios-card-mini overflow-visible p-0 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
        <Trophy className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1 h-1 rounded-full bg-blue-500/40" />
          <p className={cn("text-[8px] font-black uppercase tracking-[0.2em]", theme === 'light' ? "text-slate-400" : "text-white/10")}>Ambition</p>
        </div>
        <h4 className={cn("text-xs font-black uppercase tracking-widest", theme === 'light' ? "text-slate-800" : "text-white")}>Profit <span className="text-blue-500/50">Goals</span></h4>
      </div>
    </Card>
  );
};
