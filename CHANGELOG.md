# Changelog

Every version is published at `https://savcomponents.com/v/<version>/` and never changes afterwards.

## 1.0.0 — 2026-12-15

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
- Charts: `sav-chart-bar` (vertical or horizontal, grouped or stacked, spacing, values), `sav-chart-pie` (pie or donut, gaps of the same width all the way to the centre, centre text),
  `sav-chart-radar`, `sav-chart-line` (area or line, smooth, points, stacked, negative values), `sav-chart-activity` (calendar heatmap).
  Colours from `--sav-chart-1…8`; every chart has a summary and a data table for screen readers.
- New: `sav-carousel` + `sav-slide` (images or image and text, per-view, loop, autoplay), `sav-video`, `sav-audio`, `sav-menu` (a menu that stays
  on the page), `sav-bottom-nav` (phone tab bar), `sav-new-label` (marks what is new, hides itself after a date or once seen), `sav-header` (top bar whose links and search fold into buttons when narrow), `sav-sortable` (drag and drop, also with the keyboard), `sav-dropzone` (file drop),
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

- New: `sav-range-dual`, a slider with two handles for a span (start and end), also with dates (`type="date"`), a minimum gap
  (`min-gap`), and a form value sent as two fields (`name-start`, `name-end`).
- New: `sav-number-input`, a number field with − and + buttons (`buttons="sides | end | none"`) that switch off at min and max;
  hold a button to keep counting, PageUp and PageDown step ten times.
- Range and double range share the same thumb look in every style.
- Tabs: `icon-placement="start | after | end"` on `sav-tabs` or on one `sav-tab` puts the icon before the text, right after it,
  or at the far end of the tab (parts `tab-icon`, `tab-label`).
- Tabs: vertical tabs can fold to icons only and open again with a small handle on the border of the rail, next to the first tab (`collapsible`, `collapsed`,
  `collapse-label`, `expand-label`, `collapse()`, `expand()`, event `sav-collapse`). The labels fold away smoothly and the icons stay put;
  collapsed, each name shows in a tooltip, a tab without an icon shows its first letter, sub tabs become dots under their main tab
  (the open one bigger and coloured) and the main tab stays marked. `collapse-button="row"` puts the button as a row with text
  at the bottom of the rail instead.
- New components: `sav-pagination` (page numbers with “…”, links or buttons, simple mode), `sav-steps` / `sav-step` (the steps of a task, across or down,
  clickable back), `sav-stat` (a KPI with change and trend line), `sav-empty-state`, `sav-popover` (a panel with any content next to a trigger),
  `sav-timeline` / `sav-timeline-item`, `sav-tree` / `sav-tree-item` (keyboard like a file tree), `sav-command` (command palette with ⌘K / Ctrl+K),
  `sav-kbd` (keycaps, ⌘ on a Mac and Ctrl elsewhere), `sav-relative-time` (“3 minutes ago”, kept up to date) and `sav-infinite-scroll`
  (loads more near the end, or with a button, with loading, end and error states).
- `--text-color` on Button, Badge, Tag, Label, Chip and New label: the colour of the text whatever the background.
- `auto-text` on the same six: black or white text, whichever reaches WCAG AA (4.5:1) on the colour behind it — the fill mixed with the page where it is see-through —
  worked out in CSS from the relative luminance, so it follows the theme, the mode and your own colours.
- `auto-text` also on Alert, Avatar, Tooltip, Pagination, Tabs, Header, Date and time picker, Select (`multiple`), Checkbox, Radio,
  Video and Audio (the play button), and on groups that pass it to their items: Steps, Timeline, Tree, Menu, Breadcrumb, Button group,
  Chip group and Radio group. The value on the progress bar is now always black or white by the same exact WCAG formula.
- Animations on every component: `animation="off"` (also on a container: everything inside), `animation="on"`, and
  `animation-duration="ms"` (50–1000, 200 is the normal pace) that scales all its animations; `--sav-motion` does the same in CSS.
  Charts now draw themselves in (bars grow, lines are drawn, slices fade in) the first time and when the data changes; timeline items,
  stat cards and empty states fade in; tags, the audio play button and time options ease their changes. In the builder: an Animation section.
- Tabs: `orientation="horizontal | vertical"` and, for vertical tabs, `side="start | end"` take the place of `placement`
  (`placement="start"` / `"end"` still works).
- Builder and playground: a choice shows its real default by name (for example "Edge", "Underline", "Horizontal") instead of "Default";
  options that only matter in one case (the side and the fold options of vertical tabs) show only then. When the device is larger
  than the stage, the stage scrolls to the component itself.
- New: `sav-chip-input`, a field whose values are chips (Enter, comma or semicolon add one; paste a list; × or Backspace remove), `kind="color"`
  (each chip with its swatch) or `kind="number"`, `max-terms`, suggestions from options. The builder and the playground use it for lists, such as the
  suggested colours of the colour picker.
- New: `sav-zoom`, a zoom control: “−”, the percentage, “+”; a click on the percentage goes back to 100% (`reset`). `min`, `max`,
  `step`, `for` (zooms an element by itself), sizes, `appearance="plain"`; keyboard + − 0.
- Component builder: a zoom for the preview (`sav-zoom`, 25–150 %) and "Fit", the zoom that shows the whole width of the device.
- Portal: every component page has a “Browser support” section: the oldest version of each browser that runs it, then what differs
  between browsers and systems (eyedropper, picture in picture, iOS volume, pop-ups, shortcuts…).
- Builder and playground: every attribute a component takes is there (the ones the table named without a type, or did not name, are added
  with the right control), and the reference tables list them all. Fields with known values suggest them: countries and continents for the
  map (searchable, by name), languages for locale and include/exclude, countries for the country choice, keys for separators, common values
  for autocomplete, accept and hotkey.
- Builder and playground: the data of the charts can be filled in as a table (UI) or written as JSON, with a choice over the field that is
  remembered. Bar, line and radar: the series (named, added, removed) and a row per label with one value per series; pie: label and value;
  activity: a date picker and a value; map: a country choice, or the continents with `by="continent"`, and a value. Other keys of the data
  (such as a series colour) are kept.
- Component builder: what is inside a component (tabs, accordion sections, steps, tree items, bottom navigation, breadcrumb, menu and
  dropdown items, list items, slides, timeline events, sortable and infinite scroll items, options, buttons…) can be edited as a form (UI)
  or as HTML, with a choice that is remembered. Each item shows its main text; the arrow opens its other options (icon, link, value, badge,
  on/off ones) and moves it up or down; items are added like the last one and removed with ×; tree items and command groups take items
  inside. The HTML stays the source: anything the form does not show (an avatar, a shortcut, a style) is kept.
  Header: logo, links (one is the current page), search, buttons and avatar. Dialog and drawer: the message, groups of fields (checkbox,
  switch, field, range), the footer buttons (colour, appearance, "closes it") and buttons in the header. "Current page", the open tab and
  the current item of the bottom navigation are on for one item at a time.
- Brutal: the ink outline (and, on avatars and empty states, the hard shadow) on every filled shape that missed it: avatars (also
  over a picture), the dot of the timeline, the done and failed markers of the steps, the chosen radio, the badge dot, the tiles of
  the empty state, the heading marker, the current carousel dot, the change of a stat, flags, the current bottom navigation item,
  chart bars, pie slices and points. Every other style is unchanged (the ink colour, `--sav-ink-border`, is set only by Brutal).
  Switches, checkboxes and radios too: an ink border that stays when checked or hovered and a hard shadow (larger on hover, like
  the buttons); the switch has a light inked track when off, a coloured inked one when on, and an inked thumb.
- New: `sav-level-path` and `sav-level`, the map of a course as in learning apps: levels on a winding line (`wave`), done ones
  coloured with their icon or a tick and their stars (0–3), the current one with a breathing ring and a bubble (`current-label`), the
  next ones locked (or open with `open`); `milestone`, `variant`, `status`, `href`. A heading, divider or card inside starts a new stretch.
  The nodes are drawn like the style's buttons and knobs (fill, ink border and hard shadow in Brutal, frosted in Glass, a leaning tile in
  Tilt); events `sav-select` and `sav-locked`. In the builder its levels are edited as a form.
  The dotted way ahead has round dots, or little squares in Tilt and with square shapes (`--sav-level-dot-cap`).
- Avatar: `href` (and `target`) makes it a link, `button` a button, for an avatar that opens the profile or a menu. Hover draws a ring
  on the avatar's own shape (the leaning square in Tilt, the circle elsewhere) and the keyboard focus ring follows the same shape,
  instead of the box of a button wrapped around it.
- Date picker: `mode="datetime"` picks a day and a time (2026-11-16T10:30): hours and minutes under the calendar, typed or moved with the
  arrow keys; a day keeps the panel open, Done closes it, Now picks this moment. On phones with `native-on-mobile` it uses the system picker.
- Builder and playground: the moment of the relative time is chosen with the date and time picker, the period of the activity chart with
  date pickers, and the keys of the keyboard key as chips (mod, shift, K…, "then" for a sequence, "or" for another shortcut). The table
  is filled in as a form: its columns (title, numbers or not, added and removed) and a grid of its cells, one row per row.
- Glass: the switch has a frosted track with a rim of light, a coloured glow when it is on and a glossy thumb, in light and dark
  (`--sav-switch-track-shadow`, `--sav-switch-on-shadow`, `--sav-switch-backdrop`, `--sav-switch-thumb-border`).
- Map: `region` frames one continent (Europe, Africa, Asia, North America, South America, Oceania, Antarctica) and dims the rest of the world.
  `by="continent"` makes each continent one area (one colour, one name in the page language, one value; `sav-continent` on a click), and
  `highlight` also takes continents (`highlight="europe"` lights all its countries).
- Video and audio: when they end, the video shows an end screen (the last frame dimmed, the big button again with “Replay”) and the audio's
  play button turns into Replay (with `loop` they start again by themselves instead). `replay-label` names the button. The back and
  forward buttons are rewind and fast forward with “10” beside them, so they are not mistaken for Replay (round arrow) or Loop (repeat). A Loop button in the controls
  (pressed when `loop` is on) turns the repeat on and off; like any control it can be left out with `controls`. When the bar is short of room the
  volume bar leaves it first: the volume button then opens a small panel with the volume bar and a mute switch, instead of muting.
- Infinite scroll: the spinner and its text are spaced and centred; the error line has a “Try again” button with its icon (`retry-label`).
- Practical examples: the list at the top uses the library's buttons, so it follows the chosen style.
- Select: `select-all` (with multiple) adds a row that picks every option or clears them all, also Ctrl/⌘ + A in the list. The Controls
  field of video and audio in the builder uses it: all chosen at first, none chosen means `controls="none"`.
- Audio: the controls of the video player — back and forward 10 s, volume bar, speed — and its keys (Space/K, ← →, ↑ ↓, M);
  `native-controls` uses the browser's player. Audio and video: when the player is small, the controls that do not fit move into a ⋯
  menu (a panel of the library, with named rows), and come back when there is room; `controls="…"` chooses which ones show (by default play / pause /
  replay, the progress bar, the time, mute, the volume and, for the video, full screen; the 10 s buttons, speed, loop, captions and picture in
  picture on request)
  (`controls="none"`: only the video, no bar and no play button, for a muted autoplay loop). In the builder and the playground it is a
  multiple choice with "Select all": all chosen at first, none chosen means no controls. Their seek and
  volume bars are drawn by the library (the same in every browser, the thumb in the style's knob shape).
- Sortable: `grip` shows the drag handle (six dots) in each item, at the start or with `grip="end"` at the end (sideways when horizontal);
  `handle="grip"` lets only the handle drag.
- Search: removing a term (× or Backspace) or emptying the field searches again at once, live or not, so the results follow.
- Search (and the icon fields): the first suggestion is highlighted as the list opens, so Enter takes it; `no-autoselect` keeps the old way.
- Radio: `mark` chooses how the chosen option looks: `fill` (the shape filled, now the default), `dot` (filled with a small mark, as
  before) or `ring` (a coloured border with a mark in the middle); on the group it reaches every radio.
- Builder and playground: an option that depends on another one is disabled, and says why, until that option allows it (the animation
  duration with animations off, the side and fold options of horizontal tabs, the multiple-only options of search and select, and others).
- Colour picker: the eyedropper keeps the panel open while you pick, so the chosen colour is not lost. Where the browser has no eyedropper
  (Safari, Firefox), on Apple devices the button opens the system colour picker, which has its own pipette. By default (`picker="auto"`) the panel is used where the
  browser offers all of it (Chrome, Edge) and the system picker elsewhere; `picker="custom"` keeps the panel everywhere; the page says what each browser does.
- Textarea: the resize handle sits in the corner of the field (the inner space belongs to the text area).
- Portal: the theme presets in Customise sit in as many columns as fit the panel, so it never scrolls sideways.
- Portal: every sidebar link has its icon; the sidebar folds to a rail of icons with a round handle on its edge, like vertical tabs (the names become tooltips; on
  phones the menu button still opens it as a drawer). The builder's options fold the same way, to a rail with one icon per section
  that opens the options there. Both are remembered.
- Component builder: desktop (1024 × 640), tablet (600 × 800) and phone (360 × 720) are shown at their real size inside a frame like
  the device, never shrunk: when the page has less room the stage scrolls. Tablet and phone can be turned to landscape.
- Search: `multiple` turns every term into a chip inside the field (on comma, semicolon, Enter and Space, or the keys in `separators`),
  with `max-terms`, Backspace and × to remove, pasted lists split into terms, `sav-term-add` / `sav-term-remove`; without it the field works as before.
  `live` fires `sav-search` while typing (from `min-chars`), otherwise only on `search-keys` (Enter by default); `sav-search` now also gives `terms`.
- Select (and language, country and region choice): when the list opens above the field, the search box moves to its bottom, next to the field;
  while it is open it stays on the side where it opened, also when filtering makes it shorter. The search box blurs the options
  scrolling underneath (readable on the see-through Glass surfaces) and sits right against the edge of the list.
- New: `sav-color-picker`, a colour field (swatch, hex code, suggested colours `swatches`, `clearable`, `compact`), form-associated. The swatch opens
  the library's own colour panel, in the style and theme of the page: an area for saturation and brightness, hue, opacity (`alpha`, value `#rrggbbaa`),
  the code, an eyedropper where the browser has one, and the keyboard for all of it. `picker="native"` uses the system colour picker instead.
- Button: `aria-expanded`, `aria-pressed`, `aria-controls`, `aria-haspopup` set on `sav-button` reach the real button inside (menu and toggle buttons).
- Header: it can shrink in a flex or grid row (`min-width: 0`), so when there is no room it folds its links instead of overflowing.
- Fewer leftovers when components leave the page: Video removes its full-screen listener, Dropdown and the pickers close and remove their outside-press listener, the lean measurer stops watching removed elements.
- Search: a `suffix` slot (for a key hint or a button).
- A wrong or half-typed `locale` no longer breaks Language choice, Country choice, Date picker and the charts: the page language is used instead.
- Button `loading`: the spinner is the library's own, so it follows the style (the leaning tiles in Tilt and Glass, a square in Sharp); Spinner `variant="current"` takes the colour of the text around it.
- Carousel: a slide with only a picture has no empty band under it.
- Accordion `appearance="plain"` in Glass: the rows have some room on the sides (`--sav-details-plain-inline`).
- Theme choice: `no-auto` offers only Light and Dark (with no value, it shows the mode the system uses).
- Tabs: `placement="end"` puts vertical tabs on the right of the content; the fold handle and the tooltips then sit on their left side.
- Tabs: the main tab of an open sub tab has a light background in vertical tabs, folded or not (it had only a coloured text when open).
- Select: options can have an icon (`<option data-icon="…">`), shown in the list and in the field.
- Tooltip: the arrow is a triangle outside the body, so see-through colours (Glass) no longer show a darker spot where it overlapped.
- Tabs: the bar scrolls only sideways (the indicator stuck out by a pixel and let it scroll up and down).
- Radio group `appearance="buttons"`: a row wider than its place scrolls sideways; an icon next to the text keeps a small gap.
- Avatar: `--ring` draws a ring on the avatar's own shape (leaning square in Tilt, circle, rounded), for avatars that overlap.
- Chip group: the `value` written in the HTML selects its chips even before they are set up (it could start with nothing selected).

## 0.1.0 – 0.2.0 — 2026-11-16

- Development versions, never published.
