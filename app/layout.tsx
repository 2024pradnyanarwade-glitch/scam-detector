import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scam Detector",
  description: "AI-powered scam message detector",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
