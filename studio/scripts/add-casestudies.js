/*
  Update the tabs / case-studies section in the Sanity "home" page.
  Card 1 (LH Capital Group) keeps its existing images (reused from Sanity).
  Cards 2-4 (Forge, LolaBird, Vibra) get real images from ../../tabs-images
  and the real text content. Cards 5-6 duplicate cards 3-4 so the "Show More"
  button still appears (>4 cards) and every tab has 2 cards.
  Run:  node studio/scripts/add-casestudies.js
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

const imagesDir = path.join(__dirname, '..', '..', 'tabs-images');

async function upload(file) {
  const asset = await client.assets.upload('image', fs.readFileSync(path.join(imagesDir, file)), {
    filename: file,
    contentType: 'image/png',
  });
  console.log('  uploaded', file, '->', asset._id);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

(async () => {
  const page = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]{
      _id,
      "keys": sections[]._key,
      "card0": sections[_key=="caseStudiesSection_ported"][0].cases[0]{image, companyLogo, avatar}
    }`
  );
  if (!page) { console.error('No home page found.'); process.exit(1); }
  if (!page.card0) { console.error('No existing case-studies section / card 1 found to reuse.'); process.exit(1); }

  console.log('Uploading case-study images for cards 2-4...');
  const forge = {
    image: await upload('tabs-item-2-image.png'),
    companyLogo: await upload('tabs-item-2-icon.png'),
    avatar: await upload('tabs-item-2-avatar.png'),
  };
  const lolabird = {
    image: await upload('tabs-item-3-image.png'),
    companyLogo: await upload('tabs-item-3-icon.png'),
    avatar: await upload('tabs-item-3-avatar.png'),
  };
  const vibra = {
    image: await upload('tabs-item-4-image.png'),
    companyLogo: await upload('tabs-item-4-icon.png'),
    avatar: await upload('tabs-item-4-avatar.png'),
  };

  const categories = ['Buy-side M&A', 'Fundraising', 'Agencies'];

  // Real case studies (card 1 reuses existing Sanity assets)
  const card1 = {
    image: page.card0.image,
    companyLogo: page.card0.companyLogo,
    avatar: page.card0.avatar,
    title: 'Two businesses under contract in the first 30 days, off-market',
    author: 'Ben Kelly, LH Capital Group',
    quote:
      "“It blew me away that we got two deals under contract, and the cost of doing it was minimal. Spencer and his team know exactly what they're doing.”",
    category: 'Buy-side M&A',
  };
  const card2 = {
    ...forge,
    title: 'From one-to-one emails to 426 opportunities and three LOIs',
    author: 'Matt Hickerson, Forge Origination',
    quote:
      '“Spencer did a great job educating us and made it as painless as possible. In very short order we had three opportunities that came solely through the cold email infrastructure he set up.”',
    category: 'Buy-side M&A',
  };
  const card3 = {
    ...lolabird,
    title: 'From three months of zero replies to 1,200 opportunities',
    author: 'Penny Dawson, LolaBird Fundraising',
    quote:
      "“We were running into severe trouble with our emails landing in spam and bouncing when they shouldn't have. Spencer has solved all of our problems. Our deliverability has never been better.”",
    category: 'Fundraising',
  };
  const card4 = {
    ...vibra,
    title: 'A full year of manual list-building, now done in a single day',
    author: 'Richard Edwards, Vibra Media',
    quote:
      "“What took a team member a full year, the automation now does in a day. We're over the moon.”",
    category: 'Agencies',
  };

  // 6 cards: the 4 real ones, then 3 & 4 repeated so "Show More" shows and
  // every tab has 2 cards (Buy-side: 1,2 / Fundraising: 3,3 / Agencies: 4,4)
  const order = [card1, card2, card3, card4, card3, card4];
  const cases = order.map((c, i) => ({ _key: `case_${i}`, _type: 'object', ...c }));

  const caseStudiesSection = {
    _key: 'caseStudiesSection_ported',
    _type: 'caseStudiesSection',
    heading: "Here's what happens when we run your outreach",
    tabs: categories,
    cases,
  };

  if ((page.keys || []).includes('caseStudiesSection_ported')) {
    await client.patch(page._id).unset(['sections[_key=="caseStudiesSection_ported"]']).commit();
    console.log('Removed previous copy.');
  }

  // Keep tabs/case-studies right after the services section (not before FAQ).
  const patch = client.patch(page._id).setIfMissing({ sections: [] });
  if ((page.keys || []).includes('infoSection_ported')) {
    await patch.insert('before', 'sections[_key=="infoSection_ported"]', [caseStudiesSection]).commit();
  } else if ((page.keys || []).includes('servicesSection')) {
    await patch.insert('after', 'sections[_type=="servicesSection"][0]', [caseStudiesSection]).commit();
  } else {
    await patch.append('sections', [caseStudiesSection]).commit();
  }

  console.log('Done. case-studies section updated with cards 2-4.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
