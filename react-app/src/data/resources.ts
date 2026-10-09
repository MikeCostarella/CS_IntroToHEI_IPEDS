import type { Reading } from "./types";

// The keep-this-bookmarked list. Module pages cite entries by id; the
// Resources page renders every entry by category. Everything here is free.

export interface ResourceDef extends Reading {
  /** Stable id referenced from ModuleDef.resources. */
  id: string;
  category: "Course path" | "IPEDS" | "HEI and Ohio" | "Tools" | "Background reading";
}

export const RESOURCE_CATEGORIES = [
  "Course path",
  "IPEDS",
  "HEI and Ohio",
  "Tools",
  "Background reading",
] as const;

export const RESOURCES: ResourceDef[] = [
  // ---- Course path ----
  {
    id: "python-course",
    category: "Course path",
    label: "Python Programming",
    url: "https://mikecostarella.github.io/CS_PythonProgrammingCourse/",
    why: "Assumed from Module 4 on. Start there if functions, loops and dictionaries are not comfortable yet.",
  },
  {
    id: "aiml-course",
    category: "Course path",
    label: "Introduction to AI/ML",
    url: "https://mikecostarella.github.io/CS_IntroductionToAIML/",
    why: "The first course to use the kit: classical models, evaluation, and the datasheet and bias labs.",
  },
  {
    id: "llm-course",
    category: "Course path",
    label: "LLM Foundations",
    url: "https://mikecostarella.github.io/CS_LLMFoundations/",
    why: "Uses the IPEDS documentation for retrieval and the curated layer for evaluation sets with checkable answers.",
  },
  {
    id: "agentic-course",
    category: "Course path",
    label: "Agentic AI Foundations",
    url: "https://mikecostarella.github.io/CS_AgenticAIFoundations/",
    why: "Text-to-SQL agents, a read-only MCP server, and the reconciliation project all run on this dataset.",
  },
  {
    id: "examples",
    category: "Course path",
    label: "This course's runnable examples",
    url: "https://github.com/MikeCostarella/CS_IntroToHEI_IPEDS/tree/main/examples",
    why: "The five scripts that build the dataset. Standard-library Python only.",
  },

  // ---- IPEDS ----
  {
    id: "ipeds-home",
    category: "IPEDS",
    label: "IPEDS home (NCES)",
    url: "https://nces.ed.gov/ipeds/",
    why: "The front door: what IPEDS is, the survey components, and the latest releases.",
  },
  {
    id: "ipeds-use",
    category: "IPEDS",
    label: "IPEDS — Use the Data",
    url: "https://nces.ed.gov/ipeds/use-the-data",
    why: "The Data Center, complete data files, Access databases, and the published tables used for known-total checks.",
  },
  {
    id: "complete-files",
    category: "IPEDS",
    label: "IPEDS help — complete data files",
    url: "https://nces.ed.gov/IPEDS/help/complete-data-files",
    why: "How the files and dictionaries are organised, and what preliminary, provisional and final releases mean.",
  },
  {
    id: "release-schedule",
    category: "IPEDS",
    label: "IPEDS data release schedule",
    url: "https://nces.ed.gov/ipeds/survey-components/data-release-schedule",
    why: "When each collection is released as provisional and as final data. Module 12's update schedule follows it.",
  },
  {
    id: "timing-blog",
    category: "IPEDS",
    label: "Timing is everything: the IPEDS collection and release cycle",
    url: "https://ies.ed.gov/learn/blog/timing-everything-understanding-ipeds-data-collection-and-release-cycle",
    why: "The clearest explanation of collection year versus data year. Read before Lab 2.",
  },
  {
    id: "cip",
    category: "IPEDS",
    label: "Classification of Instructional Programs (CIP)",
    url: "https://nces.ed.gov/ipeds/cipcode/default.aspx?y=56",
    why: "How programs are coded. Family 11 is computer and information sciences.",
  },
  {
    id: "college-navigator",
    category: "IPEDS",
    label: "College Navigator",
    url: "https://nces.ed.gov/collegenavigator/",
    why: "IPEDS data for one institution, readable without a download. Lab 1 starts here.",
  },

  // ---- HEI and Ohio ----
  {
    id: "odhe",
    category: "HEI and Ohio",
    label: "Ohio Department of Higher Education",
    url: "https://highered.ohio.gov/",
    why: "Publisher of the HEI reports. Start from its data and reports section.",
  },
  {
    id: "hei-catalog",
    category: "HEI and Ohio",
    label: "Ohio Higher Education Information (HEI) — J-PAL data catalog entry",
    url: "https://www.povertyactionlab.org/admindatacatalog/ohio-higher-education-information-hei",
    why: "What the student-level HEI files contain, and the agreement and IRB approval required to access them.",
  },
  {
    id: "lakeland-ir",
    category: "HEI and Ohio",
    label: "An institutional research office's view of HEI and IPEDS",
    url: "https://lakelandcc.edu/web/about/institutional-research-departments",
    why: "A short, plain description of both systems from an Ohio college that reports to them.",
  },

  // ---- Tools ----
  {
    id: "sqlite",
    category: "Tools",
    label: "SQLite documentation",
    url: "https://www.sqlite.org/docs.html",
    why: "The database the kit ships as. One file, no server.",
  },
  {
    id: "python-sqlite3",
    category: "Tools",
    label: "Python sqlite3 module",
    url: "https://docs.python.org/3/library/sqlite3.html",
    why: "Everything the build script needs, in the standard library.",
  },
  {
    id: "github-releases",
    category: "Tools",
    label: "GitHub — about releases",
    url: "https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases",
    why: "Where each version of the kit is published, with its files attached.",
  },
  {
    id: "semver",
    category: "Tools",
    label: "Semantic Versioning",
    url: "https://semver.org/",
    why: "The numbering rule for kit releases, adapted for data in Module 10.",
  },

  // ---- Background reading ----
  {
    id: "tidy-data",
    category: "Background reading",
    label: "Tidy Data (Wickham, 2014)",
    url: "https://www.jstatsoft.org/article/view/v059i10",
    why: "The argument for one grain per table, which the curated layer follows.",
  },
  {
    id: "datasheets",
    category: "Background reading",
    label: "Datasheets for Datasets (Gebru et al., 2018)",
    url: "https://arxiv.org/abs/1803.09010",
    why: "The template for Module 9's datasheet.",
  },
  {
    id: "ferpa",
    category: "Background reading",
    label: "FERPA — Student Privacy Policy Office",
    url: "https://studentprivacy.ed.gov/ferpa",
    why: "The federal law behind the course's aggregate-only rule.",
  },
];

export const RESOURCE_BY_ID: Record<string, ResourceDef> = Object.fromEntries(
  RESOURCES.map((r) => [r.id, r]),
);

/** [[resource-id]] inside prose (see components/RichText.tsx). */
export const REF_PATTERN = /\[\[([a-z0-9-]+)\]\]/g;
