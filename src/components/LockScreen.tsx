import { useState, useEffect, useCallback } from 'react';
import { Delete, ShieldCheck } from 'lucide-react';
import { cn, haptic } from '../lib/utils';
import logo from '../assets/app-logo-new.png';

interface LockScreenProps {
  onUnlock: () => void;
  theme?: 'light' | 'dark';
}

export function LockScreen({ onUnlock, theme = 'dark' }: LockScreenProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isSettingInitial, setIsSettingInitial] = useState(false);
  const [confirmPasscode, setConfirmPasscode] = useState('');

  const savedPasscode = localStorage.getItem('app_passcode');

  useEffect(() => {
    if (!savedPasscode) {
      setIsSettingInitial(true);
    }
  }, [savedPasscode]);

  const handleDelete = useCallback(() => {
    setPasscode(prev => prev.slice(0, -1));
    setError(false);
  }, []);

  const handleNumberClick = useCallback((num: string) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + num;
      setPasscode(newPasscode);
      setError(false);

      if (newPasscode.length === 4) {
        if (!isSettingInitial) {
          if (newPasscode === savedPasscode) {
            onUnlock();
          } else {
            setTimeout(() => {
              setPasscode('');
              setError(true);
            }, 200);
          }
        }
      }
    }
  }, [passcode, isSettingInitial, savedPasscode, onUnlock]);

  const handleSetPasscode = useCallback(() => {
    if (isSettingInitial && passcode.length === 4) {
      if (!confirmPasscode) {
        setConfirmPasscode(passcode);
        setPasscode('');
      } else {
        if (passcode === confirmPasscode) {
          localStorage.setItem('app_passcode', passcode);
          onUnlock();
        } else {
          setError(true);
          setPasscode('');
          setConfirmPasscode('');
        }
      }
    }
  }, [isSettingInitial, passcode, confirmPasscode, onUnlock]);

  useEffect(() => {
    if (isSettingInitial && passcode.length === 4 && confirmPasscode) {
      handleSetPasscode();
    } else if (isSettingInitial && passcode.length === 4 && !confirmPasscode) {
      const timer = setTimeout(() => {
        setConfirmPasscode(passcode);
        setPasscode('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [passcode, isSettingInitial, confirmPasscode, handleSetPasscode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Support number keys (0-9)
      if (/^[0-9]$/.test(e.key)) {
        handleNumberClick(e.key);
        haptic('light');
      }
      // Support Backspace
      else if (e.key === 'Backspace') {
        handleDelete();
        haptic('medium');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumberClick, handleDelete]);

  return (
    <div className="absolute inset-0 z-[100] backdrop-blur-3xl flex flex-col items-center justify-center animate-in fade-in duration-700 overflow-hidden bg-black/40">
      {/* High Quality Background Design - Uses App Background via Backdrop Blur */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
        {/* Grain/Noise Texture for Consistency */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="flex flex-col items-center mb-12">
          <div className="w-28 h-28 relative group">
            <div className="absolute inset-0 rounded-full blur-3xl transition-colors duration-500 bg-primary/5 group-hover:bg-primary/10" />
            <img 
              src={logo} 
              alt="Logo" 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_25px_rgba(255,215,0,0.15)]" 
            />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-4xl font-black tracking-tighter drop-shadow-sm text-white/90">FOX TRADE</h1>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
              {isSettingInitial 
                ? (confirmPasscode ? 'Confirm New Passcode' : 'Create Access Key')
                : (error ? 'Access Denied' : 'Restricted Access')
              }
            </p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-6 mb-16">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className={cn(
                "w-4 h-4 rounded-full border-2 transition-all duration-300",
                i < passcode.length 
                  ? (error ? "bg-red-500 border-red-500 scale-125 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "bg-primary border-primary scale-125 shadow-[0_0_15px_rgba(212,175,55,0.5)]")
                  : "border-white/10"
              )}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-8 sm:gap-12">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => { handleNumberClick(num); haptic('light'); }}
              className="w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all active:scale-90 border bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] text-white"
            >
              <span className="text-3xl font-bold">{num}</span>
            </button>
          ))}
          <div className="w-20 h-20" />
          <button
            onClick={() => { handleNumberClick('0'); haptic('light'); }}
            className="w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all active:scale-90 border bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] text-white"
          >
            <span className="text-3xl font-bold">0</span>
          </button>
          <button
            onClick={() => { handleDelete(); haptic('medium'); }}
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-90 text-white/40 hover:text-white"
          >
            <Delete className="w-8 h-8" />
          </button>
        </div>

        {!isSettingInitial && (
          <div className="mt-16 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Biometric Encrypted</span>
          </div>
        )}
      </div>
    </div>
  );
}
