import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Care & Share Foundation",
  description: "Serving To Make A DIFFERENCE Where It Matters The Most",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
