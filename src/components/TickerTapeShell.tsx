import React, { memo, useMemo } from 'react';
import { cn } from '../lib/utils';
import { useUI } from '../context/UIContext';

interface TickerTapeShellProps {
  children?: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  variant?: 'glass' | 'ios';
  filter?: string;
}

/**
 * Responsibility: Provide a styled shell for TradingView Ticker Tape widgets.
 * Handles CSS overrides for third-party widgets and layout consistency.
 */
export const TickerTapeShell = memo(({ 
  children, 
  containerRef, 
  className, 
  variant = 'glass',
  filter
}: TickerTapeShellProps) => {
  const { theme } = useUI();

  const activeFilter = useMemo(() => {
    if (filter) return filter;
    return theme === 'light' 
      ? 'contrast(0.8) brightness(0.9) grayscale(0.2)' 
      : 'contrast(1.1) brightness(1.2)';
  }, [filter, theme]);

  const cssStyles = useMemo(() => `
    .tradingview-widget-container {
      overflow: hidden !important;
    }
    .tradingview-widget-container__widget {
      height: 72px !important;
    }
    .tradingview-widget-copyright,
    a[href*="tradingview"],
    .tv-embed-widget-wrapper__footer {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
    }
    iframe {
      height: 72px !important;
      margin: 0 !important;
      padding: 0 !important;
      filter: ${activeFilter} !important;
      pointer-events: none !important;
      transform: translateY(1px) !important;
    }
  `, [activeFilter]);

  return (
    <div className={cn("w-full px-4 animate-fade-in", className)}>
      <div className="max-w-[1400px] mx-auto">
        <div className="relative group">
          <div className={cn(
            "relative h-[44px] flex items-center overflow-visible transition-all duration-500",
            variant === 'glass' ? "bg-white/[0.01] border border-white/10 rounded-2xl" : "ios-card-mini rounded-xl",
          )}>
            {variant === 'glass' && (
              /* Glass Edge Highlight */
              <div 
                className="absolute -inset-[1px] rounded-2xl pointer-events-none opacity-50 bg-gradient-to-br from-white/40 via-transparent to-white/10 z-10"
                style={{
                  maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  padding: '1px'
                }}
              />
            )}

            {children}

            <div className="w-full h-full flex items-center justify-center">
              <div 
                ref={containerRef} 
                className="tradingview-widget-container w-full h-[72px] -mt-[1px]" 
              />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
    </div>
  );
});

TickerTapeShell.displayName = 'TickerTapeShell';
