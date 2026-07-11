/*
  Upload the 6 new partner logos and add them as `logosRow2` on the
  existing partnersSection block inside the Home page.
  Run:  node studio/scripts/add-partners-row2.js
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

const LOGOS = [
  { file: 'partner2_pace.png', alt: 'Pace' },
  { file: 'partner2_parknest.png', alt: "Park'N Nest" },
  { file: 'partner2_national.png', alt: 'National' },
  { file: 'partner2_labone.png', alt: 'Lab One Capital' },
  { file: 'partner2_forge.png', alt: 'Forge Origination' },
  { file: 'partner2_scoutbee.png', alt: 'Scoutbee' },
];

(async () => {
  const dir = path.join(__dirname, '..', '..', 'public', 'images', 'sections', 'partners');

  const logosRow2 = [];
  for (const { file, alt } of LOGOS) {
    console.log('Uploading', file);
    const asset = await client.assets.upload('image', fs.readFileSync(path.join(dir, file)), {
      filename: file,
      contentType: 'image/png',
    });
    logosRow2.push({
      _key: crypto.randomBytes(6).toString('hex'),
      _type: 'object',
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      alt,
    });
  }

  const home = await client.fetch(
    '*[_id=="page.home"][0]{ sections }'
  );
  const idx = home.sections.findIndex((s) => s._type === 'partnersSection');
  if (idx === -1) throw new Error('partnersSection not found on page.home');

  await client
    .patch('page.home')
    .set({ [`sections[${idx}].logosRow2`]: logosRow2 })
    .commit();

  console.log('Done. logosRow2 added to partnersSection.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
