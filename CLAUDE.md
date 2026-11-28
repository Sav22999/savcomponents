# SavComponents — rules for Claude

## Versions

- **The library** (`dist/sav.css`, `dist/sav.js`) is released by itself when it reaches main with a new version:
  - bump `Sav.version` in `dist/sav.js` and the header comments of both files, and add the `## x.y.z — YYYY-MM-DD` section to
    `CHANGELOG.md`; then push to main.
  - `.github/workflows/release.yml` runs `tools/auto-release.sh`: when `Sav.version` is newer than every `v/<version>/`, it does
    what `tools/release.sh` does (copies only those two files into `v/<Sav.version>/`, the version menu, llms.txt, sitemap.xml)
    and commits it on main as `github-actions[bot]`. Without the changelog section or the headers it stops and says why.
  - Then `tools/github-release.sh` makes the GitHub release (tag `v<version>`, a zip, the notes from `CHANGELOG.md`).
    `DRY_RUN=1` before either script shows what it would do.
  - After such a push, pull main: the release commit is on GitHub only.
  - By hand it still works: `sh tools/release.sh` (then the workflow only makes the GitHub release).
  - A released folder never changes: for a new release, bump `Sav.version` first.
  - The copy of `sav.css` for the accounts API is made only by `tools/release.sh` on this computer: after an automatic release,
    copy `dist/sav.css` to the API's `lib/sav.css` by hand.
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
  - Every release goes in `CHANGELOG.md` (`## x.y.z — YYYY-MM-DD`, then `- ` items).
  - The docs Versions page reads `CHANGELOG.md` and lists every release under its major version: never copy release notes into `docs/docs.js`.
  - Only major versions (1.x → 2.x) get a card in `MAJORS` in `docs/docs.js`, with what to migrate.
  - The version menu next to the logo lists `window.SAVC_RELEASES` in `index.html` (`tools/release.sh` adds each release); `?v=x.y.z` runs the site on that release.

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
