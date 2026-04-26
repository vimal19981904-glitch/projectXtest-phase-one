import { Inter, Poppins, Outfit, Josefin_Sans } from 'next/font/google';
import './globals.css';
import NavMegaMenu from '@/components/NavMegaMenu';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import PageTransition from '@/components/PageTransition';
import CookieConsent from '@/components/CookieConsent';
import AnalyticsClient from '@/components/AnalyticsClient';

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

const josefinSans = Josefin_Sans({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
});

export const metadata = {
  title: 'GapAnchor — Online Training & Job Support Platform',
  description: "The global leader in online IT training and real-time project assistance. We provide 24/7 on-job support for consultants and professionals across 100+ domains. Let's bridge the gap together.",
  keywords: 'job support, online training, IT consulting support, Oracle EPM support, SAP job support, Manhattan WMS training, corporate training, remote project assistance',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://gapanchor.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${poppins.variable} ${outfit.variable} ${josefinSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      </head>
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
