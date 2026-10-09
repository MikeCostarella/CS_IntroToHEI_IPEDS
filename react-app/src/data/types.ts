// The course registry types. The whole site is driven by one typed registry
// (src/data/modules.ts) — the same pattern the course itself teaches, and the
// same one counties.ts uses to drive OhioCounties. Navigation, the syllabus,
// the home-page counts, every module page, and the search index all derive
// from this single source of truth.

export interface CodeExcerpt {
  /** Short caption shown above the code. */
  title: string;
  /** Real path the excerpt comes from, in the case-study repository. */
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
 * One lab sitting, scoped to roughly three to four hours with its own
 * deliverable, so a self-paced learner always has a stopping point.
 */
export interface LabSession {
  /** "1", "3a", "15c" — module number plus a letter when a module has several. */
  id: string;
  title: string;
  /** Estimated time, e.g. "~3 h". */
  hours: string;
  tasks: string[];
  deliverable: string;
}

/**
 * An aside rendered as a styled block. "honest" is the fleet's own habit:
 * saying plainly where the real system falls short of what it teaches.
 */
export interface Callout {
  kind: "note" | "warning" | "scope" | "honest";
  title?: string;
  body: string;
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
  /** The ideas the module covers. */
  topics: string[];
  /** Real code from the case study, read before it is imitated. */
  excerpts?: CodeExcerpt[];
  /** Ids from data/resources.ts. */
  resources?: string[];
  /** Every module has at least one lab sitting. */
  labs: LabSession[];
  callouts?: Callout[];
  /** Set when this module ends with a checkpoint on the running project. */
  checkpoint?: string;
}

export interface UnitDef {
  number: number;
  title: string;
  theme: string;
  modules: ModuleDef[];
}
