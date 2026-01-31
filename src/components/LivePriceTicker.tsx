import React, { useMemo } from 'react';
import { useTradingViewTicker } from '../hooks/useTradingViewTicker';
import { useUI } from '../context/UIContext';
import { TickerTapeShell } from './TickerTapeShell';

/**
 * Responsibility: Configuration and Data for Live Price Ticker.
 * Uses TickerTapeShell for presentation and CSS overrides.
 */
const LivePriceTicker: React.FC = React.memo(() => {
  const { theme } = useUI();

  const config = useMemo(() => ({
    "symbols": [
      { "proName": "FOREXCOM:XAUUSD", "title": "GOLD" },
      { "proName": "FOREXCOM:XAGUSD", "title": "SILVER" },
      { "proName": "CAPITALCOM:DXY", "title": "DXY" },
      { "proName": "OANDA:BCOUSD", "title": "OIL" }
    ],
    "showSymbolLogo": false,
    "colorTheme": theme,
    "isTransparent": true,
    "displayMode": "regular" as const,
    "locale": "en"
  }), [theme]);

  const { containerRef } = useTradingViewTicker(config);

  return (
    <TickerTapeShell 
      containerRef={containerRef} 
      className="mb-8"
      variant="glass"
    >
      {/* Any additional overlay elements could go here */}
    </TickerTapeShell>
  );
});

export default LivePriceTicker;
