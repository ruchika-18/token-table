// app/api/ticker/route.ts
import { NextResponse } from "next/server";

let prices: Record<string, number> = {
  BTC: 64000,
  ETH: 3400,
  SOL: 150,
  AVAX: 30,
  DOGE: 0.1,
};

export async function GET() {
  // Simulate small random movements
  for (const key in prices) {
    const delta = (Math.random() - 0.5) * 0.05; // ±2.5 %
    prices[key] = +(prices[key] * (1 + delta)).toFixed(2);
  }

  return NextResponse.json({
    timestamp: Date.now(),
    prices,
  });
}
