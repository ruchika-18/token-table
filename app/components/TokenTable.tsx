/* eslint-disable react-hooks/refs */
// app/components/TokenTable.tsx
'use client';


import * as Popover from "@radix-ui/react-popover";
import { fmtUSD, fmtPct } from "@/app/utils/format";
import type { Token } from "@/app/api/tokens/route";
import { useEffect, useRef, useState } from "react";

type Props = { items: Token[]; loading?: boolean; error?: string | null };

export default function TokenTable({ items, loading, error }: Props) {
 
  // modal selection
const [selected, setSelected] = useState<Token | null>(null);
// TEMP test: allow opening the modal from browser console



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
        <Popover.Root>
  <Popover.Trigger className="font-medium underline decoration-dotted">
    Liquidity
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content className="rounded-md bg-slate-900 text-slate-100 p-3 text-sm shadow hidden md:block" sideOffset={8}>
      Pool depth available to trade without heavy slippage.
      <Popover.Arrow className="fill-slate-900" />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>

        <div className="font-medium">Chain</div>
      </div>

      {/* rows */}
<div className="divide-y divide-slate-800">
  {items.map((t) => (
    <div
      key={t.id}
      onClick={() => {
  console.log("row click", t.id); // just to check
  setSelected(t); // opens modal
}}

      className="cursor-pointer grid grid-cols-5 md:grid-cols-7 px-3 py-2 text-sm odd:bg-slate-900/10 hover:bg-slate-900/40 transition-colors"
    >
      {/* name */}
      <div className="font-medium">
        {t.name} <span className="text-slate-400">({t.symbol})</span>
      </div>

      {/* price */}
      <div className="tabular-nums">${t.price.toFixed(2)}</div>

      {/* 1h % */}
      <div className={`${t.change1h >= 0 ? "text-emerald-400" : "text-rose-400"} tabular-nums`}>
        {t.change1h.toFixed(2)}%
      </div>

      {/* 24h % */}
      <div className={`${t.change24h >= 0 ? "text-emerald-400" : "text-rose-400"} tabular-nums`}>
        {t.change24h.toFixed(2)}%
      </div>

      {/* 24h volume / liquidity (hidden on mobile) */}
      <div className="hidden md:block tabular-nums">${(t.volume24h / 1000).toFixed(1)}k</div>
      <div className="hidden md:block tabular-nums">${(t.liquidity / 1000).toFixed(1)}k</div>

      {/* chain */}
      <div className="text-slate-300">{t.chain}</div>
    </div>
  ))}
</div>

{/* modal (place this AFTER the map, still inside the same parent return) */}
{selected && (
  <div
    className="fixed inset-0 bg-black/50 grid place-items-center z-50"
    onClick={() => setSelected(null)}
    aria-modal="true"
    role="dialog"
  >
    <div
      className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-6 w-[min(520px,92vw)] shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">
          {selected.name} <span className="text-slate-500">({selected.symbol})</span>
        </h3>
        <button
          onClick={() => setSelected(null)}
          className="rounded-md px-2 py-1 text-sm bg-slate-800 text-white hover:bg-slate-700"
        >
          Close
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div><span className="text-slate-500">Chain:</span> {selected.chain}</div>
        <div><span className="text-slate-500">Price:</span> ${selected.price.toFixed(2)}</div>
        <div><span className="text-slate-500">1h:</span> {selected.change1h.toFixed(2)}%</div>
        <div><span className="text-slate-500">24h:</span> {selected.change24h.toFixed(2)}%</div>
        <div className="col-span-2"><span className="text-slate-500">Liquidity:</span> ${selected.liquidity.toLocaleString()}</div>
        <div className="col-span-2"><span className="text-slate-500">24h Volume:</span> ${selected.volume24h.toLocaleString()}</div>
      </div>
    </div>
  </div>
)}
      </div>
  );
}
