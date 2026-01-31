import React from 'react';
import { cn } from '../../lib/utils';
import { useUI } from '../../context/UIContext';

export const MarketSessions = React.memo(function MarketSessions() {
  const { sessions, theme, isScrolled } = useUI();
  return (
    <div className={cn(
      "transition-all duration-500",
      isScrolled ? "flex-none order-first opacity-100 w-full sm:w-auto flex flex-col items-center justify-center" : "w-full mb-2 opacity-100 h-auto"
    )}>
      {/* Mobile Scrolled: Text Only */}
      <div className={cn(
        "hidden sm:hidden items-center gap-2 mb-1 transition-all duration-500",
        isScrolled ? "flex opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}>
         <span className={cn(
            "text-[9px] uppercase tracking-[0.2em] font-bold opacity-50",
            theme === 'light' ? "text-slate-900" : "text-white"
          )}>
            {sessions.map(s => s.name).join(' • ')}
          </span>
      </div>

      {/* Mobile: Grid Layout - Hidden on scroll */}
      <div className={cn(
        "flex sm:hidden px-1 transition-all duration-500",
        isScrolled ? "hidden" : "grid grid-cols-2 gap-1.5 w-full"
      )}>
        {sessions.map((session) => (
          <div key={session.name} className={cn(
            "transition-all duration-300 flex items-center gap-1",
            !session.active && "opacity-20",
            "p-1.5 rounded-lg border bg-white/[0.05] border-white/[0.05]"
          )}>
            <div className={cn(
              "rounded-full",
              session.active ? "bg-primary" : "bg-white/20",
              "w-1 h-1"
            )} />
            <span className={cn(
              "font-black uppercase tracking-tight",
              session.active ? "text-primary" : theme === 'light' ? "text-slate-900/30" : "text-white/30",
              "text-[8px]"
            )}>
              {session.name}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop: Horizontal Layout */}
      <div className={cn(
        "hidden sm:flex items-center transition-all duration-500",
        isScrolled ? "gap-4" : "justify-center gap-8 lg:gap-12 w-full"
      )}>
        {sessions.map((session) => (
          <div key={session.name} className="flex items-center gap-2 group/session">
            <div className={cn(
              "rounded-full transition-all duration-500",
              session.active 
                ? "bg-primary" 
                : theme === 'light' ? "bg-black/10" : "bg-white/10",
              isScrolled ? "w-1 h-1" : "w-1.5 h-1.5"
            )} />
            <span className={cn(
              "font-black uppercase tracking-[0.2em] transition-colors duration-300",
              session.active ? "text-primary" : theme === 'light' ? "text-slate-900/40" : "text-white/40",
              isScrolled ? "text-[8px]" : "text-[11px]"
            )}>
              {session.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
