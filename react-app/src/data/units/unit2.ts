import type { UnitDef } from "../types";

// Unit II — from downloaded files to a database that passes its own checks.

export const UNIT2: UnitDef = {
  number: 2,
  title: "Building the Database",
  theme:
    "A download script, a two-layer schema, honest handling of codes and gaps, and the checks the database must pass before anyone uses it.",
  modules: [
    {
      id: "m04",
      number: 4,
      unit: 2,
      title: "A download you can re-run",
      subtitle: "Scripted acquisition, scope decisions, and a record of what was fetched",
      overview: [
        "The Lab 2 download took clicks you cannot replay. The shared dataset needs a download anyone can repeat next year, when new files appear and old ones are revised. That means a script, a list of the files it fetches, and a decision about scope written down where the next maintainer will find it.",
        "Scope is a real decision. Every U.S. institution for five years is small enough for SQLite and lets students compare YSU with anyone. Ohio only is smaller and simpler but rules out out-of-state peers. This course keeps everything and filters in queries, because the filter is easy to add later and impossible to undo.",
      ],
      topics: [
        { id: "complete-files", text: "Complete data files: one zip per survey file per year, plus a dictionary" },
        { id: "starting-files", text: "Which survey files to start with: HD, C_A, EF_A" },
        { id: "choosing-years", text: "Choosing years, and why at least five" },
        { id: "idempotent", text: "Idempotent downloads: re-running fetches only what is missing" },
        { id: "missing-files", text: "A missing file is information, not a crash" },
      ],
      excerpts: [
        {
          title: "The file list is the scope decision",
          file: "examples/01_download_ipeds.py",
          code: `FILES = [
    "HD{y}",     # Institutional characteristics: one row per institution
    "C{y}_A",    # Completions: awards by program (CIP code) and award level
    "EF{y}A",    # Fall enrollment: headcount by level, race/ethnicity, gender
]`,
          note: "Adding a survey to the dataset is one line here. Removing one is a conversation with every course that queries it.",
        },
        {
          title: "Skip what you already have",
          file: "examples/01_download_ipeds.py",
          code: `target = RAW / f"{name}{suffix}"
if target.exists():
    print(f"have  {target.name}")
    continue`,
        },
      ],
      resources: ["complete-files", "release-schedule"],
      labs: [
        {
          id: "4",
          title: "Fetch five years",
          hours: "~2 h",
          tasks: [
            "Run 01_download_ipeds.py for five recent years.",
            "Read every MISS line. For each, find out from the Data Center whether the file has a different name that year or does not exist yet.",
            "Add one survey file to FILES that serves a question from your Lab 1 list, and justify it in a comment.",
            "Write SCOPE.md: which years, which files, all institutions or a subset, and why.",
          ],
          deliverable: "A clean run with every MISS explained, and SCOPE.md.",
        },
      ],
    },

    {
      id: "m05",
      number: 5,
      unit: 2,
      title: "Raw layer, curated layer",
      subtitle: "Keep what was delivered; publish what people should query",
      overview: [
        "The database has two layers. The raw layer is one table per IPEDS file, loaded exactly as delivered, with every value kept as text. It is never edited, so any curated number can be traced back to it. The curated layer is a small set of typed tables with readable column names, every year stacked into one table, and one clearly stated grain: one row per institution per year, or one row per institution, year, program, major and award level.",
        "The AI courses query the curated layer. A student writing a text-to-SQL agent in Agentic AI Foundations should see institution.name and completions.awards_total, not INSTNM and CTOTALT. When a curated column is wrong, the raw layer is how you find out why.",
      ],
      topics: [
        { id: "raw-tables", text: "Raw tables: as delivered, never edited" },
        { id: "revised-files", text: "Revised files (_rv) and recording which version was loaded" },
        { id: "load-log", text: "The load log: what came from where, and when" },
        { id: "curated-tables", text: "Curated tables: readable names, real types, one grain each" },
        { id: "stacking-years", text: "Stacking years, and a file_year column that says what it is" },
        { id: "sqlite-vs-server", text: "Why SQLite is the default, and when SQL Server is worth it" },
      ],
      excerpts: [
        {
          title: "Prefer the revised file, and say which one you used",
          file: "examples/02_build_database.py",
          code: `def pick_csv(zf: zipfile.ZipFile) -> tuple[str, bool]:
    names = [n for n in zf.namelist() if n.lower().endswith(".csv")]
    revised = [n for n in names if n.lower().endswith("_rv.csv")]
    return (revised or names)[0], bool(revised)`,
        },
        {
          title: "The curated grain, written into the schema",
          file: "examples/02_build_database.py",
          code: `CREATE TABLE completions (
    unitid       INTEGER NOT NULL,
    file_year    INTEGER NOT NULL,
    cipcode      TEXT    NOT NULL,  -- '11.0701'; '99' is the grand-total row
    major_number INTEGER,           -- 1 = first major, 2 = second major
    award_level  INTEGER,           -- code: see the C_A dictionary
    awards_total INTEGER
);`,
          note: "cipcode stays TEXT. It looks like a number and is not one.",
        },
      ],
      resources: ["sqlite", "python-sqlite3", "tidy-data"],
      labs: [
        {
          id: "5a",
          title: "Build it",
          hours: "~2 h",
          tasks: [
            "Run 02_build_database.py and open the result in a SQLite browser.",
            "Query load_log. Note which files were revised and which were not.",
            "Write the query from Lab 2 against the curated layer and confirm it gives the same count you got by hand. If it does not, find out why before moving on.",
          ],
          deliverable: "The matching count, or a written explanation of the difference.",
        },
        {
          id: "5b",
          title: "Curate fall enrollment",
          hours: "~3 h",
          tasks: [
            "Using the EF_A dictionary, decide what grain a curated fall_enrollment table should have.",
            "Add the table to build_curated(), with readable column names and types.",
            "Handle years where a column you need is missing the same way completions does: skip and say so.",
            "Document the table's grain and every column in DATA_DICTIONARY.md.",
          ],
          deliverable: "A curated fall_enrollment table and its DATA_DICTIONARY.md entry.",
        },
      ],
    },

    {
      id: "m06",
      number: 6,
      unit: 2,
      title: "Codes, gaps, and change over time",
      subtitle: "Blank is not zero, a code is not a label, and 2019 is not 2023",
      overview: [
        "Most mistakes made with IPEDS are not programming errors. They are reading errors: treating a blank as zero, averaging a code as if it were a quantity, summing the grand-total row along with the detail rows, or comparing two years without noticing a variable was redefined between them.",
        "Each of those has a defence. Blanks load as NULL and stay NULL. Codes are joined to their labels from the dictionary, never interpreted from memory. Total rows are excluded by rule. And any comparison across years starts by checking that the variable means the same thing in both. IPEDS also flags imputed values, filled in by NCES for institutions that did not respond, and the dictionary explains how. An AI model trained on imputed values without knowing it is learning NCES's estimate, not the institution's report.",
      ],
      topics: [
        { id: "null-zero-na", text: "NULL, zero, and not applicable" },
        { id: "codes-labels", text: "Code values and their labels" },
        { id: "imputation", text: "Imputation flags, and what they do to a model" },
        { id: "total-rows", text: "Subtotal and grand-total rows that must not be double-counted" },
        { id: "changing-variables", text: "Variables that are added, renamed or redefined between years" },
        { id: "cip-revisions", text: "CIP revisions: when a program's code changes but the program does not" },
      ],
      excerpts: [
        {
          title: "A blank stays a blank",
          file: "examples/02_build_database.py",
          code: `# Blank stays NULL. A blank is not a zero -- Module 6.
batch.append([v.strip() or None for v in row])`,
        },
        {
          title: "When a column is missing, say so",
          file: "examples/02_build_database.py",
          code: `missing = needed - columns(con, table)
if missing:
    # Variables change across years. Say so; do not guess.
    print(f"SKIP  {table}: no column(s) {sorted(missing)}")
    continue`,
        },
      ],
      resources: ["complete-files", "cip"],
      labs: [
        {
          id: "6",
          title: "Code tables and traps",
          hours: "~3 h",
          tasks: [
            "From the dictionaries, build lookup tables for award level, control and sector, and load them into the curated layer.",
            "Write a query that double-counts by including the CIP 99 row, and one that does not. Record both results.",
            "Find one variable whose definition or codes changed within your five years. Document the change and what it means for a trend line.",
            "Find how imputed values are flagged for one survey file, and count how many of your rows are imputed.",
          ],
          deliverable: "Three lookup tables, the double-count demonstration, and TRAPS.md with the change and the imputation count.",
        },
      ],
      callouts: [
        {
          kind: "honest",
          title: "Do not take the codes from this site",
          body:
            "The example scripts use award level 5 for bachelor's degrees and CIP 99 for the grand total. Confirm both in the dictionary for each year you load. This course teaches the habit of checking; it is not itself the authority.",
        },
      ],
    },

    {
      id: "m07",
      number: 7,
      unit: 2,
      title: "Tests the data must pass",
      subtitle: "Quality checks that gate a release",
      overview: [
        "A dataset other courses depend on needs the same protection as code other people depend on: tests that run every time it is rebuilt, and a rule that a failing test stops the release. The checks are simple. Every load produced rows. Keys are unique. Every child row has a parent. Counts are never negative. Detail adds up to totals.",
        "Checks come in two strengths. A FAIL means the build is wrong and must not ship. A WARN means the data says something surprising, and the response is to read the dictionary, not to patch the number. Knowing which is which is most of the skill.",
      ],
      topics: [
        { id: "integrity-checks", text: "Row counts, key uniqueness, and referential integrity" },
        { id: "range-checks", text: "Range checks: no negative counts, plausible totals" },
        { id: "detail-totals", text: "Detail-to-total checks, and why a mismatch may be legitimate" },
        { id: "published-tables", text: "Checking a curated figure against a published IPEDS table" },
        { id: "fail-warn", text: "FAIL versus WARN, and exit codes that stop a release" },
      ],
      excerpts: [
        {
          title: "One row per institution per year",
          file: "examples/03_check_quality.py",
          code: `check("duplicate (unitid, file_year) in institution",
      one(con, """SELECT COUNT(*) FROM (
                    SELECT unitid, file_year FROM institution
                    GROUP BY 1, 2 HAVING COUNT(*) > 1)"""))`,
        },
        {
          title: "A failing check stops the release",
          file: "examples/03_check_quality.py",
          code: `sys.exit(1 if failures else 0)`,
          note: "Module 12 runs this in GitHub Actions. A red check means no release.",
        },
      ],
      resources: ["ipeds-use"],
      labs: [
        {
          id: "7",
          title: "Make it pass, honestly",
          hours: "~3 h",
          tasks: [
            "Run 03_check_quality.py. For every FAIL, fix the build. For every WARN, explain it from the dictionary.",
            "Add a check for your fall_enrollment table from Lab 5b.",
            "Add one known-total check: pick a published IPEDS figure for YSU and assert the curated layer reproduces it.",
            "Delete data/ and rebuild from nothing. Every check must give the same result.",
          ],
          deliverable: "A clean run from an empty data/ folder, and CHECKS.md explaining each WARN.",
        },
      ],
      checkpoint:
        "The database builds from an empty folder with three commands, passes every FAIL-level check, and every WARN has a written explanation.",
    },
  ],
};
