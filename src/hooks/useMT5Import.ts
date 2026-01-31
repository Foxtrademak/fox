import { useUI } from "../context/UIContext";
import type { DailyRecord, MT5Trade } from "../types";
import { parseMT5ExcelFile } from "../lib/mt5/parser";
import { extractTradesFromRows } from "../lib/mt5/extractor";
import { createDailyRecordsFromTrades } from "../lib/mt5/transformer";
import { reconcileMT5Data } from "../lib/mt5/utils";

// Individual Responsibility Hooks
import { useMT5FileHandler } from "./useMT5FileHandler";
import { useMT5Preview } from "./useMT5Preview";
import { useMT5Deletion } from "./useMT5Deletion";
import { useMT5Sync } from "./useMT5Sync";
import { useMT5UIState } from "./useMT5UIState";

/**
 * Main Coordinator Hook for MT5 Import
 * Orchestrates the following responsibilities:
 * 1. File Handling (via useMT5FileHandler)
 * 2. Raw Data Parsing (via lib/mt5/parser)
 * 3. Validation & Extraction (via lib/mt5/extractor)
 * 4. Data Transformation (via lib/mt5/transformer)
 * 5. Data Reconciliation (via lib/mt5/utils)
 * 6. Preview Management (via useMT5Preview)
 * 7. Deletion Logic (via useMT5Deletion)
 * 8. Cloud Sync & UI Feedback (via useMT5Sync)
 */
export function useMT5Import(
  records: DailyRecord[],
  setRecords: (r: DailyRecord[] | ((prev: DailyRecord[]) => DailyRecord[])) => void,
  reportTrades: MT5Trade[],
  setReportTrades: (t: MT5Trade[] | ((prev: MT5Trade[]) => MT5Trade[])) => void,
  syncImmediately: (data: { records: DailyRecord[], reportTrades: MT5Trade[] }) => Promise<void>,
  sendNotification: (title: string, body: string) => void
) {
  const { alert: customAlert } = useUI();
  // Responsibility: UI State Management
  const {
    reportSortOrder,
    setReportSortOrder,
    reportDateFilter,
    setReportDateFilter,
    reportDeleteDate,
    setReportDeleteDate
  } = useMT5UIState();

  // 1. Responsibility: File Handling
  const { fileInputRef } = useMT5FileHandler();

  // 6. Responsibility: Preview Management
  const { mt5Preview, setMt5Preview, calculatePreview, clearPreview } = useMT5Preview();

  // 8. Responsibility: Sync & UX
  const { performSync, notifySuccess } = useMT5Sync(syncImmediately, sendNotification);

  // 7. Responsibility: Deletion Logic
  const { handleDeleteAll, handleDeleteByDate } = useMT5Deletion(
    records,
    (r) => setRecords(r),
    reportTrades,
    (t) => setReportTrades(t),
    (data) => performSync(data.records, data.reportTrades),
    sendNotification
  );

  /**
   * 2, 3. Responsibility: Parsing & Extraction
   */
  const handleImportMT5 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const rawData = await parseMT5ExcelFile(file);
      const { trades } = extractTradesFromRows(rawData);

      if (trades.length === 0) {
        customAlert({
          title: 'تنبيه الاستيراد',
          message: 'لم يتم العثور على صفقات صالحة في التقرير المرفق.',
          type: 'error'
        });
        return;
      }

      calculatePreview(trades);
    } catch (error) {
      console.error('Import error:', error);
      customAlert({
        title: 'خطأ في الاستيراد',
        message: error instanceof Error ? error.message : 'حدث خطأ أثناء قراءة ملف Excel.',
        type: 'error'
      });
    }
    e.target.value = '';
  };

  /**
   * 4, 5, 8. Responsibility: Transformation, Reconciliation & Sync
   */
  const confirmMT5Import = async () => {
    if (!mt5Preview) return;

    // 4. Transformation
    const newRecords = createDailyRecordsFromTrades(mt5Preview.trades);

    // 5. Reconciliation (SRP: Deduplication logic extracted to utils)
    const { uniqueNewRecords, uniqueNewTrades, isFullyDuplicate } = reconcileMT5Data(
      newRecords,
      records,
      mt5Preview.trades,
      reportTrades
    );

    if (isFullyDuplicate) {
      customAlert({
        title: 'تكرار البيانات',
        message: 'جميع التواريخ المستوردة موجودة بالفعل في سجلاتك. لم يتم إضافة بيانات جديدة.',
        type: 'info'
      });
    } else {
      const updatedRecords = [...uniqueNewRecords, ...records];
      const updatedTrades = [...uniqueNewTrades, ...reportTrades];
      
      setRecords(updatedRecords);
      setReportTrades(updatedTrades);
      
      // 8. Sync & Feedback
      await performSync(updatedRecords, updatedTrades);
      notifySuccess(`Successfully imported ${uniqueNewRecords.length} daily records from MT5!`);
    }

    clearPreview();
  };

  return {
    mt5Preview,
    setMt5Preview,
    reportSortOrder,
    setReportSortOrder,
    reportDateFilter,
    setReportDateFilter,
    reportDeleteDate,
    setReportDeleteDate,
    fileInputRef,
    handleDeleteMT5Reports: handleDeleteAll,
    handleDeleteMT5ReportsByDate: () => handleDeleteByDate(reportDeleteDate),
    handleImportMT5,
    confirmMT5Import
  };
}
