/*
  Seed the new "stages funnel" content onto the existing mechanismSection
  block inside the Home page (replaces the old heading/text/image fields).
  Run:  node studio/scripts/seed-mechanism-stages.js
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

const STAGES = [
  { _type: 'object', label: 'STAGE 01 · CONTACTED', text: '120,000  prospects in your ideal customer profile contacted' },
  { _type: 'object', label: 'STAGE 02 · POSITIVE REPLIES', text: '400 positive replies from sales-qualified leads' },
  { _type: 'object', label: 'STAGE 03 · MEETINGS', text: '120 meetings with ICP leads' },
  { _type: 'object', label: 'STAGE 04 · DEALS', text: '10-20 closed deals' },
];

(async () => {
  const avatarFile = path.join(__dirname, '..', '..', 'public', 'images', 'sections', 'reviews', 'Matt Hickerson.png');
  console.log('Uploading quote avatar...');
  const asset = await client.assets.upload('image', fs.readFileSync(avatarFile), {
    filename: 'matt-hickerson.png',
    contentType: 'image/png',
  });

  const home = await client.fetch('*[_id=="page.home"][0]{ sections }');
  const idx = home.sections.findIndex((s) => s._type === 'mechanismSection');
  if (idx === -1) throw new Error('mechanismSection not found on page.home');

  const crypto = require('crypto');
  const stagesWithKeys = STAGES.map((s) => ({ ...s, _key: crypto.randomBytes(6).toString('hex') }));

  await client
    .patch('page.home')
    .set({
      [`sections[${idx}].heading`]: 'Go from unpredictable lead flow to 10 - 20 closed deals or more each month',
      [`sections[${idx}].stages`]: stagesWithKeys,
      [`sections[${idx}].note`]: '*Average yearly outcomes. Results depend on multiple factors.',
      [`sections[${idx}].quoteAvatar`]: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      [`sections[${idx}].quoteText`]: 'Spencer took us from zero to 50,000 emails a month.',
      [`sections[${idx}].quoteAuthorName`]: 'Matt Hickerson',
      [`sections[${idx}].quoteAuthorRole`]: 'VP of Operations, Forge Origination',
    })
    .unset([`sections[${idx}].text`, `sections[${idx}].image`])
    .commit();

  console.log('Done. mechanismSection updated with stages funnel content.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
