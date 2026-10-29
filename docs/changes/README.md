# Change records

A `CHG-*.md` file is the progress record for one material config request. It does not describe the current pin. CAP records do.

## Lifecycle

```text
planned → in-progress → blocked → done
                    ↘ cancelled
```

`planned`, `in-progress`, and `blocked` records live in `active/`. `done` and `cancelled` records move to `archive/`.

## Required metadata

Every CHG names its identity, the external request, affected CAP IDs, the baseline commit, and phases with a status and an executable gate.

## CHG shape

```markdown
# CHG-001 — Change name

**Status:** planned
**External request:** <direct operator request>
**Impacts:** CAP-001
**Baseline:** `<commit>`

| # | Phase | Status | Verification gate |
| --- | --- | --- | --- |
| 1 | Specify the pin | pending | `node scripts/check-product-records.mjs` exits 0 |

## Phase 1 — Specify the pin

**Goal:** <observable target>

**Verification gate:** <executable predicate>
```

## Current records

No active change records.

## Archive

| Change | Status |
| --- | --- |
| [CHG-001 — Pin the unicode fork](archive/CHG-001-pin-the-unicode-fork.md) | done |

## Verification

Run `node scripts/check-product-records.mjs` after editing a record. A pin phase still requires `.github/workflows/build.yml` to succeed.
