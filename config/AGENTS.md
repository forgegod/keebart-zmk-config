# West config

## Purpose

The west self path: manifest, keymaps, and per-keyboard conf files.

## Ownership

`west.yml`, `*.keymap`, `*.keymap.json`, `*.json`, and `*.conf`.

## Local Contracts

`west.yml` imports ZMK `v0.3` from `zmkfirmware` and `zmk-unicode` `v0.3` from `urob`. DE keymaps include `behaviors/unicode.dtsi` and bind `&uc` aliases. A module-pin change edits only the unicode remote and revision. It does not rewrite keymap bindings or `default-mode`.

## Work Guidance

Keep the west project name `zmk-unicode`. Point it at a full commit SHA, not a floating branch, when the pin moves to the forgegod fork.

## Verification

Record structure: `node scripts/check-product-records.mjs`. Firmware builds: `.github/workflows/build.yml`.

## Child DOX Index

None.
