import React from 'react';
import { cn } from '../../lib/utils';
import { useUI } from '../../context/UIContext';
import { MarketSessions } from './MarketSessions';
import { PortfolioBalance } from './PortfolioBalance';
import { GeniusMetrics } from './GeniusMetrics';
import { HomeHeaderIdentity } from './HomeHeaderIdentity';
import { GlassPortfolioCard } from './GlassPortfolioCard';

export const HomeStickyHeader = React.memo(function HomeStickyHeader() {
  const { isScrolled, logo } = useUI();

  return (
    <div className={cn(
      "sticky top-0 z-[100] transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]",
      isScrolled ? "pt-2 pb-0" : "pt-0 pb-2"
    )}>
      {/* Mobile Scrolled: Logo - Above the Card */}
      <div className={cn(
        "hidden sm:hidden items-center justify-center mb-1 absolute left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled ? "flex opacity-100 -top-8" : "opacity-0 top-0 pointer-events-none"
      )}>
        <img 
          src={logo} 
          alt="App Logo" 
          className="w-8 h-8 object-contain opacity-80" 
        />
      </div>

      {/* Transparent Mask - Provides smooth transition behind sticky elements */}
      <div className={cn(
        "fixed inset-x-0 top-0 h-[120px] -z-10 transition-opacity duration-150 gpu-accelerated will-change-[opacity] pointer-events-none",
        isScrolled ? "opacity-100" : "opacity-0"
      )} style={{ 
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
      }} />

      <GlassPortfolioCard>
        {/* Top Section: Sessions & Logo */}
        <div className={cn(
          "flex items-center justify-between w-full px-4 sm:px-12 transition-all duration-500",
          isScrolled ? "sm:justify-between" : "mb-2 sm:mb-8"
        )}>
          <HomeHeaderIdentity />
          <MarketSessions />
        </div>

        {/* Center Section: Balance */}
        <div className={cn(
          "flex flex-col sm:flex-row items-center transition-all duration-500 w-full px-4 sm:px-12",
          isScrolled ? "justify-between" : "justify-center"
        )}>
          <PortfolioBalance />
          <GeniusMetrics />
        </div>
      </GlassPortfolioCard>
    </div>
  );
});
