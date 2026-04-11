import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './styles/globals.css';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import Providers from './provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins', // 👈 สำคัญ
});

export const metadata: Metadata = {
  title: {
    template: '%s - payment',
    default: 'iSchool',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth()

  return (
    <html lang="en" className={cn(`antialiased ${poppins.className}`)} suppressHydrationWarning>
      <body className={`antialiased ${poppins.className}`}>
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
