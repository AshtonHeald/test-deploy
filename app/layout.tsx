import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Header from "../components/Header";
import { cn } from "@/lib/utils"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Example Blog",
  description: "How to use Sanity.io as CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <Header />
        <main className="max-w-7xl min-h-screen mx-auto p-4">
        {children}
        </main>
        </body>
    </html>
  );
}
