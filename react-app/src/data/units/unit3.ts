import type { UnitDef } from "../types";

// Unit III — two official sources, and the rules for what a teaching dataset holds.

export const UNIT3: UnitDef = {
  number: 3,
  title: "Reconciliation and Governance",
  theme:
    "Explaining why the state and federal numbers differ, and deciding what belongs in a dataset students will build on.",
  modules: [
    {
      id: "m08",
      number: 8,
      unit: 3,
      title: "When HEI and IPEDS disagree",
      subtitle: "Same institution, same year, two official numbers",
      overview: [
        "Put a degree count from an HEI report next to the IPEDS figure for the same institution and year and they will often differ. Neither is wrong. The two systems use different reporting periods, different census dates, different rules about who counts, and different revision schedules. Reconciliation is the work of finding which of those explains the gap.",
        "This is the most transferable skill in the course. Any organisation that combines data from two systems has this problem, and an AI system that answers questions across sources inherits it. The deliverable is not a corrected number. It is a written explanation that a reader can check.",
      ],
      topics: [
        "Reporting periods: academic year, fiscal year, fall census",
        "Definitions: who is counted, and in which category",
        "Timing: provisional, final, and when each source was pulled",
        "Matching keys across systems",
        "Writing up a difference so it can be checked",
      ],
      excerpts: [
        {
          title: "Each measure names its IPEDS counterpart",
          file: "examples/05_reconcile.py",
          code: `IPEDS_QUERIES = {
    "bachelors_awarded": """
        SELECT SUM(awards_total) FROM completions
        WHERE unitid = :unitid AND file_year = :year
          AND cipcode = '99' AND major_number = 1 AND award_level = 5""",
}`,
          note: "Whether the query truly corresponds to the HEI measure is the question, not the assumption.",
        },
      ],
      resources: ["odhe", "timing-blog"],
      labs: [
        {
          id: "8",
          title: "Explain the gap",
          hours: "~3 h",
          tasks: [
            "Fill in hei_figures.csv from Lab 3 with YSU's UNITID and the matching IPEDS file year.",
            "Run 05_reconcile.py.",
            "For each difference, test at least two explanations against the documentation of both sources.",
            "Fill in the explanation column with the explanation you can support, and cite where.",
          ],
          deliverable: "reconciliation.csv with every difference explained or marked unexplained, with citations.",
        },
      ],
      callouts: [
        {
          kind: "note",
          title: "This becomes an agent project",
          body:
            "Agentic AI Foundations offers a multi-source reconciliation project. This lab is the hand-done version, and its output is the evaluation set: an agent's explanation of a gap can be scored against yours.",
        },
      ],
    },

    {
      id: "m09",
      number: 9,
      unit: 3,
      title: "What goes in the kit, and what never does",
      subtitle: "Governance, privacy, attribution, and the datasheet",
      overview: [
        "A teaching dataset needs rules written down before anyone asks for an exception. The rules for this one are short. It contains aggregate institutional data only. Every figure is traceable to a public source. Nothing is added from internal university systems except through the university's data office, under its process, and in a form that office approves. Small counts that could identify individuals are suppressed, not published.",
        "The datasheet is where those rules live. It records where the data came from, what it covers, who is missing from it, what it should not be used for, and who maintains it. Introduction to AI/ML asks students to write a datasheet for a dataset they did not build. This module writes the one they will read.",
      ],
      topics: [
        "Aggregate data versus student records, and why the line matters",
        "FERPA in one page",
        "Small-cell suppression",
        "Institutional data requests go through the data office",
        "Public-domain sources, attribution, and the course's own license",
        "Datasheets for datasets",
      ],
      resources: ["ferpa", "datasheets"],
      labs: [
        {
          id: "9",
          title: "Write the datasheet",
          hours: "~2 h",
          tasks: [
            "Write DATASHEET.md for the shared dataset using the Datasheets for Datasets questions.",
            "State the inclusion rule, the suppression rule, and the process for requesting any non-public data.",
            "List at least three uses the dataset should not support, and why.",
            "Mark every question you cannot answer as unknown rather than guessing.",
          ],
          deliverable: "DATASHEET.md, with its unknowns counted.",
        },
      ],
      callouts: [
        {
          kind: "scope",
          title: "Not a course decision",
          body:
            "Whether any non-public university data is ever shared for teaching is for the university's data office to decide. The course's job is to make the rule clear and the process easy to follow.",
        },
      ],
    },
  ],
};
