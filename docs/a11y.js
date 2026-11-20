/* SavComponents docs — "Accessibility" section of each component page (WCAG 2.2, level AA).
   Colours: the contrast is measured live in the browser for every style and both modes, with the current theme
   (so a customised primary colour is checked too). Translucent surfaces (Glass) are measured over the plain page colour.
   Everything else (keyboard, roles, focus, motion, target size) is a written list kept in sync with dist/sav.js. */
(() => {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- colour maths */
  const ctx = (() => { const c = document.createElement('canvas'); c.width = c.height = 1; return c.getContext('2d', { willReadFrequently: true }); })();
  /** Any CSS colour (oklab, color-mix results…) → [r, g, b, a] in sRGB 0–255, via a 1-pixel canvas. */
  function rgba(css) {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000'; ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  }
  const over = (fg, bg) => { const a = fg[3]; return [fg[0] * a + bg[0] * (1 - a), fg[1] * a + bg[1] * (1 - a), fg[2] * a + bg[2] * (1 - a), 1]; };
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

  /* ---------- what to measure: [label, foreground, background layers from top to bottom, minimum ratio] */
  const C = (v) => `var(--sav-color-${v})`;
  const ON = (v) => `var(--sav-color-on-${v})`;
  const CTEXT = (v) => `color-mix(in oklab, ${C(v)} var(--sav-tint, 62%), var(--sav-color-text))`;
  const FILL = (v) => `color-mix(in oklab, ${C(v)} var(--sav-fill-opacity, 100%), transparent)`;
  const SOFT = (v) => `color-mix(in oklab, ${C(v)} 13%, transparent)`;
  const BG = 'var(--sav-color-bg)', SURF = 'var(--sav-color-surface)', SURF2 = 'var(--sav-color-surface-2)', INPUT = 'var(--sav-color-input-bg)';
  const TEXT = 'var(--sav-color-text)', MUTED = 'var(--sav-color-text-muted)';
  const IND = (v) => `oklch(from ${C(v)} calc(l * var(--sav-indicator-l, 1)) c h)`;
  const VARIANTS = ['primary', 'neutral', 'success', 'warning', 'danger', 'protected'];
  const name = (v) => v[0].toUpperCase() + v.slice(1);

  const G = {
    text: [['Text on a surface', TEXT, [SURF, BG], 4.5], ['Secondary text on a surface', MUTED, [SURF, BG], 4.5]],
    pageText: [['Secondary text on the page', MUTED, [BG], 4.5]],
    solid: VARIANTS.map((v) => [`${name(v)}: text on the filled colour`, ON(v), [FILL(v), SURF, BG], 4.5]),
    soft: VARIANTS.map((v) => [`${name(v)}: coloured text on its light tint`, CTEXT(v), [SOFT(v), SURF, BG], 4.5]),
    outline: VARIANTS.map((v) => [`${name(v)}: coloured text on a surface`, CTEXT(v), [SURF, BG], 4.5]),
    alert: VARIANTS.map((v) => [`${name(v)}: text on the tinted box`, TEXT, [SOFT(v), SURF, BG], 4.5]),
    focus: [['Focus ring against the page', 'var(--sav-color-focus)', [BG], 3]],
    field: [['Typed text in a field', TEXT, [INPUT, SURF, BG], 4.5], ['Placeholder text', MUTED, [INPUT, SURF, BG], 4.5],
      ['Field border against the page (where the field is)', 'var(--sav-color-border-strong)', [BG], 3]],
    control: [['Check mark or dot on the checked control', ON('primary'), [C('primary'), BG], 3], ['Empty control border against the page', 'var(--sav-color-border-strong)', [BG], 3]],
    switchTrack: [['Switch off: track against the page', 'var(--sav-switch-track, var(--sav-color-border-strong))', [BG], 3]],
    track: [['Filled part against the track', IND('primary'), [SURF2, BG], 3]],
    spinner: [['Spinner arc against the page', IND('primary'), [BG], 3]],
    rating: [['Filled star against the page', IND('warning'), [BG], 3], ['Empty star against the page', 'var(--sav-color-border-strong)', [BG], 3]],
    tooltip: [['Tooltip text on the tooltip', 'var(--sav-color-tooltip-text)', ['var(--sav-color-tooltip-bg)', BG], 4.5]],
    code: [['Code text on the code background', 'var(--sav-code-text)', ['var(--sav-code-bg)', BG], 4.5]],
    tabs: [['Inactive tab text on the page', MUTED, [BG], 4.5], ['Active tab text on the page', CTEXT('primary'), [BG], 4.5], ['Active tab marker against the page', IND('primary'), [BG], 3]],
    surface2: [['Text on the muted background', TEXT, [SURF2, BG], 4.5]],
    favourite: [['Filled star against its button', IND('warning'), [`color-mix(in oklab, ${C('warning')} 12%, ${SURF})`, BG], 3], ['Filled heart against its button', IND('danger'), [`color-mix(in oklab, ${C('danger')} 12%, ${SURF})`, BG], 3], ['Filled bookmark against its button', IND('primary'), [`color-mix(in oklab, ${C('primary')} 12%, ${SURF})`, BG], 3]],
    avatar: [['Initials on their tint', CTEXT('primary'), [`color-mix(in oklab, ${C('primary')} 22%, transparent)`, SURF, BG], 4.5]],
  };
  const COLOR = {
    button: ['solid', 'soft', 'outline', 'focus'], 'button-group': ['outline', 'focus'], 'copy-button': ['text', 'focus'], 'favourite-button': ['favourite', 'text', 'focus'],
    alert: ['alert'], toast: ['alert', 'solid'], badge: ['solid', 'soft', 'outline'], tag: ['soft', 'solid'],
    spinner: ['spinner'], progress: ['track', 'pageText'], skeleton: [], input: ['field', 'focus'], textarea: ['field', 'focus'],
    select: ['field', 'text', 'focus'], 'date-picker': ['field', 'text', 'focus'], 'time-picker': ['field', 'text', 'focus'],
    checkbox: ['control', 'switchTrack', 'focus'], radio: ['control', 'focus'], range: ['track', 'focus'], 'range-dual': ['track', 'focus'], 'color-picker': ['field', 'focus'], pagination: ['text', 'focus'], steps: ['text', 'focus'], tree: ['text', 'focus'], 'infinite-scroll': ['text'], stat: ['text', 'pageText'], timeline: ['text'], kbd: ['text'], 'relative-time': ['pageText'], 'empty-state': ['pageText'], popover: ['text', 'focus'], command: ['text', 'focus'], 'number-input': ['field', 'soft', 'focus'], rating: ['rating', 'focus'],
    card: ['text'], avatar: ['avatar'], divider: ['pageText'], container: ['text', 'surface2'], icon: [], code: ['code'],
    dialog: ['text'], drawer: ['text'], dropdown: ['text', 'focus'], 'info-tip': ['text', 'pageText'], tooltip: ['tooltip'],
    tabs: ['tabs', 'focus'], accordion: ['text', 'focus'], breadcrumb: ['pageText'],
    otp: ['field', 'focus'], password: ['field', 'focus'], search: ['field', 'text', 'focus'], 'theme-choice': ['text', 'focus'],
    'new-label': ['text'], header: ['text', 'focus'], carousel: ['spinner', 'focus'], video: ['pageText'], audio: ['text', 'focus'], menu: ['text', 'focus'], 'bottom-nav': ['text', 'focus'], sortable: ['focus'], dropzone: ['text', 'field', 'focus'], showcase: ['pageText'],
    'chart-bar': ['spinner', 'pageText'], 'chart-pie': ['spinner'], 'chart-radar': ['spinner', 'pageText'], 'chart-line': ['spinner', 'pageText'], 'chart-activity': ['spinner', 'pageText'],
    'language-choice': ['field', 'text', 'focus'], 'country-choice': ['field', 'text', 'focus'], flag: [], 'chart-map': ['spinner', 'pageText'],
    label: ['solid', 'soft', 'outline'], chip: ['soft', 'text', 'focus'], heading: ['text', 'pageText'], grid: [], table: ['text', 'pageText'], image: ['pageText'], list: ['text', 'focus'],
  };

  /* ---------- everything else: [criterion, 'ok' | 'partial' | 'you', explanation] */
  const KEY = '2.1.1 Keyboard', FOCUS = '2.4.7 Focus visible', NAME = '4.1.2 Name, role, value', MOTION = '2.3.3 Animation';
  const LABEL = '3.3.2 Labels', TARGET = '2.5.8 Target size', ALT = '1.1.1 Text alternatives', STATUS = '4.1.3 Status messages';
  const NOTES = {
    button: [[KEY, 'ok', 'A real button (or link with href): Enter and Space work.'], ['1.4.3 Contrast (minimum)', 'ok', 'With auto-text the text turns black or white, whichever reaches 4.5:1 on the colour behind it (also Badge, Tag, Label, Chip, New label, Alert, Avatar, Tooltip, Tabs, Pagination, Steps, Menu, Breadcrumb, Tree and the pickers).'], [FOCUS, 'ok', 'Focus ring shown on keyboard focus.'],
      [NAME, 'ok', 'Name from its text; loading sets aria-busy, disabled sets aria-disabled.'], [ALT, 'you', 'An icon-only button needs a label (label attribute or aria-label).'], [TARGET, 'ok', 'At least 32px high (size sm).']],
    'button-group': [[NAME, 'ok', 'role="group"; give it a label when the group has a meaning.'], [KEY, 'ok', 'Each button stays a normal button.']],
    'copy-button': [[NAME, 'ok', 'Labelled "Copy" (copy-label); the result is announced ("Copied") in a live region.'], [STATUS, 'ok', 'Success or failure announced politely.'], [MOTION, 'ok', 'The stamp animation is off with reduced motion.']],
    'favourite-button': [[NAME, 'ok', 'A toggle button with aria-pressed; the name does not change ("Favourite", or its text), the state does.'], [KEY, 'ok', 'A real button: Enter and Space.'], ['1.4.1 Use of colour', 'ok', 'On and off differ by shape too: outline or filled icon.'], [MOTION, 'ok', 'The pop is off with reduced motion.']],
    alert: [[NAME, 'ok', 'role="status" (or "alert" for warning and danger): screen readers announce it.'], [KEY, 'ok', 'The close button is a real button with a label.'], [TARGET, 'partial', 'The close button is about 23px: give the alert a little space around it.']],
    toast: [[STATUS, 'ok', 'Announced like an alert, without moving the focus.'], ['2.2.1 Timing adjustable', 'partial', 'Toasts close by themselves: the timer pauses on hover; use sticky (duration 0) for important messages.']],
    badge: [[NAME, 'ok', 'Plain text.'], [ALT, 'you', 'A dot badge has no text: add a visually hidden label next to it.'], [MOTION, 'partial', 'The pulse animation is not stopped by reduced motion.']],
    tag: [[KEY, 'ok', 'The remove button is a real button labelled "Remove".'], [TARGET, 'partial', 'The remove button is small (about 16px): keep tags spaced apart.']],
    spinner: [[NAME, 'ok', 'role="progressbar" with the label "Loading" (label attribute).'], [MOTION, 'ok', 'Slower with reduced motion.']],
    progress: [[NAME, 'ok', 'role="progressbar" with aria-valuenow, min and max; give it a label.'], ['1.4.3 Contrast (minimum)', 'ok', 'A value written on the bar takes its colour from the bar: near-black on light fills, white on dark ones, at least 4.5:1 in every style, mode and variant (and with your own colours).'], [MOTION, 'partial', 'Striped bars keep moving with reduced motion.']],
    skeleton: [[NAME, 'ok', 'Hidden from screen readers.'], [STATUS, 'you', 'Mark the loading area with aria-busy="true" and announce when the content arrives.'], [MOTION, 'ok', 'Still with reduced motion.']],
    input: [[LABEL, 'ok', 'label is a real <label>; help text is linked with aria-describedby.'], [KEY, 'ok', 'A native input inside; clear and show-password are buttons.'], ['3.3.1 Error identification', 'ok', 'Form-associated: native validity, the field is marked invalid after the user leaves it.']],
    textarea: [[LABEL, 'ok', 'Real <label>, help linked with aria-describedby; the counter is announced politely.'], [KEY, 'ok', 'Native textarea.']],
    select: [[KEY, 'ok', 'Arrows, Home, End, Enter, Escape and type-ahead; search box in the list.'], [NAME, 'ok', 'Trigger with aria-haspopup and aria-expanded, listbox with options, aria-activedescendant, aria-multiselectable.'], [LABEL, 'ok', 'Labelled by its label.'], ['2.5.8 Target size', 'partial', 'The × on the chips of a multiple select is small.']],
    'date-picker': [[KEY, 'ok', 'Arrows move by day and week, PageUp/PageDown by month; the native picker is available on phones.'], [NAME, 'ok', 'Grid of buttons with full dates as labels; the month title is announced.'], [LABEL, 'ok', 'Labelled by its label.']],
    'time-picker': [[KEY, 'partial', 'Hours and minutes are buttons reached with Tab, not with arrow keys; the native picker is available on phones.'], [NAME, 'ok', 'Hour and minute lists are labelled.']],
    checkbox: [[KEY, 'ok', 'Native checkbox (switch: role="switch"); Space toggles.'], [LABEL, 'ok', 'The text is part of the clickable label.'], [TARGET, 'ok', 'The whole label is the target.']],
    radio: [[KEY, 'ok', 'Arrows move and select, Tab enters and leaves the group.'], [NAME, 'ok', 'role="radiogroup" and "radio" with aria-checked.'], [LABEL, 'ok', 'The group label names the group.']],
    range: [[KEY, 'ok', 'Native range: arrows, Home, End, PageUp, PageDown.'], [NAME, 'ok', 'aria-valuetext uses the unit or the step names.']],
    'range-dual': [[KEY, 'ok', 'Two native sliders: Tab goes from the start handle to the end one; arrows, Home, End, PageUp and PageDown move the focused one, never past the other.'],
      [NAME, 'ok', 'A group named by its label; each handle has its own name (start-label, end-label) and says its value with the unit or as a date (aria-valuetext).'],
      ['2.5.7 Dragging movements', 'ok', 'A tap on the track moves the nearest handle there, and the keys work too: dragging is never the only way.']],
    pagination: [[NAME, 'ok', 'A navigation named “Pages”; every number says “Page 6”, the current one has aria-current="page"; previous and next are named.'], [KEY, 'ok', 'Real buttons or links: Tab and Enter.']],
    steps: [[NAME, 'ok', 'An ordered list; each step says its state to screen readers (done, current step, not done yet, error) and the current one has aria-current="step".'], [KEY, 'ok', 'With clickable, the done steps are buttons.'], ['1.4.1 Use of colour', 'ok', 'Done steps have a tick, errors a cross: not only the colour.']],
    tree: [[NAME, 'ok', 'role tree with treeitems: aria-level, aria-expanded on items with children, aria-selected on the chosen one.'], [KEY, 'ok', 'One Tab stop; arrows move, → opens or goes in, ← closes or goes up, Home and End, Enter or Space chooses.']],
    'infinite-scroll': [[NAME, 'ok', 'role feed, aria-busy while loading; how many items arrived is announced.'], [KEY, 'ok', 'mode="button" for pages where the footer must stay reachable; “Try again” is a button.'], ['2.2.2 Pause, stop, hide', 'ok', 'Nothing moves by itself: loading starts only when you scroll near the end or press the button.']],
    stat: [[NAME, 'ok', 'Read as one group: “Monthly revenue: € 48,200, better by +12.4%”.'], ['1.4.1 Use of colour', 'ok', 'The change also has an arrow and its sign; the trend line is decoration.']],
    timeline: [[NAME, 'ok', 'An ordered list (named with label); times can carry a machine date (datetime).'], ['1.4.1 Use of colour', 'ok', 'The colour of a dot repeats what the heading says.']],
    zoom: [[NAME, 'ok', 'A group named "Zoom" with three buttons: "Zoom out", the percentage (named "…%. Back to 100%") and "Zoom in"; the new value is announced.'], [KEY, 'ok', 'Tab reaches each button; inside it + and − change the zoom, 0 goes back. The buttons at the limits are disabled.']],
    'chip-input': [[NAME, 'ok', 'The field carries the label; the chips are a list, each × is a button named "Remove …".'], [KEY, 'ok', 'Enter, comma or semicolon add the chip; Backspace in the empty field removes the last one; Tab reaches each ×.'], ['4.1.3 Status messages', 'ok', 'Adding, removing, a repeated or a wrong value are announced (aria-live).']],
    kbd: [[NAME, 'ok', 'Read as the keys: “Control + K” (Command on a Mac), not as symbols.']],
    'relative-time': [[NAME, 'ok', 'A time element with the machine date; the full date is in the tooltip.'], ['2.2.1 Timing', 'ok', 'The text updates quietly (not announced) every 30 seconds.']],
    'empty-state': [[NAME, 'ok', 'The heading is a heading (level 3, or level=…); the drawing is hidden from screen readers.']],
    popover: [[NAME, 'ok', 'A dialog named by its heading (or label); the trigger has aria-haspopup and aria-expanded.'], [KEY, 'ok', 'Enter on the trigger opens it and moves the focus inside; Esc closes it and gives the focus back.']],
    command: [[NAME, 'ok', 'A modal dialog with a combobox and a listbox; the highlighted command is aria-activedescendant.'], [KEY, 'ok', 'Opens with the shortcut; ↑ ↓ move, Enter runs, Esc closes and gives the focus back.']],
    'color-picker': [[NAME, 'ok', 'The hex field carries the label; with compact the swatch is the labelled control. The panel is a dialog: the area is a slider that says “Saturation 60%, brightness 80%”, hue and opacity are sliders with their value; suggested colours are buttons named by their code, the chosen one has aria-pressed.'], [KEY, 'ok', 'Type a code in the field; Arrow down (or Enter / Space on the swatch) opens the panel. In it the arrows move the area (left and right the saturation, up and down the brightness) and the sliders, Shift or Page up / down by 10, Home / End to the ends; Escape closes it and gives the focus back. With picker="native" the system picker opens from the swatch.'], ['1.4.1 Use of colour', 'ok', 'Every colour also has its code written (field, names of the suggestions).']],
    'number-input': [[KEY, 'ok', 'A native number field (role spinbutton): arrows step, PageUp and PageDown step ten times. The − and + buttons are extra and skipped by Tab.'],
      [NAME, 'ok', 'The buttons are labelled "Decrease" and "Increase" (decrease-label, increase-label) and are disabled at the minimum and maximum.'], [LABEL, 'ok', 'Real <label>; help linked with aria-describedby.'],
      [TARGET, 'partial', 'The buttons are about 30px at the default size but about 22px at size sm: leave space around a small field.']],
    rating: [[KEY, 'ok', 'role="slider": arrows, Home, End.'], [NAME, 'ok', 'Value announced as "3 of 5".']],
    card: [[NAME, 'you', 'Use real headings in the header and a link or button for the action: the card itself has no role.']],
    avatar: [[ALT, 'ok', 'role="img" with the name as label; pass label for a picture.']],
    divider: [[NAME, 'ok', 'role="separator", vertical ones with aria-orientation.']],
    container: [[NAME, 'you', 'Layout only: use landmarks (main, section) around it when they help.']],
    icon: [[ALT, 'ok', 'Hidden from screen readers unless it has a label; give a label when the icon alone carries a meaning.']],
    code: [[KEY, 'ok', 'The scrolling area can be reached with the keyboard in current browsers.'], [NAME, 'ok', 'Line numbers are never read or copied; the copy button is labelled.']],
    dialog: [[KEY, 'ok', 'Native <dialog>: focus stays inside, Escape closes, focus returns to the opener.'], [NAME, 'ok', 'Labelled by its title.'], [MOTION, 'partial', 'The opening animation is not shortened by reduced motion.']],
    drawer: [[KEY, 'ok', 'Same as the dialog: focus trap, Escape, focus returns.'], [NAME, 'ok', 'Labelled by its title.']],
    dropdown: [[KEY, 'ok', 'Arrows, Home, End, Enter, Escape; focus returns to the trigger.'], [NAME, 'ok', 'role="menu", "menuitem" or "menuitemcheckbox"; the trigger has aria-expanded.']],
    'info-tip': [[KEY, 'ok', 'A button that opens a small dialog; Escape closes it.'], [NAME, 'ok', 'aria-expanded and aria-controls on the button.'], [TARGET, 'partial', 'The ? button is about 20px: leave space around it.']],
    tooltip: [['1.4.13 Content on hover or focus', 'partial', 'Shown on hover and on keyboard focus, closed by Escape; you cannot move the pointer onto it. Do not put essential information only in a tooltip.'], [NAME, 'ok', 'Linked to its element with aria-description.']],
    tabs: [[KEY, 'ok', 'Arrows (up and down when vertical), Home, End; Tab moves into the panel.'], [NAME, 'ok', 'tablist, tab and tabpanel with aria-selected and aria-controls.'],
      ['Collapsed tabs', 'ok', 'The fold button is a real button with aria-expanded; collapsed tabs (sub tabs too, drawn as dots) stay reachable with the arrows, keep their names for screen readers and show them in a tooltip on hover and keyboard focus. The folding is not animated with reduced motion.']],
    accordion: [[KEY, 'ok', 'Each header is a button with aria-expanded; the content is a region.'], [MOTION, 'partial', 'The open/close animation is not removed by reduced motion.']],
    otp: [[LABEL, 'ok', 'The group is named by its label; every box says "Character 2 of 6".'], [KEY, 'ok', 'Typing moves to the next box, Backspace goes back, arrows, Home and End move; pasting fills them all.'], ['1.3.5 Input purpose', 'ok', 'autocomplete="one-time-code": phones offer the code from the SMS.']],
    password: [[LABEL, 'ok', 'A labelled password field with a show/hide button.'], [STATUS, 'ok', 'The strength is announced politely while typing; each rule says whether it is met in words, not only colour.'], ['3.3.1 Error identification', 'ok', 'With min-strength the form explains why it refuses the password.']],
    search: [[NAME, 'ok', 'role="combobox" with a listbox of options and aria-activedescendant.'], [KEY, 'ok', 'Arrows move in the suggestions, Enter chooses or searches, Escape closes.'], ['1.4.1 Use of colour', 'ok', 'Matches are marked with a highlight, the text stays readable.'], ['4.1.3 Status messages', 'ok', 'With multiple, terms are a list; each × is a button named "Remove …"; adding, removing, a repeated term and the limit are announced (aria-live). Backspace in the empty field removes the last term.']],
    'theme-choice': [[KEY, 'ok', 'Menu: the dropdown keys. Buttons: a radio group with arrows.'], [NAME, 'ok', 'Labelled "Theme"; with icons-only the names stay for screen readers.']],
    'new-label': [[NAME, 'ok', 'The word is real text (the dot keeps it for screen readers), so it is read with what it marks.'], [MOTION, 'ok', 'Shine and pulse stop with reduced motion.'], ['1.4.1 Use of colour', 'ok', 'The word “New” says it, not only the colour (the dot keeps the word hidden for screen readers).']],
    header: [[NAME, 'ok', 'A banner with a navigation landmark named "Main" (label) and a search landmark; the current link has aria-current="page".'], [KEY, 'ok', 'Menu and search buttons are buttons with aria-expanded; Esc closes the open menu or search and gives the focus back.'], ['2.4.3 Focus order', 'ok', 'Opening the search moves the focus into the field; closing it returns it to the search button.']],
    carousel: [[NAME, 'ok', 'A region named "carousel"; each slide is a group "2 of 5"; the current slide is announced.'], [KEY, 'ok', 'Arrows on the slides; previous/next buttons and dots are buttons.'], ['2.2.2 Pause, stop, hide', 'ok', 'Autoplay stops on hover and focus and is off with reduced motion.']],
    video: [[NAME, 'ok', 'Every control is a labelled button or bar (the seek bar says the time); the ⋯ button opens a group named "More controls" with the ones that did not fit, each with its name.'], [KEY, 'ok', 'Tab reaches every control; Space or K plays, ← → move 5 seconds, ↑ ↓ volume, M mute, F full screen, C captions; Escape closes the ⋯ menu.'], ['1.2.2 Captions', 'you', 'Add a <track kind="captions"> for videos with speech.']],
    audio: [[NAME, 'ok', 'A group named by the title; play/pause, back and forward 10 seconds, mute and speed are labelled buttons; the seek bar says the time ("0:12 of 1:30"), the volume bar its level.'], [KEY, 'ok', 'Tab reaches every control; with the focus in the player Space or K plays and pauses, ← → move 5 seconds, ↑ ↓ change the volume, M mutes.'], ['1.2.1 Audio only', 'you', 'Offer a transcript for speech.'], ['1.4.10 Reflow', 'ok', 'In a narrow space the controls that do not fit move into the ⋯ menu instead of being cut off.']],
    menu: [[NAME, 'ok', 'role="menu" (a bar: role="menubar") with menuitems; an item with a submenu has aria-haspopup and aria-expanded; in a rail each item keeps its label as accessible name and tooltip.'], [KEY, 'ok', 'Arrows, Home and End move between items; Enter or Space activates; Right (Down in a bar) opens a submenu and enters it; Left or Esc goes back to its item.']],
    'bottom-nav': [[NAME, 'ok', 'A nav landmark with a label; the current destination has aria-current="page".'], [TARGET, 'ok', 'Each destination is at least 48px high.']],
    sortable: [['2.1.1 Keyboard', 'ok', 'Space picks up, arrows move, Space drops, Escape cancels; every step is announced.'], ['2.5.7 Dragging movements', 'ok', 'The keyboard way works without dragging.']],
    dropzone: [[KEY, 'ok', 'A button: Enter or Space opens the file chooser.'], [NAME, 'ok', 'Rejected files are announced with the reason; each file has a labelled remove button.']],
    showcase: [[ALT, 'you', 'Describe the screenshots with desktop-alt and mobile-alt.'], [NAME, 'ok', 'The title is a real h2.']],
    'chart-bar': [[ALT, 'ok', 'role="img" with a summary, and the numbers in a table that screen readers can read.'], ['1.4.1 Use of colour', 'partial', 'Series differ by colour; with show-values or the legend the numbers are also written. Avoid more than five series.'], ['1.4.13 Content on hover', 'ok', 'The tooltip repeats what the table already says.']],
    'chart-pie': [[ALT, 'ok', 'role="img" with a summary, and the numbers in a table that screen readers can read.'], ['1.4.1 Use of colour', 'partial', 'Series differ by colour; with show-values or the legend the numbers are also written. Avoid more than five series.'], ['1.4.13 Content on hover', 'ok', 'The tooltip repeats what the table already says.']],
    'chart-radar': [[ALT, 'ok', 'role="img" with a summary, and the numbers in a table that screen readers can read.'], ['1.4.1 Use of colour', 'partial', 'Series differ by colour; with show-values or the legend the numbers are also written. Avoid more than five series.'], ['1.4.13 Content on hover', 'ok', 'The tooltip repeats what the table already says.']],
    'chart-line': [[ALT, 'ok', 'role="img" with a summary, and the numbers in a table that screen readers can read.'], ['1.4.1 Use of colour', 'partial', 'Series differ by colour; with show-values or the legend the numbers are also written. Avoid more than five series.'], ['1.4.13 Content on hover', 'ok', 'The tooltip repeats what the table already says.']],
    'chart-activity': [[ALT, 'ok', 'A summary and a table of the active days for screen readers.'], ['1.4.1 Use of colour', 'partial', 'Intensity is shown by shade; the exact value is in the tooltip and the table.']],
    'language-choice': [[KEY, 'ok', 'Same as the select: arrows, type-ahead, search box.'], [NAME, 'ok', 'Each option is read by its name; flags are decoration (alt="") and the code is hidden from screen readers.'], ['3.1.2 Language of parts', 'you', 'With native-names, set lang on the page parts written in that language.']],
    'country-choice': [[KEY, 'ok', 'Same as the select; the search also finds ISO codes.'], [NAME, 'ok', 'Options read by name; flags are decoration.']],
    flag: [[ALT, 'ok', 'Hidden from screen readers unless it has a label.']],
    'chart-map': [[ALT, 'ok', 'role="img" with a summary and a table of the values, country by country.'], ['1.4.1 Use of colour', 'partial', 'Values are shown by shade; the numbers are in the tooltip and the table.'], [KEY, 'partial', 'Clicking a country is a pointer action; the same information is in the table.']],
    label: [[NAME, 'ok', 'Plain text: screen readers read it as part of the page.'], ['1.4.1 Use of colour', 'ok', 'The text says what it is; the colour only adds to it.']],
    chip: [[KEY, 'ok', 'Each chip is a button: Tab to reach it, Enter or Space to switch it.'], [NAME, 'ok', 'aria-pressed tells whether it is on; the group has role="group" with its label.'], [TARGET, 'partial', 'The × of a removable chip is small: keep chips spaced apart.']],
    heading: [[NAME, 'ok', 'A real h1–h6: it appears in the page outline. Keep the levels in order (no jumps from h2 to h4).'], ['1.3.1 Info and relationships', 'ok', 'size changes only the look, level stays what the structure needs.']],
    grid: [['1.3.2 Meaningful sequence', 'you', 'The reading order is the order in the HTML: do not rely on the columns to change the meaning.']],
    table: [[NAME, 'ok', 'Your table stays a real table; sortable headers are buttons with aria-sort.'], [KEY, 'ok', 'The scroll area can be reached with Tab on small screens.'], ['1.3.1 Info and relationships', 'you', 'Use th for headers (and caption when it helps).']],
    image: [[ALT, 'you', 'Write an alt that says what the image shows, or leave it empty when it is only decoration.'], [KEY, 'ok', 'With zoom the image is a button; the enlarged view closes with Escape or a click.']],
    list: [[NAME, 'ok', 'role="list" and "listitem"; rows with href are links, with button are buttons.'], [KEY, 'ok', 'Linked rows are reached with Tab.']],
    breadcrumb: [[NAME, 'ok', 'A nav landmark labelled "Breadcrumb"; the current page has aria-current="page".']],
  };

  /* ---------- measuring */
  function measure(groups) {
    const checks = groups.flatMap((g) => G[g] || []);
    if (!checks.length) return null;
    const out = checks.map(([label, , , min]) => ({ label, min, cells: {} }));
    const box = document.createElement('div');
    box.style.cssText = 'position:absolute;left:-9999px;top:0;width:10px;height:10px';
    const el = document.createElement('span');
    box.append(el); document.body.append(box);
    const read = (expr) => { el.style.color = ''; el.style.color = expr; return rgba(getComputedStyle(el).color); };
    for (const st of Sav.styles) for (const mode of ['light', 'dark']) {
      box.className = `sav-style-soft sav-style-${st} sav-theme-${mode}`;
      checks.forEach(([, fg, layers], i) => {
        let bg = [255, 255, 255, 1];
        for (const l of [...layers].reverse()) bg = over(read(l), bg);
        const r = ratio(over(read(fg), bg), bg);
        out[i].cells[`${st}-${mode}`] = r;
      });
    }
    box.remove();
    return out;
  }

  const ICONS = { ok: 'check', partial: 'alert-triangle', you: 'user' };
  const WORDS = { ok: 'Met', partial: 'Partly', you: 'Your part' };
  function html(id) {
    if (!(id in COLOR) && !NOTES[id]) return '';
    const notes = (NOTES[id] || []).map(([crit, st, text]) => `<li class="a11y-n a11y-${st}"><span class="a11y-st"><sav-icon name="${ICONS[st]}"></sav-icon>${WORDS[st]}</span><span><b>${esc(crit)}</b> — ${esc(text)}</span></li>`).join('');
    return `<h2 id="s-accessibility">Accessibility</h2>
      <p class="muted">Checked against <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener">WCAG 2.2</a>, level AA.</p>
      ${COLOR[id]?.length ? `<h3>Colours</h3><div class="a11y-colors" data-a11y="${esc(id)}"><p class="muted small">Measuring…</p></div>` : '<h3>Colours</h3><p class="muted small">Nothing to measure: it takes the colours of the text around it.</p>'}
      ${notes ? `<h3>Keyboard, screen readers and the rest</h3><ul class="a11y-notes">${notes}</ul>` : ''}`;
  }

  function mount(root) {
    const box = root.querySelector('.a11y-colors'); if (!box) return;
    const res = measure(COLOR[box.dataset.a11y]);
    if (!res) { box.innerHTML = ''; return; }
    const fails = res.reduce((n, r) => n + Object.values(r.cells).filter((v) => v < r.min).length, 0);
    const total = res.length * Sav.styles.length * 2;
    const cell = (v, min) => `<span class="a11y-r ${v >= min ? 'pass' : 'fail'}" title="${v.toFixed(2)}:1 (needs ${min}:1)">${v.toFixed(1)}</span>`;
    box.innerHTML = `<p class="a11y-sum ${fails ? 'has-fail' : ''}"><sav-icon name="${fails ? 'alert-triangle' : 'check'}"></sav-icon>
        ${fails ? `${fails} of ${total} combinations below the WCAG AA contrast` : `All ${total} combinations meet the WCAG AA contrast`} — measured now, with the current theme.</p>
      <sav-table hover compact class="a11y-tw"><table class="a11y-t"><thead><tr><th>What</th><th>Needs</th>${Sav.styles.map((s) => `<th>${s[0].toUpperCase() + s.slice(1)}<small>light · dark</small></th>`).join('')}</tr></thead><tbody>
      ${res.map((r) => `<tr><td>${esc(r.label)}</td><td>${r.min}:1</td>${Sav.styles.map((s) => `<td>${cell(r.cells[s + '-light'], r.min)}${cell(r.cells[s + '-dark'], r.min)}</td>`).join('')}</tr>`).join('')}
      </tbody></table></sav-table>
      <p class="muted small">Text needs 4.5:1, borders, icons and states 3:1 (WCAG 1.4.3 and 1.4.11). Glass is measured over the plain page colour: over a busy background check it yourself.</p>`;
  }

  window.SavA11y = { html, mount, measure };
})();
