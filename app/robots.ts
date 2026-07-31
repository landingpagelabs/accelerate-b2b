import type { MetadataRoute } from 'next';
import { isCanonicalHost, noindexRoutes, siteUrl } from '@/lib/site';

// Without this file the catch-all route ([...slug]) answered /robots.txt with an HTML
// page and a 200 status, so crawlers never received a valid robots file.
//
// While the site still lives on a *.vercel.app host it is a pre-launch staging build and
// must not be indexed — otherwise the staging URL competes with the real domain later.
// Setting NEXT_PUBLIC_SITE_URL to the production domain flips this to allow automatically.
export default function robots(): MetadataRoute.Robots {
  if (!isCanonicalHost) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: noindexRoutes,
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
