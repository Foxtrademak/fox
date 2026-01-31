import React from 'react';
import { cn } from '../../../lib/utils';
import { Clock } from 'lucide-react';
import { Card } from '../../ui/Card';
import type { MT5Trade } from '../../../types';

interface TradeReportItemProps {
  trade: MT5Trade;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Rendering a single MT5 trade report item with specific styling for wins/losses.
 */
export const TradeReportItem: React.FC<TradeReportItemProps> = React.memo(({ trade, theme }) => {
  const isWin = trade.profit >= 0;

  return (
    <Card 
      variant="mini"
      className={cn(
        "p-4 sm:p-5 flex flex-col gap-3 group relative overflow-hidden",
        theme === 'light' ? "bg-white/40" : "bg-white/[0.03]"
      )}
    >
      {/* Progress Background Effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-[0.03]",
          isWin ? "bg-green-500" : "bg-red-500"
        )}
        style={{ width: '100%' }}
      />

      <div className="flex items-center justify-between relative z-10">
        <div className={cn(
          "w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center font-black text-[10px] sm:text-[12px] border group-hover:scale-110 transition-transform duration-500",
          isWin 
            ? "bg-green-500/10 border-green-500/20 text-green-500" 
            : "bg-red-500/10 border-red-500/20 text-red-500"
        )}>
          {trade.symbol.substring(0, 2).toUpperCase()}
        </div>
        <div className="text-right">
          <p className={cn("text-base sm:text-xl font-black tracking-tighter leading-none", isWin ? "text-green-500/80" : "text-red-500/80")}>
            {isWin ? '+' : ''}{trade.profit.toLocaleString()}
          </p>
          <p className={cn("text-[7px] sm:text-[8px] font-black uppercase tracking-widest mt-1", theme === 'light' ? "text-slate-400" : "text-white/10")}>Profit</p>
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5 text-left relative z-10">
        <h4 className={cn("text-[11px] sm:text-[13px] font-black truncate", theme === 'light' ? "text-slate-700" : "text-white/90")}>{trade.symbol}</h4>
        <div className="flex items-center justify-between">
          <span className={cn(
            "text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-md",
            trade.type === 'Buy' ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"
          )}>
            {trade.type}
          </span>
          <span className={cn("text-[9px] sm:text-[11px] font-black tracking-tighter", theme === 'light' ? "text-slate-400" : "text-white/40")}>{trade.volume}L</span>
        </div>
      </div>

      <div className={cn("mt-3 sm:mt-4 pt-2 sm:pt-3 border-t flex items-center justify-between relative z-10", theme === 'light' ? "border-slate-100" : "border-white/[0.06]")}>
        <span className={cn("text-[8px] sm:text-[9px] font-bold tracking-tighter", theme === 'light' ? "text-slate-300" : "text-white/20")}>#{trade.positionId.slice(-6)}</span>
        <div className={cn("flex items-center gap-1 sm:gap-1.5", theme === 'light' ? "text-slate-400" : "text-white/30")}>
          <Clock className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
          <span className="text-[9px] sm:text-[10px] font-bold tracking-tighter">{trade.closeTime.split(' ')[1].substring(0, 5)}</span>
        </div>
      </div>
    </Card>
  );
});