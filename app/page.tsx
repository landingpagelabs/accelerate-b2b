import type { Metadata } from 'next';
import { PageBuilder } from '@/components/PageBuilder';
import { pageBySlugQuery } from '@/lib/queries';
import { fetchSanity } from '@/lib/sanity';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchSanity<{ description?: string }>(pageBySlugQuery, { slug: 'home' });

  // `page.title` is the CMS-internal page name, not an SEO title, so it is deliberately
  // not used here. Only `description` is editorial. When it is empty we fall back to the
  // site-wide defaults in app/layout.tsx.
  if (!page?.description) return {};

  return {
    description: page.description,
    openGraph: { description: page.description },
    twitter: { description: page.description },
  };
}

export default async function HomePage() {
  const page = await fetchSanity(pageBySlugQuery, { slug: 'home' });

  if (!page) {
    return (
      <main className="page-shell">
        <div className="container">
          <h1>This page is temporarily unavailable</h1>
          <p>Please try again shortly.</p>
        </div>
      </main>
    );
  }

  return <PageBuilder page={page} />;
}
