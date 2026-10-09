// The course registry — the single source of truth that drives the whole site.
// Navigation, the syllabus, module pages, prev/next, the home-page counts and
// the search index all derive from here.

import type { LabSession, ModuleDef, UnitDef } from "./types";
import { UNIT1 } from "./units/unit1";
import { UNIT2 } from "./units/unit2";
import { UNIT3 } from "./units/unit3";
import { UNIT4 } from "./units/unit4";

export const UNITS: UnitDef[] = [UNIT1, UNIT2, UNIT3, UNIT4];

export const MODULES: ModuleDef[] = UNITS.flatMap((u) => u.modules);

export const MODULE_BY_ID: Record<string, ModuleDef> = Object.fromEntries(
  MODULES.map((m) => [m.id, m]),
);

export const MODULE_COUNT = MODULES.length;
export const UNIT_COUNT = UNITS.length;
export const LAB_COUNT = MODULES.reduce((n, m) => n + m.labs.length, 0);
export const CHECKPOINT_COUNT = MODULES.filter((m) => m.checkpoint).length;
export const EXCERPT_COUNT = MODULES.reduce((n, m) => n + (m.excerpts?.length ?? 0), 0);

/** Every lab sitting in course order, with the module it belongs to. */
export function allLabs(): { mod: ModuleDef; lab: LabSession }[] {
  return MODULES.flatMap((mod) => mod.labs.map((lab) => ({ mod, lab })));
}

/** Rough total of the "~N h" estimates, for the home-page summary. */
export const LAB_HOURS = allLabs().reduce((n, { lab }) => {
  const m = /(\d+(?:\.\d+)?)/.exec(lab.hours);
  return n + (m ? parseFloat(m[1]) : 0);
}, 0);

export function unitOf(m: ModuleDef): UnitDef {
  return UNITS.find((u) => u.number === m.unit)!;
}

export function prevNext(m: ModuleDef): { prev: ModuleDef | null; next: ModuleDef | null } {
  const i = MODULES.findIndex((x) => x.id === m.id);
  return {
    prev: i > 0 ? MODULES[i - 1] : null,
    next: i < MODULES.length - 1 ? MODULES[i + 1] : null,
  };
}

/**
 * Registry integrity checks the type system cannot express — run in dev only,
 * rendered where they cannot be ignored.
 */
export function validateRegistry(): string[] {
  const problems: string[] = [];
  const seenModule = new Set<string>();
  const seenLab = new Set<string>();

  UNITS.forEach((u, i) => {
    if (u.number !== i + 1) problems.push(`Unit ${u.number} is at position ${i + 1}`);
    if (u.modules.length === 0) problems.push(`Unit ${u.number} has no modules`);
  });

  MODULES.forEach((m, i) => {
    if (seenModule.has(m.id)) problems.push(`Duplicate module id: ${m.id}`);
    seenModule.add(m.id);
    if (m.number !== i + 1) problems.push(`Module ${m.id} is numbered ${m.number} but sits at ${i + 1}`);
    if (!UNITS.some((u) => u.number === m.unit)) problems.push(`Module ${m.id} claims unit ${m.unit}`);
    if (m.labs.length === 0) problems.push(`Module ${m.id} has no lab sitting`);
    m.labs.forEach((l) => {
      if (seenLab.has(l.id)) problems.push(`Duplicate lab id: ${l.id}`);
      seenLab.add(l.id);
      if (!/^~\d/.test(l.hours)) problems.push(`Lab ${l.id} has an odd hours value: ${l.hours}`);
    });
  });

  return problems;
}
