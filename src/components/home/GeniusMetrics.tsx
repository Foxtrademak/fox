import React from 'react';
import { Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUI } from '../../context/UIContext';
import { useData } from '../../context/DataContext';

export const GeniusMetrics = React.memo(function GeniusMetrics() {
  const { theme, isScrolled } = useUI();
  const { geniusMetrics, stats } = useData();
  return (
    <div className={cn(
      "transition-all duration-500 w-full px-2 sm:px-4",
      isScrolled ? "hidden sm:grid sm:grid-cols-3 sm:gap-x-10 sm:gap-y-0 sm:mt-0 sm:max-w-md sm:justify-end" : "grid grid-cols-3 gap-2 sm:gap-8 mt-4 sm:mt-10 max-w-xl"
    )}>
      {/* Health Score */}
      <div className={cn(
        "flex flex-col transition-all duration-500",
        isScrolled ? "items-center space-y-0.5" : "items-center space-y-1.5 sm:space-y-3"
      )}>
        <div className={cn("flex items-center justify-center", isScrolled ? "h-3" : "h-5")}>
          <p className={cn(
            "font-black uppercase tracking-[0.2em] leading-none transition-all duration-500", 
            theme === 'light' ? "text-slate-900/20" : "text-white/20",
            isScrolled ? "text-[6px] sm:text-[9px]" : "text-[8px] sm:text-[10px]"
          )}>Health Score</p>
        </div>
        <div className={cn(
          "flex items-center gap-1 font-black tracking-tight transition-all duration-500",
          geniusMetrics.healthScore > 60 ? "text-emerald-500" : "text-rose-500",
          isScrolled ? "text-[7px] sm:text-base" : "px-1.5 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-primary/10 text-[9px] sm:text-xs"
        )}>
          <Sparkles className={cn("transition-all duration-500", isScrolled ? "w-1 h-1 sm:w-3 sm:h-3" : "w-2 sm:w-3 h-2 sm:h-3")} />
          {geniusMetrics.healthScore}%
        </div>
      </div>
      
      {/* 30D Projection */}
      <div className={cn(
        "flex flex-col transition-all duration-500",
        isScrolled ? "hidden sm:flex items-center space-y-0.5" : "items-center space-y-1.5 sm:space-y-3"
      )}>
        <div className={cn("flex items-center justify-center", isScrolled ? "h-3" : "h-5")}>
          <p className={cn(
            "font-black uppercase tracking-[0.2em] leading-none transition-all duration-500 pt-[2px]", 
            theme === 'light' ? "text-slate-900/20" : "text-white/20",
            isScrolled ? "text-[6px] sm:text-[9px]" : "text-[8px] sm:text-[10px]"
          )}>Projected 30D</p>
        </div>
        <div className={cn("flex flex-col items-center justify-center", isScrolled ? "" : "h-8 sm:h-10")}>
          <p className={cn(
            "font-black tracking-tighter transition-all duration-500", 
            theme === 'light' ? "text-slate-900/90" : "text-white/90",
            isScrolled ? "text-[8px] sm:text-base" : "text-xs sm:text-xl"
          )}>
            <span className={cn(
              "font-light mr-0.5 transition-all duration-500", 
              theme === 'light' ? "text-slate-900/30" : "text-white/30",
              isScrolled ? "text-[5px] sm:text-[10px]" : "text-[9px] sm:text-xs"
            )}>$</span>
            {Math.round(geniusMetrics.projected30D).toLocaleString()}
          </p>
        </div>
      </div>
      
      {/* Performance */}
      <div className={cn(
        "flex flex-col transition-all duration-500",
        isScrolled ? "items-center space-y-0.5" : "items-center space-y-1.5 sm:space-y-3"
      )}>
        <div className={cn("flex items-center justify-center", isScrolled ? "h-3" : "h-5")}>
          <p className={cn(
            "font-black uppercase tracking-[0.2em] leading-none transition-all duration-500", 
            theme === 'light' ? "text-slate-900/20" : "text-white/20",
            isScrolled ? "text-[6px] sm:text-[9px]" : "text-[8px] sm:text-[10px]"
          )}>Performance</p>
        </div>
        <div className={cn(
          "flex items-center gap-1 font-black tracking-tight transition-all duration-500",
          stats.totalProfit >= 0 ? "text-emerald-500" : "text-rose-500",
          isScrolled ? "text-[7px] sm:text-base" : "px-1.5 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-primary/10 text-[9px] sm:text-xs"
        )}>
          {stats.totalProfit >= 0 ? (
            <TrendingUp className={cn("transition-all duration-500", isScrolled ? "w-1 h-1 sm:w-3 sm:h-3" : "w-2 sm:w-3 h-2 sm:h-3")} />
          ) : (
            <TrendingDown className={cn("transition-all duration-500", isScrolled ? "w-1 h-1 sm:w-3 sm:h-3" : "w-2 sm:w-3 h-2 sm:h-3")} />
          )}
          {stats.totalProfit >= 0 ? '+' : ''}{Math.round(stats.totalProfit).toLocaleString()}
        </div>
      </div>
    </div>
  );
});
