import { urlForImage } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export default function ContentSection({ section }: { section: any }) {
  const imageUrl = section.image ? urlForImage(section.image).width(1200).url() : undefined;
  const sideImage = section.imagePosition === 'left';

  return (
    <section className="section section--alt">
      <div className="container" style={{ display: 'grid', gap: '2rem' }}>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {section.title && <h2 className="section-title">{section.title}</h2>}
          {section.description && <p className="section-copy">{section.description}</p>}
          {section.body && <PortableText value={section.body} />}
        </div>
        {imageUrl && (
          <div className="section-image">
            <img src={imageUrl} alt={section.image.alt || 'Section image'} />
          </div>
        )}
      </div>
    </section>
  );
}
