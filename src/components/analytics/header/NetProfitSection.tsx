import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { Statistics } from '../../../lib/statistics';
import type { ThemeConfig } from '../../../hooks/useNetPerformanceTheme';

interface NetProfitSectionProps {
  stats: Statistics;
  initialCapital: number;
  isScrolled: boolean;
  themeConfig: ThemeConfig;
  isPositive: boolean;
  profitColor: string;
  profitIconStyle: string;
  overallResultsStyle: string;
}

export const NetProfitSection = ({
  stats,
  initialCapital,
  isScrolled,
  themeConfig,
  isPositive,
  profitColor,
  profitIconStyle,
  overallResultsStyle
}: NetProfitSectionProps) => (
  <div className={cn("transition-all duration-500", isScrolled ? "sm:flex-none flex-1" : "flex-1")}>
    <div className={cn("flex items-center gap-2 mb-1 transition-all duration-500", isScrolled ? "hidden sm:flex sm:opacity-0 sm:h-0 sm:overflow-hidden sm:mb-0 opacity-100 h-auto" : "opacity-100 h-auto")}>
      <div className={cn(
        "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.1em] border",
        overallResultsStyle
      )}>
        Overall Results
      </div>
      <div className={cn("h-px flex-1 bg-gradient-to-r to-transparent", themeConfig.lineGradient)} />
    </div>

    <div className="flex items-center gap-3">
      <div className={cn(
        "font-black tracking-tighter flex items-baseline gap-1 transition-all duration-500",
        themeConfig.textMain,
        isScrolled ? "text-xl sm:text-2xl" : "text-3xl sm:text-5xl"
      )}>
        <span className={cn(
          "transition-all duration-500",
          profitColor,
          isScrolled ? "text-xl sm:text-lg sm:opacity-60 opacity-60" : "text-xl sm:text-2xl opacity-20"
        )}>{stats.totalProfit >= 0 ? '+' : ''}</span>
        {Math.round(stats.totalProfit).toLocaleString()}
        <span className={cn("opacity-20 ml-0.5 transition-all duration-500", themeConfig.textMain, isScrolled ? "text-lg sm:text-sm" : "text-base sm:text-lg")}>$</span>
        
        {isScrolled && (
          <span className={cn(
            "ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md border hidden sm:inline-block",
            profitIconStyle
          )}>
            {((stats.totalProfit / initialCapital) * 100).toFixed(1)}%
          </span>
        )}
      </div>
      
      <div className={cn(
        "flex rounded-2xl items-center justify-center border transition-all duration-500 group-hover:scale-105 shadow-inner",
        profitIconStyle,
        isScrolled ? "w-8 h-8 rounded-lg sm:w-7 sm:h-7 sm:rounded-lg" : "w-10 h-10 rounded-2xl"
      )}>
        {isPositive ? <TrendingUp className={isScrolled ? "w-4 h-4 sm:w-3 sm:h-3" : "w-5 h-5"} /> : <TrendingDown className={isScrolled ? "w-4 h-4 sm:w-3 sm:h-3" : "w-5 h-5"} />}
      </div>
    </div>
  </div>
);
