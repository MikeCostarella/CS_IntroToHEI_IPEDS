import type { LectureNotesDef } from "../types";

// Module 2 — IPEDS from the inside. Keep topic ids in step with units/unit1.ts.

export const M02_NOTES: LectureNotesDef = {
  moduleId: "m02",
  intro:
    "These notes go with Module 2 and Lab 2, where you download one year of IPEDS by hand. They cover the five things every IPEDS user has to understand before trusting a number: how the surveys are organised, how institutions are identified, what a file's year means, which release you have, and where the meaning of each code lives.",
  sections: [
    {
      topic: "survey-components",
      blocks: [
        "IPEDS is not one survey. It is a set of {{survey-component|survey components}}, each asking about one subject, each collected in a fixed season of the year. NCES groups them into three collection periods:",
        {
          table: {
            head: ["Collection", "Components (examples)", "What they describe"],
            rows: [
              ["Fall", "Institutional Characteristics, Completions, 12-month Enrollment", "What the institution is and offers; awards made in the prior academic year; everyone enrolled during that year"],
              ["Winter", "Admissions, Graduation Rates, Outcome Measures, Student Financial Aid, Cost", "Who applied and was admitted; how cohorts finished; aid and price"],
              ["Spring", "Fall Enrollment, Finance, Human Resources, Academic Libraries", "Who was enrolled on the fall census date; money; staff"],
            ],
            caption: "IPEDS collection periods (check the current schedule; components are added and changed)",
          },
        },
        "Each component is published as one or more files per year. This course starts with three: **HD** (institutional directory and characteristics), **C_A** (completions by program and award level) and **EF_A** (fall enrollment). Together they answer most first questions: who the institution is, how many students it has, and what degrees it awards.",
      ],
      takeaway: "IPEDS is a family of surveys collected in fall, winter and spring; the shared dataset starts with directory, completions and fall enrollment.",
      check: [
        {
          q: "You want to know how many students YSU admitted. Which collection period holds that, and is it in the course's starting three files?",
          a: "Winter (Admissions). It is not in HD, C_A or EF_A, so you would add the admissions file to the download list (Lab 4).",
        },
      ],
      readings: ["ipeds-home", "release-schedule"],
    },
    {
      topic: "unitid",
      blocks: [
        "Every institution in IPEDS has a {{unitid|UNITID}}: a six-digit number assigned by NCES. Every IPEDS file carries it, so it is how you join completions to enrollment to institution names. Names are not reliable keys; they change, they are spelled differently across files, and several campuses share a name.",
        "Branch campuses usually have their own UNITID. Kent State's main campus and its regional campuses are separate rows, which matters the first time you search for \"Kent State\" and get several.",
        "You will also meet the {{opeid|OPEID}}, used by the federal student aid system. It is a different number, and one OPEID can cover several campuses, so do not use it to join IPEDS files. It is useful later, when matching IPEDS to other federal data.",
        {
          code: "SELECT unitid, name, city, state\nFROM institution\nWHERE name LIKE 'Kent State%' AND file_year = 2023;",
          title: "Find the UNITIDs before you use them",
          note: "Look at every row this returns before picking one. The first-hour script (Module 10) prints its matches for exactly this reason.",
        },
      ],
      takeaway: "Join IPEDS files on UNITID, never on names, and check which campus a UNITID actually is.",
      check: [
        {
          q: "Why is matching on institution name a bad idea even within one year of IPEDS?",
          a: "Several campuses can share a name prefix, and spelling or punctuation can differ between files. UNITID is the one value guaranteed to identify the same institution in every file.",
        },
      ],
    },
    {
      topic: "file-years",
      blocks: [
        "The year in an IPEDS file name does not always mean what it looks like. There are three different years to keep apart:",
        {
          list: [
            "The **file name year**, as in `C2023_A`.",
            "The {{collection-year|collection year}}: when NCES gathered the data, such as the 2023–24 collection.",
            "The {{data-year|data year}}: the period the numbers describe.",
          ],
        },
        "Completions are the classic trap. Awards are counted for a twelve-month period ending June 30, and reported in the following fall. So the completions in `C2023_A` describe degrees awarded between July 1, 2022 and June 30, 2023. Fall enrollment, by contrast, describes one fall census date. Graduation rates describe a cohort that started years earlier.",
        {
          callout:
            "Every figure the kit publishes carries its period in words: \"awards made July 2022–June 2023\", not just \"2023\". The curated tables keep a `file_year` column and say in the data dictionary what period it means for each table.",
          tone: "tip",
          title: "Write the period down",
        },
      ],
      takeaway: "A file's name year, its collection year and its data year can all differ; always state the period the numbers describe.",
      check: [
        {
          q: "A dashboard compares `C2023_A` completions with `EF2023A` fall enrollment and calls both \"2023\". What periods do they actually describe?",
          a: "Completions: awards from July 2022 to June 2023. Fall enrollment: students enrolled in fall 2023. They overlap only partly, so the label hides a real difference.",
        },
      ],
      readings: ["timing-blog"],
    },
    {
      topic: "release-types",
      blocks: [
        "Each collection is released more than once. The {{provisional-data|provisional release}} comes first, after NCES's quality checks, with values estimated for institutions that did not respond. About a year later comes the {{final-data|final release}}, which includes corrections institutions submitted in the meantime. For the newest year there can also be an earlier preliminary release, without imputed values.",
        "The two releases can differ. If one course's numbers were built from provisional data and another's from final, they will not match, and both will be right about what they loaded. That is why the build records which release each table came from (Module 5).",
        "Revised files are often published inside the same zip as the original, with an `_rv` suffix. The build script prefers the revised file and writes down that it did.",
      ],
      takeaway: "Provisional data come first and can change; final data include revisions. Record which you loaded.",
      check: [
        {
          q: "You built the kit in March using provisional 2023 completions. The final release comes out in the autumn. What should happen to the kit?",
          a: "Rebuild with the final files, rerun the checks, bump the version, and note in the changelog which tables changed (Modules 10 and 12).",
        },
      ],
      readings: ["complete-files", "release-schedule"],
    },
    {
      topic: "cip-codes",
      blocks: [
        "Programs in the Completions file are identified by a {{cip|CIP code}}, from the federal Classification of Instructional Programs. A code has the form `NN.NNNN`: two digits for the family, then more detail.",
        {
          table: {
            head: ["Code", "Level", "Meaning"],
            rows: [
              ["`11`", "Family", "Computer and information sciences and support services"],
              ["`11.07`", "Group", "Computer science"],
              ["`11.0701`", "Detailed program", "Computer science"],
              ["`99`", "Special", "Grand total across all programs (see Module 6)"],
            ],
            caption: "Reading a CIP code",
          },
        },
        "CIP codes look like numbers and are not. `11.0700` as a number becomes `11.07`; `01.0000` loses its leading zero. Store and compare them as text. To get all computing programs, filter on the text prefix: `cipcode LIKE '11.%'`.",
      ],
      takeaway: "A CIP code is text in the form NN.NNNN; family 11 is computing, and the code 99 is a total, not a program.",
      check: [
        {
          q: "Why does `WHERE cipcode LIKE '11.%'` work but `WHERE cipcode >= 11 AND cipcode < 12` is risky?",
          a: "The second treats the code as a number, so it depends on how the database converts text, and it would also match totals or malformed values. The text prefix matches exactly the computing family.",
        },
      ],
      readings: ["cip"],
    },
    {
      topic: "dictionaries",
      blocks: [
        "Every IPEDS data file has a {{data-dictionary|data dictionary}}. It lists every variable, says what it means, gives the label for every code, and states business rules such as which rows are totals. Categorical values in the data files are codes, so without the dictionary an {{award-level|award level}} of `5` means nothing.",
        "Treat the dictionary as the authority, and treat everything else, including this course's notes and any AI assistant, as a guess until checked against it. Dictionaries change between years along with the data.",
        {
          list: [
            "Find the variable list and read every variable you plan to use.",
            "Find the frequency or code-value table for each categorical variable.",
            "Look for notes about totals, imputation and changes from the previous year.",
            "Write down where you found each fact, so someone else can check it.",
          ],
          ordered: true,
        },
      ],
      takeaway: "The data dictionary is the authority for what every code means in a given year; cite it, do not recall it.",
      check: [
        {
          q: "An AI assistant tells you award level 5 means bachelor's degree. What do you do before using that in the kit?",
          a: "Confirm it in the C_A dictionary for each year you load, and record where you found it. The assistant may well be right, but the kit's correctness cannot rest on it.",
        },
      ],
      readings: ["complete-files"],
    },
  ],
};
