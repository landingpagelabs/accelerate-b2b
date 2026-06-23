export default function FeatureSection({ section }: { section: any }) {
  return (
    <section className="section">
      <div className="container">
        <div>
          {section.title && <h2 className="section-title">{section.title}</h2>}
          {section.subtitle && <p className="section-copy">{section.subtitle}</p>}
        </div>
        <div className="grid grid--3">
          {section.features?.map((feature: any, index: number) => (
            <article className="card" key={index}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
