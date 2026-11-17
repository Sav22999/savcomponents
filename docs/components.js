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
    ],
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
    attrs: [['label', 'string', 'Accessible name of the group.']],
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
    attrs: [['variant', 'primary · neutral · success · warning · danger · protected', 'Colour and icon; protected shows a shield.'], ['appearance', 'soft · accent · outline · solid', 'Default soft.'], ['heading', 'string', 'Bold first line.'], ['closable', 'boolean', 'Shows a close button.'], ['noicon', 'boolean', 'Hides the icon.'], ['duration', 'ms', 'Closes itself after this time.']],
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
    attrs: [['variant', 'primary · neutral · success · warning · danger', ''], ['appearance', 'solid · soft · outline', ''], ['pill · dot · pulse', 'boolean', 'Shape and attention effect.']],
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
      ['--transform · --offset', 'CSS', 'Text case (default uppercase); distance from the corner.']],
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
    attrs: [['variant', 'neutral · primary · success · warning · danger', 'Default neutral.'], ['appearance', 'soft · solid', ''], ['size', 'sm · md · lg', ''], ['pill · removable', 'boolean', '']],
    events: [['sav-remove', 'Cancelable, before the tag removes itself.']],
  },
  {
    id: 'spinner', name: 'Spinner', play: { tag: 'sav-spinner', attrs: {} }, tag: 'sav-spinner', group: 'Feedback', icon: 'loader',
    desc: 'An indeterminate loading indicator. It takes the font size of its parent. Its look follows the style: a ring (square in Sharp, rounded square in Brutal) or, in Tilt, the four leaning tiles of the logo lighting up in turn.',
    demos: [{ title: 'Sizes and colours', html: `<sav-spinner></sav-spinner>
<sav-spinner style="font-size: 2rem"></sav-spinner>
<sav-spinner style="font-size: 3rem; --track-width: 1.5px" variant="success"></sav-spinner>
<sav-spinner variant="danger" style="font-size: 2rem"></sav-spinner>` }],
    attrs: [['variant', 'primary · neutral · success · warning · danger', ''], ['label', 'string', 'Accessible name, default "Loading".'], ['--track-width', 'CSS', 'Stroke width.']],
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
    attrs: [['value', 'number', '0–100 (or 0–max).'], ['max', 'number', 'Bar only, default 100.'], ['indeterminate · striped · show-value', 'boolean', 'Bar only.'], ['label', 'string', ''], ['variant', 'primary · …', ''], ['--height · --size · --track-width', 'CSS', '']],
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
    attrs: [['label · help · placeholder · value', 'string', ''], ['type', 'text · email · password · number · search · tel · url · date · …', ''], ['size', 'sm · md · lg', ''], ['appearance', 'outline · filled', ''], ['pill · clearable · password-toggle', 'boolean', ''], ['name · required · disabled · readonly', '', 'Form behaviour.'], ['min · max · step · minlength · maxlength · pattern · autocomplete · inputmode', '', 'Passed to the native input.']],
    slots: [['label', 'Rich label'], ['prefix · suffix', 'Icons or text inside the field'], ['help', 'Rich help text']],
    events: [['input · change', 'Native-like events on the element.'], ['sav-clear', 'When the clear button is used.']],
    methods: [['focus() · blur() · select()', ''], ['checkValidity() · reportValidity() · setCustomValidity(msg)', '']],
    parts: ['form-control', 'label', 'base', 'input', 'help-text'],
  },
  {
    id: 'textarea', name: 'Textarea', play: { tag: 'sav-textarea', attrs: { label: 'Message' } }, tag: 'sav-textarea', group: 'Forms', icon: 'letter-text',
    desc: 'Multi-line text, with an optional counter and automatic height.',
    demos: [{ title: 'Basic', html: `<sav-textarea label="Message" placeholder="Write something…" maxlength="200" counter></sav-textarea>
<sav-textarea label="Grows with the text" resize="auto" rows="2" help="resize=&quot;auto&quot;"></sav-textarea>` }],
    attrs: [['label · help · placeholder · value', 'string', ''], ['rows', 'number', 'Default 4.'], ['resize', 'vertical · none · auto', ''], ['counter', 'boolean', 'Shows the character count.'], ['name · required · disabled · readonly · minlength · maxlength', '', '']],
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
      ['size', 'sm · md · lg', ''], ['appearance', 'outline · filled', ''], ['pill', 'boolean', ''], ['max-chips', 'number', 'Chips shown before “+N”, default 3.'], ['name · required · disabled · readonly', '', 'Form behaviour.'],
      ['data-description', 'string', 'On an option: a second line under its label.']],
    events: [['input · change', 'When the value changes.'], ['sav-show · sav-hide', 'The list opens or closes.']],
    methods: [['value', 'A string, or an array with multiple.'], ['show() · hide() · focus()', '']],
  },
  {
    id: 'date-picker', name: 'Date picker', play: { tag: 'sav-date-picker', attrs: { label: 'Date', placeholder: 'Pick a date' } }, tag: 'sav-date-picker', group: 'Forms', icon: 'calendar',
    desc: 'Picks a day, a month or a year from a calendar in the language of the page. The value is always ISO (2026-11-16), whatever is shown. Keyboard: arrows, Page Up / Down, Enter.',
    demos: [
      { title: 'Day, month, year', html: `<sav-date-picker label="Day" placeholder="Pick a date" value="2026-11-16"></sav-date-picker>
<sav-date-picker label="Month" mode="month" placeholder="Pick a month"></sav-date-picker>
<sav-date-picker label="Year" mode="year" placeholder="Pick a year" value="2026"></sav-date-picker>` },
      { title: 'Limits, language, phones', html: `<sav-date-picker label="Check-in" min="2026-11-16" max="2027-03-31" help="From today to the end of March." clearable sheet-on-mobile></sav-date-picker>
<sav-date-picker label="Data (italiano)" locale="it-IT" value="2026-12-25" format="full"></sav-date-picker>
<sav-date-picker label="Native picker on phones" native-on-mobile></sav-date-picker>` },
    ],
    attrs: [['mode', 'date · month · year', 'What to pick. Values: 2026-11-16, 2026-11, 2026.'], ['value · min · max', 'ISO date', 'Same format as the mode.'], ['label · help · placeholder', 'string', ''],
      ['locale', 'string', 'Language of names and the first day of the week; default the page language.'], ['first-day', 'number', '0 = Sunday, 1 = Monday…'], ['format', 'short · medium · long · full', 'How the chosen date is written.'],
      ['clearable', 'boolean', ''], ['sheet-on-mobile · native-on-mobile · native', 'boolean', 'How it opens on phones.'], ['size', 'sm · md · lg', ''], ['name · required · disabled · readonly', '', 'Form behaviour.']],
    events: [['input · change', 'When a date is chosen.']],
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
      ['label · help · placeholder', 'string', ''], ['clearable', 'boolean', ''], ['sheet-on-mobile · native-on-mobile · native', 'boolean', 'How it opens on phones.'], ['size', 'sm · md · lg', ''], ['name · required · disabled · readonly', '', 'Form behaviour.']],
    events: [['input', 'At every change in the columns.'], ['change', 'When the popup closes with a new time.']],
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
    attrs: [['checked · indeterminate', 'boolean', ''], ['value', 'string', 'Sent with the form, default "on".'], ['variant', 'primary · …', ''], ['size', 'sm · md · lg', ''], ['help', 'string', ''], ['name · required · disabled', '', '']],
    events: [['change', '']],
  },
  {
    id: 'radio', name: 'Radio group', tag: 'sav-radio-group · sav-radio', group: 'Forms', icon: 'circle-dot',
    desc: 'One choice among several, with arrow-key navigation. <code>appearance="buttons"</code> turns it into a segmented control.',
    demos: [
      { title: 'Basic', html: `<sav-radio-group label="Delivery" name="delivery" value="standard">
  <sav-radio value="standard">Standard (3–5 days)</sav-radio>
  <sav-radio value="express">Express (1 day)</sav-radio>
  <sav-radio value="pickup" disabled>Pick up in store</sav-radio>
</sav-radio-group>` },
      { title: 'Horizontal and buttons', html: `<sav-radio-group label="Size" orientation="horizontal" value="m">
  <sav-radio value="s">S</sav-radio><sav-radio value="m">M</sav-radio><sav-radio value="l">L</sav-radio>
</sav-radio-group>
<sav-radio-group label="View" appearance="buttons" value="week">
  <sav-radio value="day">Day</sav-radio>
  <sav-radio value="week">Week</sav-radio>
  <sav-radio value="month">Month</sav-radio>
</sav-radio-group>` },
    ],
    attrs: [['label · help · value · name', 'string', 'On the group.'], ['orientation', 'vertical · horizontal', ''], ['appearance', 'buttons', 'Segmented control.'], ['size', 'sm · md · lg', ''], ['required · disabled', '', ''], ['value · disabled', '', 'On each sav-radio.']],
    events: [['change', 'On the group.']],
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
      ['multiple', 'boolean', 'sav-chip-group: more than one at a time.'], ['required', 'boolean', 'sav-chip-group: one must stay selected.'], ['label', 'string', 'sav-chip-group: name of the group.'], ['value', 'string · list', 'sav-chip-group: selected value(s); a list with multiple.']],
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
      ['labels', 'list', 'Words for the five scores, comma-separated (default "Too weak,Weak,Fair,Good,Strong").'], ['label · help · placeholder · name · required · autocomplete', '', 'Like an input.']],
    events: [['input', 'detail.value, detail.score (0–4)'], ['change', 'When the user leaves the field.']],
    parts: ['input', 'meter', 'strength', 'rules'],
  },
  {
    builtFrom: ['input'],
    id: 'search', name: 'Search', play: { tag: 'sav-search', attrs: { placeholder: 'Search fruit' }, children: '<option>Apple</option><option>Apricot</option><option>Banana</option><option>Blueberry</option><option>Cherry</option>' }, tag: 'sav-search', group: 'Forms', icon: 'search',
    desc: 'A search field that suggests as you type: highlighted matches, arrows and Enter to choose. Suggestions come from <option> children, or from the page on every "sav-query" (for a server search).',
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
    ],
    attrs: [['placeholder · label · help · name · value', '', ''], ['min-chars', 'number', 'Characters before suggesting (default 1).'], ['debounce', 'ms', 'Wait after typing before asking (default 120).'],
      ['max', 'number', 'Suggestions shown (default 8).'], ['no-filter', 'boolean', 'Do not filter here: the page sends already-filtered suggestions.'], ['empty-label', 'string', 'Text when nothing matches.']],
    events: [['sav-query', 'While typing (debounced): set .suggestions here. detail.query'], ['sav-pick', 'A suggestion was chosen, cancelable. detail.value, detail.label, detail.item'], ['sav-search', 'Enter without choosing a suggestion. detail.query'], ['input · change · sav-clear', '']],
    methods: [['suggestions', 'Property: strings or { label, value, description, icon, group, href }.']],
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
      ['code', 'iso3 · tag', 'What the code on the right shows (default ISO 639-3).'], ['no-flag · no-code', 'boolean', 'Hide the flag or the code.'], ['include · exclude', 'list', 'Only these tags, or all but these.'], ['label · placeholder · required · name · sheet-on-mobile · native-on-mobile', '', 'Like the select.']],
    events: [['change · input', 'Like the select.']],
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
      ['no-flag · no-code', 'boolean', ''], ['include · exclude', 'list', 'Only these countries (alpha-2), or all but these.'], ['label · placeholder · required · name · sheet-on-mobile · native-on-mobile', '', 'Like the select.']],
    events: [['change · input', 'Like the select.']],
  },
  {
    builtFrom: ['dropdown', 'button'],
    id: 'theme-choice', name: 'Theme choice', play: { tag: 'sav-theme-choice', attrs: {} }, tag: 'sav-theme-choice', group: 'Forms', icon: 'theme-auto',
    desc: 'Light, Dark or Auto (follows the system), each with its icon: a menu or three buttons. With apply it switches the page by itself.',
    demos: [
      { title: 'Menu and buttons', html: `<sav-theme-choice value="auto"></sav-theme-choice>
<sav-theme-choice appearance="buttons" value="light"></sav-theme-choice>
<sav-theme-choice appearance="buttons" icons-only value="dark"></sav-theme-choice>` },
    ],
    attrs: [['value', 'light · dark · auto', ''], ['appearance', 'menu · buttons', 'Default menu.'], ['icons-only', 'boolean', 'Only the icons (the names stay for screen readers).'], ['apply', 'boolean', 'Calls Sav.setMode() on change.'], ['label', 'string', 'Name for screen readers (default "Theme").']],
    events: [['change', 'detail.value']],
  },
  {
    builtFrom: ['button', 'list'],
    id: 'dropzone', name: 'Drop zone', tag: 'sav-dropzone', group: 'Forms', icon: 'upload',
    desc: 'An area that accepts things dragged from outside the page: files (upload), or text, links and HTML from other pages and apps — also pasted with Cmd/Ctrl+V. Accepted types, maximum size, one or many, a list of what was dropped. It belongs to forms.',
    demos: [ { title: 'Images up to 2 MB', html: `<sav-dropzone name="photos" accept="image/*,.pdf" max-size="2000000" multiple help="PNG, JPG or PDF, up to 2 MB each" style="max-width: 26rem"></sav-dropzone>` },
      { title: 'Text and links from other pages', html: `<sav-dropzone kind="data" multiple help="Drag a link or some selected text from another tab, or paste it here" style="max-width: 26rem"></sav-dropzone>` } ],
    attrs: [['kind', 'files · data · any', 'What it accepts: files (default), dragged or pasted text and links, or both.'], ['accept', 'list', 'Files: image/*, .pdf, application/zip…'], ['multiple', 'boolean', ''], ['max-size', 'bytes', 'Refuses larger files.'], ['label · help · name · required', '', '']],
    events: [['change', 'detail.files, detail.items'], ['sav-drop', 'Text or a link was dropped, cancelable. detail.kind, detail.text, detail.url, detail.html']], methods: [['files', 'Property: the chosen File objects.'], ['dropped', 'Property: the dropped text and links.']],
  },
  {
    id: 'range', name: 'Range', play: { tag: 'sav-range', attrs: { label: 'Volume', value: '40' } }, tag: 'sav-range', group: 'Forms', icon: 'sliders-horizontal',
    desc: 'A slider for numbers within a range.',
    demos: [{ title: 'Basic', html: `<sav-range label="Volume" value="40" show-value unit="%"></sav-range>
<sav-range label="Rating" min="1" max="5" value="3" labels="Bad, Poor, Okay, Good, Great" variant="success"></sav-range>` }],
    attrs: [['label · help', 'string', ''], ['value · min · max · step', 'number', ''], ['show-value', 'boolean', ''], ['unit', 'string', 'Appended to the shown value.'], ['labels', 'comma list', 'Labels under the track.'], ['variant', 'primary · …', '']],
  },
  {
    id: 'rating', name: 'Rating', play: { tag: 'sav-rating', attrs: { value: '3' } }, tag: 'sav-rating', group: 'Forms', icon: 'star-half',
    desc: 'Stars (or any icon) for ratings. Keyboard: arrows, Home, End.',
    demos: [{ title: 'Basic', html: `<sav-rating label="Your rating" value="3"></sav-rating>
<sav-rating value="4" readonly style="--size: 1.1rem"></sav-rating>
<sav-rating value="2" max="5" icon="heart" style="--color: var(--sav-color-danger); --size: 2rem"></sav-rating>` }],
    attrs: [['value · max', 'number', 'Default max 5.'], ['icon', 'icon name', 'Default star.'], ['readonly · disabled', 'boolean', ''], ['label · help · name', 'string', ''], ['--size · --color · --empty', 'CSS', '']],
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
    id: 'avatar', name: 'Avatar', play: { tag: 'sav-avatar', attrs: { label: 'Ada Lovelace' }, skip: ['image', 'initials'] }, tag: 'sav-avatar', group: 'Layout', icon: 'circle-user',
    desc: 'A picture, initials or an icon for a person.',
    demos: [{ title: 'Basic', html: `<sav-avatar label="Ada Lovelace"></sav-avatar>
<sav-avatar label="Grace Hopper" variant="primary"></sav-avatar>
<sav-avatar></sav-avatar>
<sav-avatar label="Alan Turing" shape="rounded" size="lg" variant="primary"></sav-avatar>
<sav-avatar image="docs/sample.svg" label="Landscape" size="xl"></sav-avatar>` }],
    attrs: [['image', 'url', 'Falls back to initials if it fails.'], ['label', 'string', 'Name: gives the initials and the accessible name.'], ['initials', 'string', 'Overrides the computed initials.'], ['shape', 'circle · rounded · square · tilt', 'Tilt is a square leaning 10°, like the logo.'], ['size', 'sm · md · lg · xl', 'Or --size.'], ['variant', 'neutral · primary', '']],
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
    demos: [ { title: 'Reorder the list', html: `<sav-sortable id="sort-demo" style="max-width: 20rem">
  <sav-card data-id="design">1 · Design</sav-card>
  <sav-card data-id="build">2 · Build</sav-card>
  <sav-card data-id="test">3 · Test</sav-card>
  <sav-card data-id="ship">4 · Ship</sav-card>
</sav-sortable>
<script>
  document.getElementById('sort-demo').addEventListener('sav-sort', (e) => Sav.toast('New order: ' + e.detail.order.join(', '), { duration: 2500 }));
</script>` } ],
    attrs: [['direction', 'vertical · horizontal', ''], ['handle', 'selector', 'Drag only from this part of each item.'], ['data-no-drag', 'item attribute', 'This child does not move.'], ['data-id', 'item attribute', 'Name used in detail.order.']],
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
    id: 'label', name: 'Label', play: { tag: 'sav-label', text: 'Feedback', attrs: {} }, tag: 'sav-label', group: 'Content', icon: 'bookmark',
    desc: 'A short caption that names a section or a category — the small "eyebrow" above a title. Unlike a tag it is not removable and does not filter; unlike a badge it is not a status or a count.',
    demos: [
      { title: 'Appearances', html: `<sav-label>Feedback</sav-label>
<sav-label appearance="soft">Navigation</sav-label>
<sav-label appearance="outline" variant="neutral">Draft</sav-label>
<sav-label appearance="plain">Chapter 2</sav-label>
<sav-label variant="success" case="normal"><sav-icon slot="prefix" name="check"></sav-icon>Approved</sav-label>` },
    ],
    attrs: [['variant', 'primary · neutral · success · warning · danger · protected', ''], ['appearance', 'solid · soft · outline · plain', 'Default solid.'], ['case', 'upper · normal', 'Upper case by default.'], ['--sav-label-size', 'CSS', 'Font size (default .72rem).']],
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
      ['compact', 'boolean', 'Less padding.'], ['appearance', 'card · plain', 'Default card.'], ['class="num"', 'th · td', 'Right-aligned numbers.']],
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
    desc: 'A video in a frame with the corners of the style, a fixed ratio and a poster with a big play button, then its own control bar: play, back and forward 10 seconds, seek, time, volume, speed, captions, picture-in-picture and full screen. The bar hides while playing; keys: Space, arrows, M, F, C.',
    demos: [
      { title: 'Large', html: `<sav-video src="docs/media/sample.mp4" poster="docs/media/poster.jpg" label="Gradient demo" caption="A 4-second sample made for this page: try the controls, the keys and full screen." style="max-width: 46rem"></sav-video>` },
      { title: 'Small, square, with the browser controls', html: `<sav-video src="docs/media/sample.mp4" poster="docs/media/poster.jpg" ratio="1:1" style="max-width: 16rem"></sav-video>
<sav-video src="docs/media/sample.mp4" poster="docs/media/poster.jpg" native-controls style="max-width: 22rem"></sav-video>` } ],
    attrs: [['src', 'url', 'Or <source> elements inside.'], ['poster', 'url', 'Image before playing.'], ['ratio', '16:9 · 4:3 · 1:1 · 9:16', ''], ['caption · label', 'string', 'Line below; name of the play button.'], ['native-controls', 'boolean', 'The browser\u2019s own control bar instead of this one.'], ['autoplay · muted · loop', 'boolean', ''], ['<track kind="captions">', 'child', 'Captions: the CC button appears.']],
    events: [['play · pause · ended', '']], methods: [['play() · pause()', ''], ['video', 'Property: the <video> element.']],
  },
  {
    builtFrom: ['range', 'button'],
    id: 'audio', name: 'Audio', play: { tag: 'sav-audio', attrs: { src: 'docs/media/sample.wav', title: 'Little melody', artist: 'SavComponents' } }, tag: 'sav-audio', group: 'Media', icon: 'music',
    desc: 'A small player in the style: play/pause, a seek bar, time, mute, with title, artist and cover.',
    demos: [ { title: 'Player', html: `<sav-audio src="docs/media/sample.wav" title="Little melody" artist="SavComponents" cover="docs/media/poster.jpg" style="max-width: 26rem"></sav-audio>` } ],
    attrs: [['src', 'url', 'Or <source> elements inside.'], ['title · artist', 'string', ''], ['cover', 'url', 'A small picture.']],
    events: [['play · pause · ended', '']], methods: [['play() · pause()', ''], ['audio', 'Property: the <audio> element.']],
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
    attrs: [['content', 'string', 'Text of the tooltip.'], ['placement', 'top · bottom · left · right (+ -start / -end)', ''], ['trigger', 'hover focus · click', 'Space separated.'], ['delay', 'ms', 'Default 150.'], ['disabled', 'boolean', ''], ['--max-width', 'CSS', '']],
    slots: [['(default)', 'The trigger'], ['content', 'Rich content']],
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
      { title: 'Vertical', html: `<sav-tabs placement="start">
  <sav-tab label="Account">Account settings.</sav-tab>
  <sav-tab label="Security">Password and two-step login.</sav-tab>
  <sav-tab label="Billing">Invoices and payment methods.</sav-tab>
</sav-tabs>` },
      { title: 'Vertical with sub tabs', html: `<sav-tabs placement="start" active="profile">
  <sav-tab label="Account" icon="user" name="account">Your account in short.</sav-tab>
  <sav-tab label="Profile" level="sub" name="profile">Name, picture and bio.</sav-tab>
  <sav-tab label="Security" level="sub" name="security">Password and two-step sign-in.</sav-tab>
  <sav-tab label="Notifications" icon="bell" name="notifications">What we tell you, and how.</sav-tab>
  <sav-tab label="Email" level="sub" name="email">Weekly summary, news.</sav-tab>
  <sav-tab label="Phone" level="sub" name="phone">Push and text messages.</sav-tab>
  <sav-tab label="Billing" icon="credit-card" name="billing">Plan and invoices.</sav-tab>
</sav-tabs>` },
    ],
    attrs: [['appearance', 'underline · pills · segmented', 'Default underline.'], ['placement', 'top · start', ''], ['active', 'tab name', 'Tab to open first.'], ['label · name · icon · active · disabled', '', 'On sav-tab.'], ['level', 'normal · sub', 'On sav-tab: sub sits under the tab before it, smaller and indented (two levels; clearest with placement="start").'], ['--sav-tab-sub-indent', 'CSS', 'How far sub tabs are indented (default .9rem).'], ['--sav-tab-padding', 'CSS', 'Panel padding.']],
    events: [['sav-tab-show', 'detail.name, detail.index']],
    methods: [['show(nameOrIndex)', '']],
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
      ['<sav-menu slot="submenu">', 'child', 'Inside a sav-menu-item: its submenu (it can hold more).']],
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
      ['--height · --padding · --search-width · --sav-header-bg', 'CSS', 'Size, side padding, width of the open search, background.'], ['toggleMenu() · toggleSearch()', 'method', 'Open or close the folded menu or search (pass true or false).']],
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
      ['label', 'string', 'Accessible name (default “Breadcrumb”).'], ['href', 'url', 'On each item.'], ['--sav-breadcrumb-current-bg · -fg · -shadow', 'CSS', 'How the current page is highlighted.']],
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
    attrs: [['data', 'JSON', '{ labels: [...], values: [...] }'], ['type', 'pie · donut', ''], ['thickness', 'px', 'Width of the donut ring.'], ['gap', 'degrees', 'Space between slices (default 1.2).'], ['show-values', 'boolean', 'Percentages on the slices.'], ['center', 'string', 'Text in the middle of the donut.'], ['height', 'px', 'Size (default 260).']],
  },
  {
    id: 'chart-radar', name: 'Radar chart', tag: 'sav-chart-radar', group: 'Charts', icon: 'radar',
    desc: 'A spider web: one axis per label, one shape per series — to compare profiles on several qualities at once.',
    demos: [
      { title: 'Two profiles', html: `<sav-chart-radar label="Skills" max="10" style="width: 22rem" data='{"labels":["Speed","Design","Code","Tests","Docs","Support"],"series":[{"name":"Team A","values":[8,6,9,5,7,6]},{"name":"Team B","values":[5,9,6,8,6,9]}]}'></sav-chart-radar>` },
    ],
    attrs: [['data', 'JSON', '{ labels: [axes], series: [{ name, values }] }'], ['max', 'number', ''], ['levels', 'number', 'Rings of the web (default 4).'], ['no-fill', 'boolean', 'Lines only.'], ['height', 'px', 'Size (default 320).']],
  },
  {
    id: 'chart-line', name: 'Area and line chart', tag: 'sav-chart-line', group: 'Charts', icon: 'chart-area',
    desc: 'Values over time as a filled area or a line only: smooth curves, points, stacked areas.',
    demos: [
      { title: 'Area, smooth', html: `<sav-chart-line label="Visitors" smooth style="width: 100%" data='{"labels":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"series":[{"name":"This week","values":[120,180,150,210,260,190,240]},{"name":"Last week","values":[100,140,160,150,200,170,180]}]}'></sav-chart-line>` },
      { title: 'Lines with points', html: `<sav-chart-line label="Temperature" type="line" points style="width: 100%" data='{"labels":["Jan","Feb","Mar","Apr","May","Jun"],"series":[{"name":"Rome","values":[8,9,12,15,19,24]},{"name":"Oslo","values":[-4,-3,1,5,11,15]}]}'></sav-chart-line>` },
    ],
    attrs: [['data', 'JSON', '{ labels: [...], series: [{ name, values }] }'], ['type', 'area · line', 'Default area.'], ['smooth', 'boolean', 'Curves instead of straight segments.'], ['points', 'boolean', 'A dot on every value.'], ['stacked', 'boolean', 'Areas on top of each other.'], ['max · height', '', '']],
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
    attrs: [['data', 'JSON', "{ '2026-11-16': 40, … } or [{ date, value }] — values 0–100."], ['start · end', 'YYYY-MM-DD', 'Period (default: the last 12 months).'], ['levels', 'number', 'Colour steps (default 5).'], ['week-start', '0 · 1', 'Sunday or Monday (default 1).'], ['locale', 'string', 'Month and day names.']],
  },
  {
    id: 'chart-map', name: 'Map chart', tag: 'sav-chart-map', group: 'Charts', icon: 'map',
    desc: 'The world coloured by value (a choropleth), or with some countries highlighted; it can zoom on one or more countries. Countries are named in the page language; a click tells which one.',
    demos: [
      { title: 'Values by country', html: `<sav-chart-map label="Visitors by country" style="width: 100%" data='{"US":420,"BR":180,"IT":160,"DE":150,"FR":120,"GB":110,"IN":240,"JP":90,"AU":60,"CA":80,"ZA":30,"MX":70,"ES":65}'></sav-chart-map>` },
      { title: 'Zoom and highlight', html: `<sav-chart-map label="Where we ship" focus="IT,FR,DE,ES,PT,AT,CH" highlight="IT,FR,DE,ES,PT,AT,CH" style="width: 100%; max-width: 30rem"></sav-chart-map>` },
    ],
    attrs: [['data', 'JSON', '{ "IT": 40, "FRA": 12 } — alpha-2 or alpha-3 keys.'], ['highlight', 'list', 'Countries filled with the main colour (without values).'], ['focus', 'list', 'Zoom on these countries.'], ['levels', 'number', 'Colour steps (default 5).'],
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
