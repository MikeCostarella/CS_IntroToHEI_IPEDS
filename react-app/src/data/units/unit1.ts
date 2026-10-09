import type { UnitDef } from "../types";

// Unit I — what the two sources are, before anything is built from them.

export const UNIT1: UnitDef = {
  number: 1,
  title: "The Two Sources",
  theme:
    "Why one shared dataset, what IPEDS is, and what Ohio's HEI system is. Read the sources before building anything from them.",
  modules: [
    {
      id: "m01",
      number: 1,
      unit: 1,
      title: "Why one shared dataset",
      subtitle: "What the AI courses need from their data, and why this data fits",
      overview: [
        "Every AI course needs data for its projects. When each course picks its own, students spend the first week of every project learning a new domain and cleaning a new mess, and the course never gets to compound. One shared dataset, used from the first machine-learning lab to the agentic capstone, means the second project starts where the first one ended.",
        "Higher-education data fits for three reasons. It is real: institutions report it to the federal government and the state every year. It is familiar: students know what enrollment, a major, and graduation mean. And it is hard in useful ways: codes instead of labels, definitions that change, and two official sources that report the same institution differently. Those are the problems AI systems trip on in practice.",
      ],
      topics: [
        "What a shared project dataset buys a course sequence",
        "IPEDS and HEI in one paragraph each",
        "Aggregate institutional data, not student records",
        "The deliverable: a versioned project kit, not a folder of downloads",
        "How each AI course will use it",
      ],
      resources: ["college-navigator", "ipeds-home"],
      labs: [
        {
          id: "1",
          title: "Ask the questions first",
          hours: "~2 h",
          tasks: [
            "Look up YSU in College Navigator and write down five facts it shows: enrollment, programs, graduation rate, cost, and one of your choice.",
            "Write three questions about YSU or its peers that you would want an AI project to answer.",
            "For each question, guess which source would hold the answer: IPEDS, HEI, both, or neither.",
            "Keep the list. Module 11 comes back to it.",
          ],
          deliverable: "QUESTIONS.md: three questions, each with a guessed source and why.",
        },
      ],
      callouts: [
        {
          kind: "scope",
          title: "Not a gate",
          body:
            "This course builds the dataset. It is not a prerequisite the AI courses enforce. Students in those courses can start from the released kit; this course is for whoever builds and maintains it, and for anyone who wants to know what is under it.",
        },
      ],
    },

    {
      id: "m02",
      number: 2,
      unit: 1,
      title: "IPEDS from the inside",
      subtitle: "Survey components, UNITIDs, file years, release types, and dictionaries",
      overview: [
        "IPEDS, the Integrated Postsecondary Education Data System, is a set of annual surveys run by the National Center for Education Statistics. Every college, university and technical school that takes part in federal student financial aid programs must respond. The data are aggregate: counts and totals per institution, never records about individual students.",
        "Three things trip up every new user. First, the year in a file name is not always the period the data describe; completions in C2023_A cover awards made in the twelve months before that collection. Second, each collection is released as provisional data and revised a year later as final data, and the two can differ. Third, categorical values are stored as codes, and the meaning of each code lives in the dictionary that ships alongside the file.",
      ],
      topics: [
        "Survey components and the fall, winter and spring collections",
        "UNITID: the key that joins every IPEDS file",
        "File names, collection years, and data years",
        "Provisional, revised and final releases",
        "CIP codes: how programs are classified, and why family 11 is computing",
        "Data dictionaries: codes, labels, and business rules",
      ],
      resources: ["ipeds-use", "complete-files", "release-schedule", "timing-blog", "cip"],
      labs: [
        {
          id: "2",
          title: "One year, by hand",
          hours: "~3 h",
          tasks: [
            "From the IPEDS Data Center, download one year's HD (institutional characteristics) and C_A (completions) files and their dictionaries.",
            "Find YSU's UNITID in the HD file. Find two peer institutions and record theirs.",
            "In the C_A dictionary, find the codes for award level, the meaning of MAJORNUM, and what CIP code 99 represents.",
            "Using a spreadsheet only, count YSU's bachelor's degrees in CIP family 11 for that year.",
            "Write down which academic year those awards were made in, and cite the dictionary or documentation that says so.",
          ],
          deliverable:
            "A one-page note: the UNITIDs, the three dictionary findings with citations, and the count with its time period.",
        },
      ],
      callouts: [
        {
          kind: "warning",
          title: "Spreadsheets eat CIP codes",
          body:
            "Open a C_A file in Excel and 11.0700 becomes 11.07, and leading zeros vanish from codes like 01.0000. Doing this once by hand is the point of the lab. After this, the build script reads every code as text.",
        },
      ],
    },

    {
      id: "m03",
      number: 3,
      unit: 1,
      title: "HEI: Ohio's state system",
      subtitle: "What it holds, who can see what, and what this course uses",
      overview: [
        "The Higher Education Information system is the Ohio Department of Higher Education's relational database for public colleges and universities in the state. Institutions submit student enrollment, course, financial aid, personnel, facilities and finance data, and the state publishes annual reports from it on enrollment, degrees, student progress, costs and outcomes.",
        "The underlying files are student-level. Researchers can request them through the Ohio Longitudinal Data Archive, but only with a data-sharing agreement and IRB approval. That is the right rule, and it settles this course's scope: the shared dataset uses HEI's published reports, entered with a citation for every figure. Anything beyond that goes through the institution's data office, not through a course.",
      ],
      topics: [
        "What HEI collects and who submits it",
        "Published reports versus restricted student-level files",
        "The Ohio Longitudinal Data Archive and why access is controlled",
        "How HEI and IPEDS overlap, and where they cannot be compared",
        "Recording a figure from a report so someone else can find it again",
      ],
      resources: ["odhe", "hei-catalog", "lakeland-ir"],
      labs: [
        {
          id: "3",
          title: "Find it in the reports",
          hours: "~2 h",
          tasks: [
            "Find a published HEI report that gives YSU's degrees awarded for a recent year.",
            "Copy examples/data/hei_figures.example.csv to hei_figures.csv and enter the figure: report name, period, value, URL, and the date you retrieved it.",
            "Write down the report's definition of the period it covers, in its own words.",
            "Add a second figure of your choice, with the same detail.",
          ],
          deliverable: "hei_figures.csv with two fully cited rows, and the period definitions.",
        },
      ],
      callouts: [
        {
          kind: "honest",
          title: "Reports move",
          body:
            "State report pages get reorganised and links break. That is why each row records the retrieval date and the report's own title, not just a URL. A figure that cannot be traced back is not part of the dataset.",
        },
      ],
    },
  ],
};
