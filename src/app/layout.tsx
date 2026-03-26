import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./styles/globals.css";
import Navbar from "@/components/navbar/navbar";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`antialiased ${poppins.className}`}>
        
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
