import type { Metadata } from 'next';
import { PageBuilder } from '@/components/PageBuilder';
import { homePage } from '@/lib/content';

// The `description` field still holds text from the old CMS seed script rather than a real
// meta description. Until someone writes one in content/home.json, the site-wide default in
// app/layout.tsx is the better answer, so ignore known seed values.
const SEED_DESCRIPTIONS = ['demo home page created by seed'];

export function generateMetadata(): Metadata {
  // `homePage.title` is the internal page name ("Page name for the CMS" in the old schema),
  // not an SEO title, so it is deliberately not used here.
  const description = homePage?.description?.trim();
  if (!description || SEED_DESCRIPTIONS.includes(description.toLowerCase())) return {};

  return {
    description,
    openGraph: { description },
    twitter: { description },
  };
}

// The "temporarily unavailable" fallback the old version rendered is gone: the content is
// imported at build time now, so a missing home page is a build error rather than
// something to degrade around at request time.
export default function HomePage() {
  return <PageBuilder page={homePage} />;
}
