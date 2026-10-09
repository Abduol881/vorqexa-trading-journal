import { summarize } from "@/lib/journal/calc";
import { money, tone } from "@/lib/journal/format";
import type { TradeWithResult } from "@/lib/journal/types";

function Group({
  title,
  trades,
  keyOf,
}: {
  title: string;
  trades: TradeWithResult[];
  keyOf: (t: TradeWithResult) => string;
}) {
  const groups = new Map<string, TradeWithResult[]>();
  for (const t of trades) {
    const k = keyOf(t);
    groups.set(k, [...(groups.get(k) ?? []), t]);
  }
  const rows = [...groups.entries()]
    .map(([k, list]) => ({ k, s: summarize(list) }))
    .sort((a, b) => b.s.net - a.s.net);
  const maxAbs = Math.max(1, ...rows.map((r) => Math.abs(r.s.net)));

  return (
    <div className="group">
      <h3>{title}</h3>
      {rows.map(({ k, s }) => {
        const w = (Math.abs(s.net) / maxAbs) * 50;
        return (
          <div className="brow" key={k}>
            <span className="nm">{k}</span>
            <span className={`mono ${tone(s.net)}`}>{money(s.net, true)}</span>
            <span className="meta">
              {s.count} {s.count === 1 ? "trade" : "trades"} · {Math.round((s.winRate ?? 0) * 100)}% won · avg {money(s.expectancy ?? 0, true)}
            </span>
            <div className="bar">
              <i className={tone(s.net)} style={s.net >= 0 ? { left: "50%", width: `${w}%` } : { right: "50%", width: `${w}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Insights({ trades }: { trades: TradeWithResult[] }) {
  if (trades.length < 2) {
    return <p className="foot">Log a few trades and this section compares your discipline, your setups and your state of mind.</p>;
  }
  return (
    <>
      <Group title="Discipline" trades={trades} keyOf={(t) => (t.followedPlan ? "Followed the plan" : "Broke the plan")} />
      <Group title="By setup" trades={trades} keyOf={(t) => t.setup || "Untagged"} />
      <Group title="By state of mind" trades={trades} keyOf={(t) => t.emotion || "Unlabeled"} />
    </>
  );
}