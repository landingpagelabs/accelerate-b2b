/*
  Port the reviews section into the Sanity "home" page (inserted before FAQ).
  Content is placeholder (bare layout used duplicate dummy cards) — edit later in CMS.
  Run:  node studio/scripts/add-reviews.js
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

const dir = path.join(__dirname, '..', '..', 'Full B2B', 'Accelerate_B2B', 'images', 'sections', 'reviews');

async function upload(file) {
  const asset = await client.assets.upload('image', fs.readFileSync(path.join(dir, file)), {
    filename: file,
    contentType: 'image/png',
  });
  console.log('  uploaded', file, '->', asset._id);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

(async () => {
  console.log('Uploading review images...');
  const avatar = await upload('Frame 2087327516 (1).png');
  const resultImg = await upload('img-7.png');

  const quote =
    '“Spencer took us from zero to 50,000 emails a month. He made it simple, educating us on what each tool does and why. In very short order we had three opportunities that came solely through the cold email infrastructure he set up. We\'re only increasing volume now.”';
  const authorName = 'Matt Hickerson';
  const authorRole = 'VP of Operations, Forge Origination';

  const testimonial = (cat) => ({
    _type: 'object',
    cardType: 'testimonial',
    quote,
    authorName,
    authorRole,
    avatar,
    category: cat,
  });
  const video = (cat) => ({
    _type: 'object',
    cardType: 'video',
    quote,
    authorName,
    authorRole,
    avatar,
    videoUrl: 'https://player.vimeo.com/video/449787858',
    category: cat,
  });
  const result = (cat) => ({
    _type: 'object',
    cardType: 'result',
    title: '95 opportunities in 30 days',
    image: resultImg,
    category: cat,
  });

  const reviews = [
    testimonial('testimonial'),
    result('result'),
    video('testimonial'),
    testimonial('testimonial'),
    result('result'),
    testimonial('reply'),
    testimonial('testimonial'),
    video('testimonial'),
    result('result'),
    testimonial('testimonial'),
    testimonial('reply'),
    testimonial('testimonial'),
  ].map((r, i) => ({ ...r, _key: `review_${i}` }));

  const reviewsSection = {
    _key: 'reviewsSection_ported',
    _type: 'reviewsSection',
    heading:
      'When you send the right message to the right person, you get results, see for yourself...',
    reviews,
  };

  const page = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]{_id, "keys": sections[]._key}`
  );
  if (!page) { console.error('No home page found.'); process.exit(1); }

  if ((page.keys || []).includes('reviewsSection_ported')) {
    await client.patch(page._id).unset(['sections[_key=="reviewsSection_ported"]']).commit();
    console.log('Removed previous ported copy.');
  }

  const patch = client.patch(page._id).setIfMissing({ sections: [] });
  if ((page.keys || []).includes('faqsSection_ported')) {
    await patch.insert('before', 'sections[_key=="faqsSection_ported"]', [reviewsSection]).commit();
  } else {
    await patch.append('sections', [reviewsSection]).commit();
  }

  console.log('Done. reviews section added (before FAQ).');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
