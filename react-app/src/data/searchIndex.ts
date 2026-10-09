// The search index: every piece of the course flattened into documents the
// engine (lib/search.ts) can rank. Derived entirely from the registry, so a
// new module, lab sitting or excerpt is searchable with no extra step.

import { COURSE } from "./course";
import { MODULES, UNITS } from "./modules";
import { RESOURCES } from "./resources";
import { NOTES_BY_MODULE, noteBlockText } from "./lectures";
import { GLOSSARY } from "./glossary";

export type SearchKind =
  | "module"
  | "lab"
  | "excerpt"
  | "checkpoint"
  | "unit"
  | "callout"
  | "resource"
  | "page"
  | "notes"
  | "term";

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  /** Heading shown for the result. */
  title: string;
  /** One line under the title. */
  subtitle?: string;
  /** Small label above the title, e.g. "Module 10 · Unit 3". */
  kicker?: string;
  /** High-signal terms. */
  keywords?: string[];
  /** Prose the snippet is drawn from. */
  body: string;
  /** Where the result goes. Internal hrefs are site routes. */
  href: string;
  /** True when the result leaves the site. */
  external?: boolean;
}

/** Human label for each kind, used for the result badge and page grouping. */
export const KIND_LABEL: Record<SearchKind, string> = {
  module: "Module",
  lab: "Lab",
  excerpt: "Code",
  checkpoint: "Checkpoint",
  unit: "Unit",
  callout: "Note",
  resource: "Resource",
  page: "Page",
  notes: "Lecture notes",
  term: "Glossary",
};

/** Order the full results page groups results in. */
export const KIND_ORDER: SearchKind[] = [
  "module",
  "notes",
  "lab",
  "excerpt",
  "checkpoint",
  "unit",
  "callout",
  "page",
  "resource",
  "term",
];

function build(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const m of MODULES) {
    const unit = UNITS.find((u) => u.number === m.unit);
    const kicker = `Module ${m.number} · Unit ${m.unit}${unit ? " · " + unit.title : ""}`;

    docs.push({
      id: `mod-${m.id}`,
      kind: "module",
      title: m.title,
      subtitle: m.subtitle,
      kicker,
      keywords: m.topics.map((t) => t.text),
      body: [...m.overview, ...m.topics.map((t) => t.text)].join(" "),
      href: `#/m/${m.id}`,
    });

    // One document per written lecture-notes section, so a search lands on the topic.
    for (const sec of NOTES_BY_MODULE[m.id]?.sections ?? []) {
      const topic = m.topics.find((t) => t.id === sec.topic);
      if (!topic) continue;
      docs.push({
        id: `notes-${m.id}-${sec.topic}`,
        kind: "notes",
        title: topic.text,
        subtitle: `Lecture notes · Module ${m.number} — ${m.title}`,
        kicker: `Lecture notes · module ${m.number}`,
        body: [...sec.blocks.map(noteBlockText), sec.takeaway ?? ""].filter(Boolean).join(" "),
        href: `#/m/${m.id}/notes?s=topic-${sec.topic}`,
      });
    }

    // Each lab sitting stands alone: it has its own hours and deliverable.
    m.labs.forEach((lab) => {
      docs.push({
        id: `lab-${lab.id}`,
        kind: "lab",
        title: `Lab ${lab.id} — ${lab.title}`,
        subtitle: `Module ${m.number} — ${m.title}`,
        kicker: `Lab sitting · ${lab.hours}`,
        keywords: lab.tasks,
        body: [...lab.tasks, `Deliverable: ${lab.deliverable}`].join(" "),
        href: `#/m/${m.id}?s=lab-${lab.id}`,
      });
    });

    // Excerpts index their code as well as the note, so a half-remembered
    // line finds the module it belongs to.
    (m.excerpts ?? []).forEach((ex, i) => {
      docs.push({
        id: `code-${m.id}-${i}`,
        kind: "excerpt",
        title: ex.title,
        subtitle: ex.file,
        kicker: `Build script · module ${m.number}`,
        body: [ex.note ?? "", ex.code].filter(Boolean).join(" "),
        href: `#/m/${m.id}?s=excerpts`,
      });
    });

    (m.callouts ?? []).forEach((c, i) => {
      docs.push({
        id: `note-${m.id}-${i}`,
        kind: "callout",
        title: c.title ?? "Note",
        subtitle: `Module ${m.number} — ${m.title}`,
        kicker: c.kind === "honest" ? "Said plainly" : "Aside",
        body: c.body,
        href: `#/m/${m.id}?s=callouts`,
      });
    });

    if (m.checkpoint) {
      docs.push({
        id: `cp-${m.id}`,
        kind: "checkpoint",
        title: `Checkpoint — Module ${m.number}`,
        subtitle: m.title,
        kicker: "Checkpoint",
        body: m.checkpoint,
        href: `#/m/${m.id}?s=checkpoint`,
      });
    }
  }

  for (const t of GLOSSARY) {
    docs.push({
      id: `term-${t.id}`,
      kind: "term",
      title: t.term,
      subtitle: t.aka?.join(", "),
      kicker: "Glossary",
      keywords: [t.term, ...(t.aka ?? [])],
      body: t.def.replace(/`/g, "").replace(/\*\*/g, ""),
      href: `#/glossary?s=term-${t.id}`,
    });
  }

  for (const u of UNITS) {
    docs.push({
      id: `unit-${u.number}`,
      kind: "unit",
      title: `Unit ${u.number} · ${u.title}`,
      subtitle: `${u.modules.length} module${u.modules.length === 1 ? "" : "s"}`,
      kicker: "Unit",
      keywords: u.modules.map((m) => m.title),
      body: [u.theme, ...u.modules.map((m) => m.title)].join(" "),
      href: `#/syllabus?s=unit-${u.number}`,
    });
  }

  for (const r of RESOURCES) {
    const citedBy = MODULES.filter((m) => m.resources?.includes(r.id));
    docs.push({
      id: `res-${r.id}`,
      kind: "resource",
      title: r.label,
      subtitle: r.why,
      kicker: r.category,
      keywords: citedBy.map((m) => m.title),
      body: [r.why, ...citedBy.map((m) => m.title)].join(" "),
      href: r.url,
      external: true,
    });
  }

  docs.push(
    {
      id: "course-thesis",
      kind: "page",
      title: "Course thesis",
      subtitle: COURSE.tagline,
      kicker: "Home",
      body: [COURSE.thesis, ...COURSE.premise].join(" "),
      href: "#/?s=thesis",
    },
    {
      id: "course-outcomes",
      kind: "page",
      title: "What you will be able to do",
      subtitle: "Course outcomes",
      kicker: "Home",
      keywords: COURSE.outcomes as unknown as string[],
      body: COURSE.outcomes.join(" "),
      href: "#/?s=outcomes",
    },
    {
      id: "course-format",
      kind: "page",
      title: "Format",
      subtitle: "How the modules and lab sittings fit together",
      kicker: "Home",
      body: COURSE.format,
      href: "#/?s=format",
    },
    {
      id: "course-assessment",
      kind: "page",
      title: "How the work is judged",
      subtitle: "Deliverables, checkpoints, and the capstone",
      kicker: "Home",
      keywords: COURSE.assessment as unknown as string[],
      body: COURSE.assessment.join(" "),
      href: "#/?s=assessment",
    },
    {
      id: "course-scope",
      kind: "page",
      title: "Out of scope",
      subtitle: "What this course deliberately leaves out, and why",
      kicker: "Home",
      body: COURSE.outOfScope,
      href: "#/?s=out-of-scope",
    },
    {
      id: "course-prereqs",
      kind: "page",
      title: "Who this is for",
      subtitle: COURSE.audience,
      kicker: "Home",
      body: `${COURSE.audience} ${COURSE.prerequisites} ${COURSE.integrity}`,
      href: "#/?s=top",
    },
    {
      id: "syllabus-all",
      kind: "page",
      title: "Syllabus",
      subtitle: `All ${MODULES.length} modules in ${UNITS.length} units`,
      kicker: "Syllabus",
      keywords: MODULES.map((m) => m.title),
      body: MODULES.map((m) => `${m.number}. ${m.title}. ${m.subtitle}`).join(" "),
      href: "#/syllabus",
    },
  );

  return docs;
}

export const SEARCH_DOCS: SearchDoc[] = build();
