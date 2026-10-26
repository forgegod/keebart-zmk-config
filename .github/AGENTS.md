# Workflows

## Purpose

GitHub Actions for this user config.

## Ownership

`workflows/build.yml` and `workflows/records.yml`.

## Local Contracts

`build.yml` calls `zmkfirmware/zmk/.github/workflows/build-user-config.yml@v0.3`. That is the firmware gate. `records.yml` checks CAP/CHG structure only. Neither workflow is permission to dispatch a build, flash a keyboard, or push.

## Work Guidance

A unicode pin change is still built by the existing user-config workflow. Do not replace that workflow to vendor the unicode module.

## Verification

Run `node scripts/check-product-records.mjs` locally. Report the firmware workflow as unrun unless a GitHub run was actually observed.

## Child DOX Index

None.
