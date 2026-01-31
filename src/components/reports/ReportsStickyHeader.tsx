import React from 'react';
import { cn } from '../../lib/utils';
import { useUI } from '../../context/UIContext';
import { Card } from '../ui/Card';

export const ReportsStickyHeader: React.FC = () => {
  const { isScrolled, logo, theme } = useUI();

  return (
    <>
      {/* Gradient Blur Effect */}
      <div className={cn("gradient-blur-header", isScrolled && "is-scrolled")} style={{ zIndex: 90 }} />

      <div className={cn(
        "sticky top-0 z-[100] transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]",
        isScrolled ? "pt-2 pb-0" : "pt-0 pb-2"
      )}>
        {/* Transparent Mask */}
        <div className={cn(
          "fixed inset-x-0 top-0 h-[120px] -z-10 transition-opacity duration-150 gpu-accelerated will-change-[opacity,backdrop-filter] pointer-events-none",
          isScrolled ? "opacity-100" : "opacity-0"
        )} style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
        }} />

        {/* Glass Edge Highlight (Optional: can be added here for consistency with Home) */}
        {isScrolled && (
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
        )}

        {/* Mobile Scrolled Logo */}
        <div className={cn(
          "hidden sm:hidden items-center justify-center mb-1 absolute left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled ? "flex opacity-100 -top-8" : "opacity-0 top-0 pointer-events-none"
        )}>
           <img 
             src={logo} 
             alt="App Logo" 
             className="w-8 h-8 object-contain opacity-80" 
           />
        </div>

        {/* Page Identity Badge */}
        <div className={cn(
          "flex flex-col items-center justify-center transition-all duration-500",
          isScrolled ? "opacity-0 h-0 overflow-hidden mb-0" : "opacity-100 h-auto mb-6"
        )}>
          <Card 
            variant="mini"
            className={cn(
              "inline-flex items-center gap-2.5 px-6 py-2 border rounded-full shadow-2xl",
              theme === 'light' ? "bg-black/[0.05] border-black/[0.05]" : "bg-white/[0.05] border border-white/[0.05]"
            )}
          >
            <p className={cn("text-[11px] font-black uppercase tracking-[0.5em]", theme === 'light' ? "text-slate-900/30" : "text-white/30")}>Trade Report</p>
          </Card>
        </div>
      </div>
    </>
  );
};
