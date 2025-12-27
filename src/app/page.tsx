import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Feature';
import { Services } from '@/components/home/Services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ApniSec - Enterprise Cybersecurity Solutions',
  description: 'Protect your business with enterprise-grade cybersecurity solutions. Cloud Security, VAPT, and Red Team Assessment services by ApniSec.',
  keywords: 'cybersecurity, VAPT, cloud security, penetration testing, red team, security assessment, ApniSec',
  authors: [{ name: 'ApniSec' }],
  openGraph: {
    title: 'ApniSec - Enterprise Cybersecurity Solutions',
    description: 'Enterprise-grade cybersecurity solutions to protect your business from evolving threats.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Services />
    </div>
  );
}