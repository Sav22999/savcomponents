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
  /* The released versions, newest first (window.SAVC_RELEASES in index.html, kept by tools/release.sh). The site runs the newest
     one; ?v=<version> runs it with an older release, chosen in the menu next to the logo. */
  const RELEASES = window.SAVC_RELEASES?.length ? window.SAVC_RELEASES : [Sav.version];
  const LATEST = RELEASES[0];
  const OLDER = Sav.version !== LATEST && RELEASES.includes(Sav.version); // the site is showing an older release
  const shortVer = (v) => 'v' + String(v).replace(/\.0$/, ''); // 1.1.0 → v1.1, 1.1.2 → v1.1.2
  /** The address of the current page with another release (the newest has no ?v). */
  const verUrl = (v) => { const u = new URL(location.href); if (v === LATEST) u.searchParams.delete('v'); else u.searchParams.set('v', v); return u.href; };
  const LIB_URL = `${PUBLIC_URL}/v/${Sav.version}`; // a fixed version: a new release never changes a site that uses this one
  /* Subresource Integrity for the copy-paste snippet: the hashes frozen next to the release (v/<version>/integrity.json).
     Fetched once; until it arrives (or for an old release without the file) the snippet simply shows no integrity. */
  let SRI = null; // { 'sav.js': 'sha384-…', 'sav.css': 'sha384-…' }
  const sriAttr = (file) => (SRI && SRI[file] ? ` integrity="${SRI[file]}" crossorigin="anonymous"` : '');
  fetch(`${LIB_URL}/integrity.json`).then((r) => (r.ok ? r.json() : null)).then((j) => {
    if (!j || !j['sav.js'] || !j['sav.css']) return;
    SRI = j;
    const [id] = hashParts(); // re-render the open page if it shows the snippet, so the integrity fills in
    if (id === 'start' || window.SavBuilder?.pages?.[id]) route();
  }).catch(() => {});
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
    // each link: an icon (shown when the sidebar is folded to a rail) and its name
    const link = (href, r, name, ic, extra = '') => `<a href="${href}"${r !== null ? ` data-r="${r}"` : ''}${extra}><span class="si" aria-hidden="true">${ICON(ic)}</span><span class="sl">${esc(name)}</span>`;
    const START = [['#', '', 'Overview', 'home'], ['#start', 'start', 'Getting started', 'rocket'], ['#theming', 'theming', 'Theming', 'palette'], ['#styles', 'styles', 'Styles', 'shapes'],
      ['#builder', 'builder', 'Component builder', 'wand-sparkles'], ['#examples', 'examples', 'Practical examples', 'layout-template'], ['#versions', 'versions', 'Versions', 'history']];
    let html = f ? '' : `<div class="side-group"><div class="side-title">Start</div>
      ${START.map(([h, r, n, i]) => link(h, r, n, i) + '</a>').join('')}${link('demo.html', null, 'Demo website', 'monitor', ' class="side-ext" target="_blank" rel="noopener"')}${ICON('external')}<span class="sr-only"> (opens in a new tab)</span></a>${link('academy/', null, 'Academy', 'graduation-cap', ' class="side-ext" target="_blank" rel="noopener"')}${ICON('external')}<span class="sr-only"> (opens in a new tab)</span></a></div>`;
    for (const g of groups) {
      const items = DOCS.filter((d) => d.group === g && match(d));
      if (!items.length) continue;
      html += `<div class="side-group"><div class="side-title">${g}</div>${items.map((d) => link('#' + d.id, d.id, d.name, d.icon || 'box') + '</a>').join('')}</div>`;
    }
    if (!html) html = '<p class="side-empty">No component found.</p>';
    $('#side').innerHTML = html;
    railTitles();
    markActive();
  }
  /** folded to a rail, each icon says its name on hover */
  function railTitles() {
    const on = document.body.classList.contains('side-collapsed');
    document.querySelectorAll('#side a').forEach((a) => { if (on) a.title = a.querySelector('.sl')?.textContent || ''; else a.removeAttribute('title'); });
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
    <sav-card class="academy-banner">
      <div class="ab">
        <img src="academy/icons/icon.svg" alt="" width="96" height="96" class="ab-ic">
        <div class="ab-t">
          <sav-heading level="2" eyebrow="New · SavComponents Academy" subtitle="A lesson for every component, quizzes, hands-on challenges checked live, a daily quiz, badges and streaks. With your SavComponents account, on the web and on Android.">Learn SavComponents by doing</sav-heading>
          <div class="row"><sav-badge appearance="soft">${DOCS.length + 9} lessons</sav-badge><sav-badge appearance="soft" variant="success">34 challenges</sav-badge><sav-badge appearance="soft" variant="warning">Daily quiz</sav-badge></div>
        </div>
        <div class="ab-go"><sav-button size="lg" href="academy/" icon-end="arrow-right">Start learning</sav-button><sav-button appearance="soft" href="academy/#daily" icon="calendar-check">Daily quiz</sav-button></div>
      </div>
    </sav-card>
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
    ${codeBlock(`<link rel="stylesheet" href="${LIB_URL}/sav.css"${sriAttr('sav.css')}>\n<script src="${LIB_URL}/sav.js" defer${sriAttr('sav.js')}></script>`)}
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
    <h2>Languages</h2>
    <p>The words the components write by themselves (Done, Today, Show password…) follow the language of the page: the closest <code>lang</code> attribute, then English. English and Italian are built in; add another, or change some words, right after <code>sav.js</code>. The English text is the key; the <code>*-label</code> attributes of a component always win. Every word goes through it, also what only screen readers hear, key names and continent names; dates, numbers, languages and countries are named by the browser in the same language.</p>
    ${codeBlock(`Sav.addStrings('fr', { Done: 'Terminé', 'Page {n}': 'Page {n}' });\n// Sav.strings.it has the whole list`, 'js')}
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
    const table = (title, head, rows) => !rows?.length ? '' : `<h2>${title}</h2><sav-table hover><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<code>${esc(c)}</code>` : c}</td>`).join('')}</tr>`).join('')}</tbody></table></sav-table>`;
    const idx = DOCS.indexOf(d), prev = DOCS[idx - 1], next = DOCS[idx + 1];
    return `<div class="doc-head"><sav-label class="eyebrow">${d.group}</sav-label><div class="title-row"><h1>${d.name}</h1><span class="fav-slot" data-fav="${d.id}"></span></div><p class="tagline"><code>${esc(d.tag)}</code></p>${d.builtFrom ? `<p class="built muted small">Built from ${d.builtFrom.map((b) => { const x = DOCS.find((y) => y.id === b); return x ? `<a href="#${b}">${x.name}</a>` : b; }).join(', ')}.</p>` : ''}<p class="lead">${d.desc}</p>${d.notice ? `<sav-alert class="doc-notice" variant="${d.notice.variant || 'warning'}" heading="${esc(d.notice.heading || 'Good to know')}">${d.notice.text}</sav-alert>` : ''}</div>
      ${d.demos.map((x) => `<h2 id="s-${slug(x.title)}">${x.title}</h2><div class="demo layered"><div class="demo-view">${x.html}</div>${codeBlock(x.html)}</div>`).join('')}
      ${d.id === 'icon' ? iconExplorerHtml() : ''}
      ${d.play ? playgroundHtml(d) : ''}
      ${window.SavRef ? window.SavRef.html(d) : `${table('Attributes', ['Name', 'Values', 'Description'], d.attrs && d.tag.startsWith('sav-') ? [...d.attrs, ['shape', 'tilt · squared · rounded', 'Shape of this component only, whatever the page style. See <a href="#styles">Styles</a>.']] : d.attrs)}
      ${table('Slots', ['Name', 'Description'], d.slots)}
      ${table('Events', ['Name', 'Description'], d.events)}
      ${table('Methods', ['Name', 'Description'], d.methods)}`}
      ${d.parts ? `<h2>CSS parts</h2><p>${d.parts.map((p) => `<code>${p}</code>`).join(' ')}</p>` : ''}
      ${window.SavA11y?.html(d.id) || ''}
      ${window.SavCompat?.html(d.id) || ''}
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

  const ANIM_DEMO = `<sav-switch>Normal</sav-switch>
<sav-switch animation-duration="900">Slow (900 ms)</sav-switch>
<sav-switch animation="off">No animation</sav-switch>

<!-- a whole section without animations -->
<section animation="off">…</section>
<!-- or with CSS -->
<style> .calm { --sav-motion: .5; } </style>`;
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
    <h2 id="animations">Animations</h2>
    <p>Every component animates its changes (opening, choosing, hovering, charts drawing themselves). On any component, or on a container around several:</p>
    <ul>
      <li><code>animation="off"</code>: no animation there, nor in what is inside it.</li>
      <li><code>animation="on"</code>: animated even inside an area where they are off.</li>
      <li><code>animation-duration="ms"</code> (on a component): how long they last, from 50 to 1000 ms. 200 is the normal pace; every animation of the component keeps its proportions.</li>
      <li><code>--sav-motion</code> in CSS: the same as a factor, for a whole page or section (<code>0</code> none, <code>1</code> normal, <code>2</code> twice as long).</li>
    </ul>
    <p class="muted">The components also follow the system setting “reduce motion”.</p>
    <div class="demo layered"><div class="demo-view">${ANIM_DEMO}</div>${codeBlock(ANIM_DEMO)}</div>
    <h2>From JavaScript</h2>
    ${codeBlock(`Sav.setStyle('tilt'); // 'soft' · 'tilt' · 'sharp' · 'brutal' · 'glass'`, 'js')}
    ${footer()}`;
  }

  /* Major versions: within one major version an update never breaks a site, so only a new major version (1.x → 2.x) can ask
     for changes. Add the newest major version at the top. Its releases (1.0, 1.1…) are listed from CHANGELOG.md (mountChangelog). */
  const MAJORS = [
    {
      v: '1', title: 'Version 1', when: 'November 2026', current: true,
      intro: 'The first public version: the library, the 5 styles and the customiser. Nothing to migrate from.',
      added: [
        'More than 50 components: buttons, favourite buttons, charts, carousels, media players, OTP and password fields, fields, pickers (select, date, time), dialogs, drawers, tabs, menus, alerts, progress, code blocks and more.',
        'Five styles (Soft, Tilt, Sharp, Brutal, Glass), light and dark mode, and per-element shapes (tilt, squared, rounded).',
        'Theming with CSS variables (--sav-*), the live customiser and saved themes you can link from any site.',
        'The component builder: every option of a component with a live preview, and code ready to copy (HTML, JavaScript, TypeScript, React, Vue).',
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
        <h3>Releases</h3><div class="ver-log" data-major="${esc(m.v)}"><p class="muted small">Loading the releases…</p></div>
      </section>`).join('');
    return `<div class="doc-head"><sav-label class="eyebrow">Start</sav-label><h1>Versions</h1>
      <p class="lead">What changes from one major version to the next (1.x → 2.x), and every release inside each one. Inside a major version every update is safe: same tags, same attributes, same tokens.</p></div>
      <sav-alert variant="primary" heading="Which version am I using?">The number is in the address of the library, for example <code>/v/${esc(Sav.version)}/sav.js</code>. A link to a version never changes: to get a newer one, change the number.</sav-alert>
      ${cards}
      <p class="muted small">The same list is in the <a href="https://github.com/Sav22999/savcomponents/blob/main/CHANGELOG.md" target="_blank" rel="noopener">changelog on GitHub</a>.</p>
      ${footer()}`;
  }

  /* The releases of each major version come from CHANGELOG.md (the one list of what changed): "## 1.1.0 — 2026-11-25", then
     optional plain lines and "- " items, whose next lines are indented. Read once, then kept. */
  let changelog = null;
  const loadChangelog = () => (changelog ||= fetch('CHANGELOG.md', { cache: 'no-cache' }).then((r) => (r.ok ? r.text() : Promise.reject(r.status))).then(parseChangelog).catch((e) => { changelog = null; throw e; }));
  function parseChangelog(md) {
    const out = []; let rel = null, item = null;
    for (const line of md.split('\n')) {
      const h = line.match(/^##\s+(\d+\.\d+\.\d+)\s*(?:—|-)?\s*(.*)$/);
      if (h) { rel = { v: h[1], date: h[2].trim(), intro: [], items: [] }; out.push(rel); item = null; continue; }
      if (!rel || !line.trim()) continue;
      if (/^- /.test(line)) { item = line.slice(2).trim(); rel.items.push(item); }
      else if (/^\s/.test(line) && rel.items.length) rel.items[rel.items.length - 1] += ' ' + line.trim();
      else rel.intro.push(line.trim());
    }
    return out;
  }
  /** Markdown inside a line: `code`, **bold**, [text](https://…); everything else is plain text. */
  const mdInline = (t) => esc(t).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  const longDate = (d) => (/^\d{4}-\d{2}-\d{2}$/.test(d) ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(d + 'T00:00:00Z')) : d);
  function mountChangelog(main) {
    const boxes = [...main.querySelectorAll('.ver-log')]; if (!boxes.length) return;
    loadChangelog().then((all) => boxes.forEach((box) => {
      if (!box.isConnected) return;
      const list = all.filter((r) => r.v.split('.')[0] === box.dataset.major);
      box.innerHTML = list.length ? list.map((r, i) => `<sav-details appearance="plain" class="ver-rel" id="r${esc(r.v)}" ${i === 0 ? 'open' : ''}>
          <span slot="summary" class="ver-rel-sum"><b>${esc(shortVer(r.v))}</b><code>${esc(r.v)}</code>
            ${r.v === LATEST ? '<sav-badge variant="success" size="sm">Latest</sav-badge>' : ''}${r.v === Sav.version && OLDER ? '<sav-badge variant="warning" size="sm">Viewing</sav-badge>' : ''}
            <span class="muted small">${esc(longDate(r.date))} · ${r.items.length} ${r.items.length === 1 ? 'change' : 'changes'}</span></span>
          ${r.intro.map((p) => `<p>${mdInline(p)}</p>`).join('')}
          ${r.items.length ? `<ul class="ver-list">${r.items.map((x) => `<li>${mdInline(x)}</li>`).join('')}</ul>` : ''}
          ${RELEASES.includes(r.v) && r.v !== Sav.version ? `<p><a href="${esc(verUrl(r.v))}">See the site with ${esc(shortVer(r.v))}</a></p>` : ''}
        </sav-details>`).join('') : '<p class="muted small">No releases listed yet.</p>';
    })).catch(() => boxes.forEach((box) => { box.innerHTML = '<p class="muted small">The list of releases could not be loaded: see the changelog on GitHub, linked below.</p>'; }));
  }

  function pageExamples() {
    const EX = window.SAVC_EXAMPLES;
    // the list of examples: buttons of the library, so they follow the style chosen for the site
    const toc = EX.map((e) => `<sav-button size="sm" appearance="soft" variant="neutral" href="#ex-${e.id}" data-jump="ex-${e.id}">${e.title}</sav-button>`).join('');
    return `<div class="doc-head"><sav-label class="eyebrow">Start</sav-label><h1>Practical examples</h1><p class="lead">Small, realistic screens built only with SavComponents, with the JavaScript (or TypeScript) that listens to their events. Copy the code and adapt it: names, prices and numbers are made up.</p><div class="ex-toc">${toc}</div></div>
    ${EX.map((e) => `<h2 id="ex-${e.id}">${e.title}</h2><p>${e.desc}</p><p class="uses">Uses: ${e.uses.split(' · ').map((u) => `<code>sav-${u}</code>`).join(' ')}</p>
      <div class="demo layered"><div class="demo-view">${e.html}${e.js ? `<script>${e.js}</script>` : ''}</div>
        ${e.js ? `<sav-tabs class="code-tabs ex-code"><sav-tab label="HTML" name="html">${codeBlock(e.html)}</sav-tab><sav-tab label="JavaScript" name="js">${codeBlock(e.js, 'js')}</sav-tab>${e.ts ? `<sav-tab label="TypeScript" name="ts">${codeBlock(e.ts, 'ts')}</sav-tab>` : ''}</sav-tabs>` : codeBlock(e.html)}</div>`).join('')}
    ${footer()}`;
  }

  /* ------------------------------------------------------------ playground: one component, your settings */

  /** Knobs read from the attribute table: "boolean" rows become switches, "a · b · c" rows become selects. */
  /* ------------------------------------------------------------ the options of a component (playground and builder) */

  /** Friendlier names than the attribute itself (the attribute stays in the tip and in the code). */
  const KNOB_LABELS = {
    'icon-end': 'Icon after the text', noicon: 'No icon', 'no-icon': 'No icon', 'sheet-on-mobile': 'Sheet on phones', 'native-on-mobile': 'Native on phones', native: 'Native control',
    'show-value': 'Show the value', 'max-chips': 'Chips shown at most', 'min-chars': 'Letters before suggesting or searching', 'max-terms': 'Most terms', 'replay-label': 'Replay button text', 'max-label': 'Text when full', separators: 'Keys that add a term', 'search-keys': 'Keys that search', live: 'Search while typing', 'empty-label': 'Text when nothing is found', 'no-filter': 'Do not filter',
    'per-view': 'Slides at once', 'no-arrows': 'No arrows', 'touch-arrows': 'Arrows on touch screens', 'no-hint': 'No swipe hint', 'no-dots': 'No dots', 'no-swipe': 'No swipe', 'no-keyboard': 'No arrow keys',
    'native-controls': 'Browser controls', 'no-header': 'No header', 'no-close': 'No close button', 'stay-open': 'Stays open after a choice', 'mobile-only': 'Only on phones',
    'max-items': 'Items before folding', 'no-legend': 'No legend', 'show-values': 'Show the values', 'no-fill': 'No fill', 'week-start': 'Week starts on', 'no-meter': 'No strength bar',
    'min-strength': 'Minimum strength', 'min-length': 'Minimum length', 'min-uppercase': 'Capital letters at least', 'min-lowercase': 'Small letters at least', 'min-digits': 'Digits at least',
    'min-symbols': 'Symbols at least', 'native-names': 'Names in their own language', 'no-flag': 'No flag', 'no-code': 'No code', 'no-auto': 'No “Auto” choice', 'icons-only': 'Only icons',
    'apply': 'Switch the page', 'zoom-src': 'Bigger picture for the zoom', 'desktop-alt': 'Desktop picture text', 'mobile-alt': 'Phone picture text', 'no-line-numbers': 'No line numbers',
    'no-copy': 'No copy button', 'max-size': 'Largest file', 'first-day': 'First day of the week', 'hour-cycle': 'Clock', 'seen-key': 'Hide once seen (key)', 'search-collapse': 'Search as a button',
    'menu-button': 'Menu button side', 'collapse-button': 'Fold button', 'collapse-label': 'Fold button text', 'expand-label': 'Unfold button text', 'icon-placement': 'Icon position',
    'min-gap': 'Smallest gap', 'copy-label': 'Text before copying', 'success-label': 'Text after copying', 'error-label': 'Text if copying fails', 'password-toggle': 'Show-password button',
    'auto-text': 'Readable text (black or white)', 'interactive': 'Clickable', 'antarctica': 'Show Antarctica', 'href': 'Link (href)', 'target': 'Open link in', 'alt': 'Picture text (alt)', 'src': 'Picture or file (src)', 'srcset': 'Picture sizes (srcset)',
    'help': 'Help text', 'eyebrow': 'Small text above', 'subtitle': 'Text below', 'separator': 'Separator', 'variant': 'Colour',
  };
  const knobLabel = (n) => KNOB_LABELS[n] || titleCase(n);
  /** Options that most people never touch: they go in "Advanced" in the builder. */
  const ADVANCED = new Set(['name', 'locale', 'sheet-on-mobile', 'native-on-mobile', 'native', 'href', 'target', 'no-keyboard', 'eager', 'srcset', 'sizes', 'zoom-src', 'debounce',
    'seen-key', 'touch-arrows', 'no-hint', 'first-day', 'hour-cycle', 'week-start', 'breakpoint', 'max-chips', 'data-description', 'required', 'readonly', 'antarctica', 'levels']);
  /** The order fields appear in (lower first); the rest keep the order of the attribute table. */
  const KNOB_ORDER = ['label', 'heading', 'eyebrow', 'subtitle', 'content', 'placeholder', 'help', 'value', 'start', 'end', 'min', 'max', 'step', 'unit', 'prefix', 'src', 'poster', 'alt', 'caption', 'icon', 'icon-end',
    'variant', 'appearance', 'size', 'type', 'orientation', 'placement', 'align', 'shape'];
  const orderOf = (n) => { const i = KNOB_ORDER.indexOf(n); return i < 0 ? KNOB_ORDER.length : i; };
  // words that describe a kind of value, not a choice: "tag · list", "number · date", "string · list" are free fields
  const NOT_CHOICES = /^(string|number|list|url|json|length|bytes|ms|alpha-2)$/;

  /** a data field (JSON): true when it reads well (or is empty); otherwise it says what is wrong under the field */
  function jsonOk(el, v) {
    let ok = true; if (v) try { JSON.parse(v); } catch { ok = false; }
    const msg = 'Not valid JSON yet: check the brackets, the "quotes" and the commas.';
    el.setCustomValidity?.(ok ? '' : msg); // the field keeps itself red while this is set
    el.toggleAttribute('data-user-invalid', !ok);
    ok ? el.removeAttribute('help') : el.setAttribute('help', msg);
    return ok;
  }

  /** which option a description calls the default: "Default underline." or "edge (…, the default)" (the last option named before the word) */
  function defaultOf(opts, desc) {
    const t = String(desc || '');
    const m = t.match(/\bdefault(?: is)?:?\s+["“]?([a-z0-9-]+)/i); if (m && opts.includes(m[1])) return m[1];
    const at = t.search(/\bdefault\b/i); if (at < 0) return '';
    let best = '', pos = -1;
    for (const o of opts) {
      const re = new RegExp(`(^|[^a-z-])${o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-z-])`, 'gi'); let x;
      while ((x = re.exec(t)) && x.index < at) if (x.index > pos) { pos = x.index; best = o; }
    }
    return best;
  }
  /** Options that only matter when another one is set: [when it applies, what the field says otherwise].
      The field stays in its place but is disabled (and says why) until the option it depends on allows it. */
  const on = (v) => v === true || v === '' || v === 'true';
  const DEPENDS = {
    '*': { 'animation-duration': [(a) => a.animation !== 'off', 'Animations are off'] },
    tabs: {
      side: [(a) => a.orientation === 'vertical', 'Only for vertical tabs'], collapsible: [(a) => a.orientation === 'vertical', 'Only for vertical tabs'],
      collapsed: [(a) => a.orientation === 'vertical' && on(a.collapsible), 'Only for vertical tabs that can fold'],
      'collapse-button': [(a) => a.orientation === 'vertical' && on(a.collapsible), 'Only for vertical tabs that can fold'],
      'collapse-label': [(a) => a.orientation === 'vertical' && on(a.collapsible), 'Only for vertical tabs that can fold'],
      'expand-label': [(a) => a.orientation === 'vertical' && on(a.collapsible), 'Only for vertical tabs that can fold'],
    },
    search: {
      separators: [(a) => on(a.multiple), 'Only with several terms (multiple)'], 'max-terms': [(a) => on(a.multiple), 'Only with several terms (multiple)'],
      'max-label': [(a) => on(a.multiple) && !!a['max-terms'], 'Only with multiple and a most terms'],
    },
    'chip-input': { 'max-label': [(a) => !!a['max-terms'], 'Only with a most terms'] },
    select: {
      'max-chips': [(a) => on(a.multiple) && !on(a.native), 'Only with multiple, in the library’s list'], 'auto-text': [(a) => on(a.multiple), 'Only with multiple'],
      searchable: [(a) => !on(a.native), 'Not with the native control'], clearable: [(a) => !on(a.native), 'Not with the native control'],
      'sheet-on-mobile': [(a) => !on(a.native), 'Not with the native control'], 'native-on-mobile': [(a) => !on(a.native), 'Not with the native control'],
    },
    'date-picker': {
      'sheet-on-mobile': [(a) => !on(a.native), 'Not with the native control'], 'native-on-mobile': [(a) => !on(a.native), 'Not with the native control'],
      'first-day': [(a) => !a.mode || a.mode === 'date', 'Only when choosing a day'],
    },
    'time-picker': { 'sheet-on-mobile': [(a) => !on(a.native), 'Not with the native control'], 'native-on-mobile': [(a) => !on(a.native), 'Not with the native control'] },
    carousel: { 'touch-arrows': [(a) => !on(a['no-arrows']), 'The arrows are off'], controls: [(a) => !on(a['no-arrows']) || !on(a['no-dots']), 'No arrows and no dots'] },
    password: { 'min-strength': [(a) => !on(a['no-meter']), 'The strength meter is off'], labels: [(a) => !on(a['no-meter']), 'The strength meter is off'] },
    pagination: { siblings: [(a) => a.appearance !== 'simple', 'Not with the simple pagination'] },
    'infinite-scroll': { 'more-label': [(a) => a.mode === 'button', 'Only with the button'], threshold: [(a) => a.mode !== 'button', 'Not with the button'] },
    progress: { 'show-value': [(a) => !on(a.indeterminate), 'Not while indeterminate'] },
    image: { 'zoom-src': [(a) => on(a.zoom), 'Only with zoom'] },
    menu: {
      collapsible: [(a) => a.orientation !== 'horizontal', 'Not for a horizontal bar'],
      collapsed: [(a) => a.orientation !== 'horizontal', 'Not for a horizontal bar'],
    },
    'color-picker': { alpha: [(a) => a.picker !== 'native', 'The system picker has no opacity'] },
  };
  /** a field that depends on another option: disabled (with the reason) until that option allows it */
  function applyDeps(root, attrs, id) {
    if (!root) return;
    for (const [name, [ok, why]] of Object.entries({ ...DEPENDS['*'], ...(DEPENDS[id] || {}) })) {
      root.querySelectorAll(`[data-a="${name}"], [data-k="${name}"]`).forEach((el) => {
        const off = !ok(attrs || {});
        el.toggleAttribute('disabled', off);
        el.toggleAttribute('data-dep-off', off);
        if (off) el.setAttribute('title', why); else el.removeAttribute('title');
      });
    }
  }
  /** several choices (the controls of the players): the default ones chosen when the attribute is not set (k.defaults); none chosen is emptyIs ("none") */
  function multiValue(k, v) {
    const list = String(v ?? '').split(/[\s,]+/).filter(Boolean);
    if (k.defaults && !list.length) return k.defaults.join(',');
    if (k.emptyIs && list.length === 1 && list[0] === k.emptyIs) return '';
    return list.join(',');
  }
  const multiAttrs = (k) => `data-multi="${k.options.join(' ')}"${k.defaults ? ` data-default="${k.defaults.join(' ')}"` : ''}${k.emptyIs ? ` data-empty="${k.emptyIs}"` : ''}`;
  /** the attribute a multiple choice writes: nothing when the choice is the default one, emptyIs when none, else the names with spaces (in the order of the list) */
  function multiAttr(el, v) {
    if (!el.dataset.multi) return v.join(el.localName === 'sav-select' ? ' ' : ',');
    if (!v.length) return el.dataset.empty ?? '';
    const order = el.dataset.multi.split(' '), list = order.filter((o) => v.includes(o));
    const def = (el.dataset.default || '').split(' ').filter(Boolean);
    if (def.length && list.length === def.length && def.every((d) => list.includes(d))) return '';
    return list.join(' ');
  }

  /* ---------- every attribute in the builder and the playground: the ones the table does not type get a type from their name */
  const KNOB_SKIP = {
    tabs: ['placement'], // the older name of orientation / side
    'chip-input': ['multiple', 'live', 'search-keys'], // a chip field: always several, it does not search
    select: ['min', 'max', 'locale'], 'language-choice': ['min', 'max'], 'country-choice': ['min', 'max'],
    button: ['download'],
    kbd: ['keys'], // the same keys as the text inside: the Keys field (chips) writes that one
  };
  const KNOB_BOOL = /^(disabled|required|readonly|autofocus|clearable|searchable|multiple|select-all|native-names|mask|live|pill|open|loop|muted|autoplay|stacked|smooth|points|antarctica|compact|alpha|counter|zoom|eager|rules|exclusive|sortable|striped|hover|selectable|clickable|collapsible|collapsed|closable|persistent|sticky|vertical|no-[a-z-]+|[a-z-]+-only)$/;
  const KNOB_NUM = /^(min|max|step|minlength|maxlength|height|gap|thickness|length|max-chips|max-terms|min-chars|levels|rows|debounce|delay|threshold|duration|max-items|max-size|per-view|page|pages|total|page-size|siblings|current|columns|first-day|week-start)$/;
  const POS4 = ['top', 'bottom', 'left', 'right'], POS_PANEL = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
  const KNOB_ENUM = {
    placement: (id) => (/^(tooltip|info-tip|popover)$/.test(id) ? POS4 : POS_PANEL),
    wrap: () => ['soft', 'hard', 'off'], spellcheck: () => ['true', 'false'], size: () => ['sm', 'md', 'lg'],
    inputmode: () => ['text', 'numeric', 'decimal', 'tel', 'email', 'url', 'search', 'none'],
    enterkeyhint: () => ['enter', 'done', 'go', 'next', 'previous', 'search', 'send'],
    language: (id) => (id === 'code' ? ['html', 'css', 'js', 'json', 'php', 'py', 'sh', 'sql'] : null),
  };
  const KNOB_DESC = {
    name: 'The name the form sends the value with.', disabled: 'It cannot be used, and it looks so.', required: 'It must be filled before the form is sent.',
    readonly: 'It shows the value but it cannot be changed.', autofocus: 'Takes the focus when the page opens.', placeholder: 'The hint shown while it is empty.',
    label: 'The name shown above it (and read by screen readers).', help: 'A line of help under it.', spellcheck: 'Whether the browser checks the spelling.',
    autocomplete: 'What the browser may fill in (email, name, one-time-code…).', inputmode: 'The keyboard phones show.', enterkeyhint: 'The label of the Enter key on phones.',
    placement: 'Where its panel opens, when there is room.', min: 'The lowest value.', max: 'The highest value.', step: 'How much it moves at a time.',
    minlength: 'The fewest characters.', maxlength: 'The most characters.', pattern: 'A regular expression the value must match.', list: 'The id of a <datalist> with suggestions.',
    wrap: 'How the text is sent: soft keeps the lines as typed, hard adds the breaks shown.', height: 'The height in pixels.', image: 'The address of the picture.',
    initials: 'The letters shown when there is no picture.', open: 'Open now.', size: 'The size.', gap: 'The space between the bars (0 to 1).', thickness: 'The width of the ring (0 to 1).',
    'start-label': 'The name of the first handle (screen readers).', 'end-label': 'The name of the second handle (screen readers).', 'name-start': 'The form name of the first value.',
    'name-end': 'The form name of the second value.', start: 'The first day shown.', end: 'The last day shown.', 'decrease-label': 'The name of the − button.', 'increase-label': 'The name of the + button.',
    'retry-label': 'The text of the Try again button.', highlight: 'Lines to mark, as 3 or 5-8.', language: 'The language of the code, for the colours.',
  };
  function inferKnob(a, d) {
    const k = { name: a, desc0: KNOB_DESC[a] || '' };
    const en = KNOB_ENUM[a]?.(d.id);
    if (en) return { ...k, type: 'enum', options: en, values: en.join(' · ') };
    if (KNOB_BOOL.test(a)) return { ...k, type: 'bool', values: 'boolean' };
    const dates = /^(date-picker|time-picker|chart-activity)$/.test(d.id);
    if (KNOB_NUM.test(a) && !(dates && /^(min|max)$/.test(a))) return { ...k, type: 'text', kind: 'number', values: 'number' };
    return { ...k, type: 'text', values: 'string' };
  }
  /* ---------- fields with suggestions instead of free text */
  const SUGGEST = {
    autocomplete: ['on', 'off', 'name', 'given-name', 'family-name', 'email', 'username', 'current-password', 'new-password', 'one-time-code', 'tel', 'organization', 'street-address', 'postal-code', 'country', 'bday', 'url'],
    hotkey: ['mod+k', 'mod+p', 'mod+shift+p', 'mod+/', '/'],
    accept: ['image/*', 'video/*', 'audio/*', '.pdf', '.csv', '.json', '.txt', '.zip', '.doc,.docx', '.xls,.xlsx'],
  };
  const KEYS = ['enter', 'space', 'tab', 'comma', 'semicolon'];
  /* ---- keys of a shortcut (sav-kbd): chips mod · K · then · G, written as the component reads them: "mod+K", "G then I", "mod+K, mod+P" */
  const KEY_CHIPS = ['mod', 'ctrl', 'alt', 'shift', 'meta', 'enter', 'esc', 'tab', 'space', 'backspace', 'delete', 'up', 'down', 'left', 'right', 'home', 'end',
    ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''), ...Array.from({ length: 12 }, (_, i) => `F${i + 1}`), 'then', 'or'];
  function keysJoin(list) {
    const out = []; let cur = [];
    for (const t of (Array.isArray(list) ? list : String(list || '').split(',')).map((x) => String(x).trim()).filter(Boolean)) {
      if (/^(then|or)$/i.test(t)) { if (cur.length) out.push(cur.join('+')); out.push(t.toLowerCase()); cur = []; } else cur.push(t);
    }
    if (cur.length) out.push(cur.join('+'));
    while (/^(then|or)$/.test(out[out.length - 1] || '')) out.pop();
    return out.map((x) => (x === 'then' ? ' then ' : x === 'or' ? ', ' : x)).join('').replace(/^ then |^, /, '');
  }
  const keysSplit = (v) => String(v || '').split(/(\s*,\s*|\s+then\s+)/i).filter((x) => x.trim() !== '' || /,/.test(x))
    .flatMap((x) => (/^\s*,\s*$/.test(x) ? ['or'] : /^\s+then\s+$/i.test(x) ? ['then'] : x.split('+').map((k) => k.trim()).filter(Boolean)));
  /** the keys field: one chip per key; "then" for a sequence, "or" for another shortcut */
  const keysField = (attr, v, label) => `<sav-chip-input size="sm" ${attr} data-keys value="${esc(keysSplit(v).join(','))}" placeholder="Type a key, then Enter">${label}${KEY_CHIPS.map((k) => `<option>${k}</option>`).join('')}</sav-chip-input>`;

  function richKind(k, d) {
    // a moment: a calendar with the time; a day: a calendar
    if (d.id === 'relative-time' && k.name === 'datetime') { k.kind = 'datetime'; return; }
    if (d.id === 'chart-activity' && /^(start|end)$/.test(k.name)) { k.kind = 'date'; return; }
    if (d.id === 'kbd' && k.name === 'keys') { k.kind = 'keys'; return; }
    if (d.id === 'chart-map' && /^(highlight|focus)$/.test(k.name)) { k.kind = 'places'; return; }
    if (k.name === 'locale') { k.kind = 'locale'; return; }
    if (/^(include|exclude)$/.test(k.name) && d.id === 'language-choice') { k.kind = 'languages'; return; }
    if (/^(include|exclude)$/.test(k.name) && d.id === 'country-choice') { k.kind = 'countries'; return; }
    if (/^(separators|search-keys)$/.test(k.name)) { k.type = 'text'; k.kind = 'multi'; k.options = KEYS; k.optionLabels = { enter: 'Enter', space: 'Space', tab: 'Tab', comma: 'Comma (,)', semicolon: 'Semicolon (;)' }; return; }
    if (SUGGEST[k.name] && k.type === 'text' && !k.kind) {
      if (k.name === 'accept') { k.kind = 'chips'; k.suggestions = SUGGEST.accept; } else { k.kind = 'suggest'; k.suggestions = SUGGEST[k.name]; }
    }
  }
  /** the field of a knob with its own kind of control (shared by the builder and the playground); '' when it is a plain one */
  function richField(k, attr, v, label) {
    const val = String(v ?? '');
    const lang = document.documentElement.lang || navigator.language || 'en';
    if (k.kind === 'places') {
      const DN = (() => { try { return new Intl.DisplayNames([lang, 'en'], { type: 'region' }); } catch { return null; } })();
      const conts = ['europe', 'africa', 'asia', 'north-america', 'south-america', 'oceania', 'antarctica'];
      const contName = { europe: 'Europe', africa: 'Africa', asia: 'Asia', 'north-america': 'North America', 'south-america': 'South America', oceania: 'Oceania', antarctica: 'Antarctica' };
      const countries = (Sav.countries || []).map((c) => [c.a2, DN?.of(c.a2) || c.a2]).sort((a, b) => a[1].localeCompare(b[1]));
      const chosen = val.split(/[\s,]+/).filter(Boolean).map((x) => (conts.includes(x.toLowerCase()) ? x.toLowerCase() : x.toUpperCase()));
      return `<sav-select size="sm" multiple searchable clearable ${attr}="${k.name}" value="${esc(chosen.join(','))}" placeholder="None" sheet-on-mobile>${label}`
        + `<optgroup label="Continents">${conts.map((c) => `<option value="${c}">${contName[c]}</option>`).join('')}</optgroup>`
        + `<optgroup label="Countries">${countries.map(([c, n]) => `<option value="${c}">${esc(n)}</option>`).join('')}</optgroup></sav-select>`;
    }
    if (k.kind === 'datetime') return `<sav-date-picker size="sm" mode="datetime" clearable ${attr}="${k.name}" value="${esc(val)}" placeholder="Now">${label}</sav-date-picker>`;
    if (k.kind === 'date') return `<sav-date-picker size="sm" clearable ${attr}="${k.name}" value="${esc(val)}" placeholder="Default">${label}</sav-date-picker>`;
    if (k.kind === 'keys') return keysField(`${attr}="${k.name}"`, val, label);
    if (k.kind === 'locale') return `<sav-language-choice size="sm" clearable no-flag ${attr}="${k.name}" value="${esc(val)}" placeholder="The page language">${label}</sav-language-choice>`;
    if (k.kind === 'languages') return `<sav-language-choice size="sm" multiple clearable ${attr}="${k.name}" value="${esc(val)}" placeholder="None">${label}</sav-language-choice>`;
    if (k.kind === 'countries') return `<sav-country-choice size="sm" multiple clearable ${attr}="${k.name}" value="${esc(val)}" placeholder="None">${label}</sav-country-choice>`;
    if (k.kind === 'suggest') return `<sav-search size="sm" ${attr}="${k.name}" value="${esc(val)}" placeholder="Default">${label}${k.suggestions.map((o) => `<option>${esc(o)}</option>`).join('')}</sav-search>`;
    return '';
  }
  function knobsFor(d, keep = []) {
    const skip = new Set(['href', 'target', 'download', 'type', 'name', 'value', 'id', 'from', 'for', ...(d.play?.skip || [])].filter((n) => !keep.includes(n)));
    const main = d.play?.tag || (String(d.tag).match(/sav-[a-z-]+/) || [''])[0];
    const knobs = [];
    for (const [names, values, desc] of d.attrs || []) {
      if (/[[(<]|^--|^Sav\./.test(names) || /CSS|option|On sav-/i.test(values) || /On sav-/.test(names)) continue;
      // a row about the elements inside (an item, an option, a slide…) is not an option of this one
      const about = plain(desc || '');
      const owner = about.match(/^(sav-[a-z-]+):/);
      if (/^On (sav-|an? |each )/i.test(about) || (owner && owner[1] !== main)) continue;
      const list = names.split(' · ').map((n) => n.trim()).filter((n) => /^[a-z][a-z-]*$/.test(n) && !/^aria-/.test(n) && !(KNOB_SKIP[d.id] || []).includes(n) && !skip.has(n) && !knobs.some((k) => k.name === n));
      if (!list.length) continue;
      const opts = values.split(' · ').map((v) => v.trim());
      if (values === 'boolean') list.forEach((n) => knobs.push({ name: n, type: 'bool' }));
      else if (list.length === 1 && list[0] === 'variant') knobs.push({ name: 'variant', type: 'enum', options: ['primary', 'neutral', 'success', 'warning', 'danger', ...(/protected/.test(values) ? ['protected'] : [])] });
      // a list of choices ("start · end"); a trailing "…" means more are allowed, the listed ones become the choices
      else if (/ · /.test(values) && list.length === 1 && opts.filter((o) => o !== '…').every((o) => /^[a-z0-9-]+$/.test(o) && (list[0] === 'type' || !NOT_CHOICES.test(o)))) knobs.push({ name: list[0], type: 'enum', options: opts.filter((o) => o !== '…') });
      else if (/JSON/.test(values)) list.forEach((n) => knobs.push({ name: n, type: 'text', kind: 'json' }));
      else if (/^(ms|bytes)$/.test(values)) list.forEach((n) => knobs.push({ name: n, type: 'text', kind: 'number', unit: values }));
      else if (/string|number|ms|url|icon name|length|date|tag|alpha|list|\d:\d/.test(values)) list.forEach((n) => knobs.push({ name: n, type: 'text' }));
    }
    // every attribute the component takes, also the ones the table names without a type (or not at all)
    const C = main && customElements.get(main), NOT = new Set(KNOB_SKIP[d.id] || []);
    for (const a of (C?.observedAttributes || [])) {
      if (/^(animation|animation-duration|aria-.+|data-.+|style|class|shape)$/.test(a) || skip.has(a) || NOT.has(a) || knobs.some((k) => k.name === a)) continue;
      knobs.push(inferKnob(a, d));
    }
    for (const k of knobs) {
      const row = (d.attrs || []).find((r) => r[0].split(' · ').map((x) => x.trim()).includes(k.name));
      k.desc = (row ? plain(row[2]) || plain(row[1]) : '') || k.desc0 || ''; k.values = row ? row[1] || k.values || '' : k.values || '';
      k.label = knobLabel(k.name);
      k.advanced = ADVANCED.has(k.name);
      if (k.type === 'text' && !k.kind) {
        if (/icon name/.test(k.values)) k.kind = 'icon';
        else if (/^number$/.test(k.values.trim())) k.kind = 'number';
      }
      if (k.kind === 'number' || k.unit) {
        // only min, max and value of number fields, ranges and charts can be negative; counts start at 1, the rest at 0
        const signed = /^(min|max|value)$/.test(k.name) && /^(number-input|range|range-dual|chart-bar|chart-radar|chart-line)$/.test(d.id);
        if (!signed) k.min = /^(max-terms|max-chips|length|columns|per-view|max-items|page|pages|page-size|current|levels|rows|level|max)$/.test(k.name) ? 1 : 0;
        if (k.name === 'level') k.max = 6; if (k.name === 'first-day') k.max = 6;
      }
      if (k.unit) k.label += ` (${k.unit})`;
      // the choice that applies when nothing is set: shown by its name instead of "Default"
      richKind(k, d);
      if (k.type === 'enum') k.def = defaultOf(k.options, k.desc);
      // several choices from a fixed set (the controls of the players): a select with multiple
      if (k.type === 'text' && k.name === 'controls' && /^(video|audio)$/.test(d.id)) { k.kind = 'multi'; k.options = d.id === 'video' ? ['play', 'skip', 'seek', 'time', 'mute', 'volume', 'speed', 'loop', 'captions', 'pip', 'fullscreen'] : ['play', 'skip', 'seek', 'time', 'mute', 'volume', 'speed', 'loop']; k.optionLabels = { play: 'Play / pause', skip: 'Back / forward 10 s', seek: 'Progress bar', time: 'Time', mute: 'Mute', volume: 'Volume', speed: 'Speed', loop: 'Loop (play again at the end)', captions: 'Captions', pip: 'Picture in picture', fullscreen: 'Full screen' }; if (k.name === 'controls') { k.defaults = d.id === 'video' ? ['play', 'seek', 'time', 'mute', 'volume', 'fullscreen'] : ['play', 'seek', 'time', 'mute', 'volume']; k.emptyIs = 'none'; } }
      // a list of values separated by commas: a chip field (colours with their swatch, numbers)
      if (k.type === 'text' && !/^(value|label|help|placeholder)$/.test(k.name) && /separated by commas|comma-separated/i.test(k.desc || '')) { k.kind = 'chips'; k.chips = k.name === 'swatches' ? 'color' : /numbers/i.test(k.desc) ? 'number' : ''; }
      // options for vertical tabs only show once the tabs are vertical
    }
    const own = knobs.find((k) => k.name === 'shape'); // the avatar has its own shapes: merge them
    if (own) own.options = [...new Set([...own.options, 'tilt', 'squared', 'rounded'])];
    else knobs.push({ name: 'shape', type: 'enum', options: ['tilt', 'squared', 'rounded'], label: 'Shape' });
    const shape = knobs.find((k) => k.name === 'shape');
    shape.desc = (shape.desc ? shape.desc + ' ' : '') + 'Tilt leans the background (the text stays upright), Squared has no rounded corners, Rounded has softer ones. It changes this component only, whatever the style of the page.';
    // every component: its animations on or off, and how long they last (they also reach the components inside it)
    if (!knobs.some((k) => k.name === 'animation')) {
      knobs.push({ name: 'animation', type: 'enum', options: ['on', 'off'], values: 'on · off', label: 'Animations', advanced: false,
        desc: 'Off: this component (and what is inside it) does not animate. On: it animates even inside an area where they are off. Default: like the page.' });
      knobs.push({ name: 'animation-duration', type: 'text', kind: 'number', unit: 'ms', min: 50, max: 1000, values: 'ms', label: 'Animation duration (ms)', advanced: false,
        desc: 'How long its animations last, from 50 to 1000 ms: 200 is the normal pace, less is quicker, more is slower. Every animation of the component keeps its proportions.' });
    }
    // stable order: content first, then the look; within the same rank, the order of the table
    return knobs.map((k, i) => [k, i]).sort((a, b) => orderOf(a[0].name) - orderOf(b[0].name) || a[1] - b[1]).map(([k]) => k);
  }

  /* ------------------------------------------------------------ icons: search among all of them */

  let iconIndex = null;
  let iconNames = null; // every icon name, once the index is read: a half-typed name is not an icon yet
  const loadIconIndex = () => (iconIndex ||= fetch(Sav.iconBase + 'index.json').then((r) => r.json()).then((j) => j.icons).catch(() => Object.fromEntries(Object.keys(Sav.icons).map((n) => [n, []])))
    .then((all) => { iconNames = new Set([...Object.keys(all), ...Object.keys(Sav.icons)]); return all; }));
  /** suggestions for an icon field (sav-search): exact name, then names that start with the text, contain it, or have it among their words */
  async function iconSuggest(field, query) {
    if (!field) return;
    const all = await loadIconIndex();
    const q = String(query || '').trim().toLowerCase(); if (!q) return;
    const rank = (n) => (n === q ? 0 : n.startsWith(q) ? 1 : n.includes(q) ? 2 : (all[n] || []).some((t) => t.startsWith(q)) ? 3 : (all[n] || []).some((t) => t.includes(q)) ? 4 : 9);
    field.suggestions = Object.keys(all).map((n) => [n, rank(n)]).filter(([, r]) => r < 9)
      .sort((a, b) => a[1] - b[1] || a[0].length - b[0].length || a[0].localeCompare(b[0])).slice(0, 12)
      .map(([n]) => ({ label: n, value: n, icon: n, description: (all[n] || []).slice(0, 4).join(', ') }));
  }

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
      <div class="row play-actions"><sav-button size="sm" appearance="ghost" variant="neutral" icon="refresh" id="playReset">Reset</sav-button><sav-button size="sm" appearance="soft" id="playBuild"><sav-icon slot="prefix" name="wand-sparkles"></sav-icon>Open in the builder</sav-button><sav-button size="sm" icon="save" id="playSave" hidden>Save to my components</sav-button></div></div></div>`;
  }

  function playMarkup(d, st) {
    const attrs = Object.entries(st.attrs).filter(([, v]) => v !== '' && v !== false).map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`)).join('');
    const style = Object.entries(st.tokens).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('; ');
    const inner = st.text !== undefined ? esc(st.text) : '';
    // a component saved from the builder may have no playground: its own tag is used then
    const tag = (d.play?.tags || []).find((t) => t.tag === st.tag)?.tag || d.play?.tag || (/^sav-[a-z-]+$/.test(st.tag || '') ? st.tag : 'div');
    return `<${tag}${attrs}${style ? ` style="${esc(style)}"` : ''}>${inner}${d.play?.children || ''}</${tag}>`;
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
    const field = (k) => fieldHtml(k);
    const fieldHtml = (k) => {
      const v = playState.attrs[k.name];
      const L = k.label || titleCase(k.name);
      if (k.type === 'bool') return `<sav-switch size="sm" data-k="${k.name}" ${v ? 'checked' : ''}>${esc(L)}${tip(k.desc)}</sav-switch>`;
      if (k.type === 'enum') return `<sav-select size="sm" data-k="${k.name}" value="${esc(v || '')}" sheet-on-mobile aria-label="${esc(L)}" placeholder="${k.def ? titleCase(k.def) : 'Default'}">${lbl(L, k.desc)}<option value="">${k.def ? titleCase(k.def) : 'Default'}</option>${k.options.filter((o) => o !== k.def).map((o) => `<option value="${o}">${titleCase(o)}</option>`).join('')}</sav-select>`;
      // icons: a search among the whole icon set (drawing, name, words); the chosen icon shows next to the label
      const rich = richField(k, 'data-k', v, lbl(L, k.desc)); if (rich) return rich;
      if (k.kind === 'multi') return `<sav-select size="sm" multiple select-all data-k="${k.name}" ${multiAttrs(k)} value="${esc(multiValue(k, v))}" placeholder="None" sheet-on-mobile>${lbl(L, k.desc)}${k.options.map((o) => `<option value="${o}">${esc(k.optionLabels?.[o] || titleCase(o))}</option>`).join('')}</sav-select>`;
      if (k.kind === 'chips') return `<sav-chip-input size="sm" data-k="${k.name}"${k.chips ? ` kind="${k.chips}"` : ''} value="${esc(v || '')}">${lbl(L, k.desc)}${(k.suggestions || []).map((o) => `<option>${esc(o)}</option>`).join('')}</sav-chip-input>`;
      if (k.kind === 'icon') return `<sav-search size="sm" data-k="${k.name}" data-icons no-filter max="12" value="${esc(v || '')}" placeholder="Search icons: star, heart, bell…">`
        + `<span slot="label" class="knob-l">${esc(L)}${tip((k.desc ? k.desc + ' ' : '') + 'Type a name or a word (arrow, user, money…) and pick one of the suggestions.')}<sav-icon class="bld-ic-now" name="${esc(v || 'shapes')}" data-icon-of="${k.name}" ${v ? '' : 'hidden'}></sav-icon></span></sav-search>`;
      if (k.kind === 'number') return `<sav-number-input size="sm" buttons="end" data-k="${k.name}"${k.min !== undefined ? ` min="${k.min}"` : ''}${k.max !== undefined ? ` max="${k.max}"` : ''} value="${esc(v || '')}" placeholder="Default">${lbl(L, k.desc)}</sav-number-input>`;
      if (k.kind === 'json') return dataEditor(d.id, k, 'data-k', v || '', lbl(L, k.desc), playState.attrs.by);
      return `<sav-input size="sm" data-k="${k.name}" value="${esc(v || '')}">${lbl(L, k.desc)}</sav-input>`;
    };
    box.innerHTML = (d.play.tags ? `<sav-radio-group appearance="buttons" size="sm" data-tag value="${playState.tag || d.play.tag}">${lbl('Component', 'Which version of the component to show.')}${d.play.tags.map((t) => `<sav-radio value="${t.tag}">${t.label}</sav-radio>`).join('')}</sav-radio-group>` : '')
      + (d.play.text !== undefined ? (d.id === 'kbd' ? keysField('data-text', playState.text, lbl('Keys', 'The keys to press: one chip each (mod is ⌘ on a Mac, Ctrl elsewhere); "then" for keys pressed one after the other, "or" for another shortcut.'))
        : `<sav-input size="sm" data-text value="${esc(playState.text || '')}">${lbl('Text', 'What is written inside the component.')}</sav-input>`) : '')
      + knobs.filter((k) => k.type !== 'bool').map(field).join('')
      + `<sav-color-picker size="sm" clearable data-token="--sav-color-primary" value="${esc(playState.tokens['--sav-color-primary'] || '')}" placeholder="Theme colour">${lbl('Custom colour', 'Gives this component its own main colour (the --sav-color-primary token) instead of the theme one. Empty: the theme colour.')}</sav-color-picker>`
      + ((d.attrs || []).some((r) => r[0] === '--text-color') ? `<sav-color-picker size="sm" clearable data-token="--text-color" value="${esc(playState.tokens['--text-color'] || '')}" placeholder="Fits the background">${lbl('Text colour', 'The colour of the text (the --text-color property), whatever the background. Empty: the colour that fits the background.')}</sav-color-picker>` : '')
      + `<div class="play-bools">${knobs.filter((k) => k.type === 'bool').map(field).join('')}</div>`;
    const update = () => {
      applyDeps(document.querySelector('.play'), playState.attrs, d.id);
      const html = playMarkup(d, playState);
      $('#playPreview').innerHTML = html;
      $('#playCode').innerHTML = codeBlock(html);
    };
    loadIconIndex(); // ready before the first letter in an icon field
    box.addEventListener('sav-query', (e) => iconSuggest(e.target.closest?.('[data-icons]'), e.detail.query));
    wireData(box); // data fields: the table writes their JSON
    box.addEventListener('input', (e) => onKnob(e.target));
    box.addEventListener('change', (e) => onKnob(e.target));
    function onKnob(t) {
      const el = t.closest('[data-k], [data-text], [data-token], [data-token-on], [data-tag]');
      if (!el) return;
      if (el.hasAttribute('data-tag')) {
        playState.tag = el.value;
        const def = d.play.tags.find((x) => x.tag === el.value);
        if (def && def.text !== undefined && (!playState.text || d.play.tags.some((x) => x.text === playState.text))) { playState.text = def.text; const ti = box.querySelector('[data-text]'); if (ti) ti.value = def.text; }
      } else if (el.dataset.k) {
        let v = el.localName === 'sav-switch' ? el.checked : el.value;
        // an icon field changes the component only with a real icon name (or when emptied): while typing, the last good icon stays
        if (el.hasAttribute('data-icons') && v) { if (!iconNames?.has(String(v).trim())) return; v = String(v).trim(); }
        // data (JSON) changes the component only once it reads well; until then the field says what is wrong
        if (el.hasAttribute('data-json') && !jsonOk(el, v)) return;
        if (typeof v === 'number') v = String(v);
        if (Array.isArray(v)) v = el.hasAttribute('data-keys') ? keysJoin(v) : multiAttr(el, v); // a chip field: its list, as the attribute writes it
        v = clampKnob(el, v);
        playState.attrs[el.dataset.k] = v;
        applyDeps(el.closest('.play'), playState.attrs, d.id);
        const ic = el.querySelector(`[data-icon-of="${el.dataset.k}"]`); if (ic) { if (v) ic.setAttribute('name', v); ic.hidden = !v; }
      }
      else if (el.hasAttribute('data-text')) playState.text = el.hasAttribute('data-keys') ? keysJoin(el.value) : el.value;
      else {
        playState.tokens[el.dataset.token] = el.value || ''; // the colour field: empty means the theme colour
      }
      update();
    }
    $('#playReset').addEventListener('click', () => { pendingPlay = null; playState = structuredClone(base); mountPlayground(d); });
    $('#playBuild').addEventListener('click', () => window.SavBuilder?.open(d.id, playState));
    $('#playSave').addEventListener('click', () => window.SavAccount?.saveComponent(d, { tag: playState.tag || d.play.tag, attrs: playState.attrs, text: playState.text ?? '', tokens: playState.tokens }, playState.name));
    update();
    if (fromSaved) setTimeout(() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  /** Used by account.js */
  /** a number field with min/max: a value typed outside goes back inside (the field shows it too) */
  function clampKnob(el, v) {
    if (el.localName !== 'sav-number-input' || v === '' || v === null || isNaN(Number(v))) return v;
    const lo = el.getAttribute('min'), hi = el.getAttribute('max'); let n = Number(v);
    if (lo !== null && n < Number(lo)) n = Number(lo);
    if (hi !== null && n > Number(hi)) n = Number(hi);
    if (n !== Number(v)) { el.value = String(n); return String(n); }
    return v;
  }

  /* ---- data fields (charts): filled in as a table (UI) or written as JSON; the textarea always holds the JSON, the table writes into it */
  const DATA_SHAPE = { 'chart-bar': 'series', 'chart-line': 'series', 'chart-radar': 'series', 'chart-pie': 'pairs', 'chart-activity': 'dates', 'chart-map': 'map' };
  const CONTINENT_KEYS = ['europe', 'africa', 'asia', 'north-america', 'south-america', 'oceania', 'antarctica'];
  const deNum = (v) => { const t = String(v ?? '').trim().replace(',', '.'); return t === '' ? 0 : Number(t); };
  /** the JSON as rows of a table; null when it does not fit one (then it is edited as JSON only) */
  function dataModel(shape, text) {
    let j = null;
    if (text && String(text).trim()) try { j = JSON.parse(text); } catch { return null; }
    if (shape === 'series') {
      if (!j) return { extra: {}, labels: [''], series: [{ name: 'Series 1', values: [0] }] };
      if (typeof j !== 'object' || !Array.isArray(j.labels) || !Array.isArray(j.series) || !j.series.every((x) => x && typeof x === 'object')) return null;
      const { labels, series, ...extra } = j;
      return { extra, labels: labels.map(String), series: series.map((x) => ({ ...x, name: String(x.name ?? ''), values: labels.map((_, i) => x.values?.[i] ?? 0) })) };
    }
    if (shape === 'pairs') {
      if (!j) return { extra: {}, rows: [['', 0]] };
      if (typeof j !== 'object' || !Array.isArray(j.labels) || !Array.isArray(j.values)) return null;
      const { labels, values, ...extra } = j;
      return { extra, rows: labels.map((l, i) => [String(l), values[i] ?? 0]) };
    }
    // dates and map: { key: value } (the activity chart also takes [{ date, value }])
    if (!j) return { rows: [['', 0]] };
    if (Array.isArray(j)) return shape === 'dates' && j.every((x) => x && x.date) ? { rows: j.map((x) => [String(x.date), x.value ?? 0]) } : null;
    if (typeof j !== 'object' || Object.values(j).some((v) => typeof v === 'object')) return null;
    return { rows: Object.entries(j) };
  }
  function dataJson(shape, m) {
    if (shape === 'series') return JSON.stringify({ labels: m.labels, series: m.series, ...m.extra });
    if (shape === 'pairs') return JSON.stringify({ labels: m.rows.map((x) => x[0]), values: m.rows.map((x) => x[1]), ...m.extra });
    return JSON.stringify(Object.fromEntries(m.rows.filter((x) => x[0] !== '')));
  }
  /** the table of one data field */
  function dataTable(shape, m, by) {
    if (!m) return '<p class="de-note">This data does not fit a table: edit it as JSON.</p>';
    const x = (what, i, label) => `<sav-button size="sm" appearance="ghost" variant="neutral" icon="x" label="${esc(label)}" data-de-del="${what}" data-i="${i}"></sav-button>`;
    const inp = (attr, v, label, more = '') => `<sav-input size="sm" ${attr} value="${esc(String(v ?? ''))}" aria-label="${esc(label)}"${more}></sav-input>`;
    const val = (v, label) => inp('data-de-val', v, label, ' inputmode="decimal" placeholder="0"');
    const add = (what, text) => `<sav-button size="sm" appearance="soft" variant="neutral" icon="plus" data-de-add="${what}">${text}</sav-button>`;
    let head, rows, cols = 1, series = '';
    if (shape === 'series') {
      cols = m.series.length;
      const many = m.series.length > 1;
      // the series (the columns) are listed above the table, each name at full width; the table heads repeat their names
      series = `<div class="de-series"><span class="de-h">Series</span>${m.series.map((sr, c) => { const { name, values, ...keep } = sr; return `<div class="de-srow" data-keep="${esc(JSON.stringify(keep))}">${inp('data-de-name', name, `Name of series ${c + 1}`, ` placeholder="Series ${c + 1}" data-c="${c}"`)}${many ? x('series', c, `Remove the series ${name || c + 1}`) : '<span></span>'}</div>`; }).join('')}<div class="de-adds">${add('series', 'Add series')}</div></div>`;
      head = '<span class="de-h">Label</span>' + m.series.map((sr, c) => `<span class="de-h de-hn" data-c="${c}">${esc(sr.name || `Series ${c + 1}`)}</span>`).join('') + '<span></span>';
      rows = m.labels.map((l, i) => `<div class="de-row">${inp('data-de-key', l, `Label of row ${i + 1}`, ' placeholder="Label"')}${m.series.map((sr, c) => val(sr.values[i], `${sr.name || 'Series ' + (c + 1)}, ${l || 'row ' + (i + 1)}`)).join('')}${x('row', i, `Remove the row ${l || i + 1}`)}</div>`).join('');
    } else {
      const cont = shape === 'map' && by === 'continent';
      const keyName = shape === 'dates' ? 'Date' : shape === 'map' ? (cont ? 'Continent' : 'Country') : 'Label';
      const key = (k, i) => {
        const al = `${keyName} of row ${i + 1}`;
        if (shape === 'dates') return `<sav-date-picker size="sm" data-de-key value="${esc(k)}" aria-label="${esc(al)}" placeholder="Pick a date"></sav-date-picker>`;
        // a key that does not fit the kind of area (a country after by="continent", or the other way) is left empty, to choose again
        if (cont) { const c = String(k).trim().toLowerCase().replace(/[\s_]+/g, '-'); k = CONTINENT_KEYS.includes(c) ? c : ''; }
        else if (shape === 'map') k = /^[a-z]{2}$/i.test(String(k).trim()) ? String(k).trim().toUpperCase() : '';
        if (cont) return `<sav-select size="sm" data-de-key value="${esc(k)}" aria-label="${esc(al)}" placeholder="Continent">${CONTINENT_KEYS.map((c) => `<option value="${c}">${titleCase(c)}</option>`).join('')}</sav-select>`;
        if (shape === 'map') return `<sav-country-choice size="sm" data-de-key value="${esc(k)}" aria-label="${esc(al)}" placeholder="Country"></sav-country-choice>`;
        return inp('data-de-key', k, al, ' placeholder="Label"');
      };
      head = `<span class="de-h">${keyName}</span><span class="de-h">Value</span><span></span>`;
      rows = m.rows.map(([k, v], i) => `<div class="de-row">${key(k, i)}${val(v, `Value of row ${i + 1}`)}${x('row', i, `Remove the row ${i + 1}`)}</div>`).join('');
    }
    return series + `<div class="de-scroll"><div class="de-grid de-${shape}" style="--de-cols: ${cols}">${head}${rows}</div></div>`
      + `<div class="de-adds">${add('row', 'Add row')}</div>`;
  }
  /** a data field: a choice UI / JSON over a table and the JSON box (only one shows) */
  function dataEditor(comp, k, attr, value, labelHtml, by) {
    const shape = DATA_SHAPE[comp];
    const ta = `<sav-textarea size="sm" rows="6" class="mono" ${attr}="${k.name}" data-json value="${esc(value || '')}" aria-label="${esc(k.label || titleCase(k.name))} (JSON)"></sav-textarea>`;
    if (!shape) return `<div class="data-ed" data-mode="json"><div class="de-top">${labelHtml.replace('slot="label" ', '')}</div>${ta}</div>`;
    const m = dataModel(shape, value), mode = m ? store.get('savc-data-mode', 'ui') : 'json';
    return `<div class="data-ed" data-shape="${shape}" data-mode="${mode}" data-by="${esc(by || '')}">`
      + `<div class="de-top">${labelHtml.replace('slot="label" ', '')}<sav-radio-group class="de-mode" appearance="buttons" size="sm" value="${mode}" aria-label="Edit the data as"><sav-radio value="ui">UI</sav-radio><sav-radio value="json">JSON</sav-radio></sav-radio-group></div>`
      + `<div class="de-ui" data-extra="${esc(JSON.stringify(m?.extra || {}))}">${dataTable(shape, m, by)}</div>${ta}</div>`;
  }
  /** the table as it is now, back to rows; null while a value is not a number */
  function dataRead(box) {
    const shape = box.dataset.shape, ui = box.querySelector('.de-ui');
    let extra = {}; try { extra = JSON.parse(ui.dataset.extra || '{}'); } catch {}
    const rows = [...ui.querySelectorAll('.de-row')];
    const key = (r) => String(r.querySelector('[data-de-key]').value ?? '');
    let bad = false;
    const nums = (els) => els.map((e) => { const n = deNum(e.value); const no = Number.isNaN(n); e.toggleAttribute('data-user-invalid', no); e.setCustomValidity?.(no ? 'A number' : ''); bad ||= no; return n; });
    let m;
    if (shape === 'series') {
      const names = [...ui.querySelectorAll('.de-srow')];
      const vals = rows.map((r) => nums([...r.querySelectorAll('[data-de-val]')]));
      m = { extra, labels: rows.map(key), series: names.map((h, c) => { let keep = {}; try { keep = JSON.parse(h.dataset.keep || '{}'); } catch {} return { name: String(h.querySelector('[data-de-name]').value ?? ''), values: vals.map((v) => v[c]), ...keep }; }) };
    } else m = { extra, rows: rows.map((r) => [key(r), nums([r.querySelector('[data-de-val]')])[0]]) };
    return bad ? null : m;
  }
  const dataWrite = (box, m) => { const ta = box.querySelector('sav-textarea[data-json]'); ta.value = dataJson(box.dataset.shape, m); ta.dispatchEvent(new Event('input', { bubbles: true })); };
  const dataRender = (box, m) => { box.querySelector('.de-ui').innerHTML = dataTable(box.dataset.shape, m, box.dataset.by); };
  /** listens once on the box that holds the fields (the builder options, the playground) */
  function wireData(root) {
    if (!root || root.dataset.deWired) return;
    root.dataset.deWired = '1';
    const onEdit = (e) => {
      const box = e.target.closest?.('.data-ed');
      if (!box) {
        // the map: "by" changes what the first column names (countries or continents)
        const by = e.target.closest?.('[data-a="by"], [data-k="by"]');
        if (by && e.type === 'change') root.querySelectorAll('.data-ed[data-shape="map"]').forEach((b) => { b.dataset.by = by.value === '_' ? '' : by.value || ''; if (b.dataset.mode === 'ui') dataRender(b, dataModel('map', b.querySelector('sav-textarea').value)); });
        return;
      }
      if (e.target.closest('.de-mode')) {
        if (e.type !== 'change') return;
        const mode = e.target.closest('.de-mode').value;
        if (mode === 'ui') {
          const m = dataModel(box.dataset.shape, box.querySelector('sav-textarea').value);
          box.querySelector('.de-ui').dataset.extra = JSON.stringify(m?.extra || {});
          dataRender(box, m);
        }
        box.dataset.mode = mode;
        store.set('savc-data-mode', mode);
        return;
      }
      if (!e.target.closest('.de-ui')) return; // the JSON box itself: the page handles it
      const nm = e.target.closest('[data-de-name]'); // a series renamed: its column head follows
      if (nm) { const h = box.querySelector(`.de-hn[data-c="${nm.dataset.c}"]`); if (h) h.textContent = nm.value || `Series ${Number(nm.dataset.c) + 1}`; }
      const m = dataRead(box);
      if (m) dataWrite(box, m);
    };
    root.addEventListener('input', onEdit);
    root.addEventListener('change', onEdit);
    root.addEventListener('click', (e) => {
      const b = e.target.closest?.('.data-ed [data-de-add], .data-ed [data-de-del]');
      if (!b) return;
      const box = b.closest('.data-ed'), m = dataRead(box) || dataModel(box.dataset.shape, box.querySelector('sav-textarea').value);
      if (!m) return;
      const i = Number(b.dataset.i), sh = box.dataset.shape;
      if (b.dataset.deAdd === 'row') { if (sh === 'series') { m.labels.push(''); m.series.forEach((x) => x.values.push(0)); } else m.rows.push(['', 0]); }
      else if (b.dataset.deAdd === 'series') m.series.push({ name: `Series ${m.series.length + 1}`, values: m.labels.map(() => 0) });
      else if (b.dataset.deDel === 'series') m.series.splice(i, 1);
      else if (sh === 'series') { m.labels.splice(i, 1); m.series.forEach((x) => x.values.splice(i, 1)); }
      else m.rows.splice(i, 1);
      dataRender(box, m);
      dataWrite(box, m);
      // the focus stays in the table: on the new row, or on the row that took the place of the removed one
      const rows = box.querySelectorAll('.de-row');
      const go = b.dataset.deAdd === 'row' ? rows[rows.length - 1]?.querySelector('[data-de-key]') : b.dataset.deAdd === 'series' ? [...box.querySelectorAll('[data-de-name]')].pop() : (rows[Math.min(i, rows.length - 1)]?.querySelector('[data-de-key]'));
      requestAnimationFrame(() => go?.focus?.());
    });
  }
  window.SavDocs = {
    clampKnob,
    docs: DOCS, icon: ICON, esc, codeBlock, footer: () => footer(), route: () => route(),
    playMarkup, knobsFor, richField, dataEditor, wireData, keysJoin, keysField, applyDeps, multiValue, multiAttrs, multiAttr, knobLabel, jsonOk, plain, titleCase, slug, libUrl: LIB_URL, sriAttr, store, hashParts,
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

  /** The version badge next to the logo: a dropdown to see the site with another release of the library, grouped by major version. */
  function initVersionPicker() {
    const dd = $('#verPick'); if (!dd) return;
    const majors = [...new Set(RELEASES.map((v) => v.split('.')[0]))];
    dd.innerHTML = `<sav-button slot="trigger" size="sm" appearance="soft" variant="${OLDER ? 'warning' : 'neutral'}" class="ver-btn" aria-label="Library version ${esc(shortVer(Sav.version))}">${esc(shortVer(Sav.version))}<sav-icon slot="suffix" name="chevron-down"></sav-icon></sav-button>
      ${majors.map((m) => `<sav-menu-label>Version ${esc(m)}</sav-menu-label>
        ${RELEASES.filter((v) => v.split('.')[0] === m).map((v) => `<sav-menu-item type="checkbox" value="${esc(v)}" ${v === Sav.version ? 'checked' : ''}>${esc(shortVer(v))}${v === LATEST ? ' (latest)' : ''}<span slot="suffix" class="muted small">${esc(v)}</span></sav-menu-item>`).join('')}`).join('')}
      <sav-menu-item value="versions"><sav-icon slot="prefix" name="history"></sav-icon>What changed between versions</sav-menu-item>`;
    dd.addEventListener('sav-select', (e) => {
      const v = e.detail.value;
      if (v === 'versions') { location.hash = '#versions'; return; }
      if (RELEASES.includes(v) && v !== Sav.version) location.href = verUrl(v);
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
    const extra = window.SavAccount?.pages?.[id] || window.SavBuilder?.pages?.[id];
    main.classList.toggle('wide', !!window.SavBuilder?.pages?.[id]);
    main.innerHTML = extra ? extra.html() + footer() : id === 'start' ? pageStart() : id === 'theming' ? pageTheming() : id === 'styles' ? pageStyles() : id === 'examples' ? pageExamples() : id === 'versions' ? pageVersions() : d ? pageComponent(d) : pageHome();
    // an older release: say so at the top of every page, with the way back to the newest
    if (OLDER) main.insertAdjacentHTML('afterbegin', `<sav-alert class="ver-old" variant="warning" heading="You are viewing version ${esc(Sav.version)}">The components on this site run on an older release of the library; the text describes the newest one (${esc(LATEST)}). <a href="${esc(verUrl(LATEST))}">Back to the latest version</a></sav-alert>`);
    // scripts inside demos do not run from innerHTML: re-create them
    main.querySelectorAll('.demo-view script').forEach((old) => { const s = document.createElement('script'); s.textContent = `{\n${old.textContent}\n}`; old.replaceWith(s); }); // a block: running a demo twice never redeclares its const
    if ($('#iconGrid')) mountIcons(params.get('q') || '');
    if (id === 'versions') mountChangelog(main);
    document.title = (d ? d.name : extra ? extra.title : { start: 'Getting started', theming: 'Theming', styles: 'Styles', examples: 'Practical examples', versions: 'Versions' }[id] || 'Web components you can customise') + ' — SavComponents';
    if (d?.play) mountPlayground(d);
    if (d) window.SavA11y?.mount(main);
    if (d) window.SavRef?.mount(main, d);
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
      <div class="t-sec"><div class="t-lbl">Presets</div><div class="presets">${Object.entries(PRESETS).map(([n, p]) => `<sav-button class="preset" appearance="outline" variant="neutral" size="sm" block data-p="${n}"><span class="pv" slot="prefix" aria-hidden="true">${COLOR_KEYS.slice(0, 4).map((k) => `<i style="background:${p[k] || defaultColor(k)}"></i>`).join('')}</span>${n}</sav-button>`).join('')}</div></div>
      <div class="t-sec"><sav-select id="tStyle" label="Style" size="sm" value="${store.get('savc-style', 'tilt')}" help="${STYLE_INFO[store.get('savc-style', 'tilt')][1]}">${Sav.styles.map((s) => `<option value="${s}">${STYLE_INFO[s][0]}</option>`).join('')}</sav-select></div>
      <div class="t-sec"><sav-radio-group label="Mode" appearance="buttons" size="sm" id="tMode" value="${mode}"><sav-radio value="light">Light</sav-radio><sav-radio value="dark">Dark</sav-radio><sav-radio value="auto">System</sav-radio></sav-radio-group></div>
      <div class="t-sec"><div class="t-lbl">Colours</div><div class="colors">${COLOR_KEYS.map((k) => `<sav-color-picker size="sm" data-k="${k}" label="${k[0].toUpperCase() + k.slice(1)}" value="${theme[k] || defaultColor(k)}"></sav-color-picker>`).join('')}</div></div>
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
    body.querySelectorAll('sav-color-picker[data-k]').forEach((i) => i.addEventListener('input', () => { if (!i.value) return; theme[i.dataset.k] = i.value; applyTheme(); }));
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
      { label: 'Component builder', sub: 'Every option of a component, code ready to copy', href: '#builder', kind: 'Page', icon: 'wand-sparkles', words: 'builder customise customize generator configurator playground code copy react vue typescript' },
      { label: 'Demo website', sub: 'A whole lorem ipsum site made only with the library', href: 'demo.html', kind: 'Page', icon: 'layout', words: 'demo example site template landing' },
      { label: 'SavComponents Academy', sub: 'Learn the components by doing: lessons, quizzes, challenges, badges', href: 'academy/', kind: 'Page', icon: 'graduation-cap', words: 'academy learn course tutorial quiz challenge game lessons' },
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
  /** The header search is the library's sav-search: it asks for suggestions (sav-query), shows them grouped with icons, and says which one was picked (sav-pick). */
  function initSearch() {
    const field = $('#search');
    if (!field) return;
    const index = searchIndex();
    let icons = null;
    const score = (e, t) => {
      const l = e.label.toLowerCase();
      if (l === t) return 100;
      if (l.startsWith(t)) return 80 - l.length / 100;
      if (l.split(/[\s›:]+/).some((w) => w.startsWith(t))) return 60;
      if (l.includes(t)) return 40;
      if ((e.sub + ' ' + (e.words || '')).toLowerCase().includes(t)) return 20;
      return 0;
    };
    const GROUP = { Component: 'Components', Page: 'Pages', Section: 'Sections', Option: 'Options', Example: 'Examples', Icon: 'Icons' };
    const suggest = (t) => {
      const order = ['Component', 'Page', 'Section', 'Option', 'Example'];
      const found = index.map((e) => [e, score(e, t)]).filter(([, sc]) => sc > 0).sort((a, b) => b[1] - a[1] || order.indexOf(a[0].kind) - order.indexOf(b[0].kind)).slice(0, 9).map(([e]) => e);
      found.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));
      const ic = icons ? Object.keys(icons).filter((n) => n.includes(t) || icons[n].some((g) => g.includes(t))).sort((a, b) => (b.startsWith(t) - a.startsWith(t)) || a.length - b.length).slice(0, 6)
        .map((n) => ({ label: n, sub: 'Icon', href: `#icon?q=${n}`, kind: 'Icon', icon: n })) : [];
      field.suggestions = [...found, ...ic].map((it) => ({ label: it.label, value: it.href, description: it.sub || '', icon: it.icon || 'search', group: GROUP[it.kind] || it.kind }));
    };
    // phones: the search button opens the field over the whole header, the X closes it (and clears it)
    const openBtn = $('#searchOpen'), closeBtn = $('#searchClose');
    function setSearchOpen(open) {
      if (!openBtn || document.body.classList.contains('search-open') === open) return;
      document.body.classList.toggle('search-open', open); openBtn.setAttribute('aria-expanded', String(open));
      if (open) requestAnimationFrame(() => field.focus());
      else { if (field.value) { field.value = ''; renderSide(); } field.close?.(); if (getComputedStyle(openBtn).display !== 'none') openBtn.focus({ preventScroll: true }); }
    }
    searchOpener = () => setSearchOpen(true);
    openBtn?.addEventListener('click', () => setSearchOpen(true));
    closeBtn?.addEventListener('click', () => setSearchOpen(false));
    matchMedia('(max-width: 640px)').addEventListener('change', (m) => { if (!m.matches) setSearchOpen(false); });
    field.addEventListener('focusin', () => { if (!icons) loadIconIndex().then((all) => { icons = all; const t = field.value.trim().toLowerCase(); if (t) suggest(t); }); });
    field.addEventListener('sav-query', (e) => suggest(String(e.detail.query || '').trim().toLowerCase()));
    field.addEventListener('input', () => renderSide(field.value)); // the side menu filters as you type
    field.addEventListener('sav-pick', (e) => {
      e.preventDefault(); // the field does not keep the text: the page opens
      const href = String(e.detail.value || '');
      field.value = ''; field.close?.(); renderSide(); setSearchOpen(false);
      if (href.startsWith('#')) location.hash = href.slice(1); else if (href) location.href = href;
    });
    field.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !field.isOpen) { field.value = ''; renderSide(); field.blur(); setSearchOpen(false); } });
  }

  /* ------------------------------------------------------------ boot */

  // the phone menu is wired first: if a later step fails in some browser, the menu still opens
  const menuBtn = $('#menuBtn'), side = $('#side');
  const setNav = (open) => { document.body.classList.toggle('nav-open', open); menuBtn.setAttribute('aria-expanded', String(open)); menuBtn.setAttribute('aria-label', open ? 'Close the menu' : 'Open the menu'); };
  menuBtn.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
  // wide screens: the round handle on the edge of the sidebar folds it to a rail of icons and back (remembered)
  const fold = $('#sideFold');
  const setRail = (on, keep = true) => {
    document.body.classList.toggle('side-collapsed', on); if (keep) store.set('savc-side-collapsed', on);
    const say = on ? 'Expand the menu' : 'Collapse the menu';
    fold?.setAttribute('aria-expanded', String(!on)); fold?.setAttribute('aria-label', say); if (fold) fold.title = say;
    railTitles();
  };
  setRail(!!store.get('savc-side-collapsed', false), false);
  fold?.addEventListener('click', () => setRail(!document.body.classList.contains('side-collapsed')));
  side.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { setNav(false); menuBtn.focus(); } });
  document.addEventListener('click', (e) => { if (document.body.classList.contains('nav-open') && !e.composedPath().some((n) => n.id === 'side' || n.id === 'menuBtn')) setNav(false); });

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
    if (e.key === '/' && !e.composedPath().some((n) => n.matches?.('input, textarea, [contenteditable], sav-input, sav-textarea, sav-search'))) { e.preventDefault(); if (searchOpener && getComputedStyle($('#searchOpen')).display !== 'none') searchOpener(); else $('#search').focus(); }
  });
})();
