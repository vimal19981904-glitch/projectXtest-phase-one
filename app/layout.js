import { Inter, Poppins, Outfit } from 'next/font/google';
import './globals.css';
import NavMegaMenu from '@/components/NavMegaMenu';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: 'GapAnchor — Online Training & Job Support Platform',
  description: 'The global leader in online IT training and real-time project assistance. We provide 24/7 on-job support for consultants and professionals across 100+ domains. Let\'s bridge the gap together.',
  keywords: 'job support, online training, IT consulting support, Oracle EPM support, SAP job support, Manhattan WMS training, corporate training, remote project assistance',
};

import PageTransition from '@/components/PageTransition';
import CookieConsent from '@/components/CookieConsent';
import AnalyticsClient from '@/components/AnalyticsClient';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${poppins.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <AnalyticsClient />
        <NavMegaMenu />
        <PageTransition>
          <main className="pt-[64px]">{children}</main>
        </PageTransition>
        <Footer />
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
