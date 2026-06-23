export default function TestimonialSection({ section }: { section: any }) {
  return (
    <section className="section">
      <div className="container">
        {section.title && <h2 className="section-title">{section.title}</h2>}
        {section.subtitle && <p className="section-copy">{section.subtitle}</p>}
        <div className="grid grid--2">
          {section.testimonials?.map((testimonial: any, index: number) => (
            <article className="card" key={index}>
              <p>{testimonial.quote}</p>
              <strong>{testimonial.authorName}</strong>
              <span>{testimonial.authorRole}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
