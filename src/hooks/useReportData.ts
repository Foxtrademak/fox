import { useMemo } from 'react';
import type { DailyRecord, MT5Trade } from '../types';
import { getFormattedDate } from '../lib/utils';

export type CombinedItem = 
  | { type: 'trade', data: MT5Trade } 
  | { type: 'withdrawal', data: DailyRecord };

export interface ReportData {
  combinedItems: CombinedItem[];
  itemsByDate: Record<string, { items: CombinedItem[], dailyPL: number }>;
  sortedDates: string[];
  counts: {
    total: number;
    wins: number;
    losses: number;
  };
}

interface UseReportDataProps {
  reportTrades: MT5Trade[];
  reportDateFilter: string;
  reportSearchQuery: string;
  reportStatusFilter: 'all' | 'win' | 'loss';
  records: DailyRecord[];
  reportSortOrder: 'asc' | 'desc';
}

export const useReportData = ({
  reportTrades,
  reportDateFilter,
  reportSearchQuery,
  reportStatusFilter,
  records,
  reportSortOrder
}: UseReportDataProps): ReportData => {
  return useMemo(() => {
    // 1. Filter trades
    const filteredTrades = reportTrades.filter(trade => {
      const date = getFormattedDate(trade.closeTime);
      const matchesDate = !reportDateFilter || date === reportDateFilter;
      const matchesSearch = !reportSearchQuery || 
        trade.symbol.toLowerCase().includes(reportSearchQuery.toLowerCase()) ||
        trade.positionId.includes(reportSearchQuery);
      
      const netProfit = trade.profit + trade.commission + trade.swap;
      const matchesStatus = reportStatusFilter === 'all' || 
        (reportStatusFilter === 'win' && netProfit > 0) ||
        (reportStatusFilter === 'loss' && netProfit <= 0);

      return matchesDate && matchesSearch && matchesStatus;
    });

    // 2. Filter withdrawals
    const filteredWithdrawals = records.filter(r => {
      if (r.type !== 'withdrawal') return false;
      const date = r.date.split('T')[0];
      const matchesDate = !reportDateFilter || date === reportDateFilter;
      const matchesSearch = !reportSearchQuery || (r.notes || '').toLowerCase().includes(reportSearchQuery.toLowerCase());
      // Withdrawals are always "loss" in terms of balance reduction, but let's show them in 'all' and maybe 'loss' if filtered
      const matchesStatus = reportStatusFilter === 'all' || reportStatusFilter === 'loss';
      return matchesDate && matchesSearch && matchesStatus;
    });

    // 3. Calculate counts for filter buttons (based on date and search, but not status filter)
    const filteredForCounts = reportTrades.filter(trade => {
      const date = getFormattedDate(trade.closeTime);
      const matchesDate = !reportDateFilter || date === reportDateFilter;
      const matchesSearch = !reportSearchQuery || 
        trade.symbol.toLowerCase().includes(reportSearchQuery.toLowerCase()) ||
        trade.positionId.includes(reportSearchQuery);
      return matchesDate && matchesSearch;
    });

    const counts = {
      total: filteredForCounts.length,
      wins: filteredForCounts.filter(t => (t.profit + t.commission + t.swap) > 0).length,
      losses: filteredForCounts.filter(t => (t.profit + t.commission + t.swap) <= 0).length
    };

    // 4. Combine items
    const combinedItems: CombinedItem[] = [
      ...filteredTrades.map(t => ({ type: 'trade' as const, data: t })),
      ...filteredWithdrawals.map(w => ({ type: 'withdrawal' as const, data: w }))
    ];

    // 5. Sort combined items
    combinedItems.sort((a, b) => {
      const timeA = a.type === 'trade' 
        ? new Date(a.data.closeTime.replace(/\./g, '-')).getTime() 
        : new Date(a.data.date).getTime();
      const timeB = b.type === 'trade' 
        ? new Date(b.data.closeTime.replace(/\./g, '-')).getTime() 
        : new Date(b.data.date).getTime();
      return reportSortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    // 6. Group by date
    const itemsByDate = combinedItems.reduce((acc: Record<string, { items: CombinedItem[], dailyPL: number }>, item) => {
      const date = item.type === 'trade' 
        ? getFormattedDate(item.data.closeTime)
        : item.data.date.split('T')[0];
      if (!acc[date]) acc[date] = { items: [], dailyPL: 0 };
      acc[date].items.push(item);
      if (item.type === 'trade') {
        acc[date].dailyPL += (item.data.profit + item.data.commission + item.data.swap);
      }
      return acc;
    }, {});

    // 7. Sort dates
    const sortedDates = Object.keys(itemsByDate).sort((a, b) => {
      const timeA = new Date(a).getTime();
      const timeB = new Date(b).getTime();
      return reportSortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    return {
      combinedItems,
      itemsByDate,
      sortedDates,
      counts
    };
  }, [reportTrades, reportDateFilter, reportSearchQuery, reportStatusFilter, records, reportSortOrder]);
};
