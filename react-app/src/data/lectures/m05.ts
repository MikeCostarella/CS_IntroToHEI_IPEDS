import type { LectureNotesDef } from "../types";

// Module 5 — Raw layer, curated layer. Keep topic ids in step with units/unit2.ts.

export const M05_NOTES: LectureNotesDef = {
  moduleId: "m05",
  intro:
    "These notes go with Module 5 and Labs 5a and 5b. `02_build_database.py` is the running example. The design has two layers for one reason: so that every number students see can be traced back to exactly what NCES delivered.",
  sections: [
    {
      topic: "raw-tables",
      blocks: [
        "The {{raw-layer|raw layer}} is one table per IPEDS file, named after the file (`hd2023`, `c2023_a`), with the same columns in the same order and every value kept as text. Blank cells load as {{null|NULL}}. Nothing is renamed, typed, filtered or fixed.",
        "Why keep something so unfriendly? Because it is evidence. When a curated number looks wrong, the first question is whether the source said so or the build changed it. With the raw table there, that question takes one query to answer.",
        {
          code: "# Blank stays NULL. A blank is not a zero -- Module 6.\nbatch.append([v.strip() or None for v in row])",
          title: "examples/02_build_database.py — the only change made to raw values",
          note: "Trimming whitespace and turning empty strings into NULL are the only transformations. Everything else happens in the curated layer, in code you can read.",
        },
      ],
      takeaway: "The raw layer is the source as delivered, kept unedited so every curated figure can be traced back to it.",
      check: [
        {
          q: "Why not convert numeric columns to integers in the raw layer, to save a step later?",
          a: "Because conversion is an interpretation: a code like `-1` or a blank might mean something specific. Doing it in the curated layer keeps the decision visible and leaves the evidence intact.",
        },
      ],
    },
    {
      topic: "revised-files",
      blocks: [
        "A zip may hold two CSVs: the original and a revised version ending in `_rv`. The build prefers the revised file and records that it did.",
        {
          code: 'def pick_csv(zf: zipfile.ZipFile) -> tuple[str, bool]:\n    names = [n for n in zf.namelist() if n.lower().endswith(".csv")]\n    revised = [n for n in names if n.lower().endswith("_rv.csv")]\n    return (revised or names)[0], bool(revised)',
          title: "examples/02_build_database.py",
        },
        "Note what it does *not* do: it does not silently pick whichever file is newer, or merge the two. One file is chosen by a stated rule, and the choice is logged.",
      ],
      takeaway: "Prefer the revised file by an explicit rule, and record which one was loaded.",
    },
    {
      topic: "load-log",
      blocks: [
        "The {{load-log|load log}} is a small table the build writes as it goes: for each raw table, the source file inside the zip, whether it was revised or as released, the row count, and when it was loaded.",
        {
          code: "SELECT table_name, source_file, release, row_count\nFROM load_log\nORDER BY table_name;",
          title: "What did this database get built from?",
        },
        "It answers the questions people ask months later: which release is this kit built on, did the 2021 completions file load completely, when was this built. Without it, those answers live in someone's memory.",
      ],
      takeaway: "The load log records what each table was built from, so the database can describe its own origins.",
      check: [
        {
          q: "Two kit releases give different 2022 completions totals. Which table do you query first?",
          a: "`load_log` in each, to see whether one loaded the provisional file and the other the revised one.",
        },
      ],
    },
    {
      topic: "curated-tables",
      blocks: [
        "The {{curated-layer|curated layer}} is what students and agents query. Each table has readable column names, real types, and one stated {{grain|grain}}: what one row means.",
        {
          table: {
            head: ["Table", "Grain (one row is…)", "Built from"],
            rows: [
              ["`institution`", "one institution in one file year", "`hdYYYY`"],
              ["`completions`", "one institution, file year, CIP code, major number and award level", "`cYYYY_a`"],
              ["`fall_enrollment`", "you decide in Lab 5b, from the EF_A dictionary", "`efYYYYa`"],
            ],
          },
        },
        "Readable names are not cosmetic. A {{text-to-sql|text-to-SQL}} agent that sees `completions.awards_total` writes better queries than one that sees `CTOTALT`, and so does a student on their first day. Codes stay codes in the curated layer, but Module 6 adds lookup tables so each can be joined to its label.",
        {
          callout:
            "If you cannot say in one sentence what one row of a table means, the table is not ready. Mixed grains, such as totals and detail rows in the same table without a flag, are the most common source of wrong sums.",
          tone: "warning",
          title: "State the grain",
        },
      ],
      takeaway: "Curated tables have readable names, real types and one clearly stated grain.",
      readings: ["tidy-data"],
    },
    {
      topic: "stacking-years",
      blocks: [
        "IPEDS publishes one file per year. The curated layer stacks them: one `completions` table with a `file_year` column, instead of five tables. That makes trend questions a `GROUP BY`, not a `UNION` of five queries.",
        "The column is named `file_year`, not `year`, on purpose. As Module 2 showed, the year in a file name does not always equal the period the data describe. The data dictionary for each curated table says what period `file_year` means for that table.",
        "Stacking also exposes change. If a variable is missing in one year's file, the build skips that year with a message rather than inventing a value, and the gap is visible in the table.",
      ],
      takeaway: "Stack years into one table with an honestly named year column, and let missing years show as gaps.",
    },
    {
      topic: "sqlite-vs-server",
      blocks: [
        "The kit ships as {{sqlite|SQLite}}: one file, no server, readable from Python's standard library and from free browser tools. A student can download it and query it in minutes, on any operating system.",
        {
          table: {
            head: ["", "SQLite", "SQL Server or PostgreSQL"],
            rows: [
              ["Setup for a student", "None: one file", "Install or connect to a server"],
              ["Sharing", "Attach the file to a release", "Accounts, network access"],
              ["Many simultaneous writers", "Not its strength", "Built for it"],
              ["Size of this dataset", "Comfortable", "Comfortable"],
            ],
          },
        },
        "A server database becomes worth it when many people write at once, when the data must be joined to other institutional systems, or when access must be controlled per user. None of that applies to a read-only teaching dataset. The same SQL loads into SQL Server later if an institution wants it there.",
      ],
      takeaway: "SQLite fits a read-only teaching dataset: no setup, one file to share, plenty of capacity.",
      readings: ["sqlite", "python-sqlite3"],
    },
  ],
};
