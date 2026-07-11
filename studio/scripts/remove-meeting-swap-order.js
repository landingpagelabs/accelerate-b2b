/*
  1) Removes the `meetingSection` block from the Home page.
  2) Swaps the order of `mechanismSection` (stages funnel) and
     `outreachIntroSection` ("Cold outreach works...") so the funnel comes
     first, followed by the intro copy.
  Run:  node studio/scripts/remove-meeting-swap-order.js
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

(async () => {
  const home = await client.fetch('*[_id=="page.home"][0]{ sections }');
  let sections = home.sections.filter((s) => s._type !== 'meetingSection');

  const mIdx = sections.findIndex((s) => s._type === 'mechanismSection');
  const oIdx = sections.findIndex((s) => s._type === 'outreachIntroSection');
  if (mIdx === -1 || oIdx === -1) throw new Error('Could not find both sections to swap');

  if (oIdx < mIdx) {
    const [outreach] = sections.splice(oIdx, 1);
    sections.splice(mIdx, 0, outreach); // mIdx now points right after removal shift; insert after mechanism
  }

  await client.patch('page.home').set({ sections }).commit();
  console.log('Done. meetingSection removed; mechanismSection now before outreachIntroSection.');
  console.log(sections.map((s) => s._type).join(' -> '));
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
