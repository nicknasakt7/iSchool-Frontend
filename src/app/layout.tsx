import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";


import { cn } from "@/lib/utils";

import "./styles/globals.css";

import Navbar from "@/components/navbar/navbar";
import { Poppins } from "next/font/google";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins", // 👈 สำคัญ
});



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
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`antialiased ${poppins.className}`}>{children}</body>
    <html lang="en">
      <body>
        <Navbar/>
        
        {children}
      </body>
    </html>
  );
}
