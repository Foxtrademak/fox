import React from 'react';
import { cn } from '../../lib/utils';
import { useUI } from '../../context/UIContext';
import { Card } from '../ui/Card';

interface GlassPortfolioCardProps {
  children: React.ReactNode;
}

export const GlassPortfolioCard: React.FC<GlassPortfolioCardProps> = ({ children }) => {
  const { isScrolled, theme } = useUI();

  return (
    <div className={cn(
      "relative group px-2 sm:px-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
      isScrolled ? "scale-[0.92] sm:scale-[0.95]" : "scale-100"
    )}>
      <Card className={cn(
        "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border-none outline-none ring-0 relative overflow-hidden will-change-[padding,transform,opacity]",
        theme === 'light' 
          ? "bg-primary/5 shadow-none" 
          : "bg-transparent shadow-none",
        isScrolled ? "pt-1.5 pb-1.5" : "pt-6 pb-10 shadow-2xl"
      )}>
        {/* Glass Edge Highlight */}
        <div 
          className="absolute -inset-[1px] rounded-[inherit] pointer-events-none opacity-80 bg-gradient-to-br from-white/60 via-transparent to-white/20 z-30"
          style={{
            maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px'
          }}
        />

        {/* Theme-based Edge Border Overlay */}
        <div className={cn(
          "absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-all duration-500",
          theme === 'light' ? "border-[0.2px] border-black/5" : "border-none",
        )} />

        <div className={cn(
          "relative z-10 flex flex-col items-center text-center space-y-2 sm:space-y-4 transition-all duration-500",
          isScrolled ? "pt-1 sm:pt-0" : "pt-12 sm:pt-0"
        )}>
          {/* Vertical Side Label */}
          <div className={cn(
            "absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 hidden sm:block transition-all duration-500",
            isScrolled ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"
          )}>
            <p className={cn(
              "text-[7px] font-black uppercase tracking-[0.5em] whitespace-nowrap",
              theme === 'light' ? "text-slate-900/10" : "text-white/10"
            )}>
              Portfolio Overview // 2024
            </p>
          </div>

          {children}
        </div>
      </Card>
    </div>
  );
};
