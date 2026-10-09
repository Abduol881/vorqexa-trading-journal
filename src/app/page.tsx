const pillars = [
  {
    number: "01",
    title: "Record",
    description: "Build a clear history of trades, entries, exits, fees, and decisions.",
  },
  {
    number: "02",
    title: "Review",
    description: "Capture the plan, the reasoning, the mistakes, and the lesson from each session.",
  },
  {
    number: "03",
    title: "Improve",
    description: "Turn reliable trade records into meaningful performance and risk insights.",
  },
];

export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Vorqexa Journal home">
          <span className="brand-mark">V</span>
          <span>vorqexa <span style={{ color: "var(--muted)", fontWeight: 400 }}>journal</span></span>
        </a>
        <span className="status">Product foundation · v0.1.0</span>
      </header>

      <section className="hero">
        <div className="eyebrow">A clearer view of your trading</div>
        <h1>Trade with intention.<br />Review with clarity.</h1>
        <p>
          A dedicated workspace for recording trades, understanding risk, and
          learning from every decision. Built independently so the journal can
          evolve on its own.
        </p>
        <div className="notice">
          <strong style={{ color: "var(--text)" }}>Foundation scaffold</strong>
          <br />
          This clean starting point is not a finished journal yet. Authentication,
          saved trades, calculations, and integrations will be added in tested stages.
        </div>
      </section>

      <section aria-label="Product pillars" className="grid">
        {pillars.map((pillar) => (
          <article className="card" key={pillar.number}>
            <div className="card-number">{pillar.number}</div>
            <h2>{pillar.title}</h2>
            <p>{pillar.description}</p>
          </article>
        ))}
      </section>

      <footer>
        Vorqexa Journal · Independent product · Never share wallet seed phrases or private keys.
      </footer>
    </main>
  );
}
