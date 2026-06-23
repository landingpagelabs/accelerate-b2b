import { urlForImage } from '@/lib/sanity';

export default function PartnersSection({ section }: { section: any }) {
  return (
    <section className="section_partners">
      <div className="padding-global">
        <div className="container-default">
          <div className="partners_wrapper">
            <div className="partners_head">
              <p className="text-label-medium">{section.heading}</p>
            </div>
            <div className="partners_list-wrap">
              <div className="partners_list">
                {section.logos?.map((logo: any, i: number) => (
                  <div key={i} className="item_partners">
                    {logo.image && (
                      <img
                        className="item-partners_img"
                        src={urlForImage(logo.image).url()}
                        alt={logo.alt || ''}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
