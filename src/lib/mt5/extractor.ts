import type { MT5Trade } from "../../types";
import { parseMT5Number, isValidMT5Symbol, mergeTradeData, createNewTrade } from "./utils";
import { MT5_HEADERS, VALIDATION_KEYWORDS, MT5_THRESHOLDS, MT5_ERRORS } from "./constants";

/**
 * Result of the extraction process
 */
export interface ExtractionResult {
  trades: MT5Trade[];
  headerRowIndex: number;
}

/**
 * Helper: Find the row index that contains MT5 headers
 */
const findHeaderRowIndex = (rawData: unknown[][]): number => {
  const symbolHeader = MT5_HEADERS.SYMBOL[0];
  const profitHeader = MT5_HEADERS.PROFIT[0];

  for (let i = 0; i < Math.min(rawData.length, MT5_THRESHOLDS.HEADER_SEARCH_LIMIT); i++) {
    const row = rawData[i];
    if (row && 
        row.some(cell => String(cell).toLowerCase().includes(symbolHeader)) && 
        row.some(cell => String(cell).toLowerCase().includes(profitHeader))) {
      return i;
    }
  }
  return -1;
};

/**
 * Helper: Map headers to column indices
 */
const identifyColumnIndices = (headers: string[]) => {
  const profitIndex = headers.findIndex(h => MT5_HEADERS.PROFIT.includes(h));
  const symbolIndex = headers.findIndex(h => MT5_HEADERS.SYMBOL.includes(h));
  const ticketIndex = headers.findIndex(h => MT5_HEADERS.TICKET.includes(h));
  const commissionIndex = headers.findIndex(h => MT5_HEADERS.COMMISSION.includes(h));
  const swapIndex = headers.findIndex(h => MT5_HEADERS.SWAP.includes(h));
  const typeIndex = headers.findIndex(h => MT5_HEADERS.TYPE.includes(h));
  const volumeIndex = headers.findIndex(h => MT5_HEADERS.VOLUME.includes(h));
  
  const timeIndex = headers.findIndex(h => MT5_HEADERS.TIME.some(th => h.includes(th)));

  return { profitIndex, symbolIndex, ticketIndex, commissionIndex, swapIndex, typeIndex, volumeIndex, timeIndex };
};

/**
 * Helper: Validate if a row represents a real trade (not balance/summary)
 */
const isRowValidTrade = (row: unknown[], indices: ReturnType<typeof identifyColumnIndices>) => {
  const { profitIndex, symbolIndex, typeIndex, ticketIndex } = indices;
  
  if (!row || row.length < Math.max(profitIndex, symbolIndex)) return false;

  const symbol = String(row[symbolIndex] || '').trim();
  const type = String(row[typeIndex] || '').toLowerCase().trim();
  const ticket = String(row[ticketIndex] || '').trim();
  const profit = parseMT5Number(row[profitIndex]);
  
  const isValidSymbol = isValidMT5Symbol(symbol);
  const isRealTradeType = [...VALIDATION_KEYWORDS.TRADE_TYPES.BUY, ...VALIDATION_KEYWORDS.TRADE_TYPES.SELL]
    .some(t => type === t || type.startsWith(t));
  const isNumericTicket = /^\d+$/.test(ticket) && ticket.length >= MT5_THRESHOLDS.TICKET_MIN_LENGTH;
  
  const rowString = row.map(cell => String(cell).toLowerCase()).join(' ');
  const isBalanceRow = VALIDATION_KEYWORDS.BALANCE_RELATED.test(rowString) && 
                      !/commission|swap/i.test(rowString);
  const isSummaryRow = VALIDATION_KEYWORDS.SUMMARY_RELATED.some(s => rowString.includes(s));
  const isAboveBalanceThreshold = Math.abs(profit) >= MT5_THRESHOLDS.BALANCE_THRESHOLD;

  return isValidSymbol && isRealTradeType && isNumericTicket && !isBalanceRow && !isAboveBalanceThreshold && !isSummaryRow && profit !== 0;
};

/**
 * Helper: Map a raw row to a trade data object
 */
const mapRowToTradeData = (row: unknown[], indices: ReturnType<typeof identifyColumnIndices>) => {
  const { profitIndex, symbolIndex, typeIndex, ticketIndex, commissionIndex, swapIndex, volumeIndex, timeIndex } = indices;

  const ticket = String(row[ticketIndex] || '').trim();
  const symbol = String(row[symbolIndex] || '').trim();
  const type = String(row[typeIndex] || '').toLowerCase().trim();
  const profit = parseMT5Number(row[profitIndex]);
  const commission = commissionIndex !== -1 ? parseMT5Number(row[commissionIndex]) : 0;
  const swap = swapIndex !== -1 ? parseMT5Number(row[swapIndex]) : 0;
  const volume = volumeIndex !== -1 ? parseMT5Number(row[volumeIndex]) : 0;
  const time = String(row[timeIndex] || '');

  return { ticket, symbol, type, profit, commission, swap, volume, time };
};

/**
 * Extracts trades from raw data rows by identifying headers and mapping data
 */
export const extractTradesFromRows = (rawData: unknown[][]): ExtractionResult => {
  const headerRowIndex = findHeaderRowIndex(rawData);

  if (headerRowIndex === -1) {
    throw new Error(MT5_ERRORS.TABLE_NOT_FOUND);
  }

  const headers = rawData[headerRowIndex].map(h => String(h).trim().toLowerCase());
  const rowsData = rawData.slice(headerRowIndex + 1);
  const indices = identifyColumnIndices(headers);

  const tradesMap = new Map<string, MT5Trade>();

  rowsData.forEach((row) => {
    if (!isRowValidTrade(row, indices)) return;

    const tradeData = mapRowToTradeData(row, indices);
    const { ticket, profit, commission, swap } = tradeData;

    const existing = tradesMap.get(ticket);
    if (existing) {
      mergeTradeData(existing, profit, commission, swap);
    } else {
      tradesMap.set(ticket, createNewTrade(tradeData));
    }
  });

  return {
    trades: Array.from(tradesMap.values()),
    headerRowIndex
  };
};

