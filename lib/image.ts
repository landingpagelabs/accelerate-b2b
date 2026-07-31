import imageUrlBuilder from '@sanity/image-url';

/**
 * Browser-safe Sanity image helpers.
 *
 * These live apart from lib/sanity.ts on purpose: that module calls createClient() and
 * carries the API token, and importing it from a "use client" component pulled the whole
 * @sanity/client package into the browser bundle. Only the URL builder is needed on the
 * client, and it needs nothing but the project id and dataset.
 */
const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '25d88evy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
});

export const urlForImage = (source: any) => builder.image(source);

/**
 * Build a sized, format-negotiated CDN URL.
 *
 * `auto('format')` is not optional. The source images are 8-bit palette PNGs, and asking
 * Sanity to resize without it makes the CDN re-encode them as 32-bit RGBA PNG — which came
 * out heavier than the untouched original at a smaller size. With auto=format the same
 * assets come back as WebP at roughly 3% of their original weight.
 *
 * @param width  Target CSS width in device-independent pixels; pass 2x the rendered size
 *               so the asset still looks sharp on retina displays.
 */
export const img = (source: any, width: number, quality = 75): string =>
  builder.image(source).width(width).auto('format').quality(quality).url();

/**
 * Intrinsic pixel dimensions, parsed out of the Sanity asset reference.
 *
 * Refs are shaped like `image-<hash>-1396x786-webp`, so the source dimensions are already
 * available without an extra API call. Emitting these as width/height attributes lets the
 * browser reserve the right box before the image loads, which is what removes layout shift.
 * Returns null when the ref is missing or unparseable, in which case callers should simply
 * omit the attributes.
 */
export function dims(source: any): { width: number; height: number } | null {
  const ref: string = source?.asset?._ref ?? source?._ref ?? '';
  const match = /-(\d+)x(\d+)-[a-z]+$/.exec(ref);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}
