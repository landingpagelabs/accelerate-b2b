export default function StatsSection({ section }: { section: any }) {
  return (
    <section className="section section--alt">
      <div className="container">
        {section.title && <h2 className="section-title">{section.title}</h2>}
        <div className="stats-grid">
          {section.stats?.map((stat: any, index: number) => (
            <div className="stat-card" key={index}>
              <p style={{ fontSize: '2.5rem', margin: 0 }}>{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
