/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo } from 'react';
import { useMT5Import } from '../hooks/useMT5Import';
import { useData } from './DataContext';
import { useSyncContext } from './SyncContext';
import { useUI } from './UIContext';
import { useNotifications } from '../hooks/useNotifications';
import type { MT5Trade } from '../types';

interface ImportContextType {
  mt5Preview: {
    trades: MT5Trade[];
    totalProfit: number;
    totalCommission: number;
    totalSwap: number;
    tradeCount: number;
    winCount: number;
    lossCount: number;
  } | null;
  setMt5Preview: (preview: ImportContextType['mt5Preview']) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImportMT5: (e: React.ChangeEvent<HTMLInputElement>) => void;
  confirmMT5Import: () => void;
  handleDeleteMT5Reports: () => void;
  handleDeleteMT5ReportsByDate: () => void;
  reportSortOrder: 'desc' | 'asc';
  setReportSortOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>;
  reportDateFilter: string;
  setReportDateFilter: React.Dispatch<React.SetStateAction<string>>;
  reportDeleteDate: string;
  setReportDeleteDate: React.Dispatch<React.SetStateAction<string>>;
}

const ImportContext = createContext<ImportContextType | undefined>(undefined);

export function ImportProvider({ children }: { children: React.ReactNode }) {
  const { records, setRecords, reportTrades, setReportTrades } = useData();
  const { syncImmediately } = useSyncContext();
  const { currentTime } = useUI();
  const { sendNotification } = useNotifications(currentTime);

  const importLogic = useMT5Import(
    records,
    setRecords,
    reportTrades,
    setReportTrades,
    syncImmediately,
    sendNotification
  );

  const value = useMemo(() => ({
    ...importLogic
  }), [importLogic]);

  return <ImportContext.Provider value={value}>{children}</ImportContext.Provider>;
}

export function useImport() {
  const context = useContext(ImportContext);
  if (context === undefined) {
    throw new Error('useImport must be used within an ImportProvider');
  }
  return context;
}
