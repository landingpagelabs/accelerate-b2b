/*
  Fill the modal (expanded view) content for case studies #2-4:
  Forge Origination, LolaBird Fundraising, Vibra Media (+ the two duplicate
  cards so every tab's expand works). Uploads modal-2.png (Forge) and
  modal-3.png (LolaBird) as screenshots; Vibra has no screenshot.
  Run:  node studio/scripts/update-cases-2-4-modal.js
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

const stat = (i, value, label) => ({ _key: `stat_${i}`, _type: 'object', value, label });

const forge = {
  companyName: 'Forge Origination',
  categoryLabel: 'Buy-Side M&A',
  authorRole: 'Matt Hickerson, VP of Operations, Forge Origination',
  description:
    'Forge Origination is a buy-side brokerage that helps private equity firms find businesses to acquire against tight criteria, mostly in blue-collar service markets.',
  bullets: [
    "Before Spencer, Forge cold emailed one by one from their regular inboxes, so there was no real scale and no way to reach owners who weren't listed anywhere.",
    'They needed a deal-sourcing engine to build targeted lists and reach owners at scale, so their team could focus on closing instead of running campaigns.',
    "We ran six months: three months done-for-you building the infrastructure, lists, copy, and campaigns, then three months training Matt's team to run it in-house.",
    '76,400 emails at a 5.01% reply rate produced 426 opportunities, three of which became Letters of Intent worth $900K in pipeline.',
  ],
  stats: [stat(0, '76.4K', 'Emails sent'), stat(1, '5.01%', 'Reply rate'), stat(2, '426', 'Opportunities'), stat(3, '3', 'LOIs submitted')],
};

const lolabird = {
  companyName: 'LolaBird Fundraising',
  categoryLabel: 'Fundraising',
  authorRole: 'Penny Dawson, Owner, LolaBird Fundraising',
  description:
    'LolaBird Fundraising helps schools, sports teams, and student groups run fundraising campaigns.',
  bullets: [
    'They had cold email working as a channel, until deliverability changes at Google and Microsoft broke it.',
    "For three straight months, their campaigns couldn't generate a single positive response.",
    'We rebuilt their outbound from the ground up, rewrote the copy, and split-tested offers until one clearly won.',
    'Over the next 12 months the rebuilt system sent 261,000 emails at a 9.5% reply rate and produced 1,200 opportunities.',
    'Their deliverability went from completely broken to better than it had ever been.',
  ],
  stats: [stat(0, '261K', 'Emails sent'), stat(1, '9.5%', 'Reply rate'), stat(2, '1,200', 'Opportunities'), stat(3, '12 mo', 'Engagement')],
};

const vibra = {
  companyName: 'Vibra Media',
  categoryLabel: 'SEO / Digital PR',
  authorRole: 'Richard Edwards, Vibra Media',
  description:
    'Vibra Media is an SEO and digital PR agency with a profitable, proven outbound process.',
  bullets: [
    'A virtual assistant built targeted lists of companies already buying the exact services Vibra sells, on a recurring basis.',
    'The catch was speed: the VA could only add about 60 new leads a day, which capped how fast their outbound engine could grow.',
    "We built an automation in n8n that replicated the VA's exact steps and removed the human error along the way.",
    'What took the VA a full year of manual work, the automation now does in a single day, feeding their outbound engine far more lead flow than a person ever could.',
  ],
  stats: [stat(0, '1 day', 'Replaces a year of work'), stat(1, '60/day', 'Old manual cap'), stat(2, '0', 'Human errors'), stat(3, 'n8n', 'Custom automation')],
};

(async () => {
  const page = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]{
      _id,
      "sectionKey": sections[_type=="caseStudiesSection"][0]._key,
      "caseKeys": sections[_type=="caseStudiesSection"][0].cases[]._key
    }`
  );
  if (!page) { console.error('No home page found.'); process.exit(1); }
  const keys = page.caseKeys || [];
  console.log('Home page:', page._id, '| section:', page.sectionKey, '| cases:', keys.length);

  console.log('Uploading screenshots...');
  const forgeShot = await uploadImage('modal-2.png');
  const lolaShot = await uploadImage('modal-3.png');

  // case order: 0=LH(done) 1=Forge 2=LolaBird 3=Vibra 4=LolaBird(dup) 5=Vibra(dup)
  const plan = [
    { idx: 1, data: { ...forge, screenshotImage: forgeShot } },
    { idx: 2, data: { ...lolabird, screenshotImage: lolaShot } },
    { idx: 3, data: { ...vibra } },
    { idx: 4, data: { ...lolabird, screenshotImage: lolaShot } },
    { idx: 5, data: { ...vibra } },
  ];

  const patch = client.patch(page._id);
  for (const { idx, data } of plan) {
    const key = keys[idx];
    if (!key) { console.warn('  no case at index', idx, '- skipping'); continue; }
    const base = `sections[_key=="${page.sectionKey}"].cases[_key=="${key}"]`;
    const set = {};
    for (const [k, v] of Object.entries(data)) set[`${base}.${k}`] = v;
    patch.set(set);
    console.log('  queued', data.companyName, '-> case index', idx, `(${key})`);
  }
  await patch.commit();

  console.log('Done. Cases 2-4 (+ duplicates) modal content updated.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
