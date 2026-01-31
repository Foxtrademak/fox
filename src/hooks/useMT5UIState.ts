import { useState } from "react";

/**
 * Responsibility: Managing the UI state for MT5 reports (sorting, filtering, deletion selection).
 */
export function useMT5UIState() {
  const [reportSortOrder, setReportSortOrder] = useState<'desc' | 'asc'>('desc');
  const [reportDateFilter, setReportDateFilter] = useState<string>('');
  const [reportDeleteDate, setReportDeleteDate] = useState<string>('');

  return {
    reportSortOrder,
    setReportSortOrder,
    reportDateFilter,
    setReportDateFilter,
    reportDeleteDate,
    setReportDeleteDate
  };
}