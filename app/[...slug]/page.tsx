import { PageBuilder } from '@/components/PageBuilder';
import { pageBySlugQuery } from '@/lib/queries';
import { fetchSanity } from '@/lib/sanity';

export const revalidate = 60;

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join('/') ?? 'home';
  const page = await fetchSanity(pageBySlugQuery, { slug });

  if (!page) {
    return (
      <main className="page-shell">
        <div className="container">
          <h1>Сторінка не знайдена</h1>
          <p>Сторінка з URL &quot;{slug}&quot; не знайдена в Sanity.</p>
        </div>
      </main>
    );
  }

  return <PageBuilder page={page} />;
}
