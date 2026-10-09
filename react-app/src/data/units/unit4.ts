import type { UnitDef } from "../types";

// Unit IV — package the dataset, hand it to the courses, release it.

export const UNIT4: UnitDef = {
  number: 4,
  title: "The Kit and the Courses",
  theme:
    "Packaging the dataset so a student is querying it in the first hour, writing the project briefs the AI courses use, and releasing version 1.0.",
  modules: [
    {
      id: "m10",
      number: 10,
      unit: 4,
      title: "Packaging the project kit",
      subtitle: "What a student downloads, and what they do in the first hour",
      overview: [
        "The kit is what the AI courses link to. It has five parts: the SQLite database, CSV extracts of the curated tables for anyone who prefers pandas, a data dictionary for the curated layer, the datasheet, and a first-hour script that answers one real question. If a student cannot get from download to a correct answer in an hour, the kit is not finished.",
        "Each release gets a version number and a changelog. When a course says its projects use kit 1.2, every student gets the same numbers, and when the data changes, the change is written down.",
      ],
      topics: [
        { id: "five-parts", text: "The five parts of the kit" },
        { id: "csv-extracts", text: "CSV extracts, and keeping codes as text" },
        { id: "orientation", text: "A one-page orientation: what is in it, what is not, the traps" },
        { id: "first-hour", text: "The first-hour script" },
        { id: "versioning", text: "Semantic versions and a changelog for data" },
        { id: "releases", text: "GitHub Releases as the distribution point" },
      ],
      excerpts: [
        {
          title: "The first-hour question",
          file: "examples/04_first_question.py",
          code: `WHERE c.unitid IN ({marks})
  AND c.cipcode LIKE '11.%'          -- CIP family 11: computer and information sciences
  AND c.major_number = 1
  AND c.award_level = ?`,
          note: "Every trap from Module 6 is handled in four lines: text CIP codes, first major only, the award-level code, and no total rows.",
        },
        {
          title: "Match by name, then look at what matched",
          file: "examples/04_first_question.py",
          code: `# Name patterns, not UNITIDs, so the match is visible. Print what matched and
# check it -- "Kent State" alone matches several campuses.`,
        },
      ],
      resources: ["github-releases", "semver"],
      labs: [
        {
          id: "10",
          title: "Assemble the kit",
          hours: "~3 h",
          tasks: [
            "Add an export step that writes each curated table to CSV.",
            "Write ORIENTATION.md: one page, covering contents, scope, the three biggest traps, and where to get help.",
            "Hand the kit to someone who has not taken this course. Time them from download to running 04_first_question.py.",
            "Fix whatever slowed them down.",
          ],
          deliverable: "The assembled kit, ORIENTATION.md, and the timed trial with what you changed.",
        },
      ],
    },

    {
      id: "m11",
      number: 11,
      unit: 4,
      title: "One dataset, three AI courses",
      subtitle: "Project briefs the AI courses can use as-is",
      overview: [
        "A dataset becomes shared when the courses actually use it. That takes project briefs: a question, the tables it needs, what a good answer looks like, and how it will be checked. Each course gets briefs sized to what its students can do.",
        "Introduction to AI/ML uses the data for regression, classification and clustering, such as predicting graduation rates from institutional characteristics or finding YSU's real peer group. LLM Foundations uses the IPEDS documentation for retrieval and builds evaluation sets from questions with numeric answers that can be checked. Agentic AI Foundations builds a text-to-SQL agent over the curated layer, a read-only MCP server, and the reconciliation agent from Module 8.",
      ],
      topics: [
        { id: "good-brief", text: "What makes a good project brief" },
        { id: "ml-briefs", text: "Machine-learning briefs: regression, classification, clustering" },
        { id: "llm-briefs", text: "LLM briefs: retrieval over documentation, numeric evaluation sets" },
        { id: "agent-briefs", text: "Agent briefs: text-to-SQL, a read-only MCP server, reconciliation" },
        { id: "eval-sets", text: "Evaluation sets with ground truth from the curated layer" },
        { id: "read-only", text: "Read-only access as the default for any agent" },
      ],
      resources: ["aiml-course", "llm-course", "agentic-course"],
      labs: [
        {
          id: "11",
          title: "Write the briefs",
          hours: "~3 h",
          tasks: [
            "Return to QUESTIONS.md from Lab 1. Revise each question now that you know what the data holds.",
            "Write one project brief per AI course: the question, the tables, the expected kind of answer, and how it will be checked.",
            "For the agent brief, write ten questions with answers computed from the curated layer. That is its evaluation set.",
            "Have an instructor or classmate check that each brief can be done with the kit as released.",
          ],
          deliverable: "Three briefs in PROJECTS.md and a ten-question evaluation set with answers.",
        },
      ],
    },

    {
      id: "m12",
      number: 12,
      unit: 4,
      title: "Release 1.0",
      subtitle: "Tag it, rebuild it from scratch, hand it over",
      overview: [
        "The capstone is a release. The quality checks run in GitHub Actions and block the release when they fail. The kit is tagged 1.0 with a changelog. And someone other than you rebuilds it from an empty folder by following the README, without help.",
        "Then it is handed over. The kit needs a maintainer, a schedule for adding each new IPEDS release, and a place for the AI courses to report problems. Writing that down is the last deliverable, because a shared dataset nobody maintains stops being shared within a year.",
      ],
      topics: [
        { id: "ci-build", text: "Running the build and checks in CI" },
        { id: "tagging", text: "Tagging a release and writing the changelog" },
        { id: "cold-rebuild", text: "The cold rebuild: a stranger, the README, and nothing else" },
        { id: "maintenance", text: "Maintenance: an annual update, an owner, an issue tracker" },
      ],
      labs: [
        {
          id: "12a",
          title: "Ship it",
          hours: "~3 h",
          tasks: [
            "Add a workflow that downloads, builds and runs 03_check_quality.py, and fails on any FAIL.",
            "Tag release 1.0 and attach the database, the CSV extracts, ORIENTATION.md, DATA_DICTIONARY.md and DATASHEET.md.",
            "Write CHANGELOG.md.",
          ],
          deliverable: "A tagged GitHub release with every part of the kit attached, and a passing workflow.",
        },
        {
          id: "12b",
          title: "Cold rebuild and handoff",
          hours: "~2 h",
          tasks: [
            "Watch someone rebuild the kit from the README alone. Do not help. Write down every place they got stuck.",
            "Fix the README until a second person gets through without getting stuck.",
            "Write MAINTAINING.md: who owns the kit, when each IPEDS release is added, and how courses report problems.",
          ],
          deliverable: "Two rebuild reports, the revised README, and MAINTAINING.md.",
        },
      ],
      checkpoint:
        "Capstone: kit 1.0 is released, rebuilt by someone else without help, and has a named maintainer and an update schedule.",
    },
  ],
};
