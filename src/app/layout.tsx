import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heritage Analyser",
  description: "Discover the cultural origins of your name",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
