import { LogOut } from "lucide-react";
import { useTrade } from "../../context/TradeContext";

/**
 * Responsibility: Modal for recording a capital withdrawal.
 * Smart Component: Pulls withdrawal state and actions from TradeContext.
 */
export function WithdrawalModal() {
    const { 
        setIsAddingWithdrawal, 
        withdrawalAmount, 
        setWithdrawalAmount, 
        withdrawalNote, 
        setWithdrawalNote, 
        addWithdrawal 
    } = useTrade();

    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-[110] animate-fade-in backdrop-blur-xl" onClick={() => setIsAddingWithdrawal(false)} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[120] w-[90%] max-w-sm bg-white/[0.05] border border-white/5 rounded-[2.5rem] p-10 animate-in zoom-in duration-300 shadow-2xl backdrop-blur-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[2.5rem] pointer-events-none" />
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <LogOut className="w-8 h-8 text-red-500 rotate-90" />
                    </div>
                    <h3 className="text-xl font-black text-center mb-2 text-white tracking-tighter">Withdraw Profit</h3>
                    <p className="text-[10px] font-black text-center mb-8 text-white/20 uppercase tracking-widest">Specify the amount to withdraw</p>
                    
                    <div className="space-y-4">
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-white/10">$</span>
                            <input 
                                type="number" 
                                value={withdrawalAmount} 
                                onChange={(e) => setWithdrawalAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-white/[0.05] border border-white/[0.05] rounded-[1.8rem] p-8 text-center text-4xl font-black text-white outline-none focus:border-red-500/20 transition-all"
                                autoFocus
                            />
                        </div>
                        
                        <input 
                            type="text" 
                            value={withdrawalNote} 
                            onChange={(e) => setWithdrawalNote(e.target.value)}
                            placeholder="Notes (Optional)"
                            className="w-full bg-white/[0.05] border border-white/[0.05] rounded-[1.2rem] p-4 text-center text-sm font-medium text-white/60 outline-none focus:border-white/10 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-8">
                        <button 
                            onClick={() => setIsAddingWithdrawal(false)}
                            className="py-5 bg-white/[0.05] text-white/40 border border-white/[0.05] rounded-[1.2rem] font-black uppercase tracking-[0.2em] text-[10px] active:scale-95 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={addWithdrawal}
                            className="py-5 bg-red-500 text-white rounded-[1.2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_30px_rgba(239,68,68,0.2)] active:scale-95 transition-all"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
