// The course glossary: one plain-English definition per term.
//
// Lecture notes mark a term with {{term-id}} (shows the term's name) or
// {{term-id|the words to show}}. The marked words get a dotted underline; hover,
// focus, or tap shows the definition, with links to the Glossary page and to
// the term's reading. Mark the first use of a term in each notes section, not
// every use.
//
// Definitions may use `code` and **bold**. Keep them to two or three sentences.

export interface GlossaryTerm {
  /** Stable id used in {{id}} markup and in #/glossary?s=term-<id>. */
  id: string;
  /** The term as it is listed and shown by default. */
  term: string;
  /** Other names people use for the same thing. */
  aka?: string[];
  def: string;
  /** A resource id (data/resources.ts) for "Learn more". */
  more?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  // ---- the sources
  {
    id: "ipeds",
    term: "IPEDS",
    aka: ["Integrated Postsecondary Education Data System"],
    def: "The federal system of annual surveys that every college taking part in federal student aid programs must answer. Run by NCES. The data are aggregate counts per institution and are public.",
    more: "ipeds-home",
  },
  {
    id: "nces",
    term: "NCES",
    aka: ["National Center for Education Statistics"],
    def: "The federal statistics agency within the U.S. Department of Education that runs IPEDS and publishes its data, dictionaries and release schedule.",
    more: "ipeds-home",
  },
  {
    id: "hei",
    term: "HEI",
    aka: ["Higher Education Information system"],
    def: "The Ohio Department of Higher Education's relational database of submissions from Ohio's public colleges and universities. The state publishes reports from it; the underlying student-level files are restricted.",
    more: "hei-catalog",
  },
  {
    id: "odhe",
    term: "ODHE",
    aka: ["Ohio Department of Higher Education"],
    def: "The state agency that runs HEI and publishes its reports.",
    more: "odhe",
  },
  {
    id: "olda",
    term: "OLDA",
    aka: ["Ohio Longitudinal Data Archive"],
    def: "The archive at Ohio State's Center for Human Resources Research through which approved researchers can request student-level HEI data. Access requires a data-sharing agreement and IRB approval.",
    more: "hei-catalog",
  },
  {
    id: "survey-component",
    term: "Survey component",
    def: "One of the separate IPEDS surveys, such as Institutional Characteristics, Completions, Fall Enrollment or Graduation Rates. Each is collected in a fixed season (fall, winter or spring) and published as its own files.",
    more: "ipeds-home",
  },
  {
    id: "unitid",
    term: "UNITID",
    def: "The six-digit identifier NCES assigns to each institution in IPEDS. It is the key that joins every IPEDS file to every other. Branch campuses usually have their own UNITID.",
  },
  {
    id: "opeid",
    term: "OPEID",
    def: "The identifier the Office of Postsecondary Education assigns for federal student aid purposes. It is not the same as UNITID, and one OPEID can cover several campuses, so it is a weaker join key.",
  },
  {
    id: "complete-data-file",
    term: "Complete data file",
    def: "An IPEDS download holding every variable for one survey file and one year, as a zipped CSV, with a matching data dictionary.",
    more: "complete-files",
  },
  {
    id: "data-dictionary",
    term: "Data dictionary",
    aka: ["dictionary"],
    def: "The file that ships with each IPEDS data file and says what every variable means, what each code stands for, and the business rules behind them. The authority whenever a value is unclear.",
    more: "complete-files",
  },
  {
    id: "collection-year",
    term: "Collection year",
    def: "The IPEDS year in which data were gathered, such as the 2023–24 collection. Not the same as the period the data describe.",
    more: "timing-blog",
  },
  {
    id: "data-year",
    term: "Data year",
    def: "The period the numbers actually describe, such as awards made between July 1 and June 30, or enrollment on a fall date. Always state it next to a figure.",
    more: "timing-blog",
  },
  {
    id: "provisional-data",
    term: "Provisional data",
    def: "The first full IPEDS release of a collection, after NCES quality control and with non-responding institutions imputed. Institutions can still revise it.",
    more: "release-schedule",
  },
  {
    id: "final-data",
    term: "Final data",
    aka: ["revised data"],
    def: "The IPEDS release published about a year after the provisional one, with institutions' revisions included. Revised files often carry an `_rv` suffix.",
    more: "release-schedule",
  },
  {
    id: "imputation",
    term: "Imputation",
    aka: ["imputed value", "imputation flag"],
    def: "A value NCES estimated for an institution that did not report it. Imputed values are flagged; the dictionary explains the flags. A model trained on them is learning the estimate, not the report.",
  },
  {
    id: "cip",
    term: "CIP code",
    aka: ["Classification of Instructional Programs"],
    def: "The federal code for an academic program, written `NN.NNNN`. The first two digits are the family; family 11 is computer and information sciences. Store it as text, never as a number.",
    more: "cip",
  },
  {
    id: "award-level",
    term: "Award level",
    aka: ["AWLEVEL"],
    def: "The code in the Completions file for the kind of credential awarded, such as an associate's, bachelor's or master's degree. Read the codes from the dictionary for the year you load.",
  },
  {
    id: "first-major",
    term: "First major",
    aka: ["MAJORNUM"],
    def: "Completions counts a double major twice: once as a first major and once as a second. Filtering to the first major counts each graduate once.",
  },
  {
    id: "grand-total",
    term: "Grand-total row",
    aka: ["CIP 99"],
    def: "A row in the Completions file, CIP code `99`, holding the institution's total across all programs. Include it with the detail rows and you count everything twice.",
  },
  {
    id: "census-date",
    term: "Census date",
    def: "The date on which enrollment is counted. IPEDS fall enrollment uses October 15 or the institution's official fall reporting date; a state system may use a different one.",
  },
  {
    id: "cohort",
    term: "Cohort",
    def: "A defined group followed over time, such as first-time, full-time students who started in a given fall. Graduation rates are only comparable when the cohort definitions match.",
  },

  // ---- building the database
  {
    id: "raw-layer",
    term: "Raw layer",
    def: "Tables loaded exactly as the source delivered them, never edited. Every curated number can be traced back to them.",
  },
  {
    id: "curated-layer",
    term: "Curated layer",
    def: "Typed tables with readable names and one stated grain, built from the raw layer by code. What students and agents query.",
  },
  {
    id: "grain",
    term: "Grain",
    def: "What one row of a table represents, such as one institution in one year. A table with a clear grain can be summed and joined without surprises.",
    more: "tidy-data",
  },
  {
    id: "load-log",
    term: "Load log",
    def: "A table recording which source file each raw table came from, whether it was a revised release, how many rows it had, and when it was loaded.",
  },
  {
    id: "idempotent",
    term: "Idempotent",
    def: "An operation that gives the same result however many times you run it. A download that skips files it already has is idempotent; one that appends duplicates is not.",
  },
  {
    id: "sqlite",
    term: "SQLite",
    def: "A complete SQL database stored in a single file, with no server to install. Python's standard library can read and write it.",
    more: "sqlite",
  },
  {
    id: "null",
    term: "NULL",
    def: "SQL's marker for a missing value. It is not zero: `SUM` skips it, and `NULL = 0` is not true. Blanks in a source file should load as NULL.",
  },
  {
    id: "referential-integrity",
    term: "Referential integrity",
    def: "The rule that every reference points at something that exists, such as every completions row having a matching institution row for the same year.",
  },
  {
    id: "known-total",
    term: "Known-total check",
    def: "A test that the database reproduces a figure already published by the source. If the published number and yours differ, something in the build is wrong.",
  },

  // ---- reconciliation and governance
  {
    id: "reconciliation",
    term: "Reconciliation",
    def: "Putting two sources' figures for the same thing side by side and explaining, with evidence, why they differ.",
  },
  {
    id: "aggregate-data",
    term: "Aggregate data",
    def: "Counts and totals about groups, with no record for any individual. All of IPEDS is aggregate; the shared dataset contains nothing else.",
  },
  {
    id: "ferpa",
    term: "FERPA",
    aka: ["Family Educational Rights and Privacy Act"],
    def: "The federal law that protects students' education records. It is why student-level data stays with the institution's data office and out of a teaching dataset.",
    more: "ferpa",
  },
  {
    id: "small-cell",
    term: "Small-cell suppression",
    def: "Hiding counts below a threshold, because a very small group in a table can identify a person. The threshold is set by the data owner.",
  },
  {
    id: "datasheet",
    term: "Datasheet",
    aka: ["datasheet for a dataset"],
    def: "A document that answers standard questions about a dataset: where it came from, what it covers, who is missing, how it may and may not be used, and who maintains it.",
    more: "datasheets",
  },

  // ---- the kit and the courses
  {
    id: "project-kit",
    term: "Project kit",
    def: "The released package the AI courses use: the SQLite database, CSV extracts, a data dictionary for the curated layer, the datasheet, and a first-hour script.",
  },
  {
    id: "semver",
    term: "Semantic versioning",
    aka: ["semver"],
    def: "Version numbers written MAJOR.MINOR.PATCH, where each part says how big a change is. For the kit, a MAJOR change breaks existing queries.",
    more: "semver",
  },
  {
    id: "changelog",
    term: "Changelog",
    def: "A file listing what changed in each release, newest first, so a course using the kit can tell whether its numbers moved.",
  },
  {
    id: "ci",
    term: "Continuous integration (CI)",
    aka: ["CI", "GitHub Actions"],
    def: "Running the build and its checks automatically on every push, so a failing check is seen before anything ships. This course uses GitHub Actions.",
  },
  {
    id: "project-brief",
    term: "Project brief",
    def: "A one-page description of a project: the question, the tables it needs, what a good answer looks like, and how it will be checked.",
  },
  {
    id: "text-to-sql",
    term: "Text-to-SQL",
    def: "Turning a question written in plain English into a SQL query, usually with a language model. Readable curated tables make it far more reliable.",
  },
  {
    id: "mcp",
    term: "MCP server",
    aka: ["Model Context Protocol"],
    def: "A program that offers tools or data to an AI agent through the Model Context Protocol. Agentic AI Foundations builds one over the shared database.",
    more: "agentic-course",
  },
  {
    id: "eval-set",
    term: "Evaluation set",
    aka: ["eval set", "ground truth"],
    def: "A fixed list of questions with known correct answers, used to score a model or agent. Answers computed from the curated layer make a good one.",
  },
];

export const TERM_BY_ID: Record<string, GlossaryTerm> = Object.fromEntries(GLOSSARY.map((t) => [t.id, t]));

/** {{term-id}} or {{term-id|shown words}} */
export const TERM_PATTERN = /\{\{([a-z0-9-]+)(?:\|([^}]+))?\}\}/;

/** Alphabetical, for the Glossary page. */
export const GLOSSARY_SORTED = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
