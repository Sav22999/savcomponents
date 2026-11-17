/* SavComponents docs — the reference part of each component page: every attribute, slot, event and method gets a description,
   the code to use it and, where it can be shown, a live preview. Events log what they fire; methods can be run from the page.
   Each card is filled the first time it is opened, so a page with many options stays light. */
(() => {
  'use strict';
  const D = () => window.SavDocs; // read when a page is drawn (docs.js loads after this file)
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const VARIANTS = ['primary', 'neutral', 'success', 'warning', 'danger'];

  /* ------------------------------------------------------------ words used when a table row has no description of its own */

  const COMMON = {
    label: 'The name of the field, shown above it and read by screen readers.',
    help: 'A short hint under the field. It turns red when the value is not valid.',
    placeholder: 'Grey text shown while the field is empty.',
    value: 'The current value. From code, read or change it with the value property.',
    min: 'The smallest value allowed.', max: 'The largest value allowed.', step: 'How much the value changes at each step.',
    size: 'How big it is: sm (small), md (medium, the default) or lg (large).',
    variant: 'The colour, taken from the theme: primary, neutral, success, warning or danger.',
    appearance: 'The look of the component.', pill: 'Fully rounded ends.',
    disabled: 'Greyed out: it cannot be used, and a form does not send it.', readonly: 'The value can be read and copied but not changed.',
    required: 'A form cannot be sent while this is empty.', name: 'The name of the field when the form is sent.',
    clearable: 'An × button empties the field.', 'password-toggle': 'An eye button shows or hides the password.',
    icon: 'The name of an icon from the icon set (see the Icon page).', href: 'Turns it into a link to this address.',
    target: 'Where the link opens: _blank for a new tab.', type: 'The kind of value it holds.', open: 'Open while present; remove it to close.',
    checked: 'Ticked (on) while present.', loading: 'A spinner shows and clicks are ignored while something is in progress.',
    heading: 'A bold title at the top.', closable: 'An × button closes it.', removable: 'An × button removes it.',
    multiple: 'More than one choice at a time.', 'sheet-on-mobile': 'On phones it opens as a sheet from the bottom of the screen.',
    'native-on-mobile': 'On phones it uses the phone’s own picker.', placement: 'On which side of its element it opens.',
    unit: 'Text written after the value.', labels: 'Labels under the track, separated by commas.', 'show-value': 'Shows the value next to the label.',
    shape: 'Shape of this component only, whatever the page style.', minlength: 'Fewest characters accepted.', maxlength: 'Most characters accepted.',
    pattern: 'A regular expression the value has to match.', autocomplete: 'What the browser may fill in by itself (email, name, one-time-code…).',
  };
  const BOOL = new Set(['disabled', 'readonly', 'required', 'checked', 'open', 'multiple', 'pill', 'clearable', 'loading', 'closable', 'removable', 'autofocus', 'interactive', 'sheet-on-mobile', 'native-on-mobile']);
  /** values used to show an attribute in a preview when the component's own example has none */
  const EX = {
    label: 'Your name', help: 'A short hint under the field.', placeholder: 'Type here…', heading: 'Heads up', unit: ' kg', prefix: '€ ',
    icon: 'heart', content: 'A short explanation.', title: 'A title', description: 'A short description', subtitle: 'A subtitle',
    min: '0', max: '10', step: '2', value: '4', minlength: '3', maxlength: '20', href: '#', target: '_blank', labels: 'Low, Medium, High',
    'start-label': 'From', 'end-label': 'To', 'decrease-label': 'Fewer', 'increase-label': 'More', eyebrow: 'New', initials: 'AL',
  };
  const SLOT_EX = {
    label: '<span slot="label">Your <b>name</b></span>', help: '<span slot="help">See the <a href="#">rules</a>.</span>',
    prefix: '<sav-icon slot="prefix" name="search"></sav-icon>', suffix: '<sav-icon slot="suffix" name="arrow-right"></sav-icon>',
    header: '<strong slot="header">Title</strong>', footer: '<div slot="footer"><sav-button size="sm">Action</sav-button></div>',
    media: '<img slot="media" src="docs/sample.svg" alt="" height="120">', icon: '<sav-icon slot="icon" name="star"></sav-icon>',
  };
  const ARG = { n: '2', count: '2', msg: "'Please choose another one'", message: "'Please choose another one'", text: "'Hello!'", index: '0', i: '0', ms: '3000', duration: '3000', name: "'heart'", options: '{}' };
  const RET = { checkValidity: 'boolean', reportValidity: 'boolean' };
  const DETAIL_TYPE = { checked: 'boolean', open: 'boolean', index: 'number', count: 'number', page: 'number', start: 'number | string', end: 'number | string' };
  const METHOD_DESC = {
    focus: 'Moves the keyboard focus to it.', blur: 'Takes the keyboard focus away.', select: 'Selects all the text in the field.',
    checkValidity: 'True when the value is valid, without showing anything to the user.', reportValidity: 'Checks the value and shows the message to the user when it is not valid; true when valid.',
    setCustomValidity: 'Marks the field as not valid with your own message; an empty text makes it valid again.',
    show: 'Opens it.', hide: 'Closes it.', toggle: 'Opens it when closed, closes it when open.', close: 'Closes it.',
  };

  /* ------------------------------------------------------------ helpers */

  const names = (cell) => String(cell).split(' · ').map((x) => x.trim()).filter(Boolean);
  const attrName = (n) => /^[a-z][a-z0-9-]*$/.test(n);
  const firstTag = (d) => (String(d.tag).match(/sav-[a-z-]+/) || [''])[0];
  const attrStr = (attrs) => Object.entries(attrs).filter(([, v]) => v !== false && v !== null && v !== undefined && v !== '').map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`)).join('');
  const mk = (tag, attrs, inner = '', style = '') => `<${tag}${attrStr(attrs)}${style ? ` style="${esc(style)}"` : ''}>${inner}</${tag}>`;
  function base(d) {
    if (!d.play) return null;
    return { tag: d.play.tag, attrs: { ...(d.play.attrs || {}) }, inner: (d.play.text !== undefined ? esc(d.play.text) : '') + (d.play.children || '') };
  }
  /** lines of the demos that use a word (attribute, slot or event), for components without a playground */
  function fromDemos(d, re) {
    for (const x of d.demos || []) {
      const lines = x.html.split('\n').filter((l) => re.test(l));
      if (lines.length) return { title: x.title, code: lines.slice(0, 4).map((l) => l.trim()).join('\n') };
    }
    return null;
  }
  const fromDemosHtml = (d, found) => `<p class="muted small">From the example “<a href="#${d.id}?s=${D().slug(found.title)}">${esc(found.title)}</a>” above:</p>${D().codeBlock(found.code)}`;
  const descOf = (list, own) => esc(D().plain(own)) || list.map((n) => COMMON[n]).filter(Boolean).map(esc).join(' ') || '';
  const card = (kind, i, nameHtml, typeHtml, desc) => `<sav-details appearance="plain" class="ref-card" data-kind="${kind}" data-i="${i}">
      <span slot="summary" class="ref-sum"><span class="ref-name">${nameHtml}${typeHtml ? `<span class="ref-type">${typeHtml}</span>` : ''}</span>${desc ? `<span class="ref-desc">${desc}</span>` : ''}</span>
      <div class="ref-body"></div></sav-details>`;
  const caseHtml = (html, caption) => `<figure class="ref-case"><div class="ref-view">${html}</div>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
  const jsTs = (js, ts) => `<sav-tabs class="code-tabs boxed ref-tabs"><sav-tab label="JavaScript" name="js">${D().codeBlock(js, 'js')}</sav-tab><sav-tab label="TypeScript" name="ts">${D().codeBlock(ts, 'ts')}</sav-tab></sav-tabs>`;

  /* ------------------------------------------------------------ attributes */

  function attrRows(d) {
    const rows = [...(d.attrs || [])];
    if (d.tag.startsWith('sav-') && !rows.some((r) => names(r[0]).includes('shape'))) rows.push(['shape', 'tilt · squared · rounded', 'Shape of this component only, whatever the page style. See <a href="#styles">Styles</a>.']);
    return rows;
  }
  function attrBody(d, row) {
    const [cell, values = ''] = row;
    const list = names(cell);
    const b = base(d);
    if (list.every((n) => n.startsWith('--')) || /CSS/.test(values)) {
      const ex = list.filter((n) => n.startsWith('--')).map((n) => `${n}: ${/colou?r|bg|fill|empty|ink/.test(n) ? 'var(--sav-color-success)' : /width|size|gap|padding|height|radius/.test(n) ? '2rem' : '…'}`);
      const style = ex.filter((x) => !x.endsWith('…')).join('; ');
      const code = b ? mk(b.tag, b.attrs, b.inner, ex.join('; ')) : `<${firstTag(d)} style="${ex.join('; ')}">…</${firstTag(d)}>`;
      return (b && style ? `<div class="ref-prev">${caseHtml(mk(b.tag, b.attrs, b.inner), 'default')}${caseHtml(mk(b.tag, b.attrs, b.inner, style), esc(style))}</div>` : '')
        + D().codeBlock(code) + '<p class="muted small">A CSS custom property: set it in <code>style</code>, in a class, or on a parent to change every component inside.</p>';
    }
    const attrs = list.filter(attrName);
    if (!attrs.length) return `<p class="muted small">${esc(cell)}</p>`;
    const isBool = (a) => values === 'boolean' || (BOOL.has(a) && (!values || /boolean/.test(values)));
    if (!b) {
      const found = fromDemos(d, new RegExp(`\\s(${attrs.map((a) => a.replace(/-/g, '\\-')).join('|')})(=|\\s|>)`));
      return found ? fromDemosHtml(d, found) : D().codeBlock(`<${firstTag(d)} ${attrs.map((a) => (isBool(a) ? a : `${a}="…"`)).join(' ')}>…</${firstTag(d)}>`);
    }
    const rest = { ...b.attrs };
    attrs.forEach((a) => delete rest[a]);
    const cases = [];
    let opts = /·/.test(values) && !/…/.test(values) && attrs.length === 1 ? names(values).filter((v) => /^[a-z0-9-]+$/.test(v)) : null;
    if (attrs.length === 1 && attrs[0] === 'variant') opts = VARIANTS;
    if (opts && opts.length > 1 && !/number|string|date/.test(values)) {
      for (const o of opts.slice(0, 6)) cases.push([mk(b.tag, { ...rest, [attrs[0]]: o }, b.inner), `${attrs[0]}="${esc(o)}"`]);
    } else if (attrs.every(isBool)) {
      cases.push([mk(b.tag, rest, b.inner), 'without']);
      for (const a of attrs.slice(0, 4)) cases.push([mk(b.tag, { ...rest, [a]: true }, b.inner), `with ${a}`]);
    } else {
      const set = {};
      for (const a of attrs) { const v = b.attrs[a] ?? EX[a]; if (v !== undefined && v !== '') set[a] = isBool(a) ? true : v; }
      if (Object.keys(set).length) {
        if (attrs.every((a) => b.attrs[a] === undefined)) cases.push([mk(b.tag, rest, b.inner), 'without']);
        cases.push([mk(b.tag, { ...rest, ...set }, b.inner), esc(attrStr(set).trim())]);
      }
    }
    const shown = cases.filter(([, cap]) => cap !== 'without').map(([h]) => h);
    const code = shown.length ? shown.join('\n') : mk(b.tag, { ...rest, ...Object.fromEntries(attrs.map((a) => [a, isBool(a) ? true : '…'])) }, b.inner);
    const prop = attrs.length === 1 && !isBool(attrs[0]) && /^(value|label|placeholder|min|max|step|start|end)$/.test(attrs[0]) ? attrs[0] : null;
    const boolA = attrs.find(isBool);
    return (cases.length ? `<div class="ref-prev">${cases.map(([h, c]) => caseHtml(h, c)).join('')}</div>` : '') + D().codeBlock(code)
      + (prop ? `<p class="muted small">From JavaScript: <code>el.${prop} = …</code> or <code>el.setAttribute('${prop}', …)</code>.</p>` : '')
      + (boolA ? `<p class="muted small">A boolean attribute: present means on, missing means off. From JavaScript: <code>el.toggleAttribute('${boolA}', true)</code>.</p>` : '');
  }

  /* ------------------------------------------------------------ slots */

  function slotBody(d, row) {
    const list = names(row[0]).map((n) => (/default/.test(n) ? '' : n));
    const b = base(d);
    if (b && list.every((n) => n === '' || SLOT_EX[n])) {
      const html = mk(b.tag, b.attrs, list.map((n) => (n === '' ? '' : SLOT_EX[n])).join('') + b.inner);
      const code = `<${b.tag}${attrStr(b.attrs)}>\n${list.map((n) => `  ${n === '' ? b.inner || 'Your content' : SLOT_EX[n]}`).join('\n')}${list.includes('') || !b.inner ? '' : `\n  ${b.inner}`}\n</${b.tag}>`;
      return `<div class="ref-prev">${caseHtml(html, list.map((n) => (n ? `slot="${n}"` : 'default slot')).join(' · '))}</div>${D().codeBlock(code)}`;
    }
    const named = list.filter(Boolean);
    const found = named.length ? fromDemos(d, new RegExp(`slot="(${named.join('|')})"`)) : null;
    if (found) return fromDemosHtml(d, found);
    const t = firstTag(d);
    return D().codeBlock(`<${t}>\n${list.map((n) => (n ? `  ${SLOT_EX[n] || `<div slot="${n}">…</div>`}` : '  Your content')).join('\n')}\n</${t}>`);
  }

  /* ------------------------------------------------------------ events */

  const detailKeys = (desc) => [...new Set([...String(desc).matchAll(/detail\.([a-zA-Z]+)/g)].map((m) => m[1]))];
  const eventNames = (row) => names(row[0]).filter((n) => /^[a-z][a-z-]*$/.test(n));
  function eventBody(d, row) {
    const evs = eventNames(row);
    const keys = detailKeys(row[1]);
    const t = firstTag(d);
    if (!evs.length) return D().codeBlock(String(row[0]), 'js');
    const js = `const el = document.querySelector('${t}'); // or document.getElementById('your-id')\n` + evs.map((e) => `\nel.addEventListener('${e}', (event) => {\n${keys.length ? `  const { ${keys.join(', ')} } = event.detail;\n  console.log(${keys.join(', ')});` : `  console.log('${e}', event.detail);`}\n});`).join('\n');
    const type = keys.length ? `<{ ${keys.map((k) => `${k}: ${DETAIL_TYPE[k] || 'unknown'}`).join('; ')} }>` : '';
    const ts = `const el = document.querySelector('${t}') as HTMLElement;\n` + evs.map((e) => `\nel.addEventListener('${e}', (event: Event) => {\n  const { detail } = event as CustomEvent${type};\n  console.log('${e}', detail);\n});`).join('\n');
    const b = base(d);
    const live = t ? `<div class="ref-live">${b ? `<div class="ref-prev">${caseHtml(mk(b.tag, b.attrs, b.inner), 'Use it: what it fires shows up on the right')}</div>` : '<p class="muted small">Use the examples at the top of the page: what they fire shows up here.</p>'}
      <div class="ref-log" aria-live="polite"><span class="muted small">Nothing fired yet.</span></div></div>` : '';
    return live + jsTs(js, ts);
  }

  /* ------------------------------------------------------------ methods and properties */

  function parseMethods(cell) {
    return names(cell).map((s) => {
      const m = /^([a-zA-Z_$][\w$]*)\s*\(([^)]*)\)/.exec(s);
      if (m) return { name: m[1], params: m[2].split(',').map((p) => p.trim().replace(/[?=:].*$/, '').replace(/^\.\.\./, '')).filter(Boolean), method: true };
      return /^[a-zA-Z_$][\w$]*$/.test(s) ? { name: s, params: [], method: false } : null;
    }).filter(Boolean);
  }
  function methodBody(d, row) {
    const ms = parseMethods(row[0]);
    const t = firstTag(d);
    if (!ms.length || !t) return D().codeBlock(String(row[0]), 'js');
    const b = base(d);
    const args = (m) => m.params.map((p) => ARG[p] ?? `/* ${p} */`).join(', ');
    const exVal = (m) => { const v = b?.attrs?.[m.name] ?? EX[m.name]; return v === undefined ? "'…'" : /^-?\d+(\.\d+)?$/.test(String(v)) ? String(v) : `'${String(v).replace(/'/g, "\\'")}'`; };
    const line = (m) => (m.method ? `${RET[m.name] ? 'const ok = ' : ''}el.${m.name}(${args(m)});${RET[m.name] ? ' // true or false' : ''}` : `console.log(el.${m.name}); // read it\nel.${m.name} = ${exVal(m)}; // change it`);
    const js = `const el = document.querySelector('${t}'); // or document.getElementById('your-id')\n${ms.map(line).join('\n')}`;
    const ptype = (p) => (ARG[p] === undefined ? 'unknown' : /^'/.test(ARG[p]) ? 'string' : /^\{/.test(ARG[p]) ? 'object' : 'number');
    const iface = ms.map((m) => (m.method ? `${m.name}(${m.params.map((p) => `${p}: ${ptype(p)}`).join(', ')}): ${RET[m.name] || 'void'}` : `${m.name}: ${/^-?\d/.test(exVal(m)) ? 'number' : 'string'}`)).join('; ');
    const ts = `const el = document.querySelector('${t}') as HTMLElement & { ${iface} };\n${ms.map(line).join('\n')}`;
    const runnable = ms.filter((m) => !m.method || m.params.every((p) => ARG[p] !== undefined));
    const live = runnable.length && d.tag.startsWith('sav-') ? `<div class="ref-live">${b ? `<div class="ref-prev">${caseHtml(mk(b.tag, b.attrs, b.inner), 'The element')}</div>` : `<p class="muted small">Runs on the first <code>&lt;${t}&gt;</code> of the examples at the top of the page.</p>`}
      <div class="ref-runs"><div class="row">${runnable.map((m) => `<sav-button size="sm" appearance="soft" data-run="${m.name}" data-method="${m.method ? 1 : 0}"><sav-icon slot="prefix" name="play"></sav-icon>${m.method ? `el.${esc(m.name)}(${esc(args(m))})` : `read el.${esc(m.name)}`}</sav-button>`).join('')}</div>
      <div class="ref-log" aria-live="polite"><span class="muted small">Press a button to run it.</span></div></div></div>` : '';
    return live + jsTs(js, ts);
  }

  /* ------------------------------------------------------------ the page part */

  const SECTIONS = [
    ['attributes', 'Attributes', 'Write them in the tag. Open a line to see a live example and the code.', attrRows],
    ['slots', 'Slots', 'Places inside the component for your own elements, chosen with <code>slot="…"</code>. Open a line for an example.', (d) => d.slots || []],
    ['events', 'Events', 'Listen to them with <code>addEventListener</code>. Open a line, use the example and see what it fires.', (d) => d.events || []],
    ['methods', 'Methods and properties', 'Use them on the element from JavaScript or TypeScript. Open a line to run them on this page.', (d) => d.methods || []],
  ];
  function head(kind, row) {
    const [cell, b] = row;
    const tags = names(cell).map((n) => `<code>${esc(n)}</code>`).join(' ');
    if (kind === 'attributes') return [tags, b ? esc(b) : '', descOf(names(cell), row[2])];
    if (kind === 'slots') return [tags, '', esc(D().plain(b))];
    if (kind === 'events') return [tags, '', esc(D().plain(b)) || 'Fired by the element; it bubbles, so a parent can listen too.'];
    const ms = parseMethods(cell);
    return [tags, ms.length && ms.every((m) => !m.method) ? 'property' : '', esc(D().plain(b) || ms.map((m) => METHOD_DESC[m.name]).filter(Boolean).join(' '))];
  }

  function html(d) {
    return SECTIONS.map(([kind, title, intro, rows]) => {
      const list = rows(d);
      if (!list.length) return '';
      return `<section class="ref" data-ref="${kind}"><div class="ref-h"><h2 id="s-${kind}">${title}</h2><sav-button size="sm" appearance="ghost" variant="neutral" data-all>Open all</sav-button></div>
        <p class="muted ref-intro">${intro}</p><div class="ref-list">${list.map((row, i) => card(kind, i, ...head(kind, row))).join('')}</div></section>`;
    }).join('');
  }

  function fill(d, det, main) {
    const body = det.querySelector('.ref-body');
    if (body.dataset.done) return;
    body.dataset.done = '1';
    const kind = det.dataset.kind, i = Number(det.dataset.i);
    const row = SECTIONS.find((s) => s[0] === kind)[3](d)[i];
    try {
      body.innerHTML = { attributes: attrBody, slots: slotBody, events: eventBody, methods: methodBody }[kind](d, row);
    } catch (err) { body.innerHTML = '<p class="muted small">No example for this one.</p>'; console.error(err); return; }
    const t = firstTag(d);
    const own = () => body.querySelector(`.ref-view ${t}`);
    const log = body.querySelector('.ref-log');
    const write = (text) => { if (!log) return; if (!log.dataset.used) { log.innerHTML = ''; log.dataset.used = '1'; } log.insertAdjacentHTML('afterbegin', `<div><code>${esc(text)}</code></div>`); while (log.children.length > 6) log.lastElementChild.remove(); };
    const show = (v) => { try { const s = JSON.stringify(v, (k, x) => (x instanceof Node ? `<${x.localName}>` : x)); return s === undefined ? 'undefined' : s.length > 140 ? s.slice(0, 140) + '…' : s; } catch { return String(v); } };
    if (kind === 'events' && log) {
      const els = own() ? [own()] : [...main.querySelectorAll(`.demo-view ${t}`)];
      for (const el of els) for (const e of eventNames(row)) el.addEventListener(e, (ev) => write(`${e} → detail: ${ev.detail == null || (typeof ev.detail === 'object' && !Object.keys(ev.detail).length) ? '(none)' : show(ev.detail)}`));
    }
    body.querySelectorAll('[data-run]').forEach((btn) => btn.addEventListener('click', () => {
      const el = own() || main.querySelector(`.demo-view ${t}`);
      if (!el) return write('No element found on the page.');
      const name = btn.dataset.run;
      if (btn.dataset.method === '0') return write(`el.${name} → ${show(el[name])}`);
      const m = parseMethods(row[0]).find((x) => x.name === name);
      try {
        const r = el[name](...m.params.map((p) => Function(`return (${ARG[p]})`)()));
        Promise.resolve(r).then((x) => write(`el.${name}(${m.params.map((p) => ARG[p]).join(', ')}) → ${x === undefined ? 'done' : show(x)}`));
      } catch (err) { write(`el.${name}() → error: ${err.message}`); }
    }));
  }

  function mount(main, d) {
    const cards = main.querySelectorAll('.ref-card');
    if (!cards.length) return;
    const mo = new MutationObserver((list) => { for (const m of list) if (m.target.hasAttribute('open')) fill(d, m.target, main); });
    cards.forEach((c) => mo.observe(c, { attributes: true, attributeFilter: ['open'] }));
    main.querySelectorAll('.ref [data-all]').forEach((b) => b.addEventListener('click', () => {
      const all = [...b.closest('.ref').querySelectorAll('.ref-card')];
      const open = all.some((c) => !c.hasAttribute('open'));
      all.forEach((c) => { c.open = open; });
      b.textContent = open ? 'Close all' : 'Open all';
    }));
  }

  window.SavRef = { html, mount };
})();
