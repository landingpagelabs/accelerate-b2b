import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Indexable routes only. /congrats and /booking are intentionally noindex (they are
// post-conversion pages), so they are excluded here as well.
const routes = ['/', '/llm-info', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.6,
  }));
}
