/*
  Seed the Terms of Service as a `legalPage` document in Sanity, mirroring the
  content that used to be hardcoded in app/terms/page.tsx.
  Run:  node studio/scripts/seed-terms.js
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
  { title: 'Introduction', body: 'Welcome to Accelerate B2B ("Accelerate B2B", "we", "our", or "us"). These Terms of Service ("Terms") govern your access to and use of our website at accelerateb2b.com (the "Site") and the cold outbound lead generation services we provide ("Services"). By using the Site or engaging us for Services, you agree to these Terms. If you do not agree, please do not use the Site or engage us.' },
  { title: 'Acceptance of Terms', body: 'By accessing accelerateb2b.com or engaging Accelerate B2B for cold email, LinkedIn outreach, email infrastructure, lead list building, copywriting, consulting, or any related service, you confirm that you are at least 18 years old and legally able to enter a binding agreement. If you are entering into these Terms on behalf of a company or other entity, you confirm that you have authority to bind that entity. You agree to use the Site and the Services for lawful business purposes only.' },
  { title: 'Services', body: 'Accelerate B2B provides done-for-you cold outbound lead generation for B2B companies. Services may include cold email campaigns, LinkedIn outreach, email infrastructure setup, ICP lead list building, cold email copywriting, and consulting. The exact scope, deliverables, fees, timeline, and any test campaign terms for an engagement are set out in a separate written agreement, proposal, or statement of work agreed between Accelerate B2B and the client. These Terms govern use of the Site and the general legal relationship, and the written engagement governs the work itself. If there is a conflict, the written engagement controls for that engagement. We do not guarantee any specific reply rate, number of meetings, pipeline value, or revenue outcome.' },
  { title: 'Engagement and Fees', body: 'Fees are set out in the written agreement for each engagement. Accelerate B2B works on a monthly basis with no setup fee and no minimum lock-in period, unless your agreement states otherwise. Invoices are due within the timeframe stated in your agreement, and we may pause or suspend Services for any account with overdue balances. Where a free or reduced-cost test campaign is offered, it is provided on the terms communicated at the time and creates no obligation to continue beyond the test campaign.' },
  { title: 'Confidentiality', body: "Both parties will treat each other's confidential information as confidential and use it only for the purpose of the engagement. Confidential information includes lead lists, prospect and campaign data, target market and ICP details, offer and pricing information, strategy, results, and anything marked or reasonably understood to be confidential. These obligations survive the end of any engagement for a period of two years. Lead data and campaign assets we deliver are provided in confidence and may not be resold or shared with any third party without our written permission." },
  { title: 'Client Responsibilities and Acceptable Use', body: 'You are responsible for the accuracy of the information you provide, including your offer, target market, and ICP, and for the legality of the product or service you promote. You agree to use the Services only for lawful outreach and to comply with all laws that apply to email and electronic marketing, including the UK GDPR, the Privacy and Electronic Communications Regulations (PECR), the US CAN-SPAM Act, and any equivalent laws in the territories you target. You will not use the Services to promote illegal, deceptive, or prohibited products, to send content that is unlawful, defamatory, or infringing, or in any way that could harm sender reputation or deliverability. You will cooperate with reasonable requests needed to protect deliverability and compliance. We may decline or stop work that we believe breaches these obligations.' },
  { title: 'Intellectual Property', body: 'All content on accelerateb2b.com, including text, graphics, logos, and the Accelerate B2B name and brand marks, is owned by or licensed to Accelerate B2B and protected by applicable copyright and trademark laws. You may not copy, reproduce, modify, republish, sell, or distribute any content from the Site without our prior written permission. The systems, sequences, frameworks, prompts, and tooling we use to deliver the Services remain our property. Campaign assets we create specifically for you, such as your sequences and copy, are licensed to you for use in your own outreach. Engaging us does not transfer ownership of our underlying methodology or tools.' },
  { title: 'Limitation of Liability', body: 'The Services are provided on an "as is" and "as available" basis. We make commercially reasonable efforts to deliver qualified conversations, but we do not guarantee any specific reply rate, number of meetings, deal, or revenue outcome, as results depend on your offer, market, pricing, and sales follow-up. To the maximum extent permitted by law, the total aggregate liability of Accelerate B2B arising out of or related to any engagement is limited to the fees you actually paid to Accelerate B2B in the three months before the claim. We are not liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, business, data, or goodwill, even if advised of the possibility. Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under applicable law.' },
  { title: 'Indemnification', body: 'You agree to indemnify, defend, and hold harmless Accelerate B2B, its team, and its contractors from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to the legality of your offer, product, or service; your instructions regarding target market, messaging, or sending; your breach of these Terms or any applicable law; and any third-party claim arising out of the outreach conducted on your behalf at your direction.' },
  { title: 'Term and Termination', body: 'These Terms apply for as long as you use the Site or have an active engagement with Accelerate B2B. Because there is no minimum lock-in, either party may end an active engagement on the notice stated in your agreement, or, if none is stated, at the end of the current paid month. Termination does not relieve either party of obligations accrued before termination, including payment, confidentiality, and acceptable-use obligations, which survive. We may update these Terms from time to time. Material changes will be posted on this page with a revised "Last Updated" date, and continued use of the Site or Services after a change means you accept the updated Terms.' },
  { title: 'Governing Law and Dispute Resolution', body: 'These Terms and any engagement are governed by and construed in accordance with the laws of England and Wales, without regard to conflict-of-law principles. The courts of England and Wales have exclusive jurisdiction over any dispute arising out of or related to these Terms or any engagement. Before starting any formal proceeding, the parties agree to attempt in good faith to resolve the dispute through direct discussion. If the parties cannot resolve it within 30 days of written notice, either party may pursue the matter in the courts named above.' },
  { title: 'Contact', body: 'For questions about these Terms, please contact:\nAccelerate B2B\nSpencer Hirst, Founder\nEmail: spencer@accelerateb2b.com' },
];

const doc = {
  _id: 'legalPage-terms',
  _type: 'legalPage',
  title: 'Terms of Service',
  slug: { _type: 'slug', current: 'terms' },
  lastUpdated: 'June 9, 2026',
  ctaText: 'Apply For Your Free Test Campaign',
  ctaUrl: '/',
  ctaNote: 'No Setup Fee | No Lock-In | Only A Few Spots Available',
  sections: sections.map((s, i) => ({ _key: `sec_${i}`, _type: 'object', ...s })),
  metaTitle: 'Terms of Service | Accelerate B2B',
  metaDescription: 'Terms of Service governing your access to and use of accelerateb2b.com and our services.',
};

client.createOrReplace(doc)
  .then(() => console.log('Done. legalPage "terms" seeded.'))
  .catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
