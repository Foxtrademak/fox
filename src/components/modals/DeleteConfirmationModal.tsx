import { Trash2 } from "lucide-react";
import { useTrade } from "../../context/TradeContext";

/**
 * Responsibility: Modal for confirming record deletion.
 * Smart Component: Pulls deletion state and actions from TradeContext.
 */
export function DeleteConfirmationModal() {
    const { setRecordToDelete, confirmDelete } = useTrade();

    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-[200] animate-fade-in backdrop-blur-xl" onClick={() => setRecordToDelete(null)} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[210] w-[85%] max-w-xs bg-white/[0.05] border border-white/5 rounded-[2.5rem] p-8 animate-in zoom-in duration-300 shadow-2xl overflow-hidden backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[2.5rem] pointer-events-none" />
                
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Trash2 className="w-8 h-8 text-red-500 relative z-10" />
                </div>

                <h3 className="text-xl font-black text-center mb-2 text-white tracking-tighter">Confirm Deletion</h3>
                <p className="text-[10px] font-black text-center mb-8 text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                    Are you sure you want to revert this withdrawal? This action cannot be undone.
                </p>

                <div className="space-y-3">
                    <button 
                        onClick={confirmDelete}
                        className="w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_30px_rgba(239,68,68,0.2)] active:scale-95 transition-all"
                    >
                        Delete Permanently
                    </button>
                    <button 
                        onClick={() => setRecordToDelete(null)}
                        className="w-full py-4 bg-white/[0.05] text-white/60 border border-white/10 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all active:scale-95"
                    >
                        Keep Record
                    </button>
                </div>
            </div>
        </>
    );
}
