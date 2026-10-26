# Record validation

## Purpose

Dependency-free checks for CAP and CHG structure.

## Ownership

`check-product-records.mjs`.

## Local Contracts

The script checks record shape and evidence paths. For this repository it accepts `config/*.keymap` and `.github/workflows/build.yml` as evidence paths. Citing a path does not mean the firmware workflow ran.

## Work Guidance

Cover a new evidence rule in `tests/records-evidence.test.mjs` with one accepted path and one rejected path.

## Verification

Run `node scripts/check-product-records.mjs` and `node --test tests/records-evidence.test.mjs`.

## Child DOX Index

None.
