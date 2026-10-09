import type { LectureNotesDef } from "../types";

// Module 9 — What goes in the kit, and what never does. Keep topic ids in step with units/unit3.ts.

export const M09_NOTES: LectureNotesDef = {
  moduleId: "m09",
  intro:
    "These notes go with Module 9 and Lab 9. A teaching dataset needs its rules written down before anyone asks for an exception. The rules here are short; the datasheet is where they live.",
  sections: [
    {
      topic: "aggregate-line",
      blocks: [
        "The first rule: the kit contains {{aggregate-data|aggregate data}} only. Counts and totals about institutions and groups, never a record about a person. Every IPEDS file already meets this rule, and HEI enters only through its public reports.",
        "The rule is easy to state and easy to erode. The erosion usually starts with a reasonable-sounding request: \"it would make a better project if we had course-level grades.\" The answer is not that the project is a bad idea; it is that the project does not belong on the shared dataset.",
      ],
      takeaway: "Aggregate public data only, with no exceptions made inside the kit.",
    },
    {
      topic: "ferpa",
      blocks: [
        "{{ferpa}}, the Family Educational Rights and Privacy Act, protects students' education records at institutions that receive federal education funding. In broad terms, it limits who can see or disclose personally identifiable information from those records without consent.",
        "You do not need to be an expert in FERPA to build this kit, because the kit never holds education records. What you do need is to recognise when a request would bring them in, and to send that request to the people whose job is to decide it.",
        {
          callout:
            "This is a one-page summary for a course, not legal guidance. Questions about a specific use of student data go to the institution's data office or registrar.",
          tone: "aside",
        },
      ],
      takeaway: "FERPA protects student records; the kit stays clear of it by never holding them, and routes any such request to the data office.",
      readings: ["ferpa"],
    },
    {
      topic: "small-cells",
      blocks: [
        "Aggregate is not automatically anonymous. A table of degrees by program, by gender, by race and ethnicity, for one small program in one year, can have cells of one or two people, and someone who knows the program can tell who they are.",
        "{{small-cell|Small-cell suppression}} hides counts below a threshold. Agencies set their own thresholds; the data owner decides the number. For the kit, the practical rules are: do not add finer breakdowns than IPEDS publishes, and if a project produces new tables from the data, check for very small cells before publishing them.",
      ],
      takeaway: "Very small counts can identify people even in aggregate tables; do not publish finer breakdowns than the source does.",
    },
    {
      topic: "data-office",
      blocks: [
        "Some of the most interesting projects would use the university's own data. That is possible, but not through a course. Requests for non-public institutional data go to the institution's data office, follow its governance process, and come back, if approved, in whatever form that office decides, often de-identified or synthetic.",
        "The course's job is to make that route clear and easy to follow, not to decide it. Write the process into the datasheet: who to ask, what to include in the request, and that the answer belongs to the data office.",
      ],
      takeaway: "Non-public data goes through the data office's process, and the decision belongs to that office.",
    },
    {
      topic: "licensing",
      blocks: [
        "IPEDS data is published by NCES, a federal agency, and is in the public domain. HEI reports are published by the state. Both should be cited with their source and retrieval date wherever kit figures appear.",
        "The course itself has its own licence: content under CC BY-NC-SA 4.0 and code, including the build scripts, under MIT. That means another institution can adopt the course and the scripts, with attribution, and rebuild its own kit.",
      ],
      takeaway: "Cite the public sources, and know the course's own licence so others can adopt it properly.",
    },
    {
      topic: "datasheets",
      blocks: [
        "A {{datasheet|datasheet}} answers standard questions about a dataset so users do not have to guess. The idea comes from the paper *Datasheets for Datasets*, which proposes questions in groups like these:",
        {
          list: [
            "**Motivation**: why the dataset exists and who built it.",
            "**Composition**: what is in it, what is missing, whether anything is estimated.",
            "**Collection**: where each part came from and when.",
            "**Uses**: what it is for, and what it should not be used for.",
            "**Maintenance**: who owns it, how it is updated, how to report problems.",
          ],
        },
        "Answer every question you can, and write **unknown** where you cannot. The number of unknowns is itself useful information. Introduction to AI/ML asks students to write a datasheet for a dataset they did not build; this one is the datasheet they will read.",
      ],
      takeaway: "The datasheet records the kit's origins, gaps, rules and owner, with unknowns marked honestly.",
      readings: ["datasheets"],
    },
  ],
};
