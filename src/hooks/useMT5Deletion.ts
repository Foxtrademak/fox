import { haptic, getFormattedDate } from '../lib/utils';
import type { DailyRecord, MT5Trade } from '../types';

/**
 * Responsibility 6: Deletion Logic
 * Manages deleting all reports or deleting by specific date
 */
export function useMT5Deletion(
  records: DailyRecord[],
  setRecords: (r: DailyRecord[]) => void,
  reportTrades: MT5Trade[],
  setReportTrades: (t: MT5Trade[]) => void,
  onSync: (data: { records: DailyRecord[], reportTrades: MT5Trade[] }) => void,
  sendNotification: (title: string, body: string) => void
) {
  const handleDeleteAll = () => {
    const updatedRecords = records.filter(record => !record.isMT5Import);
    setRecords(updatedRecords);
    setReportTrades([]);
    
    onSync({ records: updatedRecords, reportTrades: [] });
    
    haptic('heavy');
    sendNotification('Reports Cleared', 'All MT5 trade reports and corresponding history cards have been deleted.');
  };

  const handleDeleteByDate = (dateToDelete: string) => {
    if (!dateToDelete) return;
    
    const updatedTrades = reportTrades.filter(trade => getFormattedDate(trade.closeTime) !== dateToDelete);
    const updatedRecords = records.filter(record => getFormattedDate(record.date) !== dateToDelete);
    
    const deletedTradesCount = reportTrades.length - updatedTrades.length;
    const deletedRecordsCount = records.length - updatedRecords.length;

    if (deletedTradesCount === 0 && deletedRecordsCount === 0) {
      sendNotification('No Reports Found', `No reports found for the date ${dateToDelete}.`);
      return;
    }
    
    setReportTrades(updatedTrades);
    setRecords(updatedRecords);
    
    onSync({ records: updatedRecords, reportTrades: updatedTrades });
    
    haptic('heavy');
    sendNotification('Reports Cleared', `Deleted ${deletedTradesCount} trades and ${deletedRecordsCount} records for ${dateToDelete}.`);
  };

  return {
    handleDeleteAll,
    handleDeleteByDate
  };
}
