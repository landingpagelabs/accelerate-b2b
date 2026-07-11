/*
  Seed the /congrats page content as a `congratsPage` document in Sanity,
  mirroring what used to be hardcoded in app/congrats/page.tsx.
  Uploads the step-1 image and the about avatar.
  Run:  node studio/scripts/seed-congrats.js
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

const PUBLIC = path.join(__dirname, '..', '..', 'public', 'images', 'sections', 'steps');

async function upload(file) {
  const asset = await client.assets.upload('image', fs.readFileSync(path.join(PUBLIC, file)), {
    filename: file,
    contentType: 'image/png',
  });
  console.log('  uploaded', file, '->', asset._id);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

(async () => {
  console.log('Uploading images...');
  const stepImage = await upload('Frame 2147260029 (1).png');
  const aboutImage = await upload('Frame 2147206122.png');

  const doc = {
    _id: 'congratsPage-main',
    _type: 'congratsPage',
    metaTitle: 'Consultation Booked — Accelerate B2B',
    headerBadge: 'CONSULTATION BOOKED!',
    heroStrapline: 'I’m looking forward to speaking with you, and...',
    heroTitle: 'You’re one step closer to an outreach system that works',
    heroSubtitle:
      'On the call, I’ll share my read on your market, walk you through how the test campaign and pricing work, and answer any questions. If we’re not a fit, I’ll tell you that too. Please note that your attendance is required.',
    stepsHeading: 'Important! To confirm your call, follow the 3 steps below:',
    steps: [
      {
        _key: 'step_0', _type: 'object',
        strapline: 'Step 01',
        title: 'Add the event to your calendar and set a reminder',
        body: 'I’ve sent a confirmation email with all your call details. Please click "Yes" (Google) or "Accept" (Microsoft) to confirm your invite. If something changes and you can\'t make it, reply to that email and I’ll give your slot to another company. We only have a few each month.',
        widget: 'image',
        image: stepImage,
      },
      {
        _key: 'step_1', _type: 'object',
        strapline: 'Step 02',
        title: 'Refer a peer who could use a system like this',
        body: 'Know another founder who’d benefit? Copy the message below and send it their way. If they book too, you both move up the priority list for the test campaign.',
        widget: 'copyMessage',
      },
      {
        _key: 'step_2', _type: 'object',
        strapline: 'Step 03/3 (Final Step)',
        title: 'See what happens when cold outreach is done right',
        body: 'While you wait for your call, scroll the results below: real campaign dashboards and the replies they pulled, from clients like Ben, who had two businesses under contract within 30 days of his first campaign. That’s the system I’ll walk you through on the call.',
        widget: 'chevron',
      },
    ],
    referralMessage:
      'Hey, I just booked a call with Accelerate B2B, a cold outreach agency. The founder works on every campaign himself and seems like they have some good results. Right now they’re running a free test campaign so you can see it work before paying anything. They’ve only got a few spots. Thought it might be of interest. Here’s all the info: www.accelerateb2b.com',
    aboutTitle: 'I look forward to meeting you at our call!',
    aboutDividerText: 'TALK SOON',
    aboutImage,
    aboutName: 'Spencer Hirst',
    aboutRole: 'Founder, Accelerate B2B',
    aboutCertified: 'Certified Cold Email Expert',
    aboutCtaText: 'Check Out My Free Tutorials',
    aboutCtaUrl: '#',
  };

  await client.createOrReplace(doc);
  console.log('Done. congratsPage seeded.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
