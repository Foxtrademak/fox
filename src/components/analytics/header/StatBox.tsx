import { cn } from '../../../lib/utils';
import type { ThemeConfig } from '../../../hooks/useNetPerformanceTheme';

export const StatBox = ({ 
  label, 
  value, 
  isScrolled, 
  themeConfig, 
  accentColor,
  type 
}: { 
  label: string; 
  value: number; 
  isScrolled: boolean; 
  themeConfig: ThemeConfig;
  accentColor: string;
  type: 'revenue' | 'drawdown';
}) => (
  <div className={cn(
    "relative p-2 rounded-2xl border overflow-hidden group/box transition-all duration-300",
    themeConfig.boxBg,
    isScrolled ? "p-1 rounded-lg border-none bg-transparent sm:p-1 sm:rounded-lg sm:border-none sm:bg-transparent flex flex-col items-center justify-center" : "p-2 rounded-2xl"
  )}>
    <div className={cn("absolute top-0 left-0 w-0.5 h-full", accentColor, isScrolled && "hidden sm:hidden")} />
    <p className={cn("font-black uppercase tracking-widest mb-0.5 transition-all duration-500", themeConfig.textDim, isScrolled ? "text-[6px] sm:text-[6px] text-center" : "text-[7px]")}>
      {label}
    </p>
    <div className={cn("flex items-baseline gap-1", isScrolled && "justify-center")}>
      <span className={cn("font-black tracking-tighter transition-all duration-500", themeConfig.textMain, isScrolled ? "text-sm sm:text-base" : "text-lg")}>
        {Math.round(value).toLocaleString()}
      </span>
      <span className={cn("font-bold transition-all duration-500", type === 'revenue' ? "text-emerald-500/40" : "text-rose-500/40", isScrolled ? "text-[7px] sm:text-[7px]" : "text-[8px]")}>$</span>
    </div>
  </div>
);
