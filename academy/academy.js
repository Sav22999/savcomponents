/* SavComponents Academy — learn SavComponents by doing: a lesson for every component (built from the documentation data),
   quizzes, hands-on challenges checked live, a daily quiz, XP, levels, streaks, badges and a leaderboard.
   The progress is kept on this device and, after signing in, in the SavComponents account (api/?r=academy.*). */
(() => {
  'use strict';

  const DOCS = (window.SAVC_DOCS || []).filter((d) => d && d.id && d.group);
  const { BASICS, CHALLENGES, BADGES, GROUP_BADGE, RANKS } = window.SavAcademyContent;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const plain = (h) => { const t = document.createElement('template'); t.innerHTML = String(h || ''); return t.content.textContent.replace(/\s+/g, ' ').trim(); };
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const pad = (n) => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const shuffle = (a, rnd = Math.random) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem(k); } catch {} },
  };
  const firstTag = (d) => (String(d.tag).match(/sav-[a-z-]+/) || [''])[0];
  // the demos point to the docs folder ("docs/sample.svg"): from /app/ that is one level up
  const fixAssets = (h) => String(h || '').replace(/(=["'])docs\//g, '$1../docs/');
  const toast = (msg, variant = 'success', icon) => window.Sav?.toast(msg, { variant, icon, duration: 3500 });

  /* ================================================================ paths and lessons */
  const GROUPS = ['Basics', ...new Set(DOCS.map((d) => d.group))];
  const LESSONS = [...BASICS.map((b) => ({ ...b, group: 'Basics', basics: true })), ...DOCS.map((d) => ({ id: d.id, name: d.name, icon: d.icon, group: d.group, doc: d }))];
  const LESSON = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
  const inGroup = (g) => LESSONS.filter((l) => l.group === g);
  const groupOf = (s) => GROUPS.find((g) => slug(g) === s);
  const GROUP_ICON = { Basics: 'graduation-cap', Actions: 'mouse-pointer-click', Feedback: 'message-square', Forms: 'text-cursor-input', Layout: 'layout-grid', Content: 'file-text', Media: 'film', Overlays: 'layers', Navigation: 'compass', Charts: 'chart-column', Sections: 'panel-top' };
  const CHALLENGE = Object.fromEntries(CHALLENGES.map((c) => [c.id, c]));
  const ALL_BADGES = [...BADGES, ...GROUPS.map((g) => ({ id: 'path-' + slug(g), name: (GROUP_BADGE[g] || [g])[0], icon: (GROUP_BADGE[g] || [0, GROUP_ICON[g] || 'award'])[1], desc: `Finish every lesson of ${g}.`, group: g }))];
  const CH_XP = [0, 40, 70, 100];

  /* ================================================================ progress: the state, XP, levels, streaks, badges */
  const EMPTY = () => ({ v: 1, lessons: {}, challenges: {}, daily: {}, days: [], badges: {}, styles: [], dark: false });
  const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
  function normalize(x) {
    const e = EMPTY();
    if (!isObj(x)) return e;
    for (const k of ['lessons', 'challenges', 'daily', 'badges']) if (isObj(x[k])) e[k] = x[k];
    for (const k of ['days', 'styles']) if (Array.isArray(x[k])) e[k] = x[k].filter((v) => typeof v === 'string').slice(-800);
    e.dark = !!x.dark;
    return e;
  }
  /** the progress of two devices together: the best of each */
  function merge(a, b) {
    const m = EMPTY();
    for (const k of ['lessons', 'challenges']) {
      m[k] = { ...a[k] };
      for (const [id, v] of Object.entries(b[k])) {
        const o = m[k][id];
        m[k][id] = !o ? v : { done: Math.min(o.done || Infinity, v.done || Infinity), best: Math.max(o.best || 0, v.best || 0), total: Math.max(o.total || 0, v.total || 0) };
      }
    }
    m.daily = { ...a.daily };
    for (const [d, v] of Object.entries(b.daily)) { const o = m.daily[d]; m.daily[d] = !o ? v : { score: Math.max(o.score || 0, v.score || 0), played: !!(o.played || v.played), ch: !!(o.ch || v.ch) }; }
    m.days = [...new Set([...a.days, ...b.days])].sort().slice(-800);
    m.badges = { ...b.badges, ...a.badges };
    for (const [k, v] of Object.entries(b.badges)) m.badges[k] = Math.min(m.badges[k] || v, v);
    m.styles = [...new Set([...a.styles, ...b.styles])];
    m.dark = a.dark || b.dark;
    return m;
  }
  let S = normalize(store.get('savc-academy', null));

  const xpFor = (n) => 100 * (n - 1) + 25 * (n - 1) * (n - 2); // XP needed to reach level n
  const levelOf = (xp) => { let n = 1; while (xp >= xpFor(n + 1)) n++; return n; };
  const rankOf = (lv) => RANKS.filter(([n]) => lv >= n).pop()[1];
  const starsOf = (r) => (!r?.done ? 0 : r.total && r.best >= r.total ? 3 : r.total && r.best / r.total >= 0.75 ? 2 : 1);
  function streaks(days) {
    const set = new Set(days);
    const back = (d, n) => { const x = new Date(d); x.setDate(x.getDate() - n); return dayKey(x); };
    let cur = 0, from = set.has(dayKey()) ? 0 : 1;
    while (set.has(back(new Date(), from + cur))) cur++;
    let best = 0, run = 0, prev = null;
    for (const d of [...set].sort()) { run = prev && back(new Date(d + 'T12:00'), 1) === prev ? run + 1 : 1; best = Math.max(best, run); prev = d; }
    return { cur, best };
  }
  /** everything worked out from the state: XP, level, streak, counts and the badges earned */
  function stats(s = S) {
    const done = Object.keys(s.lessons).filter((id) => LESSON[id] && s.lessons[id].done);
    let xp = 0;
    for (const id of done) xp += 20 + 10 * Math.min(4, s.lessons[id].best || 0);
    const chDone = Object.keys(s.challenges).filter((id) => CHALLENGE[id] && s.challenges[id].done);
    for (const id of chDone) xp += CH_XP[CHALLENGE[id].level];
    // a day: the quiz (if played) and the challenge of the day (if done) count apart
    for (const v of Object.values(s.daily)) xp += (v.played ? 20 + 5 * Math.min(6, v.score || 0) : 0) + (v.ch ? 30 : 0);
    const st = streaks(s.days);
    const c = {
      lessons: done.length, allLessons: LESSONS.length, perfect: done.filter((id) => starsOf(s.lessons[id]) === 3).length,
      challenges: chDone.length, allChallenges: CHALLENGES.length, hard: chDone.filter((id) => CHALLENGE[id].level === 3).length,
      dailies: Object.values(s.daily).filter((v) => v.played).length, bestStreak: st.best, styles: s.styles.length, dark: s.dark,
    };
    const earned = ALL_BADGES.filter((b) => !b.byLevel && (b.group ? inGroup(b.group).every((l) => s.lessons[l.id]?.done) : b.test(c))).map((b) => b.id);
    xp += 25 * earned.length;
    c.level = levelOf(xp);
    const byLevel = ALL_BADGES.filter((b) => b.byLevel && b.test(c)).map((b) => b.id);
    xp += 25 * byLevel.length;
    const level = levelOf(xp);
    return { xp, level, rank: rankOf(level), streak: st.cur, bestStreak: st.best, c, earned: [...earned, ...byLevel], chDone, done };
  }

  /** after any progress: badges and level ups are announced, the state is saved here and in the account */
  let last = stats();
  function commit({ quiet = false } = {}) {
    const now = stats();
    for (const id of now.earned) if (!S.badges[id]) {
      S.badges[id] = Date.now();
      const b = ALL_BADGES.find((x) => x.id === id);
      if (!quiet && b) toast(`Badge earned: ${b.name} (+25 XP)`, 'success', b.icon);
    }
    if (!quiet && now.level > last.level) toast(`Level ${now.level}: ${now.rank}`, 'primary', 'trending-up');
    last = stats();
    store.set('savc-academy', S);
    renderTop();
    push();
  }
  const markDay = () => { const d = dayKey(); if (!S.days.includes(d)) S.days.push(d); };

  /* ================================================================ account: the SavComponents account (same token as the portal) */
  let API = document.querySelector('meta[name="savc-api"]')?.content || 'https://www.saveriomorelli.com/projects/savcomponents/api/';
  try { API = localStorage.getItem('savc-api') || API; } catch {}
  const token = { get: () => { try { return localStorage.getItem('savc-token') || ''; } catch { return ''; } }, set: (t) => { try { t ? localStorage.setItem('savc-token', t) : localStorage.removeItem('savc-token'); } catch {} } };
  const ERR = {
    unauthenticated: 'Please sign in again.', disabled: 'This account has been disabled.', email_unverified: 'Confirm your email first: check your inbox.',
    rate_limited: 'Too many attempts: wait a few minutes and try again.', name_required: 'Write your name (at least 2 characters).',
    email_invalid: 'This email address is not valid.', password_short: 'The password needs at least 8 characters.', privacy_required: 'Please accept the privacy notice.',
    bad_credentials: 'Wrong email or password.', username_invalid: 'A username has 3 to 20 letters, digits or _.', username_taken: 'This username is taken: try another one.',
    too_large: 'Your progress is too large to save.', not_installed: 'Accounts are not available right now.', network: 'No connection: your progress is kept on this device.', server: 'Something went wrong. Try again.',
    bad_password: 'The password is not right.', sav_off: 'SavAccount sign-in is not available right now.', sav_expired: 'This SavAccount sign-in expired. Start it again.',
    sav_taken: 'This SavAccount is already linked to another SavComponents account.', sav_failed: 'SavAccount could not confirm who you are. Try again.',
    sav_code_expired: 'The code expired or was tried too many times: ask for a new one.', sav_code_wrong: 'The code is not right.', cancelled: 'You cancelled the sign-in with SavAccount.',
  };
  const errText = (e) => ERR[e?.message] || ERR.server;
  const A = { user: null, profile: { username: '', onBoard: false }, syncing: false };

  async function api(r, body) {
    const headers = {};
    const t = token.get();
    if (t) headers['X-Sav-Token'] = t; // no cookies between the two domains: the session travels in this header
    let res;
    try {
      res = await fetch(`${API}?r=${r}`, body === undefined ? { headers, credentials: 'omit' } : { method: 'POST', credentials: 'omit', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    } catch { throw new Error('network'); }
    let data;
    try { data = await res.json(); } catch { throw new Error(res.status === 404 ? 'not_installed' : 'server'); }
    if (!data.ok) {
      if (data.error === 'unauthenticated') { token.set(''); A.user = null; renderTop(); }
      throw new Error(data.error || 'server');
    }
    return data;
  }

  /** signed in: the progress of this device and the one of the account become one */
  async function syncFromAccount() {
    if (!token.get()) return;
    try {
      const me = await api('auth.me');
      A.user = me.user;
      if (!A.user) { token.set(''); return; }
      const r = await api('academy.get');
      if (r.academy) {
        S = merge(S, normalize(r.academy.progress));
        A.profile = { username: r.academy.username || '', onBoard: !!r.academy.onBoard };
      }
      commit({ quiet: true });
      pushNow();
    } catch (e) { if (e.message !== 'network') console.warn('Academy sync:', e.message); }
    renderTop();
    if (/^#(profile|board)/.test(location.hash)) route();
  }
  let pushTimer = 0;
  const push = () => { if (!A.user) return; clearTimeout(pushTimer); pushTimer = setTimeout(pushNow, 1200); };
  async function pushNow() {
    if (!A.user) return;
    const st = stats();
    try { await api('academy.save', { progress: S, xp: st.xp, level: st.level, streak: st.streak }); }
    catch (e) { if (e.message !== 'network') console.warn('Academy save:', e.message); }
  }

  /* ---- "Continue with SavAccount" (savaccount.eu): the same flow as savcomponents.com, coming back to the Academy */
  let savOn = null; // whether the accounts server offers SavAccount (asked once)
  const savEnabled = () => (savOn ||= api('auth.config').then((c) => !!c.savaccount).catch(() => false));
  const SAV_MARK = `<svg class="sav-mark" viewBox="0 0 512 512" aria-hidden="true"><path fill-rule="evenodd" d="M104 63.2 448.7 124 388 468.700 43.300 407.900ZM246 162a60 60 0 0 0-34 109c-32 13-51 46-58 95h184c-7-49-26-82-58-95a60 60 0 0 0-34-109Z"/><rect x="352" y="52" width="104" height="104" transform="rotate(24 404 104)"/></svg>`;
  const savKey = {
    make() { const b = new Uint8Array(32); crypto.getRandomValues(b); const k = [...b].map((x) => x.toString(16).padStart(2, '0')).join(''); try { sessionStorage.setItem('savc-sav-key', k); sessionStorage.setItem('savc-sav-back', location.hash); } catch {} return k; },
    get() { try { return sessionStorage.getItem('savc-sav-key') || ''; } catch { return ''; } },
    back() { try { return sessionStorage.getItem('savc-sav-back') || ''; } catch { return ''; } },
    clear() { try { sessionStorage.removeItem('savc-sav-key'); sessionStorage.removeItem('savc-sav-back'); } catch {} },
  };
  async function startSav(btn) {
    btn.loading = true;
    try { location.assign((await api('auth.sav.start', { mode: 'login', key: savKey.make(), back: 'academy' })).url); }
    catch (e) { btn.loading = false; toast(errText(e), 'danger'); }
  }
  async function savSignedIn(r) {
    savKey.clear();
    if (r.token) token.set(r.token);
    A.user = r.user;
    $('#authDialog')?.hide();
    toast(`Welcome, ${A.user.name}`, 'success', 'user');
    await syncFromAccount();
  }
  /** back from SavAccount (?sav=… or ?sav_error=…): signed in, or a last step in the dialog */
  async function handleSav() {
    const q = new URLSearchParams(location.search), handoff = q.get('sav'), err = q.get('sav_error');
    if (!handoff && !err) return;
    history.replaceState(null, '', location.pathname + location.hash);
    const back = savKey.back(), key = savKey.get();
    if (back && back !== location.hash) location.hash = back;
    if (err) { savKey.clear(); return toast(errText({ message: err === 'cancelled' ? 'cancelled' : err === 'expired' ? 'sav_expired' : 'sav_failed' }), err === 'cancelled' ? 'neutral' : 'danger'); }
    if (!key) { savKey.clear(); return toast(errText({ message: 'sav_expired' }), 'danger'); }
    let r;
    try { r = await api('auth.sav.finish', { handoff, key }); } catch (e) { savKey.clear(); return toast(errText(e), 'danger'); }
    if (r.token) return savSignedIn(r);
    authDialog('signin'); // makes the dialog, then its body is replaced by the last step
    const body = $('#authBody');
    if (r.signup) {
      body.innerHTML = `<form class="stack" id="fSavNew"><div class="sav-head">${SAV_MARK}<div><h3>Create your account</h3><p class="muted">SavAccount confirmed <b>${esc(r.signup.email)}</b>. No password needed: you sign in with SavAccount.</p></div></div>
        <sav-input name="name" label="Name" autocomplete="name" required minlength="2" value="${esc(r.signup.name || '')}"></sav-input>
        <sav-checkbox name="privacy" required size="sm">I accept the terms and have read the <sav-button appearance="link" size="sm" href="../privacy.html" target="_blank">privacy notice</sav-button></sav-checkbox>
        <div class="form-err"></div><sav-button type="submit" block>Create account</sav-button></form>`;
      bindForm('#fSavNew', async (f) => savSignedIn(await api('auth.sav.create', { handoff, key, name: f.get('name'), acceptPrivacy: !!f.get('privacy') })));
    } else if (r.link) {
      const pw = r.link.hasPassword;
      body.innerHTML = `<div class="stack"><div class="sav-head">${SAV_MARK}<div><h3>This is your account?</h3><p class="muted">A SavComponents account with <b>${esc(r.link.email)}</b> already exists. Prove it is yours once, and from then on SavAccount signs you in to it.</p></div></div>
        ${pw ? `<form class="stack" id="fSavPw"><sav-input name="password" type="password" label="Password of your SavComponents account" required autocomplete="current-password" password-toggle></sav-input>
          <div class="form-err"></div><sav-button type="submit" block>Join and sign in</sav-button></form><sav-divider>or</sav-divider>` : ''}
        <form class="stack" id="fSavCode"><sav-button type="button" appearance="${pw ? 'outline' : 'solid'}" ${pw ? 'variant="neutral"' : ''} block id="savSendCode" icon="mail">Send a code to ${esc(r.link.email)}</sav-button>
          <div id="savCodeBox" class="stack" style="display: none"><sav-otp name="code" length="6" label="Code from the email" required></sav-otp><div class="form-err"></div><sav-button type="submit" block>Join and sign in</sav-button></div></form></div>`;
      if (pw) bindForm('#fSavPw', async (f) => savSignedIn(await api('auth.sav.link', { handoff, key, password: f.get('password') })));
      $('#savSendCode').addEventListener('click', async (e) => {
        const b = e.currentTarget; b.loading = true;
        try { await api('auth.sav.code', { handoff, key }); $('#savCodeBox').style.display = ''; toast('Code sent: check your email', 'success', 'mail'); }
        catch (ex) { toast(errText(ex), 'danger'); } finally { b.loading = false; }
      });
      bindForm('#fSavCode', async (f) => savSignedIn(await api('auth.sav.link', { handoff, key, code: f.get('code') })));
    }
  }

  /* ---- sign in, create an account, forgotten password (the same account as savcomponents.com) */
  function authDialog(view = 'signin') {
    let d = $('#authDialog');
    if (!d) {
      d = document.createElement('sav-dialog');
      d.id = 'authDialog'; d.setAttribute('label', 'Your SavComponents account'); d.setAttribute('sheet-on-mobile', '');
      d.innerHTML = '<div id="authBody"></div>';
      document.body.append(d);
    }
    const body = $('#authBody');
    const sent = (text) => `<sav-empty-state icon="mail" heading="Check your email" text="${esc(text)}" size="sm"></sav-empty-state>`;
    if (view === 'forgot') {
      body.innerHTML = `<form class="stack" id="fForgot"><sav-alert appearance="soft">Write the email of your account: we send you a link to choose a new password.</sav-alert>
        <sav-input name="email" type="email" label="Email" required autocomplete="email"></sav-input><div class="form-err"></div>
        <div class="acts between"><sav-button appearance="link" size="sm" id="toSignin" icon="arrow-left">Back</sav-button><sav-button type="submit">Send the link</sav-button></div></form>`;
      $('#toSignin').addEventListener('click', () => authDialog('signin'));
      bindForm('#fForgot', async (f) => {
        await api('auth.forgot', { email: f.get('email') });
        body.innerHTML = sent(`If an account uses ${f.get('email')}, a link to choose a new password is on its way.`);
      });
    } else {
      body.innerHTML = `<sav-tabs appearance="segmented" active="${view}">
        <sav-tab label="Sign in" name="signin"><form class="stack" id="fSignin">
          <sav-input name="email" type="email" label="Email" autocomplete="email" required><sav-icon slot="prefix" name="mail"></sav-icon></sav-input>
          <sav-input name="password" type="password" label="Password" autocomplete="current-password" required password-toggle><sav-icon slot="prefix" name="lock"></sav-icon></sav-input>
          <div class="form-err"></div><sav-button type="submit" block>Sign in</sav-button>
          <sav-button appearance="link" size="sm" id="toForgot">Forgot your password?</sav-button></form></sav-tab>
        <sav-tab label="Create account" name="register"><form class="stack" id="fRegister">
          <sav-input name="name" label="Name" autocomplete="name" required minlength="2"></sav-input>
          <sav-input name="email" type="email" label="Email" autocomplete="email" required help="We send you a link to confirm it."></sav-input>
          <sav-input name="password" type="password" label="Password" autocomplete="new-password" required minlength="8" password-toggle help="At least 8 characters."></sav-input>
          <sav-checkbox name="privacy" required size="sm">I accept the terms and have read the <sav-button appearance="link" size="sm" href="../privacy.html" target="_blank">privacy notice</sav-button></sav-checkbox>
          <div class="form-err"></div><sav-button type="submit" block>Create account</sav-button></form></sav-tab>
      </sav-tabs>
      <sav-alert appearance="plain" noicon>One account for savcomponents.com and the Academy: your progress, favourite components and saved themes.</sav-alert>`;
      $('#toForgot').addEventListener('click', () => authDialog('forgot'));
      // the SavAccount button under both forms, once the server says it offers it
      savEnabled().then((on) => {
        if (!on) return;
        body.querySelectorAll('#fSignin, #fRegister').forEach((form) => form.insertAdjacentHTML('afterend', `<sav-divider>or</sav-divider><sav-button type="button" block appearance="outline" variant="neutral" data-sav-start><span slot="prefix" style="display:inline-flex">${SAV_MARK}</span>Continue with SavAccount</sav-button>`));
        body.querySelectorAll('[data-sav-start]').forEach((b) => b.addEventListener('click', () => startSav(b)));
      });
      bindForm('#fSignin', async (f) => {
        const r = await api('auth.login', { email: f.get('email'), password: f.get('password') });
        if (r.token) token.set(r.token);
        A.user = r.user;
        d.hide();
        toast(`Welcome, ${A.user.name}`, 'success', 'user');
        await syncFromAccount();
      });
      bindForm('#fRegister', async (f) => {
        await api('auth.register', { name: f.get('name'), email: f.get('email'), password: f.get('password'), acceptPrivacy: !!f.get('privacy') });
        body.innerHTML = sent(`We sent a link to ${f.get('email')}. Open it to confirm your address, then sign in here: your progress on this device comes with you.`);
      });
    }
    d.show();
  }
  function bindForm(sel, handler) {
    const form = $(sel);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const btn = form.querySelector('sav-button[type="submit"]'), err = form.querySelector('.form-err');
      if (err) err.innerHTML = '';
      if (btn) btn.loading = true;
      try { await handler(new FormData(form)); }
      catch (ex) { if (err) err.innerHTML = `<sav-alert variant="danger">${esc(errText(ex))}</sav-alert>`; }
      finally { if (btn) btn.loading = false; }
    });
  }
  async function signOut() {
    try { await api('auth.logout', {}); } catch {}
    token.set(''); A.user = null; A.profile = { username: '', onBoard: false };
    // the progress belongs to the account: this device starts clean for the next person
    S = EMPTY(); store.del('savc-academy'); last = stats();
    renderTop(); route();
    toast('Signed out. Your progress is safe in your account.', 'primary', 'log-out');
  }

  /* ================================================================ look: style and mode (shared with savcomponents.com) */
  const STYLES = ['soft', 'tilt', 'sharp', 'brutal', 'glass'];
  /** quiet at start: what was already earned is recorded without a toast for each badge */
  function applyTheme(quiet = false) {
    const m = store.get('savc-mode', 'auto'), st = store.get('savc-style', 'tilt');
    const dark = m === 'dark' || (m === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.className = (dark ? 'sav-theme-dark' : 'sav-theme-light') + (st && st !== 'soft' ? ' sav-style-' + st : '');
    let changed = false;
    if (STYLES.includes(st) && !S.styles.includes(st)) { S.styles.push(st); changed = true; }
    if (dark && !S.dark) { S.dark = true; changed = true; }
    if (changed) commit({ quiet });
  }
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => applyTheme());

  /* ================================================================ the frame: top bar and navigation */
  const NAV = [['home', 'Learn', 'graduation-cap'], ['challenges', 'Challenges', 'hammer'], ['daily', 'Daily', 'calendar-check'], ['collection', 'Collection', 'gem'], ['board', 'Leaderboard', 'trophy'], ['profile', 'Profile', 'user']];
  function renderTop() {
    const st = stats();
    const box = $('#actions');
    if (!box) return;
    box.innerHTML = `<sav-button size="sm" appearance="soft" variant="${st.streak ? 'warning' : 'neutral'}" icon="flame" href="#profile" label="Day streak: ${st.streak}">${st.streak}</sav-button>`
      + `<sav-button size="sm" appearance="soft" variant="neutral" icon="sparkles" class="xp" href="#profile" label="Level ${st.level}, ${st.xp} XP">${st.xp}<span class="hide-sm">&nbsp;XP</span></sav-button>`
      + (A.user ? `<sav-avatar size="sm" label="${esc(A.user.name)}" variant="primary" href="#profile" title="Your profile"></sav-avatar>`
        : `<sav-button size="sm" appearance="soft" icon="log-in" id="signInTop" label="Sign in"><span class="hide-sm">Sign in</span></sav-button>`);
    $('#signInTop')?.addEventListener('click', () => authDialog('signin'));
  }
  function setNav(name) {
    const key = { path: 'home', lesson: 'home', challenge: 'challenges' }[name] || name;
    $$('#top > a[data-nav]').forEach((a) => (a.dataset.nav === key ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
    $$('#bnav sav-bottom-nav-item').forEach((i) => i.toggleAttribute('current', i.getAttribute('value') === key));
  }

  /* ================================================================ router */
  const main = () => $('#view');
  const VIEWS = { home, path, lesson, challenges, challenge, daily, collection, board, profile };
  function route() {
    const [name, arg] = location.hash.replace(/^#/, '').split('/');
    const view = VIEWS[name] ? name : 'home';
    cleanup?.(); cleanup = null;
    VIEWS[view](arg ? decodeURIComponent(arg) : undefined);
    setNav(view);
    document.title = (main().querySelector('sav-heading[level="1"]')?.textContent.trim() || 'Learn') + ' — SavComponents Academy';
    $('#main').focus({ preventScroll: true });
  }
  let cleanup = null; // what a view leaves running (the preview of a challenge)
  const go = (h) => { if (location.hash === h) route(); else location.hash = h; window.scrollTo(0, 0); };

  /* ================================================================ views */
  const icon = (n, slot = '') => `<sav-icon name="${esc(n || 'box')}"${slot ? ` slot="${slot}"` : ''}></sav-icon>`;
  const stars = (n, slot = '') => `<sav-rating readonly max="3" value="${n}" size="sm" class="stars" label="${n} of 3 stars"${slot ? ` slot="${slot}"` : ''}></sav-rating>`;
  /** a heading of the library: level, optional label above (eyebrow), subtitle under it and the marker (a leaning tile in Tilt) */
  const H = (level, text, { eyebrow = '', sub = '', size = '', marker = false } = {}) =>
    `<sav-heading level="${level}"${size ? ` size="${size}"` : ''}${marker ? ' marker' : ''}${eyebrow ? ` eyebrow="${esc(eyebrow)}"` : ''}${sub ? ` subtitle="${esc(sub)}"` : ''}>${text}</sav-heading>`;
  /** a piece of code inside a sentence: the library's inline code */
  const codeIn = (h) => String(h).replace(/<code>/g, '<sav-code>').replace(/<\/code>/g, '</sav-code>');
  /** where demos and examples are shown: a muted surface of the library */
  const stage = (html, id = '') => `<sav-container appearance="muted" padding="md" size="full" class="stage"${id ? ` id="${id}"` : ''}>${html}</sav-container>`;
  const back = (href, text) => `<sav-button appearance="link" href="${href}" icon="arrow-left">${esc(text)}</sav-button>`;
  /** the next lesson to do: after the given one in its path, otherwise the first one not done */
  const nextLesson = (after) => {
    if (after) { const ls = inGroup(after.group), i = ls.indexOf(after); const n = ls.slice(i + 1).find((l) => !S.lessons[l.id]?.done); if (n) return n; }
    return LESSONS.find((l) => !S.lessons[l.id]?.done);
  };
  const firstSentence = (h) => { const t = plain(h); const m = t.match(/^.*?[.!?](\s|$)/); return (m ? m[0] : t).trim(); };

  function home() {
    const st = stats(), nx = nextLesson();
    const into = st.xp - xpFor(st.level), need = xpFor(st.level + 1) - xpFor(st.level), pct = Math.round((into / need) * 100);
    const today = S.daily[dayKey()]?.played ? S.daily[dayKey()] : null;
    const chDay = dailyChallenge();
    main().innerHTML = `
      <sav-card>
        <div class="hero">
          <sav-progress-ring value="${pct}" label="Progress to level ${st.level + 1}" style="--size: 5.5rem">${st.level}</sav-progress-ring>
          <div>${H(1, A.user ? `Welcome back, ${esc(A.user.name.split(' ')[0])}` : 'Learn SavComponents by doing',
            { eyebrow: `${st.rank} · level ${st.level}`, sub: `${st.xp} XP · ${need - into} XP to level ${st.level + 1}${st.streak ? ` · ${st.streak}-day streak` : ''}` })}
            <div class="acts">${nx ? `<sav-button href="#lesson/${nx.id}" icon-end="arrow-right">${Object.keys(S.lessons).length ? 'Continue' : 'Start'}: ${esc(nx.name)}</sav-button>` : '<sav-badge variant="success">Every lesson done</sav-badge>'}
              <sav-button appearance="soft" href="#daily" icon="calendar-check">${today ? `Daily quiz: ${today.score}/6` : 'Daily quiz'}</sav-button></div></div>
        </div>
      </sav-card>
      <sav-grid columns="2" gap="1rem">
        <sav-card>${H(2, esc(chDay.name), { size: 5, eyebrow: `Challenge of the day · ${S.daily[dayKey()]?.ch ? 'done' : '+30 XP'}`, sub: plain(chDay.brief) })}
          <sav-button slot="footer" appearance="soft" icon="hammer" href="#challenge/${chDay.id}">Open the challenge</sav-button></sav-card>
        <sav-card>${H(2, `${st.done.length} of ${LESSONS.length} lessons · ${Object.keys(S.badges).length} of ${ALL_BADGES.length} badges`, { size: 5, eyebrow: 'Collection', sub: 'Every lesson unlocks its component; badges reward the rest.' })}
          <sav-button slot="footer" appearance="soft" icon="gem" href="#collection">See the collection</sav-button></sav-card>
      </sav-grid>
      ${H(2, 'Paths', { marker: true })}
      <sav-grid min="15rem" gap="1rem">${GROUPS.map((g) => {
        const ls = inGroup(g), n = ls.filter((l) => S.lessons[l.id]?.done).length, all = n === ls.length;
        // a card per path: the whole card opens it (data-href), the button is the same link for the keyboard
        return `<sav-card interactive data-href="#path/${slug(g)}">
          <sav-avatar slot="header" size="lg" label="${esc(g)}" variant="${all ? 'primary' : 'neutral'}"><sav-icon slot="icon" name="${esc(GROUP_ICON[g] || 'book-open')}"></sav-icon></sav-avatar>
          ${H(3, esc(g), { size: 5, eyebrow: all ? 'Complete' : 'Path' })}
          <sav-progress-bar value="${Math.round((n / ls.length) * 100)}" label="${n} of ${ls.length} lessons"${all ? ' variant="success"' : ''}></sav-progress-bar>
          <sav-button slot="footer" size="sm" appearance="${n && !all ? 'solid' : 'soft'}" href="#path/${slug(g)}" icon-end="arrow-right">${all ? 'Review' : n ? 'Continue' : 'Start'}</sav-button></sav-card>`;
      }).join('')}</sav-grid>`;
  }

  /** on phones the lessons of a path are levels on a winding line (sav-level-path); every lesson stays open,
      the current one is the first not done yet, the done ones show their stars wherever they are */
  function levels(ls) {
    const first = ls.findIndex((l) => !S.lessons[l.id]?.done), cur = first < 0 ? ls.length + 1 : first + 1;
    return `<sav-level-path open current="${cur}" class="path-levels" label="Lessons" current-label="${Object.keys(S.lessons).length ? 'Continue' : 'Start'}">${ls.map((l, i) => {
      const r = S.lessons[l.id];
      return `<sav-level label="${esc(l.name)}" icon="${esc(l.icon || 'book-open')}" href="#lesson/${l.id}"${r?.done ? ` stars="${starsOf(r)}" status="done"` : ''}${i + 1 === ls.length ? ' milestone' : ''}></sav-level>`;
    }).join('')}</sav-level-path>`;
  }

  function path(s) {
    const g = groupOf(s);
    if (!g) return go('#home');
    const ls = inGroup(g), n = ls.filter((l) => S.lessons[l.id]?.done).length;
    main().innerHTML = `${back('#home', 'All paths')}
      ${H(1, esc(g), { marker: true, eyebrow: 'Path', sub: `${n} of ${ls.length} lessons · finishing them all earns the badge ${(GROUP_BADGE[g] || [g])[0]}` })}
      <sav-progress-bar value="${Math.round((n / ls.length) * 100)}" label="${esc(g)} progress"></sav-progress-bar>
      ${levels(ls)}
      <sav-grid min="15rem" gap="1rem" class="path-cards">${ls.map((l) => {
        const r = S.lessons[l.id];
        const about = l.basics ? plain(l.sections[0].text) : firstSentence(l.doc.desc);
        // a card per lesson: the whole card opens it, its button is the same link for the keyboard
        return `<sav-card interactive data-href="#lesson/${l.id}">
          <sav-avatar slot="header" size="lg" label="${esc(l.name)}" variant="${r?.done ? 'primary' : 'neutral'}"><sav-icon slot="icon" name="${esc(l.icon || 'book-open')}"></sav-icon></sav-avatar>
          ${H(3, esc(l.name), { size: 5, eyebrow: r?.done ? 'Done' : 'New' })}
          <p>${esc(about)}</p>
          ${r?.done ? stars(starsOf(r)) : ''}
          <sav-button slot="footer" size="sm" appearance="${r?.done ? 'soft' : 'solid'}" href="#lesson/${l.id}" icon-end="arrow-right">${r?.done ? 'Review' : 'Start'}</sav-button></sav-card>`;
      }).join('')}</sav-grid>`;
  }

  /* ---------------------------------------------------------------- a lesson: steps, then the quiz */
  const KNOB_SKIP = new Set(['name', 'value', 'id', 'href', 'target', 'download', 'type', 'label', 'help', 'placeholder', 'autofocus', 'required', 'readonly', 'animation', 'animation-duration', 'locale', 'for', 'from', 'src', 'data', 'auto-text', 'sheet-on-mobile', 'native-on-mobile', 'native', 'seen-key', 'until']);
  const NOT_CHOICE = /^(string|number|list|url|json|length|bytes|ms|css|boolean|date|px|degrees|…)$/i;
  function baseOf(d) {
    if (d.play) return { tag: d.play.tag, attrs: { ...(d.play.attrs || {}) }, text: d.play.text, children: d.play.children || '' };
    const t = firstTag(d);
    if (!t) return null;
    for (const x of d.demos || []) {
      const tpl = document.createElement('template'); tpl.innerHTML = x.html;
      const el = tpl.content.querySelector(t); if (!el) continue;
      const attrs = {};
      for (const a of el.attributes) if (!/^(id|style|class|slot)$|^on|^data-/.test(a.name)) attrs[a.name] = a.value === '' ? true : a.value;
      return { tag: t, attrs, text: undefined, children: el.innerHTML.trim() };
    }
    return null;
  }
  function knobsOf(d, tag) {
    const out = [];
    for (const [names, values = '', desc = ''] of d.attrs || []) {
      if (/^--|[<(]|^Sav\./.test(names) || /On sav-/.test(desc) || /CSS/.test(values)) continue;
      const list = names.split(' · ').map((n) => n.trim()).filter((n) => /^[a-z][a-z-]*$/.test(n) && !KNOB_SKIP.has(n) && !out.some((k) => k.name === n));
      if (!list.length) continue;
      if (values === 'boolean') list.forEach((n) => out.push({ name: n, type: 'bool' }));
      else if (list[0] === 'variant' && list.length === 1) out.push({ name: 'variant', type: 'enum', options: ['primary', 'neutral', 'success', 'warning', 'danger'] });
      else if (list.length === 1 && / · /.test(values)) {
        const opts = values.split(' · ').map((v) => v.trim()).filter((v) => v !== '…');
        if (opts.every((o) => /^[a-z0-9-]+$/.test(o) && !NOT_CHOICE.test(o))) out.push({ name: list[0], type: 'enum', options: opts, desc: plain(desc) });
      }
    }
    const order = ['variant', 'appearance', 'size'];
    const enums = out.filter((k) => k.type === 'enum').sort((a, b) => ((order.indexOf(a.name) + 1) || 9) - ((order.indexOf(b.name) + 1) || 9)).slice(0, 4);
    return [...enums, ...out.filter((k) => k.type === 'bool').slice(0, 5)];
  }
  const OPENER = { 'sav-dialog': 'Open the dialog', 'sav-drawer': 'Open the drawer', 'sav-command': 'Open the command palette' };
  function markup(b, set) {
    const attrs = { ...b.attrs, ...set };
    const a = Object.entries(attrs).filter(([, v]) => v !== false && v !== '' && v != null).map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`)).join('');
    const el = `<${b.tag}${a}>${b.text !== undefined ? esc(b.text) : ''}${b.children ? fixAssets(b.children) : ''}</${b.tag}>`;
    return OPENER[b.tag] ? `<sav-button onclick="this.nextElementSibling.show()">${OPENER[b.tag]}</sav-button>\n${el}` : el;
  }
  const codeBlock = (code, lang = 'html') => `<sav-code-block language="${lang}">${esc(code)}</sav-code-block>`;

  function lesson(id) {
    const l = LESSON[id];
    if (!l) return go('#home');
    const steps = [];
    if (l.basics) {
      steps.push({ title: 'Learn', html: l.sections.map((s, i) => `${i ? '<sav-divider></sav-divider>' : ''}<p>${codeIn(s.text)}</p>${s.demo ? stage(s.demo) : ''}${s.code ? codeBlock(s.code, s.code.startsWith('<') ? 'html' : /^[:.a-z-]+\s*\{/.test(s.code) ? 'css' : 'js') : ''}`).join('') });
    } else {
      const d = l.doc, demo = d.demos?.[0];
      steps.push({ title: 'Meet it', html: `<p>${codeIn(fixAssets(d.desc))}</p><p>Tag: ${firstTag(d) ? `<sav-code>&lt;${esc(firstTag(d))}&gt;</sav-code>` : esc(d.tag)}</p>${demo ? stage(fixAssets(demo.html)) + codeBlock(demo.html) : ''}` });
      const b = baseOf(d), ks = b ? knobsOf(d, b.tag) : [];
      if (b && ks.length) steps.push({ title: 'Try it', play: { b, ks } });
      const more = (d.demos || []).slice(1, 4);
      if (more.length) steps.push({ title: 'Examples', html: more.map((x) => H(3, esc(x.title), { size: 5 }) + stage(fixAssets(x.html))).join('') + `<sav-button appearance="link" href="../#${d.id}" target="_blank" icon-end="external-link">Every example and attribute in the documentation</sav-button>` });
      const a11y = window.SavA11y?.html(d.id);
      if (a11y) steps.push({ title: 'Accessibility', html: `<div class="a11y-box">${a11y}</div>`, mount: (root) => window.SavA11y.mount(root) });
    }
    steps.push({ title: 'Quiz', quiz: true });
    let at = 0;
    const r = S.lessons[id];
    main().innerHTML = `${back(`#path/${slug(l.group)}`, l.group)}
      ${H(1, esc(l.name), { marker: true, eyebrow: l.group, sub: r?.done ? 'Done: take the quiz again to win more stars' : `${steps.length} steps · up to ${20 + 10 * (l.basics ? l.quiz.length : 4)} XP` })}
      ${r?.done ? stars(starsOf(r)) : ''}
      <sav-steps id="lsteps" clickable current="1">${steps.map((s) => `<sav-step label="${esc(s.title)}"></sav-step>`).join('')}</sav-steps>
      <sav-card id="lbody" tabindex="-1"></sav-card>
      <div class="acts between" id="lnav"></div>`;
    const show = (i, focus = true) => {
      at = Math.max(0, Math.min(steps.length - 1, i));
      $('#lsteps').setAttribute('current', String(at + 1));
      const s = steps[at], body = $('#lbody');
      if (s.quiz) { $('#lnav').innerHTML = ''; runQuiz(body, l.basics ? basicsQuiz(l) : componentQuiz(l.doc), (score, total) => finishLesson(l, score, total)); }
      else if (s.play) { playground(body, s.play.b, s.play.ks); navButtons(); }
      else { body.innerHTML = s.html; s.mount?.(body); navButtons(); }
      if (focus) body.focus({ preventScroll: true });
    };
    const navButtons = () => {
      $('#lnav').innerHTML = `${at ? '<sav-button appearance="ghost" variant="neutral" icon="arrow-left" id="lprev">Back</sav-button>' : '<span></span>'}
        <sav-button icon-end="${steps[at + 1]?.quiz ? 'circle-help' : 'arrow-right'}" id="lnext">${steps[at + 1]?.quiz ? 'Take the quiz' : 'Next: ' + esc(steps[at + 1].title)}</sav-button>`;
      $('#lprev')?.addEventListener('click', () => show(at - 1));
      $('#lnext').addEventListener('click', () => { show(at + 1); window.scrollTo({ top: $('#lsteps').offsetTop - 80, behavior: 'smooth' }); });
    };
    $('#lsteps').addEventListener('click', (e) => { const st = e.target.closest('sav-step'); if (st) show($$('sav-step', $('#lsteps')).indexOf(st)); });
    show(0, false);
  }

  function playground(root, b, ks) {
    const set = {};
    const ctl = (k) => {
      const cur = set[k.name] ?? b.attrs[k.name];
      if (k.type === 'bool') return `<sav-switch size="sm" data-k="${k.name}" ${cur ? 'checked' : ''}>${esc(k.name)}</sav-switch>`;
      const val = cur && k.options.includes(cur) ? cur : '';
      if (k.options.length <= 4) return `<sav-radio-group appearance="buttons" size="sm" label="${esc(k.name)}" data-k="${k.name}" value="${esc(val || '_')}"><sav-radio value="_">Default</sav-radio>${k.options.map((o) => `<sav-radio value="${o}">${esc(o)}</sav-radio>`).join('')}</sav-radio-group>`;
      return `<sav-select size="sm" label="${esc(k.name)}" data-k="${k.name}" value="${esc(val)}" placeholder="Default"><option value="">Default</option>${k.options.map((o) => `<option value="${o}">${esc(o)}</option>`).join('')}</sav-select>`;
    };
    root.innerHTML = `<sav-alert appearance="plain" icon="sliders-horizontal">Change the attributes: the component and its code follow. Each one is a word in the HTML, nothing else.</sav-alert>
      <sav-grid columns="2" gap="1.25rem" align="start">
        <sav-grid columns="1" gap=".85rem">${ks.filter((k) => k.type === 'enum').map(ctl).join('')}<sav-grid columns="2" gap=".5rem" style="--mobile-columns: 2">${ks.filter((k) => k.type === 'bool').map(ctl).join('')}</sav-grid></sav-grid>
        <sav-grid columns="1" gap=".75rem">${stage('', 'pPrev')}<div id="pCode"></div></sav-grid>
      </sav-grid>`;
    const draw = () => { const h = markup(b, set); $('#pPrev', root).innerHTML = h; $('#pCode', root).innerHTML = codeBlock(h.replace(/\.\.\/docs\//g, 'docs/')); };
    root.addEventListener('change', (e) => {
      const el = e.target.closest('[data-k]'); if (!el) return;
      let v = el.localName === 'sav-switch' ? el.checked : el.value;
      if (v === '_') v = '';
      set[el.dataset.k] = v === '' ? false : v;
      draw();
    });
    draw();
  }

  /* ---------------------------------------------------------------- questions, built from the documentation */
  const POOL = (() => {
    const attrs = [], enums = [], events = [];
    for (const d of DOCS) {
      const tag = firstTag(d);
      for (const [names, values = '', desc = ''] of d.attrs || []) {
        if (/^--|[<(]|^Sav\./.test(names) || /On sav-/.test(desc)) continue;
        const list = names.split(' · ').map((n) => n.trim()).filter((n) => /^[a-z][a-z-]*$/.test(n));
        const pd = plain(desc);
        // a description that reads well alone: a sentence, not a fragment ("Or elements inside.") nor a note about another tag
        const good = /^[A-Z]/.test(pd) && !/^(On|With|Or|Default|Same|As|Like|Also)\b/.test(pd) && !/sav-[a-z]|[{}]/.test(pd);
        if (list.length === 1 && pd.length >= 18 && pd.length <= 150 && good) attrs.push({ d, tag, name: list[0], desc: pd });
        if (list.length === 1 && / · /.test(values)) {
          const opts = values.split(' · ').map((v) => v.trim()).filter((v) => /^[a-z0-9-]+$/.test(v) && !NOT_CHOICE.test(v));
          if (opts.length >= 2) enums.push({ d, tag, name: list[0], opts });
        }
      }
      for (const [names, desc = ''] of d.events || []) {
        const n = names.split(' · ').map((x) => x.trim()).find((x) => /^[a-z][a-z-]*$/.test(x));
        if (n) events.push({ d, tag, name: n, desc: plain(desc) });
      }
    }
    return { attrs, enums, events, tags: [...new Set(DOCS.map(firstTag).filter(Boolean))] };
  })();
  const pick = (list, n, rnd, not = () => false) => { const out = []; for (const x of shuffle(list, rnd)) { if (out.length >= n) break; if (!not(x) && !out.includes(x)) out.push(x); } return out; };
  const code = (s) => `<code>${esc(s)}</code>`;
  const GEN = {
    identify(d, rnd) {
      let t = firstSentence(d.desc);
      const words = [d.name, ...d.name.split(/\s+/).filter((w) => w.length > 3)];
      // whole words only, with their plural ("Buttons start…" → "… start…")
      for (const w of words) t = t.replace(new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(e?s)?\\b`, 'gi'), '…');
      if (t.length < 25) return null;
      const same = DOCS.filter((x) => x !== d && x.group === d.group), other = DOCS.filter((x) => x !== d && x.group !== d.group);
      const wrong = [...pick(same, 2, rnd), ...pick(other, 3, rnd)].slice(0, 3);
      return { q: `Which component is this? “${esc(t)}”`, a: [d.name, ...wrong.map((x) => x.name)] };
    },
    tag(d, rnd) {
      const t = firstTag(d); if (!t) return null;
      return { q: `Which tag do you write for the <b>${esc(d.name)}</b>?`, a: [t, ...pick(POOL.tags, 3, rnd, (x) => x === t)].map((x) => `&lt;${x}&gt;`), html: true };
    },
    attrDesc(d, rnd) {
      const mine = POOL.attrs.filter((x) => x.d === d); if (!mine.length) return null;
      const c = pick(mine, 1, rnd)[0];
      const wrong = pick(POOL.attrs, 3, rnd, (x) => x.name === c.name || x.desc === c.desc || mine.some((m) => m.name === x.name));
      return { q: `On ${code('<' + c.tag + '>')}, what does ${code(c.name)} do?`, a: [c.desc, ...wrong.map((x) => x.desc)] };
    },
    attrName(d, rnd) {
      const mine = POOL.attrs.filter((x) => x.d === d); if (!mine.length) return null;
      const c = pick(mine, 1, rnd)[0];
      const names = [...new Set(POOL.attrs.map((x) => x.name))].filter((n) => !mine.some((m) => m.name === n));
      return { q: `On ${code('<' + c.tag + '>')}, which attribute does this? “${esc(c.desc)}”`, a: [c.name, ...pick(names, 3, rnd)], mono: true };
    },
    values(d, rnd) {
      const mine = POOL.enums.filter((x) => x.d === d); if (!mine.length) return null;
      const c = pick(mine, 1, rnd)[0], right = pick(c.opts, 1, rnd)[0];
      // wrong values: values of other attributes, but not words that are odd as a value (true, false, places)
      const odd = /^(true|false|world|europe|africa|asia|north-america|south-america|oceania|antarctica|\d+)$/;
      const others = [...new Set(POOL.enums.flatMap((x) => x.opts))].filter((o) => !c.opts.includes(o) && !odd.test(o));
      if (others.length < 3) return null;
      return { q: `Which value can ${code(c.name)} take on ${code('<' + c.tag + '>')}?`, a: [right, ...pick(others, 3, rnd)], mono: true };
    },
    event(d, rnd) {
      const mine = POOL.events.filter((x) => x.d === d); if (!mine.length) return null;
      const c = pick(mine, 1, rnd)[0];
      const others = [...new Set(POOL.events.map((x) => x.name))].filter((n) => !mine.some((m) => m.name === n));
      if (others.length < 3) return null;
      return { q: c.desc && c.desc.length > 8 ? `Which event does ${code('<' + c.tag + '>')} fire? “${esc(c.desc)}”` : `Which of these events does ${code('<' + c.tag + '>')} fire?`, a: [c.name, ...pick(others, 3, rnd)], mono: true };
    },
  };
  function componentQuiz(d, n = 4, rnd = Math.random) {
    const order = ['identify', ...shuffle(['attrDesc', 'values', 'event', 'attrName', 'tag'], rnd)];
    const qs = [];
    for (const g of order) { if (qs.length >= n) break; const q = GEN[g](d, rnd); if (q && new Set(q.a).size === q.a.length && q.a.length === 4) qs.push(q); }
    for (const g of ['tag', 'attrName', 'values']) { if (qs.length >= n) break; const q = GEN[g](d, rnd); if (q && !qs.some((x) => x.q === q.q) && new Set(q.a).size === 4) qs.push(q); }
    return qs;
  }
  const basicsQuiz = (l) => l.quiz.map((x) => ({ q: esc(x.q), a: x.a.map(esc), html: true }));

  /** one question at a time; the right answer is always a[0] (shown shuffled) */
  function runQuiz(root, qs, done) {
    let i = 0, score = 0;
    const one = () => {
      const q = qs[i], order = shuffle(q.a.map((_, k) => k));
      const label = (k) => codeIn(q.html ? q.a[k] : esc(q.a[k]));
      root.innerHTML = `<sav-progress-bar value="${Math.round((i / qs.length) * 100)}" label="Quiz progress"></sav-progress-bar>
        ${H(2, codeIn(q.q), { size: 4, eyebrow: `Question ${i + 1} of ${qs.length}` }).replace('<sav-heading', '<sav-heading id="qText"')}
        <sav-grid columns="1" gap=".55rem" role="group" aria-labelledby="qText" id="opts">${order.map((k) => `<sav-button appearance="outline" variant="neutral" block class="opt${q.mono ? ' mono' : ''}" data-k="${k}">${label(k)}</sav-button>`).join('')}</sav-grid>
        <div id="qAfter" aria-live="polite"></div>`;
      $('#opts', root).addEventListener('click', (e) => {
        const b = e.target.closest('.opt'), box = $('#opts', root);
        if (!b || box.dataset.done) return;
        box.dataset.done = '1';
        const right = Number(b.dataset.k) === 0;
        if (right) score++;
        $$('.opt', root).forEach((o) => {
          o.disabled = true;
          if (o.dataset.k === '0') { o.setAttribute('variant', 'success'); o.setAttribute('appearance', 'solid'); o.setAttribute('icon', 'check'); }
          else if (o === b) { o.setAttribute('variant', 'danger'); o.setAttribute('icon', 'x'); }
        });
        const last = i === qs.length - 1;
        $('#qAfter', root).innerHTML = `<sav-alert variant="${right ? 'success' : 'warning'}" heading="${right ? 'Right!' : 'Not quite'}">${right ? '+10 XP the first time you get it.' : 'The right answer is highlighted.'}</sav-alert>
          <div class="acts"><sav-button id="qNext" icon-end="arrow-right">${last ? 'See the result' : 'Next question'}</sav-button></div>`;
        $('#qNext', root).addEventListener('click', () => { i++; if (i < qs.length) { one(); root.focus({ preventScroll: true }); } else done(score, qs.length); });
        $('#qNext', root).focus();
      });
    };
    if (!qs.length) { done(0, 0); return; }
    one();
  }

  function finishLesson(l, score, total) {
    const before = stats().xp, r = S.lessons[l.id];
    const passed = total === 0 || score >= Math.ceil(total / 2);
    if (passed) {
      S.lessons[l.id] = { done: r?.done || Date.now(), best: Math.max(r?.best || 0, score), total: Math.max(r?.total || 0, total) };
      markDay();
      commit();
    }
    const gained = stats().xp - before, nx = nextLesson(l);
    const body = $('#lbody');
    const text = `${score} of ${total} right` + (passed ? (gained > 0 ? ` · +${gained} XP. The ${l.name} ${l.basics ? 'lesson' : 'card'} is in your collection.` : ' · no new XP: you had this score already.') : ': get at least half right to finish the lesson.');
    body.innerHTML = `<sav-empty-state icon="${passed ? 'party-popper' : 'rotate-ccw'}" heading="${passed ? (score === total ? 'Perfect!' : 'Lesson done') : 'Almost'}" text="${esc(text)}">
      ${passed ? stars(starsOf(S.lessons[l.id])) : ''}
      <div class="acts center">${!passed || score < total ? '<sav-button appearance="soft" icon="rotate-ccw" id="again">Try the quiz again</sav-button>' : ''}
        ${nx && passed ? `<sav-button href="#lesson/${nx.id}" icon-end="arrow-right">Next: ${esc(nx.name)}</sav-button>` : `<sav-button href="#path/${slug(l.group)}">Back to ${esc(l.group)}</sav-button>`}</div></sav-empty-state>`;
    $('#again')?.addEventListener('click', () => runQuiz(body, l.basics ? basicsQuiz(l) : componentQuiz(l.doc), (s, t) => finishLesson(l, s, t)));
    body.focus({ preventScroll: true });
  }

  /* ---------------------------------------------------------------- challenges */
  const seedOf = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const dailyChallenge = (d = dayKey()) => CHALLENGES[seedOf('ch' + d) % CHALLENGES.length];
  const docOf = (id) => DOCS.find((d) => d.id === id);

  function challenges() {
    const st = stats(), today = dailyChallenge();
    const TITLES = ['', 'Level 1 · first steps', 'Level 2 · putting pieces together', 'Level 3 · like a pro'];
    main().innerHTML = `${H(1, 'Challenges', { marker: true, eyebrow: `${st.chDone.length} of ${CHALLENGES.length} done`, sub: 'Build what is asked with real SavComponents: the page checks your HTML live.' })}
      ${[1, 2, 3].map((lv) => `${H(2, TITLES[lv], { size: 4, eyebrow: `${CH_XP[lv]} XP each` })}
      <sav-list appearance="card">${CHALLENGES.filter((c) => c.level === lv).map((c) => `<sav-list-item href="#challenge/${c.id}" description="${esc(plain(c.brief))}">${icon(docOf(c.component)?.icon || 'hammer', 'prefix')}${esc(c.name)}
        ${S.challenges[c.id]?.done ? '<sav-badge slot="suffix" variant="success" appearance="soft">Done</sav-badge>' : c.id === today.id ? '<sav-label slot="suffix" variant="warning" appearance="soft">Today +30</sav-label>' : ''}</sav-list-item>`).join('')}</sav-list>`).join('')}`;
  }

  // inside the preview (a sandbox without the page's origin): answers the checks of the parent through postMessage
  const HELPER = `addEventListener('submit', (e) => e.preventDefault(), true);
addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a[href]'); if (a) e.preventDefault(); }, true);
addEventListener('message', (e) => {
  if (!e.data || e.data.type !== 'sav-check') return;
  const res = e.data.checks.map((c) => {
    let els = [];
    try { els = [...document.querySelectorAll(c.q)]; } catch (x) { return false; }
    if (c.none) return els.length === 0;
    let ok = c.count != null ? els.length === c.count : els.length >= (c.min || 1);
    if (ok && c.text) ok = els.some((el) => el.textContent.toLowerCase().includes(c.text.toLowerCase()));
    if (ok && c.test) ok = els.some((el) => { try { return !!new Function('el', 'doc', 'return (' + c.test + ')')(el, document); } catch (x) { return false; } });
    return ok;
  });
  e.source.postMessage({ type: 'sav-checked', id: e.data.id, res }, '*');
});`;
  let libP = null;
  const libText = () => (libP ||= Promise.all([fetch('../dist/sav.js').then((r) => r.text()), fetch('../dist/sav.css').then((r) => r.text())]).catch((e) => { libP = null; throw e; }));
  function challenge(id) {
    const c = CHALLENGE[id];
    if (!c) return go('#challenges');
    const codes = store.get('savc-academy-code', {});
    const doc = docOf(c.component), isToday = dailyChallenge().id === c.id;
    const doneBefore = !!S.challenges[c.id]?.done;
    main().innerHTML = `${back('#challenges', 'Challenges')}
      ${H(1, esc(c.name), { marker: true, eyebrow: `Level ${c.level} · ${CH_XP[c.level]} XP${isToday ? ' · challenge of the day: +30 XP' : ''}${doneBefore ? ' · done' : ''}`, sub: plain(c.brief) })}
      <div class="ch">
        <sav-card>
          ${H(2, 'What the page checks', { size: 5 })}
          <sav-list appearance="plain" id="checks">${c.checks.map((k, i) => `<sav-list-item data-i="${i}">${icon('circle', 'prefix')}${esc(k.label)}</sav-list-item>`).join('')}</sav-list>
          <div id="chDone" aria-live="polite"></div>
          <div class="acts" slot="footer"><sav-button appearance="soft" variant="neutral" size="sm" icon="lightbulb" id="hintBtn">Hint</sav-button>
            <sav-button appearance="ghost" variant="neutral" size="sm" icon="rotate-ccw" id="resetBtn">Start over</sav-button>
            ${doc ? `<sav-button appearance="link" size="sm" href="#lesson/${doc.id}" icon="book-open">The ${esc(doc.name)} lesson</sav-button>` : ''}</div>
          <div id="hint" hidden>${codeBlock(c.hint)}</div>
        </sav-card>
        <sav-grid columns="1" gap=".75rem">
          <sav-textarea id="ed" label="Your HTML" rows="12" resize="vertical" spellcheck="false" autocomplete="off" class="editor" help="Tab writes two spaces; Esc then Tab leaves the field."></sav-textarea>
          <sav-card appearance="outlined">${H(3, 'Preview', { size: 6 })}<iframe id="pv" title="Preview of your HTML" sandbox="allow-scripts" class="preview"></iframe></sav-card>
        </sav-grid>
      </div>`;
    const ed = $('#ed'), pv = $('#pv');
    ed.value = codes[c.id] ?? c.starter;
    // the library goes inside the preview as text: a sandboxed page (no origin of its own) may not load files from the site
    const doc0 = (html, [js, css]) => `<!doctype html><html class="${document.documentElement.className}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
      <style>${css}</style><script data-icon-base="${esc(Sav.iconBase)}" data-flag-base="${esc(Sav.flagBase || '')}" data-map-base="${esc(Sav.mapBase || '')}">${js.replace(/<\/script/gi, '<\\/script')}<\/script>
      <style>body{margin:0;padding:16px;min-height:100vh;box-sizing:border-box}</style></head>
      <body class="sav-base">${html}<script>${HELPER}<\/script></body></html>`;
    let n = 0, timer = 0, passedAll = false;
    const check = () => pv.contentWindow?.postMessage({ type: 'sav-check', id: ++n, checks: c.checks }, '*');
    const onMsg = (e) => {
      if (e.source !== pv.contentWindow || e.data?.type !== 'sav-checked' || e.data.id !== n) return;
      const res = e.data.res;
      res.forEach((ok, i) => {
        const li = $(`#checks sav-list-item[data-i="${i}"]`); if (!li) return;
        li.querySelector('sav-icon').setAttribute('name', ok ? 'circle-check' : 'circle');
        li.toggleAttribute('data-ok', ok);
        li.setAttribute('description', ok ? 'Done' : 'Not yet');
      });
      const all = res.every(Boolean);
      if (all && !passedAll) {
        passedAll = true;
        const before = stats().xp;
        if (!S.challenges[c.id]?.done) S.challenges[c.id] = { done: Date.now() };
        if (isToday) { const d = dayKey(); S.daily[d] = { ...(S.daily[d] || {}), ch: true }; }
        markDay(); commit();
        const gained = stats().xp - before;
        const nx = CHALLENGES.find((x) => !S.challenges[x.id]?.done);
        $('#chDone').innerHTML = `<sav-alert variant="success" heading="Challenge complete!">${gained ? `+${gained} XP.` : 'You had done it already.'}
          ${nx ? `<sav-button appearance="link" size="sm" href="#challenge/${nx.id}" icon-end="arrow-right">Next: ${esc(nx.name)}</sav-button>` : 'Every challenge is done!'}</sav-alert>`;
      } else if (!all) { passedAll = false; $('#chDone').innerHTML = ''; }
    };
    addEventListener('message', onMsg);
    cleanup = () => removeEventListener('message', onMsg);
    const render = async () => { const lib = await libText(); if (pv.isConnected) pv.srcdoc = doc0(ed.value, lib); };
    pv.addEventListener('load', () => setTimeout(check, 120));
    ed.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { codes[c.id] = ed.value; store.set('savc-academy-code', codes); render(); }, 450);
    });
    // Tab writes two spaces in the editor (Esc then Tab leaves it, as the help says)
    let escaped = false;
    ed.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { escaped = true; return; }
      const inner = ed.shadowRoot?.querySelector('textarea');
      if (e.key === 'Tab' && !e.shiftKey && !escaped && inner) {
        e.preventDefault();
        inner.setRangeText('  ', inner.selectionStart, inner.selectionEnd, 'end');
        inner.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      }
      escaped = false;
    });
    $('#hintBtn').addEventListener('click', () => { const h = $('#hint'); h.hidden = !h.hidden; });
    $('#resetBtn').addEventListener('click', () => { ed.value = c.starter; delete codes[c.id]; store.set('savc-academy-code', codes); render(); ed.focus(); });
    render();
  }

  /* ---------------------------------------------------------------- the daily quiz: six questions, the same for everybody today */
  function daily() {
    const d = dayKey(), rnd = rng(seedOf(d)), had = S.daily[d];
    const docs = pick(DOCS, 12, rnd);
    const gens = ['identify', 'attrDesc', 'values', 'event', 'tag', 'attrName'];
    const qs = [];
    for (const doc of docs) { if (qs.length >= 6) break; for (const g of shuffle(gens, rnd)) { const q = GEN[g](doc, rnd); if (q && new Set(q.a).size === 4) { qs.push(q); break; } } }
    const ch = dailyChallenge(d), st = stats();
    const activity = Object.fromEntries(S.days.map((x) => [x, 100]));
    main().innerHTML = `${H(1, 'Daily quiz', { marker: true, eyebrow: st.streak ? `${st.streak}-day streak` : 'Play every day to build a streak', sub: 'Six questions, new every day and the same for everybody.' })}
      <sav-card id="dbody" tabindex="-1"></sav-card>
      <sav-grid columns="2" gap="1rem">
        <sav-card>${H(2, esc(ch.name), { size: 5, eyebrow: `Challenge of the day · +30 XP${had?.ch ? ' · done' : ''}`, sub: plain(ch.brief) })}
          <sav-button slot="footer" appearance="soft" icon="hammer" href="#challenge/${ch.id}">Open the challenge</sav-button></sav-card>
        <sav-card>${H(2, `${S.days.length} days of learning`, { size: 5, eyebrow: 'Your days', sub: `Best streak: ${st.bestStreak}` })}
          <sav-chart-activity label="Days you learned" levels="2" data='${esc(JSON.stringify(activity))}'></sav-chart-activity></sav-card>
      </sav-grid>`;
    const body = $('#dbody');
    const start = () => runQuiz(body, qs, (score) => {
      const before = stats().xp, r = S.daily[d];
      S.daily[d] = { ...(r || {}), played: true, score: Math.max(r?.score || 0, score) };
      markDay(); commit();
      const gained = stats().xp - before;
      body.innerHTML = `<sav-empty-state icon="${score >= 5 ? 'trophy' : 'calendar-check'}" heading="${score} of 6" text="${gained ? `+${gained} XP · ` : ''}Come back tomorrow for six new questions.">
        <div class="acts center"><sav-button href="#challenge/${ch.id}" icon="hammer">Challenge of the day</sav-button><sav-button appearance="soft" href="#home">Back to learning</sav-button></div></sav-empty-state>`;
    });
    if (had?.played) {
      body.innerHTML = `<sav-empty-state icon="circle-check" heading="Done for today: ${had.score} of 6" text="Playing again keeps your best score.">
        <sav-button appearance="soft" icon="rotate-ccw" id="dAgain">Play again</sav-button></sav-empty-state>`;
      $('#dAgain').addEventListener('click', start);
    } else start();
  }

  function collection() {
    const st = stats();
    main().innerHTML = `${H(1, 'Collection', { marker: true, eyebrow: `${Object.keys(S.badges).length} of ${ALL_BADGES.length} badges · ${st.done.length} of ${LESSONS.length} cards` })}
      <sav-tabs appearance="pills"><sav-tab label="Badges" icon="award">
        <sav-grid min="11rem" gap=".8rem">${ALL_BADGES.map((b) => { const at = S.badges[b.id]; return `<sav-card appearance="${at ? 'elevated' : 'flat'}">
          <sav-empty-state size="sm" icon="${esc(at ? b.icon : 'lock')}" heading="${esc(b.name)}" text="${esc(b.desc)}" level="3">${at ? `<sav-badge variant="success" appearance="soft">${new Date(at).toLocaleDateString()}</sav-badge>` : ''}</sav-empty-state></sav-card>`; }).join('')}</sav-grid>
      </sav-tab><sav-tab label="Components" icon="layout-grid">
        <sav-grid min="11rem" gap=".8rem">${LESSONS.map((l) => { const r = S.lessons[l.id]; return `<sav-card appearance="${r?.done ? 'elevated' : 'flat'}">
          <sav-empty-state size="sm" icon="${esc(r?.done ? l.icon : 'lock')}" heading="${esc(l.name)}" text="${r?.done ? '' : 'Finish the lesson to unlock it.'}" level="3">
          ${r?.done ? stars(starsOf(r)) : ''}<sav-button size="sm" appearance="${r?.done ? 'ghost' : 'soft'}" href="#lesson/${l.id}">${r?.done ? 'Open' : 'Start'}</sav-button></sav-empty-state></sav-card>`; }).join('')}</sav-grid>
      </sav-tab></sav-tabs>`;
  }

  async function board() {
    main().innerHTML = `${H(1, 'Leaderboard', { marker: true, sub: 'The learners with most XP. Only those who join it are listed, with their username and nothing else.' })}
      <div id="boardMe"></div><div id="boardList"><sav-spinner label="Loading the leaderboard"></sav-spinner></div>`;
    $('#boardMe').innerHTML = !A.user ? `<sav-alert variant="primary" heading="Want to be on it?">Sign in with your SavComponents account, then choose a username in your profile. <sav-button size="sm" id="bSign" icon="log-in">Sign in</sav-button></sav-alert>`
      : !A.profile.onBoard ? `<sav-alert variant="primary" heading="You are not on the leaderboard">Choose a username and join it in your profile. <sav-button size="sm" appearance="soft" href="#profile">Profile</sav-button></sav-alert>` : '';
    $('#bSign')?.addEventListener('click', () => authDialog('signin'));
    try {
      const r = await api('academy.board');
      if (!location.hash.startsWith('#board')) return;
      $('#boardList').innerHTML = !r.top.length ? '<sav-empty-state icon="trophy" heading="Nobody yet" text="Be the first: choose a username in your profile and join."></sav-empty-state>'
        : `${r.me ? `<sav-stat label="Your place" value="#${r.me.rank}" icon="trophy" appearance="plain"></sav-stat>` : ''}<sav-table hover><table><thead><tr><th class="num">#</th><th>Learner</th><th class="num">Level</th><th class="num">XP</th><th class="num">Streak</th></tr></thead><tbody>
          ${r.top.map((x, i) => `<tr><td class="num">${i + 1}</td><td><sav-avatar size="sm" label="${esc(x.username)}"${A.profile.username && x.username === A.profile.username ? ' variant="primary"' : ''}></sav-avatar> ${esc(x.username)}${A.profile.username && x.username === A.profile.username ? ' <sav-label appearance="soft">You</sav-label>' : ''}</td><td class="num">${x.level}</td><td class="num">${x.xp}</td><td class="num">${x.streak}</td></tr>`).join('')}</tbody></table></sav-table>`;
    } catch (e) {
      $('#boardList').innerHTML = `<sav-alert variant="warning">${esc(errText(e))}</sav-alert>`;
    }
  }

  function profile() {
    const st = stats();
    const mode = store.get('savc-mode', 'auto'), style = store.get('savc-style', 'tilt');
    main().innerHTML = `${H(1, 'Profile', { marker: true, eyebrow: `Level ${st.level} · ${st.rank}`, sub: `${st.xp} XP` })}
      <sav-grid min="20rem" gap="1rem" align="start">
        <sav-card>${H(2, 'Account', { size: 5 })}${A.user ? `<sav-list appearance="plain"><sav-list-item description="${esc(A.user.email)}"><sav-avatar slot="prefix" size="sm" label="${esc(A.user.name)}" variant="primary"></sav-avatar>${esc(A.user.name)}</sav-list-item></sav-list>
          <sav-alert appearance="plain" icon="cloud">Your progress is saved in your SavComponents account, on every device where you sign in.</sav-alert>
          <div class="acts" slot="footer"><sav-button appearance="soft" href="../#account" icon="external-link">Account settings</sav-button><sav-button appearance="ghost" variant="neutral" icon="log-out" id="outBtn">Sign out</sav-button></div>`
          : `<sav-alert appearance="plain" icon="smartphone">Your progress is kept on this device. Sign in with your SavComponents account to keep it everywhere and to join the leaderboard.</sav-alert>
          <div class="acts" slot="footer"><sav-button icon="log-in" id="inBtn">Sign in</sav-button><sav-button appearance="soft" id="regBtn">Create an account</sav-button></div>`}</sav-card>
        <sav-card>${H(2, 'Leaderboard', { size: 5 })}${A.user ? `<form class="stack" id="fProfile">
          <sav-input name="username" label="Username" value="${esc(A.profile.username)}" help="The only thing other people see: 3 to 20 letters, digits or _." pattern="[A-Za-z0-9_]{3,20}" maxlength="20"></sav-input>
          <sav-switch name="onBoard" ${A.profile.onBoard ? 'checked' : ''}>Show me on the leaderboard</sav-switch><div class="form-err"></div>
          <sav-button type="submit" icon="save">Save</sav-button></form>` : '<sav-alert appearance="plain" icon="trophy">Sign in to choose a username and join the leaderboard.</sav-alert>'}</sav-card>
      </sav-grid>
      <sav-card>${H(2, 'SavComponents', { size: 5, sub: 'The library behind the Academy: every component, its attributes and examples, the builder and the customiser.' })}
        <div class="acts" slot="footer"><sav-button href="../" icon="book-open">Documentation</sav-button><sav-button appearance="soft" href="../#builder" icon="wand-sparkles">Component builder</sav-button><sav-button appearance="ghost" variant="neutral" href="../#start" icon="rocket">Getting started</sav-button></div></sav-card>
      <sav-card>${H(2, 'Look', { size: 5, sub: 'The Academy uses the same five styles as SavComponents: try them all (there is a badge for it).' })}
        <sav-grid min="14rem" gap="1rem"><sav-radio-group appearance="buttons" label="Style" id="pStyle" value="${style}">${STYLES.map((s) => `<sav-radio value="${s}">${s[0].toUpperCase() + s.slice(1)}</sav-radio>`).join('')}</sav-radio-group>
        <sav-radio-group appearance="buttons" label="Mode" id="pMode" value="${mode}"><sav-radio value="auto">Auto</sav-radio><sav-radio value="light">Light</sav-radio><sav-radio value="dark">Dark</sav-radio></sav-radio-group></sav-grid></sav-card>
      <sav-card>${H(2, 'Your numbers', { size: 5 })}
        <sav-grid min="10rem" gap=".8rem">
          <sav-stat label="Lessons" value="${st.done.length}" unit=" / ${LESSONS.length}" icon="book-open"></sav-stat>
          <sav-stat label="Challenges" value="${st.chDone.length}" unit=" / ${CHALLENGES.length}" icon="hammer"></sav-stat>
          <sav-stat label="Day streak" value="${st.streak}" caption="Best: ${st.bestStreak}" icon="flame"></sav-stat>
          <sav-stat label="Badges" value="${Object.keys(S.badges).length}" unit=" / ${ALL_BADGES.length}" icon="award"></sav-stat></sav-grid>
        <sav-chart-activity label="Days you learned" levels="2" data='${esc(JSON.stringify(Object.fromEntries(S.days.map((x) => [x, 100]))))}'></sav-chart-activity></sav-card>`;
    $('#inBtn')?.addEventListener('click', () => authDialog('signin'));
    $('#regBtn')?.addEventListener('click', () => authDialog('register'));
    $('#outBtn')?.addEventListener('click', signOut);
    if ($('#fProfile')) bindForm('#fProfile', async (f) => {
      const username = String(f.get('username') || '').trim(), onBoard = !!f.get('onBoard');
      await api('academy.profile', { username, onBoard });
      A.profile = { username, onBoard: onBoard && !!username };
      toast(A.profile.onBoard ? 'You are on the leaderboard' : 'Saved', 'success', 'trophy');
      pushNow();
    });
    $('#pStyle').addEventListener('change', (e) => { if (e.target.id !== 'pStyle') return; store.set('savc-style', e.target.value); applyTheme(); });
    $('#pMode').addEventListener('change', (e) => { if (e.target.id !== 'pMode') return; store.set('savc-mode', e.target.value); applyTheme(); });
  }

  /* ================================================================ start */
  function start() {
    const bn = $('#bnav');
    bn.innerHTML = NAV.filter(([k]) => k !== 'board').map(([k, label, ic]) => `<sav-bottom-nav-item value="${k}" icon="${ic}" label="${label}" href="#${k}"></sav-bottom-nav-item>`).join('');
    applyTheme(true);
    commit({ quiet: true });
    renderTop();
    addEventListener('hashchange', route);
    // cards with data-href open their page when clicked anywhere (their button is the same link, for the keyboard)
    document.addEventListener('click', (e) => { const c = e.target.closest?.('sav-card[data-href]'); if (c && !e.target.closest('a, button, sav-button')) location.hash = c.dataset.href; });
    route();
    syncFromAccount();
    handleSav();
    // the progress written in another tab shows up here too
    addEventListener('storage', (e) => { if (e.key === 'savc-academy') { S = normalize(store.get('savc-academy', null)); last = stats(); renderTop(); } if (e.key === 'savc-token') syncFromAccount(); });
    if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  // for the console and for tests: the numbers of the progress and the questions of a lesson
  window.SavAcademy = { stats: () => stats(), quiz: (id) => componentQuiz(DOCS.find((d) => d.id === id)), lessons: LESSONS.length };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
