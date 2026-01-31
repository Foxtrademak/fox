import { LineChart, CandlestickChart } from 'lucide-react';
import { cn, haptic } from '../../lib/utils';
import { useTradeChart } from '../../hooks/useTradeChart';

/**
 * Responsibility: Provide a toggle switch between Line and Candle views.
 * Smart Component: Pulls viewMode and setViewMode from useTradeChart.
 */
export function ChartViewToggle() {
  const { viewMode, setViewMode } = useTradeChart();

  return (
    <div className="flex bg-white/[0.03] p-1 rounded-2xl border border-white/[0.05] shadow-inner backdrop-blur-md">
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setViewMode('line');
          haptic('light');
        }}
        className={cn(
          "px-3 sm:px-10 py-1.5 sm:py-2.5 rounded-xl transition-all duration-500 flex items-center gap-1.5 sm:gap-3 group/btn relative",
          viewMode === 'line' 
            ? "bg-primary text-primary-foreground font-black shadow-[0_4px_20px_-5px_rgba(234,179,8,0.5)]"
            : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
        )}
      >
        <LineChart className={cn("w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-500 group-hover/btn:scale-110", viewMode === 'line' ? "text-primary-foreground" : "text-white/30")} />
        <span className="text-[8px] sm:text-[12px] uppercase tracking-[0.1em] font-black">Line</span>
      </button>
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setViewMode('candle');
          haptic('light');
        }}
        className={cn(
          "px-3 sm:px-10 py-1.5 sm:py-2.5 rounded-xl transition-all duration-500 flex items-center gap-1.5 sm:gap-3 group/btn relative",
          viewMode === 'candle' 
            ? "bg-primary text-primary-foreground font-black shadow-[0_4px_20px_-5px_rgba(234,179,8,0.5)]"
            : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
        )}
      >
        <CandlestickChart className={cn("w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-500 group-hover/btn:scale-110", viewMode === 'candle' ? "text-primary-foreground" : "text-white/30")} />
        <span className="text-[8px] sm:text-[12px] uppercase tracking-[0.1em] font-black">Candle</span>
      </button>
    </div>
  );
}
