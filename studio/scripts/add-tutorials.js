/*
  Port the tutorials (YouTube) section into the Sanity "home" page (after reviews, before FAQ).
  Video URLs are placeholders — replace with real YouTube links in the CMS.
  Run:  node studio/scripts/add-tutorials.js
*/
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '..', '.env.local') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_STUDIO_API_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2026-06-18',
});

const PLACEHOLDER = 'https://www.youtube.com/embed/VIDEO_ID';

const tutorialsSection = {
  _key: 'tutorialsSection_ported',
  _type: 'tutorialsSection',
  bigVideoUrl: PLACEHOLDER,
  smallVideos: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
  ctaText: 'View YouTube Channel',
  ctaUrl: '#',
};

(async () => {
  const page = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]{_id, "keys": sections[]._key}`
  );
  if (!page) { console.error('No home page found.'); process.exit(1); }

  if ((page.keys || []).includes('tutorialsSection_ported')) {
    await client.patch(page._id).unset(['sections[_key=="tutorialsSection_ported"]']).commit();
    console.log('Removed previous ported copy.');
  }

  const patch = client.patch(page._id).setIfMissing({ sections: [] });
  if ((page.keys || []).includes('faqsSection_ported')) {
    await patch.insert('before', 'sections[_key=="faqsSection_ported"]', [tutorialsSection]).commit();
  } else {
    await patch.append('sections', [tutorialsSection]).commit();
  }

  console.log('Done. tutorials section added (after reviews, before FAQ).');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
