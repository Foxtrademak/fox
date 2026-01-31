import React, { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { haptic } from '../lib/utils';
import { usePasscode } from '../hooks/usePasscode';
import { PasscodeDots } from './lock/PasscodeDots';
import { LockKeypad } from './lock/LockKeypad';
import { LockHeader } from './lock/LockHeader';
import { useUI } from '../context/UIContext';

/**
 * Responsibility: Orchestrate the Lock Screen UI and interactions.
 * Smart Component: Pulls unlock logic from UIContext and business logic from usePasscode.
 */
const LockBackground = React.memo(function LockBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0" style={{ contain: 'strict' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-black/60" />
      <div className="absolute inset-0 border-t border-white/[0.05]" />
    </div>
  );
});

export const LockScreen = React.memo(function LockScreen() {
  const { setIsLocked } = useUI();
  
  const {
    passcode,
    error,
    isSettingInitial,
    confirmPasscode,
    handleNumberClick,
    handleDelete
  } = usePasscode({ onUnlock: () => setIsLocked(false) });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleNumberClick(e.key);
        haptic('light');
      } else if (e.key === 'Backspace') {
        handleDelete();
        haptic('medium');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumberClick, handleDelete]);

  return (
    <div 
         className="absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black/60"
         style={{ contain: 'strict' }}
       >
      <LockBackground />

      <div className="relative z-10 w-full flex flex-col items-center transform-gpu">
        <LockHeader 
          isSettingInitial={isSettingInitial}
          confirmPasscode={confirmPasscode}
          error={error}
        />

        <PasscodeDots 
          length={passcode.length}
          error={error}
        />

        <LockKeypad 
          onNumberClick={handleNumberClick}
          onDelete={handleDelete}
        />

        {!isSettingInitial && (
          <div className="mt-16 flex items-center gap-2 opacity-50">
            <ShieldCheck className="w-4 h-4 text-white/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Biometric Encrypted</span>
          </div>
        )}
      </div>
    </div>
  );
});
