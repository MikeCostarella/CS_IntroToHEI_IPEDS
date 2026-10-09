import { COURSE } from "../data/course";
import {
  EXCERPT_COUNT,
  LAB_COUNT,
  LAB_HOURS,
  MODULE_COUNT,
  UNIT_COUNT,
  UNITS,
} from "../data/modules";

export default function HomePage() {
  return (
    <article className="home" id="top">
      <p className="kicker">{COURSE.audience}</p>
      <h1>{COURSE.heading}</h1>
      <p className="tagline">{COURSE.tagline}</p>
      <p className="schedule">
        {MODULE_COUNT} modules · {LAB_COUNT} lab sittings · about{" "}
        {Math.round(LAB_HOURS)} hours of lab work
      </p>
      <p className="contact">
        <b>Assumed:</b> {COURSE.prerequisites}
      </p>
      <p className="contact">
        <b>Status:</b> {COURSE.status}
      </p>

      {/* Every number here is derived from the registry. */}
      <div className="stat-row">
        <span><b>{UNIT_COUNT}</b> units</span>
        <span><b>{MODULE_COUNT}</b> modules</span>
        <span><b>{LAB_COUNT}</b> lab sittings</span>
        <span><b>~{Math.round(LAB_HOURS)}</b> hours of lab</span>
        <span><b>{EXCERPT_COUNT}</b> excerpts from the build scripts</span>
      </div>

      <section id="thesis">
        <h2>Course thesis</h2>
        <p>{COURSE.thesis}</p>
        {COURSE.premise.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="agent-loop" aria-label="The arc of the course">
          <span className="step">Read the sources</span><span className="arrow">→</span>
          <span className="step">Build the database</span><span className="arrow">→</span>
          <span className="step">Test it</span><span className="arrow">→</span>
          <span className="step">Reconcile and govern</span><span className="arrow">→</span>
          <span className="step">Release the kit</span>
        </div>
      </section>

      <section id="outcomes">
        <h2>What you will be able to do</h2>
        <ol className="outcomes">
          {COURSE.outcomes.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ol>
      </section>

      <section id="format">
        <h2>Format</h2>
        <p>{COURSE.format}</p>
      </section>

      <section id="units">
        <h2>The {UNIT_COUNT} units</h2>
        <div className="unit-cards">
          {UNITS.map((u) => (
            <a className="unit-card" key={u.number} href={`#/m/${u.modules[0].id}`}>
              <div className="uc-no">Unit {u.number}</div>
              <div className="uc-title">{u.title}</div>
              <div className="uc-theme">{u.theme}</div>
              <div className="uc-mods">
                Modules {u.modules[0].number}
                {u.modules.length > 1 && `–${u.modules[u.modules.length - 1].number}`} ·{" "}
                {u.modules.reduce((n, m) => n + m.labs.length, 0)} lab sittings
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="course-path">
        <h2>Who uses the dataset</h2>
        <p>
          This course builds the dataset; the AI courses build on it. Each one links to the released
          kit, so their students can start from it without taking this course first.
        </p>
        <div className="unit-cards">
          {COURSE.usedBy.map((c) => (
            <a className="unit-card" key={c.url} href={c.url} target="_blank" rel="noreferrer">
              <div className="uc-no">Uses the kit</div>
              <div className="uc-title">{c.title} ↗</div>
              <div className="uc-theme">{c.use}</div>
            </a>
          ))}
        </div>
      </section>

      <section id="assessment">
        <h2>How the work is judged</h2>
        <ul className="topics">
          {COURSE.assessment.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section id="out-of-scope">
        <h2>Out of scope</h2>
        <p>{COURSE.outOfScope}</p>
      </section>

      <section id="integrity">
        <h2>On AI assistance</h2>
        <p>{COURSE.integrity}</p>
      </section>
    </article>
  );
}
