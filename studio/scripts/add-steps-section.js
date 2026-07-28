/*
  One-off:
    1. Add the "3 easy steps to a predictable pipeline" (stepsSection) block.
    2. Swap the order of faqsSection and textImageSection.
  Idempotent. Run from project root:  node studio/scripts/add-steps-section.js
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

const stepsSection = {
  _key: 'stepsSection_ported',
  _type: 'stepsSection',
  heading: '3 easy steps to a predictable pipeline',
  steps: [
    {
      _key: 'step_1',
      _type: 'object',
      accent: 'orange',
      title: 'Apply for your free test campaign',
      description:
        "Your first campaign is live within 14 days, on inboxes we've already warmed. We prove your market responds before you pay us anything, because that's the fastest way to earn your business. It's real work on our side, so we only take a handful of tests a month for qualified businesses. Either way, the list and every reply are yours to keep. Apply to see if you qualify.",
    },
    {
      _key: 'step_2',
      _type: 'object',
      accent: 'blue',
      title: 'We scale it into a pipeline',
      description:
        'Once the test proves out, we open it up: more volume, new segments, new angles, thousands of fresh prospects in front of your offer every month. We handle everything: the strategy, the lists, the copy, and the sending. Qualified replies land straight in your inbox, and your team turns them into booked meetings.',
    },
    {
      _key: 'step_3',
      _type: 'object',
      accent: 'green',
      title: 'Enjoy a pipeline you can count on',
      description:
        "The pipeline stays full, without you hiring a single rep. No setup fee, no lock-in, month to month, so you can stop any time and keep everything we built: the list, the sequences, the data. And if you'd rather run it in-house one day, we hand over the whole system with training and SOPs.",
    },
  ],
};

(async () => {
  const page = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]{_id, sections}`
  );
  if (!page) { console.error('No home page found.'); process.exit(1); }

  let sections = (page.sections || []).filter(
    (s) => s._key !== 'stepsSection_ported'
  );

  // --- 1. Swap faqsSection <-> textImageSection ---
  const fi = sections.findIndex((s) => s._type === 'faqsSection');
  const ti = sections.findIndex((s) => s._type === 'textImageSection');
  if (fi !== -1 && ti !== -1) {
    [sections[fi], sections[ti]] = [sections[ti], sections[fi]];
    console.log('Swapped faqsSection <-> textImageSection.');
  } else {
    console.log('Warning: faqs and/or textImage section not found — skipped swap.');
  }

  // --- 2. Insert steps section right after the tutorials section ---
  const tut = sections.findIndex((s) => s._type === 'tutorialsSection');
  const insertAt = tut !== -1 ? tut + 1 : sections.length;
  sections.splice(insertAt, 0, stepsSection);

  await client.patch(page._id).set({ sections }).commit();

  console.log('Done. New section order:');
  sections.forEach((s, i) => console.log(`  ${String(i).padStart(2)} ${s._type}`));
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
