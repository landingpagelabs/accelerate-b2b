/*
  Fill the modal (expanded view) content for case study #1 — LH Capital Group.
  Uploads modal-images/modal-1.png as the screenshot and patches the first
  case in the case-studies section with description, bullets, stats, company
  name and author role.
  Run:  node studio/scripts/update-case-1-modal.js
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

async function uploadImage(file) {
  const asset = await client.assets.upload('image', fs.readFileSync(path.join(__dirname, 'modal-images', file)), {
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
      "sectionKey": sections[_type=="caseStudiesSection"][0]._key,
      "caseKey": sections[_type=="caseStudiesSection"][0].cases[0]._key
    }`
  );
  if (!page) { console.error('No home page found.'); process.exit(1); }
  if (!page.sectionKey || !page.caseKey) {
    console.error('No case-studies section / first case found.');
    process.exit(1);
  }
  console.log('Home page:', page._id, '| section:', page.sectionKey, '| case:', page.caseKey);

  console.log('Uploading modal screenshot...');
  const screenshotImage = await uploadImage('modal-1.png');

  const base = `sections[_key=="${page.sectionKey}"].cases[_key=="${page.caseKey}"]`;

  await client
    .patch(page._id)
    .set({
      [`${base}.companyName`]: 'LH Capital Group',
      [`${base}.authorRole`]: 'Ben Kelly, Owner, LH Capital Group',
      [`${base}.description`]:
        'Ben Kelly runs two businesses: Acquisition Ace, where he teaches an audience of 800,000+ how to buy businesses and build a portfolio, and Light House Capital Group, a buy-side brokerage sourcing companies for individual and private equity buyers.',
      [`${base}.bullets`]: [
        'Both found deals through traditional channels, so the best ones were already on the market and heavily competed for.',
        'Ben wanted an off-market sourcing engine to reach sellers directly, with no middleman and far less competition.',
        "We built and launched his cold email campaigns done-for-you over the first 30 days, while Ben's team worked the positive replies.",
        '5,000 owners reached, around 100 positive responses, 16 a fit, and two businesses under contract worth $500K in fees, all inside 30 days.',
        'We turned the system into an SOP and rolled it out to his Acquisition Ace students.',
      ],
      [`${base}.stats`]: [
        { _key: 'stat_0', _type: 'object', value: '2', label: 'Under contract' },
        { _key: 'stat_1', _type: 'object', value: '$500K', label: 'In fees' },
        { _key: 'stat_2', _type: 'object', value: '100', label: 'Positive replies' },
        { _key: 'stat_3', _type: 'object', value: '30', label: 'Days to deals' },
      ],
      [`${base}.screenshotImage`]: screenshotImage,
    })
    .commit();

  console.log('Done. Case #1 modal content updated.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
