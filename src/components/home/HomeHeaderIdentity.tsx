import React from 'react';
import { cn } from '../../lib/utils';
import { useUI } from '../../context/UIContext';

export const HomeHeaderIdentity = React.memo(function HomeHeaderIdentity() {
  const { isScrolled, theme, logo } = useUI();

  return (
    <>
      {/* App Logo & Name - Left Side (Visible on scroll) */}
      <div className={cn(
        "hidden sm:flex items-center gap-3 transition-all duration-500",
        isScrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
      )}>
        <img 
          src={logo} 
          alt="App Logo" 
          className="w-10 h-10 object-contain" 
        />
        <div className="flex flex-col items-start">
          <span className={cn(
            "text-sm font-black tracking-tighter uppercase leading-none",
            theme === 'light' ? "text-slate-900" : "text-white"
          )}>FoxTrade</span>
          <span className="text-[7px] font-black tracking-[0.3em] uppercase opacity-30 text-primary">Terminal</span>
        </div>
      </div>

      {/* Performance Badge - Right Side (Hidden on scroll) */}
      <div className={cn(
        "hidden sm:flex items-center gap-2 transition-all duration-500",
        isScrolled ? "opacity-0 translate-x-4 pointer-events-none" : "opacity-100 translate-x-0"
      )}>
        <div className={cn(
          "px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest",
          theme === 'light' ? "bg-black/5 border-black/5 text-slate-900" : "bg-white/5 border-white/5 text-white"
        )}>
          Live Performance
        </div>
      </div>
    </>
  );
});
