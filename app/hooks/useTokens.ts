// app/hooks/useTokens.ts
import { useQuery } from "@tanstack/react-query";
import type { Token } from "@/app/api/tokens/route";

export type SortKey = "price" | "change1h" | "change24h" | "volume24h" | "liquidity";

export function useTokens(params: {
  status: Token["status"];
  q: string;
  sortKey: SortKey;
  dir: "asc" | "desc";
}) {
  const { status, q, sortKey, dir } = params;

  return useQuery({
  queryKey: ["tokens", status, q, sortKey, dir],
  queryFn: async () => {
    const url = `/api/tokens?status=${encodeURIComponent(
      status
    )}&q=${encodeURIComponent(q)}&sortKey=${sortKey}&dir=${dir}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch tokens");
    return (await res.json()) as { items: Token[] };
  },
  staleTime: 10_000,
  refetchInterval: 30_000, // refresh every 30 seconds
});

}
