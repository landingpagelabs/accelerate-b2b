import { urlForImage } from '@/lib/sanity';

const DividerSvg = () => (
  <svg width="654" height="1" viewBox="0 0 654 1" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
    <line y1="0.5" x2="653.367" y2="0.5" stroke="black" strokeOpacity="0.2" strokeDasharray="4 4" />
  </svg>
);

const VerifiedBadge = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.25857" cy="8.25735" r="5.25466" fill="white" />
    <path d="M5.70506 16.5146L4.2788 13.9981L1.5764 13.369L1.83913 10.4593L0 8.25732L1.83913 6.05537L1.5764 3.14565L4.2788 2.51652L5.70506 0L8.25732 1.1403L10.8096 0L12.2359 2.51652L14.9383 3.14565L14.6755 6.05537L16.5146 8.25732L14.6755 10.4593L14.9383 13.369L12.2359 13.9981L10.8096 16.5146L8.25732 15.3744L5.70506 16.5146ZM7.46913 11.0491L11.7104 6.60586L10.6595 5.46556L7.46913 8.80781L5.85519 7.15635L4.80426 8.25732L7.46913 11.0491Z" fill="#3897F0" />
  </svg>
);

export default function InfoSection({ section }: { section: any }) {
  const paragraphs: string[] = (section.body || '').split(/\n{2,}/).filter(Boolean);

  return (
    <section className="info">
      <div className="padding-global">
        <div className="container-default">
          <div className="info_wrapper">
            <div className="info_block">
              <div className="info_block-decor">
                <img src="/images/info/info-decor.svg" alt="Spencer Hirst signature" />
              </div>

              {section.heading && <h2 className="info_block-title title-h3">{section.heading}</h2>}

              <div className="info_block-content">
                {paragraphs.length > 0 && (
                  <p className="info_block-text text-body-large">
                    {paragraphs.map((p, i) => (
                      <span key={i}>
                        {i > 0 && (
                          <>
                            <br />
                            <br />
                          </>
                        )}
                        {p}
                      </span>
                    ))}
                  </p>
                )}

                <div className="info_block-divider">
                  <DividerSvg />
                </div>

                <div className="info_block-content-bot">
                  <div className="info_block-content-bot-flex">
                    <div className="info_block-content-bot-name">
                      {section.authorName && <p className="text-body-large">{section.authorName}</p>}
                      <VerifiedBadge />
                    </div>
                    {section.authorRole && <p className="text-body-large">{section.authorRole}</p>}
                  </div>
                  {section.signatureImage && (
                    <div className="info_block-content-bot-image">
                      <img src={urlForImage(section.signatureImage).url()} alt="" />
                    </div>
                  )}
                </div>

                {section.contentImage && (
                  <div className="info_block-content-image">
                    <img src={urlForImage(section.contentImage).url()} alt="" />
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
