import { img, urlForImage } from '@/lib/image';

export default function TextImageSection({ section }: { section: any }) {
  return (
    <section className="section_text-image">
      <div className="padding-global">
        <div className="text-image__container">
          <div className="text-image__text">
            <div className="text-image__title">
              <h2 className="title-h2">{section.heading}</h2>
            </div>
            {section.description && (
              <p className="text-image__description">{section.description}</p>
            )}
          </div>
          {section.image && (
            <div className="text-image__media">
              <img loading="lazy" decoding="async"
                className="text-image__image"
                src={img(section.image, 1800)}
                alt={section.heading || 'section image'}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
