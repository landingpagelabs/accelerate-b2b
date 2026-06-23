export default function CtaSection({ section }: { section: any }) {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        {section.title && <h2 className="section-title">{section.title}</h2>}
        {section.subtitle && <p className="section-copy">{section.subtitle}</p>}
        {section.buttonText && (
          <a className="button button-primary" href={section.buttonUrl || '#'}>
            {section.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
