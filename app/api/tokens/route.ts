// app/api/tokens/route.ts
import { NextResponse } from "next/server";

export type Token = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
  chain: "ETH" | "BSC" | "SOL";
  status: "New pairs" | "Final Stretch" | "Migrated";
};

// helper to get random numbers
const rand = (min: number, max: number) =>
  +(min + Math.random() * (max - min)).toFixed(2);

// function to make fake tokens
function makeToken(i: number, status: Token["status"]): Token {
  const names = ["Axiom", "Nova", "Orion", "Delta", "Pico", "Quark", "Zen"];
  const name = `${names[i % names.length]}-${i}`;
  const symbol = name.slice(0, 3).toUpperCase();

  return {
    id: String(i),
    name,
    symbol,
    status,
    chain: (["ETH", "BSC", "SOL"] as const)[i % 3],
    price: rand(0.1, 25),
    change1h: rand(-5, 5),
    change24h: rand(-20, 20),
    volume24h: Math.floor(40_000 + Math.random() * 1_000_000),
    liquidity: Math.floor(80_000 + Math.random() * 2_000_000),
  };
}

export async function GET(req: Request) {
  // small delay to feel real
  await new Promise((r) => setTimeout(r, 500));

  const { searchParams } = new URL(req.url);
  const status = (searchParams.get("status") as Token["status"]) || "New pairs";
  const q = (searchParams.get("q") || "").toLowerCase();
  const sortKey = (searchParams.get("sortKey") ||
    "volume24h") as keyof Token;
  const dir = (searchParams.get("dir") || "desc") as "asc" | "desc";

  // make 60 fake tokens
  let items = Array.from({ length: 60 }, (_, i) => makeToken(i, status));

  // filter by search
  if (q) {
    items = items.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.symbol.toLowerCase().includes(q)
    );
  }

  // sort
  items.sort((a: any, b: any) => {
    const va = a[sortKey];
    const vb = b[sortKey];
    if (typeof va === "number" && typeof vb === "number") {
      return dir === "asc" ? va - vb : vb - va;
    }
    return 0;
  });

  // return JSON data
  return NextResponse.json({ items });
}
