import { haptic } from '../lib/utils';
import type { DailyRecord, MT5Trade } from '../types';

/**
 * Responsibility 7 & 8: Cloud Synchronization & UX/Feedback
 * Manages the final sync to cloud and user notifications
 */
export function useMT5Sync(
  syncImmediately: (data: { records: DailyRecord[], reportTrades: MT5Trade[] }) => Promise<void>,
  sendNotification: (title: string, body: string) => void
) {
  const performSync = async (records: DailyRecord[], reportTrades: MT5Trade[]) => {
    try {
      await syncImmediately({ records, reportTrades });
    } catch (error) {
      console.error('Sync error:', error);
      sendNotification('Sync Failed', 'Failed to sync data to the cloud.');
    }
  };

  const notifySuccess = (message: string) => {
    haptic('heavy');
    sendNotification('Import Successful', message);
  };

  return {
    performSync,
    notifySuccess
  };
}
