# Product capability records

`capabilities/CAP-*.md` describes the checked-out config. An active CHG describes progress. The usage guide remains `../../Readme.md`.

## When a CAP changes

Update a CAP when the manifest pin, the build matrix, or a keymap contract visible to a flash changes. Do not update it for a comment-only edit.

## CAP shape

Allowed status values: `implemented`, `partial`, `retired`. `Primary surface` is `none`. There is no wireframe directory.

## Verification

Run `node scripts/check-product-records.mjs`. It does not build firmware.
