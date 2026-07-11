/*
  Replace the infoSection's bottom-right image (photo + badges) with the
  combined spencer-bottom.webp asset.
  Run:  node studio/scripts/update-info-spencer-bottom.js
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
  const file = path.join(__dirname, '..', '..', 'public', 'images', 'info', 'spencer-bottom.webp');
  console.log('Uploading spencer-bottom.webp...');
  const asset = await client.assets.upload('image', fs.readFileSync(file), {
    filename: 'spencer-bottom.webp',
    contentType: 'image/webp',
  });

  const home = await client.fetch('*[_id=="page.home"][0]{ sections }');
  const idx = home.sections.findIndex((s) => s._type === 'infoSection');
  if (idx === -1) throw new Error('infoSection not found on page.home');

  await client
    .patch('page.home')
    .set({ [`sections[${idx}].signatureImage`]: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
    .commit();

  console.log('Done. signatureImage updated to spencer-bottom.webp.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
