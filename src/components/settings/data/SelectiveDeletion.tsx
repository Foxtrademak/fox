import React from 'react';
import { FileText, Calendar, Trash2 } from 'lucide-react';
import { Card } from '../../ui/Card';
import { cn, haptic } from '../../../lib/utils';

interface SelectiveDeletionProps {
  reportDeleteInputRef: React.RefObject<HTMLInputElement | null>;
  reportDeleteDate: string;
  setReportDeleteDate: (val: string) => void;
  onInitiateDelete: () => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Selective Data Deletion by Date
 */
export const SelectiveDeletion: React.FC<SelectiveDeletionProps> = ({
  reportDeleteInputRef,
  reportDeleteDate,
  setReportDeleteDate,
  onInitiateDelete,
  theme
}) => {
  return (
    <Card className="w-full flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500/10 ios-card-mini overflow-visible p-0 flex items-center justify-center border border-amber-500/20">
            <FileText className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-1 h-1 rounded-full bg-amber-500/40" />
              <p className={cn("text-[7px] font-black uppercase tracking-[0.2em]", theme === 'light' ? "text-amber-600" : "text-white/10")}>Selective Wipe</p>
            </div>
            <span className={cn("text-xs font-black uppercase tracking-widest", theme === 'light' ? "text-amber-700" : "text-amber-500/70")}>Delete <span className="text-amber-500/50">By Date</span></span>
          </div>
        </div>
        
        <div 
          onClick={() => {
            haptic('light');
            try {
              reportDeleteInputRef.current?.showPicker();
            } catch {
              reportDeleteInputRef.current?.click();
            }
          }}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer hover:scale-105 active:scale-95",
            theme === 'light' ? "bg-white border-slate-100" : "bg-white/[0.03] border-white/5"
          )}
        >
          <Calendar className="w-3 h-3 text-amber-500/60" />
          <input 
            ref={reportDeleteInputRef}
            type="date" 
            value={reportDeleteDate}
            onChange={(e) => setReportDeleteDate(e.target.value)}
            className={cn(
              "bg-transparent text-[9px] font-black uppercase tracking-widest outline-none cursor-pointer w-24",
              theme === 'light' ? "text-slate-500 [color-scheme:light]" : "text-white/40 [color-scheme:dark]"
            )}
          />
        </div>
      </div>

      {reportDeleteDate && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <button 
            onClick={onInitiateDelete}
            className="w-full py-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-amber-500/20 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Wipe Records for {reportDeleteDate}
          </button>
        </div>
      )}
    </Card>
  );
};
