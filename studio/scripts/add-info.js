/*
  Port the info (founder) section into the Sanity "home" page (after tabs, before reviews).
  Uploads its two images. Run:  node studio/scripts/add-info.js
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

const bare = '/Users/vitaliigunka/Downloads/Full B2B/Accelerate_B2B/images/sections/Info';

async function uploadImage(file) {
  const buffer = fs.readFileSync(path.join(bare, file));
  const asset = await client.assets.upload('image', buffer, { filename: file });
  console.log('  uploaded', file, '->', asset._id);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

const body = [
  "If one of my cold emails is how you found this page, then you've already seen the system working.",
  "Cold outreach is how we win our own clients, and it's the same playbook we'd run for you.",
  'I spent six years building sales and email systems, including campaigns for brands like Jaguar and Land Rover, before starting Accelerate B2B.',
  "Today we're a small team of experts, and your campaign never gets handed to a junior. I work on every one myself.",
  'We go the extra mile because results are the only thing this business runs on. For one client, we automated a year of manual list-building into a single day. For another, we rebuilt their entire sending system after new spam rules broke it, and their deliverability came back better than ever.',
  'Which is why we want to prove ourselves first. Your first campaign is a free test, and every interested reply is yours to keep.',
].join('\n\n');

(async () => {
  console.log('Uploading info images...');
  const signatureImage = await uploadImage('Frame 2147260906.png');
  const contentImage = await uploadImage('Frame 2147260954 (1).png');

  const infoSection = {
    _key: 'infoSection_ported',
    _type: 'infoSection',
    heading: 'Hey there, I’m Spencer!',
    body,
    authorName: 'Spencer Hirst',
    authorRole: 'Founder, Accelerate B2B ▪ Certified Instantly Expert',
    signatureImage,
    contentImage,
  };

  const page = await client.fetch(`*[_type=="page" && slug.current=="home"][0]{_id, "keys": sections[]._key}`);
  if (!page) { console.error('No home page found.'); process.exit(1); }

  if ((page.keys || []).includes('infoSection_ported')) {
    await client.patch(page._id).unset(['sections[_key=="infoSection_ported"]']).commit();
    console.log('Removed previous ported copy.');
  }

  const patch = client.patch(page._id).setIfMissing({ sections: [] });
  if ((page.keys || []).includes('reviewsSection_ported')) {
    await patch.insert('before', 'sections[_key=="reviewsSection_ported"]', [infoSection]).commit();
  } else {
    await patch.append('sections', [infoSection]).commit();
  }
  console.log('Done. info section added (before reviews).');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
