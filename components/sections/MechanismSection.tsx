import { urlForImage } from '@/lib/sanity';

export default function MechanismSection({ section }: { section: any }) {
  return (
    <section className="section_mechanism">
      <div className="padding-global">
        <div className="container-default">
          <div className="mechanism_wrapper">
            <div className="mechanism_head">
              <div className="mechanism_title-wrap">
                <h2 className="title-h2">{section.heading}</h2>
              </div>
              {section.text && (
                <p className="text-body-regular">{section.text}</p>
              )}
            </div>
            {section.image && (
              <div className="mechanism_content">
                <img
                  className="mechanism-content_img"
                  src={urlForImage(section.image).url()}
                  alt={section.heading || 'mechanism'}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
