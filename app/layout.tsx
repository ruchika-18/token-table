// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Token Discovery | Ruchika",
  description:
    "Browse tokens with tabs, search, sorting, shimmer loader, and live price flashes. Built with Next.js + TypeScript + Tailwind.",
  metadataBase: new URL("https://token-table-five.vercel.app"),
  themeColor: "#0b1220",
  icons: { icon: ["/token.svg", "/favicon.ico"] },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Token Discovery | Ruchika",
    description:
      "Next.js Token table with tabs, sorting, and live auto-refresh flashes.",
    url: "https://token-table-five.vercel.app",
    siteName: "Token Discovery",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Token Discovery | Ruchika",
    description:
      "Next.js Token table with tabs, sorting, and live auto-refresh flashes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
