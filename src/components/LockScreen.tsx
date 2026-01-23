import { useState, useEffect } from 'react';
import { Lock, Delete, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import logo from '/app-logo-new.png';

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
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

  const handleNumberClick = (num: string) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + num;
      setPasscode(newPasscode);
      setError(false);

      if (newPasscode.length === 4) {
        if (isSettingInitial) {
          // Handled in useEffect
        } else {
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
  };

  const handleSetPasscode = () => {
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
  };

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
  }, [passcode, isSettingInitial, confirmPasscode]);

  const handleDelete = () => {
    setPasscode(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="absolute inset-0 z-[100] bg-[#0a0a0c]/80 backdrop-blur-[40px] flex flex-col items-center justify-center animate-in fade-in duration-700 overflow-hidden">
      {/* Background Logo (Watermark) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <img src={logo} alt="" className="w-[120%] h-[120%] object-contain opacity-[0.03] grayscale blur-sm scale-150 rotate-12" />
      </div>

      <div className="w-full max-w-xs flex flex-col items-center gap-12 relative z-10">
        {/* Logo Area */}
        <div className="flex flex-col items-center gap-6 mb-4">
          <div className="w-28 h-28 relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <img src={logo} alt="Logo" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-white">FOX TRADE</h1>
            <div className="flex items-center justify-center gap-2 px-4 py-1.5 bg-white/[0.03] rounded-full border border-white/[0.05] backdrop-blur-md">
              <Lock className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">Secure Login</span>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center space-y-6">
          <h2 className="text-sm font-black text-white/40 uppercase tracking-[0.2em]">
            {isSettingInitial 
              ? (confirmPasscode ? 'Confirm Code' : 'Set New Code')
              : 'Enter Code'}
          </h2>
          <div className="flex gap-6 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-3.5 h-3.5 rounded-full border-2 transition-all duration-300",
                  passcode.length >= i 
                    ? "bg-white border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                    : "border-white/10 bg-white/5",
                  error && "border-red-500 bg-red-500 animate-shake shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                )}
              />
            ))}
          </div>
          {error && (
            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest animate-in slide-in-from-top-2">
              {isSettingInitial ? 'Codes do not match' : 'Incorrect code'}
            </p>
          )}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 w-full px-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="w-20 h-20 rounded-full glass-morphism flex items-center justify-center text-3xl font-medium text-white hover:bg-white/[0.1] active:scale-90 active:bg-white/[0.2] transition-all duration-200 shadow-xl"
            >
              {num}
            </button>
          ))}
          <div className="w-20 h-20" /> {/* Spacer */}
          <button
            onClick={() => handleNumberClick('0')}
            className="w-20 h-20 rounded-full glass-morphism flex items-center justify-center text-3xl font-medium text-white hover:bg-white/[0.1] active:scale-90 active:bg-white/[0.2] transition-all duration-200 shadow-xl"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-20 h-20 rounded-full flex items-center justify-center text-white/40 hover:text-white/60 active:scale-90 transition-all duration-200"
          >
            <Delete className="w-8 h-8" />
          </button>
        </div>

        {isSettingInitial && !confirmPasscode && passcode.length === 0 && (
          <div className="flex items-center gap-2 text-[10px] text-white/20 font-black uppercase tracking-[0.2em] animate-pulse">
            <ShieldCheck className="w-3 h-3" />
            First Time Setup
          </div>
        )}
      </div>
    </div>
  );
}
