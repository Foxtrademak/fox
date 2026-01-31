/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { DailyRecord, MT5Trade } from '../types';
import { useAppSettings } from '../hooks/useAppSettings';
import { useStatistics } from '../hooks/useStatistics';
import type { Statistics, SmartInsight, PeriodStats, SessionStats } from '../lib/statistics';

interface DataContextType {
  records: DailyRecord[];
  setRecords: React.Dispatch<React.SetStateAction<DailyRecord[]>>;
  reportTrades: MT5Trade[];
  setReportTrades: React.Dispatch<React.SetStateAction<MT5Trade[]>>;
  initialCapital: number;
  setInitialCapital: React.Dispatch<React.SetStateAction<number>>;
  currentCapital: number;
  weeklyTarget: number;
  setWeeklyTarget: React.Dispatch<React.SetStateAction<number>>;
  monthlyTarget: number;
  setMonthlyTarget: React.Dispatch<React.SetStateAction<number>>;
  showTargetsOnHome: boolean;
  setShowTargetsOnHome: React.Dispatch<React.SetStateAction<boolean>>;
  stats: Statistics;
  periodStats: PeriodStats;
  sessionStats: SessionStats[];
  insights: SmartInsight[];
  targetProgress: {
    weekly: { profit: number; target: number; percentage: number };
    monthly: { profit: number; target: number; percentage: number };
  };
  geniusMetrics: { healthScore: number; projected30D: number };
  recordsWithBalance: DailyRecord[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<DailyRecord[]>(() => {
    const saved = localStorage.getItem('trade_records');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const {
    initialCapital, setInitialCapital,
    weeklyTarget, setWeeklyTarget,
    monthlyTarget, setMonthlyTarget,
    showTargetsOnHome, setShowTargetsOnHome
  } = useAppSettings();

  const [reportTrades, setReportTrades] = useState<MT5Trade[]>(() => {
    const saved = localStorage.getItem('report_trades');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const currentCapital = useMemo(() => {
    const totalProfit = records.reduce((sum, r) => sum + (r.profitLoss || 0), 0);
    return initialCapital + totalProfit;
  }, [records, initialCapital]);

  const {
    stats, periodStats, sessionStats,
    insights, targetProgress, geniusMetrics,
    recordsWithBalance
  } = useStatistics(
    records, initialCapital, reportTrades,
    currentCapital, weeklyTarget, monthlyTarget
  );

  useEffect(() => {
    localStorage.setItem('trade_records', JSON.stringify(records));
    localStorage.setItem('report_trades', JSON.stringify(reportTrades));
  }, [records, reportTrades]);

  const value = useMemo(() => ({
    records, setRecords,
    reportTrades, setReportTrades,
    initialCapital, setInitialCapital,
    currentCapital,
    weeklyTarget, setWeeklyTarget,
    monthlyTarget, setMonthlyTarget,
    showTargetsOnHome, setShowTargetsOnHome,
    stats, periodStats, sessionStats,
    insights, targetProgress, geniusMetrics,
    recordsWithBalance,
  }), [
    records, setRecords,
    reportTrades, setReportTrades,
    initialCapital, setInitialCapital,
    currentCapital,
    weeklyTarget, setWeeklyTarget,
    monthlyTarget, setMonthlyTarget,
    showTargetsOnHome, setShowTargetsOnHome,
    stats, periodStats, sessionStats,
    insights, targetProgress, geniusMetrics,
    recordsWithBalance,
  ]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
