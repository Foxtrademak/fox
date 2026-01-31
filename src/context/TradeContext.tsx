/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo } from 'react';
import { useData } from './DataContext';
import { useSyncContext } from './SyncContext';
import { useTradeManagement } from '../hooks/useTradeManagement';

interface TradeContextType {
  isAddingWithdrawal: boolean;
  setIsAddingWithdrawal: React.Dispatch<React.SetStateAction<boolean>>;
  withdrawalAmount: string;
  setWithdrawalAmount: React.Dispatch<React.SetStateAction<string>>;
  withdrawalNote: string;
  setWithdrawalNote: React.Dispatch<React.SetStateAction<string>>;
  recordToDelete: string | null;
  setRecordToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  addWithdrawal: () => void;
  deleteRecord: (id: string) => void;
  confirmDelete: () => void;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export function TradeProvider({ children }: { children: React.ReactNode }) {
  const { currentCapital, setRecords } = useData();
  const { syncImmediately } = useSyncContext();
  
  const {
    isAddingWithdrawal, setIsAddingWithdrawal,
    withdrawalAmount, setWithdrawalAmount,
    withdrawalNote, setWithdrawalNote,
    recordToDelete, setRecordToDelete,
    addWithdrawal, deleteRecord, confirmDelete
  } = useTradeManagement(currentCapital, setRecords, syncImmediately);

  const value = useMemo(() => ({
    isAddingWithdrawal, setIsAddingWithdrawal,
    withdrawalAmount, setWithdrawalAmount,
    withdrawalNote, setWithdrawalNote,
    recordToDelete, setRecordToDelete,
    addWithdrawal, deleteRecord, confirmDelete
  }), [
    isAddingWithdrawal, setIsAddingWithdrawal,
    withdrawalAmount, setWithdrawalAmount,
    withdrawalNote, setWithdrawalNote,
    recordToDelete, setRecordToDelete,
    addWithdrawal, deleteRecord, confirmDelete
  ]);

  return <TradeContext.Provider value={value}>{children}</TradeContext.Provider>;
}

export function useTrade() {
  const context = useContext(TradeContext);
  if (context === undefined) {
    throw new Error('useTrade must be used within a TradeProvider');
  }
  return context;
}
