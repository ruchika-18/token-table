// /app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

// app/layout.tsx
export const metadata = {
  title: "Token Discovery | Ruchika",
  description:
    "Browse tokens with tabs, search, sorting and live 30s refresh with green/red flashes. Built with Next.js + TypeScript + Tailwind.",
  metadataBase: new URL("https://token-table-five.vercel.app"),
  themeColor: "#0b1220",
  icons: {
    icon: ["/token.svg", "/favicon.ico"], // we'll add token.svg next
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Token Discovery | Ruchika",
    description:
      "Tabs, search, sorting and live flashes. Next.js + TypeScript + Tailwind.",
    url: "https://token-table-five.vercel.app",
    siteName: "Token Discovery",
    images: [],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Token Discovery | Ruchika",
    description:
      "Tabs, search, sorting and live flashes. Next.js + TypeScript + Tailwind.",
  },
};

