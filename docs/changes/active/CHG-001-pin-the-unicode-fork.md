# CHG-001 — Pin the unicode fork

**Status:** planned
**External request:** Direct operator request: if this config should incorporate the unicode fork, adopt the AI Software Blueprint here and manage that pin as a change request.
**Impacts:** CAP-001
**Baseline:** `70b28974fa6ecdad6e35bee39e5f285caa8d11f2`

Depends on `forgegod/urob-zmk-unicode` CHG-001. The browser client remains `forgegod/katafoxi-keymap-editor-extended` CHG-020. This record does not implement either.

| # | Phase | Status | Verification gate |
| --- | --- | --- | --- |
| 1 | Specify the fork pin | pending | `node scripts/check-product-records.mjs` exits 0 |
| 2 | Retarget zmk-unicode to the metadata revision | pending | `.github/workflows/build.yml` succeeds after the pin change |
| 3 | Integrate the current pin record | pending | `node scripts/check-product-records.mjs && node --test tests/records-evidence.test.mjs` exits 0 |

## Phase 1 — Specify the fork pin

**Goal:** the next pin is identified without changing `config/west.yml`.

1. Keep the west project name `zmk-unicode`.
2. Add a `forgegod` remote with `url-base: https://github.com/forgegod` when the pin is made. Point `zmk-unicode` at that remote.
3. Set `revision` to the full SHA of the unicode revision that advertises parameter metadata. Do not use `v0.3`, `main`, or `6ce21267e497e20ff9e05da16d4eefcdd3e89190`.
4. Leave ZMK at `zmkfirmware` `v0.3`. Leave keymap bindings, `default-mode`, and `build.yaml` unchanged.
5. Do not edit `config/west.yml` in this phase.

**Verification gate:** `node scripts/check-product-records.mjs` exits 0.

## Phase 2 — Retarget zmk-unicode to the metadata revision

**Goal:** a firmware build of this config fetches the unicode fork revision that Studio can accept for `&uc`.

1. Wait until the unicode module's metadata change is committed and pushed to `forgegod/urob-zmk-unicode`. A local-only commit cannot be fetched by GitHub Actions.
2. Edit only `config/west.yml`: add the `forgegod` remote and set the `zmk-unicode` remote and full-SHA revision.
3. Do not vendor the driver, change a keymap, or stage files under `firmware/` or `current/`.
4. The behavior gate is the existing build workflow. A records check does not prove the pin builds.

**Verification gate:** `.github/workflows/build.yml` succeeds after the pin change.

## Phase 3 — Integrate the current pin record

**Goal:** CAP-001 names the forgegod remote and the pinned SHA, and no longer says this revision pins `urob` `v0.3`.

1. Amend CAP-001 in present tense from the committed `west.yml`, not from the plan.
2. Archive this CHG only after that amendment and the record checks pass.
3. Do not flash a keyboard from the archive step.

**Verification gate:** `node scripts/check-product-records.mjs && node --test tests/records-evidence.test.mjs` exits 0.

## Out of scope

- Implementing unicode parameter metadata. That is the unicode module CHG.
- The browser USB client.
- Changing keymap bindings, host input mode, or `default-mode`.
- Flashing either half, dispatching the build by hand, or pushing this repository.
- Returning the pin to upstream `urob` after an upstream merge. That is a later request.
