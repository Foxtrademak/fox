import React from 'react';
import { cn } from '../../lib/utils';
import { Modal } from '../ui/Modal';
import { useUI } from '../../context/UIContext';
import { useSettings } from '../../context/SettingsContext';

/**
 * Responsibility: Display Application About Information.
 * Note: Now acts as a "Smart Component" pulling data directly from Contexts.
 */
export const AboutModal: React.FC = () => {
  const { theme, logo } = useUI();
  const { showAbout, setShowAbout } = useSettings();

  return (
    <Modal
      isOpen={showAbout}
      onClose={() => setShowAbout(false)}
      theme={theme}
      className="p-10"
    >
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mb-8 flex items-center justify-center">
          <img src={logo} alt="MAK GROUP" className="w-20 h-20 object-contain" />
        </div>

        <h3 className={cn("text-2xl font-black mb-2 tracking-tighter text-center uppercase", theme === 'light' ? "text-slate-900" : "text-white")}>FOX TRADE</h3>
        <div className="h-1 w-12 bg-primary rounded-full mb-8" />

        <div className="space-y-6 text-center px-4">
          <p className={cn("text-[11px] font-medium lowercase tracking-widest leading-relaxed", theme === 'light' ? "text-slate-600" : "text-white/60")}>
            all intellectual property rights for this software<br />
            are exclusively reserved for <span className="text-primary uppercase font-black tracking-normal text-[9px]">MAK GROUP</span>
          </p>

          <div className={cn("pt-6 border-t", theme === 'light' ? "border-black/5" : "border-white/[0.05]")}>
            <p className={cn("text-[8px] font-black uppercase tracking-[0.5em]", theme === 'light' ? "text-slate-400" : "text-white/30")}>© 2026 Exclusive Rights</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
