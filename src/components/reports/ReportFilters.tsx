import React from 'react';
import { cn, haptic } from '../../lib/utils';
import { TrendingDown, TrendingUp, Calendar, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useUI } from '../../context/UIContext';
import { useData } from '../../context/DataContext';
import { useSettings } from '../../context/SettingsContext';
import { useImport } from '../../context/ImportContext';
import { useReportData } from '../../hooks/useReportData';

/**
 * Responsibility: Filter UI and logic for reports.
 * Now a "Smart Component" pulling data from context and report hook.
 */
export const ReportFilters: React.FC = () => {
  const { theme, isScrolled } = useUI();
  const {
    reportTrades,
    records,
  } = useData();
  const {
    reportSearchQuery,
    reportStatusFilter,
    setReportStatusFilter,
  } = useSettings();
  const {
    reportDateFilter,
    reportSortOrder,
    setReportSortOrder,
    setReportDateFilter
  } = useImport();

  const reportFilterInputRef = React.useRef<HTMLInputElement>(null);

  const reportData = useReportData({
    reportTrades,
    reportDateFilter,
    reportSearchQuery,
    reportStatusFilter,
    records,
    reportSortOrder
  });

  const { counts } = reportData;

  if (reportTrades.length === 0 && !records.some(r => r.type === 'withdrawal')) {
    return null;
  }

  return (
    <div className={cn(
      "px-2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
      isScrolled ? "scale-[0.92] sm:scale-[0.95]" : "scale-100"
    )}>
      <Card className="overflow-visible p-2 sm:p-3 shadow-2xl transition-all duration-500">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Status Filters - Segmented Style */}
          <div className={cn(
            "flex-1 flex rounded-2xl p-1 gap-1",
            theme === 'light' ? "bg-black/5" : "bg-black/20"
          )}>
            <button 
              onClick={() => { setReportStatusFilter('all'); haptic('light'); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-500",
                reportStatusFilter === 'all' 
                  ? "bg-primary text-black font-black shadow-lg" 
                  : (theme === 'light' ? "text-slate-900/30 hover:text-slate-900/50" : "text-white/30 hover:text-white/50") + " font-bold"
              )}
            >
              <span className="text-[10px] uppercase tracking-widest">All</span>
              <span className={cn(
                "text-[9px] px-1.5 py-0.5 rounded-md",
                reportStatusFilter === 'all' ? "bg-black/10" : (theme === 'light' ? "bg-black/5" : "bg-white/5")
              )}>{counts.total}</span>
            </button>
            
            <button 
              onClick={() => { setReportStatusFilter('win'); haptic('light'); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-500",
                reportStatusFilter === 'win' 
                  ? "bg-green-500 text-white font-black shadow-lg shadow-green-500/20" 
                  : (theme === 'light' ? "text-slate-900/30 hover:text-slate-900/50" : "text-white/30 hover:text-white/50") + " font-bold"
              )}
            >
              <span className="text-[10px] uppercase tracking-widest">Wins</span>
              <span className={cn(
                "text-[9px] px-1.5 py-0.5 rounded-md",
                reportStatusFilter === 'win' ? "bg-black/10" : (theme === 'light' ? "bg-black/5" : "bg-white/5")
              )}>{counts.wins}</span>
            </button>

            <button 
              onClick={() => { setReportStatusFilter('loss'); haptic('light'); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-500",
                reportStatusFilter === 'loss' 
                  ? "bg-red-500 text-white font-black shadow-lg shadow-red-500/20" 
                  : (theme === 'light' ? "text-slate-900/30 hover:text-slate-900/50" : "text-white/30 hover:text-white/50") + " font-bold"
              )}
            >
              <span className="text-[10px] uppercase tracking-widest">Losses</span>
              <span className={cn(
                "text-[9px] px-1.5 py-0.5 rounded-md",
                reportStatusFilter === 'loss' ? "bg-black/10" : (theme === 'light' ? "bg-black/5" : "bg-white/5")
              )}>{counts.losses}</span>
            </button>
          </div>

          <div className={cn(
            "hidden lg:block w-px h-8 transition-all duration-500", 
            theme === 'light' ? "bg-black/[0.05]" : "bg-white/[0.05]",
            isScrolled ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )} />

          {/* Secondary Controls */}
          <div className={cn(
            "flex items-center gap-2 transition-all duration-500",
            isScrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
          )}>
            {/* Sort Toggle */}
            <Button 
              variant="ios-mini"
              onClick={() => {
                setReportSortOrder((prev: 'desc' | 'asc') => prev === 'desc' ? 'asc' : 'desc');
              }}
              hapticType="light"
              className="flex-1 lg:flex-none flex items-center gap-3 px-5 py-3 group"
            >
              <div className="w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                {reportSortOrder === 'desc' ? (
                  <TrendingDown className="w-3 h-3 text-primary" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-primary" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                theme === 'light' ? "text-slate-600" : "text-white/60"
              )}>
                {reportSortOrder === 'desc' ? 'Newest' : 'Oldest'}
              </span>
            </Button>

            {/* Date Filter */}
            <div 
              onClick={() => {
                haptic('light');
                try {
                  reportFilterInputRef.current?.showPicker();
                } catch {
                  reportFilterInputRef.current?.click();
                }
              }}
              className="flex-1 lg:flex-none relative group flex items-center gap-3 px-5 py-3 ios-card-mini overflow-visible transition-all cursor-pointer bg-white/40 border-white/60 dark:bg-white/[0.06] dark:border-white/10"
            >
              <div className="w-5 h-5 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Calendar className="w-3 h-3 text-amber-500" />
              </div>
              <input 
                ref={reportFilterInputRef}
                type="date" 
                value={reportDateFilter}
                onChange={(e) => {
                  setReportDateFilter(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer w-full lg:w-auto",
                  theme === 'light' ? "text-slate-600 [color-scheme:light]" : "text-white/60 [color-scheme:dark]"
                )}
              />
              {reportDateFilter && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setReportDateFilter('');
                    haptic('medium');
                  }}
                  className="ml-1 p-0.5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-3 h-3 text-white/40" />
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
