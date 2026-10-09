import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vorqexa Journal",
  description: "A private workspace for trading records, risk, and performance review.",
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
