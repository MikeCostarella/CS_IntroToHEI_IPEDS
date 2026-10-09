import type { LectureNotesDef } from "../types";

// Module 6 — Codes, gaps, and change over time. Keep topic ids in step with units/unit2.ts.

export const M06_NOTES: LectureNotesDef = {
  moduleId: "m06",
  intro:
    "These notes go with Module 6 and Lab 6. Most mistakes made with IPEDS are reading mistakes, not programming mistakes. Each section names one trap, shows what it does to a result, and gives the defence the kit uses.",
  sections: [
    {
      topic: "null-zero-na",
      blocks: [
        "Three different situations can look alike in a spreadsheet: the institution reported zero, the institution did not report, and the question did not apply to that institution. They mean different things and must not be merged.",
        {
          table: {
            head: ["Situation", "Example", "How the kit stores it"],
            rows: [
              ["Reported zero", "No master's degrees awarded in computing", "`0`"],
              ["Not reported / blank", "A value missing from the file", "`NULL`"],
              ["Not applicable", "A two-year college asked about doctoral degrees", "As the dictionary codes it; never turned into `0`"],
            ],
          },
        },
        "In SQL, {{null|NULL}} behaves differently from zero, and usefully so: `SUM` and `AVG` skip it. Turning blanks into zeros pulls averages down and makes missing data look like real data.",
      ],
      takeaway: "Zero, missing and not applicable are different facts; keep blanks as NULL and never convert them to zero.",
      check: [
        {
          q: "Ten institutions, nine reporting an average class size of 30 and one blank. What is the average if the blank becomes zero, and if it stays NULL?",
          a: "As zero: 27. As NULL: 30, the average of the institutions that actually reported.",
        },
      ],
    },
    {
      topic: "codes-labels",
      blocks: [
        "Categorical variables in IPEDS files are codes. `CONTROL` holds a number standing for public, private nonprofit or private for-profit; `AWLEVEL` holds a number standing for a kind of award. The labels are in the {{data-dictionary|data dictionary}}, not the data file.",
        "Two mistakes follow from forgetting this. One is doing arithmetic on codes, such as averaging `AWLEVEL`. The other is guessing labels from memory. The defence is lookup tables built from the dictionary and loaded into the curated layer, so a query joins to the label instead of hard-coding it.",
        {
          code: "SELECT a.label, SUM(c.awards_total) AS awards\nFROM completions c\nJOIN award_level a ON a.code = c.award_level\nWHERE c.unitid = :ysu AND c.file_year = 2023\n  AND c.major_number = 1 AND c.cipcode <> '99'\nGROUP BY a.label;",
          title: "Join to a label instead of remembering one",
          note: "`award_level` is one of the lookup tables you build in Lab 6.",
        },
      ],
      takeaway: "Codes are not quantities and their labels live in the dictionary; load lookup tables and join to them.",
      readings: ["complete-files"],
    },
    {
      topic: "imputation",
      blocks: [
        "When an institution does not respond to a survey, NCES estimates its values so national totals are not distorted. These estimates are {{imputation|imputed values}}, and the files mark them with flags, often companion variables, explained in the dictionary.",
        "For national statistics, imputation is the right call. For a student project it is a trap: a model trained on imputed values is partly learning NCES's estimation method rather than what institutions reported. An agent quoting an imputed figure as \"YSU reported…\" is wrong.",
        {
          callout:
            "In Lab 6 you count how many rows in one file are imputed. Carry that number into the datasheet (Module 9) so every course knows how much of the data is estimated.",
          tone: "tip",
          title: "Count it, then disclose it",
        },
      ],
      takeaway: "Imputed values are NCES estimates, not reports; find the flags, count them, and disclose them.",
      check: [
        {
          q: "Should imputed rows be deleted from the kit?",
          a: "Usually not. Deleting them biases totals the other way. Keep them, keep the flag, and let each project decide whether to filter, with the choice written up.",
        },
      ],
    },
    {
      topic: "total-rows",
      blocks: [
        "Some IPEDS files mix detail rows with summary rows. In Completions, the {{grand-total|grand-total row}} (CIP `99`) holds the institution's total across all programs, and two-digit CIP rows can hold family subtotals. Sum everything for an institution and you count each award two or three times.",
        "There is a second, quieter double count: double majors. A graduate with two majors appears once as a {{first-major|first major}} and once as a second major. Counting graduates, not majors, means filtering to `major_number = 1`.",
        {
          code: "-- Wrong: includes the CIP 99 total, subtotals, and second majors\nSELECT SUM(awards_total) FROM completions WHERE unitid = :ysu AND file_year = 2023;\n\n-- Right: six-digit programs, first majors only\nSELECT SUM(awards_total) FROM completions\nWHERE unitid = :ysu AND file_year = 2023\n  AND major_number = 1 AND length(cipcode) = 7;",
          title: "The double count, and the fix",
        },
      ],
      takeaway: "Exclude total and subtotal rows and second majors, or every sum is inflated.",
      check: [
        {
          q: "Why does Lab 6 ask you to write the *wrong* query on purpose?",
          a: "So you see the size of the error in real numbers. A double count is easy to spot once you have seen how large it is, and hard to spot if you never have.",
        },
      ],
    },
    {
      topic: "changing-variables",
      blocks: [
        "IPEDS changes. Variables are added, retired, renamed, or redefined; code lists gain new values; whole components are redesigned. Comparing two years without checking is how trend lines get a jump that never happened.",
        "The build already handles the visible case: if a needed column is missing from a year, it skips that year and says so, rather than filling in a guess. The invisible case, same name but new meaning, can only be caught by reading each year's dictionary and noting differences.",
        {
          code: 'missing = needed - columns(con, table)\nif missing:\n    # Variables change across years. Say so; do not guess.\n    print(f"SKIP  {table}: no column(s) {sorted(missing)}")\n    continue',
          title: "examples/02_build_database.py",
        },
      ],
      takeaway: "Before comparing years, confirm each variable means the same thing in both; a gap is better than a silent guess.",
    },
    {
      topic: "cip-revisions",
      blocks: [
        "The {{cip|CIP}} itself is revised about once a decade. IPEDS moved from CIP 2010 to CIP 2020 around the 2020–21 collection. Some programs kept their codes, some moved, some split or merged. A program can appear to vanish from a trend line just because its code changed.",
        "NCES publishes a crosswalk between editions. For questions about computing, the effect is mostly small, but any trend that crosses an edition boundary should be checked against the crosswalk, and the kit's data dictionary should say which edition each year uses.",
      ],
      takeaway: "CIP editions change program codes; check the crosswalk before trusting a trend that crosses an edition.",
      readings: ["cip"],
    },
  ],
};
