import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Card } from '../../ui/Card';

interface ReportEmptyStateProps {
  theme: 'light' | 'dark';
}

/**
 * Responsibility 4: Empty State Handling
 * Displays a beautiful card when no reports are found
 */
export const ReportEmptyState: React.FC<ReportEmptyStateProps> = ({ theme }) => {
  return (
    <Card className={cn(
      "flex flex-col items-center justify-center py-20 border-dashed",
      theme === 'light' ? "bg-white/30" : "bg-white/[0.05]"
    )}>
      <FileSpreadsheet className={cn("w-16 h-16 mb-4", theme === 'light' ? "text-slate-300" : "text-white/5")} />
      <p className={cn("font-black uppercase tracking-widest text-[10px]", theme === 'light' ? "text-slate-400" : "text-white/20")}>
        No activity found
      </p>
      <p className={cn("text-xs mt-2", theme === 'light' ? "text-slate-400" : "text-white/10")}>
        Trades and withdrawals will appear here
      </p>
    </Card>
  );
};
