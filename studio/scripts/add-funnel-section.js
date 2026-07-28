/*
  One-off: add the "Go from unpredictable lead flow to 10-20 closed deals or more"
  (funnelSection) block, placed right ABOVE the playbooksSection.
  Uploads the avatar image to Sanity. Idempotent.
  Run from project root:  node studio/scripts/add-funnel-section.js
*/
const fs = require('fs');
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

(async () => {
  const page = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]{_id, sections}`
  );
  if (!page) { console.error('No home page found.'); process.exit(1); }

  // Upload avatar (from project root) so the testimonial has a real photo.
  let avatarRef = null;
  try {
    const avatarPath = path.join(__dirname, '..', '..', 'public', 'images', 'sections', 'funnel', 'avatar.png');
    const asset = await client.assets.upload('image', fs.createReadStream(avatarPath), { filename: 'funnel-avatar.png' });
    avatarRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    console.log('Uploaded avatar:', asset._id);
  } catch (e) {
    console.log('Avatar upload skipped (component will use default asset):', e.message);
  }

  const funnelSection = {
    _key: 'funnelSection_ported',
    _type: 'funnelSection',
    heading: 'Go from unpredictable lead flow to 10 - 20 closed deals or more',
    stages: [
      { _key: 'st_1', _type: 'object', label: 'STAGE 01 · CONTACTED', text: '120,000 prospects in your ideal customer profile contacted' },
      { _key: 'st_2', _type: 'object', label: 'STAGE 02 · POSITIVE REPLIES', text: '400 positive replies from sales-qualified leads' },
      { _key: 'st_3', _type: 'object', label: 'STAGE 03 · MEETINGS', text: '120 meetings with ICP leads' },
      { _key: 'st_4', _type: 'object', label: 'STAGE 04 · DEALS', text: '10-20 closed deals' },
    ],
    footnote: '*Average yearly outcomes.',
    footnoteEmphasis: 'Results depend on multiple factors.',
    testimonial: {
      _type: 'object',
      quote: '“Spencer took us from zero to 50,000 emails a month.”',
      authorName: 'Matt Hickerson',
      authorRole: 'VP of Operations, Forge Origination',
      ...(avatarRef ? { avatar: avatarRef } : {}),
    },
  };

  let sections = (page.sections || []).filter((s) => s._key !== 'funnelSection_ported');

  // Insert right ABOVE the playbooks section (fallback: before steps, else append).
  let at = sections.findIndex((s) => s._type === 'playbooksSection');
  if (at === -1) at = sections.findIndex((s) => s._type === 'stepsSection');
  if (at === -1) at = sections.length;
  sections.splice(at, 0, funnelSection);

  await client.patch(page._id).set({ sections }).commit();

  console.log('Done. New section order:');
  sections.forEach((s, i) => console.log(`  ${String(i).padStart(2)} ${s._type}`));
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
