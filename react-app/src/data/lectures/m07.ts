import type { LectureNotesDef } from "../types";

// Module 7 — Tests the data must pass. Keep topic ids in step with units/unit2.ts.

export const M07_NOTES: LectureNotesDef = {
  moduleId: "m07",
  intro:
    "These notes go with Module 7 and Lab 7. `03_check_quality.py` is the running example. A dataset other courses depend on deserves what code other people depend on gets: tests that run on every build, and a rule that a failing test stops the release.",
  sections: [
    {
      topic: "integrity-checks",
      blocks: [
        "The first checks are structural. They do not ask whether a number is plausible, only whether the database is put together correctly:",
        {
          list: [
            "**Every load produced rows.** A zero-row raw table means a bad download or a failed parse.",
            "**Keys are unique.** One row per institution per year in `institution`.",
            "**Every child has a parent.** Every `completions` row has an `institution` row for the same UNITID and year. This is {{referential-integrity|referential integrity}}.",
          ],
        },
        {
          code: 'check("duplicate (unitid, file_year) in institution",\n      one(con, """SELECT COUNT(*) FROM (\n                    SELECT unitid, file_year FROM institution\n                    GROUP BY 1, 2 HAVING COUNT(*) > 1)"""))',
          title: "examples/03_check_quality.py",
          note: "Each check is a query that counts bad rows. Zero means pass. The count is something you can look up.",
        },
      ],
      takeaway: "Start with structure: rows loaded, keys unique, and every reference pointing at something real.",
      check: [
        {
          q: "Why count bad rows instead of just returning true or false?",
          a: "A count tells you how big the problem is and gives you something to search for. \"3 orphan rows\" is a lead; \"false\" is not.",
        },
      ],
    },
    {
      topic: "range-checks",
      blocks: [
        "Next come value checks. Award counts are never negative. An institution's total enrollment is not larger than any plausible campus. A year column holds only the years you loaded. These catch parsing errors, such as a shifted column or a code read as a count.",
        "Keep range checks loose enough that real data passes. Their job is to catch the impossible, not to flag the unusual. Unusual is for a person to look at; impossible is a build error.",
      ],
      takeaway: "Range checks catch the impossible, such as negative counts, without flagging what is merely unusual.",
    },
    {
      topic: "detail-totals",
      blocks: [
        "Where a file carries both detail and a total, the detail should add up to the total. In Completions, first-major six-digit programs should sum to the {{grand-total|grand-total row}} row for each institution, year and award level.",
        "This check is a WARN, not a FAIL, on purpose. Some mismatches are legitimate: a rule in the dictionary about which awards are included where, or a revision applied to one row and not another. A mismatch is a question to answer from the documentation. The wrong response is to \"fix\" the total so it matches.",
        {
          callout:
            "Never edit data to make a check pass. Either the check is wrong, and you fix the check with a written reason, or the data says something real, and you document it.",
          tone: "warning",
          title: "Do not patch the number",
        },
      ],
      takeaway: "Detail should add up to totals; when it does not, explain why from the dictionary instead of changing data.",
    },
    {
      topic: "published-tables",
      blocks: [
        "The strongest check compares the kit with a number NCES already published. Pick a figure from an IPEDS published table or College Navigator, such as YSU's total fall enrollment, and assert the curated layer reproduces it. That is a {{known-total|known-total check}}.",
        "It tests the whole chain at once: download, parse, curation and your understanding of the codes. If you misread an enrollment level code, the totals will not match, even though every structural check passed.",
        "Watch the release: a published table built from provisional data can legitimately differ from a kit built on final data. Record which release the published figure used.",
      ],
      takeaway: "Reproducing a published figure is the best single test that the build and your reading of the codes are right.",
      check: [
        {
          q: "Every structural check passes, but the known-total check is off by about a third. What is the likely cause?",
          a: "A reading error, such as summing rows of different levels or categories together, or including a total row. The structure is fine; the interpretation is not.",
        },
      ],
      readings: ["ipeds-use", "college-navigator"],
    },
    {
      topic: "fail-warn",
      blocks: [
        "Each check has a strength:",
        {
          table: {
            head: ["Level", "Means", "Response"],
            rows: [
              ["PASS", "No bad rows", "Nothing"],
              ["WARN", "The data says something surprising", "Explain it in CHECKS.md, from the documentation"],
              ["FAIL", "The build is wrong", "Fix the build; nothing ships"],
            ],
          },
        },
        "The script exits with a non-zero code on any FAIL. That one line is what lets {{ci|CI}} block a release in Module 12.",
        {
          code: "sys.exit(1 if failures else 0)",
          title: "examples/03_check_quality.py",
        },
      ],
      takeaway: "FAIL stops the release; WARN demands a written explanation; the exit code makes it enforceable.",
    },
  ],
};
