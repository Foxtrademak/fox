/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo } from 'react';
import type { User } from 'firebase/auth';
import { useSync } from '../hooks/useSync';
import { useData } from './DataContext';
import { useNotifications } from '../hooks/useNotifications';
import { useUI } from './UIContext';
import type { DailyRecord, MT5Trade } from '../types';

interface SyncContextType {
  user: User | null;
  isSyncing: boolean;
  handleGoogleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleManualSync: (silent?: boolean) => Promise<boolean>;
  syncImmediately: (data: Partial<{
    records: DailyRecord[],
    reportTrades: MT5Trade[],
    initialCapital: number,
    weeklyTarget: number,
    monthlyTarget: number,
    showTargetsOnHome: boolean
  }>) => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { 
    records, setRecords, 
    reportTrades, setReportTrades,
    initialCapital, setInitialCapital,
    weeklyTarget, setWeeklyTarget,
    monthlyTarget, setMonthlyTarget,
    showTargetsOnHome, setShowTargetsOnHome
  } = useData();
  
  const { currentTime } = useUI();
  const { sendNotification } = useNotifications(currentTime);

  const {
    user, isSyncing,
    handleGoogleSignIn, handleSignOut,
    handleManualSync, syncImmediately
  } = useSync(
    records, setRecords,
    reportTrades, setReportTrades,
    initialCapital, setInitialCapital,
    weeklyTarget, setWeeklyTarget,
    monthlyTarget, setMonthlyTarget,
    showTargetsOnHome, setShowTargetsOnHome,
    sendNotification
  );

  const value = useMemo(() => ({
    user, isSyncing,
    handleGoogleSignIn, handleSignOut,
    handleManualSync, syncImmediately
  }), [user, isSyncing, handleGoogleSignIn, handleSignOut, handleManualSync, syncImmediately]);

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
}

export function useSyncContext() {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSyncContext must be used within a SyncProvider');
  }
  return context;
}
