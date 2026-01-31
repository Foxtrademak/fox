import { useCallback } from 'react';
import { haptic } from '../lib/utils';

export function useSecurityForm(
  newPass: string,
  setNewPass: (val: string) => void,
  setPassword: (val: string) => void,
  setIsChangingPass: (val: boolean) => void
) {
  const handlePassChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 4) {
      setNewPass(val);
      if (val.length === 4) haptic('success');
    }
  }, [setNewPass]);

  const handleExecute = useCallback(() => {
    if (newPass.length === 4) {
      setPassword(newPass);
      setIsChangingPass(false);
      haptic('success');
    } else {
      haptic('medium');
    }
  }, [newPass, setPassword, setIsChangingPass]);

  return {
    handlePassChange,
    handleExecute
  };
}
