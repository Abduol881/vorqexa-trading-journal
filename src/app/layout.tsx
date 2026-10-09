import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Vorqexa Journal", description: "A focused workspace for recording trades and learning from your decisions." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
