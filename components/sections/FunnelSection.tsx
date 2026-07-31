import { urlForImage } from '@/lib/image';

const DEFAULT_AVATAR = '/images/sections/funnel/avatar.png';

const VerifiedBadge = (
  <svg className="funnel__verified" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5.75668 16.6641L4.31751 14.1248L1.59066 13.49L1.85577 10.5539L0 8.33203L1.85577 6.11016L1.59066 3.17411L4.31751 2.53929L5.75668 0L8.33203 1.15061L10.9074 0L12.3466 2.53929L15.0734 3.17411L14.8083 6.11016L16.6641 8.33203L14.8083 10.5539L15.0734 13.49L12.3466 14.1248L10.9074 16.6641L8.33203 15.5134L5.75668 16.6641ZM7.5367 11.1491L11.8163 6.66563L10.7559 5.51501L7.5367 8.8875L5.90817 7.22109L4.84773 8.33203L7.5367 11.1491Z" fill="#3897F0" />
  </svg>
);

export default function FunnelSection({ section }: { section: any }) {
  const stages: any[] = section.stages || [];
  const t = section.testimonial;
  const avatarUrl =
    t?.avatar ? urlForImage(t.avatar).width(132).height(132).auto('format').url() : DEFAULT_AVATAR;

  return (
    <section className="section_funnel">
      <div className="padding-global">
        <div className="funnel__container">
          <h2 className="title-h2 funnel__title">{section.heading}</h2>

          <div className="funnel__board">
            <div className="funnel__inner">
              <div className="funnel__stages">
                {stages.map((s: any, i: number) => (
                  <div key={i} className="funnel__stage">
                    <div className="funnel__stage-text">
                      <div className="funnel__stage-label">{s.label}</div>
                      <p className="funnel__stage-desc">{s.text}</p>
                    </div>
                    <span className="funnel__connector" aria-hidden="true" />
                  </div>
                ))}
              </div>

              <div className="funnel__graphic">
                <img loading="lazy" decoding="async"
                  className="funnel__graphic-img"
                  src="/images/sections/funnel/funnel-graphic.svg"
                  alt="Lead flow funnel: 120,000 leads to 400 MQLs to 120 SQLs to 10-20 closed deals"
                />
                {(section.footnote || section.footnoteEmphasis) && (
                  <p className="funnel__footnote">
                    {section.footnote && (
                      <span className="funnel__footnote-muted">{section.footnote} </span>
                    )}
                    {section.footnoteEmphasis && (
                      <span className="funnel__footnote-strong">{section.footnoteEmphasis}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {t && (t.quote || t.authorName) && (
            <div className="funnel__testimonial">
              <div className="funnel__testimonial-card">
                <div className="funnel__testimonial-inner">
                  <img loading="lazy" decoding="async" className="funnel__avatar funnel__avatar--lead" src={avatarUrl} alt={t.authorName || 'avatar'} />
                  <div className="funnel__testimonial-body">
                    {t.quote && <p className="funnel__quote">{t.quote}</p>}
                    <div className="funnel__author">
                      <img loading="lazy" decoding="async" className="funnel__avatar funnel__avatar--inline" src={avatarUrl} alt="" aria-hidden="true" />
                      {t.authorName && <span className="funnel__author-name">{t.authorName}</span>}
                      {t.authorRole && <span className="funnel__author-role">{t.authorRole}</span>}
                      {VerifiedBadge}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
