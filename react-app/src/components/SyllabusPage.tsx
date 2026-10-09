import { MODULE_COUNT, MODULES, UNIT_COUNT, UNITS } from "../data/modules";
import { notesCoverage } from "../data/lectures";

export default function SyllabusPage() {
  return (
    <article className="syllabus">
      <h1>Syllabus</h1>
      <p className="syll-sub">
        {MODULE_COUNT} modules in {UNIT_COUNT} units. Each module pairs a short read with one or
        two lab sittings of two to four hours, and every sitting adds something to the dataset or
        its documentation. Work in order — each unit consumes what the last one built.
      </p>

      <section className="syll-unit" id="all-sittings">
        <h2>Every lab sitting</h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Lab</th>
              <th>Module</th>
              <th>Sitting</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {MODULES.flatMap((m) =>
              m.labs.map((l) => (
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td>
                    <a href={`#/m/${m.id}`}>
                      {m.number}. {m.title}
                    </a>
                  </td>
                  <td>{l.title}</td>
                  <td>{l.hours}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </section>

      {UNITS.map((u) => (
        <section key={u.number} className="syll-unit" id={`unit-${u.number}`}>
          <h2>
            <span className="unit-no">Unit {u.number}</span> {u.title}
          </h2>
          <p className="unit-theme">{u.theme}</p>
          <ul className="syll-mods">
            {u.modules.map((m) => (
              <li key={m.id}>
                <a href={`#/m/${m.id}`}>
                  <span className="sm-no">{m.number}</span>
                  <span className="sm-body">
                    <span className="sm-title">{m.title}</span>
                    <span className="sm-sub">{m.subtitle}</span>
                  </span>
                  <span className="sm-tags">
                    <span className="tag tag-lab">
                      {m.labs.length} lab{m.labs.length === 1 ? "" : "s"}
                    </span>
                    {(() => {
                      const { written, total } = notesCoverage(m);
                      return written > 0 ? (
                        <span className="tag tag-notes" title="Lecture notes written">
                          Notes {written}/{total}
                        </span>
                      ) : null;
                    })()}
                    {m.checkpoint && <span className="tag tag-cp">Checkpoint</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
