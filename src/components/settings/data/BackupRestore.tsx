import React from 'react';
import { Download, Upload } from 'lucide-react';
import { Button } from '../../ui/Button';
import { cn } from '../../../lib/utils';

interface BackupRestoreProps {
  handleExportJSON: () => void;
  handleImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Backup (Export) and Restore (Import) JSON Data
 */
export const BackupRestore: React.FC<BackupRestoreProps> = ({
  handleExportJSON,
  handleImportJSON,
  theme
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        variant="ios-mini"
        onClick={handleExportJSON}
        hapticType="medium"
        className="flex items-center gap-3"
      >
        <Download className={cn("w-4 h-4 transition-colors", theme === 'light' ? "text-slate-400" : "text-white/40")} />
        <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'light' ? "text-slate-500" : "text-white/60")}>Backup</span>
      </Button>

      <label className="ios-card-mini overflow-visible flex items-center gap-3 group transition-all active:scale-95 cursor-pointer bg-white/40 border-white/60 dark:bg-white/[0.06] dark:border-white/10 rounded-2xl px-6 py-4">
        <Upload className={cn("w-4 h-4 group-hover:text-purple-400 transition-colors", theme === 'light' ? "text-slate-400" : "text-white/40")} />
        <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'light' ? "text-slate-500" : "text-white/60")}>Restore</span>
        <input type="file" className="hidden" accept=".json" onChange={handleImportJSON} />
      </label>
    </div>
  );
};
