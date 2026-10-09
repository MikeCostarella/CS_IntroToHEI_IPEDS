// Course-level metadata: thesis, outcomes, format, and how the work is judged.
// Rendered on the home page and the syllabus page.

export const COURSE = {
  repo: "CS_IntroToHEI_IPEDS",
  title: "Intro to HEI & IPEDS",
  heading: "Intro to HEI & IPEDS",
  siteTitle: "Intro to HEI & IPEDS",
  tagline:
    "Self-directed · Building one documented, tested higher-education dataset that every AI course can use for its projects",
  audience:
    "For students and instructors in the AI course path, and anyone who will build on the shared dataset",
  prerequisites:
    "Python basics (functions, loops, dictionaries) and a little SQL: SELECT, WHERE, JOIN, GROUP BY. No statistics and no machine learning. If Python is new, start with the Python Programming course.",
  status:
    "Draft. A short companion course: take it before or alongside Introduction to AI/ML. It is not a gate in front of the AI courses; they point to the dataset it produces.",
  author: "Mike Costarella",
  org: "Costarella Innovations, LLC",
  contactEmail: "Mike.Costarella@gmail.com",

  priorCourse: {
    title: "Python Programming",
    repo: "CS_PythonProgrammingCourse",
    url: "https://mikecostarella.github.io/CS_PythonProgrammingCourse/",
  },
  /** The courses that use the dataset this one builds. */
  usedBy: [
    {
      title: "Introduction to AI/ML",
      url: "https://mikecostarella.github.io/CS_IntroductionToAIML/",
      use: "Regression, classification and clustering on real institutional data, plus the bias and datasheet labs.",
    },
    {
      title: "LLM Foundations",
      url: "https://mikecostarella.github.io/CS_LLMFoundations/",
      use: "Retrieval over the IPEDS documentation, and evaluation sets of questions with verifiable numeric answers.",
    },
    {
      title: "Agentic AI Foundations",
      url: "https://mikecostarella.github.io/CS_AgenticAIFoundations/",
      use: "A text-to-SQL agent, a read-only MCP server over the database, and the HEI-vs-IPEDS reconciliation project.",
    },
  ],

  thesis:
    "AI course projects are only as good as the data under them, and most courses hand students a different toy dataset every term. Higher-education data is a better choice. IPEDS is the federal survey every U.S. college that takes federal student aid reports to, and it is public. HEI is Ohio's own state system for public colleges, published as reports. Students already understand the domain, because they are in it. The data is also messy in exactly the ways real data is: codes instead of labels, definitions that shift between years, and two official sources that do not quite agree. This course builds that data once, properly, so every AI course after it can start from the same documented, tested database.",

  premise: [
    "The output of this course is a thing other courses depend on: a SQLite database, CSV extracts, a data dictionary, a datasheet, and a first-hour script, released with a version number.",
    "Every step is a script, not a set of clicks. The examples/ folder uses only the Python standard library, so the build runs anywhere Python does.",
  ],

  outcomes: [
    "Explain what IPEDS and HEI are, who reports to each, and what each can and cannot tell you.",
    "Read an IPEDS data dictionary and turn codes into meaning without guessing.",
    "Tell the year in a file name apart from the period the data describe, and provisional data apart from final.",
    "Download the source files with a script that can be re-run and audited.",
    "Design a two-layer database: raw files as delivered, and curated tables with readable names and one clear grain.",
    "Handle blanks, imputed values, suppressed cells and variables that change between years without silently corrupting results.",
    "Write data-quality checks that gate a release.",
    "Reconcile a state figure against a federal one and explain the difference in writing.",
    "Decide what belongs in a shared teaching dataset and what never does, and document it in a datasheet.",
    "Package and version the dataset as a project kit, and write project briefs that the AI courses can use as-is.",
  ],

  format:
    "Twelve modules in four units. Each has lecture notes, one section per topic with a takeaway and check-yourself questions, and one or two lab sittings of two to four hours. Terms with a dotted underline show their definition; the Glossary collects them all. Every sitting adds something to the dataset or its documentation. There are no exams; the capstone is release 1.0 of the project kit, rebuilt from scratch by someone else.",

  assessment: [
    "Each lab sitting has a named deliverable: a script that runs, a table of findings, or a short written explanation.",
    "Checkpoint (Module 7): the database builds from nothing and passes its quality checks.",
    "Capstone (Module 12): a tagged release of the project kit, with a datasheet, a data dictionary for the curated layer, and a successful rebuild by another person.",
  ],

  outOfScope:
    "Student-level records of any kind, statistical modelling, and dashboards. Ohio's raw HEI files are student-level and available only to approved researchers, so this course uses HEI's published reports. Machine learning on the dataset belongs to the courses that use it.",

  integrity:
    "Use AI assistance freely. It is good at writing loaders and bad at knowing what an IPEDS code means in a given year. Every deliverable asks for the dictionary entry or report page behind a decision, so the evidence has to come from the source, not from the assistant.",
} as const;
