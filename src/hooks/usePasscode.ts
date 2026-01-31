import { useState, useCallback } from 'react';

interface UsePasscodeProps {
  onUnlock: () => void;
}

export function usePasscode({ onUnlock }: UsePasscodeProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isSettingInitial] = useState(() => !localStorage.getItem('app_passcode'));
  const [confirmPasscode, setConfirmPasscode] = useState('');

  const savedPasscode = localStorage.getItem('app_passcode');

  const handleDelete = useCallback(() => {
    setPasscode(prev => prev.slice(0, -1));
    setError(false);
  }, []);

  const handleNumberClick = useCallback((num: string) => {
    setPasscode(prev => {
      if (prev.length >= 4) return prev;
      const newPasscode = prev + num;
      
      // We still use functional update but move logic out of it by using a timeout 
      // or simply calculating outside if possible. 
      // However, to keep it stable, we can trigger the logic in a timeout 
      // which safely escapes the rendering phase.
      
      if (newPasscode.length === 4) {
        setTimeout(() => {
          if (!isSettingInitial) {
            if (newPasscode === savedPasscode) {
              onUnlock();
            } else {
              setPasscode('');
              setError(true);
            }
          } else {
            if (confirmPasscode) {
              if (newPasscode === confirmPasscode) {
                localStorage.setItem('app_passcode', newPasscode);
                onUnlock();
              } else {
                setError(true);
                setPasscode('');
                setConfirmPasscode('');
              }
            } else {
              setConfirmPasscode(newPasscode);
              setPasscode('');
            }
          }
        }, 100);
      }
      
      return newPasscode;
    });
    setError(false);
  }, [isSettingInitial, savedPasscode, onUnlock, confirmPasscode]);

  return {
    passcode,
    error,
    isSettingInitial,
    confirmPasscode,
    handleNumberClick,
    handleDelete
  };
}
