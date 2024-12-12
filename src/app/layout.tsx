import '~/styles/globals.css';

import { Geist, Geist_Mono } from 'next/font/google';
import { type Metadata } from 'next';
import Footer from '~/components/Footer';
import type { ReactNode } from 'react';
import Header from '~/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Comunitat Energètica Malgrat',
  description: 'Web oficial de la Comunitat Energètica de Malgrat de Mar',
  applicationName: 'Energia Malgrat',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/icon.svg' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
