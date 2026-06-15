import { test } from "node:test";
import assert from "node:assert/strict";
import { formatLegalCode, buildCodeParts } from "./edulex-code";

test("formatLegalCode produit le format COUNTRY-JUR-SECTOR-TYPE-YEAR-NUM-VERSION", () => {
  const code = formatLegalCode({ country: "ci", jur: "MENA", sector: "EDU", type: "dec", year: 2026, num: 4, version: 1 });
  assert.equal(code, "CI-MENA-EDU-DEC-2026-004-V1");
});

test("buildCodeParts retombe sur GEN sans ministère ni secteur", () => {
  const parts = buildCodeParts({ countryCode: "SN", type: "LOI", year: 2025, num: 1 });
  assert.equal(formatLegalCode(parts), "SN-GEN-GEN-LOI-2025-001-V1");
});

test("buildCodeParts privilégie le code ministère sur la juridiction", () => {
  const parts = buildCodeParts({ countryCode: "CI", ministryCode: "MESRS", jurisdictionCode: "PR", sectorCode: "SUP", type: "ARR", year: 2026, num: 12 });
  assert.equal(formatLegalCode(parts), "CI-MESRS-SUP-ARR-2026-012-V1");
});

test("la numérotation est paddée sur 3 chiffres et la version préfixée V", () => {
  const code = formatLegalCode(buildCodeParts({ countryCode: "BJ", ministryCode: "mtfp", sectorCode: "adm", type: "dec", year: 2024, num: 19, version: 2 }));
  assert.equal(code, "BJ-MTFP-ADM-DEC-2024-019-V2");
});
