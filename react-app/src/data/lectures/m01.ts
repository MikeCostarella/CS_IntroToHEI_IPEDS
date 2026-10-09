import type { LectureNotesDef } from "../types";

// Module 1 — Why one shared dataset. One section per lecture topic; keep each
// topic id in step with units/unit1.ts. Inline markup: {{term-id}} or
// {{term-id|words}} glossary terms, `code`, **bold**, *italic*, [[resource-id]].

export const M01_NOTES: LectureNotesDef = {
  moduleId: "m01",
  intro:
    "These notes go with Module 1 and Lab 1. They make one argument: a course sequence learns more from one real dataset used everywhere than from a new toy dataset in every course. Read them before Lab 1, then come back to the last section when you start thinking about projects.",
  sections: [
    {
      topic: "why-shared",
      blocks: [
        "Every AI course needs data for projects. When each course chooses its own, the first week of every project goes on learning a new domain, finding the data, and cleaning it. By the time the interesting part starts, the term is half over, and the next course starts the cycle again with a different dataset.",
        "A shared dataset changes that. The first course pays the cost of understanding the data; every later course builds on it. A student who predicted graduation rates in Introduction to AI/ML already knows the tables when Agentic AI Foundations asks for an agent that answers questions about them. The second project starts where the first one ended.",
        {
          table: {
            head: ["", "A different dataset per course", "One shared dataset"],
            rows: [
              ["Start-up cost", "Paid in every course", "Paid once, then reused"],
              ["Data cleaning", "Done quickly, often badly, every time", "Done properly once, tested, documented"],
              ["Comparing results", "Impossible across courses", "Same numbers everywhere, so results can be checked"],
              ["What students learn", "A new domain each time", "One domain in depth, with harder questions each course"],
            ],
            caption: "What sharing buys a course sequence",
          },
        },
        {
          callout:
            "A shared dataset also means one place to fix a mistake. If a code is misread in the build, it is fixed once and every course gets the correction in the next release.",
          tone: "tip",
          title: "One fix, every course",
        },
      ],
      takeaway: "A shared dataset turns repeated start-up costs into a one-time investment that every later course builds on.",
      check: [
        {
          q: "Name one thing that gets *worse* when every course shares one dataset.",
          a: "A mistake in the dataset spreads to every course, and changing it affects everyone. That is why the dataset needs tests, versions and a changelog (Modules 7 and 10).",
        },
        {
          q: "Why does a shared dataset make it easier to grade an AI project?",
          a: "The instructor already knows the correct answers to many questions, because they can be computed from the same database. That makes an evaluation set cheap to build (Module 11).",
        },
      ],
    },
    {
      topic: "two-sources",
      blocks: [
        "**{{ipeds}}** is the federal source. Every college, university and technical school that takes part in federal student aid programs must answer its annual surveys, run by {{nces}}. It covers who enrolls, what degrees are awarded in which programs, graduation rates, admissions, cost, staff and finances. It is public: anyone can download it.",
        "**{{hei}}** is Ohio's state source. Ohio's public colleges and universities submit detailed records to the {{odhe|Ohio Department of Higher Education}}, which publishes reports on enrollment, degrees, student progress, costs and outcomes. The reports are public; the detailed files behind them are not.",
        {
          table: {
            head: ["", "IPEDS", "HEI"],
            rows: [
              ["Run by", "NCES (federal)", "ODHE (Ohio)"],
              ["Who reports", "Every institution in federal aid programs, nationwide", "Ohio's public institutions"],
              ["What is public", "Every data file and dictionary", "Published reports"],
              ["Level of detail", "Aggregate counts per institution", "Student-level underneath; aggregate in reports"],
              ["Best for", "Comparing YSU with any U.S. institution", "Ohio-specific measures and definitions"],
            ],
            caption: "The two sources at a glance",
          },
        },
        "This course builds its database from IPEDS, because IPEDS is complete, public and downloadable. HEI comes in through its published reports, figure by figure, mainly so the two can be compared in Module 8.",
      ],
      takeaway: "IPEDS is the public federal survey and the backbone of the dataset; HEI is Ohio's own system, used here through its published reports.",
      check: [
        {
          q: "You want to compare YSU's computing graduates with a university in Pennsylvania. Which source?",
          a: "IPEDS. HEI covers Ohio's public institutions only.",
        },
        {
          q: "Why not load HEI's detailed files into the shared database?",
          a: "They are student-level and restricted. Access needs a data-sharing agreement and IRB approval (Module 3), which a teaching dataset should not depend on.",
        },
      ],
      readings: ["ipeds-home", "odhe"],
    },
    {
      topic: "aggregate-not-records",
      blocks: [
        "Everything in the shared dataset is {{aggregate-data|aggregate data}}: counts and totals about groups, such as \"YSU awarded this many bachelor's degrees in computing in this year.\" There is no row for any student, and nothing that could be used to look one up.",
        "That is a deliberate line, not a limitation to work around. It means the dataset can be published, handed to any student, and connected to an AI agent without a privacy review each time. It also keeps the course honest about what it is: practice on real public data, not access to the university's records.",
        {
          callout:
            "If a project idea needs student-level data, it is not a project for the shared dataset. It goes through the university's data office and its own approval process. Module 9 covers this.",
          tone: "warning",
          title: "Where the line is",
        },
      ],
      takeaway: "The dataset holds aggregate public figures only, which is what makes it safe to share with every student and every agent.",
      check: [
        {
          q: "Is a table of degrees by program, for one institution and one year, aggregate data?",
          a: "Yes. It counts groups. It can still need care if a group is very small (Module 9 on small cells), but it holds no individual records.",
        },
      ],
    },
    {
      topic: "kit-not-folder",
      blocks: [
        "A folder of downloaded zips is not a dataset anyone can build on. Every student would unzip them differently, read codes differently, and get different numbers. The deliverable of this course is a {{project-kit|project kit}}: one released, versioned package that every course points to.",
        {
          list: [
            "**The database**: one {{sqlite|SQLite}} file with raw and curated tables.",
            "**CSV extracts** of the curated tables, for anyone working in pandas or a spreadsheet.",
            "**A data dictionary** for the curated layer: what every table and column means.",
            "**A {{datasheet|datasheet}}**: where the data came from, what it covers, and what it must not be used for.",
            "**A first-hour script** that answers one real question, so every student starts from something that works.",
          ],
        },
        "The kit has a version number. When a course says its projects use kit 1.2, every student in that course gets the same numbers, and when the data changes, the change is written down.",
      ],
      takeaway: "The output is a versioned project kit with documentation and a working first script, not a pile of downloads.",
      check: [
        {
          q: "Two students in the same course get different totals for the same question. With a versioned kit, what is the first thing to check?",
          a: "Whether they are using the same kit version. If they are, the difference is in their queries, not the data.",
        },
      ],
    },
    {
      topic: "course-uses",
      blocks: [
        "Each AI course uses the kit differently, which is why it has to be well built:",
        {
          table: {
            head: ["Course", "What it does with the kit"],
            rows: [
              ["Introduction to AI/ML", "Regression, classification and clustering on real institutional data; the datasheet and bias labs."],
              ["LLM Foundations", "Retrieval over the IPEDS documentation; evaluation sets of questions with numeric answers that can be checked."],
              ["Agentic AI Foundations", "A {{text-to-sql|text-to-SQL}} agent, a read-only {{mcp|MCP server}} over the database, and the HEI-vs-IPEDS reconciliation project."],
            ],
          },
        },
        "Notice what these have in common: every use needs the data to be *correct* and *understood*. A model trained on misread codes learns nonsense; an agent querying cryptic column names writes wrong SQL; an evaluation set built on double-counted totals scores right answers as wrong. The rest of this course is about preventing those failures before the data reaches anyone.",
      ],
      takeaway: "Every course that uses the kit depends on its numbers being right and its tables being readable, so those are the standards this course builds to.",
      check: [
        {
          q: "Why do readable column names matter more for an agent than for a person?",
          a: "A person can look up `CTOTALT` in the dictionary. A text-to-SQL agent mostly works from the names it sees, so `awards_total` gets it much closer to a correct query.",
        },
      ],
      readings: ["aiml-course", "llm-course", "agentic-course"],
    },
  ],
};
