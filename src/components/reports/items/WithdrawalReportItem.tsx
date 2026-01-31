import React from 'react';
import { cn } from '../../../lib/utils';
import { Clock, LogOut } from 'lucide-react';
import { Card } from '../../ui/Card';
import type { DailyRecord } from '../../../types';

interface WithdrawalReportItemProps {
  withdrawal: DailyRecord;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Rendering a single withdrawal report item with specific styling for outflows.
 */
export const WithdrawalReportItem: React.FC<WithdrawalReportItemProps> = React.memo(({ withdrawal, theme }) => {
  return (
    <Card 
      variant="mini"
      className={cn(
        "p-4 sm:p-5 flex flex-col gap-3 group relative overflow-hidden border-dashed",
        theme === 'light' ? "bg-white/40 border-slate-200" : "bg-white/[0.03] border-white/10"
      )}
    >
      <div className="flex items-center justify-between relative z-10">
        <div className={cn(
          "w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-500 group-hover:scale-110 transition-transform duration-500"
        )}>
          <LogOut className="w-4 sm:w-5 h-4 sm:h-5" />
        </div>
        <div className="text-right">
          <p className="text-base sm:text-xl font-black tracking-tighter leading-none text-red-500/80">
            -{Math.abs(withdrawal.profitLoss).toLocaleString()}
          </p>
          <p className={cn("text-[7px] sm:text-[8px] font-black uppercase tracking-widest mt-1", theme === 'light' ? "text-slate-400" : "text-white/10")}>Withdrawal</p>
        </div>
      </div>

      <div className="space-y-1 sm:space-y-1.5 text-left relative z-10">
        <h4 className={cn("text-[11px] sm:text-[13px] font-black truncate", theme === 'light' ? "text-slate-700" : "text-white/90")}>{withdrawal.notes || 'No notes'}</h4>
        <div className="flex items-center justify-between">
          <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-md bg-red-500/10 text-red-400">
            Outflow
          </span>
          <span className={cn("text-[9px] sm:text-[11px] font-black tracking-tighter", theme === 'light' ? "text-slate-400" : "text-white/40")}>Cash</span>
        </div>
      </div>

      <div className={cn("mt-3 sm:mt-4 pt-2 sm:pt-3 border-t flex items-center justify-between relative z-10", theme === 'light' ? "border-slate-100" : "border-white/[0.06]")}>
        <span className={cn("text-[8px] sm:text-[9px] font-bold tracking-tighter", theme === 'light' ? "text-slate-300" : "text-white/20")}>ID: {withdrawal.id.slice(-6)}</span>
        <div className={cn("flex items-center gap-1 sm:gap-1.5", theme === 'light' ? "text-slate-400" : "text-white/30")}>
          <Clock className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
          <span className="text-[9px] sm:text-[10px] font-bold tracking-tighter">{new Date(withdrawal.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
        </div>
      </div>
    </Card>
  );
});