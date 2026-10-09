import type { LectureNotesDef } from "../types";

// Module 3 — HEI: Ohio's state system. Keep topic ids in step with units/unit1.ts.

export const M03_NOTES: LectureNotesDef = {
  moduleId: "m03",
  intro:
    "These notes go with Module 3 and Lab 3. HEI is the source you can see least of, so most of this module is about boundaries: what the system holds, which parts are public, how restricted access works, and how to record a figure from a published report so it can be trusted later.",
  sections: [
    {
      topic: "what-hei-holds",
      blocks: [
        "{{hei}} is the Ohio Department of Higher Education's relational database of submissions from Ohio's public colleges and universities. Institutions report on students, enrollment, courses, financial aid, personnel, facilities and finances, on a regular schedule.",
        "From it, the state publishes recurring reports on enrollment, student preparation and progress, degrees awarded, employment outcomes, tuition and aid, and costs per student. Institutions also use it among themselves: Ohio universities benchmark course loads, space use and costs against each other with HEI data.",
        "For this course, HEI matters for two reasons. It covers some Ohio-specific measures IPEDS does not, and it reports the same institutions IPEDS does, under different definitions. The second point is what makes it so useful for teaching reconciliation.",
      ],
      takeaway: "HEI is Ohio's own detailed system for its public institutions; the state publishes reports from it.",
      check: [
        {
          q: "Does HEI cover private Ohio colleges?",
          a: "It is built around Ohio's public institutions. For private colleges, and for any institution outside Ohio, use IPEDS.",
        },
      ],
      readings: ["odhe", "lakeland-ir"],
    },
    {
      topic: "reports-vs-files",
      blocks: [
        "There are two very different things called HEI data:",
        {
          table: {
            head: ["", "Published reports", "Underlying files"],
            rows: [
              ["Level", "Aggregate tables by institution, sector, year", "Student-level records, by term"],
              ["Who can see them", "Anyone", "Approved researchers only"],
              ["Used in this course", "Yes, figure by figure, with citations", "No"],
            ],
          },
        },
        "The shared dataset only ever uses the reports. Each HEI figure enters the kit by hand, with the report it came from, so the dataset never contains anything that is not already public.",
      ],
      takeaway: "The course uses HEI's public reports, never its student-level files.",
      check: [
        {
          q: "A classmate has access to student-level HEI data through a research project. Can it go into the kit?",
          a: "No. It was granted for that research under its own agreement, and the kit is aggregate public data only. Module 9 makes this a written rule.",
        },
      ],
    },
    {
      topic: "olda-access",
      blocks: [
        "Researchers who need the student-level files request them through the {{olda|Ohio Longitudinal Data Archive}}, housed at Ohio State's Center for Human Resources Research. Access requires a data-sharing agreement with the Ohio Education Research Center and approval from an institutional review board (IRB). Once approved, HEI records can be linked to other state data, such as K-12 and workforce records, under a pseudo-identifier rather than a name.",
        "This is the right design. Student records are sensitive, and the controls exist so that research can happen without exposing anyone. It also explains this course's scope: a self-paced course cannot, and should not, depend on an IRB approval.",
        {
          callout:
            "The point of this topic is not that HEI is hard to get. It is that well-run data systems separate what can be published from what must be protected, and that a good teaching dataset lives entirely on the public side.",
          tone: "aside",
          title: "The lesson in the restriction",
        },
      ],
      takeaway: "Student-level HEI data is available only to approved researchers under an agreement and IRB approval, so it is out of scope here.",
      readings: ["hei-catalog"],
    },
    {
      topic: "overlap",
      blocks: [
        "HEI and IPEDS both report Ohio's public institutions, so for YSU you can often find the \"same\" number in each: degrees awarded, fall headcount, a graduation rate. They frequently do not match.",
        "That is not a sign that one is wrong. The two systems were built for different purposes and use different definitions, periods and dates. HEI may count by fiscal year where IPEDS counts July to June; it may use a different census date; it may group programs or students differently. Some HEI measures, such as Ohio-specific course or transfer reporting, have no IPEDS counterpart at all.",
        {
          list: [
            "**Comparable with care:** headcounts, degrees awarded, some rates. Check definitions first.",
            "**Not comparable:** measures that exist only in one system, or that use incompatible cohorts.",
          ],
        },
        "Module 8 turns this into a method. For now, the habit to build is simple: never put an HEI figure next to an IPEDS figure without writing down the definition and period of each.",
      ],
      takeaway: "HEI and IPEDS overlap for Ohio's public institutions but use different definitions, so matching numbers are the exception.",
      check: [
        {
          q: "HEI shows YSU awarded slightly more bachelor's degrees in a year than IPEDS does. List two things that could explain it before anyone says either is wrong.",
          a: "A different counting period (fiscal versus July–June), different treatment of double majors, a revision in one source but not the other, or different rules on which awards count. Module 8 tests these against documentation.",
        },
      ],
    },
    {
      topic: "citing-figures",
      blocks: [
        "Because HEI figures enter the kit by hand, each one must be recorded so that someone else can find it again and check it. The template `hei_figures.example.csv` has a column for every piece of that trail:",
        {
          code: "measure,unitid,hei_report,hei_period,hei_value,ipeds_file_year,source_url,retrieved_on",
          title: "examples/data/hei_figures.example.csv — the header",
        },
        {
          list: [
            "**hei_report**: the report's own title, exactly as published.",
            "**hei_period**: the period in the report's own words, such as \"FY2023\" or \"Fall 2023\".",
            "**source_url** and **retrieved_on**: where you found it and when. State report pages get reorganised; the date tells a later reader which version you saw.",
          ],
        },
        {
          callout: "A figure that cannot be traced back to a named report is not part of the dataset, however plausible it looks.",
          tone: "warning",
          title: "No citation, no figure",
        },
      ],
      takeaway: "Record every HEI figure with the report title, the period in the report's words, the URL and the retrieval date.",
      check: [
        {
          q: "Why record the period in the report's words rather than converting it to a year?",
          a: "Converting is an interpretation, and it is exactly where mismatches hide. Keeping the original wording lets Module 8 test what the period really is.",
        },
      ],
    },
  ],
};
