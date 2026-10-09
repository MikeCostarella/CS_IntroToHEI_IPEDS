import type { LectureNotesDef } from "../types";

// Module 10 — Packaging the project kit. Keep topic ids in step with units/unit4.ts.

export const M10_NOTES: LectureNotesDef = {
  moduleId: "m10",
  intro:
    "These notes go with Module 10 and Lab 10. The test for every decision in this module is the same: can a student who has never seen the kit get from download to a correct answer in one hour?",
  sections: [
    {
      topic: "five-parts",
      blocks: [
        "The {{project-kit|project kit}} has five parts, each for a different reader:",
        {
          table: {
            head: ["Part", "For", "Answers"],
            rows: [
              ["`ipeds.sqlite`", "Anyone writing SQL, and agents", "Everything, in one file"],
              ["CSV extracts", "pandas and spreadsheet users", "The curated tables, without SQL"],
              ["`DATA_DICTIONARY.md`", "Everyone", "What each curated table and column means, and its period"],
              ["`DATASHEET.md`", "Instructors, reviewers", "Where it came from, gaps, rules, owner"],
              ["`04_first_question.py`", "A student on day one", "One real question, answered correctly"],
            ],
          },
        },
        "Plus a one-page `ORIENTATION.md` that points to the others. Nothing in the kit should require reading this course first.",
      ],
      takeaway: "Database, CSVs, data dictionary, datasheet and a first-hour script, tied together by a one-page orientation.",
    },
    {
      topic: "csv-extracts",
      blocks: [
        "Many students will reach for pandas or a spreadsheet before SQL. Give them CSVs of the curated tables, one file per table, with the same column names as the database.",
        "The trap from Module 2 returns here: a spreadsheet that opens `completions.csv` will turn `11.0700` into `11.07`. In pandas, read code columns as text. Say both things in the orientation.",
        {
          code: 'import pandas as pd\n\ndf = pd.read_csv("completions.csv", dtype={"cipcode": str})',
          title: "Keep CIP codes as text in pandas",
        },
      ],
      takeaway: "Export each curated table to CSV, and tell users how to keep code columns as text.",
    },
    {
      topic: "orientation",
      blocks: [
        "The orientation is one page. If it grows longer, the extra belongs in the data dictionary or the datasheet. It covers:",
        {
          list: [
            "What is in the kit and which version this is.",
            "What is not in it: no student records, which years, which surveys.",
            "The three biggest traps: total rows, double majors, and file year versus data year.",
            "How to run the first-hour script.",
            "Where to report a problem.",
          ],
        },
      ],
      takeaway: "One page: contents, limits, the three traps, how to start, and where to report problems.",
    },
    {
      topic: "first-hour",
      blocks: [
        "`04_first_question.py` answers one real question: how many computing bachelor's degrees YSU and nearby public universities award each year. It is short, and every line handles one of Module 6's traps.",
        {
          code: "WHERE c.unitid IN ({marks})\n  AND c.cipcode LIKE '11.%'          -- CIP family 11: computer and information sciences\n  AND c.major_number = 1\n  AND c.award_level = ?",
          title: "examples/04_first_question.py",
          note: "Text CIP prefix, first majors only, an explicit award-level code, and no total rows (CIP 99 does not start with `11.`).",
        },
        "It also matches institutions by name and prints what matched, so a student sees immediately that \"Kent State\" means several campuses. A good first script teaches the data while it answers.",
      ],
      takeaway: "The first-hour script answers a real question correctly and shows, line by line, how the traps are avoided.",
      check: [
        {
          q: "Why print the matched institutions instead of quietly using them?",
          a: "Name matching can pick up extra campuses. Printing the matches lets the student see and correct that before trusting the numbers.",
        },
      ],
    },
    {
      topic: "versioning",
      blocks: [
        "Every release of the kit gets a {{semver|semantic version}}, MAJOR.MINOR.PATCH, adapted for data:",
        {
          table: {
            head: ["Change", "Example", "Bump"],
            rows: [
              ["Breaks existing queries", "A curated column renamed or removed", "MAJOR"],
              ["Adds without breaking", "A new year, a new curated table", "MINOR"],
              ["Fixes values", "A provisional year replaced by final data; a parsing bug fixed", "PATCH"],
            ],
          },
        },
        "Each release has a {{changelog|changelog}} entry saying what changed and which numbers moved. A course pinned to kit 1.2 can read the changelog and decide whether to move to 1.3.",
      ],
      takeaway: "Version the kit by what a change does to its users, and say in the changelog which numbers moved.",
      check: [
        {
          q: "Replacing provisional 2023 completions with final ones changes some totals. Is that a PATCH or a MAJOR?",
          a: "PATCH by structure, since no query breaks, but the changelog must say clearly that 2023 completion totals changed, because results built on 1.2 will not reproduce on 1.3.",
        },
      ],
      readings: ["semver"],
    },
    {
      topic: "releases",
      blocks: [
        "GitHub Releases is the distribution point. Each tagged release has the kit's files attached, so a course links to a specific release and every student downloads exactly the same files. The repository holds the scripts; the release holds the built data.",
        "Keep built data out of the git history itself. The database is rebuilt from scripts, and committing it on every change bloats the repository. Attach it to the release instead.",
      ],
      takeaway: "Attach the built kit to a tagged GitHub Release; keep the repository for the scripts that build it.",
      readings: ["github-releases"],
    },
  ],
};
