/*
  Add the Consultation Modal (popup / exit-intent) section to the Sanity "home" page.
  Uploads the default preview image as a Sanity asset, then appends the section.
  Idempotent: re-running replaces the previously added copy.
  Run from project root:  node studio/scripts/add-consultation-modal.js
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

async function uploadImage(absPath, contentType) {
  const buffer = fs.readFileSync(absPath);
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(absPath),
    contentType,
  });
  console.log('  uploaded', path.basename(absPath), '->', asset._id);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

(async () => {
  const imgPath = path.join(__dirname, '..', '..', 'public', 'images', 'modal', 'modal-image000.png');
  console.log('Uploading modal preview image...');
  const image = await uploadImage(imgPath, 'image/png');

  const modalSection = {
    _key: 'consultationModal_ported',
    _type: 'consultationModalSection',
    heading: 'Can’t find what you’re looking for?',
    description:
      "Book a free consultation with our team. We'll walk you through how the campaigns work and show how much pipeline we could help you build.",
    buttonText: 'Book Your Free Consultation',
    buttonUrl: 'https://accelerateb2b.com/book',
    image,
    maxPerSession: 2,
    fallbackDelaySeconds: 15,
    scrollPercent: 60,
  };

  const page = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]{_id, "keys": sections[]._key}`
  );
  if (!page) {
    console.error('No home page found.');
    process.exit(1);
  }

  if ((page.keys || []).includes('consultationModal_ported')) {
    await client.patch(page._id).unset(['sections[_key=="consultationModal_ported"]']).commit();
    console.log('Removed previous copy.');
  }

  await client
    .patch(page._id)
    .setIfMissing({ sections: [] })
    .append('sections', [modalSection])
    .commit();

  console.log('Done. Consultation modal appended to the home page.');
})().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
