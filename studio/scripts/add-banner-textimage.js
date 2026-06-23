/*
  Port the text-image + banner sections from the bare layout into the Sanity "home" page.
  Uploads their images as Sanity assets, then appends both sections (after FAQ, before footer).
  Run from project root:  node studio/scripts/add-banner-textimage.js
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

const bareRoot = path.join(__dirname, '..', '..', 'Full B2B', 'Accelerate_B2B', 'images');

async function uploadImage(relPath, contentType) {
  const filePath = path.join(bareRoot, relPath);
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
    contentType,
  });
  console.log('  uploaded', relPath, '->', asset._id);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

(async () => {
  console.log('Uploading images...');
  const textImage = await uploadImage('text-image/text-image.png', 'image/png');
  const bannerIcon = await uploadImage('banner/banner_left-icon.svg', 'image/svg+xml');
  const bannerRight = await uploadImage('banner/banner_right-image.png', 'image/png');

  const textImageSection = {
    _key: 'textImageSection_ported',
    _type: 'textImageSection',
    heading: 'You’ve scrolled so far, at least claim your free test campaign!',
    description:
      'Worst case: we build your list, write your emails, run the whole campaign for free, and you keep all of it. Best case: next month’s revenue stops being a guess.',
    image: textImage,
  };

  const bannerSection = {
    _key: 'bannerSection_ported',
    _type: 'bannerSection',
    leftIcon: bannerIcon,
    text: 'Join 30+ B2B businesses that trust Accelerate B2B to generate predictable pipeline',
    rightImage: bannerRight,
  };

  const page = await client.fetch(`*[_type=="page" && slug.current=="home"][0]{_id, "keys": sections[]._key}`);
  if (!page) { console.error('No home page found.'); process.exit(1); }

  // idempotent: remove any previous ported copies first
  const toUnset = ['textImageSection_ported', 'bannerSection_ported']
    .filter((k) => (page.keys || []).includes(k))
    .map((k) => `sections[_key=="${k}"]`);
  if (toUnset.length) {
    await client.patch(page._id).unset(toUnset).commit();
    console.log('Removed previous ported copies.');
  }

  // append text-image then banner (so order is faqs -> text-image -> banner -> footer)
  await client
    .patch(page._id)
    .setIfMissing({ sections: [] })
    .append('sections', [textImageSection, bannerSection])
    .commit();

  console.log('Done. text-image + banner appended to the home page.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
