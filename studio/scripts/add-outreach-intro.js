/*
  Insert a new `outreachIntroSection` block onto the Home page, right before
  the mechanismSection (stages funnel) block. Uploads outreach-image.webp.
  Run:  node studio/scripts/add-outreach-intro.js
*/
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
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
  const file = path.join(__dirname, '..', '..', 'public', 'images', 'sections', 'outreach-intro', 'outreach-image.webp');
  console.log('Uploading outreach image...');
  const asset = await client.assets.upload('image', fs.readFileSync(file), {
    filename: 'outreach-image.webp',
    contentType: 'image/webp',
  });

  const home = await client.fetch('*[_id=="page.home"][0]{ sections }');
  const idx = home.sections.findIndex((s) => s._type === 'mechanismSection');
  if (idx === -1) throw new Error('mechanismSection not found on page.home');

  const block = {
    _key: crypto.randomBytes(6).toString('hex'),
    _type: 'outreachIntroSection',
    heading: 'Cold outreach works, it just has to be done the right way',
    text: "We've spent years testing every tool, playbook, and AI workflow so you don't have to. Your campaigns send from a protected network of warmed inboxes, so emails land in the primary tab and your own domain never takes the risk. We even built custom scrapers to find the buyers most databases miss.",
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  };

  await client
    .patch('page.home')
    .insert('before', `sections[${idx}]`, [block])
    .commit();

  console.log('Done. outreachIntroSection inserted before mechanismSection.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
