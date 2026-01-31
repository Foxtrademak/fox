import React from 'react';
import type { LucideIcon } from "lucide-react";
import { cn, haptic } from "../../lib/utils";
import { useUI } from "../../context/UIContext";

interface TabButtonProps {
  tab: 'home' | 'analytics' | 'reports' | 'settings';
  icon: LucideIcon;
}

/**
 * Responsibility: Individual Navigation Tab Button.
 * Smart Component: Pulls navigation state and theme from UIContext.
 */
export const TabButton = React.memo(function TabButton({ tab, icon: Icon }: TabButtonProps) {
  const { theme, activeTab, setActiveTab, setIsScrolled } = useUI();

  const handleTabChange = () => {
    setActiveTab(tab);
    setIsScrolled(false);
    haptic('light');
  };

  const isActive = activeTab === tab;

  return (
    <button 
      onClick={handleTabChange} 
      className="flex-1 flex justify-center group py-1"
    >
      <div className={cn(
        "p-2.5 sm:p-3.5 transition-all duration-300 rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center justify-center min-w-[50px] sm:min-w-[70px]",
        isActive 
          ? (theme === 'light' ? "bg-black/[0.05] text-slate-900 shadow-xl scale-110 border border-black/5" : "bg-white/[0.05] text-white shadow-xl scale-110 border border-white/10")
          : (theme === 'light' ? "text-slate-900/20 group-hover:text-slate-900/40" : "text-white/20 group-hover:text-white/40")
      )}>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
    </button>
  );
});
