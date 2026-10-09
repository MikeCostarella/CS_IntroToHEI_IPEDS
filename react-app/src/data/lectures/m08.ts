import type { LectureNotesDef } from "../types";

// Module 8 — When HEI and IPEDS disagree. Keep topic ids in step with units/unit3.ts.

export const M08_NOTES: LectureNotesDef = {
  moduleId: "m08",
  intro:
    "These notes go with Module 8 and Lab 8. {{reconciliation|Reconciliation}} is the most transferable skill in the course: any organisation that combines two systems faces it, and any AI system that answers across sources inherits it. The method below works for HEI and IPEDS and for any other pair.",
  sections: [
    {
      topic: "reporting-periods",
      blocks: [
        "The first suspect is always time. Two figures labelled with the same year can describe different stretches of it:",
        {
          table: {
            head: ["Period type", "Covers", "Typical use"],
            rows: [
              ["Academic or award year", "July 1 – June 30", "IPEDS completions and 12-month enrollment"],
              ["Fiscal year", "Set by the state or institution", "Finance; some state reporting"],
              ["Fall census", "A single {{census-date|census date}} in the fall", "Fall headcount"],
              ["{{cohort|Cohort}}", "A group followed for several years", "Graduation and retention rates"],
            ],
          },
        },
        "Ohio's state fiscal year also runs July to June, so for degrees the periods may line up. Do not assume it: read each report's own statement of its period, which is why Lab 3 recorded it word for word.",
      ],
      takeaway: "Check that both figures describe the same stretch of time before looking for any other explanation.",
    },
    {
      topic: "definitions",
      blocks: [
        "The second suspect is definition: who or what is counted. Does a double major count once or twice? Are certificates included with degrees? Are students at a branch campus counted with the main campus? Are non-credit students in the headcount?",
        "Each system answers these in its own documentation. The work is to find the answer in both and compare them. Where IPEDS counts a {{first-major|first major}} and second majors separately, and a state report counts degrees, the gap can be exactly the double majors.",
      ],
      takeaway: "Find each source's written definition of what is counted; many gaps are definitional and fully explainable.",
    },
    {
      topic: "timing",
      blocks: [
        "The third suspect is when each figure was pulled. An IPEDS {{provisional-data|provisional}} file and a state report published later may reflect different corrections. A revision in one system may never be sent to the other.",
        "Record which IPEDS release the kit used (the load log has it) and when the HEI report was published or retrieved. A small difference between figures pulled a year apart is often just a revision.",
      ],
      takeaway: "Figures pulled at different times can differ by revisions alone; record the release and the retrieval date.",
    },
    {
      topic: "matching-keys",
      blocks: [
        "Before comparing, be sure you are comparing the same institution. IPEDS uses {{unitid|UNITID}}; a state system has its own identifiers and may group campuses differently. A main campus in one system may include its branches in the other.",
        "For the kit, the match is recorded explicitly: each row of `hei_figures.csv` carries the UNITID the figure is compared against. If a state figure covers several campuses, the IPEDS side has to sum the same set, and that choice is written down.",
      ],
      takeaway: "Match institutions explicitly and record the match; campus grouping differences masquerade as data differences.",
    },
    {
      topic: "writing-up",
      blocks: [
        "The deliverable of {{reconciliation|reconciliation}} is a written explanation that someone else can check. For each difference, test explanations in order, and record what you found:",
        {
          list: [
            "State both figures, with source, period and release.",
            "Test period, definition, timing and matching, citing the documentation for each.",
            "Write the explanation you can support, with its citation.",
            "If nothing explains it, write **unexplained** and say what you checked. That is a valid finding.",
          ],
          ordered: true,
        },
        {
          code: "measure,...,hei_value,ipeds_value,difference,explanation\nbachelors_awarded,...,1450,1462,-12,\"Periods match (both July-June, per report p.4 and C_A docs). IPEDS side uses first majors only, so double majors are not the cause. IPEDS file is provisional; final release not yet out. Unexplained pending the final release.\"",
          title: "A good explanation cell (illustrative numbers)",
        },
        {
          callout:
            "Agentic AI Foundations offers a reconciliation agent as a project. Your written explanations become its evaluation set: an agent's explanation of each gap can be scored against yours.",
          tone: "aside",
          title: "Where this goes next",
        },
      ],
      takeaway: "Explain each gap with evidence, test the usual causes in order, and treat \"unexplained, here is what I checked\" as a real result.",
      check: [
        {
          q: "Why is forcing the numbers to agree the worst possible outcome?",
          a: "It destroys the information. The difference, and its cause, is what someone combining the two sources needs to know.",
        },
      ],
    },
  ],
};
