import CodeBlock from "./CodeBlock";
import { notesCoverage, notesHref, notesPageHref } from "../data/lectures";
import { prevNext, unitOf } from "../data/modules";
import { RESOURCE_BY_ID } from "../data/resources";
import type { Callout, ModuleDef } from "../data/types";

const CALLOUT_LABEL: Record<Callout["kind"], string> = {
  note: "Note",
  warning: "Careful",
  scope: "Scope",
  honest: "Honestly",
};

export default function ModulePage({ mod }: { mod: ModuleDef }) {
  const unit = unitOf(mod);
  const { prev, next } = prevNext(mod);

  return (
    <article className="module-page">
      <div className="crumbs">
        <a href="#/syllabus">Syllabus</a> <span>›</span> Unit {unit.number} — {unit.title}
      </div>
      <h1>
        <span className="mod-no">
          Module {mod.number}
          <span className="week-pill">
            {mod.labs.length} sitting{mod.labs.length === 1 ? "" : "s"}
          </span>
        </span>
        {mod.title}
      </h1>
      <p className="mod-subtitle">{mod.subtitle}</p>

      <section id="overview">
        {mod.overview.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section id="topics">
        <h2>Lecture topics</h2>
        {(() => {
          const { written, total } = notesCoverage(mod);
          return written > 0 ? (
            <p className="notes-status">
              <a href={notesPageHref(mod.id)}>Lecture notes</a> · {written} of {total} topics written
            </p>
          ) : (
            <p className="notes-status notes-none">Lecture notes for this module are coming.</p>
          );
        })()}
        <ul className="topics">
          {mod.topics.map((t) => {
            const href = notesHref(mod.id, t.id);
            return (
              <li key={t.id} id={`topic-${t.id}`}>
                {href ? (
                  <a className="topic-link" href={href}>
                    {t.text}
                  </a>
                ) : (
                  <>
                    {t.text} <span className="notes-coming">notes coming</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {mod.excerpts && mod.excerpts.length > 0 && (
        <section id="excerpts">
          <h2>Read the real thing</h2>
          {mod.excerpts.map((ex, i) => (
            <CodeBlock key={i} title={ex.title} file={ex.file} code={ex.code} note={ex.note} />
          ))}
        </section>
      )}

      {mod.resources && mod.resources.length > 0 && (
        <section id="readings">
          <h2>Alongside this module</h2>
          <ul className="readings">
            {mod.resources.map((id) => {
              const r = RESOURCE_BY_ID[id];
              if (!r) return null;
              return (
                <li key={id}>
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.label}
                  </a>
                  <span> — {r.why}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {mod.callouts && mod.callouts.length > 0 && (
        <section id="callouts">
          {mod.callouts.map((c, i) => (
            <div className={`callout callout-${c.kind}`} key={i}>
              <b>{c.title ?? CALLOUT_LABEL[c.kind]}</b>
              <p>{c.body}</p>
            </div>
          ))}
        </section>
      )}

      {mod.labs.map((lab) => (
        <section className="lab" id={`lab-${lab.id}`} key={lab.id}>
          <h2>
            Lab {lab.id} — {lab.title}
            <span className="lab-hours">{lab.hours}</span>
          </h2>
          <ol>
            {lab.tasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
          <p className="lab-deliverable">
            <b>Deliverable:</b> {lab.deliverable}
          </p>
        </section>
      ))}

      {mod.checkpoint && (
        <section className="checkpoint" id="checkpoint">
          <h2>Checkpoint</h2>
          <p>{mod.checkpoint}</p>
        </section>
      )}

      <nav className="pager">
        {prev ? (
          <a href={`#/m/${prev.id}`}>← Module {prev.number}: {prev.title}</a>
        ) : (
          <a href="#/">← Course home</a>
        )}
        {next ? (
          <a href={`#/m/${next.id}`}>Module {next.number}: {next.title} →</a>
        ) : (
          <a href="#/syllabus">Back to syllabus →</a>
        )}
      </nav>
    </article>
  );
}
