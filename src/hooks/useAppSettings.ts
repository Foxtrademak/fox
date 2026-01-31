import { useState, useEffect } from 'react';

export function useAppSettings() {
  const [initialCapital, setInitialCapital] = useState<number>(() => {
    const saved = localStorage.getItem('initial_capital');
    return saved ? parseFloat(saved) : 1000;
  });

  const [weeklyTarget, setWeeklyTarget] = useState<number>(() => {
    const saved = localStorage.getItem('weekly_target');
    return saved ? parseFloat(saved) : 500;
  });

  const [monthlyTarget, setMonthlyTarget] = useState<number>(() => {
    const saved = localStorage.getItem('monthly_target');
    return saved ? parseFloat(saved) : 2000;
  });

  const [showTargetsOnHome, setShowTargetsOnHome] = useState(() => {
    const saved = localStorage.getItem('show_targets_on_home');
    return saved ? saved === 'true' : true;
  });

  const [password, setPassword] = useState(() => localStorage.getItem('app_passcode') || '2525');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    localStorage.setItem('initial_capital', initialCapital.toString());
  }, [initialCapital]);

  useEffect(() => {
    localStorage.setItem('weekly_target', weeklyTarget.toString());
  }, [weeklyTarget]);

  useEffect(() => {
    localStorage.setItem('monthly_target', monthlyTarget.toString());
  }, [monthlyTarget]);

  useEffect(() => {
    localStorage.setItem('show_targets_on_home', showTargetsOnHome.toString());
  }, [showTargetsOnHome]);

  useEffect(() => {
    localStorage.setItem('app_passcode', password);
  }, [password]);

  return {
    initialCapital,
    setInitialCapital,
    weeklyTarget,
    setWeeklyTarget,
    monthlyTarget,
    setMonthlyTarget,
    showTargetsOnHome,
    setShowTargetsOnHome,
    password,
    setPassword,
    isChangingPass,
    setIsChangingPass,
    newPass,
    setNewPass,
    showAbout,
    setShowAbout
  };
}
