import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/client';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '25d88evy',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  }).image(source);

export const revalidate = 30;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug: params.slug });

  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-4">Пост не знайдено</h1>
        <p>Спробуйте повернутись до <Link href="/posts" className="underline">списку постів</Link>.</p>
      </main>
    );
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(700).url() : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-6">
      <Link href="/posts" className="text-sm text-slate-600 hover:underline">
        ← Back to posts
      </Link>
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={post.title || 'Post image'} className="rounded-2xl object-cover" width={1200} height={700} />
      )}
      <div>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'No publish date'}</p>
      </div>
      <div className="prose prose-slate">
        {Array.isArray(post.body) ? <PortableText value={post.body} /> : <p>No body content.</p>}
      </div>
    </main>
  );
}
