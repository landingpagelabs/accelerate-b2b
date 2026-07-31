/**
 * Canonical public origin for the site.
 *
 * NEXT_PUBLIC_SITE_URL should be set in Vercel to the stable production domain.
 * Without it we fall back to VERCEL_URL, which is the *per-deployment* hash host
 * (e.g. accelerate-b2b-qbvobpa1i-landing-page-labs.vercel.app) — usable for previews
 * but wrong for canonical URLs and OG tags, because that host changes every deploy.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
).replace(/\/$/, '');

const hostname = siteUrl.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();

/**
 * True once the site is served from its real domain rather than a *.vercel.app preview /
 * staging host or localhost. Used to keep the pre-launch build out of search results —
 * see app/robots.ts. Setting NEXT_PUBLIC_SITE_URL to the live domain flips this on.
 */
export const isCanonicalHost =
  hostname.length > 0 && !hostname.endsWith('.vercel.app') && !hostname.startsWith('localhost');

/** Routes deliberately kept out of search results (they also send noindex headers). */
export const noindexRoutes = ['/congrats', '/booking'];
