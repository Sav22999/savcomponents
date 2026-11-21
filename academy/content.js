/* SavComponents Academy — hand-written content: the Basics path, the hands-on challenges, the badges and the ranks.
   The lesson of every component is built from the documentation data (docs/components.js), so it follows the library. */
(() => {
  'use strict';

  /* ------------------------------------------------------------ Basics: what to know before the components */
  // Each lesson: a few short sections (text and a live example) and its own questions (the first option is the right one;
  // the app shuffles them).
  const BASICS = [
    {
      id: 'basics-start', name: 'Start in two lines', icon: 'rocket',
      sections: [
        { text: 'SavComponents is two files: <code>sav.css</code> and <code>sav.js</code>. Add them to any page and every <code>sav-*</code> tag works, with no build step and no framework.',
          code: '<link rel="stylesheet" href="https://savcomponents.com/v/1.0.0/sav.css">\n<script src="https://savcomponents.com/v/1.0.0/sav.js" defer></script>' },
        { text: 'The address has the version in it (<code>1.0.0</code>): your page keeps working the same way when a newer release comes out. You move to a new version by changing the number, after reading the changelog.' },
        { text: 'Then use the tags like any HTML element. Optional: <code>class="sav-base"</code> on <code>&lt;body&gt;</code> gives the whole page the theme\'s background, text colour and font.',
          demo: '<sav-button>Hello</sav-button>\n<sav-badge variant="success">it works</sav-badge>' },
      ],
      quiz: [
        { q: 'Which files do you add to a page to use SavComponents?', a: ['sav.css and sav.js', 'sav.css only', 'An npm package and a bundler', 'One file per component'] },
        { q: 'Why does the address contain the version number?', a: ['So the page keeps working the same when a new release comes out', 'To load the newest version automatically', 'It is only a label for the browser cache', 'Because each version has different tags'] },
        { q: 'What does class="sav-base" on the body do?', a: ['Uses the theme\'s background, text colour and font for the whole page', 'Loads the components', 'Turns on dark mode', 'Resets every margin to zero'] },
      ],
    },
    {
      id: 'basics-styles', name: 'Five styles', icon: 'palette',
      sections: [
        { text: 'The same components come in five looks: <b>Soft</b> (rounded, the default), <b>Tilt</b> (square shapes whose background leans), <b>Sharp</b> (straight corners, uppercase buttons), <b>Brutal</b> (thick ink borders) and <b>Glass</b> (translucent, blurred surfaces).' },
        { text: 'A style is a class: <code>sav-style-tilt</code>, <code>sav-style-sharp</code>… Put it on <code>&lt;html&gt;</code> for the whole page or on a container for one part of it. Soft needs no class.',
          demo: '<div class="sav-style-sharp" style="display:flex;gap:.5rem;flex-wrap:wrap"><sav-button>Sharp</sav-button><sav-switch checked>On</sav-switch></div>\n<div class="sav-style-brutal" style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem"><sav-button>Brutal</sav-button><sav-switch checked>On</sav-switch></div>' },
        { text: 'One element can change only its own shape with <code>shape="tilt"</code>, <code>shape="squared"</code> or <code>shape="rounded"</code>, whatever style the page uses.',
          demo: '<sav-button shape="tilt">Only this one is tilted</sav-button>' },
      ],
      quiz: [
        { q: 'How do you use the Glass style in one section only?', a: ['class="sav-style-glass" on the section', 'style="glass" on each component', 'A different sav.css file', 'It works only on the whole page'] },
        { q: 'Which style needs no class at all?', a: ['Soft', 'Tilt', 'Sharp', 'Glass'] },
        { q: 'What does shape="squared" on a single button change?', a: ['Only the shape of that button', 'The style of the whole page', 'The colour of the button', 'Its size'] },
      ],
    },
    {
      id: 'basics-modes', name: 'Light and dark', icon: 'moon',
      sections: [
        { text: 'Every component has a light and a dark look. Without a class the page follows the system setting; <code>sav-theme-light</code> or <code>sav-theme-dark</code> on <code>&lt;html&gt;</code> (or on a container) forces one.',
          demo: '<div class="sav-theme-dark sav-base" style="padding:1rem;border-radius:12px"><sav-alert variant="primary" heading="A dark island">This box is dark, whatever the page is.</sav-alert></div>' },
        { text: '<code>sav-theme-choice</code> is a ready-made control that lets visitors pick light, dark or auto, and remembers it.',
          demo: '<sav-theme-choice appearance="buttons"></sav-theme-choice>' },
      ],
      quiz: [
        { q: 'With no theme class, which mode does a page use?', a: ['The one of the system (light or dark)', 'Always light', 'Always dark', 'The one of the last visited site'] },
        { q: 'How do you make just one box dark?', a: ['class="sav-theme-dark" on the box', 'mode="dark" on every component', 'A second copy of sav.css', 'It cannot be done'] },
        { q: 'Which component lets visitors choose light, dark or auto?', a: ['sav-theme-choice', 'sav-switch', 'sav-select', 'sav-toggle-theme'] },
      ],
    },
    {
      id: 'basics-tokens', name: 'Your colours', icon: 'swatch-book',
      sections: [
        { text: 'Colours, radius, fonts, shadows and timing are CSS custom properties (tokens), such as <code>--sav-color-primary</code>. Set them on <code>:root</code> for the whole site, on a container for a section, or on one element.',
          code: ':root {\n  --sav-color-primary: #7c5cff;\n  --sav-radius: 14px;\n}' },
        { text: 'Here only the box changes: its buttons take the new primary colour.',
          demo: '<div style="--sav-color-primary:#e8590c;display:flex;gap:.5rem;flex-wrap:wrap"><sav-button>Orange</sav-button><sav-button appearance="soft">Soft orange</sav-button><sav-progress-bar value="60" style="flex:1;min-width:8rem"></sav-progress-bar></div>' },
        { text: 'Deeper changes use <code>::part()</code>: each component lists the inner parts you can style. Text on coloured backgrounds stays readable with <code>auto-text</code> (black or white, whichever has enough contrast).' },
      ],
      quiz: [
        { q: 'How do you change the main colour of the whole site?', a: ['Set --sav-color-primary on :root', 'Add color="…" to every component', 'Edit sav.js', 'Use the variant attribute'] },
        { q: 'Where can a token be set?', a: ['On :root, on a container or on a single element', 'Only on :root', 'Only in sav.css', 'Only with JavaScript'] },
        { q: 'What does auto-text do?', a: ['Picks black or white text, whichever is readable on the colour behind', 'Translates the text', 'Makes the text bigger on phones', 'Hides text that does not fit'] },
      ],
    },
    {
      id: 'basics-variants', name: 'Variants, appearances, sizes', icon: 'sliders-horizontal',
      sections: [
        { text: 'Most components share three attributes. <code>variant</code> is the meaning of the colour: primary, neutral, success, warning, danger.',
          demo: '<sav-button>Primary</sav-button> <sav-button variant="success">Success</sav-button> <sav-button variant="warning">Warning</sav-button> <sav-button variant="danger">Danger</sav-button>' },
        { text: '<code>appearance</code> is how strong it looks (solid, soft, outline, ghost, link…) and <code>size</code> is sm, md or lg.',
          demo: '<sav-button appearance="soft">Soft</sav-button> <sav-button appearance="outline">Outline</sav-button> <sav-button appearance="ghost">Ghost</sav-button> <sav-button size="sm">Small</sav-button> <sav-button size="lg">Large</sav-button>' },
      ],
      quiz: [
        { q: 'Which attribute says what a colour means (success, danger…)?', a: ['variant', 'appearance', 'color', 'type'] },
        { q: 'Which value of appearance gives a button with only a border?', a: ['outline', 'ghost', 'soft', 'border'] },
        { q: 'Which sizes do the components take?', a: ['sm, md and lg', 'small, normal and big', '1, 2 and 3', 'Any number of pixels'] },
      ],
    },
    {
      id: 'basics-forms', name: 'Forms', icon: 'text-cursor-input',
      sections: [
        { text: 'Form controls are form-associated: give them a <code>name</code> and they are sent with the form like native fields, they are reset by <code>form.reset()</code> and they respect <code>required</code>, <code>min</code>, <code>pattern</code> and the other validation attributes.',
          demo: '<form style="display:grid;gap:.75rem;max-width:20rem" onsubmit="event.preventDefault()"><sav-input name="email" type="email" label="Email" required></sav-input><sav-checkbox name="news">Send me news</sav-checkbox><sav-button type="submit">Subscribe</sav-button></form>' },
        { text: 'They fire <code>input</code> and <code>change</code> like native fields; the value is in <code>.value</code>.', code: 'document.querySelector(\'sav-input\').addEventListener(\'change\', (e) => {\n  console.log(e.target.value);\n});' },
      ],
      quiz: [
        { q: 'What does a sav-input need to be sent with its form?', a: ['A name attribute', 'An id attribute', 'A special form component', 'Nothing: it is never sent'] },
        { q: 'Which events do form controls fire when the value changes?', a: ['input and change, like native fields', 'Only sav-change', 'value-changed', 'None'] },
        { q: 'Does required work on sav-select and sav-checkbox?', a: ['Yes, like on native fields', 'Only on sav-input', 'Only with JavaScript', 'No'] },
      ],
    },
    {
      id: 'basics-events', name: 'Events and JavaScript', icon: 'zap',
      sections: [
        { text: 'Components that are not form fields fire events that start with <code>sav-</code>: <code>sav-select</code> on a menu, <code>sav-show</code> and <code>sav-hide</code> on a dialog, <code>sav-tab-show</code> on tabs… The details are in <code>event.detail</code>.',
          code: 'menu.addEventListener(\'sav-select\', (e) => {\n  console.log(e.detail.value);\n});' },
        { text: 'Many components have methods too, such as <code>dialog.show()</code> and <code>dialog.hide()</code>, and <code>Sav.toast()</code> shows a message from anywhere.',
          demo: '<sav-button onclick="Sav.toast(\'Saved\', { variant: \'success\' })">Show a toast</sav-button>' },
      ],
      quiz: [
        { q: 'How do the library events (not the form ones) start?', a: ['With sav-', 'With on', 'With component-', 'They have no prefix'] },
        { q: 'Where are the details of a library event?', a: ['In event.detail', 'In event.target.dataset', 'In window.Sav.last', 'In the URL'] },
        { q: 'How do you show a toast message from JavaScript?', a: ['Sav.toast(\'Saved\')', 'new SavToast(\'Saved\')', 'alert(\'Saved\')', 'document.toast(\'Saved\')'] },
      ],
    },
    {
      id: 'basics-a11y', name: 'Accessible by default', icon: 'accessibility',
      sections: [
        { text: 'Every component aims at WCAG 2.2 level AA: keyboard use, visible focus, roles and names for screen readers, enough contrast, and motion that follows the system setting "reduce motion".' },
        { text: 'You still give names where only you know them: a button with only an icon needs <code>label</code>, so screen readers can say what it does.',
          demo: '<sav-button icon="trash" label="Delete" variant="danger" appearance="outline"></sav-button> <sav-button icon="share" label="Share" appearance="soft"></sav-button>' },
      ],
      quiz: [
        { q: 'What must a button with only an icon have?', a: ['A label, so screen readers can name it', 'A title in bold', 'A bigger size', 'Nothing: the icon is enough'] },
        { q: 'Which WCAG level do the components aim at?', a: ['2.2 AA', '1.0 A', '2.2 AAA for everything', 'None'] },
        { q: 'What happens to animations when the system asks to reduce motion?', a: ['The components follow that setting', 'Nothing', 'The page is blocked', 'Only charts stop'] },
      ],
    },
    {
      id: 'basics-motion', name: 'Animations', icon: 'sparkles',
      sections: [
        { text: 'Components animate their changes. <code>animation="off"</code> turns animations off on a component or on a container around several; <code>animation-duration</code> (50–1000 ms) sets their pace on one component.',
          demo: '<sav-switch checked animation-duration="900">Slow switch</sav-switch>\n<sav-switch checked animation="off">No animation</sav-switch>' },
        { text: 'For a whole page or section, the CSS token <code>--sav-motion</code> is a factor: 0 none, 1 normal, 2 twice as long.' },
      ],
      quiz: [
        { q: 'How do you turn off the animations of everything in a section?', a: ['animation="off" on the section', 'motion="none" on each component', 'Remove sav.js', 'It cannot be done'] },
        { q: 'What does --sav-motion: 2 do?', a: ['Animations last twice as long', 'Two animations play at once', 'Animations are off', 'Only two components animate'] },
        { q: 'Which values does animation-duration take?', a: ['From 50 to 1000 ms', 'Any value in seconds', 'slow, normal or fast', 'From 0 to 1'] },
      ],
    },
  ];

  /* ------------------------------------------------------------ Challenges: build something, the page checks it live */
  // checks: q = a CSS selector that must match (min, default 1; count = exactly; none = must not match);
  // text = one of the matches contains it; test = a JS expression on one of the matches (el), run inside the preview.
  const C = (id, level, name, component, brief, starter, checks, hint) => ({ id, level, name, component, brief, starter, checks, hint });
  const CHALLENGES = [
    // Level 1
    C('ch-first-button', 1, 'Your first button', 'button', 'Add a button that says <b>Save</b>.', '<!-- Write your HTML here -->\n',
      [{ label: 'A sav-button', q: 'sav-button' }, { label: 'It says "Save"', q: 'sav-button', text: 'save' }],
      '<sav-button>…</sav-button>'),
    C('ch-danger', 1, 'A dangerous action', 'button', 'A button <b>Delete</b> in the danger colour, with only a border (outline).', '',
      [{ label: 'Danger colour', q: 'sav-button[variant="danger"]' }, { label: 'Outline appearance', q: 'sav-button[variant="danger"][appearance="outline"]' }, { label: 'It says "Delete"', q: 'sav-button[variant="danger"]', text: 'delete' }],
      'variant="danger" and appearance="outline"'),
    C('ch-icon-only', 1, 'Icon only, still clear', 'button', 'A button with only the <b>heart</b> icon. Screen readers must be able to call it "Like".', '',
      [{ label: 'A heart icon', q: 'sav-button[icon="heart"]' }, { label: 'Named "Like" for screen readers', q: 'sav-button[icon="heart"]', test: "/like/i.test(el.getAttribute('label') || el.getAttribute('aria-label') || '')" }, { label: 'No visible text', q: 'sav-button[icon="heart"]', test: "!el.textContent.trim()" }],
      'icon="heart" label="Like"'),
    C('ch-alert', 1, 'Tell them it worked', 'alert', 'A <b>success</b> alert with the heading <b>Saved</b> and one sentence inside.', '',
      [{ label: 'A success alert', q: 'sav-alert[variant="success"]' }, { label: 'Heading "Saved"', q: 'sav-alert[variant="success"]', test: "/saved/i.test(el.getAttribute('heading') || '')" }, { label: 'A sentence inside', q: 'sav-alert', test: 'el.textContent.trim().length > 5' }],
      '<sav-alert variant="success" heading="…">…</sav-alert>'),
    C('ch-badge', 1, 'Count the messages', 'badge', 'A button <b>Inbox</b> with a badge that shows <b>3</b> inside it.', '',
      [{ label: 'A button "Inbox"', q: 'sav-button', text: 'inbox' }, { label: 'A badge inside the button', q: 'sav-button sav-badge' }, { label: 'The badge says 3', q: 'sav-button sav-badge', text: '3' }],
      '<sav-button>Inbox <sav-badge>…</sav-badge></sav-button>'),
    C('ch-input', 1, 'Ask for an email', 'input', 'A field labelled <b>Email</b>, of type email, that must be filled in.', '',
      [{ label: 'A sav-input of type email', q: 'sav-input[type="email"]' }, { label: 'Labelled "Email"', q: 'sav-input[type="email"]', test: "/email/i.test(el.getAttribute('label') || '')" }, { label: 'Required', q: 'sav-input[type="email"][required]' }],
      'type="email" label="Email" required'),
    C('ch-switch', 1, 'A switch that starts on', 'checkbox', 'A switch <b>Dark sidebar</b> that is already on.', '',
      [{ label: 'A sav-switch', q: 'sav-switch' }, { label: 'Already on', q: 'sav-switch[checked]' }, { label: 'It says "Dark sidebar"', q: 'sav-switch', text: 'dark sidebar' }],
      '<sav-switch checked>…</sav-switch>'),
    C('ch-select', 1, 'Pick a fruit', 'select', 'A select labelled <b>Fruit</b> with at least three options.', '',
      [{ label: 'A sav-select labelled "Fruit"', q: 'sav-select', test: "/fruit/i.test(el.getAttribute('label') || '')" }, { label: 'At least three options', q: 'sav-select option', min: 3 }],
      '<sav-select label="Fruit"><option value="…">…</option>…</sav-select>'),
    C('ch-progress', 1, 'Almost there', 'progress', 'A progress bar at <b>75</b> that shows its value.', '',
      [{ label: 'A sav-progress-bar', q: 'sav-progress-bar' }, { label: 'At 75', q: 'sav-progress-bar[value="75"]' }, { label: 'Shows the value', q: 'sav-progress-bar[show-value]' }],
      'value="75" show-value'),
    C('ch-kbd', 1, 'A keyboard shortcut', 'kbd', 'Show the shortcut <b>mod+K</b> (⌘K on a Mac, Ctrl K elsewhere).', '<p>Search: </p>',
      [{ label: 'A sav-kbd', q: 'sav-kbd' }, { label: 'mod+K', q: 'sav-kbd', test: "/^mod\\+k$/i.test((el.getAttribute('keys') || el.textContent).trim())" }],
      '<sav-kbd>…</sav-kbd>'),
    C('ch-card', 1, 'A simple card', 'card', 'A card with a title in its <b>header</b>, a sentence, and a button in its <b>footer</b>.', '',
      [{ label: 'A sav-card', q: 'sav-card' }, { label: 'A header', q: 'sav-card > [slot="header"]' }, { label: 'A button in the footer', q: 'sav-card sav-button[slot="footer"], sav-card [slot="footer"] sav-button' }],
      '<strong slot="header">…</strong> and <sav-button slot="footer">…</sav-button>'),
    C('ch-avatar', 1, 'Who is there', 'avatar', 'An avatar for <b>Ada Lovelace</b>, large, in the primary colour.', '',
      [{ label: 'A sav-avatar named Ada Lovelace', q: 'sav-avatar', test: "/ada lovelace/i.test(el.getAttribute('label') || '')" }, { label: 'Large (lg or xl)', q: 'sav-avatar[size="lg"], sav-avatar[size="xl"]' }, { label: 'Primary colour', q: 'sav-avatar[variant="primary"]' }],
      'label="…" size="lg" variant="primary"'),
    // Level 2
    C('ch-radio-buttons', 2, 'Day, week, month', 'radio', 'A choice of <b>Day</b>, <b>Week</b> and <b>Month</b> drawn as buttons, with Week chosen.', '',
      [{ label: 'A radio group drawn as buttons', q: 'sav-radio-group[appearance="buttons"]' }, { label: 'Three choices', q: 'sav-radio-group sav-radio', count: 3 }, { label: 'Week is chosen', q: 'sav-radio-group', test: "(() => { const v = el.getAttribute('value'); const r = [...el.querySelectorAll('sav-radio')].find((x) => x.getAttribute('value') === v || x.hasAttribute('checked')); return !!r && /week/i.test(r.textContent + (r.getAttribute('value') || '')); })()" }],
      '<sav-radio-group appearance="buttons" value="week"><sav-radio value="day">Day</sav-radio>…'),
    C('ch-tabs', 2, 'Three tabs', 'tabs', 'Tabs <b>Overview</b>, <b>Activity</b> and <b>Settings</b>, each with its content; Settings has the <b>settings</b> icon.', '',
      [{ label: 'A sav-tabs', q: 'sav-tabs' }, { label: 'Three tabs with a label', q: 'sav-tabs sav-tab[label]', count: 3 }, { label: 'Settings has its icon', q: 'sav-tab[icon="settings"]', test: "/settings/i.test(el.getAttribute('label'))" }, { label: 'Each tab has content', q: 'sav-tabs', test: "[...el.querySelectorAll('sav-tab')].every((t) => t.textContent.trim())" }],
      '<sav-tab label="Overview">…</sav-tab>'),
    C('ch-accordion', 2, 'Frequently asked', 'accordion', 'An accordion of three questions where only one can be open at a time.', '',
      [{ label: 'A sav-accordion, one open at a time', q: 'sav-accordion[exclusive]' }, { label: 'Three questions', q: 'sav-accordion sav-details[summary]', count: 3 }, { label: 'Every answer is written', q: 'sav-accordion', test: "[...el.querySelectorAll('sav-details')].every((t) => t.textContent.trim())" }],
      '<sav-accordion exclusive><sav-details summary="…">…</sav-details>…'),
    C('ch-dialog', 2, 'Confirm before deleting', 'dialog', 'A dialog <b>Delete project?</b> with two footer buttons that close it (Cancel, Delete), and a button that opens it.', '',
      [{ label: 'A sav-dialog with a title', q: 'sav-dialog[label]' }, { label: 'Two buttons in its footer', q: 'sav-dialog [slot="footer"]', min: 2 }, { label: 'They close the dialog', q: 'sav-dialog [slot="footer"][data-sav-close]', min: 2 }, { label: 'A button opens it', q: 'sav-button[onclick*="show"]' }],
      'onclick="document.getElementById(\'…\').show()" and data-sav-close on the footer buttons'),
    C('ch-dropdown', 2, 'An actions menu', 'dropdown', 'A dropdown opened by a button <b>Actions</b>, with three items; the last is <b>Delete</b>, in the danger colour.', '',
      [{ label: 'A sav-dropdown', q: 'sav-dropdown' }, { label: 'A trigger button', q: 'sav-dropdown > [slot="trigger"]' }, { label: 'Three items', q: 'sav-dropdown sav-menu-item', min: 3 }, { label: 'A danger "Delete" item', q: 'sav-menu-item[variant="danger"]', text: 'delete' }],
      '<sav-button slot="trigger">Actions</sav-button><sav-menu-item>…</sav-menu-item>'),
    C('ch-breadcrumb', 2, 'Where am I', 'breadcrumb', 'A breadcrumb <b>Home › Projects › Website</b>; the first two are links.', '',
      [{ label: 'A sav-breadcrumb', q: 'sav-breadcrumb' }, { label: 'Three items', q: 'sav-breadcrumb sav-breadcrumb-item', count: 3 }, { label: 'The first two are links', q: 'sav-breadcrumb-item[href]', min: 2 }],
      '<sav-breadcrumb-item href="#">Home</sav-breadcrumb-item>…'),
    C('ch-steps', 2, 'Checkout steps', 'steps', 'Steps <b>Cart</b>, <b>Shipping</b>, <b>Payment</b>; the user is on the second.', '',
      [{ label: 'A sav-steps on step 2', q: 'sav-steps[current="2"]' }, { label: 'Three steps with a label', q: 'sav-steps sav-step[label]', count: 3 }],
      '<sav-steps current="2"><sav-step label="Cart"></sav-step>…'),
    C('ch-bottom-nav', 2, 'App navigation', 'bottom-nav', 'A bottom navigation with four items, each with an icon and a label; Home is the current one.', '',
      [{ label: 'A sav-bottom-nav', q: 'sav-bottom-nav' }, { label: 'Four items with icon and label', q: 'sav-bottom-nav-item[icon][label]', count: 4 }, { label: 'Home is current', q: 'sav-bottom-nav-item[current]', test: "/home/i.test(el.getAttribute('label'))" }],
      '<sav-bottom-nav-item icon="home" label="Home" current></sav-bottom-nav-item>'),
    C('ch-rating', 2, 'Rate it', 'rating', 'A rating of <b>4</b> stars with a label, that people cannot change.', '',
      [{ label: 'A sav-rating at 4', q: 'sav-rating[value="4"]' }, { label: 'With a label', q: 'sav-rating[label]' }, { label: 'Read only', q: 'sav-rating[readonly]' }],
      'value="4" label="…" readonly'),
    C('ch-date', 2, 'Book a check-in', 'date-picker', 'A date picker <b>Check-in</b> that does not allow days before 2027-01-01.', '',
      [{ label: 'A sav-date-picker labelled Check-in', q: 'sav-date-picker', test: "/check/i.test(el.getAttribute('label') || '')" }, { label: 'From 2027-01-01', q: 'sav-date-picker[min="2027-01-01"]' }],
      'min="2027-01-01"'),
    C('ch-form', 2, 'A sign-up form', 'input', 'A <code>&lt;form&gt;</code> with a required email, a password, a required checkbox to accept the terms and a submit button.', '<form>\n\n</form>',
      [{ label: 'An email field, required, with a name', q: 'form sav-input[type="email"][required][name]' }, { label: 'A password field with a name', q: 'form sav-input[type="password"][name], form sav-password[name]' }, { label: 'A required checkbox', q: 'form sav-checkbox[required]' }, { label: 'A submit button', q: 'form sav-button[type="submit"]' }],
      'name="…" on every field, type="submit" on the button'),
    C('ch-table', 2, 'A sortable table', 'table', 'A table people can sort, with three columns (the last is a number) and at least two rows.', '',
      [{ label: 'A sortable sav-table', q: 'sav-table[sortable] table' }, { label: 'Three column titles', q: 'sav-table thead th', count: 3 }, { label: 'A number column', q: 'sav-table th.num' }, { label: 'At least two rows', q: 'sav-table tbody tr', min: 2 }],
      '<sav-table sortable><table><thead><tr><th>…</th><th class="num">…</th>…'),
    // Level 3
    C('ch-header', 3, 'A site header', 'header', 'A header with a logo, three links (one is the current page) and a search.', '',
      [{ label: 'A sav-header with a logo', q: 'sav-header > [slot="logo"]' }, { label: 'At least three links', q: 'sav-header > a:not([slot])', min: 3 }, { label: 'One is the current page', q: 'sav-header > a[aria-current="page"]' }, { label: 'A search', q: 'sav-header > sav-search[slot="search"]' }],
      '<a slot="logo" href="#">…</a> <a href="#" aria-current="page">…</a> <sav-search slot="search"></sav-search>'),
    C('ch-chart-bar', 3, 'Quarterly sales', 'chart-bar', 'A bar chart named <b>Sales</b> with four quarters and two years (two series).', '',
      [{ label: 'A sav-chart-bar with a label', q: 'sav-chart-bar[label]' }, { label: 'Four labels', q: 'sav-chart-bar[data]', test: "JSON.parse(el.getAttribute('data')).labels.length === 4" }, { label: 'Two series', q: 'sav-chart-bar[data]', test: "JSON.parse(el.getAttribute('data')).series.length === 2" }],
      'data=\'{"labels":["Q1","Q2","Q3","Q4"],"series":[{"name":"2025","values":[…]},…]}\''),
    C('ch-glass', 3, 'A glass section', 'card', 'A section in the <b>Glass</b> style, on a colourful background, with a card and a button inside.', '',
      [{ label: 'A container with the Glass style', q: '.sav-style-glass' }, { label: 'A card inside it', q: '.sav-style-glass sav-card' }, { label: 'A button inside it', q: '.sav-style-glass sav-button' }, { label: 'A background of its own', q: '.sav-style-glass', test: "(el.getAttribute('style') || '').includes('background')" }],
      '<div class="sav-style-glass" style="background: linear-gradient(…); padding: 1rem">…</div>'),
    C('ch-brand', 3, 'Your brand colour', 'button', 'A section whose primary colour is <b>#e8590c</b>, with a solid and a soft button in it.', '',
      [{ label: 'A container that sets --sav-color-primary', q: '[style*="--sav-color-primary"]' }, { label: 'To #e8590c', q: '[style*="--sav-color-primary"]', test: "/#e8590c/i.test(el.getAttribute('style'))" }, { label: 'Two buttons inside, one soft', q: '[style*="--sav-color-primary"] sav-button[appearance="soft"]' }],
      'style="--sav-color-primary: #e8590c"'),
    C('ch-dark-island', 3, 'A dark island', 'alert', 'A dark box in any page, with the theme background and an alert inside.', '',
      [{ label: 'A container forced dark', q: '.sav-theme-dark' }, { label: 'With the theme background (sav-base)', q: '.sav-theme-dark.sav-base' }, { label: 'An alert inside', q: '.sav-theme-dark sav-alert' }],
      'class="sav-theme-dark sav-base"'),
    C('ch-calm', 3, 'A calm section', 'tabs', 'A section without animations, with tabs and a switch inside.', '',
      [{ label: 'Animations off on a container', q: '[animation="off"]:not(sav-tabs):not(sav-switch)' }, { label: 'Tabs inside it', q: '[animation="off"] sav-tabs' }, { label: 'A switch inside it', q: '[animation="off"] sav-switch' }],
      '<div animation="off">…</div>'),
    C('ch-tooltip', 3, 'Explain the icon', 'tooltip', 'An icon-only settings button (with a label) that shows the tooltip <b>Settings</b>.', '',
      [{ label: 'A sav-tooltip "Settings"', q: 'sav-tooltip', test: "/settings/i.test(el.getAttribute('content') || '')" }, { label: 'An icon button inside it', q: 'sav-tooltip sav-button[icon]' }, { label: 'The button has a label', q: 'sav-tooltip sav-button[icon][label]' }],
      '<sav-tooltip content="Settings"><sav-button icon="settings" label="Settings"></sav-button></sav-tooltip>'),
    C('ch-empty', 3, 'Nothing here yet', 'empty-state', 'An empty state with an icon, a heading, a sentence and a button to start.', '',
      [{ label: 'A sav-empty-state with an icon', q: 'sav-empty-state[icon]' }, { label: 'A heading and a text', q: 'sav-empty-state[heading][text]' }, { label: 'A button', q: 'sav-empty-state sav-button' }],
      '<sav-empty-state icon="inbox" heading="…" text="…"><sav-button>…</sav-button></sav-empty-state>'),
    C('ch-stat', 3, 'A KPI card', 'stat', 'A stat <b>Monthly revenue</b> of 48,200 with a change of +12% going up.', '',
      [{ label: 'A sav-stat with label and value', q: 'sav-stat[label][value]' }, { label: 'A change', q: 'sav-stat[change]' }, { label: 'Trend up', q: 'sav-stat[trend="up"]' }],
      'label="Monthly revenue" value="48,200" change="+12%" trend="up"'),
    C('ch-timeline', 3, 'Order tracking', 'timeline', 'A timeline of three events with a time and a heading; the last one is green (success).', '',
      [{ label: 'A sav-timeline', q: 'sav-timeline' }, { label: 'Three events with time and heading', q: 'sav-timeline-item[time][heading]', count: 3 }, { label: 'The last is success', q: 'sav-timeline-item:last-of-type[variant="success"]' }],
      '<sav-timeline-item time="…" heading="…" variant="success"></sav-timeline-item>'),
  ];

  /* ------------------------------------------------------------ Badges (computed from the progress; each gives 25 XP) */
  const GROUP_BADGE = {
    Actions: ['Action hero', 'mouse-pointer-click'], Feedback: ['Good listener', 'message-square'], Forms: ['Form master', 'text-cursor-input'],
    Layout: ['Layout architect', 'layout-grid'], Content: ['Storyteller', 'file-text'], Media: ['Media maker', 'film'], Overlays: ['Layer cake', 'layers'],
    Navigation: ['Pathfinder', 'compass'], Charts: ['Data artist', 'chart-column'], Sections: ['Section builder', 'panel-top'], Basics: ['Solid foundations', 'graduation-cap'],
  };
  const BADGES = [
    { id: 'first-lesson', name: 'First steps', icon: 'footprints', desc: 'Finish your first lesson.', test: (c) => c.lessons >= 1 },
    { id: 'lessons-10', name: 'Curious', icon: 'book-open', desc: 'Finish 10 lessons.', test: (c) => c.lessons >= 10 },
    { id: 'lessons-40', name: 'Explorer', icon: 'map', desc: 'Finish 40 lessons.', test: (c) => c.lessons >= 40 },
    { id: 'lessons-all', name: 'Encyclopaedia', icon: 'library', desc: 'Finish every lesson.', test: (c) => c.lessons >= c.allLessons },
    { id: 'perfect-1', name: 'Flawless', icon: 'target', desc: 'Answer every question of a lesson right.', test: (c) => c.perfect >= 1 },
    { id: 'perfect-20', name: 'Sharp mind', icon: 'brain', desc: 'Answer every question right in 20 lessons.', test: (c) => c.perfect >= 20 },
    { id: 'challenge-1', name: 'Hands on', icon: 'hammer', desc: 'Complete your first challenge.', test: (c) => c.challenges >= 1 },
    { id: 'challenge-10', name: 'Builder', icon: 'wrench', desc: 'Complete 10 challenges.', test: (c) => c.challenges >= 10 },
    { id: 'challenge-hard', name: 'Up for it', icon: 'mountain', desc: 'Complete a level 3 challenge.', test: (c) => c.hard >= 1 },
    { id: 'challenge-all', name: 'Master builder', icon: 'crown', desc: 'Complete every challenge.', test: (c) => c.challenges >= c.allChallenges },
    { id: 'daily-1', name: 'Daily habit', icon: 'calendar-check', desc: 'Play the daily quiz.', test: (c) => c.dailies >= 1 },
    { id: 'daily-10', name: 'Regular', icon: 'calendar-days', desc: 'Play the daily quiz on 10 days.', test: (c) => c.dailies >= 10 },
    { id: 'streak-3', name: 'On a roll', icon: 'flame', desc: 'Learn 3 days in a row.', test: (c) => c.bestStreak >= 3 },
    { id: 'streak-7', name: 'Week warrior', icon: 'zap', desc: 'Learn 7 days in a row.', test: (c) => c.bestStreak >= 7 },
    { id: 'streak-30', name: 'Unstoppable', icon: 'rocket', desc: 'Learn 30 days in a row.', test: (c) => c.bestStreak >= 30 },
    { id: 'styles-all', name: 'Style shifter', icon: 'palette', desc: 'Try all five styles in the Academy.', test: (c) => c.styles >= 5 },
    { id: 'dark-mode', name: 'Night owl', icon: 'moon', desc: 'Learn in dark mode.', test: (c) => c.dark },
    { id: 'level-5', name: 'Rising', icon: 'trending-up', desc: 'Reach level 5.', test: (c) => c.level >= 5, byLevel: true },
    { id: 'level-10', name: 'Expert', icon: 'medal', desc: 'Reach level 10.', test: (c) => c.level >= 10, byLevel: true },
    { id: 'level-20', name: 'Legend', icon: 'trophy', desc: 'Reach level 20.', test: (c) => c.level >= 20, byLevel: true },
  ];

  /* ------------------------------------------------------------ Ranks: a name for the levels */
  const RANKS = [[1, 'Newcomer'], [2, 'Apprentice'], [3, 'Tinkerer'], [5, 'Builder'], [7, 'Crafter'], [9, 'Designer'], [12, 'Architect'], [15, 'Master'], [20, 'Legend']];

  window.SavAcademyContent = { BASICS, CHALLENGES, BADGES, GROUP_BADGE, RANKS };
})();
