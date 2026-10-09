import { byTime } from "@/lib/journal/calc";
import { money, shortDate, tone } from "@/lib/journal/format";
import type { TradeWithResult } from "@/lib/journal/types";

const W = 560;
const H = 240;
const PL = 56;
const PR = 16;
const PT = 24;
const PB = 28;

function niceStep(raw: number): number {
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
}

function tick(v: number, step: number): string {
  const a = Math.abs(v);
  const s = v < 0 ? "\u2212" : "";
  if (a >= 1000) return `${s}$${+(a / 1000).toFixed(1)}k`;
  return `${s}$${step < 1 ? a.toFixed(2) : a.toFixed(0)}`;
}

export default function EquityCurve({ trades }: { trades: TradeWithResult[] }) {
  if (!trades.length) {
    return <p className="foot">The curve draws itself as you log closed trades.</p>;
  }

  const sorted = [...trades].sort(byTime);
  const pts = [0];
  for (const t of sorted) pts.push(pts[pts.length - 1] + t.result.pnl);

  let min = Math.min(...pts);
  let max = Math.max(...pts);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const step = niceStep((max - min) / 4);
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;

  const x = (i: number) => PL + (pts.length > 1 ? i / (pts.length - 1) : 0) * (W - PL - PR);
  const y = (v: number) => PT + ((hi - v) / (hi - lo)) * (H - PT - PB);

  const ticks: number[] = [];
  const count = Math.round((hi - lo) / step);
  for (let i = 0; i <= count; i++) ticks.push(lo + i * step);

  const line = pts
    .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(pts.length - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;
  const last = pts[pts.length - 1];
  const lx = x(pts.length - 1);
  const ly = y(last);
  const ty = ly - 12 < PT - 6 ? ly + 20 : ly - 12;

  return (
    <svg className="curve" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Cumulative net PnL by trade">
      {ticks.map((v) => (
        <g key={v}>
          <line className="c-grid" x1={PL} x2={W - PR} y1={y(v)} y2={y(v)} />
          <text className="c-text" x={PL - 8} y={y(v) + 4} textAnchor="end">
            {tick(Math.abs(v) < step / 1000 ? 0 : v, step)}
          </text>
        </g>
      ))}
      <line className="c-zero" x1={PL} x2={W - PR} y1={y(0)} y2={y(0)} />
      <path className="c-area" d={area} />
      <path className="c-line" d={line} />
      <circle className="c-end" cx={lx} cy={ly} r={5} />
      <text className={`c-val ${tone(last)}`} x={lx} y={ty} textAnchor="end">
        {money(last, true)}
      </text>
      <text className="c-text" x={PL} y={H - 8}>{shortDate(sorted[0].date)}</text>
      <text className="c-text" x={W - PR} y={H - 8} textAnchor="end">
        {shortDate(sorted[sorted.length - 1].date)}
      </text>
    </svg>
  );
}