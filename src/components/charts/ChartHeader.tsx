import React from 'react';
import { Activity } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTradeChart } from '../../hooks/useTradeChart';

interface ChartHeaderProps {
  className?: string;
}

export const ChartHeader = React.memo(({ 
  className
}: ChartHeaderProps) => {
  const { lastRealPoint, prevRealPoint, capitals, realData } = useTradeChart();

  return (
    <div className={cn("flex items-center justify-between mb-4 sm:mb-8 relative z-10 px-2", className)}>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className={cn(
          "w-8 h-8 sm:w-10 sm:h-10 ios-card-mini p-0 flex items-center justify-center border",
          "bg-white/[0.06] border-white/[0.05]"
        )}>
          <Activity className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", "text-primary/60")} />
        </div>
        <div className="text-left">
          <h3 className={cn("text-[7px] sm:text-[9px] font-black uppercase tracking-[0.2em] mb-0.5", "text-white/20")}>Portfolio Growth</h3>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={cn("text-sm sm:text-xl font-black tracking-tighter", "text-white")}>${capitals[capitals.length - 1]?.toLocaleString() || '0'}</span>
            {realData.length > 1 && lastRealPoint && prevRealPoint && lastRealPoint.close !== null && prevRealPoint.close !== null && (
              <span className={cn(
                "text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-lg",
                lastRealPoint.close >= prevRealPoint.close 
                  ? "text-green-500/80 bg-green-500/5" 
                  : "text-red-500/80 bg-red-500/5"
              )}>
                {lastRealPoint.close >= prevRealPoint.close ? '+' : ''}
                {((lastRealPoint.close - prevRealPoint.close) / prevRealPoint.close * 100).toFixed(2)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
