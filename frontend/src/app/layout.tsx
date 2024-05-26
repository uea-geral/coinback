import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
  title: "coinback",
  description: "dApp para controle de cashback",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
