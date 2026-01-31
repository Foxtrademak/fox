import React from 'react';
import { BackgroundLogos } from './background/BackgroundLogos';
import { BackgroundCandleChart } from './background/BackgroundCandleChart';
import { FloatingTradingIcons } from './background/FloatingTradingIcons';
import { BackgroundBottomChart } from './background/BackgroundBottomChart';
import { CenterTradingSymbol } from './background/CenterTradingSymbol';

/**
 * Responsibility: Orchestrate the entire trading-themed background.
 * Acts as a layout shell that organizes various decorative components.
 */
export const TradingBackground = React.memo(() => {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 transform-gpu"
      style={{ contain: 'paint' }}
    >
      <BackgroundLogos />

      <div className="absolute inset-0 opacity-[0.07] transform-gpu">
        <BackgroundCandleChart />
        <FloatingTradingIcons />
        <BackgroundBottomChart />
        <CenterTradingSymbol />
      </div>
    </div>
  );
});
