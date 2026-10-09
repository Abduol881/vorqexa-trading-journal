const nf = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const pf = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

export function money(n: number, sign = false): string {
  const s = n < 0 ? "\u2212" : sign && n > 0 ? "+" : "";
  return `${s}$${nf.format(Math.abs(n))}`;
}

export const price = (n: number) => pf.format(n);
export const qty = (n: number) => String(+n.toFixed(6));

export function signedR(r: number | null): string {
  if (r === null) return "\u2014";
  const s = r > 0 ? "+" : r < 0 ? "\u2212" : "";
  return `${s}${Math.abs(r).toFixed(2)}R`;
}

export function tone(n: number | null): string {
  return n === null || n === 0 ? "" : n > 0 ? "gain" : "loss";
}

export function shortDate(s: string): string {
  const d = new Date(`${s}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? s
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
