export interface DailyRecord {
  id: string;
  date: string; // ISO string
  profitLoss: number;
  capitalBefore: number;
  capitalAfter: number;
  notes?: string;
}

export interface AppState {
  initialCapital: number;
  currentCapital: number;
  records: DailyRecord[];
}
