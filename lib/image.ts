/**
 * Image helpers for content images.
 *
 * These images used to be served by Sanity's CDN, which resized and format-negotiated on
 * every request. They are now static files under public/images/content/, pre-converted to
 * WebP at the largest size any call site asks for, so there is nothing left to do at
 * request time — every transform below is a no-op that returns the committed path.
 *
 * The exported signatures deliberately match what the Sanity helpers had. Around 30 call
 * sites across 17 files use them, and none of those had to change.
 */

type LocalAsset = {
  src: string;
  width: number;
  height: number;
};

type ImageSource = { asset?: LocalAsset | null } | null | undefined;

const srcOf = (source: ImageSource): string | undefined => source?.asset?.src || undefined;

/**
 * Chainable stand-in for @sanity/image-url's builder.
 *
 * Call sites chain things like `.width(88).height(88).auto('format').url()`. Those
 * dimensions are already baked into the file on disk, so each method returns `this` and
 * `url()` hands back the path. Kept chainable purely so the call sites read as they did.
 */
class LocalImageBuilder {
  constructor(private readonly source: ImageSource) {}

  width(_value?: number): this {
    return this;
  }

  height(_value?: number): this {
    return this;
  }

  auto(_value?: string): this {
    return this;
  }

  quality(_value?: number): this {
    return this;
  }

  fit(_value?: string): this {
    return this;
  }

  url(): string | undefined {
    return srcOf(this.source);
  }

  toString(): string {
    return srcOf(this.source) ?? '';
  }
}

export const urlForImage = (source: ImageSource) => new LocalImageBuilder(source);

/**
 * Path to a content image.
 *
 * `width` and `quality` are accepted and ignored — they described a CDN transform that no
 * longer happens. Returns undefined rather than an empty string when the source is
 * missing: an empty src makes the browser re-request the current document.
 */
export const img = (
  source: ImageSource,
  _width?: number,
  _quality?: number,
): string | undefined => srcOf(source);

/**
 * Intrinsic pixel dimensions, so the browser can reserve the box before the image loads.
 *
 * These used to be parsed out of the Sanity asset ref (`image-<hash>-1396x786-webp`), and
 * are now recorded on the asset itself at migration time. Returns null when unknown, in
 * which case callers should omit the attributes rather than guess — wrong dimensions are
 * worse than none.
 */
export function dims(source: ImageSource): { width: number; height: number } | null {
  const asset = source?.asset;
  if (!asset?.width || !asset?.height) return null;
  return { width: asset.width, height: asset.height };
}
