// app/utils/format.ts
export const fmtUSD = (n: number) =>
  n >= 1_000_000
    ? "$" + (n / 1_000_000).toFixed(1) + "M"
    : n >= 1_000
    ? "$" + (n / 1_000).toFixed(1) + "k"
    : "$" + n.toFixed(2);

export const fmtPct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
