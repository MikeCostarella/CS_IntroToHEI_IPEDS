import type { LectureNotesDef } from "../types";

// Module 4 — A download you can re-run. Keep topic ids in step with units/unit2.ts.

export const M04_NOTES: LectureNotesDef = {
  moduleId: "m04",
  intro:
    "These notes go with Module 4 and Lab 4, where `01_download_ipeds.py` fetches five years of files. The theme is reproducibility: next year someone else will need to fetch the new files, and they should be able to do it by running one command and reading one file.",
  sections: [
    {
      topic: "complete-files",
      blocks: [
        "IPEDS publishes each survey file for each year as a {{complete-data-file|complete data file}}: a zip holding a CSV of every variable, plus a separate zip holding its {{data-dictionary|data dictionary}}. Files are available from the IPEDS Data Center by year and survey, and they follow a predictable naming pattern, which is what makes a script possible.",
        {
          code: 'BASE = "https://nces.ed.gov/ipeds/datacenter/data/"\n# HD2023.zip       the data\n# HD2023_Dict.zip  its dictionary',
          title: "The pattern the download script relies on",
          note: "If NCES changes the pattern, the script reports MISS lines instead of crashing, and you update one constant.",
        },
        "NCES also publishes a whole collection year as a single Microsoft Access database. That is convenient for browsing, but a script over individual CSV files is easier to read, to diff, and to run on any machine, so the kit is built from the CSVs.",
      ],
      takeaway: "Each IPEDS survey file comes as a zipped CSV plus a zipped dictionary, named predictably enough to script.",
      readings: ["complete-files", "ipeds-use"],
    },
    {
      topic: "starting-files",
      blocks: [
        "The kit starts with three survey files, chosen because together they answer the most common first questions:",
        {
          table: {
            head: ["File", "Survey", "Grain", "Answers"],
            rows: [
              ["`HD{y}`", "Institutional characteristics (directory)", "One row per institution", "Who is this? Where, what sector, public or private?"],
              ["`C{y}_A`", "Completions", "Institution × program × major number × award level", "What degrees, in which programs, how many?"],
              ["`EF{y}A`", "Fall enrollment", "Institution × level × student category", "How many students on the fall census date?"],
            ],
          },
        },
        "Adding a survey later is one line in the `FILES` list. Removing one is harder, because some course may already query it. That asymmetry is why the starting list is small and every addition is justified in a comment.",
      ],
      takeaway: "Start with directory, completions and fall enrollment; add surveys deliberately, because removing them later breaks someone.",
      check: [
        {
          q: "A brief in Module 11 needs graduation rates. What changes in the kit?",
          a: "Add the graduation-rate file to `FILES` with a comment saying why, curate it in Module 5's style, add checks, and note the new table in the changelog.",
        },
      ],
    },
    {
      topic: "choosing-years",
      blocks: [
        "How many years? Enough to see a trend and to survive one odd year, but few enough that definitions have not drifted too far. Five recent years is the course default. One year cannot show change; two can mislead; ten will cross at least one major definition change (Module 6).",
        "Scope is a related decision: all U.S. institutions, or Ohio only? Five years of every institution is still small for {{sqlite|SQLite}}, and it lets students compare YSU with any peer, in any state. So the kit keeps everything and filters in queries. A filter is easy to add later; data you never downloaded is impossible to recover in a query.",
        {
          callout:
            "Write the years and the scope in `SCOPE.md`, with the reason for each. The next maintainer will want to know whether five years was a decision or an accident.",
          tone: "tip",
          title: "Decisions belong in a file",
        },
      ],
      takeaway: "Default to five recent years of every institution, filter in queries, and write the decision down.",
    },
    {
      topic: "idempotent",
      blocks: [
        "A download script will be run more than once: after a network failure, after adding a year, after a new release. It should be {{idempotent|idempotent}}: running it again leaves things in the same state, fetching only what is missing.",
        {
          code: 'target = RAW / f"{name}{suffix}"\nif target.exists():\n    print(f"have  {target.name}")\n    continue',
          title: "examples/01_download_ipeds.py — skip what you already have",
        },
        "One consequence: to pick up a *revised* file under the same name, you must delete the old zip first. That is deliberate. Replacing data should be a choice someone makes, not a side effect of rerunning a script.",
      ],
      takeaway: "Make the download skip files it already has, so rerunning it is always safe.",
      check: [
        {
          q: "The final release of a year comes out under the same file name. Will rerunning the script pick it up?",
          a: "No. The script sees the existing zip and skips it. Delete that zip first, then rerun, and record the change in the changelog.",
        },
      ],
    },
    {
      topic: "missing-files",
      blocks: [
        "Some requests will fail: a year not released yet, a file renamed, a survey that did not exist in an early year. The script prints a MISS line and carries on rather than stopping, because one missing file should not prevent the other fourteen from downloading.",
        "Every MISS needs an explanation before the build continues. Look up the year in the Data Center and record one of three outcomes: the file is not released yet, it has a different name that year (update the pattern), or it does not exist for that year (narrow the scope).",
      ],
      takeaway: "A missing file is information to explain, not an error to hide or a crash to fix.",
    },
  ],
};
