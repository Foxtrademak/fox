import { Wallet } from "lucide-react";
import { haptic } from "../../lib/utils";
import { useSyncContext } from "../../context/SyncContext";
import { useSettings } from "../../context/SettingsContext";
import { useData } from "../../context/DataContext";

/**
 * Responsibility: Modal for setting the initial portfolio capital.
 * Smart Component: Pulls visibility from SettingsContext and value from DataContext.
 */
export function InitialCapitalModal() {
    const { setIsEditingInitial } = useSettings();
    const { initialCapital, setInitialCapital } = useData();
    const { syncImmediately } = useSyncContext();

    const handleUpdate = () => {
        setIsEditingInitial(false);
        haptic('medium');
        syncImmediately({ initialCapital });
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-[110] animate-fade-in backdrop-blur-xl" onClick={() => setIsEditingInitial(false)} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[120] w-[90%] max-w-sm bg-white/[0.05] border border-white/5 rounded-[2.5rem] p-10 animate-in zoom-in duration-300 shadow-2xl overflow-hidden backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[2.5rem] pointer-events-none" />
                <div className="w-16 h-16 bg-white/[0.05] border border-white/[0.05] rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Wallet className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-xl font-black text-center mb-2 text-white tracking-tighter">Portfolio Base</h3>
                <p className="text-[10px] font-black text-center mb-8 text-white/20 uppercase tracking-widest">Set starting balance</p>
                
                <div className="relative mb-8">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-white/10">$</span>
                    <input 
                        type="number" 
                        value={initialCapital} 
                        onChange={(e) => setInitialCapital(parseFloat(e.target.value) || 0)}
                        className="w-full bg-white/[0.05] border border-white/[0.05] rounded-[1.8rem] p-8 text-center text-4xl font-black text-white outline-none focus:border-primary/20 transition-all"
                        autoFocus
                    />
                </div>

                <button 
                    onClick={handleUpdate}
                    className="w-full py-5 bg-primary text-black rounded-[1.2rem] font-black uppercase tracking-[0.2em] text-xs shadow-[0_10px_30px_rgba(255,184,0,0.2)] active:scale-95 transition-all"
                >
                    Update Ledger
                </button>
            </div>
        </>
    );
}
