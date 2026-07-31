import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found | Accelerate B2B',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="container">
        <h1>Page not found</h1>
        <p>Sorry, we couldn&apos;t find the page you were looking for.</p>
        <p>
          <Link href="/">Back to the home page</Link>
        </p>
      </div>
    </main>
  );
}
