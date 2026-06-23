import Link from 'next/link';
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

export const revalidate = 30;

export default async function PostsPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts?.map((post) => (
          <li key={post._id} className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-400 hover:bg-slate-50">
            <Link href={`/posts/${post.slug?.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-slate-500">
                {post.publishedAt ? new Date(post.publishedAt).toString().slice(0, 10) : 'No date'}
              </p>
              {post.excerpt && <p className="mt-2 text-slate-700">{post.excerpt}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
