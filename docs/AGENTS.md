# Documentation

## Purpose

Architecture, decisions, current config behavior, and change progress.

## Ownership

`architecture.md`, `design-decisions.md`, `product/`, and `changes/`.

## Local Contracts

CAPs describe the checked-out manifest and keymaps. An active CHG is the only progress authority. A planned fork pin is not the current `west.yml` revision.

## Work Guidance

Do not copy UF2 files or secrets into these docs. Keep the usage guide in `../Readme.md`.

## Verification

Run `node scripts/check-product-records.mjs`.

## Child DOX Index

| Child | Owns |
| --- | --- |
| `product/AGENTS.md` | Current capability records. |
| `changes/AGENTS.md` | Planned work and phase progress. |
