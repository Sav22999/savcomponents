/* SavComponents documentation: accounts (favourites, saved themes and components) and the master admin page.
   Talks to api/index.php. When the accounts are not installed (no credentials.php) nothing here shows up. */
(() => {
  'use strict';
  const D = window.SavDocs;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = D.esc;
  const ICON = D.icon;

  const ERR = {
    unauthenticated: 'Please sign in again.', disabled: 'This account has been disabled.', email_unverified: 'Confirm your email first: check your inbox.',
    csrf: 'Your session expired: reload the page.', rate_limited: 'Too many attempts: wait a few minutes and try again.',
    name_required: 'Write your name (at least 2 characters).', email_invalid: 'This email address is not valid.',
    password_short: 'The password needs at least 8 characters.', password_long: 'The password is too long.',
    privacy_required: 'Please accept the privacy notice.', bad_credentials: 'Wrong email or password.', bad_password: 'The password is not right.',
    token_invalid: 'This link has expired or was already used. Ask for a new one.', too_many: 'You reached the maximum number of saved items.',
    too_large: 'This configuration is too large.', config_invalid: 'This configuration is not valid.', forbidden: 'Only master admins can do this.',
    not_yourself: 'You cannot do this to your own account.', is_master: 'Remove this address from the master admins first (credentials.php).',
    already_verified: 'This email is already confirmed.', not_found: 'Not found.', not_installed: 'Accounts are not available.', server: 'Something went wrong. Try again.',
    network: 'No connection. Check your network and try again.',
    sav_off: 'SavAccount sign-in is not available right now.', sav_expired: 'This SavAccount sign-in expired. Start it again.',
    sav_taken: 'This SavAccount is already linked to another SavComponents account.', sav_failed: 'SavAccount could not confirm who you are. Try again.',
    sav_code_expired: 'The code expired or was tried too many times: ask for a new one.', sav_code_wrong: 'The code is not right.',
    sav_last_method: 'Choose a password first: your account needs at least one way to sign in.', cancelled: 'You cancelled the sign-in with SavAccount.',
  };
  const errText = (code) => ERR[code] || ERR.server;

  const A = { installed: false, savaccount: false, user: null, csrf: '', favs: new Set(), items: [], ready: false };

  // The accounts API lives on saveriomorelli.com (it has the database); this site is static.
  // A developer can point the docs to another API with localStorage "savc-api".
  let API = document.querySelector('meta[name="savc-api"]')?.content || 'https://www.saveriomorelli.com/projects/savcomponents/api/';
  try { API = localStorage.getItem('savc-api') || API; } catch {}
  const tokenStore = {
    get() { try { return localStorage.getItem('savc-token') || ''; } catch { return ''; } },
    set(t) { try { t ? localStorage.setItem('savc-token', t) : localStorage.removeItem('savc-token'); } catch {} },
  };

  async function api(r, body, query = '') {
    let res;
    const headers = {};
    const tok = tokenStore.get();
    if (tok) headers['X-Sav-Token'] = tok; // no cookies between domains: the session travels in this header
    try {
      res = await fetch(`${API}?r=${r}${query}`, body === undefined ? { headers, credentials: 'omit' } : {
        method: 'POST', credentials: 'omit',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch { throw new Error('network'); }
    let data = null;
    try { data = await res.json(); } catch { throw new Error(res.status === 404 ? 'not_installed' : 'server'); }
    if (!data.ok) {
      if (data.error === 'unauthenticated') { tokenStore.set(''); if (A.user) { A.user = null; renderTop(); } }
      throw new Error(data.error || 'server');
    }
    return data;
  }

  const toast = (msg, variant = 'success', icon) => Sav.toast(msg, { variant, icon, duration: 3500 });
  const fail = (e) => toast(errText(e.message), 'danger');

  /* ------------------------------------------------------------ top bar */

  function renderTop() {
    const slot = $('#accountSlot');
    if (!slot) return;
    if (!A.installed) { slot.innerHTML = ''; return; }
    if (!A.user) {
      slot.innerHTML = `<sav-button size="sm" appearance="ghost" variant="neutral" icon="log-in" id="signInBtn"><span class="cz-text">Sign in</span></sav-button>`;
      $('#signInBtn').addEventListener('click', () => openAuth('signin'));
    } else {
      const u = A.user;
      slot.innerHTML = `<sav-dropdown placement="bottom-end" id="userMenu">
        <button slot="trigger" class="user-btn" aria-label="Your account"><sav-avatar size="sm" label="${esc(u.name)}" variant="primary"></sav-avatar></button>
        <sav-menu-label>${esc(u.name)}</sav-menu-label>
        <sav-menu-item value="account"><sav-icon slot="prefix" name="user"></sav-icon>My account</sav-menu-item>
        <sav-menu-item value="favs"><sav-icon slot="prefix" name="star"></sav-icon>Favourites<span slot="suffix">${A.favs.size}</span></sav-menu-item>
        <sav-menu-item value="themes"><sav-icon slot="prefix" name="palette"></sav-icon>My themes<span slot="suffix">${A.items.filter((i) => i.kind === 'theme').length}</span></sav-menu-item>
        ${u.master ? '<sav-divider></sav-divider><sav-menu-item value="admin"><sav-icon slot="prefix" name="shield"></sav-icon>Admin: users</sav-menu-item>' : ''}
        <sav-divider></sav-divider>
        <sav-menu-item value="logout"><sav-icon slot="prefix" name="log-out"></sav-icon>Sign out</sav-menu-item>
      </sav-dropdown>`;
      $('#userMenu').addEventListener('sav-select', (e) => {
        const v = e.detail.value;
        if (v === 'logout') return logout();
        if (v === 'admin') location.hash = 'admin';
        else { accountTab = v === 'account' ? accountTab : v; location.hash = 'account'; if (location.hash === '#account') D.route(); }
      });
    }
    $('#saveTheme')?.toggleAttribute('hidden', !A.installed);
    $('#playSave')?.toggleAttribute('hidden', !A.installed);
    paintFavSlot();
  }

  async function logout() {
    try { await api('auth.logout', {}); } catch {}
    tokenStore.set('');
    A.user = null; A.csrf = ''; A.favs.clear(); A.items = [];
    renderTop();
    if (['#account', '#admin'].includes(location.hash)) location.hash = '';
    toast('Signed out', 'neutral', 'log-out');
  }

  /* ------------------------------------------------------------ SavAccount ("Continue with SavAccount", savaccount.eu) */

  // the SavAccount mark: a leaning square with a person cut out and a small tile; coloured from the theme
  const SAV_MARK = `<svg class="sav-mark" viewBox="0 0 512 512" aria-hidden="true"><path fill-rule="evenodd" d="M104 63.2 448.7 124 388 468.700 43.300 407.900ZM246 162a60 60 0 0 0-34 109c-32 13-51 46-58 95h184c-7-49-26-82-58-95a60 60 0 0 0-34-109Z"/><rect x="352" y="52" width="104" height="104" transform="rotate(24 404 104)"/></svg>`;
  const savButton = (label = 'Continue with SavAccount', id = '') => `<sav-button type="button" block appearance="outline" variant="neutral" class="sav-btn" ${id ? `id="${id}"` : 'data-sav-start'}><span slot="prefix" class="sav-mark-wrap">${SAV_MARK}</span>${esc(label)}</sav-button>`;
  // no cookies cross from this site to the API: a random key kept in this tab binds the sign-in to this browser
  const savKey = {
    make() { const b = new Uint8Array(32); crypto.getRandomValues(b); const k = [...b].map((x) => x.toString(16).padStart(2, '0')).join(''); try { sessionStorage.setItem('savc-sav-key', k); } catch {} return k; },
    get() { try { return sessionStorage.getItem('savc-sav-key') || ''; } catch { return ''; } },
    clear() { try { sessionStorage.removeItem('savc-sav-key'); sessionStorage.removeItem('savc-sav-back'); } catch {} },
  };

  /** Goes to SavAccount; it comes back to this site with ?sav=… (or ?sav_error=…). connect: links the signed-in account. */
  async function startSav(mode = 'login', btn) {
    if (btn) btn.loading = true;
    try {
      const key = savKey.make();
      try { sessionStorage.setItem('savc-sav-back', location.hash); } catch {}
      const r = await api('auth.sav.start', { mode, key, back: 'docs' });
      location.assign(r.url);
    } catch (e) { if (btn) btn.loading = false; fail(e); }
  }

  /** Back from SavAccount: signed in, linked, or a last step (a new account, or proving an account that already exists). */
  async function finishSav(handoff) {
    const key = savKey.get();
    let back = '';
    try { back = sessionStorage.getItem('savc-sav-back') || ''; } catch {}
    if (back && back !== location.hash) location.hash = back;
    const body = $('#authBody') || (authDialog(), $('#authBody'));
    if (!key) { savKey.clear(); return toast(errText('sav_expired'), 'danger'); }
    let r;
    try { r = await api('auth.sav.finish', { handoff, key }); } catch (e) { savKey.clear(); return fail(e); }
    if (r.user && r.token) { savKey.clear(); return signedIn(r); }
    if (r.connected) { savKey.clear(); A.user = r.user; renderTop(); toast('SavAccount linked: you can now sign in with it', 'success', 'link'); if (location.hash === '#account') D.route(); return; }
    const d = authDialog();
    if (r.signup) {
      body.innerHTML = `<form class="stack" id="fSavNew">
        <div class="sav-head">${SAV_MARK}<div><h3>Create your account</h3><p class="muted small">SavAccount confirmed <b>${esc(r.signup.email)}</b>. No password needed: you sign in with SavAccount.</p></div></div>
        <sav-input name="name" label="Name" autocomplete="name" required minlength="2" value="${esc(r.signup.name || '')}"></sav-input>
        <sav-checkbox name="privacy" required size="sm">I accept the terms and have read the <a href="privacy.html" target="_blank" rel="noopener">privacy notice</a></sav-checkbox>
        <div class="form-err"></div><sav-button type="submit" block>Create account</sav-button></form>`;
      bindForm('#fSavNew', async (f) => { const x = await api('auth.sav.create', { handoff, key, name: f.get('name'), acceptPrivacy: !!f.get('privacy') }); savKey.clear(); await signedIn(x); });
    } else if (r.link) {
      const pw = r.link.hasPassword;
      body.innerHTML = `<div class="stack" id="savLink">
        <div class="sav-head">${SAV_MARK}<div><h3>This is your account?</h3><p class="muted small">A SavComponents account with <b>${esc(r.link.email)}</b> already exists. Prove it is yours once, and from then on SavAccount signs you in to it.</p></div></div>
        ${pw ? `<form class="stack" id="fSavPw"><sav-input name="password" type="password" label="Password of your SavComponents account" required autocomplete="current-password" password-toggle></sav-input>
          <div class="form-err"></div><sav-button type="submit" block>Join and sign in</sav-button></form><sav-divider>or</sav-divider>` : ''}
        <form class="stack" id="fSavCode"><p class="small" style="margin:0">We send a code to <b>${esc(r.link.email)}</b>.</p>
          <sav-button type="button" appearance="${pw ? 'outline' : 'solid'}" ${pw ? 'variant="neutral"' : ''} block id="savSendCode" icon="mail">Send me a code</sav-button>
          <div id="savCodeBox" class="stack" style="display: none"><sav-otp name="code" length="6" label="Code from the email" required></sav-otp><div class="form-err"></div><sav-button type="submit" block>Join and sign in</sav-button></div></form></div>`;
      if (pw) bindForm('#fSavPw', async (f) => { const x = await api('auth.sav.link', { handoff, key, password: f.get('password') }); savKey.clear(); await signedIn(x); });
      $('#savSendCode').addEventListener('click', async (e) => {
        const b = e.currentTarget; b.loading = true;
        try { await api('auth.sav.code', { handoff, key }); $('#savCodeBox').style.display = ''; b.textContent = 'Send a new code'; toast('Code sent: check your email', 'success', 'mail'); $('#savCodeBox sav-otp')?.focus(); }
        catch (ex) { fail(ex); } finally { b.loading = false; }
      });
      bindForm('#fSavCode', async (f) => { const x = await api('auth.sav.link', { handoff, key, code: f.get('code') }); savKey.clear(); await signedIn(x); });
    } else return;
    d.show();
  }

  /* ------------------------------------------------------------ sign in / register / forgot */

  let afterAuth = null; // what to do once signed in (e.g. the save that asked for it)

  function authDialog() {
    let d = $('#authDialog');
    if (d) return d;
    document.body.insertAdjacentHTML('beforeend', `<sav-dialog id="authDialog" label="Your SavComponents account" sheet-on-mobile style="--width: 26rem">
      <div id="authBody"></div></sav-dialog>`);
    return $('#authDialog');
  }

  function openAuth(view = 'signin', note = '') {
    const d = authDialog();
    const body = $('#authBody');
    const noteHtml = note ? `<sav-alert variant="primary" appearance="accent">${esc(note)}</sav-alert>` : '';
    if (view === 'signin' || view === 'register') {
      body.innerHTML = `${noteHtml}<sav-tabs appearance="segmented" class="auth-tabs" active="${view}">
        <sav-tab label="Sign in" name="signin">
          <form class="stack" id="fSignin">
            <sav-input name="email" type="email" label="Email" autocomplete="email" required><sav-icon slot="prefix" name="mail"></sav-icon></sav-input>
            <sav-input name="password" type="password" label="Password" autocomplete="current-password" required password-toggle><sav-icon slot="prefix" name="lock"></sav-icon></sav-input>
            <div class="form-err"></div>
            <sav-button type="submit" block>Sign in</sav-button>
            <sav-button appearance="link" size="sm" id="toForgot">Forgot your password?</sav-button>
          </form>
          ${A.savaccount ? `<sav-divider>or</sav-divider>${savButton()}` : ''}
        </sav-tab>
        <sav-tab label="Create account" name="register">
          <form class="stack" id="fRegister">
            <sav-input name="name" label="Name" autocomplete="name" required minlength="2"></sav-input>
            <sav-input name="email" type="email" label="Email" autocomplete="email" required help="We send you a link to confirm it."></sav-input>
            <sav-input name="password" type="password" label="Password" autocomplete="new-password" required minlength="8" password-toggle help="At least 8 characters."></sav-input>
            <sav-checkbox name="privacy" required size="sm">I accept the terms and have read the <a href="privacy.html" target="_blank" rel="noopener">privacy notice</a></sav-checkbox>
            <div class="form-err"></div>
            <sav-button type="submit" block>Create account</sav-button>
          </form>
          ${A.savaccount ? `<sav-divider>or</sav-divider>${savButton()}` : ''}
        </sav-tab>
      </sav-tabs>
      <p class="muted small">An account only keeps your favourite components and your saved themes and components.</p>`;
      $('#toForgot').addEventListener('click', () => openAuth('forgot'));
      body.querySelectorAll('[data-sav-start]').forEach((b) => b.addEventListener('click', () => startSav('login', b)));
      bindForm('#fSignin', async (f) => {
        const r = await api('auth.login', { email: f.get('email'), password: f.get('password') });
        await signedIn(r);
      });
      bindForm('#fRegister', async (f) => {
        await api('auth.register', { name: f.get('name'), email: f.get('email'), password: f.get('password'), acceptPrivacy: !!f.get('privacy') });
        body.innerHTML = `<div class="done-box">${ICON('mail')}<h3>Check your email</h3><p>We sent a link to <b>${esc(f.get('email'))}</b>. Open it to confirm your address and sign in.</p><p class="muted small">Nothing there? Look in the spam folder. The link works for 48 hours.</p></div>`;
      });
    } else if (view === 'forgot') {
      body.innerHTML = `<form class="stack" id="fForgot"><p>Write the email of your account: we send you a link to choose a new password.</p>
        <sav-input name="email" type="email" label="Email" required autocomplete="email"></sav-input><div class="form-err"></div>
        <div class="row between"><sav-button appearance="link" size="sm" id="toSignin" icon="arrow-left">Back</sav-button><sav-button type="submit">Send the link</sav-button></div></form>`;
      $('#toSignin').addEventListener('click', () => openAuth('signin'));
      bindForm('#fForgot', async (f) => {
        await api('auth.forgot', { email: f.get('email') });
        body.innerHTML = `<div class="done-box">${ICON('mail')}<h3>Check your email</h3><p>If an account uses <b>${esc(f.get('email'))}</b>, a link to choose a new password is on its way. It works for 2 hours.</p></div>`;
      });
    }
    d.show();
  }

  /** Submits a form of sav-* controls: validation, busy button, error under the fields. */
  function bindForm(sel, handler) {
    const form = $(sel);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.querySelectorAll('sav-input, sav-checkbox, sav-textarea, sav-select').forEach((c) => c.reportValidity?.() === false && 0); form.reportValidity(); return; }
      const btn = form.querySelector('sav-button[type="submit"]');
      const err = form.querySelector('.form-err');
      if (err) err.innerHTML = '';
      btn && (btn.loading = true);
      try { await handler(new FormData(form)); }
      catch (ex) { if (err) err.innerHTML = `<sav-alert variant="danger">${esc(errText(ex.message))}</sav-alert>`; else fail(ex); }
      finally { btn && (btn.loading = false); }
    });
  }

  async function signedIn(r) {
    A.user = r.user; A.csrf = r.csrf;
    if (r.token) tokenStore.set(r.token);
    $('#authDialog')?.hide();
    await loadData();
    renderTop();
    toast(`Welcome, ${A.user.name}`, 'success', 'user');
    const next = afterAuth; afterAuth = null;
    if (next) next();
    else if (['#account', '#admin'].includes(location.hash)) D.route();
  }

  /** Runs fn when signed in and confirmed; otherwise asks to sign in first and runs it afterwards. */
  function needAccount(fn, why) {
    if (!A.installed) return toast(errText('not_installed'), 'neutral');
    if (!A.user) { afterAuth = fn; return openAuth('signin', why); }
    if (!A.user.verified) return toast(errText('email_unverified'), 'warning');
    fn();
  }

  /* ------------------------------------------------------------ links from emails (?verify=, ?reset=) */

  function handleLinks() {
    const q = new URLSearchParams(location.search);
    const verify = q.get('verify'), reset = q.get('reset'), sav = q.get('sav'), savErr = q.get('sav_error');
    if (!verify && !reset && !sav && !savErr) return;
    const keep = new URLSearchParams(); if (q.get('v')) keep.set('v', q.get('v')); // the version of the library the site runs on stays
    history.replaceState(null, '', location.pathname + (keep.size ? `?${keep}` : '') + location.hash);
    if (savErr) {
      let back = ''; try { back = sessionStorage.getItem('savc-sav-back') || ''; } catch {}
      savKey.clear(); if (back && back !== location.hash) location.hash = back;
      return toast(errText(savErr === 'cancelled' ? 'cancelled' : savErr === 'expired' ? 'sav_expired' : 'sav_failed'), savErr === 'cancelled' ? 'neutral' : 'danger');
    }
    if (sav) return finishSav(sav);
    const d = authDialog();
    const body = $('#authBody');
    if (verify) {
      // a button, not an automatic call: mail scanners that open links do not confirm anything
      body.innerHTML = `<div class="done-box">${ICON('check-circle')}<h3>Confirm your email</h3><p>One click and your account is ready.</p><div class="form-err"></div>
        <sav-button id="doVerify">Confirm my email</sav-button></div>`;
      $('#doVerify').addEventListener('click', async (e) => {
        e.currentTarget.loading = true;
        try { await signedIn(await api('auth.verify', { token: verify })); }
        catch (ex) { body.querySelector('.form-err').innerHTML = `<sav-alert variant="danger">${esc(errText(ex.message))}</sav-alert>`; e.target.loading = false; }
      });
    } else {
      body.innerHTML = `<form class="stack" id="fReset"><p>Choose a new password for your account.</p>
        <sav-input name="password" type="password" label="New password" required minlength="8" password-toggle autocomplete="new-password" help="At least 8 characters."></sav-input>
        <div class="form-err"></div><sav-button type="submit">Save and sign in</sav-button></form>`;
      bindForm('#fReset', async (f) => signedIn(await api('auth.reset', { token: reset, password: f.get('password') })));
    }
    d.show();
  }

  /* ------------------------------------------------------------ favourites */

  function paintFavSlot() {
    const slot = $('.fav-slot');
    if (!slot) return;
    if (!A.installed) { slot.innerHTML = ''; return; }
    const id = slot.dataset.fav, on = A.favs.has(id);
    // the library's own Favourite button (star): the click is turned into a request to the account, which repaints it
    slot.innerHTML = `<sav-tooltip content="${on ? 'Remove from favourites' : 'Add to favourites'}"><sav-favourite-button icon="star" label="Favourite" ${on ? 'pressed' : ''}></sav-favourite-button></sav-tooltip>`;
    slot.querySelector('sav-favourite-button').addEventListener('sav-change', (e) => { e.preventDefault(); toggleFav(id); });
  }

  function toggleFav(id) {
    needAccount(async () => {
      const on = !A.favs.has(id);
      on ? A.favs.add(id) : A.favs.delete(id);
      paintFavSlot(); renderTop();
      try {
        await api('fav.set', { component: id, on });
        toast(on ? 'Added to your favourites' : 'Removed from your favourites', on ? 'success' : 'neutral', 'star');
      } catch (e) { on ? A.favs.delete(id) : A.favs.add(id); paintFavSlot(); fail(e); }
      if (location.hash === '#account') D.route();
    }, 'Sign in to keep your favourite components.');
  }

  /* ------------------------------------------------------------ saving */

  /** A small dialog asking for a name; resolves with it, or null. */
  function askName(title, value = '', help = '') {
    return new Promise((resolve) => {
      $('#nameDialog')?.remove();
      document.body.insertAdjacentHTML('beforeend', `<sav-dialog id="nameDialog" label="${esc(title)}" sheet-on-mobile style="--width: 24rem">
        <form id="fName" class="stack"><sav-input name="name" label="Name" required maxlength="80" value="${esc(value)}" autofocus ${help ? `help="${esc(help)}"` : ''}></sav-input></form>
        <sav-button slot="footer" appearance="ghost" variant="neutral" data-sav-close>Cancel</sav-button>
        <sav-button slot="footer" id="nameOk">Save</sav-button></sav-dialog>`);
      const d = $('#nameDialog');
      let done = false;
      const ok = () => {
        const v = d.querySelector('sav-input').value.trim();
        if (!v) return d.querySelector('sav-input').reportValidity();
        done = true; resolve(v); d.hide();
      };
      $('#nameOk').addEventListener('click', ok);
      $('#fName').addEventListener('submit', (e) => { e.preventDefault(); ok(); });
      d.addEventListener('sav-after-hide', () => { if (!done) resolve(null); d.remove(); });
      d.show();
    });
  }

  async function saveTheme() {
    needAccount(async () => {
      const name = await askName('Save this theme', '', 'You get a link to use it on your own sites.');
      if (!name) return;
      try {
        const r = await api('item.save', { kind: 'theme', name, config: D.themeConfig() });
        A.items.unshift(r.item);
        renderTop();
        toast('Theme saved: find it in your account', 'success', 'palette');
      } catch (e) { fail(e); }
    }, 'Sign in to save your themes and use them on your sites.');
  }

  /** opts.id: replace the configuration of that saved item (keeps its name); opts.onSaved(item): told what was saved */
  async function saveComponent(d, config, current, opts = {}) {
    needAccount(async () => {
      const own = opts.id && A.items.find((i) => i.id === opts.id);
      try {
        if (own) {
          const r = await api('item.save', { id: own.id, name: own.name, config });
          Object.assign(own, r.item);
          toast(`Changes saved in “${own.name}”`, 'success', 'save');
          opts.onSaved?.(own);
          return;
        }
        const name = await askName(`Save this ${d.name.toLowerCase()}`, current || `My ${d.name.toLowerCase()}`);
        if (!name) return;
        const r = await api('item.save', { kind: 'component', component: d.id, name, config });
        A.items.unshift(r.item);
        toast('Saved in “My components”: find it in your account', 'success', 'save');
        opts.onSaved?.(r.item);
      } catch (e) { fail(e); }
    }, 'Sign in to save your components.');
  }

  /* ------------------------------------------------------------ account page */

  let accountTab = 'favs';
  const docById = (id) => D.docs.find((x) => x.id === id);

  function swatches(cfg) {
    const t = cfg.tokens || {};
    return ['primary', 'success', 'warning', 'danger', 'neutral'].map((k) => `<i style="background:${esc(t['--sav-color-' + k] || `var(--sav-color-${k})`)}"></i>`).join('');
  }

  function embedSnippet(item) {
    const lib = `https://savcomponents.com/v/${Sav.version}/`;
    return `<link rel="stylesheet" href="${lib}sav.css">\n<link rel="stylesheet" href="${item.cssUrl}">\n<script src="${lib}sav.js" defer></script>`;
  }

  function accountHtml() {
    if (!A.installed) return `<div class="doc-head"><h1>Account</h1><p class="lead">Accounts are not available on this copy of the site.</p></div>`;
    if (!A.user) return `<div class="doc-head"><sav-label class="eyebrow">Account</sav-label><h1>Your SavComponents</h1><p class="lead">Sign in to keep your favourite components, save themes and single components with your settings, and use your themes on any website.</p>
      <div class="row"><sav-button id="accSignin" icon="log-in">Sign in</sav-button><sav-button appearance="outline" variant="neutral" id="accRegister" icon="user-plus">Create account</sav-button></div></div>`;
    const u = A.user;
    const themes = A.items.filter((i) => i.kind === 'theme'), comps = A.items.filter((i) => i.kind === 'component');
    const favCards = [...A.favs].map(docById).filter(Boolean).map((d) => `<div class="fav-card layered"><a href="#${d.id}"><span class="cc-ic tilt">${ICON(d.icon)}</span><span><b>${d.name}</b><small>${esc(d.tag)}</small></span></a>
      <sav-button size="sm" appearance="ghost" variant="neutral" icon="x" label="Remove ${esc(d.name)} from favourites" data-unfav="${d.id}"></sav-button></div>`).join('');
    const themeCards = themes.map((i) => `<div class="item-card layered" data-item="${i.id}">
      <div class="item-top"><span class="pv">${swatches(i.config)}</span><div class="item-name"><b>${esc(i.name)}</b><small>${esc(i.config.style || 'soft')} · ${esc(i.config.mode || 'auto')} · updated ${new Date(i.updatedAt).toLocaleDateString()}</small></div></div>
      <div class="row">
        <sav-button size="sm" icon="check" data-act="apply">Apply here</sav-button>
        <sav-button size="sm" appearance="soft" icon="link" data-act="embed">Use on your site</sav-button>
        <sav-dropdown placement="bottom-end"><sav-button slot="trigger" size="sm" appearance="ghost" variant="neutral" icon="more-horizontal" label="More actions"></sav-button>
          <sav-menu-item value="update"><sav-icon slot="prefix" name="refresh"></sav-icon>Replace with the current customiser</sav-menu-item>
          <sav-menu-item value="rename"><sav-icon slot="prefix" name="edit"></sav-icon>Rename</sav-menu-item>
          <sav-menu-item value="delete" variant="danger"><sav-icon slot="prefix" name="trash"></sav-icon>Delete</sav-menu-item></sav-dropdown>
      </div></div>`).join('');
    const compCards = comps.map((i) => {
      const d = docById(i.component);
      return `<div class="item-card layered" data-item="${i.id}">
        <div class="item-name"><b>${esc(i.name)}</b><small>${d ? esc(d.name) : esc(i.component)}</small></div>
        <div class="item-preview">${d && (d.play || i.config.tag) ? D.playMarkup(d, i.config) : ''}</div>
        <div class="row">
          <sav-button size="sm" appearance="soft" icon="code" data-act="code">Code</sav-button>
          ${i.config.builder ? '<sav-button size="sm" appearance="ghost" data-act="build"><sav-icon slot="prefix" name="wand-sparkles"></sav-icon>Open in the builder</sav-button>' : '<sav-button size="sm" appearance="ghost" icon="edit" data-act="open">Open in playground</sav-button>'}
          <sav-dropdown placement="bottom-end"><sav-button slot="trigger" size="sm" appearance="ghost" variant="neutral" icon="more-horizontal" label="More actions"></sav-button>
            <sav-menu-item value="rename"><sav-icon slot="prefix" name="edit"></sav-icon>Rename</sav-menu-item>
            <sav-menu-item value="delete" variant="danger"><sav-icon slot="prefix" name="trash"></sav-icon>Delete</sav-menu-item></sav-dropdown>
        </div></div>`;
    }).join('');
    const empty = (icon, title, text, action = '') => `<div class="empty">${ICON(icon)}<b>${title}</b><p>${text}</p>${action}</div>`;
    return `<div class="doc-head acc-head"><sav-avatar size="xl" label="${esc(u.name)}" variant="primary"></sav-avatar>
        <div><sav-label class="eyebrow">Account</sav-label><h1>${esc(u.name)}</h1><p class="muted">${esc(u.email)} ${u.verified ? '<sav-badge variant="success" appearance="soft">confirmed</sav-badge>' : '<sav-badge variant="warning" appearance="soft">not confirmed</sav-badge>'} ${u.master ? '<sav-badge appearance="soft">master admin</sav-badge>' : ''}</p></div></div>
      ${u.verified ? '' : `<sav-alert variant="warning" heading="Confirm your email">Open the link we sent to ${esc(u.email)} to start saving. <sav-button size="sm" appearance="link" id="resendBtn">Send it again</sav-button></sav-alert>`}
      <sav-tabs id="accTabs" active="${accountTab}" class="acc-tabs">
        <sav-tab label="Favourites (${A.favs.size})" name="favs" icon="star">${favCards ? `<div class="fav-grid">${favCards}</div>` : empty('star', 'No favourites yet', 'Open a component and press the star next to its name.', '<sav-button size="sm" href="#button">Browse components</sav-button>')}</sav-tab>
        <sav-tab label="Themes (${themes.length})" name="themes" icon="palette">
          <div class="row tab-actions"><sav-button size="sm" icon="save" id="saveCurrent">Save the current theme</sav-button><sav-button size="sm" appearance="ghost" variant="neutral" icon="settings" onclick="document.getElementById('themer').show()">Open the customiser</sav-button></div>
          ${themeCards ? `<div class="item-grid">${themeCards}</div>` : empty('palette', 'No saved themes', 'Make a theme in the customiser (colours, style, corners…) and save it: you get a link to use it on any website.')}</sav-tab>
        <sav-tab label="Components (${comps.length})" name="components" icon="layers">${compCards ? `<div class="item-grid">${compCards}</div>` : empty('layers', 'No saved components', 'Every component page has a Playground: set it up the way you like and press “Save to my components”.', '<sav-button size="sm" href="#button">Try the button playground</sav-button>')}</sav-tab>
        <sav-tab label="Settings" name="settings" icon="settings">
          <div class="settings-grid">
            <sav-card><strong slot="header">Profile</strong><form class="stack" id="fProfile"><sav-input name="name" label="Name" required minlength="2" value="${esc(u.name)}"></sav-input>
              <sav-input label="Email" value="${esc(u.email)}" readonly disabled help="The email of an account cannot be changed."></sav-input><div class="form-err"></div><div><sav-button type="submit" size="sm">Save</sav-button></div></form></sav-card>
            <sav-card><strong slot="header">Password</strong><form class="stack" id="fPassword">${u.hasPassword === false ? '<p class="muted small" style="margin:0">You sign in with SavAccount. Choose a password to sign in with your email too.</p>' : '<sav-input name="current" type="password" label="Current password" required autocomplete="current-password"></sav-input>'}
              <sav-input name="password" type="password" label="New password" required minlength="8" password-toggle autocomplete="new-password" help="Other devices will be signed out."></sav-input><div class="form-err"></div><div><sav-button type="submit" size="sm">${u.hasPassword === false ? 'Choose password' : 'Change password'}</sav-button></div></form></sav-card>
            ${A.savaccount || u.savaccount ? `<sav-card><strong slot="header">SavAccount</strong>
              <div class="sav-head">${SAV_MARK}<p class="muted small" style="margin:0">${u.savaccount ? 'Linked: you can sign in with SavAccount.' : 'Sign in with your SavAccount (savaccount.eu) instead of a password.'}</p></div>
              <div>${u.savaccount ? `<sav-button size="sm" appearance="outline" variant="neutral" icon="unlink" id="savUnlink" ${u.hasPassword === false ? 'disabled' : ''}>Unlink SavAccount</sav-button>${u.hasPassword === false ? '<p class="muted small">Choose a password first: your account needs a way to sign in.</p>' : ''}` : `<sav-button size="sm" appearance="outline" variant="neutral" id="savLinkBtn"><span slot="prefix" class="sav-mark-wrap">${SAV_MARK}</span>Link SavAccount</sav-button>`}</div></sav-card>` : ''}
            <sav-card><strong slot="header">Delete the account</strong><p class="muted small" style="margin-top:0">Your favourites, themes and components are deleted for good, and your theme links stop working.</p>
              <div><sav-button size="sm" variant="danger" appearance="outline" icon="trash" id="delAccount">Delete my account</sav-button></div></sav-card>
          </div>
        </sav-tab>
      </sav-tabs>`;
  }

  function mountAccount(main) {
    $('#accSignin')?.addEventListener('click', () => openAuth('signin'));
    $('#accRegister')?.addEventListener('click', () => openAuth('register'));
    if (!A.user) return;
    $('#accTabs').addEventListener('sav-tab-show', (e) => { accountTab = e.detail.name; });
    $('#resendBtn')?.addEventListener('click', async () => { try { await api('auth.resend', {}); toast('Link sent again', 'success', 'mail'); } catch (e) { fail(e); } });
    $('#saveCurrent')?.addEventListener('click', saveTheme);
    main.querySelectorAll('[data-unfav]').forEach((b) => b.addEventListener('click', () => toggleFav(b.dataset.unfav)));
    main.querySelectorAll('[data-item]').forEach((card) => {
      const item = A.items.find((i) => i.id === Number(card.dataset.item));
      card.addEventListener('click', (e) => { const b = e.target.closest('[data-act]'); if (b) itemAction(item, b.dataset.act); });
      card.querySelector('sav-dropdown')?.addEventListener('sav-select', (e) => itemAction(item, e.detail.value));
    });
    bindForm('#fProfile', async (f) => { const r = await api('auth.profile', { name: f.get('name') }); A.user = r.user; renderTop(); toast('Profile saved'); D.route(); });
    bindForm('#fPassword', async (f) => { const first = A.user.hasPassword === false; await api('auth.password', { current: f.get('current') || '', password: f.get('password') }); $('#fPassword').reset(); if (first) { A.user.hasPassword = true; D.route(); } toast(first ? 'Password saved' : 'Password changed', 'success', 'lock'); });
    $('#savLinkBtn')?.addEventListener('click', (e) => startSav('connect', e.currentTarget));
    $('#savUnlink')?.addEventListener('click', async () => {
      if (!await confirmDanger('Unlink SavAccount?', 'You will sign in with your email and password only.', 'Unlink')) return;
      try { const r = await api('auth.sav.unlink', {}); A.user = r.user; D.route(); toast('SavAccount unlinked', 'neutral', 'unlink'); } catch (e) { fail(e); }
    });
    $('#delAccount')?.addEventListener('click', deleteAccount);
  }

  async function itemAction(item, act) {
    try {
      if (act === 'apply') { D.applyThemeConfig(item.config); toast(`“${item.name}” applied to this site`, 'success', 'palette'); }
      else if (act === 'embed') showEmbed(item);
      else if (act === 'code') showCode(item);
      else if (act === 'open') D.openPlayground(item);
      else if (act === 'build') window.SavBuilder?.openSaved(item);
      else if (act === 'update') {
        const r = await api('item.save', { id: item.id, name: item.name, config: D.themeConfig() });
        Object.assign(item, r.item); toast('Theme updated: sites using its link change within 5 minutes', 'success', 'refresh'); D.route();
      } else if (act === 'rename') {
        const name = await askName('Rename', item.name);
        if (!name) return;
        const r = await api('item.save', { id: item.id, name });
        Object.assign(item, r.item); D.route();
      } else if (act === 'delete') {
        if (!await confirmDanger(`Delete “${item.name}”?`, item.kind === 'theme' ? 'Sites that link to this theme will go back to the default look.' : 'It cannot be undone.', 'Delete')) return;
        await api('item.delete', { id: item.id });
        A.items = A.items.filter((i) => i !== item); renderTop(); D.route(); toast('Deleted', 'neutral', 'trash');
      }
    } catch (e) { fail(e); }
  }

  function infoDialog(title, html, width = '40rem') {
    $('#infoDialog')?.remove();
    document.body.insertAdjacentHTML('beforeend', `<sav-dialog id="infoDialog" label="${esc(title)}" style="--width: ${width}" sheet-on-mobile>${html}</sav-dialog>`);
    const d = $('#infoDialog');
    d.addEventListener('sav-after-hide', () => d.remove());
    d.show();
    return d;
  }

  function showEmbed(item) {
    infoDialog(`Use “${item.name}” on your site`, `<p>Paste these lines in the <code>&lt;head&gt;</code> of any page, on any domain (for example <b>esempio.com</b>). The second line is your theme: when you change it here, your sites follow within a few minutes.</p>
      ${D.codeBlock(embedSnippet(item))}
      <p>Then use the components anywhere in the page:</p>${D.codeBlock('<sav-button>Hello</sav-button>')}
      <p class="muted small">Only the theme link: <a href="${esc(item.cssUrl)}" target="_blank" rel="noopener">${esc(item.cssUrl)}</a></p>`);
  }

  function showCode(item) {
    const d = docById(item.component);
    const html = d ? D.playMarkup(d, item.config) : '';
    infoDialog(item.name, `<div class="play-preview">${html}</div>${D.codeBlock(html)}<p class="muted small">It works on any site that loads sav.css and sav.js (see “Use on your site” in your themes).</p>`);
  }

  function confirmDanger(title, text, okLabel) {
    return new Promise((resolve) => {
      const d = infoDialog(title, `<p>${esc(text)}</p><sav-button slot="footer" appearance="ghost" variant="neutral" data-sav-close>Cancel</sav-button>
        <sav-button slot="footer" variant="danger" id="dangerOk">${esc(okLabel)}</sav-button>`, '26rem');
      let ok = false;
      $('#dangerOk').addEventListener('click', () => { ok = true; d.hide(); });
      d.addEventListener('sav-after-hide', () => resolve(ok));
    });
  }

  function deleteAccount() {
    const noPw = A.user?.hasPassword === false;
    const d = infoDialog('Delete your account?', `<form class="stack" id="fDelete"><p>Favourites, themes and components are deleted for good. ${noPw ? 'Write your email address to confirm.' : 'Write your password to confirm.'}</p>
      ${noPw ? `<sav-input name="confirm" type="email" label="Email" required autocomplete="off" placeholder="${esc(A.user.email)}"></sav-input>` : '<sav-input name="password" type="password" label="Password" required autocomplete="current-password"></sav-input>'}<div class="form-err"></div></form>
      <sav-button slot="footer" appearance="ghost" variant="neutral" data-sav-close>Cancel</sav-button><sav-button slot="footer" variant="danger" id="delOk" icon="trash">Delete for good</sav-button>`, '26rem');
    bindForm('#fDelete', async (f) => {
      await api('auth.delete', noPw ? { confirm: f.get('confirm') } : { password: f.get('password') });
      d.hide(); tokenStore.set(''); A.user = null; A.favs.clear(); A.items = []; renderTop(); location.hash = ''; toast('Your account has been deleted', 'neutral', 'trash');
    });
    $('#delOk').addEventListener('click', () => $('#fDelete').requestSubmit());
  }

  /* ------------------------------------------------------------ master admin page */

  const adm = { q: '', filter: '', page: 1 };

  function adminHtml() {
    if (!A.user?.master) return `<div class="doc-head"><h1>Admin</h1><p class="lead">This page is only for master admins.</p></div>`;
    return `<div class="doc-head"><sav-label class="eyebrow">Master admin</sav-label><h1>Users</h1><p class="lead">Every account of SavComponents. You can confirm an email by hand, disable or delete an account. Master admins are listed in <code>credentials.php</code>.</p></div>
      <div class="stat-grid" id="admStats"><sav-skeleton shape="rect" style="height:5rem"></sav-skeleton><sav-skeleton shape="rect" style="height:5rem"></sav-skeleton><sav-skeleton shape="rect" style="height:5rem"></sav-skeleton><sav-skeleton shape="rect" style="height:5rem"></sav-skeleton></div>
      <div class="adm-bar">
        <sav-input id="admQ" type="search" placeholder="Search by name or email" clearable size="sm" value="${esc(adm.q)}"><sav-icon slot="prefix" name="search"></sav-icon></sav-input>
        <sav-radio-group id="admFilter" appearance="buttons" size="sm" value="${adm.filter || 'all'}"><sav-radio value="all">All</sav-radio><sav-radio value="unverified">Not confirmed</sav-radio><sav-radio value="disabled">Disabled</sav-radio></sav-radio-group>
      </div>
      <div id="admList"><sav-skeleton shape="rect" style="height:12rem"></sav-skeleton></div>`;
  }

  async function mountAdmin() {
    if (!A.user?.master) return;
    let t;
    $('#admQ').addEventListener('input', (e) => { clearTimeout(t); t = setTimeout(() => { adm.q = e.target.value.trim(); adm.page = 1; loadUsers(); }, 250); });
    $('#admFilter').addEventListener('change', (e) => { adm.filter = e.currentTarget.value === 'all' ? '' : e.currentTarget.value; adm.page = 1; loadUsers(); });
    try {
      const s = await api('admin.stats');
      const tile = (n, label, icon) => `<div class="stat layered"><span class="cc-ic tilt">${ICON(icon)}</span><div><b>${n}</b><small>${label}</small></div></div>`;
      $('#admStats').innerHTML = tile(s.stats.users, `accounts · ${s.stats.verified} confirmed`, 'users') + tile(s.stats.active30, 'active in the last 30 days', 'activity')
        + tile(s.stats.themes, 'saved themes', 'palette') + tile(s.stats.components, `saved components · ${s.stats.favorites} favourites`, 'layers')
        + (s.stats.learners !== undefined ? tile(s.stats.learners, `Academy learners · ${s.stats.learners30} in 30 days · ${s.stats.onBoard} on the leaderboard`, 'graduation-cap') : '');
    } catch (e) { fail(e); }
    // sites that load the library from savcomponents.com (usage.php: a salted hash per site and day, numbers only)
    try {
      const u = await (await fetch('usage.php?report', { credentials: 'omit' })).json();
      const ms = Object.keys(u.months || {}).sort(), cur = ms.at(-1), prev = ms.at(-2);
      const tile = (n, label, icon) => `<div class="stat layered"><span class="cc-ic tilt">${ICON(icon)}</span><div><b>${n}</b><small>${label}</small></div></div>`;
      $('#admStats')?.insertAdjacentHTML('beforeend', tile(cur ? u.months[cur].sites : 0, `sites using the library this month${prev ? ` · ${u.months[prev].sites} last month` : ''}`, 'globe')
        + tile(u.days?.[new Date().toISOString().slice(0, 10)] ?? 0, 'sites today (loading it from savcomponents.com)', 'activity'));
    } catch { /* the counter is not there (a local copy of the site): nothing to show */ }
    loadUsers();
  }

  const when = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  async function loadUsers() {
    const box = $('#admList');
    if (!box) return;
    try {
      const r = await api('admin.users', undefined, `&q=${encodeURIComponent(adm.q)}&filter=${adm.filter}&page=${adm.page}`);
      const pages = Math.max(1, Math.ceil(r.total / r.perPage));
      box.innerHTML = !r.users.length ? `<div class="empty">${ICON('users')}<b>No accounts found</b></div>` : `<div class="tbl"><table class="adm-table"><thead><tr><th>Account</th><th>State</th><th>Saved</th><th>Created</th><th>Last seen</th><th></th></tr></thead><tbody>
        ${r.users.map((u) => `<tr data-uid="${u.id}"><td><div class="adm-user"><sav-avatar size="sm" label="${esc(u.name)}" ${u.master ? 'variant="primary"' : ''}></sav-avatar><span><b>${esc(u.name)}</b><small>${esc(u.email)}</small></span></div></td>
          <td>${u.status === 'disabled' ? '<sav-badge variant="danger" appearance="soft">disabled</sav-badge>' : u.verified ? '<sav-badge variant="success" appearance="soft">active</sav-badge>' : '<sav-badge variant="warning" appearance="soft">not confirmed</sav-badge>'} ${u.master ? '<sav-badge appearance="soft">master</sav-badge>' : ''}</td>
          <td class="nowrap">${u.themes} themes · ${u.components} comp. · ${u.favorites} ★</td><td class="nowrap">${when(u.createdAt)}</td><td class="nowrap">${when(u.lastSeenAt || u.lastLoginAt)}</td>
          <td><sav-dropdown placement="bottom-end"><sav-button slot="trigger" size="sm" appearance="ghost" variant="neutral" icon="more-vertical" label="Actions for ${esc(u.email)}"></sav-button>
            <sav-menu-item value="view"><sav-icon slot="prefix" name="eye"></sav-icon>See saved items</sav-menu-item>
            ${u.verified ? '' : '<sav-menu-item value="verify"><sav-icon slot="prefix" name="check-circle"></sav-icon>Confirm the email</sav-menu-item><sav-menu-item value="resend"><sav-icon slot="prefix" name="mail"></sav-icon>Send the link again</sav-menu-item>'}
            ${u.id === A.user.id ? '' : `<sav-menu-item value="${u.status === 'disabled' ? 'enable' : 'disable'}"><sav-icon slot="prefix" name="${u.status === 'disabled' ? 'unlock' : 'lock'}"></sav-icon>${u.status === 'disabled' ? 'Enable' : 'Disable'}</sav-menu-item>
            ${u.master ? '' : '<sav-menu-item value="delete" variant="danger"><sav-icon slot="prefix" name="trash"></sav-icon>Delete</sav-menu-item>'}`}
          </sav-dropdown></td></tr>`).join('')}</tbody></table></div>
        <div class="row between pager-row"><span class="muted small">${r.total} accounts · page ${r.page} of ${pages}</span><div class="row">
          <sav-button size="sm" appearance="outline" variant="neutral" icon="chevron-left" label="Previous page" id="pgPrev" ${r.page <= 1 ? 'disabled' : ''}></sav-button>
          <sav-button size="sm" appearance="outline" variant="neutral" icon="chevron-right" label="Next page" id="pgNext" ${r.page >= pages ? 'disabled' : ''}></sav-button></div></div>`;
      $('#pgPrev')?.addEventListener('click', () => { adm.page--; loadUsers(); });
      $('#pgNext')?.addEventListener('click', () => { adm.page++; loadUsers(); });
      box.querySelectorAll('tr[data-uid]').forEach((tr) => {
        const u = r.users.find((x) => x.id === Number(tr.dataset.uid));
        tr.querySelector('sav-dropdown').addEventListener('sav-select', (e) => adminAction(u, e.detail.value));
      });
    } catch (e) { box.innerHTML = `<sav-alert variant="danger">${esc(errText(e.message))}</sav-alert>`; }
  }

  async function adminAction(u, act) {
    try {
      if (act === 'view') {
        const r = await api('admin.user', undefined, `&id=${u.id}`);
        const list = (kind) => r.items.filter((i) => i.kind === kind).map((i) => `<li><b>${esc(i.name)}</b> <span class="muted small">${esc(i.component || i.config.style || '')} · ${when(i.updatedAt)}</span></li>`).join('') || '<li class="muted">None</li>';
        infoDialog(`${u.name} — ${u.email}`, `<h3>Favourites</h3><p>${r.favorites.map((f) => `<sav-tag size="sm">${esc(docById(f)?.name || f)}</sav-tag>`).join(' ') || '<span class="muted">None</span>'}</p>
          <h3>Themes</h3><ul class="plain-list">${list('theme')}</ul><h3>Components</h3><ul class="plain-list">${list('component')}</ul>`, '32rem');
        return;
      }
      if (act === 'delete' && !await confirmDanger(`Delete ${u.email}?`, 'The account and everything it saved are removed for good. Its theme links stop working.', 'Delete')) return;
      if (act === 'disable' && !await confirmDanger(`Disable ${u.email}?`, 'The person is signed out and cannot sign in; their theme links stop working until you enable the account again.', 'Disable')) return;
      const map = { verify: ['admin.verify', {}], resend: ['admin.resend', {}], disable: ['admin.status', { status: 'disabled' }], enable: ['admin.status', { status: 'active' }], delete: ['admin.delete', {}] };
      const [r, extra] = map[act];
      await api(r, { id: u.id, ...extra });
      toast({ verify: 'Email confirmed', resend: 'Link sent', disable: 'Account disabled', enable: 'Account enabled', delete: 'Account deleted' }[act], act === 'delete' || act === 'disable' ? 'neutral' : 'success');
      loadUsers();
    } catch (e) { fail(e); }
  }

  /* ------------------------------------------------------------ boot */

  async function loadData() {
    if (!A.user?.verified) { A.favs = new Set(); A.items = []; return; }
    try {
      const [f, i] = await Promise.all([api('fav.list'), api('item.list')]);
      A.favs = new Set(f.favorites); A.items = i.items;
    } catch (e) { fail(e); }
  }

  window.SavAccount = {
    pages: {
      account: { title: 'Account', html: accountHtml, mount: mountAccount },
      admin: { title: 'Admin', html: adminHtml, mount: mountAdmin },
    },
    saveComponent, saveTheme,
  };

  document.addEventListener('savc:route', () => { paintFavSlot(); $('#playSave')?.toggleAttribute('hidden', !A.installed); });
  $('#saveTheme')?.addEventListener('click', saveTheme);

  (async () => {
    try {
      const c = await api('auth.config');
      A.installed = !!c.installed;
      A.savaccount = !!c.savaccount;
    } catch { A.installed = false; }
    if (A.installed) {
      try {
        if (!tokenStore.get()) throw 0; // never signed in on this browser: no call needed
        const me = await api('auth.me');
        if (me.user) { A.user = me.user; A.csrf = me.csrf; await loadData(); }
      } catch {}
    }
    A.ready = true;
    renderTop();
    // a page drawn before the account was known (playground, builder) shows its save button now
    $('#playSave')?.toggleAttribute('hidden', !A.installed);
    document.dispatchEvent(new CustomEvent('savc:account'));
    handleLinks();
    if (['#account', '#admin'].includes(location.hash)) D.route();
  })();
})();
