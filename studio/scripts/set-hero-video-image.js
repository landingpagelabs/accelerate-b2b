/*
  Replace the Hero section's video preview image (videoImage) on the "home" page
  with the new button-less demo image. Run from project root:
    node studio/scripts/set-hero-video-image.js
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
  const imgPath = path.join(__dirname, '..', '..', 'public', 'images', 'header', 'hero-demo-video-image.png');
  console.log('Uploading new hero video image...');
  const asset = await client.assets.upload('image', fs.readFileSync(imgPath), {
    filename: 'hero-demo-video-image.png',
    contentType: 'image/png',
  });
  console.log('  uploaded ->', asset._id);

  const page = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]{_id, "heroKey": sections[_type=="heroSection"][0]._key}`
  );
  if (!page || !page.heroKey) {
    console.error('No home page / hero section found.');
    process.exit(1);
  }

  await client
    .patch(page._id)
    .set({
      [`sections[_key=="${page.heroKey}"].videoImage`]: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
    .commit();

  console.log('Done. Hero videoImage updated.');
})().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
