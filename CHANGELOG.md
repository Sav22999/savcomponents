# Changelog

Every version is published at `https://savcomponents.com/v/<version>/` and never changes afterwards.

## 1.3.2 — 2026-11-28

- Sheets on phones (`sheet-on-mobile`, still opt-in: without it nothing changes): the dropdown, the context menu, the info tip,
  the popover and the dialog open in a real `sav-action-sheet` instead of a sheet of their own, with its handle (drag it down to
  close), title, close button, overlay and focus trap. The dropdown and the context menu also get Cancel (Done with `multiple` or
  `stay-open`); submenus of the context menu open in place under their item; the buttons of the dialog go one under the other,
  the main one on top. The focus goes back to the trigger when the sheet closes, also inside another component.
- The select, the language and country choices, the date and time pickers keep a sheet of their own (search, calendar, columns):
  its panel now clips what is inside and its header reaches the edges (no box around it, most visible in Glass); the search of
  the select spans the whole sheet.
- Colour picker: `sheet-on-mobile` opens the panel as a sheet from the bottom on phones, with a bigger area, sliders and buttons
  for a finger, the name of the field and Done, the suggested colours inside it; drag the handle down or tap outside to close it.
- Theme choice: `sheet-on-mobile` opens its menu as an action sheet on phones. A choice now sends a single `change` (with the
  theme); the inner menu's own `change` and `sav-select` no longer leave the component.
- Time picker: the AM/PM column has a header, so its rows line up with the hours; with no time yet the period of the current
  time is already chosen, and pressing AM or PM no longer sets 12:00. The column headers sit above the columns, with no
  background of their own; Hour and Min are translated.
- Bottom navigation: with more than `max-items` (default 5) destinations, the first four stay and a fifth, More (three dots;
  `more-label`, `more-icon`), opens an action sheet with the others. More is marked when the current page is inside it and
  shows a dot when one of them has a badge. Avoid it if you can: keep the bar to 3–5 destinations.
- Toasts on phones: across the screen whatever the corner, clear of the notch and the home bar, three at most at a time; a swipe
  to the side closes one; touching it pauses it, and a tap no longer leaves its timer paused for good; a bigger close button.
  Toasts at the top come in from above.
- Docs: an "On phones" section for the select, the pickers, the language, country and theme choices, the colour picker, the
  dropdown, the context menu, the popover and the dialog.
- Subresource Integrity: every release carries `v/<version>/integrity.json` with the `sha384` hashes of its `sav.js` and
  `sav.css` (backfilled for the earlier releases too), and the copy-paste snippet now includes `integrity` and
  `crossorigin="anonymous"` so a site that embeds a frozen release can pin the exact bytes.

## 1.3.1 — 2026-11-28

- Action sheet: `footer-layout="row"` puts the footer buttons side by side only on screens wider than 640px; on phones they go
  one under the other again, at full width, with Cancel at the bottom. The new `footer-layout="row-always"` keeps them side by
  side everywhere.
- Action sheet: `placement="center"` is gone. In the middle of a wide screen the sheet was a dialog with menu items: for that use
  `sav-dialog`, and for a menu that opens next to its button on wide screens and rises from the bottom on phones use
  `sav-dropdown sheet-on-mobile`. The sheet now always rises from the bottom; a page that still sets the attribute gets the sheet
  at the bottom. Sites that load `v/1.3.0/` keep the old behaviour.

## 1.3.0 — 2026-11-28

- New component: action sheet (`sav-action-sheet`). A list of actions, or any content, that rises from the bottom of the screen:
  a handle to drag it down to close it (and up to unfold it, with `expandable`), a title with a close button (an icon, or a word with
  `close-style="text"`), and a tinted footer with Cancel and any buttons of your own (`slot="footer"`, side by side with
  `footer-layout="row"`). Its rows are the items of the dropdown (`sav-menu-item`, `sav-menu-label`, `sav-divider`, checkbox and
  danger items), bigger for a finger, with the arrow keys, Home, End and type-ahead; choosing one closes it (`stay-open` keeps it).
  `size="half"` or `"full"` sets its height; on wide screens it stays at the bottom, `--width` wide, or opens in the middle with
  `placement="center"`. `sheet.pick()` opens it and resolves with the value chosen (null when it closes without a choice);
  `Sav.actionSheet({ label, items })` builds one from a list and does the same. The panel is the popup panel of every style.

## 1.2.2 — 2026-11-28

- Sheets on phones (`sheet-on-mobile` of the dialog, the dropdown, the popover and the select): the panel reaches the edges of the
  screen. The panel kept a transparent border of its own and its surface was drawn inside it, so a thin strip of the backdrop
  showed along the sides and the rounded top corners of the two did not match. The line of the sheet is now on its top edge only.

## 1.2.1 — 2026-11-28

- Context menu: a right click that something inside the area already answered (`preventDefault()` in its own `contextmenu`
  listener: a menu of its own, a canvas or a drawing surface that uses the right button) no longer opens it as well. Before, a
  context menu on a large area (the whole page) opened on top of the menus of the elements inside it. A context menu nested in
  the area still wins over the outer one, as before.

## 1.2.0 — 2026-11-28

- New component: context menu (`sav-context-menu`). Your own menu for the right click on an area of the page, instead of the
  browser's: `for="id"` names the area, or the area goes inside it with `slot="target"`. It also opens with a long press on phones
  and tablets (iPhone and iPad too) and with the menu key or Shift F10 on the focused area, under the focused element. It opens at
  the pointer and turns to another corner near the edges of the window. Same items as the dropdown (`sav-menu-item`,
  `sav-menu-label`, `sav-divider`, checkbox and danger items, shortcuts in the `suffix` slot), and submenus that fly out to the side
  (`<sav-menu slot="submenu">` inside an item), on the left when there is no room on the right; resting the pointer on an item opens
  its submenu, like the menus of the system. The panel and its submenus are the popup panel of every style: the leaning plate of
  Tilt, the offset block of Sharp, the ink of Brutal, the frosted glass of Glass. `sav-show` tells which element was right-clicked
  (`detail.target`, also in `sav-select`) and `preventDefault()` on it lets the browser's menu show instead; in text fields the
  browser's menu always stays, for copy and paste. Keyboard: arrows, Home, End, type-ahead, Enter, → into a submenu, ← or Escape
  back, Tab closes; the focus returns where it was. A right click or a long press does not move the focus, as with the menu of
  the system: a text field elsewhere on the page keeps it, with its caret and selection (no blur, so no "required" error appears),
  choosing an item with the pointer does not take it either, and the arrow keys or a letter still move into the menu.

## 1.1.4 — 2026-11-28

- Video: a spinner in the middle of the player while the video waits for its data (a jump to a part not loaded yet, a slow
  connection), so it no longer looks frozen. It shows after a quarter of a second, so a short wait does not flash it, and goes
  away as soon as the video plays again, is paused, ends or fails. Screen readers hear "Loading" (`role="status"`); its part is
  `loading`.

## 1.1.3 — 2026-11-27

- Themes: the text on the primary colour follows it. A site that sets only `--sav-color-primary` used to keep the dark text made
  for the default light blue, so a violet or a dark green button had dark text on it (2.98:1 on #7845f4, below WCAG AA). Now
  `--sav-color-on-primary` is worked out from the primary colour: white or near-black (#041722), whichever has the higher
  contrast. Set `--sav-color-on-primary` yourself to choose another colour; it always wins. The choice is made on `:root` or on
  the element with a `sav-theme-*` class, so an element that changes the primary colour only for itself still sets its own
  `--sav-color-on-primary`. Browsers without relative colours keep the written values.
- Command palette: the search ignores accents, so "citta" finds "Città", and a command whose name matches comes before one that
  matches only in its description, keywords or group.

## 1.1.2 — 2026-11-26

- Details (`appearance="plain"`): the last one has no line under it. The line separates one row from the next, so the last of an
  accordion, or a single plain details inside a card, no longer ends with a separator hanging below it.

## 1.1.1 — 2026-11-26

- Radio group: `appearance="cards"` turns the options into a grid of cards, each with a picture of its own (slot `media`), its name
  and a line under it (slot `description`): looks, layouts, templates, plans. The cards are drawn with the tokens of `sav-card`, so
  they follow every style (Tilt's leaning plate, Sharp's offset block, Brutal's ink, Glass's rim); the mark of the radio sits in their
  top corner and the chosen one takes the colour. Same keyboard, form value and events as the other radio groups. `columns="n"`
  fixes how many per row; `--sav-choice-min`, `--sav-choice-gap`, `--sav-choice-padding` and `--sav-choice-align` shape the grid.
  New style tokens: `--sav-choice-checked-border`, `--sav-choice-checked-shadow`, `--sav-choice-checked-tint`,
  `--sav-choice-hover-shadow`, `--sav-choice-hover-transform`.

## 1.1.0 — 2026-11-25

- The words the components write by themselves (Done, Today, Light, Show password, "Character 1 of 6"…) follow the language of
  the page: the closest `lang` attribute, then English. Italian is built in; `Sav.addStrings('fr', { Done: 'Terminé' })` adds a
  language or changes some words. English pages look exactly the same, and the `*-label` attributes still win.
  Every word goes through it, also what only screen readers hear ("carousel", "slide", "200 degrees"), the zoom buttons, the key names
  of `sav-kbd` and of the command palette (Maiusc, Spazio, Canc, Invio; "G poi I") and the names of the continents of the map.
  Names of languages, countries and continents follow the closest `lang` too (they followed only the whole page).
- Focus: a table is a stop of the Tab key only when it is wider than its frame (then the frame is a region named by `label`
  or the caption, scrolled with the arrows); a table that fits, like separators and containers, never takes the focus.
- Avatar with `href` or `button`: `focus()` reaches its link or button, so a popover opened from it gives the focus back.
- Fields (input, select, pickers, number, search, chips, password, colour, OTP, zoom) look the part in every style: Glass etches them
  into the glass (a soft shadow inside, a rim of light, brighter while you hover and type, a coloured glow on focus); Tilt and Sharp
  show a tinted block behind the focused field; Brutal keeps its ink border on focus and the hard shadow turns to the main colour;
  a filled field keeps the ink border in Brutal and gets an underline in Sharp. New tokens: `--sav-field-shadow`, `--sav-field-sheen`,
  `--sav-field-bg-hover`, `--sav-field-bg-focus`, `--sav-field-focus-shadow`, `--sav-field-focus-border`, `--sav-field-filled-bg`,
  `--sav-field-filled-border`.
- Styles mixed in one page: a section with another style no longer inherits what the page's style set (Tilt's lean on the number
  buttons, colour swatches and OTP cells of a Sharp, Brutal or Glass section, Brutal's ink, Glass's sheen).
- Same height for every control of the same size, in every style: in Brutal select, date, time, language and country pickers were 2px
  taller than fields and buttons; the buttons of a radio group, the theme choice buttons and the segmented tabs are now as tall as a
  field (the theme choice also takes `size`).
- OTP: the cells shrink together to fit a narrow space instead of wrapping onto a second line.
- Brutal: empty stars and hearts of the rating are light with an ink outline (they looked filled in black); chart grid lines are a light
  ink instead of crossing the bars (`--sav-rating-empty`, `--sav-chart-grid`).
- Showcase: one column when the showcase itself is narrow, not only on narrow screens.

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
- Number input: after a wrong entry a line under the field says why instead of a red border only (too small, too large,
  which steps fit); `limits="always"` also shows the allowed range beforehand ("From 1,024 to 131,072 tokens"), `limits="never"`
  shows nothing. `button-step` lets the buttons and arrows move by more than `step`.
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
