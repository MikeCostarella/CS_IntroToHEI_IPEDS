import type { LectureNotesDef } from "../types";

// Module 11 — One dataset, three AI courses. Keep topic ids in step with units/unit4.ts.

export const M11_NOTES: LectureNotesDef = {
  moduleId: "m11",
  intro:
    "These notes go with Module 11 and Lab 11. A dataset becomes shared when courses actually use it, and courses use what comes with good project briefs. The sections below give examples sized to each AI course; Lab 11 asks you to write your own.",
  sections: [
    {
      topic: "good-brief",
      blocks: [
        "A {{project-brief|project brief}} fits on one page and answers four questions:",
        {
          list: [
            "**The question**, in plain English, with the period it covers.",
            "**The tables** in the kit it needs, by name.",
            "**What a good answer looks like**: a number, a ranked list, a model with a stated metric, a written explanation.",
            "**How it will be checked**: a known answer, a baseline to beat, an evaluation set.",
          ],
          ordered: true,
        },
        "A brief that cannot say how it will be checked is not ready. That is usually a sign the question is too vague: \"analyse computing degrees\" becomes \"which Ohio public universities grew computing bachelor's degrees fastest over five years, and is YSU among them?\"",
      ],
      takeaway: "A brief states the question, the tables, the shape of a good answer, and how it will be checked.",
    },
    {
      topic: "ml-briefs",
      blocks: [
        "For Introduction to AI/ML, the kit supports classical machine learning on real institutional data:",
        {
          table: {
            head: ["Kind", "Example brief", "Checked by"],
            rows: [
              ["Regression", "Predict an institution's computing completions from its size, sector and other programs", "Error on held-out institutions versus a simple baseline"],
              ["Classification", "Predict sector from program mix", "Precision and recall per class"],
              ["Clustering", "Find YSU's real peer group from program mix and size", "Whether the clusters make sense to someone who knows the institutions"],
            ],
          },
        },
        "These connect directly to that course's bias and datasheet labs. Which institutions are missing or imputed, and what does that do to the model?",
      ],
      takeaway: "Classical ML briefs use the curated tables as features and are checked against baselines and held-out data.",
      readings: ["aiml-course"],
    },
    {
      topic: "llm-briefs",
      blocks: [
        "For LLM Foundations, two kinds of brief fit well. The first is retrieval: index the IPEDS documentation and dictionaries, and answer questions such as \"what does award level 7 mean in the 2023 Completions file?\" with a citation. The second is evaluation: build sets of questions whose answers are numbers computed from the kit, and measure how often a model, with and without retrieval, gets them right.",
        "Both are possible only because the kit is documented and correct. A retrieval system over the wrong dictionary, or an evaluation set built on double-counted totals, teaches the wrong lesson.",
      ],
      takeaway: "LLM briefs use the documentation for retrieval and the curated layer for checkable numeric evaluation.",
      readings: ["llm-course"],
    },
    {
      topic: "agent-briefs",
      blocks: [
        "For Agentic AI Foundations, the kit is a natural tool for an agent:",
        {
          list: [
            "**A {{text-to-sql|text-to-SQL}} agent** that answers questions about institutions by writing queries against the curated layer.",
            "**A read-only {{mcp|MCP server}}** exposing the database to any agent, with query logging.",
            "**A reconciliation agent** that takes an HEI figure and an IPEDS figure and proposes an explanation, scored against the written explanations from Module 8.",
          ],
        },
        "Each of these is hard in useful ways. Agents mis-handle exactly the traps from Module 6, such as summing total rows or mixing years, which makes them good material for that course's evaluation and safety modules.",
      ],
      takeaway: "Agent briefs build text-to-SQL, a read-only MCP server and a reconciliation agent on the kit.",
      readings: ["agentic-course"],
    },
    {
      topic: "eval-sets",
      blocks: [
        "An {{eval-set|evaluation set}} is a fixed list of questions with known answers. The kit makes building one cheap: write the question, compute the answer with a query you have checked, and store both.",
        {
          code: "question,answer,sql,kit_version\n\"How many first-major computing bachelor's degrees did YSU award in file year 2023?\",<n>,\"SELECT SUM(awards_total) FROM completions WHERE ...\",1.0",
          title: "One row of an evaluation set",
          note: "Keep the SQL and the kit version with each answer, so the set can be regenerated when the kit changes.",
        },
        "Include questions that hit the traps on purpose: one where summing the total row would double the answer, one that needs the first-major filter, one where the file year and the data year differ. Those are where agents fail.",
      ],
      takeaway: "Build evaluation sets from checked queries against a pinned kit version, and include questions that hit the known traps.",
    },
    {
      topic: "read-only",
      blocks: [
        "Any agent given access to the kit gets read-only access by default. The data is public, so the risk is not exposure; it is an agent changing or deleting tables that other students and courses depend on, or running queries that never finish.",
        {
          code: 'import sqlite3\ncon = sqlite3.connect("file:ipeds.sqlite?mode=ro", uri=True)',
          title: "Open SQLite read-only",
          note: "Writes then fail with an error instead of changing the file.",
        },
        "This is the same principle Agentic AI Foundations teaches for any tool: give an agent the least access the task needs, and log what it does.",
      ],
      takeaway: "Agents get read-only access to the kit, with their queries logged.",
    },
  ],
};
