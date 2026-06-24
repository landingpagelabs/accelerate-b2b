import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Accelerate B2B',
  description: 'Terms of Service governing your access to and use of accelerateb2b.com and our services.',
};

const LAST_UPDATED = 'June 9, 2026';

type Block = { title: string; body: string };

const SECTIONS: Block[] = [
  {
    title: 'Introduction',
    body:
      'Welcome to Accelerate B2B ("Accelerate B2B", "we", "our", or "us"). These Terms of Service ("Terms") govern your access to and use of our website at accelerateb2b.com (the "Site") and the cold outbound lead generation services we provide ("Services"). By using the Site or engaging us for Services, you agree to these Terms. If you do not agree, please do not use the Site or engage us.',
  },
  {
    title: 'Acceptance of Terms',
    body:
      'By accessing accelerateb2b.com or engaging Accelerate B2B for cold email, LinkedIn outreach, email infrastructure, lead list building, copywriting, consulting, or any related service, you confirm that you are at least 18 years old and legally able to enter a binding agreement. If you are entering into these Terms on behalf of a company or other entity, you confirm that you have authority to bind that entity. You agree to use the Site and the Services for lawful business purposes only.',
  },
  {
    title: 'Services',
    body:
      'Accelerate B2B provides done-for-you cold outbound lead generation for B2B companies. Services may include cold email campaigns, LinkedIn outreach, email infrastructure setup, ICP lead list building, cold email copywriting, and consulting. The exact scope, deliverables, fees, timeline, and any test campaign terms for an engagement are set out in a separate written agreement, proposal, or statement of work agreed between Accelerate B2B and the client. These Terms govern use of the Site and the general legal relationship, and the written engagement governs the work itself. If there is a conflict, the written engagement controls for that engagement. We do not guarantee any specific reply rate, number of meetings, pipeline value, or revenue outcome.',
  },
  {
    title: 'Engagement and Fees',
    body:
      'Fees are set out in the written agreement for each engagement. Accelerate B2B works on a monthly basis with no setup fee and no minimum lock-in period, unless your agreement states otherwise. Invoices are due within the timeframe stated in your agreement, and we may pause or suspend Services for any account with overdue balances. Where a free or reduced-cost test campaign is offered, it is provided on the terms communicated at the time and creates no obligation to continue beyond the test campaign.',
  },
  {
    title: 'Confidentiality',
    body:
      "Both parties will treat each other's confidential information as confidential and use it only for the purpose of the engagement. Confidential information includes lead lists, prospect and campaign data, target market and ICP details, offer and pricing information, strategy, results, and anything marked or reasonably understood to be confidential. These obligations survive the end of any engagement for a period of two years. Lead data and campaign assets we deliver are provided in confidence and may not be resold or shared with any third party without our written permission.",
  },
  {
    title: 'Client Responsibilities and Acceptable Use',
    body:
      'You are responsible for the accuracy of the information you provide, including your offer, target market, and ICP, and for the legality of the product or service you promote. You agree to use the Services only for lawful outreach and to comply with all laws that apply to email and electronic marketing, including the UK GDPR, the Privacy and Electronic Communications Regulations (PECR), the US CAN-SPAM Act, and any equivalent laws in the territories you target. You will not use the Services to promote illegal, deceptive, or prohibited products, to send content that is unlawful, defamatory, or infringing, or in any way that could harm sender reputation or deliverability. You will cooperate with reasonable requests needed to protect deliverability and compliance. We may decline or stop work that we believe breaches these obligations.',
  },
  {
    title: 'Intellectual Property',
    body:
      'All content on accelerateb2b.com, including text, graphics, logos, and the Accelerate B2B name and brand marks, is owned by or licensed to Accelerate B2B and protected by applicable copyright and trademark laws. You may not copy, reproduce, modify, republish, sell, or distribute any content from the Site without our prior written permission. The systems, sequences, frameworks, prompts, and tooling we use to deliver the Services remain our property. Campaign assets we create specifically for you, such as your sequences and copy, are licensed to you for use in your own outreach. Engaging us does not transfer ownership of our underlying methodology or tools.',
  },
  {
    title: 'Limitation of Liability',
    body:
      'The Services are provided on an "as is" and "as available" basis. We make commercially reasonable efforts to deliver qualified conversations, but we do not guarantee any specific reply rate, number of meetings, deal, or revenue outcome, as results depend on your offer, market, pricing, and sales follow-up. To the maximum extent permitted by law, the total aggregate liability of Accelerate B2B arising out of or related to any engagement is limited to the fees you actually paid to Accelerate B2B in the three months before the claim. We are not liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, business, data, or goodwill, even if advised of the possibility. Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under applicable law.',
  },
  {
    title: 'Indemnification',
    body:
      'You agree to indemnify, defend, and hold harmless Accelerate B2B, its team, and its contractors from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to the legality of your offer, product, or service; your instructions regarding target market, messaging, or sending; your breach of these Terms or any applicable law; and any third-party claim arising out of the outreach conducted on your behalf at your direction.',
  },
  {
    title: 'Term and Termination',
    body:
      'These Terms apply for as long as you use the Site or have an active engagement with Accelerate B2B. Because there is no minimum lock-in, either party may end an active engagement on the notice stated in your agreement, or, if none is stated, at the end of the current paid month. Termination does not relieve either party of obligations accrued before termination, including payment, confidentiality, and acceptable-use obligations, which survive. We may update these Terms from time to time. Material changes will be posted on this page with a revised "Last Updated" date, and continued use of the Site or Services after a change means you accept the updated Terms.',
  },
  {
    title: 'Governing Law and Dispute Resolution',
    body:
      'These Terms and any engagement are governed by and construed in accordance with the laws of England and Wales, without regard to conflict-of-law principles. The courts of England and Wales have exclusive jurisdiction over any dispute arising out of or related to these Terms or any engagement. Before starting any formal proceeding, the parties agree to attempt in good faith to resolve the dispute through direct discussion. If the parties cannot resolve it within 30 days of written notice, either party may pursue the matter in the courts named above.',
  },
  {
    title: 'Contact',
    body:
      'For questions about these Terms, please contact:\nAccelerate B2B\nSpencer Hirst, Founder\nEmail: spencer@accelerateb2b.com',
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="tos-hero">
          <div className="padding-global">
            <div className="tos-hero__inner">
              <div className="tos-hero__heading">
                <div className="tos-eyebrow">
                  <svg className="tos-eyebrow__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.3496 17.4981H15.9326C15.8764 19.7161 14.0874 21.5038 11.8696 21.5609L11.7619 21.5623L4.57794 21.5623C3.37525 21.5623 2.40039 20.5873 2.40039 19.3847V14.8453L2.40039 13.2177V8.67822L2.4011 8.62206C2.43041 7.46405 3.3636 6.53068 4.52177 6.50138L4.57794 6.50067H7.99348C8.00938 5.86983 8.1655 5.2738 8.43182 4.7425C8.8638 3.88002 9.58611 3.18812 10.4706 2.79476C10.7196 2.68409 10.9813 2.59705 11.2529 2.53649C11.5125 2.4786 11.7813 2.44492 12.0568 2.43794L12.1646 2.43652L19.3496 2.43652L19.4057 2.43723C19.5777 2.44159 19.7452 2.46594 19.9052 2.50804C20.7702 2.73567 21.4247 3.48226 21.5162 4.39485C21.5232 4.46694 21.5271 4.54007 21.5271 4.61406V9.15351V10.7811V15.3206L21.5264 15.3767C21.4967 16.5347 20.5635 17.4681 19.4057 17.4974L19.3496 17.4981ZM3.6663 8.67822C3.6663 8.17474 4.07461 7.76658 4.57794 7.76658H8.1549L9.49781 7.76658L11.7619 7.76658C12.8099 7.76658 13.7286 8.32147 14.2397 9.15351H12.1646L12.0568 9.15492C11.7142 9.1636 11.3822 9.21355 11.065 9.29999C10.562 9.43705 10.0969 9.66586 9.68854 9.96731C8.68648 10.7072 8.02739 11.8847 7.99348 13.2177L3.6663 13.2177L3.6663 8.67822ZM11.7619 6.5007L11.8696 6.50209C13.5905 6.54601 15.0535 7.63245 15.6486 9.15351H20.2612V4.61406C20.2608 4.11059 19.8529 3.70244 19.3496 3.70243L12.1646 3.70243C10.5956 3.70243 9.31696 4.94563 9.2601 6.50067L11.7619 6.5007ZM11.065 10.6346C11.4041 10.4959 11.7753 10.4194 12.1646 10.4194H14.6572H15.9262H20.2612V10.7811V15.3206C20.2608 15.824 19.8529 16.2322 19.3496 16.2322H15.7712C15.5137 15.3395 14.9666 14.5697 14.2379 14.0315C13.8296 13.73 13.3644 13.5012 12.8614 13.3641C12.6205 13.2985 12.3708 13.2539 12.1147 13.2324L12.0233 13.2258L11.9887 13.2238L11.9162 13.2205L11.8696 13.2191L11.7619 13.2177L9.2601 13.2177C9.30284 12.0483 10.0365 11.0552 11.065 10.6346ZM8.1549 14.4836H9.49781L11.7619 14.4836C12.1511 14.4836 12.5224 14.5601 12.8614 14.6988C13.5626 14.9857 14.1266 15.5386 14.4283 16.2322C14.5826 16.5869 14.6681 16.9784 14.6681 17.39C14.6681 17.4262 14.6674 17.4622 14.666 17.4981C14.6091 19.0531 13.3309 20.2964 11.7619 20.2964L4.57794 20.2964C4.07461 20.2964 3.6663 19.8882 3.6663 19.3847V14.8453V14.4836H8.1549Z" fill="#FF6B2C"/>
                  </svg>
                  <span className="tos-eyebrow__divider" />
                  <span className="tos-eyebrow__text">Last Updated: {LAST_UPDATED}</span>
                </div>
                <h1 className="tos-hero__title">Terms of Service</h1>
              </div>

              <div className="tos-hero__cta-stack">
                <a href="/" className="footer__cta">
                  Apply For Your Free Test Campaign
                  <span className="footer__cta-arrow">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.0013 2.16602C18.9813 2.16602 23.8346 7.01935 23.8346 12.9993C23.8346 18.9793 18.9813 23.8327 13.0013 23.8327C7.0213 23.8327 2.16797 18.9793 2.16797 12.9993C2.16797 7.01935 7.0213 2.16602 13.0013 2.16602ZM13.0013 11.916H8.66797V14.0827H13.0013V17.3327L17.3346 12.9993L13.0013 8.66602V11.916Z" fill="white"/>
                    </svg>
                  </span>
                </a>
                <p className="footer__cta-note tos-hero__note">No Setup Fee | No Lock-In | Only A Few Spots Available</p>
              </div>
            </div>
          </div>
        </section>

        <section className="tos-panel">
          <div className="padding-global">
            <div className="tos-panel__inner">
              {SECTIONS.map((block) => (
                <article className="tos-block" key={block.title}>
                  <h2 className="tos-block__title">{block.title}</h2>
                  <p className="tos-block__body">
                    {block.body.split('\n').map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
