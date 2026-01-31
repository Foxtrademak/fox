import React from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { useUI } from '../../context/UIContext';
import { useData } from '../../context/DataContext';
import { useTrade } from '../../context/TradeContext';

export const OperationStream = React.memo(function OperationStream() {
  const { theme } = useUI();
  const { recordsWithBalance, records } = useData();
  const { deleteRecord } = useTrade();
  return (
    <div className="space-y-4 px-2 sm:px-0">
      <div className="flex flex-col items-center justify-center mb-4">
        <SectionLabel label="Operation Stream" theme={theme} />
      </div>
      
      <div className="space-y-3 transform-gpu">
        {recordsWithBalance.slice(0, 5).map((record) => (
          <Card 
            key={record.id} 
            variant="mini"
            className="flex items-center gap-5 p-5 transition-all group shadow-xl overflow-visible transform-gpu"
            style={{ contain: 'layout paint' }}
          >
            <div className={cn(
              "w-1.5 h-10 rounded-full",
              record.type === 'withdrawal' ? "bg-amber-500/40" :
              record.profitLoss >= 0 ? "bg-green-500/40" : "bg-red-500/40"
            )} />
            <div className="flex-1 flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={cn("text-[11px] font-black uppercase tracking-tight", theme === 'light' ? "text-slate-900/80" : "text-white/80")}>
                    {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  {record.type === 'withdrawal' && (
                    <Badge variant="warning" className="text-[7px]">Withdrawal</Badge>
                  )}
                </div>
                <p className={cn("text-[9px] font-bold uppercase tracking-[0.1em] truncate max-w-[150px]", theme === 'light' ? "text-slate-900/20" : "text-white/20")}>
                  {record.notes || (record.type === 'withdrawal' ? 'Profit Withdrawal' : 'No meta data')}
                </p>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <div className={cn(
                    "text-xl font-black tracking-tighter", 
                    record.type === 'withdrawal' ? "text-amber-500/60" :
                    record.profitLoss >= 0 ? "text-green-500/60" : "text-red-500/60"
                  )}>
                    {record.type === 'withdrawal' ? '-' : (record.profitLoss >= 0 ? '+' : '')}{Math.abs(record.profitLoss).toLocaleString()}
                  </div>
                  <p className={cn("text-[10px] font-black uppercase tracking-tighter", theme === 'light' ? "text-slate-900/10" : "text-white/10")}>
                    BAL // {record.capitalAfter.toLocaleString()}
                  </p>
                </div>
                {record.type === 'withdrawal' && (
                  <Button 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRecord(record.id);
                    }}
                    hapticType="medium"
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500/40 hover:text-red-500 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
        {records.length === 0 && (
          <Card 
            className="py-20 flex flex-col items-center justify-center border ios-card overflow-visible shadow-2xl"
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-6 border",
              theme === 'light' ? "bg-black/[0.05] border-black/[0.05]" : "bg-white/[0.05] border-white/[0.05]"
            )}>
              <div className={cn("w-6 h-6 flex items-center justify-center", theme === 'light' ? "text-slate-900/10" : "text-white/10")}>
                <div className={cn("w-4 h-4 border-2 rounded-full", theme === 'light' ? "border-black/20" : "border-white/20")} />
              </div>
            </div>
            <p className={cn("text-[10px] font-black uppercase tracking-[0.5em]", theme === 'light' ? "text-slate-900/20" : "text-white/20")}>No active stream</p>
          </Card>
        )}
      </div>
    </div>
  );
});
