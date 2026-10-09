// The search engine is the one piece of this site with logic a type checker
// cannot verify: term matching, an AND requirement across terms, and a ranking
// order. That makes it exactly the kind of code that needs a test, so the
// site tests it — with fixtures small enough to check by eye, and assertions
// that pin behaviour rather than scores.

import { describe, expect, it } from "vitest";
import { normalize, queryTerms, search, tokenize } from "./search";
import { SEARCH_DOCS } from "../data/searchIndex";

describe("normalize", () => {
  it("lowercases and strips punctuation", () =>
    expect(normalize("Registry — the ARCHITECTURE!")).toBe("registry the architecture"));

  it("folds diacritics so accented input still matches", () =>
    expect(normalize("naïve café")).toBe("naive cafe"));

  it("is empty for input with nothing to match", () => expect(normalize("--- ???")).toBe(""));
});

describe("tokenize", () => {
  it("splits on anything that is not a letter or digit", () =>
    expect(tokenize("point-in-polygon, v2")).toEqual(["point", "in", "polygon", "v2"]));

  it("is an empty list rather than a list of empties", () => expect(tokenize("   ")).toEqual([]));
});

describe("queryTerms", () => {
  it("drops stop words", () => expect(queryTerms("the loss as a number")).toEqual(["loss", "number"]));

  it("de-duplicates repeated terms", () =>
    expect(queryTerms("cipcode cipcode")).toEqual(["cipcode"]));

  it("keeps stop words when the query is nothing else", () =>
    expect(queryTerms("how to")).toEqual(["how", "to"]));
});

describe("search", () => {
  it("finds nothing for a term that appears nowhere", () =>
    expect(search("zzzznope")).toHaveLength(0));

  it("finds nothing for an empty query", () => expect(search("   ")).toHaveLength(0));

  it("requires every term to match — this is AND, not OR", () => {
    expect(search("reconciliation").length).toBeGreaterThan(0);
    expect(search("reconciliation zzzznope")).toHaveLength(0);
  });

  it("matches a prefix in either direction", () => {
    // "reconcil" should reach "reconciliation"; "dictionaries" should reach "dictionary".
    expect(search("reconcil").length).toBeGreaterThan(0);
    expect(search("dictionaries").length).toBeGreaterThan(0);
  });

  it("ranks a title match above a passing mention", () => {
    const hits = search("raw layer curated layer");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].doc.title.toLowerCase()).toContain("curated layer");
  });

  it("honours the limit", () => expect(search("the", 3).length).toBeLessThanOrEqual(3));

  it("marks the matched words in the snippet", () => {
    const hit = search("imputation").find((h) => h.doc.kind === "notes");
    expect(hit).toBeDefined();
    const marked = hit!.snippet.filter((p) => p.hit).map((p) => p.text.toLowerCase());
    expect(marked.join(" ")).toContain("imput");
  });
});

// Registry invariants the search index depends on — the same kind of checks
// Module 7 asks for on the dataset.
describe("the index the engine is built on", () => {
  it("has a unique id for every document", () => {
    const ids = new Set(SEARCH_DOCS.map((d) => d.id));
    expect(ids.size).toBe(SEARCH_DOCS.length);
  });

  it("gives every document somewhere to go", () => {
    for (const d of SEARCH_DOCS) {
      expect(d.href.length).toBeGreaterThan(0);
      if (d.external) expect(d.href).toMatch(/^https?:\/\//);
      else expect(d.href.startsWith("#/")).toBe(true);
    }
  });

  it("gives every document a title", () => {
    for (const d of SEARCH_DOCS) expect(d.title.trim()).not.toBe("");
  });
});
