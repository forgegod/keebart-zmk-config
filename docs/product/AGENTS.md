# Product capability records

## Purpose

Current behavior of this ZMK user config.

## Ownership

`README.md`, `index.md`, and `capabilities/`.

## Local Contracts

A CAP states the present manifest and keymap contract. It cites an existing implementation file and either a `config/*.keymap` or `.github/workflows/build.yml`. This repository has no human-facing product surface, so no CAP declares `human` and no wireframe directory exists.

## Work Guidance

Do not describe a planned `west.yml` pin as current. Update the CAP only when the pin or keymap contract actually changes.

## Verification

Run `node scripts/check-product-records.mjs`.

## Child DOX Index

None.
