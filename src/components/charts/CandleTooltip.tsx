import { memo } from 'react';
import type { ChartPoint } from '../../lib/statistics';
import { cn } from '../../lib/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CandleTooltip = memo((props: any) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    const point = payload[0].payload as ChartPoint;
    if (point.isStart) return null;
    if (point.isFuture) {
      return (
        <div className={cn(
          "border p-2 rounded-xl",
          "bg-black/95 border-white/10"
        )}>
          <span className={cn("text-[10px] font-black", "text-white/40")}>{label}</span>
          <div className={cn("text-[9px] font-black uppercase tracking-widest mt-1", "text-white/20")}>Empty Space</div>
        </div>
      );
    }
    const isBullish = (point.close ?? 0) >= (point.open ?? 0);

    return (
      <div className={cn(
        "border p-3 rounded-2xl min-w-[140px]",
        "bg-black/95 border-white/10"
      )}>
        <div className={cn("flex justify-between items-center mb-2 border-b pb-1", "border-white/5")}>
          <span className={cn("text-[10px] font-black", "text-white/40")}>{label}</span>
          <span className={cn(
            "text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-widest",
            isBullish ? "bg-[#22c55e]/10 text-[#22c55e]" : "bg-[#ff3b30]/10 text-[#ff3b30]"
          )}>
            {isBullish ? 'Bullish' : 'Bearish'}
          </span>
        </div>
        <div className="space-y-1.5 font-sans">
          <div className="flex justify-between text-[10px]">
            <span className={cn("text-white/40")}>O:</span>
            <span className={cn("font-bold", "text-white")}>${point.open?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className={cn("text-white/40")}>H:</span>
            <span className="text-[#22c55e] font-bold">${point.high?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className={cn("text-white/40")}>L:</span>
            <span className="text-[#ff3b30] font-bold">${point.low?.toLocaleString() || '0'}</span>
          </div>
          <div className={cn("flex justify-between text-[10px] border-t pt-1 mt-1", "border-white/5")}>
            <span className={cn("text-white/40")}>C:</span>
            <span className={cn("font-black", isBullish ? "text-[#22c55e]" : "text-[#ff3b30]")}>
              ${point.close?.toLocaleString() || '0'}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
});
