import { useMemo } from 'react';
import type { DailyRecord, MT5Trade } from '../types';
import { 
  calculateStatistics, 
  getPeriodStats, 
  getSmartInsights, 
  calculateSessionStats,
  calculateTargetProgress,
  calculateGeniusMetrics,
  calculateRecordsWithBalance
} from '../lib/statistics';

export function useStatistics(records: DailyRecord[], initialCapital: number, reportTrades: MT5Trade[], currentCapital: number, weeklyTarget: number, monthlyTarget: number) {

    const stats = useMemo(() => calculateStatistics(records, initialCapital, reportTrades), [records, initialCapital, reportTrades]);

    const periodStats = useMemo(() => getPeriodStats(records), [records]);

    const sessionStats = useMemo(() => calculateSessionStats(reportTrades), [reportTrades]);

    const insights = useMemo(() => getSmartInsights(records, reportTrades), [records, reportTrades]);

    const targetProgress = useMemo(() => 
      calculateTargetProgress(records, weeklyTarget, monthlyTarget), 
    [records, weeklyTarget, monthlyTarget]);

    const geniusMetrics = useMemo(() => 
      calculateGeniusMetrics(stats, records, currentCapital), 
    [stats, records, currentCapital]);

    const recordsWithBalance = useMemo(() => 
      calculateRecordsWithBalance(records, initialCapital), 
    [records, initialCapital]);

    return {
      stats,
      periodStats,
      sessionStats,
      insights,
      targetProgress,
      geniusMetrics,
      recordsWithBalance
    };
}
