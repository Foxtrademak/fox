/**
 * Column Header Mappings for MT5 Reports (Multi-language support)
 */
export const MT5_HEADERS = {
  PROFIT: ['profit', 'الربح', 'الربح/الخسارة'],
  SYMBOL: ['symbol', 'الرمز', 'الأصل'],
  TICKET: ['position', 'ticket', 'order', 'رقم', 'التذكرة', '#'],
  COMMISSION: ['commission', 'العمولة', 'العمولات'],
  SWAP: ['swap', 'السواب', 'تبييت', 'الفوائد'],
  TYPE: ['type', 'النوع'],
  VOLUME: ['volume', 'الحجم'],
  TIME: ['time', 'الوقت', 'وقت']
};

/**
 * Error Messages
 */
export const MT5_ERRORS = {
  TABLE_NOT_FOUND: 'Positions table not found. Please ensure the file contains a symbol and profit column.',
  NO_TRADES_FOUND: 'No valid trades found in the report.'
};

/**
 * Reserved keywords and patterns for row validation
 */
export const VALIDATION_KEYWORDS = {
  BALANCE_RELATED: /balance|deposit|withdrawal|credit|initial|summary|رصيد|إيداع|سحب|أولي|ملخص/i,
  SUMMARY_RELATED: ['total', 'gross', 'net profit'],
  TRADE_TYPES: {
    BUY: ['buy', 'شراء'],
    SELL: ['sell', 'بيع']
  }
};

/**
 * Technical Thresholds
 */
export const MT5_THRESHOLDS = {
  BALANCE_THRESHOLD: 1000,
  TICKET_MIN_LENGTH: 5,
  HEADER_SEARCH_LIMIT: 100
};
