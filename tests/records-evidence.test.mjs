import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const { validateRecords } = await import(
  pathToFileURL(path.resolve("scripts/check-product-records.mjs")).href
);

async function fixture(verificationRef) {
  const root = await mkdtemp(path.join(tmpdir(), "keebart-records-"));
  await mkdir(path.join(root, "docs/product/capabilities"), { recursive: true });
  await mkdir(path.join(root, "docs/changes/active"), { recursive: true });
  await mkdir(path.join(root, "docs/changes/archive"), { recursive: true });
  await mkdir(path.join(root, "config"), { recursive: true });
  await mkdir(path.join(root, ".github/workflows"), { recursive: true });
  await writeFile(path.join(root, "docs/product/README.md"), "# Product\n");
  await writeFile(
    path.join(root, "docs/product/index.md"),
    "[CAP-001](capabilities/CAP-001-unicode-module-pin.md)\n",
  );
  await writeFile(path.join(root, "docs/changes/README.md"), "# Changes\n");
  await writeFile(path.join(root, "config/west.yml"), "revision: v0.3\n");
  await writeFile(path.join(root, "config/sofle_choc_pro_de.keymap"), "&uc UC_DE_AE\n");
  await writeFile(path.join(root, ".github/workflows/build.yml"), "name: Build\n");
  await writeFile(
    path.join(root, "docs/product/capabilities/CAP-001-unicode-module-pin.md"),
    `# CAP-001 — Unicode module pin

**Status:** implemented
**Primary surface:** none

## Behaviour

- DE keymaps include the unicode module.

## Implementation

- \`config/west.yml\`

## Verification

- \`${verificationRef}\`
`,
  );
  return root;
}

test("a config keymap counts as firmware-config evidence", async () => {
  const root = await fixture("config/sofle_choc_pro_de.keymap");
  try {
    const { errors } = await validateRecords(root);
    assert.deepEqual(
      errors.filter((error) => error.includes("behaviour test")),
      [],
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("the readme does not satisfy the behaviour-evidence rule", async () => {
  const root = await fixture("Readme.md");
  try {
    const { errors } = await validateRecords(root);
    assert.ok(
      errors.some((error) =>
        error.includes("must reference at least one executable behaviour test"),
      ),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
