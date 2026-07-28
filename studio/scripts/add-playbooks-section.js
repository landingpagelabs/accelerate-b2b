/*
  One-off: add the "Playbooks that get prospects to reply to cold messages"
  (playbooksSection) block, placed right ABOVE the stepsSection.
  Idempotent. Run from project root:  node studio/scripts/add-playbooks-section.js
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

const playbooksSection = {
  _key: 'playbooksSection_ported',
  _type: 'playbooksSection',
  heading: 'Playbooks that get prospects to reply to cold messages',
  cards: [
    { _key: 'pb_1', _type: 'object', icon: 'website', buttonText: 'View The Playbook',
      title: 'Website visitors',
      description: 'Want to know who your anonymous website visitors are who have already indicated interest in your service and are qualified?' },
    { _key: 'pb_2', _type: 'object', icon: 'lookalike', buttonText: 'View The Playbook',
      title: 'Lookalike audiences',
      description: 'What if you could unlock the ability to only reach out to businesses who all display the same qualities as your current best clients?' },
    { _key: 'pb_3', _type: 'object', icon: 'tech', buttonText: 'View The Playbook',
      title: 'Tech stack',
      description: "All your best clients use a certain tech stack? Here's a list of companies using X software." },
    { _key: 'pb_4', _type: 'object', icon: 'news', buttonText: 'View The Playbook',
      title: 'News & Funding',
      description: 'Your dream client just secured another round of funding? Convenient timing for new vendor agreements to be looked at.' },
    { _key: 'pb_5', _type: 'object', icon: 'jobs', buttonText: 'View The Playbook',
      title: 'Job postings and new hires',
      description: 'Your ideal prospect just hired a new VP of sales? Now is the time to see if new leadership is open to new solutions.' },
    { _key: 'pb_6', _type: 'object', icon: 'linkedin', buttonText: 'View The Playbook',
      title: 'LinkedIn company followers',
      description: "Your competitor already did all the work building a following of your exact ICP? We'll help you reach out to them." },
  ],
};

(async () => {
  const page = await client.fetch(
    `*[_type=="page" && slug.current=="home"][0]{_id, sections}`
  );
  if (!page) { console.error('No home page found.'); process.exit(1); }

  let sections = (page.sections || []).filter(
    (s) => s._key !== 'playbooksSection_ported'
  );

  // Insert right ABOVE the steps section (fallback: before textImage, else append).
  let at = sections.findIndex((s) => s._type === 'stepsSection');
  if (at === -1) at = sections.findIndex((s) => s._type === 'textImageSection');
  if (at === -1) at = sections.length;
  sections.splice(at, 0, playbooksSection);

  await client.patch(page._id).set({ sections }).commit();

  console.log('Done. New section order:');
  sections.forEach((s, i) => console.log(`  ${String(i).padStart(2)} ${s._type}`));
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
