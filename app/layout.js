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
  description:
    'The unified Skill Training & On-Job Support Platform. Manhattan WMS, SAP, Oracle, Cloud Computing courses with expert trainers and 24/7 support.',
  keywords: 'online training, job support, Manhattan WMS, SAP training, Oracle, cloud computing, corporate training',
};

import PageTransition from '@/components/PageTransition';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <NavMegaMenu />
        <PageTransition>
          <main className="pt-[64px]">{children}</main>
        </PageTransition>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
