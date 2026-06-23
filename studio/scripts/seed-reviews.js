/*
  Seed the reviews section with the real Figma content.
  Images: user-provided where available; a single duplicate placeholder per type
  for the rest (so missing ones are easy to spot).
  Run:  node studio/scripts/seed-reviews.js
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

const IMG_DIR = path.join(__dirname, '..', '..', 'public', 'images', 'sections', 'reviews');

const A = {
  matt: 'Matt Hickerson.png',
  ben: 'Ben Kelly.png',
  penny: 'Penny Dawson.png',
  upwork: 'Verified Upwork review.png',
  ph: 'Ellipse 8094.png', // placeholder avatar
};
const V = ['reviews-video-image-1.png', 'reviews-video-image-2.png', 'reviews-video-image-3.png', 'reviews-video-image-4.png'];
const S = {
  img7: 'img-7.png',
  s1: 'reviews-image-1.png',
  s2: 'reviews-image-2.png',
  full: 'reviews-first-full-image-item.png',
  ph: 'reviews-image-1.png', // placeholder screenshot (duplicate => spot the missing ones)
};
const q = (t) => `“${t}”`;

// Real content from the Figma "Testimonials & Results - Full Collection"
const DATA = [
  { type: 'result', category: 'reply', img: S.full },
  { type: 'video', avatar: A.matt, img: V[0], authorName: 'Matt Hickerson', authorRole: 'VP of Operations, Forge Origination',
    quote: q("Spencer took us from zero to 50,000 emails a month. He made it simple, educating us on what each tool does and why. In very short order we had three opportunities that came solely through the cold email infrastructure he set up. We're only increasing volume now.") },
  { type: 'result', category: 'result', title: '95 opportunities in 30 days', img: S.img7 },
  { type: 'testimonial', avatar: A.upwork, authorName: 'Verified Upwork review', authorRole: 'Cold email & outbound client',
    quote: q('Spencer is extremely knowledgeable, really great feedback on our setup and look forward to working with him again soon!') },
  { type: 'result', category: 'reply', img: S.s1 },
  { type: 'testimonial', avatar: A.upwork, authorName: 'Verified Upwork review', authorRole: 'Cold email & outbound client',
    quote: q('Spencer is great at what he does with cold email. He knows how to set up the systems and makes recommendations to get the best results from your campaigns. He is always available, professional, and kind. I recommend him to anyone looking for someone to help with their prospecting.') },
  { type: 'result', category: 'result', title: '118 opportunities, 1 campaign', img: S.ph },
  { type: 'testimonial', avatar: A.upwork, authorName: 'Verified Upwork review', authorRole: 'Cold email & outbound client',
    quote: q('It was a pleasure to work with Spencer. Great know-how and communication skills. He went above and beyond and I would definitely ask for his services for other projects.') },
  { type: 'testimonial', avatar: A.upwork, authorName: 'Verified Upwork review', authorRole: 'Cold email & outbound client',
    quote: q("Working with Spencer on my email outreach campaign was an excellent experience. He is extremely professional, highly responsive, and always goes the extra mile to make sure everything runs smoothly. Communication was clear and consistent throughout, and he delivered exactly what I was looking for. Beyond his skills, he's simply a great guy to work with, reliable, easygoing, and trustworthy. I'd highly recommend Spencer to anyone looking for top-notch outreach support.") },
  { type: 'result', category: 'result', title: '11 opportunities per 1K emails', img: S.ph },
  { type: 'video', avatar: A.ben, img: V[1], authorName: 'Ben Kelly', authorRole: 'Owner, LH Capital Group',
    quote: q("Spencer and his team set up an awesome off-market sourcing engine. We ran a test: 5,000 contacts, about 10,000 emails, and 100 positive responses. 16 were a fit, and two went under contract in 30 days, off-market, for minimal cost. They know exactly what they're doing. Highly recommend!") },
  { type: 'result', category: 'result', title: '9.5% reply rate across 261,000 emails', img: S.ph },
  { type: 'testimonial', avatar: A.upwork, authorName: 'Verified Upwork review', authorRole: 'Cold email & outbound client',
    quote: q("Thank God for Spencer. I was looking for someone who genuinely knew what they were doing with cold email and someone I trusted, and finding Spencer was like finding a unicorn. He's the real deal: incredibly knowledgeable, responsive, kind, and professional. If you're looking for a cold email expert, you'd be making a mistake not to hire him on the spot.") },
  { type: 'video', avatar: A.ph, img: V[2], authorName: 'Ahmed Saeed', authorRole: 'Owner, LolaBird Fundraising',
    quote: q('Spencer has been an instrumental part of our team over the past few months. The results of his work have been undeniable, and our email blasts have dramatically increased. We look forward to building a long-term partnership.') },
  { type: 'result', category: 'reply', img: S.s2 },
  { type: 'result', category: 'result', title: '31% positive reply rate', img: S.ph },
  { type: 'result', category: 'reply', img: S.ph },
  { type: 'result', category: 'reply', img: S.ph },
  { type: 'result', category: 'reply', img: S.ph },
  { type: 'result', category: 'result', title: '41% of replies converted', img: S.ph },
  { type: 'result', category: 'result', title: 'Up to 35% reply rate', img: S.ph },
  { type: 'video', avatar: A.penny, img: V[3], authorName: 'Penny Dawson', authorRole: 'Owner, LolaBird Fundraising',
    quote: q('We were running into severe trouble with our emails landing in spam and bouncing when they shouldn’t have. Spencer has solved all of our problems. Our deliverability has never been better.') },
];

const cache = {};
async function asset(file) {
  if (cache[file]) return cache[file];
  const buf = fs.readFileSync(path.join(IMG_DIR, file));
  const a = await client.assets.upload('image', buf, { filename: file });
  cache[file] = { _type: 'image', asset: { _type: 'reference', _ref: a._id } };
  console.log('  uploaded', file);
  return cache[file];
}

(async () => {
  const reviews = [];
  for (let i = 0; i < DATA.length; i++) {
    const d = DATA[i];
    const r = { _key: `rev_${i}`, _type: 'object', cardType: d.type === 'text' ? 'testimonial' : d.type };
    if (d.type === 'result') {
      r.category = d.category || 'result';
      if (d.title) r.title = d.title;
      if (d.img) r.image = await asset(d.img);
    } else {
      r.category = 'testimonial';
      if (d.quote) r.quote = d.quote;
      if (d.authorName) r.authorName = d.authorName;
      if (d.authorRole) r.authorRole = d.authorRole;
      if (d.avatar) r.avatar = await asset(d.avatar);
      if (d.type === 'video' && d.img) r.image = await asset(d.img);
    }
    reviews.push(r);
  }

  const page = await client.fetch(`*[_type=="page" && slug.current=="home"][0]{_id, "k": sections[_type=="reviewsSection"][0]._key}`);
  if (!page || !page.k) { console.error('No reviewsSection found.'); process.exit(1); }
  await client.patch(page._id).set({ [`sections[_key=="${page.k}"].reviews`]: reviews }).commit();
  console.log(`Done. Seeded ${reviews.length} reviews.`);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
