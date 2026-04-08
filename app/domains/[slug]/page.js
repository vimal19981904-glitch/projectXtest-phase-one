import { notFound } from 'next/navigation';
import { domainContentMap } from '@/lib/domainContentMap';
import DomainClient from './DomainClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const content = domainContentMap[slug];

  if (!content) return {};

  const seo = content.seo || {
    metaTitle: `${content.title} | Professional Training & Job Support | Project X`,
    metaDescription: content.heroDescription || content.about?.substring(0, 160),
  };

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords || content.category,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      type: 'website',
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
