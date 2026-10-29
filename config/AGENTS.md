# West config

## Purpose

The west self path: manifest, keymaps, and per-keyboard conf files.

## Ownership

`west.yml`, `*.keymap`, `*.keymap.json`, `*.json`, and `*.conf`.

## Local Contracts

`west.yml` imports ZMK `v0.3` from `zmkfirmware` and project `zmk-unicode` from remote `forgegod`, repo-path `urob-zmk-unicode`, at revision `08af43a5aa4838319046c1f2aa0d6efdf6c975d1`. DE keymaps include `behaviors/unicode.dtsi` and bind `&uc` aliases. A module-pin change edits only the unicode remote and revision. It does not rewrite keymap bindings or `default-mode`.

## Work Guidance

Keep the west project name `zmk-unicode` and the forgegod fork pin at a full commit SHA, not a floating branch.

## Verification

Record structure: `node scripts/check-product-records.mjs`. Firmware builds: `.github/workflows/build.yml`.

## Child DOX Index

None.
