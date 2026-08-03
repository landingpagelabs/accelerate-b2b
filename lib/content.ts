/**
 * Site content, committed to the repo.
 *
 * These files were exported from the Sanity dataset this site used to read from at
 * request time. They are now the source of truth: edit the JSON, commit, and the change
 * ships with the next deploy. See CASE-STUDIES.md for the common edit.
 *
 * Image nodes keep the shape the components already expected — `{ asset: { src, width,
 * height } }` instead of a Sanity asset reference — so the helpers in lib/image.ts are
 * the only place that had to change.
 */
import bookingJson from '@/content/booking.json';
import congratsJson from '@/content/congrats.json';
import homeJson from '@/content/home.json';
import privacyJson from '@/content/legal/privacy.json';
import termsJson from '@/content/legal/terms.json';
import llmInfoJson from '@/content/llm-info.json';

/**
 * The content is deeply nested and heterogeneous — every section type has its own shape,
 * and the components already treat their `section` prop as `any`. Typing it precisely
 * would mean 24 interfaces that duplicate what the components destructure anyway, so the
 * documents are handed over as-is and the components stay the contract.
 */
export type ContentDoc = any;

export const homePage: ContentDoc = homeJson;
export const bookingPage: ContentDoc = bookingJson;
export const congratsPage: ContentDoc = congratsJson;
export const llmInfoPage: ContentDoc = llmInfoJson;

const legalPages: Record<string, ContentDoc> = {
  privacy: privacyJson,
  terms: termsJson,
};

export const getLegalPage = (slug: 'privacy' | 'terms'): ContentDoc => legalPages[slug];

/**
 * Pull a single section out of the home page by its `_type`.
 *
 * The congrats page reuses the home page's reviews, FAQ and partners blocks rather than
 * keeping a second copy of them, which is what the old congrats route did by querying the
 * home document alongside its own.
 */
export const homeSection = (type: string): ContentDoc | null =>
  homePage?.sections?.find((s: any) => s?._type === type) ?? null;
