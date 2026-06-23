import { urlForImage } from '@/lib/sanity';

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
              <img
                className="text-image__image"
                src={urlForImage(section.image).url()}
                alt={section.heading || 'section image'}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
