"use client";

import { useState } from "react";
import { calcTrade } from "@/lib/journal/calc";
import { money, signedR, tone } from "@/lib/journal/format";
import type { Side, Trade } from "@/lib/journal/types";

const EMOTIONS = ["Calm", "Confident", "FOMO", "Fear", "Revenge", "Bored"];

function today(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function toNum(s: string): number | undefined {
  const n = parseFloat(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

const INITIAL = {
  date: "",
  symbol: "",
  side: "long" as Side,
  size: "",
  entry: "",
  exit: "",
  fees: "",
  stop: "",
  leverage: "",
  setup: "",
  emotion: "Calm",
  followedPlan: true,
  notes: "",
};

export default function TradeForm({ onSave }: { onSave: (t: Trade) => void }) {
  const [f, setF] = useState(INITIAL);
  const [message, setMessage] = useState<{ text: string; error: boolean }>({
    text: "",
    error: false,
  });

  function set<K extends keyof typeof INITIAL>(k: K, v: (typeof INITIAL)[K]) {
    setF((p) => ({ ...p, [k]: v }));
  }

  const size = toNum(f.size);
  const entry = toNum(f.entry);
  const exit = toNum(f.exit);
  const fees = toNum(f.fees) ?? 0;
  const stop = toNum(f.stop);
  const leverage = toNum(f.leverage);
  const preview =
    size && size > 0 && entry && entry > 0 && exit && exit > 0
      ? calcTrade({ side: f.side, size, entry, exit, fees, stop })
      : null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const fail = (text: string) => setMessage({ text, error: true });
    if (!f.symbol.trim()) return fail("Enter the market, for example PERP_BTC_USDC.");
    if (f.date && f.date > today()) return fail("The close date can't be in the future.");
    if (size === undefined || size <= 0) return fail("Size must be a number above zero.");
    if (entry === undefined || entry <= 0 || exit === undefined || exit <= 0)
      return fail("Entry and exit prices must be numbers above zero.");
    if (stop !== undefined && stop <= 0)
      return fail("Stop price must be above zero, or leave it empty.");
    if (fees < 0) return fail("Fees cannot be negative.");

    onSave({
      id: crypto.randomUUID(),
      date: f.date || today(),
      symbol: f.symbol.trim().toUpperCase(),
      side: f.side,
      size,
      entry,
      exit,
      fees,
      stop,
      leverage,
      setup: f.setup.trim(),
      emotion: f.emotion,
      followedPlan: f.followedPlan,
      notes: f.notes.trim(),
      createdAt: Date.now(),
    });
    setF({ ...INITIAL, date: f.date });
    setMessage({ text: "Trade saved.", error: false });
  }

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <h2>Log a trade</h2>
      <div className="fields">
        <div className="fld">
          <label htmlFor="f-date">Closed on (blank = today)</label>
          <input id="f-date" type="date" value={f.date} onChange={(e) => set("date", e.target.value)} />
        </div>
        <div className="fld">
          <label htmlFor="f-symbol">Market</label>
          <input id="f-symbol" className="mono" list="symbols" placeholder="PERP_BTC_USDC" autoComplete="off" value={f.symbol} onChange={(e) => set("symbol", e.target.value)} />
          <datalist id="symbols">
            {["PERP_BTC_USDC", "PERP_ETH_USDC", "PERP_SOL_USDC", "PERP_ARB_USDC", "PERP_NEAR_USDC"].map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>
        <div className="fld full">
          <span className="label">Side</span>
          <div className="seg" role="radiogroup" aria-label="Side">
            {(["long", "short"] as Side[]).map((s) => (
              <button key={s} type="button" role="radio" aria-checked={f.side === s} className={f.side === s ? `on ${s}` : ""} onClick={() => set("side", s)}>
                {s === "long" ? "Long" : "Short"}
              </button>
            ))}
          </div>
        </div>
        <div className="fld">
          <label htmlFor="f-size">Size (base units)</label>
          <input id="f-size" className="mono" inputMode="decimal" placeholder="0.05" value={f.size} onChange={(e) => set("size", e.target.value)} />
        </div>
        <div className="fld">
          <label htmlFor="f-lev">Leverage (x)</label>
          <input id="f-lev" className="mono" inputMode="decimal" placeholder="10" value={f.leverage} onChange={(e) => set("leverage", e.target.value)} />
        </div>
        <div className="fld">
          <label htmlFor="f-entry">Entry price</label>
          <input id="f-entry" className="mono" inputMode="decimal" placeholder="64200" value={f.entry} onChange={(e) => set("entry", e.target.value)} />
        </div>
        <div className="fld">
          <label htmlFor="f-exit">Exit price</label>
          <input id="f-exit" className="mono" inputMode="decimal" placeholder="65100" value={f.exit} onChange={(e) => set("exit", e.target.value)} />
        </div>
        <div className="fld">
          <label htmlFor="f-stop">Stop price (for R)</label>
          <input id="f-stop" className="mono" inputMode="decimal" placeholder="63700" value={f.stop} onChange={(e) => set("stop", e.target.value)} />
        </div>
        <div className="fld">
          <label htmlFor="f-fees">Fees (USDC)</label>
          <input id="f-fees" className="mono" inputMode="decimal" placeholder="3.20" value={f.fees} onChange={(e) => set("fees", e.target.value)} />
        </div>
        <div className="fld">
          <label htmlFor="f-setup">Setup</label>
          <input id="f-setup" list="setups" placeholder="Breakout" autoComplete="off" value={f.setup} onChange={(e) => set("setup", e.target.value)} />
          <datalist id="setups">
            {["Breakout", "Pullback", "Trend continuation", "Range fade", "Reversal", "News"].map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>
        <div className="fld">
          <label htmlFor="f-emotion">State of mind</label>
          <select id="f-emotion" value={f.emotion} onChange={(e) => set("emotion", e.target.value)}>
            {EMOTIONS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <div className="fld full">
          <label className="check" htmlFor="f-followed">
            <input id="f-followed" type="checkbox" checked={f.followedPlan} onChange={(e) => set("followedPlan", e.target.checked)} />
            I followed my plan on this trade
          </label>
        </div>
        <div className="fld full">
          <label htmlFor="f-notes">Notes and lessons</label>
          <textarea id="f-notes" placeholder="What did the chart show? What would you do differently?" value={f.notes} onChange={(e) => set("notes", e.target.value)} />
        </div>
        <div className="preview mono full" aria-live="polite">
          <span>
            Net PnL <b className={tone(preview?.pnl ?? null)}>{preview ? money(preview.pnl, true) : "\u2014"}</b>
          </span>
          <span>
            R <b className={tone(preview?.r ?? null)}>{preview ? signedR(preview.r) : "\u2014"}</b>
          </span>
        </div>
      </div>
      <button type="submit" className="btn primary">Save trade</button>
      <p className={message.error ? "msg err" : "msg"} role="status">{message.text}</p>
    </form>
  );
}