/* Documentation data: one entry per component. Demos are real HTML: the same string is rendered and shown as code. */
window.SAVC_DOCS = [
  /* ------------------------------------------------------------ Actions */
  {
    id: 'button', name: 'Button', play: { tag: 'sav-button', text: 'Button' }, tag: 'sav-button', group: 'Actions', icon: 'mouse-pointer-click',
    desc: 'Buttons start an action or navigate. Five semantic colours, five appearances, three sizes; a button with <code>href</code> renders a link.',
    demos: [
      { title: 'Variants', html: `<sav-button>Primary</sav-button>
<sav-button variant="neutral">Neutral</sav-button>
<sav-button variant="success">Success</sav-button>
<sav-button variant="warning">Warning</sav-button>
<sav-button variant="danger">Danger</sav-button>` },
      { title: 'Appearances', html: `<sav-button>Solid</sav-button>
<sav-button appearance="soft">Soft</sav-button>
<sav-button appearance="outline">Outline</sav-button>
<sav-button appearance="ghost">Ghost</sav-button>
<sav-button appearance="link">Link</sav-button>` },
      { title: 'Sizes and shapes', html: `<sav-button size="sm">Small</sav-button>
<sav-button>Medium</sav-button>
<sav-button size="lg">Large</sav-button>
<sav-button pill>Pill</sav-button>
<sav-button circle label="Add"><sav-icon name="plus"></sav-icon></sav-button>
<sav-button square appearance="outline" variant="neutral" label="Settings"><sav-icon name="settings"></sav-icon></sav-button>` },
      { title: 'Icon only', html: `<sav-button icon="heart" label="Like"></sav-button>
<sav-button icon="share" appearance="soft" label="Share"></sav-button>
<sav-button icon="trash" appearance="outline" variant="danger" label="Delete"></sav-button>
<sav-button icon="more-vertical" appearance="ghost" variant="neutral" label="More"></sav-button>
<sav-button icon="save">Save</sav-button>
<sav-button icon-end="arrow-right" appearance="outline">Continue</sav-button>` },
      { title: 'Icons, caret, loading, disabled', html: `<sav-button><sav-icon slot="prefix" name="download"></sav-icon>Download</sav-button>
<sav-button appearance="outline">Next<sav-icon slot="suffix" name="arrow-right"></sav-icon></sav-button>
<sav-button caret appearance="soft" variant="neutral">Options</sav-button>
<sav-button loading>Saving</sav-button>
<sav-button disabled>Disabled</sav-button>
<sav-button href="#card" appearance="ghost">Link to Card</sav-button>` },
      { title: 'In a form', html: `<form class="demo-form" onsubmit="event.preventDefault(); Sav.toast('Submitted: ' + new URLSearchParams(new FormData(this)), {variant: 'success'})">
  <sav-input name="email" type="email" label="Email" placeholder="you@example.com" required></sav-input>
  <div class="row">
    <sav-button type="submit" name="action" value="save">Submit</sav-button>
    <sav-button type="reset" appearance="ghost" variant="neutral">Reset</sav-button>
  </div>
</form>` },
    ],
    attrs: [
      ['variant', 'primary · neutral · success · warning · danger', 'Colour of the button.'],
      ['appearance', 'solid · soft · outline · ghost · link', 'Visual weight. Default solid.'],
      ['size', 'sm · md · lg', 'Height and font size.'],
      ['pill · square · circle · block', 'boolean', 'Rounded ends, icon-only square/circle, full width.'],
      ['caret', 'boolean', 'Shows a down chevron (for menus).'],
      ['loading · disabled', 'boolean', 'Spinner state and disabled state.'],
      ['href · target · download', 'string', 'Renders a link instead of a button.'],
      ['type · name · value', 'button · submit · reset', 'Behaviour inside a form.'],
      ['icon · icon-end', 'icon name', 'An icon before or after the text. Without text the button becomes a square icon button.'],
      ['label', 'string', 'Accessible name, required for icon-only buttons.'],
    ['auto-text', 'boolean', 'Black or white text, whichever is readable on the colour behind it (WCAG AA, at least 4.5:1), also with your own colours. A --text-color you set still wins.'], ['--text-color', 'CSS', 'The colour of the text, whatever the background (unset: the colour that fits the background).'], ['aria-expanded · aria-pressed · aria-controls · aria-haspopup · aria-describedby · aria-current', 'string', 'Set on sav-button, they reach the real button inside (menus, toggles).']],
    slots: [['(default)', 'Label'], ['prefix', 'Before the label, e.g. an icon'], ['suffix', 'After the label']],
    parts: ['base', 'label', 'spinner'],
  },
  {
    id: 'button-group', name: 'Button group', tag: 'sav-button-group', group: 'Actions', icon: 'columns-3',
    desc: 'Joins buttons together. Works with any appearance and with dropdowns.',
    demos: [
      { title: 'Basic', html: `<sav-button-group label="Alignment">
  <sav-button appearance="outline" variant="neutral">Left</sav-button>
  <sav-button appearance="outline" variant="neutral">Center</sav-button>
  <sav-button appearance="outline" variant="neutral">Right</sav-button>
</sav-button-group>
<sav-button-group>
  <sav-button>Save</sav-button>
  <sav-dropdown placement="bottom-end">
    <sav-button slot="trigger" square label="More options"><sav-icon name="chevron-down"></sav-icon></sav-button>
    <sav-menu-item>Save as draft</sav-menu-item>
    <sav-menu-item>Save and close</sav-menu-item>
  </sav-dropdown>
</sav-button-group>` },
    ],
    attrs: [['label', 'string', 'Accessible name of the group.'], ['auto-text', 'boolean', 'Every button of the group gets black or white text, whichever is readable on its colour (WCAG AA, at least 4.5:1), also with your own colours.']],
  },
  {
    id: 'copy-button', name: 'Copy button', play: { tag: 'sav-copy-button', attrs: { value: 'Hello!' }, text: '' }, tag: 'sav-copy-button', group: 'Actions', icon: 'copy',
    desc: 'Copies text to the clipboard and confirms with a check mark.',
    demos: [
      { title: 'Value or element', html: `<sav-copy-button value="npm i savcomponents"></sav-copy-button>
<sav-copy-button value="Hello!">Copy text</sav-copy-button>
<sav-input id="copy-src" value="https://example.com/invite/42" readonly style="max-width: 18rem">
  <sav-copy-button slot="suffix" from="copy-src" appearance="ghost" size="sm"></sav-copy-button>
</sav-input>` },
    ],
    attrs: [['value', 'string', 'Text to copy.'], ['from', 'id', 'Copies the value or text of the element with this id.'], ['size', 'sm · md · lg', ''], ['appearance', 'ghost', 'No border.'], ['copy-label · success-label · error-label', 'string', 'Texts for screen readers.']],
    events: [['sav-copy', 'After copying. detail.value'], ['sav-error', 'When the clipboard is not available.']],
  },
  {
    builtFrom: ['copy-button'],
    id: 'favourite-button', name: 'Favourite button', play: { tag: 'sav-favourite-button', attrs: { icon: 'star' }, text: '' }, tag: 'sav-favourite-button', group: 'Actions', icon: 'star',
    desc: 'A toggle for favourites, likes and bookmarks: a star, a heart or a bookmark that fills with its colour when pressed.',
    demos: [
      { title: 'Star, heart, bookmark', html: `<sav-favourite-button icon="star" pressed></sav-favourite-button>
<sav-favourite-button icon="heart"></sav-favourite-button>
<sav-favourite-button icon="bookmark"></sav-favourite-button>
<sav-favourite-button icon="heart" pressed>Liked</sav-favourite-button>
<sav-favourite-button icon="bookmark" appearance="ghost" label="Save for later"></sav-favourite-button>` },
      { title: 'Saving the choice', html: `<sav-favourite-button id="fav-demo" icon="star">Favourite</sav-favourite-button>
<span id="fav-out" class="muted small">Not a favourite</span>
<script>
  document.getElementById('fav-demo').addEventListener('change', (e) => {
    document.getElementById('fav-out').textContent = e.detail.pressed ? 'Saved as favourite' : 'Not a favourite';
  });
</script>` },
    ],
    attrs: [['icon', 'star · heart · bookmark', 'Default star. The filled colour: yellow, red or blue.'], ['pressed', 'boolean', 'On (filled).'], ['label', 'string', 'Name for screen readers when there is no text. Default "Favourite", "Like" or "Bookmark".'],
      ['size', 'sm · md · lg', ''], ['appearance', 'ghost', 'No border and no background.'], ['disabled', 'boolean', '']],
    events: [['sav-change', 'Before it changes, cancelable. detail.pressed'], ['change', 'After it changed. detail.pressed']],
    methods: [['toggle(force?)', 'Turns it on or off, or to the given state.']],
    parts: ['button', 'icon', 'label'],
  },

  /* ------------------------------------------------------------ Feedback */
  {
    id: 'alert', name: 'Alert', play: { tag: 'sav-alert', text: 'Something worth knowing.', attrs: { heading: 'Heads up' } }, tag: 'sav-alert', group: 'Feedback', icon: 'triangle-alert',
    desc: 'Shows an important message inline. The icon follows the variant.',
    demos: [
      { title: 'Variants', html: `<sav-alert heading="New version available">Reload the page to get the latest features.</sav-alert>
<sav-alert variant="success" heading="Payment received">Thanks! A receipt is on its way.</sav-alert>
<sav-alert variant="warning" closable>Your storage is 90% full.</sav-alert>
<sav-alert variant="danger" heading="Could not save">Check your connection and try again.</sav-alert>
<sav-alert variant="protected" heading="Protected area">Only administrators can change these settings. Your data is encrypted.</sav-alert>` },
      { title: 'Appearances', html: `<sav-alert appearance="accent" variant="neutral">An accent line on the start side.</sav-alert>
<sav-alert appearance="outline" variant="success">Outline on the surface colour.</sav-alert>
<sav-alert appearance="solid" variant="primary" closable>Solid colour for strong messages.</sav-alert>` },
    ],
    attrs: [['variant', 'primary · neutral · success · warning · danger · protected', 'Colour and icon; protected shows a shield.'], ['appearance', 'soft · accent · outline · solid', 'Default soft.'], ['heading', 'string', 'Bold first line.'], ['closable', 'boolean', 'Shows a close button.'], ['noicon', 'boolean', 'Hides the icon.'], ['duration', 'ms', 'Closes itself after this time.'], ['auto-text', 'boolean', 'Black or white text, whichever is readable on the colour behind it (WCAG AA, at least 4.5:1), also with your own colours: useful with appearance="solid". A --text-color you set still wins.']],
    slots: [['(default)', 'Message'], ['heading', 'Rich heading'], ['icon', 'Custom icon']],
    events: [['sav-close', 'Cancelable, before hiding.']],
    methods: [['close()', 'Hides the alert.']],
  },
  {
    id: 'toast', name: 'Toast', tag: 'Sav.toast()', group: 'Feedback', icon: 'message-square',
    desc: 'Short notifications that stack in a corner and close themselves. Hovering pauses the timer.',
    demos: [
      { title: 'JavaScript API', html: `<sav-button onclick="Sav.toast('Changes saved', {variant: 'success'})">Success</sav-button>
<sav-button appearance="soft" onclick="Sav.toast('Message sent to 3 people', {heading: 'Sent', icon: 'mail'})">With heading</sav-button>
<sav-button appearance="soft" variant="danger" onclick="Sav.toast('Upload failed', {variant: 'danger', duration: 0})">Sticky</sav-button>
<sav-button appearance="outline" variant="neutral" onclick="Sav.toast('Top center', {placement: 'top-center', variant: 'neutral'})">Top center</sav-button>` },
    ],
    attrs: [['variant', 'primary · neutral · success · warning · danger', 'Option'], ['heading', 'string', 'Option'], ['icon', 'icon name', 'Option: replaces the default icon.'], ['duration', 'ms', 'Option, default 4500. 0 keeps it open.'], ['closable', 'boolean', 'Option, default true.'], ['placement', 'bottom-end · bottom-start · bottom-center · top-end · top-start · top-center', 'Option.']],
    methods: [['Sav.toast(message, options)', 'Shows a toast and returns its sav-alert.']],
  },
  {
    id: 'badge', name: 'Badge', play: { tag: 'sav-badge', text: 'Badge' }, tag: 'sav-badge', group: 'Feedback', icon: 'badge',
    desc: 'Small labels for counts and statuses.',
    demos: [
      { title: 'Basic', html: `<sav-badge>New</sav-badge>
<sav-badge variant="success">Active</sav-badge>
<sav-badge variant="warning" appearance="soft">Pending</sav-badge>
<sav-badge variant="danger" pill>99+</sav-badge>
<sav-badge variant="neutral" appearance="outline">Draft</sav-badge>
<sav-badge variant="success" dot pulse></sav-badge>` },
      { title: 'Inside a button', html: `<sav-button appearance="outline" variant="neutral">Inbox <sav-badge pill>12</sav-badge></sav-button>` },
    ],
    attrs: [['variant', 'primary · neutral · success · warning · danger', ''], ['appearance', 'solid · soft · outline', ''], ['pill · dot · pulse', 'boolean', 'Shape and attention effect.'], ['auto-text', 'boolean', 'Black or white text, whichever is readable on the colour behind it (WCAG AA, at least 4.5:1), also with your own colours. A --text-color you set still wins.'], ['--text-color', 'CSS', 'The colour of the text, whatever the background (unset: the colour that fits the background).']],
  },
  {
    builtFrom: ['badge'],
    id: 'new-label', name: 'New label', play: { tag: 'sav-new-label', attrs: { sparkle: '' }, text: '' }, tag: 'sav-new-label', group: 'Feedback', icon: 'sparkles',
    desc: 'Marks something as new: a badge (with sparkles and a passing shine if you like), a diagonal ribbon or a tab in the corner of a card, a pulsing dot, or just the coloured word. It can take care of itself: until hides it after a date, seen-key hides it for good once the person has clicked what it marks.',
    demos: [
      { title: 'Badge, soft, with sparkles and shine', html: `<sav-new-label></sav-new-label>
<sav-new-label appearance="soft"></sav-new-label>
<sav-new-label sparkle shine variant="success"></sav-new-label>
<sav-new-label variant="danger">Just in</sav-new-label>` },
      { title: 'Next to a menu item and a heading', html: `<sav-menu appearance="card" style="width: 15rem">
  <sav-menu-item><sav-icon slot="prefix" name="layout-dashboard"></sav-icon>Dashboard</sav-menu-item>
  <sav-menu-item><sav-icon slot="prefix" name="chart-column"></sav-icon>Reports<sav-new-label slot="suffix" appearance="text"></sav-new-label></sav-menu-item>
  <sav-menu-item><sav-icon slot="prefix" name="bell"></sav-icon>Alerts<sav-new-label slot="suffix" appearance="dot"></sav-new-label></sav-menu-item>
</sav-menu>
<h3 style="margin: 0; display: flex; align-items: center; gap: .5rem">Dark mode <sav-new-label sparkle></sav-new-label></h3>` },
      { title: 'Ribbon and corner tab on a card', html: `<sav-card style="position: relative; width: 15rem">
  <sav-new-label appearance="ribbon"></sav-new-label>
  <strong>Pro plan</strong>
  <p style="margin: .4rem 0 0">Now with unlimited projects.</p>
</sav-card>
<sav-card style="position: relative; width: 15rem">
  <sav-new-label appearance="corner" sparkle variant="success"></sav-new-label>
  <strong>Charts</strong>
  <p style="margin: .4rem 0 0">Bar, pie, line, map.</p>
</sav-card>` },
      { title: 'Hides itself: after a date, or once seen', html: `<sav-button appearance="outline" variant="neutral">Try the new editor <sav-new-label seen-key="demo-editor"></sav-new-label></sav-button>
<sav-badge variant="neutral" appearance="soft">Expired: <sav-new-label until="2024-01-31">hidden</sav-new-label> (until 2024-01-31)</sav-badge>` },
    ],
    attrs: [['appearance', 'badge · soft · ribbon · corner · dot · text', 'ribbon and corner sit in the top corner of the parent (give it position: relative).'], ['variant', 'primary · neutral · success · warning · danger · protected', ''],
      ['placement', 'end · start', 'Which top corner, for ribbon and corner.'], ['sparkle', 'boolean', 'A sparkles icon before the word.'], ['shine', 'boolean', 'A gloss crosses it now and then (off with reduced motion).'],
      ['until', 'date', 'Hidden after this day (2026-12-31) or moment.'], ['seen-key', 'string', 'Hidden for good after the first click on its parent; remembered in the browser under this name. reset() shows it again.'],
      ['--transform · --offset', 'CSS', 'Text case (default uppercase); distance from the corner.'], ['auto-text', 'boolean', 'Black or white text, whichever is readable on the colour behind it (WCAG AA, at least 4.5:1), also with your own colours. A --text-color you set still wins.'], ['--text-color', 'CSS', 'The colour of the text, whatever the background (unset: the colour that fits the background).']],
    events: [['sav-seen', 'detail.key']],
  },
  {
    id: 'tag', name: 'Tag', play: { tag: 'sav-tag', text: 'Tag' }, tag: 'sav-tag', group: 'Feedback', icon: 'tag',
    desc: 'Keywords, filters and choices; removable tags fire an event and remove themselves.',
    demos: [
      { title: 'Basic', html: `<sav-tag>Design</sav-tag>
<sav-tag variant="primary">Frontend</sav-tag>
<sav-tag variant="success" pill>Approved</sav-tag>
<sav-tag variant="danger" appearance="solid">Urgent</sav-tag>
<sav-tag removable>JavaScript</sav-tag>
<sav-tag removable variant="primary" pill>CSS</sav-tag>
<sav-tag size="sm">Small</sav-tag>
<sav-tag size="lg">Large</sav-tag>` },
    ],
    attrs: [['variant', 'neutral · primary · success · warning · danger', 'Default neutral.'], ['appearance', 'soft · solid', ''], ['size', 'sm · md · lg', ''], ['pill · removable', 'boolean', ''], ['auto-text', 'boolean', 'Black or white text, whichever is readable on the colour behind it (WCAG AA, at least 4.5:1), also with your own colours. A --text-color you set still wins.'], ['--text-color', 'CSS', 'The colour of the text, whatever the background (unset: the colour that fits the background).']],
    events: [['sav-remove', 'Cancelable, before the tag removes itself.']],
  },
  {
    id: 'spinner', name: 'Spinner', play: { tag: 'sav-spinner', attrs: {} }, tag: 'sav-spinner', group: 'Feedback', icon: 'loader',
    desc: 'An indeterminate loading indicator. It takes the font size of its parent. Its look follows the style: a ring (square in Sharp, rounded square in Brutal) or, in Tilt, the four leaning tiles of the logo lighting up in turn.',
    demos: [{ title: 'Sizes and colours', html: `<sav-spinner></sav-spinner>
<sav-spinner style="font-size: 2rem"></sav-spinner>
<sav-spinner style="font-size: 3rem; --track-width: 1.5px" variant="success"></sav-spinner>
<sav-spinner variant="danger" style="font-size: 2rem"></sav-spinner>` }],
    attrs: [['variant', 'primary · neutral · success · warning · danger · current', 'current takes the colour of the text around it (the loading button uses it).'], ['label', 'string', 'Accessible name, default "Loading".'], ['--track-width', 'CSS', 'Stroke width.']],
  },
  {
    id: 'progress', name: 'Progress', play: { tag: 'sav-progress-bar', tags: [{ tag: 'sav-progress-bar', label: 'Bar', text: '' }, { tag: 'sav-progress-ring', label: 'Ring', text: '60%' }], text: '', attrs: { value: '60' } }, tag: 'sav-progress-bar · sav-progress-ring', group: 'Feedback', icon: 'chart-no-axes-gantt',
    desc: 'Show how far a task has gone.',
    demos: [
      { title: 'Bar', html: `<sav-progress-bar value="35" label="Uploading" show-value></sav-progress-bar>
<sav-progress-bar value="70" variant="success" striped style="--height: .9rem"></sav-progress-bar>
<sav-progress-bar indeterminate label="Loading" variant="neutral"></sav-progress-bar>
<sav-progress-bar value="60" style="--height: 1.25rem">60%</sav-progress-bar>` },
      { title: 'Ring', html: `<sav-progress-ring value="25">25%</sav-progress-ring>
<sav-progress-ring value="64" variant="success">64%</sav-progress-ring>
<sav-progress-ring value="90" variant="danger" style="--size: 6rem; --track-width: 10px">90%</sav-progress-ring>` },
    ],
    attrs: [['value', 'number', '0–100 (or 0–max).'], ['max', 'number', 'Bar only, default 100.'], ['indeterminate · striped · show-value', 'boolean', 'Bar only.'], ['label', 'string', ''], ['variant', 'primary · …', ''], ['--height · --size · --track-width', 'CSS', ''], ['--text-color', 'CSS', 'The colour of the value written on the bar. Unset, it is black or white, whichever is readable on the bar (WCAG AA, at least 4.5:1), whatever the colour.']],
  },
  {
    id: 'skeleton', name: 'Skeleton', tag: 'sav-skeleton', group: 'Feedback', icon: 'scan',
    desc: 'Placeholders that hold the layout while content loads.',
    demos: [{ title: 'Card placeholder', html: `<div class="demo-skel">
  <sav-skeleton shape="circle" style="width: 3rem; height: 3rem"></sav-skeleton>
  <div style="flex: 1; display: grid; gap: .5rem">
    <sav-skeleton style="width: 40%"></sav-skeleton>
    <sav-skeleton></sav-skeleton>
    <sav-skeleton style="width: 80%" effect="pulse"></sav-skeleton>
  </div>
</div>
<sav-skeleton shape="rect" style="height: 8rem; margin-top: 1rem"></sav-skeleton>` }],
    attrs: [['shape', 'text · rect · circle', ''], ['effect', 'sheen · pulse · none', 'Default sheen.'], ['--color · --sheen', 'CSS', '']],
  },
  {
    builtFrom: ['icon'],
    id: 'empty-state', name: 'Empty state', play: { tag: 'sav-empty-state', attrs: { icon: 'inbox', heading: 'No messages yet', text: 'When someone writes to you, the message shows up here.' }, children: '<sav-button>Write a message</sav-button>' }, tag: 'sav-empty-state', group: 'Feedback', icon: 'inbox',
    desc: 'What to show when there is nothing yet — no results, an empty inbox, a new project: a drawing made of the icon on leaning tiles (they lean the way the style does), a heading, a line of text and what to do next.',
    demos: [
      { title: 'With an action', html: `<sav-empty-state icon="inbox" heading="No messages yet" text="When someone writes to you, the message shows up here." style="width: 100%">
  <sav-button><sav-icon slot="prefix" name="pencil"></sav-icon>Write a message</sav-button>
  <sav-button appearance="ghost" variant="neutral">Learn more</sav-button>
</sav-empty-state>` },
      { title: 'No results, in a card, small', html: `<sav-empty-state appearance="card" size="sm" icon="search-x" heading="Nothing matches “zebra”" text="Check the spelling or try fewer words." style="width: 100%">
  <sav-button size="sm" appearance="outline" variant="neutral">Clear the search</sav-button>
</sav-empty-state>` },
    ],
    attrs: [['heading · text', 'string', 'The title and the line under it.'], ['icon', 'icon name', 'Drawn on the leaning tiles (default inbox).'], ['size', 'sm · md · lg', ''], ['appearance', 'plain · card', 'card puts it in a dashed box.'],
      ['level', 'number', 'Heading level for screen readers (default 3).']],
    slots: [['(default)', 'Buttons or links: what to do next.'], ['image', 'Your own picture instead of the icon.'], ['text', 'Richer text than the text attribute (links, bold).']],
    parts: ['base', 'image', 'heading', 'text', 'actions'],
  },

  /* ------------------------------------------------------------ Forms */
  {
    id: 'input', name: 'Input', play: { tag: 'sav-input', attrs: { label: 'Email', placeholder: 'you@example.com' } }, tag: 'sav-input', group: 'Forms', icon: 'text-cursor-input',
    desc: 'A text field with label, help text, icons, clear button and password toggle. It takes part in native forms and validation.',
    demos: [
      { title: 'Basic', html: `<sav-input label="Name" placeholder="Ada Lovelace" help="As shown on your profile."></sav-input>
<sav-input label="Search" type="search" placeholder="Search" clearable>
  <sav-icon slot="prefix" name="search"></sav-icon>
</sav-input>
<sav-input label="Password" type="password" password-toggle value="secret-value"></sav-input>` },
      { title: 'Sizes, filled, pill', html: `<sav-input size="sm" placeholder="Small"></sav-input>
<sav-input placeholder="Medium" appearance="filled"></sav-input>
<sav-input size="lg" placeholder="Large pill" pill></sav-input>` },
      { title: 'Validation', html: `<sav-input label="Email" type="email" required placeholder="you@example.com" help="Type an invalid email and leave the field."></sav-input>
<sav-input label="Amount" type="number" min="1" max="10" value="4">
  <span slot="suffix">EUR</span>
</sav-input>
<sav-input label="Disabled" disabled value="Not editable"></sav-input>` },
    ],
    attrs: [['label · help · placeholder · value', 'string', ''], ['type', 'text · email · password · number · search · tel · url · date · …', ''], ['size', 'sm · md · lg', ''], ['appearance', 'outline · filled', ''], ['pill · clearable · password-toggle', 'boolean', ''], ['name · required · disabled · readonly', '', 'Form behaviour.'], ['min · max · step · minlength · maxlength · pattern · autocomplete · inputmode', '', 'Passed to the native input.'], ['autofocus', 'boolean', 'Takes the focus when the page opens.'], ['spellcheck', 'true · false', 'Whether the browser checks the spelling.'], ['enterkeyhint', 'enter · done · go · next · previous · search · send', 'The label of the Enter key on phones.'], ['list', 'string', 'The id of a <datalist> with suggestions.']],
    slots: [['label', 'Rich label'], ['prefix · suffix', 'Icons or text inside the field'], ['help', 'Rich help text']],
    events: [['input · change', 'Native-like events on the element.'], ['sav-clear', 'When the clear button is used.']],
    methods: [['focus() · blur() · select()', ''], ['checkValidity() · reportValidity() · setCustomValidity(msg)', '']],
    parts: ['form-control', 'label', 'base', 'input', 'help-text'],
  },
  {
    id: 'number-input', name: 'Number input', play: { tag: 'sav-number-input', attrs: { label: 'Guests', value: '2', min: '1', max: '12' } }, tag: 'sav-number-input', group: 'Forms', icon: 'diff',
    desc: 'A number field with a − button on the left and a + on the right. The buttons switch off at the minimum and maximum; hold one to keep counting. After a wrong entry it says why (too small, too large, which steps fit); with <code>limits="always"</code> it also shows the allowed range beforehand. It takes part in native forms and validation.',
    demos: [
      { title: 'Basic', html: `<sav-number-input label="Guests" value="2" min="1" max="12" help="From 1 to 12 people."></sav-number-input>
<sav-number-input label="Weight" value="2.5" min="0" step="0.5" unit="kg"></sav-number-input>` },
      { title: 'Buttons', html: `<sav-number-input label="Buttons on the sides (default)" value="1" min="0"></sav-number-input>
<sav-number-input label="Both buttons on the right" value="1" min="0" buttons="end"></sav-number-input>
<sav-number-input label="No buttons" value="1" min="0" buttons="none"></sav-number-input>` },
      { title: 'Range and errors', html: `<sav-number-input label="Always (limits=always)" value="16000" min="1024" max="131072" step="1" button-step="1024" unit="tokens" limits="always" help="Any whole number; the buttons and arrows move by 1024."></sav-number-input>
<sav-number-input label="Only after a mistake (auto, default)" value="7" min="0" max="100" step="5" help="Leave 7 and click elsewhere: it says which values fit."></sav-number-input>
<sav-number-input label="Never (limits=never)" value="9" min="1" max="5" limits="never"></sav-number-input>` },
      { title: 'Sizes, colours, pill', html: `<sav-number-input size="sm" value="3" min="0" max="5" aria-label="Small"></sav-number-input>
<sav-number-input value="40" step="5" variant="success" unit="%" aria-label="Medium, success"></sav-number-input>
<sav-number-input size="lg" value="10" pill appearance="filled" aria-label="Large pill"></sav-number-input>
<sav-number-input value="7" disabled aria-label="Disabled"></sav-number-input>` },
      { title: 'Listen to changes', html: `<sav-number-input id="qty" label="Quantity" value="1" min="1" max="99"></sav-number-input>
<p class="muted small" id="qtyOut">Total: 12.00 EUR (example price 12 EUR)</p>
<script>
  const qty = document.getElementById('qty');
  qty.addEventListener('input', () => {
    document.getElementById('qtyOut').textContent = 'Total: ' + ((qty.value || 0) * 12).toFixed(2) + ' EUR (example price 12 EUR)';
  });
</script>` },
    ],
    attrs: [['label · help · placeholder', 'string', ''], ['value · min · max · step', 'number', 'Arrows step by step, PageUp and PageDown by ten steps.'], ['unit', 'string', 'Text after the number, inside the field (kg, %, EUR…).'],
      ['buttons', 'sides · end · none', 'Where the − and + buttons go. Default sides.'], ['button-step', 'number', 'How far the buttons and the arrow keys move, when it differs from step (e.g. step 1 and button-step 1024).'], ['limits', 'auto · always · never', 'When the allowed range is written under the field: auto (default) only after a wrong entry, with the reason; always also before ("From 1 to 12"); never not at all (only the red border).'], ['size', 'sm · md · lg', ''], ['appearance', 'outline · filled', ''], ['variant', 'primary · …', 'Colour of the buttons.'],
      ['pill · readonly · disabled · required', 'boolean', ''], ['name', 'string', 'Form field name.'], ['decrease-label · increase-label', 'string', 'Names of the buttons for screen readers. Default "Decrease" and "Increase".'], ['autofocus', 'boolean', 'Takes the focus when the page opens.'], ['autocomplete', 'string', 'What the browser may fill in.'], ['inputmode', 'numeric · decimal', 'The keyboard phones show (numeric by default for whole steps).']],
    slots: [['label', 'Rich label'], ['prefix · suffix', 'Icons or text inside the field, next to the number'], ['help', 'Rich help text']],
    events: [['input', 'While the number changes (typing or buttons): detail.value.'], ['change', 'When a change is done: detail.value (a number, or null when empty).']],
    methods: [['stepUp(n) · stepDown(n)', 'Change the number by n steps.'], ['focus() · blur() · select()', ''], ['checkValidity() · reportValidity() · setCustomValidity(msg)', '']],
    parts: ['form-control', 'label', 'base', 'input', 'button', 'decrease-button', 'increase-button', 'unit', 'help-text', 'limits'],
  },
  {
    id: 'zoom', name: 'Zoom', play: { tag: 'sav-zoom', attrs: {} }, tag: 'sav-zoom', group: 'Forms', icon: 'zoom-in',
    desc: 'A zoom control: “−”, the percentage, “+”. A click on the percentage goes back to 100%. With <code>for</code> it zooms an element of the page by itself; otherwise listen to <code>change</code>.',
    demos: [
      { title: 'Zooming a picture', html: `<sav-zoom for="zoom-pic" min="50" max="200" step="25"></sav-zoom>
<div style="margin-top: .8rem; overflow: auto; max-height: 14rem; border: 1px solid var(--sav-color-border); border-radius: var(--sav-radius)">
  <img id="zoom-pic" src="docs/sample.svg" alt="A sample picture" style="display: block; width: 20rem">
</div>` },
      { title: 'Sizes, plain and listening', html: `<sav-zoom size="sm"></sav-zoom> <sav-zoom></sav-zoom> <sav-zoom size="lg" appearance="plain"></sav-zoom>
<p id="zoom-out" style="color: var(--sav-color-text-muted)">Change the zoom.</p>
<script>
  document.querySelectorAll('sav-zoom').forEach((z) => z.addEventListener('change', (e) => {
    document.getElementById('zoom-out').textContent = 'Zoom: ' + e.detail.value + '%';
  }));
</script>` },
    ],
    attrs: [['value', 'number', 'The zoom in % (default 100).'], ['min · max', 'number', 'The lowest and highest zoom (default 25 and 200).'], ['step', 'number', 'How much “−” and “+” change it; the value lands on its multiples (default 10).'],
      ['reset', 'number', 'Where a click on the percentage goes back to (default 100).'], ['for', 'string', 'The id of an element to zoom by itself (CSS zoom).'], ['size', 'sm · md · lg', ''], ['appearance', 'default · plain', 'plain: no box around it.'],
      ['label · reset-label · decrease-label · increase-label', 'string', 'Names for screen readers (default "Zoom", "Back to 100%", "Zoom out", "Zoom in").']],
    events: [['input · change', 'The zoom changed. detail.value'], ['sav-zoom', 'Before it changes, cancelable. detail.value']],
    methods: [['value', 'Property: the zoom in %.'], ['stepBy(1 | -1) · reset()', 'One step up or down; back to 100%.']],
  },
  {
    builtFrom: ['input'],
    id: 'color-picker', name: 'Colour picker', play: { tag: 'sav-color-picker', attrs: { label: 'Brand colour', value: '#3b82f6', swatches: '#ef4444,#f59e0b,#22c55e,#3b82f6,#8b5cf6' } }, tag: 'sav-color-picker', group: 'Forms', icon: 'palette',
    desc: 'A colour field: a swatch, the hex code you can type, and suggested colours. The swatch opens the library’s own colour panel, in the style and theme of the page (saturation and brightness, hue, opacity with <code>alpha</code>, the code, an eyedropper); where the browser cannot offer all of it (Safari, Firefox) the system colour picker opens instead; <code>picker="custom"</code> always uses the panel, <code>picker="native"</code> always the system picker. The value is "#rrggbb" ("#rrggbbaa" with alpha); with clearable it can be empty. compact keeps only the swatch.',
    notice: { heading: 'Browser support', variant: 'warning', text: 'The panel works in every browser; picking a colour from the screen does not. Chrome and Edge have their own eyedropper. Safari and Firefox have none: on Apple devices the button opens the system colour picker, whose pipette picks from the screen; on Windows and Linux there is no button. So by default (<code>picker="auto"</code>) those browsers get the system colour picker; <code>picker="custom"</code> keeps the panel there too (the eyedropper button then opens the system picker on Apple devices), <code>picker="native"</code> uses the system picker everywhere.' },
    demos: [
      { title: 'Field, with suggested colours', html: `<sav-color-picker label="Brand colour" value="#3b82f6" swatches="#ef4444,#f59e0b,#22c55e,#3b82f6,#8b5cf6" help="Click the square, type a code or pick one below." style="max-width: 18rem"></sav-color-picker>
<sav-color-picker label="Highlight (optional)" clearable style="max-width: 18rem"></sav-color-picker>` },
      { title: 'With opacity, and the system picker', html: `<sav-color-picker label="Overlay (with opacity)" alpha value="#3b82f680" style="max-width: 18rem"></sav-color-picker>
<sav-color-picker label="The system colour picker" picker="native" value="#22c55e" style="max-width: 18rem; margin-top: 1rem"></sav-color-picker>` },
      { title: 'Compact, only the swatch', html: `<sav-color-picker compact label="Text colour" value="#1f2937"></sav-color-picker>
<sav-color-picker compact label="Background" value="#fde68a"></sav-color-picker>
<sav-color-picker compact label="Border" value="#8b5cf6"></sav-color-picker>` },
      { title: 'In a form', html: `<form class="stack" style="max-width: 18rem" onsubmit="event.preventDefault(); Sav.toast('Saved: ' + new FormData(this).get('accent'), { variant: 'success' })">
  <sav-color-picker name="accent" label="Accent" required clearable></sav-color-picker>
  <sav-button type="submit">Save</sav-button>
</form>` },
    ],
    attrs: [['value', 'string', 'A colour in hex: #rrggbb or #rgb (with alpha also #rrggbbaa or #rgba).'], ['picker', 'auto · custom · native', 'auto: the library’s colour panel where the browser offers all of it, eyedropper included (Chrome, Edge), the system picker elsewhere (Safari, Firefox) — the default; custom: always the panel, in the style of the page; native: always the system colour picker of the browser or the operating system.'], ['alpha', 'boolean', 'An opacity slider in the panel; the value then ends with two more digits when the colour is see-through (#3b82f680).'], ['label · help · placeholder', 'string', ''], ['swatches', 'string', 'Suggested colours, separated by commas: #ef4444,#22c55e…'],
      ['clearable', 'boolean', 'A button to leave it empty (no colour).'], ['compact', 'boolean', 'Only the swatch: a small square that opens the picker.'],
      ['size', 'sm · md · lg', ''], ['name · disabled · readonly · required', '', 'Like any form field.']],
    events: [['input', 'While the colour changes (dragging in the panel or the picker, typing a valid code): detail.value.'], ['change', 'The colour is chosen (a drag or a key in the panel ends, the panel closes, a code is typed): detail.value ("" when cleared).'], ['sav-show · sav-hide', 'The panel opened (cancelable) or closed.']],
    methods: [['value', 'The colour, "#rrggbb" or "".'], ['open() · close()', 'Opens or closes the colour panel (with picker="native", open() opens the system picker, and only from a click or a key, as browsers require).'], ['focus()', '']],
    parts: ['form-control', 'label', 'base', 'swatch', 'input', 'clear-button', 'swatches', 'help-text'],
  },
  {
    id: 'textarea', name: 'Textarea', play: { tag: 'sav-textarea', attrs: { label: 'Message' } }, tag: 'sav-textarea', group: 'Forms', icon: 'letter-text',
    desc: 'Multi-line text, with an optional counter and automatic height.',
    demos: [{ title: 'Basic', html: `<sav-textarea label="Message" placeholder="Write something…" maxlength="200" counter></sav-textarea>
<sav-textarea label="Grows with the text" resize="auto" rows="2" help="resize=&quot;auto&quot;"></sav-textarea>` }],
    attrs: [['label · help · placeholder · value', 'string', ''], ['rows', 'number', 'Default 4.'], ['resize', 'vertical · none · auto', ''], ['counter', 'boolean', 'Shows the character count.'], ['name · required · disabled · readonly · minlength · maxlength', '', ''], ['autofocus', 'boolean', 'Takes the focus when the page opens.'], ['spellcheck', 'true · false', 'Whether the browser checks the spelling.'], ['autocomplete', 'string', 'What the browser may fill in.'], ['wrap', 'soft · hard · off', 'How the text is sent: soft keeps the lines as typed, hard adds the breaks shown.']],
    events: [['input', 'At every key: event.target.value.'], ['change', 'When the text changed and the field loses the focus.']],
  },
  {
    id: 'select', name: 'Select', play: { tag: 'sav-select', attrs: { label: 'Fruit', placeholder: 'Choose one' }, children: '<option value="apple">Apple</option><option value="pear">Pear</option><option value="kiwi">Kiwi</option>' }, tag: 'sav-select', group: 'Forms', icon: 'list',
    desc: 'A select with its own list: search, multiple choice, groups and descriptions. Put normal <code>&lt;option&gt;</code> and <code>&lt;optgroup&gt;</code> elements inside. On phones it can open as a sheet from the bottom, or use the phone’s own picker.',
    demos: [
      { title: 'Basic', html: `<sav-select label="Country" placeholder="Choose a country" required>
  <option value="it">Italy</option>
  <option value="fr">France</option>
  <option value="de">Germany</option>
  <option value="es">Spain</option>
</sav-select>
<sav-select label="Plan" value="pro" help="Change it whenever you want." clearable>
  <optgroup label="Personal">
    <option value="free" data-description="For trying things out">Free</option>
    <option value="pro" data-description="Everything for one person">Pro</option>
  </optgroup>
  <optgroup label="Business">
    <option value="team" data-description="Shared spaces and roles">Team</option>
  </optgroup>
</sav-select>` },
      { title: 'Search and multiple choice', html: `<sav-select label="Languages" multiple searchable clearable placeholder="Pick some" value="it,en">
  <option value="it">Italiano</option><option value="en">English</option><option value="fr">Français</option>
  <option value="de">Deutsch</option><option value="es">Español</option><option value="pt">Português</option>
  <option value="nl">Nederlands</option><option value="pl">Polski</option><option value="sv">Svenska</option>
</sav-select>` },
      { title: 'On phones', html: `<sav-select label="Sheet from the bottom" sheet-on-mobile placeholder="Try it at phone width">
  <option>Small</option><option>Medium</option><option>Large</option>
</sav-select>
<sav-select label="The phone's own picker" native-on-mobile placeholder="Native on phones">
  <option>Small</option><option>Medium</option><option>Large</option>
</sav-select>` },
    ],
    attrs: [['label · help · placeholder · value', 'string', 'With multiple, value is a comma-separated list.'], ['multiple', 'boolean', 'Choose more than one: the choices show as chips.'], ['searchable', 'boolean', 'A search field at the top of the list.'],
      ['clearable', 'boolean', 'A button that empties the field.'], ['sheet-on-mobile', 'boolean', 'On screens up to 640px the list rises from the bottom.'], ['native-on-mobile · native', 'boolean', 'Use the operating system picker on phones, or always.'],
      ['size', 'sm · md · lg', ''], ['appearance', 'outline · filled', ''], ['pill', 'boolean', ''], ['select-all', 'boolean', 'With multiple: a row on top of the list picks every option, or clears them all (also Ctrl/⌘ + A in the list). select-all-label and clear-all-label name it.'], ['max-chips', 'number', 'Chips shown before “+N”, default 3.'], ['name · required · disabled · readonly', '', 'Form behaviour.'],
      ['data-description', 'string', 'On an option: a second line under its label.'], ['auto-text', 'boolean', 'With multiple: the tick of the chosen options is black or white, whichever is readable on the box (WCAG AA, at least 4.5:1), also with your own colours.'], ['placement', 'bottom-start · bottom-end · top-start · top-end', 'Where the list opens, when there is room (default bottom-start).']],
    events: [['input · change', 'When the value changes.'], ['sav-show · sav-hide', 'The list opens or closes.']],
    methods: [['value', 'A string, or an array with multiple.'], ['show() · hide() · focus()', '']],
  },
  {
    id: 'date-picker', name: 'Date picker', play: { tag: 'sav-date-picker', attrs: { label: 'Date', placeholder: 'Pick a date' } }, tag: 'sav-date-picker', group: 'Forms', icon: 'calendar',
    desc: 'Picks a day, a month or a year from a calendar in the language of the page. The value is always ISO (2026-11-16), whatever is shown. Keyboard: arrows, Page Up / Down, Enter.',
    demos: [
      { title: 'Day, month, year', html: `<sav-date-picker label="Day" placeholder="Pick a date" value="2026-11-16"></sav-date-picker>
<sav-date-picker label="Month" mode="month" placeholder="Pick a month"></sav-date-picker>
<sav-date-picker label="Year" mode="year" placeholder="Pick a year" value="2026"></sav-date-picker>
<sav-date-picker label="Day and time" mode="datetime" placeholder="Pick a moment" value="2026-11-16T10:30"></sav-date-picker>` },
      { title: 'Limits, language, phones', html: `<sav-date-picker label="Check-in" min="2026-11-16" max="2027-03-31" help="From today to the end of March." clearable sheet-on-mobile></sav-date-picker>
<sav-date-picker label="Data (italiano)" locale="it-IT" value="2026-12-25" format="full"></sav-date-picker>
<sav-date-picker label="Native picker on phones" native-on-mobile></sav-date-picker>` },
    ],
    attrs: [['mode', 'date · month · year · datetime', 'What to pick. Values: 2026-11-16, 2026-11, 2026, 2026-11-16T10:30. datetime shows the time (hours and minutes) under the calendar: a day keeps the panel open, Done closes it, Now picks this moment.'], ['value · min · max', 'ISO date', 'Same format as the mode (min and max of a datetime limit the days).'], ['label · help · placeholder', 'string', ''],
      ['locale', 'string', 'Language of names and the first day of the week; default the page language.'], ['first-day', 'number', '0 = Sunday, 1 = Monday…'], ['format', 'short · medium · long · full', 'How the chosen date is written.'],
      ['clearable', 'boolean', ''], ['sheet-on-mobile · native-on-mobile · native', 'boolean', 'How it opens on phones.'], ['size', 'sm · md · lg', ''], ['name · required · disabled · readonly', '', 'Form behaviour.'], ['auto-text', 'boolean', 'The chosen day and today are black or white, whichever is readable on what is behind them (WCAG AA, at least 4.5:1), also with your own colours.'], ['placement', 'bottom-start · bottom-end · top-start · top-end', 'Where the calendar opens, when there is room.']],
    events: [['input · change', 'When a date is chosen.'], ['sav-show · sav-hide', 'The list or calendar opened or closed.']],
  },
  {
    id: 'time-picker', name: 'Time picker', play: { tag: 'sav-time-picker', attrs: { label: 'Time', placeholder: 'Pick a time' } }, tag: 'sav-time-picker', group: 'Forms', icon: 'clock',
    desc: 'Picks a time from hour and minute columns, in 24 or 12 hours following the language. The value is always 24-hour (18:30).',
    demos: [
      { title: 'Basic', html: `<sav-time-picker label="Start" value="09:30"></sav-time-picker>
<sav-time-picker label="Every 15 minutes" step="15" placeholder="Pick a time" sheet-on-mobile></sav-time-picker>
<sav-time-picker label="12 hours" hour-cycle="12" value="18:45"></sav-time-picker>
<sav-time-picker label="Office hours" min="08:00" max="18:00" native-on-mobile help="From 8 to 18."></sav-time-picker>` },
    ],
    attrs: [['value · min · max', 'HH:MM', '24-hour time.'], ['step', 'number', 'Minutes between choices, default 5.'], ['hour-cycle', '12 · 24', 'Default from the language.'], ['locale', 'string', ''],
      ['label · help · placeholder', 'string', ''], ['clearable', 'boolean', ''], ['sheet-on-mobile · native-on-mobile · native', 'boolean', 'How it opens on phones.'], ['size', 'sm · md · lg', ''], ['name · required · disabled · readonly', '', 'Form behaviour.'], ['auto-text', 'boolean', 'The chosen time is black or white, whichever is readable on its highlight (WCAG AA, at least 4.5:1), also with your own colours.'], ['placement', 'bottom-start · bottom-end · top-start · top-end', 'Where the list opens, when there is room.']],
    events: [['input', 'At every change in the columns.'], ['change', 'When the popup closes with a new time.'], ['sav-show · sav-hide', 'The list or calendar opened or closed.']],
  },
  {
    id: 'checkbox', name: 'Checkbox & Switch', play: { tag: 'sav-switch', tags: [{ tag: 'sav-switch', label: 'Switch' }, { tag: 'sav-checkbox', label: 'Checkbox' }], text: 'Notifications', attrs: { checked: true } }, tag: 'sav-checkbox · sav-switch', group: 'Forms', icon: 'square-check',
    desc: 'On/off choices. Checkboxes also support the indeterminate state.',
    demos: [
      { title: 'Checkbox', html: `<sav-checkbox checked>Remember me</sav-checkbox>
<sav-checkbox indeterminate>Select all</sav-checkbox>
<sav-checkbox variant="success" checked help="We send one email a month.">Newsletter</sav-checkbox>
<sav-checkbox disabled>Disabled</sav-checkbox>` },
      { title: 'Switch', html: `<sav-switch checked>Notifications</sav-switch>
<sav-switch variant="success">Auto-save</sav-switch>
<sav-switch size="lg" variant="danger" checked>Large</sav-switch>
<sav-switch size="sm">Small</sav-switch>` },
    ],
    attrs: [['checked · indeterminate', 'boolean', ''], ['value', 'string', 'Sent with the form, default "on".'], ['variant', 'primary · …', ''], ['size', 'sm · md · lg', ''], ['help', 'string', ''], ['name · required · disabled', '', ''], ['auto-text', 'boolean', 'sav-checkbox: the tick (or dash) is black or white, whichever is readable on the checked box (WCAG AA, at least 4.5:1), also with your own colours.']],
    events: [['change', '']],
  },
  {
    id: 'radio', name: 'Radio group', tag: 'sav-radio-group · sav-radio', group: 'Forms', icon: 'circle-dot',
    desc: 'One choice among several, with arrow-key navigation. <code>appearance="buttons"</code> turns it into a segmented control; <code>appearance="cards"</code> into a grid of cards, each with a picture of its own (looks, layouts, templates, plans).',
    demos: [
      { title: 'Basic', html: `<sav-radio-group label="Delivery" name="delivery" value="standard">
  <sav-radio value="standard">Standard (3–5 days)</sav-radio>
  <sav-radio value="express">Express (1 day)</sav-radio>
  <sav-radio value="pickup" disabled>Pick up in store</sav-radio>
</sav-radio-group>` },
      { title: 'Marks: fill, dot, ring', html: `<sav-radio-group label="Fill (the default)" value="a" orientation="horizontal"><sav-radio value="a">Chosen</sav-radio><sav-radio value="b">Other</sav-radio></sav-radio-group>
<sav-radio-group label="Dot" mark="dot" value="a" orientation="horizontal" style="margin-top: 1rem"><sav-radio value="a">Chosen</sav-radio><sav-radio value="b">Other</sav-radio></sav-radio-group>
<sav-radio-group label="Ring" mark="ring" value="a" orientation="horizontal" style="margin-top: 1rem"><sav-radio value="a">Chosen</sav-radio><sav-radio value="b">Other</sav-radio></sav-radio-group>` },
      { title: 'Horizontal and buttons', html: `<sav-radio-group label="Size" orientation="horizontal" value="m">
  <sav-radio value="s">S</sav-radio><sav-radio value="m">M</sav-radio><sav-radio value="l">L</sav-radio>
</sav-radio-group>
<sav-radio-group label="View" appearance="buttons" value="week">
  <sav-radio value="day">Day</sav-radio>
  <sav-radio value="week">Week</sav-radio>
  <sav-radio value="month">Month</sav-radio>
</sav-radio-group>` },
      { title: 'Cards, with a picture', html: `<sav-radio-group label="Look of the page" appearance="cards" value="card" columns="3" style="width: 100%; max-width: 34rem">
  <sav-radio value="card"><span slot="media" class="choice-art"><i></i><i class="short"></i><b></b></span>Card</sav-radio>
  <sav-radio value="minimal"><span slot="media" class="choice-art plain"><i></i><i class="short"></i><b></b></span>Minimal</sav-radio>
  <sav-radio value="bold"><span slot="media" class="choice-art bold"><i></i><i class="short"></i><b></b></span>Bold</sav-radio>
</sav-radio-group>
<style>
  .choice-art { display: grid; align-content: center; justify-items: center; gap: 5px; height: 4.5rem; padding: .5rem; border-radius: var(--sav-radius); background: var(--sav-color-surface-2); }
  .choice-art i { display: block; width: 72%; height: 5px; border-radius: 3px; background: var(--sav-color-border-strong); }
  .choice-art i.short { width: 50%; }
  .choice-art b { display: block; width: 46%; height: 10px; border-radius: 5px; background: var(--sav-color-primary); }
  .choice-art.plain { background: transparent; }
  .choice-art.bold { background: var(--sav-color-primary); }
  .choice-art.bold i, .choice-art.bold b { background: var(--sav-color-on-primary); }
</style>` },
      { title: 'Cards, with a line under the name', html: `<sav-radio-group label="Plan" appearance="cards" value="team" style="width: 100%; max-width: 34rem">
  <sav-radio value="solo">Solo<span slot="description">For one person, free</span></sav-radio>
  <sav-radio value="team">Team<span slot="description">Up to 10 people</span></sav-radio>
  <sav-radio value="company" disabled>Company<span slot="description">Ask us</span></sav-radio>
</sav-radio-group>` },
    ],
    attrs: [['label · help · value · name', 'string', 'On the group.'], ['orientation', 'vertical · horizontal', ''], ['appearance', 'buttons · cards', 'buttons: a segmented control. cards: a grid of cards drawn like sav-card (in every style), the mark of the radio in their top corner; the chosen one takes the colour.'],
      ['columns', 'number', 'Cards: how many per row. Without it the grid fills the width with cards at least --sav-choice-min wide.'],
      ['--sav-choice-min · --sav-choice-gap · --sav-choice-padding · --sav-choice-align', 'CSS', 'Cards: the narrowest card (default 9rem), the space between them, inside them, and the alignment of their text (start or center).'], ['size', 'sm · md · lg', ''], ['mark', 'fill · dot · ring', 'How the chosen option looks: fill fills the shape (the default); dot fills it with a small mark inside; ring keeps it light, with a coloured border and a mark in the middle (the clearest difference from a ticked checkbox in the square styles). On the group it reaches every radio; a radio can have its own.'], ['required · disabled', '', ''], ['value · disabled', '', 'On each sav-radio.'], ['auto-text', 'boolean', 'The dot of the chosen option is black or white, whichever is readable on the filled circle (WCAG AA, at least 4.5:1), also with your own colours. On the group it reaches every sav-radio.']],
    slots: [['(default)', 'On sav-radio: its name'], ['media', 'On sav-radio, with cards: the picture on top'], ['description', 'On sav-radio, with cards: a line under the name']],
    parts: ['base', 'control', 'label', 'media', 'description', 'back'],
    events: [['change', 'On the group.'], ['input', 'Another option chosen (as it happens).']],
  },
  {
    builtFrom: ['tag'],
    id: 'chip', name: 'Chip', play: { tag: 'sav-chip', text: 'Vegetarian', attrs: {} }, tag: 'sav-chip · sav-chip-group', group: 'Forms', icon: 'circle-check',
    desc: 'A small choice you can switch on and off — filters, options, interests. In a sav-chip-group the chips become a single or multiple choice. (A tag only labels; a chip is chosen.)',
    demos: [
      { title: 'Filters (multiple)', html: `<sav-chip-group label="Diet" multiple value="veg">
  <sav-chip value="veg"><sav-icon slot="prefix" name="leaf"></sav-icon>Vegetarian</sav-chip>
  <sav-chip value="gf">Gluten free</sav-chip>
  <sav-chip value="spicy">Spicy</sav-chip>
</sav-chip-group>` },
      { title: 'Single choice and removable', html: `<sav-chip-group label="Size" value="m">
  <sav-chip value="s">Small</sav-chip><sav-chip value="m">Medium</sav-chip><sav-chip value="l">Large</sav-chip>
</sav-chip-group>
<sav-chip removable selected>Rome</sav-chip>` },
    ],
    attrs: [['selected', 'boolean', 'sav-chip: on.'], ['value', 'string', 'sav-chip: its value in a group.'], ['removable', 'boolean', 'sav-chip: a × that removes it.'], ['variant · size · disabled', '', 'sav-chip.'],
      ['multiple', 'boolean', 'sav-chip-group: more than one at a time.'], ['required', 'boolean', 'sav-chip-group: one must stay selected.'], ['label', 'string', 'sav-chip-group: name of the group.'], ['value', 'string · list', 'sav-chip-group: selected value(s); a list with multiple.'], ['auto-text', 'boolean', 'Black or white text, whichever is readable on the colour behind it (WCAG AA, at least 4.5:1), also with your own colours. A --text-color you set still wins.'], ['--text-color', 'CSS', 'The colour of the text, whatever the background (unset: the colour that fits the background).'], ['auto-text', 'boolean', 'sav-chip-group: auto-text on the group reaches every chip.']],
    events: [['change', 'sav-chip: detail.selected · sav-chip-group: detail.value'], ['sav-remove', 'Before a removable chip goes away, cancelable.']],
  },
  {
    id: 'otp', name: 'OTP input', play: { tag: 'sav-otp', attrs: { length: '6', type: 'numeric', label: 'Verification code' } }, tag: 'sav-otp', group: 'Forms', icon: 'rectangle-ellipsis',
    desc: 'A one-time code in separate boxes. Choose how many characters and which: numbers only, letters only, letters and numbers, or anything. Pasting a whole code fills every box; phones offer the code from an SMS.',
    demos: [
      { title: 'Numbers, letters, groups', html: `<sav-otp label="Code from the SMS" length="6" separator="3" required help="We sent it to +39 333 …"></sav-otp>
<sav-otp label="Voucher" length="8" type="alphanumeric" separator="4"></sav-otp>
<sav-otp label="PIN" length="4" mask></sav-otp>` },
    ],
    attrs: [['length', 'number', 'How many characters (1–12, default 6).'], ['type', 'numeric · alpha · alphanumeric · any', 'Which characters are accepted (default numeric). Letters are shown in upper case.'],
      ['separator', 'number', 'A dash every N boxes.'], ['mask', 'boolean', 'Hides the characters (PIN).'], ['label · help · name · required · disabled · value', '', 'Like the other fields; required wants every box filled.']],
    events: [['input', 'At every change. detail.value'], ['change', 'When all boxes are filled. detail.value'], ['sav-complete', 'Same moment: the code is complete. detail.value']],
    parts: ['base', 'cell', 'input'],
  },
  {
    builtFrom: ['input', 'progress'],
    id: 'password', name: 'Password', play: { tag: 'sav-password', attrs: { label: 'New password', rules: true } }, tag: 'sav-password', group: 'Forms', icon: 'key-round',
    desc: 'A password field with a strength meter and a checklist of rules you set: minimum length, upper-case and lower-case letters, numbers, symbols. It can refuse to submit a password that is too weak.',
    demos: [
      { title: 'Strength and rules', html: `<sav-password label="New password" rules min-length="10" min-symbols="1" min-strength="3" required style="max-width: 22rem"></sav-password>` },
    ],
    attrs: [['min-length', 'number', 'Default 8.'], ['min-uppercase · min-lowercase · min-digits', 'number', 'Default 1 each; 0 removes the rule.'], ['min-symbols', 'number', 'Default 0.'],
      ['min-strength', '0 · 1 · 2 · 3 · 4', 'The form refuses passwords below this score (0 = never).'], ['rules', 'boolean', 'Shows the checklist.'], ['no-meter', 'boolean', 'Hides the meter.'],
      ['labels', 'list', 'Words for the five scores, comma-separated (default "Too weak,Weak,Fair,Good,Strong").'], ['label · help · placeholder · name · required · autocomplete', '', 'Like an input.'], ['size', 'sm · md · lg', ''], ['disabled', 'boolean', '']],
    events: [['input', 'detail.value, detail.score (0–4)'], ['change', 'When the user leaves the field.']],
    parts: ['input', 'meter', 'strength', 'rules'],
  },
  {
    builtFrom: ['input'],
    id: 'search', name: 'Search', play: { tag: 'sav-search', attrs: { placeholder: 'Search fruit' }, children: '<option>Apple</option><option>Apricot</option><option>Banana</option><option>Blueberry</option><option>Cherry</option>' }, tag: 'sav-search', group: 'Forms', icon: 'search',
    desc: 'A search field that suggests as you type: highlighted matches, arrows and Enter to choose. Suggestions come from <option> children, or from the page on every "sav-query" (for a server search). With <code>multiple</code> every term becomes a chip inside the field (on comma, semicolon, Enter or Space, as you set); with <code>live</code> it searches while you type instead of only on Enter.',
    demos: [
      { title: 'From options', html: `<sav-search placeholder="Search a city" style="max-width: 22rem">
  <optgroup label="Italy"><option>Rome</option><option>Milan</option><option>Naples</option></optgroup>
  <optgroup label="France"><option>Paris</option><option>Lyon</option></optgroup>
</sav-search>` },
      { title: 'Live from the page', html: `<sav-search id="srch-live" placeholder="Type a component" no-filter style="max-width: 22rem"></sav-search>
<script>
  const box = document.getElementById('srch-live');
  box.addEventListener('sav-query', (e) => {
    // here a fetch() to your server; this example filters the components of this page
    const q = e.detail.query.toLowerCase();
    box.suggestions = SavDocs.docs.filter((d) => d.name.toLowerCase().includes(q))
      .map((d) => ({ label: d.name, value: d.id, description: d.tag, icon: d.icon, href: '#' + d.id }));
  });
</script>` },
      { title: 'Several terms, as chips', html: `<sav-search multiple max-terms="5" label="Tags" placeholder="Add a tag and press comma or Enter" value="design, accessibility" style="max-width: 26rem">
  <option>colour</option><option>contrast</option><option>forms</option><option>keyboard</option><option>motion</option>
</sav-search>
<sav-search multiple separators="enter ;" label="Only Enter and semicolon (Space and comma stay in the term)" placeholder="New York; San Francisco" style="max-width: 26rem; margin-top: 1rem"></sav-search>` },
      { title: 'Live search', html: `<sav-search id="srch-run" live min-chars="2" placeholder="Search while you type (from 2 letters)" style="max-width: 22rem"></sav-search>
<sav-search id="srch-enter" multiple search-keys="enter" placeholder="Only on Enter, with terms" style="max-width: 22rem; margin-top: 1rem"></sav-search>
<p id="srch-out" style="color: var(--sav-color-text-muted); font-size: .9rem">Nothing searched yet.</p>
<script>
  for (const id of ['srch-run', 'srch-enter']) document.getElementById(id).addEventListener('sav-search', (e) => {
    document.getElementById('srch-out').textContent = e.detail.terms.length ? 'Searching: ' + e.detail.terms.join(' + ') : 'Empty: showing everything';
  });
</script>` },
    ],
    attrs: [['placeholder · label · help · name', '', ''], ['value', 'string · list', 'The text; with multiple, the terms (a comma-separated list, or a list in JS).'],
      ['multiple', 'boolean', 'Each term becomes a chip inside the field; Backspace in the empty field removes the last one, the × on a chip removes that one. Off: one text, as always.'],
      ['separators', 'list', 'Keys that turn the text into a chip, separated by spaces: enter, space, tab, comma, semicolon or any character (default ", ; enter space"). Pasted text is split at them too.'],
      ['max-terms', 'number', 'Most terms (default no limit); when reached the field takes no more text and says so.'], ['max-label', 'string', 'What the field says when it is full (default "Up to N terms").'],
      ['live', 'boolean', 'sav-search fires while you type (after min-chars and debounce) and when the field is emptied; off: only on the search keys.'],
      ['search-keys', 'list', 'Keys that fire sav-search, separated by spaces (default enter). With multiple, Enter also adds the term first.'],
      ['min-chars', 'number', 'Characters before suggesting, and before the live search (default 1).'], ['debounce', 'ms', 'Wait after typing before asking for suggestions (default 120) or, with live, before searching (default 250).'],
      ['max', 'number', 'Suggestions shown (default 8).'], ['no-autoselect', 'boolean', 'The first suggestion is not highlighted: Enter then searches the text as typed until an arrow picks one. By default the first one is ready and Enter takes it (Escape closes the list to search the text).'], ['no-filter', 'boolean', 'Do not filter here: the page sends already-filtered suggestions.'], ['empty-label', 'string', 'Text when nothing matches.'], ['disabled · required', 'boolean', 'Like any field.']],
    events: [['sav-query', 'While typing (debounced): set .suggestions here. detail.query'], ['sav-pick', 'A suggestion was chosen, cancelable. detail.value, detail.label, detail.item'], ['sav-search', 'Search now: on the search keys (Enter), when a term is removed or the field is emptied, and with live while typing. detail.query (the text), detail.terms (the chips and the text)'], ['sav-term-add · sav-term-remove', 'multiple: a term is about to be added or removed, cancelable. detail.term'], ['input · change · sav-clear', 'change with multiple: detail.value is the list of terms.']],
    methods: [['suggestions', 'Property: strings or { label, value, description, icon, group, href }.'], ['terms', 'Property (multiple): the list of terms; set it to replace them.'], ['text', 'Property: what is typed right now.'], ['search()', 'Fires sav-search now.']],
  },
  {
    builtFrom: ['search'],
    id: 'chip-input', name: 'Chip input', play: { tag: 'sav-chip-input', attrs: { label: 'Tags', value: 'design, accessibility' } }, tag: 'sav-chip-input', group: 'Forms', icon: 'tags',
    desc: 'A field whose values are chips: type one and press Enter, a comma or a semicolon, or paste a list; × or Backspace removes them. With <code>kind="color"</code> each chip is a colour with its swatch; with <code>kind="number"</code> only numbers go in. The value is the list.',
    demos: [
      { title: 'Words', html: `<sav-chip-input label="Tags" value="design, accessibility" max-terms="6" style="max-width: 26rem">
  <option>colour</option><option>contrast</option><option>forms</option><option>keyboard</option>
</sav-chip-input>` },
      { title: 'Colours', html: `<sav-chip-input label="Palette" kind="color" value="#ef4444,#f59e0b,#22c55e,#3b82f6" help="Type a code (#abc or #aabbcc) and press Enter." style="max-width: 26rem"></sav-chip-input>` },
      { title: 'Numbers', html: `<sav-chip-input label="Monthly sales" kind="number" value="12,18,9,24" size="sm" style="max-width: 22rem"></sav-chip-input>` },
    ],
    attrs: [['value', 'list', 'The chips, separated by commas (in JS a list).'], ['kind', 'text · color · number', 'What a chip may be: any text (the default), a colour code (shown with its swatch, #ABC becomes #aabbcc) or a number. A wrong value shakes the field and is not added.'],
      ['separators', 'list', 'Keys that turn the text into a chip, separated by spaces: enter, comma, semicolon, space, tab or any character (default ", ; enter").'], ['max-terms', 'number', 'Most chips (default no limit).'],
      ['label · help · placeholder · name · required · disabled', '', 'Like any field; the form gets one entry per chip.'], ['size', 'sm · md · lg', ''], ['min-chars', 'number', 'Characters before the suggestions show (default 1).'], ['max-label', 'string', 'What the field says when it is full (default "Up to N terms").']],
    events: [['change', 'A chip was added or removed: detail.value (the list).'], ['sav-term-add · sav-term-remove', 'Before a chip is added or removed, cancelable. detail.term'], ['input', 'While typing: detail.text.']],
    methods: [['value · terms', 'Property: the list of chips; set it to replace them.']],
  },
  {
    builtFrom: ['select'],
    id: 'language-choice', name: 'Language choice', tag: 'sav-language-choice', group: 'Forms', icon: 'languages',
    desc: 'Choose a language from a complete list (about 140, already there): flag on the left, ISO 639-3 code on the right, search, one or many. Variants have their own flag (British and American English); several languages can share one (India, Spain, Switzerland). Names are in the page language, or in each language itself.',
    demos: [
      { title: 'One language', html: `<sav-language-choice label="Language" value="en-GB" style="max-width: 20rem"></sav-language-choice>` },
      { title: 'Several, native names, without codes', html: `<sav-language-choice label="Languages you speak" multiple native-names no-code value="it-IT,en-US" style="max-width: 24rem"></sav-language-choice>
<sav-language-choice label="Only some" include="it-IT,en-GB,en-US,fr-FR,de-DE,es-ES" no-flag value="it-IT" style="max-width: 16rem"></sav-language-choice>` },
    ],
    attrs: [['value', 'tag · list', 'BCP 47 tags (it-IT, en-GB…); a comma-separated list with multiple.'], ['multiple', 'boolean', ''], ['native-names', 'boolean', 'Each language in itself (Italiano, Deutsch…).'], ['locale', 'string', 'Language of the names (default: the page).'],
      ['code', 'iso3 · tag', 'What the code on the right shows (default ISO 639-3).'], ['no-flag · no-code', 'boolean', 'Hide the flag or the code.'], ['include · exclude', 'list', 'Only these tags, or all but these.'], ['label · placeholder · required · name · sheet-on-mobile · native-on-mobile', '', 'Like the select.'], ['help', 'string', 'A line of help under it.'], ['disabled · readonly', 'boolean', ''], ['clearable · searchable', 'boolean', 'A × to empty it; a search in the list (on by default).'], ['max-chips · select-all', 'number · boolean', 'With multiple: chips shown before +N; a row that picks every language.'], ['placement', 'bottom-start · bottom-end · top-start · top-end', 'Where the list opens.']],
    events: [['change · input', 'Like the select.'], ['sav-show · sav-hide', 'The list or calendar opened or closed.']],
  },
  {
    builtFrom: ['select'],
    id: 'country-choice', name: 'Country choice', tag: 'sav-country-choice', group: 'Forms', icon: 'globe',
    desc: 'Choose a country from the complete ISO list (249, already there): flag on the left, ISO 3166 code on the right (alpha-3 by default), search by name or code, one or many. Names follow the page language.',
    demos: [
      { title: 'One or many', html: `<sav-country-choice label="Country" value="IT" style="max-width: 20rem"></sav-country-choice>
<sav-country-choice label="Shipping to" multiple value="IT,FR,DE" code="alpha2" style="max-width: 24rem"></sav-country-choice>` },
    ],
    attrs: [['value', 'alpha-2 · list', 'IT, FR…; a comma-separated list with multiple.'], ['multiple', 'boolean', ''], ['code', 'alpha3 · alpha2 · numeric', 'Code on the right (default alpha-3).'], ['locale', 'string', 'Language of the names.'],
      ['no-flag · no-code', 'boolean', ''], ['include · exclude', 'list', 'Only these countries (alpha-2), or all but these.'], ['label · placeholder · required · name · sheet-on-mobile · native-on-mobile', '', 'Like the select.'], ['help', 'string', 'A line of help under it.'], ['disabled · readonly', 'boolean', ''], ['clearable · searchable', 'boolean', 'A × to empty it; a search in the list (on by default).'], ['max-chips · select-all', 'number · boolean', 'With multiple: chips shown before +N; a row that picks every country.'], ['native-names', 'boolean', 'Each country in its own language.'], ['placement', 'bottom-start · bottom-end · top-start · top-end', 'Where the list opens.']],
    events: [['change · input', 'Like the select.'], ['sav-show · sav-hide', 'The list or calendar opened or closed.']],
  },
  {
    builtFrom: ['dropdown', 'button'],
    id: 'theme-choice', name: 'Theme choice', play: { tag: 'sav-theme-choice', attrs: {} }, tag: 'sav-theme-choice', group: 'Forms', icon: 'theme-auto',
    desc: 'Light, Dark or Auto (follows the system), each with its icon: a menu or buttons. no-auto leaves only Light and Dark. With apply it switches the page by itself.',
    demos: [
      { title: 'Menu and buttons', html: `<sav-theme-choice value="auto"></sav-theme-choice>
<sav-theme-choice appearance="buttons" value="light"></sav-theme-choice>
<sav-theme-choice appearance="buttons" icons-only value="dark"></sav-theme-choice>` },
      { title: 'Only light and dark (no Auto)', html: `<sav-theme-choice no-auto value="light"></sav-theme-choice>
<sav-theme-choice appearance="buttons" no-auto value="dark"></sav-theme-choice>
<sav-theme-choice appearance="buttons" icons-only no-auto></sav-theme-choice>` },
    ],
    attrs: [['value', 'light · dark · auto', 'With no-auto, “auto” (or no value) shows the mode the system uses right now.'], ['no-auto', 'boolean', 'Only Light and Dark: the Auto choice is not offered.'], ['appearance', 'menu · buttons', 'Default menu.'], ['icons-only', 'boolean', 'Only the icons (the names stay for screen readers).'], ['apply', 'boolean', 'Calls Sav.setMode() on change.'], ['label', 'string', 'Name for screen readers (default "Theme").'], ['size', 'sm · md · lg', '']],
    events: [['change', 'detail.value']],
  },
  {
    builtFrom: ['button', 'list'],
    id: 'dropzone', name: 'Drop zone', tag: 'sav-dropzone', group: 'Forms', icon: 'upload',
    desc: 'An area that accepts things dragged from outside the page: files (upload), or text, links and HTML from other pages and apps — also pasted with Cmd/Ctrl+V. Accepted types, maximum size, one or many, a list of what was dropped. It belongs to forms.',
    demos: [ { title: 'Images up to 2 MB', html: `<sav-dropzone name="photos" accept="image/*,.pdf" max-size="2000000" multiple help="PNG, JPG or PDF, up to 2 MB each" style="max-width: 26rem"></sav-dropzone>` },
      { title: 'Text and links from other pages', html: `<sav-dropzone kind="data" multiple help="Drag a link or some selected text from another tab, or paste it here" style="max-width: 26rem"></sav-dropzone>` } ],
    attrs: [['kind', 'files · data · any', 'What it accepts: files (default), dragged or pasted text and links, or both.'], ['accept', 'list', 'Files: image/*, .pdf, application/zip…'], ['multiple', 'boolean', ''], ['max-size', 'bytes', 'Refuses larger files.'], ['label · help · name · required', '', ''], ['disabled', 'boolean', 'It takes no files.']],
    events: [['change', 'detail.files, detail.items'], ['sav-drop', 'Text or a link was dropped, cancelable. detail.kind, detail.text, detail.url, detail.html']], methods: [['files', 'Property: the chosen File objects.'], ['dropped', 'Property: the dropped text and links.']],
  },
  {
    id: 'range', name: 'Range', play: { tag: 'sav-range', attrs: { label: 'Volume', value: '40' } }, tag: 'sav-range', group: 'Forms', icon: 'sliders-horizontal',
    desc: 'A slider for numbers within a range.',
    demos: [{ title: 'Basic', html: `<sav-range label="Volume" value="40" show-value unit="%"></sav-range>
<sav-range label="Rating" min="1" max="5" value="3" labels="Bad, Poor, Okay, Good, Great" variant="success"></sav-range>` }],
    attrs: [['label · help', 'string', ''], ['value · min · max · step', 'number', ''], ['show-value', 'boolean', ''], ['unit', 'string', 'Appended to the shown value.'], ['labels', 'comma list', 'Labels under the track.'], ['variant', 'primary · …', ''], ['name · disabled · required', '', 'Like any form field.']],
    events: [['input', 'While the thumb moves: event.target.value.'], ['change', 'When the thumb is let go: event.target.value.']],
  },
  {
    id: 'range-dual', name: 'Double range', play: { tag: 'sav-range-dual', attrs: { label: 'Price', start: '20', end: '80', 'show-value': true, prefix: '€ ' } }, tag: 'sav-range-dual', group: 'Forms', icon: 'ruler-dimension-line',
    desc: 'A slider with two handles for a span: a start and an end, such as a price band, an age group or a period between two dates. Each handle works with the keyboard like a normal slider.',
    demos: [
      { title: 'Basic', html: `<sav-range-dual label="Price" min="0" max="500" step="10" start="80" end="320" prefix="€ " show-value></sav-range-dual>
<sav-range-dual label="Age" min="18" max="99" start="25" end="40" show-value labels="18, 40, 60, 80, 99" variant="success"></sav-range-dual>` },
      { title: 'Dates', html: `<sav-range-dual label="Stay" type="date" min="2027-06-01" max="2027-09-30" start="2027-07-10" end="2027-07-24" min-gap="1" show-value
  start-label="Check-in" end-label="Check-out" help="At least one night."></sav-range-dual>` },
      { title: 'Minimum gap and form', html: `<form id="filterForm" class="demo-form">
  <sav-range-dual name="hours" label="Opening hours" min="0" max="24" start="9" end="18" min-gap="2" unit=":00" show-value></sav-range-dual>
  <sav-button type="submit" size="sm">Send</sav-button>
  <p class="muted small" id="filterOut">The form sends hours-start and hours-end.</p>
</form>
<script>
  document.getElementById('filterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    document.getElementById('filterOut').textContent = 'Sent: ' + new URLSearchParams(data).toString();
  });
</script>` },
    ],
    attrs: [['label · help', 'string', ''], ['start · end', 'number · date', 'The two values. With type="date" they are dates written YYYY-MM-DD.'], ['min · max · step', 'number · date', 'With type="date" the step is in days.'],
      ['type', 'number · date', 'Default number.'], ['min-gap', 'number', 'Smallest distance between the two handles (default 0).'], ['show-value', 'boolean', 'Shows "start – end" next to the label.'],
      ['prefix · unit', 'string', 'Written before and after each shown number (€, %, km…).'], ['labels', 'comma list', 'Labels under the track.'], ['variant', 'primary · …', ''], ['disabled · required', 'boolean', ''],
      ['name', 'string', 'Sent with a form as two fields: name-start and name-end.'], ['name-start · name-end', 'string', 'Other names for the two fields.'], ['start-label · end-label', 'string', 'Names of the two handles for screen readers. Default "Start" and "End".']],
    slots: [['label', 'Rich label'], ['help', 'Rich help text']],
    events: [['input', 'While a handle moves: detail.start, detail.end, detail.value.'], ['change', 'When a handle is let go: detail.start, detail.end, detail.value ([start, end]).']],
    methods: [['start · end · value', 'Properties: read or set the values (numbers, or YYYY-MM-DD dates).'], ['focus()', 'Focuses the first handle.']],
    parts: ['form-control', 'label', 'value', 'base', 'track', 'fill', 'input', 'input-start', 'input-end', 'labels', 'help-text'],
  },
  {
    id: 'rating', name: 'Rating', play: { tag: 'sav-rating', attrs: { value: '3' } }, tag: 'sav-rating', group: 'Forms', icon: 'star-half',
    desc: 'Stars (or any icon) for ratings. Keyboard: arrows, Home, End.',
    demos: [{ title: 'Basic', html: `<sav-rating label="Your rating" value="3"></sav-rating>
<sav-rating value="4" readonly style="--size: 1.1rem"></sav-rating>
<sav-rating value="2" max="5" icon="heart" style="--color: var(--sav-color-danger); --size: 2rem"></sav-rating>` }],
    attrs: [['value · max', 'number', 'Default max 5.'], ['icon', 'icon name', 'Default star.'], ['readonly · disabled', 'boolean', ''], ['label · help · name', 'string', ''], ['--size · --color · --empty', 'CSS', ''], ['required', 'boolean', 'A score must be given before the form is sent.']],
    events: [['change', 'detail.value']],
  },

  /* ------------------------------------------------------------ Layout & content */
  {
    id: 'card', name: 'Card', play: { tag: 'sav-card', text: 'Content of the card.', children: '<strong slot="header">Title</strong>' }, tag: 'sav-card', group: 'Layout', icon: 'id-card',
    desc: 'A surface for grouped content, with optional media, header and footer.',
    demos: [{ title: 'Basic', html: `<div class="demo-grid">
  <sav-card>
    <img slot="media" src="docs/sample.svg" alt="" height="140">
    <strong slot="header">Mountain cabin</strong>
    A quiet place in the Dolomites, two hours from the nearest town.
    <div slot="footer" class="row between"><sav-rating value="4" readonly style="--size: 1rem"></sav-rating><sav-button size="sm">Book</sav-button></div>
  </sav-card>
  <sav-card appearance="elevated">
    <strong slot="header">Elevated</strong>
    A stronger shadow and no border.
  </sav-card>
  <sav-card appearance="flat" interactive>
    <strong slot="header">Flat and interactive</strong>
    Lifts on hover, for clickable cards.
  </sav-card>
</div>` }],
    attrs: [['appearance', 'outlined · elevated · flat', 'Default outlined.'], ['interactive', 'boolean', 'Hover effect and pointer.'], ['--sav-card-padding', 'CSS', '']],
    slots: [['media', 'Image on top'], ['header', 'Title'], ['(default)', 'Body'], ['footer', 'Actions']],
  },
  {
    id: 'avatar', name: 'Avatar', play: { tag: 'sav-avatar', attrs: { label: 'Ada Lovelace' } }, tag: 'sav-avatar', group: 'Layout', icon: 'circle-user',
    desc: 'A picture, initials or an icon for a person.',
    demos: [{ title: 'Basic', html: `<sav-avatar label="Ada Lovelace"></sav-avatar>
<sav-avatar label="Grace Hopper" variant="primary"></sav-avatar>
<sav-avatar></sav-avatar>
<sav-avatar label="Alan Turing" shape="rounded" size="lg" variant="primary"></sav-avatar>
<sav-avatar image="docs/sample.svg" label="Landscape" size="xl"></sav-avatar>` },
      { title: 'Stacked, with a ring', html: `<div style="display: flex">
  <sav-avatar label="Ada Lovelace" variant="primary" style="--ring: 0 0 0 3px var(--sav-color-bg)"></sav-avatar>
  <sav-avatar label="Alan Turing" style="--ring: 0 0 0 3px var(--sav-color-bg); margin-left: -.4rem"></sav-avatar>
  <sav-avatar label="Grace Hopper" variant="primary" style="--ring: 0 0 0 3px var(--sav-color-bg); margin-left: -.4rem"></sav-avatar>
</div>` },
      { title: 'A link or a button', html: `<sav-avatar label="Ada Lovelace" variant="primary" href="#avatar"></sav-avatar>
<sav-avatar label="Alan Turing" shape="tilt" href="#avatar"></sav-avatar>
<sav-avatar label="Open the menu of Grace Hopper" initials="GH" button size="lg" onclick="Sav.toast('Avatar clicked (example)')"></sav-avatar>` }],
    attrs: [['image', 'url', 'Falls back to initials if it fails.'], ['label', 'string', 'Name: gives the initials and the accessible name.'], ['initials', 'string', 'Overrides the computed initials.'], ['href · target', 'url · string', 'The avatar is a link (for example to the profile). Hover draws a ring on its own shape, the keyboard the focus ring: no box around it.'], ['button', 'boolean', 'The avatar is a button (for example to open a menu): listen to click.'], ['shape', 'circle · rounded · square · tilt', 'Tilt is a square leaning 10°, like the logo.'], ['size', 'sm · md · lg · xl', 'Or --size.'], ['variant', 'neutral · primary', ''], ['--size · --ring', 'CSS', '--size: width and height. --ring: a ring that follows the shape (circle, rounded, leaning square in Tilt), for example 0 0 0 2px white to separate avatars that overlap.'], ['auto-text', 'boolean', 'Black or white initials, whichever is readable on the colour behind them (WCAG AA, at least 4.5:1), also with your own colours.']],
  },
  {
    id: 'divider', name: 'Divider', tag: 'sav-divider', group: 'Layout', icon: 'separator-horizontal',
    desc: 'Separates content, horizontally or vertically, with an optional label.',
    demos: [{ title: 'Basic', html: `<p>Above</p>
<sav-divider></sav-divider>
<sav-divider>or continue with</sav-divider>
<div class="row">Home<sav-divider vertical></sav-divider>Blog<sav-divider vertical></sav-divider>Contact</div>` }],
    attrs: [['vertical', 'boolean', ''], ['--spacing', 'CSS', 'Space around the line.']],
  },
  {
    id: 'container', name: 'Container', play: { tag: 'sav-container', text: 'Content in a centred column.', attrs: { appearance: 'surface', size: 'sm' } }, tag: 'sav-container', group: 'Layout', icon: 'square-dashed',
    desc: 'A centred column with a maximum width and side padding: the frame of a page or of a section. It can also be a surface with a background.',
    demos: [
      { title: 'Widths and appearances', html: `<sav-container size="sm" appearance="surface">
  <strong>Small surface</strong>
  <p style="margin:.4rem 0 0">At most 40rem wide, centred. In the Tilt style its background leans.</p>
</sav-container>
<sav-container size="md" appearance="muted">
  <strong>Medium, muted</strong>
  <p style="margin:.4rem 0 0">At most 60rem wide.</p>
</sav-container>` },
    ],
    attrs: [['size', 'sm · md · lg · xl · full', 'Maximum width: 40, 60 (default), 75, 90rem or none.'], ['appearance', 'plain · surface · muted', 'Plain is just a column.'], ['padding', 'none · md · lg', 'Side padding.'], ['--max-width · --padding · --inner', 'CSS', 'Exact sizes.']],
  },
  {
    id: 'grid', name: 'Grid', tag: 'sav-grid', group: 'Layout', icon: 'layout-grid',
    desc: 'Puts its children in columns: a fixed number, or as many as fit with a minimum width. On phones fixed columns fall back to one (mobile-columns sets another number).',
    demos: [
      { title: 'As many as fit', html: `<sav-grid min="10rem" style="width: 100%">
  <sav-card>One</sav-card><sav-card>Two</sav-card><sav-card>Three</sav-card><sav-card>Four</sav-card>
</sav-grid>` },
      { title: 'Fixed columns', html: `<sav-grid columns="3" gap=".75rem" style="width: 100%">
  <sav-card>A</sav-card><sav-card>B</sav-card><sav-card>C</sav-card>
</sav-grid>` },
    ],
    attrs: [['columns', 'number', 'Fixed number of columns. Without it, as many as fit.'], ['min', 'length', 'Minimum width of a column (default 14rem).'], ['gap', 'length', 'Space between cells (default 1rem).'],
      ['align', 'start · center · end', 'Vertical alignment of the cells.'], ['keep', 'boolean', 'Keep the columns on phones.'], ['--mobile-columns', 'CSS', 'Columns on phones (default 1).']],
  },
  {
    id: 'sortable', name: 'Sortable (drag and drop)', tag: 'sav-sortable', group: 'Layout', icon: 'grip-vertical',
    desc: 'Reorder things by dragging them (mouse, touch, pen) — or with the keyboard: Space picks up, arrows move, Space drops, Escape cancels. Any element can be an item.',
    demos: [ { title: 'With the drag handle', html: `<sav-sortable grip handle="grip" style="max-width: 20rem">
  <div class="sort-row">Write the brief</div>
  <div class="sort-row">Pick the colours</div>
  <div class="sort-row">Send it for review</div>
</sav-sortable>
<sav-sortable grip="end" direction="horizontal" style="margin-top: 1rem">
  <span class="sort-chip">Red</span><span class="sort-chip">Green</span><span class="sort-chip">Blue</span>
</sav-sortable>
<style>
  .sort-row { display: flex; align-items: center; padding: .65rem .9rem; border: 1px solid var(--sav-color-border); border-radius: var(--sav-radius); background: var(--sav-color-surface); }
  .sort-chip { display: inline-flex; align-items: center; padding: .35rem .7rem; border-radius: var(--sav-radius-sm); background: var(--sav-color-surface-2); }
</style>` },
      { title: 'Reorder the list', html: `<sav-sortable id="sort-demo" style="max-width: 20rem">
  <sav-card data-id="design">1 · Design</sav-card>
  <sav-card data-id="build">2 · Build</sav-card>
  <sav-card data-id="test">3 · Test</sav-card>
  <sav-card data-id="ship">4 · Ship</sav-card>
</sav-sortable>
<script>
  document.getElementById('sort-demo').addEventListener('sav-sort', (e) => Sav.toast('New order: ' + e.detail.order.join(', '), { duration: 2500 }));
</script>` } ],
    attrs: [['direction', 'vertical · horizontal', ''], ['grip', 'boolean · end', 'Shows the drag handle (six dots) in each item: at the start, or at the end with grip=\"end\". It turns sideways with direction=\"horizontal\".'], ['handle', 'grip · selector', 'Drag only from this part of each item: grip for the handle above, or a CSS selector of your own (the rest of the item can then be clicked or selected).'], ['data-no-drag', 'item attribute', 'This child does not move.'], ['data-id', 'item attribute', 'Name used in detail.order.']],
    events: [['sav-sort', 'After a move. detail.from, detail.to, detail.item, detail.order']],
  },
  {
    id: 'icon', name: 'Icon', tag: 'sav-icon', group: 'Layout', icon: 'shapes',
    desc: 'More than 2,000 stroked icons that follow the colour and size of the text. About a hundred are built into the library; the others load by themselves the first time they are used. Search them below and click one to copy it. Most icons come from <a href="https://lucide.dev" target="_blank" rel="noopener">Lucide</a> (ISC licence).',
    demos: [{ title: 'Size and colour', html: `<sav-icon name="heart"></sav-icon>
<sav-icon name="rocket" style="font-size: 2rem"></sav-icon>
<sav-icon name="leaf" style="font-size: 2rem; color: var(--sav-color-success)"></sav-icon>
<sav-icon name="flame" style="font-size: 2.5rem; color: var(--sav-color-danger); --sav-icon-stroke: 1.5"></sav-icon>
<sav-icon name="shield-check" label="Secure" style="font-size: 2rem"></sav-icon>` }],
    attrs: [['name', 'icon name', 'Any name of the list below.'], ['label', 'string', 'Accessible name; without it the icon is decorative.'], ['--sav-icon-stroke', 'CSS', 'Stroke width, default 2.']],
    methods: [['Sav.registerIcon(name, svgInner)', 'Adds an icon drawn on a 24×24 grid.'], ['Sav.iconBase', 'Where the extra icons are loaded from. Default: the shared icon set of the site that serves sav.js, /icons/<Sav.iconsVersion>/ (savcomponents.com for a copy hosted elsewhere). Also settable with data-icon-base on the script tag.'], ['Sav.iconsVersion', 'The version of the icon set this library uses. Icon sets are versioned on their own, so library updates do not copy them.']],
  },

  {
    id: 'code', name: 'Code', tag: 'sav-code-block · sav-code', group: 'Layout', icon: 'code',
    desc: 'Code with syntax highlighting: a block with its language, optional file name, copy button and line numbers (they are never copied), or a short piece inside a sentence.',
    demos: [
      { title: 'Code block', html: `<sav-code-block language="js" filename="greet.js">
  // Says hello to someone
  function greet(name) {
    const text = \`Hello, \${name}!\`;
    return text.toUpperCase();
  }
</sav-code-block>` },
      { title: 'Languages', html: `<sav-code-block language="css">
  .card { padding: 1rem; color: var(--sav-color-primary); }
</sav-code-block>
<sav-code-block language="php" highlight="2">
  &lt;?php
  $name = trim($_POST['name'] ?? '');
  echo "Hello, " . htmlspecialchars($name);
</sav-code-block>
<sav-code-block language="python">
  def area(r):
      return 3.14159 * r ** 2  # circle
</sav-code-block>
<sav-code-block language="sql">
  SELECT name, email FROM users WHERE status = 'active' ORDER BY name LIMIT 10;
</sav-code-block>
<sav-code-block language="bash" no-line-numbers>
  npm install --save savcomponents
</sav-code-block>` },
      { title: 'Inline code', html: `<p>Install it with <sav-code>npm i savcomponents</sav-code>, then call <sav-code language="js">Sav.toast('Hi')</sav-code>.</p>` },
    ],
    attrs: [['language', 'html · css · js · ts · json · php · python · bash · sql · text', 'Highlighting and the label in the header.'], ['filename', 'string', 'Shown next to the language.'], ['label', 'string', 'Replaces the language name in the header.'],
      ['highlight', 'e.g. 2,4-6', 'Lines to highlight.'], ['no-line-numbers · no-copy · no-header · wrap', 'boolean', 'Hide the numbers, the copy button or the header; wrap long lines.'], ['--max-height', 'CSS', 'Scrolls when taller.']],
    events: [['sav-copy', 'After copying (detail.value).']],
    methods: [['code', 'Property: read or set the code from JavaScript.'], ['Sav.highlight(code, language)', 'Highlighted HTML of any text.']],
  },

  /* ------------------------------------------------------------ Content */
  {
    builtFrom: ['label'],
    id: 'heading', name: 'Heading', play: { tag: 'sav-heading', text: 'A section title', attrs: { level: '2', marker: true } }, tag: 'sav-heading', group: 'Content', icon: 'heading',
    desc: 'A real h1–h6 with the look of the style: an optional marker before it (a leaning tile in Tilt), a label above and a subtitle below.',
    demos: [
      { title: 'Levels, marker, label and subtitle', html: `<sav-heading level="1" eyebrow="Guide" subtitle="Everything you need in five minutes.">Getting started</sav-heading>
<sav-heading level="2" marker>Install</sav-heading>
<sav-heading level="3" size="4">A smaller h3</sav-heading>` },
    ],
    attrs: [['level', '1 · 2 · 3 · 4 · 5 · 6', 'The heading level for screen readers and the page outline (default 2).'], ['size', '1 · 2 · 3 · 4 · 5 · 6', 'Visual size, when it should differ from the level.'],
      ['marker', 'boolean', 'A small square before the text.'], ['eyebrow', 'string', 'A label above the heading (a sav-label).'], ['subtitle', 'string', 'A muted line below.']],
    parts: ['base', 'eyebrow', 'subtitle'],
  },
  {
    id: 'stat', name: 'Stat card', play: { tag: 'sav-stat', attrs: { label: 'Monthly revenue', value: '48,200', prefix: '€ ', change: '+12.4%', caption: 'vs last month', icon: 'wallet', data: '20,24,22,30,28,35,41,39,48' } }, tag: 'sav-stat', group: 'Content', icon: 'chart-no-axes-combined',
    desc: 'A number that matters, for dashboards: its name, the value, how it changed — green when it goes the good way, red when not (invert for numbers that should go down) — a caption and a small trend line.',
    demos: [
      { title: 'A row of numbers', html: `<sav-grid min="13rem" style="width: 100%">
  <sav-stat label="Monthly revenue" prefix="€ " value="48,200" change="+12.4%" caption="vs last month" icon="wallet" data="20,24,22,30,28,35,41,39,48"></sav-stat>
  <sav-stat label="Active users" value="3,912" change="+3.1%" caption="this week" icon="users" data="31,33,32,35,34,37,39"></sav-stat>
  <sav-stat label="Page load" value="1.8" unit="s" change="+0.3 s" invert caption="slower than last week" icon="timer" data="1.4,1.5,1.5,1.6,1.7,1.8"></sav-stat>
  <sav-stat label="Refunds" value="12" change="−4" invert caption="fewer is better" icon="undo-2" data="20,18,17,16,14,12"></sav-stat>
</sav-grid>` },
      { title: 'Plain, without a card', html: `<sav-stat appearance="plain" label="Downloads" value="1.2M" change="0%" caption="no change"></sav-stat>` },
    ],
    attrs: [['label · value', 'string', 'The name and the number (written as you want it: 48,200 or 1.2M).'], ['prefix · unit', 'string', 'Before and after the number: € , %, s…'],
      ['change', 'string', 'How it changed: +12%, −4, 0%; the sign decides up or down.'], ['trend', 'up · down · flat', 'Overrides what the sign of change says.'], ['invert', 'boolean', 'Going down is good (load time, refunds): down is green, up is red.'],
      ['caption', 'string', 'A short note: vs last month.'], ['icon', 'icon name', ''], ['data', 'string', 'Numbers for the trend line, separated by commas.'], ['appearance', 'card · plain', ''], ['--sav-stat-size · --spark-width', 'CSS', 'Size of the number, width of the trend line.']],
    slots: [['(default)', 'Anything under it: a link, a button.']],
    parts: ['base', 'label', 'icon', 'value', 'change', 'caption', 'sparkline'],
  },
  {
    id: 'timeline', name: 'Timeline', play: { tag: 'sav-timeline', attrs: {}, children: '<sav-timeline-item time="09:12" heading="Order placed" variant="primary">3 items, € 48.</sav-timeline-item><sav-timeline-item time="11:40" heading="Shipped" icon="truck"></sav-timeline-item><sav-timeline-item time="Tomorrow" heading="Delivery"></sav-timeline-item>' }, tag: 'sav-timeline · sav-timeline-item', group: 'Content', icon: 'git-commit-vertical',
    desc: 'Things that happened, in order: an order on its way, the history of a document, the steps of a project. Each item has a time, a heading and any content, on a line with a dot or an icon — coloured with a variant; the dots take the shape of the style.',
    demos: [
      { title: 'An order', html: `<sav-timeline label="Order 1042" style="max-width: 26rem">
  <sav-timeline-item time="Mon 09:12" heading="Order placed" variant="success" icon="check">3 items, € 48. Paid by card.</sav-timeline-item>
  <sav-timeline-item time="Mon 16:40" heading="Shipped" variant="primary" icon="truck">Tracking number <code>AB123456IT</code>.</sav-timeline-item>
  <sav-timeline-item time="Wed" heading="Out for delivery"></sav-timeline-item>
  <sav-timeline-item time="Wed" heading="Delivered"></sav-timeline-item>
</sav-timeline>` },
      { title: 'History, with avatars and relative times', html: `<sav-timeline style="max-width: 26rem">
  <sav-timeline-item heading="Ada changed the title" icon="pencil"><sav-relative-time datetime="${new Date(Date.now() - 5 * 60e3).toISOString()}"></sav-relative-time></sav-timeline-item>
  <sav-timeline-item heading="Alan left a comment" icon="message-circle">“Looks good to me.” · <sav-relative-time datetime="${new Date(Date.now() - 3 * 3600e3).toISOString()}"></sav-relative-time></sav-timeline-item>
  <sav-timeline-item heading="Build failed" variant="danger" icon="x">2 tests did not pass · yesterday</sav-timeline-item>
</sav-timeline>` },
    ],
    attrs: [['label', 'string', 'Name of the list for screen readers.'], ['time · datetime · heading · icon · variant', '', 'On sav-timeline-item: datetime is the machine date behind the written time; variant colours the dot.'], ['auto-text', 'boolean', 'The icons in the coloured dots are black or white, whichever is readable on the dot (WCAG AA, at least 4.5:1), also with your own colours.']],
    slots: [['(default)', 'On sav-timeline-item: the details.']],
    parts: ['base', 'dot', 'time', 'heading', 'content'],
  },
  {
    id: 'kbd', name: 'Keyboard key', play: { tag: 'sav-kbd', text: 'mod+K', attrs: {} }, tag: 'sav-kbd', group: 'Content', icon: 'keyboard',
    desc: 'Keys to press, drawn as keycaps that follow the style: mod+K shows ⌘ K on a Mac and Ctrl K elsewhere; several shortcuts with commas, or “then” for one after the other. Screen readers hear “Control + K”.',
    demos: [{ title: 'Shortcuts', html: `<p>Search: <sav-kbd>mod+K</sav-kbd> · Save: <sav-kbd>mod+S</sav-kbd> · New tab: <sav-kbd>mod+shift+T</sav-kbd></p>
<p>Go to the inbox: <sav-kbd>G then I</sav-kbd> · Close: <sav-kbd size="sm">Esc</sav-kbd> · Move: <sav-kbd size="lg">up, down</sav-kbd></p>` }],
    attrs: [['keys', 'string', 'The keys, if not written inside: mod+K, shift+enter, G then I. mod is ⌘ on a Mac and Ctrl elsewhere.'], ['size', 'sm · md · lg', '']],
    parts: ['base', 'key'],
  },
  {
    id: 'relative-time', name: 'Relative time', play: { tag: 'sav-relative-time', attrs: { datetime: '2026-11-01T09:00' } }, tag: 'sav-relative-time', group: 'Content', icon: 'clock',
    desc: 'A moment written the way people say it — “3 minutes ago”, “yesterday”, “in 2 weeks” — in the page language, and kept up to date while the page is open; the full date shows on hover. Or the date itself with format.',
    demos: [{ title: 'Past, future, and dates', html: `<ul style="margin: 0; line-height: 1.9">
  <li>Saved <sav-relative-time datetime="${new Date(Date.now() - 20e3).toISOString()}"></sav-relative-time></li>
  <li>Edited <sav-relative-time datetime="${new Date(Date.now() - 42 * 60e3).toISOString()}"></sav-relative-time></li>
  <li>Created <sav-relative-time datetime="${new Date(Date.now() - 86400e3).toISOString()}"></sav-relative-time></li>
  <li>Renews <sav-relative-time datetime="${new Date(Date.now() + 12 * 86400e3).toISOString()}"></sav-relative-time></li>
  <li>In Italian: <sav-relative-time locale="it" datetime="${new Date(Date.now() - 3 * 3600e3).toISOString()}"></sav-relative-time></li>
  <li>As a date: <sav-relative-time format="date" datetime="2026-11-01T09:00"></sav-relative-time></li>
</ul>` }],
    attrs: [['datetime', 'string', 'The moment: a date (2026-11-19T10:30, with or without time) or milliseconds since 1970. Empty: now.'], ['format', 'relative · date · datetime', 'Default relative (“3 minutes ago”).'],
      ['numeric', 'auto · always', 'auto says “yesterday”, always says “1 day ago”.'], ['locale', 'string', 'Language (default the page language).']],
    parts: ['base'],
  },
  {
    id: 'label', name: 'Label', play: { tag: 'sav-label', text: 'Feedback', attrs: {} }, tag: 'sav-label', group: 'Content', icon: 'bookmark',
    desc: 'A short caption that names a section or a category — the small "eyebrow" above a title. Unlike a tag it is not removable and does not filter; unlike a badge it is not a status or a count.',
    demos: [
      { title: 'Appearances', html: `<sav-label>Feedback</sav-label>
<sav-label appearance="soft">Navigation</sav-label>
<sav-label appearance="outline" variant="neutral">Draft</sav-label>
<sav-label appearance="plain">Chapter 2</sav-label>
<sav-label variant="success" case="normal"><sav-icon slot="prefix" name="check"></sav-icon>Approved</sav-label>` },
    ],
    attrs: [['variant', 'primary · neutral · success · warning · danger · protected', ''], ['appearance', 'solid · soft · outline · plain', 'Default solid.'], ['case', 'upper · normal', 'Upper case by default.'], ['--sav-label-size', 'CSS', 'Font size (default .72rem).'], ['auto-text', 'boolean', 'Black or white text, whichever is readable on the colour behind it (WCAG AA, at least 4.5:1), also with your own colours. A --text-color you set still wins.'], ['--text-color', 'CSS', 'The colour of the text, whatever the background (unset: the colour that fits the background).']],
    slots: [['(default)', 'The text.'], ['prefix', 'An icon before it.']],
  },
  {
    id: 'image', name: 'Image', play: { tag: 'sav-image', attrs: { src: 'docs/sample.svg', ratio: '16:9', alt: 'Mountains' } }, tag: 'sav-image', group: 'Content', icon: 'image',
    desc: 'An image with a fixed ratio, the corners of the style (with the tinted plate behind it in Tilt), lazy loading, a caption and an optional zoom.',
    demos: [
      { title: 'Ratio, caption and zoom', html: `<sav-image src="docs/sample.svg" alt="Hills at sunset" ratio="16:9" caption="Click to enlarge" zoom style="max-width: 22rem"></sav-image>
<sav-image src="docs/sample.svg" alt="" ratio="1:1" fit="contain" style="width: 9rem"></sav-image>` },
    ],
    attrs: [['src · srcset · sizes', 'string', 'Like a normal img.'], ['alt', 'string', 'Describes the image; leave empty for decoration.'], ['ratio', '16:9 · 4:3 · 1:1 · …', 'Keeps the shape while it loads.'], ['fit', 'cover · contain', 'Default cover.'],
      ['caption', 'string', 'A line under the image.'], ['zoom', 'boolean', 'Opens it large on click.'], ['zoom-src', 'url', 'A bigger file for the zoom.'], ['eager', 'boolean', 'Loads at once instead of when it comes into view.']],
    events: [['sav-zoom', 'The picture opened bigger (zoom).']],
    parts: ['base', 'frame', 'image', 'caption', 'zoom'],
  },
  {
    id: 'flag', name: 'Flag', tag: 'sav-flag', group: 'Content', icon: 'flag',
    desc: 'The flag of a country (ISO alpha-2) or of a region (gb-sct, es-ct…), from a set of 270 SVG flags that is versioned on its own like the icons. Decorative unless it has a label.',
    demos: [ { title: 'Countries and regions', html: `<sav-flag code="it"></sav-flag> <sav-flag code="jp"></sav-flag> <sav-flag code="br"></sav-flag> <sav-flag code="gb-sct" label="Scotland"></sav-flag> <sav-flag code="eu" label="European Union" style="--size: 3rem"></sav-flag>` } ],
    attrs: [['code', 'string', 'ISO 3166 alpha-2 (it) or a region (gb-wls, es-pv…), lower or upper case.'], ['label', 'string', 'What it represents, when the flag alone carries a meaning.'], ['--size', 'CSS', 'Width (default 1.33em, ratio 4:3).']],
  },
  {
    id: 'list', name: 'List', tag: 'sav-list · sav-list-item', group: 'Content', icon: 'list',
    desc: 'Rows with something at the start (icon, avatar), a title and description, and something at the end. A row with href is a link, with button a button.',
    demos: [
      { title: 'Card list', html: `<sav-list appearance="card" style="max-width: 26rem; width: 100%">
  <sav-list-item description="ada@example.com" href="#list"><sav-avatar slot="prefix" size="sm" label="Ada Lovelace"></sav-avatar>Ada Lovelace</sav-list-item>
  <sav-list-item description="Last seen yesterday" href="#list"><sav-avatar slot="prefix" size="sm" label="Alan Turing" variant="primary"></sav-avatar>Alan Turing</sav-list-item>
  <sav-list-item description="3 new messages"><sav-icon slot="prefix" name="mail"></sav-icon>Inbox<sav-badge slot="suffix">3</sav-badge></sav-list-item>
</sav-list>` },
    ],
    attrs: [['appearance', 'divided · card · plain', 'sav-list. Default divided (lines between rows).'], ['href', 'url', 'sav-list-item: the row is a link.'], ['button', 'boolean', 'sav-list-item: the row is a button.'], ['description', 'string', 'sav-list-item: the second line.']],
    slots: [['(default)', 'Title of the row.'], ['prefix', 'Icon or avatar at the start.'], ['suffix', 'Badge, button or value at the end.']],
  },
  {
    id: 'table', name: 'Table', tag: 'sav-table', group: 'Content', icon: 'table',
    desc: 'Styles the normal table you put inside: borders, stripes and hover from the style, a scroll area on small screens, and sorting by clicking a header.',
    demos: [
      { title: 'Sortable, striped', html: `<sav-table sortable striped hover style="width: 100%">
  <table>
    <thead><tr><th>Name</th><th>Role</th><th class="num">Tasks</th></tr></thead>
    <tbody>
      <tr><td>Ada</td><td>Editor</td><td class="num">12</td></tr>
      <tr><td>Alan</td><td>Viewer</td><td class="num">4</td></tr>
      <tr><td>Grace</td><td>Admin</td><td class="num">27</td></tr>
    </tbody>
  </table>
</sav-table>` },
    ],
    attrs: [['sortable', 'boolean', 'Click a header to sort (numbers as numbers); data-no-sort on a th skips it, data-value on a td sorts by that value.'], ['striped', 'boolean', ''], ['hover', 'boolean', 'Highlights the row under the pointer.'],
      ['compact', 'boolean', 'Less padding.'], ['appearance', 'card · plain', 'Default card.'], ['class="num"', 'th · td', 'Right-aligned numbers.'],
      ['label', 'string', 'Name of the scroll area for screen readers when the table is wider than its frame (then the frame can be reached with Tab and scrolled with the arrows). Default: the caption, or "Table".']],
    events: [['sav-sort', 'After sorting. detail.column, detail.direction']],
    methods: [['sort(index)', 'Sorts by a column.']],
  },
  /* ------------------------------------------------------------ Media */
  {
    builtFrom: ['button'],
    id: 'carousel', name: 'Carousel', tag: 'sav-carousel · sav-slide', group: 'Media', icon: 'gallery-horizontal',
    desc: 'Slides that scroll sideways — only images, or image and text. Arrow buttons, dots, swipe with fingers, drag with the mouse, arrow keys (each can be turned off), more than one slide at a time, loop and an autoplay that stops on hover, on focus and with reduced motion.',
    demos: [
      { title: 'Images', html: `<sav-carousel label="Gallery" loop style="max-width: 30rem">
  <sav-slide src="docs/sample.svg" alt="Hills at sunset"></sav-slide>
  <sav-slide src="docs/media/poster.jpg" alt="Blue gradient"></sav-slide>
  <sav-slide src="docs/sample.svg" alt="Hills, again" style="filter: hue-rotate(120deg)"></sav-slide>
</sav-carousel>` },
      { title: 'Image and text, two at a time', html: `<sav-carousel label="Stories" per-view="2" style="width: 100%">
  <sav-slide src="docs/sample.svg" alt="" heading="Mountain cabin" text="Two hours from the nearest town."></sav-slide>
  <sav-slide src="docs/media/poster.jpg" alt="" heading="Lake house" text="Swim before breakfast."></sav-slide>
  <sav-slide src="docs/sample.svg" alt="" heading="City loft" text="Everything at walking distance." style="filter: hue-rotate(200deg)"></sav-slide>
  <sav-slide src="docs/sample.svg" alt="" heading="Seaside" text="Overlay text on the image." overlay style="filter: hue-rotate(300deg)"></sav-slide>
</sav-carousel>` },
    ],
    attrs: [['label', 'string', 'sav-carousel: name for screen readers.'], ['per-view', 'number', 'Slides visible at once (default 1).'], ['loop', 'boolean', 'After the last comes the first.'], ['autoplay', 'ms', 'Moves by itself (default 5000 ms); pauses on hover and focus, off with reduced motion.'],
      ['no-arrows', 'boolean', 'Hides the previous and next buttons (on touch screens they are hidden anyway).'], ['touch-arrows', 'boolean', 'Shows the arrows on touch screens too.'], ['no-hint', 'boolean', 'On touch screens, no “grab and move” hint the first time the carousel shows up.'], ['no-dots', 'boolean', 'Hides the dots.'], ['no-swipe', 'boolean', 'Turns off swiping with fingers and dragging with the mouse.'], ['no-keyboard', 'boolean', 'Turns off the arrow keys.'], ['controls', 'inside · outside', 'Where the arrows sit.'], ['src · alt · heading · text · ratio · overlay', '', 'sav-slide: image, its text, the text over the image.']],
    events: [['sav-slide', 'The visible slide changed. detail.index']], methods: [['go(index)', 'Shows a slide.']],
  },
  {
    id: 'video', name: 'Video', play: { tag: 'sav-video', attrs: { src: 'docs/media/sample.mp4', poster: 'docs/media/poster.jpg', ratio: '16:9' } }, tag: 'sav-video', group: 'Media', icon: 'video',
    desc: 'A video in a frame with the corners of the style, a fixed ratio and a poster with a big play button, then its own control bar: play, the progress bar and the time, mute and volume, full screen — and on request back and forward 10 seconds, speed, loop, captions and picture in picture. The bar hides while playing; keys: Space, arrows, M, F, C. When the player is small, the controls that do not fit move into a ⋯ menu; <code>controls</code> chooses which ones show, <code>native-controls</code> uses the browser’s bar.',
    demos: [
      { title: 'Large', html: `<sav-video src="docs/media/sample.mp4" poster="docs/media/poster.jpg" label="Gradient demo" caption="A 4-second sample made for this page: try the controls, the keys and full screen." style="max-width: 46rem"></sav-video>` },
      { title: 'Small, square, with the browser controls', html: `<sav-video src="docs/media/sample.mp4" poster="docs/media/poster.jpg" ratio="1:1" style="max-width: 16rem"></sav-video>
<sav-video src="docs/media/sample.mp4" poster="docs/media/poster.jpg" native-controls style="max-width: 22rem"></sav-video>` },
      { title: 'Every control', html: `<sav-video src="docs/media/sample.mp4" poster="docs/media/poster.jpg" controls="play skip seek time mute volume speed loop captions pip fullscreen" style="max-width: 34rem"></sav-video>` },
      { title: 'Fewer controls, or none', html: `<sav-video src="docs/media/sample.mp4" poster="docs/media/poster.jpg" controls="play seek time mute volume fullscreen" style="max-width: 26rem"></sav-video>
<sav-video src="docs/media/sample.mp4" controls="none" autoplay muted loop style="max-width: 26rem; margin-top: 1rem" label="Background loop"></sav-video>` } ],
    attrs: [['src', 'url', 'Or <source> elements inside.'], ['poster', 'url', 'Image before playing.'], ['ratio', '16:9 · 4:3 · 1:1 · 9:16', ''], ['caption · label', 'string', 'Line below; name of the play button.'], ['controls', 'list', 'Which controls show, separated by spaces: play skip seek time mute volume speed loop captions pip fullscreen (default: play seek time mute volume fullscreen; captions and pip also need the video to allow them). none: no controls at all, not even the big play button — only the video (with autoplay muted loop for a background video).'], ['native-controls', 'boolean', 'The browser\u2019s own control bar instead of this one.'], ['autoplay · muted · loop', 'boolean', 'loop starts the video again at the end; the Loop button in the bar turns it on and off (and sets the attribute).'], ['replay-label', 'string', 'At the end (without loop) the last frame dims and a big Replay button shows: its text (default "Replay").'], ['<track kind="captions">', 'child', 'Captions: the CC button appears.'], ['auto-text', 'boolean', 'The play icon is black or white, whichever is readable on the play button (WCAG AA, at least 4.5:1), also with your own colours.']],
    events: [['play · pause · ended', '']], methods: [['play() · pause()', ''], ['video', 'Property: the <video> element.']],
  },
  {
    builtFrom: ['range', 'button'],
    id: 'audio', name: 'Audio', play: { tag: 'sav-audio', attrs: { src: 'docs/media/sample.wav', title: 'Little melody', artist: 'SavComponents' } }, tag: 'sav-audio', group: 'Media', icon: 'music',
    desc: 'A player in the style with the controls of the video player: play/pause, the progress bar and the time, mute and volume — and on request back and forward 10 seconds, speed and loop; title, artist and cover. Keys: Space or K play, ← → 5 seconds, ↑ ↓ volume, M mute. When the player is small, the controls that do not fit move into a ⋯ menu (and in a very small one the cover steps aside); <code>controls</code> chooses which ones show, <code>native-controls</code> uses the browser’s own player.',
    demos: [ { title: 'Player', html: `<sav-audio src="docs/media/sample.wav" title="Little melody" artist="SavComponents" cover="docs/media/poster.jpg" style="max-width: 34rem"></sav-audio>` },
      { title: 'Narrow (the ⋯ menu), chosen controls, the browser’s player', html: `<sav-audio src="docs/media/sample.wav" title="Little melody" style="max-width: 20rem"></sav-audio>
<sav-audio src="docs/media/sample.wav" title="Only play, seek and time" controls="play seek time" style="max-width: 26rem; margin-top: 1rem"></sav-audio>
<sav-audio src="docs/media/sample.wav" native-controls style="max-width: 26rem; margin-top: 1rem"></sav-audio>` } ],
    attrs: [['src', 'url', 'Or <source> elements inside.'], ['title · artist', 'string', ''], ['cover', 'url', 'A small picture.'], ['loop · autoplay · muted', 'boolean', 'loop starts again by itself at the end (the Loop button turns it on and off); autoplay starts on its own (browsers allow sound only after the person has used the page).'], ['replay-label', 'string', 'At the end (without loop) the play button turns into Replay: its name (default "Replay").'], ['controls', 'list', 'Which controls show, separated by spaces: play skip seek time mute volume speed loop (default: play seek time mute volume). none: no controls, only title, artist and cover (it plays with autoplay or from code).'], ['native-controls', 'boolean', 'The browser’s own player instead of the library’s.'], ['auto-text', 'boolean', 'The play icon is black or white, whichever is readable on the play button (WCAG AA, at least 4.5:1), also with your own colours.']],
    events: [['play · pause · ended', '']], methods: [['play() · pause()', ''], ['audio', 'Property: the <audio> element (volume, playbackRate, currentTime…).']],
    parts: ['base', 'cover', 'play-button', 'title', 'artist', 'controls', 'mute-button', 'audio'],
  },
  /* ------------------------------------------------------------ Overlays */
  {
    id: 'dialog', name: 'Dialog', tag: 'sav-dialog', group: 'Overlays', icon: 'app-window',
    desc: 'A modal window built on the native <code>&lt;dialog&gt;</code>: focus trap, Esc and click outside to close. With <code>sheet-on-mobile</code> it becomes an action sheet on phones (the first demo has it: try it at phone width).',
    demos: [{ title: 'Basic', html: `<sav-button onclick="document.getElementById('demo-dialog').show()">Open dialog</sav-button>
<sav-dialog id="demo-dialog" label="Delete project?" sheet-on-mobile>
  This removes the project and its 24 files. You can't undo this.
  <sav-button slot="footer" appearance="ghost" variant="neutral" data-sav-close>Cancel</sav-button>
  <sav-button slot="footer" variant="danger" data-sav-close>Delete</sav-button>
</sav-dialog>
<sav-button appearance="outline" onclick="document.getElementById('demo-dialog-2').show()">Persistent</sav-button>
<sav-dialog id="demo-dialog-2" label="Sign in" persistent style="--width: 24rem">
  <div class="stack">
    <sav-input label="Email" type="email" autofocus></sav-input>
    <sav-input label="Password" type="password" password-toggle></sav-input>
  </div>
  <sav-button slot="footer" block data-sav-close>Continue</sav-button>
</sav-dialog>` }],
    attrs: [['open', 'boolean', 'Shows the dialog.'], ['label', 'string', 'Title.'], ['sheet-on-mobile', 'boolean', 'On screens up to 640px wide it opens as an action sheet from the bottom, with full-width buttons.'], ['persistent', 'boolean', 'Clicking outside does not close it.'], ['no-header · no-close', 'boolean', ''], ['--width', 'CSS', 'Default 32rem.']],
    slots: [['(default)', 'Body'], ['label', 'Rich title'], ['header-actions', 'Buttons next to the close button'], ['footer', 'Actions']],
    events: [['sav-show · sav-after-show', ''], ['sav-request-close', 'Cancelable; detail.source = close-button · keyboard · overlay · button'], ['sav-hide · sav-after-hide', '']],
    methods: [['show() · hide()', ''], ['[data-sav-close]', 'Any element inside with this attribute closes it.']],
  },
  {
    id: 'drawer', name: 'Drawer', tag: 'sav-drawer', group: 'Overlays', icon: 'panel-right',
    desc: 'A panel that slides in from an edge. Same API as the dialog.',
    demos: [{ title: 'Placements', html: `<sav-button appearance="outline" onclick="document.getElementById('drw-end').show()">End</sav-button>
<sav-button appearance="outline" onclick="document.getElementById('drw-start').show()">Start</sav-button>
<sav-button appearance="outline" onclick="document.getElementById('drw-bottom').show()">Bottom</sav-button>
<sav-drawer id="drw-end" label="Filters">
  <div class="stack">
    <sav-checkbox checked>In stock</sav-checkbox>
    <sav-checkbox>Free shipping</sav-checkbox>
    <sav-range label="Max price" value="60" show-value unit=" €"></sav-range>
  </div>
  <sav-button slot="footer" data-sav-close>Apply</sav-button>
</sav-drawer>
<sav-drawer id="drw-start" label="Menu" placement="start" style="--size: 17rem">Navigation goes here.</sav-drawer>
<sav-drawer id="drw-bottom" label="Share" placement="bottom" style="--size: 14rem">A bottom sheet, handy on phones.</sav-drawer>` }],
    attrs: [['placement', 'end · start · top · bottom', 'Default end.'], ['--size', 'CSS', 'Width or height, default 24rem.'], ['open · label · persistent', '', 'As in the dialog.']],
    events: [['sav-show · sav-hide', 'Starts to open or to close.'], ['sav-after-show · sav-after-hide', 'Finished opening or closing (after the animation).'], ['sav-request-close', 'Esc, the backdrop or the × asks to close: call event.preventDefault() to keep it open.']],
  },
  {
    builtFrom: ['dialog', 'dropdown'],
    id: 'action-sheet', name: 'Action sheet', tag: 'sav-action-sheet · sav-menu-item', group: 'Overlays', icon: 'panel-bottom',
    desc: 'A list of actions that rises from the bottom of the screen, as on phones: a handle to drag it down, a title with a close button (an icon or a word such as Done), the actions, and a tinted footer with Cancel and any buttons of your own. On wide screens it stays at the bottom, as wide as <code>--width</code>, or opens in the middle with <code>placement="center"</code>. It can hold any content too, and scrolls inside when it is taller than the screen. <code>pick()</code> and <code>Sav.actionSheet()</code> give back the chosen action.',
    demos: [
      { title: 'Actions with Cancel', html: `<sav-button appearance="outline" variant="neutral" icon="more-horizontal" onclick="document.getElementById('demo-sheet').show()">More</sav-button>
<sav-action-sheet id="demo-sheet" label="More">
  <sav-menu-item value="theme"><sav-icon slot="prefix" name="palette"></sav-icon>Theme</sav-menu-item>
  <sav-menu-item value="media"><sav-icon slot="prefix" name="images"></sav-icon>Media</sav-menu-item>
  <sav-menu-item value="comments"><sav-icon slot="prefix" name="message-square"></sav-icon>Comments</sav-menu-item>
  <sav-menu-item value="notes"><sav-icon slot="prefix" name="file"></sav-icon>My notes</sav-menu-item>
  <sav-menu-item value="versions"><sav-icon slot="prefix" name="history"></sav-icon>Versions</sav-menu-item>
</sav-action-sheet>
<script>document.getElementById('demo-sheet').addEventListener('sav-select', e => Sav.toast('Chosen: ' + e.detail.value, {variant: 'neutral', duration: 2000}))</script>` },
      { title: 'Done instead of the ×, groups, no Cancel', html: `<sav-button appearance="soft" icon="menu" onclick="document.getElementById('demo-sheet-done').show()">Menu</sav-button>
<sav-action-sheet id="demo-sheet-done" label="Untitled" close-style="text" no-cancel expandable>
  <sav-menu-item value="undo"><sav-icon slot="prefix" name="undo-2"></sav-icon>Undo</sav-menu-item>
  <sav-menu-item value="redo"><sav-icon slot="prefix" name="redo-2"></sav-icon>Redo</sav-menu-item>
  <sav-menu-item value="present"><sav-icon slot="prefix" name="play"></sav-icon>Present</sav-menu-item>
  <sav-menu-item value="save"><sav-icon slot="prefix" name="cloud-upload"></sav-icon>Save to the cloud</sav-menu-item>
  <sav-divider></sav-divider>
  <sav-menu-item value="options"><sav-icon slot="prefix" name="settings"></sav-icon>Presentation options</sav-menu-item>
  <sav-menu-item value="versions"><sav-icon slot="prefix" name="history"></sav-icon>Versions</sav-menu-item>
  <sav-divider></sav-divider>
  <sav-menu-item value="slides"><sav-icon slot="prefix" name="layout-grid"></sav-icon>All the slides</sav-menu-item>
  <sav-menu-item value="find"><sav-icon slot="prefix" name="search"></sav-icon>Find and replace</sav-menu-item>
  <sav-menu-item value="delete" variant="danger"><sav-icon slot="prefix" name="trash"></sav-icon>Delete</sav-menu-item>
</sav-action-sheet>` },
      { title: 'From script, with your own buttons', html: `<sav-button appearance="outline" icon="share" onclick="Sav.actionSheet({ label: 'Share', items: [{ label: 'Copy link', value: 'link', icon: 'link' }, { label: 'Email', value: 'email', icon: 'mail' }, { label: 'Message', value: 'message', icon: 'message-circle' }] }).then(v => Sav.toast(v ? 'Chosen: ' + v : 'Nothing chosen', {variant: 'neutral', duration: 2000}))">Sav.actionSheet()</sav-button>
<sav-button appearance="outline" variant="neutral" onclick="document.getElementById('demo-sheet-form').show()">Content and two buttons</sav-button>
<sav-action-sheet id="demo-sheet-form" label="Filters" size="half" footer-layout="row" cancel-label="Reset" close-icon="chevron-down">
  <div class="stack">
    <sav-checkbox checked>In stock</sav-checkbox>
    <sav-checkbox>Free shipping</sav-checkbox>
    <sav-range label="Max price" value="60" show-value unit=" €"></sav-range>
  </div>
  <sav-button slot="footer" data-sav-close>Apply</sav-button>
</sav-action-sheet>` },
      { title: 'In the middle on wide screens', html: `<sav-button appearance="outline" variant="neutral" onclick="document.getElementById('demo-sheet-center').show()">In the middle</sav-button>
<sav-action-sheet id="demo-sheet-center" label="Photo" placement="center" style="--width: 24rem">
  <sav-menu-item value="download"><sav-icon slot="prefix" name="download"></sav-icon>Download</sav-menu-item>
  <sav-menu-item value="share"><sav-icon slot="prefix" name="share"></sav-icon>Share</sav-menu-item>
  <sav-menu-item value="delete" variant="danger"><sav-icon slot="prefix" name="trash"></sav-icon>Delete</sav-menu-item>
</sav-action-sheet>` },
    ],
    attrs: [['open', 'boolean', 'Shows the sheet.'], ['label', 'string', 'Title (also the name of the sheet and of its list for screen readers).'],
      ['close-style', 'icon · text', 'The button at the top right: an icon (default ×) or a word (default “Done”, in the language of the page).'], ['close-label', 'string', 'The word of the text button, or the name of the icon button for screen readers (default “Close”).'],
      ['close-icon', 'icon name', 'Another icon instead of the × (chevron-down, for example).'], ['no-close · no-header · no-handle', 'boolean', 'Hide the button at the top, the whole title row, or the handle.'],
      ['no-cancel · cancel-label', 'boolean · string', 'Without the Cancel button in the footer, or with another word on it.'], ['footer-layout', 'stack · row · row-always', 'Footer buttons one under the other at full width (default); row puts them side by side on screens wider than 640px and one under the other on phones; row-always keeps them side by side everywhere.'],
      ['size', 'auto · half · full', 'auto as tall as its content (default), half of the screen, or as tall as --max-height. Taller content scrolls inside, with the title and the footer staying in place.'],
      ['expandable', 'boolean', 'Dragging the handle up (or tapping it) unfolds it to --max-height; dragging down folds it again.'], ['no-drag', 'boolean', 'Dragging the handle or the title down does not close it.'],
      ['placement', 'bottom · center', 'On screens wider than 640px: at the bottom (default) or in the middle like a dialog. On phones it is always at the bottom.'],
      ['persistent', 'boolean', 'A click outside or dragging it down does not close it.'], ['stay-open', 'boolean', 'Stays open after an action is chosen.'],
      ['--width', 'CSS', 'Width on wide screens, default 36rem (100vw: the whole width).'], ['--max-height · --min-height · --half', 'CSS', 'Default 90dvh, 0 and 50dvh.'], ['--footer-background', 'CSS', 'Colour of the footer.'],
      ['value · disabled · variant="danger" · type="checkbox" · checked', '', 'On sav-menu-item.']],
    slots: [['(default)', 'sav-menu-item, sav-menu-label and sav-divider, or any content.'], ['label', 'Rich title'], ['header-actions', 'Buttons next to the close button'], ['footer', 'Buttons above Cancel']],
    events: [['sav-select', 'An action was chosen: detail.item, detail.value, detail.checked (checkbox items). Call event.preventDefault() to keep the sheet open.'], ['change', 'With checkbox items: detail.value is the list of checked values.'],
      ['sav-show · sav-after-show · sav-hide · sav-after-hide', ''], ['sav-request-close', 'Cancelable; detail.source = close-button · cancel · keyboard · overlay · drag · button']],
    methods: [['show() · hide()', ''], ['pick()', 'Opens it and resolves with the value of the chosen action, or null.'], ['Sav.actionSheet({ label, items })', 'Makes a sheet from a list (label, value, icon, variant, disabled; \'-\' is a divider, { heading } a small heading), opens it, resolves with the choice and removes it. Takes the attributes too: cancelLabel, noCancel, closeStyle, size…'], ['[data-sav-close]', 'Any element inside with this attribute closes it.']],
    parts: ['panel', 'handle', 'header', 'title', 'close-button', 'body', 'footer', 'cancel-button'],
  },
  {
    id: 'dropdown', name: 'Dropdown', tag: 'sav-dropdown · sav-menu-item', group: 'Overlays', icon: 'chevron-down',
    desc: 'A menu that opens from a trigger. Arrow keys, type-ahead, Esc; closes when clicking outside.',
    demos: [{ title: 'Basic', html: `<sav-dropdown id="demo-dd">
  <sav-button slot="trigger" caret appearance="outline" variant="neutral">Actions</sav-button>
  <sav-menu-label>File</sav-menu-label>
  <sav-menu-item value="edit"><sav-icon slot="prefix" name="edit"></sav-icon>Edit<kbd slot="suffix">E</kbd></sav-menu-item>
  <sav-menu-item value="copy"><sav-icon slot="prefix" name="copy"></sav-icon>Duplicate</sav-menu-item>
  <sav-menu-item value="share" disabled><sav-icon slot="prefix" name="link"></sav-icon>Share</sav-menu-item>
  <sav-divider></sav-divider>
  <sav-menu-item type="checkbox" checked value="pin">Pinned</sav-menu-item>
  <sav-menu-item value="delete" variant="danger"><sav-icon slot="prefix" name="trash"></sav-icon>Delete</sav-menu-item>
</sav-dropdown>
<sav-dropdown placement="bottom-end">
  <sav-button slot="trigger" square appearance="ghost" variant="neutral" label="More"><sav-icon name="more-horizontal"></sav-icon></sav-button>
  <sav-menu-item>Profile</sav-menu-item>
  <sav-menu-item>Sign out</sav-menu-item>
</sav-dropdown>
<script>document.getElementById('demo-dd').addEventListener('sav-select', e => Sav.toast('Selected: ' + e.detail.value, {variant: 'neutral', duration: 2000}))</script>` },
      { title: 'Several choices', html: `<sav-dropdown multiple id="demo-dd-multi" label="Columns">
  <sav-button slot="trigger" caret appearance="outline" variant="neutral" icon="filter">Columns</sav-button>
  <sav-menu-item value="name" checked>Name</sav-menu-item>
  <sav-menu-item value="email" checked>Email</sav-menu-item>
  <sav-menu-item value="phone">Phone</sav-menu-item>
  <sav-menu-item value="city">City</sav-menu-item>
</sav-dropdown>
<script>document.getElementById('demo-dd-multi').addEventListener('change', e => Sav.toast('Shown: ' + e.detail.value.join(', '), {variant: 'neutral', duration: 2000}))</script>` },
      { title: 'Sheet on phones', html: `<sav-dropdown sheet-on-mobile label="Share">
  <sav-button slot="trigger" icon="share" appearance="soft">Share</sav-button>
  <sav-menu-item><sav-icon slot="prefix" name="link"></sav-icon>Copy link</sav-menu-item>
  <sav-menu-item><sav-icon slot="prefix" name="mail"></sav-icon>Email</sav-menu-item>
  <sav-menu-item><sav-icon slot="prefix" name="message-circle"></sav-icon>Message</sav-menu-item>
</sav-dropdown>` }],
    attrs: [['placement', 'bottom-start · bottom-end · top-start · top-end · right-start …', ''], ['multiple', 'boolean', 'Every item is a checkbox and the menu stays open; read the choices from value.'], ['sheet-on-mobile', 'boolean', 'On phones the menu rises from the bottom.'], ['label', 'string', 'Title of the sheet on phones.'], ['stay-open', 'boolean', 'Keeps it open after a choice.'], ['disabled', 'boolean', ''], ['--min-width · --max-height', 'CSS', ''], ['value · disabled · variant="danger" · type="checkbox" · checked', '', 'On sav-menu-item.']],
    events: [['sav-select', 'detail.item, detail.value'], ['change', 'With multiple or checkbox items: detail.value is the list of checked values.'], ['sav-show · sav-hide', '']],
    methods: [['show() · hide()', ''], ['value', 'The checked values (array).']],
  },
  {
    builtFrom: ['dropdown', 'menu'],
    id: 'context-menu', name: 'Context menu', tag: 'sav-context-menu · sav-menu-item', group: 'Overlays', icon: 'mouse-right',
    desc: 'Your own menu for the right click on an area of the page, instead of the browser’s. It also opens with a long press on phones and tablets, and with the menu key or Shift F10 on the focused area. It opens at the pointer and turns to another corner near the edges of the window; items can hold submenus that fly out to the side. Same items as the dropdown; in text fields the browser’s menu stays, for copy and paste, and an element inside the area that answers the right click itself (preventDefault) keeps it. Opened with the pointer it leaves the focus where it was, so a text field keeps its caret.',
    notice: { variant: 'neutral', heading: 'Not the only way', text: 'Many people never right-click, and on touch screens a long press is hard to guess: put the same actions somewhere visible too (a button, a dropdown).' },
    demos: [{ title: 'Right click on an area', html: `<sav-context-menu id="demo-ctx" label="Photo">
  <sav-card slot="target" tabindex="0" style="flex: 1 1 100%; text-align: center; cursor: context-menu">
    <sav-icon name="mouse-right" style="font-size: 2rem"></sav-icon>
    <p>Right-click here, long-press on a phone, or focus it and press Shift F10.</p>
  </sav-card>
  <sav-menu-item value="open"><sav-icon slot="prefix" name="external-link"></sav-icon>Open</sav-menu-item>
  <sav-menu-item value="rename"><sav-icon slot="prefix" name="pencil"></sav-icon>Rename<sav-kbd slot="suffix" size="sm">F2</sav-kbd></sav-menu-item>
  <sav-menu-item value="duplicate"><sav-icon slot="prefix" name="copy"></sav-icon>Duplicate<sav-kbd slot="suffix" size="sm">mod+D</sav-kbd></sav-menu-item>
  <sav-menu-item><sav-icon slot="prefix" name="share"></sav-icon>Share
    <sav-menu slot="submenu">
      <sav-menu-item value="link"><sav-icon slot="prefix" name="link"></sav-icon>Copy link</sav-menu-item>
      <sav-menu-item value="email"><sav-icon slot="prefix" name="mail"></sav-icon>Email</sav-menu-item>
      <sav-menu-item value="message"><sav-icon slot="prefix" name="message-circle"></sav-icon>Message</sav-menu-item>
    </sav-menu>
  </sav-menu-item>
  <sav-divider></sav-divider>
  <sav-menu-item type="checkbox" checked value="favourite">Favourite</sav-menu-item>
  <sav-menu-item value="print" disabled><sav-icon slot="prefix" name="printer"></sav-icon>Print</sav-menu-item>
  <sav-divider></sav-divider>
  <sav-menu-item value="delete" variant="danger"><sav-icon slot="prefix" name="trash"></sav-icon>Delete<sav-kbd slot="suffix" size="sm">Del</sav-kbd></sav-menu-item>
</sav-context-menu>
<script>document.getElementById('demo-ctx').addEventListener('sav-select', e => Sav.toast('Chosen: ' + e.detail.value, {variant: 'neutral', duration: 2000}))</script>` },
      { title: 'One menu for many rows', html: `<sav-list id="demo-files" style="flex: 1 1 100%">
  <sav-list-item button description="48 KB · today"><sav-icon slot="prefix" name="file-text"></sav-icon>Notes.txt</sav-list-item>
  <sav-list-item button description="2.4 MB · yesterday"><sav-icon slot="prefix" name="file-spreadsheet"></sav-icon>Budget 2027.xlsx</sav-list-item>
  <sav-list-item button description="3.1 MB · last week"><sav-icon slot="prefix" name="image"></sav-icon>Holiday.jpg</sav-list-item>
</sav-list>
<sav-context-menu for="demo-files" id="demo-ctx-files" label="File">
  <sav-menu-item value="Open">Open</sav-menu-item>
  <sav-menu-item value="Download"><sav-icon slot="prefix" name="download"></sav-icon>Download</sav-menu-item>
  <sav-menu-item value="Starred"><sav-icon slot="prefix" name="star"></sav-icon>Add to starred</sav-menu-item>
  <sav-divider></sav-divider>
  <sav-menu-item value="Deleted" variant="danger"><sav-icon slot="prefix" name="trash"></sav-icon>Delete</sav-menu-item>
</sav-context-menu>
<script>
// between the rows the browser's own menu stays
document.getElementById('demo-ctx-files').addEventListener('sav-show', e => { if (!e.detail.target?.closest('sav-list-item')) e.preventDefault(); });
document.getElementById('demo-ctx-files').addEventListener('sav-select', e => Sav.toast(e.detail.value + ': ' + e.detail.target.closest('sav-list-item').textContent.trim(), {variant: 'neutral', duration: 2000}));
</script>` }],
    attrs: [['for', 'id', 'The element whose right click opens the menu. Without it, the elements inside with slot="target" are the area.'], ['label', 'string', 'Name of the menu for screen readers, and title of the sheet on phones.'],
      ['sheet-on-mobile', 'boolean', 'On phones the menu rises from the bottom.'], ['stay-open', 'boolean', 'Keeps it open after a choice.'], ['disabled', 'boolean', 'The browser’s own menu shows again.'], ['--min-width · --max-height', 'CSS', ''],
      ['value · disabled · variant="danger" · type="checkbox" · checked', '', 'On sav-menu-item.'], ['<sav-menu slot="submenu">', '', 'Inside a sav-menu-item: a submenu that flies out to the side (on the left when there is no room on the right).']],
    slots: [['target', 'The area that opens the menu, when for is not used.'], ['(default)', 'sav-menu-item, sav-menu-label and sav-divider.']],
    events: [['sav-show', 'Before it opens: detail.target is the element right-clicked, detail.x and detail.y the point. Call event.preventDefault() to let the browser’s menu show instead.'], ['sav-select', 'detail.item, detail.value, detail.checked (checkbox items), detail.target'], ['change', 'With checkbox items: detail.value is the list of checked values.'], ['sav-hide', '']],
    methods: [['show(x, y) · hide()', 'show() with a point of the window (clientX, clientY) leaves the focus where it is; without one it opens under the area and the focus moves into the menu, as from the keyboard.'], ['target', 'The area; set it to an element from script.'], ['contextTarget', 'The element right-clicked the last time.']],
  },
  {
    id: 'info-tip', name: 'Info tip', play: { tag: 'sav-info-tip', attrs: { content: 'A short explanation of this field.' } }, tag: 'sav-info-tip', group: 'Overlays', icon: 'circle-help',
    desc: 'A small button (an icon, or an icon with text) that opens a box of information when pressed: for help next to a field, a title or a setting. Unlike the tooltip it opens on click, so it works on phones and can hold links.',
    demos: [
      { title: 'Next to a label', html: `<sav-input placeholder="IT60 X054 2811 1010 0000 0123 456">
  <span slot="label">IBAN <sav-info-tip content="The 27 characters of your bank account, starting with IT. You find it in your bank's app."></sav-info-tip></span>
</sav-input>` },
      { title: 'Icon, text, heading', html: `<sav-info-tip heading="Why we ask" content="We use your phone only to send the delivery updates."></sav-info-tip>
<sav-info-tip icon="info" label="How it works" variant="primary" heading="Three steps">Choose a plan, add your team and <a href="#start">start</a>. You can change everything later.</sav-info-tip>
<sav-info-tip icon="shield" label="Privacy" placement="bottom" sheet-on-mobile>Nothing leaves your device until you press Save.</sav-info-tip>` },
    ],
    attrs: [['content', 'string', 'The text of the box (or put rich content inside).'], ['heading', 'string', 'Bold first line of the box.'], ['icon', 'icon name', 'Default help-circle.'], ['label', 'string', 'Text next to the icon.'],
      ['variant', 'neutral · primary', ''], ['size', 'sm · md', ''], ['placement', 'top · bottom · left · right', 'Default top; it flips when there is no room.'], ['sheet-on-mobile', 'boolean', 'On phones the box rises from the bottom.']],
    slots: [['(default)', 'Rich content of the box'], ['trigger', 'Your own trigger instead of the icon']],
    events: [['sav-show · sav-hide', '']],
    methods: [['show() · hide()', '']],
  },
  {
    id: 'tooltip', name: 'Tooltip', tag: 'sav-tooltip', group: 'Overlays', icon: 'message-circle',
    desc: 'A short hint on hover or focus. It flips when there is no room.',
    demos: [{ title: 'Placements', html: `<sav-tooltip content="On top"><sav-button appearance="outline" variant="neutral">Top</sav-button></sav-tooltip>
<sav-tooltip content="Below" placement="bottom"><sav-button appearance="outline" variant="neutral">Bottom</sav-button></sav-tooltip>
<sav-tooltip content="On the left" placement="left"><sav-button appearance="outline" variant="neutral">Left</sav-button></sav-tooltip>
<sav-tooltip placement="right"><sav-button appearance="outline" variant="neutral">Rich</sav-button><span slot="content"><b>Tip:</b> press <kbd>/</kbd> to search</span></sav-tooltip>
<sav-tooltip content="Opened by click" trigger="click"><sav-button appearance="soft">Click</sav-button></sav-tooltip>` }],
    attrs: [['content', 'string', 'Text of the tooltip.'], ['placement', 'top · bottom · left · right (+ -start / -end)', ''], ['trigger', 'hover focus · click', 'Space separated.'], ['delay', 'ms', 'Default 150.'], ['disabled', 'boolean', ''], ['--max-width', 'CSS', ''], ['auto-text', 'boolean', 'Black or white text, whichever is readable on the tooltip colour (--sav-color-tooltip-bg) (WCAG AA, at least 4.5:1), also with your own colours.']],
    slots: [['(default)', 'The trigger'], ['content', 'Rich content']],
  },
  {
    id: 'popover', name: 'Popover', play: { tag: 'sav-popover', attrs: { heading: 'Share this page' }, children: '<sav-button slot="trigger" appearance="outline" variant="neutral"><sav-icon slot="prefix" name="share"></sav-icon>Share</sav-button><p style="margin:0 0 .6rem">Anyone with the link can see it.</p><sav-input size="sm" value="https://example.com/p/42" readonly></sav-input>' }, tag: 'sav-popover', group: 'Overlays', icon: 'message-square',
    desc: 'A panel next to a button with anything inside — text, a small form, a list. A click on the trigger opens it, Esc or a click outside closes it, and the focus goes into the panel and back. Bigger than a tooltip or an info tip, lighter than a dialog; it leans in Tilt and turns to glass in Glass.',
    demos: [
      { title: 'A small form', html: `<sav-popover heading="Share this page">
  <sav-button slot="trigger" appearance="outline" variant="neutral"><sav-icon slot="prefix" name="share"></sav-icon>Share</sav-button>
  <p style="margin: 0 0 .6rem">Anyone with the link can see it.</p>
  <div style="display: flex; gap: .5rem; align-items: center">
    <sav-input size="sm" value="https://example.com/p/42" readonly style="flex: 1"></sav-input>
    <sav-copy-button value="https://example.com/p/42"></sav-copy-button>
  </div>
</sav-popover>` },
      { title: 'Placement, without a close button', html: `<sav-popover placement="top" no-close label="Profile">
  <sav-avatar slot="trigger" initials="AL" label="Ada Lovelace" button></sav-avatar>
  <b>Ada Lovelace</b><br><span style="color: var(--sav-color-text-muted)">Editor · online</span>
</sav-popover>
<sav-popover placement="right-start" heading="Filters" sheet-on-mobile>
  <sav-button slot="trigger" appearance="soft"><sav-icon slot="prefix" name="sliders-horizontal"></sav-icon>Filters</sav-button>
  <div style="display: grid; gap: .5rem"><sav-checkbox checked>In stock</sav-checkbox><sav-checkbox>On sale</sav-checkbox><sav-checkbox>Free delivery</sav-checkbox></div>
</sav-popover>` },
    ],
    attrs: [['heading', 'string', 'A title at the top of the panel (also its name for screen readers).'], ['placement', 'bottom-start · bottom · bottom-end · top-start · top · top-end · left · right · right-start', 'Where the panel opens (it flips when there is no room). Default bottom-start.'],
      ['no-close', 'boolean', 'No × button (Esc and a click outside still close it).'], ['sheet-on-mobile', 'boolean', 'On phones it slides up from the bottom.'], ['label', 'string', 'Name for screen readers when there is no heading.'], ['--width', 'CSS', 'Widest the panel gets (default 20rem).']],
    slots: [['trigger', 'The button (or any focusable element) that opens it.'], ['(default)', 'The content of the panel.']],
    events: [['sav-show · sav-hide', 'The panel opened or closed.']],
    methods: [['show() · hide()', ''], ['open', 'true while it is open.']],
    parts: ['body', 'heading', 'close-button'],
  },
  {
    builtFrom: ['kbd', 'icon'],
    id: 'command', name: 'Command palette', play: { tag: 'sav-command', attrs: { hotkey: 'mod+k' }, children: '<optgroup label="Pages"><option value="home" data-icon="home" data-description="Start page">Home</option><option value="settings" data-icon="settings" data-shortcut="mod+,">Settings</option></optgroup><optgroup label="Actions"><option value="new" data-icon="plus" data-shortcut="mod+n">New project</option><option value="theme" data-icon="moon">Switch to dark mode</option></optgroup>' }, tag: 'sav-command', group: 'Overlays', icon: 'command',
    desc: 'A search box over the page with everything you can do or open: type a few letters, move with the arrows, Enter. It opens with a shortcut from anywhere (⌘K on a Mac, Ctrl+K elsewhere), groups commands, shows their icons and shortcuts and highlights what matches.',
    demos: [
      { title: 'Press the shortcut, or the button', html: `<sav-button id="cmdOpen" appearance="outline" variant="neutral"><sav-icon slot="prefix" name="search"></sav-icon>Search commands <sav-kbd slot="suffix" size="sm">mod+K</sav-kbd></sav-button>
<sav-command id="cmdDemo" hotkey="mod+k" placeholder="What do you want to do?">
  <optgroup label="Pages">
    <option value="home" data-icon="home" data-description="Start page">Home</option>
    <option value="components" data-icon="blocks" data-description="Every component" data-keywords="list library">Components</option>
    <option value="settings" data-icon="settings" data-shortcut="mod+,">Settings</option>
  </optgroup>
  <optgroup label="Actions">
    <option value="new" data-icon="plus" data-shortcut="mod+n">New project</option>
    <option value="invite" data-icon="user-plus" data-description="Send an invitation by email">Invite people</option>
    <option value="dark" data-icon="moon">Switch to dark mode</option>
  </optgroup>
</sav-command>
<script>
  document.getElementById('cmdOpen').addEventListener('click', () => document.getElementById('cmdDemo').show());
  document.getElementById('cmdDemo').addEventListener('sav-select', (e) => Sav.toast('Chosen: ' + e.detail.value));
</script>` },
    ],
    attrs: [['hotkey', 'string', 'The shortcut that opens and closes it: mod+k (⌘K on a Mac, Ctrl+K elsewhere), ctrl+p, alt+space…'], ['placeholder', 'string', 'Text in the empty search box.'], ['empty-label', 'string', 'Text when nothing matches (default “Nothing found”).'], ['label', 'string', 'Name for screen readers (default “Commands”).']],
    slots: [['(default)', '<option> commands, in <optgroup> for groups: value, data-icon, data-description, data-shortcut, data-keywords, data-href.']],
    events: [['sav-select', 'A command was chosen: detail.value, detail.item (cancel it to keep the palette open).'], ['sav-show · sav-hide', 'Opened or closed.']],
    methods: [['show() · hide()', ''], ['commands', 'The commands as a list ({ label, value, icon, description, shortcut, keywords, group, href }); set it to fill the palette from code.']],
    parts: ['dialog', 'base', 'input', 'list', 'close-button'],
  },

  /* ------------------------------------------------------------ Navigation */
  {
    id: 'tabs', name: 'Tabs', tag: 'sav-tabs · sav-tab', group: 'Navigation', icon: 'folders',
    desc: 'Switch between panels. Each <code>sav-tab</code> is both the button label and its panel.',
    demos: [
      { title: 'Appearances', html: `<sav-tabs>
  <sav-tab label="Overview" icon="home">The overview panel.</sav-tab>
  <sav-tab label="Activity" icon="bell">Recent activity.</sav-tab>
  <sav-tab label="Settings" icon="settings">Settings panel.</sav-tab>
  <sav-tab label="Disabled" disabled></sav-tab>
</sav-tabs>
<sav-tabs appearance="pills">
  <sav-tab label="Monthly">Billed every month.</sav-tab>
  <sav-tab label="Yearly" active>Two months free.</sav-tab>
</sav-tabs>
<sav-tabs appearance="segmented">
  <sav-tab label="List">List view.</sav-tab>
  <sav-tab label="Board">Board view.</sav-tab>
  <sav-tab label="Calendar">Calendar view.</sav-tab>
</sav-tabs>` },
      { title: 'Vertical', html: `<sav-tabs orientation="vertical">
  <sav-tab label="Account">Account settings.</sav-tab>
  <sav-tab label="Security">Password and two-step login.</sav-tab>
  <sav-tab label="Billing">Invoices and payment methods.</sav-tab>
</sav-tabs>` },
      { title: 'Icons: start, after the text, end', html: `<div class="demo-grid">
  <sav-tabs orientation="vertical">
    <sav-tab label="Inbox" icon="mail">Icons at the start (the default).</sav-tab>
    <sav-tab label="Starred" icon="star">Icons at the start (the default).</sav-tab>
    <sav-tab label="Settings" icon="settings">Icons at the start (the default).</sav-tab>
  </sav-tabs>
  <sav-tabs orientation="vertical" icon-placement="after">
    <sav-tab label="Inbox" icon="mail">Icons right after the text.</sav-tab>
    <sav-tab label="Starred" icon="star">Icons right after the text.</sav-tab>
    <sav-tab label="Settings" icon="settings">Icons right after the text.</sav-tab>
  </sav-tabs>
  <sav-tabs orientation="vertical" icon-placement="end">
    <sav-tab label="Inbox" icon="mail">Icons at the end, with space in between.</sav-tab>
    <sav-tab label="Starred" icon="star">Icons at the end, with space in between.</sav-tab>
    <sav-tab label="Help centre" icon="external" icon-placement="after">One tab can choose its own placement.</sav-tab>
  </sav-tabs>
</div>` },
      { title: 'Vertical, collapsible', html: `<sav-tabs orientation="vertical" collapsible>
  <sav-tab label="Inbox" icon="mail">The handle on the border, next to the first tab, folds the tabs: only the icons stay, and each name shows in a tooltip.</sav-tab>
  <sav-tab label="Starred" icon="star">Starred messages.</sav-tab>
  <sav-tab label="Archive" icon="folder">Archived messages.</sav-tab>
  <sav-tab label="Settings">Without an icon, a collapsed tab shows its first letter.</sav-tab>
</sav-tabs>
<sav-tabs orientation="vertical" collapsible collapsed collapse-label="Hide" expand-label="Show">
  <sav-tab label="Overview" icon="home">This one starts collapsed, with its own button texts.</sav-tab>
  <sav-tab label="Activity" icon="bell">Recent activity.</sav-tab>
</sav-tabs>
<sav-tabs orientation="vertical" collapsible collapse-button="row">
  <sav-tab label="Projects" icon="folder">collapse-button="row": the button is a row at the bottom of the tabs.</sav-tab>
  <sav-tab label="Team" icon="users">The people of the team.</sav-tab>
  <sav-tab label="Reports" icon="chart-column">Monthly reports.</sav-tab>
</sav-tabs>` },
      { title: 'Vertical on the right', html: `<sav-tabs orientation="vertical" side="end" collapsible>
  <sav-tab label="Details" icon="info">side="end": the tabs on the right, the content on the left. The fold handle sits on the left border of the tabs and folds them towards the right.</sav-tab>
  <sav-tab label="Comments" icon="message-circle">Comments on this item.</sav-tab>
  <sav-tab label="History" icon="history">Who changed what, and when.</sav-tab>
</sav-tabs>
<sav-tabs orientation="vertical" side="end" collapsible collapse-button="row">
  <sav-tab label="Layers" icon="layers">With collapse-button="row" the button is a row at the bottom, as on the left.</sav-tab>
  <sav-tab label="Assets" icon="image">Pictures and files.</sav-tab>
</sav-tabs>` },
      { title: 'Vertical with sub tabs', html: `<sav-tabs orientation="vertical" active="profile" collapsible>
  <sav-tab label="Account" icon="user" name="account">Your account in short.</sav-tab>
  <sav-tab label="Profile" level="sub" name="profile">Name, picture and bio.</sav-tab>
  <sav-tab label="Security" level="sub" name="security">Password and two-step sign-in.</sav-tab>
  <sav-tab label="Notifications" icon="bell" name="notifications">What we tell you, and how.</sav-tab>
  <sav-tab label="Email" level="sub" name="email">Weekly summary, news.</sav-tab>
  <sav-tab label="Phone" level="sub" name="phone">Push and text messages.</sav-tab>
  <sav-tab label="Billing" icon="credit-card" name="billing">Plan and invoices.</sav-tab>
</sav-tabs>` },
    ],
    attrs: [['appearance', 'underline · pills · segmented', 'Default underline.'], ['orientation', 'horizontal · vertical', 'horizontal: a bar above the panels (the default); vertical: a column of tabs beside them.'], ['side', 'start · end', 'Vertical tabs: start puts the column on the left (the default), end on the right (the fold handle and the tooltips then sit on its left side).'], ['active', 'tab name', 'Tab to open first.'], ['label · name · icon · active · disabled', '', 'On sav-tab.'], ['collapsible', 'boolean', 'Vertical tabs: a button under the tabs folds them to icons only (collapsed) and opens them again (expanded).'], ['collapsed', 'boolean', 'Vertical tabs: only the icons show (or the first letter of a tab without icon); the names become tooltips. Set it to start collapsed; the button changes it.'], ['collapse-label · expand-label', 'string', 'Text of the fold button. Default "Collapse" and "Expand".'], ['collapse-button', 'edge · row', 'Where the fold button goes: edge (a small handle on the outer border of the rail — right with start, left with end — next to the first tab, the default) or row (a row with text at the bottom of the rail).'], ['icon-placement', 'start · after · end', 'Where the icon of a tab goes: start (before the text, the default), after (right after the text) or end (at the far end of the tab, with space in between; clearest in vertical tabs). On sav-tabs it applies to every tab; on one sav-tab it applies to that tab only.'], ['level', 'normal · sub', 'On sav-tab: sub sits under the tab before it, smaller and indented (two levels; clearest with vertical tabs).'], ['--sav-tab-sub-indent', 'CSS', 'How far sub tabs are indented (default .9rem).'], ['--sav-tab-padding', 'CSS', 'Panel padding.'], ['auto-text', 'boolean', 'The text of the selected tab is black or white, whichever is readable on its highlight (WCAG AA, at least 4.5:1), also with your own colours.']],
    events: [['sav-tab-show', 'detail.name, detail.index'], ['sav-collapse', 'Vertical tabs folded or opened: detail.collapsed.']],
    methods: [['show(nameOrIndex)', 'Opens a tab by its name or position.'], ['collapse() · expand()', 'Vertical tabs: only the icons, or icons and names again.']],
    parts: ['nav', 'tab', 'sub-tab', 'tab-icon', 'tab-label', 'indicator', 'panels', 'rail', 'collapse-button'],
  },
  {
    id: 'accordion', name: 'Accordion', tag: 'sav-accordion · sav-details', group: 'Navigation', icon: 'list-collapse',
    desc: 'Expandable sections with a smooth height animation. <code>exclusive</code> keeps only one open.',
    demos: [
      { title: 'Exclusive', html: `<sav-accordion exclusive>
  <sav-details summary="What is SavComponents?" open>A set of web components that work in any page, with or without a framework.</sav-details>
  <sav-details summary="Do I need a build step?">No: add one CSS file and one script.</sav-details>
  <sav-details summary="Can I change the colours?">Yes, every colour, radius and size is a CSS custom property.</sav-details>
</sav-accordion>` },
      { title: 'Plain', html: `<sav-accordion appearance="plain">
  <sav-details summary="Shipping">Free over 50 €.</sav-details>
  <sav-details summary="Returns">30 days to change your mind.</sav-details>
</sav-accordion>` },
    ],
    attrs: [['exclusive', 'boolean', 'On the accordion.'], ['appearance', 'boxed · plain', ''], ['summary · open · disabled', '', 'On sav-details.'], ['--gap', 'CSS', 'Space between items.']],
    slots: [['summary', 'Rich summary'], ['prefix', 'Icon before the summary']],
    events: [['sav-show · sav-hide', 'On sav-details.']],
  },
  {
    builtFrom: ['dropdown'],
    id: 'menu', name: 'Menu', tag: 'sav-menu · sav-menu-item', group: 'Navigation', icon: 'menu',
    desc: 'A menu that stays on the page, in several kinds: a list (a sidebar, a settings page), a bar across the top whose submenus drop down, and a rail of icons whose labels become tooltips and whose submenus fly out to the side — collapsible folds a list into a rail and back. Any item can hold a submenu; the current item is highlighted the way the style says. Same items as the dropdown, with arrow keys.',
    demos: [ { title: 'Sidebar list', html: `<sav-menu label="Account" appearance="card" selectable style="width: 15rem">
  <sav-menu-label>Account</sav-menu-label>
  <sav-menu-item value="profile" current><sav-icon slot="prefix" name="user"></sav-icon>Profile</sav-menu-item>
  <sav-menu-item value="security"><sav-icon slot="prefix" name="lock"></sav-icon>Security</sav-menu-item>
  <sav-menu-item value="billing"><sav-icon slot="prefix" name="credit-card"></sav-icon>Billing</sav-menu-item>
  <sav-divider></sav-divider>
  <sav-menu-item value="logout" variant="danger"><sav-icon slot="prefix" name="log-out"></sav-icon>Sign out</sav-menu-item>
</sav-menu>` },
      { title: 'Submenus that open in place', html: `<sav-menu label="Documents" appearance="card" selectable style="width: 16rem">
  <sav-menu-item value="home" current><sav-icon slot="prefix" name="home"></sav-icon>Home</sav-menu-item>
  <sav-menu-item open><sav-icon slot="prefix" name="folder"></sav-icon>Projects
    <sav-menu slot="submenu">
      <sav-menu-item value="website">Website</sav-menu-item>
      <sav-menu-item value="app">Phone app</sav-menu-item>
      <sav-menu-item value="brand">Brand book</sav-menu-item>
    </sav-menu>
  </sav-menu-item>
  <sav-menu-item><sav-icon slot="prefix" name="users"></sav-icon>Team
    <sav-menu slot="submenu">
      <sav-menu-item value="people">People</sav-menu-item>
      <sav-menu-item value="roles">Roles</sav-menu-item>
    </sav-menu>
  </sav-menu-item>
  <sav-menu-item value="settings"><sav-icon slot="prefix" name="settings"></sav-icon>Settings</sav-menu-item>
</sav-menu>` },
      { title: 'Bar with drop-down submenus', html: `<sav-menu orientation="horizontal" appearance="card" label="Main" selectable>
  <sav-menu-item value="home" current>Home</sav-menu-item>
  <sav-menu-item>Products
    <sav-menu slot="submenu">
      <sav-menu-item value="components"><sav-icon slot="prefix" name="blocks"></sav-icon>Components</sav-menu-item>
      <sav-menu-item value="themes"><sav-icon slot="prefix" name="palette"></sav-icon>Themes</sav-menu-item>
      <sav-menu-item>More
        <sav-menu slot="submenu">
          <sav-menu-item value="icons">Icons</sav-menu-item>
          <sav-menu-item value="charts">Charts</sav-menu-item>
        </sav-menu>
      </sav-menu-item>
    </sav-menu>
  </sav-menu-item>
  <sav-menu-item value="pricing">Pricing</sav-menu-item>
  <sav-menu-item value="docs">Docs</sav-menu-item>
</sav-menu>` },
      { title: 'Rail of icons, collapsible', html: `<sav-menu collapsible collapsed appearance="card" label="App" selectable>
  <sav-menu-item value="home" current><sav-icon slot="prefix" name="home"></sav-icon>Home</sav-menu-item>
  <sav-menu-item value="inbox"><sav-icon slot="prefix" name="inbox"></sav-icon>Inbox</sav-menu-item>
  <sav-menu-item><sav-icon slot="prefix" name="chart-column"></sav-icon>Reports
    <sav-menu slot="submenu">
      <sav-menu-item value="sales">Sales</sav-menu-item>
      <sav-menu-item value="traffic">Traffic</sav-menu-item>
    </sav-menu>
  </sav-menu-item>
  <sav-menu-item value="settings"><sav-icon slot="prefix" name="settings"></sav-icon>Settings</sav-menu-item>
</sav-menu>` } ],
    attrs: [['label', 'string', 'Name for screen readers.'], ['appearance', 'plain · card', ''], ['orientation', 'vertical · horizontal', 'horizontal: a bar; its submenus drop down.'],
      ['collapsed', 'boolean', 'A rail: icons only, the labels become tooltips, submenus fly out to the side.'], ['collapsible', 'boolean', 'Adds the button that folds the list into a rail and back.'],
      ['selectable', 'boolean', 'Marks the clicked item as current (also inside submenus).'], ['current · open · value · variant · type · disabled', '', 'sav-menu-item; open shows its submenu.'],
      ['<sav-menu slot="submenu">', 'child', 'Inside a sav-menu-item: its submenu (it can hold more).'], ['auto-text', 'boolean', 'The current item is black or white, whichever is readable on its highlight (WCAG AA, at least 4.5:1), also with your own colours. Set it on the outer sav-menu: it reaches the submenus too.']],
    events: [['sav-select', 'detail.value, detail.item'], ['sav-toggle', 'detail.item, detail.open (a submenu) · detail.collapsed (the rail)']],
  },
  {
    builtFrom: ['search', 'avatar', 'button'],
    id: 'header', name: 'Header', tag: 'sav-header', group: 'Navigation', icon: 'panel-top',
    play: { tag: 'sav-header', attrs: {}, children: '<a slot="logo" href="#header"><img src="docs/logo.svg" width="28" height="28" alt="">Acme</a><a href="#header" aria-current="page">Home</a><a href="#header">Products</a><a href="#header">Pricing</a><sav-search slot="search" placeholder="Search" size="sm"></sav-search><sav-avatar slot="actions" initials="AL" label="Ada Lovelace" style="--size: 2rem"></sav-avatar>' },
    desc: 'The top bar of a site or app: logo, links, search and actions (an avatar, buttons). When the header is too narrow for everything — its own width, so it works in any layout — the links fold behind a menu button and the search folds into a button that opens the field across the whole header, with an X to close it. The current link is highlighted like the breadcrumb: a tint, a leaning tile, an underline, an inked block or glass, by style.',
    demos: [
      { title: 'Logo, links, search and avatar', html: `<sav-header>
  <a slot="logo" href="#header"><img src="docs/logo.svg" width="28" height="28" alt="">Acme</a>
  <a href="#header" aria-current="page">Home</a>
  <a href="#header">Products</a>
  <a href="#header">Pricing</a>
  <a href="#header">About</a>
  <sav-search slot="search" placeholder="Search" size="sm"></sav-search>
  <sav-avatar slot="actions" initials="AL" label="Ada Lovelace" style="--size: 2rem"></sav-avatar>
</sav-header>` },
      { title: 'Links in the centre, floating, with buttons', html: `<sav-header align="center" appearance="floating">
  <a slot="logo" href="#header"><img src="docs/logo.svg" width="28" height="28" alt="">Acme</a>
  <a href="#header" aria-current="page">Home</a>
  <a href="#header">Products</a>
  <a href="#header">Pricing</a>
  <a href="#header">About</a>
  <sav-button slot="actions" size="sm" appearance="ghost" variant="neutral">Sign in</sav-button>
  <sav-button slot="actions" size="sm">Get started</sav-button>
</sav-header>` },
      { title: 'Narrow: the links and the search fold into buttons', html: `<div style="width: 100%; max-width: 24rem">
<sav-header>
  <a slot="logo" href="#header"><img src="docs/logo.svg" width="28" height="28" alt="">Acme</a>
  <a href="#header" aria-current="page">Home</a>
  <a href="#header">Products</a>
  <a href="#header">Pricing</a>
  <a href="#header">About</a>
  <sav-search slot="search" placeholder="Search" size="sm"></sav-search>
  <sav-avatar slot="actions" initials="AL" label="Ada Lovelace" style="--size: 2rem"></sav-avatar>
</sav-header>
</div>` },
      { title: 'Search always a button, menu button on the right, transparent', html: `<sav-header search-collapse="always" menu-button="end" appearance="transparent">
  <a slot="logo" href="#header"><img src="docs/logo.svg" width="28" height="28" alt="">Acme</a>
  <a href="#header" aria-current="page">Home</a>
  <a href="#header">Products</a>
  <a href="#header">Pricing</a>
  <a href="#header">About</a>
  <sav-search slot="search" placeholder="Search the docs" size="sm"></sav-search>
  <sav-button slot="actions" size="sm" appearance="soft"><sav-icon slot="prefix" name="brush"></sav-icon>Customise</sav-button>
</sav-header>` },
    ],
    attrs: [['align', 'start · center · end', 'Where the links sit in the free room between logo and actions.'], ['appearance', 'bar · transparent · floating · plain', 'bar: a surface with a line under it (default); transparent: blurred; floating: a panel with a shadow (leans in Tilt); plain: no background.'],
      ['sticky', 'boolean', 'Stays at the top while the page scrolls.'], ['breakpoint', 'number', 'Below this width (px, of the header itself) the links fold behind a menu button. Without it they fold when everything no longer fits on one line.'],
      ['search-collapse', 'auto · always · never', 'When the search becomes a button that opens the field across the header: when narrow (default), always, or never.'], ['menu-button', 'start · end', 'Side of the menu button when narrow.'],
      ['label', 'string', 'Name of the navigation (default “Main”).'], ['slot="logo" · slot="search" · slot="actions"', '', 'The links go in the default slot; mark the current one with aria-current="page".'],
      ['--height · --padding · --search-width · --sav-header-bg', 'CSS', 'Size, side padding, width of the open search, background.'], ['toggleMenu() · toggleSearch()', 'method', 'Open or close the folded menu or search (pass true or false).'], ['auto-text', 'boolean', 'The link of the current page (aria-current="page") is black or white, whichever is readable on its highlight (WCAG AA, at least 4.5:1), also with your own colours.']],
    events: [['sav-toggle', 'detail.part (menu · search), detail.open']],
  },
  {
    builtFrom: ['badge', 'icon'],
    id: 'bottom-nav', name: 'Bottom navigation', tag: 'sav-bottom-nav · sav-bottom-nav-item', group: 'Navigation', icon: 'smartphone',
    desc: 'The bar at the bottom of a phone app: 3–5 destinations with icon and label, a badge, the current one marked. With fixed it sticks to the bottom; with mobile-only it hides on wide screens.',
    demos: [ { title: 'Four destinations', html: `<sav-bottom-nav label="Main" style="width: 100%; max-width: 24rem">
  <sav-bottom-nav-item icon="home" label="Home" current></sav-bottom-nav-item>
  <sav-bottom-nav-item icon="search" label="Search"></sav-bottom-nav-item>
  <sav-bottom-nav-item icon="bell" label="Alerts" badge="3"></sav-bottom-nav-item>
  <sav-bottom-nav-item icon="user" label="Profile"></sav-bottom-nav-item>
</sav-bottom-nav>` } ],
    attrs: [['fixed', 'boolean', 'Sticks to the bottom of the window.'], ['mobile-only', 'boolean', 'With fixed: hidden above 760px.'], ['label', 'string', 'Name of the navigation.'], ['icon · label · href · badge · current · value', '', 'sav-bottom-nav-item.']],
    events: [['sav-select', 'detail.value, detail.item']],
  },
  {
    id: 'breadcrumb', name: 'Breadcrumb', tag: 'sav-breadcrumb', group: 'Navigation', icon: 'chevrons-right',
    desc: 'Shows where the page sits in the site. The current page (the last item) is highlighted the way the style says: a tint in Soft, a leaning tile in Tilt, an underline in Sharp, an inked block in Brutal, glass in Glass. Long paths can fold the middle behind “…”.',
    demos: [{ title: 'Basic', html: `<sav-breadcrumb>
  <sav-breadcrumb-item href="#breadcrumb"><sav-icon slot="prefix" name="home"></sav-icon>Home</sav-breadcrumb-item>
  <sav-breadcrumb-item href="#breadcrumb">Projects</sav-breadcrumb-item>
  <sav-breadcrumb-item>SavComponents</sav-breadcrumb-item>
</sav-breadcrumb>
<sav-breadcrumb separator="/">
  <sav-breadcrumb-item href="#breadcrumb">Docs</sav-breadcrumb-item>
  <sav-breadcrumb-item href="#breadcrumb">Components</sav-breadcrumb-item>
  <sav-breadcrumb-item>Breadcrumb</sav-breadcrumb-item>
</sav-breadcrumb>` },
      { title: 'In a bar, long path folded', html: `<sav-breadcrumb appearance="contained" max-items="3">
  <sav-breadcrumb-item href="#breadcrumb"><sav-icon slot="prefix" name="home"></sav-icon>Home</sav-breadcrumb-item>
  <sav-breadcrumb-item href="#breadcrumb">Shop</sav-breadcrumb-item>
  <sav-breadcrumb-item href="#breadcrumb">Outdoor</sav-breadcrumb-item>
  <sav-breadcrumb-item href="#breadcrumb">Backpacks</sav-breadcrumb-item>
  <sav-breadcrumb-item>Hiking backpack 30 L</sav-breadcrumb-item>
</sav-breadcrumb>` }],
    attrs: [['separator', 'string', 'On the breadcrumb; default a chevron.'], ['appearance', 'plain · contained', 'contained puts the path in a bar.'], ['max-items', 'number', 'Longer paths show the first item, “…” (click to open) and the last ones.'],
      ['label', 'string', 'Accessible name (default “Breadcrumb”).'], ['href', 'url', 'On each item.'], ['--sav-breadcrumb-current-bg · -fg · -shadow', 'CSS', 'How the current page is highlighted.'], ['auto-text', 'boolean', 'The current page is black or white, whichever is readable on its highlight (WCAG AA, at least 4.5:1), also with your own colours.']],
  },
  {
    id: 'pagination', name: 'Pagination', play: { tag: 'sav-pagination', attrs: { pages: '20', page: '6' } }, tag: 'sav-pagination', group: 'Navigation', icon: 'ellipsis',
    desc: 'Page numbers for long lists and tables: always the first and the last, the pages around the current one and “…” in between, previous and next. The current page is highlighted like the breadcrumb, by style. Links (href="?page={page}") or buttons that fire sav-page.',
    demos: [
      { title: 'Numbers, and simple', html: `<sav-pagination pages="20" page="6"></sav-pagination>
<sav-pagination pages="20" page="6" siblings="2" labels size="sm"></sav-pagination>
<sav-pagination appearance="simple" pages="12" page="3"></sav-pagination>` },
      { title: 'From the number of items, centred', html: `<sav-pagination total="248" page-size="25" page="1" align="center" style="width: 100%"></sav-pagination>` },
      { title: 'Links', html: `<sav-pagination pages="9" page="4" href="#pagination?page={page}"></sav-pagination>` },
    ],
    attrs: [['page', 'number', 'The current page, from 1.'], ['pages', 'number', 'How many pages; or give total and page-size.'], ['total · page-size', 'number', 'Number of items and items per page (default 10).'],
      ['siblings', 'number', 'Pages shown on each side of the current one (default 1).'], ['href', 'string', 'Turns pages into links; {page} is replaced with the number.'], ['appearance', 'numbers · simple', 'simple: only ‹ “3 of 12” ›.'],
      ['labels', 'boolean', 'Writes Previous and Next next to the arrows.'], ['align', 'start · center · end', ''], ['size', 'sm · md · lg', ''], ['label', 'string', 'Name of the navigation (default “Pages”).'], ['auto-text', 'boolean', 'The number of the current page is black or white, whichever is readable on its highlight (WCAG AA, at least 4.5:1), also with your own colours.']],
    events: [['sav-page', 'A page was chosen: detail.page, detail.previous. Cancel it to stay.'], ['change', 'The page changed (buttons): detail.page.']],
    parts: ['base', 'page', 'previous', 'next', 'summary'],
  },
  {
    id: 'steps', name: 'Steps', play: { tag: 'sav-steps', attrs: { current: '2' }, children: '<sav-step label="Account" description="Email and password"></sav-step><sav-step label="Profile" description="Name and photo"></sav-step><sav-step label="Plan"></sav-step><sav-step label="Done"></sav-step>' }, tag: 'sav-steps · sav-step', group: 'Navigation', icon: 'list-ordered',
    desc: 'The steps of a task — sign-up, checkout, a set-up: the done ones with a tick and a coloured line, the current one marked, the next ones waiting. Across or down; with clickable people go back to a step already done. The markers take the shape and lean of the style.',
    demos: [
      { title: 'Across', html: `<sav-steps current="2" style="width: 100%">
  <sav-step label="Account" description="Email and password"></sav-step>
  <sav-step label="Profile" description="Name and photo"></sav-step>
  <sav-step label="Plan" description="Free or Pro"></sav-step>
  <sav-step label="Done"></sav-step>
</sav-steps>` },
      { title: 'Down, clickable, with icons and an error', html: `<sav-steps orientation="vertical" current="3" clickable id="stepsDemo">
  <sav-step label="Cart" icon="shopping-cart" description="3 items"></sav-step>
  <sav-step label="Delivery" icon="truck" description="Click to go back here"></sav-step>
  <sav-step label="Payment" icon="credit-card" status="error" description="The card was declined"></sav-step>
  <sav-step label="Confirmation" icon="check"></sav-step>
</sav-steps>
<div class="row"><sav-button size="sm" appearance="outline" variant="neutral" onclick="document.getElementById('stepsDemo').previous()">Back</sav-button><sav-button size="sm" onclick="document.getElementById('stepsDemo').next()">Next</sav-button></div>` },
    ],
    attrs: [['current', 'number', 'The step you are on, from 1 (steps before it are done; one past the last means all done).'], ['orientation', 'horizontal · vertical', ''], ['clickable', 'boolean', 'Steps already done can be clicked to go back.'],
      ['label', 'string', 'Name of the list (default “Steps”).'], ['label · description · icon · status', '', 'On sav-step; status="error" marks a step that went wrong.'], ['auto-text', 'boolean', 'The number or tick of the done, current and failed steps is black or white, whichever is readable on its marker (WCAG AA, at least 4.5:1), also with your own colours.']],
    events: [['sav-step', 'A done step was clicked: detail.index (cancel it to stay).'], ['change', 'The current step changed: detail.current.']],
    methods: [['next() · previous()', 'One step forward or back.'], ['current', 'The current step (number).']],
    parts: ['base', 'marker', 'label', 'description', 'line'],
  },
  {
    id: 'level-path', name: 'Level path', tag: 'sav-level-path · sav-level', group: 'Navigation', icon: 'route',
    play: { tag: 'sav-level-path', attrs: { current: '3', label: 'Web basics' }, children: '<sav-level label="Tags" icon="code" stars="3"></sav-level><sav-level label="Links" icon="link" stars="2"></sav-level><sav-level label="Images" icon="image"></sav-level><sav-level label="Lists" icon="list"></sav-level><sav-level label="Final test" icon="trophy" milestone variant="warning"></sav-level>' },
    desc: 'The map of a course, as in learning apps and games: levels on a winding line. The ones done are coloured, with a tick or their icon and their stars; the current one breathes and says what to do (<i>Start</i>); the next ones are locked. The nodes take the shape of the style: round, square, a leaning tile in Tilt. A heading, a divider or a card inside starts a new stretch, across the whole width.',
    demos: [
      { title: 'A course', html: `<sav-level-path current="4" label="HTML basics" style="max-width: 26rem; margin: auto">
  <sav-level label="Tags" icon="code" stars="3"></sav-level>
  <sav-level label="Text" icon="type" stars="3"></sav-level>
  <sav-level label="Links" icon="link" stars="2"></sav-level>
  <sav-level label="Images" icon="image"></sav-level>
  <sav-level label="Lists" icon="list"></sav-level>
  <sav-level label="Tables" icon="table"></sav-level>
  <sav-level label="Final test" icon="trophy" milestone variant="warning"></sav-level>
</sav-level-path>` },
      { title: 'Units, and what a click does', html: `<sav-level-path id="lp-units" current="3" current-label="Continue" label="Spanish for travellers (example)" style="max-width: 26rem; margin: auto">
  <sav-heading level="3" size="5" eyebrow="Unit 1" marker>At the airport</sav-heading>
  <sav-level label="Greetings" icon="hand" stars="3"></sav-level>
  <sav-level label="Check-in" icon="plane" stars="1"></sav-level>
  <sav-level label="Directions" icon="map-pin"></sav-level>
  <sav-divider>Unit 2</sav-divider>
  <sav-level label="At the hotel" icon="hotel"></sav-level>
  <sav-level label="Ordering food" icon="utensils"></sav-level>
  <sav-level label="Review" icon="dumbbell" variant="success" milestone></sav-level>
</sav-level-path>
<script>
  const lp = document.getElementById('lp-units');
  lp.addEventListener('sav-select', (e) => Sav.toast('Open “' + e.detail.level.getAttribute('label') + '” (example)'));
  lp.addEventListener('sav-locked', () => Sav.toast('Finish the level before it first (example)', { variant: 'warning' }));
</script>` },
      { title: 'All open, a gentler wave', html: `<sav-level-path open wave="sm" current="2" label="Practice" style="max-width: 22rem; margin: auto">
  <sav-level label="Warm-up" icon="flame" stars="2" variant="danger"></sav-level>
  <sav-level label="Speed" icon="zap" variant="warning"></sav-level>
  <sav-level label="Memory" icon="brain" variant="success"></sav-level>
  <sav-level label="Bonus" icon="gift" variant="neutral" status="locked"></sav-level>
</sav-level-path>` },
    ],
    attrs: [
      ['current', 'number', 'The level the learner is on, from 1: the ones before it are done, the ones after it locked. One past the last: all done.'],
      ['open', 'boolean', 'The levels after the current one are open (outlined) instead of locked.'],
      ['wave', 'none · sm · md · lg · px', 'How far the line winds left and right (default md; it never leaves the width of the path).'],
      ['current-label', 'string', 'The bubble over the current level (default “Start”; empty: no bubble).'],
      ['no-line', 'boolean', 'No line between the levels.'],
      ['label', 'string', 'Name of the path for screen readers (default “Levels”).'],
      ['label · icon · stars · milestone · status · variant · href · target · value', '', 'On sav-level: its name; its icon (otherwise a tick when done, the number when not); stars from 0 to 3 (shown when the attribute is there); milestone makes it bigger; status (done · current · locked · open) overrides what current says; variant its colour; href makes it a link; value goes in the events.'],
      ['--sav-level-gap · --sav-level-label-bg · --size', 'CSS', 'Space between the levels (default 1.7rem); the colour behind the names (default the page, so the line passes behind them); on sav-level, the size of the node.'],
    ],
    events: [['sav-select', 'A level that is not locked was chosen: detail.index (from 1), detail.value, detail.level.'], ['sav-locked', 'A locked level was touched, to say why (finish the one before): detail.index, detail.level.']],
    methods: [['current', 'The current level (number).']],
    parts: ['base', 'line', 'node', 'label', 'stars', 'bubble'],
  },
  {
    id: 'tree', name: 'Tree', play: { tag: 'sav-tree', attrs: { label: 'Files' }, children: '<sav-tree-item label="src" icon="folder" icon-open="folder-open" expanded><sav-tree-item label="index.html" icon="file-code"></sav-tree-item><sav-tree-item label="styles.css" icon="file-code" selected></sav-tree-item></sav-tree-item><sav-tree-item label="README.md" icon="file-text"></sav-tree-item>' }, tag: 'sav-tree · sav-tree-item', group: 'Navigation', icon: 'list-tree',
    desc: 'Items inside items that open and close — folders and files, sections and pages. The arrow keys move, → opens or goes in, ← closes or goes to the parent, Enter chooses. The chosen item is highlighted like the current page of the breadcrumb.',
    demos: [
      { title: 'Folders and files', html: `<sav-tree label="Project files" style="width: 18rem">
  <sav-tree-item label="src" icon="folder" icon-open="folder-open" expanded>
    <sav-tree-item label="components" icon="folder" icon-open="folder-open">
      <sav-tree-item label="button.js" icon="file-code"></sav-tree-item>
      <sav-tree-item label="card.js" icon="file-code"></sav-tree-item>
    </sav-tree-item>
    <sav-tree-item label="index.html" icon="file-code" selected></sav-tree-item>
    <sav-tree-item label="styles.css" icon="file-code"></sav-tree-item>
  </sav-tree-item>
  <sav-tree-item label="images" icon="folder" icon-open="folder-open">
    <sav-tree-item label="logo.svg" icon="image"></sav-tree-item>
  </sav-tree-item>
  <sav-tree-item label="README.md" icon="file-text"></sav-tree-item>
  <sav-tree-item label="secret.env" icon="lock" disabled></sav-tree-item>
</sav-tree>` },
      { title: 'Sections you can choose too (selectable)', html: `<sav-tree selectable label="Settings" style="width: 16rem">
  <sav-tree-item label="Account" expanded><sav-tree-item label="Profile"></sav-tree-item><sav-tree-item label="Security"></sav-tree-item></sav-tree-item>
  <sav-tree-item label="Notifications"><sav-tree-item label="Email"></sav-tree-item><sav-tree-item label="Phone"></sav-tree-item></sav-tree-item>
</sav-tree>` },
    ],
    attrs: [['label', 'string', 'Name of the tree for screen readers.'], ['selectable', 'boolean', 'Items with children can be chosen too (otherwise a click opens or closes them).'],
      ['label · value · icon · icon-open · expanded · selected · disabled', '', 'On sav-tree-item; icon-open is the icon while it is open (an open folder).'], ['auto-text', 'boolean', 'The selected item is black or white, whichever is readable on its highlight (WCAG AA, at least 4.5:1), also with your own colours.']],
    events: [['sav-select', 'An item was chosen: detail.value, detail.item.'], ['sav-toggle', 'An item opened or closed: detail.item, detail.expanded.']],
    parts: ['base', 'item', 'toggle', 'icon', 'label', 'children'],
  },
  {
    builtFrom: ['spinner', 'button'],
    id: 'infinite-scroll', name: 'Infinite scroll', play: { tag: 'sav-infinite-scroll', attrs: { mode: 'button' }, children: '<p>Item 1</p><p>Item 2</p><p>Item 3</p>' }, tag: 'sav-infinite-scroll', group: 'Navigation', icon: 'arrow-down-to-line',
    desc: 'Loads more as you reach the end of a list. When the end comes near it fires sav-load; you add the items and call done() — or done(false) when there is nothing more, or fail() on an error. Meanwhile a spinner (the style’s own), at the end a line, on an error “Try again”. It watches the page, or itself when it scrolls; mode="button" waits for a “Load more” button instead.',
    demos: [
      { title: 'In a box that scrolls', html: `<sav-infinite-scroll id="feedDemo" end-label="You have seen every post" style="display: block; width: 100%; max-height: 18rem; overflow: auto; padding: .25rem">
  <sav-card>Post 1</sav-card><sav-card>Post 2</sav-card><sav-card>Post 3</sav-card>
</sav-infinite-scroll>
<script>
  {
    const feed = document.getElementById('feedDemo');
    // a pretend server: 3 more posts each time, 4 pages in all
    feed.addEventListener('sav-load', (e) => {
      setTimeout(() => {
        const start = feed.children.length;
        for (let i = 1; i <= 3; i++) feed.insertAdjacentHTML('beforeend', '<sav-card>Post ' + (start + i) + '</sav-card>');
        feed.done(e.detail.page < 4);
      }, 700);
    });
  }
</script>` },
      { title: 'With a button, and an error', html: `<sav-infinite-scroll id="moreDemo" mode="button" more-label="Show more products" style="width: 100%">
  <sav-list><sav-list-item>Backpack</sav-list-item><sav-list-item>Tent</sav-list-item></sav-list>
</sav-infinite-scroll>
<script>
  {
    const more = document.getElementById('moreDemo');
    let tries = 0;
    more.addEventListener('sav-load', () => {
      setTimeout(() => {
        // the second time it fails, to show "Try again"
        if (++tries === 2) { more.fail(); return; }
        more.querySelector('sav-list').insertAdjacentHTML('beforeend', '<sav-list-item>Sleeping bag</sav-list-item><sav-list-item>Stove</sav-list-item>');
        more.done(tries < 4);
      }, 600);
    });
  }
</script>` },
    ],
    attrs: [['mode', 'auto · button', 'auto loads by itself near the end (default); button waits for “Load more”.'], ['threshold', 'number', 'How many pixels before the end it starts loading (default 300).'],
      ['loading-label · more-label · end-label · error-label', 'string', 'The texts: “Loading…”, “Load more”, “That’s all”, “It did not load.”'], ['retry-label', 'string', 'The text of the Try again button (default "Try again").']],
    events: [['sav-load', 'Time to load more: detail.page (1, 2, 3…). Add the items, then call done() or fail().']],
    methods: [['done(more = true)', 'The items are in; false when there is nothing more.'], ['fail()', 'Loading failed: shows “Try again”.'], ['reset()', 'Starts again from page 0 (a new search).'], ['load()', 'Loads the next page now.'], ['page · loading', 'Pages loaded so far; true while loading.']],
    parts: ['base', 'footer', 'loading', 'more-button', 'error', 'end'],
  },
  /* ------------------------------------------------------------ Charts */
  {
    id: 'chart-bar', name: 'Bar chart', tag: 'sav-chart-bar', group: 'Charts', icon: 'chart-column',
    desc: 'Bars, vertical or horizontal, one series or several side by side, or stacked; spacing, values on the bars, a hover tooltip and a hidden table for screen readers. Colours come from --sav-chart-1…8.',
    demos: [
      { title: 'Grouped, vertical', html: `<sav-chart-bar label="Sales per quarter" show-values style="width: 100%" data='{"labels":["Q1","Q2","Q3","Q4"],"series":[{"name":"2025","values":[12,19,15,24]},{"name":"2026","values":[16,22,21,30]}]}'></sav-chart-bar>` },
      { title: 'Stacked, horizontal', html: `<sav-chart-bar label="Time per task" orientation="horizontal" stacked gap="0.45" show-values style="width: 100%" data='{"labels":["Design","Build","Test"],"series":[{"name":"Ada","values":[6,10,3]},{"name":"Alan","values":[2,12,5]},{"name":"Grace","values":[4,6,8]}]}'></sav-chart-bar>` },
    ],
    attrs: [['data', 'JSON', '{ labels: [...], series: [{ name, values: [...], color? }] } — or set the .data property.'], ['orientation', 'vertical · horizontal', ''], ['stacked', 'boolean', 'Series on top of each other.'],
      ['gap', '0 – 0.9', 'Space between groups (default 0.3).'], ['show-values', 'boolean', 'Numbers on the bars.'], ['max', 'number', 'Top of the scale (default: rounded up from the data).'], ['label', 'string', 'What the chart shows (screen readers).'], ['height', 'px', ''], ['no-legend', 'boolean', '']],
  },
  {
    id: 'chart-pie', name: 'Pie chart', tag: 'sav-chart-pie', group: 'Charts', icon: 'chart-pie',
    desc: 'A pie or a donut: gaps between slices, percentages, a text in the centre of the donut.',
    demos: [
      { title: 'Pie and donut', html: `<sav-chart-pie label="Traffic sources" show-values style="width: 16rem" data='{"labels":["Search","Social","Direct","Email"],"values":[48,22,18,12]}'></sav-chart-pie>
<sav-chart-pie label="Storage" type="donut" center="72%" gap="2" style="width: 16rem" data='{"labels":["Photos","Videos","Free"],"values":[40,32,28]}'></sav-chart-pie>` },
    ],
    attrs: [['data', 'JSON', '{ labels: [...], values: [...] }'], ['type', 'pie · donut', ''], ['thickness', 'px', 'Width of the donut ring.'], ['gap', 'degrees', 'Space between slices, as the angle it takes at the edge (default 1.2; 0 for none). The space is equally wide all the way to the centre.'], ['show-values', 'boolean', 'Percentages on the slices.'], ['center', 'string', 'Text in the middle of the donut.'], ['height', 'px', 'Size (default 260).'], ['label', 'string', 'The name of the chart (screen readers, and the table under it).']],
  },
  {
    id: 'chart-radar', name: 'Radar chart', tag: 'sav-chart-radar', group: 'Charts', icon: 'radar',
    desc: 'A spider web: one axis per label, one shape per series — to compare profiles on several qualities at once.',
    demos: [
      { title: 'Two profiles', html: `<sav-chart-radar label="Skills" max="10" style="width: 22rem" data='{"labels":["Speed","Design","Code","Tests","Docs","Support"],"series":[{"name":"Team A","values":[8,6,9,5,7,6]},{"name":"Team B","values":[5,9,6,8,6,9]}]}'></sav-chart-radar>` },
    ],
    attrs: [['data', 'JSON', '{ labels: [axes], series: [{ name, values }] }'], ['max', 'number', ''], ['levels', 'number', 'Rings of the web (default 4).'], ['no-fill', 'boolean', 'Lines only.'], ['height', 'px', 'Size (default 320).'], ['label', 'string', 'The name of the chart (screen readers, and the table under it).']],
  },
  {
    id: 'chart-line', name: 'Area and line chart', tag: 'sav-chart-line', group: 'Charts', icon: 'chart-area',
    desc: 'Values over time as a filled area or a line only: smooth curves, points, stacked areas.',
    demos: [
      { title: 'Area, smooth', html: `<sav-chart-line label="Visitors" smooth style="width: 100%" data='{"labels":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"series":[{"name":"This week","values":[120,180,150,210,260,190,240]},{"name":"Last week","values":[100,140,160,150,200,170,180]}]}'></sav-chart-line>` },
      { title: 'Lines with points', html: `<sav-chart-line label="Temperature" type="line" points style="width: 100%" data='{"labels":["Jan","Feb","Mar","Apr","May","Jun"],"series":[{"name":"Rome","values":[8,9,12,15,19,24]},{"name":"Oslo","values":[-4,-3,1,5,11,15]}]}'></sav-chart-line>` },
    ],
    attrs: [['data', 'JSON', '{ labels: [...], series: [{ name, values }] }'], ['type', 'area · line', 'Default area.'], ['smooth', 'boolean', 'Curves instead of straight segments.'], ['points', 'boolean', 'A dot on every value.'], ['stacked', 'boolean', 'Areas on top of each other.'], ['max · height', '', ''], ['label', 'string', 'The name of the chart (screen readers, and the table under it).'], ['min', 'number', 'The lowest value of the axis (default 0).']],
  },
  {
    id: 'chart-activity', name: 'Activity chart', tag: 'sav-chart-activity', group: 'Charts', icon: 'calendar-days',
    desc: 'A calendar heatmap: one column per week, a square per day, darker when the value (1–100) is higher. Good for streaks, contributions, workouts.',
    demos: [
      { title: 'The last twelve months', html: `<sav-chart-activity id="act-demo" label="Workouts" style="width: 100%"></sav-chart-activity>
<script>
  // data: { 'YYYY-MM-DD': value 0–100 } (or [{ date, value }]); here random values for the example
  const days = {};
  for (let i = 0; i < 365; i++) { const d = new Date(); d.setDate(d.getDate() - i); if (Math.random() > 0.45) days[d.toISOString().slice(0, 10)] = Math.round(Math.random() * 100); }
  document.getElementById('act-demo').data = days;
</script>` },
    ],
    attrs: [['data', 'JSON', "{ '2026-11-16': 40, … } or [{ date, value }] — values 0–100."], ['start · end', 'YYYY-MM-DD', 'Period (default: the last 12 months).'], ['levels', 'number', 'Colour steps (default 5).'], ['week-start', '0 · 1', 'Sunday or Monday (default 1).'], ['locale', 'string', 'Month and day names.'], ['label', 'string', 'The name of the chart (screen readers, and the table under it).']],
  },
  {
    id: 'chart-map', name: 'Map chart', tag: 'sav-chart-map', group: 'Charts', icon: 'map',
    desc: 'The world coloured by value (a choropleth), or with some countries highlighted; it can zoom on one or more countries. Countries are named in the page language; a click tells which one.',
    demos: [
      { title: 'By continent', html: `<sav-chart-map region="europe" label="Visitors in Europe" data='{"IT":420,"FR":310,"DE":280,"ES":190,"GB":240,"PL":90,"SE":60,"PT":75}' style="width: 100%"></sav-chart-map>
<sav-chart-map by="continent" label="Sales by continent" data='{"europe":320,"north-america":280,"asia":210,"south-america":90,"africa":40,"oceania":60}' style="width: 100%; margin-top: 1rem"></sav-chart-map>
<sav-chart-map by="continent" highlight="europe" label="Where we ship" style="width: 100%; margin-top: 1rem"></sav-chart-map>
<sav-chart-map region="south-america" highlight="BR AR CL" label="Offices" style="width: 100%; margin-top: 1rem"></sav-chart-map>` },
      { title: 'Values by country', html: `<sav-chart-map label="Visitors by country" style="width: 100%" data='{"US":420,"BR":180,"IT":160,"DE":150,"FR":120,"GB":110,"IN":240,"JP":90,"AU":60,"CA":80,"ZA":30,"MX":70,"ES":65}'></sav-chart-map>` },
      { title: 'Zoom and highlight', html: `<sav-chart-map label="Where we ship" focus="IT,FR,DE,ES,PT,AT,CH" highlight="IT,FR,DE,ES,PT,AT,CH" style="width: 100%; max-width: 30rem"></sav-chart-map>` },
    ],
    attrs: [['by', 'country · continent', 'continent: data and highlight name continents ({"europe": 40, "north-america": 25}) and each continent is one area, with one colour, one name and one value (default country).'], ['region', 'world · europe · africa · asia · north-america · south-america · oceania · antarctica', 'The continent to show: the map frames it and dims the rest of the world (default world).'], ['data', 'JSON', '{ "IT": 40, "FRA": 12 } — alpha-2 or alpha-3 keys.'], ['highlight', 'list', 'Countries filled with the main colour (without values).'], ['focus', 'list', 'Zoom on these countries.'], ['levels', 'number', 'Colour steps (default 5).'],
      ['antarctica', 'boolean', 'Show Antarctica (hidden by default).'], ['locale', 'string', 'Language of the country names.'], ['max · height · label', '', '']],
    events: [['sav-country', 'A country was clicked. detail.code, detail.value']],
  },
  /* ------------------------------------------------------------ Sections (built from other components) */
  {
    builtFrom: ['label', 'button', 'image'],
    id: 'showcase', name: 'Showcase', play: { tag: 'sav-showcase', attrs: { desktop: 'docs/media/poster.jpg', mobile: 'docs/sample.svg', eyebrow: 'New', heading: 'Your documents, everywhere', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }, children: '<sav-button slot="actions">Try it free</sav-button><sav-button slot="actions" appearance="outline" variant="neutral">Learn more</sav-button>' },
    tag: 'sav-showcase', group: 'Sections', icon: 'monitor-smartphone',
    desc: 'A section for a product page: screenshots on one side — one or two desktops, one to three phones, or a desktop with phones — and label, title, text and buttons on the other. The buttons here are only examples: on your page they link where you want.',
    demos: [
      { title: 'Desktop and phone', html: `<sav-showcase desktop="docs/media/poster.jpg" mobile="docs/sample.svg" desktop-alt="The app on a computer" mobile-alt="The app on a phone"
  eyebrow="New" heading="Your documents, everywhere" text="Open, sign and share PDFs from the browser or your phone. Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
  <sav-button slot="actions">Try it free</sav-button>
  <sav-button slot="actions" appearance="outline" variant="neutral">Learn more</sav-button>
</sav-showcase>` },
      { title: 'One phone, two phones, three phones', html: `<sav-showcase mobile="docs/sample.svg" heading="One phone" text="Lorem ipsum dolor sit amet."><sav-button slot="actions">Get the app</sav-button></sav-showcase>
<sav-showcase reverse mobile="docs/sample.svg docs/media/poster.jpg" heading="Two phones" text="Consectetur adipiscing elit, sed do eiusmod."><sav-button slot="actions">Get the app</sav-button></sav-showcase>
<sav-showcase mobile="docs/media/poster.jpg docs/sample.svg docs/media/poster.jpg" heading="Three phones" text="Ut enim ad minim veniam, quis nostrud."><sav-button slot="actions">Get the app</sav-button></sav-showcase>` },
      { title: 'One desktop, two desktops, desktop with three phones', html: `<sav-showcase desktop="docs/media/poster.jpg" heading="One desktop" text="Lorem ipsum dolor sit amet."><sav-button slot="actions">Open it</sav-button></sav-showcase>
<sav-showcase reverse desktop="docs/media/poster.jpg docs/sample.svg" heading="Two desktops" text="Duis aute irure dolor in reprehenderit."><sav-button slot="actions">Open it</sav-button></sav-showcase>
<sav-showcase desktop="docs/media/poster.jpg" mobile="docs/sample.svg docs/media/poster.jpg docs/sample.svg" heading="Everywhere" text="Excepteur sint occaecat cupidatat non proident."><sav-button slot="actions">Open it</sav-button></sav-showcase>` },
    ],
    attrs: [['desktop', 'url(s)', 'One or two desktop screenshots, separated by spaces.'], ['mobile', 'url(s)', 'One to three phone screenshots, separated by spaces.'], ['desktop-alt · mobile-alt', 'string', 'What each screenshot shows, separated by |.'],
      ['eyebrow · heading · text', 'string', 'Label, title, paragraph.'], ['reverse', 'boolean', 'Screenshots on the right.']],
    slots: [['(default)', 'More content under the text.'], ['actions', 'Buttons (give them an href to link somewhere).']],
  },
];

/* Practical examples: small screens built only with SavComponents. All data is made up. */
window.SAVC_EXAMPLES = [
  {
    id: 'sign-in', title: 'Sign-in form', uses: 'card · input · checkbox · button · divider',
    desc: 'A login box with validation: leave the fields empty and press Sign in.',
    html: `<sav-card class="ex" style="max-width: 24rem">
  <strong slot="header">Welcome back</strong>
  <form id="signin-form" class="stack">
    <sav-input name="email" type="email" label="Email" required placeholder="you@example.com">
      <sav-icon slot="prefix" name="mail"></sav-icon>
    </sav-input>
    <sav-input name="password" type="password" label="Password" required minlength="8" password-toggle>
      <sav-icon slot="prefix" name="lock"></sav-icon>
    </sav-input>
    <div class="row between">
      <sav-checkbox name="remember" size="sm">Remember me</sav-checkbox>
      <sav-button appearance="link" size="sm">Forgot password?</sav-button>
    </div>
    <sav-button type="submit" block>Sign in</sav-button>
    <sav-divider>or</sav-divider>
    <sav-button appearance="outline" variant="neutral" block>Create an account</sav-button>
  </form>
</sav-card>`,
    js: `const form = document.getElementById('signin-form');

// the sav-* fields belong to the form: the browser checks them (required, type, minlength)
// before "submit" fires, and FormData reads them like native inputs
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const email = data.get('email');
  const remember = data.has('remember');
  Sav.toast('Signed in as ' + email + (remember ? ', remembered' : '') + ' (example)', { variant: 'success' });
});`,
    ts: `// once per project: the library has no type file yet, so declare what you use
declare const Sav: { toast(message: string, options?: { variant?: string; icon?: string; duration?: number }): void };

const form = document.getElementById('signin-form') as HTMLFormElement;

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();
  const data = new FormData(form);
  const email = String(data.get('email') ?? '');
  const remember = data.has('remember');
  Sav.toast('Signed in as ' + email + (remember ? ', remembered' : '') + ' (example)', { variant: 'success' });
});` },
  {
    id: 'invite', title: 'Invite people to a workspace', uses: 'card · input · radio-group · switch · progress-bar · avatar',
    desc: 'The panel an app could show to add colleagues to a shared space. Names and numbers are sample data.',
    html: `<sav-card class="ex" style="max-width: 24rem">
  <strong slot="header">Invite your team</strong>
  <div class="stack">
    <sav-input id="invite-email" label="Email" placeholder="name@company.com" type="email">
      <sav-icon slot="prefix" name="mail"></sav-icon>
    </sav-input>
    <sav-radio-group id="invite-role" label="Role" appearance="buttons" value="editor" size="sm">
      <sav-radio value="viewer">Viewer</sav-radio>
      <sav-radio value="editor">Editor</sav-radio>
      <sav-radio value="admin">Admin</sav-radio>
    </sav-radio-group>
    <sav-switch id="invite-welcome" checked size="sm">Send a welcome email</sav-switch>
    <sav-progress-bar value="60" label="Seats used (6 of 10)" show-value></sav-progress-bar>
  </div>
  <div slot="footer" class="row between">
    <div class="avatars">
      <sav-avatar size="sm" label="Ada Lovelace" variant="primary"></sav-avatar>
      <sav-avatar size="sm" label="Alan Turing"></sav-avatar>
      <sav-avatar size="sm" label="Grace Hopper" variant="primary"></sav-avatar>
    </div>
    <sav-button id="invite-send" size="sm">Send invite</sav-button>
  </div>
</sav-card>`,
    js: `const email = document.getElementById('invite-email');
const role = document.getElementById('invite-role');
const welcome = document.getElementById('invite-welcome');

// "change" fires when the user picks another role or flips the switch
role.addEventListener('change', () => Sav.toast('Role: ' + role.value, { duration: 1500 }));
welcome.addEventListener('change', () => Sav.toast(welcome.checked ? 'A welcome email will be sent' : 'No welcome email', { duration: 1500 }));

document.getElementById('invite-send').addEventListener('click', () => {
  if (!email.value || !email.checkValidity()) {
    email.reportValidity();
    Sav.toast('Type a valid email first', { variant: 'warning' });
    return;
  }
  Sav.toast('Invited ' + email.value + ' as ' + role.value + ' (example)', { variant: 'success' });
});`,
    ts: `// once per project: the library has no type file yet, so declare what you use
declare const Sav: { toast(message: string, options?: { variant?: string; icon?: string; duration?: number }): void };
type SavField = HTMLElement & { value: string; checkValidity(): boolean; reportValidity(): boolean };
type SavToggle = HTMLElement & { checked: boolean };

const email = document.getElementById('invite-email') as SavField;
const role = document.getElementById('invite-role') as HTMLElement & { value: string };
const welcome = document.getElementById('invite-welcome') as SavToggle;

role.addEventListener('change', () => Sav.toast('Role: ' + role.value, { duration: 1500 }));
welcome.addEventListener('change', () => Sav.toast(welcome.checked ? 'A welcome email will be sent' : 'No welcome email', { duration: 1500 }));

document.getElementById('invite-send')!.addEventListener('click', () => {
  if (!email.value || !email.checkValidity()) {
    email.reportValidity();
    Sav.toast('Type a valid email first', { variant: 'warning' });
    return;
  }
  Sav.toast('Invited ' + email.value + ' as ' + role.value + ' (example)', { variant: 'success' });
});` },
  {
    id: 'settings', title: 'Settings page', uses: 'tabs · switch · select · range · button',
    desc: 'Preferences split into tabs, with a save button that confirms with a toast.',
    html: `<sav-card class="ex" style="max-width: 36rem">
  <sav-tabs id="settings-tabs">
    <sav-tab label="General" icon="settings">
      <div class="stack">
        <sav-select id="settings-lang" label="Language" value="en" size="sm">
          <option value="en">English</option><option value="it">Italiano</option><option value="fr">Français</option>
        </sav-select>
        <sav-switch checked>Show tips on start</sav-switch>
        <sav-range id="settings-size" label="Text size" min="12" max="20" value="15" show-value unit="px"></sav-range>
      </div>
    </sav-tab>
    <sav-tab label="Notifications" icon="bell">
      <div class="stack">
        <sav-switch checked help="When someone mentions you.">Email</sav-switch>
        <sav-switch help="Only for urgent messages.">Push</sav-switch>
        <sav-switch checked help="One message a week.">Weekly summary</sav-switch>
      </div>
    </sav-tab>
    <sav-tab label="Privacy" icon="lock">
      <sav-radio-group label="Who can see your profile" value="team">
        <sav-radio value="everyone">Everyone</sav-radio>
        <sav-radio value="team">Only my team</sav-radio>
        <sav-radio value="me">Only me</sav-radio>
      </sav-radio-group>
    </sav-tab>
  </sav-tabs>
  <div slot="footer" class="row" style="justify-content: flex-end">
    <sav-button appearance="ghost" variant="neutral">Cancel</sav-button>
    <sav-button id="settings-save">Save</sav-button>
  </div>
</sav-card>`,
    js: `const tabs = document.getElementById('settings-tabs');
const lang = document.getElementById('settings-lang');
const size = document.getElementById('settings-size');

// which tab is open: detail.index (and detail.name when the tab has a name)
tabs.addEventListener('sav-tab-show', (event) => console.log('tab', event.detail.index));

// "input" while the user drags, "change" when they let go
size.addEventListener('input', () => { tabs.style.fontSize = size.value + 'px'; });
lang.addEventListener('change', () => Sav.toast('Language: ' + lang.value, { duration: 1500 }));

document.getElementById('settings-save').addEventListener('click', () => {
  const settings = { language: lang.value, textSize: Number(size.value) };
  Sav.toast('Saved ' + JSON.stringify(settings) + ' (example)', { variant: 'success' });
});`,
    ts: `// once per project: the library has no type file yet, so declare what you use
declare const Sav: { toast(message: string, options?: { variant?: string; icon?: string; duration?: number }): void };
type SavValue = HTMLElement & { value: string };
interface TabShowDetail { index: number; name: string | null; tab: HTMLElement }

const tabs = document.getElementById('settings-tabs') as HTMLElement;
const lang = document.getElementById('settings-lang') as SavValue;
const size = document.getElementById('settings-size') as SavValue;

tabs.addEventListener('sav-tab-show', (event) => {
  const { index } = (event as CustomEvent<TabShowDetail>).detail;
  console.log('tab', index);
});
size.addEventListener('input', () => { tabs.style.fontSize = size.value + 'px'; });
lang.addEventListener('change', () => Sav.toast('Language: ' + lang.value, { duration: 1500 }));

document.getElementById('settings-save')!.addEventListener('click', () => {
  const settings = { language: lang.value, textSize: Number(size.value) };
  Sav.toast('Saved ' + JSON.stringify(settings) + ' (example)', { variant: 'success' });
});` },
  {
    id: 'product', title: 'Product cards', uses: 'card · tag · rating · badge · button · tooltip',
    desc: 'A small shop grid. Products and prices are invented.',
    html: `<div class="demo-grid ex" id="shop">
  <sav-card data-product="backpack" data-price="79">
    <img slot="media" src="docs/sample.svg" alt="" height="130">
    <div class="stack" style="gap: .5rem">
      <div class="row between"><strong>Hiking backpack</strong><sav-badge variant="danger" appearance="soft">-20%</sav-badge></div>
      <sav-rating value="4" readonly style="--size: 1rem"></sav-rating>
      <div class="row"><sav-tag size="sm">Outdoor</sav-tag><sav-tag size="sm">30 L</sav-tag></div>
    </div>
    <div slot="footer" class="row between"><b>€ 79</b>
      <sav-button size="sm" data-add>Add to cart</sav-button></div>
  </sav-card>
  <sav-card data-product="tent" data-price="149">
    <img slot="media" src="docs/sample.svg" alt="" height="130" style="filter: hue-rotate(140deg)">
    <div class="stack" style="gap: .5rem">
      <div class="row between"><strong>Trail tent</strong><sav-badge variant="success" appearance="soft">New</sav-badge></div>
      <sav-rating value="5" readonly style="--size: 1rem"></sav-rating>
      <div class="row"><sav-tag size="sm">Camping</sav-tag><sav-tag size="sm">2 people</sav-tag></div>
    </div>
    <div slot="footer" class="row between"><b>€ 149</b>
      <sav-tooltip content="Back in stock next week"><sav-button size="sm" disabled>Sold out</sav-button></sav-tooltip></div>
  </sav-card>
</div>`,
    js: `const shop = document.getElementById('shop');
const cart = [];

// one listener for every card: find the button, then the card it belongs to
shop.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const card = button.closest('[data-product]');
  cart.push({ id: card.dataset.product, price: Number(card.dataset.price) });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  Sav.toast(cart.length + ' in the cart, € ' + total + ' (example)', { icon: 'check-circle' });
});`,
    ts: `// once per project: the library has no type file yet, so declare what you use
declare const Sav: { toast(message: string, options?: { variant?: string; icon?: string; duration?: number }): void };
interface CartItem { id: string; price: number }

const shop = document.getElementById('shop') as HTMLElement;
const cart: CartItem[] = [];

shop.addEventListener('click', (event: MouseEvent) => {
  const button = (event.target as HTMLElement).closest('[data-add]');
  if (!button) return;
  const card = button.closest('[data-product]') as HTMLElement;
  cart.push({ id: card.dataset.product ?? '', price: Number(card.dataset.price) });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  Sav.toast(cart.length + ' in the cart, € ' + total + ' (example)', { icon: 'check-circle' });
});` },
  {
    id: 'stats', title: 'Dashboard summary', uses: 'card · progress-ring · progress-bar · badge · skeleton',
    desc: 'Numbers at a glance; the last card shows how a skeleton holds the space while data loads.',
    html: `<div class="demo-grid ex">
  <sav-card>
    <div class="row between"><span class="muted">Tasks done</span><sav-badge variant="success" appearance="soft">+12%</sav-badge></div>
    <div class="row" style="margin-top: .75rem"><sav-progress-ring value="68" style="--size: 3.5rem">68%</sav-progress-ring><div><b style="font-size: 1.4rem">34</b> / 50</div></div>
  </sav-card>
  <sav-card>
    <div class="row between"><span class="muted">Storage</span><sav-badge variant="warning" appearance="soft">Almost full</sav-badge></div>
    <sav-progress-bar value="86" variant="warning" style="margin-top: 1.1rem" label="8.6 of 10 GB" show-value></sav-progress-bar>
  </sav-card>
  <sav-card id="stats-late" aria-busy="true">
    <div class="stack" style="gap: .6rem"><sav-skeleton style="width: 45%"></sav-skeleton><sav-skeleton shape="rect" style="height: 2.5rem"></sav-skeleton><sav-skeleton style="width: 70%"></sav-skeleton></div>
  </sav-card>
</div>`,
    js: `// the skeleton holds the space; when the data arrives the card gets its content
const card = document.getElementById('stats-late');

setTimeout(() => {
  card.innerHTML = '<div class="row between"><span class="muted">Visitors today</span>'
    + '<sav-badge appearance="soft">live</sav-badge></div>'
    + '<b style="font-size: 1.4rem; display: block; margin-top: .8rem">1,284</b>';
  card.removeAttribute('aria-busy');
}, 1500);`,
    ts: `const card = document.getElementById('stats-late') as HTMLElement;

setTimeout(() => {
  card.innerHTML = '<div class="row between"><span class="muted">Visitors today</span>'
    + '<sav-badge appearance="soft">live</sav-badge></div>'
    + '<b style="font-size: 1.4rem; display: block; margin-top: .8rem">1,284</b>';
  card.removeAttribute('aria-busy');
}, 1500);` },
  {
    id: 'confirm', title: 'Confirm before deleting', uses: 'dropdown · dialog · alert · toast',
    desc: 'A row menu whose Delete item asks for confirmation in a dialog.',
    html: `<div class="ex-row ex">
  <sav-avatar label="Quarterly report" shape="rounded" variant="primary"></sav-avatar>
  <div style="flex: 1"><b>Quarterly report.pdf</b><div class="muted" style="font-size: .85rem">2.4 MB · edited today</div></div>
  <sav-dropdown placement="bottom-end" id="ex-menu">
    <sav-button slot="trigger" square appearance="ghost" variant="neutral" label="File actions"><sav-icon name="more-horizontal"></sav-icon></sav-button>
    <sav-menu-item value="download"><sav-icon slot="prefix" name="download"></sav-icon>Download</sav-menu-item>
    <sav-menu-item value="rename"><sav-icon slot="prefix" name="edit"></sav-icon>Rename</sav-menu-item>
    <sav-menu-item value="delete" variant="danger"><sav-icon slot="prefix" name="trash"></sav-icon>Delete</sav-menu-item>
  </sav-dropdown>
</div>
<sav-dialog id="ex-delete" label="Delete this file?" style="--width: 26rem" sheet-on-mobile>
  <sav-alert variant="warning" appearance="accent">It goes to the bin for 30 days, then it is removed for good.</sav-alert>
  <sav-button slot="footer" appearance="ghost" variant="neutral" data-sav-close>Cancel</sav-button>
  <sav-button slot="footer" variant="danger" id="ex-delete-ok">Delete</sav-button>
</sav-dialog>`,
    js: `const menu = document.getElementById('ex-menu');
const dialog = document.getElementById('ex-delete');

// "sav-select" says which menu item was chosen
menu.addEventListener('sav-select', (event) => {
  if (event.detail.value === 'delete') dialog.show();
  else Sav.toast(event.detail.value + ' (example)', { variant: 'neutral', duration: 2000 });
});

document.getElementById('ex-delete-ok').addEventListener('click', () => {
  dialog.hide();
  Sav.toast('File deleted (example)', { variant: 'danger', icon: 'trash' });
});

// Escape, the × or a click outside ask to close: cancel it to keep the dialog open
dialog.addEventListener('sav-request-close', (event) => console.log('closing because of', event.detail.source));`,
    ts: `// once per project: the library has no type file yet, so declare what you use
declare const Sav: { toast(message: string, options?: { variant?: string; icon?: string; duration?: number }): void };
type SavDialog = HTMLElement & { show(): void; hide(): void };
interface SelectDetail { value: string; item: HTMLElement }

const menu = document.getElementById('ex-menu') as HTMLElement;
const dialog = document.getElementById('ex-delete') as SavDialog;

menu.addEventListener('sav-select', (event) => {
  const { value } = (event as CustomEvent<SelectDetail>).detail;
  if (value === 'delete') dialog.show();
  else Sav.toast(value + ' (example)', { variant: 'neutral', duration: 2000 });
});

document.getElementById('ex-delete-ok')!.addEventListener('click', () => {
  dialog.hide();
  Sav.toast('File deleted (example)', { variant: 'danger', icon: 'trash' });
});

dialog.addEventListener('sav-request-close', (event) => {
  console.log('closing because of', (event as CustomEvent<{ source: string }>).detail.source);
});` },
  {
    id: 'booking', title: 'Book a stay', uses: 'card · range-dual · number-input · button · toast',
    desc: 'A booking box: the nights between two dates on one slider, the guests with − and + buttons, and a price that follows. Dates and prices are made up.',
    html: `<sav-card class="ex" style="max-width: 26rem">
  <strong slot="header">Mountain cabin — example</strong>
  <form id="bk-form" class="stack">
    <sav-range-dual id="bk-dates" name="stay" type="date" label="Your stay" min="2027-07-01" max="2027-08-31"
      start="2027-07-10" end="2027-07-17" min-gap="1" show-value start-label="Check-in" end-label="Check-out"></sav-range-dual>
    <div class="row between">
      <sav-number-input id="bk-adults" name="adults" label="Adults" value="2" min="1" max="6" size="sm"></sav-number-input>
      <sav-number-input id="bk-children" name="children" label="Children" value="0" min="0" max="4" size="sm"></sav-number-input>
    </div>
    <div class="row between"><span class="muted" id="bk-nights">7 nights</span><b id="bk-total">€ 840</b></div>
    <sav-button type="submit" block>Book now</sav-button>
  </form>
</sav-card>`,
    js: `const dates = document.getElementById('bk-dates');
const adults = document.getElementById('bk-adults');
const children = document.getElementById('bk-children');
const PER_NIGHT = 100, PER_CHILD = 20; // example prices

function update() {
  const nights = Math.round((new Date(dates.end) - new Date(dates.start)) / 864e5);
  const total = nights * (PER_NIGHT + (children.value || 0) * PER_CHILD) + (adults.value - 2 > 0 ? (adults.value - 2) * 15 * nights : 0);
  document.getElementById('bk-nights').textContent = nights + (nights === 1 ? ' night' : ' nights');
  document.getElementById('bk-total').textContent = '€ ' + total;
}

// both fire "input" while they change, with the new values in event.detail
dates.addEventListener('input', update);
adults.addEventListener('input', update);
children.addEventListener('input', update);
update();

document.getElementById('bk-form').addEventListener('submit', (event) => {
  event.preventDefault();
  // the slider sends stay-start and stay-end, the fields adults and children
  console.log(Object.fromEntries(new FormData(event.target)));
  Sav.toast('Booked from ' + dates.start + ' to ' + dates.end + ' (example)', { variant: 'success', icon: 'calendar' });
});`,
    ts: `declare const Sav: { toast(message: string, options?: { variant?: string; icon?: string }): void };
type RangeDual = HTMLElement & { start: string; end: string };
type NumberInput = HTMLElement & { value: number | null };

const dates = document.getElementById('bk-dates') as RangeDual;
const adults = document.getElementById('bk-adults') as NumberInput;
const children = document.getElementById('bk-children') as NumberInput;
const PER_NIGHT = 100, PER_CHILD = 20; // example prices

function update(): void {
  const nights = Math.round((new Date(dates.end).getTime() - new Date(dates.start).getTime()) / 864e5);
  const extraAdults = Math.max(0, (adults.value ?? 2) - 2);
  const total = nights * (PER_NIGHT + (children.value ?? 0) * PER_CHILD + extraAdults * 15);
  document.getElementById('bk-nights')!.textContent = nights + (nights === 1 ? ' night' : ' nights');
  document.getElementById('bk-total')!.textContent = '€ ' + total;
}

[dates, adults, children].forEach((el) => el.addEventListener('input', update));
update();

document.getElementById('bk-form')!.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(Object.fromEntries(new FormData(event.target as HTMLFormElement)));
  Sav.toast(\`Booked from \${dates.start} to \${dates.end} (example)\`, { variant: 'success', icon: 'calendar' });
});` },
  {
    id: 'cart', title: 'Shopping cart', uses: 'card · list · number-input · badge · button · toast',
    desc: 'Quantities change with − and +, the totals follow, and a quantity of zero removes the row. Products and prices are made up.',
    html: `<sav-card class="ex" style="max-width: 30rem">
  <div slot="header" class="row between"><strong>Your cart</strong><sav-badge id="ct-count" appearance="soft">3 items</sav-badge></div>
  <sav-list id="ct-list" appearance="plain">
    <sav-list-item description="€ 24 each" data-price="24"><sav-icon slot="prefix" name="coffee"></sav-icon>Coffee beans, 1 kg
      <sav-number-input slot="suffix" size="sm" value="1" min="0" max="9" aria-label="Quantity of coffee beans" style="width: 8rem"></sav-number-input></sav-list-item>
    <sav-list-item description="€ 9 each" data-price="9"><sav-icon slot="prefix" name="cup-soda"></sav-icon>Glass mug
      <sav-number-input slot="suffix" size="sm" value="2" min="0" max="9" aria-label="Quantity of glass mugs" style="width: 8rem"></sav-number-input></sav-list-item>
  </sav-list>
  <div slot="footer" class="row between"><b id="ct-total">Total: € 42</b><sav-button id="ct-pay" icon="lock">Pay</sav-button></div>
</sav-card>`,
    js: `const list = document.getElementById('ct-list');

function refresh() {
  let items = 0, total = 0;
  list.querySelectorAll('sav-list-item').forEach((row) => {
    const qty = row.querySelector('sav-number-input').value || 0;
    items += qty;
    total += qty * Number(row.dataset.price);
  });
  document.getElementById('ct-count').textContent = items + (items === 1 ? ' item' : ' items');
  document.getElementById('ct-total').textContent = 'Total: € ' + total;
  document.getElementById('ct-pay').disabled = items === 0;
}

// one listener for every row: "input" bubbles up from each number field
list.addEventListener('input', refresh);
list.addEventListener('change', (event) => {
  const field = event.target.closest('sav-number-input');
  if (field && field.value === 0) {
    field.closest('sav-list-item').remove();
    Sav.toast('Removed from the cart (example)', { variant: 'neutral', icon: 'trash', duration: 2000 });
    refresh();
  }
});

document.getElementById('ct-pay').addEventListener('click', () => Sav.toast('Payment page (example)', { icon: 'lock' }));`,
    ts: `declare const Sav: { toast(message: string, options?: { variant?: string; icon?: string; duration?: number }): void };
type NumberInput = HTMLElement & { value: number | null };

const list = document.getElementById('ct-list') as HTMLElement;
const pay = document.getElementById('ct-pay') as HTMLElement & { disabled: boolean };

function refresh(): void {
  let items = 0, total = 0;
  list.querySelectorAll<HTMLElement>('sav-list-item').forEach((row) => {
    const qty = (row.querySelector('sav-number-input') as NumberInput).value ?? 0;
    items += qty;
    total += qty * Number(row.dataset.price);
  });
  document.getElementById('ct-count')!.textContent = items + (items === 1 ? ' item' : ' items');
  document.getElementById('ct-total')!.textContent = 'Total: € ' + total;
  pay.disabled = items === 0;
}

list.addEventListener('input', refresh);
list.addEventListener('change', (event) => {
  const field = (event.target as HTMLElement).closest('sav-number-input') as NumberInput | null;
  if (field && field.value === 0) {
    field.closest('sav-list-item')!.remove();
    Sav.toast('Removed from the cart (example)', { variant: 'neutral', icon: 'trash', duration: 2000 });
    refresh();
  }
});

pay.addEventListener('click', () => Sav.toast('Payment page (example)', { icon: 'lock' }));` },
  {
    id: 'filters', title: 'Shop filters', uses: 'range-dual · chip-group · rating · switch · badge',
    desc: 'A filter panel: a price band, categories, a minimum rating and a switch, with the number of results updated on every change. The products are made up.',
    html: `<div class="ex stack" style="max-width: 26rem">
  <sav-range-dual id="fl-price" label="Price" min="0" max="300" step="10" start="20" end="180" prefix="€ " show-value></sav-range-dual>
  <sav-chip-group id="fl-cat" label="Category" multiple value="shoes,bags">
    <sav-chip value="shoes" size="sm">Shoes</sav-chip><sav-chip value="bags" size="sm">Bags</sav-chip>
    <sav-chip value="hats" size="sm">Hats</sav-chip><sav-chip value="belts" size="sm">Belts</sav-chip>
  </sav-chip-group>
  <sav-rating id="fl-stars" value="3" label="Minimum rating"></sav-rating>
  <sav-switch id="fl-stock" checked>Only in stock</sav-switch>
  <div class="row between"><b>Results</b><sav-badge id="fl-count" variant="primary">0 products</sav-badge></div>
</div>`,
    js: `// a small made-up catalogue
const PRODUCTS = [
  { cat: 'shoes', price: 89, stars: 4, stock: true }, { cat: 'shoes', price: 140, stars: 5, stock: false },
  { cat: 'bags', price: 60, stars: 3, stock: true }, { cat: 'bags', price: 220, stars: 4, stock: true },
  { cat: 'hats', price: 25, stars: 4, stock: true }, { cat: 'belts', price: 35, stars: 2, stock: true },
];
const price = document.getElementById('fl-price');
const cat = document.getElementById('fl-cat');
const stars = document.getElementById('fl-stars');
const stock = document.getElementById('fl-stock');

function apply() {
  const cats = [].concat(cat.value || []); // a list with "multiple"
  const found = PRODUCTS.filter((p) => p.price >= price.start && p.price <= price.end
    && cats.includes(p.cat) && p.stars >= stars.value && (!stock.checked || p.stock));
  document.getElementById('fl-count').textContent = found.length + (found.length === 1 ? ' product' : ' products');
}

price.addEventListener('input', apply);
[cat, stars, stock].forEach((el) => el.addEventListener('change', apply));
apply();`,
    ts: `interface Product { cat: string; price: number; stars: number; stock: boolean }
const PRODUCTS: Product[] = [
  { cat: 'shoes', price: 89, stars: 4, stock: true }, { cat: 'shoes', price: 140, stars: 5, stock: false },
  { cat: 'bags', price: 60, stars: 3, stock: true }, { cat: 'bags', price: 220, stars: 4, stock: true },
  { cat: 'hats', price: 25, stars: 4, stock: true }, { cat: 'belts', price: 35, stars: 2, stock: true },
];
const price = document.getElementById('fl-price') as HTMLElement & { start: number; end: number };
const cat = document.getElementById('fl-cat') as HTMLElement & { value: string | string[] };
const stars = document.getElementById('fl-stars') as HTMLElement & { value: number };
const stock = document.getElementById('fl-stock') as HTMLElement & { checked: boolean };

function apply(): void {
  const cats = ([] as string[]).concat(cat.value || []);
  const found = PRODUCTS.filter((p) => p.price >= price.start && p.price <= price.end
    && cats.includes(p.cat) && p.stars >= stars.value && (!stock.checked || p.stock));
  document.getElementById('fl-count')!.textContent = found.length + (found.length === 1 ? ' product' : ' products');
}

price.addEventListener('input', apply);
[cat, stars, stock].forEach((el) => el.addEventListener('change', apply));
apply();` },
  {
    id: 'help', title: 'Help centre', uses: 'tabs · search · accordion · details · button',
    desc: 'Vertical tabs with icons at the end of each tab (icon-placement="end"), a search that opens the right tab, and questions in an accordion. The texts are examples.',
    html: `<div class="ex stack">
  <sav-search id="hc-search" placeholder="Search the help: refund, password, invoice…">
    <option value="billing">Refund</option><option value="billing">Invoice</option>
    <option value="account">Password</option><option value="account">Two-step sign-in</option><option value="shipping">Tracking</option>
  </sav-search>
  <sav-tabs id="hc-tabs" orientation="vertical" icon-placement="end">
    <sav-tab label="Account" name="account" icon="user">
      <sav-accordion>
        <sav-details summary="How do I change my password?">Open Settings, then Security, then Change password.</sav-details>
        <sav-details summary="What is two-step sign-in?">A code from your phone, asked after the password.</sav-details>
      </sav-accordion>
    </sav-tab>
    <sav-tab label="Billing" name="billing" icon="credit-card">
      <sav-accordion>
        <sav-details summary="Where are my invoices?">In Billing, one per month, as PDF.</sav-details>
        <sav-details summary="How do refunds work?">Within 14 days, to the card you paid with.</sav-details>
      </sav-accordion>
    </sav-tab>
    <sav-tab label="Shipping" name="shipping" icon="truck">
      <sav-accordion><sav-details summary="How do I track a parcel?">The tracking link is in the email that confirms the order.</sav-details></sav-accordion>
    </sav-tab>
    <sav-tab label="Contact us" name="contact" icon="external" icon-placement="after">
      <p>Still stuck? Write to us: we answer within a day (example).</p>
      <sav-button id="hc-write" icon="mail">Write to us</sav-button>
    </sav-tab>
  </sav-tabs>
</div>`,
    js: `const tabs = document.getElementById('hc-tabs');

// choosing a suggestion ("sav-pick") opens the tab it belongs to: its value is the tab name
document.getElementById('hc-search').addEventListener('sav-pick', (event) => {
  tabs.show(event.detail.value);
});

tabs.addEventListener('sav-tab-show', (event) => console.log('open tab:', event.detail.name));
document.getElementById('hc-write').addEventListener('click', () => Sav.toast('Message form (example)', { icon: 'mail' }));`,
    ts: `declare const Sav: { toast(message: string, options?: { icon?: string }): void };
type SavTabs = HTMLElement & { show(nameOrIndex: string | number): void };

const tabs = document.getElementById('hc-tabs') as SavTabs;

document.getElementById('hc-search')!.addEventListener('sav-pick', (event) => {
  tabs.show((event as CustomEvent<{ value: string }>).detail.value);
});

tabs.addEventListener('sav-tab-show', (event) => {
  console.log('open tab:', (event as CustomEvent<{ name: string; index: number }>).detail.name);
});
document.getElementById('hc-write')!.addEventListener('click', () => Sav.toast('Message form (example)', { icon: 'mail' }));` },
  {
    id: 'faq', title: 'FAQ section', uses: 'accordion · details · button',
    desc: 'Questions that open one at a time.',
    html: `<div class="ex" style="max-width: 36rem; width: 100%">
  <sav-accordion exclusive id="faq">
    <sav-details summary="How long does shipping take?" open>Two to four working days in Italy, about a week abroad.</sav-details>
    <sav-details summary="Can I return an item?">Yes, within 30 days, as long as it is unused.</sav-details>
    <sav-details summary="Do you ship outside the EU?">Not yet, but it is on our list.</sav-details>
  </sav-accordion>
  <div class="row" style="margin-top: 1rem"><span class="muted">Still need help?</span><sav-button size="sm" appearance="soft" id="faq-contact">Contact us</sav-button></div>
</div>`,
    js: `const faq = document.getElementById('faq');

// every sav-details fires "sav-show" and "sav-hide"; they bubble up to the accordion
faq.addEventListener('sav-show', (event) => {
  console.log('opened:', event.target.summary);
});

document.getElementById('faq-contact').addEventListener('click', () => {
  Sav.toast('We will write back soon (example)', { variant: 'success' });
});`,
    ts: `// once per project: the library has no type file yet, so declare what you use
declare const Sav: { toast(message: string, options?: { variant?: string; icon?: string; duration?: number }): void };
const faq = document.getElementById('faq') as HTMLElement;

faq.addEventListener('sav-show', (event: Event) => {
  const details = event.target as HTMLElement & { summary: string };
  console.log('opened:', details.summary);
});

document.getElementById('faq-contact')!.addEventListener('click', () => {
  Sav.toast('We will write back soon (example)', { variant: 'success' });
});` },
];
