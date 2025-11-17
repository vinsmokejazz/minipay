import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from "@/components/providers/root-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MiniPay | Modern Money Management",
  description:
    "One secure place to open multi-currency accounts, move money instantly, and unlock premium fintech perks.",
  metadataBase: new URL("https://minipay.local"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="noise" aria-hidden />
        <div className="relative isolate min-h-screen overflow-hidden">
          <RootProvider>{children}</RootProvider>
        </div>
      </body>
    </html>
  );
}
