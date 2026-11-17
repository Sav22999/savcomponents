# SavComponents — rules for Claude

## Versions

- **The library** (`dist/sav.css`, `dist/sav.js`) is released with `sh tools/release.sh`.
  - It copies only those two files into `v/<Sav.version>/`.
  - A released folder never changes: for a new release, bump `Sav.version` in `dist/sav.js` first.
  - The header comments of both files carry the version too.
- **The icons have their own version**, separate from the library, so they are not copied into every library version.
  - They live once in `icons/<iconsVersion>/`: the SVG files, `index.json` (names and search words), `aliases.json` (old names) and the Lucide licence.
  - `Sav.iconsVersion` in `dist/sav.js` says which set a library version uses.
  - **Bump the icon version only when the icons themselves change** (added, removed or redrawn). Do it with `sh tools/release-icons.sh <new-version> [folder]`, then update the new `index.json` and `Sav.iconsVersion`.
  - Never edit a published icon set.
  - A library release that does not touch the icons keeps the same `Sav.iconsVersion`.
- **Flags and maps follow the same rule as the icons**: `flags/<Sav.flagsVersion>/` (flag-icons, MIT) and `maps/<Sav.mapsVersion>/`
  (world-atlas, ISC, pre-projected to SVG paths in `world.json`). Bump their version only when their files change; never edit a published set.
- **No duplicate files.**
  - Identical drawings keep one SVG; the other names go in `aliases.json`.
  - Never copy icons (or other shared assets) into `v/<version>/`.
  - The only intended copy is `dist/` ↔ the newest `v/<version>/`.
- **Changelog and Versions page**
  - Every release goes in `CHANGELOG.md`.
  - Only major-version changes (1.x → 2.x) go on the docs Versions page (`MAJORS` in `docs/docs.js`).

## Accounts API

- The accounts API lives in another repository: saveriomorelli.com, `projects/savcomponents`.
  - `tools/release.sh` also refreshes its `lib/sav.css`.
  - Test it only on a throwaway database, never the production one.

## Secrets

- Never commit secrets: passwords, keys, tokens, real database names, real emails, deployment configs.
  - Keep them in git-ignored files (`.idea/`, `cache/` and the API's `credentials.php` are ignored).
  - Check what a commit would add before committing.
- No `Co-Authored-By` lines in commits.

## Design

- **The site follows the chosen style** (Tilt by default) everywhere.
  - Exception: the side-by-side Styles page.
  - In `docs/docs.css` only Tilt leans (`--lean`); radius, borders and shadows come from the style tokens.
- **Accessibility**: every component page shows a WCAG 2.2 AA section (`docs/a11y.js`).
  - Contrast is measured live; keep its written notes in sync when a component's keyboard, roles or motion change.
- **Icons in the interface** are SVG, never emoji.
