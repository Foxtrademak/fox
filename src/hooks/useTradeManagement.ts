import { useState, useCallback } from 'react';
import { useUI } from '../context/UIContext';
import { type DailyRecord } from '../types';
import { haptic } from '../lib/utils';

export function useTradeManagement(
  currentCapital: number,
  setRecords: (r: DailyRecord[] | ((prev: DailyRecord[]) => DailyRecord[])) => void,
  syncImmediately?: (data: Partial<{ records: DailyRecord[] }>) => Promise<void>
) {
  const { alert: customAlert } = useUI();
  const [isAddingWithdrawal, setIsAddingWithdrawal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalNote, setWithdrawalNote] = useState('');
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const addWithdrawal = useCallback(() => {
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) {
      customAlert({
        title: 'خطأ في المبلغ',
        message: 'يرجى إدخال مبلغ صحيح للسحب.',
        type: 'error'
      });
      return;
    }

    const newRecord: DailyRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      profitLoss: -amount,
      capitalBefore: currentCapital,
      capitalAfter: currentCapital - amount,
      notes: withdrawalNote || 'Profit Withdrawal',
      type: 'withdrawal',
      updatedAt: Date.now()
    };

    setRecords(prev => {
      const updated = [newRecord, ...prev];
      if (syncImmediately) {
        syncImmediately({ records: updated });
      }
      return updated;
    });
    setIsAddingWithdrawal(false);
    setWithdrawalAmount('');
    setWithdrawalNote('');
    haptic('heavy');
  }, [withdrawalAmount, withdrawalNote, currentCapital, setRecords, syncImmediately, customAlert]);

  const deleteRecord = useCallback((id: string) => {
    setRecordToDelete(id);
    haptic('medium');
  }, []);

  const confirmDelete = useCallback(() => {
    if (recordToDelete) {
      setRecords(prev => {
        const updated = prev.filter(r => r.id !== recordToDelete);
        if (syncImmediately) {
          syncImmediately({ records: updated });
        }
        return updated;
      });
      setRecordToDelete(null);
      haptic('heavy');
    }
  }, [recordToDelete, setRecords, syncImmediately]);

  return {
    isAddingWithdrawal,
    setIsAddingWithdrawal,
    withdrawalAmount,
    setWithdrawalAmount,
    withdrawalNote,
    setWithdrawalNote,
    recordToDelete,
    setRecordToDelete,
    addWithdrawal,
    deleteRecord,
    confirmDelete
  };
}
