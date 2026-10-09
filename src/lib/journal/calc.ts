import type { Summary, Trade, TradeResult, TradeWithResult } from "./types";

export function calcTrade(
  t: Pick<Trade, "side" | "size" | "entry" | "exit" | "fees" | "stop">,
): TradeResult {
  const dir = t.side === "short" ? -1 : 1;
  const pnl = dir * (t.exit - t.entry) * t.size - t.fees;
  const risk =
    t.stop !== undefined && t.stop > 0
      ? Math.abs(t.entry - t.stop) * t.size
      : null;
  return { pnl, r: risk ? pnl / risk : null };
}

export function withResults(trades: Trade[]): TradeWithResult[] {
  return trades.map((t) => ({ ...t, result: calcTrade(t) }));
}

export function byTime(a: Trade, b: Trade): number {
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;
  return a.createdAt - b.createdAt;
}

export function summarize(list: TradeWithResult[]): Summary {
  let net = 0;
  let grossWin = 0;
  let grossLoss = 0;
  let wins = 0;
  const rs: number[] = [];

  for (const t of list) {
    const p = t.result.pnl;
    net += p;
    if (p > 0) {
      grossWin += p;
      wins++;
    } else if (p < 0) {
      grossLoss -= p;
    }
    if (t.result.r !== null) rs.push(t.result.r);
  }

  let cum = 0;
  let peak = 0;
  let maxDrawdown = 0;
  for (const t of [...list].sort(byTime)) {
    cum += t.result.pnl;
    if (cum > peak) peak = cum;
    if (peak - cum > maxDrawdown) maxDrawdown = peak - cum;
  }

  const count = list.length;
  return {
    count,
    net,
    wins,
    winRate: count ? wins / count : null,
    profitFactor:
      grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? Infinity : null,
    avgR: rs.length ? rs.reduce((a, b) => a + b, 0) / rs.length : null,
    rCount: rs.length,
    maxDrawdown,
    expectancy: count ? net / count : null,
  };
}
