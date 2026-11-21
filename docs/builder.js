/* SavComponents docs — Component builder (#builder): every option of one component on a single page, with a live preview
   (style, light/dark, phone/tablet/desktop, background) and code ready to copy: HTML, JavaScript, TypeScript, React, Vue
   and a whole page. The settings live in the address (#builder?c=range&cfg=…), so a link brings them back. */
(() => {
  'use strict';
  const D = () => window.SavDocs; // docs.js loads after this file: read it only when the page is drawn
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const STYLES = { soft: 'Soft', tilt: 'Tilt', sharp: 'Sharp', brutal: 'Brutal', glass: 'Glass' };
  const DEVICES = [['desktop', 'monitor', 'Desktop'], ['tablet', 'tablet', 'Tablet'], ['phone', 'smartphone', 'Phone']];
  /** the screen of each device (width × height, upright): the preview is drawn at this real size, inside a frame like the device;
      when the page has less room the stage scrolls instead of shrinking it. Tablet and phone can be turned (landscape). */
  // compact screens, still at real size: a small laptop, a small tablet, a common phone
  const DEVICE_SIZE = { desktop: [1024, 640], tablet: [600, 800], phone: [360, 720] };
  const TURNS = new Set(['tablet', 'phone']);
  const BGS = { page: 'Page', surface: 'Surface', dots: 'Dots', colour: 'Colourful' };
  const VARIANTS = ['primary', 'neutral', 'success', 'warning', 'danger'];
  const SIZES = { sm: 'S', md: 'M', lg: 'L' };
  const enc = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const dec = (s) => { try { return JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))))); } catch { return null; } };
  const camel = (s) => (String(s).replace(/[^a-zA-Z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')).replace(/^[^a-zA-Z_$]+/, '') || 'el');
  const pascal = (s) => { const c = camel(s); return c.charAt(0).toUpperCase() + c.slice(1); };
  /* The starting point of each component: its playground settings, or else the first example of its page
     (the element's attributes become options, what is inside becomes the editable "Inside (HTML)"). */
  const firstTag = (d) => (String(d.tag).match(/sav-[a-z-]+/) || [''])[0];
  const dedent = (h) => {
    const lines = String(h).replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
    const ind = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    return lines.map((l) => l.slice(Number.isFinite(ind) ? ind : 0)).join('\n').trim();
  };
  const BASES = new Map();
  function baseOf(d) {
    if (BASES.has(d.id)) return BASES.get(d.id);
    let b = null;
    if (d.play) b = { tag: d.play.tag, tags: d.play.tags, attrs: { ...(d.play.attrs || {}) }, text: d.play.text, children: d.play.children || '' };
    else if (d.id === 'toast') b = { call: 'toast', tag: 'sav-button', attrs: { variant: 'success' }, text: 'Changes saved', children: '' };
    else {
      const t = firstTag(d);
      for (const x of (t && d.demos) || []) {
        const tpl = document.createElement('template');
        tpl.innerHTML = x.html;
        const el = tpl.content.querySelector(t);
        if (!el) continue;
        const attrs = {};
        for (const a of el.attributes) if (!/^(id|style|class|slot)$|^on|^data-/.test(a.name)) attrs[a.name] = a.value === '' ? true : a.value;
        b = { tag: t, attrs, text: undefined, children: dedent(el.innerHTML) };
        break;
      }
    }
    BASES.set(d.id, b);
    return b;
  }
  const comps = () => D().docs.filter((d) => baseOf(d));
  /** overlays are closed at first: the code gets a button that opens them */
  const OPENER = { dialog: 'Open the dialog', drawer: 'Open the drawer', command: 'Open the command palette' };
  const lit = (v) => (typeof v === 'boolean' || (typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v)) ? String(v) : `'${String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`);
  const camelKey = (k) => k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  /** the toast is a function: Sav.toast('message', { options }) */
  function toastCall() {
    const o = Object.entries(S.attrs).filter(([, v]) => isOn(v)).map(([k, v]) => `${camelKey(k)}: ${lit(v)}`);
    return `Sav.toast(${lit(S.text || '')}${o.length ? `, { ${o.join(', ')} }` : ''})`;
  }
  const isOn = (v) => v !== '' && v !== false && v !== null && v !== undefined;

  let iconIdx = null; // names and search words of every icon, read once from the icon set
  let iconNames = null; // the same names as a set, once loaded: a half-typed name is not an icon yet
  const iconIndex = () => (iconIdx ||= fetch(Sav.iconBase + 'index.json').then((r) => r.json()).then((j) => j.icons || {})
    .catch(() => Object.fromEntries(Object.keys(Sav.icons).map((n) => [n, []]))).then((all) => { iconNames = new Set([...Object.keys(all), ...Object.keys(Sav.icons)]); return all; }));
  let S = null; // the settings of the component on screen
  let cur = null; // its documentation entry

  /* ------------------------------------------------------------ what can be changed */

  function knobs(d) {
    const ks = D().knobsFor(d, ['value', 'name', 'href', 'target', 'type']);
    const have = new Set(ks.map((k) => k.name));
    // every attribute of the starting example can be edited, even when the table does not list it as an option
    for (const [k, v] of Object.entries(baseOf(d).attrs || {})) if (!have.has(k)) ks.push({ name: k, type: typeof v === 'boolean' ? 'bool' : 'text', desc: '', values: '', label: D().knobLabel(k) });
    for (const k of ks) if (k.type === 'text' && !k.kind && /\bnumber\b/.test(k.values) && !/date|string/.test(k.values)) k.kind = 'number';
    return ks;
  }
  /** CSS custom properties listed in the attribute table (rows "--size · --color", "CSS") */
  function tokenKnobs(d) {
    const out = [];
    for (const [names, values, desc] of d.attrs || []) {
      if (!/CSS/.test(values) && !/^--/.test(names)) continue;
      for (const n of names.split(' · ').map((x) => x.trim())) if (/^--[a-z0-9-]+$/.test(n) && !out.some((o) => o.name === n)) out.push({ name: n, label: n === '--text-color' ? 'Text colour' : undefined, colour: /colou?r|bg|background|empty|fill|ink/.test(n), desc: D().plain(desc) });
    }
    return out;
  }
  /** components people click on: their click is offered as an event too (the browser's own) */
  const CLICKABLE = new Set(['button', 'button-group', 'card', 'list', 'avatar', 'badge', 'tag', 'label', 'image', 'icon', 'flag', 'new-label', 'chip']);
  function eventsOf(d) {
    const out = [];
    for (const [names, desc] of d.events || []) for (const n of names.split(' · ').map((x) => x.trim())) if (/^[a-z][a-z-]*$/.test(n) && !out.some((e) => e.name === n)) out.push({ name: n, desc: D().plain(desc) });
    if (CLICKABLE.has(d.id) && !out.some((e) => e.name === 'click')) out.push({ name: 'click', desc: 'The browser’s own click (or Enter and Space on a button).' });
    return out;
  }
  const siteStyle = () => D().store.get('savc-style', 'tilt');
  const siteMode = () => (document.documentElement.classList.contains('sav-theme-dark') ? 'dark' : 'light');
  function fresh(d) {
    const ev = eventsOf(d);
    const b = baseOf(d);
    return { c: d.id, tag: b.tag, attrs: { ...b.attrs }, text: b.text, children: b.children || '', tokens: {},
      events: ev.some((e) => e.name === 'change') ? ['change'] : ev.some((e) => e.name === 'click') ? ['click'] : ev.slice(0, 1).map((e) => e.name), id: '', style: siteStyle(), mode: siteMode(), device: 'desktop', bg: 'page' };
  }

  /* ------------------------------------------------------------ settings that come from outside (a shared link, a saved item) */

  /** The HTML inside the component, without scripts, frames or event handlers: a link can carry any text. */
  function safeHtml(html) {
    const t = document.createElement('template');
    t.innerHTML = String(html || '');
    t.content.querySelectorAll('script, iframe, object, embed, link, meta, style, base, form, frame, frameset').forEach((n) => n.remove());
    t.content.querySelectorAll('*').forEach((el) => {
      for (const a of [...el.attributes]) if (/^on/i.test(a.name) || /^\s*(javascript|data|vbscript):/i.test(a.value) && /^(href|src|action|formaction|xlink:href|srcdoc)$/i.test(a.name) || a.name === 'srcdoc') el.removeAttribute(a.name);
    });
    return t.innerHTML;
  }
  function clean(st, d) {
    const out = {};
    const b = baseOf(d);
    const tags = [b.tag, ...(b.tags || []).map((t) => t.tag)];
    if (tags.includes(st.tag)) out.tag = st.tag;
    if (st.attrs && typeof st.attrs === 'object') {
      out.attrs = {};
      for (const [k, v] of Object.entries(st.attrs)) if (/^[a-z][a-z0-9-]{0,40}$/.test(k) && !/^on/.test(k) && !['style', 'id', 'slot'].includes(k) && (typeof v === 'string' || typeof v === 'boolean' || typeof v === 'number')) out.attrs[k] = typeof v === 'number' ? String(v) : v;
    }
    if (typeof st.text === 'string') out.text = st.text.slice(0, 500);
    if (typeof st.children === 'string') out.children = safeHtml(st.children).slice(0, 4000);
    if (st.tokens && typeof st.tokens === 'object') {
      out.tokens = {};
      for (const [k, v] of Object.entries(st.tokens)) if (/^--[a-z0-9-]{1,60}$/.test(k) && typeof v === 'string' && v.length <= 80 && !/[;{}<>]|url\(|expression/i.test(v)) out.tokens[k] = v;
    }
    if (Array.isArray(st.events)) out.events = st.events.filter((e) => typeof e === 'string' && /^[a-z][a-z-]{0,40}$/.test(e)).slice(0, 12);
    if (typeof st.id === 'string' && /^[A-Za-z][\w-]{0,59}$/.test(st.id)) out.id = st.id;
    if (STYLES[st.style]) out.style = st.style;
    if (['light', 'dark'].includes(st.mode)) out.mode = st.mode;
    if (DEVICES.some(([v]) => v === st.device)) out.device = st.device;
    if (st.turned === true) out.turned = true;
    if (Number.isFinite(st.zoom) && st.zoom >= 25 && st.zoom <= 150) out.zoom = Math.round(st.zoom);
    if (BGS[st.bg]) out.bg = st.bg;
    return out;
  }

  /* ------------------------------------------------------------ code */

  const elId = () => (S.id || (S.events.length || OPENER[cur.id] ? cur.id : ''));
  /** the HTML inside, one element per line, indented under its tag (examples keep their own line breaks) */
  const kidsBlock = (kids, indent) => (kids.includes('\n') ? kids.split('\n') : kids.split(/(?=<(?!\/))/)).map((l) => (l.trim() ? indent + l.replace(/\s+$/, '') : '')).filter((l, i, a) => l || (i && a[i - 1])).join('\n');
  function attrList(forReact = false) {
    const a = [];
    if (elId()) a.push(['id', elId()]);
    for (const [k, v] of Object.entries(S.attrs)) if (isOn(v)) a.push([k, v]);
    const style = Object.entries(S.tokens).filter(([, v]) => v);
    if (style.length) a.push(['style', forReact ? style : style.map(([k, v]) => `${k}: ${v}`).join('; ')]);
    return a;
  }
  function markup(pretty = true, indent = '') {
    if (baseOf(cur).call === 'toast') return `${indent}<sav-button onclick="${esc(toastCall())}">Show the toast</sav-button>`;
    const opener = OPENER[cur.id] ? `${indent}<sav-button onclick="document.getElementById('${elId()}').show()">${OPENER[cur.id]}</sav-button>${pretty ? '\n' : ''}` : '';
    return opener + element(pretty, indent);
  }
  function element(pretty, indent) {
    const a = attrList().map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`));
    const one = `<${S.tag}${a.map((x) => ' ' + x).join('')}>`;
    const open = pretty && one.length > 84 ? `<${S.tag}\n${a.map((x) => indent + '  ' + x).join('\n')}\n${indent}>` : one;
    const text = S.text !== undefined ? esc(S.text) : '';
    const kids = (S.children || '').trim();
    const inner = pretty && kids ? `${text}\n${kidsBlock(kids, indent + '  ')}\n${indent}` : text + kids;
    return `${indent}${open}${inner}</${S.tag}>`;
  }
  function styleNote() {
    return S.style !== 'soft' ? `<!-- ${STYLES[S.style]} style: add class="sav-style-${S.style}" to <html> or to a container around it -->\n` : '';
  }
  function jsCode(ts = false) {
    if (baseOf(cur).call === 'toast') return `${ts ? 'declare const Sav: { toast(message: string, options?: object): HTMLElement };\n\n' : ''}// Call it when something happens, for example after saving. It returns the sav-alert it shows.\n${toastCall()};`;
    const v = camel(elId() || cur.id), id = elId();
    const opens = OPENER[cur.id] ? `\n\n// open and close it from your code\n${v}.show();\n${v}.hide();` : '';
    const evs = eventsOf(cur).filter((e) => S.events.includes(e.name));
    if (!evs.length && !opens) return `// Tick one or more events in “Events” (in the options) to get the code that listens to them.\n// The element: document.querySelector('${S.tag}')`;
    const head = ts ? `const ${v} = document.getElementById('${id}') as HTMLElement;\n` : `const ${v} = document.getElementById('${id}');\n`;
    const head2 = ts && opens ? `const ${v} = document.getElementById('${id}') as HTMLElement & { show(): void; hide(): void };\n` : head;
    return head2 + evs.map((e) => `\n${e.desc ? `// ${e.desc}\n` : ''}${v}.addEventListener('${e.name}', (event${ts ? ': Event' : ''}) => {\n${e.name === 'click' ? `  console.log('clicked', event.currentTarget);` : ts ? `  const { detail } = event as CustomEvent;\n  console.log('${e.name}', detail);` : `  console.log('${e.name}', event.detail);`}\n});`).join('\n') + opens;
  }
  function reactCode() {
    if (baseOf(cur).call === 'toast') return `// Sav comes from sav.js, loaded once in the page.\nexport function SaveButton() {\n  return <sav-button onClick={() => ${toastCall()}}>Show the toast</sav-button>;\n}`;
    const evs = eventsOf(cur).filter((e) => S.events.includes(e.name));
    const opener = OPENER[cur.id];
    const attrs = attrList(true).filter(([k]) => k !== 'id').map(([k, v]) => (k === 'style' ? `style={{ ${v.map(([n, x]) => `'${n}': '${x}'`).join(', ')} }}` : v === true ? `${k}=""` : `${k}="${esc(v)}"`));
    if (evs.length || opener) attrs.unshift('ref={ref}');
    const text = S.text !== undefined ? esc(S.text) : '';
    const kids = (S.children || '').trim();
    const tagEl = `<${S.tag}${attrs.length > 2 ? '\n' + attrs.map((a) => '      ' + a).join('\n') + '\n    ' : attrs.map((a) => ' ' + a).join('')}>${text}${kids ? '\n' + kidsBlock(kids, '      ') + '\n    ' : ''}</${S.tag}>`;
    const el = opener ? `<>\n    <sav-button onClick={() => ref.current.show()}>${opener}</sav-button>\n    ${tagEl}\n    </>` : tagEl;
    const name = 'My' + pascal(cur.id);
    if (opener && !evs.length) return `import { useRef } from 'react';\n\nexport function ${name}() {\n  const ref = useRef(null);\n  return (\n    ${el}\n  );\n}`;
    if (!evs.length) return `// React 19 passes attributes to custom elements as they are.\nexport function ${name}() {\n  return (\n    ${el}\n  );\n}`;
    return `import { useEffect, useRef } from 'react';\n\n// Library events are read with addEventListener (names with a dash, like sav-select, need it in every React version).\nexport function ${name}() {\n  const ref = useRef(null);\n  useEffect(() => {\n    const el = ref.current;\n${evs.map((e) => `    const on${pascal(e.name)} = (event) => console.log('${e.name}', ${e.name === 'click' ? 'event.currentTarget' : 'event.detail'});\n    el.addEventListener('${e.name}', on${pascal(e.name)});`).join('\n')}\n    return () => {\n${evs.map((e) => `      el.removeEventListener('${e.name}', on${pascal(e.name)});`).join('\n')}\n    };\n  }, []);\n  return (\n    ${el}\n  );\n}`;
  }
  function vueCode() {
    if (baseOf(cur).call === 'toast') return `<script setup>\n// Sav comes from sav.js, loaded once in the page.\nfunction showToast() {\n  window.${toastCall()};\n}\n</script>\n\n<template>\n  <sav-button @click="showToast">Show the toast</sav-button>\n</template>`;
    const evs = eventsOf(cur).filter((e) => S.events.includes(e.name));
    const a = attrList().filter(([k]) => k !== 'id').map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`)).concat(evs.map((e) => `@${e.name}="on${pascal(e.name)}"`));
    const text = S.text !== undefined ? esc(S.text) : '';
    const kids = (S.children || '').trim();
    if (OPENER[cur.id]) a.unshift('ref="box"');
    const tagEl = `<${S.tag}${a.length > 2 ? '\n' + a.map((x) => '    ' + x).join('\n') + '\n  ' : a.map((x) => ' ' + x).join('')}>${text}${kids ? '\n' + kidsBlock(kids, '    ') + '\n  ' : ''}</${S.tag}>`;
    const el = OPENER[cur.id] ? `<sav-button @click="$refs.box.show()">${OPENER[cur.id]}</sav-button>\n  ${tagEl}` : tagEl;
    const script = evs.length ? `<script setup>\n${evs.map((e) => `function on${pascal(e.name)}(event) {\n  console.log('${e.name}', ${e.name === 'click' ? 'event.currentTarget' : 'event.detail'});\n}`).join('\n\n')}\n</script>\n\n` : '';
    return `<!-- vite.config.js: vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('sav-') } } }) -->\n${script}<template>\n  ${el}\n</template>`;
  }
  function pageCode() {
    const cls = [`sav-theme-${S.mode}`, S.style !== 'soft' ? `sav-style-${S.style}` : ''].filter(Boolean).join(' ');
    const js = S.events.length ? `\n  <script>\n${jsCode().split('\n').map((l) => (l ? '    ' + l : l)).join('\n')}\n  </script>` : '';
    return `<!doctype html>\n<html lang="en" class="${cls}">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My ${cur.name.toLowerCase()}</title>\n  <link rel="stylesheet" href="${D().libUrl}/sav.css">\n  <script src="${D().libUrl}/sav.js" defer></script>\n</head>\n<body class="sav-base" style="padding: 2rem">\n${markup(true, '  ')}${js}\n</body>\n</html>\n`;
  }
  const TABS = [['html', 'HTML', 'html'], ['js', 'JavaScript', 'js'], ['ts', 'TypeScript', 'ts'], ['react', 'React', 'jsx'], ['vue', 'Vue', 'vue'], ['page', 'Whole page', 'html']];
  const codeFor = (k) => ({ html: () => styleNote() + markup(), js: () => jsCode(), ts: () => jsCode(true), react: reactCode, vue: vueCode, page: pageCode }[k]());

  /* ------------------------------------------------------------ the page */

  function html() {
    const groups = [...new Set(comps().map((d) => d.group))];
    return `<div class="doc-head"><sav-label class="eyebrow">Start</sav-label><h1>Component builder</h1>
      <p class="lead">Pick a component and set it up with the options on the right: what it says, how it looks, how it behaves. The preview changes as you go, in any style, colour mode and screen size; use it to see which events it fires. The code at the bottom is ready to paste, in HTML, JavaScript, TypeScript, React or Vue.</p></div>
      <div class="bld">
        <div class="bld-top layered">
          <div class="bld-choose">
            <sav-select id="bldPick" searchable sheet-on-mobile aria-label="Component" class="bld-pick-select">${groups.map((g) => `<optgroup label="${esc(g)}">${comps().filter((d) => d.group === g).map((d) => `<option value="${d.id}" data-icon="${esc(d.icon)}">${esc(d.name)}</option>`).join('')}</optgroup>`).join('')}</sav-select>
            <sav-button square appearance="soft" variant="neutral" id="bldPrev" label="Previous component"><sav-icon name="chevron-left"></sav-icon></sav-button>
            <sav-button square appearance="soft" variant="neutral" id="bldNext" label="Next component"><sav-icon name="chevron-right"></sav-icon></sav-button>
            <span class="muted small bld-count" id="bldCount"></span>
          </div>
          <div class="bld-bar">
            <sav-radio-group appearance="buttons" size="sm" id="bldDevice" aria-label="Screen size">${DEVICES.map(([v, ic, l]) => `<sav-radio value="${v}" title="${l}"><sav-icon name="${ic}"></sav-icon><span class="bld-hide-sm">${l}</span></sav-radio>`).join('')}</sav-radio-group>
            <sav-tooltip content="Turn the device (portrait or landscape)" id="bldRotateTip"><sav-button size="sm" square appearance="soft" variant="neutral" id="bldRotate" label="Turn the device" aria-pressed="false"><sav-icon name="rotate-ccw-square"></sav-icon></sav-button></sav-tooltip>
            <span class="bld-zoomer"><sav-zoom size="sm" id="bldZoomR" min="25" max="150" step="10" label="Zoom of the preview"></sav-zoom><sav-tooltip content="The zoom that shows the whole width of the device"><sav-button size="sm" appearance="ghost" variant="neutral" id="bldZoomFit">Fit</sav-button></sav-tooltip></span>
            <sav-select size="sm" id="bldStyle" aria-label="Style of the preview" sheet-on-mobile>${Object.entries(STYLES).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</sav-select>
            <sav-radio-group appearance="buttons" size="sm" id="bldMode" aria-label="Colour mode"><sav-radio value="light" title="Light"><sav-icon name="sun"></sav-icon></sav-radio><sav-radio value="dark" title="Dark"><sav-icon name="moon"></sav-icon></sav-radio></sav-radio-group>
            <sav-select size="sm" id="bldBg" aria-label="Background of the preview" sheet-on-mobile>${Object.entries(BGS).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</sav-select>
            <span class="bld-sp"></span>
            <sav-tooltip content="Every option back to how the component starts"><sav-button size="sm" appearance="ghost" variant="neutral" id="bldReset"><sav-icon slot="prefix" name="refresh"></sav-icon>Start over</sav-button></sav-tooltip>
            <sav-tooltip content="A link that opens the builder with these settings"><sav-button size="sm" appearance="soft" id="bldShare"><sav-icon slot="prefix" name="link"></sav-icon>Copy link</sav-button></sav-tooltip>
          </div>
        </div>
        <div class="bld-cols">
        <section class="bld-main">
          <div class="bld-stage" id="bldStage"><div class="bld-device" id="bldFit"><div class="bld-frame" id="bldFrame"><div class="bld-preview" id="bldPreview"></div></div></div><span class="bld-zoom muted small" id="bldZoom"></span></div>
          <div class="bld-log layered" aria-live="polite">
            <div class="bld-log-head"><span class="bld-log-t"><sav-icon name="activity"></sav-icon><b>Events</b><span class="muted small" id="bldLogHint"></span></span><sav-button size="sm" appearance="ghost" variant="neutral" id="bldLogClear" hidden>Clear</sav-button></div>
            <ol class="bld-log-list" id="bldLogList"></ol>
          </div>
        </section>
        <aside class="bld-panel layered" id="bldOptions" aria-label="Options"><button type="button" class="edge-fold" id="bldFold" aria-controls="bldPanel" aria-expanded="true" aria-label="Collapse the options" title="Collapse the options"><sav-icon name="chevrons-left"></sav-icon></button><nav class="bld-rail" id="bldRail" aria-label="Sections of the options"></nav><div class="bld-scroll" id="bldPanel"></div></aside>
        </div>
        <div class="bld-code layered">
          <div class="bld-code-head"><b id="bldTitle"></b><span class="row"><a class="muted small" id="bldDocs" href="#">Documentation</a><sav-button size="sm" appearance="ghost" variant="neutral" id="bldSaveNew" hidden>Save as new</sav-button><sav-button size="sm" appearance="soft" icon="save" id="playSave" hidden>Save to my components</sav-button><sav-button size="sm" appearance="outline" variant="neutral" id="bldDownload"><sav-icon slot="prefix" name="download"></sav-icon>Download page</sav-button></span></div>
          <sav-alert variant="neutral" class="bld-setup">Once per page, before the components: <code>&lt;link rel="stylesheet" href="${esc(D().libUrl)}/sav.css"&gt;</code> and <code>&lt;script src="${esc(D().libUrl)}/sav.js" defer&gt;&lt;/script&gt;</code>. The “Whole page” tab has them already.</sav-alert>
          <sav-tabs class="code-tabs boxed" id="bldTabs">${TABS.map(([k, l]) => `<sav-tab label="${l}" name="${k}"><div data-code="${k}"></div></sav-tab>`).join('')}</sav-tabs>
        </div>
      </div>`;
  }

  const tip = (t) => (t ? ` <sav-info-tip size="sm" placement="left" sheet-on-mobile content="${esc(t)}"></sav-info-tip>` : '');
  const lbl = (name, t) => `<span slot="label" class="knob-l">${esc(name)}${tip(t)}</span>`;
  const T = (n) => D().titleCase(n);
  const SHAPE_SVG = {
    '_': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16" stroke-dasharray="2 3"/></svg>',
    tilt: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" transform="rotate(-10 12 12)"/></svg>',
    squared: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"/></svg>',
    rounded: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="4.5"/></svg>',
  };


  /* ---- what is inside a list-like component (tabs, steps, tree items…): a form per item (UI) or the HTML itself.
     The HTML stays the truth: the form changes the elements in place, so anything it does not show is kept. */
  // fields: text (the words inside), @attr, ?attr (on or off), ?attr=value, icon@attr, enum@attr:a|b, pre-icon (a sav-icon in the prefix slot)
  const KF = (spec, label, only = false) => ({ spec, label, only }); // only: on for one item at a time (the current page, the open tab)
  const KK = (sel, name, fields, more = {}) => ({ sel, name, fields, ...more });
  const OPTS = [KK('option', 'Option', [KF('text', 'Text'), KF('@value', 'Value'), KF('?disabled', 'Disabled')]), KK('optgroup', 'Group', [KF('@label', 'Name')], { kids: ['option'] })];
  const MENU = [KK('sav-button[slot="trigger"]', 'Button', [KF('text', 'Text')], { fixed: true }), KK('sav-menu-item', 'Item', [KF('text', 'Text'), KF('pre-icon', 'Icon'), KF('@value', 'Value'), KF('?disabled', 'Disabled')]), KK('sav-menu-label', 'Label', [KF('text', 'Text')]), KK('sav-divider', 'Divider', [])];
  const ITEMS = {
    'button-group': [KK('sav-button', 'Button', [KF('text', 'Text'), KF('icon@icon', 'Icon'), KF('?disabled', 'Disabled')])],
    'empty-state': [KK('sav-button', 'Button', [KF('text', 'Text'), KF('icon@icon', 'Icon'), KF('@href', 'Link')])],
    showcase: [KK('sav-button[slot="actions"]', 'Button', [KF('text', 'Text'), KF('@href', 'Link')])],
    select: OPTS, search: OPTS,
    'chip-input': [KK('option', 'Suggestion', [KF('text', 'Text')])],
    radio: [KK('sav-radio', 'Choice', [KF('text', 'Text'), KF('@value', 'Value'), KF('?disabled', 'Disabled')])],
    chip: [KK('sav-chip', 'Chip', [KF('text', 'Text'), KF('@value', 'Value'), KF('?selected', 'Selected'), KF('?removable', 'Removable'), KF('?disabled', 'Disabled')])],
    grid: [KK('sav-card', 'Card', [KF('text', 'Text')])],
    sortable: [KK('*', 'Item', [KF('text', 'Text'), KF('?data-no-drag', 'Stays in place')])],
    timeline: [KK('sav-timeline-item', 'Event', [KF('@heading', 'Heading'), KF('@time', 'Time'), KF('text', 'Text'), KF('icon@icon', 'Icon'), KF('enum@variant:primary|neutral|success|warning|danger', 'Colour')])],
    list: [KK('sav-list-item', 'Item', [KF('text', 'Text'), KF('@description', 'Description'), KF('pre-icon', 'Icon'), KF('@href', 'Link')])],
    carousel: [KK('sav-slide', 'Slide', [KF('@alt', 'Description of the image'), KF('@src', 'Image address'), KF('@heading', 'Heading'), KF('@text', 'Text')])],
    dropdown: MENU, menu: MENU,
    tabs: [KK('sav-tab', 'Tab', [KF('@label', 'Label'), KF('icon@icon', 'Icon'), KF('text', 'Content'), KF('?active', 'Open at first', true), KF('?disabled', 'Disabled')])],
    accordion: [KK('sav-details', 'Section', [KF('@summary', 'Title'), KF('text', 'Content'), KF('?open', 'Open'), KF('?disabled', 'Disabled')])],
    'bottom-nav': [KK('sav-bottom-nav-item', 'Item', [KF('@label', 'Label'), KF('icon@icon', 'Icon'), KF('@href', 'Link'), KF('@badge', 'Badge'), KF('?current', 'Current page', true)])],
    breadcrumb: [KK('sav-breadcrumb-item', 'Item', [KF('text', 'Text'), KF('@href', 'Link'), KF('pre-icon', 'Icon')])],
    steps: [KK('sav-step', 'Step', [KF('@label', 'Label'), KF('@description', 'Description'), KF('icon@icon', 'Icon'), KF('?status=error', 'Went wrong')])],
    tree: [KK('sav-tree-item', 'Item', [KF('@label', 'Label'), KF('icon@icon', 'Icon'), KF('icon@icon-open', 'Icon when open'), KF('?expanded', 'Open'), KF('?selected', 'Selected'), KF('?disabled', 'Disabled')], { kids: ['sav-tree-item'] })],
    command: [KK('optgroup', 'Group', [KF('@label', 'Name')], { kids: ['option'] }), KK('option', 'Command', [KF('text', 'Text'), KF('@value', 'Value'), KF('icon@data-icon', 'Icon'), KF('@data-description', 'Description'), KF('@data-shortcut', 'Shortcut')])],
    'infinite-scroll': [KK('*', 'Item', [KF('text', 'Text')])],
    // header: the logo, the links (one is the current page), the search, and the actions on the right (avatar, buttons)
    header: [KK('a[slot="logo"]', 'Logo', [KF('text', 'Name'), KF('@href', 'Link')], { fixed: true }),
      KK('a:not([slot])', 'Link', [KF('text', 'Text'), KF('@href', 'Link'), KF('?aria-current=page', 'Current page', true)]),
      KK('sav-search[slot="search"]', 'Search', [KF('@placeholder', 'Placeholder')], { single: true }),
      KK('sav-button[slot="actions"]', 'Button', [KF('text', 'Text'), KF('icon@icon', 'Icon'), KF('@href', 'Link')]),
      KK('sav-avatar[slot="actions"]', 'Avatar', [KF('@label', 'Name'), KF('@initials', 'Initials'), KF('@src', 'Photo address')], { single: true })],
    dialog: null, drawer: null,
  };
  const FIELDS_IN = [KK('sav-checkbox', 'Checkbox', [KF('text', 'Label'), KF('?checked', 'Ticked')], { inner: true }), KK('sav-switch', 'Switch', [KF('text', 'Label'), KF('?checked', 'On')], { inner: true }),
    KK('sav-input', 'Field', [KF('@label', 'Label'), KF('@placeholder', 'Placeholder'), KF('enum@type:text|email|password|number|tel|url|search|date', 'Type')], { inner: true }),
    KK('sav-range', 'Range', [KF('@label', 'Label'), KF('@value', 'Value'), KF('@min', 'Min'), KF('@max', 'Max'), KF('@unit', 'Unit')], { inner: true })];
  const MODAL = (what) => [KK(':self', 'Message', [KF('text', 'Text')], { fixed: true }),
    KK('div:not([slot])', 'Group', [], { kids: FIELDS_IN.map((k) => k.sel) }), ...FIELDS_IN,
    KK('sav-button[slot="footer"]', 'Button', [KF('text', 'Text'), KF('enum@variant:primary|neutral|success|warning|danger', 'Colour'), KF('enum@appearance:solid|outline|soft|ghost', 'Appearance'), KF('?data-sav-close', `Closes the ${what}`), KF('?block', 'Full width')]),
    KK('sav-button[slot="header-actions"]', 'Header button', [KF('@label', 'Name'), KF('icon@icon', 'Icon')], { init: { icon: 'ellipsis', appearance: 'ghost', variant: 'neutral', size: 'sm' } })];
  ITEMS.dialog = MODAL('dialog'); ITEMS.drawer = MODAL('drawer');
  const ONE_OF = ['aria-current', 'current', 'active', 'selected', 'open', 'checked', 'expanded', 'disabled', 'data-no-drag', 'status', 'badge'];
  const fType = (spec) => (spec === 'text' ? 'text' : spec === 'pre-icon' ? 'icon' : spec[0] === '?' ? 'bool' : spec.startsWith('icon@') ? 'icon' : spec.startsWith('enum@') ? 'enum' : 'text');
  const fAttr = (spec) => spec.replace(/^(\?|@|icon@|enum@)/, '').replace(/[:=].*$/, '');
  const ownText = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.data).join('').replace(/\s+/g, ' ').trim();
  const preIcon = (el) => el.querySelector(':scope > sav-icon[slot="prefix"]');
  function getF(el, spec) {
    if (spec === 'text') return ownText(el);
    if (spec === 'pre-icon') return preIcon(el)?.getAttribute('name') || '';
    if (spec[0] === '?') { const [a, v] = spec.slice(1).split('='); return v ? el.getAttribute(a) === v : el.hasAttribute(a); }
    return el.getAttribute(fAttr(spec)) || '';
  }
  function setF(el, spec, v) {
    if (spec === 'text') {
      const ts = [...el.childNodes].filter((n) => n.nodeType === 3 && n.data.trim());
      if (ts.length) { ts[0].data = v; ts.slice(1).forEach((n) => n.remove()); }
      else if (v) el.nodeType === 11 ? el.prepend(document.createTextNode(v)) : el.insertBefore(document.createTextNode(v), el.querySelector(':scope > [slot="suffix"]'));
    } else if (spec === 'pre-icon') {
      const ic = preIcon(el);
      if (!v) ic?.remove();
      else if (ic) ic.setAttribute('name', v);
      else { const n = document.createElement('sav-icon'); n.setAttribute('slot', 'prefix'); n.setAttribute('name', v); el.prepend(n); }
    } else if (spec[0] === '?') { const [a, x] = spec.slice(1).split('='); v ? el.setAttribute(a, x || '') : el.removeAttribute(a); }
    else v === '' ? el.removeAttribute(fAttr(spec)) : el.setAttribute(fAttr(spec), v);
  }
  /** the items of the HTML, in order, with their depth (the tree) */
  function kidRows(root, kinds, all, lvl = 0, out = { rows: [], other: 0 }) {
    const self = !lvl && kinds.find((x) => x.sel === ':self'); // the text right inside the component (the message of a dialog)
    if (self) out.rows.push({ el: root, k: self, lvl });
    for (const el of root.children) {
      const k = kinds.find((x) => x.sel !== ':self' && el.matches(x.sel));
      if (!k) { out.other++; continue; }
      out.rows.push({ el, k, lvl });
      if (k.kids) kidRows(el, all.filter((x) => k.kids.includes(x.sel)), all, lvl + 1, out);
    }
    return out;
  }
  function kidsField(d) {
    const ta = (vis) => `<sav-textarea size="sm" class="mono" data-children rows="${vis ? 8 : 5}" value="${esc(S.children)}"${vis ? ' aria-label="What is inside (HTML)"' : ''}>${vis ? '' : lbl('What is inside (HTML)', 'The elements inside the component: options, items, tabs, slides… Change, add or remove them; the preview follows.')}</sav-textarea>`;
    if (!ITEMS[d.id]) return ta(false);
    const mode = D().store.get('savc-kids-mode', 'ui') === 'html' ? 'html' : 'ui';
    return `<div class="kid-ed" data-mode="${mode}"><div class="de-top">${lbl('What is inside', 'The items of the component: change their text and options, add, move or remove them (UI), or write the HTML. The preview follows.').replace('slot="label" ', '')}`
      + `<sav-radio-group class="ke-mode" appearance="buttons" size="sm" value="${mode}" aria-label="Edit what is inside as"><sav-radio value="ui">UI</sav-radio><sav-radio value="html">HTML</sav-radio></sav-radio-group></div>`
      + `<div class="ke-ui"></div>${ta(true)}</div>`;
  }
  /** the form of the items, from the HTML in the box */
  function renderKids(box, fromHtml = true) {
    const kinds = ITEMS[cur.id];
    // from the HTML (at first, and after it was written by hand), or from the elements the form just changed
    if (fromHtml || !box._tpl) { const tpl = document.createElement('template'); tpl.innerHTML = box.querySelector('[data-children]').value || ''; box._tpl = tpl; }
    const tpl = box._tpl; box._open ||= new WeakSet();
    const { rows, other } = kidRows(tpl.content, kinds, kinds);
    box._rows = rows;
    const many = new Set(rows.map((x) => x.k)).size > 1; // the kind is named only when there are several
    const count = {};
    const fieldOf = (r, n, f, i, bare) => {
      const t = fType(f.spec), v = getF(r.el, f.spec), id = `data-f="${i}"`;
      const al = `${r.k.name} ${count[n]}: ${f.label}`;
      if (t === 'bool') return `<sav-checkbox size="sm" ${id} ${v ? 'checked' : ''}>${esc(f.label)}</sav-checkbox>`;
      if (t === 'icon') {
        if (f.spec === 'pre-icon' && r.el.querySelector(':scope > [slot="prefix"]:not(sav-icon)')) return ''; // an avatar or picture there: only in HTML
        return `<sav-search size="sm" ${id} class="ke-half" data-icons no-filter max="12" value="${esc(v)}" placeholder="Search icons"${bare ? ` aria-label="${esc(al)}"` : ` label="${esc(f.label)}"`}></sav-search>`;
      }
      if (t === 'enum') return `<sav-select size="sm" ${id} class="ke-half" value="${esc(v)}" placeholder="Default" label="${esc(f.label)}"><option value="">Default</option>${f.spec.split(':')[1].split('|').map((o) => `<option value="${o}">${esc(T(o))}</option>`).join('')}</sav-select>`;
      return `<sav-input size="sm" ${id} value="${esc(v)}"${bare ? ` aria-label="${esc(al)}" placeholder="${esc(f.label)}"` : ` label="${esc(f.label)}"`}></sav-input>`;
    };
    const btn = (what, icon, label, text = '') => `<sav-button size="sm" appearance="${text ? 'soft' : 'ghost'}" variant="neutral" icon="${icon}" ${text ? '' : `label="${esc(label)}"`} data-ke="${what}">${esc(text)}</sav-button>`;
    const html = rows.map((r, n) => {
      const key = r.k.name + r.lvl; count[n] = (count[key] = (count[key] || 0) + 1);
      const fs = r.k.fields.map((f, i) => [f, i]);
      const first = fs[0] && fType(fs[0][0].spec) !== 'bool' && fs[0][0].spec !== 'pre-icon' ? fs[0] : null;
      const rest = fs.filter((x) => x !== first);
      const bools = rest.filter(([f]) => fType(f.spec) === 'bool'), others = rest.filter(([f]) => fType(f.spec) !== 'bool');
      const sibs = r.k.fixed ? [] : [...r.el.parentNode.children].filter((e) => e.matches(r.k.sel));
      const pos = sibs.indexOf(r.el);
      const open = box._open.has(r.el);
      const tools = [pos > 0 ? btn('up', 'arrow-up', '', 'Move up') : '', pos < sibs.length - 1 ? btn('down', 'arrow-down', '', 'Move down') : '',
        ...(r.k.kids || []).map((kid, j) => btn('in', 'plus', '', `Add ${kinds.find((x) => x.sel === kid).name.toLowerCase()}${r.k.kids.length > 1 ? '' : ' inside'}`).replace('data-ke="in"', `data-ke="in" data-kid="${j}"`))].join('');
      const more = others.map(([f, i]) => fieldOf(r, n, f, i)).join('') + (bools.length ? `<div class="ke-bools">${bools.map(([f, i]) => fieldOf(r, n, f, i)).join('')}</div>` : '') + (tools ? `<div class="ke-tools">${tools}</div>` : '');
      return `<div class="ke-item" data-n="${n}" style="--lvl: ${r.lvl}"${open ? ' data-open' : ''}><div class="ke-row">`
        + (many || r.k.fixed ? `<span class="ke-k">${esc(r.k.name)}</span>` : '')
        + (first ? fieldOf(r, n, first[0], first[1], true) : `<span class="ke-name">${r.k.fields.length || many ? '' : esc(r.k.name)}</span>`)
        + (more ? `<sav-button size="sm" appearance="ghost" variant="neutral" icon="chevron-down" class="ke-more-b" label="More about ${esc(r.k.name.toLowerCase())} ${count[n]}" aria-expanded="${open}" data-ke="more"></sav-button>` : '')
        + (r.k.fixed ? '' : btn('del', 'x', `Remove ${r.k.name.toLowerCase()} ${count[n]}`))
        + `</div>${more ? `<div class="ke-more"${open ? '' : ' hidden'}>${more}</div>` : ''}</div>`;
    }).join('');
    box.querySelector('.ke-ui').innerHTML = html
      + `<div class="de-adds">${kinds.filter((k) => !k.fixed && !k.inner && !(k.single && rows.some((x) => x.k === k))).map((k) => `<sav-button size="sm" appearance="soft" variant="neutral" icon="plus" data-ke="add" data-kind="${kinds.indexOf(k)}">Add ${esc(k.name.toLowerCase())}</sav-button>`).join('')}</div>`
      + (other ? `<p class="de-note">${other === 1 ? 'One more element is' : other + ' more elements are'} inside: ${other === 1 ? 'it stays' : 'they stay'} as ${other === 1 ? 'it is' : 'they are'}, change ${other === 1 ? 'it' : 'them'} in HTML.</p>` : '');
  }
  const kidsWrite = (box) => { const ta = box.querySelector('[data-children]'); ta.value = box._tpl.innerHTML; ta.dispatchEvent(new Event('input', { bubbles: true })); };
  /** a new item: like the last one of its kind (its look, its icon), with a new name and nothing on */
  function newKid(k, parent) {
    const sibs = [...parent.children].filter((e) => e.matches(k.sel)), last = sibs[sibs.length - 1];
    let el;
    if (last) {
      el = last.cloneNode(false);
      ONE_OF.forEach((a) => el.removeAttribute(a));
      const ic = preIcon(last); if (ic) el.append(ic.cloneNode(true));
    } else {
      const m = k.sel.match(/^([a-z][\w-]*)/);
      el = document.createElement(m ? m[1] : 'div');
      for (const [, a, v] of k.sel.matchAll(/\[([\w-]+)="([^"]*)"\]/g)) el.setAttribute(a, v);
      for (const [a, v] of Object.entries(k.init || {})) el.setAttribute(a, v); // the first of its kind: a look to start from
    }
    const name = k.single ? k.name : `${k.name} ${sibs.length + 1}`;
    const main = k.fields.find((f) => fType(f.spec) === 'text');
    if (main) setF(el, main.spec, name);
    if (el.hasAttribute('value') || k.fields.some((f) => f.spec === '@value' && f !== main && k.sel !== 'option')) el.setAttribute('value', name.toLowerCase().replace(/\s+/g, '-'));
    // the same space as between the others, so the HTML stays tidy
    const gap = last?.previousSibling?.nodeType === 3 && !last.previousSibling.data.trim() ? last.previousSibling.data : '';
    if (last) last.after(...(gap ? [document.createTextNode(gap)] : []), el);
    else { const tail = parent.lastChild?.nodeType === 3 && !parent.lastChild.data.trim() ? parent.lastChild : null; parent.insertBefore(el, tail); } // before the closing space
    return el;
  }
  /** after an item was added, moved or removed: the same space between all the items of that level, so the HTML stays tidy */
  function tidyKids(parent) {
    const ws = [...parent.childNodes].filter((n) => n.nodeType === 3 && !n.data.trim());
    const gap = ws.find((n) => n.nextSibling?.nodeType === 1 && n.previousSibling?.nodeType === 1)?.data ?? ws.find((n) => n.nextSibling?.nodeType === 1)?.data;
    if (gap === undefined) return;
    const end = parent.lastChild?.nodeType === 3 && !parent.lastChild.data.trim() ? parent.lastChild.data : '';
    ws.forEach((n) => n.remove());
    [...parent.children].forEach((el, i) => { if (i || gap.includes('\n')) el.before(document.createTextNode(gap)); });
    if (end) parent.append(document.createTextNode(end));
  }
  function wireKids(panel) {
    const boxOf = (t) => t.closest?.('.kid-ed');
    const onEdit = (e) => {
      const box = boxOf(e.target); if (!box) return;
      const mode = e.target.closest('.ke-mode');
      if (mode) {
        if (e.type !== 'change') return;
        if (mode.value === 'ui') renderKids(box);
        box.dataset.mode = mode.value; D().store.set('savc-kids-mode', mode.value);
        return;
      }
      const fld = e.target.closest('.ke-ui [data-f]'); if (!fld) return;
      const r = box._rows[Number(fld.closest('.ke-item').dataset.n)], f = r.k.fields[Number(fld.dataset.f)];
      let v = fld.localName === 'sav-checkbox' ? fld.checked : String(fld.value ?? '');
      // an icon changes only with a real icon name (or when emptied): while typing, the last good icon stays
      if (fType(f.spec) === 'icon' && v) { v = v.trim(); if (!iconNames || !iconNames.has(v)) return; }
      setF(r.el, f.spec, v);
      if (f.only && v) {
        box._rows.filter((x) => x.k === r.k && x.el !== r.el).forEach((x) => setF(x.el, f.spec, false));
        const n = fld.closest('.ke-item').dataset.n;
        renderKids(box, false);
        box.querySelector(`.ke-item[data-n="${n}"] [data-f="${fld.dataset.f}"]`)?.focus?.();
      }
      kidsWrite(box);
    };
    panel.addEventListener('input', onEdit);
    panel.addEventListener('change', onEdit);
    panel.addEventListener('click', (e) => {
      const b = e.target.closest?.('.kid-ed [data-ke]'); if (!b) return;
      const box = boxOf(b), item = b.closest('.ke-item'), r = item && box._rows[Number(item.dataset.n)];
      const what = b.dataset.ke;
      if (what === 'more') {
        const open = !box._open.has(r.el);
        open ? box._open.add(r.el) : box._open.delete(r.el);
        item.toggleAttribute('data-open', open); item.querySelector('.ke-more').hidden = !open; b.setAttribute('aria-expanded', String(open));
        return;
      }
      let focus = null;
      const level = what === 'add' ? box._tpl.content : what === 'in' ? r.el : r.el.parentNode;
      if (what === 'add') { const k = ITEMS[cur.id][Number(b.dataset.kind)]; focus = newKid(k, box._tpl.content); }
      else if (what === 'in') { const k = ITEMS[cur.id].find((x) => x.sel === r.k.kids[Number(b.dataset.kid) || 0]); focus = newKid(k, r.el); box._open.add(r.el); if (r.k.fields.some((f) => f.spec === '?expanded')) r.el.setAttribute('expanded', ''); } // opened, so the new item shows
      else if (what === 'del') {
        const rows = box._rows, n = rows.indexOf(r);
        const ws = r.el.previousSibling; if (ws?.nodeType === 3 && !ws.data.trim()) ws.remove();
        r.el.remove();
        focus = rows.slice(n + 1).find((x) => x.el.isConnected)?.el || rows.slice(0, n).reverse().find((x) => x.el.isConnected)?.el || null;
      } else {
        const sibs = [...r.el.parentNode.children].filter((x) => x.matches(r.k.sel)), i = sibs.indexOf(r.el);
        if (what === 'up' && i > 0) sibs[i - 1].before(r.el);
        if (what === 'down' && i < sibs.length - 1) sibs[i + 1].after(r.el);
        focus = r.el;
      }
      tidyKids(level);
      renderKids(box, false); kidsWrite(box);
      // the focus stays with the item: its first field, or the remove button when it has none
      const n = box._rows.findIndex((x) => x.el === focus);
      const it = n >= 0 && box.querySelector(`.ke-item[data-n="${n}"]`);
      const target = it && (what === 'up' || what === 'down' ? it.querySelector(`[data-ke="${what}"]`) || it.querySelector('[data-ke="more"]') : it.querySelector('[data-f], [data-ke="del"]'));
      requestAnimationFrame(() => target?.focus?.());
    });
  }

  function field(k) { return fieldHtml(k); }
  function fieldHtml(k) {
    const v = S.attrs[k.name];
    const name = k.label || T(k.name);
    if (k.type === 'bool') return `<sav-switch size="sm" data-a="${k.name}" ${isOn(v) ? 'checked' : ''}>${esc(name)}${tip(k.desc)}</sav-switch>`;
    if (k.type === 'enum') {
      const val = isOn(v) ? v : '_';
      if (k.name === 'variant') return `<sav-radio-group class="bld-swatches" appearance="buttons" size="sm" data-a="variant" value="${esc(val)}">${lbl('Colour', k.desc || 'The colour of the component, from the theme.')}<sav-radio value="_" title="Default">Auto</sav-radio>${(k.options.includes('protected') ? [...VARIANTS, 'protected'] : VARIANTS).map((o) => `<sav-radio value="${o}" title="${T(o)}"><span class="bld-sw" style="--c: var(--sav-color-${o})"></span><span class="sr-only">${T(o)}</span></sav-radio>`).join('')}</sav-radio-group>`;
      if (k.name === 'shape') return `<sav-radio-group class="bld-shapes" appearance="buttons" size="sm" data-a="shape" value="${esc(val)}">${lbl('Shape', k.desc)}${['_', ...k.options].map((o) => `<sav-radio value="${o}" title="${o === '_' ? 'Like the page style' : T(o)}">${SHAPE_SVG[o] || ''}<span>${o === '_' ? 'Page' : T(o)}</span></sav-radio>`).join('')}</sav-radio-group>`;
      if (k.name === 'size' && k.options.every((o) => SIZES[o])) return `<sav-radio-group appearance="buttons" size="sm" data-a="size" value="${esc(val)}">${lbl('Size', k.desc)}<sav-radio value="_">Auto</sav-radio>${k.options.map((o) => `<sav-radio value="${o}" title="${T(o)}">${SIZES[o]}</sav-radio>`).join('')}</sav-radio-group>`;
      // the default choice is shown by its name (choosing it again leaves the attribute out of the code)
      const dn = k.def ? T(k.def) : 'Default', rest = k.options.filter((o) => o !== k.def);
      if (k.options.length <= 3) return `<sav-radio-group appearance="buttons" size="sm" data-a="${k.name}" value="${esc(val)}">${lbl(name, k.desc)}<sav-radio value="_">${esc(dn)}</sav-radio>${rest.map((o) => `<sav-radio value="${o}">${esc(T(o))}</sav-radio>`).join('')}</sav-radio-group>`;
      return `<sav-select size="sm" data-a="${k.name}" value="${esc(isOn(v) ? v : '')}" sheet-on-mobile placeholder="${esc(dn)}">${lbl(name, k.desc)}<option value="">${esc(dn)}</option>${rest.map((o) => `<option value="${o}">${esc(T(o))}</option>`).join('')}</sav-select>`;
    }
    if (k.kind === 'number') return `<sav-number-input size="sm" buttons="end" data-a="${k.name}"${k.min !== undefined ? ` min="${k.min}"` : ''}${k.max !== undefined ? ` max="${k.max}"` : ''} value="${esc(isOn(v) ? v : '')}" placeholder="Default">${lbl(name, k.desc)}</sav-number-input>`;
    // data (JSON): a box with several lines; the component changes only once the text reads well
    if (k.kind === 'json') return D().dataEditor(cur.id, k, 'data-a', isOn(v) ? v : '', lbl(name, (k.desc ? k.desc + ' ' : '') + 'Fill in the table (UI) or write the JSON: the preview follows once brackets, quotes and commas are right.'), S.attrs.by);
    // icons: a search among the whole icon set, each suggestion with its drawing and name; the chosen one shows next to the label
    const rich = D().richField(k, 'data-a', isOn(v) ? v : '', lbl(name, k.desc)); if (rich) return rich;
    if (k.kind === 'multi') return `<sav-select size="sm" multiple select-all data-a="${k.name}" ${D().multiAttrs(k)} value="${esc(D().multiValue(k, isOn(v) ? v : ''))}" placeholder="None" sheet-on-mobile>${lbl(name, k.desc)}${k.options.map((o) => `<option value="${o}">${esc(k.optionLabels?.[o] || T(o))}</option>`).join('')}</sav-select>`;
    if (k.kind === 'chips') return `<sav-chip-input size="sm" data-a="${k.name}"${k.chips ? ` kind="${k.chips}"` : ''} value="${esc(isOn(v) ? v : '')}">${lbl(name, k.desc)}${(k.suggestions || []).map((o) => `<option>${esc(o)}</option>`).join('')}</sav-chip-input>`;
    if (k.kind === 'icon') return `<sav-search size="sm" data-a="${k.name}" data-icons no-filter max="12" value="${esc(isOn(v) ? v : '')}" placeholder="Search icons: star, heart, bell…">`
      + `<span slot="label" class="knob-l">${esc(name)}${tip((k.desc ? k.desc + ' ' : '') + 'Type a name or a word (arrow, user, money…) and pick one of the suggestions.')}<sav-icon class="bld-ic-now" name="${esc(v || 'shapes')}" data-icon-of="${k.name}" ${isOn(v) ? '' : 'hidden'}></sav-icon></span></sav-search>`;
    return `<sav-input size="sm" data-a="${k.name}" value="${esc(isOn(v) ? v : '')}">${lbl(name, k.desc)}</sav-input>`;
  }
  function tokenField(t) {
    const v = S.tokens[t.name] || '';
    // a colour: the library's colour field; empty means the theme colour
    if (t.colour) return `<sav-color-picker size="sm" clearable data-t="${t.name}" value="${esc(/^#[0-9a-f]{6}$/i.test(v) ? v : '')}" placeholder="Theme colour">${lbl(t.label || t.name, t.desc)}</sav-color-picker>`;
    if (t.range) return `<div class="bld-tok ${v ? 'on' : ''}"><sav-range size="sm" data-t="${t.name}" data-unit="${t.range[3]}" min="${t.range[0]}" max="${t.range[1]}" step="${t.range[2]}" value="${parseFloat(v) || t.range[4]}" show-value unit="${t.range[3]}">${lbl(t.label, t.desc)}</sav-range><sav-button class="bld-x" size="sm" square appearance="ghost" variant="neutral" data-clear="${t.name}" label="Back to the default"><sav-icon name="x"></sav-icon></sav-button></div>`;
    return `<sav-input size="sm" data-t="${t.name}" value="${esc(v)}" placeholder="Default" clearable>${lbl(t.name, t.desc)}</sav-input>`;
  }
  const GENERAL_TOKENS = [
    { name: '--sav-color-primary', colour: true, label: 'Main colour', desc: 'Its own main colour instead of the theme one (--sav-color-primary). Hover, soft and outline shades follow.' },
    { name: '--sav-radius', range: [0, 24, 1, 'px', 8], label: 'Corner radius', desc: 'Roundness of the corners (--sav-radius). Tilt and Sharp start from square corners.' },
    { name: '--sav-border-width', range: [0, 4, 1, 'px', 1], label: 'Border width', desc: 'Thickness of borders (--sav-border-width).' },
  ];

  function section(title, icon, body, open = true) {
    return body ? `<sav-details appearance="plain" summary="${esc(title)}" ${open ? 'open' : ''}><sav-icon slot="prefix" name="${icon}"></sav-icon><div class="bld-sec">${body}</div></sav-details>` : '';
  }
  function renderPanel() {
    const d = cur, ks = knobs(d);
    const mot = ks.filter((k) => /^animation(-duration)?$/.test(k.name)); // in their own section
    const main = ks.filter((k) => !k.advanced && !mot.includes(k)), adv = ks.filter((k) => k.advanced && !mot.includes(k));
    // choices about what it holds (its value, its type, its mode) belong with the content, not with the look
    const CONTENT_CHOICES = /^(value|type|mode|kind|code|level)$/;
    const texts = main.filter((k) => k.type === 'text' || (k.type === 'enum' && CONTENT_CHOICES.test(k.name))), enums = main.filter((k) => k.type === 'enum' && !CONTENT_CHOICES.test(k.name)), bools = main.filter((k) => k.type === 'bool');
    const evs = eventsOf(d);
    const first = D().plain(d.desc || '').split(/(?<=[.!?])\s/)[0];
    $('#bldPanel').innerHTML = `<div class="bld-panel-head"><span class="bld-ic">${D().icon(d.icon)}</span><span><b>${esc(d.name)}</b><code>${esc(S.tag)}</code></span></div>
      <p class="muted small bld-about">${esc(first)} <a href="#${d.id}">All about it</a></p>
      <sav-accordion appearance="plain" class="bld-acc">
      ${baseOf(d).tags ? section('Version', 'layers', `<sav-radio-group appearance="buttons" size="sm" data-tag value="${S.tag}" aria-label="Version">${baseOf(d).tags.map((t) => `<sav-radio value="${t.tag}">${esc(t.label)}</sav-radio>`).join('')}</sav-radio-group>`) : ''}
      ${section('Content', 'text-cursor-input', (baseOf(d).text !== undefined ? `<sav-input size="sm" data-text value="${esc(S.text || '')}" placeholder="What it says">${lbl('Text', 'What is written in the component.')}</sav-input>` : '')
        + texts.map(field).join('')
        + (baseOf(d).children ? kidsField(d) : ''))}
      ${section('Look', 'palette', enums.map(field).join(''))}
      ${section('Behaviour', 'toggle-right', bools.length ? `<div class="bld-bools">${bools.map(field).join('')}</div>` : '')}
      ${section('Animation', 'sparkles', mot.map(field).join(''), false)}
      ${section('Events', 'activity', evs.length
        ? `<p class="muted small">Tick the events your code should listen to: the code below gets a listener for each. Use the component in the preview to see them fire.</p><div class="bld-evs">${evs.map((e) => `<sav-checkbox size="sm" data-ev="${e.name}" ${S.events.includes(e.name) ? 'checked' : ''}><code>${esc(e.name)}</code>${tip(e.desc)}</sav-checkbox>`).join('')}</div>`
        : '<p class="muted small">This component fires no events of its own: it only shows something.</p>')}
      ${section('Colours and sizes', 'paintbrush', GENERAL_TOKENS.map(tokenField).join('') + tokenKnobs(d).map(tokenField).join(''), false)}
      ${section('Advanced', 'sliders-horizontal', `<sav-input size="sm" data-id value="${esc(S.id)}" placeholder="${esc(d.id)}">${lbl('Element id', 'The id the JavaScript uses to find the element. Without one, ' + d.id + ' is used when you listen to events.')}</sav-input>`
        + adv.filter((k) => k.type !== 'bool').map(field).join('')
        + (adv.some((k) => k.type === 'bool') ? `<div class="bld-bools">${adv.filter((k) => k.type === 'bool').map(field).join('')}</div>` : ''), false)}
      </sav-accordion>`;
    $('#bldPanel').querySelectorAll('.kid-ed').forEach(renderKids); // the form of the items, from their HTML
    // the folded rail: one icon per section; a click opens the options at that section
    $('#bldRail').innerHTML = [...$('#bldPanel').querySelectorAll('.bld-acc > sav-details')].map((x, n) => `<button type="button" data-sec="${n}" title="${esc(x.getAttribute('summary'))}" aria-label="${esc(x.getAttribute('summary'))}"><sav-icon name="${esc(x.querySelector('sav-icon')?.getAttribute('name') || 'circle')}"></sav-icon></button>`).join('');
    logReset();
  }

  /* ------------------------------------------------------------ the event log: what the component fires while you use it */

  const logged = new Set(); // event names already listened to on the preview
  function logReset() {
    const list = $('#bldLogList'); if (!list) return;
    list.innerHTML = '';
    $('#bldLogClear').hidden = true;
    const evs = eventsOf(cur);
    $('#bldLogHint').textContent = evs.length ? `Use the component: ${evs.map((e) => e.name).join(', ')} show up here.` : 'This component fires no events.';
    const pv = $('#bldPreview');
    for (const e of evs) if (!logged.has(e.name)) { logged.add(e.name); pv.addEventListener(e.name, onFired, true); }
  }
  /** a short, readable version of what an event carries */
  function brief(ev) {
    const t = ev.target;
    let data = ev.detail;
    if (data === undefined || data === null || (typeof data === 'number' && ev.type === 'click')) data = ev.type === 'click' ? undefined : t && 'value' in t ? { value: t.value } : undefined;
    if (data === undefined) return '';
    try {
      const txt = JSON.stringify(data, (k, v) => (v instanceof Element ? `<${v.localName}>` : v instanceof Event ? `[${v.type}]` : v));
      return txt && txt.length > 140 ? txt.slice(0, 139) + '…' : txt || '';
    } catch { return ''; }
  }
  function onFired(ev) {
    if (!eventsOf(cur).some((e) => e.name === ev.type)) return;
    const list = $('#bldLogList'); if (!list) return;
    // only events of the component itself (or of what it is made of), not of the page around it
    const src = ev.composedPath()[0];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const li = document.createElement('li');
    li.innerHTML = `<code class="ev">${esc(ev.type)}</code><span class="from">on &lt;${esc(ev.target?.localName || src?.localName || '?')}&gt;</span><code class="data">${esc(brief(ev))}</code><span class="when">${time}</span>`;
    list.prepend(li);
    while (list.children.length > 25) list.lastElementChild.remove();
    $('#bldLogClear').hidden = false;
  }

  function update(save = true) {
    const st = $('#bldStage');
    if (!st) return;
    $('#bldPreview').innerHTML = markup(false);
    D().applyDeps($('#bldPanel'), S.attrs, cur.id); // options that depend on another one: disabled until it allows them
    st.className = `bld-stage bg-${S.bg} dev-${S.device}${TURNS.has(S.device) && S.turned ? ' turned' : ''}`;
    fit(); requestAnimationFrame(fit); // now, and again once the new content has its height
    const fr = $('#bldFrame');
    fr.className = `bld-frame sav-theme-${S.mode}${S.style !== 'soft' ? ' sav-style-' + S.style : ' sav-style-soft'}${S.bg === 'colour' ? ' bg-colour' : ''}`;
    for (const [k, , lang] of TABS) $(`[data-code="${k}"]`).innerHTML = D().codeBlock(codeFor(k), lang, k === 'page' ? `${cur.id}.html` : k === 'react' ? `My${pascal(cur.id)}.jsx` : k === 'vue' ? `My${pascal(cur.id)}.vue` : '');
    $('#bldTitle').textContent = `${cur.name} — your code`;
    $('#bldDocs').href = '#' + cur.id;
    const pick = $('#bldPick'); if (pick && pick.value !== cur.id) pick.value = cur.id;
    const all = comps(), at = all.indexOf(cur);
    $('#bldCount').textContent = `${at + 1} of ${all.length}`;
    if (save) history.replaceState(null, '', `#builder?c=${cur.id}&cfg=${enc(S)}`);
  }

  /** the screen gets the real size of the device (turned: width and height swap); what does not fit scrolls, in the screen or in the stage */
  function fit() {
    const fr = $('#bldFrame'); if (!fr) return;
    const turn = TURNS.has(S.device) && S.turned;
    let [w, h] = DEVICE_SIZE[S.device] || DEVICE_SIZE.desktop;
    if (turn) [w, h] = [h, w];
    fr.style.width = w + 'px'; fr.style.height = h + 'px';
    // zoom: the whole device (frame and component) larger or smaller; the sizes the component sees stay those of the device
    const z = S.zoom || 100;
    $('#bldFit').style.zoom = z === 100 ? '' : String(z / 100);
    const zr = $('#bldZoomR'); if (zr && Number(zr.value) !== z) zr.value = z;
    const dev = DEVICES.find(([v]) => v === S.device)?.[2] || '';
    $('#bldZoom').textContent = `${dev}${TURNS.has(S.device) ? (turn ? ' · landscape' : ' · portrait') : ''} · ${w} × ${h} px${z !== 100 ? ` · shown at ${z}%` : ''}`;
    const tip = $('#bldRotateTip'), rb = $('#bldRotate');
    if (tip) tip.hidden = !TURNS.has(S.device);
    rb?.setAttribute('aria-pressed', String(!!turn));
    // a new device (or turned): the stage starts on the middle of the screen, where the component is
    const key = `${S.device}${turn ? '-t' : ''}@${z}`, st = $('#bldStage');
    if (st && st._dev !== key && st.clientWidth) {
      st._dev = key;
      fr.scrollTop = (fr.scrollHeight - fr.clientHeight) / 2;
      // the stage shows the component itself: centred when it fits, from its start when it is wider or taller than the stage
      const kids = [...$('#bldPreview').children].map((c) => c.getBoundingClientRect()).filter((r) => r.width || r.height);
      if (kids.length) {
        const sr = st.getBoundingClientRect();
        const l = Math.min(...kids.map((r) => r.left)), t = Math.min(...kids.map((r) => r.top)), w = Math.max(...kids.map((r) => r.right)) - l, h = Math.max(...kids.map((r) => r.bottom)) - t;
        const x = l - sr.left + st.scrollLeft, y = t - sr.top + st.scrollTop;
        st.scrollLeft = w > st.clientWidth - 32 ? x - 16 : x + w / 2 - st.clientWidth / 2;
        st.scrollTop = h > st.clientHeight - 32 ? y - 16 : y + h / 2 - st.clientHeight / 2;
      } else { st.scrollLeft = (st.scrollWidth - st.clientWidth) / 2; st.scrollTop = (st.scrollHeight - st.clientHeight) / 2; }
    }
  }
  let fitObs = null;

  function choose(d, state) {
    cur = d;
    const st0 = $('#bldStage'); if (st0) st0._dev = null; // a new component: the stage finds it again
    S = { ...fresh(d), ...(state && state.c === d.id ? clean(state, d) : {}) };
    if (!state || state.c !== d.id) saved = null;
    renderPanel();
    const set = (id, v) => { const el = $(id); if (el) el.value = v; };
    set('#bldDevice', S.device); set('#bldStyle', S.style); set('#bldMode', S.mode); set('#bldBg', S.bg);
    update();
  }

  function onPanel(e) {
    const el = e.target.closest('[data-a], [data-t], [data-text], [data-children], [data-tag], [data-ev], [data-id]');
    if (!el) return;
    if (el.dataset.a !== undefined) {
      const k = el.dataset.a;
      let v = el.localName === 'sav-switch' ? el.checked : el.value;
      if (v === '_' || v === null) v = '';
      if (Array.isArray(v)) v = D().multiAttr(el, v); // a chip field: its list, as the attribute writes it
      v = D().clampKnob(el, v);
      // an icon field changes the component only with a real icon name (or when emptied): while typing, the last good icon stays
      if (el.hasAttribute('data-icons') && v) { iconIndex(); if (!iconNames || !iconNames.has(String(v).trim())) return; v = String(v).trim(); }
      if (el.hasAttribute('data-json') && !D().jsonOk(el, v)) return;
      S.attrs[k] = typeof v === 'number' ? String(v) : v;
      const ic = el.querySelector(`[data-icon-of="${k}"]`); if (ic) { if (v) ic.setAttribute('name', v); ic.hidden = !v; }
    } else if (el.dataset.t) {
      const unit = el.dataset.unit || '';
      S.tokens[el.dataset.t] = el.value === '' ? '' : el.value + unit;
      el.closest('.bld-color, .bld-tok')?.classList.toggle('on', !!S.tokens[el.dataset.t]);
    } else if (el.hasAttribute('data-text')) S.text = el.value;
    else if (el.hasAttribute('data-children')) S.children = safeHtml(el.value);
    else if (el.hasAttribute('data-tag')) {
      S.tag = el.value;
      const def = baseOf(cur).tags.find((t) => t.tag === el.value);
      if (def && def.text !== undefined) { S.text = def.text; const ti = $('[data-text]'); if (ti) ti.value = def.text; }
    } else if (el.dataset.ev) S.events = [...$('#bldPanel').querySelectorAll('[data-ev]')].filter((c) => c.checked).map((c) => c.dataset.ev);
    else if (el.hasAttribute('data-id')) S.id = el.value.trim().replace(/[^\w-]/g, '');
    update();
  }

  function mount(main) {
    const [, params] = D().hashParts();
    const all = comps();
    const given = params.get('cfg') ? dec(params.get('cfg')) : pending;
    const d = all.find((x) => x.id === (params.get('c') || given?.c)) || all.find((x) => x.id === 'button') || all[0];
    pending = null;
    choose(d, given);
    $('#bldPick').addEventListener('change', () => { const d = all.find((x) => x.id === $('#bldPick').value); if (d && d !== cur) choose(d); });
    const step = (n) => choose(all[(all.indexOf(cur) + n + all.length) % all.length]);
    $('#bldPrev').addEventListener('click', () => step(-1));
    $('#bldNext').addEventListener('click', () => step(1));
    const panel = $('#bldPanel');
    // the scale follows the room (window resized, panel folded) and the height of what is shown (a menu that opens, a longer text)
    // the preview is for trying: its links and forms do not leave the builder (the settings would be lost); the event log still sees the click
    const pv = $('#bldPreview');
    pv.addEventListener('click', (e) => { if (e.composedPath().some((n) => n.localName === 'a' && n.hasAttribute?.('href'))) e.preventDefault(); });
    pv.addEventListener('submit', (e) => e.preventDefault(), true);
    // suggestions and commands with a link would open it from code: in the preview they only close
    for (const t of ['sav-pick', 'sav-select']) pv.addEventListener(t, (e) => { if (e.detail?.item?.href) { e.preventDefault(); e.target.hide?.(); e.target.close?.(); } });
    fitObs?.disconnect();
    fitObs = new ResizeObserver(() => fit());
    fitObs.observe($('#bldStage')); fitObs.observe($('#bldFrame'));
    iconIndex(); // ready before the first letter is typed
    // suggestions for the icon fields: exact name, then names that start with the text, contain it, or have it among their words
    panel.addEventListener('sav-query', async (e) => {
      const field = e.target.closest?.('[data-icons]'); if (!field) return;
      const all = await iconIndex();
      const q = String(e.detail.query || '').trim().toLowerCase(); if (!q) return;
      const rank = (n) => (n === q ? 0 : n.startsWith(q) ? 1 : n.includes(q) ? 2 : (all[n] || []).some((t) => t.startsWith(q)) ? 3 : (all[n] || []).some((t) => t.includes(q)) ? 4 : 9);
      field.suggestions = Object.keys(all).map((n) => [n, rank(n)]).filter(([, r]) => r < 9)
        .sort((a, b) => a[1] - b[1] || a[0].length - b[0].length || a[0].localeCompare(b[0])).slice(0, 12)
        .map(([n]) => ({ label: n, value: n, icon: n, description: (all[n] || []).slice(0, 4).join(', ') }));
    });
    D().wireData(panel); // data fields: the table writes their JSON
    wireKids(panel); // what is inside: the form of the items writes their HTML
    panel.addEventListener('input', onPanel);
    panel.addEventListener('change', onPanel);
    panel.addEventListener('click', (e) => {
      const x = e.target.closest('[data-clear]'); if (!x) return;
      S.tokens[x.dataset.clear] = ''; x.parentElement.classList.remove('on'); update();
    });
    const bar = (id, key) => $(id).addEventListener('change', (e) => { if (e.target !== $(id)) return; S[key] = $(id).value; update(); });
    bar('#bldDevice', 'device'); bar('#bldStyle', 'style'); bar('#bldMode', 'mode'); bar('#bldBg', 'bg');
    $('#bldRotate').addEventListener('click', () => { S.turned = !S.turned; update(); });
    // zoom of the preview: the range (25–150 %) or "Fit", the zoom that shows the whole width of the device in the stage
    const setZoom = (z) => { S.zoom = Math.max(25, Math.min(150, Math.round(z))); if (S.zoom === 100) delete S.zoom; fit(); history.replaceState(null, '', `#builder?c=${cur.id}&cfg=${enc(S)}`); };
    $('#bldZoomR').addEventListener('change', (e) => { if (e.target === $('#bldZoomR')) setZoom(Number($('#bldZoomR').value) || 100); });
    $('#bldZoomFit').addEventListener('click', () => {
      const st = $('#bldStage'), dv = $('#bldFit'); if (!st || !dv) return;
      const k = 100 / (S.zoom || 100), w = dv.getBoundingClientRect().width * k; // the width of the device at 100 %
      setZoom(Math.floor(((st.clientWidth - 40) / w) * 20) * 5);
    });
    // the options column folds to a rail (remembered) with the handle on its left border; the preview then takes the width
    const panelOff = (off, keep = true) => {
      $('.bld-cols')?.classList.toggle('panel-off', off); if (keep) D().store.set('savc-bld-panel-off', off);
      const b = $('#bldFold'); const say = off ? 'Expand the options' : 'Collapse the options';
      b.setAttribute('aria-expanded', String(!off)); b.setAttribute('aria-label', say); b.title = say;
      const st = $('#bldStage'); if (st) st._dev = null; // the stage is wider or narrower now: find the component again
      fit();
    };
    panelOff(!!D().store.get('savc-bld-panel-off', false), false);
    $('#bldFold').addEventListener('click', () => panelOff(!$('.bld-cols').classList.contains('panel-off')));
    $('#bldRail').addEventListener('click', (e) => {
      const b = e.target.closest('[data-sec]'); if (!b) return;
      panelOff(false);
      const sec = $('#bldPanel').querySelectorAll('.bld-acc > sav-details')[Number(b.dataset.sec)];
      if (sec) { sec.open = true; sec.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
    });
    $('#bldReset').addEventListener('click', () => choose(cur, { c: cur.id })); // back to the defaults; a saved item stays the one Save updates
    $('#bldLogClear').addEventListener('click', () => { $('#bldLogList').innerHTML = ''; $('#bldLogClear').hidden = true; });
    $('#bldShare').addEventListener('click', () => {
      navigator.clipboard?.writeText(location.href).then(() => Sav.toast('Link copied: it opens the builder with these settings', { variant: 'success', icon: 'link' }), () => Sav.toast('Copy the address from the address bar', { variant: 'neutral' }));
    });
    $('#bldDownload').addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([pageCode()], { type: 'text/html' }));
      a.download = `${cur.id}.html`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    const config = () => ({ tag: S.tag, attrs: S.attrs, text: S.text ?? '', tokens: S.tokens,
      builder: { style: S.style, mode: S.mode, device: S.device, bg: S.bg, events: S.events, id: S.id, children: S.children } });
    const onSaved = (item) => { saved = { id: item.id, name: item.name, c: cur.id }; saveLabels(); };
    $('#playSave').addEventListener('click', () => window.SavAccount?.saveComponent(cur, config(), saved?.c === cur.id ? saved.name : '', { id: saved?.c === cur.id ? saved.id : 0, onSaved }));
    $('#bldSaveNew').addEventListener('click', () => window.SavAccount?.saveComponent(cur, config(), saved ? `${saved.name} (copy)` : '', { onSaved }));
    saveLabels();
  }

  let pending = null; // settings handed over by a playground or a saved item
  let saved = null; // the saved item on screen ({ id, name, c }), so "Save" replaces it instead of making a copy
  /** the save button says what it will do; "Save as new" shows only while a saved item is open (and saving is possible) */
  function saveLabels() {
    const b = $('#playSave'), n = $('#bldSaveNew'); if (!b || !n) return;
    const mine = saved && saved.c === cur?.id;
    b.lastChild.textContent = mine ? `Save changes to “${saved.name}”` : 'Save to my components';
    n.hidden = !mine || b.hidden;
  }
  document.addEventListener('savc:route', () => setTimeout(saveLabels));
  document.addEventListener('savc:account', () => saveLabels()); // account.js shows the save button when accounts work
  window.SavBuilder = {
    pages: { builder: { title: 'Component builder', html, mount } },
    /** opens the builder on one component, optionally with the settings of its playground */
    /** opens a component saved from the builder (account page): every setting comes back, and Save updates it */
    openSaved(item) {
      const c = item.config || {};
      pending = { c: item.component, tag: c.tag, attrs: { ...(c.attrs || {}) }, text: c.text, tokens: { ...(c.tokens || {}) }, ...(c.builder || {}) };
      saved = { id: item.id, name: item.name, c: item.component };
      location.hash = `builder?c=${item.component}`;
    },
    open(id, play) {
      pending = play ? { c: id, tag: play.tag, attrs: { ...play.attrs }, text: play.text, tokens: { ...play.tokens } } : null;
      location.hash = `builder?c=${id}${pending ? '&cfg=' + enc(pending) : ''}`;
    },
  };
})();
