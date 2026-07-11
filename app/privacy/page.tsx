import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchSanity } from '@/lib/sanity';

export const revalidate = 60;

const legalPageQuery = `*[_type == "legalPage" && slug.current == $slug][0]{
  title, lastUpdated, ctaText, ctaUrl, ctaNote, metaTitle, metaDescription,
  sections[]{ title, body }
}`;

async function getPage() {
  return fetchSanity<any>(legalPageQuery, { slug: 'privacy' });
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage();
  return {
    title: page?.metaTitle || page?.title || 'Privacy Policy',
    description: page?.metaDescription,
  };
}

export default async function PrivacyPage() {
  const page = await getPage();
  const sections: Array<{ title: string; body: string }> = page?.sections || [];

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
                  <span className="tos-eyebrow__text">Last Updated: {page?.lastUpdated}</span>
                </div>
                <h1 className="tos-hero__title">{page?.title || 'Privacy Policy'}</h1>
              </div>

              {page?.ctaText && (
                <div className="tos-hero__cta-stack">
                  <a href={page.ctaUrl || '/'} className="footer__cta">
                    {page.ctaText}
                    <span className="footer__cta-arrow">
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0013 2.16602C18.9813 2.16602 23.8346 7.01935 23.8346 12.9993C23.8346 18.9793 18.9813 23.8327 13.0013 23.8327C7.0213 23.8327 2.16797 18.9793 2.16797 12.9993C2.16797 7.01935 7.0213 2.16602 13.0013 2.16602ZM13.0013 11.916H8.66797V14.0827H13.0013V17.3327L17.3346 12.9993L13.0013 8.66602V11.916Z" fill="white"/>
                      </svg>
                    </span>
                  </a>
                  {page.ctaNote && (
                    <p className="footer__cta-note tos-hero__note">{page.ctaNote}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="tos-panel">
          <div className="padding-global">
            <div className="tos-panel__inner">
              {sections.map((block, idx) => (
                <article className="tos-block" key={idx}>
                  <h2 className="tos-block__title">{block.title}</h2>
                  <p className="tos-block__body">
                    {(block.body || '').split('\n').map((line, i) => (
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
