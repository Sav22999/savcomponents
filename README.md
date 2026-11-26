# SavComponents

Web components you can make your own: buttons, fields, pickers, dialogs, tabs and more, as plain HTML tags.
No framework, no build step. Themes with CSS custom properties and five styles (Soft, Tilt, Sharp, Brutal, Glass).

**Site and documentation: https://savcomponents.com**

## Use it on any site

```html
<link rel="stylesheet" href="https://savcomponents.com/v/1.1.0/sav.css">
<script src="https://savcomponents.com/v/1.1.0/sav.js" defer></script>

<sav-button>Hello</sav-button>
```

The address contains the version: a site keeps working the same way when a newer release comes out.
A theme saved with an account has its own link: `https://savcomponents.com/theme/<id>.css`.

## Languages

From version 1.1.0.

The words the components write by themselves follow the language of the page (`<html lang="it">`, or the closest `lang`):
English and Italian are built in. Add a language, or change some words, right after `sav.js` (the English text is the key):

```js
Sav.addStrings('fr', { Done: 'Terminé', 'Page {n}': 'Page {n}' });
```

`Sav.strings.it` has the whole list: every word a component writes or says to screen readers, key names (`Shift`, `Space`…)
and continent names included. A `*-label` attribute of a component always wins. Dates, numbers and the names of languages and
countries come from the browser in the same language. Components already on the page keep their words until they are drawn again.

## Repository

| Path | What |
| --- | --- |
| `dist/` | The library in development: `sav.css` (tokens, modes, styles), `sav.js` (all components) |
| `flags/<version>/` · `maps/<version>/` | Flags (flag-icons, MIT) and the world map (world-atlas, ISC), versioned on their own like the icons (`Sav.flagsVersion`, `Sav.mapsVersion`) |
| `demo.html` | A demo website made only with the library |
| `icons/<version>/` | The icon set (SVG files + `index.json`), versioned on its own and shared by every library version: `Sav.iconsVersion` says which one a library uses. New sets with `tools/release-icons.sh` |
| `v/<version>/` | Published versions, frozen by `tools/release.sh`. Never edit them. |
| `index.html`, `docs/` | The documentation site (component pages with a full reference of attributes, slots, events and methods, playground, component builder, customiser, accounts, admin) |
| `theme.php` | Serves `/theme/<id>.css` from the accounts API, with a 5-minute cache |
| `privacy.html` | Privacy notice of the accounts |
| `tools/release.sh` | Publishes the version written in `dist/sav.js` |
| `tools/og-banner.html` | Source of the Open Graph banner `docs/og.png`: `sh tools/og-banner.sh` renders it with Chrome |

Accounts (favourites, saved themes and components, master admin) use the API on saveriomorelli.com
(`projects/savcomponents/api/`), which has the database. This site is static apart from `theme.php`.

## Release a new version

1. Change the code in `dist/`, then raise `Sav.version` at the top of `dist/sav.js` (and the header of `dist/sav.css`).
2. `sh tools/release.sh` copies it to `v/<version>/` and refreshes the stylesheet copy used by the API.
3. Update `CHANGELOG.md`, the version shown in `index.html`, and upload.

## Licence

MIT © 2026 Saverio Morelli. Most icons come from [Lucide](https://lucide.dev) (ISC licence, see `icons/1.0.0/LICENSE-lucide.txt`).
