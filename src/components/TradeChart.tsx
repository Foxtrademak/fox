import { memo } from 'react';
import { cn } from '../lib/utils';
import { ChartHeader } from './charts/ChartHeader';
import { useTradeChart } from '../hooks/useTradeChart';
import { ChartViewToggle } from './charts/ChartViewToggle';
import { ChartEmptyState } from './charts/ChartEmptyState';
import { ChartRenderer } from './charts/ChartRenderer';

interface TradeChartProps {
  className?: string;
}

/**
 * Responsibility: Orchestrate the trade chart visualization.
 * Smart Component: Acts as a layout shell for chart sub-components.
 */
export const TradeChart = memo(function TradeChart({ className }: TradeChartProps) {
  const { activeData } = useTradeChart();

  if (activeData.length <= 1) {
    return <ChartEmptyState className={className} />;
  }

  return (
    <div className={cn(
      "w-full h-full flex flex-col p-3 sm:p-8 pb-4 sm:pb-14 ios-card relative overflow-hidden",
      "bg-white/[0.01] border border-white/[0.04] shadow-2xl",
      className
    )}>
      {/* Dynamic Background Glow - Subtle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-primary/5 blur-[120px] pointer-events-none" />
      
      <ChartHeader />

      <div className="flex items-center justify-between mb-4 sm:mb-8 relative z-10 px-2">
        <div /> {/* Spacer for header layout consistency */}
        <ChartViewToggle />
      </div>

      <ChartRenderer />
    </div>
  );
});
