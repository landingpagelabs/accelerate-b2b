import type { Metadata } from 'next';
import './globals.css';
import { FaviconNotifier } from '@/components/FaviconNotifier';
import { siteUrl } from '@/lib/site';

// Default site-wide metadata. Individual routes override these via generateMetadata;
// the home page prefers the `description` field on its Sanity `page` document, so this
// is only the fallback when the CMS field is empty.
const title = 'Accelerate B2B | Cold Email & LinkedIn Outreach Agency';
const description =
  'A founder-led cold outreach agency that proves itself before you pay. We use cold email and LinkedIn outreach to build a predictable pipeline of perfect-fit prospects. Apply for your free test campaign.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
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
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body>
        <FaviconNotifier />
        {children}
      </body>
    </html>
  );
}
