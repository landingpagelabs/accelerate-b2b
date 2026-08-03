import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { FaviconNotifier } from '@/components/FaviconNotifier';
import { isCanonicalHost, siteUrl } from '@/lib/site';

// Google Tag Manager container. Kept in an env var so a different container can be
// pointed at a preview deploy without a code change; the literal is the production one.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P8RGXRFT';

// Default site-wide metadata. Individual routes override these via generateMetadata;
// the home page prefers the `description` field in content/home.json, so this is only the
// fallback when that field is empty.
const title = 'Accelerate B2B | Cold Email & LinkedIn Outreach Agency';
const description =
  'A founder-led cold outreach agency that proves itself before you pay. We use cold email and LinkedIn outreach to build a predictable pipeline of perfect-fit prospects. Apply for your free test campaign.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  // While the site is still served from a *.vercel.app host it is a pre-launch staging
  // build, so keep it out of search results. noindex (not a robots.txt Disallow) is what
  // actually removes a page from the index, and it requires the page to stay crawlable.
  // Pointing NEXT_PUBLIC_SITE_URL at the real domain flips this on automatically.
  ...(isCanonicalHost ? {} : { robots: { index: false, follow: false } }),
  icons: {
    icon: { url: '/favicon.png', type: 'image/png' },
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Accelerate B2B',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Inter 500/600 are the only faces used above the fold. Without these the
            browser cannot discover them until the large stylesheet has parsed. */}
        <link rel="preload" href="/fonts/inter-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body>
        {/* GTM's noscript fallback has to be the first thing inside <body>, and it must be
            raw markup rather than next/script: the whole point is that it works with
            JavaScript disabled. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* afterInteractive, not beforeInteractive: GTM's own snippet loads gtm.js
            asynchronously anyway, so blocking first paint on it buys nothing and would
            undo the LCP work in the perf pass. This is also what Next documents for GTM.
            dataLayer is created by the snippet itself, so pushes from components that
            mount earlier still queue correctly. */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        <FaviconNotifier />
        {children}
      </body>
    </html>
  );
}
