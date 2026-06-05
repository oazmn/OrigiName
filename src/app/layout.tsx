import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Originame",
  description: "A name appears from somewhere on Earth. Pin where you think it comes from and score points.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the nonce injected by middleware so that Next.js internal scripts
  // satisfy the nonce-based Content-Security-Policy set on each response.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased" {...(nonce ? { "data-nonce": nonce } : {})}>
        {children}
      </body>
    </html>
  );
}
