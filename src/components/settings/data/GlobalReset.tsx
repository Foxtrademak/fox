import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { cn } from '../../../lib/utils';

interface GlobalResetProps {
  onWipeTrades: () => void;
  onFactoryReset: () => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Major Data Reset Operations (Trades only or Full Reset)
 */
export const GlobalReset: React.FC<GlobalResetProps> = ({
  onWipeTrades,
  onFactoryReset,
  theme
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button 
        variant="ios-mini"
        onClick={onWipeTrades}
        hapticType="heavy"
        className={cn(
          "p-4 h-auto flex-col items-center gap-2",
          theme === 'light' ? "bg-red-50/50 border-red-100" : "bg-red-500/5 border-red-500/10"
        )}
      >
        <RotateCcw className="w-4 h-4 text-red-500/60" />
        <span className="text-[8px] font-black uppercase tracking-widest text-red-500/60">Wipe Trades</span>
      </Button>

      <Button 
        variant="danger"
        onClick={onFactoryReset}
        hapticType="heavy"
        className="p-4 h-auto flex-col items-center gap-2 rounded-[1.2rem]"
      >
        <AlertTriangle className="w-4 h-4" />
        <span className="text-[8px] font-black uppercase tracking-widest">Factory Reset</span>
      </Button>
    </div>
  );
};
