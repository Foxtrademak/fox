import React, { useMemo } from 'react';
import { useTradingViewTicker } from '../hooks/useTradingViewTicker';
import { useUI } from '../context/UIContext';
import { TickerTapeShell } from './TickerTapeShell';

/**
 * Responsibility: Configuration and Data for Economic Ticker Tape.
 * Uses TickerTapeShell for presentation and CSS overrides.
 */
const EconomicTickerTape: React.FC = React.memo(() => {
  const { theme } = useUI();

  const config = useMemo(() => ({
    "symbols": [
      { "proName": "FX_IDC:USDILS", "title": "USD/ILS" },
      { "proName": "FX_IDC:EURUSD", "title": "EUR/USD" },
      { "proName": "FX_IDC:GBPUSD", "title": "GBP/USD" },
      { "proName": "FOREXCOM:XAUUSD", "title": "GOLD" },
      { "proName": "BITSTAMP:BTCUSD", "title": "BTC" },
      { "proName": "ECONOMICS:USIR", "title": "Fed Rate" },
      { "proName": "ECONOMICS:USCPI", "title": "US CPI" },
      { "proName": "ECONOMICS:USUR", "title": "Unempl." }
    ],
    "showSymbolLogo": true,
    "colorTheme": theme,
    "isTransparent": true,
    "displayMode": "regular" as const,
    "locale": "en"
  }), [theme]);

  const { containerRef } = useTradingViewTicker(config);

  return (
    <TickerTapeShell 
      containerRef={containerRef} 
      className="mb-4 px-0 sm:px-4"
      variant="ios"
      filter="contrast(1.1) brightness(1.2) hue-rotate(180deg)"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-red-500/40 z-[30]" />
      <div className="absolute inset-y-0 right-0 w-1 bg-red-500/40 z-[30]" />
    </TickerTapeShell>
  );
};

export default EconomicTickerTape;
