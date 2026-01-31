import React from 'react';
import { cn } from '../../lib/utils';
import { Settings } from 'lucide-react';
import { Card } from '../ui/Card';

interface SettingsHeaderProps {
  isScrolled: boolean;
  logo: string;
  theme: 'light' | 'dark';
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  isScrolled,
  logo,
  theme
}) => {
  return (
    <div className={cn(
        "sticky top-0 z-[100] transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]",
        isScrolled ? "pt-2 pb-0" : "pt-0 pb-2"
      )}>
      {/* Transparent Mask - Provides smooth blur transition behind sticky elements */}
      <div className={cn(
          "fixed inset-x-0 top-0 h-[120px] -z-10 transition-opacity duration-150 gpu-accelerated will-change-[opacity,backdrop-filter] pointer-events-none",
          isScrolled ? "opacity-100" : "opacity-0"
        )} style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
        }} />

      {/* Mobile Scrolled: Logo - Above the Card */}
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

      <div className={cn(
        "flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        isScrolled ? "opacity-0 h-0 overflow-hidden mb-0 scale-90" : "opacity-100 h-auto mb-8 scale-100"
      )}>
        <Card 
          variant="mini"
          className={cn(
            "w-16 h-16 overflow-visible p-0 flex items-center justify-center mb-4 shadow-2xl relative group transition-all duration-500",
            theme === 'light' ? "bg-white/60 border border-white/50 shadow-lg" : "bg-white/[0.06] border border-white/10",
            isScrolled ? "w-12 h-12 mb-2" : "w-16 h-16 mb-4"
          )}
        >
          <Settings className={cn("text-primary animate-spin-slow relative z-10 transition-all duration-500", isScrolled ? "w-6 h-6" : "w-8 h-8")} />
        </Card>
        
        <div className="flex flex-col items-center space-y-0.5">
          <div className={cn(
            "flex items-center gap-1.5 mb-0.5 transition-all duration-500",
            isScrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
          )}>
            <p className={cn("text-[8px] font-black uppercase tracking-[0.3em]", theme === 'light' ? "text-slate-400" : "text-white/20")}>Control Center</p>
          </div>
          <h2 className={cn(
            "font-black tracking-tighter uppercase leading-none transition-all duration-500", 
            theme === 'light' ? "text-slate-800" : "text-white",
            isScrolled ? "text-xl" : "text-2xl"
          )}>
            App <span className="text-primary/70">Settings</span>
          </h2>
        </div>
      </div>
    </div>
  );
};
