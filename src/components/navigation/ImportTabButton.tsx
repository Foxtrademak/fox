import { cn, haptic } from "../../lib/utils";
import { useUI } from "../../context/UIContext";
import { useImport } from "../../context/ImportContext";

/**
 * Responsibility: Central Import Button in the TabBar.
 * Smart Component: Pulls logo and import logic from contexts.
 */
export function ImportTabButton() {
  const { theme, logo } = useUI();
  const { fileInputRef, handleImportMT5 } = useImport();

  return (
    <div className="flex-1 flex items-center justify-center -mt-10 sm:-mt-14">
      <button 
        onClick={() => { fileInputRef.current?.click(); haptic('medium'); }}
        className={cn(
          "w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4 border shadow-[0_15px_35px_rgba(0,0,0,0.4)] active:scale-90 transition-all duration-300 flex items-center justify-center group relative overflow-hidden",
          theme === 'light' ? "bg-white/80 border-white/60" : "bg-white/[0.05] border-white/5"
        )}
      >
        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity", theme === 'light' ? "bg-black/5" : "bg-white/5")} />
        <img 
           src={logo} 
           alt="Logo" 
           className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" 
         />
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept=".xlsx,.xls" 
          onChange={handleImportMT5} 
        />
      </button>
    </div>
  );
}
