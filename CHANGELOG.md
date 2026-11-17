# Changelog

Every version is published at `https://savcomponents.com/v/<version>/` and never changes afterwards.

## 1.0.0 — 2026-11-17

The first public version.

- New site: savcomponents.com, with the library in versioned folders (`/v/1.0.0/sav.js`).
- New components: select with its own list (search, multiple choice, groups), date picker (day, month, year),
  time picker, info tip, container, code block and inline code.
- Pickers, dropdown, dialog and info tip can open as a sheet from the bottom on phones (`sheet-on-mobile`);
  pickers can use the phone's own picker (`native-on-mobile`).
- Dropdown: several choices at once (`multiple`).
- Alert: `protected` variant with a shield.
- Tilt style: the lean can follow the length of each element (`--sav-tilt-lift`) or be a fixed angle (`--sav-tilt`);
  fields, tabs, switches, radios, checkboxes and avatars have a tilt look.
- `shape="tilt | squared | rounded"` on any component.
- Popups (pickers, dropdown, info tip, dialog) lean with the Tilt style while their content stays upright (`--sav-panel-lift`, `--sav-panel-shadow`);
  the checkboxes of a multiple select follow the style like `sav-checkbox`.
- Range: track and thumb change with the style (Tilt leaning tile, Sharp bar, Brutal inked block, Glass pearl), set by the `--sav-range-*` tokens.
- Code block: a highlighted line is one continuous band, the same height as its number and as wide as the block.
- Fields: a label or help given in a slot replaces the `label`/`help` attribute instead of showing both.
- Radio group `appearance="buttons"`: drawn like the segmented tabs in every style (leaning in Tilt).
- Spinner and progress ring follow the style: in Tilt the spinner is the logo's four tiles lighting up and the ring is a leaning square;
  Sharp uses squares, Brutal rounded squares (`--sav-spinner-tiles`, `--sav-spinner-radius`, `--sav-ring-radius`, `--sav-ring-tilt`, `--sav-ring-start`).
- Tilt popups and dialogs look like the cards: a tinted plate leaning the other way and a soft shadow instead of an offset block
  (`--sav-panel-back`; the info tip arrow is hidden while the panel leans, `--sav-panel-arrow`); tooltips and toasts drop the offset shadow too.
- Tooltips, info tips, dropdowns and pickers close when the element they belong to scrolls out of view.
- Pickers open from anywhere on the field, the arrow included.
- Glass style redone: a glossy sheen on surfaces, slightly see-through colours, frosted buttons, tags, badges, tracks and tooltips,
  in light and dark (`--sav-sheen`, `--sav-fill-opacity`, `--sav-button-backdrop`, `--sav-track-shadow`, `--sav-switch-*`).
- Copy button: drawn on a layer that leans in Tilt (flips on hover), with a small "stamp" and a pop of the tick when the text is copied.
- Style review: Sharp has no round shapes left (badges, tags, pill tabs, avatars), Brutal inks badges and tags,
  and the round skeleton takes the avatar shape of the style (a leaning square in Tilt).
- Container: in Tilt the surface and muted backgrounds lean (content upright) and the surface has the card's tinted plate behind it.
- Glass: a light section inside a dark page (or the other way round) keeps its own glass colours.
- Icons live in their own versioned set, `/icons/1.0.0/`, shared by every library version instead of being copied into each one
  (`Sav.iconsVersion`; `data-icon-base` on the script tag or `Sav.iconBase` to load them from elsewhere).
- Icons that were identical drawings under two names keep one file; the old names still work (`aliases.json`).
- Accessibility: every component page has a WCAG 2.2 AA section with the colour contrast measured live in all styles and modes.
  Light colours adjusted to pass: coloured text (`--sav-tint` 52%), field and control borders, focus ring, success and danger, placeholders, Glass borders.
  In light mode indicators (progress, spinner, range, tab marker, filled star or icon, switch on) use a darker shade of the same colour
  (`--sav-indicator-l`): every measured combination now meets WCAG AA.
- The avatar in the top bar and on the account page follows the chosen style.
- Vertical tabs follow the style: in Soft and Sharp the tabs sit on a rail and the selected one is a raised card, Tilt fills it,
  Brutal inks it, Glass makes it a glass plate (`--sav-tab-vertical-*` tokens); the site's side menu matches.
- New components: `sav-label` (section caption), `sav-chip` + `sav-chip-group` (selectable chips), `sav-heading` (h1–h6 with marker, label, subtitle),
  `sav-grid`, `sav-table` (styles a normal table, sortable), `sav-image` (ratio, caption, zoom), `sav-list` + `sav-list-item`.
- Code block: TypeScript, JSX and TSX are named correctly.
- New: `sav-language-choice` (about 140 languages with regional variants, flags, ISO 639-3 codes) and `sav-country-choice` (all 249 ISO countries,
  flags, alpha-3 codes), both searchable and multiple, names in the page language; `sav-flag`; `sav-chart-map` (world choropleth,
  highlight, zoom on countries). Flags and the map are asset sets with their own version (`flags/1.0.0/`, `maps/1.0.0/`).
- Carousel: solid arrow buttons that read on any picture; full width by default (it collapsed in flex rows); the drag lands on the
  nearest slide, a quick flick moves one, pictures are never dragged as images.
- Carousel: drag with the mouse; `no-swipe` and `no-keyboard` switch gestures and keys off. Image: the zoom shows the picture (it
  collapsed to nothing). Sortable: mouse dragging works. Drop zone: also text, links and HTML dragged or pasted (`kind`).
- Video: its own control bar (play, ±10 s, seek, time, volume, speed, captions, picture-in-picture, full screen; hides while playing; keys),
  `native-controls` for the browser's bar; video, audio and image take the full width (they collapsed in flex rows).
- Showcase: one or two desktops, one to three phones, or both (`desktop` and `mobile` take lists).
- Breadcrumb: the current page follows the style (tint, leaning tile, underline, inked block, glass), hover on links, `appearance="contained"`,
  `max-items` folds long paths behind “…”. Site: the header uses the Theme choice (Light, Dark, Auto).
- Theme choice: Auto has its own built-in icon, a circle half filled (dark and light together): `theme-auto`.
- Charts: `sav-chart-bar` (vertical or horizontal, grouped or stacked, spacing, values), `sav-chart-pie` (pie or donut, gaps, centre text),
  `sav-chart-radar`, `sav-chart-line` (area or line, smooth, points, stacked, negative values), `sav-chart-activity` (calendar heatmap).
  Colours from `--sav-chart-1…8`; every chart has a summary and a data table for screen readers.
- New: `sav-carousel` + `sav-slide` (images or image and text, per-view, loop, autoplay), `sav-video`, `sav-audio`, `sav-menu` (a menu that stays
  on the page), `sav-bottom-nav` (phone tab bar), `sav-sortable` (drag and drop, also with the keyboard), `sav-dropzone` (file drop),
  `sav-showcase` (section with desktop and phone screenshots).
- New form components: `sav-otp` (one-time code: length, numbers / letters / both / any, groups, mask), `sav-password` (strength meter and
  rules: length, upper and lower case, digits, symbols; can refuse weak passwords), `sav-search` (suggestions while typing, from options or
  live from the page), `sav-theme-choice` (Light, Dark, Auto with icons, as a menu or buttons). `Sav.getMode()`.
- New component: `sav-favourite-button`, a star, heart or bookmark toggle (aria-pressed) that fills with its colour, with a small pop.
- Site: a demo website made only with the library (`demo.html`); pages of components built from others say which; groups Content, Media,
  Charts and Sections.
- Icons: old names are resolved before loading, so no request fails on the way.
- Site: practical examples show the JavaScript and TypeScript that handle their events; Getting started explains Vue, Angular, React, Svelte,
  TypeScript and server rendering; the page label and the favourite star use the library's own components; the version badge opens a
  version picker for the documentation.
- Site: Tilt is the default style and the chosen style now shapes the whole site; new Versions page (changes between major versions).
- More than 2,000 icons (plus their older names), loaded on demand (most from Lucide, ISC licence).
- Primary colour: the light blue of saveriomorelli.com (`#66cbff`).

## 0.1.0 – 0.2.0 — 2026-11-16

- Development versions, never published.
