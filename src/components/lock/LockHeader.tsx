import React from 'react';
import logo from '../../assets/app-logo-new.webp';

interface LockHeaderProps {
  isSettingInitial: boolean;
  confirmPasscode: string;
  error: boolean;
}

export const LockHeader = React.memo(function LockHeader({ 
  isSettingInitial, 
  confirmPasscode, 
  error 
}: LockHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-12">
      <div className="w-28 h-28 relative group">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-full h-full object-contain relative z-10" 
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
  );
});
