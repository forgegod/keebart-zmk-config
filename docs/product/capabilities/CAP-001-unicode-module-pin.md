# CAP-001 — Unicode module pin

**Status:** implemented
**Primary surface:** none

## Behaviour

- `config/west.yml` imports project `zmk-unicode` from remote `forgegod`, repo-path `urob-zmk-unicode`, at revision `08af43a5aa4838319046c1f2aa0d6efdf6c975d1`, and ZMK from `zmkfirmware` at `v0.3`.
- DE keymaps include `behaviors/unicode.dtsi` and bind `&uc` aliases for German characters. The host layout stays US English.
- Left-half builds enable ZMK Studio. Right-half builds do not.
- The pinned unicode fork advertises Studio parameter metadata for `&uc`. Using that metadata on a keyboard requires firmware built with this pin and flashed to the central half; the manifest alone does not update a device.

## Implementation

- `config/west.yml` — module remotes and revisions.
- `build.yaml` — Studio snippet and `CONFIG_ZMK_STUDIO` on left halves.
- `config/sofle_choc_pro_de.keymap` — one DE keymap that includes the unicode header and `&uc` aliases.

## Rules and boundaries

- The pin is the only unicode-module control in this repository. The driver stays in the module named by `west.yml`.
- [ADR-0001](../../design-decisions.md) forbids vendoring the driver and forbids pinning the fork before a metadata revision exists.
- Local `firmware/` and `current/` files are not this capability.

## Verification

- `config/sofle_choc_pro_de.keymap` — DE keymap source that includes `behaviors/unicode.dtsi` and `&uc` aliases.
- `.github/workflows/build.yml` — firmware build workflow. Record checks do not build firmware or verify flashed-device behavior.

## Related contracts

- [Architecture](../../architecture.md)
