import type { LectureNotesDef } from "../types";

// Module 12 — Release 1.0. Keep topic ids in step with units/unit4.ts.

export const M12_NOTES: LectureNotesDef = {
  moduleId: "m12",
  intro:
    "These notes go with Module 12 and Labs 12a and 12b. The capstone is a release that someone else can rebuild, plus a plan for who keeps it current. A shared dataset nobody maintains stops being shared within a year.",
  sections: [
    {
      topic: "ci-build",
      blocks: [
        "{{ci|Continuous integration}} runs the whole build on every push: download, build, check. If any FAIL-level check fails, the workflow fails, and the release does not happen. The exit code from `03_check_quality.py` (Module 7) is what makes this work.",
        {
          code: "- run: python 01_download_ipeds.py 2019 2023\n  working-directory: examples\n- run: python 02_build_database.py\n  working-directory: examples\n- run: python 03_check_quality.py\n  working-directory: examples",
          title: "The heart of a build-and-check workflow (GitHub Actions steps)",
          note: "Standard-library Python only, so the workflow needs no install step beyond Python itself.",
        },
        "CI also proves something a local build cannot: that the kit builds on a clean machine from nothing but the repository. That is the first half of reproducibility.",
      ],
      takeaway: "CI rebuilds and checks the kit on a clean machine on every push, and a failed check blocks the release.",
    },
    {
      topic: "tagging",
      blocks: [
        "A release is a git tag plus files. Tag the commit that built the kit (`v1.0.0`), create a GitHub Release from the tag, attach every part of the kit, and paste the changelog entry into the release notes.",
        {
          list: [
            "`ipeds.sqlite`",
            "CSV extracts of the curated tables",
            "`ORIENTATION.md`, `DATA_DICTIONARY.md`, `DATASHEET.md`",
            "`CHANGELOG.md`",
          ],
        },
        "From then on, courses link to the release, not to the repository's latest state.",
      ],
      takeaway: "Tag the commit, attach every part of the kit to the release, and have courses link to that release.",
      readings: ["github-releases"],
    },
    {
      topic: "cold-rebuild",
      blocks: [
        "The second half of reproducibility is human. Hand the repository to someone who has not seen it, give them nothing but the README, and watch them rebuild the kit. Do not help. Write down every place they stop, guess, or ask.",
        "Each stopping point is a gap in the README. Fix them, then repeat with a second person. When someone gets through without stopping, the kit is reproducible in the sense that matters: the next maintainer can do it without you.",
        {
          callout:
            "The urge to help during a cold rebuild is strong. Resist it. Every answer you give aloud is one the next maintainer will not have.",
          tone: "tip",
          title: "Do not help",
        },
      ],
      takeaway: "A kit is reproducible when a stranger can rebuild it from the README alone; watch, do not help, then fix the README.",
    },
    {
      topic: "maintenance",
      blocks: [
        "The handoff document, `MAINTAINING.md`, answers three questions:",
        {
          table: {
            head: ["Question", "Example answer"],
            rows: [
              ["Who owns the kit?", "A named instructor or teaching assistant, with a backup"],
              ["When is it updated?", "After each IPEDS provisional and final release, following the published release schedule"],
              ["How are problems reported?", "Issues on the GitHub repository, with the kit version and the query"],
            ],
          },
        },
        "IPEDS releases new data every year, and revises the previous year. Without an owner and a schedule, the kit quietly ages, and the courses using it drift onto different versions. With them, it stays the one dataset everyone can rely on.",
      ],
      takeaway: "Name an owner, tie updates to the IPEDS release schedule, and give courses a place to report problems.",
      readings: ["release-schedule"],
    },
  ],
};
