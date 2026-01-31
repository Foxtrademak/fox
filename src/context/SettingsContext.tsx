/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useAppSettings } from '../hooks/useAppSettings';
import { useNotifications } from '../hooks/useNotifications';
import { useData } from './DataContext';
import { useSyncContext } from './SyncContext';
import { useUI } from './UIContext';
import type { DailyRecord } from '../types';

interface SettingsContextType {
  isEditingInitial: boolean;
  setIsEditingInitial: React.Dispatch<React.SetStateAction<boolean>>;
  isEditingTargets: boolean;
  setIsEditingTargets: React.Dispatch<React.SetStateAction<boolean>>;
  isChangingPass: boolean;
  setIsChangingPass: React.Dispatch<React.SetStateAction<boolean>>;
  newPass: string;
  setNewPass: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showAbout: boolean;
  setShowAbout: React.Dispatch<React.SetStateAction<boolean>>;
  notificationsEnabled: boolean;
  requestNotificationPermission: () => Promise<void>;
  handleExportJSON: () => void;
  handleImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetAllData: () => void;
  confirmAction: { type: 'reload' | 'reset' | 'reset_reports' | 'reset_reports_date', title: string, message: string } | null;
  setConfirmAction: (action: { type: 'reload' | 'reset' | 'reset_reports' | 'reset_reports_date', title: string, message: string } | null) => void;
  reportSearchQuery: string;
  reportStatusFilter: 'all' | 'win' | 'loss';
  setReportStatusFilter: React.Dispatch<React.SetStateAction<'all' | 'win' | 'loss'>>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { records, setRecords, setInitialCapital, setReportTrades } = useData();
  const { syncImmediately } = useSyncContext();
  const { currentTime, alert: customAlert, confirm: customConfirm } = useUI();
  const { notificationsEnabled, requestNotificationPermission } = useNotifications(currentTime);
  const {
    isChangingPass, setIsChangingPass,
    newPass, setNewPass,
    setPassword,
    showAbout, setShowAbout
  } = useAppSettings();

  const [isEditingInitial, setIsEditingInitial] = useState(false);
  const [isEditingTargets, setIsEditingTargets] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: 'reload' | 'reset' | 'reset_reports' | 'reset_reports_date', title: string, message: string } | null>(null);
  const [reportStatusFilter, setReportStatusFilter] = useState<'all' | 'win' | 'loss'>('all');

  const handleExportJSON = useCallback(() => {
    if (records.length === 0) return;
    const dataStr = JSON.stringify(records, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fox-trade-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [records]);

  const handleImportJSON = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (Array.isArray(data)) {
          customConfirm({
            title: 'استيراد البيانات',
            message: `هل تريد استيراد ${data.length} من السجلات؟ سيتم إضافتها إلى بياناتك الحالية.`,
            type: 'info',
            onConfirm: () => {
              const processedData = data.map((r: Partial<DailyRecord>) => ({
                ...r,
                id: r.id || crypto.randomUUID(),
                updatedAt: r.updatedAt || Date.now()
              })) as DailyRecord[];
              setRecords(prev => {
                const updated = [...processedData, ...prev];
                syncImmediately({ records: updated });
                return updated;
              });
            }
          });
        }
      } catch {
        customAlert({
          title: 'خطأ في الاستيراد',
          message: 'الملف المرفق غير صالح.',
          type: 'error'
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [setRecords, syncImmediately, customAlert, customConfirm]);

  const handleResetAllData = useCallback(async () => {
    // Clear cloud data first if logged in
    await syncImmediately({
      records: [],
      reportTrades: [],
      initialCapital: 1000,
      weeklyTarget: 50,
      monthlyTarget: 200,
      showTargetsOnHome: true
    });
    
    setRecords([]);
    setReportTrades([]);
    setInitialCapital(1000);
    localStorage.clear();
    window.location.reload();
  }, [setRecords, setReportTrades, setInitialCapital, syncImmediately]);

  const value = useMemo(() => ({
    isEditingInitial, setIsEditingInitial,
    isEditingTargets, setIsEditingTargets,
    isChangingPass, setIsChangingPass,
    newPass, setNewPass,
    setPassword,
    showAbout, setShowAbout,
    notificationsEnabled,
    requestNotificationPermission,
    handleExportJSON,
    handleImportJSON,
    handleResetAllData,
    confirmAction,
    setConfirmAction,
    reportSearchQuery: '',
    reportStatusFilter,
    setReportStatusFilter
  }), [
    isEditingInitial, setIsEditingInitial,
    isEditingTargets, setIsEditingTargets,
    isChangingPass, setIsChangingPass,
    newPass, setNewPass,
    setPassword,
    showAbout, setShowAbout,
    notificationsEnabled,
    requestNotificationPermission,
    handleExportJSON,
    handleImportJSON,
    handleResetAllData,
    confirmAction,
    setConfirmAction,
    reportStatusFilter,
    setReportStatusFilter
  ]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
