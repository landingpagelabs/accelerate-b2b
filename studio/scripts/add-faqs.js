/*
  One-off: port the FAQ section from the bare layout into the Sanity "home" page.
  Run from project root:  node studio/scripts/add-faqs.js
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

// --- 1. Parse the FAQ Q&A pairs out of the bare-layout HTML ---
const html = fs.readFileSync(
  path.join(__dirname, '..', '..', 'Full B2B', 'Accelerate_B2B', 'index.html'),
  'utf8'
);
const clean = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const itemRe = /<li class="faqs__item">[\s\S]*?<span class="faqs__question">([\s\S]*?)<\/span>[\s\S]*?<p class="faqs__answer">([\s\S]*?)<\/p>[\s\S]*?<\/li>/g;
const faqs = [];
let m;
let i = 0;
while ((m = itemRe.exec(html)) !== null) {
  faqs.push({
    _key: `faq_${i++}`,
    _type: 'object',
    question: clean(m[1]),
    answer: clean(m[2]),
  });
}
console.log(`Parsed ${faqs.length} FAQs from the bare layout.`);

const faqsSection = {
  _key: 'faqsSection_ported',
  _type: 'faqsSection',
  heading: 'Frequently asked questions',
  faqs,
};

// --- 2. Append it to the home page's sections (idempotent) ---
(async () => {
  const page = await client.fetch(`*[_type=="page" && slug.current=="home"][0]{_id, "keys": sections[]._key}`);
  if (!page) { console.error('No home page found.'); process.exit(1); }

  if ((page.keys || []).includes('faqsSection_ported')) {
    await client
      .patch(page._id)
      .unset([`sections[_key=="faqsSection_ported"]`])
      .commit();
    console.log('Removed previous ported FAQ section (re-adding fresh).');
  }

  await client
    .patch(page._id)
    .setIfMissing({ sections: [] })
    .append('sections', [faqsSection])
    .commit();

  console.log('Done. FAQ section appended to the home page.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
