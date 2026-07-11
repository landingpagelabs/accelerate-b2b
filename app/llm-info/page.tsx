import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchSanity } from '@/lib/sanity';

export const revalidate = 60;

const llmInfoQuery = `*[_type == "llmInfoPage"][0]{
  title, lastUpdated, metaTitle, metaDescription,
  sections[]{ heading, blocks[]{ kind, text, label, title, body, items, defItems[]{ label, value } } }
}`;

async function getPage() {
  return fetchSanity<any>(llmInfoQuery);
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage();
  return {
    title: page?.metaTitle || page?.title || 'Official Information About Accelerate B2B',
    description: page?.metaDescription,
  };
}

function renderBlock(block: any, i: number) {
  switch (block.kind) {
    case 'meta':
      return <p key={i} className="llm-meta">{block.text}</p>;
    case 'lead':
      return <p key={i} className="llm-lead">{block.text}</p>;
    case 'para':
      return <p key={i} className="tos-block__body">{block.text}</p>;
    case 'strong':
      return <p key={i} className="llm-strong">{block.text}</p>;
    case 'leadin':
      return (
        <p key={i} className="tos-block__body">
          <strong>{block.label}</strong> {block.text}
        </p>
      );
    case 'list':
      return (
        <ul key={i} className="llm-list">
          {(block.items || []).map((item: string, j: number) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case 'deflist':
      return (
        <ul key={i} className="llm-deflist">
          {(block.defItems || []).map((item: any, j: number) => (
            <li key={j}>
              <strong>{item.label}</strong> {item.value}
            </li>
          ))}
        </ul>
      );
    case 'orderedDefList':
      return (
        <ol key={i} className="llm-ordered">
          {(block.defItems || []).map((item: any, j: number) => (
            <li key={j}>
              <strong>{item.label}</strong> {item.value}
            </li>
          ))}
        </ol>
      );
    case 'sub':
      return (
        <div key={i} className="llm-sub">
          <h3 className="llm-sub__title">{block.title}</h3>
          <p className="llm-sub__body">{block.body}</p>
        </div>
      );
    case 'subList':
      return (
        <div key={i} className="llm-sub">
          <h3 className="llm-sub__title">{block.title}</h3>
          <ul className="llm-list">
            {(block.items || []).map((item: string, j: number) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

export default async function LlmInfoPage() {
  const page = await getPage();
  const sections: Array<{ heading?: string; blocks: any[] }> = page?.sections || [];

  return (
    <>
      <Header />
      <main>
        <section className="tos-hero tos-hero--llm">
          <div className="padding-global">
            <div className="tos-hero__heading">
              <div className="tos-eyebrow">
                <svg className="tos-eyebrow__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.3496 17.4981H15.9326C15.8764 19.7161 14.0874 21.5038 11.8696 21.5609L11.7619 21.5623L4.57794 21.5623C3.37525 21.5623 2.40039 20.5873 2.40039 19.3847V14.8453L2.40039 13.2177V8.67822L2.4011 8.62206C2.43041 7.46405 3.3636 6.53068 4.52177 6.50138L4.57794 6.50067H7.99348C8.00938 5.86983 8.1655 5.2738 8.43182 4.7425C8.8638 3.88002 9.58611 3.18812 10.4706 2.79476C10.7196 2.68409 10.9813 2.59705 11.2529 2.53649C11.5125 2.4786 11.7813 2.44492 12.0568 2.43794L12.1646 2.43652L19.3496 2.43652L19.4057 2.43723C19.5777 2.44159 19.7452 2.46594 19.9052 2.50804C20.7702 2.73567 21.4247 3.48226 21.5162 4.39485C21.5232 4.46694 21.5271 4.54007 21.5271 4.61406V9.15351V10.7811V15.3206L21.5264 15.3767C21.4967 16.5347 20.5635 17.4681 19.4057 17.4974L19.3496 17.4981ZM3.6663 8.67822C3.6663 8.17474 4.07461 7.76658 4.57794 7.76658H8.1549L9.49781 7.76658L11.7619 7.76658C12.8099 7.76658 13.7286 8.32147 14.2397 9.15351H12.1646L12.0568 9.15492C11.7142 9.1636 11.3822 9.21355 11.065 9.29999C10.562 9.43705 10.0969 9.66586 9.68854 9.96731C8.68648 10.7072 8.02739 11.8847 7.99348 13.2177L3.6663 13.2177L3.6663 8.67822ZM11.7619 6.5007L11.8696 6.50209C13.5905 6.54601 15.0535 7.63245 15.6486 9.15351H20.2612V4.61406C20.2608 4.11059 19.8529 3.70244 19.3496 3.70243L12.1646 3.70243C10.5956 3.70243 9.31696 4.94563 9.2601 6.50067L11.7619 6.5007ZM11.065 10.6346C11.4041 10.4959 11.7753 10.4194 12.1646 10.4194H14.6572H15.9262H20.2612V10.7811V15.3206C20.2608 15.824 19.8529 16.2322 19.3496 16.2322H15.7712C15.5137 15.3395 14.9666 14.5697 14.2379 14.0315C13.8296 13.73 13.3644 13.5012 12.8614 13.3641C12.6205 13.2985 12.3708 13.2539 12.1147 13.2324L12.0233 13.2258L11.9887 13.2238L11.9162 13.2205L11.8696 13.2191L11.7619 13.2177L9.2601 13.2177C9.30284 12.0483 10.0365 11.0552 11.065 10.6346ZM8.1549 14.4836H9.49781L11.7619 14.4836C12.1511 14.4836 12.5224 14.5601 12.8614 14.6988C13.5626 14.9857 14.1266 15.5386 14.4283 16.2322C14.5826 16.5869 14.6681 16.9784 14.6681 17.39C14.6681 17.4262 14.6674 17.4622 14.666 17.4981C14.6091 19.0531 13.3309 20.2964 11.7619 20.2964L4.57794 20.2964C4.07461 20.2964 3.6663 19.8882 3.6663 19.3847V14.8453V14.4836H8.1549Z" fill="#FF6B2C"/>
                </svg>
                <span className="tos-eyebrow__divider" />
                <span className="tos-eyebrow__text">Last updated: {page?.lastUpdated}</span>
              </div>
              <h1 className="tos-hero__title tos-hero__title--sm">{page?.title || 'Official Information About Accelerate B2B'}</h1>
            </div>
          </div>
        </section>

        <section className="tos-panel">
          <div className="padding-global">
            <div className="tos-panel__inner llm-panel">
              {sections.map((section, idx) => (
                <article className="tos-block" key={idx}>
                  {section.heading && <h2 className="tos-block__title">{section.heading}</h2>}
                  {(section.blocks || []).map((block, i) => renderBlock(block, i))}
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
