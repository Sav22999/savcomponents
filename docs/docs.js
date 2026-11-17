/* SavComponents documentation site: routing, code samples, theme customiser */
(() => {
  'use strict';
  const DOCS = window.SAVC_DOCS;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  // built-in icons are drawn at once; any other name comes from the icon set (sav-icon loads it)
  const ICON = (name) => (Sav.icons[name] ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Sav.icons[name]}</svg>` : `<sav-icon name="${name}"></sav-icon>`);
  const BASE_URL = new URL('.', location.href).href.replace(/\/$/, '');
  const PUBLIC_URL = 'https://savcomponents.com';
  /* The documentation of each major version. Only 1.x exists now; when 2.0 ships, the 1.x docs stay at their own address
     (e.g. https://savcomponents.com/docs/1/) and get a line here, with current on the newest. */
  const DOC_VERSIONS = [
    { major: '1', label: 'v1.0', title: 'Version 1', url: `${location.pathname}`, current: true },
  ];
  const LIB_URL = `${PUBLIC_URL}/v/${Sav.version}`; // a fixed version: a new release never changes a site that uses this one
  const slug = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const titleCase = (n) => { const t = String(n).replace(/-/g, ' '); return t.charAt(0).toUpperCase() + t.slice(1); };
  const plain = (html) => String(html || '').replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim();
  /** "#icon?q=heart" -> ['icon', URLSearchParams] */
  const hashParts = () => { const [id, q = ''] = location.hash.slice(1).split('?'); return [id, new URLSearchParams(q)]; };

  /* ------------------------------------------------------------ code highlighting */

  const codeBlock = (code, lang = 'html', filename = '') =>
    `<sav-code-block class="doc-code" language="${lang}"${filename ? ` filename="${esc(filename)}"` : ''}>${esc(code)}</sav-code-block>`;

  /* ------------------------------------------------------------ sidebar */

  const groups = [...new Set(DOCS.map((d) => d.group))];
  function renderSide(filter = '') {
    const f = filter.trim().toLowerCase();
    const match = (d) => !f || d.name.toLowerCase().includes(f) || d.tag.toLowerCase().includes(f) || d.group.toLowerCase().includes(f);
    let html = f ? '' : `<div class="side-group"><div class="side-title">Start</div>
      <a href="#" data-r="">Overview</a><a href="#start" data-r="start">Getting started</a><a href="#theming" data-r="theming">Theming</a><a href="#styles" data-r="styles">Styles</a><a href="#examples" data-r="examples">Practical examples</a><a href="#versions" data-r="versions">Versions</a><a href="demo.html">Demo website</a></div>`;
    for (const g of groups) {
      const items = DOCS.filter((d) => d.group === g && match(d));
      if (!items.length) continue;
      html += `<div class="side-group"><div class="side-title">${g}</div>${items.map((d) => `<a href="#${d.id}" data-r="${d.id}">${d.name}</a>`).join('')}</div>`;
    }
    if (!html) html = '<p class="side-empty">No component found.</p>';
    $('#side').innerHTML = html;
    markActive();
  }
  function markActive() {
    const r = hashParts()[0];
    document.querySelectorAll('#side a').forEach((a) => a.classList.toggle('on', a.dataset.r === r));
  }

  /* ------------------------------------------------------------ pages */

  const footer = () => `<footer class="foot">
    <span>SavComponents ${Sav.version} · MIT licence · no dependencies</span>
    <a class="credit" href="https://www.saveriomorelli.com/" target="_blank" rel="noopener"><span>Made by</span> <span class="credit-name">Saverio Morelli</span></a>
  </footer>`;

  function pageHome() {
    const first = (t) => plain(t).split(/(?<=[.!?])\s/)[0];
    const groups = [...new Set(DOCS.map((d) => d.group))];
    const card = (d) => `<a class="comp-card layered" href="#${d.id}" data-name="${esc((d.name + ' ' + d.tag + ' ' + d.group + ' ' + plain(d.desc)).toLowerCase())}"><span class="cc-ic tilt">${ICON(d.icon)}</span><span class="cc-t"><b>${d.name}</b><small>${esc(d.tag)}</small><span class="cc-d">${esc(first(d.desc))}</span></span></a>`;
    const cards = groups.map((g) => { const list = DOCS.filter((d) => d.group === g); return `<section class="comp-group" data-group="${esc(g)}"><h3 class="grp-title">${esc(g)}<sav-badge appearance="soft" variant="neutral">${list.length}</sav-badge></h3><div class="comp-grid">${list.map(card).join('')}</div></section>`; }).join('');
    return `<section class="hero">
      <div class="hero-text">
        <div class="hero-brand"><span class="hero-logo" aria-hidden="true"><img src="docs/logo.svg" alt="" width="88" height="88"></span><span class="hero-name">Sav<b>Components</b></span></div>
        <span class="chip tilt">v${Sav.version} · ${DOCS.length} components · ${Sav.styles.length} styles</span>
        <h1>Web components<br>you can <span class="hl tilt">make your own</span>.</h1>
        <p class="lead">SavComponents is a library of ready-made interface pieces for websites and web apps. Plain HTML tags, no framework, no build step. Pick one of the ${Sav.styles.length} styles, then change colours, shapes and sizes with a few CSS variables or with the live customiser.</p>
        <div class="row">
          <sav-button size="lg" href="#start">Get started<sav-icon slot="suffix" name="arrow-right"></sav-icon></sav-button>
          <sav-button size="lg" appearance="soft" href="#examples"><sav-icon slot="prefix" name="image"></sav-icon>Examples</sav-button>
          <sav-button size="lg" appearance="outline" variant="neutral" href="#styles"><sav-icon slot="prefix" name="grid"></sav-icon>See the styles</sav-button>
        </div>
      </div>
      <div class="hero-demo">
        <div class="sampler" aria-label="Live examples of the components">
          <div class="sampler-head"><b>Try them</b><span>Every piece below is a component: click, type, toggle.</span></div>
          <div class="cell"><a class="spec" href="#button">&lt;sav-button&gt;</a>
            <div class="row"><sav-button size="sm" onclick="Sav.toast('Hello from sav-button', {variant: 'success'})">Click me</sav-button><sav-button size="sm" appearance="outline" variant="neutral">Outline</sav-button><sav-button size="sm" appearance="soft" variant="danger">Soft</sav-button></div></div>
          <div class="cell"><a class="spec" href="#input">&lt;sav-input&gt;</a>
            <sav-input size="sm" placeholder="Type something" clearable><sav-icon slot="prefix" name="search"></sav-icon></sav-input></div>
          <div class="cell half"><a class="spec" href="#checkbox">&lt;sav-switch&gt;</a><sav-switch checked size="sm">Dark sidebar</sav-switch></div>
          <div class="cell half"><a class="spec" href="#rating">&lt;sav-rating&gt;</a><sav-rating value="4" style="--size: 1.15rem"></sav-rating></div>
          <div class="cell"><a class="spec" href="#radio">&lt;sav-radio-group&gt;</a>
            <sav-radio-group appearance="buttons" value="week" size="sm"><sav-radio value="day">Day</sav-radio><sav-radio value="week">Week</sav-radio><sav-radio value="month">Month</sav-radio></sav-radio-group></div>
          <div class="cell half"><a class="spec" href="#badge">&lt;sav-badge&gt;</a><div class="row"><sav-badge>New</sav-badge><sav-badge variant="success" appearance="soft">Done</sav-badge><sav-badge variant="warning" appearance="soft">Beta</sav-badge></div></div>
          <div class="cell half"><a class="spec" href="#progress">&lt;sav-progress-ring&gt;</a><sav-progress-ring value="72" style="--size: 2.6rem; --track-width: 9px">72%</sav-progress-ring></div>
        </div>
      </div>
    </section>
    <section class="features">
      <div><span class="f-ic tilt">${ICON('grid')}</span><h3>Just HTML</h3><p>Standard custom elements: they work in plain pages, PHP templates, React, Vue or anything else.</p></div>
      <div><span class="f-ic tilt">${ICON('settings')}</span><h3>Themeable</h3><p>One colour per variant: hover, soft and outline shades are derived on the fly with <code>color-mix()</code>.</p></div>
      <div><span class="f-ic tilt">${ICON('check-circle')}</span><h3>Form-ready</h3><p>Inputs, selects, checkboxes and radios submit with native forms and support validation.</p></div>
      <div><span class="f-ic tilt">${ICON('moon')}</span><h3>Styles &amp; modes</h3><p>Soft, Tilt, Sharp, Brutal and Glass styles, each in light and dark, with a single class.</p></div>
    </section>
    <sav-heading level="2" class="sec-title" eyebrow="Components" subtitle="${DOCS.length} components in ${groups.length} groups. Filter them by name or by group.">All components</sav-heading>
    <div class="comp-tools">
      <sav-input id="compFilter" type="search" size="sm" placeholder="Filter: button, chart, date…" clearable aria-label="Filter components"><sav-icon slot="prefix" name="search"></sav-icon></sav-input>
      <sav-chip-group id="compGroups" value="all" required aria-label="Groups"><sav-chip value="all" size="sm">All</sav-chip>${groups.map((g) => `<sav-chip value="${esc(g)}" size="sm">${esc(g)}</sav-chip>`).join('')}</sav-chip-group>
    </div>
    ${cards}
    <p class="comp-empty muted" hidden>No component matches. <a href="#" data-clear>Show all</a></p>
    ${footer()}`;
  }

  function pageStart() {
    return `<div class="doc-head"><sav-label class="eyebrow">Start</sav-label><h1>Getting started</h1><p class="lead">Two files, then use the tags anywhere in your HTML.</p></div>
    <h2>1. Add the files</h2>
    ${codeBlock(`<link rel="stylesheet" href="${LIB_URL}/sav.css">\n<script src="${LIB_URL}/sav.js" defer></script>`)}
    <p>Works on any domain. The address contains the version (<code>${Sav.version}</code>): a page that uses it keeps working the same way when a newer release comes out. Move to a new version by changing the number, after checking the changelog.</p>
    <p>You can also download <a href="dist/sav.css" download>sav.css</a> and <a href="dist/sav.js" download>sav.js</a> and host them yourself.</p>
    <h2>2. Use the components</h2>
    <div class="demo"><div class="demo-view">
      <sav-button>Hello</sav-button> <sav-badge variant="success">it works</sav-badge>
    </div>${codeBlock('<sav-button>Hello</sav-button>\n<sav-badge variant="success">it works</sav-badge>')}</div>
    <h2>3. Optional: page base</h2>
    <p>Add <code>sav-base</code> to <code>&lt;body&gt;</code> to use the theme's background, text colour and font for the whole page. Pick the colour mode on <code>&lt;html&gt;</code>:</p>
    ${codeBlock('<html class="sav-theme-auto">   <!-- sav-theme-light · sav-theme-dark · sav-theme-auto -->\n<body class="sav-base">')}
    <h2>Listening to events</h2>
    <p>Form controls fire <code>input</code> and <code>change</code> like native ones; other components fire events that start with <code>sav-</code>.</p>
    ${codeBlock(`const sw = document.querySelector('sav-switch');\nsw.addEventListener('change', () => console.log(sw.checked));\n\ndocument.querySelector('sav-dropdown')\n  .addEventListener('sav-select', (e) => console.log(e.detail.value));`, 'js')}
    <h2>Forms</h2>
    <p>Form controls are <em>form-associated</em>: give them a <code>name</code> and they are sent with the form, are reset by <code>form.reset()</code> and respect <code>required</code>, <code>min</code>, <code>pattern</code> and the other validation attributes.</p>
    <h2>Browser support</h2>
    <p>Current versions of Chrome, Edge, Firefox and Safari (2024 and later).</p>
    <h2 id="s-frameworks">With a framework</h2>
    <p>The components are standard web components, so they work in any framework, or none. Add the two files once in the page shell (<code>index.html</code>, the root layout…) as in step 1; then use the tags in your templates. Each framework only needs to know that <code>sav-*</code> tags are not its own components.</p>
    <sav-tabs appearance="pills" class="fw-tabs">
      <sav-tab label="Vue" name="vue">
        <p>Tell the Vue compiler that tags starting with <code>sav-</code> are custom elements. Bind values with <code>:value</code> and listen with <code>@change</code> (<code>v-model</code> is for Vue components).</p>
        ${codeBlock(`// vite.config.js
import vue from '@vitejs/plugin-vue';
export default {
  plugins: [vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('sav-') } } })],
};`, 'js')}
        ${codeBlock(`<template>
  <sav-input label="Name" :value="name" @input="name = $event.target.value"></sav-input>
  <sav-dropdown @sav-select="onPick($event.detail.value)">…</sav-dropdown>
</template>`)}
      </sav-tab>
      <sav-tab label="Angular" name="angular">
        <p>Add <code>CUSTOM_ELEMENTS_SCHEMA</code> to the component (or module) that uses the tags. Set attributes with <code>[attr.name]</code> and properties with <code>[name]</code>; listen with <code>(change)</code> or <code>(sav-select)</code>.</p>
        ${codeBlock(`import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <sav-switch [attr.checked]="dark ? '' : null" (change)="dark = $any($event.target).checked">Dark mode</sav-switch>
    <sav-button (click)="save()">Save</sav-button>
  \`,
})
export class SettingsComponent {
  dark = false;
  save() { Sav.toast('Saved'); }
}`, 'ts')}
      </sav-tab>
      <sav-tab label="React" name="react">
        <p>React 19 passes properties and events to custom elements directly. For library events (names with a dash, like <code>sav-select</code>) a ref with <code>addEventListener</code> works in every version.</p>
        ${codeBlock(`import { useEffect, useRef } from 'react';

export function FileMenu() {
  const menu = useRef(null);
  useEffect(() => {
    const onPick = (e) => console.log('chosen', e.detail.value);
    menu.current.addEventListener('sav-select', onPick);
    return () => menu.current?.removeEventListener('sav-select', onPick);
  }, []);
  return (
    <sav-dropdown ref={menu}>
      <sav-button slot="trigger">Actions</sav-button>
      <sav-menu-item value="rename">Rename</sav-menu-item>
    </sav-dropdown>
  );
}`, 'jsx')}
      </sav-tab>
      <sav-tab label="Svelte" name="svelte">
        <p>Svelte works with custom elements out of the box, including custom events.</p>
        ${codeBlock(`<sav-chip-group multiple on:change={(e) => (filters = e.detail.value)}>
  <sav-chip value="new">New</sav-chip>
  <sav-chip value="sale">On sale</sav-chip>
</sav-chip-group>`)}
      </sav-tab>
      <sav-tab label="TypeScript" name="ts">
        <p>The library has no type file yet: declare the global once, and cast the elements you use. In TSX, declare the tags so the compiler accepts them.</p>
        ${codeBlock(`// sav.d.ts
declare const Sav: {
  version: string;
  toast(message: string, options?: { variant?: string; icon?: string; duration?: number }): void;
  setStyle(style: 'soft' | 'tilt' | 'sharp' | 'brutal' | 'glass'): void;
  setMode(mode: 'light' | 'dark' | 'auto'): void;
};

// TSX (React): accept every sav-* tag
declare namespace JSX {
  interface IntrinsicElements { [tag: \`sav-\${string}\`]: Record<string, unknown> }
}

// usage
const input = document.querySelector('sav-input') as HTMLElement & { value: string };
input.addEventListener('change', () => console.log(input.value));`, 'ts')}
      </sav-tab>
      <sav-tab label="Server rendering" name="ssr">
        <p>With Next.js, Nuxt, SvelteKit or Astro the tags are rendered as HTML on the server and come to life when <code>sav.js</code> loads in the browser. Load the script in the root layout, and run code that calls <code>Sav</code> or reads component properties only in the browser (in an effect, <code>onMounted</code>, <code>onMount</code>…).</p>
      </sav-tab>
    </sav-tabs>
    ${footer()}`;
  }

  const TOKENS = [
    ['Colours', ['color-primary', 'color-success', 'color-warning', 'color-danger', 'color-neutral', 'color-bg', 'color-surface', 'color-surface-2', 'color-text', 'color-text-muted', 'color-border', 'color-border-strong']],
    ['Typography', ['font', 'font-mono', 'font-size-sm', 'font-size-md', 'font-size-lg', 'font-weight-semibold', 'font-weight-bold']],
    ['Shape and size', ['radius-sm', 'radius', 'radius-lg', 'radius-pill', 'border-width', 'focus-width', 'control-sm', 'control-md', 'control-lg']],
    ['Depth and motion', ['shadow-sm', 'shadow', 'shadow-lg', 'duration', 'easing']],
  ];

  function pageTheming() {
    const cs = getComputedStyle(document.documentElement);
    const rows = TOKENS.map(([g, list]) => `<h3>${g}</h3><div class="tokens">${list.map((t) => {
      const v = cs.getPropertyValue('--sav-' + t).trim();
      const sw = t.startsWith('color') ? `<span class="sw" style="background: var(--sav-${t})"></span>` : '';
      return `<div class="tok">${sw}<code>--sav-${t}</code><span class="tv">${esc(v)}</span></div>`;
    }).join('')}</div>`).join('');
    return `<div class="doc-head"><sav-label class="eyebrow">Start</sav-label><h1>Theming</h1><p class="lead">Every component reads CSS custom properties. Set them on <code>:root</code> for the whole site, on a container for a section, or on a single element.</p>
      <sav-button onclick="document.getElementById('themer').show()"><sav-icon slot="prefix" name="brush"></sav-icon>Open the customiser</sav-button></div>
    <h2>Whole site</h2>
    ${codeBlock(`:root {\n  --sav-color-primary: #0f8b8d;\n  --sav-radius: 4px;\n  --sav-font: "Inter", system-ui, sans-serif;\n}`, 'css')}
    <h2>One section or one element</h2>
    <div class="demo"><div class="demo-view">
      <div style="--sav-color-primary: #e4572e; --sav-radius: 0; display: flex; gap: .5rem; flex-wrap: wrap"><sav-button>Square orange</sav-button><sav-switch checked>Inside the section</sav-switch></div>
      <sav-button style="--sav-color-primary: #0f8b8d" pill>Just me</sav-button>
    </div>${codeBlock(`<div style="--sav-color-primary: #e4572e; --sav-radius: 0">\n  <sav-button>Square orange</sav-button>\n  <sav-switch checked>Inside the section</sav-switch>\n</div>\n<sav-button style="--sav-color-primary: #0f8b8d" pill>Just me</sav-button>`)}</div>
    <h2>Deeper changes with ::part()</h2>
    <p>Each component exposes its inner pieces as <em>parts</em> (listed on every page), so you can style them from your CSS.</p>
    <div class="demo"><div class="demo-view"><sav-button class="fancy">Gradient</sav-button></div>${codeBlock(`sav-button.fancy::part(base) {\n  background: linear-gradient(135deg, #ff7a59, #5b4cf0);\n  letter-spacing: .04em;\n  text-transform: uppercase;\n}`, 'css')}</div>
    <h2>From JavaScript</h2>
    ${codeBlock(`Sav.setTheme({ primary: '#0f8b8d', radius: '12px' });\nSav.setMode('dark'); // 'light' · 'dark' · 'auto'`, 'js')}
    <h2>All tokens</h2>
    <p class="muted">Current values, including what you set in the customiser.</p>
    ${rows}
    ${footer()}`;
  }

  function pageComponent(d) {
    const table = (title, head, rows) => !rows?.length ? '' : `<h2>${title}</h2><div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<code>${esc(c)}</code>` : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    const idx = DOCS.indexOf(d), prev = DOCS[idx - 1], next = DOCS[idx + 1];
    return `<div class="doc-head"><sav-label class="eyebrow">${d.group}</sav-label><div class="title-row"><h1>${d.name}</h1><span class="fav-slot" data-fav="${d.id}"></span></div><p class="tagline"><code>${esc(d.tag)}</code></p>${d.builtFrom ? `<p class="built muted small">Built from ${d.builtFrom.map((b) => { const x = DOCS.find((y) => y.id === b); return x ? `<a href="#${b}">${x.name}</a>` : b; }).join(', ')}.</p>` : ''}<p class="lead">${d.desc}</p></div>
      ${d.demos.map((x) => `<h2 id="s-${slug(x.title)}">${x.title}</h2><div class="demo layered"><div class="demo-view">${x.html}</div>${codeBlock(x.html)}</div>`).join('')}
      ${d.id === 'icon' ? iconExplorerHtml() : ''}
      ${d.play ? playgroundHtml(d) : ''}
      ${table('Attributes', ['Name', 'Values', 'Description'], d.attrs && d.tag.startsWith('sav-') ? [...d.attrs, ['shape', 'tilt · squared · rounded', 'Shape of this component only, whatever the page style. See <a href="#styles">Styles</a>.']] : d.attrs)}
      ${table('Slots', ['Name', 'Description'], d.slots)}
      ${table('Events', ['Name', 'Description'], d.events)}
      ${table('Methods', ['Name', 'Description'], d.methods)}
      ${d.parts ? `<h2>CSS parts</h2><p>${d.parts.map((p) => `<code>${p}</code>`).join(' ')}</p>` : ''}
      ${window.SavA11y?.html(d.id) || ''}
      <nav class="pager">${prev ? `<a class="layered" href="#${prev.id}">${ICON('arrow-left')}<span><small>Previous</small>${prev.name}</span></a>` : '<span></span>'}${next ? `<a href="#${next.id}" class="nx layered"><span><small>Next</small>${next.name}</span>${ICON('arrow-right')}</a>` : ''}</nav>
      ${footer()}`;
  }

  const STYLE_INFO = {
    soft: ['Soft', 'Rounded corners and gentle shadows. The default.'],
    tilt: ['Tilt', 'Square shapes whose background leans a little, text always upright. The look of this site.'],
    sharp: ['Sharp', 'Straight corners, uppercase buttons and offset tinted shadows.'],
    brutal: ['Brutal', 'Thick ink borders and hard shadows that press down on click.'],
    glass: ['Glass', 'Translucent, blurred surfaces. Best on a colourful background.'],
  };
  const STYLE_SAMPLE = `<div class="row"><sav-button>Primary</sav-button><sav-button appearance="outline" variant="neutral">Outline</sav-button><sav-button appearance="soft" variant="success">Soft</sav-button></div>
    <sav-input label="Email" placeholder="you@example.com"><sav-icon slot="prefix" name="mail"></sav-icon></sav-input>
    <div class="row"><sav-switch checked size="sm">Notify me</sav-switch><sav-checkbox checked size="sm">Remember</sav-checkbox><sav-badge variant="warning">Beta</sav-badge></div>
    <sav-alert variant="success" heading="Saved">Your changes are live.</sav-alert>
    <sav-card><strong slot="header">Card</strong>Content on a surface.<div slot="footer" class="row between"><sav-tag size="sm" variant="primary">Tag</sav-tag><sav-button size="sm" appearance="ghost">Open</sav-button></div></sav-card>
    <sav-progress-bar value="62"></sav-progress-bar>`;

  const SHAPES_DEMO = `<div class="shape-row">
  <div class="shape-col" shape="rounded"><b>rounded</b>
    <sav-button>Button</sav-button><sav-badge>Badge</sav-badge><sav-tag removable>Tag</sav-tag>
    <sav-alert variant="success">Alert</sav-alert><sav-card>Card</sav-card><sav-avatar label="Ada Lovelace" variant="primary" shape="rounded"></sav-avatar>
  </div>
  <div class="shape-col" shape="squared"><b>squared</b>
    <sav-button>Button</sav-button><sav-badge>Badge</sav-badge><sav-tag removable>Tag</sav-tag>
    <sav-alert variant="success">Alert</sav-alert><sav-card>Card</sav-card><sav-avatar label="Ada Lovelace" variant="primary" shape="squared"></sav-avatar>
  </div>
  <div class="shape-col" shape="tilt"><b>tilt</b>
    <sav-button>Button</sav-button><sav-badge>Badge</sav-badge><sav-tag removable>Tag</sav-tag>
    <sav-alert variant="success">Alert</sav-alert><sav-card interactive>Card</sav-card><sav-avatar label="Ada Lovelace" variant="primary" shape="tilt"></sav-avatar>
  </div>
</div>
<sav-button shape="tilt" appearance="outline">Only this button is tilted</sav-button>`;

  function pageStyles() {
    const cur = store.get('savc-style', 'tilt');
    const panels = Sav.styles.map((st) => `<section class="style-panel sav-style-${st}">
      <div class="style-name"><b>${STYLE_INFO[st][0]}</b>${cur === st ? '<sav-badge variant="success" pill>In use</sav-badge>' : `<sav-button size="sm" appearance="soft" data-style="${st}">Use on this site</sav-button>`}</div>
      <p class="muted" style="margin:0">${STYLE_INFO[st][1]}</p>
      ${STYLE_SAMPLE}</section>`).join('');
    return `<div class="doc-head"><sav-label class="eyebrow">Start</sav-label><h1>Styles</h1><p class="lead">The same components in ${Sav.styles.length} looks. A style is a class with a few tokens: it works with every colour, in light and dark mode, and you can mix styles in different parts of a page.</p></div>
    ${codeBlock('<html class="sav-theme-light sav-style-tilt">\n\n<!-- or only for one section -->\n<section class="sav-style-brutal">…</section>')}
    <h2>Side by side</h2>
    <div class="style-grid">${panels}</div>
    <h2 id="shapes">Shapes of a single component</h2>
    <p>Any component takes <code>shape="tilt"</code>, <code>shape="squared"</code> or <code>shape="rounded"</code>: it changes only that element, whatever style the page uses. Put it on a container and it applies to everything inside.</p>
    <div class="demo layered"><div class="demo-view">${SHAPES_DEMO}</div>${codeBlock(SHAPES_DEMO)}</div>
    <h2>From JavaScript</h2>
    ${codeBlock(`Sav.setStyle('tilt'); // 'soft' · 'tilt' · 'sharp' · 'brutal' · 'glass'`, 'js')}
    ${footer()}`;
  }

  /* Major versions only: within one major version an update never breaks a site, so only a new major version
     (1.x → 2.x) can ask for changes. Add the newest major version at the top; small releases go in CHANGELOG.md. */
  const MAJORS = [
    {
      v: '1', title: 'Version 1', when: 'November 2026', current: true,
      intro: 'The first public version: the library, the 5 styles and the customiser. Nothing to migrate from.',
      added: [
        'More than 50 components: buttons, favourite buttons, charts, carousels, media players, OTP and password fields, fields, pickers (select, date, time), dialogs, drawers, tabs, menus, alerts, progress, code blocks and more.',
        'Five styles (Soft, Tilt, Sharp, Brutal, Glass), light and dark mode, and per-element shapes (tilt, squared, rounded).',
        'Theming with CSS variables (--sav-*), the live customiser and saved themes you can link from any site.',
        'More than 2,000 icons, loaded only when used.',
        'Versioned links (/v/1.0.0/sav.js) so an update never changes a site that already uses the library.',
      ],
      changed: [],
      update: '',
    },
  ];

  function pageVersions() {
    const list = (title, items) => (items.length ? `<h3>${title}</h3><ul class="ver-list">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '');
    const cards = MAJORS.map((m) => `<section class="ver-card layered" id="v${m.v}">
        <div class="row between"><h2 class="ver-title">${esc(m.title)}</h2><span class="row">${m.current ? '<sav-badge variant="success">Current</sav-badge>' : ''}<span class="muted small">${esc(m.when)}</span></span></div>
        <p>${esc(m.intro)}</p>
        ${list('New', m.added)}${list('Changes that need work on your side', m.changed)}
        ${m.update ? `<h3>How to update</h3><p>${esc(m.update)}</p>` : ''}
      </section>`).join('');
    return `<div class="doc-head"><sav-label class="eyebrow">Start</sav-label><h1>Versions</h1>
      <p class="lead">What changes from one major version to the next (1.x → 2.x). Inside a major version every update is safe: same tags, same attributes, same tokens.</p></div>
      <sav-alert variant="primary" heading="Which version am I using?">The number is in the address of the library, for example <code>/v/${esc(Sav.version)}/sav.js</code>. A link to a version never changes: to get a newer one, change the number.</sav-alert>
      ${cards}
      <p class="muted small">Every smaller release is listed in the <a href="https://github.com/Sav22999/savcomponents/blob/main/CHANGELOG.md" target="_blank" rel="noopener">changelog on GitHub</a>.</p>
      ${footer()}`;
  }

  function pageExamples() {
    const EX = window.SAVC_EXAMPLES;
    const toc = EX.map((e) => `<a class="chip tilt" href="#examples" data-jump="ex-${e.id}">${e.title}</a>`).join(' ');
    return `<div class="doc-head"><sav-label class="eyebrow">Start</sav-label><h1>Practical examples</h1><p class="lead">Small, realistic screens built only with SavComponents, with the JavaScript (or TypeScript) that listens to their events. Copy the code and adapt it: names, prices and numbers are made up.</p><div class="ex-toc">${toc}</div></div>
    ${EX.map((e) => `<h2 id="ex-${e.id}">${e.title}</h2><p>${e.desc}</p><p class="uses">Uses: ${e.uses.split(' · ').map((u) => `<code>sav-${u}</code>`).join(' ')}</p>
      <div class="demo layered"><div class="demo-view">${e.html}${e.js ? `<script>${e.js}</script>` : ''}</div>
        ${e.js ? `<sav-tabs appearance="pills" class="ex-code"><sav-tab label="HTML" name="html">${codeBlock(e.html)}</sav-tab><sav-tab label="JavaScript" name="js">${codeBlock(e.js, 'js')}</sav-tab>${e.ts ? `<sav-tab label="TypeScript" name="ts">${codeBlock(e.ts, 'ts')}</sav-tab>` : ''}</sav-tabs>` : codeBlock(e.html)}</div>`).join('')}
    ${footer()}`;
  }

  /* ------------------------------------------------------------ playground: one component, your settings */

  /** Knobs read from the attribute table: "boolean" rows become switches, "a · b · c" rows become selects. */
  function knobsFor(d) {
    const skip = new Set(['href', 'target', 'download', 'type', 'name', 'value', 'id', 'from', 'for', ...(d.play.skip || [])]);
    const knobs = [];
    for (const [names, values] of d.attrs || []) {
      if (/[[(<]|^--|^Sav\./.test(names) || /CSS|option|On sav-/i.test(values) || /On sav-/.test(names)) continue;
      const list = names.split(' · ').map((n) => n.trim()).filter((n) => /^[a-z][a-z-]*$/.test(n) && !skip.has(n));
      if (!list.length) continue;
      if (values === 'boolean') list.forEach((n) => knobs.push({ name: n, type: 'bool' }));
      else if (list.length === 1 && list[0] === 'variant') knobs.push({ name: 'variant', type: 'enum', options: ['primary', 'neutral', 'success', 'warning', 'danger'] });
      else if (/ · /.test(values) && !/…/.test(values) && list.length === 1) knobs.push({ name: list[0], type: 'enum', options: values.split(' · ').map((v) => v.trim()).filter((v) => /^[a-z0-9-]+$/.test(v)) });
      else if (/string|number|ms|url|icon name/.test(values)) list.forEach((n) => knobs.push({ name: n, type: 'text' }));
    }
    const descs = new Map((d.attrs || []).map((r) => [r[0], plain(r[2])]));
    for (const k of knobs) { const row = (d.attrs || []).find((r) => r[0].split(' · ').map((x) => x.trim()).includes(k.name)); k.desc = row ? plain(row[2]) || plain(row[1]) : ''; }
    const own = knobs.find((k) => k.name === 'shape'); // the avatar has its own shapes: merge them
    if (own) own.options = [...new Set([...own.options, 'tilt', 'squared', 'rounded'])];
    else knobs.push({ name: 'shape', type: 'enum', options: ['tilt', 'squared', 'rounded'] });
    const shape = knobs.find((k) => k.name === 'shape');
    shape.desc = (shape.desc ? shape.desc + ' ' : '') + 'Tilt leans the background (the text stays upright), Squared has no rounded corners, Rounded has softer ones. It changes this component only, whatever the style of the page.';
    return knobs;
  }

  /* ------------------------------------------------------------ icons: search among all of them */

  let iconIndex = null;
  const loadIconIndex = () => (iconIndex ||= fetch(Sav.iconBase + 'index.json').then((r) => r.json()).then((j) => j.icons).catch(() => Object.fromEntries(Object.keys(Sav.icons).map((n) => [n, []]))));

  function iconExplorerHtml() {
    return `<h2 id="s-all-icons">All icons</h2>
      <div class="icon-tools"><sav-input id="iconQ" type="search" clearable placeholder="Search icons: heart, arrow, user…" size="sm"><sav-icon slot="prefix" name="search"></sav-icon></sav-input><span class="muted small" id="iconCount"></span></div>
      <div class="icon-grid" id="iconGrid"></div><div class="row" style="justify-content:center;margin-top:1rem"><sav-button id="iconMore" appearance="outline" variant="neutral" hidden>Show more</sav-button></div>`;
  }

  async function mountIcons(q0 = '') {
    const all = await loadIconIndex();
    const names = Object.keys(all).sort();
    const input = $('#iconQ'), grid = $('#iconGrid');
    if (!grid) return;
    let shown = 0, list = names;
    const draw = (reset) => {
      if (reset) { grid.innerHTML = ''; shown = 0; }
      const next = list.slice(shown, shown + 180);
      grid.insertAdjacentHTML('beforeend', next.map((n) => `<button type="button" class="icon-cell" data-icon="${n}" title="${n}"><sav-icon name="${n}"></sav-icon><span>${n}</span></button>`).join(''));
      shown += next.length;
      $('#iconMore').hidden = shown >= list.length;
      $('#iconCount').textContent = `${list.length} of ${names.length} icons`;
    };
    const filter = (q) => {
      const t = q.trim().toLowerCase();
      list = !t ? names : names.filter((n) => n.includes(t) || (all[n] || []).some((tag) => tag.includes(t)))
        .sort((a, b) => (b.startsWith(t) - a.startsWith(t)) || a.length - b.length);
      draw(true);
    };
    input.value = q0;
    filter(q0);
    let tm;
    input.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => filter(input.value), 120); });
    $('#iconMore').addEventListener('click', () => draw(false));
    grid.addEventListener('click', (e) => {
      const b = e.target.closest('[data-icon]'); if (!b) return;
      const html = `<sav-icon name="${b.dataset.icon}"></sav-icon>`;
      navigator.clipboard?.writeText(html).catch(() => {});
      Sav.toast(`Copied: ${html}`, { variant: 'neutral', icon: b.dataset.icon, duration: 2500 });
    });
    if (q0) document.getElementById('s-all-icons')?.scrollIntoView();
  }

  let playState = null;
  let pendingPlay = null; // a saved component to load when its page opens

  function playgroundHtml(d) {
    return `<h2 id="playground">Playground</h2><p>Change the attributes and see the result; copy the code or save it to your account.</p>
      <div class="play layered"><div class="play-knobs" id="playKnobs"></div><div class="play-out"><div class="play-preview" id="playPreview"></div><div id="playCode"></div>
      <div class="row play-actions"><sav-button size="sm" appearance="ghost" variant="neutral" icon="refresh" id="playReset">Reset</sav-button><sav-button size="sm" icon="save" id="playSave" hidden>Save to my components</sav-button></div></div></div>`;
  }

  function playMarkup(d, st) {
    const attrs = Object.entries(st.attrs).filter(([, v]) => v !== '' && v !== false).map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`)).join('');
    const style = Object.entries(st.tokens).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('; ');
    const inner = st.text !== undefined ? esc(st.text) : '';
    const tag = (d.play.tags || []).find((t) => t.tag === st.tag)?.tag || d.play.tag;
    return `<${tag}${attrs}${style ? ` style="${esc(style)}"` : ''}>${inner}${d.play.children || ''}</${tag}>`;
  }

  function mountPlayground(d) {
    const knobs = knobsFor(d);
    const base = { attrs: { ...(d.play.attrs || {}) }, text: d.play.text, tokens: {} };
    playState = pendingPlay && pendingPlay.component === d.id ? { tag: pendingPlay.config.tag, attrs: { ...pendingPlay.config.attrs }, text: pendingPlay.config.text ?? d.play.text, tokens: { ...pendingPlay.config.tokens }, name: pendingPlay.name } : structuredClone(base);
    const fromSaved = !!(pendingPlay && pendingPlay.component === d.id);
    pendingPlay = null;
    const box = $('#playKnobs');
    // every field: a Title Case name and a help tip with what it does
    const tip = (text) => (text ? ` <sav-info-tip size="sm" placement="right" sheet-on-mobile content="${esc(text)}"></sav-info-tip>` : '');
    const lbl = (name, text) => `<span slot="label" class="knob-l">${esc(name)}${tip(text)}</span>`;
    const field = (k) => {
      const v = playState.attrs[k.name];
      if (k.type === 'bool') return `<sav-switch size="sm" data-k="${k.name}" ${v ? 'checked' : ''}>${esc(titleCase(k.name))}${tip(k.desc)}</sav-switch>`;
      if (k.type === 'enum') return `<sav-select size="sm" data-k="${k.name}" value="${esc(v || '')}" sheet-on-mobile aria-label="${esc(titleCase(k.name))}" placeholder="Default">${lbl(titleCase(k.name), k.desc)}<option value="">Default</option>${k.options.map((o) => `<option value="${o}">${titleCase(o)}</option>`).join('')}</sav-select>`;
      return `<sav-input size="sm" data-k="${k.name}" value="${esc(v || '')}">${lbl(titleCase(k.name), k.desc)}</sav-input>`;
    };
    box.innerHTML = (d.play.tags ? `<sav-radio-group appearance="buttons" size="sm" data-tag value="${playState.tag || d.play.tag}">${lbl('Component', 'Which version of the component to show.')}${d.play.tags.map((t) => `<sav-radio value="${t.tag}">${t.label}</sav-radio>`).join('')}</sav-radio-group>` : '')
      + (d.play.text !== undefined ? `<sav-input size="sm" data-text value="${esc(playState.text || '')}">${lbl('Text', 'What is written inside the component.')}</sav-input>` : '')
      + knobs.filter((k) => k.type !== 'bool').map(field).join('')
      + `<div class="play-color ${playState.tokens['--sav-color-primary'] ? 'on' : ''}"><sav-switch size="sm" data-token-on="--sav-color-primary" ${playState.tokens['--sav-color-primary'] ? 'checked' : ''}><span class="knob-l">Custom colour${tip('Gives this component its own main colour (the --sav-color-primary token) instead of the theme one. Pick the colour in the square: the switch turns on by itself; turn it off to go back to the theme colour.')}</span></sav-switch><input type="color" data-token="--sav-color-primary" aria-label="Custom colour" value="${playState.tokens['--sav-color-primary'] || '#66cbff'}"></div>`
      + `<div class="play-bools">${knobs.filter((k) => k.type === 'bool').map(field).join('')}</div>`;
    const update = () => {
      const html = playMarkup(d, playState);
      $('#playPreview').innerHTML = html;
      $('#playCode').innerHTML = codeBlock(html);
    };
    box.addEventListener('input', (e) => onKnob(e.target));
    box.addEventListener('change', (e) => onKnob(e.target));
    function onKnob(t) {
      const el = t.closest('[data-k], [data-text], [data-token], [data-token-on], [data-tag]');
      if (!el) return;
      if (el.hasAttribute('data-tag')) {
        playState.tag = el.value;
        const def = d.play.tags.find((x) => x.tag === el.value);
        if (def && def.text !== undefined && (!playState.text || d.play.tags.some((x) => x.text === playState.text))) { playState.text = def.text; const ti = box.querySelector('[data-text]'); if (ti) ti.value = def.text; }
      } else if (el.dataset.k) playState.attrs[el.dataset.k] = el.localName === 'sav-switch' ? el.checked : el.value;
      else if (el.hasAttribute('data-text')) playState.text = el.value;
      else {
        const name = el.dataset.token || el.dataset.tokenOn;
        const on = box.querySelector(`[data-token-on="${name}"]`).checked;
        if (el.dataset.token) box.querySelector(`[data-token-on="${name}"]`).checked = true;
        playState.tokens[name] = el.dataset.token || on ? box.querySelector(`[data-token="${name}"]`).value : '';
        box.querySelector('.play-color')?.classList.toggle('on', !!playState.tokens[name]);
      }
      update();
    }
    $('#playReset').addEventListener('click', () => { pendingPlay = null; playState = structuredClone(base); mountPlayground(d); });
    $('#playSave').addEventListener('click', () => window.SavAccount?.saveComponent(d, { tag: playState.tag || d.play.tag, attrs: playState.attrs, text: playState.text ?? '', tokens: playState.tokens }, playState.name));
    update();
    if (fromSaved) setTimeout(() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  /** Used by account.js */
  window.SavDocs = {
    docs: DOCS, icon: ICON, esc, codeBlock, footer: () => footer(), route: () => route(),
    playMarkup,
    themeConfig: () => ({ style: store.get('savc-style', 'tilt'), mode: store.get('savc-mode', 'auto'), tokens: themeTokens(), settings: { ...theme } }),
    applyThemeConfig(cfg) {
      theme = { ...(cfg.settings || {}) };
      store.set('savc-style', cfg.style || 'tilt');
      Sav.setStyle(cfg.style || 'tilt');
      applyTheme();
      setMode(cfg.mode || 'auto');
      renderThemer();
    },
    openPlayground(item) { pendingPlay = item; if (location.hash === '#' + item.component) route(); else location.hash = item.component; },
  };

  /** The version badge next to the logo: a dropdown to switch to the documentation of another major version. */
  function initVersionPicker() {
    const dd = $('#verPick'); if (!dd) return;
    const cur = DOC_VERSIONS.find((v) => v.current) || DOC_VERSIONS[0];
    dd.innerHTML = `<sav-button slot="trigger" size="sm" appearance="soft" variant="neutral" class="ver-btn" aria-label="Documentation version ${esc(cur.label)}">${esc(cur.label)}<sav-icon slot="suffix" name="chevron-down"></sav-icon></sav-button>
      <sav-menu-label>Documentation</sav-menu-label>
      ${DOC_VERSIONS.map((v) => `<sav-menu-item type="checkbox" value="${esc(v.major)}" ${v.current ? 'checked' : ''}>${esc(v.title)}${v.current ? ' (latest)' : ''}<span slot="suffix" class="muted small">${esc(v.label)}</span></sav-menu-item>`).join('')}
      <sav-menu-item value="versions"><sav-icon slot="prefix" name="history"></sav-icon>What changed between versions</sav-menu-item>`;
    dd.addEventListener('sav-select', (e) => {
      const v = e.detail.value;
      if (v === 'versions') { location.hash = '#versions'; return; }
      const to = DOC_VERSIONS.find((x) => x.major === v);
      if (to && !to.current) location.href = to.url;
      else e.detail.item.checked = true; // the current one stays ticked
    });
  }

  /** The filter of the components on the overview: text and group chips. */
  function mountCompFilter(main) {
    const f = main.querySelector('#compFilter'), g = main.querySelector('#compGroups'); if (!f || !g) return;
    const apply = () => {
      const q = (f.value || '').trim().toLowerCase(), grp = g.value || 'all';
      let shown = 0;
      main.querySelectorAll('.comp-group').forEach((sec) => {
        const inGroup = grp === 'all' || sec.dataset.group === grp; let n = 0;
        sec.querySelectorAll('.comp-card').forEach((c) => { const ok = inGroup && (!q || c.dataset.name.includes(q)); c.hidden = !ok; if (ok) n++; });
        sec.hidden = !n; shown += n;
      });
      main.querySelector('.comp-empty').hidden = !!shown;
    };
    f.addEventListener('input', apply); g.addEventListener('change', apply);
    main.querySelector('[data-clear]')?.addEventListener('click', (e) => { e.preventDefault(); f.value = ''; g.value = 'all'; apply(); });
  }

  function route() {
    const [id, params] = hashParts();
    const main = $('#main');
    const d = DOCS.find((x) => x.id === id);
    const extra = window.SavAccount?.pages?.[id];
    main.innerHTML = extra ? extra.html() + footer() : id === 'start' ? pageStart() : id === 'theming' ? pageTheming() : id === 'styles' ? pageStyles() : id === 'examples' ? pageExamples() : id === 'versions' ? pageVersions() : d ? pageComponent(d) : pageHome();
    // scripts inside demos do not run from innerHTML: re-create them
    main.querySelectorAll('.demo-view script').forEach((old) => { const s = document.createElement('script'); s.textContent = `{\n${old.textContent}\n}`; old.replaceWith(s); }); // a block: running a demo twice never redeclares its const
    if ($('#iconGrid')) mountIcons(params.get('q') || '');
    document.title = (d ? d.name : extra ? extra.title : { start: 'Getting started', theming: 'Theming', styles: 'Styles', examples: 'Practical examples', versions: 'Versions' }[id] || 'Web components you can customise') + ' — SavComponents';
    if (d?.play) mountPlayground(d);
    if (d) window.SavA11y?.mount(main);
    if (!id) mountCompFilter(main);
    extra?.mount?.(main);
    document.dispatchEvent(new CustomEvent('savc:route', { detail: { id } }));
    markActive();
    document.body.classList.remove('nav-open');
    $('#menuBtn').setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
    if (id) main.focus({ preventScroll: true });
    const sec = params.get('s') && (document.getElementById('s-' + params.get('s')) || document.getElementById(params.get('s')));
    if (sec) sec.scrollIntoView();
  }

  /* ------------------------------------------------------------ theme customiser */

  const PRESETS = {
    Default: {},
    Ocean: { primary: '#0b7fab', success: '#0f9d7a', warning: '#e5a00d', danger: '#d64561', neutral: '#557083', radius: 10, font: 'system' },
    Forest: { primary: '#2f7d4a', success: '#3f9a3c', warning: '#c98a12', danger: '#c0392b', neutral: '#5f6b5a', radius: 6, font: 'humanist' },
    Sunset: { primary: '#e4572e', success: '#2a9d8f', warning: '#f4a261', danger: '#c81d4e', neutral: '#6d5a6e', radius: 16, font: 'rounded' },
    Graphite: { primary: '#2b2f3a', success: '#2e8b57', warning: '#d4a017', danger: '#c0392b', neutral: '#6b7280', radius: 3, font: 'system', density: 'compact' },
    Paper: { primary: '#8a4fff', success: '#1b998b', warning: '#e0a100', danger: '#e03e52', neutral: '#6b6b80', radius: 0, font: 'serif', border: 2 },
  };
  const FONTS = {
    system: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    humanist: 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif',
    rounded: 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT", Calibri, sans-serif',
    serif: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, Georgia, serif',
    mono: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace',
  };
  const DENSITY = { compact: ['1.75rem', '2.125rem', '2.625rem'], normal: ['2rem', '2.5rem', '3rem'], comfortable: ['2.25rem', '2.875rem', '3.5rem'] };
  const COLOR_KEYS = ['primary', 'success', 'warning', 'danger', 'neutral'];

  let theme = store.get('savc-theme', {});

  /** Picks dark or light text for a solid background */
  function onColor(hex) {
    const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex || '');
    if (!m) return null;
    const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const L = 0.2126 * lin(parseInt(m[1], 16)) + 0.7152 * lin(parseInt(m[2], 16)) + 0.0722 * lin(parseInt(m[3], 16));
    // white unless it falls below 3:1 (bold UI text), which keeps brand colours looking as expected
    return 1.05 / (L + 0.05) >= 3 ? '#ffffff' : '#16181f';
  }

  function themeTokens(t = theme) {
    const out = {};
    for (const k of COLOR_KEYS) if (t[k]) { out['--sav-color-' + k] = t[k]; out['--sav-color-on-' + k] = onColor(t[k]); }
    if (t.radius !== undefined) {
      const r = Number(t.radius);
      out['--sav-radius-sm'] = Math.round(r / 2) + 'px';
      out['--sav-radius'] = r + 'px';
      out['--sav-radius-lg'] = Math.round(r * 1.7) + 'px';
    }
    if (t.font && t.font !== 'system') out['--sav-font'] = FONTS[t.font];
    if (t.density && t.density !== 'normal') { const [s, m, l] = DENSITY[t.density]; out['--sav-control-sm'] = s; out['--sav-control-md'] = m; out['--sav-control-lg'] = l; }
    if (t.scale && Number(t.scale) !== 15) {
      const px = Number(t.scale);
      out['--sav-font-size-sm'] = (px - 2) / 16 + 'rem';
      out['--sav-font-size-md'] = px / 16 + 'rem';
      out['--sav-font-size-lg'] = (px + 2) / 16 + 'rem';
    }
    if (t.border && Number(t.border) !== 1) out['--sav-border-width'] = t.border + 'px';
    // tilt: by length (the same lift at the corners of every element), a fixed angle, or none
    if (t.tiltMode === 'length') out['--sav-tilt-lift'] = -Number(t.tiltLift ?? 3) + 'px';
    if (t.tiltMode === 'angle') out['--sav-tilt'] = Number(t.tiltAngle ?? -2) + 'deg';
    if (t.tiltMode === 'off') out['--sav-tilt'] = '0deg';
    return out;
  }

  const ALL_TOKENS = ['color-primary', 'color-success', 'color-warning', 'color-danger', 'color-neutral', 'color-on-primary', 'color-on-success', 'color-on-warning', 'color-on-danger', 'color-on-neutral', 'radius-sm', 'radius', 'radius-lg', 'font', 'control-sm', 'control-md', 'control-lg', 'font-size-sm', 'font-size-md', 'font-size-lg', 'border-width', 'tilt', 'tilt-lift'];
  function applyTheme() {
    const root = document.documentElement;
    ALL_TOKENS.forEach((t) => root.style.removeProperty('--sav-' + t));
    for (const [k, v] of Object.entries(themeTokens())) root.style.setProperty(k, v);
    store.set('savc-theme', theme);
    if (location.hash === '#theming') { const y = scrollY; route(); scrollTo(0, y); }
  }

  function defaultColor(k) {
    // value from the stylesheet (inline overrides removed for the read)
    const root = document.documentElement, prev = root.style.getPropertyValue('--sav-color-' + k);
    root.style.removeProperty('--sav-color-' + k);
    const v = getComputedStyle(root).getPropertyValue('--sav-color-' + k).trim();
    if (prev) root.style.setProperty('--sav-color-' + k, prev);
    return v;
  }

  function renderThemer() {
    const body = $('#themerBody');
    const mode = store.get('savc-mode', 'auto');
    body.innerHTML = `
      <div class="t-sec"><div class="t-lbl">Presets</div><div class="presets">${Object.entries(PRESETS).map(([n, p]) => `<button type="button" class="preset" data-p="${n}"><span class="pv">${COLOR_KEYS.slice(0, 4).map((k) => `<i style="background:${p[k] || defaultColor(k)}"></i>`).join('')}</span>${n}</button>`).join('')}</div></div>
      <div class="t-sec"><sav-select id="tStyle" label="Style" size="sm" value="${store.get('savc-style', 'tilt')}" help="${STYLE_INFO[store.get('savc-style', 'tilt')][1]}">${Sav.styles.map((s) => `<option value="${s}">${STYLE_INFO[s][0]}</option>`).join('')}</sav-select></div>
      <div class="t-sec"><sav-radio-group label="Mode" appearance="buttons" size="sm" id="tMode" value="${mode}"><sav-radio value="light">Light</sav-radio><sav-radio value="dark">Dark</sav-radio><sav-radio value="auto">System</sav-radio></sav-radio-group></div>
      <div class="t-sec"><div class="t-lbl">Colours</div><div class="colors">${COLOR_KEYS.map((k) => `<label class="color"><input type="color" data-k="${k}" value="${theme[k] || defaultColor(k)}"><span>${k[0].toUpperCase() + k.slice(1)}</span><code>${theme[k] || defaultColor(k)}</code></label>`).join('')}</div></div>
      <div class="t-sec"><sav-range id="tRadius" label="Corner radius" min="0" max="20" value="${theme.radius ?? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sav-radius'))}" show-value unit="px"></sav-range></div>
      <div class="t-sec"><sav-range id="tScale" label="Text size" min="13" max="18" value="${theme.scale ?? 15}" show-value unit="px"></sav-range></div>
      <div class="t-sec"><sav-select id="tFont" label="Font" value="${theme.font || 'system'}" size="sm">${Object.keys(FONTS).map((f) => `<option value="${f}">${f[0].toUpperCase() + f.slice(1)}</option>`).join('')}</sav-select></div>
      <div class="t-sec"><sav-radio-group id="tDensity" label="Density" appearance="buttons" size="sm" value="${theme.density || 'normal'}"><sav-radio value="compact">Compact</sav-radio><sav-radio value="normal">Normal</sav-radio><sav-radio value="comfortable">Roomy</sav-radio></sav-radio-group></div>
      <div class="t-sec"><sav-radio-group id="tBorder" label="Border width" appearance="buttons" size="sm" value="${theme.border || 1}"><sav-radio value="1">1px</sav-radio><sav-radio value="2">2px</sav-radio></sav-radio-group></div>
      <div class="t-sec tilt-sec"><sav-radio-group id="tTilt" appearance="buttons" size="sm" value="${theme.tiltMode || 'style'}"><span slot="label" class="knob-l">Lean${' '}<sav-info-tip size="sm" sheet-on-mobile content="How much things lean. “By length”: every element lifts by the same few pixels at its corners, so long elements lean less than short ones. “Angle”: everything leans by the same angle. “Style”: what the chosen style decides (only Tilt leans)."></sav-info-tip></span>
        <sav-radio value="style">Style</sav-radio><sav-radio value="length">By length</sav-radio><sav-radio value="angle">Angle</sav-radio><sav-radio value="off">Off</sav-radio></sav-radio-group>
        ${theme.tiltMode === 'length' ? `<sav-range id="tLift" label="Lift at the corners" min="0" max="10" step="0.5" value="${theme.tiltLift ?? 3}" show-value unit="px"></sav-range>` : ''}
        ${theme.tiltMode === 'angle' ? `<sav-range id="tAngle" label="Angle" min="-8" max="8" step="0.5" value="${theme.tiltAngle ?? -2}" show-value unit="°"></sav-range>` : ''}</div>
      <div class="t-sec t-preview"><div class="t-lbl">Preview</div>
        <div class="row"><sav-button size="sm">Primary</sav-button><sav-button size="sm" appearance="soft">Soft</sav-button><sav-button size="sm" appearance="outline" variant="neutral">Outline</sav-button></div>
        <div class="row"><sav-badge variant="success">Success</sav-badge><sav-badge variant="warning">Warning</sav-badge><sav-badge variant="danger">Danger</sav-badge><sav-switch size="sm" checked>On</sav-switch></div>
      </div>`;
    body.querySelectorAll('.preset').forEach((b) => b.addEventListener('click', () => { theme = { ...PRESETS[b.dataset.p] }; applyTheme(); renderThemer(); }));
    body.querySelectorAll('input[type="color"]').forEach((i) => i.addEventListener('input', () => { theme[i.dataset.k] = i.value; i.nextElementSibling.nextElementSibling.textContent = i.value; applyTheme(); }));
    $('#tRadius').addEventListener('input', (e) => { theme.radius = Number(e.currentTarget.value); applyTheme(); });
    $('#tScale').addEventListener('input', (e) => { theme.scale = Number(e.currentTarget.value); applyTheme(); });
    $('#tTilt').addEventListener('change', (e) => { const v = e.currentTarget.value; if (v === 'style') delete theme.tiltMode; else theme.tiltMode = v; applyTheme(); renderThemer(); });
    $('#tLift')?.addEventListener('input', (e) => { theme.tiltLift = Number(e.currentTarget.value); applyTheme(); });
    $('#tAngle')?.addEventListener('input', (e) => { theme.tiltAngle = Number(e.currentTarget.value); applyTheme(); });
    $('#tFont').addEventListener('change', (e) => { theme.font = e.currentTarget.value; applyTheme(); });
    $('#tDensity').addEventListener('change', (e) => { theme.density = e.currentTarget.value; applyTheme(); });
    $('#tBorder').addEventListener('change', (e) => { theme.border = Number(e.currentTarget.value); applyTheme(); });
    $('#tMode').addEventListener('change', (e) => setMode(e.currentTarget.value));
    $('#tStyle').addEventListener('change', (e) => setStyle(e.currentTarget.value));
  }

  function exportCss() {
    const tokens = themeTokens();
    const lines = Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`);
    const mode = store.get('savc-mode', 'auto');
    const st = store.get('savc-style', 'tilt');
    const cls = `sav-theme-${mode}` + (st !== 'soft' ? ` sav-style-${st}` : '');
    const css = `/* SavComponents theme — load after sav.css */\n/* add class="${cls}" to <html> */\n:root {\n${lines.length ? lines.join('\n') : '  /* default colours: nothing to override */'}\n}`;
    $('#exportCode').code = css;
    $('#exportDialog').show();
  }

  /* ------------------------------------------------------------ styles, light / dark */

  function setStyle(style) {
    store.set('savc-style', style);
    Sav.setStyle(style);
    const sp = $('#stylePick'); if (sp && sp.value !== style) sp.value = style;
    delete theme.radius; // let the style decide the corners
    applyTheme();
    renderThemer();
    if (location.hash === '#styles') route();
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-style]'); if (b) setStyle(b.dataset.style);
    const j = e.target.closest('[data-jump]'); if (j) { e.preventDefault(); document.getElementById(j.dataset.jump)?.scrollIntoView({ behavior: 'smooth' }); }
  });

  function setMode(mode) {
    store.set('savc-mode', mode);
    const dark = mode === 'dark' || (mode === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    Sav.setMode(dark ? 'dark' : 'light');
    const mp = $('#modePick'); if (mp && mp.getAttribute('value') !== mode) mp.setAttribute('value', mode); // the header uses the library's own Theme choice
    const g = $('#tMode'); if (g && g.value !== mode) g.value = mode;
    if (location.hash === '#theming' || location.hash === '#styles') route();
  }

  /* ------------------------------------------------------------ search with suggestions while typing */

  function searchIndex() {
    const out = [
      { label: 'Getting started', sub: 'How to add the library to a site', href: '#start', kind: 'Page', icon: 'arrow-right' },
      { label: 'Theming', sub: 'Colours, tokens, ::part()', href: '#theming', kind: 'Page', icon: 'palette' },
      { label: 'Styles', sub: 'Soft, Tilt, Sharp, Brutal, Glass', href: '#styles', kind: 'Page', icon: 'layers' },
      { label: 'Practical examples', sub: 'Sign-in, settings, shop cards…', href: '#examples', kind: 'Page', icon: 'image' },
      { label: 'Demo website', sub: 'A whole lorem ipsum site made only with the library', href: 'demo.html', kind: 'Page', icon: 'layout', words: 'demo example site template landing' },
      { label: 'Versions', sub: 'What changes between major versions', href: '#versions', kind: 'Page', icon: 'history', words: 'changelog release update migrate breaking' },
    ];
    for (const d of DOCS) {
      out.push({ label: d.name, sub: d.tag, href: '#' + d.id, kind: 'Component', icon: d.icon, words: `${d.group} ${plain(d.desc)}` });
      for (const x of d.demos) out.push({ label: `${d.name} › ${x.title}`, sub: d.tag, href: `#${d.id}?s=${slug(x.title)}`, kind: 'Section', icon: d.icon });
      for (const [names, values] of d.attrs || []) {
        if (!/ · /.test(values) || /CSS/.test(values)) continue;
        out.push({ label: `${d.name}: ${names}`, sub: values, href: `#${d.id}`, kind: 'Option', icon: d.icon, words: values });
      }
      if (d.play) out.push({ label: `${d.name} › Playground`, sub: 'Try it and save it', href: `#${d.id}?s=playground`, kind: 'Section', icon: 'sliders' });
    }
    for (const e of window.SAVC_EXAMPLES || []) out.push({ label: e.title, sub: 'Practical example', href: `#examples`, kind: 'Example', icon: 'image', words: e.uses });
    return out;
  }

  let searchOpener = null; // set by initSearch: opens the search on phones
  function initSearch() {
    const input = $('#search'), box = $('#searchSug');
    if (!input || !box) return;
    const index = searchIndex();
    let items = [], active = -1, icons = null;
    const score = (e, t) => {
      const l = e.label.toLowerCase();
      if (l === t) return 100;
      if (l.startsWith(t)) return 80 - l.length / 100;
      if (l.split(/[\s›:]+/).some((w) => w.startsWith(t))) return 60;
      if (l.includes(t)) return 40;
      if ((e.sub + ' ' + (e.words || '')).toLowerCase().includes(t)) return 20;
      return 0;
    };
    const close = () => { box.hidden = true; input.setAttribute('aria-expanded', 'false'); active = -1; };
    const go = (it) => { if (!it) return; location.hash = it.href.slice(1); input.value = ''; close(); input.blur(); renderSide(); setSearchOpen(false); };
    // phones: the search button opens the field over the whole header, the X closes it (and clears it)
    const openBtn = $('#searchOpen'), closeBtn = $('#searchClose');
    function setSearchOpen(open) {
      if (!openBtn || document.body.classList.contains('search-open') === open) return;
      document.body.classList.toggle('search-open', open); openBtn.setAttribute('aria-expanded', String(open));
      if (open) input.focus();
      else { if (input.value) { input.value = ''; renderSide(); } close(); if (getComputedStyle(openBtn).display !== 'none') openBtn.focus({ preventScroll: true }); }
    }
    searchOpener = () => setSearchOpen(true);
    openBtn?.addEventListener('click', () => setSearchOpen(true));
    closeBtn?.addEventListener('click', () => setSearchOpen(false));
    matchMedia('(max-width: 640px)').addEventListener('change', (m) => { if (!m.matches) setSearchOpen(false); });
    const paint = () => {
      box.innerHTML = items.length ? items.map((it, i) => `${i === 0 || items[i - 1].kind !== it.kind ? `<div class="sug-h">${it.kind === 'Icon' ? 'Icons' : it.kind + 's'}</div>` : ''}
        <a href="${it.href}" class="sug${i === active ? ' on' : ''}" role="option" id="sug-${i}" data-i="${i}"><sav-icon name="${esc(it.icon || 'search')}"></sav-icon><span><b>${esc(it.label)}</b><small>${esc(it.sub || '')}</small></span></a>`).join('')
        : `<div class="sug-empty">Nothing found for “${esc(input.value.trim())}”.</div>`;
      box.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      input.setAttribute('aria-activedescendant', active >= 0 ? `sug-${active}` : '');
    };
    const update = async () => {
      const t = input.value.trim().toLowerCase();
      renderSide(input.value);
      if (!t) { close(); return; }
      const order = ['Component', 'Page', 'Section', 'Option', 'Example'];
      const found = index.map((e) => [e, score(e, t)]).filter(([, sc]) => sc > 0).sort((a, b) => b[1] - a[1] || order.indexOf(a[0].kind) - order.indexOf(b[0].kind)).slice(0, 9).map(([e]) => e);
      found.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));
      icons ||= await loadIconIndex();
      const ic = Object.keys(icons).filter((n) => n.includes(t) || icons[n].some((g) => g.includes(t))).sort((a, b) => (b.startsWith(t) - a.startsWith(t)) || a.length - b.length).slice(0, 6)
        .map((n) => ({ label: n, sub: 'Icon · <sav-icon name="' + n + '">', href: `#icon?q=${n}`, kind: 'Icon', icon: n }));
      if (input.value.trim().toLowerCase() !== t) return; // a newer search is running
      items = [...found, ...ic];
      active = items.length ? 0 : -1;
      paint();
    };
    input.setAttribute('role', 'combobox'); input.setAttribute('aria-controls', 'searchSug'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-expanded', 'false');
    let tm;
    input.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(update, 90); });
    input.addEventListener('focus', () => { if (input.value.trim()) update(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { if (!items.length) return; e.preventDefault(); active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; paint(); box.querySelector('.sug.on')?.scrollIntoView({ block: 'nearest' }); }
      else if (e.key === 'Enter') { e.preventDefault(); go(items[active] || items[0]); }
      else if (e.key === 'Escape') { input.value = ''; close(); renderSide(); input.blur(); setSearchOpen(false); }
    });
    box.addEventListener('mousedown', (e) => e.preventDefault()); // keep the focus in the field
    box.addEventListener('click', (e) => { const a = e.target.closest('.sug'); if (a) { e.preventDefault(); go(items[a.dataset.i]); } });
    input.addEventListener('blur', () => setTimeout(close, 120));
  }

  /* ------------------------------------------------------------ boot */

  // the phone menu is wired first: if a later step fails in some browser, the menu still opens
  const menuBtn = $('#menuBtn'), side = $('#side');
  const setNav = (open) => { document.body.classList.toggle('nav-open', open); menuBtn.setAttribute('aria-expanded', String(open)); menuBtn.setAttribute('aria-label', open ? 'Close the menu' : 'Open the menu'); };
  menuBtn.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
  side.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { setNav(false); menuBtn.focus(); } });
  document.addEventListener('click', (e) => { if (document.body.classList.contains('nav-open') && !e.target.closest('#side, #menuBtn')) setNav(false); });

  // every other start-up step runs on its own: one failing does not stop the next ones
  const safely = (name, fn) => { try { fn(); } catch (err) { console.error(`[SavComponents docs] ${name} failed:`, err); } };
  safely('menu', renderSide);
  ['#side', '#main'].forEach((s) => $(s)?.removeAttribute('aria-busy')); // the loading skeleton is gone
  safely('theme', applyTheme);
  safely('mode', () => setMode(store.get('savc-mode', 'auto')));
  safely('page', route);
  safely('customiser', renderThemer);
  addEventListener('hashchange', () => safely('page', route));
  safely('system mode', () => matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => store.get('savc-mode', 'auto') === 'auto' && setMode('auto')));
  safely('theme choice', () => {
    $('#modePick').setAttribute('value', store.get('savc-mode', 'auto'));
    $('#modePick').addEventListener('change', (e) => setMode(e.detail.value));
  });
  safely('customiser buttons', () => {
    $('#customizeBtn').addEventListener('click', () => $('#themer').show());
    $('#resetTheme').addEventListener('click', () => { theme = {}; applyTheme(); renderThemer(); });
    $('#exportTheme').addEventListener('click', exportCss);
  });
  safely('style picker', () => {
    const sp = $('#stylePick'); if (!sp) return;
    sp.innerHTML = Sav.styles.map((x) => `<option value="${x}" data-description="${esc(STYLE_INFO[x][1])}">${STYLE_INFO[x][0]}</option>`).join('');
    sp.value = store.get('savc-style', 'tilt');
    sp.addEventListener('change', () => setStyle(sp.value));
  });
  safely('search', initSearch);
  safely('version picker', initVersionPicker);
  addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.target.closest('input, textarea, [contenteditable], sav-input, sav-textarea')) { e.preventDefault(); if (searchOpener && getComputedStyle($('#searchOpen')).display !== 'none') searchOpener(); else $('#search').focus(); }
  });
})();
