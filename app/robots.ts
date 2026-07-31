import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Without this file the catch-all route ([...slug]) answered /robots.txt with an HTML
// page and a 200 status, so crawlers never received a valid robots file.
//
// Note there is deliberately no Disallow here, not even for /congrats and /booking.
// Disallow blocks the crawl, which means a page's `noindex` is never read — the directive
// that actually keeps a page out of the index gets silenced by the one that doesn't. Those
// two routes send `noindex` in their own metadata and must stay crawlable for it to work.
// robots.txt is also public, so listing private paths just advertises them.
//
// Keeping the pre-launch build out of search is handled the same way: app/layout.tsx sends
// a site-wide `noindex` while the site is still on a *.vercel.app host.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
