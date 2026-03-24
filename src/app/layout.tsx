import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { poppins } from "./styles/font";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s - payment",
    default: "payment",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`antialiased ${poppins.className}`}>{children}</body>
    </html>
  );
}
