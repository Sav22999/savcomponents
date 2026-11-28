/* SavComponents docs — "Browser support" section of each component page.
   Every component needs the same modern base (custom elements, shadow DOM, color-mix(), relative colours, container queries);
   the notes below list what changes from one browser or system to another, component by component. Kept in sync with dist/sav.js. */
(() => {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /** the oldest versions where everything works (relative colours, pow(), color-mix, ElementInternals, container queries) */
  const BASE = [
    ['Chrome', '120', 'Windows, macOS, Linux, Android, ChromeOS'],
    ['Edge', '120', 'Windows, macOS'],
    ['Safari', '16.4', 'macOS, iOS and iPadOS 16.4'],
    ['Firefox', '128', 'Windows, macOS, Linux, Android'],
    ['Samsung Internet', '25', 'Android'],
    ['Opera', '106', 'Windows, macOS, Linux'],
  ];

  // shared notes
  const POPOVER = ['Pop-ups', 'fallback', 'Open in the top layer with the Popover API (Chrome and Edge 114, Safari 17, Firefox 125). In older browsers the panel still opens, positioned over the page, but a parent with overflow: hidden can cut it.'];
  const NATIVE_MOBILE = ['native-on-mobile', 'differs', 'On phones it can use the system picker instead: its look is the one of iOS or Android, not the style of the page.'];
  const MOTION = ['Reduced motion', 'ok', 'Every browser: with the system setting “reduce motion” the animations are cut down.'];

  /** [what, status, note]: ok = the same everywhere, differs = changes by browser or system, fallback = an older or different browser gets a simpler way */
  const NOTES = {
    'color-picker': [
      ['The colour panel', 'ok', 'The library’s own panel works everywhere and follows the style.'],
      ['Default (picker="auto")', 'differs', 'Chrome and Edge get the library’s panel; Safari and Firefox get the system colour picker, because they cannot pick colours from the screen (no EyeDropper API).'],
      ['Eyedropper', 'differs', 'Chrome and Edge: the browser’s own eyedropper. Safari and Firefox on macOS, iOS and iPadOS: the button opens the system picker, whose pipette picks from the screen. Firefox on Windows and Linux: no eyedropper (the button is hidden).'],
      ['picker="native"', 'differs', 'The system picker looks different on every system (macOS panel, Windows dialog, Chrome’s popup, iOS sheet).'],
      POPOVER,
    ],
    video: [
      ['Control bar', 'ok', 'The library’s bar is the same in every browser; native-controls shows each browser’s own.'],
      ['Picture in picture', 'differs', 'Chrome, Edge and Safari: the button shows. Firefox has no web API for it (it has its own toggle on the video), so the button stays hidden.'],
      ['Full screen', 'differs', 'On iPhone only the video itself goes full screen, with the iOS controls; iPad and computers use the player’s frame.'],
      ['Autoplay', 'differs', 'Every browser starts a video by itself only when it is muted (autoplay muted); with sound it waits for a tap.'],
      ['Volume', 'differs', 'On iPhone and iPad the volume follows the device buttons: the volume bar does not change it (mute does).'],
    ],
    audio: [
      ['Player', 'ok', 'The same in every browser; native-controls shows each browser’s own player.'],
      ['Volume', 'differs', 'On iPhone and iPad the volume follows the device buttons: the volume bar does not change it (mute does).'],
      ['Autoplay', 'differs', 'Browsers play sound by themselves only after the person has used the page (a tap or a click).'],
    ],
    select: [POPOVER, NATIVE_MOBILE, ['native', 'differs', 'The browser’s own select: each system draws its list.']],
    'language-choice': [POPOVER, NATIVE_MOBILE, ['Flags', 'ok', 'Drawn as images by the library, the same everywhere (Windows has no flag emoji, so they are not used).']],
    'country-choice': [POPOVER, NATIVE_MOBILE, ['Flags', 'ok', 'Drawn as images by the library, the same everywhere (Windows has no flag emoji, so they are not used).']],
    'date-picker': [POPOVER, NATIVE_MOBILE, ['Names of days and months', 'ok', 'From the browser (Intl), in the language of the page.']],
    'time-picker': [POPOVER, NATIVE_MOBILE],
    dropdown: [POPOVER], tooltip: [POPOVER, ['Touch screens', 'differs', 'No hover on phones and tablets: the tooltip shows when its element gets the focus (a tap on a button or a field), or on a tap with trigger="click".']],
    'context-menu': [POPOVER, ['Long press', 'differs', 'Phones and tablets have no right click: a long press opens it (iPhone and iPad too, where the library times the press itself).'], ['Text fields', 'ok', 'Inside text fields the browser’s menu stays, for copy, paste and spelling.']],
    'info-tip': [POPOVER], popover: [POPOVER], search: [POPOVER], 'chip-input': [POPOVER],
    dialog: [['Modal', 'ok', 'Built on the native <dialog>: focus trap and Escape in every browser.'], MOTION],
    drawer: [['Modal', 'ok', 'Built on the native <dialog>.'], MOTION],
    'action-sheet': [['Modal', 'ok', 'Built on the native <dialog>: focus trap and Escape in every browser.'], ['Safe area', 'ok', 'The footer keeps clear of the home bar of iPhones (env(safe-area-inset-bottom), with viewport-fit=cover).'], MOTION],
    command: [['Shortcut', 'differs', '⌘ K on macOS, iOS and iPadOS, Ctrl K elsewhere. Firefox uses Ctrl K for its search bar: the palette takes it only while the page has the focus.']],
    'copy-button': [['Copying', 'fallback', 'Needs a secure page (https or localhost) for the Clipboard API; elsewhere it falls back to the older copy command, which some browsers refuse.']],
    'favourite-button': [['Remembering', 'differs', 'Kept in the browser (localStorage): private windows may forget it when closed.']],
    'new-label': [['Seen once', 'differs', 'seen-key is kept in the browser (localStorage): private windows may forget it.']],
    'theme-choice': [['Auto', 'ok', 'Follows the light or dark setting of the system in every browser.']],
    dropzone: [['Dragging files', 'differs', 'On computers files can be dragged in; on phones and tablets the field opens the system file picker instead.']],
    sortable: [['Touch', 'ok', 'Mouse, touch and pen through pointer events, in every browser; the keyboard too.']],
    otp: [['Codes from messages', 'differs', 'iOS and Android offer to fill the code from an SMS (autocomplete="one-time-code"); computers do not.']],
    password: [['Password managers', 'differs', 'Browsers and managers may offer to fill or generate the password; the rules are checked the same way.']],
    'relative-time': [['Wording', 'ok', 'From the browser (Intl), in the language of the page: “3 minutes ago”, “3 minuti fa”.']],
    carousel: [['Swipe', 'ok', 'Touch, mouse and trackpad scrolling in every browser.'], MOTION],
    'chart-map': [['Map', 'ok', 'An SVG drawn by the library: the same everywhere.']],
    'infinite-scroll': [['Loading by itself', 'fallback', 'Uses IntersectionObserver (every current browser); without it, a “Load more” button shows.']],
    header: [['Sticky', 'ok', 'position: sticky works in every current browser.']],
  };
  // the text colour picked by auto-text needs relative colours and pow(): the same base as the rest
  for (const id of ['button', 'badge', 'tag', 'label', 'chip', 'new-label', 'alert', 'avatar', 'pagination', 'tabs', 'steps', 'timeline', 'menu', 'tree', 'breadcrumb'])
    (NOTES[id] ||= []).push(['auto-text', 'ok', 'Worked out in CSS (relative colours and pow()): every browser of the list above.']);

  const ICONS = { ok: 'check', differs: 'alert-triangle', fallback: 'corner-down-right' };
  const WORDS = { ok: 'Everywhere', differs: 'Differs', fallback: 'Falls back' };
  function html(id) {
    const notes = (NOTES[id] || []).map(([what, st, text]) => `<li class="a11y-n bs-${st}"><span class="a11y-st"><sav-icon name="${ICONS[st]}"></sav-icon>${WORDS[st]}</span><span><b>${esc(what)}</b> — ${esc(text)}</span></li>`).join('');
    return `<h2 id="s-browsers">Browser support</h2>
      <p class="muted">Works in these browsers and newer, on computers, phones and tablets:</p>
      <div class="bs-list">${BASE.map(([b, v, where]) => `<span class="bs-b" title="${esc(where)}"><b>${esc(b)}</b> ${esc(v)}+</span>`).join('')}</div>
      ${notes ? `<h3>Differences between browsers and systems</h3><ul class="a11y-notes">${notes}</ul>` : '<p class="muted small">It behaves the same in all of them.</p>'}`;
  }
  window.SavCompat = { html, notes: NOTES, base: BASE };
})();
