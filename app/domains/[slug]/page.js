import { notFound } from 'next/navigation';
import domainContentMap from '@/lib/domainContentMap';
import DomainClient from './DomainClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const content = domainContentMap[slug];

  if (!content) return {};

  const seo = content.seo || {
    metaTitle: `${content.title} Online Training & Job Support | Professional Certification | GapAnchor`,
    metaDescription: content.heroDescription || `Get expert ${content.title} online training and 24/7 on-job support. Master ${content.category} with real-time practitioners. Book a free demo today!`,
  };

  const keywords = seo.keywords || `${content.title} training, ${content.title} job support, ${content.title} online course, ${content.category} training, professional IT support`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: keywords,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      type: 'website',
      siteName: 'GapAnchor',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
    alternates: {
      canonical: `https://gapanchor.com/domains/${slug}`,
    },
  };
}

export default async function DomainPage({ params }) {
  const { slug } = await params;
  const content = domainContentMap[slug];

  if (!content) {
    notFound();
  }

  return <DomainClient content={content} />;
}
