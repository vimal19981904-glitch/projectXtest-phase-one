import HomeContent from '@/components/HomeContent';

export const metadata = {
  title: 'GapAnchor | Online Training, Job Support & IT Consulting Firm Support',
  description: 'The global leader in online IT training and real-time project assistance. We provide 24/7 on-job support for consultants and professionals across 100+ domains. Let\'s bridge the gap together.',
  keywords: 'job support, online training, IT consulting support, Oracle EPM support, SAP job support, Manhattan WMS training, corporate training, remote project assistance',
  openGraph: {
    title: 'GapAnchor | Online Training, Job Support & IT Consulting',
    description: 'Master enterprise software with expert-led training and real-time job support. Trusted by consultants at 4SIGHT, Deloitte, and IBM.',
    url: 'https://gapanchor.com',
    type: 'website',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'GapAnchor Training & Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GapAnchor | Professional Training & Job Support',
    description: 'Expert-led training and real-time on-job support for modern IT enterprise domains.',
  },
};

export default function Page() {
  return <HomeContent />;
}
