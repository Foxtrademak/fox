import type { MT5Trade, DailyRecord } from "../../types";
import { getFormattedDate } from "../utils";

/**
 * Responsibility: Transforming MT5 trade data into the application's daily records format.
 */

/**
 * Groups trades by date and creates DailyRecord objects for each date
 */
export const createDailyRecordsFromTrades = (trades: MT5Trade[]): DailyRecord[] => {
  const groupedByDate = trades.reduce((acc: Record<string, { profit: number, symbols: Set<string>, count: number, winCount: number, lossCount: number, commission: number, swap: number }>, trade) => {
    const dateStr = getFormattedDate(trade.closeTime) || new Date().toISOString().split('T')[0];
    
    if (!acc[dateStr]) {
      acc[dateStr] = { profit: 0, symbols: new Set(), count: 0, winCount: 0, lossCount: 0, commission: 0, swap: 0 };
    }
    
    const netProfit = trade.profit + trade.commission + trade.swap;
    acc[dateStr].profit += netProfit;
    acc[dateStr].commission += trade.commission;
    acc[dateStr].swap += trade.swap;
    acc[dateStr].symbols.add(trade.symbol);
    acc[dateStr].count += 1;
    if (netProfit > 0) acc[dateStr].winCount += 1;
    else acc[dateStr].lossCount += 1;
    
    return acc;
  }, {});

  return Object.entries(groupedByDate).map(([date, data]) => {
    const recordDate = `${date}T12:00:00.000Z`;
    return {
      id: crypto.randomUUID(),
      date: recordDate,
      profitLoss: parseFloat(data.profit.toFixed(2)),
      capitalBefore: 0,
      capitalAfter: 0,
      isMT5Import: true,
      mt5Details: {
        tradeCount: data.count,
        winCount: data.winCount,
        lossCount: data.lossCount,
        totalCommission: parseFloat(data.commission.toFixed(2)),
        totalSwap: parseFloat(data.swap.toFixed(2)),
        symbols: Array.from(data.symbols)
      },
      notes: `MT5 Import: ${data.count} trades (${data.winCount}W/${data.lossCount}L) - ${Array.from(data.symbols).join(', ')}`,
      updatedAt: Date.now()
    };
  });
};
