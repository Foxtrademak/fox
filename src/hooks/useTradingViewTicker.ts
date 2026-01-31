import { useEffect, useRef, useId, useState } from 'react';

interface TickerConfig {
  symbols: Array<{ proName: string; title: string }>;
  showSymbolLogo?: boolean;
  colorTheme?: 'light' | 'dark';
  isTransparent?: boolean;
  displayMode?: 'regular' | 'compact';
  locale?: string;
}

/**
 * Reusable hook for TradingView Ticker Tape widgets.
 * Responsibilities:
 * 1. Lazy Loading (Intersection Observer)
 * 2. Widget ID Management
 * 3. Script Injection & Lifecycle
 */
export function useTradingViewTicker(config: TickerConfig) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const widgetId = `tv-widget-${id.replace(/:/g, '')}`;
  const [isVisible, setIsVisible] = useState(false);

  // Responsibility 1: Lazy Loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Responsibility 2 & 3: Script Injection & Cleanup
  const configString = JSON.stringify(config);

  useEffect(() => {
    if (!isVisible) return;

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    currentContainer.innerHTML = '';
    
    const widgetDiv = document.createElement('div');
    widgetDiv.id = widgetId;
    widgetDiv.className = 'tradingview-widget-container__widget';
    currentContainer.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      ...JSON.parse(configString),
      "width": "100%",
      "height": "100%",
    });

    currentContainer.appendChild(script);

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [isVisible, widgetId, configString]);

  return { containerRef, widgetId, isVisible };
}
