export interface DailyRecord {
  id: string;
  date: string; // ISO string
  profitLoss: number;
  capitalBefore: number;
  capitalAfter: number;
  notes?: string;
  isMT5Import?: boolean;
  type?: 'trade' | 'withdrawal';
  updatedAt: number; // Timestamp for merging
  mt5Details?: {
    tradeCount: number;
    winCount: number;
    lossCount: number;
    totalCommission: number;
    totalSwap: number;
    symbols: string[];
  };
}

export interface MT5Trade {
  positionId: string;
  symbol: string;
  type: 'Buy' | 'Sell';
  volume: number;
  profit: number;
  commission: number;
  swap: number;
  closeTime: string;
  status: 'Win' | 'Loss';
  updatedAt: number; // Timestamp for merging
}

export interface AppState {
  initialCapital: number;
  currentCapital: number;
  records: DailyRecord[];
}
