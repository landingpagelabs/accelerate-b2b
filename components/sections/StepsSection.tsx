const ACCENTS = ['orange', 'blue', 'green'] as const;

export default function StepsSection({ section }: { section: any }) {
  const steps: any[] = section.steps || [];

  return (
    <section className="section_steps">
      <div className="padding-global">
        <div className="steps__container">
          <h2 className="title-h2 steps__title">{section.heading}</h2>
          <ol className="steps__list">
            {steps.map((step: any, i: number) => {
              const accent = step.accent || ACCENTS[i % ACCENTS.length];
              const number = String(i + 1).padStart(2, '0');
              return (
                <li key={i} className="steps__item">
                  <div className="steps__head">
                    <span className={`steps__num steps__num--${accent}`}>{number}</span>
                    <h3 className="steps__item-title">{step.title}</h3>
                  </div>
                  {step.description && (
                    <p className="steps__description">{step.description}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
