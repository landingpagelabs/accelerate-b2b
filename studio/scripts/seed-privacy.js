/*
  Seed the Privacy Policy as a `legalPage` document in Sanity, mirroring the
  content that used to be hardcoded in app/privacy/page.tsx.
  Run:  node studio/scripts/seed-privacy.js
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

const sections = [
  { title: 'Introduction', body: 'Accelerate B2B ("Accelerate B2B", "we", "our", or "us") respects your privacy. This Privacy Policy explains what information we collect when you use our website at accelerateb2b.com (the "Site") or engage us for cold outbound lead generation services, how we use it, who we share it with, and the choices you have. By using the Site or engaging us, you agree to the practices described in this Policy.' },
  { title: 'Information We Collect', body: 'We collect the following categories of personal information. Contact and business data: your name, business email, phone number, job title, company name, website, and LinkedIn profile when you book a call, complete a form, or correspond with us. Engagement data: your offer, target market and ICP, sending domains, and any information you share with us to run your campaigns. Prospect data: when we build lead lists on your behalf, we process business contact details of the prospects you target, such as name, business email, job title, company, and LinkedIn profile. Site usage data: IP address, browser type, device information, pages visited, and referring URL, collected automatically when you visit accelerateb2b.com. Cookie data: see the Cookies section below. We do not collect government identification numbers or payment card details through the Site.' },
  { title: 'How We Use Your Information', body: 'We use the information we collect to provide and operate the Services, including building lead lists and running cold email and LinkedIn campaigns on your behalf; to communicate with you about a call, proposal, campaign, or other matter; to maintain and improve the Site and the Services; and to comply with our legal obligations and protect our rights. Our lawful bases under the UK GDPR are the performance of our contract with you, your consent where required, and our legitimate interest in operating and marketing our business. We do not sell your personal information.' },
  { title: 'Cookies and Tracking', body: 'The Site uses cookies and similar technologies to remember your preferences, measure traffic, and improve the Site. We use essential cookies that the Site needs to function, analytics cookies that collect aggregated data on how visitors use the Site, and scheduling cookies set when you book a call through our embedded booking widget. You can control cookies through your browser settings. Disabling essential cookies may affect how the Site works.' },
  { title: 'Third-Party Services', body: 'We use the following third-party providers to operate the Site and deliver the Services. Each processes data under its own privacy and security commitments: Calendly for call scheduling; Google Workspace for email and calendar; a website analytics provider to understand Site usage; Instantly for email sending and campaign management; Apollo and similar data providers for building and enriching lead lists; and LinkedIn for professional outreach. We share data with these providers only to the extent needed for them to perform their function.' },
  { title: 'Data Sharing', body: 'We share personal information only as needed to provide the Services or as required by law. Service providers: the third-party tools listed above, only to the extent needed to perform their function. When we build lead lists for you, the prospect data we deliver is shared with you, the client, for your own outreach. Legal authorities: where required by law, court order, or to protect the rights, property, or safety of Accelerate B2B or others. We do not sell or rent your personal information.' },
  { title: 'Data Retention', body: 'We retain personal information for as long as needed to provide the Services and to meet our legal obligations. Active engagement data is kept for the duration of the engagement and a reasonable period afterward for our records. Lead and campaign data is kept while it is needed for your campaigns or until you ask us to delete it. Site analytics data is kept according to the retention settings of our analytics provider. You may request deletion at any time, as described in the next section.' },
  { title: 'Your Rights', body: "Under the UK GDPR you have the right to access the personal information we hold about you, to ask us to correct inaccurate information, to ask us to delete your personal information subject to our legal retention obligations, to object to or restrict certain processing, and to withdraw consent at any time where we rely on consent. Every marketing email we send includes an unsubscribe link. To exercise any of these rights, email spencer@accelerateb2b.com and we will respond within the timeframe required by law. If you are not satisfied with our response, you have the right to complain to the UK Information Commissioner's Office (ICO) at ico.org.uk." },
  { title: "International Users and Children's Privacy", body: 'Accelerate B2B operates internationally and processes data using providers based in the UK, the EU, and the US. Where personal information is transferred outside the UK or EU, we rely on appropriate safeguards such as the relevant standard contractual clauses. By using the Site or engaging us, you understand that your information may be processed in these locations. Our Services are intended for business professionals. The Site is not directed to children under 16, and we do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us so we can delete it.' },
  { title: 'Changes to This Policy', body: 'We may update this Privacy Policy from time to time. Material changes will be posted on this page with a revised "Last Updated" date. We encourage you to review this Policy periodically.' },
  { title: 'Contact', body: 'For questions about this Privacy Policy, or to exercise any of the rights described above, please contact:\nAccelerate B2B\nSpencer Hirst, Founder\nEmail: spencer@accelerateb2b.com' },
];

const doc = {
  _id: 'legalPage-privacy',
  _type: 'legalPage',
  title: 'Privacy Policy',
  slug: { _type: 'slug', current: 'privacy' },
  lastUpdated: 'June 9, 2026',
  ctaText: 'Apply For Your Free Test Campaign',
  ctaUrl: '/',
  ctaNote: 'No Setup Fee | No Lock-In | Only A Few Spots Available',
  sections: sections.map((s, i) => ({ _key: `sec_${i}`, _type: 'object', ...s })),
  metaTitle: 'Privacy Policy | Accelerate B2B',
  metaDescription: 'How Accelerate B2B collects, uses, and shares your information when you use accelerateb2b.com or our services.',
};

client.createOrReplace(doc)
  .then(() => console.log('Done. legalPage "privacy" seeded.'))
  .catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
