import { type DailyRecord, type MT5Trade } from '../types';

export interface Statistics {
  winRate: number;
  maxDrawdown: number;
  maxDrawdownValue: number;
  profitFactor: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  averageWin: number;
  averageLoss: number;
  bestDay: number;
  worstDay: number;
  expectedValue: number; // Average P/L per trade
  totalProfit: number;
  winLossRatio: number;
  grossProfit: number;
  grossLoss: number;
}

export interface SmartInsight {
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  value?: string;
  icon?: string;
}

export interface PeriodStats {
  weekly: { label: string; profit: number; count: number }[];
  monthly: { label: string; profit: number; count: number }[];
  daily: { label: string; profit: number; count: number }[];
}

export interface SessionStats {
  label: string;
  profit: number;
  count: number;
  winRate: number;
}

export interface TargetProgress {
  weekly: { profit: number; target: number; percentage: number };
  monthly: { profit: number; target: number; percentage: number };
}

export interface GeniusMetrics {
  healthScore: number;
  projected30D: number;
}

export interface ChartPoint {
  displayDate: string;
  fullDate: string;
  profit: number | null;
  capital: number | null;
  open: number | null;
  close: number | null;
  high: number | null;
  low: number | null;
  isStart: boolean;
  isFuture: boolean;
}

export const calculateChartData = (data: DailyRecord[], initialCapital: number): { realData: ChartPoint[], futureData: ChartPoint[] } => {
  if (data.length === 0) return { realData: [], futureData: [] };

  const sortedRecords = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const groupedByDate = sortedRecords.reduce((acc: Record<string, { date: string, profit: number, records: DailyRecord[] }>, curr) => {
    const dateKey = new Date(curr.date).toISOString().split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        profit: 0,
        records: []
      };
    }
    acc[dateKey].profit += curr.profitLoss;
    acc[dateKey].records.push(curr);
    return acc;
  }, {});

  const initialPoint: ChartPoint = {
    displayDate: 'Start',
    fullDate: 'initial',
    profit: 0,
    capital: initialCapital,
    open: initialCapital,
    close: initialCapital,
    high: initialCapital,
    low: initialCapital,
    isStart: true,
    isFuture: false
  };

  const sortedGroups = Object.values(groupedByDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const allPoints: ChartPoint[] = [];
  let runningCap = initialCapital;
  
  for (const group of sortedGroups) {
    const open = runningCap;
    let dayHigh = open;
    let dayLow = open;
    let tempCap = open;
    
    group.records.forEach((r: DailyRecord) => {
      const profit = r.profitLoss || 0;
      tempCap += profit;
      dayHigh = Math.max(dayHigh, tempCap);
      dayLow = Math.min(dayLow, tempCap);
    });

    const close = open + (group.profit || 0);
    runningCap = close;

    allPoints.push({
      displayDate: new Date(group.date).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' }),
      fullDate: group.date,
      profit: group.profit || 0,
      capital: Number(runningCap.toFixed(2)) || 0,
      open: Number(open.toFixed(2)) || 0,
      close: Number(close.toFixed(2)) || 0,
      high: Number(dayHigh.toFixed(2)) || 0,
      low: Number(dayLow.toFixed(2)) || 0,
      isStart: false,
      isFuture: false
    });
  }

  const combined = [initialPoint, ...allPoints];
  
  const futureData: ChartPoint[] = [...combined];
  if (futureData.length > 0) {
    const lastPoint = futureData[futureData.length - 1];
    const lastDate = new Date(lastPoint.fullDate === 'initial' ? new Date() : lastPoint.fullDate);
    
    for (let i = 1; i <= 30; i++) {
      const futureDate = new Date(lastDate);
      futureDate.setDate(lastDate.getDate() + i);
      
      futureData.push({
        displayDate: futureDate.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' }),
        fullDate: futureDate.toISOString().split('T')[0],
        profit: null,
        capital: null,
        open: null,
        close: null,
        high: null,
        low: null,
        isStart: false,
        isFuture: true
      });
    }
  }

  return { realData: combined, futureData };
};

export const calculateSessionStats = (trades: MT5Trade[]): SessionStats[] => {
  const sessionStats: Record<string, { profit: number, count: number, wins: number }> = {
    'Asian': { profit: 0, count: 0, wins: 0 },
    'London': { profit: 0, count: 0, wins: 0 },
    'New York': { profit: 0, count: 0, wins: 0 },
    'Night': { profit: 0, count: 0, wins: 0 }
  };

  trades.forEach(t => {
    // Expected format: "2024.01.26 14:30:00"
    const hour = parseInt(t.closeTime.split(' ')[1]?.split(':')[0] || '0');
    let session = '';
    
    // Standard session hours (UTC approximate)
    if (hour >= 0 && hour < 8) session = 'Asian';
    else if (hour >= 8 && hour < 13) session = 'London';
    else if (hour >= 13 && hour < 21) session = 'New York';
    else session = 'Night';

    const netProfit = t.profit + (t.commission || 0) + (t.swap || 0);
    sessionStats[session].profit += netProfit;
    sessionStats[session].count += 1;
    if (netProfit > 0) sessionStats[session].wins += 1;
  });

  return Object.entries(sessionStats).map(([label, stats]) => ({
    label,
    profit: parseFloat(stats.profit.toFixed(2)),
    count: stats.count,
    winRate: stats.count > 0 ? (stats.wins / stats.count) * 100 : 0
  }));
};

export const getSmartInsights = (records: DailyRecord[], reportTrades: MT5Trade[] = []): SmartInsight[] => {
  const insights: SmartInsight[] = [];
  const tradeRecords = records.filter(r => r.type !== 'withdrawal');
  if (tradeRecords.length < 3) return insights;

  // 1. Best Trading Day Analysis
  const dayStats: Record<string, { profit: number, count: number }> = {};
  tradeRecords.forEach(r => {
    const day = new Date(r.date).toLocaleString('en-US', { weekday: 'long' });
    if (!dayStats[day]) dayStats[day] = { profit: 0, count: 0 };
    dayStats[day].profit += r.profitLoss;
    dayStats[day].count += 1;
  });

  const bestDay = Object.entries(dayStats).reduce((a, b) => b[1].profit > a[1].profit ? b : a);
  const worstDay = Object.entries(dayStats).reduce((a, b) => b[1].profit < a[1].profit ? b : a);

  if (bestDay[1].profit > 0) {
    insights.push({
      type: 'success',
      title: 'Optimal Trading Day',
      message: `Historically, your most profitable trades happen on ${bestDay[0]}.`,
      value: bestDay[0],
      icon: 'TrendingUp'
    });
  }

  // 2. Worst Trading Day Warning
  if (worstDay[1].profit < 0) {
    insights.push({
      type: 'warning',
      title: 'Risk Alert',
      message: `You tend to face more challenges on ${worstDay[0]}. Consider lowering your risk on this day.`,
      value: worstDay[0],
      icon: 'AlertTriangle'
    });
  }

  // 3. Time-based Analysis (If MT5 trades available)
  if (reportTrades.length > 0) {
    const sessionData = calculateSessionStats(reportTrades);
    const bestSession = sessionData.reduce((a, b) => b.profit > a.profit ? b : a);
    const worstSession = sessionData.reduce((a, b) => b.profit < a.profit ? b : a);

    if (bestSession.profit > 0) {
      insights.push({
        type: 'info',
        title: 'Session Mastery',
        message: `Your edge is strongest during the ${bestSession.label} session.`,
        value: bestSession.label,
        icon: 'Clock'
      });
    }

    if (worstSession.profit < 0) {
      insights.push({
        type: 'warning',
        title: 'Session Warning',
        message: `Performance drops during the ${worstSession.label} session. Stay vigilant.`,
        value: worstSession.label,
        icon: 'AlertTriangle'
      });
    }
  }

  // 4. Consistency Insight
  const winRate = (tradeRecords.filter(r => r.profitLoss > 0).length / tradeRecords.length) * 100;
  if (winRate > 60) {
    insights.push({
      type: 'success',
      title: 'High Consistency',
      message: `Your win rate is an impressive ${winRate.toFixed(1)}%. Keep following your execution plan.`,
      value: `${winRate.toFixed(0)}%`,
      icon: 'Target'
    });
  }

  return insights;
};

export const calculateTargetProgress = (records: DailyRecord[], weeklyTarget: number, monthlyTarget: number): TargetProgress => {
  const now = new Date();
  
  // Weekly Profit (UTC)
  const startOfWeek = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay());
  startOfWeek.setUTCHours(0, 0, 0, 0);
  
  const weeklyProfit = records.reduce((sum, record) => {
    if (record.type === 'withdrawal') return sum;
    const recordDate = new Date(record.date);
    return recordDate.getTime() >= startOfWeek.getTime() ? sum + record.profitLoss : sum;
  }, 0);

  // Monthly Profit (UTC)
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const monthlyProfit = records.reduce((sum, record) => {
    if (record.type === 'withdrawal') return sum;
    const recordDate = new Date(record.date);
    return recordDate.getTime() >= startOfMonth.getTime() ? sum + record.profitLoss : sum;
  }, 0);

  return {
    weekly: {
      profit: weeklyProfit,
      target: weeklyTarget,
      percentage: Math.min(Math.max((weeklyProfit / weeklyTarget) * 100, 0), 100)
    },
    monthly: {
      profit: monthlyProfit,
      target: monthlyTarget,
      percentage: Math.min(Math.max((monthlyProfit / monthlyTarget) * 100, 0), 100)
    }
  };
};

export const calculateGeniusMetrics = (stats: Statistics, records: DailyRecord[], currentCapital: number): GeniusMetrics => {
  const winRateScore = (stats.winRate / 100) * 40;
  const pfScore = Math.min((stats.profitFactor / 3) * 40, 40);
  const healthScore = Math.round(winRateScore + pfScore + 20);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentRecords = records.filter(r => r.type !== 'withdrawal' && new Date(r.date) >= thirtyDaysAgo);
  const avgDailyProfit = recentRecords.length > 0 
    ? recentRecords.reduce((acc, curr) => acc + curr.profitLoss, 0) / 30 
    : 0;
  
  return {
    healthScore,
    projected30D: currentCapital + (avgDailyProfit * 30)
  };
};

export const calculateRecordsWithBalance = (records: DailyRecord[], initialCapital: number): (DailyRecord & { capitalAfter: number })[] => {
  const sorted = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let balance = initialCapital;
  const withBalance = [];
  
  for (const r of sorted) {
    balance += r.profitLoss;
    withBalance.push({ ...r, capitalAfter: parseFloat(balance.toFixed(2)) });
  }
  
  return withBalance.reverse();
};

export const calculateStatistics = (records: DailyRecord[], initialCapital: number = 1000, reportTrades: MT5Trade[] = []): Statistics => {
  if (records.length === 0 && reportTrades.length === 0) {
    return {
      winRate: 0,
      maxDrawdown: 0,
      maxDrawdownValue: 0,
      profitFactor: 0,
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      averageWin: 0,
      averageLoss: 0,
      bestDay: 0,
      worstDay: 0,
      expectedValue: 0,
      totalProfit: 0,
      winLossRatio: 0,
      grossProfit: 0,
      grossLoss: 0,
    };
  }

  // If we have individual trades, use them for Gross Profit/Loss calculation
  // otherwise fallback to daily records.
  let grossProfit = 0;
  let grossLoss = 0;
  let totalTradesCount = 0;
  let winningTradesCount = 0;
  let losingTradesCount = 0;

  if (reportTrades.length > 0) {
    reportTrades.forEach(t => {
      const netProfit = t.profit + (t.commission || 0) + (t.swap || 0);
      if (netProfit > 0) {
        grossProfit += netProfit;
        winningTradesCount++;
      } else if (netProfit < 0) {
        grossLoss += Math.abs(netProfit);
        losingTradesCount++;
      }
      totalTradesCount++;
    });
  } else {
    // Fallback to daily records if no individual trades
    // Only include trade records for performance statistics
    const tradeRecords = records.filter(r => r.type !== 'withdrawal');
    const wins = tradeRecords.filter(r => r.profitLoss > 0);
    const losses = tradeRecords.filter(r => r.profitLoss < 0);
    grossProfit = wins.reduce((acc, r) => acc + r.profitLoss, 0);
    grossLoss = Math.abs(losses.reduce((acc, r) => acc + r.profitLoss, 0));
    totalTradesCount = tradeRecords.length;
    winningTradesCount = wins.length;
    losingTradesCount = tradeRecords.length - winningTradesCount;
  }

  // Sort by date ascending for drawdown calculation
  const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Drawdown Calculation - Account for withdrawals
  let peakCapital = initialCapital;
  let maxDrawdown = 0;
  let maxDrawdownValue = 0;
  let currentCapital = initialCapital;

  sortedRecords.forEach(r => {
    if (r.type === 'withdrawal') {
      // For withdrawals, we subtract from current capital AND peak capital
      // so it doesn't appear as a "trading loss" drawdown
      const withdrawalAmount = Math.abs(r.profitLoss);
      currentCapital -= withdrawalAmount;
      peakCapital -= withdrawalAmount;
      // Ensure peak capital doesn't go below current capital
      if (peakCapital < currentCapital) peakCapital = currentCapital;
    } else {
      currentCapital += r.profitLoss;
      
      if (currentCapital > peakCapital) {
        peakCapital = currentCapital;
      }
      
      const drawdown = peakCapital - currentCapital;
      const drawdownPercent = peakCapital > 0 ? (drawdown / peakCapital) * 100 : 0;
      
      if (drawdown > maxDrawdownValue) maxDrawdownValue = drawdown;
      if (drawdownPercent > maxDrawdown) maxDrawdown = drawdownPercent;
    }
  });

  const winRate = totalTradesCount > 0 ? (winningTradesCount / totalTradesCount) * 100 : 0;
  const profitFactor = grossLoss === 0 ? grossProfit : grossProfit / grossLoss;

  const averageWin = winningTradesCount > 0 ? grossProfit / winningTradesCount : 0;
  const averageLoss = losingTradesCount > 0 ? grossLoss / losingTradesCount : 0;

  const tradeRecordsOnly = records.filter(r => r.type !== 'withdrawal');
  const bestDay = tradeRecordsOnly.length > 0 ? Math.max(...tradeRecordsOnly.map(r => r.profitLoss)) : 0;
  const worstDay = tradeRecordsOnly.length > 0 ? Math.min(...tradeRecordsOnly.map(r => r.profitLoss)) : 0;

  // Total profit should be from trades only
  const totalProfit = tradeRecordsOnly.reduce((acc, r) => acc + r.profitLoss, 0);
  const expectedValue = totalTradesCount > 0 ? totalProfit / totalTradesCount : 0;
  const winLossRatio = averageLoss === 0 ? averageWin : averageWin / averageLoss;

  return {
    winRate,
    maxDrawdown,
    maxDrawdownValue,
    profitFactor,
    totalTrades: totalTradesCount,
    winningTrades: winningTradesCount,
    losingTrades: losingTradesCount,
    averageWin,
    averageLoss,
    bestDay,
    worstDay,
    expectedValue,
    totalProfit,
    winLossRatio,
    grossProfit,
    grossLoss,
  };
};

export const getPeriodStats = (records: DailyRecord[]): PeriodStats => {
  const weeklyStats: Record<string, number> = {};
  const monthlyStats: Record<string, number> = {};
  const dailyByDateStats: Record<string, number> = {};

  // Filter out withdrawals for period profit statistics
  const tradeRecords = records.filter(r => r.type !== 'withdrawal');
  
  // Sort records by date to ensure the daily distribution follows chronological order
  const sortedRecords = [...tradeRecords].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sortedRecords.forEach(record => {
    const date = new Date(record.date);
    
    // Use UTC methods to avoid timezone shifts
    // Weekly (Mon-Sun)
    const day = date.getUTCDay();
    const diff = date.getUTCDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date);
    monday.setUTCDate(diff);
    monday.setUTCHours(0, 0, 0, 0);
    const weekKey = `Week of ${monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}`;
    
    weeklyStats[weekKey] = (weeklyStats[weekKey] || 0) + record.profitLoss;

    // Monthly
    const monthKey = date.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
    monthlyStats[monthKey] = (monthlyStats[monthKey] || 0) + record.profitLoss;

    // Daily (By Date)
    const dailyKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    dailyByDateStats[dailyKey] = (dailyByDateStats[dailyKey] || 0) + record.profitLoss;
  });

  return {
    weekly: Object.entries(weeklyStats).map(([label, profit]) => ({ label, profit, count: 0 })),
    monthly: Object.entries(monthlyStats).map(([label, profit]) => ({ label, profit, count: 0 })),
    daily: Object.entries(dailyByDateStats).map(([label, profit]) => ({
      label,
      profit: parseFloat(profit.toFixed(2)),
      count: 0
    })),
  };
};
