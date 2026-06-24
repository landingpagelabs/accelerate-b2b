import type { Metadata } from 'next';
import './globals.css';
import { FaviconNotifier } from '@/components/FaviconNotifier';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

const title = 'Accelerate B2B | CMS Landing';
const description = 'Next.js landing page built with Sanity CMS and customizable page blocks.';

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
    locale: 'uk_UA',
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
    <html lang="uk">
      <body>
        <FaviconNotifier />
        {children}
      </body>
    </html>
  );
}
