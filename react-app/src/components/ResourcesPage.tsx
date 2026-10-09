import { RESOURCE_CATEGORIES, RESOURCES } from "../data/resources";

export default function ResourcesPage() {
  return (
    <article className="page">
      <h1>Resources</h1>
      <p className="lede">
        The case study, the documentation the modules lean on, and a little background worth
        reading once. Everything here is free.
      </p>
      {RESOURCE_CATEGORIES.map((c) => (
        <section className="res-group" key={c} id={c.toLowerCase().replace(/[^a-z]+/g, "-")}>
          <h2>{c}</h2>
          <ul className="readings">
            {RESOURCES.filter((r) => r.category === c).map((r) => (
              <li key={r.id}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.label}
                </a>
                <span> — {r.why}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
