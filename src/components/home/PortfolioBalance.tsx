import React from 'react';
import { LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useUI } from '../../context/UIContext';
import { useData } from '../../context/DataContext';
import { useTrade } from '../../context/TradeContext';

export const PortfolioBalance = React.memo(function PortfolioBalance() {
  const { theme, isScrolled } = useUI();
  const { currentCapital } = useData();
  const { setIsAddingWithdrawal } = useTrade();
  return (
    <div className={cn(
      "flex flex-col items-center relative py-1 transition-all duration-500",
      isScrolled ? "flex-1 flex justify-center scale-100 sm:scale-90" : "gap-1 sm:gap-2"
    )}>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className={cn(
          "relative group/dollar transition-all duration-500",
          isScrolled ? "scale-75 opacity-40" : "scale-100"
        )}>
          <span className="text-xl xs:text-2xl sm:text-4xl font-extralight bg-gradient-to-b from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent select-none">
            $
          </span>
        </div>
        <h2 className={cn(
          "font-black tracking-tighter flex items-baseline transition-all duration-500", 
          theme === 'light' ? "text-slate-900" : "bg-gradient-to-b from-white via-white/80 to-white/30 bg-clip-text text-transparent",
          isScrolled ? "text-4xl sm:text-7xl" : "text-3xl xs:text-5xl sm:text-8xl"
        )}>
          {Math.floor(currentCapital).toLocaleString()}
          <span className={cn(
            "flex items-baseline relative group/balance-dec transition-all duration-500",
            theme === 'light' ? "text-primary" : "bg-gradient-to-b from-white via-white/80 to-white/30 bg-clip-text text-transparent",
            isScrolled ? "text-xl sm:text-xl" : "text-lg xs:text-xl sm:text-4xl"
          )}>
              <span className="mx-0.5">.</span>
              <span className="ml-0.5 tracking-tight">
                {((currentCapital % 1) * 100).toFixed(0).padStart(2, '0')}
              </span>
          </span>
          
          <Button 
             variant="ghost"
             onClick={(e) => { 
               e.stopPropagation();
               setIsAddingWithdrawal(true); 
             }}
             hapticType="medium"
             className={cn(
               "ml-3 sm:ml-6 flex items-center self-center p-0 min-h-0",
               isScrolled ? "hidden opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100"
             )}
           >
            <div className="relative flex items-center justify-center p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-red-500/10 border border-red-500/20 shadow-lg group-hover:bg-red-500/20 transition-colors">
              <LogOut className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-red-500 rotate-90" />
            </div>
          </Button>
        </h2>
      </div>
    </div>
  );
});
