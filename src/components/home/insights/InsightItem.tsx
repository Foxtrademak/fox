import { Sparkles, AlertTriangle } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { SmartInsight } from '../../../lib/statistics';
import { Card } from '../../ui/Card';
import { useInsightTheme } from '../../../hooks/useInsightTheme';

interface InsightItemProps {
  insight: SmartInsight;
  theme: 'light' | 'dark';
}

export function InsightItem({ insight, theme }: InsightItemProps) {
  const { cardClass, iconContainerClass, titleClass, messageClass } = useInsightTheme(theme, insight.type);

  return (
    <Card 
      variant="mini" 
      className={cn("flex items-start gap-3 sm:gap-4 p-4", cardClass)}
    >
      <div className={cn(
        "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border",
        iconContainerClass
      )}>
        {insight.type === 'success' ? <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" /> : <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className={cn("text-[10px] sm:text-[11px] font-black uppercase tracking-widest mb-1", titleClass)}>
          {insight.title}
        </h4>
        <p className={cn("text-[9px] sm:text-[10px] font-bold leading-relaxed", messageClass)}>
          {insight.message}
        </p>
      </div>
    </Card>
  );
}
