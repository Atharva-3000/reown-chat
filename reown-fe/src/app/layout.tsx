import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { headers } from "next/headers"; // added

export const metadata: Metadata = {
  title: "AppKit ChatAI",
  description: "Powered by Reown AppKit"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // You can now access cookies using headers()
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cookies = (await headers()).get('cookie');

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}