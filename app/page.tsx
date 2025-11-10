// app/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { setStatus, setQuery, setSort } from "@/store";
import TokenTable from "./components/TokenTable";
import { useTokens } from "./hooks/useTokens";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const ui = useSelector((s: RootState) => s.ui);

  // local mirror for search input
  const [qLocal, setQLocal] = useState("");
  useEffect(() => setQLocal(ui.q ?? ""), [ui.q]);

  const { data, isLoading, isError, error } = useTokens({
    status: ui.status,
    q: ui.q,
    sortKey: ui.sort.key as any,
    dir: ui.sort.dir,
  });

  return (
    <main className="min-h-screen p-6 flex flex-col gap-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold">Token Discovery</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["New pairs", "Final Stretch", "Migrated"] as const).map((s) => (
          <button
            key={s}
            onClick={() => dispatch(setStatus(s))}
            className={`px-3 py-1 rounded-full border ${
              ui.status === s ? "bg-white text-slate-900" : "border-slate-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        value={qLocal}
        onChange={(e) => {
          const v = e.target.value;
          setQLocal(v);
          dispatch(setQuery(v));
        }}
        placeholder="Search tokens…"
        className="bg-slate-900 text-slate-100 border border-slate-700 rounded px-3 py-2 outline-none max-w-md"
      />

      {/* Sort */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-300">Sort by:</span>
        {(["price","change1h","change24h","volume24h","liquidity"] as const).map((k) => (
          <button
            key={k}
            onClick={() => {
              const dir = ui.sort.key === k && ui.sort.dir === "desc" ? "asc" : "desc";
              dispatch(setSort({ key: k, dir }));
            }}
            className={`px-2 py-1 rounded border text-sm ${
              ui.sort.key === k ? "bg-white text-slate-900" : "border-slate-700"
            }`}
          >
            {k}{ui.sort.key === k ? (ui.sort.dir === "asc" ? " ▲" : " ▼") : ""}
          </button>
        ))}
      </div>

      {/* Table */}
      <TokenTable
        items={data?.items ?? []}
        loading={isLoading}
        error={isError ? (error as Error).message : null}
      />
    </main>
  );
}
