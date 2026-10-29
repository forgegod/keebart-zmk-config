# DOX framework

- DOX is the AGENTS.md hierarchy installed in this repository.
- Follow applicable DOX instructions for every edit.

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees.
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it.

## Read Before Editing

1. Read the root AGENTS.md.
2. Identify every file or folder you expect to touch.
3. Walk from the repository root to each target path.
4. Read every AGENTS.md found along each route.
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there.
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules.
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX.

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:

- purpose, scope, ownership, or responsibilities;
- durable structure, contracts, workflows, or operating rules;
- required inputs, outputs, permissions, constraints, side effects, or artifacts;
- user preferences about behavior, communication, process, organization, or quality; or
- AGENTS.md creation, deletion, move, rename, or index contents.

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the DOX pass still must happen.

## Hierarchy

- Root AGENTS.md is the DOX rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child DOX Index.
- Child AGENTS.md files own domain-specific instructions and their own Child DOX Index.
- Each parent explains what its direct children cover and what stays owned by the parent.
- The closer a doc is to the work, the more specific and practical it must be.

## Child Doc Shape

- Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards.
- Work Guidance must reflect the current standards of the project or user instructions; if there are no specific standards or instructions yet, leave it empty.
- Verification must reflect an existing check; if no verification framework exists yet, leave it empty and update it when one exists.

Default section order:

- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child DOX Index

## Style

- Keep docs concise, current, and operational.
- Document stable contracts, not diary entries.
- Put broad rules in parent docs and concrete details in child docs.
- Prefer direct bullets with explicit names.
- Do not duplicate rules across many files unless each scope needs a local version.
- Delete stale notes instead of explaining history.
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist.

## Closeout

1. Re-check changed paths against the DOX chain.
2. Update nearest owning docs and any affected parents or children.
3. Refresh every affected Child DOX Index.
4. Remove stale or contradictory text.
5. Run existing verification when relevant.
6. Report any docs intentionally left unchanged and why.

## Project guidance

This repository is the Keebart ZMK user config. It owns board definitions, keymaps, the west manifest, and the GitHub firmware build. It does not own the unicode driver or the browser keymap editor.

- `config/west.yml` pins ZMK from `zmkfirmware` at `v0.3` and project `zmk-unicode` from remote `forgegod`, repo-path `urob-zmk-unicode`, at `08af43a5aa4838319046c1f2aa0d6efdf6c975d1`, the Studio parameter-metadata revision.
- A pin change does not edit keymap bindings, `default-mode`, or Kconfig. Those stay in the keymap and conf files.
- Studio support is the left-half `studio-rpc-usb-uart` snippet and `-DCONFIG_ZMK_STUDIO=y` in `build.yaml`. Do not add a second USB protocol here.
- Local `firmware/` and `current/` UF2 drops are not source. Do not stage them with record or pin changes.
- Do not flash, push, or dispatch the build workflow without an explicit request.
- The usage document is `Readme.md`. Do not replace it with a blueprint README.

## Child DOX Index

| Child | Owns |
| --- | --- |
| `docs/AGENTS.md` | Architecture, decisions, capabilities, and change records. |
| `config/AGENTS.md` | West manifest, keymaps, and conf files. |
| `.github/AGENTS.md` | Firmware build and record-check workflows. |
| `scripts/AGENTS.md` | Dependency-free record validator. |

Root owns `boards/`, `build.yaml`, and `Readme.md`.
