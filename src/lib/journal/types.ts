export type Side = "long" | "short";

export interface Trade {
  id: string;
  date: string; // YYYY-MM-DD, the day the trade closed
  symbol: string; // e.g. PERP_BTC_USDC
  side: Side;
  size: number; // base units
  entry: number;
  exit: number;
  fees: number; // USDC
  stop?: number;
  leverage?: number;
  setup: string;
  emotion: string;
  followedPlan: boolean;
  notes: string;
  createdAt: number; // ms timestamp, used to order trades on the same day
}

export interface TradeResult {
  pnl: number; // net of fees
  r: number | null; // null when no stop was recorded
}

export interface TradeWithResult extends Trade {
  result: TradeResult;
}

export interface Summary {
  count: number;
  net: number;
  wins: number;
  winRate: number | null;
  profitFactor: number | null; // Infinity when there are wins and no losses
  avgR: number | null;
  rCount: number;
  maxDrawdown: number;
  expectancy: number | null; // average net PnL per trade
}
