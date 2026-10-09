# Keebart ZMK Firmware

This repository contains the ZMK firmware configuration for Keebart wireless
split keyboards. It includes board definitions, default keymaps, ZMK Studio
support, Sharp Memory-in-Pixel display support, RGB underglow, and GitHub
Actions firmware builds.

- Maintainer: [Keebart](https://github.com/Keebart)
- Firmware: [ZMK](https://zmk.dev/)
- Miryoku firmware: [Keebart/miryoku_zmk](https://github.com/Keebart/miryoku_zmk)
- Online keymap editor: [ZMK Keymap Editor](https://nickcoutsos.github.io/keymap-editor/)
- Runtime editor: [ZMK Studio](https://zmk.studio/)

## Supported keyboards

| Keyboard | Layout | Board targets | Bluetooth name |
| --- | --- | --- | --- |
| [Corne Choc Pro BT](https://keebart.com/products/corne-wireless) | 6-column | `corne_choc_pro_left`, `corne_choc_pro_right` | `Corne Choc BT` |
| Corne Choc Pro BT 5-Col | 5-column | `corne_choc_pro_5col_left`, `corne_choc_pro_5col_right` | `Corne Choc BT` |
| Corne Choc Pro BT DE | 6-column | `corne_choc_pro_de_left`, `corne_choc_pro_de_right` | `Corne Choc DE` |
| Corne Choc Pro BT DE 5-Col | 5-column | `corne_choc_pro_de_5col_left`, `corne_choc_pro_de_5col_right` | `Corne DE 5col` |
| [Piantor Pro BT](https://keebart.com/products/piantor-wireless) | 6-column | `piantor_pro_bt_left`, `piantor_pro_bt_right` | `Piantor Pro BT` |
| Piantor Pro BT 5-Col | 5-column | `piantor_pro_bt_5col_left`, `piantor_pro_bt_5col_right` | `Piantor Pro BT` |
| [Sofle Choc Pro BT](https://keebart.com/products/sofle-wireless) | 6-column | `sofle_choc_pro_left`, `sofle_choc_pro_right` | `Sofle Choc BT` |

The shortened Bluetooth names fit ZMK's 16-character device-name limit while
making wireless models identifiable in the host's Bluetooth menu.

## Firmware variants

Corne and Piantor have separate 6-column and 5-column firmware targets. The
6-column targets retain the standard keymaps. Targets ending in `_5col` use a
compact keymap designed specifically for boards without the outer columns.

The Corne additionally provides `*_de` targets, which use the same hardware and
keymap as their base variant plus a `DE` layer for German umlauts. See
[German umlauts](#german-umlauts-de-targets).

Separate firmware is intentional. ZMK Studio can switch between physical
layouts in one firmware, but it stores one runtime keymap rather than two
independent defaults. Separate targets also give the ZMK Keymap Editor one
unambiguous source keymap and geometry for each keyboard variant.

Select matching firmware for both halves. Do not mix a regular target with an
`_5col` target.

## Default 5-column keymap

The compact keymap uses home-row modifiers and thumb keys that tap common keys
or hold dedicated layers.

### Home-row modifiers

Tap a home-row key to type its letter. Hold it to use its modifier.

| Key | Hold action | Key | Hold action |
| --- | --- | --- | --- |
| `A` | Left GUI | `J` | Right Shift |
| `S` | Left Alt | `K` | Right Ctrl |
| `D` | Left Ctrl | `L` | Right Alt |
| `F` | Left Shift | `'` | Right GUI |

The mod-taps use a 200 ms tapping term and ZMK's `tap-preferred` flavor to avoid
turning ordinary same-hand typing rolls into modifiers.

### Thumb keys

| Tap | Hold |
| --- | --- |
| `Esc` | Media layer |
| `Space` | Navigation layer |
| `Tab` | Function layer |
| `Enter` | Symbol layer |
| `Backspace` | Number layer |
| `Delete` | Adjust layer |

### Layers

| Layer | Main contents |
| --- | --- |
| `QWERTY` | Letters, punctuation, home-row modifiers, and layer-tap thumbs |
| `NAV` | Arrow keys, Home, End, Page Up/Down, Insert, Caps Lock, and modifiers |
| `MEDIA` | Playback, volume, and RGB controls including hue down/up |
| `NUM` | Numpad-style digits, brackets, semicolon, equals, backslash, and grave |
| `SYM` | Braces, parentheses, operators, colon, and shifted symbols |
| `FUN` | F1-F12, Print Screen, Scroll Lock, Pause, and modifiers |
| `ADJUST` | Bluetooth profiles, RGB controls, reset, bootloader, and Studio unlock |

To unlock ZMK Studio on a 5-column build, hold the `Delete` thumb key and press
`C`. Reset and bootloader are on `Z` and `X` on the same layer.

The source files are:

- `config/corne_choc_pro_5col.keymap`
- `config/piantor_pro_bt_5col.keymap`

Matching board-default copies are kept under `boards/arm/*_5col/`.

## German umlauts (DE targets)

Standard ZMK keycodes follow the USB HID specification, which describes key
*positions* on a US English layout. Letters like `ö`, `ä`, `ü`, and `ß` are not
in that specification, so they cannot be typed by a single keycode unless the
host OS is switched to a German layout.

The `*_de` targets solve this without changing the host layout. They keep the
US English layout and add a dedicated `DE` layer that types the characters as
Unicode code points through the
[urob/zmk-unicode](https://github.com/urob/zmk-unicode) module, which is declared
in `config/west.yml`.

| Key | Types |
| --- | --- |
| `A` | `ä` |
| `S` | `ß` |
| `U` | `ü` |
| `O` | `ö` |
| `E` | `€` |

Shift works as usual, so `Shift` + `A` gives `Ä`. Every other key on the layer
is transparent, so the base layer keeps working while the layer is held.

Reach the layer with the right-hand Alt key:

- 6-column: hold the right thumb `Alt` key. A tap still produces `Alt`.
- 5-column: hold the right inner `Alt` key. A tap still produces `Alt`.

The source files are:

- `config/corne_choc_pro_de.keymap`
- `config/corne_choc_pro_de_5col.keymap`

### Host setup with WinCompose (Windows)

ZMK sends the umlaut as a Unicode code point rather than as a single HID
keycode, so the host needs a program that turns code points into characters. On
Windows that program is [WinCompose](https://github.com/ell1010/wincompose).

1. Download `WinCompose-x.y.z-setup.exe` from the
   [latest release](https://github.com/ell1010/wincompose/releases/latest).
2. Run the installer and accept the default options. WinCompose starts
   automatically with Windows and places an icon in the notification area.
3. Make sure that icon is present while you type. No further configuration is
   required: the default compose key is `Right Alt`, which is exactly the key
   the DE layer sends.

With WinCompose running, holding the layer key and pressing `A` sends
`Right Alt`, `u`, `e`, `4`, `Enter`. WinCompose converts that sequence to `ä`.
Because the keyboard keeps its US English layout and only emits an input-method
sequence, the result does not depend on the Windows keyboard layout setting.

WinCompose has to be running for the umlauts to appear. Without it the raw
sequence (`ue4` and a newline) is typed instead, which is the usual symptom of a
missing or stopped WinCompose.

macOS and Linux use different input systems. See the
[zmk-unicode README](https://github.com/urob/zmk-unicode) for their setup, then
change `default-mode` in the `.keymap` and rebuild.

### Editing the DE keymap in the Keymap Editor

The [ZMK Keymap Editor](https://nickcoutsos.github.io/keymap-editor/) is the
supported way to change the keymap. It edits the source `.keymap` file and
commits the result back to the repository, which triggers a new firmware build.

1. Open [nickcoutsos.github.io/keymap-editor](https://nickcoutsos.github.io/keymap-editor/)
   and authorize it for this repository.
2. Select the repository and the `main` branch.
3. Choose the keymap matching your hardware:
   - `config/corne_choc_pro_de.keymap` for the 6-column Corne
   - `config/corne_choc_pro_de_5col.keymap` for the 5-column Corne
4. The editor draws the layout from the matching `config/corne_choc_pro_de.json`
   or `config/corne_choc_pro_de_5col.json`, so the grid matches the real board.
5. Select the `DE` layer to reach the umlaut keys.

The umlaut keys appear as Unicode input (`&uc`) bindings, not as `ö`, `ä`, `ü`,
or `ß` glyphs. The characters are Unicode code points outside the USB HID
keyboard specification, so no single keycode exists to draw. Each key shows two
code point parameters: the first is produced on tap, the second while `Shift` is
held. For `ä` those are `0xE4` and `0xC4`.

To change which character a key produces, select the key, pick the Unicode input
behavior, and edit the two code point values. The `DE` layer is defined last in
the keymap, so its key index matches the base layer one for one.

## Miryoku firmware

Alternative firmware using the [Miryoku](https://github.com/manna-harbour/miryoku)
layout is maintained in
[Keebart/miryoku_zmk](https://github.com/Keebart/miryoku_zmk). Its GitHub Actions
workflows build Miryoku firmware for the standard Corne Choc Pro BT, Piantor
Pro BT, and Sofle Choc Pro BT targets.

The Miryoku repository loads this repository as an external ZMK module. Board
definitions and the `sharp_mip` display shield remain here, while Miryoku owns
the keymap and physical mappings. Its keyboard workflows select `sharp_mip` as
an extra shield, so the custom display remains available in Miryoku firmware.

Run the matching workflow from the Miryoku repository's **Actions** tab and
flash the generated left and right firmware files to their corresponding
halves. Miryoku firmware is an alternative to the default keymaps built by
this repository; it is not an additional runtime-selectable keymap.

## Building firmware

The GitHub Actions workflow builds all targets on every push and pull request.
It can also be started manually from the repository's **Actions** tab. Download
the merged `firmware` artifact after the build finishes.

The build matrix is defined in `build.yaml`. Normal firmware uses the custom
`sharp_mip` shield on every keyboard. Corne and Piantor use its default
orientation; Sofle enables the 180-degree rotation in its board configuration.
The central, left-side builds include ZMK Studio support.

For a local build, first create a normal ZMK west workspace using the manifest
in `config/west.yml`. From the workspace root, run a command such as:

```sh
west build -s zmk/app -d build/corne-5col-left \
  -b corne_choc_pro_5col_left \
  -S studio-rpc-usb-uart -- \
  -DZMK_CONFIG=/path/to/zmk-config/config \
  -DZMK_EXTRA_MODULES=/path/to/zmk-config \
  -DSHIELD=sharp_mip \
  -DCONFIG_ZMK_STUDIO=y
```

Change the board target as required. The resulting firmware is written to
`build/corne-5col-left/zephyr/zmk.uf2`.

### Running the workflow locally

This repository is a fork, so GitHub Actions can be disabled for it by default.
If the **Actions** tab shows no runs after a push, enable workflows first:
open the **Actions** tab and confirm the prompt. The `workflow` scope is already
part of a normal `gh auth login`, so the CLI can trigger and inspect runs:

```sh
gh workflow run "Build ZMK firmware" --repo forgegod/keebart-zmk-config
gh run list  --repo forgegod/keebart-zmk-config
gh run watch --repo forgegod/keebart-zmk-config
gh run download --repo forgegod/keebart-zmk-config
```

The whole matrix can also run on this machine through the
[`nektos/gh-act`](https://github.com/nektos/gh-act) extension, which executes the
workflow in Docker rather than on GitHub:

```sh
gh extension install nektos/gh-act   # once
cd /path/to/this/repo
gh act -l                            # list jobs without running them
gh act workflow_dispatch -j build    # run the build job locally
```

This needs a running Docker daemon. It is not a shortcut: each matrix entry
performs its own `west init` and `west update`, so the first run downloads the
toolchain and the full Zephyr tree and takes considerably longer than the hosted
runner. Use it to validate a keymap change before pushing, or to build without
depending on the fork's Actions being enabled.

For a local build without `act`, use the `west build` command above, which skips
the workflow wrapper entirely and needs a separate ARM toolchain setup.

## Configuration settings

User-adjustable firmware settings belong in the matching `config/*.conf` file.
This includes the keyboard name, power management, RGB defaults, display idle
behavior, and an optional pointing setting. The files under `boards/` describe
the keyboard hardware and its internal defaults; normal users should not edit
them.

## Flashing

The halves use different firmware because the left half is the central side
and the right half is the peripheral side.

1. Download or build the firmware package.
2. Enter the bootloader on the right half and copy its matching right-side UF2
   file to the USB mass-storage device.
3. Enter the bootloader on the left half and copy its matching left-side UF2
   file.
4. Reconnect the keyboard and pair it with the host if necessary.

The artifact names identify each half. For the DE targets they are:

| Target | Left half | Right half |
| --- | --- | --- |
| Corne Choc Pro DE | `corne_choc_pro_de_left.uf2` | `corne_choc_pro_de_right.uf2` |
| Corne Choc Pro DE 5-Col | `corne_choc_pro_de_5col_left.uf2` | `corne_choc_pro_de_5col_right.uf2` |

Enter the bootloader by double-pressing the physical reset button, or use the
bootloader key in the active keymap. On the 5-column keymap, hold `Delete` and
press `X`.

### Resetting saved settings

The build artifact also contains `settings_reset` firmware for the standard
Corne, Piantor, and Sofle targets. Use it when split pairing or stored settings
prevent normal operation:

The standard Corne and Piantor settings-reset files can also be used before
reflashing their matching 5-column or DE firmware because the hardware is the
same. No separate settings-reset targets exist for those variants.

1. Flash the appropriate settings-reset firmware to a half.
2. Allow it to boot and clear the saved settings.
3. Immediately flash the normal firmware for that half again.
4. Repeat for the other half when resetting split pairing.

Settings-reset firmware is temporary and is not a usable keyboard firmware.

## Editing keymaps

### ZMK Keymap Editor

The [ZMK Keymap Editor](https://nickcoutsos.github.io/keymap-editor/) edits the
source `.keymap` files in this repository. Choose the file matching the
keyboard and column count. The accompanying JSON files in `config/` provide
the correct visual geometry.

Editing and committing a source keymap triggers a new GitHub Actions build.
This is the recommended workflow for maintaining and distributing defaults.

For the DE targets, pick the matching `config/corne_choc_pro_de.keymap` or
`config/corne_choc_pro_de_5col.keymap`. The umlaut keys on the `DE` layer are
shown as Unicode bindings to a parameterised behavior, which the editor renders
as a generic key rather than as `ä`, `ö`, `ü`, or `ß`. See
[German umlauts](#german-umlauts-de-targets) for the full walkthrough.

### ZMK Studio

[ZMK Studio](https://zmk.studio/) edits the runtime keymap stored on the
keyboard. Connect the left half directly by USB, unlock Studio from the
keymap, and select the device in the browser.

Studio changes do not update the `.keymap` source file. Conversely, flashing
new firmware may not replace a Studio-edited keymap because the runtime state
is saved. Use **Restore Stock Settings** in Studio after changing between
6-column and 5-column firmware or whenever the compiled default should be
loaded again.

## Power management

Deep sleep is enabled on every half. The keyboard enters deep sleep after one
hour (`3600000` ms) without activity and wakes when a key is pressed. The long
timeout avoids the keyboard appearing to sleep during normal breaks while
still conserving battery during extended inactivity. Change these settings in
the matching `config/*.conf` file.

## RGB controls

RGB underglow is enabled with a conservative maximum brightness. On the
5-column keymap, hold `Esc` for the Media layer:

- `Q`: hue down (`RGB_HUD`)
- `W`: hue up (`RGB_HUI`)
- `E` / `R`: saturation down/up
- `T`: cycle effect

Brightness and toggle controls are on the bottom row of the same layer. The
Adjust layer also contains the complete RGB control set for testing.

## Rotary encoders

Corne Choc Pro supports four encoder definitions:

1. Volume down/up
2. Page Up/Down
3. Previous/next media track
4. Volume down/up

Sofle Choc Pro uses one encoder for volume and the other for previous/next
media track. The encoder actions are available on its default, Lower, and
Raise layers.
