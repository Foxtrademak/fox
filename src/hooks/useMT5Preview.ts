import { useState } from 'react';
import type { MT5Trade } from '../types';

/**
 * Responsibility 5: Preview State Management
 * Manages the state and calculations for the import preview modal
 */
export function useMT5Preview() {
  const [mt5Preview, setMt5Preview] = useState<{
    trades: MT5Trade[];
    totalProfit: number;
    totalCommission: number;
    totalSwap: number;
    tradeCount: number;
    winCount: number;
    lossCount: number;
  } | null>(null);

  const calculatePreview = (trades: MT5Trade[]) => {
    const netTradeProfit = trades.reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    const totalCommission = trades.reduce((acc, t) => acc + t.commission, 0);
    const totalSwap = trades.reduce((acc, t) => acc + t.swap, 0);
    const winCount = trades.filter(t => (t.profit + t.commission + t.swap) > 0).length;
    const lossCount = trades.length - winCount;

    setMt5Preview({
      trades,
      totalProfit: parseFloat(netTradeProfit.toFixed(2)),
      totalCommission: parseFloat(totalCommission.toFixed(2)),
      totalSwap: parseFloat(totalSwap.toFixed(2)),
      tradeCount: trades.length,
      winCount,
      lossCount
    });
  };

  const clearPreview = () => setMt5Preview(null);

  return {
    mt5Preview,
    setMt5Preview,
    calculatePreview,
    clearPreview
  };
}
