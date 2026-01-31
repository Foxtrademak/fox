import { cn } from '../../lib/utils';
import { Lock } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useSecurityForm } from '../../hooks/useSecurityForm';
import { useUI } from '../../context/UIContext';
import { useSettings } from '../../context/SettingsContext';

/**
 * Responsibility: Handle Master Passcode Settings.
 * Note: Now acts as a "Smart Component" pulling data directly from Contexts.
 */
export const SecurityModal = () => {
  const { theme } = useUI();
  const {
    isChangingPass,
    setIsChangingPass,
    newPass,
    setNewPass,
    setPassword
  } = useSettings();

  const { handlePassChange, handleExecute } = useSecurityForm(
    newPass,
    setNewPass,
    setPassword,
    setIsChangingPass
  );

  return (
    <Modal
      isOpen={isChangingPass}
      onClose={() => setIsChangingPass(false)}
      theme={theme}
      title="Security Hub"
      subtitle="Set 4-digit master code"
      icon={<Lock className="w-8 h-8 text-primary/60" />}
    >
      <input
        type="password"
        maxLength={4}
        placeholder="••••"
        value={newPass}
        onChange={handlePassChange}
        className={cn(
          "relative z-10 w-full bg-transparent border-b-2 text-center text-4xl font-black tracking-[1em] py-4 outline-none transition-all placeholder:text-slate-200 focus:border-primary mb-10",
          theme === 'light' ? "border-slate-100 text-slate-800" : "border-white/10 text-white"
        )}
      />

      <div className="relative z-10 flex gap-4">
        <Button 
          variant="secondary"
          onClick={() => setIsChangingPass(false)}
          className="flex-1 p-5 rounded-[1.2rem]"
        >
          Cancel
        </Button>
        <Button 
          variant="primary"
          onClick={handleExecute}
          className="flex-1 p-5 rounded-[1.2rem]"
        >
          Execute
        </Button>
      </div>
    </Modal>
  );
};
