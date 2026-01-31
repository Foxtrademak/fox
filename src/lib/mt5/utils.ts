import type { DailyRecord, MT5Trade } from "../../types";
import { VALIDATION_KEYWORDS } from "./constants";
import { getFormattedDate } from "../utils";

/**
 * Utility functions for MT5 import processing
 */

/**
 * Reconciles new data with existing records/trades to avoid duplicates.
 * SRP: Business logic for data merging/deduplication.
 */
export const reconcileMT5Data = (
  newRecords: DailyRecord[],
  existingRecords: DailyRecord[],
  newTrades: MT5Trade[],
  existingTrades: MT5Trade[]
) => {
  const existingDates = new Set(existingRecords.map(r => getFormattedDate(r.date)));
  const uniqueNewRecords = newRecords.filter(nr => !existingDates.has(getFormattedDate(nr.date)));

  const existingTradeIds = new Set(existingTrades.map(t => t.positionId));
  const uniqueNewTrades = newTrades.filter(t => !existingTradeIds.has(t.positionId));

  return {
    uniqueNewRecords,
    uniqueNewTrades,
    isFullyDuplicate: uniqueNewRecords.length === 0
  };
};

/**
 * Calculates the status (Win/Loss) of a trade based on its net profit
 */
export const calculateTradeStatus = (profit: number, commission: number, swap: number): 'Win' | 'Loss' => {
  return (profit + commission + swap) > 0 ? 'Win' : 'Loss';
};

/**
 * Creates a new MT5Trade object with properly formatted values
 */
export const createNewTrade = (data: {
  ticket: string;
  symbol: string;
  type: string;
  profit: number;
  commission: number;
  swap: number;
  volume: number;
  time: string;
}): MT5Trade => {
  return {
    positionId: data.ticket,
    symbol: data.symbol,
    type: (VALIDATION_KEYWORDS.TRADE_TYPES.BUY.some(t => data.type.includes(t))) ? 'Buy' : 'Sell',
    volume: data.volume,
    profit: parseFloat(data.profit.toFixed(2)),
    commission: parseFloat(data.commission.toFixed(2)),
    swap: parseFloat(data.swap.toFixed(2)),
    closeTime: data.time || new Date().toISOString(),
    status: calculateTradeStatus(data.profit, data.commission, data.swap),
    updatedAt: Date.now()
  };
};

/**
 * Updates an existing trade by merging new data into it
 */
export const mergeTradeData = (existing: MT5Trade, profit: number, commission: number, swap: number): void => {
  existing.profit = parseFloat((existing.profit + profit).toFixed(2));
  existing.commission = parseFloat((existing.commission + commission).toFixed(2));
  existing.swap = parseFloat((existing.swap + swap).toFixed(2));
  existing.status = calculateTradeStatus(existing.profit, existing.commission, existing.swap);
};

/**
 * Parses a string or number value from an MT5 report into a clean float
 * Handles currency formatting, parentheses for negative numbers, and special minus signs
 */
export const parseMT5Number = (val: unknown): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  
  let s = String(val).trim();
  // Handle (100.00) as -100.00 and various dash types
  s = s.replace(/[()]/g, '-').replace(/[−–—]/g, '-');
  
  // Keep only numbers, dots, and leading minus
  const cleaned = s.replace(/[^-0-9.]/g, '');
  
  const parts = cleaned.split('.');
  let finalStr = parts[0];
  if (parts.length > 1) {
    finalStr += '.' + parts.slice(1).join('');
  }
  
  return parseFloat(finalStr) || 0;
};

/**
 * Validates if a symbol string is a real trading symbol and not a summary word
 */
export const isValidMT5Symbol = (symbol: string): boolean => {
  if (!symbol || symbol.length < 2 || symbol.length > 15) return false;
  if (symbol.includes(' ') || /^\d+$/.test(symbol)) return false;
  
  const isReservedWord = /total|net|gross|summary|balance|equity|credit|deposit|withdrawal|initial|المجموع|الصافي|رصيد|إيداع|سحب|الرصيد|حقوق|ملخص/i.test(symbol);
  
  return !isReservedWord;
};
