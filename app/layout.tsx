import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Accelerate B2B | CMS Landing',
  description: 'Next.js landing page built with Sanity CMS and customizable page blocks.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
