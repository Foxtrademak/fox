import React from 'react';
import { cn } from '../lib/utils';
import LivePriceTicker from './LivePriceTicker';
import { HomeStickyHeader } from './home/HomeStickyHeader';
import { SmartInsights } from './home/SmartInsights';
import { TargetProgress } from './home/TargetProgress';
import { OperationStream } from './home/OperationStream';
import { useUI } from '../context/UIContext';

export const HomeTab: React.FC = React.memo(() => {
  const { isScrolled } = useUI();

  return (
    <div className="space-y-6 animate-fade-in pb-32">
      {/* Gradient Blur Effect - Positioned behind sticky header */}
      <div className={cn("gradient-blur-header transform-gpu will-change-opacity", isScrolled && "is-scrolled")} style={{ zIndex: 90 }} />

      {/* Live Prices Ticker */}
      <div className={cn(
        "transition-all duration-500 transform-gpu",
        isScrolled ? "opacity-0 -translate-y-4 pointer-events-none h-0 mb-0 overflow-hidden" : "opacity-100 translate-y-0 h-auto mb-6"
      )}>
        <LivePriceTicker />
      </div>

      {/* Sticky Header Section - Dynamic Portfolio Card */}
      <HomeStickyHeader />

      {/* Main Content Sections */}
      <div className="max-w-xl mx-auto space-y-8 px-2 sm:px-0">
        <SmartInsights />
        <TargetProgress />
        <OperationStream />
      </div>
    </div>
  );
});

HomeTab.displayName = 'HomeTab';
