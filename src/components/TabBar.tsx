import React from 'react';
import { LayoutGrid, BarChart3, FileSpreadsheet, Settings } from "lucide-react";
import { cn } from "../lib/utils";
import { useUI } from "../context/UIContext";
import { TabButton } from "./navigation/TabButton";
import { ImportTabButton } from "./navigation/ImportTabButton";

/**
 * Responsibility: Main Navigation Bar Orchestrator (iOS Style).
 * Smart Component: Coordinates TabButton and ImportTabButton components.
 */
export const TabBar = React.memo(function TabBar() {
    const { theme } = useUI();

    return (
        <nav 
          className={cn(
            "fixed bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] left-4 right-4 z-50 border px-2 py-2 flex items-center justify-between rounded-[2.5rem] overflow-visible transition-all duration-500",
            theme === 'light' 
              ? "bg-gradient-to-b from-white/40 via-white/20 to-white/10 border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]" 
              : "bg-gradient-to-b from-white/15 via-white/5 to-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          )}
        >
            <TabButton tab="home" icon={LayoutGrid} />
            <TabButton tab="analytics" icon={BarChart3} />
            
            <ImportTabButton />

            <TabButton tab="reports" icon={FileSpreadsheet} />
            <TabButton tab="settings" icon={Settings} />
        </nav>
    );
});

