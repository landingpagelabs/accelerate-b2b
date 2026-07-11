/*
  Upload the sticky-note decor image (info-decor.svg) as `decorImage` on the
  infoSection block, so it's editable from Sanity instead of hardcoded.
  Run:  node studio/scripts/update-info-decor.js
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
  const file = path.join(__dirname, '..', '..', 'public', 'images', 'info', 'info-decor.svg');
  console.log('Uploading info-decor.svg...');
  const asset = await client.assets.upload('image', fs.readFileSync(file), {
    filename: 'info-decor.svg',
    contentType: 'image/svg+xml',
  });

  const home = await client.fetch('*[_id=="page.home"][0]{ sections }');
  const idx = home.sections.findIndex((s) => s._type === 'infoSection');
  if (idx === -1) throw new Error('infoSection not found on page.home');

  await client
    .patch('page.home')
    .set({ [`sections[${idx}].decorImage`]: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
    .commit();

  console.log('Done. decorImage set on infoSection.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
