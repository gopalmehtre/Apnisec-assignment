import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ApniSec - Enterprise Cybersecurity Solutions',
  description: 'Protect your business with enterprise-grade cybersecurity solutions. Cloud Security, VAPT, and Red Team Assessment services.',
  keywords: 'cybersecurity, VAPT, cloud security, penetration testing, red team, security assessment',
  authors: [{ name: 'ApniSec' }],
  openGraph: {
    title: 'ApniSec - Enterprise Cybersecurity Solutions',
    description: 'Enterprise-grade cybersecurity solutions to protect your business.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-gray-50 min-h-screen flex flex-col'}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}