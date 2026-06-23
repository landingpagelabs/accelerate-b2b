export default function LogoGridSection({ section }: { section: any }) {
  return (
    <section className="section section--alt">
      <div className="container">
        {section.title && <h2 className="section-title">{section.title}</h2>}
        <div className="grid grid--3" style={{ alignItems: 'center' }}>
          {section.logos?.map((logo: any, index: number) => (
            <div className="card" key={index} style={{ padding: '1.5rem', textAlign: 'center', boxShadow: 'none', borderColor: '#e5e7eb' }}>
              {logo.image ? <img src={logo.image.asset?.url} alt={logo.alt || 'Logo'} style={{ maxWidth: '100%', maxHeight: 64, objectFit: 'contain' }} /> : <p>{logo.title}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
