import React from 'react';
import { cn } from '../../../lib/utils';
import { Toggle } from '../../ui/Toggle';

interface TargetVisibilityFieldProps {
  showTargetsOnHome: boolean;
  setShowTargetsOnHome: (val: boolean) => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Handling the visibility toggle for profit targets on the home screen.
 */
export const TargetVisibilityField: React.FC<TargetVisibilityFieldProps> = ({
  showTargetsOnHome,
  setShowTargetsOnHome,
  theme
}) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 border rounded-2xl mb-4",
      theme === 'light' ? "bg-slate-50 border-slate-100" : "bg-white/[0.05] border border-white/[0.05]"
    )}>
      <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'light' ? "text-slate-400" : "text-white/40")}>
        Show on Home
      </span>
      <Toggle 
        enabled={showTargetsOnHome}
        onChange={setShowTargetsOnHome}
        theme={theme}
      />
    </div>
  );
};
