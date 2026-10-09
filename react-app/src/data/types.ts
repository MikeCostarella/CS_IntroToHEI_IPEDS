// The course registry types. The whole site is driven by one typed registry
// (src/data/modules.ts). Navigation, the syllabus, the home-page counts, every
// module page, the lecture notes, and the search index all derive from it.

export interface CodeExcerpt {
  /** Short caption shown above the code. */
  title: string;
  /** Real path the excerpt comes from, in this repository. */
  file: string;
  code: string;
  /** The teaching note: why this excerpt is on the page. */
  note?: string;
}

export interface Reading {
  label: string;
  url: string;
  /** Why this reading matters for this module. */
  why: string;
}

/**
 * One lab sitting, scoped to roughly two to four hours with its own
 * deliverable, so a self-paced learner always has a stopping point.
 */
export interface LabSession {
  /** "1", "5a" — module number plus a letter when a module has several. */
  id: string;
  title: string;
  /** Estimated time, e.g. "~3 h". */
  hours: string;
  tasks: string[];
  deliverable: string;
}

/** An aside rendered as a styled block. "honest" says plainly where something falls short. */
export interface Callout {
  kind: "note" | "warning" | "scope" | "honest";
  title?: string;
  body: string;
}

/** One lecture topic, e.g. { id: "unitid", text: "UNITID: the key that joins every IPEDS file" }. */
export interface TopicDef {
  /** Stable, unique within its module: lowercase words joined by hyphens. */
  id: string;
  text: string;
}

export interface ModuleDef {
  /** Stable id used in the URL hash, e.g. "m01". */
  id: string;
  number: number;
  unit: number;
  title: string;
  subtitle: string;
  /** Overview paragraphs. */
  overview: string[];
  /** Lecture topics. The id is permanent: lecture notes and links point at it,
   *  so reword the text freely but never change the id. */
  topics: TopicDef[];
  /** Code from this repository's examples/, read before it is imitated. */
  excerpts?: CodeExcerpt[];
  /** Ids from data/resources.ts. */
  resources?: string[];
  /** Every module has at least one lab sitting. */
  labs: LabSession[];
  callouts?: Callout[];
  /** Set when this module ends with a checkpoint. */
  checkpoint?: string;
}

export interface UnitDef {
  number: number;
  title: string;
  theme: string;
  modules: ModuleDef[];
}

// ---------------------------------------------------------------- lecture notes
// One file per module under src/data/lectures/, one section per lecture topic,
// joined to the topic by its id. Rendered at #/m/<id>/notes.
//
// Text in paragraphs, list items, callouts, and table cells may use {{term-id}}
// glossary terms, `code`, **bold**, *italic*, and [[resource-id]] links
// (see components/NoteText.tsx).

export type NoteBlock =
  /** A paragraph. */
  | string
  /** A bulleted (or numbered) list. */
  | { list: string[]; ordered?: boolean }
  /** A code panel with a Copy button. */
  | { code: string; title?: string; note?: string }
  /** A small table; the first column is usually the thing being compared. */
  | { table: { head: string[]; rows: string[][]; caption?: string } }
  /** A boxed aside: a tip, a warning, or a "why this matters". */
  | { callout: string; title?: string; tone?: "tip" | "warning" | "aside" };

export interface LectureSection {
  /** The topic this section teaches: ModuleDef.topics[].id. */
  topic: string;
  blocks: NoteBlock[];
  /** The one sentence to carry out of the room. */
  takeaway?: string;
  /** Check-yourself questions; the answer is revealed on click. */
  check?: { q: string; a: string }[];
  /** Resource ids (data/resources.ts) most relevant to this topic. */
  readings?: string[];
}

export interface LectureNotesDef {
  /** Module id these notes belong to, e.g. "m02". */
  moduleId: string;
  /** Optional opening paragraph for the notes page. */
  intro?: string;
  sections: LectureSection[];
}
