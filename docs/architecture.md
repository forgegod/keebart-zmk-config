# Architecture

## Purpose

This repository builds Keebart split-keyboard firmware. `config/west.yml` is the west manifest. `build.yaml` is the GitHub Actions matrix. Board definitions live under `boards/`. Keymaps live under `config/`.

## Unicode pin

DE targets type German characters as Unicode while the host stays on a US layout. They include `behaviors/unicode.dtsi` and bind `&uc` aliases. The module is imported as project `zmk-unicode` from remote `urob` at revision `v0.3`. ZMK itself is `zmkfirmware` `v0.3`.

That pin does not include Studio parameter metadata. USB writes of `&uc` remain a firmware-module change, then a pin change, then a flash. This repository owns only the pin.

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
