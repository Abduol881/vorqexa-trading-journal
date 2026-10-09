"use client";

import { useMemo } from "react";
import EquityCurve from "@/components/EquityCurve";
import Insights from "@/components/Insights";
import Ledger from "@/components/Ledger";
import TradeForm from "@/components/TradeForm";
import { summarize, withResults } from "@/lib/journal/calc";
import { money, signedR, tone } from "@/lib/journal/format";
import { deleteTrade, saveTrade, useTrades } from "@/lib/journal/storage";

export default function Home() {
  const trades = useTrades();
  const rows = useMemo(() => withResults(trades), [trades]);
  const s = useMemo(() => summarize(rows), [rows]);
  const none = s.count === 0;

  const tiles = [
    { label: "Net PnL", value: none ? "\u2014" : money(s.net, true), cls: none ? "" : tone(s.net), sub: none ? "No trades yet" : `${s.count} ${s.count === 1 ? "trade" : "trades"}` },
    { label: "Win rate", value: s.winRate === null ? "\u2014" : `${Math.round(s.winRate * 100)}%`, cls: "", sub: none ? "" : `${s.wins} won, ${s.count - s.wins} not` },
    { label: "Profit factor", value: s.profitFactor === null ? "\u2014" : s.profitFactor === Infinity ? "\u221E" : s.profitFactor.toFixed(2), cls: "", sub: "Gross win / gross loss" },
    { label: "Average R", value: signedR(s.avgR), cls: tone(s.avgR), sub: s.rCount ? `Across ${s.rCount} with a stop` : "Add stops to see R" },
    { label: "Max drawdown", value: none ? "\u2014" : money(-s.maxDrawdown), cls: s.maxDrawdown ? "loss" : "", sub: "Peak to trough" },
  ];

  return (
    <main className="shell">
      <header className="brand">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path d="M3 5l10 17L23 5" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
          <path d="M8.5 5h9" stroke="currentColor" strokeWidth="3" strokeLinecap="square" opacity=".45" />
        </svg>
        <h1>Vorqexa <span>Journal</span></h1>
      </header>

      <section className="stats" aria-label="Performance summary">
        {tiles.map((t) => (
          <div className="stat" key={t.label}>
            <span className="label">{t.label}</span>
            <span className={`v ${t.cls}`}>{t.value}</span>
            <span className="s">{t.sub}</span>
          </div>
        ))}
      </section>

      <div className="grid">
        <TradeForm onSave={saveTrade} />
        <div className="main">
          <section>
            <h2>Equity curve</h2>
            <EquityCurve trades={rows} />
          </section>
          <section>
            <h2>Ledger</h2>
            <Ledger trades={rows} onDelete={deleteTrade} />
            <p className="foot">Net PnL is price move times size, minus fees. R is net PnL divided by the amount risked between entry and stop. Trades are saved in this browser.</p>
          </section>
          <section>
            <h2>Review</h2>
            <Insights trades={rows} />
          </section>
        </div>
      </div>
    </main>
  );
}