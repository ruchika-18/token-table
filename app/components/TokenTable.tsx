/* eslint-disable react-hooks/refs */
// app/components/TokenTable.tsx
'use client';

import { fmtUSD, fmtPct } from "@/app/utils/format";
import type { Token } from "@/app/api/tokens/route";
import { useEffect, useRef } from "react";

type Props = { items: Token[]; loading?: boolean; error?: string | null };

export default function TokenTable({ items, loading, error }: Props) {
    // remember previous numbers between renders
const prev = useRef<Record<string, number>>({});

useEffect(() => {
  items.forEach((t) => {
    prev.current[t.id + "-price"] = t.price;
    prev.current[t.id + "-change1h"] = t.change1h;
    prev.current[t.id + "-change24h"] = t.change24h;
  });
}, [items]);
// returns "flash-green" / "flash-red" / "" comparing old vs new
const flash = (key: string, current: number) => {
  const old = prev.current[key];
  if (old === undefined) return "";         // first time: no flash
  if (current > old) return "flash-green";  // went up
  if (current < old) return "flash-red";    // went down
  return "";                                // unchanged
};


  if (loading) {
    return (
      <div className="p-4 text-slate-300">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400">Error: {error}</div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 overflow-hidden">
      {/* header */}
      <div className="grid grid-cols-5 md:grid-cols-7 bg-slate-900/60 px-3 py-2 text-sm">
        <div className="font-medium">Name</div>
        <div className="font-medium">Price</div>
        <div className="font-medium">1h %</div>
        <div className="font-medium">24h %</div>
        <div className="font-medium hidden md:block">24h Volume</div>
        <div className="font-medium hidden md:block">Liquidity</div>
        <div className="font-medium">Chain</div>
      </div>

      {/* rows */}
      <div className="divide-y divide-slate-800">
        {items.map((t) => (
          <div
            key={t.id}
            className="grid grid-cols-5 md:grid-cols-7 px-3 py-2 text-sm odd:bg-slate-900/10 hover:bg-slate-900/40 transition-colors"
          >
            <div className="font-medium">
              {t.name} <span className="text-slate-400">({t.symbol})</span>
            </div>
           <div className={`tabular-nums ${flash(t.id + "-price", t.price)}`}>
  {`$${t.price.toFixed(2)}`}
</div>

            <div className={`${t.change1h >= 0 ? "text-emerald-400" : "text-rose-400"} tabular-nums ${flash(t.id + "-change1h", t.change1h)}`}>
  {fmtPct(t.change1h)}
</div>

            <div className={`${t.change24h >= 0 ? "text-emerald-400" : "text-rose-400"} tabular-nums ${flash(t.id + "-change24h", t.change24h)}`}>
  {fmtPct(t.change24h)}
</div>

            <div className="hidden md:block tabular-nums">{fmtUSD(t.volume24h)}</div>
            <div className="hidden md:block tabular-nums">{fmtUSD(t.liquidity)}</div>
            <div className="text-slate-300">{t.chain}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
