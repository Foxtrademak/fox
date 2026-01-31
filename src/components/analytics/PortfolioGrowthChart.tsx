import React from 'react';
import { cn } from '../../lib/utils';
import { TradeChart } from '../TradeChart';
import { Card } from '../ui/Card';
import { ChartFooter } from './charts/ChartFooter';
import { useUI } from '../../context/UIContext';

interface PortfolioGrowthChartProps {
  className?: string;
}

export const PortfolioGrowthChart = React.memo(function PortfolioGrowthChart({
  className
}: PortfolioGrowthChartProps) {
  const { theme } = useUI();

  return (
    <Card 
      className={cn(
        "w-full border overflow-hidden p-4 sm:p-10 shadow-2xl relative group rounded-[3rem]",
        theme === 'light' ? "bg-white/60 border-white/60" : "bg-white/[0.05] border-white/[0.05]",
        className
      )}
    >
      <div className="w-full h-[280px] sm:h-[550px] relative z-10">
        <TradeChart />
      </div>
      
      <ChartFooter theme={theme} />
    </Card>
  );
});
