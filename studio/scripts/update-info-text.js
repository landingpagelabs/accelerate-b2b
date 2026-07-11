/*
  Update infoSection copy on the Home page to match the "Hey there, I'm
  Spencer!" reference exactly (heading, body, author name/role).
  Run:  node studio/scripts/update-info-text.js
*/
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

const body = [
  "If one of my cold emails is how you found this page, then you've already seen the system working.",
  "Cold outreach is how we win our own clients, and it's the same playbook we'd run for you.",
  'I spent six years building sales and email systems, including campaigns for brands like Coupa, Ford, and RMA Group.',
  "Today we're a small team of go-to-market experts who help businesses build predictable revenue. Your campaign never gets handed to a junior or intern. I work on every one myself.",
  'We go the extra mile because results are the only thing this business runs on. One client selling physical products B2B had cold outreach that produced 0 positive responses in 90 days. We turned it around to 1,200 opportunities over the next year, worth $1.8m in pipeline revenue.',
  'For another client, a buy-side M&A firm, we generated 95 positive responses from business owners interested in selling. That led to 16 qualified conversations and eventually 2 purchase agreements worth $500k in fees.',
  'Which is why we want to prove ourselves first. Your first campaign is a free test, and every interested reply is yours to keep.',
].join('\n\n');

(async () => {
  const home = await client.fetch('*[_id=="page.home"][0]{ sections }');
  const idx = home.sections.findIndex((s) => s._type === 'infoSection');
  if (idx === -1) throw new Error('infoSection not found on page.home');

  await client
    .patch('page.home')
    .set({
      [`sections[${idx}].heading`]: 'Hey there, I’m Spencer!',
      [`sections[${idx}].body`]: body,
      [`sections[${idx}].authorName`]: 'Spencer Hirst',
      [`sections[${idx}].authorRole`]: 'Founder ▪ Accelerate B2B',
    })
    .commit();

  console.log('Done. infoSection copy updated to match reference.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
