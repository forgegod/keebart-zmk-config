# Architecture

## Purpose

This repository builds Keebart split-keyboard firmware. `config/west.yml` is the west manifest. `build.yaml` is the GitHub Actions matrix. Board definitions live under `boards/`. Keymaps live under `config/`.

## Unicode pin

DE targets type German characters as Unicode while the host stays on a US layout. They include `behaviors/unicode.dtsi` and bind `&uc` aliases. The module is imported as project `zmk-unicode` from remote `forgegod`, repo-path `urob-zmk-unicode`, at revision `08af43a5aa4838319046c1f2aa0d6efdf6c975d1`. ZMK itself is `zmkfirmware` `v0.3`.

The pinned fork advertises Studio parameter metadata for `&uc`. Using that metadata over USB requires firmware built with this pin and flashed to the central half. This repository owns only the pin, not the unicode driver or browser client.

The left half of each build enables ZMK Studio with `studio-rpc-usb-uart` and `-DCONFIG_ZMK_STUDIO=y`. The right half does not. A USB client must connect to the left half.

## What a pin change is not

- It does not edit `config/*.keymap` bindings or `default-mode`.
- It does not vendor the unicode driver into this tree.
- It does not clear keyboard settings. A later flash still needs Restore Stock Settings if Studio has saved an override.
- Local files under `firmware/` and `current/` are not the build contract. The build contract is `.github/workflows/build.yml`.

## Verification

```bash
node scripts/check-product-records.mjs
node --test tests/records-evidence.test.mjs
```

The firmware workflow was not run for this documentation change.
