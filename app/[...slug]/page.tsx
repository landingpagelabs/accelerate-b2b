import { notFound } from 'next/navigation';
import { PageBuilder } from '@/components/PageBuilder';
import { pageBySlugQuery } from '@/lib/queries';
import { fetchSanity } from '@/lib/sanity';

export const revalidate = 60;

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join('/') ?? 'home';
  const page = await fetchSanity(pageBySlugQuery, { slug });

  // Previously this rendered a "page not found" body with a 200 status, which let every
  // unmatched URL (including /robots.txt and /sitemap.xml) resolve as a real page.
  // notFound() renders app/not-found.tsx with a correct 404.
  if (!page) notFound();

  return <PageBuilder page={page} />;
}
