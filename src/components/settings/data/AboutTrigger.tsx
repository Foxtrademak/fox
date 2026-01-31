import React from 'react';
import { Info, Sparkles } from 'lucide-react';
import { cn, haptic } from '../../../lib/utils';

interface AboutTriggerProps {
  setShowAbout: (val: boolean) => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Triggering the "About Fox Trade" Information View
 */
export const AboutTrigger: React.FC<AboutTriggerProps> = ({ setShowAbout, theme }) => {
  return (
    <button 
      onClick={() => { setShowAbout(true); haptic('medium'); }}
      className="ios-card overflow-visible w-full flex items-center justify-between group transition-all active:scale-[0.99]"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 ios-card-mini overflow-visible p-0 flex items-center justify-center border border-primary/20">
          <Info className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <p className={cn("text-[7px] font-black uppercase tracking-[0.2em]", theme === 'light' ? "text-slate-400" : "text-white/10")}>Information</p>
          </div>
          <span className={cn("text-xs font-black uppercase tracking-widest", theme === 'light' ? "text-slate-800" : "text-white/70")}>About <span className="text-primary/50">Fox Trade</span></span>
        </div>
      </div>
      <Sparkles className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
    </button>
  );
};
