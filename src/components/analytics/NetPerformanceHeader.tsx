import React from 'react';
import { cn } from '../../lib/utils';
import { useData } from '../../context/DataContext';
import { useUI } from '../../context/UIContext';
import { useNetPerformanceTheme } from '../../hooks/useNetPerformanceTheme';
import { StatBox } from './header/StatBox';
import { NetProfitSection } from './header/NetProfitSection';
import { HeaderBackground } from './header/HeaderBackground';

/**
 * Responsibility: Rendering the main performance header with net profit and primary metrics.
 * Smart Component: Pulls data directly from DataContext and UIContext.
 */
export const NetPerformanceHeader = React.memo(function NetPerformanceHeader() {
  const { stats, initialCapital } = useData();
  const { theme, isScrolled, logo } = useUI();
  
  const { 
    themeConfig, 
    isPositive, 
    profitColor, 
    profitIconStyle, 
    overallResultsStyle 
  } = useNetPerformanceTheme(theme, stats);

  return (
    <div className={cn(
      "z-[100] pt-4 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] sticky top-0",
      isScrolled ? "sm:scale-[0.98] sm:-translate-y-2" : "sm:scale-100 sm:translate-y-0"
    )}>
      <HeaderBackground isScrolled={isScrolled} themeConfig={themeConfig} />

      {/* Mobile Scrolled Logo */}
      <div className={cn(
        "hidden sm:hidden items-center justify-center mb-1 absolute left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled ? "flex opacity-100 -top-8" : "opacity-0 top-0 pointer-events-none"
      )}>
         <img src={logo} alt="App Logo" className="w-8 h-8 object-contain opacity-80" />
      </div>

      <div className={cn(
        "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top relative",
        isScrolled ? "sm:mb-1 sm:scale-[0.8] sm:-translate-y-4 mb-3 scale-100 translate-y-0" : "mb-3 sm:mb-4 scale-100 translate-y-0"
      )}>
        <div className={cn(
          "ios-card shadow-2xl group transition-all duration-500 relative overflow-hidden border rounded-[3rem]",
          themeConfig.cardBg,
          isScrolled ? "sm:py-2 sm:rounded-[2.5rem] sm:h-[70px] sm:flex sm:items-center py-3 h-auto" : "py-3 sm:py-3 h-auto"
        )}>
          <div className={cn("absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-all duration-500 border-[0.2px]", themeConfig.edgeBorder)} />
          <div className={cn("absolute inset-0 pointer-events-none", themeConfig.glossyOverlay)} />
          
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-6 sm:w-8 hidden xs:flex items-center justify-center border-r rounded-l-[2.5rem] overflow-hidden z-20 transition-all duration-500",
            themeConfig.labelBg,
            isScrolled && "sm:w-7"
          )}>
            <div className="-rotate-90 whitespace-nowrap">
              <p className={cn(
                "font-black uppercase tracking-[0.4em] text-primary/70 select-none transition-all duration-500",
                isScrolled ? "sm:text-[6px] sm:tracking-[0.2em] text-[6px] tracking-[0.4em]" : "text-[6px] sm:text-[8px] tracking-[0.4em] sm:tracking-[0.6em]"
              )}>
                Net Performance
              </p>
            </div>
          </div>

          <div className={cn(
            "relative z-10 w-full px-3 sm:px-4 xs:pl-8 sm:pl-12 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 transition-all duration-500",
            isScrolled ? "flex-row items-center justify-between gap-2 p-3 xs:pl-8 sm:p-3" : "p-3 sm:p-4 xs:pl-8 sm:pl-12"
          )}>
            <NetProfitSection 
              stats={stats}
              initialCapital={initialCapital}
              isScrolled={isScrolled}
              themeConfig={themeConfig}
              isPositive={isPositive}
              profitColor={profitColor}
              profitIconStyle={profitIconStyle}
              overallResultsStyle={overallResultsStyle}
            />

            <div className={cn("grid transition-all duration-500", isScrolled ? "grid grid-cols-2 gap-2 flex-1 sm:grid sm:grid-cols-2 sm:gap-2 sm:flex-1 sm:max-w-[300px]" : "grid-cols-2 gap-2 sm:gap-3 lg:w-1/3")}>
              <StatBox 
                label="Revenue" 
                value={stats.grossProfit} 
                isScrolled={isScrolled} 
                themeConfig={themeConfig} 
                accentColor="bg-emerald-500/30"
                type="revenue"
              />
              <StatBox 
                label="Drawdown" 
                value={stats.grossLoss} 
                isScrolled={isScrolled} 
                themeConfig={themeConfig} 
                accentColor="bg-rose-500/30"
                type="drawdown"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
