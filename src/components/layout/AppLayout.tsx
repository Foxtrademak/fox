import React from "react";
import { cn } from "../../lib/utils";
import { TabBar } from "../TabBar";
import { LockScreen } from "../LockScreen";
import { AppBackground } from "./AppBackground";
import { ModalOrchestrator } from "./ModalOrchestrator";
import { useUI } from "../../context/UIContext";

export interface AppLayoutProps {
    renderTabContent: () => React.ReactNode;
}

export const AppLayout = React.memo(function AppLayout({ renderTabContent }: AppLayoutProps) {
    const {
        theme,
        isLocked,
    } = useUI();

    return (
        <div className={cn(
            "h-screen font-sans selection:bg-primary/30 antialiased relative flex flex-col transition-colors duration-500",
            theme === 'dark' ? "bg-[#050507]" : "bg-[#f8f9fa]"
        )}>
            {/* iOS Glass Header - Fixed at top with safe area padding */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-[env(safe-area-inset-top)] pointer-events-none" />
            
            <AppBackground theme={theme} isBlurred={isLocked} />

            {isLocked ? (
                <LockScreen />
            ) : (
                <>
                    {/* Main Content Area */}
                    <main className="flex-1 overflow-y-auto relative z-10 pt-[calc(env(safe-area-inset-top)+2rem)] px-3 sm:px-6 custom-scroll pb-32">
                        <div className="relative z-10 max-w-[1400px] mx-auto">
                            {renderTabContent()}
                        </div>
                    </main>

                    {/* Bottom Gradient Fade */}
                    <div className={cn(
                        "fixed bottom-0 left-0 right-0 h-32 z-40 pointer-events-none bg-gradient-to-t",
                        theme === 'light' 
                            ? "from-[#f8f9fa] via-[#f8f9fa]/90 to-transparent" 
                            : "from-[#050507] via-[#050507]/90 to-transparent"
                    )} />

                    {/* iOS Tab Bar */}
                    <TabBar />
                </>
            )}

            {/* App-wide Modals */}
            <ModalOrchestrator />
        </div>
    );
});
