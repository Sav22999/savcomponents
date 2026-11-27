// SavComponents — what search engines, AI assistants and language models read, written from the documentation data
// (docs/components.js) so it never goes out of date: `node tools/seo.mjs` (tools/release.sh runs it too).
//   llms.txt       one line per component (https://llmstxt.org)
//   llms-full.txt  every component with its attributes, slots, parts, events, methods and examples
//   sitemap.xml    the pages of the site
//   index.html     the structured data (schema.org) and the page without JavaScript, between the <!-- seo:… --> markers
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.savcomponents.com';
const read = (f) => readFileSync(join(root, f), 'utf8');
const ctx = { window: {} };
vm.runInNewContext(read('docs/components.js'), ctx);
const docs = ctx.window.SAVC_DOCS;
const version = read('dist/sav.js').match(/version:\s*'([\d.]+)'/)[1];
const plain = (s) => String(s ?? '').replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const groups = [...new Set(docs.map((d) => d.group))];
const today = new Date().toISOString().slice(0, 10);

const intro = `SavComponents (www.savcomponents.com) is a free, open-source (MIT) library of ${docs.length} web components for websites and web apps, by Saverio Morelli: buttons, fields, pickers, dialogs, tabs, tables, charts and more, written as plain HTML tags (<sav-button>, <sav-input>, <sav-dialog>…). No framework and no build step: one stylesheet and one script. Themes with CSS custom properties, light and dark modes and five styles (Soft, Tilt, Sharp, Brutal, Glass). Accessible (keyboard, screen readers), English and Italian built in.`;
const install = `<link rel="stylesheet" href="${SITE}/v/${version}/sav.css">
<script src="${SITE}/v/${version}/sav.js" defer></script>

<sav-button>Hello</sav-button>`;
const notes = [
  `The address contains the version (${version} is the latest): a site keeps working the same way when a newer release comes out.`,
  'Styles: add a class to <html>: sav-style-tilt, sav-style-sharp, sav-style-brutal or sav-style-glass (Soft is the default). Modes: sav-theme-light, sav-theme-dark or sav-theme-auto.',
  'Theming: override CSS custom properties such as --sav-color-primary, --sav-color-bg, --sav-radius, --sav-font after sav.css; the customiser on the site exports them, and a theme saved with an account has its own link (/theme/<id>.css).',
  'Languages: the words the components write follow <html lang>; add one with Sav.addStrings(lang, {English: translation}).',
  'Icons: <sav-icon name="…"> with about 2,000 icons (mostly Lucide, ISC licence).',
];
const link = (d) => `${SITE}/#${d.id}`;
const tag = (d) => (d.tag.startsWith('sav-') ? `<${d.tag}>` : d.tag); // a few are functions: Sav.toast()
const line = (d) => `- [${d.name}](${link(d)}): \`${tag(d)}\` ${plain(d.desc)}`;

// llms.txt
let short = `# SavComponents\n\n> ${intro}\n\n## Use it on any site\n\n\`\`\`html\n${install}\n\`\`\`\n\n${notes.map((n) => `- ${n}`).join('\n')}\n\n`;
for (const g of groups) short += `## ${g}\n\n${docs.filter((d) => d.group === g).map(line).join('\n')}\n\n`;
short += `## Optional\n\n- [Full version](${SITE}/llms-full.txt): every component with its attributes, slots, events, methods and examples\n- [Documentation](${SITE}/): the site, with a live playground and a customiser\n- [Academy](${SITE}/academy/): lessons, quizzes and challenges for every component\n- [What's new](${SITE}/CHANGELOG.md)\n- [Source code](https://github.com/Sav22999/savcomponents)\n- [Saverio Morelli](https://www.saveriomorelli.com/): the author (https://www.saveriomorelli.com/llms.txt)\n`;
writeFileSync(join(root, 'llms.txt'), short);

// llms-full.txt
const table = (title, rows, cols) => rows?.length ? `${title}:\n\n${rows.map((r) => `- ${cols(r)}`).join('\n')}\n\n` : '';
let full = `# SavComponents ${version}\n\n> ${intro}\n\n## Use it on any site\n\n\`\`\`html\n${install}\n\`\`\`\n\n${notes.map((n) => `- ${n}`).join('\n')}\n\n`;
for (const g of groups) {
  full += `## ${g}\n\n`;
  for (const d of docs.filter((x) => x.group === g)) {
    full += `### ${d.name} — \`${tag(d)}\`\n\n${plain(d.desc)}${d.notice ? ` ${plain(d.notice)}` : ''}\n\nDocumentation: ${link(d)}\n\n`;
    full += table('Attributes', d.attrs, (a) => `\`${a[0]}\`${a[1] ? ` (${plain(a[1])})` : ''}: ${plain(a[2])}`);
    full += table('Slots', d.slots, (a) => `\`${a[0] || '(default)'}\`: ${plain(a[1])}`);
    full += table('CSS parts', d.parts, (a) => `\`${a[0]}\`: ${plain(a[1])}`);
    full += table('Events', d.events, (a) => `\`${a[0]}\`: ${plain(a[1])}`);
    full += table('Methods', d.methods, (a) => `\`${a[0]}\`: ${plain(a[1])}`);
    for (const demo of (d.demos || []).slice(0, 2)) full += `Example — ${plain(demo.title)}:\n\n\`\`\`html\n${demo.html.trim()}\n\`\`\`\n\n`;
  }
}
writeFileSync(join(root, 'llms-full.txt'), full);

// sitemap.xml: the pages (the components are parts of one page, #button…, which search engines read as one address)
const pages = ['', 'academy/', 'privacy.html'];
writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE}/${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);

// index.html: structured data and the page for whoever reads without JavaScript
const person = { '@type': 'Person', '@id': 'https://www.saveriomorelli.com/#person', name: 'Saverio Morelli', url: 'https://www.saveriomorelli.com/' };
const ld = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'WebSite', '@id': `${SITE}/#website`, name: 'SavComponents', url: `${SITE}/`, inLanguage: 'en', publisher: person },
  { '@type': 'SoftwareSourceCode', '@id': `${SITE}/#library`, name: 'SavComponents', description: intro, url: `${SITE}/`, codeRepository: 'https://github.com/Sav22999/savcomponents',
    programmingLanguage: ['JavaScript', 'CSS', 'HTML'], runtimePlatform: 'Web browser', license: 'https://opensource.org/licenses/MIT', version, isAccessibleForFree: true,
    keywords: 'web components, custom elements, UI library, design system, no framework, accessibility, theming', author: person, publisher: person,
    hasPart: docs.map((d) => ({ '@type': 'SoftwareSourceCode', name: `${d.name} (${tag(d)})`, url: link(d) })) },
] };
const body = `<h1>SavComponents</h1>\n      <p>${esc(intro)}</p>\n      <pre><code>${esc(install)}</code></pre>\n`
  + groups.map((g) => `      <h2>${esc(g)}</h2>\n      <ul>${docs.filter((d) => d.group === g).map((d) => `<li><a href="#${d.id}">${esc(d.name)}</a> <code>${esc(tag(d))}</code>: ${esc(plain(d.desc))}</li>`).join('')}</ul>\n`).join('')
  + `      <p><a href="academy/">Academy</a> · <a href="llms.txt">llms.txt</a> · <a href="https://github.com/Sav22999/savcomponents">GitHub</a> · MIT licence</p>`;
let html = read('index.html');
const swap = (name, content) => {
  const re = new RegExp(`<!-- seo:${name} -->[\\s\\S]*?<!-- /seo:${name} -->`);
  if (!re.test(html)) throw new Error(`index.html: the <!-- seo:${name} --> markers are missing`);
  html = html.replace(re, `<!-- seo:${name} -->${content}<!-- /seo:${name} -->`);
};
swap('ld', `\n  <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>\n  `);
swap('noscript', `<noscript><div class="seo-noscript">\n      ${body}\n    </div></noscript>`);
writeFileSync(join(root, 'index.html'), html);
console.log(`llms.txt, llms-full.txt, sitemap.xml and index.html: ${docs.length} components, version ${version}`);
