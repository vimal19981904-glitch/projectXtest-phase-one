import { domainContentMap } from '@/lib/domainContentMap';

export default async function sitemap() {
  const baseUrl = 'https://gapanchor.com';

  // Static routes
  const staticRoutes = [
    '',
    '/job-support',
    '/work-with-us',
    '/blog',
    '/manhattan-wms',
    '/sign-in',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic domain routes
  const domainRoutes = Object.keys(domainContentMap).map((slug) => ({
    url: `${baseUrl}/domains/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...domainRoutes];
}
