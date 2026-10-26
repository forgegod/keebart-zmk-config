# Design decisions

This index records durable forks. `docs/architecture.md` is the live contract.

## ADR-0001: Pin the unicode fork by full SHA, do not vendor it

**Status:** Accepted

### Context

DE keymaps depend on `zmk-unicode`. Studio will accept `&uc` writes only after that module advertises parameter metadata. The metadata belongs in the unicode driver, not in this config and not in a ZMK fork. Pinning the current fork revision `6ce21267e497e20ff9e05da16d4eefcdd3e89190` would not add that metadata.

### Decision

Keep project name `zmk-unicode`. When the metadata revision exists and is pushed, change the remote to `forgegod` and set `revision` to that full commit SHA. Until then, keep remote `urob` and revision `v0.3`. Do not copy the driver into this repository.

### Consequences

A keyboard build picks up the fork only after this pin changes and the resulting firmware is flashed to the central half. The keymap editor can still refuse `&uc` USB writes before that flash. An upstream merge may later let the pin return to `urob`; that is a separate change.
