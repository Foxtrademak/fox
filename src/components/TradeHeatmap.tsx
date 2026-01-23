import { cn } from '../lib/utils';
import { type DailyRecord } from '../types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns';

interface TradeHeatmapProps {
  records: DailyRecord[];
}

export function TradeHeatmap({ records }: TradeHeatmapProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Empty slots for the start of the month to align with weekdays
  const startDayOfWeek = getDay(monthStart);
  const emptySlots = Array(startDayOfWeek).fill(null);

  const getRecordForDay = (date: Date) => {
    return records.find(r => isSameDay(new Date(r.date), date));
  };

  const getColorClass = (profitLoss: number | undefined) => {
    if (profitLoss === undefined) return "bg-white/[0.03] hover:bg-white/[0.08]";
    if (profitLoss > 0) {
      if (profitLoss > 500) return "bg-green-500/90 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
      if (profitLoss > 100) return "bg-green-500/60";
      return "bg-green-500/40";
    }
    if (profitLoss < 0) {
      const absLoss = Math.abs(profitLoss);
      if (absLoss > 500) return "bg-red-500/90 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
      if (absLoss > 100) return "bg-red-500/60";
      return "bg-red-500/40";
    }
    return "bg-yellow-500/60"; // Break even
  };

  return (
    <div className="ios-card !p-5 flex flex-col h-full !rounded-[2rem]">
      <div className="mb-6 flex items-center justify-between relative z-10">
        <div className="text-left">
          <h3 className="font-black text-lg tracking-tight mb-0.5 text-white">{format(today, 'MMMM yyyy')}</h3>
          <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] font-black">Daily Activity</p>
        </div>
        <div className="flex gap-2 items-center bg-black/20 px-3 py-1.5 rounded-xl border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[7px] font-black text-white/60 uppercase">Win</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="text-[7px] font-black text-white/60 uppercase">Loss</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative z-10 justify-center">
        <div className="grid grid-cols-7 gap-2 mb-3">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={`${day}-${i}`} className="text-[8px] font-black text-muted-foreground/30 text-center uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {emptySlots.map((_, i) => (
            <div key={`empty-${i}`} className="w-full aspect-square" />
          ))}

          {daysInMonth.map((day: Date) => {
            const record = getRecordForDay(day);
            const isToday = isSameDay(day, today);
            
            return (
              <div
                key={day.toString()}
                className={cn(
                  "w-full aspect-square rounded-lg transition-all duration-500 relative group/day cursor-pointer flex items-center justify-center border border-white/[0.03] active:scale-90",
                  getColorClass(record?.profitLoss),
                  isToday && "ring-1 ring-primary ring-offset-2 ring-offset-[#0a0a0c] !border-primary/50"
                )}
              >
                <span className={cn(
                  "text-[8px] font-black transition-colors duration-300",
                  record ? "text-white drop-shadow-sm" : "text-muted-foreground/20"
                )}>
                  {format(day, 'd')}
                </span>

                {/* Tooltip - iOS Style - Mobile Optimized */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1c1c1e]/95 backdrop-blur-2xl text-white text-[9px] rounded-xl border border-white/[0.1] shadow-xl opacity-0 group-hover/day:opacity-100 pointer-events-none transition-all duration-300 z-20 whitespace-nowrap font-black text-center min-w-[100px]">
                  <div className="opacity-40 mb-1 text-[7px] tracking-widest uppercase">{format(day, 'MMM d')}</div>
                  {record ? (
                    <div className={cn("text-xs", record.profitLoss >= 0 ? "text-green-400" : "text-red-400")}>
                      {record.profitLoss >= 0 ? '+' : '-'}${Math.abs(record.profitLoss).toLocaleString()}
                    </div>
                  ) : (
                    <div className="opacity-20 text-[7px] tracking-widest uppercase">No Data</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
