import type { Metadata } from 'next';
import { PageBuilder } from '@/components/PageBuilder';
import { pageBySlugQuery } from '@/lib/queries';
import { fetchSanity } from '@/lib/sanity';

export const revalidate = 60;

// The `description` field on the home document still holds text from the Studio seed
// script rather than a real meta description. Until someone writes one in Sanity, the
// site-wide default in app/layout.tsx is the better answer, so ignore known seed values.
const SEED_DESCRIPTIONS = ['demo home page created by seed'];

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchSanity<{ description?: string }>(pageBySlugQuery, { slug: 'home' });

  // `page.title` is the CMS-internal page name ("Page name for the CMS" in the schema),
  // not an SEO title, so it is deliberately not used here.
  const description = page?.description?.trim();
  if (!description || SEED_DESCRIPTIONS.includes(description.toLowerCase())) return {};

  return {
    description,
    openGraph: { description },
    twitter: { description },
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
