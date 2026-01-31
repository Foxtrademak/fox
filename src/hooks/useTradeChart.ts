import { useMemo, useState } from 'react';
import { calculateChartData } from '../lib/statistics';
import { useData } from '../context/DataContext';

/**
 * Responsibility: Business logic for processing trade chart data and statistics.
 * Smart Hook: Pulls data and initial capital directly from DataContext.
 */
export function useTradeChart() {
  const { records, initialCapital } = useData();
  const [viewMode, setViewMode] = useState<'line' | 'candle'>('line');

  const chartData = useMemo(() => {
    return calculateChartData(records, initialCapital);
  }, [records, initialCapital]);

  const activeData = useMemo(() => {
    return viewMode === 'line' ? chartData.realData : chartData.futureData;
  }, [chartData, viewMode]);

  const realData = chartData.realData;
  const lastRealPoint = realData.length > 0 ? realData[realData.length - 1] : null;
  const prevRealPoint = realData.length > 1 ? realData[realData.length - 2] : null;
  
  const { capitals, lows, highs } = useMemo(() => {
    const caps: number[] = [];
    const l: number[] = [];
    const h: number[] = [];
    
    realData.forEach(d => {
      if (d.capital !== null) caps.push(d.capital);
      if (d.low !== null) l.push(d.low);
      if (d.high !== null) h.push(d.high);
    });
    
    return { capitals: caps, lows: l, highs: h };
  }, [realData]);
  
  const stats = useMemo(() => {
    if (activeData.length <= 1) return { 
      minCap: 0, 
      maxCap: 0, 
      ath: 0, 
      padding: 0, 
      candleGap: "15%",
      yDomain: [0, 100] as [number, number]
    };
    
    const min = Math.min(...lows);
    const max = Math.max(...highs);
    
    const yMin = 0;
    const yMax = Math.max(max * 1.3, initialCapital * 1.5);
    
    const range = max - min || initialCapital * 0.1;
    const zoomLevel = 1;
    const dateSpacing = 0;
    const gapPercentage = Math.min(85, Math.max(0, (5 / zoomLevel) + (dateSpacing * 5)));
    
    return {
      minCap: min,
      maxCap: max,
      ath: max,
      padding: range * 0.1,
      candleGap: `${gapPercentage}%`,
      yDomain: [yMin, yMax] as [number, number]
    };
  }, [activeData.length, lows, highs, initialCapital]);

  return {
    viewMode,
    setViewMode,
    activeData,
    realData,
    lastRealPoint,
    prevRealPoint,
    capitals,
    stats,
    initialCapital
  };
}
