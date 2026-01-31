import React from 'react';
import { useData } from '../../context/DataContext';
import { useUI } from '../../context/UIContext';
import { StatCard } from '../ui/StatCard';

/**
 * Responsibility: Rendering the grid of summary statistic cards.
 * Smart Component: Pulls data directly from DataContext and UIContext.
 */
export const StatsSummaryGrid: React.FC = () => {
  const { stats } = useData();
  const { theme } = useUI();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4 mb-8">
      <StatCard 
        label="WIN RATE" 
        value={`${stats.winRate.toFixed(1)}%`} 
        trend={stats.winRate >= 50 ? 'positive' : 'negative'}
        percentage={stats.winRate}
        theme={theme}
      />
      <StatCard 
        label="EXPECTANCY" 
        value={`$${Math.round(stats.expectedValue)}`} 
        trend={stats.expectedValue > 0 ? 'positive' : 'negative'}
        percentage={50 + (stats.expectedValue / 1000) * 50}
        theme={theme}
      />
      <StatCard 
        label="TRADES" 
        value={stats.totalTrades} 
        trend="neutral"
        percentage={Math.min(stats.totalTrades, 100)}
        theme={theme}
      />
      <StatCard 
        label="AVG WIN" 
        value={`+$${Math.round(stats.averageWin)}`} 
        trend="positive"
        percentage={75}
        theme={theme}
      />
      <StatCard 
        label="AVG LOSS" 
        value={`-$${Math.round(stats.averageLoss)}`} 
        trend="negative"
        percentage={40}
        theme={theme}
      />
      <StatCard 
        label="MAX DRAWDOWN" 
        value={`${stats.maxDrawdown.toFixed(1)}%`} 
        trend="negative"
        percentage={100 - stats.maxDrawdown}
        theme={theme}
      />
    </div>
  );
};
