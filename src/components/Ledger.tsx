"use client";

import { useState } from "react";
import { byTime } from "@/lib/journal/calc";
import { money, price, qty, shortDate, signedR, tone } from "@/lib/journal/format";
import type { TradeWithResult } from "@/lib/journal/types";

export default function Ledger({
  trades,
  onDelete,
}: {
  trades: TradeWithResult[];
  onDelete: (id: string) => void;
}) {
  const [armed, setArmed] = useState<string | null>(null);

  function del(id: string) {
    if (armed === id) {
      setArmed(null);
      onDelete(id);
      return;
    }
    setArmed(id);
    setTimeout(() => setArmed((a) => (a === id ? null : a)), 3500);
  }

  if (!trades.length) {
    return (
      <div className="tablewrap">
        <div className="empty">
          <strong>Your journal is empty</strong>
          <span>Log your first closed trade with the form. The stats, curve and review fill in as you go.</span>
        </div>
      </div>
    );
  }

  const rows = [...trades].sort((a, b) => byTime(b, a));
  return (
    <div className="tablewrap">
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Market</th><th>Side</th>
            <th className="n">Size</th><th className="n">Entry</th><th className="n">Exit</th>
            <th className="n">Net PnL</th><th className="n">R</th>
            <th>Setup</th><th>Plan</th><th></th>
          </tr>
        </thead>
        <tbody>
          {rows.flatMap((t) => {
            const main = (
              <tr key={t.id}>
                <td className="mono">{shortDate(t.date)}</td>
                <td className="mono">{t.symbol}</td>
                <td><span className={`pill ${t.side}`}>{t.side}</span></td>
                <td className="n mono">{qty(t.size)}</td>
                <td className="n mono">{price(t.entry)}</td>
                <td className="n mono">{price(t.exit)}</td>
                <td className={`n mono ${tone(t.result.pnl)}`}>{money(t.result.pnl, true)}</td>
                <td className={`n mono ${tone(t.result.r)}`}>{signedR(t.result.r)}</td>
                <td className="tag">{t.setup || "\u2014"}</td>
                <td className="tag">{t.followedPlan ? "On plan" : "Broke plan"}</td>
                <td className="n">
                  <button type="button" className={armed === t.id ? "btn sm warn" : "btn sm"} onClick={() => del(t.id)}>
                    {armed === t.id ? "Confirm delete" : "Delete"}
                  </button>
                </td>
              </tr>
            );
            return t.notes
              ? [main, <tr key={`${t.id}-n`} className="note"><td colSpan={11}>{t.notes}</td></tr>]
              : [main];
          })}
        </tbody>
      </table>
    </div>
  );
}