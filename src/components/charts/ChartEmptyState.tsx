import React from 'react';
import { Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChartEmptyStateProps {
  className?: string;
}

export const ChartEmptyState = React.memo(({ className }: ChartEmptyStateProps) => {
  return (
    <div className={cn(
      "h-full w-full flex flex-col items-center justify-center text-muted-foreground border ios-card",
      "bg-transparent border-white/[0.05]",
      className
    )}>
      <Activity className="w-10 h-10 mb-4 opacity-10" />
      <p className="font-black uppercase tracking-[0.2em] text-[10px] opacity-20">Waiting for more data...</p>
    </div>
  );
});
