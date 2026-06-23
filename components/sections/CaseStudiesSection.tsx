'use client';

import { useState } from 'react';
import { urlForImage } from '@/lib/sanity';

const VerifiedBadge = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.75668 16.6641L4.31751 14.1248L1.59066 13.49L1.85577 10.5539L0 8.33203L1.85577 6.11016L1.59066 3.17411L4.31751 2.53929L5.75668 0L8.33203 1.15061L10.9074 0L12.3466 2.53929L15.0734 3.17411L14.8083 6.11016L16.6641 8.33203L14.8083 10.5539L15.0734 13.49L12.3466 14.1248L10.9074 16.6641L8.33203 15.5134L5.75668 16.6641ZM7.5367 11.1491L11.8163 6.66563L10.7559 5.51501L7.5367 8.8875L5.90817 7.22109L4.84773 8.33203L7.5367 11.1491Z"
      fill="#3897F0"
    />
  </svg>
);

export default function CaseStudiesSection({ section }: { section: any }) {
  const tabs: string[] = section.tabs || [];
  const cases: any[] = section.cases || [];
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expanded, setExpanded] = useState(false);

  const filteredCases =
    activeTab === 'all' ? cases : cases.filter((c: any) => c.category === activeTab);
  const hasMore = filteredCases.length > 4;

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setExpanded(false);
  };

  return (
    <section className="section_tabs">
      <div className="padding-global">
        <div className="container-default">
          <div className="tabs_wrapper">
            <div className="tabs__container">
              <h2 className="tabs__title title-h2">{section.heading}</h2>

              <div className="tabs__switcher">
                <button
                  className={`tabs__tab${activeTab === 'all' ? ' tabs__tab--active' : ''}`}
                  type="button"
                  onClick={() => selectTab('all')}
                >
                  All Case Studies
                </button>
                {tabs.map((tab: string, i: number) => (
                  <button
                    key={i}
                    className={`tabs__tab${activeTab === tab ? ' tabs__tab--active' : ''}`}
                    type="button"
                    onClick={() => selectTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div
                className={`tabs__board${expanded ? ' tabs__board--expanded' : ''}${
                  hasMore ? '' : ' tabs__board--no-more'
                }`}
              >
                <div className="tabs__grid">
                  <div className="tabs_all">
                    {filteredCases.map((c: any, i: number) => (
                      <article key={i} className="tabs__card">
                        {c.image && (
                          <div className="tabs__card-image">
                            <img src={urlForImage(c.image).url()} alt="" />
                            <a className="tabs_card-link" href={c.link || '#'}>
                              Expand Case Study +
                            </a>
                          </div>
                        )}

                        <div className="tabs_card-head">
                          {c.companyLogo && (
                            <div className="tabs_card-head-image">
                              <img src={urlForImage(c.companyLogo).url()} alt="" />
                            </div>
                          )}
                          {c.title && <div className="tabs_card-head-title title-h4">{c.title}</div>}
                        </div>

                        {(c.quote || c.author) && (
                          <div className="tabs_card-comment">
                            <div className="tabs_card-avatar-info">
                              {c.avatar && (
                                <div className="tabs_card-avatar">
                                  <img src={urlForImage(c.avatar).url()} alt="" />
                                </div>
                              )}
                              {c.author && (
                                <p className="tabs_card-avatar-text-1 text-label-medium">{c.author}</p>
                              )}
                              <VerifiedBadge />
                            </div>
                            {c.quote && (
                              <div className="tabs_card-avatar-text text-body-regular">{c.quote}</div>
                            )}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>

                <div className="tabs__fade" />

                {filteredCases.length > 4 && (
                  <div className="tabs__more-wrap">
                    <button className="tabs__more" type="button" onClick={() => setExpanded((v) => !v)}>
                      <span className="tabs__more-badge mobile-d-none">
                        <img
                          className="tabs__more-badge-icon"
                          src="/images/sections/tabs/Vector-lightning.svg"
                          alt=""
                        />
                        <span className="tabs__more-badge-text">
                          <span className="tabs__more-badge-name">Instantly</span>
                          <span className="tabs__more-badge-sub">Certified Expert</span>
                        </span>
                      </span>
                      <span className="tabs__more-result mobile-d-none">
                        We Get Industry-Leading Results
                      </span>
                      <span className="tabs__more-divider mobile-d-none" />
                      <span className="tabs__more-label tabs__more-label--show">
                        Show More Case Studies
                      </span>
                      <span className="tabs__more-label tabs__more-label--hide">Hide Case Studies</span>
                      <span className="tabs__more-icon tabs__more-icon--plus">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.60156 17.6016C5.18328 17.6016 1.60156 14.0198 1.60156 9.60156C1.60156 5.18328 5.18328 1.60156 9.60156 1.60156C14.0198 1.60156 17.6016 5.18328 17.6016 9.60156C17.6016 14.0198 14.0198 17.6016 9.60156 17.6016ZM8.80156 8.80156H5.60156V10.4016H8.80156V13.6016H10.4016V10.4016H13.6016V8.80156H10.4016V5.60156H8.80156V8.80156Z" fill="white" />
                        </svg>
                      </span>
                      <span className="tabs__more-icon tabs__more-icon--minus">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.60156 17.6016C5.18328 17.6016 1.60156 14.0198 1.60156 9.60156C1.60156 5.18328 5.18328 1.60156 9.60156 1.60156C14.0198 1.60156 17.6016 5.18328 17.6016 9.60156C17.6016 14.0198 14.0198 17.6016 9.60156 17.6016ZM5.60156 8.80156H13.6016V10.4016H5.60156V8.80156Z" fill="white" />
                        </svg>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
