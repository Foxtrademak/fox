import React from 'react';
import { CapitalSettingCard } from './grid/CapitalSettingCard';
import { SecuritySettingCard } from './grid/SecuritySettingCard';
import { TargetsSettingCard } from './grid/TargetsSettingCard';
import { NotificationsSettingCard } from './grid/NotificationsSettingCard';
import { useUI } from '../../context/UIContext';
import { useSettings } from '../../context/SettingsContext';

/**
 * Main Coordinator for Settings Cards
 * Note: Now acts as a "Smart Component" pulling data directly from Contexts.
 * Orchestrates individual setting cards:
 * 1. CapitalSettingCard (Capital Base)
 * 2. SecuritySettingCard (Security Hub)
 * 3. TargetsSettingCard (Profit Goals)
 * 4. NotificationsSettingCard (System Status)
 */
export const SettingsGrid: React.FC = () => {
  const { theme } = useUI();
  const {
    setIsEditingInitial,
    setIsChangingPass,
    setIsEditingTargets,
    requestNotificationPermission,
    notificationsEnabled,
  } = useSettings();

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Responsibility 1: Capital Base */}
      <CapitalSettingCard 
        onClick={() => setIsEditingInitial(true)} 
        theme={theme} 
      />

      {/* Responsibility 2: Security Hub */}
      <SecuritySettingCard 
        onClick={() => setIsChangingPass(true)} 
        theme={theme} 
      />

      {/* Responsibility 3: Profit Goals */}
      <TargetsSettingCard 
        onClick={() => setIsEditingTargets(true)} 
        theme={theme} 
      />

      {/* Responsibility 4: System Status & Alerts */}
      <NotificationsSettingCard 
        onClick={requestNotificationPermission}
        notificationsEnabled={notificationsEnabled}
        theme={theme}
      />
    </div>
  );
};
