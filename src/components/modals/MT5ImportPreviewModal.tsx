import { X } from 'lucide-react';
import { cn, haptic } from '../../lib/utils';
import { useUI } from '../../context/UIContext';
import { useImport } from '../../context/ImportContext';

/**
 * Responsibility: Modal for previewing MT5 report data before final ingestion.
 * Smart Component: Pulls data and actions directly from contexts.
 */
export function MT5ImportPreviewModal() {
  const { theme, logo } = useUI();
  const { mt5Preview, setMt5Preview, confirmMT5Import } = useImport();

  if (!mt5Preview) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 z-[130] animate-fade-in backdrop-blur-xl" 
        onClick={() => setMt5Preview(null)} 
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[140] w-[95%] max-w-lg">
        <div className={cn(
          "relative w-full border-none rounded-[2.5rem] p-8 animate-in zoom-in duration-300 shadow-2xl overflow-hidden backdrop-blur-2xl",
          theme === 'light' ? "bg-white/80" : "bg-white/[0.05]"
        )}>
          {/* Glass Edge Border Overlay */}
          <div className={cn(
            "absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-all duration-500",
            theme === 'light' ? "border-[0.5px] border-black/5" : "border-[0.5px] border-white/20",
            "shadow-[inset_0_0_1px_rgba(255,255,255,0.1)]"
          )} />

          <div className="relative z-10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        
            <div className="flex flex-col items-center mb-10 pt-4 relative">
              <button 
                onClick={() => { setMt5Preview(null); haptic('light'); }} 
                className="absolute -top-2 -right-2 w-8 h-8 bg-white/[0.06] border border-white/[0.05] rounded-full flex items-center justify-center text-white/20 hover:text-white/40 transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-24 h-24 mb-4 relative flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-full h-full object-contain relative z-10 opacity-100" />
              </div>
          
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.05] border border-white/[0.05] rounded-full mb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Data Ingestion</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/[0.05] border border-white/[0.05] rounded-2xl p-5 text-left relative overflow-hidden">
                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1 text-left">Trade Performance</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-black text-white">{mt5Preview.tradeCount}</p>
                  <p className="text-[10px] font-bold text-white/20 uppercase">Total</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                    <span className="text-[10px] font-black text-green-500/50">{mt5Preview.winCount}W</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    <span className="text-[10px] font-black text-red-500/50">{mt5Preview.lossCount}L</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/[0.05] border border-white/[0.05] rounded-2xl p-5 text-left relative overflow-hidden">
                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1 text-left">Net Result</p>
                <p className={cn("text-2xl font-black", mt5Preview.totalProfit >= 0 ? "text-green-500/70" : "text-red-500/70")}>
                  ${mt5Preview.totalProfit.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <div className={cn("w-1 h-1 rounded-full", mt5Preview.totalProfit >= 0 ? "bg-green-500" : "bg-red-500")} />
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Calculated P/L</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/[0.06] rounded-xl flex items-center justify-between">
                <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Commission</span>
                <span className="text-[10px] font-black text-red-500/40">${mt5Preview.totalCommission.toLocaleString()}</span>
              </div>
              <div className="flex-1 px-4 py-2 bg-white/[0.05] border border-white/[0.06] rounded-xl flex items-center justify-between">
                <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Swap</span>
                <span className="text-[10px] font-black text-white/40">${mt5Preview.totalSwap.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] text-left ml-1">Trade Sample (First 3)</p>
              {mt5Preview.trades.slice(0, 3).map((trade, i) => {
                const netTradeProfit = trade.profit;
                return (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.05] border border-white/[0.06] rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-1 h-8 rounded-full", netTradeProfit >= 0 ? "bg-green-500/30" : "bg-red-500/30")} />
                      <div className="text-left">
                        <p className="text-[11px] font-black text-white/80 uppercase">{trade.symbol}</p>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">{trade.type} // {trade.volume} Lot</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-black", netTradeProfit >= 0 ? "text-green-500/60" : "text-red-500/60")}>
                        {netTradeProfit >= 0 ? '+' : ''}{netTradeProfit.toFixed(2)}
                      </p>
                      <p className="text-[8px] font-bold text-white/10 uppercase">
                        Profit Only
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { setMt5Preview(null); haptic('light'); }}
                className={cn(
                  "py-5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                  theme === 'light' ? "bg-black/[0.06] border-black/[0.05] text-slate-900/40 hover:bg-black/10" : "bg-white/[0.06] border-white/[0.05] text-white/40 hover:bg-white/10"
                )}
              >
                Cancel
              </button>
              <button 
                onClick={() => { confirmMT5Import(); haptic('medium'); }}
                className="py-5 rounded-2xl bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-[0_10px_30px_rgba(255,184,0,0.15)]"
              >
                Import All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
