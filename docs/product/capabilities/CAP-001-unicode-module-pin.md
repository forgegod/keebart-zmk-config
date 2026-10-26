# CAP-001 — Unicode module pin

**Status:** implemented
**Primary surface:** none

## Behaviour

- `config/west.yml` imports project `zmk-unicode` from remote `urob` at revision `v0.3`, and ZMK from `zmkfirmware` at `v0.3`.
- DE keymaps include `behaviors/unicode.dtsi` and bind `&uc` aliases for German characters. The host layout stays US English.
- Left-half builds enable ZMK Studio. Right-half builds do not.
- This revision does not pin `forgegod/urob-zmk-unicode`. Studio writes of `&uc` are not accepted by the pinned module.

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
- `.github/workflows/build.yml` — firmware build workflow. It was not run for this record.

## Related contracts

- [Architecture](../../architecture.md)
