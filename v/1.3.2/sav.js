/*!
 * SavComponents v1.3.2 — web components, no dependencies
 * Load dist/sav.css first: every component reads its --sav-* custom properties.
 */
(() => {
  'use strict';
  if (window.Sav && window.Sav.version) return;

  const Sav = (window.Sav = { version: '1.3.2' });

  /* ------------------------------------------------------------------ helpers */

  const sheets = new Map();
  const sheet = (text) => {
    let s = sheets.get(text);
    if (!s) {
      s = new CSSStyleSheet();
      s.replaceSync(text);
      sheets.set(text, s);
    }
    return s;
  };

  let uid = 0;
  const nextId = (p = 'sav') => `${p}-${++uid}`;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ------------------------------------------------------------------ words written by the components */

  /* A component writes its own words (Done, Today, Show password…) in the language of the page: the closest lang attribute,
     then English. Sav.addStrings('fr', { Done: 'Terminé' }) adds a language or changes some words: the English text is the key,
     {n} and the like stay as they are. The *-label attributes of a component always win. A component already on the page keeps
     its words until it is drawn again. */
  Sav.strings = { it: {
    'New': 'Novità', 'Remove': 'Rimuovi', 'Close': 'Chiudi', 'Avatar': 'Avatar', 'Loading': 'Caricamento', 'Progress': 'Avanzamento', 'Clear': 'Cancella',
    'Show password': 'Mostra la password', 'Hide password': 'Nascondi la password', 'Decrease': 'Diminuisci', 'Increase': 'Aumenta', 'Enter a number.': 'Inserisci un numero.',
    'The smallest value is {n}.': 'Il valore minimo è {n}.', 'The largest value is {n}.': 'Il valore massimo è {n}.',
    'Use steps of {step}: for example {a} or {b}.': 'Usa passi di {step}: per esempio {a} o {b}.', 'From {a} to {b}.': 'Da {a} a {b}.', 'At least {n}.': 'Almeno {n}.',
    'At most {n}.': 'Al massimo {n}.', 'No colour': 'Nessun colore', 'Suggested colours': 'Colori suggeriti', 'Choose a colour': 'Scegli un colore',
    '{name}: choose a colour': '{name}: scegli un colore', 'Saturation and brightness': 'Saturazione e luminosità', 'Saturation {s}%, brightness {v}%': 'Saturazione {s}%, luminosità {v}%',
    'Hue': 'Tonalità', 'Opacity': 'Opacità', 'Colour code': 'Codice del colore', 'Pick a colour from the screen': 'Prendi un colore dallo schermo',
    'Pick a colour from the screen, with the eyedropper of the system colour picker': 'Prendi un colore dallo schermo, con il contagocce del selettore di sistema', 'Colour': 'Colore',
    'Choose a colour.': 'Scegli un colore.', 'The browser did not allow picking a colour from the screen.': 'Il browser non ha permesso di prendere un colore dallo schermo.',
    'Done': 'Fine', 'Cancel': 'Annulla', 'Please choose a value.': 'Scegli un valore.', 'Remove {name}': 'Rimuovi {name}', 'Search': 'Cerca', 'Options': 'Opzioni', 'No results': 'Nessun risultato',
    'Clear all': 'Deseleziona tutto', 'Select all': 'Seleziona tutto', 'Today': 'Oggi', 'This month': 'Questo mese', 'This year': 'Quest’anno', 'Now': 'Adesso', 'Time': 'Ora',
    'Hours': 'Ore', 'Minutes': 'Minuti', 'Hour': 'Ora', 'Min': 'Min', 'More': 'Altro', 'AM/PM': 'AM/PM', 'Morning or afternoon': 'Mattina o pomeriggio', 'Previous': 'Precedente', 'Next': 'Successivo', 'Please select an option.': 'Scegli un’opzione.', 'Start': 'Inizio', 'End': 'Fine',
    'Rating': 'Valutazione', 'Expand': 'Espandi', 'Collapse': 'Riduci', 'More information': 'Più informazioni', 'Enlarge {name}': 'Ingrandisci {name}', 'image': 'immagine',
    'Character {i} of {n}': 'Carattere {i} di {n}', 'Enter all {n} characters.': 'Inserisci tutti i {n} caratteri.', 'At least {x} characters': 'Almeno {x} caratteri',
    '{x} upper-case letter': '{x} lettera maiuscola', '{x} upper-case letters': '{x} lettere maiuscole', '{x} lower-case letter': '{x} lettera minuscola',
    '{x} lower-case letters': '{x} lettere minuscole', '{x} number': '{x} numero', '{x} numbers': '{x} numeri', '{x} symbol (like ! ? # @)': '{x} simbolo (come ! ? # @)',
    '{x} symbols (like ! ? # @)': '{x} simboli (come ! ? # @)', 'Too weak,Weak,Fair,Good,Strong': 'Troppo debole,Debole,Discreta,Buona,Forte', 'Strength: {word}': 'Sicurezza: {word}',
    'done': 'fatto', 'Enter a password.': 'Inserisci una password.', 'Choose a stronger password.': 'Scegli una password più sicura.', 'Light': 'Chiaro', 'Dark': 'Scuro',
    'Auto': 'Automatico', 'Theme': 'Tema', 'Theme: {name}': 'Tema: {name}', 'Up to {n} terms': 'Al massimo {n} termini', 'Values': 'Valori', 'Carousel': 'Carosello', 'Table': 'Tabella',
    'Previous slide': 'Diapositiva precedente', 'Next slide': 'Diapositiva successiva', '{i} of {n}': '{i} di {n}', 'Slides {a} to {b}': 'Diapositive da {a} a {b}',
    'Slide {i}': 'Diapositiva {i}', 'Slides {a} to {b} of {n}': 'Diapositive da {a} a {b} di {n}', 'Slide {i} of {n}': 'Diapositiva {i} di {n}', 'Play': 'Riproduci', 'Pause': 'Pausa',
    'Replay': 'Riproduci di nuovo', 'Play {name}': 'Riproduci {name}', 'video': 'video', 'Back 10 seconds': 'Indietro di 10 secondi', 'Forward 10 seconds': 'Avanti di 10 secondi',
    'Position': 'Posizione', '{a} of {b}': '{a} di {b}', 'Mute': 'Disattiva l’audio', 'Unmute': 'Riattiva l’audio', 'Volume': 'Volume', 'Speed {r}': 'Velocità {r}', 'Loop': 'Ripetizione',
    'Loop: on': 'Ripetizione: attiva', 'Loop: off': 'Ripetizione: non attiva', 'Captions': 'Sottotitoli', 'Picture in picture': 'Picture in picture', 'Full screen': 'Schermo intero',
    'Exit full screen': 'Esci da schermo intero', 'More controls': 'Altri comandi', 'Audio player': 'Lettore audio', 'Fold the menu': 'Riduci il menu', 'Unfold the menu': 'Espandi il menu',
    'Fold': 'Riduci', 'Main': 'Principale', 'Open the menu': 'Apri il menu', 'Close the menu': 'Chiudi il menu', 'Close the search': 'Chiudi la ricerca',
    '{name} moved to position {i} of {n}.': '{name} spostato in posizione {i} di {n}.', '{name} dropped at position {i} of {n}.': '{name} rilasciato in posizione {i} di {n}.',
    '{name} picked up, position {i} of {n}. Use the arrow keys to move, Space to drop, Escape to cancel.': '{name} selezionato, posizione {i} di {n}. Usa le frecce per spostarlo, Spazio per rilasciarlo, Esc per annullare.',
    '{name}, position {i} of {n}.': '{name}, posizione {i} di {n}.', 'Drop text or links here, or paste them': 'Trascina qui testo o link, oppure incollali',
    'Drop files, text or links here': 'Trascina qui file, testo o link', 'Drop files here or click to choose': 'Trascina qui i file o fai clic per sceglierli',
    'Drop a file here or click to choose': 'Trascina qui un file o fai clic per sceglierlo', 'link': 'link', 'text': 'testo', 'Choose a file.': 'Scegli un file.', 'Series {i}': 'Serie {i}',
    'Chart': 'Grafico', 'Chart data': 'Dati del grafico', 'Activity': 'Attività', 'Map data': 'Dati della mappa', 'Breadcrumb': 'Percorso',
    'Show the whole path': 'Mostra tutto il percorso', 'Copy': 'Copia', 'Copied': 'Copiato', 'Copy failed': 'Copia non riuscita', 'Pages': 'Pagine', 'Previous page': 'Pagina precedente',
    'Next page': 'Pagina successiva', 'Page {n}': 'Pagina {n}', 'Steps': 'Passaggi', 'Levels': 'Livelli', 'Level {n}': 'Livello {n}', 'level {n} of {of}': 'livello {n} di {of}',
    '{n} of 3 stars': '{n} stelle su 3', 'current level': 'livello attuale', 'locked': 'bloccato', 'Details': 'Dettagli', 'Timeline': 'Cronologia', 'Tree': 'Albero', 'Commands': 'Comandi',
    'Search commands': 'Cerca tra i comandi', 'Type a command or search…': 'Scrivi un comando o cerca…', 'Nothing found': 'Nessun risultato', 'move': 'sposta', 'open': 'apri',
    'close': 'chiudi', 'Try again': 'Riprova', 'Loading…': 'Caricamento…', 'Load more': 'Carica altro', 'It did not load.': 'Caricamento non riuscito.', 'That’s all': 'Non c’è altro',
    'Back to {r}%': 'Torna a {r}%',
    '{name} is already there': '{name} c’è già', '{name} is not a colour code': '{name} non è un codice colore', '{name} is not a number': '{name} non è un numero',
    'sortable item': 'elemento ordinabile', '{name}: this type is not accepted': '{name}: questo tipo non è accettato', '{name}: larger than {size}': '{name}: più grande di {size}',
    '{n} active days, highest {max}': '{n} giorni attivi, massimo {max}', 'error': 'errore', 'current step': 'passaggio attuale', 'not done yet': 'ancora da fare',
    'better by {n}': 'migliorato di {n}', 'worse by {n}': 'peggiorato di {n}', 'changed by {n}': 'cambiato di {n}', '{n} more loaded': 'Caricati altri {n}',
    '{name}: {n} values, highest {max}': '{name}: {n} valori, massimo {max}', '{n} continents, highest {name} {max}': '{n} continenti, massimo {name} {max}',
    '{n} countries, highest {name} {max}': '{n} paesi, massimo {name} {max}', 'World map': 'Mappa del mondo',
    'Move cancelled.': 'Spostamento annullato.', '{name} added': '{name} aggiunto', '{name} removed': '{name} rimosso',
    'carousel': 'carosello', 'slide': 'diapositiva', '{n} degrees': '{n} gradi', '{colour} picked': '{colour} scelto',
    'Zoom': 'Zoom', 'Zoom out': 'Riduci', 'Zoom in': 'Ingrandisci', 'then': 'poi',
    'Shift': 'Maiusc', 'Space': 'Spazio', 'Del': 'Canc', 'Enter': 'Invio', 'Escape': 'Esc', 'Command': 'Comando', 'Option': 'Opzione',
  } };
  Sav.addStrings = (lang, words) => { const l = String(lang).toLowerCase(); Sav.strings[l] = { ...Sav.strings[l], ...words }; };

  /** The language around an element, also from inside a shadow root. */
  function langOf(el) {
    for (let n = el; n; n = n.getRootNode?.().host) {
      const l = n.closest?.('[lang]')?.getAttribute('lang');
      if (l) return l.toLowerCase();
    }
    return (document.documentElement.lang || 'en').toLowerCase();
  }
  /** A word in the language of the element: T(this, 'Page {n}', { n: 2 }). */
  function T(el, text, vars) {
    const l = langOf(el);
    const said = Sav.strings[l]?.[text] ?? Sav.strings[l.split('-')[0]]?.[text] ?? text;
    return vars ? said.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : said;
  }

  /** Declares reflected properties: {name: Boolean|Number|String} */
  function props(cls, spec) {
    const attrs = [];
    for (const [prop, type] of Object.entries(spec)) {
      const attr = prop.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
      attrs.push(attr);
      Object.defineProperty(cls.prototype, prop, {
        configurable: true,
        get() {
          if (type === Boolean) return this.hasAttribute(attr);
          const v = this.getAttribute(attr);
          if (type === Number) return v === null || v === '' ? null : Number(v);
          return v;
        },
        set(v) {
          if (type === Boolean) this.toggleAttribute(attr, !!v);
          else if (v === null || v === undefined) this.removeAttribute(attr);
          else this.setAttribute(attr, String(v));
        },
      });
    }
    const own = cls.observedAttributes || [];
    Object.defineProperty(cls, 'observedAttributes', { configurable: true, get: () => [...new Set([...own, ...attrs])] });
  }

  function define(name, cls) {
    // every component understands animation and animation-duration (see MOTION)
    if (typeof SavElement === 'function' && cls.prototype instanceof SavElement) {
      const own = cls.observedAttributes || [];
      Object.defineProperty(cls, 'observedAttributes', { configurable: true, get: () => [...new Set([...own, 'animation', 'animation-duration'])] });
    }
    if (!customElements.get(name)) customElements.define(name, cls);
  }

  /* ------------------------------------------------------------------ icons */

  const ICONS = {
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    rewind: '<path d="M11 18.5 3 12l8-6.5z"/><path d="M21 18.5 13 12l8-6.5z"/>',
    'fast-forward': '<path d="M13 18.5 21 12l-8-6.5z"/><path d="M3 18.5 11 12 3 5.5z"/>',
    'grip-vertical': '<circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.1"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.7L16 9.5"/>',
    'alert-triangle': '<path d="M10.3 4.2L2.9 17.3A2 2 0 0 0 4.6 20.3h14.8a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4M12 17v.1"/>',
    'alert-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.4v.1"/>',
    'chevron-down': '<path d="M6 9l6 6 6-6"/>',
    'chevron-up': '<path d="M6 15l6-6 6 6"/>',
    'chevron-right': '<path d="M9 6l6 6-6 6"/>',
    'chevron-left': '<path d="M15 6l-6 6 6 6"/>',
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="M3 3l18 18M10.6 6.1A9.6 9.6 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.7 3.3M6.3 7.6C3.9 9.3 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.6 0 3-.4 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',
    // a circle half filled: dark and light together, the "automatic" theme
    'theme-auto': '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor"/>',
    star: '<path d="M12 3.3l2.7 5.5 6 .9-4.35 4.2 1 6-5.35-2.8-5.35 2.8 1-6L3.3 9.7l6-.9z"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/>',
    user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    home: '<path d="M4 10.5L12 4l8 6.5V20h-5.5v-5.5h-5V20H4z"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6.5L20.5 7"/>',
    bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15zM10 20.5a2 2 0 0 0 4 0"/>',
    settings: '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>', // Lucide's gear (the same as icons/settings.svg)
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    trash: '<path d="M4.5 7h15M10 11v6M14 11v6M6 7l1 12.5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5L18 7M9 7V4.5h6V7"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M4.5 20h15"/>',
    upload: '<path d="M12 20V9M7 13.5l5-5 5 5M4.5 4h15"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    'more-horizontal': '<circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16.5l-5-5L6 20"/>',
    link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
    filter: '<path d="M4 5h16l-6.2 7.5V19l-3.6 1.8v-8.3z"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2"/>',
    'arrow-up': '<path d="M12 19V5M6 11l6-6 6 6"/>',
    'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6"/>',
    'arrow-up-right': '<path d="M7 17L17 7M8 7h9v9"/>',
    'chevrons-left': '<path d="M11 6l-6 6 6 6M18 6l-6 6 6 6"/>',
    'chevrons-right': '<path d="M13 6l6 6-6 6M6 6l6 6-6 6"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4"/>',
    'log-in': '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l4-4-4-4M14 12H4"/>',
    'log-out': '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 16l4-4-4-4M19 12H9"/>',
    'user-plus': '<circle cx="10" cy="8.5" r="3.8"/><path d="M3 20a7 7 0 0 1 14 0M19 8v6M16 11h6"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
    phone: '<path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>',
    'message-circle': '<path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1-4.4A8.5 8.5 0 1 1 20.5 12z"/>',
    send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
    paperclip: '<path d="M20 11.5l-8.2 8.2a5 5 0 0 1-7.1-7.1l8.5-8.5a3.4 3.4 0 0 1 4.8 4.8l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8"/>',
    'file-text': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    folder: '<path d="M3.5 7a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>',
    clipboard: '<rect x="5" y="4.5" width="14" height="16.5" rx="2"/><path d="M9 4.5V3h6v1.5M9 10h6M9 14h6M9 18h3"/>',
    save: '<path d="M5 3.5h11l3.5 3.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5z"/><path d="M7.5 3.5v5h8v-5M7.5 20.5v-6.5h9v6.5"/>',
    share: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.8l7.6-4.1M8.2 13.2l7.6 4.1"/>',
    bookmark: '<path d="M6.5 3.5h11v17L12 16.5l-5.5 4z"/>',
    tag: '<path d="M3.5 12V4.5a1 1 0 0 1 1-1H12l8.5 8.5-8.5 8.5z"/><circle cx="8" cy="8" r="1.3"/>',
    flag: '<path d="M5 21V4M5 4h12l-2.5 4.5L17 13H5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"/>',
    'map-pin': '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    camera: '<path d="M4 8a1.5 1.5 0 0 1 1.5-1.5h2.5l1.5-2h5l1.5 2h2.5A1.5 1.5 0 0 1 20 8v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18z"/><circle cx="12" cy="12.5" r="3.5"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10.5l5-3v9l-5-3"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    play: '<path d="M7 4.5v15l12-7.5z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    'volume': '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    'shopping-cart': '<circle cx="9" cy="20" r="1.3"/><circle cx="17.5" cy="20" r="1.3"/><path d="M2.5 3.5h3l2.2 11h11l2-7.5H6.5"/>',
    'credit-card': '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
    gift: '<rect x="3.5" y="8.5" width="17" height="4" rx="1"/><path d="M5 12.5v8h14v-8M12 8.5v12M12 8.5S10.5 4 8 4.5 7.5 8.5 12 8.5zM12 8.5S13.5 4 16 4.5s.5 4-4 4z"/>',
    'thumbs-up': '<path d="M7.5 10.5V20H4.5v-9.5zM7.5 10.5L11 3.5a2 2 0 0 1 2.5 2.3L12.8 9.5h5.7a2 2 0 0 1 2 2.4l-1.4 6.5a2 2 0 0 1-2 1.6H7.5"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5v.1M15 9.5v.1"/>',
    zap: '<path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    layers: '<path d="M12 3.5l9 4.5-9 4.5L3 8z"/><path d="M3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5"/>',
    layout: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 9h17M9.5 9v11.5"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6v.1M4.5 12v.1M4.5 18v.1"/>',
    code: '<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15"/>',
    terminal: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M7 9.5l3 2.5-3 2.5M12.5 15h4.5"/>',
    database: '<ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>',
    cloud: '<path d="M7 19a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9.5a4.8 4.8 0 0 1 0 9.5z"/>',
    wifi: '<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.8 16a4.6 4.6 0 0 1 6.4 0M12 19.5v.1"/>',
    'battery': '<rect x="2.5" y="7" width="17" height="10" rx="2"/><path d="M21.5 10.5v3M6 10.5v3M9.5 10.5v3"/>',
    unlock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7"/>',
    shield: '<path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8.5-8.5M16 7l2.5 2.5M14 9l1.8 1.8"/>',
    'help-circle': '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.8-2.5 2.3-2.5 3.8M12 17v.1"/>',
    'x-circle': '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    'plus-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    'more-vertical': '<circle cx="12" cy="5.5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="18.5" r="1.2"/>',
    maximize: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    minimize: '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
    'zoom-in': '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3M11 8.5v5M8.5 11h5"/>',
    printer: '<path d="M7 8.5V3.5h10v5"/><rect x="3.5" y="8.5" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/>',
    inbox: '<path d="M3.5 13.5L6 5h12l2.5 8.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z"/><path d="M3.5 13.5h5l1 2h5l1-2h5"/>',
    archive: '<rect x="3" y="4" width="18" height="4.5" rx="1"/><path d="M5 8.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V8.5M10 12.5h4"/>',
    'eye-dropper': '<path d="M14.5 5.5l4 4M17 3.5a2.1 2.1 0 0 1 3 3l-2 2-3-3zM15 8.5L6 17.5l-2 3 3-2 9-9"/>',
    palette: '<path d="M12 3a9 9 0 0 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-1.3-1.2-1.6-1.2-2.8 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.4 17 3 12 3z"/><circle cx="7.5" cy="11" r="1.1"/><circle cx="10" cy="7" r="1.1"/><circle cx="14.5" cy="7" r="1.1"/>',
    'type': '<path d="M5 6.5V4.5h14v2M12 4.5v15M9 19.5h6"/>',
    hash: '<path d="M5 9h15M4 15h15M10 3.5L8 20.5M16 3.5l-2 17"/>',
    'at-sign': '<circle cx="12" cy="12" r="3.8"/><path d="M15.8 8v5.2a2.6 2.6 0 0 0 5.2 0V12a9 9 0 1 0-3.6 7.2"/>',
    activity: '<path d="M3 12h4l3-7.5 4 15 3-7.5h4"/>',
    'bar-chart': '<path d="M5 20V12M10 20V5M15 20v-9M20 20v-5M3 20.5h18"/>',
    'pie-chart': '<path d="M20.5 14A9 9 0 1 1 10 3.5"/><path d="M21 12A9 9 0 0 0 12 3v9z"/>',
    'trending-up': '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    sparkles: '<path d="M10 3.5l1.6 4.4L16 9.5l-4.4 1.6L10 15.5l-1.6-4.4L4 9.5l4.4-1.6zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z"/>',
    coffee: '<path d="M4 9h12v5.5A4.5 4.5 0 0 1 11.5 19h-3A4.5 4.5 0 0 1 4 14.5zM16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5v2.5M12 3.5v2.5"/>',
  };
  Sav.icons = ICONS;
  /** Adds an icon: Sav.registerIcon('name', '<path d="..."/>') — 24×24 grid, stroked with currentColor */
  Sav.registerIcon = (name, svg) => {
    ICONS[name] = svg;
    document.querySelectorAll(`sav-icon[name="${CSS.escape(name)}"]`).forEach((el) => el.render());
  };
  // an icon the library does not carry (any of the icon set: icon="layout-dashboard") becomes a sav-icon, which loads it
  const svgIcon = (name, cls = '') => (!name || ICONS[name] ? svgRaw(name, cls) : `<sav-icon class="${cls}" name="${esc(name)}" aria-hidden="true"></sav-icon>`);
  const svgRaw = (name, cls = '') =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  /* ------------------------------------------------------------------ shared styles */

  const BASE = `
    :host { box-sizing: border-box; font-family: var(--sav-font); -webkit-tap-highlight-color: transparent; }
    :host([hidden]) { display: none !important; }
    *, *::before, *::after { box-sizing: border-box; }
    .sr { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; padding: 0; }
    svg { display: block; flex: none; }
    :focus { outline: none; }
    :focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 2px; }
  `;

  const VARIANTS = `
    :host { --_c: var(--sav-color-primary); --_on: var(--sav-color-on-primary); }
    :host([variant="neutral"]) { --_c: var(--sav-color-neutral); --_on: var(--sav-color-on-neutral); }
    :host([variant="success"]) { --_c: var(--sav-color-success); --_on: var(--sav-color-on-success); }
    :host([variant="warning"]) { --_c: var(--sav-color-warning); --_on: var(--sav-color-on-warning); }
    :host([variant="danger"])  { --_c: var(--sav-color-danger);  --_on: var(--sav-color-on-danger); }
    :host([variant="protected"]) { --_c: var(--sav-color-protected); --_on: var(--sav-color-on-protected); }
    :host {
      --_c-hover: color-mix(in oklab, var(--_c) 86%, #000);
      --_c-soft: color-mix(in oklab, var(--_c) 13%, transparent);
      --_c-soft-hover: color-mix(in oklab, var(--_c) 22%, transparent);
      --_c-line: color-mix(in oklab, var(--_c) 35%, transparent);
      --_c-text: color-mix(in oklab, var(--_c) var(--sav-tint, 62%), var(--sav-color-text));
    }
  `;

  /**
   * Tilt: the background layer of a component leans while its text stays upright.
   * --sav-tilt sets a fixed angle; otherwise --sav-tilt-lift (a length) gives every element the same lift at its
   * corners, so long elements lean less than short ones: angle = atan2(lift, width of the element).
   */
  const TILT = 'var(--sav-tilt, atan2(var(--sav-tilt-lift, 0px), var(--_tw, 160px)))';
  const tiltRO = typeof ResizeObserver === 'function' ? new ResizeObserver((entries) => {
    for (const e of entries) {
      // an element that left the page is no longer watched (so the browser can free it); tiltWatch watches it again if it comes back
      if (!e.target.isConnected) { tiltRO.unobserve(e.target); e.target._tiltOn = false; continue; }
      const w = e.borderBoxSize?.[0]?.inlineSize ?? e.contentRect.width;
      (e.target._tiltTarget || e.target).style.setProperty('--_tw', Math.max(Math.round(w), 24) + 'px');
    }
  }) : null;
  /** Measures src and writes its width (--_tw) on target, for the length-based tilt. */
  const tiltWatch = (src, target = src) => { if (tiltRO && src && !src._tiltOn) { src._tiltOn = true; src._tiltTarget = target; tiltRO.observe(src); } };
  Sav.tiltWatch = tiltWatch;

  /** auto-text: near-black on light backgrounds, white on dark ones. --_eb is the colour behind the text (the fill, mixed with the
      page where it is see-through); the switch sits where both reach 4.5:1 (WCAG AA). An explicit --text-color still wins. */
  // the WCAG relative luminance (Y) of what is behind, worked out in CSS: white when Y is below 0.179, black above (there both reach 4.58:1)
  /** Brutal's ink: a ring inside a filled shape in the colour of --sav-ink-border (only Brutal sets it; elsewhere it is transparent) */
  const INK = (w = '2px') => `inset 0 0 0 ${w} var(--sav-ink-border, transparent)`;
  const INK_DROP = (d = '2px') => `${d} ${d} 0 var(--sav-ink-border, transparent)`;
  const AUTO_TEXT = 'var(--text-color, color(from var(--_eb) srgb clamp(0, (0.179 - (0.2126 * pow(clamp(0, r, 1), 2.2) + 0.7152 * pow(clamp(0, g, 1), 2.2) + 0.0722 * pow(clamp(0, b, 1), 2.2))) * 10000, 1) clamp(0, (0.179 - (0.2126 * pow(clamp(0, r, 1), 2.2) + 0.7152 * pow(clamp(0, g, 1), 2.2) + 0.0722 * pow(clamp(0, b, 1), 2.2))) * 10000, 1) clamp(0, (0.179 - (0.2126 * pow(clamp(0, r, 1), 2.2) + 0.7152 * pow(clamp(0, g, 1), 2.2) + 0.0722 * pow(clamp(0, b, 1), 2.2))) * 10000, 1) / 1))';
  const SOLID_EB = 'color-mix(in oklab, var(--_c) var(--sav-fill-opacity, 100%), var(--sav-color-bg))';
  const SOFT_EB = 'color-mix(in oklab, var(--_c) 13%, var(--sav-color-bg))';
  /** Animations. --sav-motion scales every duration: 1 = as designed, 0 = none, 2 = twice as long. On one component (and what is
      inside it): animation="off", animation="on", animation-duration="ms" (from 50 to 1000; 200 is the normal pace). */
  const MOTION = { base: 200, min: 50, max: 1000 };
  const motion = (el) => { const v = el ? parseFloat(getComputedStyle(el).getPropertyValue('--sav-motion')) : NaN; return Number.isFinite(v) ? Math.max(0, v) : 1; };
  /* behind the current item (breadcrumb, menu, header, pagination, tree): a tint, or the solid tile of Tilt and Brutal (--sav-current-behind) */
  const CUR_EB = (pct) => `var(--sav-current-behind, color-mix(in oklab, var(--sav-color-primary) ${pct}%, var(--sav-color-bg)))`;
  /** auto-text on a group (steps, timeline, tree, menu, breadcrumb, button, chip and radio groups) reaches its items as data-auto-text */
  const passAutoText = (group, items) => items.forEach((el) => el.toggleAttribute('data-auto-text', group.hasAttribute('auto-text')));
  const SIZES = `
    :host { --_h: var(--sav-control-md); --_fs: var(--sav-font-size-md); }
    :host([size="sm"]) { --_h: var(--sav-control-sm); --_fs: var(--sav-font-size-sm); }
    :host([size="lg"]) { --_h: var(--sav-control-lg); --_fs: var(--sav-font-size-lg); }
  `;

  const FIELD = `
    :host { display: block; color: var(--sav-color-text); min-width: 0; max-width: 100%; }
    .lbl { display: none; margin-bottom: .4rem; font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-semibold); line-height: 1.3; }
    .has-label .lbl { display: block; }
    :host([required]) .lbl::after { content: " *"; color: var(--sav-color-danger); }
    .help { display: none; margin-top: .35rem; font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); line-height: 1.4; }
    .has-help .help { display: block; }
    :host([data-user-invalid]) .help { color: var(--sav-color-danger); }
    .box {
      position: relative; isolation: isolate; display: flex; align-items: center; gap: .5rem;
      min-height: var(--_h); padding: 0 .8rem; color: var(--sav-color-text);
      border: var(--sav-border-width) solid transparent; border-radius: var(--sav-radius); font-size: var(--_fs);
      /* the look of a field comes from tokens each style can set: --sav-field-shadow (at rest), --sav-field-sheen, --sav-field-bg-hover,
         --sav-field-bg-focus, --sav-field-focus-shadow, --sav-field-focus-border, --sav-field-filled-bg, --sav-field-filled-border */
      --_frest: var(--sav-field-shadow, var(--sav-control-shadow, inset 0 1px 2px rgb(20 24 40 / .05)));
      --_fbg: var(--sav-color-input-bg); --_fbd: var(--sav-color-border-strong); --_fsh: var(--_frest);
    }
    .box::before {
      content: ""; position: absolute; inset: calc(var(--sav-border-width) * -1); z-index: -1; pointer-events: none;
      border-radius: inherit; background: var(--_fbg); background-image: var(--sav-field-sheen, var(--sav-sheen, none)); border: var(--sav-border-width) solid; border-color: var(--_fbd); box-shadow: var(--_fsh);
      -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none);
      transform: rotate(${TILT});
      transition: border-color calc(var(--sav-duration) * var(--sav-motion, 1)), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)), background calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.25s * var(--sav-motion, 1)) var(--sav-easing);
    }
    :host([pill]) .box { border-radius: var(--sav-radius-pill); padding: 0 1rem; }
    :host([appearance="filled"]) .box { --_fbg: var(--sav-field-filled-bg, var(--sav-color-surface-2)); --_fbd: var(--sav-field-filled-border, transparent); }
    .box:hover { --_fbd: color-mix(in oklab, var(--sav-color-border-strong), var(--sav-color-text) 22%); }
    :host(:not([appearance="filled"])) .box:hover { --_fbg: var(--sav-field-bg-hover, var(--sav-color-input-bg)); }
    .box:focus-within, :host([open]) .box { --_fbg: var(--sav-field-bg-focus, var(--sav-color-input-bg)); --_fbd: var(--sav-field-focus-border, var(--sav-color-primary));
      --_fsh: var(--sav-field-focus-shadow, 0 0 0 3px color-mix(in oklab, var(--sav-color-primary) 22%, transparent)), var(--_frest); }
    /* tilt: straight while you type or while its popup is open */
    .box:focus-within::before, :host([open]) .box::before { transform: none; }
    :host([data-user-invalid]) .box { --_fbd: var(--sav-color-danger); }
    :host([data-user-invalid]) .box:focus-within { --_fbd: var(--sav-color-danger); --_fsh: 0 0 0 3px color-mix(in oklab, var(--sav-color-danger) 22%, transparent), var(--_frest); }
    :host([disabled]) .box { opacity: .55; cursor: not-allowed; }
    .ctl {
      flex: 1; min-width: 0; margin: 0; padding: 0; border: 0; outline: none; background: none;
      font: inherit; color: inherit; line-height: 1.4;
    }
    .ctl::placeholder { color: var(--sav-color-text-muted); opacity: 1; }
    .ctl:disabled { cursor: not-allowed; }
    ::slotted([slot="prefix"]), ::slotted([slot="suffix"]) { color: var(--sav-color-text-muted); display: inline-flex; }
    /* a button inside the field sits close to its edge instead of keeping the whole inner padding */
    ::slotted(:is(sav-button, sav-copy-button, button)[slot="suffix"]) { margin-inline-end: -.55rem; }
    ::slotted(:is(sav-button, sav-copy-button, button)[slot="prefix"]) { margin-inline-start: -.55rem; }
    .ibtn {
      display: none; align-items: center; justify-content: center; flex: none;
      width: 1.6em; height: 1.6em; margin: 0 -.25em; padding: 0; border: 0; border-radius: var(--sav-radius-sm);
      background: none; color: var(--sav-color-text-muted); cursor: pointer;
    }
    .ibtn:hover { color: var(--sav-color-text); background: var(--sav-color-surface-2); }
    .ibtn svg { width: 1.05em; height: 1.05em; }
  `;

  /* ------------------------------------------------------------------ base classes */

  class SavElement extends HTMLElement {
    static styles = '';
    static delegatesFocus = false;
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open', delegatesFocus: this.constructor.delegatesFocus });
      root.adoptedStyleSheets = [sheet(BASE), ...[].concat(this.constructor.styles).map(sheet)];
    }
    $(sel) { return this.shadowRoot.querySelector(sel); }
    $$(sel) { return [...this.shadowRoot.querySelectorAll(sel)]; }
    emit(name, detail = {}, cancelable = false) {
      return this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, cancelable, detail }));
    }
    attributeChangedCallback(name, oldV, newV) {
      if (name === 'animation' || name === 'animation-duration') { this.applyMotion(); return; }
      if (oldV !== newV && this.shadowRoot.firstChild) this.changed?.(name, newV);
    }
    /** animation="off" | "on" and animation-duration="ms" become --sav-motion on this component (inherited by what is inside it) */
    applyMotion() {
      const a = this.getAttribute('animation'), ms = Number(this.getAttribute('animation-duration'));
      const k = a === 'off' ? 0 : ms > 0 ? Math.min(MOTION.max, Math.max(MOTION.min, ms)) / MOTION.base : a === 'on' ? 1 : null;
      if (k === null && !this._motion) return;
      if (!this._motion) { this._motion = new CSSStyleSheet(); this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, this._motion]; }
      this._motion.replaceSync(k === null ? '' : `:host { --sav-motion: ${+k.toFixed(3)}; }`);
    }
    /** True when a slot has elements or non-blank text assigned */
    hasSlot(name) {
      const sel = name ? `[slot="${name}"]` : null;
      if (sel) return !!this.querySelector(`:scope > ${sel}`);
      return [...this.childNodes].some((n) => (n.nodeType === 1 && !n.slot) || (n.nodeType === 3 && n.textContent.trim()));
    }
  }

  /** Form-associated control: name, value, disabled, required, validation */
  class SavFormControl extends SavElement {
    static formAssociated = true;
    static delegatesFocus = true;
    constructor() {
      super();
      this.internals = this.attachInternals();
    }
    get form() { return this.internals.form; }
    get validity() { return this.internals.validity; }
    get validationMessage() { return this.internals.validationMessage; }
    checkValidity() { return this.internals.checkValidity(); }
    reportValidity() { this.toggleAttribute('data-user-invalid', !this.internals.validity.valid); return this.internals.reportValidity(); }
    setCustomValidity(msg) { this._custom = msg || ''; this.syncValidity(); }
    formDisabledCallback(d) { this._formDisabled = d; this.changed?.('disabled'); }
    get isDisabled() { return this.disabled || !!this._formDisabled; }
    /** Copies validity from the native element inside the shadow root */
    syncValidity(native = this.native) {
      if (!native) return;
      if (this._custom) native.setCustomValidity?.(this._custom);
      else native.setCustomValidity?.('');
      if (native.validity && !native.validity.valid) this.internals.setValidity(native.validity, native.validationMessage, native);
      else this.internals.setValidity({});
    }
    markTouched() {
      this.toggleAttribute('data-user-invalid', !this.internals.validity.valid);
    }
    /** Shows label/help from attribute or slot */
    syncLabels(wrap) {
      const label = this.getAttribute('label');
      const help = this.getAttribute('help');
      // a slotted label or help wins over the attribute (the attribute still names the field for screen readers and sheets)
      const lt = this.$('.lbl-text'); if (lt) lt.textContent = this.hasSlot('label') ? '' : label ?? '';
      const ht = this.$('.help-text'); if (ht) ht.textContent = this.hasSlot('help') ? '' : help ?? '';
      wrap.classList.toggle('has-label', !!label || this.hasSlot('label'));
      wrap.classList.toggle('has-help', !!help || this.hasSlot('help'));
      tiltWatch(this.$('.box'));
    }
  }
  props(SavFormControl, { name: String, disabled: Boolean, required: Boolean });
  const FC = ['name', 'disabled', 'required'];

  /* ------------------------------------------------------------------ floating positioning */

  /** Places a fixed element next to an anchor, flipping when there is no room */
  /** True when the element a popup is attached to is no longer on screen: scrolled out of the window, or out of a
      scrolling box around it, or hidden. Open popups close then, instead of floating over unrelated content. */
  function anchorGone(anchor) {
    if (!anchor?.isConnected) return true;
    const a = anchor.getBoundingClientRect();
    if (!a.width && !a.height) return true;
    const vw = document.documentElement.clientWidth, vh = window.innerHeight;
    if (a.bottom <= 0 || a.top >= vh || a.right <= 0 || a.left >= vw) return true;
    for (let el = anchor.parentElement || anchor.getRootNode().host; el && el !== document.body && el !== document.documentElement; el = el.parentElement || el.getRootNode().host) {
      const cs = getComputedStyle(el);
      if (cs.overflowX === 'visible' && cs.overflowY === 'visible') continue;
      const c = el.getBoundingClientRect();
      if (a.bottom <= c.top || a.top >= c.bottom || a.right <= c.left || a.left >= c.right) return true;
    }
    return false;
  }
  function place(el, anchor, placement = 'bottom-start', gap = 8) {
    const a = anchor.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const vw = document.documentElement.clientWidth, vh = window.innerHeight, m = 8;
    let [side, align = 'center'] = placement.split('-');
    const fits = {
      top: a.top - r.height - gap >= m,
      bottom: a.bottom + r.height + gap <= vh - m,
      left: a.left - r.width - gap >= m,
      right: a.right + r.width + gap <= vw - m,
    };
    const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
    if (!fits[side] && fits[opposite[side]]) side = opposite[side];
    let x, y;
    if (side === 'top' || side === 'bottom') {
      y = side === 'top' ? a.top - r.height - gap : a.bottom + gap;
      x = align === 'start' ? a.left : align === 'end' ? a.right - r.width : a.left + a.width / 2 - r.width / 2;
    } else {
      x = side === 'left' ? a.left - r.width - gap : a.right + gap;
      y = align === 'start' ? a.top : align === 'end' ? a.bottom - r.height : a.top + a.height / 2 - r.height / 2;
    }
    x = Math.max(m, Math.min(x, vw - r.width - m));
    y = Math.max(m, Math.min(y, vh - r.height - m));
    el.style.left = `${Math.round(x)}px`;
    el.style.top = `${Math.round(y)}px`;
    el.dataset.side = side;
    // arrow points at the anchor centre
    const ax = a.left + a.width / 2 - x, ay = a.top + a.height / 2 - y;
    el.style.setProperty('--_ax', `${Math.round(Math.max(10, Math.min(ax, r.width - 10)))}px`);
    el.style.setProperty('--_ay', `${Math.round(Math.max(10, Math.min(ay, r.height - 10)))}px`);
  }
  const supportsPopover = typeof HTMLElement.prototype.showPopover === 'function';
  const showPop = (el) => { if (supportsPopover) { if (!el.matches(':popover-open')) el.showPopover(); } else el.classList.add('open'); };
  const hidePop = (el) => { if (supportsPopover) { if (el.matches(':popover-open')) el.hidePopover(); } else el.classList.remove('open'); };
  const FLOAT = `
    .float { position: fixed; inset: auto; margin: 0; }
    .float:not(:popover-open):not(.open) { display: none; }
  `;
  /* A popup panel (picker, dropdown, info tip): its background, border and shadow live on a ::before layer that leans
     with the style (Tilt) while the content stays upright. The panel itself never scrolls: an inner element does. */
  const PANEL_TILT = 'var(--sav-tilt, atan2(var(--sav-panel-lift, calc(var(--sav-tilt-lift, 0px) * 2.5)), var(--_tw, 160px)))';
  const panelLayer = (sel) => `
    ${sel} { isolation: isolate; overflow: visible; background: transparent; border-color: transparent; box-shadow: none; -webkit-backdrop-filter: none; backdrop-filter: none; }
    ${sel}::before { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; border: var(--sav-border-width) solid var(--sav-color-border); border-radius: inherit;
      background: var(--sav-color-surface); background-image: var(--sav-sheen, none); box-shadow: var(--sav-panel-shadow, var(--sav-shadow-lg)); -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none);
      transform: rotate(${PANEL_TILT}); }
    /* like the card in Tilt: a tinted plate of the same size leaning the other way, instead of an offset shadow */
    ${sel}::after { content: ""; display: var(--sav-panel-back, none); position: absolute; inset: 0; z-index: -2; pointer-events: none; border-radius: inherit;
      background: color-mix(in oklab, var(--sav-color-primary) 16%, transparent); transform: rotate(calc(${PANEL_TILT} * -2.2)); }
  `;

  /* ================================================================== sav-icon */

  /* Icons outside the built-in set are SVG files of a shared, separately versioned icon set: <site>/icons/<iconsVersion>/<name>.svg.
     Every library version names the icon set it was built with, so the files are never copied into each version.
     The set is found next to the folder of sav.js (/v/x.y.z/ or /dist/); a copy of sav.js hosted elsewhere uses savcomponents.com,
     unless the page sets <script src="…/sav.js" data-icon-base="…/"> or Sav.iconBase. Fetched once, then cached. */
  const SCRIPT = document.currentScript;
  const SCRIPT_URL = SCRIPT?.src || location.href;
  Sav.iconsVersion = '1.0.0';
  Sav.iconBase = SCRIPT?.dataset.iconBase || (() => {
    const u = new URL(SCRIPT_URL);
    const m = u.pathname.match(/^(.*\/)(?:v\/[^/]+|dist)\/[^/]*$/);
    return m ? `${u.origin}${m[1]}icons/${Sav.iconsVersion}/` : `https://savcomponents.com/icons/${Sav.iconsVersion}/`;
  })();
  const iconCache = new Map();
  const SVG_TAGS = new Set(['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'g']);
  const SVG_ATTRS = new Set(['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'width', 'height', 'points', 'transform', 'fill', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'opacity']);
  /** Only plain shapes are kept from a fetched file: no scripts, links or styles. */
  function cleanSvg(text) {
    const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    const out = [];
    const walk = (n) => {
      for (const c of n.children) {
        if (!SVG_TAGS.has(c.localName)) continue;
        const attrs = [...c.attributes].filter((a) => SVG_ATTRS.has(a.name) && !/url\(|javascript:/i.test(a.value)).map((a) => `${a.name}="${esc(a.value)}"`).join(' ');
        out.push(c.localName === 'g' ? `<g ${attrs}>` : `<${c.localName} ${attrs}/>`);
        if (c.localName === 'g') { walk(c); out.push('</g>'); }
      }
    };
    if (doc.documentElement?.localName === 'svg') walk(doc.documentElement);
    return out.join('');
  }
  Sav.loadIcon = (name) => {
    if (ICONS[name]) return Promise.resolve(ICONS[name]);
    if (!/^[a-z0-9-]{1,60}$/.test(name)) return Promise.resolve('');
    if (!iconCache.has(name)) {
      const get = (n) => fetch(Sav.iconBase + n + '.svg').then((r) => (r.ok ? r.text() : ''));
      // the alias list (9 KB) is read once, so an old name loads the right file at once instead of failing first
      iconCache.set(name, loadAliases()
        .then((al) => get(al[name] || name))
        .then((t) => (t ? (ICONS[name] = cleanSvg(t)) : '')).catch(() => ''));
    }
    return iconCache.get(name);
  };
  let aliasesP;
  const loadAliases = () => (aliasesP ||= fetch(Sav.iconBase + 'aliases.json').then((r) => (r.ok ? r.json() : {})).catch(() => ({})));

  class SavIcon extends SavElement {
    static styles = `:host { display: inline-flex; width: 1em; height: 1em; vertical-align: -0.14em; color: inherit; } svg { width: 100%; height: 100%; } svg * { stroke-width: var(--sav-icon-stroke, 2); }`;
    connectedCallback() { this.render(); }
    changed() { this.render(); }
    render() {
      const name = this.getAttribute('name') || '';
      this.shadowRoot.innerHTML = svgRaw(name);
      if (!ICONS[name] && name) Sav.loadIcon(name).then((svg) => { if (svg && this.getAttribute('name') === name) this.shadowRoot.innerHTML = svgRaw(name); });
      const label = this.getAttribute('label');
      if (label) { this.setAttribute('role', 'img'); this.setAttribute('aria-label', label); }
      else { this.removeAttribute('role'); this.setAttribute('aria-hidden', 'true'); }
    }
  }
  props(SavIcon, { name: String, label: String });
  define('sav-icon', SavIcon);

  /* ================================================================== sav-button */

  class SavButton extends SavElement {
    static formAssociated = true;
    static delegatesFocus = true;
    static styles = [VARIANTS, SIZES, `
      :host {
        display: inline-flex; vertical-align: middle; --_px: calc(var(--_h) * .42);
        /* the background and border are drawn on a layer (.btn::before) so a style can rotate it while the text stays upright */
        --_bg: color-mix(in oklab, var(--_c) var(--sav-fill-opacity, 100%), transparent); --_bg-h: color-mix(in oklab, var(--_c-hover) var(--sav-fill-opacity, 100%), transparent); --_fg: var(--_on); --_sheen: var(--sav-sheen, none);
        --_bd: var(--sav-button-border-color, transparent); --_bd-h: var(--sav-button-border-color, transparent);
        --_sh: var(--sav-button-shadow, none); --_sh-h: var(--sav-button-shadow-hover, var(--sav-button-shadow, none)); --_sh-a: var(--sav-button-shadow-active, var(--sav-button-shadow, none));
      }
      :host([appearance="outline"]) { --_bg: transparent; --_bg-h: var(--_c-soft); --_bd: var(--_c-line); --_bd-h: var(--_c); --_fg: var(--_c-text); }
      :host([appearance="soft"]) { --_bg: var(--_c-soft); --_bg-h: var(--_c-soft-hover); --_bd: transparent; --_bd-h: transparent; --_fg: var(--_c-text); }
      :host([appearance="ghost"]) { --_bg: transparent; --_bg-h: var(--_c-soft); --_bd: transparent; --_bd-h: transparent; --_fg: var(--_c-text); --_sh: none; --_sh-h: none; --_sh-a: none; --_sheen: none; --_bdf: none; }
      :host([appearance="link"]) { --_bg: transparent; --_bg-h: transparent; --_bd: transparent; --_bd-h: transparent; --_fg: var(--_c-text); --_sh: none; --_sh-h: none; --_sh-a: none; --_sheen: none; --_bdf: none; }
      .btn {
        position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: .5em;
        width: 100%; min-height: var(--_h); margin: 0; padding: 0 var(--_px);
        border: 0; border-radius: var(--sav-radius); background: none; color: var(--text-color, var(--_fg));
        font: inherit; font-size: calc(var(--_fs) * var(--sav-button-font-scale, 1)); font-weight: var(--sav-font-weight-semibold); line-height: 1.1;
        letter-spacing: var(--sav-button-letter-spacing, normal); text-transform: var(--sav-button-text-transform, none);
        text-decoration: none; white-space: nowrap; cursor: pointer; user-select: none; -webkit-user-select: none;
        transition: color calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(var(--sav-duration) * var(--sav-motion, 1));
      }
      .btn::before {
        content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
        background: var(--_bg); background-image: var(--_sheen); border: var(--sav-border-width) solid var(--_bd); box-shadow: var(--_sh);
        -webkit-backdrop-filter: var(--_bdf, var(--sav-button-backdrop, none)); backdrop-filter: var(--_bdf, var(--sav-button-backdrop, none));
        transform: rotate(var(--sav-button-tilt, ${TILT}));
        transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.22s * var(--sav-motion, 1)) var(--sav-easing);
      }
      .btn:hover { transform: var(--sav-button-hover-transform, none); }
      .btn:hover::before { background: var(--_bg-h); background-image: var(--_sheen); border-color: var(--_bd-h); box-shadow: var(--_sh-h); transform: rotate(var(--sav-button-tilt-hover, calc(var(--sav-button-tilt, ${TILT}) * var(--sav-tilt-hover, -1)))); }
      :host([data-open]) .btn::before { transform: none; }
      .btn:active { transform: var(--sav-button-active-transform, translateY(1px)); }
      .btn:active::before { box-shadow: var(--_sh-a); }
      :host([appearance="ghost"]) .btn, :host([appearance="link"]) .btn { transform: none; }
      :host([appearance="ghost"]) .btn:not(:hover)::before { transform: none; }
      :host([appearance="link"]) .btn { padding: 0 .2em; min-height: auto; text-decoration: underline; text-underline-offset: .2em; }
      :host([appearance="link"]) .btn::before { transform: none; }
      :host([appearance="link"]) .btn:hover { text-decoration-thickness: 2px; }
      :host([pill]) .btn { border-radius: var(--sav-radius-pill); }
      :host([square]) .btn, :host([data-icon-only]:not([appearance="link"])) .btn { width: var(--_h); padding: 0; }
      .label[hidden] { display: none; }
      .ic { width: 1.15em; height: 1.15em; }
      :host([square][pill]) .btn, :host([circle]) .btn { width: var(--_h); padding: 0; border-radius: 50%; }
      :host([block]) { display: flex; }
      :host([disabled]) { cursor: not-allowed; }
      :host([disabled]) .btn { opacity: .5; pointer-events: none; }
      .label { display: inline-flex; align-items: center; gap: .5em; }
      ::slotted(sav-icon), ::slotted(svg) { font-size: 1.1em; }
      .caret { width: 1em; height: 1em; margin-right: -.2em; opacity: .8; }
      /* loading: the library's own spinner in the colour of the text, so it follows the style (tiles in Tilt and Glass, a square in Sharp, a ring in Soft and Brutal) */
      .spin { display: none; position: absolute; font-size: 1.15em; }
      :host([loading]) .btn { pointer-events: none; }
      :host([loading]) .btn > :not(.spin) { visibility: hidden; }
      :host([loading]) .spin { display: inline-flex; }
      :host([data-group="middle"]) .btn { border-radius: 0; }
      :host([data-group="first"]) .btn { border-start-end-radius: 0; border-end-end-radius: 0; }
      :host([data-group="last"]) .btn { border-start-start-radius: 0; border-end-start-radius: 0; }
      :host([data-group]:not([data-group="first"])) { margin-inline-start: calc(var(--sav-border-width) * -1); }
      :host([data-group]:hover), :host([data-group]:focus-within) { z-index: 1; }
      :host([data-group]:not([appearance])), :host([data-group][appearance="solid"]) { --_bd: color-mix(in oklab, var(--_c), #000 14%); --_bd-h: var(--_bd); }
      :host([data-group]) .btn::before { transform: none; }
      @keyframes sav-spin { to { transform: rotate(360deg); } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${SOLID_EB}; }
      :host([appearance="soft"]) { --_eb: ${SOFT_EB}; }
      :host(:is([appearance="outline"], [appearance="ghost"], [appearance="link"])) { --_eb: var(--sav-color-bg); }
      :host(:is([auto-text], [data-auto-text])) .btn { color: ${AUTO_TEXT}; }
    `];
    constructor() {
      super();
      this.internals = this.attachInternals();
      this.addEventListener('click', (e) => {
        if (this.disabled || this.loading) { e.preventDefault(); e.stopImmediatePropagation(); return; }
        if (this.href) return;
        const form = this.internals.form;
        if (!form) return;
        const type = this.type || 'button';
        if (type === 'submit') {
          // a temporary native button keeps name/value in the submission
          const b = document.createElement('button');
          b.type = 'submit'; b.hidden = true;
          if (this.name) { b.name = this.name; b.value = this.value ?? ''; }
          form.append(b); form.requestSubmit(b); b.remove();
        } else if (type === 'reset') form.reset();
      });
    }
    connectedCallback() { if (!this.shadowRoot.firstChild) this.render(); }
    changed(name) {
      if (name === 'href' || name === 'caret' || name === 'icon' || name === 'icon-end') this.render();
      else this.sync();
    }
    render() {
      const tag = this.href ? 'a' : 'button';
      const ic = this.getAttribute('icon'), ice = this.getAttribute('icon-end');
      [ic, ice].forEach((n) => n && !ICONS[n] && Sav.loadIcon(n).then((svg) => svg && this.isConnected && this.render()));
      this.shadowRoot.innerHTML = `<${tag} part="base" class="btn">${ic ? svgIcon(ic, 'ic') : ''}<slot name="prefix"></slot><span part="label" class="label"><slot></slot></span><slot name="suffix"></slot>${ice ? svgIcon(ice, 'ic') : ''}${this.caret ? svgIcon('chevron-down', 'caret') : ''}<sav-spinner class="spin" part="spinner" variant="current" aria-hidden="true"></sav-spinner></${tag}>`;
      this.$('slot:not([name])').addEventListener('slotchange', () => this.syncLabel());
      tiltWatch(this.$('.btn'));
      this.sync();
      this.syncLabel();
    }
    /** No text: no empty label box (so no gap), and a button with only an icon becomes square */
    syncLabel() {
      const hasText = [...this.childNodes].some((n) => (n.nodeType === 3 && n.textContent.trim()) || (n.nodeType === 1 && !n.slot && n.localName !== 'sav-icon' && n.localName !== 'svg'));
      // square only with exactly one icon: an icon plus an arrow (or two icons) needs a wider button
      const icons = (this.hasAttribute('icon') ? 1 : 0) + (this.hasAttribute('icon-end') ? 1 : 0) + this.querySelectorAll(':scope > sav-icon, :scope > svg, :scope > [slot="prefix"], :scope > [slot="suffix"]').length;
      const onlyIcon = !hasText && icons === 1;
      this.$('.label').hidden = !this.hasSlot();
      this.toggleAttribute('data-icon-only', !!onlyIcon && !this.caret);
    }
    sync() {
      const b = this.$('.btn');
      if (!b) return;
      if (this.href) {
        b.href = this.href;
        this.target ? b.setAttribute('target', this.target) : b.removeAttribute('target');
        if (this.target === '_blank') b.rel = 'noopener noreferrer';
        this.disabled ? b.setAttribute('aria-disabled', 'true') : b.removeAttribute('aria-disabled');
        if (this.download !== null) b.setAttribute('download', this.download); else b.removeAttribute('download');
      } else {
        b.type = 'button';
        b.disabled = this.disabled;
      }
      const label = this.getAttribute('label');
      label ? b.setAttribute('aria-label', label) : b.removeAttribute('aria-label');
      this.loading ? b.setAttribute('aria-busy', 'true') : b.removeAttribute('aria-busy');
      // the state of a menu or toggle button, set on sav-button, is read on the real button inside
      for (const a of BUTTON_ARIA) { const v = this.getAttribute(a); v === null ? b.removeAttribute(a) : b.setAttribute(a, v); }
    }
    focus(o) { this.$('.btn')?.focus(o); }
    blur() { this.$('.btn')?.blur(); }
    click() { this.$('.btn')?.click(); }
  }
  const BUTTON_ARIA = ['aria-expanded', 'aria-pressed', 'aria-controls', 'aria-haspopup', 'aria-describedby', 'aria-current'];
  { const own = SavButton.observedAttributes || []; Object.defineProperty(SavButton, 'observedAttributes', { configurable: true, get: () => [...own, ...BUTTON_ARIA] }); }
  props(SavButton, { icon: String, iconEnd: String, variant: String, appearance: String, size: String, pill: Boolean, square: Boolean, circle: Boolean, block: Boolean, caret: Boolean, disabled: Boolean, loading: Boolean, href: String, target: String, download: String, type: String, name: String, value: String, label: String });
  define('sav-button', SavButton);

  /* ================================================================== sav-button-group */

  class SavButtonGroup extends SavElement {
    static styles = `:host { display: inline-flex; vertical-align: middle; } .g { display: inline-flex; }`;
    connectedCallback() {
      this.shadowRoot.innerHTML = '<div class="g" part="base" role="group"><slot></slot></div>';
      this.$('slot').addEventListener('slotchange', () => this.sync());
      const label = this.getAttribute('label');
      if (label) this.$('.g').setAttribute('aria-label', label);
      this.sync();
    }
    static get observedAttributes() { return ['auto-text']; }
    changed() { this.sync(); }
    sync() {
      if (!this.$('slot')) return;
      passAutoText(this, this.querySelectorAll('sav-button'));
      const btns = this.$('slot').assignedElements().filter((e) => e.localName === 'sav-button' || e.localName === 'sav-dropdown');
      btns.forEach((b, i) => {
        const target = b.localName === 'sav-dropdown' ? b.querySelector('[slot="trigger"]') : b;
        if (!target) return;
        target.dataset.group = btns.length === 1 ? '' : i === 0 ? 'first' : i === btns.length - 1 ? 'last' : 'middle';
        if (btns.length === 1) delete target.dataset.group;
        if (b !== target) b.style.marginInlineStart = i ? 'calc(var(--sav-border-width) * -1)' : '';
      });
    }
  }
  define('sav-button-group', SavButtonGroup);

  /* ================================================================== sav-badge */

  class SavBadge extends SavElement {
    static styles = [VARIANTS, `
      :host { display: inline-flex; vertical-align: middle; --_bb: color-mix(in oklab, var(--_c) var(--sav-fill-opacity, 100%), transparent); --_bf: var(--_on); --_bsh: var(--sav-badge-shadow, none); }
      :host([appearance="soft"]) { --_bb: var(--_c-soft); --_bf: var(--_c-text); }
      :host([appearance="outline"]) { --_bb: transparent; --_bf: var(--_c-text); --_bsh: inset 0 0 0 1px var(--_c-line); }
      .b { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: .3em; padding: .2em .55em; border-radius: var(--sav-radius-sm);
           color: var(--text-color, var(--_bf)); font-size: .75em; font-weight: var(--sav-font-weight-bold); line-height: 1.25; white-space: nowrap; letter-spacing: .01em; }
      /* background on a layer: the tilt shape rotates it, the text stays upright */
      .b::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_bb); background-image: var(--sav-sheen, none); box-shadow: var(--_bsh); -webkit-backdrop-filter: var(--sav-button-backdrop, none); backdrop-filter: var(--sav-button-backdrop, none); transform: rotate(${TILT}); }
      :host([dot]) .b::before { transform: none; box-shadow: ${INK('1.5px')}; }
      :host([pill]) .b { border-radius: var(--sav-radius-pill); }
      :host([dot]) .b { width: .6em; height: .6em; padding: 0; border-radius: 50%; font-size: 1em; }
      :host([pulse]) .b { animation: sav-pulse calc(1.6s * var(--sav-motion, 1)) ease-out infinite; }
      @keyframes sav-pulse { 0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--_c) 60%, transparent); } 70%, 100% { box-shadow: 0 0 0 .5em transparent; } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${SOLID_EB}; }
      :host([appearance="soft"]) { --_eb: ${SOFT_EB}; }
      :host([appearance="outline"]) { --_eb: var(--sav-color-bg); }
      :host([auto-text]) .b { color: ${AUTO_TEXT}; }
    `];
    connectedCallback() { if (!this.shadowRoot.firstChild) { this.shadowRoot.innerHTML = '<span class="b" part="base"><slot></slot></span>'; tiltWatch(this.$('.b')); } }
  }
  props(SavBadge, { variant: String, appearance: String, pill: Boolean, pulse: Boolean, dot: Boolean });
  define('sav-badge', SavBadge);

  /* ================================================================== sav-new-label */

  /** Marks something as new: a badge (default), a diagonal ribbon or a tab in the corner of a card, a dot, or plain text.
      until="2026-12-31" hides it after that day; seen-key hides it for good once the person has clicked what it marks. */
  class SavNewLabel extends SavElement {
    static styles = [VARIANTS, `
      :host { display: inline-flex; vertical-align: middle; --_bb: color-mix(in oklab, var(--_c) var(--sav-fill-opacity, 100%), transparent); --_bf: var(--_on); }
      :host([hidden]) { display: none !important; }
      :host([appearance="soft"]) { --_bb: var(--_c-soft); --_bf: var(--_c-text); }
      .b { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: .3em; padding: .2em .55em; border-radius: var(--sav-radius-sm); overflow: hidden;
           color: var(--text-color, var(--_bf)); font-size: .72em; font-weight: var(--sav-font-weight-bold); line-height: 1.25; white-space: nowrap; letter-spacing: .04em; text-transform: var(--transform, uppercase); }
      .b::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_bb); background-image: var(--sav-sheen, none); box-shadow: var(--sav-badge-shadow, none); transform: rotate(${TILT}); }
      .ic { width: 1.05em; height: 1.05em; flex: none; display: none; }
      :host([sparkle]) .ic { display: block; }
      /* shine: a gloss crosses the label now and then */
      .b::after { content: ""; position: absolute; inset: -20% auto -20% -60%; width: 40%; background: linear-gradient(100deg, transparent, rgb(255 255 255 / .55), transparent); transform: skewX(-18deg); opacity: 0; }
      :host([shine]) .b::after { animation: sav-new-shine calc(3.2s * var(--sav-motion, 1)) ease-in-out infinite; }
      @keyframes sav-new-shine { 0%, 55% { left: -60%; opacity: 0; } 60% { opacity: 1; } 85%, 100% { left: 130%; opacity: 0; } }
      .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
      /* text: just the coloured word, next to a menu item or a heading */
      :host([appearance="text"]) .b { padding: 0; color: var(--text-color, var(--_c-text)); } :host([appearance="text"]) .b::before { display: none; }
      /* dot: a small pulsing dot; the word stays for screen readers */
      :host([appearance="dot"]) .b { width: .55rem; height: .55rem; padding: 0; border-radius: 50%; overflow: visible; }
      :host([appearance="dot"]) .b::before { border-radius: 50%; transform: none; animation: sav-new-dot calc(1.8s * var(--sav-motion, 1)) ease-out infinite; }
      :host([appearance="dot"]) .t, :host([appearance="dot"]) .ic { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
      @keyframes sav-new-dot { 0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--_c) 60%, transparent); } 70%, 100% { box-shadow: 0 0 0 .45rem transparent; } }
      /* corner: a tab in the top-right corner of the parent (give the parent position: relative) */
      :host([appearance="corner"]) { position: absolute; top: var(--offset, .6rem); right: var(--offset, .6rem); z-index: 2; }
      /* ribbon: a band across the top-right corner; it clips itself to the parent's box and corners */
      :host([appearance="ribbon"]) { position: absolute; inset: 0; z-index: 2; display: block; overflow: hidden; border-radius: inherit; pointer-events: none; }
      :host([appearance="ribbon"]) .b { position: absolute; top: 1.15rem; right: -2.35rem; width: 9rem; justify-content: center; padding: .3em 0; border-radius: 0; transform: rotate(45deg); box-shadow: 0 2px 6px rgb(0 0 0 / .18); overflow: hidden; }
      :host([appearance="ribbon"]) .b::before { transform: none; }
      :host([placement="start"][appearance="ribbon"]) .b { right: auto; left: -2.35rem; transform: rotate(-45deg); }
      :host([placement="start"][appearance="corner"]) { right: auto; left: var(--offset, .6rem); }
      @media (prefers-reduced-motion: reduce) { .b::after, :host([appearance="dot"]) .b::before { animation: none !important; } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${SOLID_EB}; }
      :host([appearance="soft"]) { --_eb: ${SOFT_EB}; }
      :host(:is([appearance="text"], [appearance="dot"])) { --_eb: var(--sav-color-bg); }
      :host([auto-text]) .b { color: ${AUTO_TEXT}; }
    `];
    static get observedAttributes() { return ['until', 'seen-key']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = `<span class="b" part="base">${svgIcon('sparkles', 'ic')}<span class="t" part="label"><slot>${esc(T(this, 'New'))}</slot></span></span>`;
        tiltWatch(this.$('.b'));
      }
      this.check();
      // seen-key: the first click on what the label marks (its parent) hides it for good
      const key = this.getAttribute('seen-key');
      if (key && this.parentElement && !this._seenOn) {
        this._seenOn = this.parentElement;
        this._seen = () => { try { localStorage.setItem('sav-seen:' + key, '1'); } catch {} this.hidden = true; this.emit('sav-seen', { key }); };
        this._seenOn.addEventListener('click', this._seen, { once: true });
      }
    }
    disconnectedCallback() { this._seenOn?.removeEventListener('click', this._seen); this._seenOn = null; }
    changed() { this.check(); }
    /** Hidden once the date in until has passed, or once seen. */
    check() {
      const until = this.getAttribute('until'), key = this.getAttribute('seen-key');
      let gone = false;
      if (until) { const end = new Date(until.length <= 10 ? until + 'T23:59:59' : until); gone = !isNaN(end) && Date.now() > end.getTime(); }
      if (key) { try { gone ||= localStorage.getItem('sav-seen:' + key) === '1'; } catch {} }
      this.hidden = gone;
    }
    /** Shows it again (forgets that it was seen). */
    reset() { const key = this.getAttribute('seen-key'); try { key && localStorage.removeItem('sav-seen:' + key); } catch {} this.check(); }
  }
  props(SavNewLabel, { variant: String, appearance: String, placement: String, sparkle: Boolean, shine: Boolean });
  define('sav-new-label', SavNewLabel);

  /* ================================================================== sav-tag */

  class SavTag extends SavElement {
    static styles = [VARIANTS, SIZES, `
      :host { display: inline-flex; vertical-align: middle; --_c: var(--sav-color-neutral); }
      :host([variant="primary"]) { --_c: var(--sav-color-primary); }
      :host { --_tb: var(--_c-soft); --_tf: var(--_c-text); --_tbd: var(--_c-line); }
      :host([appearance="solid"]) { --_tb: var(--_c); --_tf: var(--_on); --_tbd: transparent; }
      .t { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: .35em; height: calc(var(--_h) * .72); padding: 0 .65em;
           border-radius: var(--sav-radius); color: var(--text-color, var(--_tf));
           font-size: calc(var(--_fs) * .9); font-weight: var(--sav-font-weight-semibold); white-space: nowrap; }
      .t::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_tb); background-image: var(--sav-sheen, none); border: var(--sav-border-width) solid var(--sav-ink-border, var(--_tbd)); -webkit-backdrop-filter: var(--sav-button-backdrop, none); backdrop-filter: var(--sav-button-backdrop, none); transform: rotate(${TILT}); }
      :host([pill]) .t { border-radius: var(--sav-radius-pill); }
      .x { display: inline-flex; padding: 1px; margin: 0 -.3em 0 0; border: 0; border-radius: 50%; background: none; color: inherit; cursor: pointer; opacity: .7; }
      .x:hover { opacity: 1; background: var(--_c-soft); }
      .x svg { width: 1em; height: 1em; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${SOFT_EB}; }
      :host([appearance="solid"]) { --_eb: ${SOLID_EB}; }
      :host([auto-text]) .t { color: ${AUTO_TEXT}; }
      /* animation: changes of colour and state ease in (paced by --sav-motion) */
      .t { transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), color calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .t button, .t .x { transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), color calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.15s * var(--sav-motion, 1)); }
    `];
    connectedCallback() { if (!this.shadowRoot.firstChild) this.render(); }
    changed(n) { if (n === 'removable') this.render(); }
    render() {
      this.shadowRoot.innerHTML = `<span class="t" part="base"><slot name="prefix"></slot><span part="content"><slot></slot></span>${this.removable ? `<button class="x" part="remove-button" aria-label="${esc(this.getAttribute('remove-label') || T(this, 'Remove'))}">${svgIcon('x')}</button>` : ''}</span>`;
      this.$('.x')?.addEventListener('click', () => { if (this.emit('sav-remove', {}, true)) this.remove(); });
      tiltWatch(this.$('.t'));
    }
  }
  props(SavTag, { variant: String, appearance: String, size: String, pill: Boolean, removable: Boolean });
  define('sav-tag', SavTag);

  /* ================================================================== sav-alert */

  const VARIANT_ICON = { primary: 'info', neutral: 'info', success: 'check-circle', warning: 'alert-triangle', danger: 'alert-circle', protected: 'shield' };

  class SavAlert extends SavElement {
    static styles = [VARIANTS, `
      :host { display: block; }
      :host { --_ab: color-mix(in oklab, var(--_c) 9%, var(--sav-color-surface)); --_abd: var(--_c-line); --_af: var(--sav-color-text); }
      :host([appearance="solid"]) { --_ab: var(--_c); --_abd: transparent; --_af: var(--_on); }
      :host([appearance="outline"]) { --_ab: var(--sav-color-surface); }
      .a { position: relative; isolation: isolate; display: flex; gap: .75rem; align-items: flex-start; padding: .9rem 1rem; border-radius: var(--sav-radius);
           color: var(--_af); font-size: var(--sav-font-size-md); line-height: 1.5; }
      /* background, border and shadow on a layer that the tilt shape rotates a little */
      .a::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_ab); background-image: var(--sav-sheen, none); border: var(--sav-border-width) solid var(--_abd);
           box-shadow: var(--sav-alert-shadow, none); -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none);
           transform: rotate(${TILT}); }
      :host([appearance="accent"]) .a { border-radius: var(--sav-radius-sm); }
      :host([appearance="accent"]) .a::before { border-width: 0 0 0 4px; border-color: var(--_c); }
      .ic { color: var(--_c); margin-top: .1em; display: flex; }
      :host([appearance="solid"]) .ic { color: inherit; }
      .ic svg, ::slotted([slot="icon"]) { width: 1.25em; height: 1.25em; font-size: 1.25em; }
      :host([noicon]) .ic { display: none; }
      .body { flex: 1; min-width: 0; }
      .h { display: none; font-weight: var(--sav-font-weight-bold); margin-bottom: .15rem; }
      .has-heading .h { display: block; }
      .x { display: inline-flex; margin: -.2rem -.35rem 0 0; padding: .25rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: inherit; cursor: pointer; opacity: .6; }
      .x:hover { opacity: 1; background: var(--_c-soft); }
      .x svg { width: 1.1em; height: 1.1em; }
      :host([toast]) { --_ab: var(--sav-color-surface); --_abd: var(--sav-color-border); }
      :host([toast]) .a { box-shadow: var(--sav-panel-shadow, var(--sav-shadow-lg)); overflow: hidden; }
      :host([toast]) .a::before { transform: none; }
      :host([toast]) .a::after { content: ""; position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; background: var(--_c); transform-origin: left; animation: sav-countdown var(--_dur, 0ms) linear forwards; }
      :host([toast]:not([duration])) .a::after, :host([toast][duration="0"]) .a::after { display: none; }
      /* the countdown stops while the toast waits: under the mouse, or under a finger */
      :host([data-paused]) .a::after { animation-play-state: paused; }
      @keyframes sav-countdown { to { transform: scaleX(0); } }
      /* phones: a swipe to the side closes the toast (the page still scrolls up and down over it); a close button big enough for a finger */
      :host([toast]) { touch-action: pan-y; }
      @media (max-width: 640px) { :host([toast]) .x { padding: .55rem; margin: -.55rem -.7rem -.55rem 0; } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: color-mix(in oklab, var(--_c) 9%, var(--sav-color-bg)); }
      :host([appearance="solid"]) { --_eb: var(--_c); }
      :host(:is([appearance="outline"], [toast])) { --_eb: var(--sav-color-bg); }
      :host([auto-text]) .a { color: ${AUTO_TEXT}; }
    `];
    connectedCallback() {
      if (!this.shadowRoot.firstChild) this.render();
      if (this.hasAttribute('toast') && !this._swipeOn) { this._swipeOn = true; this.addEventListener('pointerdown', (e) => this.swipe(e)); }
      this.armTimer();
    }
    disconnectedCallback() { clearTimeout(this._t); }
    changed(n) { if (n === 'duration') this.armTimer(); else this.render(); }
    render() {
      const variant = this.variant || 'primary';
      const role = variant === 'danger' || variant === 'warning' ? 'alert' : 'status';
      this.shadowRoot.innerHTML = `<div class="a" part="base" role="${role}">
        <span class="ic" part="icon"><slot name="icon">${svgIcon(VARIANT_ICON[variant] || 'info')}</slot></span>
        <div class="body" part="message"><div class="h" part="heading"><slot name="heading"></slot><span class="ht"></span></div><slot></slot></div>
        ${this.closable ? `<button class="x" part="close-button" aria-label="${esc(this.getAttribute('close-label') || T(this, 'Close'))}">${svgIcon('x')}</button>` : ''}
      </div>`;
      const heading = this.getAttribute('heading');
      this.$('.ht').textContent = heading || '';
      this.$('.a').classList.toggle('has-heading', !!heading || this.hasSlot('heading'));
      this.$('.x')?.addEventListener('click', () => this.close());
      tiltWatch(this.$('.a'));
    }
    armTimer() {
      clearTimeout(this._t);
      this._t = 0;
      this._left = null;
      this.removeAttribute('data-paused');
      const d = Number(this.duration);
      if (!d) return;
      this.style.setProperty('--_dur', d + 'ms');
      this._left = d;
      // the mouse only: on a touch screen a tap would leave it paused (no pointer leaves after a tap); a finger pauses it in swipe()
      this.onpointerenter = (e) => { if (e.pointerType === 'mouse') this.pause(); };
      this.onpointerleave = (e) => { if (e.pointerType === 'mouse') this.resume(); };
      this.resume();
    }
    /** Stops the countdown (it goes on from there with resume()). */
    pause() {
      if (!this._t) return;
      clearTimeout(this._t);
      this._t = 0;
      this._left -= Date.now() - this._start;
      this.setAttribute('data-paused', '');
    }
    resume() {
      if (this._t || this._left == null) return;
      this.removeAttribute('data-paused');
      this._start = Date.now();
      this._t = setTimeout(() => this.close(), Math.max(0, this._left));
    }
    /** Touch screens: the toast follows the finger sideways; far enough (or fast) it goes away, otherwise it comes back. */
    swipe(e) {
      if (e.pointerType === 'mouse' || !e.isPrimary || e.composedPath().some((n) => n.classList?.contains('x'))) return;
      const x0 = e.clientX, y0 = e.clientY, t0 = e.timeStamp, w = this.offsetWidth || 1;
      let dx = 0, side = false, done = false;
      this.pause();
      const move = (m) => {
        dx = m.clientX - x0;
        if (!side && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(m.clientY - y0)) side = true;
        if (side) { this.style.transform = `translateX(${dx}px)`; this.style.opacity = String(Math.max(0.15, 1 - Math.abs(dx) / w)); }
      };
      const up = (u) => {
        if (done) return;
        done = true;
        removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
        const fast = Math.abs(dx) / Math.max(1, (u?.timeStamp || t0) - t0) > 0.5;
        if (side && (Math.abs(dx) > w * 0.35 || (fast && Math.abs(dx) > 30)) && this.close(dx > 0 ? 1 : -1)) return;
        const t = 180 * motion(this);
        this.style.transition = `transform ${t}ms var(--sav-easing), opacity ${t}ms`;
        requestAnimationFrame(() => { this.style.transform = ''; this.style.opacity = ''; });
        setTimeout(() => { this.style.transition = ''; }, t + 20);
        this.resume();
      };
      addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
    }
    /** Closes it (a toast goes away to the side: dir 1 right, -1 left, after a swipe). False when sav-close was cancelled. */
    close(dir) {
      if (!this.emit('sav-close', {}, true)) return false;
      if (this.hasAttribute('toast')) {
        clearTimeout(this._t);
        const from = { opacity: this.style.opacity || 1, transform: this.style.transform || 'none' };
        const to = { opacity: 0, transform: dir ? `translateX(${dir * 110}%)` : 'translateX(12px)' };
        this.animate([from, to], { duration: 180 * motion(this), easing: 'ease-in', fill: 'forwards' }).onfinish = () => this.remove();
      } else this.hidden = true;
      return true;
    }
  }
  props(SavAlert, { variant: String, appearance: String, heading: String, closable: Boolean, noicon: Boolean, duration: Number });
  define('sav-alert', SavAlert);

  /* ================================================================== toasts */

  class SavToastStack extends SavElement {
    static styles = `
      :host { position: fixed; z-index: 2147483000; inset: auto 1rem 1rem auto; display: flex; flex-direction: column; gap: .6rem; width: min(380px, calc(100vw - 2rem)); pointer-events: none; margin: 0; padding: 0; border: 0; background: none; overflow: visible; }
      :host([placement="top-end"]) { inset: 1rem 1rem auto auto; flex-direction: column-reverse; }
      :host([placement="top-center"]) { inset: 1rem auto auto 50%; transform: translateX(-50%); flex-direction: column-reverse; }
      :host([placement="bottom-center"]) { inset: auto auto 1rem 50%; transform: translateX(-50%); }
      :host([placement="bottom-start"]) { inset: auto auto 1rem 1rem; }
      :host([placement="top-start"]) { inset: 1rem auto auto 1rem; flex-direction: column-reverse; }
      ::slotted(*) { pointer-events: auto; }
      /* phones: across the screen whatever the corner (start and end mean little there), clear of the notch and the home bar;
         the three newest toasts at most, so they never cover the page (the older ones still close on their own time) */
      @media (max-width: 640px) {
        :host, :host([placement]) { --_g: .75rem; width: auto; transform: none;
          inset: auto calc(var(--_g) + env(safe-area-inset-right)) calc(var(--_g) + env(safe-area-inset-bottom)) calc(var(--_g) + env(safe-area-inset-left)); }
        :host([placement^="top"]) { inset: calc(var(--_g) + env(safe-area-inset-top)) calc(var(--_g) + env(safe-area-inset-right)) auto calc(var(--_g) + env(safe-area-inset-left)); }
        ::slotted(:nth-last-child(n+4)) { display: none; }
      }
    `;
    connectedCallback() {
      this.shadowRoot.innerHTML = '<slot></slot>';
      if (supportsPopover) { this.setAttribute('popover', 'manual'); }
    }
  }
  define('sav-toast-stack', SavToastStack);

  /**
   * Sav.toast('Saved', {variant: 'success', heading, duration: 4000, closable: true, placement: 'bottom-end'})
   * Returns the sav-alert element.
   */
  Sav.toast = (message, opts = {}) => {
    const placement = opts.placement || Sav.toast.placement || 'bottom-end';
    let stack = document.querySelector(`sav-toast-stack[placement="${placement}"]`);
    if (!stack) {
      stack = document.createElement('sav-toast-stack');
      stack.setAttribute('placement', placement);
      document.body.append(stack);
    }
    const t = document.createElement('sav-alert');
    t.setAttribute('toast', '');
    t.variant = opts.variant || 'primary';
    if (opts.heading) t.heading = opts.heading;
    if (opts.closable !== false) t.closable = true;
    t.duration = opts.duration === undefined ? 4500 : opts.duration;
    if (opts.icon) { const i = document.createElement('sav-icon'); i.name = opts.icon; i.slot = 'icon'; t.append(i); }
    t.append(document.createTextNode(message));
    stack.append(t);
    // bring the stack above open dialogs
    if (supportsPopover) { if (stack.matches(':popover-open')) stack.hidePopover(); stack.showPopover(); }
    // it comes in from the edge it sits against: from below at the bottom, from above at the top
    const dy = placement.startsWith('top') ? -10 : 10;
    t.animate([{ opacity: 0, transform: `translateY(${dy}px) scale(.98)` }, { opacity: 1, transform: 'none' }], { duration: 220 * motion(t), easing: 'cubic-bezier(.2,.7,.3,1)' });
    return t;
  };

  /* ================================================================== sav-card */

  class SavCard extends SavElement {
    static styles = `
      :host { display: block; position: relative; isolation: isolate; }
      /* a tinted layer that peeks out behind the card (shown by the tilt shape) */
      .back { display: var(--sav-card-back, none); position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius-lg);
              background: color-mix(in oklab, var(--sav-color-primary) 16%, transparent); transform: rotate(var(--sav-card-tilt, calc(${TILT} * -2.2))); transition: transform calc(.3s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([interactive]:hover) .back { transform: rotate(calc(var(--sav-card-tilt, calc(${TILT} * -2.2)) * -1.4)); }
      .c { position: relative; display: flex; flex-direction: column; height: 100%; overflow: hidden; background: var(--sav-color-surface); background-image: var(--sav-sheen, none); color: var(--sav-color-text);
           border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius-lg); box-shadow: var(--sav-shadow-sm);
           -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none);
           transition: box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)); }
      :host([appearance="elevated"]) .c { border-color: transparent; box-shadow: var(--sav-shadow); }
      :host([appearance="flat"]) .c { box-shadow: none; background: var(--sav-color-surface-2); border-color: transparent; }
      :host([interactive]) .c { cursor: pointer; }
      :host([interactive]:hover) .c { transform: translateY(-2px); box-shadow: var(--sav-shadow); border-color: var(--sav-color-border-strong); }
      .media, .head, .foot { display: none; }
      .has-media .media { display: block; } .has-head .head { display: block; } .has-foot .foot { display: block; }
      ::slotted([slot="media"]) { display: block; width: 100%; object-fit: cover; }
      .head { padding: 1rem var(--sav-card-padding, 1.25rem) 0; font-weight: var(--sav-font-weight-bold); font-size: var(--sav-font-size-lg); }
      .body { flex: 1; padding: var(--sav-card-padding, 1.25rem); }
      .foot { padding: .85rem var(--sav-card-padding, 1.25rem); border-top: var(--sav-border-width) solid var(--sav-color-border); background: color-mix(in oklab, var(--sav-color-surface-2) 55%, transparent); }
    `;
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<div class="back" part="back"></div><div class="c" part="base"><div class="media" part="media"><slot name="media"></slot></div><div class="head" part="header"><slot name="header"></slot></div><div class="body" part="body"><slot></slot></div><div class="foot" part="footer"><slot name="footer"></slot></div></div>`;
      const sync = () => {
        const c = this.$('.c');
        c.classList.toggle('has-media', this.hasSlot('media'));
        c.classList.toggle('has-head', this.hasSlot('header'));
        c.classList.toggle('has-foot', this.hasSlot('footer'));
      };
      this.$$('slot').forEach((s) => s.addEventListener('slotchange', sync));
      sync();
      tiltWatch(this.$('.c'), this.$('.back'));
    }
  }
  props(SavCard, { appearance: String, interactive: Boolean });
  define('sav-card', SavCard);

  /* ================================================================== sav-avatar */

  class SavAvatar extends SavElement {
    static delegatesFocus = true; // with href or button, focus() and the popover's "focus back" reach the inner link or button; otherwise nothing is focusable
    static styles = [VARIANTS, `
      :host { display: inline-flex; vertical-align: middle; --size: 2.5rem; --_c: var(--sav-color-neutral);
              --_ar: var(--sav-avatar-radius, 50%); --_at: var(--sav-avatar-tilt, 0deg); --_ai: var(--sav-avatar-inset, 0%); --_is: var(--sav-avatar-img-scale, 1); }
      :host([variant="primary"]) { --_c: var(--sav-color-primary); }
      :host([size="sm"]) { --size: 2rem; } :host([size="lg"]) { --size: 3.5rem; } :host([size="xl"]) { --size: 5rem; }
      :host([shape="circle"]) { --_ar: 50%; --_at: 0deg; --_ai: 0%; --_is: 1; }
      :host([shape="rounded"]) { --_ar: var(--sav-radius); --_at: 0deg; --_ai: 0%; --_is: 1; }
      :host([shape="square"]), :host([shape="squared"]) { --_ar: 0; --_at: 0deg; --_ai: 0%; --_is: 1; }
      /* tilt: a square leaning 10°, like the saveriomorelli.com icon; initials and picture stay upright */
      :host([shape="tilt"]) { --_ar: 0; --_at: 10deg; --_ai: 7%; --_is: 1.32; }
      .a { position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; width: var(--size); height: var(--size);
           color: var(--_c-text); font-size: calc(var(--size) * .38); font-weight: var(--sav-font-weight-bold); user-select: none; flex: none; }
      /* --ring: a ring drawn on the shape itself (leaning square in Tilt, circle, rounded), e.g. to separate stacked avatars */
      .a::before { content: ""; position: absolute; inset: var(--_ai); z-index: -1; border-radius: var(--_ar); background: var(--_c-soft-hover); transform: rotate(var(--_at)); box-shadow: ${INK()}, ${INK_DROP()}, var(--ring, 0 0 0 0 transparent); }
      .ph::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: ${INK()}; pointer-events: none; }
      .ph { position: absolute; inset: var(--_ai); overflow: hidden; border-radius: var(--_ar); transform: rotate(var(--_at)); box-shadow: var(--ring, none); }
      img { width: 100%; height: 100%; object-fit: cover; display: block; transform: rotate(calc(var(--_at) * -1)) scale(var(--_is)); }
      svg { width: 55%; height: 55%; }
      /* href / button: the avatar is a link or a button. Hover draws a ring on its own shape (leaning square in Tilt, circle…),
         the keyboard the focus ring, on the same shape: no other box around it */
      a.a, button.a { margin: 0; padding: 0; border: 0; background: none; font: inherit; font-size: calc(var(--size) * .38); text-decoration: none; cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent; }
      a.a::after, button.a::after { content: ""; position: absolute; inset: var(--_ai); border-radius: var(--_ar); transform: rotate(var(--_at)); pointer-events: none;
        box-shadow: 0 0 0 0 transparent; transition: box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)) var(--sav-easing); }
      a.a:hover::after, button.a:hover::after { box-shadow: 0 0 0 3px color-mix(in oklab, var(--_c) 45%, transparent); }
      a.a:focus-visible::after, button.a:focus-visible::after { box-shadow: 0 0 0 var(--sav-focus-width, 2px) var(--sav-color-bg), 0 0 0 calc(var(--sav-focus-width, 2px) * 2) var(--sav-color-focus, var(--sav-color-primary)); }
      a.a:active, button.a:active { transform: scale(.96); }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: color-mix(in oklab, var(--_c) 22%, var(--sav-color-bg)); }
      :host([auto-text]) .a { color: ${AUTO_TEXT}; }
    `];
    connectedCallback() { this.render(); }
    changed() { this.render(); }
    render() {
      const label = this.label || '';
      const initials = this.initials || label.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
      const fallback = initials ? esc(initials) : svgIcon('user');
      const inner = this.image ? `<span class="ph"><img part="image" alt="" src="${esc(this.image)}"></span>` : `<slot name="icon">${fallback}</slot>`;
      const name = esc(label || T(this, 'Avatar'));
      // a link (href) or a button (button): the name of the person is the name of the control
      const href = this.getAttribute('href');
      if (href !== null) {
        const target = this.getAttribute('target');
        this.shadowRoot.innerHTML = `<a class="a" part="base" href="${esc(href)}"${target ? ` target="${esc(target)}"${target === '_blank' ? ' rel="noopener"' : ''}` : ''} aria-label="${name}"><span aria-hidden="true" style="display:contents">${inner}</span></a>`;
      } else if (this.hasAttribute('button')) {
        this.shadowRoot.innerHTML = `<button type="button" class="a" part="base" aria-label="${name}"><span aria-hidden="true" style="display:contents">${inner}</span></button>`;
      } else this.shadowRoot.innerHTML = `<span class="a" part="base" role="img" aria-label="${name}">${inner}</span>`;
      const img = this.$('img');
      if (img) img.onerror = () => { this.$('.ph').replaceWith(document.createRange().createContextualFragment(fallback)); };
    }
  }
  props(SavAvatar, { image: String, label: String, initials: String, shape: String, size: String, variant: String, href: String, target: String, button: Boolean });
  define('sav-avatar', SavAvatar);

  /* ================================================================== sav-spinner */

  class SavSpinner extends SavElement {
    /* Two looks, picked by the style: a ring with a running arc (its corners follow --sav-spinner-radius, so Sharp spins a
       square), or, with --sav-spinner-tiles: 1 (Tilt), the four leaning tiles of the logo lighting up in turn. */
    static styles = [VARIANTS, `
      :host { display: inline-flex; position: relative; width: 1em; height: 1em; vertical-align: -.125em; --track-width: 2.5px; }
      .b, svg { position: absolute; inset: 0; width: 100%; height: 100%; }
      svg { overflow: visible; }
      .ring { opacity: calc(1 - var(--sav-spinner-tiles, 0)); animation: sav-spin calc(.8s * var(--sav-motion, 1)) linear infinite; }
      .ring rect { fill: none; stroke-width: var(--track-width); rx: var(--sav-spinner-radius, 9.5px); }
      .tr { stroke: var(--_c-soft-hover); }
      .in { stroke: oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h); stroke-linecap: var(--sav-ring-cap, round); stroke-dasharray: 22 58; }
      .tiles { opacity: var(--sav-spinner-tiles, 0); }
      .tiles rect { fill: oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h); opacity: .3; animation: sav-tile calc(1s * var(--sav-motion, 1)) var(--sav-easing) infinite; }
      .tiles .t2 { fill: color-mix(in oklab, var(--_c) 60%, #fff); animation-delay: calc(.25s * var(--sav-motion, 1)); }
      .tiles .t3 { animation-delay: calc(.5s * var(--sav-motion, 1)); } .tiles .t4 { animation-delay: calc(.75s * var(--sav-motion, 1)); }
      @keyframes sav-spin { to { transform: rotate(360deg); } }
      @keyframes sav-tile { 0%, 100% { opacity: .3; } 25% { opacity: 1; } }
      /* variant="current": the colour of the text around it (inside a button, a link, a badge) */
      :host([variant="current"]) .tr { stroke: color-mix(in oklab, currentColor 25%, transparent); }
      :host([variant="current"]) .in, :host([variant="current"]) .tiles rect { stroke: currentColor; fill: currentColor; }
      :host([variant="current"]) .in { fill: none; }
      :host([variant="current"]) .tiles .t2 { fill: color-mix(in oklab, currentColor 60%, transparent); }
      @media (prefers-reduced-motion: reduce) { .ring { animation-duration: calc(2.4s * var(--sav-motion, 1)); } .tiles rect { animation-duration: calc(3s * var(--sav-motion, 1)); } }
    `];
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.setAttribute('role', 'progressbar');
      if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Loading'));
      this.shadowRoot.innerHTML = `<span class="b" part="base">`
        + `<svg class="ring" viewBox="0 0 24 24" aria-hidden="true"><rect class="tr" x="2.5" y="2.5" width="19" height="19" rx="9.5"/><rect class="in" x="2.5" y="2.5" width="19" height="19" rx="9.5" pathLength="80"/></svg>`
        + `<svg class="tiles" viewBox="0 0 24 24" aria-hidden="true"><g transform="rotate(10 12 12)"><rect class="t1" x="3.8" y="3.8" width="7.8" height="7.8"/><rect class="t2" x="13.2" y="3" width="7.8" height="7.8"/>`
        + `<rect class="t3" x="12.4" y="12.4" width="7.8" height="7.8"/><rect class="t4" x="3.8" y="12.4" width="7.8" height="7.8"/></g></svg></span>`;
    }
  }
  props(SavSpinner, { variant: String });
  define('sav-spinner', SavSpinner);

  /* ================================================================== sav-progress-bar */

  class SavProgressBar extends SavElement {
    static styles = [VARIANTS, `
      :host { display: block; --height: .6rem; }
      .t { position: relative; height: var(--height); border-radius: var(--sav-radius-pill); background: var(--sav-color-surface-2); overflow: hidden; box-shadow: var(--sav-track-shadow, inset 0 0 0 1px var(--sav-color-border)); -webkit-backdrop-filter: var(--sav-button-backdrop, none); backdrop-filter: var(--sav-button-backdrop, none); }
      /* the value on the bar is always black or white, whichever is readable on the bar (WCAG); --text-color sets it by hand */
      .i { --_fill: oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h); height: 100%; width: var(--_v, 0%); border-radius: inherit; background: var(--_fill); background-image: var(--sav-sheen, none); transform: skewX(calc(var(--sav-tilt, 0deg) * 4)); transform-origin: left;
           --_eb: var(--_fill); color: ${AUTO_TEXT}; transition: width calc(.35s * var(--sav-motion, 1)) var(--sav-easing);
           display: flex; align-items: center; justify-content: flex-end; padding-right: .5em; font-size: calc(var(--height) * .7); font-weight: var(--sav-font-weight-bold); white-space: nowrap; overflow: hidden; }
      :host([striped]) .i { background-image: linear-gradient(45deg, rgb(255 255 255 / .2) 25%, transparent 25% 50%, rgb(255 255 255 / .2) 50% 75%, transparent 75%); background-size: 1rem 1rem; animation: sav-stripes calc(1s * var(--sav-motion, 1)) linear infinite; }
      :host([indeterminate]) .i { width: 40%; position: absolute; animation: sav-indet calc(1.4s * var(--sav-motion, 1)) var(--sav-easing) infinite; }
      .head { display: none; justify-content: space-between; margin-bottom: .35rem; font-size: var(--sav-font-size-sm); color: var(--sav-color-text); }
      .has-head .head { display: flex; } .head .v { color: var(--sav-color-text-muted); font-variant-numeric: tabular-nums; }
      @keyframes sav-indet { from { left: -40%; } to { left: 100%; } }
      @keyframes sav-stripes { to { background-position: 1rem 0; } }
    `];
    connectedCallback() {
      if (!this.shadowRoot.firstChild) this.shadowRoot.innerHTML = `<div class="w"><div class="head" part="label"><span class="l"></span><span class="v"></span></div><div class="t" part="base" role="progressbar"><div class="i" part="indicator"><slot></slot></div></div></div>`;
      this.sync();
    }
    changed() { this.sync(); }
    sync() {
      const max = this.max || 100, v = Math.max(0, Math.min(Number(this.value) || 0, max));
      const pct = (v / max) * 100;
      this.$('.i').style.setProperty('--_v', pct + '%');
      const t = this.$('.t');
      t.setAttribute('aria-valuemin', '0'); t.setAttribute('aria-valuemax', String(max));
      if (this.indeterminate) t.removeAttribute('aria-valuenow'); else t.setAttribute('aria-valuenow', String(v));
      const label = this.getAttribute('label') || '';
      t.setAttribute('aria-label', label || T(this, 'Progress'));
      this.$('.l').textContent = label;
      this.$('.v').textContent = this.showValue && !this.indeterminate ? Math.round(pct) + '%' : '';
      this.$('.w').classList.toggle('has-head', !!label || (this.showValue && !this.indeterminate));
    }
  }
  props(SavProgressBar, { value: Number, max: Number, indeterminate: Boolean, striped: Boolean, showValue: Boolean, label: String, variant: String });
  define('sav-progress-bar', SavProgressBar);

  /* ================================================================== sav-progress-ring */

  class SavProgressRing extends SavElement {
    static styles = [VARIANTS, `
      :host { display: inline-flex; --size: 4rem; --track-width: 6px; position: relative; vertical-align: middle; }
      /* a rounded square: a circle by default, a square in Sharp and Tilt (--sav-ring-radius), leaning in Tilt (--sav-ring-tilt); the number stays upright */
      svg { width: var(--size); height: var(--size); overflow: visible; transform: rotate(var(--sav-ring-tilt, 0deg)); }
      rect { fill: none; stroke-width: var(--track-width); rx: var(--sav-ring-radius, 42px); }
      .tr { stroke: var(--sav-color-surface-2); }
      /* the arc starts at the top centre whatever the corners: --sav-ring-start is how far along the outline that is (in hundredths).
         Length and start are written as SVG attributes by sync(): Safari ignores calc() in stroke-dasharray and would draw the whole outline. */
      .in { stroke: oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h); stroke-linecap: var(--sav-ring-cap, round); stroke-linejoin: miter; transition: stroke-dasharray calc(.4s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([data-empty]) .in { visibility: hidden; }
      .lab { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: calc(var(--size) * .24); font-weight: var(--sav-font-weight-bold); font-variant-numeric: tabular-nums; color: var(--sav-color-text); }
    `];
    connectedCallback() {
      if (!this.shadowRoot.firstChild) this.shadowRoot.innerHTML = `<svg viewBox="0 0 100 100" part="base" role="progressbar"><rect class="tr" x="8" y="8" width="84" height="84" rx="42"/><rect class="in" x="8" y="8" width="84" height="84" rx="42" pathLength="100"/></svg><span class="lab" part="label"><slot></slot></span>`;
      this.sync();
    }
    changed() { this.sync(); }
    sync() {
      const v = Math.max(0, Math.min(Number(this.value) || 0, 100));
      const start = parseFloat(getComputedStyle(this).getPropertyValue('--sav-ring-start')) || 0;
      const arc = this.$('.in'); arc.setAttribute('stroke-dasharray', `${v} ${100 - v}`); arc.setAttribute('stroke-dashoffset', String(-start));
      this.toggleAttribute('data-empty', v === 0);
      const s = this.$('svg');
      s.setAttribute('aria-valuenow', String(v)); s.setAttribute('aria-valuemin', '0'); s.setAttribute('aria-valuemax', '100');
      s.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Progress'));
    }
  }
  props(SavProgressRing, { value: Number, variant: String });
  define('sav-progress-ring', SavProgressRing);

  /* ================================================================== sav-divider */

  class SavDivider extends SavElement {
    static styles = `
      :host { display: block; margin: var(--spacing, 1rem) 0; color: var(--sav-color-text-muted); }
      .d { display: flex; align-items: center; gap: .75rem; font-size: var(--sav-font-size-sm); }
      .d::before, .d::after { content: ""; flex: 1; border-top: var(--sav-border-width) solid var(--sav-color-border); }
      .d:not(.has-label)::after { display: none; }
      :host([vertical]) { display: inline-block; align-self: stretch; margin: 0 var(--spacing, .75rem); height: auto; min-height: 1em; vertical-align: middle; }
      :host([vertical]) .d { height: 100%; } :host([vertical]) .d::before { border-top: 0; border-left: var(--sav-border-width) solid var(--sav-color-border); height: 100%; flex: none; }
    `;
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.setAttribute('role', 'separator');
      if (this.vertical) this.setAttribute('aria-orientation', 'vertical');
      this.shadowRoot.innerHTML = '<div class="d" part="base"><slot></slot></div>';
      this.$('.d').classList.toggle('has-label', this.hasSlot());
    }
  }
  props(SavDivider, { vertical: Boolean });
  define('sav-divider', SavDivider);

  /* ================================================================== sav-skeleton */

  class SavSkeleton extends SavElement {
    static styles = `
      :host { display: block; height: 1em; width: 100%; --color: var(--sav-color-surface-2); --sheen: color-mix(in oklab, var(--sav-color-surface-2), var(--sav-color-text) 8%); }
      .s { width: 100%; height: 100%; border-radius: var(--sav-radius-sm); background: var(--color); }
      /* the round placeholder of an avatar takes the avatar's shape of the style (a leaning square in Tilt, a square in Sharp) */
      :host([shape="circle"]) .s { border-radius: var(--sav-avatar-radius, 50%); transform: rotate(var(--sav-avatar-tilt, 0deg)); margin: var(--sav-avatar-inset, 0%);
        width: calc(100% - 2 * var(--sav-avatar-inset, 0%)); height: calc(100% - 2 * var(--sav-avatar-inset, 0%)); } :host([shape="rect"]) .s { border-radius: var(--sav-radius); }
      :host(:not([effect])) .s, :host([effect="sheen"]) .s { background: linear-gradient(90deg, var(--color) 30%, var(--sheen) 50%, var(--color) 70%); background-size: 300% 100%; animation: sav-sheen calc(1.6s * var(--sav-motion, 1)) ease-in-out infinite; }
      :host([effect="pulse"]) .s { animation: sav-pulse-o calc(1.4s * var(--sav-motion, 1)) ease-in-out infinite; }
      :host([effect="none"]) .s { animation: none; background: var(--color); }
      @keyframes sav-sheen { from { background-position: 100% 0; } to { background-position: 0 0; } }
      @keyframes sav-pulse-o { 50% { opacity: .45; } }
      @media (prefers-reduced-motion: reduce) { .s { animation: none !important; } }
    `;
    connectedCallback() { if (!this.shadowRoot.firstChild) { this.shadowRoot.innerHTML = '<div class="s" part="base"></div>'; this.setAttribute('aria-hidden', 'true'); } }
  }
  props(SavSkeleton, { shape: String, effect: String });
  define('sav-skeleton', SavSkeleton);

  /* ================================================================== sav-input */

  class SavInput extends SavFormControl {
    static styles = [SIZES, FIELD, `
      .clearable .clear.show, .pw .eye { display: inline-flex; }
      input[type="search"]::-webkit-search-cancel-button { display: none; }
      input[type="number"]::-webkit-inner-spin-button { opacity: .5; }
    `];
    static NATIVE = ['placeholder', 'minlength', 'maxlength', 'min', 'max', 'step', 'pattern', 'autocomplete', 'inputmode', 'readonly', 'autofocus', 'spellcheck', 'enterkeyhint', 'list'];
    static get observedAttributes() { return [...FC, 'label', 'help', 'value', 'type', 'clearable', 'password-toggle', ...SavInput.NATIVE]; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('in');
      this.shadowRoot.innerHTML = `<div class="w" part="form-control">
        <label class="lbl" part="label" for="${id}"><slot name="label"></slot><span class="lbl-text"></span></label>
        <div class="box" part="base"><slot name="prefix"></slot>
          <input class="ctl" part="input" id="${id}">
          <button type="button" class="ibtn clear" part="clear-button" tabindex="-1" aria-label="${esc(T(this, 'Clear'))}">${svgIcon('x')}</button>
          <button type="button" class="ibtn eye" part="password-toggle-button" aria-label="${esc(T(this, 'Show password'))}">${svgIcon('eye')}</button>
          <slot name="suffix"></slot></div>
        <div class="help" part="help-text" id="${id}-h"><slot name="help"></slot><span class="help-text"></span></div>
      </div>`;
      const input = (this.native = this.$('input'));
      this._default = this.getAttribute('value') ?? '';
      input.value = this._default;
      input.addEventListener('input', () => this.onValue());
      input.addEventListener('change', () => { this.markTouched(); this.emit('change'); });
      input.addEventListener('blur', () => { if (input.value) this.markTouched(); });
      input.addEventListener('invalid', () => this.markTouched());
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.form && !e.isComposing) { e.preventDefault(); this.form.requestSubmit(); }
      });
      this.$('.clear').addEventListener('click', () => { input.value = ''; this.onValue(); this.emit('sav-clear'); this.emit('input'); input.focus(); });
      this.$('.eye').addEventListener('click', () => {
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        const b = this.$('.eye');
        b.innerHTML = svgIcon(show ? 'eye-off' : 'eye');
        b.setAttribute('aria-label', show ? T(this, 'Hide password') : T(this, 'Show password'));
      });
      this.$$('slot').forEach((s) => s.addEventListener('slotchange', () => this.syncLabels(this.$('.w'))));
      this.sync();
      this.onValue(false);
    }
    changed(name, v) {
      if (name === 'value') { if (this.native && document.activeElement !== this) { this.native.value = v ?? ''; this._default = v ?? ''; this.onValue(false); } return; }
      this.sync();
    }
    sync() {
      const input = this.native;
      if (!input) return;
      input.type = this.getAttribute('type') || 'text';
      for (const a of SavInput.NATIVE) {
        const v = this.getAttribute(a);
        v === null ? input.removeAttribute(a) : input.setAttribute(a, v);
      }
      input.disabled = this.isDisabled;
      input.required = this.required;
      input.name = this.name || '';
      const lbl = this.getAttribute('aria-label');
      if (lbl) input.setAttribute('aria-label', lbl);
      this.syncLabels(this.$('.w'));
      this.$('.w').classList.toggle('has-help', !!this.getAttribute('help') || this.hasSlot('help'));
      input.setAttribute('aria-describedby', this.$('.help').id);
      this.$('.box').classList.toggle('clearable', this.hasAttribute('clearable'));
      this.$('.box').classList.toggle('pw', this.hasAttribute('password-toggle') && this.getAttribute('type') === 'password');
      this.syncValidity();
    }
    onValue(fire = true) {
      const v = this.native.value;
      this.internals.setFormValue(v);
      this.$('.clear').classList.toggle('show', !!v && !this.isDisabled && !this.native.readOnly);
      this.syncValidity();
      if (this.hasAttribute('data-user-invalid')) this.markTouched();
    }
    formResetCallback() { this.native.value = this._default; this.onValue(); this.removeAttribute('data-user-invalid'); }
    formStateRestoreCallback(s) { this.native.value = s || ''; this.onValue(); }
    get value() { return this.native ? this.native.value : this.getAttribute('value') ?? ''; }
    set value(v) { if (this.native) { this.native.value = v ?? ''; this.onValue(); } else this.setAttribute('value', v ?? ''); }
    get type() { return this.getAttribute('type') || 'text'; }
    set type(v) { this.setAttribute('type', v); }
    get label() { return this.getAttribute('label'); }
    set label(v) { this.setAttribute('label', v); }
    get placeholder() { return this.getAttribute('placeholder'); }
    set placeholder(v) { this.setAttribute('placeholder', v); }
    focus(o) { this.native?.focus(o); }
    blur() { this.native?.blur(); }
    select() { this.native?.select(); }
  }
  define('sav-input', SavInput);

  /* ================================================================== sav-number-input */

  /* A number field with a − button on the left and a + on the right (buttons="end" puts both on the right, "none" hides them).
     The buttons switch off by themselves at min and max; holding one repeats, faster and faster. Arrows step like a native
     number field, PageUp and PageDown step ten times. limits says when the allowed range is written under the field:
     "auto" (default) only after a wrong entry, together with why it is wrong; "always" also before ("From 1 to 12");
     "never" not at all. button-step lets the buttons and arrows jump by more than step (step 1 accepts any whole
     number, button-step 1024 moves by 1024). */
  class SavNumberInput extends SavFormControl {
    static styles = [SIZES, FIELD, VARIANTS, `
      :host { min-width: 8.5rem; }
      .ctl { -moz-appearance: textfield; appearance: textfield; font-variant-numeric: tabular-nums; text-align: var(--_align, start); }
      .ctl::-webkit-inner-spin-button, .ctl::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      :host(:not([buttons])) .box, :host([buttons="sides"]) .box { padding-inline: .3rem; --_align: center; }
      :host([buttons="end"]) .box { padding-inline-end: .3rem; }
      :host([buttons="end"]) .minus { order: 1; }
      :host([buttons="end"]) .plus { order: 2; }
      :host([buttons="none"]) .step { display: none; }
      :host([pill]) .step { border-radius: var(--sav-radius-pill); }
      .step { position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; flex: none;
              width: calc(var(--_h) - .6rem); height: calc(var(--_h) - .6rem); padding: 0; border: 0; border-radius: var(--sav-radius-sm);
              background: none; color: var(--_c-text); cursor: pointer; font: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; user-select: none; }
      /* the button background is a layer: in Tilt it leans like the knobs, the sign stays upright */
      .step::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_c-soft);
              transform: rotate(var(--sav-knob-tilt, 0deg)) scale(var(--_sc, 1)); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.18s * var(--sav-motion, 1)) var(--sav-easing); }
      .step:hover:not(:disabled)::before { background: var(--_c-soft-hover); transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -.5)); }
      .step:active:not(:disabled)::before { --_sc: .88; }
      .step:disabled { color: var(--sav-color-text-muted); cursor: not-allowed; }
      .step:disabled::before { background: var(--sav-color-surface-2); opacity: .6; }
      .step svg { width: 1em; height: 1em; }
      .unit { flex: none; color: var(--sav-color-text-muted); font-size: .9em; }
      .unit:empty { display: none; }
      .limits { display: block; }
      .limits:empty { display: none; }
      .help-text:not(:empty) + .limits { margin-top: .15rem; }
      @media (prefers-reduced-motion: reduce) { .step::before { transition: none; } }
    `];
    static NATIVE = ['placeholder', 'min', 'max', 'step', 'readonly', 'autofocus', 'autocomplete', 'inputmode'];
    static get observedAttributes() { return [...FC, 'label', 'help', 'value', 'unit', 'buttons', 'decrease-label', 'increase-label', 'limits', 'button-step', ...SavNumberInput.NATIVE]; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('nu');
      this.shadowRoot.innerHTML = `<div class="w" part="form-control">
        <label class="lbl" part="label" for="${id}"><slot name="label"></slot><span class="lbl-text"></span></label>
        <div class="box" part="base">
          <button type="button" class="step minus" part="button decrease-button" tabindex="-1" aria-controls="${id}">${svgIcon('minus')}</button>
          <slot name="prefix"></slot>
          <input class="ctl" part="input" id="${id}" type="number">
          <span class="unit" part="unit"></span><slot name="suffix"></slot>
          <button type="button" class="step plus" part="button increase-button" tabindex="-1" aria-controls="${id}">${svgIcon('plus')}</button>
        </div>
        <div class="help" part="help-text" id="${id}-h"><slot name="help"></slot><span class="help-text"></span><span class="limits" part="limits" aria-live="polite"></span></div>
      </div>`;
      const input = (this.native = this.$('input'));
      this._default = this.getAttribute('value') ?? '';
      input.value = this._default;
      input.addEventListener('input', (e) => { e.stopPropagation(); this.onValue(); this.emit('input', { value: this.value }); });
      input.addEventListener('change', () => { this.markTouched(); this.emit('change', { value: this.value }); });
      input.addEventListener('blur', () => { if (input.value) this.markTouched(); });
      input.addEventListener('invalid', () => this.markTouched());
      input.addEventListener('keydown', (e) => {
        if (e.key === 'PageUp' || e.key === 'PageDown') { e.preventDefault(); this.bump(e.key === 'PageUp' ? 10 : -10, true); }
        else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.hasAttribute('button-step')) { e.preventDefault(); this.bump(e.key === 'ArrowUp' ? 1 : -1, true); }
        else if (e.key === 'Enter' && this.form && !e.isComposing) { e.preventDefault(); this.form.requestSubmit(); }
      });
      // the scroll wheel never changes the number by accident while the page scrolls
      input.addEventListener('wheel', () => { if (document.activeElement === this) input.blur(); }, { passive: true });
      for (const [sel, dir] of [['.minus', -1], ['.plus', 1]]) {
        const btn = this.$(sel);
        let timer = null, changed = false;
        const stop = () => { clearTimeout(timer); timer = null; if (changed) { changed = false; this.markTouched(); this.emit('change', { value: this.value }); } };
        const tick = (delay) => { if (btn.disabled) return stop(); if (this.bump(dir)) changed = true; timer = setTimeout(() => tick(Math.max(35, delay * 0.82)), delay); };
        btn.addEventListener('pointerdown', (e) => { if (e.button !== 0 || btn.disabled) return; e.preventDefault(); try { btn.setPointerCapture(e.pointerId); } catch {} if (this.bump(dir)) changed = true; timer = setTimeout(() => tick(110), 420); });
        btn.addEventListener('pointerup', stop);
        btn.addEventListener('pointercancel', stop);
        btn.addEventListener('lostpointercapture', stop);
        // a click without a pointer (screen readers, keyboard on the button)
        btn.addEventListener('click', (e) => { if (e.detail === 0 && !btn.disabled) { this.bump(dir); this.emit('change', { value: this.value }); } });
      }
      this.$$('slot').forEach((s) => s.addEventListener('slotchange', () => this.syncLabels(this.$('.w'))));
      this.sync();
      this.onValue(false);
    }
    changed(name, v) {
      if (name === 'value') { if (this.native && document.activeElement !== this) { this.native.value = v ?? ''; this._default = v ?? ''; this.onValue(false); } return; }
      this.sync();
    }
    sync() {
      const input = this.native; if (!input) return;
      for (const a of SavNumberInput.NATIVE) {
        const v = this.getAttribute(a);
        v === null ? input.removeAttribute(a) : input.setAttribute(a, v);
      }
      if (!this.hasAttribute('inputmode')) input.inputMode = Number.isInteger(Number(this.getAttribute('step') || 1)) && !(Number(this.getAttribute('min')) < 0) ? 'numeric' : 'decimal';
      input.disabled = this.isDisabled;
      input.required = this.required;
      input.name = this.name || '';
      const lbl = this.getAttribute('aria-label');
      if (lbl) input.setAttribute('aria-label', lbl);
      input.setAttribute('aria-describedby', this.$('.help').id);
      this.$('.minus').setAttribute('aria-label', this.getAttribute('decrease-label') || T(this, 'Decrease'));
      this.$('.plus').setAttribute('aria-label', this.getAttribute('increase-label') || T(this, 'Increase'));
      this.$('.unit').textContent = this.getAttribute('unit') || '';
      this.syncLabels(this.$('.w'));
      this.onValue(false);
    }
    /** steps by n (−/+), within min and max; true when the number changed */
    bump(n, fire = true) {
      const input = this.native;
      if (this.isDisabled || input.readOnly) return false;
      const before = input.value;
      const jump = Number(this.getAttribute('button-step'));
      const by = (st) => {
        const v = Math.round(((Number(input.value) || 0) + n * st) * 1e9) / 1e9;
        input.value = String(Math.min(Number(input.max || Infinity), Math.max(Number(input.min || -Infinity), v)));
      };
      if (jump > 0) by(jump);
      else try { n > 0 ? input.stepUp(n) : input.stepDown(-n); } catch { by(Number(input.step) || 1); }
      if (input.value === before) return false;
      this.onValue();
      if (fire) this.emit('input', { value: this.value });
      return true;
    }
    onValue() {
      const input = this.native;
      const v = input.value === '' ? null : Number(input.value);
      this.internals.setFormValue(input.value);
      const off = this.isDisabled || input.readOnly;
      const min = input.min === '' ? -Infinity : Number(input.min), max = input.max === '' ? Infinity : Number(input.max);
      this.$('.minus').disabled = off || (v !== null && v <= min);
      this.$('.plus').disabled = off || (v !== null && v >= max);
      this.syncValidity();
      if (this.hasAttribute('data-user-invalid')) this.markTouched();
      this.syncLimits();
    }
    markTouched() { super.markTouched(); this.syncLimits(); }
    reportValidity() { const ok = super.reportValidity(); this.syncLimits(); return ok; }
    syncLabels(wrap) { super.syncLabels(wrap); this.syncLimits(); }
    fmt(n) {
      let loc; try { loc = Intl.getCanonicalLocales(document.documentElement.lang || [])[0]; } catch { loc = undefined; }
      return Number(n).toLocaleString(loc, { maximumFractionDigits: 6 });
    }
    /** Under the field: the allowed range, or why the number is wrong once the user has touched it */
    syncLimits() {
      const input = this.native, out = this.$('.limits');
      if (!input || !out) return;
      const unit = this.getAttribute('unit'), u = unit ? ` ${unit}` : '';
      const { min, max } = input, v = input.validity;
      let text = '';
      if (this.getAttribute('limits') === 'never') text = '';
      else if (this.hasAttribute('data-user-invalid') && !v.valid) {
        if (v.badInput || v.valueMissing) text = T(this, 'Enter a number.');
        else if (v.rangeUnderflow) text = T(this, 'The smallest value is {n}.', { n: this.fmt(min) + u });
        else if (v.rangeOverflow) text = T(this, 'The largest value is {n}.', { n: this.fmt(max) + u });
        else if (v.stepMismatch) {
          const st = Number(input.step), base = min === '' ? 0 : Number(min);
          const lo = Math.round((base + Math.floor((Number(input.value) - base) / st) * st) * 1e9) / 1e9;
          text = T(this, 'Use steps of {step}: for example {a} or {b}.', { step: this.fmt(st), a: this.fmt(lo), b: this.fmt(lo + st) + u });
        } else text = input.validationMessage;
      } else if (this.getAttribute('limits') === 'always') {
        if (min !== '' && max !== '') text = T(this, 'From {a} to {b}.', { a: this.fmt(min), b: this.fmt(max) + u });
        else if (min !== '') text = T(this, 'At least {n}.', { n: this.fmt(min) + u });
        else if (max !== '') text = T(this, 'At most {n}.', { n: this.fmt(max) + u });
      }
      if (out.textContent !== text) out.textContent = text;
      this.$('.w').classList.toggle('has-help', !!text || !!this.getAttribute('help') || this.hasSlot('help'));
    }
    formResetCallback() { this.native.value = this._default; this.onValue(); this.removeAttribute('data-user-invalid'); this.syncLimits(); }
    formStateRestoreCallback(s) { this.native.value = s || ''; this.onValue(); }
    /** a number, or null when the field is empty */
    get value() { const s = this.native ? this.native.value : this.getAttribute('value') ?? ''; return s === '' || s === null ? null : Number(s); }
    set value(v) { if (this.native) { this.native.value = v ?? ''; this.onValue(); } else this.setAttribute('value', v ?? ''); }
    get valueAsNumber() { return this.native ? this.native.valueAsNumber : Number(this.getAttribute('value')); }
    stepUp(n = 1) { this.bump(Math.abs(n), false); }
    stepDown(n = 1) { this.bump(-Math.abs(n), false); }
    focus(o) { this.native?.focus(o); }
    blur() { this.native?.blur(); }
    select() { this.native?.select(); }
  }
  props(SavNumberInput, { variant: String });
  define('sav-number-input', SavNumberInput);

  /* ================================================================== sav-color-picker */

  /** A colour field: a swatch, the hex code you can type, and suggested colours (swatches). The swatch opens the library's own panel
      (a saturation and brightness area, hue, opacity with alpha, the code, the eyedropper where the browser has one), which follows the
      style and the theme; picker="native" opens the system picker instead. The value is "#rrggbb" ("#rrggbbaa" with alpha), or empty with clearable. */
  const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
  const toHex = (v) => { const m = String(v ?? '').trim().match(HEX); if (!m) return null; let h = m[1].toLowerCase(); if (h.length <= 4) h = [...h].map((c) => c + c).join(''); if (h.endsWith('ff') && h.length === 8) h = h.slice(0, 6); return '#' + h; };
  const hexRgba = (h) => { const x = h.slice(1); return [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2, 4), 16), parseInt(x.slice(4, 6), 16), x.length === 8 ? parseInt(x.slice(6, 8), 16) / 255 : 1]; };
  const rgbHsv = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), d = mx - Math.min(r, g, b); let h = 0;
    if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; } return { h, s: mx ? d / mx : 0, v: mx }; };
  const hsvRgb = (h, s, v) => { const f = (n) => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); }; return [f(5), f(3), f(1)].map((x) => Math.round(x * 255)); };
  const rgbHex = (r, g, b, a = 1) => '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('') + (a < 1 ? Math.round(a * 255).toString(16).padStart(2, '0') : '');
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const CHECKER = 'repeating-conic-gradient(color-mix(in oklab, var(--sav-color-text) 16%, transparent) 0 25%, transparent 0 50%) 50% / 8px 8px';

  class SavColorPicker extends SavFormControl {
    static styles = [SIZES, FIELD, FLOAT, `
      :host { min-width: 9.5rem; }
      :host([compact]) { min-width: 0; display: inline-block; }
      .ctl { font-family: var(--sav-font-mono, ui-monospace, monospace); font-size: .92em; text-transform: lowercase; letter-spacing: .02em; }
      .ctl::placeholder { font-family: var(--sav-font); text-transform: none; letter-spacing: 0; }
      /* the swatch: the colour itself (over a checkerboard when it is see-through); a button opens the panel, or the system picker sits invisibly on top */
      .sw { position: relative; flex: none; width: calc(var(--_h) - .75rem); height: calc(var(--_h) - .75rem); margin-inline-start: -.2rem; border-radius: var(--sav-radius-sm);
            background: linear-gradient(var(--_v), var(--_v)), ${CHECKER}; box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--sav-color-text) 22%, transparent);
            transform: rotate(var(--sav-knob-tilt, 0deg)); overflow: hidden; }
      .sw.none { background: ${CHECKER}; }
      .pick, .swb { position: absolute; inset: -4px; width: calc(100% + 8px); height: calc(100% + 8px); padding: 0; border: 0; opacity: 0; cursor: pointer; }
      .swb { opacity: 1; background: none; }
      .swb:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: -2px; }
      /* with the library's panel the system picker stays in place but out of reach: the eyedropper button may still open it (Safari, Firefox on Apple devices) */
      :host(:not([data-native])) .pick { pointer-events: none; visibility: hidden; }
      :host([data-native]) .swb { display: none; }
      :host([disabled]) :is(.pick, .swb) { cursor: not-allowed; }
      .x { display: none; flex: none; align-items: center; justify-content: center; width: 1.6rem; height: 1.6rem; margin-inline-end: -.3rem; padding: 0; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); cursor: pointer; }
      .x:hover { background: var(--sav-color-surface-2); color: var(--sav-color-text); }
      .x svg { width: .95em; height: .95em; }
      :host([clearable]) .has-value .x { display: inline-flex; }
      /* compact: only the swatch, the field around it becomes a small square */
      :host([compact]) .box { width: var(--_h); padding: 0; justify-content: center; }
      :host([compact]) .ctl, :host([compact]) .x { display: none; }
      :host([compact]) .sw { margin: 0; }
      :host([compact]) .sw:focus-within { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 2px; }
      /* suggested colours under the field (and in the panel) */
      .sws { display: flex; flex-wrap: wrap; gap: .35rem; margin-top: .45rem; }
      .sws:empty { display: none; }
      .sws button { width: 1.45rem; height: 1.45rem; padding: 0; border: 0; border-radius: var(--sav-radius-sm); background: linear-gradient(var(--_v), var(--_v)), ${CHECKER}; cursor: pointer;
            box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--sav-color-text) 20%, transparent); transform: rotate(var(--sav-knob-tilt, 0deg)); transition: transform calc(.15s * var(--sav-motion, 1)) var(--sav-easing); }
      .sws button:hover { transform: rotate(var(--sav-knob-tilt, 0deg)) scale(1.12); }
      .sws button[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--sav-color-bg), 0 0 0 4px var(--sav-color-text); }
      .sws button:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 2px; }

      /* the panel: area, hue, opacity, preview, code, eyedropper, suggestions */
      .cp { width: 15.5rem; max-width: calc(100vw - 16px); padding: .75rem; border-radius: var(--sav-radius); color: var(--sav-color-text); font-family: var(--sav-font); font-size: var(--sav-font-size-sm);
            flex-direction: column; gap: .7rem; }
      .cp:popover-open, .cp.open { display: flex; animation: sav-cp-in calc(.14s * var(--sav-motion, 1)) var(--sav-easing); }
      @keyframes sav-cp-in { from { opacity: 0; transform: translateY(-4px); } }
      ${panelLayer('.cp')}
      .sv { position: relative; height: 9.5rem; border-radius: var(--sav-radius-sm); cursor: crosshair; touch-action: none; outline: none;
            background: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(var(--_hue, 0) 100% 50%));
            box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--sav-color-text) 14%, transparent); }
      .track { position: relative; height: .8rem; border-radius: var(--sav-radius-pill); cursor: pointer; touch-action: none; outline: none;
               box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--sav-color-text) 14%, transparent); }
      .hue { background: linear-gradient(to right, #f00, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00); }
      .al { background: linear-gradient(to right, transparent, var(--_rgb, #000)), ${CHECKER}; }
      .th { position: absolute; left: calc(var(--_x, 0) * 100%); top: calc(var(--_y, .5) * 100%); width: 1rem; height: 1rem; box-sizing: border-box; border: 2px solid #fff;
            border-radius: var(--sav-knob-radius, 50%); background: var(--_c, transparent); box-shadow: 0 0 0 1px rgb(0 0 0 / .35), 0 2px 6px rgb(0 0 0 / .3);
            transform: translate(-50%, -50%) rotate(var(--sav-knob-tilt, 0deg)); pointer-events: none; }
      .track .th { width: 1.05rem; height: 1.05rem; }
      :is(.sv, .track):focus-visible .th { box-shadow: 0 0 0 1px rgb(0 0 0 / .35), 0 0 0 4px var(--sav-color-focus); }
      .row { display: flex; align-items: center; gap: .6rem; }
      .sls { flex: 1; min-width: 0; display: grid; gap: .65rem; }
      :host(:not([alpha])) .al { display: none; }
      .pv { flex: none; width: 2.2rem; height: 2.2rem; border-radius: var(--sav-radius-sm); background: linear-gradient(var(--_v), var(--_v)), ${CHECKER};
            box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--sav-color-text) 20%, transparent); transform: rotate(var(--sav-knob-tilt, 0deg)); }
      .hx { flex: 1; min-width: 0; height: 2rem; padding: 0 .55rem; border: var(--sav-border-width) solid var(--sav-color-border-strong); border-radius: var(--sav-radius-sm);
            background: var(--sav-color-input-bg); color: inherit; font: inherit; font-family: var(--sav-font-mono, ui-monospace, monospace); text-transform: lowercase; outline: none; }
      .hx:focus-visible { border-color: var(--sav-color-primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--sav-color-primary) 22%, transparent); }
      .ib { display: grid; place-items: center; flex: none; width: 2rem; height: 2rem; padding: 0; border: 0; border-radius: var(--sav-radius-sm); background: var(--sav-color-surface-2);
            color: var(--sav-color-text-muted); cursor: pointer; transition: color calc(var(--sav-duration) * var(--sav-motion, 1)), background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .ib:hover { color: var(--sav-color-text); background: color-mix(in oklab, var(--sav-color-text) 12%, transparent); }
      .ib:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 1px; }
      .ib svg { width: 1rem; height: 1rem; }
      .cp .sws { margin: 0; }
      :host(:not([compact])) .psw { display: none; }
      .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
      /* sheet-on-mobile: on a phone the panel rises from the bottom, full width, with a handle (drag it down to close), the name of
         the field and Done; the area, the sliders and the buttons grow for a finger */
      .sheet-head { display: none; }
      .done { border: 0; background: none; padding: .45rem .55rem; margin-inline-end: -.55rem; border-radius: var(--sav-radius-sm); font: inherit; font-weight: var(--sav-font-weight-bold);
              color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); cursor: pointer; }
      .done:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 1px; }
      @keyframes sav-cp-sheet { from { transform: translateY(100%); } }
      @media (max-width: 640px) {
        :host([sheet-on-mobile]) .cp { position: fixed; inset: auto 0 0 0 !important; width: 100%; max-width: 100%; max-height: 92dvh; margin: 0; overflow: hidden auto; overscroll-behavior: contain;
          padding: 0 1.1rem calc(1.1rem + env(safe-area-inset-bottom)); gap: .95rem; border-radius: var(--sav-radius-lg) var(--sav-radius-lg) 0 0; font-size: var(--sav-font-size-md); }
        :host([sheet-on-mobile]) .cp:popover-open, :host([sheet-on-mobile]) .cp.open { animation: sav-cp-sheet calc(.25s * var(--sav-motion, 1)) var(--sav-easing); }
        :host([sheet-on-mobile]) .cp::before { transform: none; border-width: var(--sav-border-width) 0 0; }
        :host([sheet-on-mobile]) .cp::after { display: none; }
        :host([sheet-on-mobile]) .cp::backdrop { background: var(--sav-color-overlay); }
        :host([sheet-on-mobile]) .sheet-head { display: flex; align-items: center; gap: .5rem; position: relative; flex: none; padding: 1.15rem 0 0; touch-action: none; }
        :host([sheet-on-mobile]) .sheet-head::before { content: ""; position: absolute; top: .4rem; left: 50%; width: 2.5rem; height: 4px; margin-left: -1.25rem; border-radius: 99px; background: var(--sav-color-border-strong); }
        :host([sheet-on-mobile]) .sheet-title { flex: 1; min-width: 0; font-weight: var(--sav-font-weight-bold); font-size: var(--sav-font-size-lg); }
        :host([sheet-on-mobile]) .sv { height: min(14rem, 38dvh); flex: none; }
        :host([sheet-on-mobile]) .track { height: 1.15rem; }
        :host([sheet-on-mobile]) .th { width: 1.5rem; height: 1.5rem; }
        :host([sheet-on-mobile]) .sls { gap: 1rem; }
        :host([sheet-on-mobile]) .pv { width: 2.9rem; height: 2.9rem; }
        :host([sheet-on-mobile]) .hx { height: 2.75rem; font-size: 16px; }
        :host([sheet-on-mobile]) .ib { width: 2.75rem; height: 2.75rem; }
        :host([sheet-on-mobile]) .ib svg { width: 1.2rem; height: 1.2rem; }
        :host([sheet-on-mobile]) .psw:not(:empty) { display: flex; }
        :host([sheet-on-mobile]) .cp .sws { gap: .55rem; }
        :host([sheet-on-mobile]) .cp .sws button { width: 2.2rem; height: 2.2rem; }
      }
      @media (prefers-reduced-motion: reduce) { .sws button { transition: none; } .cp:popover-open, .cp.open { animation: none; } }
    `];
    static get observedAttributes() { return [...FC, 'label', 'help', 'value', 'placeholder', 'swatches', 'clearable', 'compact', 'readonly', 'picker', 'alpha']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('co');
      this.shadowRoot.innerHTML = `<div class="w" part="form-control">
        <label class="lbl" part="label" for="${id}"><slot name="label"></slot><span class="lbl-text"></span></label>
        <div class="box" part="base">
          <span class="sw" part="swatch"><input class="pick" type="color" tabindex="-1"><button type="button" class="swb" aria-haspopup="dialog" aria-expanded="false" aria-controls="${id}-p"></button></span>
          <input class="ctl" part="input" id="${id}" type="text" spellcheck="false" autocomplete="off" autocapitalize="off" maxlength="9">
          <button type="button" class="x" part="clear-button" aria-label="${esc(T(this, 'No colour'))}">${svgIcon('x')}</button>
        </div>
        <div class="sws" part="swatches" role="group" aria-label="${esc(T(this, 'Suggested colours'))}"></div>
        <div class="help" part="help-text" id="${id}-h"><slot name="help"></slot><span class="help-text"></span></div>
        <div class="cp float" id="${id}-p" part="panel" role="dialog" aria-label="${esc(T(this, 'Choose a colour'))}" ${supportsPopover ? 'popover="manual"' : ''}>
          <div class="sheet-head" part="sheet-header"><span class="sheet-title"></span><button type="button" class="done">${esc(T(this, 'Done'))}</button></div>
          <div class="sv" part="area" role="slider" tabindex="0" aria-label="${esc(T(this, 'Saturation and brightness'))}" aria-valuemin="0" aria-valuemax="100"><span class="th"></span></div>
          <div class="row"><div class="sls">
            <div class="track hue" part="hue" role="slider" tabindex="0" aria-label="${esc(T(this, 'Hue'))}" aria-valuemin="0" aria-valuemax="360"><span class="th"></span></div>
            <div class="track al" part="opacity" role="slider" tabindex="0" aria-label="${esc(T(this, 'Opacity'))}" aria-valuemin="0" aria-valuemax="100"><span class="th"></span></div>
          </div><span class="pv" part="preview" aria-hidden="true"></span></div>
          <div class="row"><input class="hx" part="panel-input" type="text" spellcheck="false" autocomplete="off" maxlength="9" aria-label="${esc(T(this, 'Colour code'))}">
            <button type="button" class="ib eye" part="eyedropper" aria-label="${esc(T(this, 'Pick a colour from the screen'))}" title="${esc(T(this, 'Pick a colour from the screen'))}" hidden>${svgIcon('pipette')}</button></div>
          <div class="sws psw" role="group" aria-label="${esc(T(this, 'Suggested colours'))}"></div>
          <span class="sr" aria-live="polite"></span>
        </div>
      </div>`;
      const text = (this.native = this.$('.ctl')), pick = this.$('.pick');
      this._default = this.norm(this.getAttribute('value')) || '';
      this._v = this._default;
      // typing: the colour changes as soon as the code is a real colour; leaving the field puts back the last good one
      text.addEventListener('input', (e) => { e.stopPropagation(); const h = this.norm(text.value); if (h) this.set(h, 'input'); });
      text.addEventListener('change', (e) => { e.stopPropagation(); const h = this.norm(text.value); if (h || (text.value.trim() === '' && this.hasAttribute('clearable'))) this.set(h || '', 'change'); else this.show(); });
      text.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && (e.altKey || this.custom) && !this.isOpen) { e.preventDefault(); this.open(true); return; }
        if (e.key === 'Enter' && this.form && !e.isComposing) { e.preventDefault(); this.form.requestSubmit(); }
      });
      // the system picker: input while dragging, change when it closes
      pick.addEventListener('input', (e) => { e.stopPropagation(); this.set(pick.value, 'input'); });
      pick.addEventListener('change', (e) => { e.stopPropagation(); this.set(pick.value, 'change'); });
      // the library's panel
      this.$('.swb').addEventListener('click', () => (this.isOpen ? this.close(true) : this.open(true)));
      this.panel();
      this.$('.x').addEventListener('click', () => { this.set('', 'change'); text.focus(); });
      this.shadowRoot.addEventListener('click', (e) => { const b = e.target.closest('.sws button[data-c]'); if (b && !this.isDisabled) { this.set(b.dataset.c, 'change'); } });
      this.$$('slot').forEach((sl) => sl.addEventListener('slotchange', () => this.syncLabels(this.$('.w'))));
      this.sync();
      this.show();
    }
    disconnectedCallback() { this.close(false); }
    /** True when the panel opens as a sheet: sheet-on-mobile, on a phone. */
    get isSheet() { return this.hasAttribute('sheet-on-mobile') && MOBILE.matches; }
    /** picker: auto (the default) is the library's panel where the browser offers all of it (the eyedropper too: Chrome, Edge) and the
        system picker elsewhere (Safari, Firefox); custom is always the panel, native always the system picker */
    get custom() { const p = this.getAttribute('picker'); return p === 'native' ? false : p === 'custom' ? true : typeof window.EyeDropper === 'function'; }
    get alpha() { return this.hasAttribute('alpha'); }
    /** a colour code made tidy: lower case, 6 digits (8 with alpha and some transparency), or null when it is not a colour */
    norm(v) { const h = toHex(v); return h && !this.alpha ? h.slice(0, 7) : h; }
    get isOpen() { return !!this.$('.cp')?.matches(supportsPopover ? ':popover-open' : '.open'); }
    changed(name, v) {
      if (name === 'value') { const h = this.norm(v) || ''; this._default = h; if (h !== this._v) { this._v = h; this.show(); } return; }
      if (name === 'picker' && !this.custom) this.close(false);
      this.sync();
    }
    sync() {
      const text = this.native; if (!text) return;
      const off = this.isDisabled || this.hasAttribute('readonly');
      text.disabled = this.isDisabled; text.readOnly = this.hasAttribute('readonly');
      text.placeholder = this.getAttribute('placeholder') ?? (this.hasAttribute('clearable') ? 'None' : '#000000');
      text.name = this.name || '';
      text.maxLength = this.alpha ? 9 : 7;
      const pick = this.$('.pick'), swb = this.$('.swb'), compact = this.hasAttribute('compact');
      this.toggleAttribute('data-native', !this.custom);
      pick.disabled = off; swb.disabled = off;
      // compact: the swatch is the field, so it takes the focus and the name
      const name = this.getAttribute('label') || this.getAttribute('aria-label') || T(this, 'Colour');
      pick.tabIndex = compact && !this.custom ? 0 : -1;
      if (compact && !this.custom) { pick.setAttribute('aria-label', name); pick.removeAttribute('aria-hidden'); } else pick.setAttribute('aria-hidden', 'true');
      swb.tabIndex = compact ? 0 : -1;
      swb.setAttribute('aria-label', compact ? T(this, '{name}: choose a colour', { name }) : T(this, 'Choose a colour'));
      const lbl = this.getAttribute('aria-label'); if (lbl) text.setAttribute('aria-label', lbl);
      text.setAttribute('aria-describedby', this.$('.help').id);
      const list = (this.getAttribute('swatches') || '').split(/[\s,]+/).map((c) => this.norm(c)).filter(Boolean);
      const sw = list.map((c) => `<button type="button" data-c="${c}" style="--_v:${c}" aria-label="${c}" title="${c}" ${off ? 'disabled' : ''}></button>`).join('');
      this.$('.sws').innerHTML = sw;
      // in the panel the suggestions show only when the field and its own are out of sight (compact, or the panel as a sheet)
      this.$('.psw').innerHTML = sw;
      // the eyedropper: the browser's own (Chrome, Edge); where there is none, on Apple devices the system colour picker has one (Safari, Firefox)
      const eye = this.$('.eye'), own = typeof window.EyeDropper === 'function';
      const apple = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
      eye.hidden = !own && !apple;
      eye.dataset.via = own ? 'eyedropper' : 'system';
      const tip = own ? T(this, 'Pick a colour from the screen') : T(this, 'Pick a colour from the screen, with the eyedropper of the system colour picker');
      eye.title = tip; eye.setAttribute('aria-label', tip);
      this.syncLabels(this.$('.w'));
      this.show();
    }
    /** puts the value on screen: field text, swatch, picker, panel, chosen suggestion, form value, validity */
    show() {
      const text = this.native; if (!text) return;
      const v = this._v;
      if (this.shadowRoot.activeElement !== text || this.norm(text.value) !== v) text.value = v;
      const sw = this.$('.sw'); sw.style.setProperty('--_v', v || 'transparent'); sw.classList.toggle('none', !v);
      this.$('.pick').value = (v || '#000000').slice(0, 7);
      this.$$('.sws button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.c === v)));
      this.$('.w').classList.toggle('has-value', !!v);
      this.internals.setFormValue(v);
      if (this.required && !v) this.internals.setValidity({ valueMissing: true }, T(this, 'Choose a colour.'), text); else this.internals.setValidity({});
      // the panel follows the value, unless the value came from the panel itself (a grey keeps the hue you were on)
      if (!this._fromPanel) { const [r, g, b, a] = hexRgba(v || '#000000'); const hsv = rgbHsv(r, g, b); this._hsv = { h: hsv.s ? hsv.h : this._hsv?.h ?? 0, s: hsv.s, v: hsv.v }; this._a = v ? a : 1; }
      this.paint();
    }
    /** the panel drawn from the hue, saturation, brightness and opacity */
    paint() {
      const cp = this.$('.cp'); if (!cp || !this._hsv) return;
      const { h, s, v } = this._hsv, a = this._a ?? 1, [r, g, b] = hsvRgb(h, s, v), solid = rgbHex(r, g, b);
      cp.style.setProperty('--_hue', Math.round(h)); cp.style.setProperty('--_rgb', solid);
      const sv = this.$('.sv'), hue = this.$('.hue'), al = this.$('.al');
      sv.querySelector('.th').style.cssText = `--_x:${s};--_y:${1 - v};--_c:${solid}`;
      hue.querySelector('.th').style.cssText = `--_x:${h / 360};--_c:hsl(${Math.round(h)} 100% 50%)`;
      al.querySelector('.th').style.cssText = `--_x:${a};--_c:${solid}`;
      sv.setAttribute('aria-valuenow', String(Math.round(s * 100)));
      sv.setAttribute('aria-valuetext', T(this, 'Saturation {s}%, brightness {v}%', { s: Math.round(s * 100), v: Math.round(v * 100) }));
      hue.setAttribute('aria-valuenow', String(Math.round(h))); hue.setAttribute('aria-valuetext', T(this, '{n} degrees', { n: Math.round(h) }));
      al.setAttribute('aria-valuenow', String(Math.round(a * 100))); al.setAttribute('aria-valuetext', `${Math.round(a * 100)}%`);
      this.$('.pv').style.setProperty('--_v', this._v || 'transparent');
      const hx = this.$('.hx'); if (this.shadowRoot.activeElement !== hx) hx.value = this._v;
    }
    /** a change made in the panel: the value, input now; change once the gesture ends */
    fromPanel(ev = 'input') {
      const { h, s, v } = this._hsv, [r, g, b] = hsvRgb(h, s, v);
      this._fromPanel = true; this.set(rgbHex(r, g, b, this.alpha ? this._a : 1), 'input'); this._fromPanel = false;
      this.paint();
      if (ev === 'change' && this._v !== this._at) { this._at = this._v; this.markTouched(); this.emit('change', { value: this._v }); }
    }
    /** pointer and keys of the area and the two sliders */
    panel() {
      const drag = (el, fn) => {
        el.addEventListener('pointerdown', (e) => {
          if (e.button || this.isDisabled || this.hasAttribute('readonly')) return;
          e.preventDefault(); el.focus(); el.setPointerCapture?.(e.pointerId);
          const go = (ev) => { const b = el.getBoundingClientRect(); fn(clamp01((ev.clientX - b.left) / b.width), clamp01((ev.clientY - b.top) / b.height)); this.fromPanel('input'); };
          go(e);
          const up = () => { el.removeEventListener('pointermove', go); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); this.fromPanel('change'); };
          el.addEventListener('pointermove', go); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
        });
      };
      const keys = (el, fn) => el.addEventListener('keydown', (e) => {
        if (this.isDisabled || this.hasAttribute('readonly')) return;
        const big = e.shiftKey || e.key === 'PageUp' || e.key === 'PageDown' ? 10 : 1;
        const d = { ArrowRight: [big, 0], ArrowLeft: [-big, 0], ArrowUp: [0, big], ArrowDown: [0, -big], PageUp: [0, big], PageDown: [0, -big] }[e.key];
        if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); fn(null, e.key); this.fromPanel('change'); return; }
        if (!d) return;
        e.preventDefault(); fn(d); this.fromPanel('change');
      });
      const sv = this.$('.sv'), hue = this.$('.hue'), al = this.$('.al');
      drag(sv, (x, y) => { this._hsv.s = x; this._hsv.v = 1 - y; });
      drag(hue, (x) => { this._hsv.h = Math.min(359.9, x * 360); });
      drag(al, (x) => { this._a = Math.round(x * 100) / 100; });
      keys(sv, (d, k) => { if (!d) { this._hsv.v = k === 'Home' ? 1 : 0; return; } this._hsv.s = clamp01(this._hsv.s + d[0] / 100); this._hsv.v = clamp01(this._hsv.v + d[1] / 100); });
      keys(hue, (d, k) => { if (!d) { this._hsv.h = k === 'Home' ? 0 : 359; return; } this._hsv.h = (this._hsv.h + (d[0] || d[1]) + 360) % 360; });
      keys(al, (d, k) => { if (!d) { this._a = k === 'Home' ? 0 : 1; return; } this._a = clamp01(Math.round((this._a + (d[0] || d[1]) / 100) * 100) / 100); });
      // the code in the panel: like the field
      const hx = this.$('.hx');
      hx.addEventListener('input', (e) => { e.stopPropagation(); const h = this.norm(hx.value); if (h) this.set(h, 'input'); });
      hx.addEventListener('change', (e) => { e.stopPropagation(); const h = this.norm(hx.value); if (h) this.set(h, 'change'); else hx.value = this._v; });
      hx.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); hx.dispatchEvent(new Event('change')); this.close(true); } });
      // the eyedropper, where the browser has one (Chrome, Edge)
      // while it is picking, the panel stays open (losing the focus to the eyedropper would close it and cancel the pick)
      this.$('.eye').addEventListener('click', async () => {
        if (this.$('.eye').dataset.via === 'system') {
          // no eyedropper in this browser: the system picker opens (its eyedropper is the magnifier / pipette button); its colour comes back through the usual events
          const p = this.$('.pick'); this.close(false);
          p.style.visibility = 'visible';
          try { p.showPicker ? p.showPicker() : p.click(); } catch { p.click(); }
          setTimeout(() => { p.style.visibility = ''; }, 0);
          return;
        }
        this._picking = true;
        try { const r = await new window.EyeDropper().open(); if (r?.sRGBHex) { this.set(this.norm(r.sRGBHex), 'change'); this.$('.sr').textContent = T(this, '{colour} picked', { colour: this._v }); } }
        catch (e) { if (e?.name !== 'AbortError') this.$('.sr').textContent = T(this, 'The browser did not allow picking a colour from the screen.'); }
        finally { this._picking = false; if (this.isOpen) this.$('.eye').focus({ preventScroll: true }); }
      });
      // Escape closes; leaving the panel and the swatch closes it too (not the sheet: on a phone a tap on the sheet would take the focus away)
      const cp = this.$('.cp');
      cp.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this.close(true); } });
      cp.addEventListener('focusout', () => setTimeout(() => { const a = this.shadowRoot.activeElement; if (this.isOpen && !this._sheet && !this._picking && document.hasFocus() && (!a || !(a.closest('.cp') || a.closest('.sw')))) this.close(false); }, 0));
      this._outside = (e) => { if (this.isOpen && !this._picking && !e.composedPath().includes(this)) this.close(false); };
      this._reflow = () => { if (!this.isOpen || this._sheet) return; if (anchorGone(this.$('.box'))) { this.close(false); return; } this.place(); };
      // the sheet: Done, a tap on the dimmed page above it, the handle dragged down
      this.$('.done').addEventListener('click', () => this.close(true));
      cp.addEventListener('click', (e) => {
        if (!this._sheet || e.target !== cp) return;
        const r = cp.getBoundingClientRect();
        if (e.clientY < r.top || e.clientX < r.left || e.clientX > r.right) this.close(true);
      });
      this.$('.sheet-head').addEventListener('pointerdown', (e) => {
        if (!this._sheet || e.button > 0 || e.composedPath().some((n) => n.classList?.contains('done'))) return;
        const y0 = e.clientY, h = cp.offsetHeight;
        let dy = 0;
        cp.style.transition = 'none';
        const move = (m) => { dy = Math.max(0, m.clientY - y0); cp.style.transform = `translateY(${dy}px)`; };
        const up = () => {
          removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
          const t = 200 * motion(this);
          cp.style.transition = `transform ${t}ms var(--sav-easing)`;
          if (dy > Math.min(120, h * 0.3)) { cp.style.transform = 'translateY(100%)'; setTimeout(() => { this.close(true); cp.style.transform = cp.style.transition = ''; }, t); }
          else { cp.style.transform = ''; setTimeout(() => { cp.style.transition = ''; }, t); }
        };
        addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
      });
    }
    place() { place(this.$('.cp'), this.$('.box'), 'bottom-start', 6); }
    /** opens the colour picker: the library's panel, or the system one with picker="native" (browsers allow that only after a user action) */
    open(focus = false) {
      if (this.isDisabled || this.hasAttribute('readonly')) return;
      if (!this.custom) { const p = this.$('.pick'); try { p.showPicker ? p.showPicker() : p.click(); } catch { p.click(); } return; }
      if (this.isOpen) return;
      if (!this.emit('sav-show', {}, true)) return;
      this._at = this._v;
      const cp = this.$('.cp');
      this._sheet = this.isSheet;
      this.$('.sheet-title').textContent = this.getAttribute('label') || this.getAttribute('aria-label') || T(this, 'Choose a colour');
      showPop(cp); tiltWatch(cp);
      if (this._sheet) cp.style.left = cp.style.top = ''; else this.place();
      this.paint();
      this.$('.swb').setAttribute('aria-expanded', 'true'); this.setAttribute('open', '');
      document.addEventListener('pointerdown', this._outside, true); addEventListener('scroll', this._reflow, true); addEventListener('resize', this._reflow);
      if (focus) this.$('.sv').focus({ preventScroll: true });
    }
    close(focusBack = false) {
      const cp = this.$('.cp'); if (!cp || !this.isOpen) return;
      const sheet = this._sheet;
      hidePop(cp); this.$('.swb').setAttribute('aria-expanded', 'false'); this.removeAttribute('open'); this._sheet = false;
      document.removeEventListener('pointerdown', this._outside, true); removeEventListener('scroll', this._reflow, true); removeEventListener('resize', this._reflow);
      if (this._v !== this._at) { this._at = this._v; this.markTouched(); this.emit('change', { value: this._v }); }
      this.emit('sav-hide');
      // after the sheet the focus goes to the swatch, not to the code: on a phone the keyboard would come up
      if (focusBack) (this.hasAttribute('compact') || sheet ? this.$('.swb') : this.native)?.focus({ preventScroll: true });
    }
    set(v, ev) {
      const h = v ? this.norm(v) : '';
      if (h === null || h === this._v) { if (ev === 'change' && h === this._v) this.show(); return; }
      this._v = h; this.show();
      if (ev === 'change') { this._at = h; this.markTouched(); }
      this.emit(ev, { value: h });
    }
    get value() { return this.native ? this._v : this.norm(this.getAttribute('value')) || ''; }
    set value(v) { const h = v ? this.norm(v) || '' : ''; if (this.native) { this._v = h; this.show(); } else this.setAttribute('value', h); }
    formResetCallback() { this._v = this._default; this.show(); this.removeAttribute('data-user-invalid'); }
    formStateRestoreCallback(st) { this._v = this.norm(st) || ''; this.show(); }
    focus(o) { (this.hasAttribute('compact') ? (this.custom ? this.$('.swb') : this.$('.pick')) : this.native)?.focus(o); }
  }
  define('sav-color-picker', SavColorPicker);

  /* ================================================================== sav-textarea */

  class SavTextarea extends SavFormControl {
    static styles = [SIZES, FIELD, `
      /* the inner space belongs to the text area itself, so its resize handle sits in the corner of the field */
      .box { padding: 0; align-items: stretch; }
      textarea { resize: vertical; min-height: 3.2em; display: block; }
      textarea.ctl { box-sizing: border-box; padding: .55rem .8rem; border-radius: inherit; }
      :host([resize="none"]) textarea, :host([resize="auto"]) textarea { resize: none; }
      :host([resize="auto"]) textarea { overflow: hidden; }
      .count { display: none; margin-top: .35rem; text-align: right; font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); font-variant-numeric: tabular-nums; }
      :host([counter]) .count { display: block; }
      .foot { display: flex; gap: 1rem; } .foot .help { flex: 1; } :host([counter]) .foot .count { margin-left: auto; }
    `];
    static NATIVE = ['placeholder', 'minlength', 'maxlength', 'rows', 'readonly', 'autofocus', 'spellcheck', 'autocomplete', 'wrap'];
    static get observedAttributes() { return [...FC, 'label', 'help', 'value', 'counter', ...SavTextarea.NATIVE]; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('ta');
      this.shadowRoot.innerHTML = `<div class="w" part="form-control">
        <label class="lbl" part="label" for="${id}"><slot name="label"></slot><span class="lbl-text"></span></label>
        <div class="box" part="base"><textarea class="ctl" part="textarea" id="${id}"></textarea></div>
        <div class="foot"><div class="help" part="help-text" id="${id}-h"><slot name="help"></slot><span class="help-text"></span></div><div class="count" part="counter" aria-live="polite"></div></div>
      </div>`;
      const ta = (this.native = this.$('textarea'));
      this._default = this.getAttribute('value') ?? this.textContent.trim();
      ta.value = this._default;
      ta.addEventListener('input', () => this.onValue());
      ta.addEventListener('change', () => { this.markTouched(); this.emit('change'); });
      ta.addEventListener('invalid', () => this.markTouched());
      this.sync();
      this.onValue();
    }
    changed(name, v) {
      if (name === 'value') { if (this.native) { this.native.value = v ?? ''; this.onValue(); } return; }
      this.sync();
    }
    sync() {
      const ta = this.native; if (!ta) return;
      for (const a of SavTextarea.NATIVE) { const v = this.getAttribute(a); v === null ? ta.removeAttribute(a) : ta.setAttribute(a, v); }
      if (!this.hasAttribute('rows')) ta.rows = 4;
      ta.disabled = this.isDisabled; ta.required = this.required; ta.name = this.name || '';
      ta.setAttribute('aria-describedby', this.$('.help').id);
      this.syncLabels(this.$('.w'));
      this.onValue();
    }
    onValue() {
      const ta = this.native;
      this.internals.setFormValue(ta.value);
      if (this.getAttribute('resize') === 'auto') { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
      const max = this.getAttribute('maxlength');
      this.$('.count').textContent = max ? `${ta.value.length} / ${max}` : String(ta.value.length);
      this.syncValidity();
      if (this.hasAttribute('data-user-invalid')) this.markTouched();
    }
    formResetCallback() { this.native.value = this._default; this.onValue(); this.removeAttribute('data-user-invalid'); }
    get value() { return this.native ? this.native.value : this.getAttribute('value') ?? ''; }
    set value(v) { if (this.native) { this.native.value = v ?? ''; this.onValue(); } else this.setAttribute('value', v ?? ''); }
    focus(o) { this.native?.focus(o); }
  }
  define('sav-textarea', SavTextarea);

  /* ================================================================== pickers: shared base */

  const MOBILE = typeof matchMedia === 'function' ? matchMedia('(max-width: 640px)') : { matches: false };

  /* sheet-on-mobile: on a phone (up to 640px) the panel of a component opens from the bottom of the screen. The select and the
     pickers draw their own sheet (search, calendar, time columns); the dropdown, the context menu, the info tip, the popover
     and the dialog open in a sav-action-sheet of their own, made once inside its shadow root: the same handle, title, close button, drag down, overlay
     and focus trap as every action sheet. What the panel shows (a slot, or the body it draws) moves into the sheet while it is open
     and back into the panel after. The sheet's own events stay inside: the component sends its own. */
  /** True when the component opens as a sheet now: sheet-on-mobile, on a phone. */
  const sheetOn = (host) => host.hasAttribute('sheet-on-mobile') && MOBILE.matches;
  class MobileSheet {
    /** True when the component opens as a sheet now. */
    static wanted(host) { return sheetOn(host) && !!customElements.get('sav-action-sheet'); }
    constructor(host, opts = {}) { this.host = host; this.opts = opts; this.el = null; this.moved = []; this.active = false; }
    make() {
      if (this.el) return this.el;
      const s = (this.el = document.createElement('sav-action-sheet'));
      s.className = 'm-sheet';
      s.setAttribute('part', 'sheet');
      s.setAttribute('exportparts', this.opts.exportparts || 'panel: sheet-panel, handle: sheet-handle, header: sheet-header, title: sheet-title, close-button: sheet-close-button, body: sheet-body, footer: sheet-footer, cancel-button: sheet-cancel-button');
      const own = (e) => e.target === s;
      for (const n of ['sav-show', 'sav-after-show', 'sav-hide', 'sav-after-hide', 'sav-request-close', 'sav-select', 'change']) s.addEventListener(n, (e) => own(e) && e.stopPropagation());
      s.addEventListener('sav-request-close', (e) => { if (own(e) && this.opts.onRequestClose && !this.opts.onRequestClose(e.detail.source)) e.preventDefault(); });
      s.addEventListener('sav-hide', (e) => { if (!own(e)) return; this.active = false; this.opts.onHide?.(); });
      s.addEventListener('sav-after-show', (e) => own(e) && this.opts.onAfterShow?.());
      s.addEventListener('sav-after-hide', (e) => {
        if (!own(e)) return;
        this.restore();
        // the focus goes back to what had it (the trigger, also inside another component), or to the trigger when that was nothing
        // (opened from a script); not when the chosen action took it elsewhere (a dialog), only when it fell back on the page
        const a = document.activeElement, back = this.back?.isConnected && this.back !== document.body ? this.back : this.opts.returnFocus?.();
        this.back = null;
        let fell = !a || a === document.body;
        for (let n = this.host; n && !fell; n = n.parentNode || n.host) if (n === a) fell = true;
        if (back && fell) back.focus?.({ preventScroll: true });
        this.opts.onAfterHide?.();
      });
      this.host.shadowRoot.append(s);
      return s;
    }
    /** Moves the nodes into the sheet and opens it; false while it is still closing. */
    open(nodes, { label = '', attrs = {} } = {}) {
      const s = this.make();
      if (this.active || s.dlg?.open) return false;
      for (const a of ['no-cancel', 'no-close', 'no-header', 'close-style', 'persistent']) s.removeAttribute(a);
      for (const [k, v] of Object.entries(attrs)) if (v !== false && v != null) s.setAttribute(k, v === true ? '' : v);
      s.setAttribute('label', label);
      let a = document.activeElement;
      while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
      this.back = a;
      this.moved = nodes.filter(Boolean).map((n) => [n, n.parentNode, n.nextSibling]);
      for (const [n] of this.moved) s.append(n);
      this.active = true;
      s.show();
      if (!s.dlg?.open) { this.active = false; this.restore(); return false; }
      return true;
    }
    close() { if (this.active) this.el.hide(); }
    restore() {
      for (const [n, parent, next] of this.moved.reverse()) parent.insertBefore(n, next?.parentNode === parent ? next : null);
      this.moved = [];
    }
  }
  /** The sheet of a menu (dropdown, context menu): the sheet is in the shadow root, so ::part reaches inside it. */
  const SHEET_MENU = `
    .m-sheet::part(body) { padding: .2rem .45rem .6rem; }
    .m-sheet[no-cancel]::part(body) { padding-bottom: calc(.6rem + env(safe-area-inset-bottom)); }
    .items.in-sheet { padding: 0; overflow: visible; }
    .items.in-sheet ::slotted(sav-menu-item) { --sav-menu-item-padding: .8rem .8rem; }
    .items.in-sheet ::slotted(sav-divider) { --spacing: .35rem; }
  `;
  /** a language tag the browser accepts, or undefined (a half-typed or wrong locale="…" must not break the component) */
  const safeLocale = (l) => { if (!l) return undefined; try { return Intl.getCanonicalLocales(l)[0]; } catch { return undefined; } };
  /** The locale of a component: its locale attribute, else the closest lang (also around a shadow root), like the words it writes. */
  const elLocale = (el) => {
    const own = safeLocale(el.getAttribute('locale')); if (own) return own;
    for (let n = el; n; n = n.getRootNode?.().host) { const l = n.closest?.('[lang]')?.getAttribute('lang'); if (l) return safeLocale(l); }
    return undefined;
  };
  const userLocale = (el) => safeLocale(el.getAttribute('locale')) || safeLocale(el.closest('[lang]')?.getAttribute('lang')) || safeLocale(navigator.language) || 'en';
  const pad = (n) => String(n).padStart(2, '0');

  const PICKER = `
    .box { cursor: pointer; padding-right: .55rem; }
    :host([disabled]) .box, :host([readonly]) .box { cursor: default; }
    .trigger { flex: 1; min-width: 0; display: flex; align-items: center; gap: .3rem; flex-wrap: wrap; min-height: calc(var(--_h) - 2 * var(--sav-border-width)); margin: 0; padding: .2rem 0;
               border: 0; background: none; font: inherit; color: inherit; text-align: left; cursor: inherit; outline: none; }
    .val { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ph { color: var(--sav-color-text-muted); }
    .end { display: flex; align-items: center; gap: .1rem; color: var(--sav-color-text-muted); flex: none; }
    .end > svg { width: 1.1em; height: 1.1em; transition: transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
    :host([open]) .end > svg.chev { transform: rotate(180deg); }
    .has-value .clear { display: inline-flex; }
    :host(:not([clearable])) .clear, :host([disabled]) .clear, :host([readonly]) .clear { display: none !important; }
    /* the phone's own picker, laid over the field (native or native-on-mobile) */
    .native { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; font-size: 16px; display: none; z-index: 2; }
    :host([native]) .native { display: block; }
    @media (max-width: 640px) { :host([native-on-mobile]) .native { display: block; } }
    .pop { min-width: var(--_pw, 12rem); max-width: min(var(--popup-width, 24rem), calc(100vw - 16px)); max-height: min(var(--popup-height, 22rem), calc(100vh - 2rem));
           flex-direction: column; padding: 0; border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius); background: var(--sav-color-surface); color: var(--sav-color-text);
           box-shadow: var(--sav-shadow-lg); font-family: var(--sav-font); font-size: var(--sav-font-size-md); -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none); }
    .pop:popover-open, .pop.open { display: flex; animation: sav-pop calc(.16s * var(--sav-motion, 1)) var(--sav-easing); }
    .body { flex: 1 1 auto; min-height: 0; overflow: auto; overscroll-behavior: contain; padding: var(--_pp, .3rem); }
    ${panelLayer('.pop')}
    .sheet-head { display: none; }
    @keyframes sav-pop { from { opacity: 0; transform: translateY(-4px) scale(.98); } }
    @keyframes sav-sheet { from { transform: translateY(100%); } }
    /* sheet-on-mobile: on small screens the popup rises from the bottom, full width */
    @media (max-width: 640px) {
      :host([sheet-on-mobile]) .pop { position: fixed; inset: auto 0 0 0 !important; width: 100%; max-width: 100%; min-width: 0; max-height: 85dvh; margin: 0;
             border-radius: var(--sav-radius-lg) var(--sav-radius-lg) 0 0; padding: 0 0 calc(.8rem + env(safe-area-inset-bottom)); animation: sav-sheet calc(.25s * var(--sav-motion, 1)) var(--sav-easing); border: 0; overflow: hidden; }
      /* the side space is the body's, so what spans it (the search of the select) reaches the edges of the sheet */
      :host([sheet-on-mobile]) .body { padding-left: .9rem; padding-right: .9rem; }
      :host([sheet-on-mobile]) .pop::before { transform: none; border-width: var(--sav-border-width) 0 0; }
      :host([sheet-on-mobile]) .pop::after { display: none; }
      :host([sheet-on-mobile]) .pop::backdrop { background: var(--sav-color-overlay); }
      /* the header is part of the panel (its surface is the panel's, edge to edge): only the body under it scrolls */
      :host([sheet-on-mobile]) .sheet-head { display: flex; align-items: center; gap: .5rem; position: relative; flex: none; padding: 1.15rem 1rem .6rem 1.25rem; background: none; }
      :host([sheet-on-mobile]) .sheet-head::before { content: ""; position: absolute; top: .4rem; left: 50%; width: 2.5rem; height: 4px; margin-left: -1.25rem; border-radius: 99px; background: var(--sav-color-border-strong); }
    }
    .sheet-title { flex: 1; font-weight: var(--sav-font-weight-bold); font-size: var(--sav-font-size-lg); }
    .done { border: 0; background: none; color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); font: inherit; font-weight: var(--sav-font-weight-bold); cursor: pointer; padding: .3rem .5rem; border-radius: var(--sav-radius-sm); }
    .foot { display: flex; justify-content: space-between; gap: .5rem; padding: .4rem .2rem .1rem; border-top: var(--sav-border-width) solid var(--sav-color-border); margin-top: .3rem; }
    .lnk { border: 0; background: none; padding: .35rem .5rem; border-radius: var(--sav-radius-sm); color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); font: inherit; font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-semibold); cursor: pointer; }
    .lnk:hover { background: var(--sav-color-surface-2); }
  `;

  /** A field that opens a popup: the base of sav-select, sav-date-picker and sav-time-picker. */
  class SavPicker extends SavFormControl {
    static popupRole = 'listbox';
    static endIcon = 'chevron-down';
    static get observedAttributes() { return [...FC, 'label', 'help', 'value', 'placeholder', 'readonly', 'clearable', 'min', 'max', 'locale']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('pk');
      this.shadowRoot.innerHTML = `<div class="w" part="form-control">
        <label class="lbl" part="label" id="${id}-l"><slot name="label"></slot><span class="lbl-text"></span></label>
        <div class="box" part="base"><slot name="prefix"></slot>
          <button class="trigger" part="trigger" type="button" aria-haspopup="${this.constructor.popupRole}" aria-expanded="false" aria-labelledby="${id}-l ${id}-v"><span class="val" id="${id}-v"></span></button>
          <span class="end"><button type="button" class="ibtn clear" part="clear-button" tabindex="-1" aria-label="${esc(T(this, 'Clear'))}">${svgIcon('x')}</button>${svgIcon(this.constructor.endIcon, 'chev')}</span>
          ${this.nativeHtml()}
        </div>
        <div class="help" part="help-text"><slot name="help"></slot><span class="help-text"></span></div>
        <div class="pop float" part="popup" ${supportsPopover ? 'popover="auto"' : ''}><div class="sheet-head" part="sheet-header"><span class="sheet-title"></span><button class="done" type="button">${esc(T(this, 'Done'))}</button></div><div class="body" part="body"></div></div>
      </div>`;
      this.native = this.$('.native');
      this.trigger = this.$('.trigger');
      this.pop = this.$('.pop');
      tiltWatch(this.pop);
      // the whole field opens the popup, the arrow and the empty space included (not the clear button)
      this.$('.box').addEventListener('click', (e) => {
        const path = e.composedPath();
        if (path.includes(this.trigger) || path.some((n) => n.classList?.contains('clear') || n.classList?.contains('native'))) return;
        this.trigger.click();
      });
      this.$('.lbl').addEventListener('click', () => this.trigger.focus());
      this.trigger.addEventListener('click', () => {
        if (Date.now() - (this._closedAt || 0) < 150) return; // light dismiss just closed it
        this.open ? this.hide() : this.show();
      });
      this.trigger.addEventListener('keydown', (e) => {
        if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key) && !this.open) { e.preventDefault(); this.show(); }
        else this.triggerKey?.(e);
      });
      this.$('.clear').addEventListener('click', (e) => { e.stopPropagation(); this.setValue(this.emptyValue(), true); this.trigger.focus(); });
      this.$('.done').addEventListener('click', () => this.hide());
      this.pop.addEventListener('toggle', (e) => { if (e.newState === 'closed') this.afterHide(); });
      // browsers without popovers: a press outside closes it (removed again when the element leaves the page)
      if (!supportsPopover) { this._outside = (e) => { if (this.open && !e.composedPath().includes(this)) this.hide(); }; document.addEventListener('pointerdown', this._outside); }
      this.native?.addEventListener('change', () => this.fromNative());
      this.$$('slot').forEach((sl) => sl.addEventListener('slotchange', () => this.syncLabels(this.$('.w'))));
      this.init?.();
      this._default = this.serialize();
      this.sync();
    }
    get open() { return this.hasAttribute('open'); }
    get isSheet() { return sheetOn(this); }
    changed(name, v) {
      if (!this.trigger) return;
      if (name === 'value') { this.parse(v ?? ''); this._default = this.serialize(); this.refresh(); return; }
      this.sync();
    }
    sync() {
      this.trigger.disabled = this.isDisabled;
      this.syncLabels(this.$('.w'));
      const name = this.getAttribute('label') || this.getAttribute('aria-label') || '';
      this.$('.sheet-title').textContent = name;
      // no visible label: the field takes its name from aria-label
      if (!this.getAttribute('label') && !this.hasSlot('label') && this.getAttribute('aria-label')) this.trigger.setAttribute('aria-label', `${this.getAttribute('aria-label')}: ${this.$('.val').textContent}`);
      this.syncNative?.();
      this.refresh();
    }
    /** Shows the value in the field, updates the form value and the validity. */
    refresh() {
      const text = this.displayHtml();
      const v = this.$('.val');
      if (text) v.innerHTML = text;
      else v.innerHTML = `<span class="ph">${esc(this.getAttribute('placeholder') || '')}</span>`;
      this.$('.box').classList.toggle('has-value', !!text);
      this.internals.setFormValue(this.formValue());
      if (this.required && !this.serialize()) this.internals.setValidity({ valueMissing: true }, T(this, 'Please choose a value.'), this.trigger);
      else this.internals.setValidity({});
      if (this.hasAttribute('data-user-invalid')) this.markTouched();
      if (this.native) this.toNative?.();
    }
    formValue() { return this.serialize() || null; }
    setValue(v, fire) {
      const before = this.serialize();
      this.parse(v);
      this.refresh();
      if (this.open) this.renderBody();
      if (fire && before !== this.serialize()) { this.emit('input'); this.emit('change'); this.markTouched(); }
    }
    show() {
      if (this.isDisabled || this.readonly || this.open) return;
      if (this.hasAttribute('native') || (this.hasAttribute('native-on-mobile') && MOBILE.matches)) { this.native?.showPicker?.(); return; }
      if (!this.emit('sav-show', {}, true)) return;
      this.renderBody();
      showPop(this.pop);
      this.setAttribute('open', '');
      this.trigger.setAttribute('aria-expanded', 'true');
      this.reposition();
      this._reflow ||= () => { if (!this.open) return; if (!this.isSheet && anchorGone(this.$('.box'))) { this.hide(); return; } this.reposition(true); };
      addEventListener('scroll', this._reflow, true);
      addEventListener('resize', this._reflow);
      this.focusInitial?.();
    }
    /** keep = true while it is open (scrolling, filtering): it stays on the side where it opened, so it does not jump */
    reposition(keep) {
      if (this.isSheet) { this.pop.style.left = this.pop.style.top = ''; delete this.pop.dataset.side; return; }
      this.pop.style.setProperty('--_pw', this.$('.box').getBoundingClientRect().width + 'px');
      const want = this.getAttribute('placement') || 'bottom-start', side = keep && this.pop.dataset.side, align = want.split('-')[1];
      place(this.pop, this.$('.box'), side ? side + (align ? '-' + align : '') : want, 6);
    }
    hide() { hidePop(this.pop); if (!supportsPopover) this.afterHide(); }
    afterHide() {
      if (!this.open) return;
      this._closedAt = Date.now();
      this.removeAttribute('open');
      this.trigger.setAttribute('aria-expanded', 'false');
      removeEventListener('scroll', this._reflow, true);
      removeEventListener('resize', this._reflow);
      if (this.shadowRoot.activeElement && this.shadowRoot.activeElement !== this.trigger) this.trigger.focus({ preventScroll: true });
      this.onClose?.();
      this.emit('sav-hide');
    }
    fromNative() { this.setValue(this.native.value, true); }
    formResetCallback() { this.parse(this._default); this.refresh(); this.removeAttribute('data-user-invalid'); }
    get value() { return this.trigger ? this.serialize() : this.getAttribute('value') ?? ''; }
    set value(v) { if (this.trigger) this.setValue(v ?? ''); else this.setAttribute('value', v ?? ''); }
    focus(o) { this.trigger?.focus(o); }
    nativeHtml() { return ''; }
    emptyValue() { return ''; }
    disconnectedCallback() { if (this._outside) document.removeEventListener('pointerdown', this._outside); if (this.open) this.hide?.(); }
  }
  props(SavPicker, { readonly: Boolean, placeholder: String, label: String, placement: String });

  /* ================================================================== sav-select (custom list, search, multiple) */

  class SavSelect extends SavPicker {
    static styles = [SIZES, FIELD, FLOAT, PICKER, `
      .chip { display: inline-flex; align-items: center; gap: .2rem; max-width: 100%; padding: .1rem .2rem .1rem .45rem; border-radius: var(--sav-radius-sm); background: var(--sav-color-surface-2);
              border: var(--sav-border-width) solid var(--sav-color-border); font-size: .85em; line-height: 1.35; }
      .chip .x { display: inline-flex; border: 0; padding: 1px; background: none; color: var(--sav-color-text-muted); cursor: pointer; border-radius: 50%; }
      .chip .x:hover { color: var(--sav-color-text); }
      .chip svg { width: .9em; height: .9em; }
      .more { font-size: .85em; color: var(--sav-color-text-muted); }
      /* sticky right against the edge of the panel (over its padding), so no option shows above or below it */
      .search { position: sticky; top: calc(var(--_pp, .3rem) * -1); z-index: 1; display: flex; align-items: center; gap: .4rem; margin: -.3rem -.3rem .3rem; padding: .5rem .7rem; background: var(--sav-color-surface);
               /* see-through surfaces (Glass): the options scrolling underneath are blurred, so the search stays readable */
               -webkit-backdrop-filter: blur(16px) saturate(170%); backdrop-filter: blur(16px) saturate(170%); border-bottom: var(--sav-border-width) solid var(--sav-color-border); }
      .search svg { width: 1rem; height: 1rem; color: var(--sav-color-text-muted); flex: none; }
      .search input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; color: inherit; font: inherit; font-size: 16px; }
      @media (min-width: 641px) { .search input { font-size: inherit; } }
      @media (max-width: 640px) { :host([sheet-on-mobile]) .search { margin: -.3rem -.9rem .3rem; padding: .55rem 1.3rem; } }
      /* opened above the field: the search goes to the bottom, so it is always next to the field */
      .pop[data-side="top"] .body { display: flex; flex-direction: column; }
      .pop[data-side="top"] .body > * { flex: none; }
      .pop[data-side="top"] .search { order: 1; top: auto; bottom: calc(var(--_pp, .3rem) * -1); margin: .3rem -.3rem -.3rem; border-bottom: 0; border-top: var(--sav-border-width) solid var(--sav-color-border); }
      .list { outline: none; }
      /* select-all (multiple): one row on top that picks every option, or clears them all */
      .all { display: flex; align-items: center; gap: .5rem; width: 100%; margin: 0 0 .25rem; padding: .5rem .6rem; border: 0; border-bottom: var(--sav-border-width) solid var(--sav-color-border);
             border-radius: 0; background: none; color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); font: inherit; font-weight: var(--sav-font-weight-semibold); text-align: start; cursor: pointer; }
      .all:hover { background: var(--sav-color-surface-2); }
      .all:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: -2px; }
      .all svg { width: 1em; height: 1em; }
      .grp { padding: .55rem .6rem .25rem; font-size: .72rem; font-weight: var(--sav-font-weight-bold); letter-spacing: .06em; text-transform: uppercase; color: var(--sav-color-text-muted); }
      .opt { position: relative; isolation: isolate; display: flex; align-items: center; gap: .55rem; padding: .5rem .6rem; border-radius: calc(var(--sav-radius) - 2px); cursor: pointer; user-select: none; }
      .opt::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_ob, transparent); transform: rotate(${TILT}); }
      .opt.active { --_ob: var(--sav-color-surface-2); }
      .opt[aria-selected="true"] { font-weight: var(--sav-font-weight-semibold); color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); }
      .opt[aria-disabled="true"] { opacity: .45; cursor: not-allowed; }
      .opt .ck { width: 1em; height: 1em; flex: none; visibility: hidden; }
      .opt[aria-selected="true"] .ck { visibility: visible; }
      :host([multiple]) .opt .ck { visibility: visible; box-sizing: border-box; width: 1.1em; height: 1.1em; padding: 1px; border: calc(var(--sav-border-width) + .5px) solid var(--sav-color-border-strong);
        border-radius: calc(var(--sav-radius) * .55); background: var(--sav-color-input-bg); transform: rotate(var(--sav-knob-tilt, 0deg));
        transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([multiple]) .opt:hover .ck { border-color: var(--sav-color-primary); }
      :host([multiple]) .opt[aria-selected="true"] .ck { background: var(--sav-color-primary); border-color: var(--sav-color-primary); color: var(--sav-color-on-primary); transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -.5)); }
      :host([multiple]) .opt .ck * { stroke-width: 3; }
      :host([multiple]) .opt:not([aria-selected="true"]) .ck * { visibility: hidden; }
      .opt-l { flex: 1; min-width: 0; }
      .opt-d { display: block; font-size: .8em; font-weight: var(--sav-font-weight-normal); color: var(--sav-color-text-muted); }
      .opt-row, .val-row { display: inline-flex; align-items: center; gap: .55rem; max-width: 100%; min-width: 0; vertical-align: middle; }
      .opt-row { display: flex; }
      .opt-t { min-width: 0; }
      .opt-ic { flex: none; width: 1.1em; height: 1.1em; color: var(--sav-color-text-muted); }
      .opt[aria-selected="true"] .opt-ic { color: inherit; }
      .opt[hidden], .grp[hidden] { display: none; }
      .empty { padding: .8rem .6rem; color: var(--sav-color-text-muted); font-size: var(--sav-font-size-sm); }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host([auto-text][multiple]) .opt[aria-selected="true"] .ck { --_eb: var(--sav-color-primary); color: ${AUTO_TEXT}; }
    `];
    static get observedAttributes() { return [...SavPicker.observedAttributes, 'multiple', 'searchable', 'max-chips', 'select-all']; }
    init() {
      this._values = [];
      this._mo = new MutationObserver(() => { this.readOptions(); this.syncNative(); this.refresh(); if (this.open) this.renderBody(); });
      this._mo.observe(this, { childList: true, subtree: true, attributes: true, characterData: true, attributeFilter: ['value', 'label', 'disabled', 'selected', 'data-description'] });
      this.readOptions();
      const attr = this.getAttribute('value');
      if (attr !== null) this.parse(attr);
      else this._values = this.opts.filter((o) => o.selected).map((o) => o.value).slice(0, this.multiple ? Infinity : 1);
      this.$('.val').addEventListener('click', (e) => {
        const x = e.target.closest('[data-rm]');
        if (x) { e.stopPropagation(); this.setValue(this._values.filter((v) => v !== x.dataset.rm), true); }
      });
    }
    readOptions() {
      this.opts = [];
      const add = (o, group) => this.opts.push({ value: o.getAttribute('value') ?? o.textContent.trim(), label: o.getAttribute('label') || o.textContent.trim(), disabled: o.disabled || !!group?.disabled, selected: o.hasAttribute('selected'), group: group?.label || '', desc: o.dataset.description || '', icon: o.dataset.icon || '' });
      for (const n of this.children) {
        if (n.localName === 'option') add(n);
        else if (n.localName === 'optgroup') [...n.children].forEach((o) => o.localName === 'option' && add(o, n));
      }
    }
    get multiple() { return this.hasAttribute('multiple'); }
    parse(v) {
      const list = Array.isArray(v) ? v : String(v ?? '').trim() === '' ? [] : this.multiple ? String(v).split(/\s*,\s*|\s+/) : [String(v)];
      this._values = list.map(String).filter((x) => x !== '');
      if (!this.multiple) this._values = this._values.slice(0, 1);
    }
    serialize() { return this._values.join(this.multiple ? ',' : ''); }
    emptyValue() { return []; }
    formValue() {
      if (!this.multiple) return this._values[0] ?? null;
      const fd = new FormData();
      this._values.forEach((v) => fd.append(this.name || 'value', v));
      return fd;
    }
    displayHtml() {
      const label = (v) => this.opts.find((o) => o.value === v)?.label ?? v;
      if (!this._values.length) return '';
      const opt = (v) => this.opts.find((o) => o.value === v) || { value: v, label: v };
      if (!this.multiple) return `<span class="val">${this.valueInner(opt(this._values[0]))}</span>`;
      const max = Number(this.getAttribute('max-chips')) || 3;
      const chips = this._values.slice(0, max).map((v) => `<span class="chip">${this.valueInner(opt(v))}<span class="x" data-rm="${esc(v)}" role="button" aria-label="${esc(T(this, 'Remove {name}', { name: label(v) }))}">${svgIcon('x')}</span></span>`).join('');
      return chips + (this._values.length > max ? `<span class="more">+${this._values.length - max}</span>` : '');
    }
    renderBody() {
      const id = this._lid ||= nextId('lb');
      let html = this.hasAttribute('searchable') ? `<div class="search">${svgIcon('search')}<input type="text" placeholder="${esc(this.getAttribute('search-placeholder') || T(this, 'Search'))}" aria-controls="${id}" aria-autocomplete="list" autocomplete="off" spellcheck="false"></div>` : '';
      if (this.multiple && this.hasAttribute('select-all')) html += `<button type="button" class="all" part="select-all"></button>`;
      html += `<div class="list" id="${id}" role="listbox" tabindex="-1" ${this.multiple ? 'aria-multiselectable="true"' : ''} aria-label="${esc(this.getAttribute('label') || T(this, 'Options'))}">`;
      let group = null;
      this.opts.forEach((o, i) => {
        if (o.group !== group) { group = o.group; if (group) html += `<div class="grp" role="presentation" data-g="${esc(group)}">${esc(group)}</div>`; }
        html += `<div class="opt" role="option" id="${id}-${i}" data-i="${i}" data-g="${esc(o.group)}" aria-selected="${this._values.includes(o.value)}" ${o.disabled ? 'aria-disabled="true"' : ''}>${svgIcon('check', 'ck')}<span class="opt-l">${this.optionInner(o)}</span></div>`;
      });
      html += `</div><div class="empty" hidden>${esc(this.getAttribute('empty-text') || T(this, 'No results'))}</div>`;
      const body = this.$('.body');
      body.innerHTML = html;
      body.querySelectorAll('.opt').forEach((el) => tiltWatch(el));
      const list = body.querySelector('.list');
      list.addEventListener('click', (e) => { const el = e.target.closest('.opt'); if (el) this.pick(Number(el.dataset.i)); });
      list.addEventListener('pointermove', (e) => { const el = e.target.closest('.opt'); if (el && !el.classList.contains('active')) this.setActive(el); });
      body.querySelector('.all')?.addEventListener('click', () => this.toggleAll());
      this.syncAll();
      const keyTarget = body.querySelector('.search input') || list;
      keyTarget.addEventListener('keydown', (e) => this.listKey(e));
      body.querySelector('.search input')?.addEventListener('input', (e) => this.filter(e.target.value));
    }
    focusInitial() {
      const sel = this.$(`.opt[aria-selected="true"]`) || this.visibleOpts()[0];
      if (sel) { this.setActive(sel); sel.scrollIntoView({ block: 'nearest' }); }
      (this.$('.search input') || this.$('.list')).focus({ preventScroll: true });
    }
    visibleOpts() { return this.$$('.opt:not([hidden]):not([aria-disabled="true"])'); }
    setActive(el) {
      this.$$('.opt.active').forEach((o) => o.classList.remove('active'));
      if (!el) return;
      el.classList.add('active');
      (this.$('.search input') || this.$('.list')).setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block: 'nearest' });
    }
    filter(q) {
      const t = q.trim().toLowerCase();
      this.$$('.opt').forEach((el) => { const o = this.opts[el.dataset.i]; el.hidden = !!t && !(`${o.label} ${o.value} ${o.desc} ${o.keywords || ''}`.toLowerCase().includes(t)); });
      this.$$('.grp').forEach((g) => { g.hidden = !this.$$(`.opt:not([hidden])`).some((o) => o.dataset.g === g.dataset.g); });
      this.$('.empty').hidden = this.$$('.opt:not([hidden])').length > 0;
      this.setActive(this.visibleOpts()[0]);
      // fewer options, a shorter panel: placed again so that, above the field, it stays against it
      this.reposition(true);
    }
    listKey(e) {
      if (this.multiple && this.hasAttribute('select-all') && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a' && !e.target.matches('.search input')) { e.preventDefault(); this.toggleAll(); return; }
      const opts = this.visibleOpts(), cur = opts.indexOf(this.$('.opt.active'));
      let n = null;
      if (e.key === 'ArrowDown') n = opts[Math.min(cur + 1, opts.length - 1)];
      else if (e.key === 'ArrowUp') n = opts[Math.max(cur - 1, 0)];
      else if (e.key === 'Home' && !this.$('.search input')) n = opts[0];
      else if (e.key === 'End' && !this.$('.search input')) n = opts[opts.length - 1];
      else if (e.key === 'Enter' || (e.key === ' ' && !this.$('.search input'))) { e.preventDefault(); if (cur >= 0) this.pick(Number(opts[cur].dataset.i)); return; }
      else if (e.key === 'Tab') { this.hide(); return; }
      else if (e.key.length === 1 && !this.$('.search input')) { // type-ahead
        const k = e.key.toLowerCase();
        n = opts.slice(cur + 1).concat(opts.slice(0, cur + 1)).find((el) => this.opts[el.dataset.i].label.toLowerCase().startsWith(k));
      }
      if (n) { e.preventDefault(); this.setActive(n); }
    }
    /** select-all: every option that can be chosen, or none when they all are already (also Ctrl/⌘+A in the list) */
    toggleAll() {
      if (!this.multiple) return;
      const can = this.opts.filter((o) => !o.disabled).map((o) => o.value), all = can.every((v) => this._values.includes(v));
      this.setValue(all ? this._values.filter((v) => !can.includes(v)) : [...new Set([...this._values, ...can])], true);
      this.$$('.opt').forEach((el) => el.setAttribute('aria-selected', String(this._values.includes(this.opts[el.dataset.i]?.value))));
      this.syncAll();
    }
    syncAll() {
      const b = this.$('.all'); if (!b) return;
      const can = this.opts.filter((o) => !o.disabled).map((o) => o.value), all = can.length && can.every((v) => this._values.includes(v));
      b.innerHTML = `${svgIcon(all ? 'x' : 'check')}<span>${esc(all ? this.getAttribute('clear-all-label') || T(this, 'Clear all') : this.getAttribute('select-all-label') || T(this, 'Select all'))}</span>`;
    }
    pick(i) {
      const o = this.opts[i];
      if (!o || o.disabled) return;
      if (this.multiple) {
        const next = this._values.includes(o.value) ? this._values.filter((v) => v !== o.value) : [...this._values, o.value];
        this.setValue(next, true);
        const el = this.$(`.opt[data-i="${i}"]`);
        if (el) this.setActive(el);
        this.syncAll();
      } else {
        this.setValue([o.value], true);
        this.hide();
      }
    }
    triggerKey(e) { // arrows on the closed field change a single value directly
      if (this.multiple || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      const ok = this.opts.filter((o) => !o.disabled), i = ok.findIndex((o) => o.value === this._values[0]);
      const n = ok[Math.max(0, Math.min(ok.length - 1, i + (e.key === 'ArrowRight' ? 1 : -1)))];
      if (n) { e.preventDefault(); this.setValue([n.value], true); }
    }
    nativeHtml() { return `<select class="native" tabindex="-1" aria-hidden="true" ${this.hasAttribute('multiple') ? 'multiple' : ''}></select>`; }
    syncNative() {
      const n = this.native; if (!n) return;
      n.multiple = this.multiple;
      n.innerHTML = (this.multiple ? '' : `<option value="">${esc(this.getAttribute('placeholder') || '')}</option>`) + this.opts.map((o) => `<option value="${esc(o.value)}" ${o.disabled ? 'disabled' : ''}>${esc(o.label)}</option>`).join('');
      this.toNative();
    }
    toNative() { if (this.native) for (const o of this.native.options) o.selected = this._values.includes(o.value); }
    fromNative() { this.setValue([...this.native.selectedOptions].map((o) => o.value).filter(Boolean), true); }
    get value() { return this.trigger ? (this.multiple ? [...this._values] : this._values[0] ?? '') : this.getAttribute('value') ?? ''; }
    set value(v) { if (this.trigger) this.setValue(v ?? ''); else this.setAttribute('value', Array.isArray(v) ? v.join(',') : v ?? ''); }
    get options() { return this.opts || []; }
    /** How an option and a chosen value are drawn: subclasses (language, country) add a flag and a code. */
    /* <option data-icon="…">: an icon before the text, in the list and in the field */
    optionInner(o) { const t = `${esc(o.label)}${o.desc ? `<span class="opt-d">${esc(o.desc)}</span>` : ''}`; return o.icon ? `<span class="opt-row">${svgIcon(o.icon, 'opt-ic')}<span class="opt-t">${t}</span></span>` : t; }
    valueInner(o) { return o.icon ? `<span class="val-row">${svgIcon(o.icon, 'opt-ic')}<span>${esc(o.label)}</span></span>` : esc(o.label); }
  }
  define('sav-select', SavSelect);

  /* ================================================================== flags, sav-flag, sav-language-choice, sav-country-choice */

  /* Flags (flag-icons, MIT) and maps (world-atlas, ISC) are asset sets with their own version, like the icons: found next to the
     folder of sav.js, or on savcomponents.com for a copy hosted elsewhere (Sav.flagBase / Sav.mapBase change it). */
  Sav.flagsVersion = '1.0.0';
  Sav.mapsVersion = '1.0.0';
  const assetBase = (kind, ver) => {
    const u = new URL(SCRIPT_URL);
    const m = u.pathname.match(/^(.*\/)(?:v\/[^/]+|dist)\/[^/]*$/);
    return m ? `${u.origin}${m[1]}${kind}/${ver}/` : `https://savcomponents.com/${kind}/${ver}/`;
  };
  Sav.flagBase = SCRIPT?.dataset.flagBase || assetBase('flags', Sav.flagsVersion);
  Sav.mapBase = SCRIPT?.dataset.mapBase || assetBase('maps', Sav.mapsVersion);
  const flagUrl = (code) => (code && /^[a-z]{2}(-[a-z]{2,3})?$/.test(code) ? `${Sav.flagBase}${code}.svg` : '');

  /** ISO 3166-1 countries: alpha-2, alpha-3, numeric. Names come from the browser in the page language (Intl.DisplayNames). */
  const ISO_COUNTRIES = 'AF AFG 004,AX ALA 248,AL ALB 008,DZ DZA 012,AS ASM 016,AD AND 020,AO AGO 024,AI AIA 660,AQ ATA 010,AG ATG 028,AR ARG 032,AM ARM 051,AW ABW 533,AU AUS 036,AT AUT 040,AZ AZE 031,BS BHS 044,BH BHR 048,BD BGD 050,BB BRB 052,BY BLR 112,BE BEL 056,BZ BLZ 084,BJ BEN 204,BM BMU 060,BT BTN 064,BO BOL 068,BQ BES 535,BA BIH 070,BW BWA 072,BV BVT 074,BR BRA 076,IO IOT 086,BN BRN 096,BG BGR 100,BF BFA 854,BI BDI 108,CV CPV 132,KH KHM 116,CM CMR 120,CA CAN 124,KY CYM 136,CF CAF 140,TD TCD 148,CL CHL 152,CN CHN 156,CX CXR 162,CC CCK 166,CO COL 170,KM COM 174,CG COG 178,CD COD 180,CK COK 184,CR CRI 188,CI CIV 384,HR HRV 191,CU CUB 192,CW CUW 531,CY CYP 196,CZ CZE 203,DK DNK 208,DJ DJI 262,DM DMA 212,DO DOM 214,EC ECU 218,EG EGY 818,SV SLV 222,GQ GNQ 226,ER ERI 232,EE EST 233,SZ SWZ 748,ET ETH 231,FK FLK 238,FO FRO 234,FJ FJI 242,FI FIN 246,FR FRA 250,GF GUF 254,PF PYF 258,TF ATF 260,GA GAB 266,GM GMB 270,GE GEO 268,DE DEU 276,GH GHA 288,GI GIB 292,GR GRC 300,GL GRL 304,GD GRD 308,GP GLP 312,GU GUM 316,GT GTM 320,GG GGY 831,GN GIN 324,GW GNB 624,GY GUY 328,HT HTI 332,HM HMD 334,VA VAT 336,HN HND 340,HK HKG 344,HU HUN 348,IS ISL 352,IN IND 356,ID IDN 360,IR IRN 364,IQ IRQ 368,IE IRL 372,IM IMN 833,IL ISR 376,IT ITA 380,JM JAM 388,JP JPN 392,JE JEY 832,JO JOR 400,KZ KAZ 398,KE KEN 404,KI KIR 296,KP PRK 408,KR KOR 410,KW KWT 414,KG KGZ 417,LA LAO 418,LV LVA 428,LB LBN 422,LS LSO 426,LR LBR 430,LY LBY 434,LI LIE 438,LT LTU 440,LU LUX 442,MO MAC 446,MG MDG 450,MW MWI 454,MY MYS 458,MV MDV 462,ML MLI 466,MT MLT 470,MH MHL 584,MQ MTQ 474,MR MRT 478,MU MUS 480,YT MYT 175,MX MEX 484,FM FSM 583,MD MDA 498,MC MCO 492,MN MNG 496,ME MNE 499,MS MSR 500,MA MAR 504,MZ MOZ 508,MM MMR 104,NA NAM 516,NR NRU 520,NP NPL 524,NL NLD 528,NC NCL 540,NZ NZL 554,NI NIC 558,NE NER 562,NG NGA 566,NU NIU 570,NF NFK 574,MK MKD 807,MP MNP 580,NO NOR 578,OM OMN 512,PK PAK 586,PW PLW 585,PS PSE 275,PA PAN 591,PG PNG 598,PY PRY 600,PE PER 604,PH PHL 608,PN PCN 612,PL POL 616,PT PRT 620,PR PRI 630,QA QAT 634,RE REU 638,RO ROU 642,RU RUS 643,RW RWA 646,BL BLM 652,SH SHN 654,KN KNA 659,LC LCA 662,MF MAF 663,PM SPM 666,VC VCT 670,WS WSM 882,SM SMR 674,ST STP 678,SA SAU 682,SN SEN 686,RS SRB 688,SC SYC 690,SL SLE 694,SG SGP 702,SX SXM 534,SK SVK 703,SI SVN 705,SB SLB 090,SO SOM 706,ZA ZAF 710,GS SGS 239,SS SSD 728,ES ESP 724,LK LKA 144,SD SDN 729,SR SUR 740,SJ SJM 744,SE SWE 752,CH CHE 756,SY SYR 760,TW TWN 158,TJ TJK 762,TZ TZA 834,TH THA 764,TL TLS 626,TG TGO 768,TK TKL 772,TO TON 776,TT TTO 780,TN TUN 788,TR TUR 792,TM TKM 795,TC TCA 796,TV TUV 798,UG UGA 800,UA UKR 804,AE ARE 784,GB GBR 826,US USA 840,UM UMI 581,UY URY 858,UZ UZB 860,VU VUT 548,VE VEN 862,VN VNM 704,VG VGB 092,VI VIR 850,WF WLF 876,EH ESH 732,YE YEM 887,ZM ZMB 894,ZW ZWE 716'
    .split(',').map((r) => { const [a2, a3, num] = r.split(' '); return { a2, a3, num }; });
  /** Languages as spoken in a place: BCP 47 tag, ISO 639-3 code, flag. Variants of a language have their own flag (en-GB, en-US…);
      several languages can share a flag (India, Spain, Switzerland…). Names come from the browser. */
  const LANGS = 'af-ZA afr za,am-ET amh et,ar-SA ara sa,ar-EG ara eg,ar-AE ara ae,ar-MA ara ma,as-IN asm in,ast-ES ast es,az-AZ aze az,be-BY bel by,bg-BG bul bg,bn-BD ben bd,bn-IN ben in,br-FR bre fr,bs-BA bos ba,ca-ES cat es-ct,ckb-IQ ckb iq,co-FR cos fr,cs-CZ ces cz,cy-GB cym gb-wls,da-DK dan dk,de-DE deu de,de-AT deu at,de-CH deu ch,dv-MV div mv,dz-BT dzo bt,el-GR ell gr,en-GB eng gb,en-US eng us,en-AU eng au,en-CA eng ca,en-IE eng ie,en-IN eng in,en-NZ eng nz,en-ZA eng za,eo epo un,es-ES spa es,es-MX spa mx,es-AR spa ar,es-CO spa co,es-CL spa cl,es-US spa us,et-EE est ee,eu-ES eus es-pv,fa-IR fas ir,fi-FI fin fi,fil-PH fil ph,fo-FO fao fo,fr-FR fra fr,fr-BE fra be,fr-CA fra ca,fr-CH fra ch,fy-NL fry nl,ga-IE gle ie,gd-GB gla gb-sct,gl-ES glg es-ga,gu-IN guj in,ha-NG hau ng,he-IL heb il,hi-IN hin in,hr-HR hrv hr,hu-HU hun hu,hy-AM hye am,id-ID ind id,ig-NG ibo ng,is-IS isl is,it-IT ita it,it-CH ita ch,ja-JP jpn jp,ka-GE kat ge,kk-KZ kaz kz,kl-GL kal gl,km-KH khm kh,kn-IN kan in,ko-KR kor kr,ku-TR kmr tr,ky-KG kir kg,la lat va,lb-LU ltz lu,lo-LA lao la,lt-LT lit lt,lv-LV lav lv,mg-MG mlg mg,mi-NZ mri nz,mk-MK mkd mk,ml-IN mal in,mn-MN mon mn,mr-IN mar in,ms-MY msa my,mt-MT mlt mt,my-MM mya mm,nb-NO nob no,ne-NP nep np,nl-NL nld nl,nl-BE nld be,oc-FR oci fr,or-IN ori in,pa-IN pan in,pl-PL pol pl,ps-AF pus af,pt-PT por pt,pt-BR por br,rm-CH roh ch,ro-RO ron ro,ru-RU rus ru,rw-RW kin rw,sc-IT srd it,sd-PK snd pk,si-LK sin lk,sk-SK slk sk,sl-SI slv si,sm-WS smo ws,so-SO som so,sq-AL sqi al,sr-RS srp rs,sv-SE swe se,sw-KE swa ke,sw-TZ swa tz,ta-IN tam in,ta-LK tam lk,te-IN tel in,tg-TJ tgk tj,th-TH tha th,ti-ER tir er,tk-TM tuk tm,to-TO ton to,tr-TR tur tr,uk-UA ukr ua,ur-PK urd pk,ur-IN urd in,uz-UZ uzb uz,vi-VN vie vn,xh-ZA xho za,yo-NG yor ng,zh-CN zho cn,zh-TW zho tw,zh-HK zho hk,zu-ZA zul za'
    .split(',').map((r) => { const [tag, iso3, flag] = r.split(' '); return { tag, iso3, flag }; });
  Sav.countries = ISO_COUNTRIES; Sav.languages = LANGS;
  const displayName = (locale, type, code) => { try { return new Intl.DisplayNames([locale || document.documentElement.lang || navigator.language || 'en', 'en'], { type, fallback: 'code' }).of(code); } catch { return code; } };

  /** A flag on its own: <sav-flag code="it">. */
  class SavFlag extends SavElement {
    static styles = `:host { display: inline-flex; vertical-align: -.15em; width: var(--size, 1.33em); aspect-ratio: 4 / 3; } img { width: 100%; height: 100%; object-fit: cover; border-radius: var(--sav-flag-radius, 2px); box-shadow: 0 0 0 var(--sav-ink-width, 1px) var(--sav-ink-border, rgb(0 0 0 / .1)); }`;
    static get observedAttributes() { return ['code', 'label']; }
    connectedCallback() { this.render(); } changed() { this.render(); }
    render() {
      const code = (this.getAttribute('code') || '').toLowerCase(), label = this.getAttribute('label');
      this.shadowRoot.innerHTML = flagUrl(code) ? `<img part="image" src="${flagUrl(code)}" alt="${esc(label ?? '')}" loading="lazy" decoding="async">` : '';
      if (!label) this.setAttribute('aria-hidden', 'true'); else this.removeAttribute('aria-hidden');
    }
  }
  define('sav-flag', SavFlag);

  const REGION_CSS = `
    .fl { width: 1.35em; aspect-ratio: 4 / 3; flex: none; object-fit: cover; border-radius: var(--sav-flag-radius, 2px); box-shadow: 0 0 0 1px rgb(0 0 0 / .1); }
    .fl.none { background: var(--sav-color-surface-2); }
    .code { margin-left: auto; padding-left: .6rem; font-size: .78em; font-weight: var(--sav-font-weight-semibold); color: var(--sav-color-text-muted); font-variant-numeric: tabular-nums; letter-spacing: .04em; }
    .opt-l { display: flex; align-items: center; gap: .55rem; }
    .vrow { display: inline-flex; align-items: center; gap: .5rem; min-width: 0; }
    .vrow > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .chip .fl { width: 1.1em; }
    :host([no-flag]) .fl, :host([no-code]) .code { display: none; }
  `;
  /** Base of the two choices: options are generated (no need to write them), each with a flag on the left and a code on the right. */
  class SavRegionChoice extends SavSelect {
    static styles = [...SavSelect.styles, REGION_CSS];
    static get observedAttributes() { return [...SavSelect.observedAttributes, 'locale', 'include', 'exclude', 'native-names', 'code', 'no-flag', 'no-code']; }
    connectedCallback() { if (!this.hasAttribute('searchable')) this.setAttribute('searchable', ''); super.connectedCallback(); }
    changed(name, v) { if (['locale', 'include', 'exclude', 'native-names', 'code'].includes(name)) { this.readOptions(); this.refresh?.(); } super.changed?.(name, v); }
    filterList(list, key) {
      const inc = (this.getAttribute('include') || '').split(/[\s,]+/).filter(Boolean).map((x) => x.toLowerCase());
      const exc = new Set((this.getAttribute('exclude') || '').split(/[\s,]+/).filter(Boolean).map((x) => x.toLowerCase()));
      let out = list.filter((x) => !exc.has(key(x).toLowerCase()));
      if (inc.length) out = inc.map((c) => out.find((x) => key(x).toLowerCase() === c)).filter(Boolean);
      return out;
    }
    optionInner(o) { return `${o.flag ? `<img class="fl" src="${flagUrl(o.flag)}" alt="" loading="lazy">` : '<span class="fl none"></span>'}<span>${esc(o.label)}</span><span class="code" aria-hidden="true">${esc(o.code || '')}</span>`; }
    valueInner(o) { return `<span class="vrow">${o.flag ? `<img class="fl" src="${flagUrl(o.flag)}" alt="">` : ''}<span>${esc(o.label)}</span></span>`; }
  }

  class SavLanguageChoice extends SavRegionChoice {
    readOptions() {
      const loc = elLocale(this), nat = this.hasAttribute('native-names');
      const codeKind = this.getAttribute('code') || 'iso3';
      const list = this.filterList(LANGS, (l) => l.tag);
      this.opts = list.map((l) => {
        const name = displayName(loc, 'language', l.tag), native = displayName(l.tag, 'language', l.tag);
        const label = nat ? native : name;
        return { value: l.tag, label, disabled: false, group: '', desc: nat || native === name ? '' : '', flag: l.flag === 'un' ? '' : l.flag, code: codeKind === 'tag' ? l.tag : l.iso3.toUpperCase(), keywords: `${name} ${native} ${l.iso3} ${l.tag}` };
      }).sort((a, b) => a.label.localeCompare(b.label, loc || undefined));
    }
  }
  define('sav-language-choice', SavLanguageChoice);

  class SavCountryChoice extends SavRegionChoice {
    readOptions() {
      const loc = elLocale(this), codeKind = this.getAttribute('code') || 'alpha3';
      const list = this.filterList(ISO_COUNTRIES, (c) => c.a2);
      this.opts = list.map((c) => {
        const name = displayName(loc, 'region', c.a2);
        return { value: c.a2, label: name, disabled: false, group: '', desc: '', flag: c.a2.toLowerCase(), code: codeKind === 'alpha2' ? c.a2 : codeKind === 'numeric' ? c.num : c.a3, keywords: `${name} ${c.a2} ${c.a3}` };
      }).sort((a, b) => a.label.localeCompare(b.label, loc || undefined));
    }
  }
  define('sav-country-choice', SavCountryChoice);

  /* ================================================================== sav-date-picker (day, month or year) */

  class SavDatePicker extends SavPicker {
    static popupRole = 'dialog';
    static endIcon = 'calendar';
    static styles = [SIZES, FIELD, FLOAT, PICKER, `
      .pop { --popup-width: 20rem; --popup-height: 30rem; --_pp: .5rem; min-width: max(var(--_pw, 0px), 17.5rem); }
      .cal-head { display: flex; align-items: center; gap: .25rem; margin-bottom: .4rem; }
      .cal-title { flex: 1; padding: .4rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: inherit; font: inherit; font-weight: var(--sav-font-weight-bold); cursor: pointer; text-transform: capitalize; }
      .cal-title:hover, .nav:hover { background: var(--sav-color-surface-2); }
      .nav { display: inline-flex; padding: .4rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); cursor: pointer; }
      .nav svg { width: 1.1rem; height: 1.1rem; }
      .grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
      .grid.wide { grid-template-columns: repeat(3, 1fr); gap: 4px; }
      .wd { padding: .3rem 0; text-align: center; font-size: .72rem; font-weight: var(--sav-font-weight-bold); color: var(--sav-color-text-muted); text-transform: uppercase; }
      .cell { position: relative; isolation: isolate; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border: 0; padding: 0; background: none; color: inherit;
              font: inherit; font-variant-numeric: tabular-nums; border-radius: var(--sav-radius-sm); cursor: pointer; text-transform: capitalize; }
      .wide .cell { aspect-ratio: auto; padding: .7rem .2rem; }
      .cell::before { content: ""; position: absolute; inset: 1px; z-index: -1; border-radius: inherit; background: var(--_cb, transparent); transform: rotate(var(--sav-knob-tilt, 0deg)); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .cell:hover { --_cb: var(--sav-color-surface-2); }
      .cell.out { color: var(--sav-color-text-muted); opacity: .55; }
      .cell.today { font-weight: var(--sav-font-weight-bold); color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); }
      .cell.today::after { content: ""; position: absolute; bottom: 18%; width: 4px; height: 4px; border-radius: 50%; background: currentColor; }
      .cell.sel { color: var(--sav-color-on-primary); font-weight: var(--sav-font-weight-bold); --_cb: var(--sav-color-primary); }
      .cell:disabled { opacity: .3; cursor: not-allowed; --_cb: transparent; }
      .cell:focus-visible { outline: 2px solid var(--sav-color-focus); outline-offset: 0; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host([auto-text]) .cell.sel { --_eb: var(--sav-color-primary); color: ${AUTO_TEXT}; }
      :host([auto-text]) .cell.today:not(.sel) { --_eb: var(--sav-color-bg); color: ${AUTO_TEXT}; }
      /* mode="datetime": the time under the calendar, hours and minutes typed or moved with the arrows */
      .tm { display: flex; align-items: center; gap: .35rem; margin-top: .55rem; padding-top: .55rem; border-top: 1px solid var(--sav-color-border); }
      .tm-l { flex: 1; font-size: .8rem; font-weight: var(--sav-font-weight-bold); color: var(--sav-color-text-muted); }
      .tm input { box-sizing: border-box; width: 2.9rem; padding: .4rem .2rem; border: 1px solid var(--sav-color-border-strong); border-radius: var(--sav-radius-sm); background: var(--sav-color-surface);
                  color: inherit; font: inherit; font-variant-numeric: tabular-nums; text-align: center; transform: rotate(var(--sav-knob-tilt, 0deg)); }
      .tm input:focus-visible { outline: 2px solid var(--sav-color-focus); outline-offset: 1px; }
      .tm .colon { font-weight: var(--sav-font-weight-bold); color: var(--sav-color-text-muted); }
      .lnk.done { margin-inline-start: auto; color: var(--sav-color-primary); font-weight: var(--sav-font-weight-bold); }
    `];
    static get observedAttributes() { return [...SavPicker.observedAttributes, 'mode', 'first-day']; }
    get mode() { return ['month', 'year', 'datetime'].includes(this.getAttribute('mode')) ? this.getAttribute('mode') : 'date'; }
    /** the day of the value (in datetime mode the value also has the time: 2026-11-19T10:30) */
    get day() { return this.mode === 'datetime' ? this._v.slice(0, 10) : this._v; }
    get time() { return this.mode === 'datetime' ? this._v.slice(11, 16) : ''; }
    init() {
      this.parse(this.getAttribute('value') || '');
      this.$('.body').addEventListener('click', (e) => this.bodyClick(e));
      this.$('.body').addEventListener('keydown', (e) => { this.timeKey(e); this.gridKey(e); });
      this.$('.body').addEventListener('input', (e) => this.timeInput(e));
      this.$('.body').addEventListener('focusout', (e) => { const i = e.target.closest?.('.tm input'); if (i && /^\d$/.test(i.value.trim())) i.value = pad(+i.value); });
    }
    parse(v) {
      v = String(v || '').trim();
      if (this.mode === 'datetime') {
        // 2026-11-19T10:30, with seconds or a space, or only the day (then midnight)
        const m = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{1,2}):(\d{2}))?/.exec(v);
        this._v = m && (m[2] === undefined || (+m[2] < 24 && +m[3] < 60)) ? `${m[1]}T${pad(+(m[2] || 0))}:${m[3] || '00'}` : '';
        return;
      }
      const re = { date: /^\d{4}-\d{2}-\d{2}$/, month: /^\d{4}-\d{2}$/, year: /^\d{4}$/ }[this.mode];
      this._v = re.test(v) ? v : '';
    }
    serialize() { return this._v; }
    parts(v = this._v) { const [y, m, d] = (v || '').slice(0, 10).split('-').map(Number); return { y, m: m || 1, d: d || 1 }; }
    fmt(v) {
      const { y, m, d } = this.parts(v);
      if (this.mode === 'datetime') {
        const [hh, mm] = (v.slice(11, 16) || '00:00').split(':').map(Number);
        try { return new Intl.DateTimeFormat(userLocale(this), { dateStyle: this.getAttribute('format') || 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(Date.UTC(y, m - 1, d, hh, mm)); } catch { return v; }
      }
      const opts = { date: { dateStyle: this.getAttribute('format') || 'medium' }, month: { month: 'long', year: 'numeric' }, year: { year: 'numeric' } }[this.mode];
      try { return new Intl.DateTimeFormat(userLocale(this), { ...opts, timeZone: 'UTC' }).format(Date.UTC(y, m - 1, d)); } catch { return v; }
    }
    displayHtml() { return this._v ? esc(this.fmt(this._v)) : ''; }
    key(y, m, d) { return this.mode === 'year' ? String(y) : this.mode === 'month' ? `${y}-${pad(m)}` : `${y}-${pad(m)}-${pad(d)}`; }
    inRange(k) {
      const cut = (x) => x ? x.slice(0, k.length) : null;
      const min = cut(this.getAttribute('min')), max = cut(this.getAttribute('max'));
      return !(min && k < min) && !(max && k > max);
    }
    firstDay() {
      const a = this.getAttribute('first-day');
      if (a !== null && a !== '') return Number(a) % 7;
      try { const l = new Intl.Locale(userLocale(this)); const w = l.getWeekInfo?.() || l.weekInfo; if (w) return w.firstDay % 7; } catch {}
      return /-US$|^en-US/i.test(userLocale(this)) ? 0 : 1;
    }
    show() {
      const now = new Date(), p = this._v ? this.parts() : { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
      this.cur = { ...p };
      this.view = this.mode === 'date' || this.mode === 'datetime' ? 'days' : this.mode === 'month' ? 'months' : 'years';
      super.show();
    }
    renderBody() {
      if (this._typing) { this.$$('.cell.sel').forEach((c) => c.classList.remove('sel')); this.$(`.cell[data-k="${this.day}"]`)?.classList.add('sel'); return; }
      const loc = userLocale(this), { y, m } = this.cur;
      const today = new Date(), tk = this.key(today.getFullYear(), today.getMonth() + 1, today.getDate());
      let title, grid;
      if (this.view === 'days') {
        title = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(Date.UTC(y, m - 1, 1));
        const fd = this.firstDay();
        const wd = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(loc, { weekday: 'narrow', timeZone: 'UTC' }).format(Date.UTC(2023, 0, 1 + ((fd + i) % 7))));
        const start = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() - fd + 7) % 7;
        const cells = [];
        for (let i = 0; i < 42; i++) {
          const dt = new Date(Date.UTC(y, m - 1, 1 - start + i));
          const k = this.key(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
          const label = new Intl.DateTimeFormat(loc, { dateStyle: 'full', timeZone: 'UTC' }).format(dt);
          cells.push(`<button type="button" class="cell${dt.getUTCMonth() + 1 !== m ? ' out' : ''}${k === tk ? ' today' : ''}${k === this.day ? ' sel' : ''}" data-k="${k}" aria-label="${esc(label)}" ${k === this.day ? 'aria-pressed="true"' : ''} ${this.inRange(k) ? '' : 'disabled'} tabindex="-1">${dt.getUTCDate()}</button>`);
        }
        grid = `<div class="grid" role="grid">${wd.map((w) => `<span class="wd" aria-hidden="true">${esc(w)}</span>`).join('')}${cells.join('')}</div>`;
      } else if (this.view === 'months') {
        title = String(y);
        grid = `<div class="grid wide">${Array.from({ length: 12 }, (_, i) => {
          const k = `${y}-${pad(i + 1)}`, sel = this._v.slice(0, 7) === k;
          return `<button type="button" class="cell${sel ? ' sel' : ''}${tk.slice(0, 7) === k ? ' today' : ''}" data-month="${i + 1}" ${this.inRange(k) ? '' : 'disabled'} tabindex="-1">${esc(new Intl.DateTimeFormat(loc, { month: 'short', timeZone: 'UTC' }).format(Date.UTC(y, i, 1)))}</button>`;
        }).join('')}</div>`;
      } else {
        const from = Math.floor(y / 12) * 12;
        title = `${from} – ${from + 11}`;
        grid = `<div class="grid wide">${Array.from({ length: 12 }, (_, i) => {
          const yy = from + i, sel = this._v.slice(0, 4) === String(yy);
          return `<button type="button" class="cell${sel ? ' sel' : ''}${tk.slice(0, 4) === String(yy) ? ' today' : ''}" data-year="${yy}" ${this.inRange(String(yy)) ? '' : 'disabled'} tabindex="-1">${yy}</button>`;
        }).join('')}</div>`;
      }
      const dt = this.mode === 'datetime';
      const todayLabel = T(this, { date: 'Today', month: 'This month', year: 'This year', datetime: 'Now' }[this.mode]);
      // datetime: hours and minutes under the calendar; choosing a day keeps the panel open, Done closes it
      const [hh, mi] = (this.time || this.nowTime()).split(':');
      const time = dt ? `<div class="tm"><span class="tm-l" id="tm-l">${esc(T(this, 'Time'))}</span><input class="hh" inputmode="numeric" maxlength="2" value="${hh}" aria-label="${esc(T(this, 'Hours'))}" aria-describedby="tm-l"><span class="colon" aria-hidden="true">:</span><input class="mi" inputmode="numeric" maxlength="2" value="${mi}" aria-label="${esc(T(this, 'Minutes'))}" aria-describedby="tm-l"></div>` : '';
      this.$('.body').innerHTML = `<div class="cal-head"><button type="button" class="nav" data-nav="-1" aria-label="${esc(T(this, 'Previous'))}">${svgIcon('chevron-left')}</button>
        <button type="button" class="cal-title" ${this.view === 'years' ? 'disabled' : ''} aria-live="polite">${esc(title)}</button>
        <button type="button" class="nav" data-nav="1" aria-label="${esc(T(this, 'Next'))}">${svgIcon('chevron-right')}</button></div>${grid}${time}
        <div class="foot"><button type="button" class="lnk" data-act="today">${esc(todayLabel)}</button>${this.hasAttribute('clearable') || !this.required ? `<button type="button" class="lnk" data-act="clear">${esc(T(this, 'Clear'))}</button>` : ''}${dt ? `<button type="button" class="lnk done" data-act="done">${esc(T(this, 'Done'))}</button>` : ''}</div>`;
      const focus = this.$('.cell.sel:not(:disabled)') || this.$(`.cell[data-k="${this.key(this.cur.y, this.cur.m, this.cur.d)}"]`) || this.$('.cell:not(.out):not(:disabled)');
      if (focus) focus.tabIndex = 0;
    }
    focusInitial() { (this.$('.cell[tabindex="0"]') || this.$('.cal-title')).focus({ preventScroll: true }); }
    bodyClick(e) {
      const b = e.target.closest('button');
      if (!b || b.disabled) return;
      if (b.dataset.nav) {
        const d = Number(b.dataset.nav);
        if (this.view === 'days') { const dt = new Date(Date.UTC(this.cur.y, this.cur.m - 1 + d, 1)); this.cur.y = dt.getUTCFullYear(); this.cur.m = dt.getUTCMonth() + 1; }
        else this.cur.y += this.view === 'months' ? d : d * 12;
        this.renderBody();
        return;
      }
      if (b.classList.contains('cal-title')) { this.view = this.view === 'days' ? 'months' : 'years'; this.renderBody(); this.focusInitial(); return; }
      if (b.dataset.k) { this.choose(b.dataset.k); return; }
      if (b.dataset.month) {
        if (this.mode === 'month') this.choose(`${this.cur.y}-${pad(b.dataset.month)}`);
        else { this.cur.m = Number(b.dataset.month); this.view = 'days'; this.renderBody(); this.focusInitial(); }
        return;
      }
      if (b.dataset.year) {
        if (this.mode === 'year') this.choose(b.dataset.year);
        else { this.cur.y = Number(b.dataset.year); this.view = 'months'; this.renderBody(); this.focusInitial(); }
        return;
      }
      if (b.dataset.act === 'today') { const t = new Date(); if (this.mode === 'datetime') { this.setValue(`${this.key(t.getFullYear(), t.getMonth() + 1, t.getDate())}T${this.nowTime()}`, true); this.hide(); } else this.choose(this.key(t.getFullYear(), t.getMonth() + 1, t.getDate())); }
      if (b.dataset.act === 'clear') { this.setValue('', true); this.hide(); }
      if (b.dataset.act === 'done') this.hide();
    }
    nowTime() { const t = new Date(); return `${pad(t.getHours())}:${pad(t.getMinutes())}`; }
    choose(k) {
      if (!this.inRange(k)) return;
      if (this.mode !== 'datetime') { this.setValue(k, true); this.hide(); return; }
      // datetime: the day changes, the time stays (or is the one shown under the calendar); the panel stays open for the time
      this.setValue(`${k}T${this.time || this.readTime() || this.nowTime()}`, true);
      this.cur = this.parts(); this.renderBody();
      this.$(`.cell[data-k="${k}"]`)?.focus();
    }
    /** the time typed under the calendar, or '' when it is not a time */
    readTime() {
      const h = this.$('.tm .hh')?.value.trim(), m = this.$('.tm .mi')?.value.trim();
      if (!/^\d{1,2}$/.test(h || '') || !/^\d{1,2}$/.test(m || '') || +h > 23 || +m > 59) return '';
      return `${pad(+h)}:${pad(+m)}`;
    }
    timeInput(e) {
      const inp = e.target.closest?.('.tm input'); if (!inp) return;
      const t = this.readTime();
      inp.toggleAttribute('aria-invalid', !t && inp.value.trim() !== '');
      if (!t) return;
      const t0 = new Date();
      const day = this.day || this.key(this.cur?.y ?? t0.getFullYear(), this.cur?.m ?? t0.getMonth() + 1, this.day ? 1 : t0.getDate());
      this._typing = true; // the panel is not drawn again while the time is typed: the field keeps the cursor
      try { this.setValue(`${day}T${t}`, true); } finally { this._typing = false; }
    }
    timeKey(e) {
      const inp = e.target.closest?.('.tm input'); if (!inp) return;
      const step = { ArrowUp: 1, ArrowDown: -1, PageUp: inp.classList.contains('mi') ? 10 : 6, PageDown: inp.classList.contains('mi') ? -10 : -6 }[e.key];
      if (step) {
        e.preventDefault(); e.stopPropagation();
        const max = inp.classList.contains('hh') ? 24 : 60;
        inp.value = pad(((Number(inp.value) || 0) + step + max) % max);
        this.timeInput(e);
      } else if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (this.readTime()) this.hide(); }
    }
    gridKey(e) {
      const cell = e.target.closest?.('.cell');
      if (!cell) return;
      const cells = this.$$('.cell'), i = cells.indexOf(cell), cols = this.view === 'days' ? 7 : 3;
      const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
      if (step && this.view === 'days') {
        e.preventDefault();
        const dt = new Date(Date.UTC(...cell.dataset.k.split('-').map((n, j) => (j === 1 ? n - 1 : +n))));
        dt.setUTCDate(dt.getUTCDate() + step);
        this.moveTo(dt);
      } else if (step) {
        e.preventDefault();
        const n = cells[Math.max(0, Math.min(cells.length - 1, i + step))];
        cells.forEach((c) => (c.tabIndex = -1)); n.tabIndex = 0; n.focus();
      } else if ((e.key === 'PageUp' || e.key === 'PageDown') && this.view === 'days') {
        e.preventDefault();
        const [yy, mm, dd] = cell.dataset.k.split('-').map(Number);
        this.moveTo(new Date(Date.UTC(yy, mm - 1 + (e.key === 'PageDown' ? 1 : -1), dd)));
      }
    }
    moveTo(dt) {
      this.cur = { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
      this.renderBody();
      this.$$('.cell').forEach((c) => (c.tabIndex = -1));
      const c = this.$(`.cell[data-k="${this.key(this.cur.y, this.cur.m, this.cur.d)}"]`);
      if (c) { c.tabIndex = 0; c.focus(); }
    }
    nativeHtml() {
      const type = { date: 'date', month: 'month', datetime: 'datetime-local' }[this.getAttribute('mode') || 'date'];
      return type ? `<input class="native" type="${type}" tabindex="-1" aria-hidden="true">` : '';
    }
    syncNative() { if (!this.native) return; ['min', 'max'].forEach((a) => (this.getAttribute(a) ? this.native.setAttribute(a, this.getAttribute(a)) : this.native.removeAttribute(a))); this.toNative(); }
    toNative() { if (this.native) this.native.value = this._v; }
  }
  define('sav-date-picker', SavDatePicker);

  /* ================================================================== sav-time-picker */

  class SavTimePicker extends SavPicker {
    static popupRole = 'dialog';
    static endIcon = 'clock';
    static styles = [SIZES, FIELD, FLOAT, PICKER, `
      .pop { --popup-width: 16rem; --_pp: .4rem; min-width: max(var(--_pw, 0px), 11rem); }
      .cols { display: flex; gap: .3rem; height: calc(min(15rem, 50vh) - 1.6rem); }
      .col { flex: 1; overflow-y: auto; scroll-snap-type: y proximity; scrollbar-width: thin; padding: 0 .1rem; }
      /* the names of the columns sit above them, outside what scrolls: on the panel itself, with no background of their own */
      .cols-h { display: flex; gap: .3rem; }
      .col-h { flex: 1; padding: .3rem .1rem; text-align: center; font-size: .72rem; font-weight: var(--sav-font-weight-bold); text-transform: uppercase; color: var(--sav-color-text-muted); }
      .t { position: relative; isolation: isolate; display: block; width: 100%; padding: .45rem 0; border: 0; background: none; color: inherit; font: inherit; font-variant-numeric: tabular-nums; text-align: center; cursor: pointer; border-radius: var(--sav-radius-sm); scroll-snap-align: center; }
      .t::before { content: ""; position: absolute; inset: 1px 2px; z-index: -1; border-radius: inherit; background: var(--_cb, transparent); transform: rotate(var(--sav-knob-tilt, 0deg)); }
      .t:hover { --_cb: var(--sav-color-surface-2); }
      .t.sel { color: var(--sav-color-on-primary); font-weight: var(--sav-font-weight-bold); --_cb: var(--sav-color-primary); }
      .t:disabled { opacity: .3; cursor: not-allowed; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host([auto-text]) .t.sel { --_eb: var(--sav-color-primary); color: ${AUTO_TEXT}; }
      /* animation: changes of colour and state ease in (paced by --sav-motion) */
      .t::before { transition: background calc(var(--sav-duration) * var(--sav-motion, 1)); }
    `];
    static get observedAttributes() { return [...SavPicker.observedAttributes, 'step', 'hour-cycle']; }
    init() { this.parse(this.getAttribute('value') || ''); this.$('.body').addEventListener('click', (e) => this.bodyClick(e)); }
    parse(v) { const m = /^(\d{1,2}):(\d{2})/.exec(String(v || '')); this._v = m && +m[1] < 24 && +m[2] < 60 ? `${pad(+m[1])}:${m[2]}` : ''; }
    serialize() { return this._v; }
    get h12() {
      const a = this.getAttribute('hour-cycle');
      if (a) return a === '12';
      try { return /h1[12]/.test(new Intl.DateTimeFormat(userLocale(this), { hour: 'numeric' }).resolvedOptions().hourCycle); } catch { return false; }
    }
    displayHtml() {
      if (!this._v) return '';
      const [h, m] = this._v.split(':').map(Number);
      try { return esc(new Intl.DateTimeFormat(userLocale(this), { hour: 'numeric', minute: '2-digit', hourCycle: this.h12 ? 'h12' : 'h23', timeZone: 'UTC' }).format(Date.UTC(2000, 0, 1, h, m))); } catch { return this._v; }
    }
    inRange(t) { const min = this.getAttribute('min'), max = this.getAttribute('max'); return !(min && t < min) && !(max && t > max); }
    renderBody() {
      const [h, m] = (this._v || '').split(':').map(Number);
      const step = Math.max(1, Number(this.getAttribute('step')) || 5);
      const hours = this.h12 ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : Array.from({ length: 24 }, (_, i) => i);
      // with no time yet, the period of the current time is already chosen: the hour picked next goes with it
      const pm = this._v ? h >= 12 : this.pendingPm();
      const hourOf = (x) => (this.h12 ? (x % 12) + (pm ? 12 : 0) : x);
      const col = (name, items) => `<div class="col" role="listbox" aria-label="${esc(name)}">${items}</div>`;
      const head = (title) => `<span class="col-h">${esc(title)}</span>`;
      const hh = hours.map((x) => `<button type="button" class="t${this._v && hourOf(x) === h ? ' sel' : ''}" data-h="${hourOf(x)}">${this.h12 ? x : pad(x)}</button>`).join('');
      const mm = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step).map((x) => `<button type="button" class="t${this._v && x === m ? ' sel' : ''}" data-m="${x}">${pad(x)}</button>`).join('');
      const ap = this.h12 ? col(T(this, 'Morning or afternoon'), ['AM', 'PM'].map((x, i) => `<button type="button" class="t${(i === 1) === pm ? ' sel' : ''}" data-ap="${i}">${x}</button>`).join('')) : '';
      this.$('.body').innerHTML = `<div class="cols-h" aria-hidden="true">${head(T(this, 'Hour'))}${head(T(this, 'Min'))}${this.h12 ? head(T(this, 'AM/PM')) : ''}</div>
        <div class="cols">${col(T(this, 'Hours'), hh)}${col(T(this, 'Minutes'), mm)}${ap}</div>
        <div class="foot"><button type="button" class="lnk" data-act="now">${esc(T(this, 'Now'))}</button><button type="button" class="lnk" data-act="done">${esc(T(this, 'Done'))}</button></div>`;
      requestAnimationFrame(() => this.$$('.col .t.sel').forEach((b) => b.scrollIntoView({ block: 'center' })));
    }
    /** 12 hours with no time yet: the period chosen so far (AM or PM), at first the one of the current time */
    pendingPm() { return this._pm ?? new Date().getHours() >= 12; }
    focusInitial() { (this.$('.t.sel[data-h]') || this.$('.t[data-h]')).focus({ preventScroll: true }); }
    bodyClick(e) {
      const b = e.target.closest('button'); if (!b) return;
      // no time yet: AM or PM only chooses the period, the time comes with the hour or the minutes
      if (!this._v && b.dataset.ap !== undefined) { this._pm = b.dataset.ap === '1'; this.renderBody(); this.$(`.t[data-ap="${b.dataset.ap}"]`)?.focus({ preventScroll: true }); return; }
      let [h, m] = (this._v || (this.h12 && this.pendingPm() ? '12:00' : '00:00')).split(':').map(Number);
      if (b.dataset.h !== undefined) h = Number(b.dataset.h);
      if (b.dataset.m !== undefined) m = Number(b.dataset.m);
      if (b.dataset.ap !== undefined) h = (h % 12) + (b.dataset.ap === '1' ? 12 : 0);
      if (b.dataset.act === 'now') { const n = new Date(); h = n.getHours(); m = n.getMinutes(); }
      if (b.dataset.act === 'done') { this.hide(); return; }
      const t = `${pad(h)}:${pad(m)}`;
      if (!this.inRange(t)) return;
      const before = this._v;
      this.parse(t); this.refresh();
      if (before !== this._v) this.emit('input');
      this._changed = true;
      const keep = this.$('.cols')?.scrollTop;
      this.renderBody();
      if (b.dataset.act === 'now') this.hide();
    }
    onClose() { if (this._changed) { this._changed = false; this.emit('change'); this.markTouched(); } }
    nativeHtml() { return '<input class="native" type="time" tabindex="-1" aria-hidden="true">'; }
    syncNative() { if (!this.native) return; this.native.step = (Number(this.getAttribute('step')) || 5) * 60; ['min', 'max'].forEach((a) => (this.getAttribute(a) ? this.native.setAttribute(a, this.getAttribute(a)) : this.native.removeAttribute(a))); this.toNative(); }
    toNative() { if (this.native) this.native.value = this._v; }
  }
  define('sav-time-picker', SavTimePicker);

  /* ================================================================== sav-checkbox / sav-switch */

  class SavCheckbox extends SavFormControl {
    static styles = [VARIANTS, SIZES, `
      :host { display: inline-block; color: var(--sav-color-text); --_box: calc(var(--_fs) * 1.25); }
      .row { display: inline-flex; align-items: flex-start; gap: .55rem; cursor: pointer; font-size: var(--_fs); line-height: 1.4; user-select: none; }
      :host([disabled]) .row { opacity: .55; cursor: not-allowed; }
      .ctl { position: relative; flex: none; width: var(--_box); height: var(--_box); margin-top: calc((1.4em - var(--_box)) / 2); }
      input { appearance: none; -webkit-appearance: none; margin: 0; width: 100%; height: 100%; cursor: inherit;
              border: calc(var(--sav-border-width) + .5px) solid var(--sav-color-border-strong); border-radius: calc(var(--sav-radius) * .55); background: var(--sav-color-input-bg);
              transform: rotate(var(--sav-knob-tilt, 0deg)); box-shadow: ${INK_DROP()};
              transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
      input:checked, input:indeterminate { transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -.5)); }
      input:hover { border-color: var(--sav-ink-border, var(--_c)); box-shadow: ${INK_DROP('3px')}; }
      input:checked, input:indeterminate { background: var(--_c); border-color: var(--sav-ink-border, var(--_c)); }
      .mark { position: absolute; inset: 0; margin: auto; width: 75%; height: 75%; color: var(--_on); pointer-events: none; opacity: 0; transform: scale(.6); transition: opacity calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(var(--sav-duration) * var(--sav-motion, 1)) var(--sav-easing); }
      .mark * { stroke-width: 3; }
      input:checked ~ .tick, input:indeterminate ~ .dash { opacity: 1; transform: none; }
      input:indeterminate ~ .tick { opacity: 0; }
      :host([data-user-invalid]) input { border-color: var(--sav-color-danger); }
      .help { display: block; font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); margin: .15rem 0 0 calc(var(--_box) + .55rem); }
      .help:empty { display: none; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: var(--_c); }
      :host(:is([auto-text], [data-auto-text])) .mark { color: ${AUTO_TEXT}; }
    `];
    static get observedAttributes() { return [...FC, 'checked', 'indeterminate', 'value', 'help']; }
    static ROLE = 'checkbox';
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = this.template();
      const input = (this.native = this.$('input'));
      this._default = this.hasAttribute('checked');
      input.checked = this._default;
      input.indeterminate = this.hasAttribute('indeterminate');
      input.addEventListener('change', () => {
        this.removeAttribute('indeterminate');
        this.onValue(); this.markTouched();
        this.emit('change');
      });
      input.addEventListener('invalid', () => this.markTouched());
      this.sync();
    }
    template() {
      return `<label class="row" part="base"><span class="ctl" part="control"><input type="checkbox" part="input">${svgIcon('check', 'mark tick')}${svgIcon('minus', 'mark dash')}</span><span part="label"><slot></slot></span></label><div class="help" part="help-text"></div>`;
    }
    changed(name) {
      if (!this.native) return;
      if (name === 'checked') { this.native.checked = this.hasAttribute('checked'); this.onValue(); }
      else if (name === 'indeterminate') this.native.indeterminate = this.hasAttribute('indeterminate');
      this.sync();
    }
    sync() {
      const i = this.native;
      i.disabled = this.isDisabled; i.required = this.required;
      if (this.constructor.ROLE === 'switch') i.setAttribute('role', 'switch');
      this.$('.help').textContent = this.getAttribute('help') || '';
      this.onValue();
    }
    onValue() {
      this.internals.setFormValue(this.native.checked ? (this.getAttribute('value') ?? 'on') : null);
      this.syncValidity();
      if (this.hasAttribute('data-user-invalid')) this.markTouched();
    }
    formResetCallback() { this.native.checked = this._default; this.onValue(); this.removeAttribute('data-user-invalid'); }
    get checked() { return this.native ? this.native.checked : this.hasAttribute('checked'); }
    set checked(v) { if (this.native) { this.native.checked = !!v; this.onValue(); } else this.toggleAttribute('checked', !!v); }
    get indeterminate() { return this.native ? this.native.indeterminate : this.hasAttribute('indeterminate'); }
    set indeterminate(v) { this.toggleAttribute('indeterminate', !!v); }
    get value() { return this.getAttribute('value') ?? 'on'; }
    set value(v) { this.setAttribute('value', v); }
    toggle() { this.checked = !this.checked; this.emit('change'); }
    focus(o) { this.native?.focus(o); }
    click() { this.native?.click(); }
  }
  props(SavCheckbox, { variant: String, size: String });
  define('sav-checkbox', SavCheckbox);

  class SavSwitch extends SavCheckbox {
    static ROLE = 'switch';
    static styles = [VARIANTS, SIZES, `
      :host { display: inline-block; color: var(--sav-color-text); --_w: calc(var(--_fs) * 2.4); --_th: calc(var(--_fs) * 1.35); }
      .row { display: inline-flex; align-items: flex-start; gap: .6rem; cursor: pointer; font-size: var(--_fs); line-height: 1.4; user-select: none; }
      :host([disabled]) .row { opacity: .55; cursor: not-allowed; }
      .ctl { position: relative; flex: none; width: var(--_w); height: var(--_th); margin-top: calc((1.4em - var(--_th)) / 2); }
      input { appearance: none; -webkit-appearance: none; margin: 0; width: 100%; height: 100%; cursor: inherit; border-radius: var(--sav-radius-pill);
              background: var(--sav-switch-track, var(--sav-color-border-strong)); background-image: var(--sav-sheen, none); box-shadow: var(--sav-switch-track-shadow, var(--sav-track-shadow, none)); border: 0;
              -webkit-backdrop-filter: var(--sav-switch-backdrop, none); backdrop-filter: var(--sav-switch-backdrop, none);
              transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)); }
      input:checked { background-color: oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h); box-shadow: var(--sav-switch-on-shadow, var(--sav-switch-track-shadow, var(--sav-track-shadow, none))); }
      .thumb { position: absolute; top: 3px; left: 3px; box-sizing: border-box; width: calc(var(--_th) - 6px); height: calc(var(--_th) - 6px); border-radius: var(--sav-knob-radius, 50%); background: var(--sav-switch-thumb-bg, #fff); border: var(--sav-switch-thumb-border, 0);
               box-shadow: var(--sav-switch-thumb-shadow, 0 1px 3px rgb(0 0 0 / .25)); pointer-events: none; transform: rotate(var(--sav-knob-tilt, 0deg)); transition: transform calc(var(--sav-duration) * var(--sav-motion, 1)) var(--sav-easing); }
      input:checked + .thumb { transform: translateX(calc(var(--_w) - var(--_th))) rotate(calc(var(--sav-knob-tilt, 0deg) * -1)); }
      .help { display: block; font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); margin: .15rem 0 0 calc(var(--_w) + .6rem); }
      .help:empty { display: none; }
    `];
    template() {
      return `<label class="row" part="base"><span class="ctl" part="control"><input type="checkbox" role="switch" part="input"><span class="thumb" part="thumb"></span></span><span part="label"><slot></slot></span></label><div class="help" part="help-text"></div>`;
    }
  }
  define('sav-switch', SavSwitch);

  /* ================================================================== sav-radio-group / sav-radio */

  class SavRadio extends SavElement {
    static styles = [VARIANTS, SIZES, `
      :host { display: inline-flex; color: var(--sav-color-text); --_box: calc(var(--_fs) * 1.25); outline: none; }
      .row { display: inline-flex; align-items: flex-start; gap: .55rem; cursor: pointer; font-size: var(--_fs); line-height: 1.4; user-select: none; }
      :host([disabled]) .row { opacity: .55; cursor: not-allowed; }
      .dot { flex: none; position: relative; width: var(--_box); height: var(--_box); margin-top: calc((1.4em - var(--_box)) / 2); border-radius: var(--sav-knob-radius, 50%); transform: rotate(var(--sav-knob-tilt, 0deg));
             border: calc(var(--sav-border-width) + .5px) solid var(--sav-color-border-strong); background: var(--sav-color-input-bg); box-shadow: ${INK_DROP()}; transition: box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)), background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .dot::after { content: ""; position: absolute; inset: 0; margin: auto; width: 42%; height: 42%; border-radius: var(--sav-knob-radius, 50%); background: var(--_on); transform: scale(0); transition: transform calc(var(--sav-duration) * var(--sav-motion, 1)) var(--sav-easing); }
      .row:hover .dot { border-color: var(--sav-ink-border, var(--_c)); box-shadow: ${INK_DROP('3px')}; }
      :host([checked]) .dot { background: var(--_c); border-color: var(--sav-ink-border, var(--_c)); }
      :host([checked]) .dot::after { transform: scale(1); }
      :host(:focus-visible) .dot { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 2px; }
      /* segmented buttons: drawn like the segmented tabs (background on a layer that leans with the style, text upright) */
      :host([data-appearance="buttons"]) .dot { display: none; }
      :host([data-appearance="buttons"]) .row { position: relative; isolation: isolate; align-items: center; justify-content: center; min-height: calc(var(--_h) - 6px - 2 * var(--sav-border-width)); /* with the 3px track and its border: as tall as a field or a button */ padding: 0 calc(var(--_h) * .42);
        border-radius: calc(var(--sav-radius) - 2px); font-weight: var(--sav-font-weight-semibold); color: var(--sav-color-text-muted); white-space: nowrap; transition: color calc(var(--sav-duration) * var(--sav-motion, 1)); }
      :host([data-appearance="buttons"]) .row::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_rb, transparent); background-image: var(--_rsh, none); box-shadow: var(--_rs, none);
        transform: rotate(${TILT}); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.22s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([data-appearance="buttons"]) .row:hover { color: var(--sav-color-text); }
      :host([data-appearance="buttons"][checked]) .row { color: var(--sav-color-text); --_rb: var(--sav-color-surface); --_rsh: var(--sav-sheen, none); --_rs: var(--sav-tab-segment-shadow, var(--sav-shadow-sm)); }
      :host([data-appearance="buttons"]:focus-visible) .row { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: -2px; }
      :host([data-appearance="buttons"]) { flex: 1 0 auto; }
      /* an icon next to the text keeps a small gap from it */
      :host([data-appearance="buttons"]) .lb { display: inline-flex; align-items: center; gap: .4em; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: var(--_c); }
      :host(:is([auto-text], [data-auto-text])) .dot::after { background: ${AUTO_TEXT}; }
      /* the mark of the chosen option (mark, or data-mark from the group): fill (the default) fills the shape;
         dot fills it with a small mark inside; ring keeps it light, with a coloured border and a mark in the middle */
      :host([data-m="fill"]) .dot::after { display: none; }
      /* the ring uses the indicator shade of the colour (darker in light mode), so a thin border still stands out on the field */
      :host([data-m="ring"]) { --_ri: oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h); }
      :host([data-m="ring"][checked]) .dot { background: var(--sav-color-input-bg); border-color: var(--_ri); border-width: calc(var(--sav-border-width) + 1.5px); }
      :host([data-m="ring"]) .dot::after { width: 46%; height: 46%; background: var(--_ri); }
      /* cards: each option is a card with a picture (slot media), its name and a line under it (slot description), drawn with the
         tokens of sav-card so it follows every style; the mark of the radio sits in the top corner. The chosen one takes the colour:
         --sav-choice-checked-border, -shadow and -tint (set by the styles), its back plate in Tilt. */
      .cb, .media, .desc { display: none; }
      :host([data-appearance="cards"]) { display: block; position: relative; isolation: isolate; min-width: 0; }
      :host([data-appearance="cards"]) .cb { display: var(--sav-card-back, none); position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius-lg);
        background: var(--_cbk, color-mix(in oklab, var(--_c) 16%, transparent)); transform: rotate(var(--sav-card-tilt, calc(${TILT} * -2.2)));
        transition: transform calc(.3s * var(--sav-motion, 1)) var(--sav-easing), background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      :host([data-appearance="cards"]:not([disabled]):hover) .cb { transform: rotate(calc(var(--sav-card-tilt, calc(${TILT} * -2.2)) * -1.4)); }
      :host([data-appearance="cards"][checked]) .cb { --_cbk: color-mix(in oklab, var(--_c) 40%, transparent); }
      :host([data-appearance="cards"]) .row { position: relative; display: flex; flex-direction: column; align-items: stretch; gap: .55rem; height: 100%; box-sizing: border-box;
        padding: var(--sav-choice-padding, calc(var(--_fs) * .8)); border-radius: var(--sav-radius-lg); text-align: var(--sav-choice-align, start); white-space: normal;
        color: var(--sav-color-text); background-color: var(--_cbg, var(--sav-color-surface)); background-image: var(--sav-sheen, none);
        border: var(--sav-border-width) solid var(--_cbd, var(--sav-color-border)); box-shadow: var(--_csh, var(--sav-shadow-sm));
        -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none);
        transition: box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)), background-color calc(var(--sav-duration) * var(--sav-motion, 1)); }
      :host([data-appearance="cards"]:not([disabled])) .row:hover { transform: var(--sav-choice-hover-transform, translateY(-2px)); --_cbd: var(--sav-color-border-strong); --_csh: var(--sav-choice-hover-shadow, var(--sav-shadow)); }
      :host([data-appearance="cards"][checked]) .row { --_cbd: var(--sav-choice-checked-border, var(--_c)); --_cbg: color-mix(in oklab, var(--_c) var(--sav-choice-checked-tint, 7%), var(--sav-color-surface));
        --_csh: var(--sav-choice-checked-shadow, 0 0 0 calc(var(--sav-border-width) + .5px) var(--_c), var(--sav-shadow-sm)); }
      :host([data-appearance="cards"]:focus-visible) .row { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 3px; }
      :host([data-appearance="cards"]) .dot { position: absolute; z-index: 1; top: calc(var(--sav-choice-padding, calc(var(--_fs) * .8)) * .75); inset-inline-end: calc(var(--sav-choice-padding, calc(var(--_fs) * .8)) * .75); margin: 0; }
      :host([data-appearance="cards"]) .has-media .media { display: block; border-radius: max(0px, calc(var(--sav-radius-lg) - var(--sav-border-width) - 2px)); overflow: hidden; }
      :host([data-appearance="cards"]) ::slotted([slot="media"]) { display: block; width: 100%; max-width: 100%; }
      :host([data-appearance="cards"]) .lb { display: grid; gap: .15rem; font-weight: var(--sav-font-weight-semibold); min-width: 0; }
      :host([data-appearance="cards"]) .row:not(.has-media) .lb { padding-inline-end: calc(var(--_box) + .5rem); }
      :host([data-appearance="cards"]) .has-desc .desc { display: block; font-weight: 400; font-size: .86em; color: var(--sav-color-text-muted); }
    `];
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = '<span class="cb" part="back"></span><div class="row" part="base"><span class="media" part="media"><slot name="media"></slot></span><span class="dot" part="control"></span><span class="lb" part="label"><slot></slot><span class="desc" part="description"><slot name="description"></slot></span></span></div>';
        // cards: the picture and the line under the name show only when they are given
        const row = this.$('.row'), parts = () => { row.classList.toggle('has-media', this.hasSlot('media')); row.classList.toggle('has-desc', this.hasSlot('description')); };
        this.$$('slot[name]').forEach((sl) => sl.addEventListener('slotchange', parts));
        parts();
      }
      this.setAttribute('role', 'radio');
      tiltWatch(this.$('.row'));
      tiltWatch(this.$('.cb'));
      this.sync();
      this.addEventListener('click', this._click ||= () => { if (!this.disabled) this.closest('sav-radio-group')?.pick(this, true); });
    }
    changed() { this.sync(); }
    sync() {
      // the mark in use: its own, or the group's, or fill
      const m = this.getAttribute('mark') || this.getAttribute('data-mark');
      this.setAttribute('data-m', ['dot', 'ring'].includes(m) ? m : 'fill');
      this.setAttribute('aria-checked', String(this.checked));
      this.disabled ? this.setAttribute('aria-disabled', 'true') : this.removeAttribute('aria-disabled');
    }
  }
  props(SavRadio, { value: String, checked: Boolean, disabled: Boolean, variant: String, size: String, mark: String });
  define('sav-radio', SavRadio);

  class SavRadioGroup extends SavFormControl {
    static delegatesFocus = false;
    static styles = [FIELD, `
      fieldset { border: 0; margin: 0; padding: 0; min-width: 0; }
      legend { padding: 0; }
      .items { display: flex; flex-direction: column; gap: .55rem; }
      :host([orientation="horizontal"]) .items { flex-direction: row; flex-wrap: wrap; gap: .5rem 1.25rem; }
      :host([appearance="buttons"]) .items { flex-direction: row; display: inline-flex; gap: 2px; padding: 3px; border-radius: var(--sav-radius); background: var(--sav-color-surface-2); border: var(--sav-border-width) solid var(--sav-color-border); }
      /* more buttons than room: the row scrolls sideways instead of spilling out of its container */
      :host([appearance="buttons"]) .items { max-width: 100%; overflow-x: auto; overflow-y: hidden; overscroll-behavior-x: contain; scrollbar-width: thin; -webkit-overflow-scrolling: touch; }
      /* cards: a grid that fills the width; columns="n" fixes how many per row, --sav-choice-min the narrowest card otherwise */
      :host([appearance="cards"]) .items { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(var(--sav-choice-min, 9rem), 100%), 1fr)); gap: var(--sav-choice-gap, .75rem); padding: 3px; margin: -3px; }
      :host([appearance="cards"][columns]) .items { grid-template-columns: repeat(var(--_cols, 3), minmax(0, 1fr)); }
      :host([data-user-invalid]) .items { --sav-color-border-strong: var(--sav-color-danger); }
      .native { position: absolute; opacity: 0; pointer-events: none; width: 1px; height: 1px; }
    `];
    static get observedAttributes() { return [...FC, 'label', 'help', 'value', 'appearance', 'size', 'auto-text', 'mark', 'columns']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<fieldset class="w" part="form-control" role="radiogroup">
        <legend class="lbl" part="label"><slot name="label"></slot><span class="lbl-text"></span></legend>
        <div class="items" part="base"><slot></slot></div>
        <div class="help" part="help-text"><slot name="help"></slot><span class="help-text"></span></div>
        <input class="native" tabindex="-1" aria-hidden="true">
      </fieldset>`;
      this.native = this.$('.native');
      this._default = this.getAttribute('value') ?? '';
      this._value = this._default;
      this.$('slot:not([name])').addEventListener('slotchange', () => this.syncRadios());
      this.addEventListener('keydown', (e) => this.onKey(e));
      this.syncRadios();
      this.sync();
    }
    get radios() { return [...this.querySelectorAll('sav-radio')]; }
    syncRadios() {
      const radios = this.radios;
      passAutoText(this, radios);
      // the mark of the chosen option (fill, dot, ring) reaches every radio; a radio's own mark wins
      radios.forEach((r) => { const m = this.getAttribute('mark'); if (m) r.setAttribute('data-mark', m); else r.removeAttribute('data-mark'); r.sync?.(); });
      const val = (r) => r.getAttribute('value') ?? '';
      const off = (r) => r.hasAttribute('disabled');
      if (!this._value) { const pre = radios.find((r) => r.hasAttribute('checked')); if (pre) this._value = this._default = val(pre); }
      const app = this.getAttribute('appearance');
      const size = this.getAttribute('size');
      let focusable = null;
      radios.forEach((r) => {
        r.toggleAttribute('checked', val(r) === this._value);
        if (app) r.dataset.appearance = app; else delete r.dataset.appearance;
        if (size && !r.hasAttribute('size')) r.setAttribute('size', size);
        if (val(r) === this._value && !off(r)) focusable = r;
      });
      focusable ||= radios.find((r) => !off(r) && !this.isDisabled);
      radios.forEach((r) => { r.tabIndex = r === focusable ? 0 : -1; if (this.isDisabled) r.setAttribute('aria-disabled', 'true'); });
      this.onValue();
    }
    pick(radio, fire) {
      if (this.isDisabled || radio.hasAttribute('disabled')) return;
      const v = radio.getAttribute('value') ?? '';
      const changed = this._value !== v;
      this._value = v;
      this.syncRadios();
      radio.focus();
      if (changed && fire) { this.markTouched(); this.emit('input'); this.emit('change'); }
    }
    onKey(e) {
      const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      const radios = this.radios.filter((r) => !r.hasAttribute('disabled'));
      if (e.key === ' ' || e.key === 'Enter') { const r = e.target.closest?.('sav-radio'); if (r) { e.preventDefault(); this.pick(r, true); } return; }
      if (!(e.key in keys) || !radios.length) return;
      e.preventDefault();
      const cur = radios.indexOf(e.target.closest?.('sav-radio'));
      const next = radios[(cur + keys[e.key] + radios.length) % radios.length];
      this.pick(next, true);
    }
    changed(name, v) {
      if (name === 'value') { this._value = v ?? ''; this.syncRadios(); return; }
      if (name === 'columns') { const n = parseInt(v, 10); n > 0 ? this.style.setProperty('--_cols', String(Math.min(n, 12))) : this.style.removeProperty('--_cols'); return; }
      if (name === 'appearance' || name === 'size' || name === 'auto-text' || name === 'mark') this.syncRadios();
      this.sync();
    }
    sync() {
      if (!this.native) return;
      this.syncLabels(this.$('.w'));
      const l = this.getAttribute('label'); if (l) this.$('fieldset').setAttribute('aria-label', l);
      this.native.required = this.required;
      this.syncRadios();
    }
    onValue() {
      this.internals.setFormValue(this._value || null);
      this.native.value = this._value || '';
      if (this.required && !this._value) this.internals.setValidity({ valueMissing: true }, T(this, 'Please select an option.'), this.radios[0] || this.native);
      else this.internals.setValidity({});
      if (this.hasAttribute('data-user-invalid')) this.markTouched();
    }
    formResetCallback() { this._value = this._default; this.syncRadios(); this.removeAttribute('data-user-invalid'); }
    get value() { return this._value ?? this.getAttribute('value') ?? ''; }
    set value(v) { this._value = v ?? ''; if (this.native) this.syncRadios(); }
    focus() { (this.radios.find((r) => r.tabIndex === 0) || this.radios[0])?.focus(); }
  }
  define('sav-radio-group', SavRadioGroup);

  /* ================================================================== sav-range */

  /* thumbs of sav-range and sav-range-dual: they follow the style through the --sav-range-* tokens */
  const RANGE_THUMB = `
      .track { --_tb: var(--sav-range-thumb-bg, color-mix(in oklab, oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h) calc(var(--sav-range-thumb-fill, 0) * 100%), var(--sav-color-surface)));
               --_tbd: var(--sav-range-thumb-border-width, 3px) solid color-mix(in oklab, var(--sav-color-text) calc(var(--sav-range-thumb-ink, 0) * 100%), oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h));
               --_tt: var(--sav-range-thumb-tilt, 0deg); }
      input::-webkit-slider-thumb { -webkit-appearance: none; box-sizing: border-box; width: var(--sav-range-thumb-width, var(--_th)); height: var(--sav-range-thumb-height, var(--_th));
              border-radius: var(--sav-range-thumb-radius, 50%); background: var(--_tb); border: var(--_tbd); box-shadow: var(--sav-range-thumb-shadow, var(--sav-shadow-sm));
              transform: rotate(var(--_tt)); transition: transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)); }
      input::-moz-range-thumb { box-sizing: border-box; width: var(--sav-range-thumb-width, var(--_th)); height: var(--sav-range-thumb-height, var(--_th));
              border-radius: var(--sav-range-thumb-radius, 50%); background: var(--_tb); border: var(--_tbd); box-shadow: var(--sav-range-thumb-shadow, var(--sav-shadow-sm)); transform: rotate(var(--_tt)); }
      input:hover::-webkit-slider-thumb { transform: rotate(calc(var(--_tt) * -.5)); }
      input:active::-webkit-slider-thumb { transform: rotate(calc(var(--_tt) * -.5)) scale(1.12); }
      input:focus-visible { outline: none; }
      input:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 var(--sav-focus-width) var(--sav-color-focus); }
      input:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 var(--sav-focus-width) var(--sav-color-focus); }
  `;

  class SavRange extends SavFormControl {
    static styles = [FIELD, VARIANTS, RANGE_THUMB, `
      .head { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
      .out { font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); font-variant-numeric: tabular-nums; }
      :host(:not([show-value])) .out { display: none; }
      .track { position: relative; display: flex; align-items: center; height: 1.6rem; --_th: 1.15rem; }
      /* track and thumb follow the style: --sav-range-* tokens (set by sav-style-tilt, sharp, brutal, glass) */
      input { appearance: none; -webkit-appearance: none; width: 100%; height: var(--sav-range-height, .4rem); margin: 0; border-radius: var(--sav-range-radius, var(--sav-radius-pill)); cursor: pointer; background:
              linear-gradient(to right, oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h) 0 var(--_p, 50%), var(--sav-color-surface-2) var(--_p, 50%) 100%); box-shadow: var(--sav-range-track-shadow, inset 0 0 0 1px var(--sav-color-border)); }
      input:disabled { opacity: .5; cursor: not-allowed; }
      .ticks { display: flex; justify-content: space-between; font-size: .75rem; color: var(--sav-color-text-muted); margin-top: .15rem; }
      .ticks:empty { display: none; }
    `];
    static get observedAttributes() { return [...FC, 'label', 'help', 'value', 'min', 'max', 'step', 'labels', 'unit']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('rg');
      this.shadowRoot.innerHTML = `<div class="w" part="form-control">
        <div class="head"><label class="lbl" part="label" for="${id}"><slot name="label"></slot><span class="lbl-text"></span></label><output class="out" part="value" for="${id}"></output></div>
        <div class="track" part="base"><input type="range" part="input" id="${id}"></div>
        <div class="ticks" part="labels"></div>
        <div class="help" part="help-text"><slot name="help"></slot><span class="help-text"></span></div>
      </div>`;
      const i = (this.native = this.$('input'));
      i.addEventListener('input', () => this.onValue());
      i.addEventListener('change', () => this.emit('change'));
      this.sync();
      this._default = this.getAttribute('value') ?? i.value;
      i.value = this._default;
      this.onValue();
    }
    changed(name, v) {
      if (name === 'value') { if (this.native) { this.native.value = v; this.onValue(); } return; }
      this.sync();
    }
    sync() {
      const i = this.native; if (!i) return;
      i.min = this.getAttribute('min') ?? 0; i.max = this.getAttribute('max') ?? 100; i.step = this.getAttribute('step') ?? 1;
      i.disabled = this.isDisabled;
      this.syncLabels(this.$('.w'));
      const labels = this.getAttribute('labels');
      this.$('.ticks').innerHTML = labels ? labels.split(',').map((l) => `<span>${esc(l.trim())}</span>`).join('') : '';
      this.onValue();
    }
    onValue() {
      const i = this.native;
      const p = ((i.value - i.min) / (i.max - i.min || 1)) * 100;
      i.style.setProperty('--_p', p + '%');
      const unit = this.getAttribute('unit') || '';
      this.$('.out').textContent = i.value + unit;
      i.setAttribute('aria-valuetext', i.value + unit);
      this.internals.setFormValue(i.value);
    }
    formResetCallback() { this.native.value = this._default; this.onValue(); }
    get value() { return this.native ? Number(this.native.value) : Number(this.getAttribute('value')); }
    set value(v) { if (this.native) { this.native.value = v; this.onValue(); } else this.setAttribute('value', v); }
    focus(o) { this.native?.focus(o); }
  }
  props(SavRange, { variant: String });
  define('sav-range', SavRange);

  /* ================================================================== sav-range-dual */

  /* Two handles on one track: a span with a start and an end (prices, ages, years, dates).
     Two native range inputs lie on top of each other and only their thumbs take the pointer, so each handle keeps the native
     keys (arrows, Home, End, PageUp, PageDown) and role. type="date" works with dates (YYYY-MM-DD) and steps of days. */
  const DAY = 864e5;
  const isoDay = (n) => new Date(n * DAY).toISOString().slice(0, 10);
  const dayOf = (s) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '').trim()); return m ? Math.round(Date.UTC(+m[1], +m[2] - 1, +m[3]) / DAY) : null; };
  class SavRangeDual extends SavFormControl {
    static styles = [FIELD, VARIANTS, RANGE_THUMB, `
      .head { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
      .out { font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
      :host(:not([show-value])) .out { display: none; }
      :host { min-width: 10rem; }
      .track { position: relative; height: 1.6rem; --_th: 1.15rem; --_tw: var(--sav-range-thumb-width, var(--_th)); cursor: pointer; touch-action: none; }
      .rail { position: absolute; inset-inline: 0; top: 50%; height: var(--sav-range-height, .4rem); transform: translateY(-50%); border-radius: var(--sav-range-radius, var(--sav-radius-pill));
              background: var(--sav-color-surface-2); box-shadow: var(--sav-range-track-shadow, inset 0 0 0 1px var(--sav-color-border)); overflow: hidden; }
      /* the coloured part between the two thumb centres (a thumb centre travels from half a thumb to the end minus half a thumb) */
      .fill { position: absolute; top: 0; bottom: 0; background: oklch(from var(--_c) calc(l * var(--sav-indicator-l, 1)) c h);
              left: calc(var(--_tw) / 2 + (100% - var(--_tw)) * var(--_a, 0)); right: calc(var(--_tw) / 2 + (100% - var(--_tw)) * (1 - var(--_b, 1))); }
      input { position: absolute; inset-inline: 0; top: 50%; transform: translateY(-50%); appearance: none; -webkit-appearance: none; width: 100%; height: var(--sav-range-height, .4rem);
              margin: 0; background: none; pointer-events: none; z-index: 1; }
      input::-moz-range-track { background: none; border: 0; }
      input::-webkit-slider-thumb { pointer-events: auto; cursor: grab; }
      input::-moz-range-thumb { pointer-events: auto; cursor: grab; }
      input:active::-webkit-slider-thumb { cursor: grabbing; }
      input.top { z-index: 2; }
      :host([disabled]) .track { opacity: .5; cursor: not-allowed; }
      :host([disabled]) input::-webkit-slider-thumb { cursor: not-allowed; }
      .ticks { display: flex; justify-content: space-between; font-size: .75rem; color: var(--sav-color-text-muted); margin-top: .15rem; }
      .ticks:empty { display: none; }
    `];
    static get observedAttributes() { return [...FC, 'label', 'help', 'start', 'end', 'min', 'max', 'step', 'min-gap', 'labels', 'unit', 'prefix', 'type', 'start-label', 'end-label', 'name-start', 'name-end']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('rd');
      this.shadowRoot.innerHTML = `<div class="w" part="form-control" role="group" aria-labelledby="${id}-l">
        <div class="head"><label class="lbl" part="label" id="${id}-l" for="${id}-a"><slot name="label"></slot><span class="lbl-text"></span></label><output class="out" part="value"></output></div>
        <div class="track" part="base"><div class="rail" part="track"><div class="fill" part="fill"></div></div>
          <input type="range" class="a" part="input input-start" id="${id}-a" aria-describedby="${id}-h"><input type="range" class="b" part="input input-end" aria-describedby="${id}-h"></div>
        <div class="ticks" part="labels"></div>
        <div class="help" part="help-text" id="${id}-h"><slot name="help"></slot><span class="help-text"></span></div>
      </div>`;
      const a = (this._a = this.$('.a')), b = (this._b = this.$('.b'));
      this.native = a;
      for (const [el, other] of [[a, b], [b, a]]) {
        // the native input event has no detail: it stops here and the element fires its own, with the values
        el.addEventListener('input', (e) => { e.stopPropagation(); this.clamp(el, other); this.onValue(); this.emit('input', this.detail()); });
        el.addEventListener('change', () => this.fireChange());
        el.addEventListener('pointerdown', () => this.raise(el));
        el.addEventListener('focus', () => this.raise(el));
      }
      // a press on the track (not on a thumb) moves the nearest thumb there, and keeps dragging it
      const track = this.$('.track');
      track.addEventListener('pointerdown', (e) => {
        if (this.isDisabled || e.button !== 0 || e.target.localName === 'input') return;
        e.preventDefault();
        const v = this.valueAt(e.clientX);
        const el = Math.abs(v - a.valueAsNumber) <= Math.abs(v - b.valueAsNumber) && !(v > b.valueAsNumber) ? a : b;
        this.raise(el); el.focus({ preventScroll: true });
        const move = (ev) => { el.value = this.valueAt(ev.clientX); this.clamp(el, el === a ? b : a); this.onValue(); this.emit('input', this.detail()); };
        move(e);
        try { track.setPointerCapture(e.pointerId); } catch {}
        const up = () => { track.removeEventListener('pointermove', move); track.removeEventListener('pointerup', up); track.removeEventListener('pointercancel', up); this.fireChange(); };
        track.addEventListener('pointermove', move);
        track.addEventListener('pointerup', up);
        track.addEventListener('pointercancel', up);
      });
      this.$$('slot').forEach((s) => s.addEventListener('slotchange', () => this.syncLabels(this.$('.w'))));
      this.sync();
      this.setPair(this.getAttribute('start'), this.getAttribute('end'), true);
      this._default = [a.value, b.value];
    }
    changed(name, v) {
      if (name === 'start' || name === 'end') { if (this._a) this.setPair(name === 'start' ? v : this.toNum(this._a.value, true), name === 'end' ? v : this.toNum(this._b.value, true)); return; }
      this.sync();
    }
    get isDate() { return this.getAttribute('type') === 'date'; }
    /** attribute (number or YYYY-MM-DD) → number on the track (days for dates) */
    num(v, fallback) {
      if (v === null || v === undefined || v === '') return fallback;
      const n = this.isDate ? dayOf(v) : Number(v);
      return n === null || Number.isNaN(n) ? fallback : n;
    }
    toNum(v, raw) { return raw ? (this.isDate ? isoDay(Number(v)) : v) : Number(v); }
    sync() {
      const a = this._a, b = this._b; if (!a) return;
      const today = Math.floor(Date.now() / DAY);
      const min = this.num(this.getAttribute('min'), this.isDate ? today : 0);
      const max = this.num(this.getAttribute('max'), this.isDate ? today + 90 : 100);
      const step = Number(this.getAttribute('step')) || 1;
      for (const el of [a, b]) { el.min = min; el.max = Math.max(min, max); el.step = step; el.disabled = this.isDisabled; }
      a.setAttribute('aria-label', this.getAttribute('start-label') || T(this, 'Start'));
      b.setAttribute('aria-label', this.getAttribute('end-label') || T(this, 'End'));
      this.syncLabels(this.$('.w'));
      const labels = this.getAttribute('labels');
      this.$('.ticks').innerHTML = labels ? labels.split(',').map((l) => `<span>${esc(l.trim())}</span>`).join('') : '';
      this.onValue();
    }
    get gap() { return Math.max(0, Number(this.getAttribute('min-gap')) || 0); }
    clamp(el, other) {
      const g = this.gap;
      if (el === this._a && el.valueAsNumber > this._b.valueAsNumber - g) el.value = this._b.valueAsNumber - g;
      if (el === this._b && el.valueAsNumber < this._a.valueAsNumber + g) el.value = this._a.valueAsNumber + g;
      this.raise(el);
    }
    /** the thumb in use is drawn on top; when both sit on the same spot the one that can still move is on top */
    raise(el) {
      const a = this._a, b = this._b;
      let top = el;
      if (a.valueAsNumber === b.valueAsNumber) top = a.valueAsNumber >= (Number(a.max) + Number(a.min)) / 2 ? a : b;
      a.classList.toggle('top', top === a); b.classList.toggle('top', top === b);
    }
    valueAt(x) {
      const r = this.$('.track').getBoundingClientRect();
      const tw = parseFloat(getComputedStyle(this._a).getPropertyValue('--_tw')) || 18;
      const t = Math.min(1, Math.max(0, (x - r.left - tw / 2) / Math.max(1, r.width - tw)));
      const min = Number(this._a.min), max = Number(this._a.max), step = Number(this._a.step) || 1;
      return Math.min(max, Math.max(min, min + Math.round(((max - min) * t) / step) * step));
    }
    setPair(s, e, initial = false) {
      const a = this._a, b = this._b;
      const min = Number(a.min), max = Number(a.max);
      let x = this.num(s, min), y = this.num(e, max);
      if (x > y) [x, y] = [y, x];
      a.value = x; b.value = y;
      this.clamp(b, a);
      if (!initial) this.raise(a);
      this.onValue();
    }
    format(n) {
      const loc = safeLocale(document.documentElement.lang);
      if (this.isDate) { try { return new Date(n * DAY).toLocaleDateString(loc, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); } catch { return isoDay(n); } }
      return (this.getAttribute('prefix') || '') + n.toLocaleString(loc, { maximumFractionDigits: 6 }) + (this.getAttribute('unit') || '');
    }
    onValue() {
      const a = this._a, b = this._b;
      const min = Number(a.min), span = Number(a.max) - min || 1;
      const t = this.$('.track');
      t.style.setProperty('--_a', (a.valueAsNumber - min) / span);
      t.style.setProperty('--_b', (b.valueAsNumber - min) / span);
      const fa = this.format(a.valueAsNumber), fb = this.format(b.valueAsNumber);
      this.$('.out').textContent = `${fa} – ${fb}`;
      a.setAttribute('aria-valuetext', fa); b.setAttribute('aria-valuetext', fb);
      // sent with a form as two fields: <name>-start and <name>-end (or name-start / name-end)
      const n = this.name;
      const fd = new FormData();
      if (n || this.getAttribute('name-start')) fd.append(this.getAttribute('name-start') || `${n}-start`, this.start);
      if (n || this.getAttribute('name-end')) fd.append(this.getAttribute('name-end') || `${n}-end`, this.end);
      this.internals.setFormValue(fd);
    }
    detail() { return { start: this.start, end: this.end, value: this.value }; }
    fireChange() { this.emit('change', this.detail()); }
    formResetCallback() { if (!this._a) return; this._a.value = this._default[0]; this._b.value = this._default[1]; this.onValue(); }
    /** numbers, or YYYY-MM-DD strings with type="date" */
    get start() { return this._a ? this.toNum(this._a.value, this.isDate) : this.getAttribute('start'); }
    set start(v) { if (this._a) this.setPair(v, this.end); else this.setAttribute('start', v); }
    get end() { return this._b ? this.toNum(this._b.value, this.isDate) : this.getAttribute('end'); }
    set end(v) { if (this._b) this.setPair(this.start, v); else this.setAttribute('end', v); }
    /** [start, end] */
    get value() { return [this.start, this.end]; }
    set value(v) { const [s, e] = Array.isArray(v) ? v : String(v ?? '').split(/\s*[,–]\s*/); this.setPair(s, e); }
    focus(o) { this._a?.focus(o); }
  }
  props(SavRangeDual, { variant: String });
  define('sav-range-dual', SavRangeDual);

  /* ================================================================== sav-rating */

  class SavRating extends SavFormControl {
    static delegatesFocus = false;
    static styles = [FIELD, `
      :host { display: inline-block; --size: 1.5rem; --color: oklch(from var(--sav-color-warning) calc(l * var(--sav-indicator-l, 1)) c h); --empty: var(--sav-rating-empty, var(--sav-color-border-strong)); }
      .stars { display: inline-flex; gap: .15rem; outline: none; border-radius: var(--sav-radius-sm); }
      .stars:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 3px; }
      .s { position: relative; width: var(--size); height: var(--size); cursor: pointer; color: var(--empty); transition: transform calc(var(--sav-duration) * var(--sav-motion, 1)) var(--sav-easing); }
      .s svg { width: 100%; height: 100%; }
      .s svg * { fill: currentColor; stroke: var(--sav-ink-border, currentColor); stroke-width: 1.2; } /* Brutal: inked outlines, so an empty shape stays light */
      .s .full { position: absolute; inset: 0; color: var(--color); clip-path: inset(0 calc(100% - var(--_f, 0%)) 0 0); }
      :host(:not([readonly]):not([disabled])) .s:hover { transform: scale(1.15); }
      :host([readonly]) .s, :host([disabled]) .s { cursor: default; }
      :host([disabled]) { opacity: .55; }
    `];
    static get observedAttributes() { return [...FC, 'label', 'help', 'value', 'max', 'readonly']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<div class="w" part="form-control"><div class="lbl" part="label"><slot name="label"></slot><span class="lbl-text"></span></div>
        <div class="stars" part="base" role="slider" tabindex="0"></div>
        <div class="help" part="help-text"><slot name="help"></slot><span class="help-text"></span></div></div>`;
      this._value = Number(this.getAttribute('value')) || 0;
      this._default = this._value;
      const stars = this.$('.stars');
      stars.addEventListener('mousemove', (e) => { const s = e.target.closest('.s'); if (s && this.editable) this.paint(Number(s.dataset.i)); });
      stars.addEventListener('mouseleave', () => this.paint(this._value));
      stars.addEventListener('click', (e) => { const s = e.target.closest('.s'); if (s && this.editable) this.set(Number(s.dataset.i) === this._value ? 0 : Number(s.dataset.i)); });
      stars.addEventListener('keydown', (e) => {
        if (!this.editable) return;
        const max = this.max || 5;
        const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
        if (d) { e.preventDefault(); this.set(Math.max(0, Math.min(max, this._value + d))); }
        else if (e.key === 'Home') { e.preventDefault(); this.set(0); }
        else if (e.key === 'End') { e.preventDefault(); this.set(max); }
      });
      this.sync();
    }
    get editable() { return !this.readonly && !this.isDisabled; }
    changed(name, v) { if (name === 'value') this._value = Number(v) || 0; this.sync(); }
    sync() {
      const stars = this.$('.stars'); if (!stars) return;
      const max = this.max || 5, icon = this.getAttribute('icon') || 'star';
      stars.innerHTML = Array.from({ length: max }, (_, k) => `<span class="s" data-i="${k + 1}">${svgIcon(icon)}${svgIcon(icon, 'full')}</span>`).join('');
      stars.tabIndex = this.isDisabled ? -1 : 0;
      stars.setAttribute('aria-valuemin', '0'); stars.setAttribute('aria-valuemax', String(max));
      stars.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Rating'));
      this.readonly ? stars.setAttribute('aria-readonly', 'true') : stars.removeAttribute('aria-readonly');
      this.syncLabels(this.$('.w'));
      this.paint(this._value);
      this.internals.setFormValue(String(this._value));
    }
    paint(v) {
      this.$$('.s').forEach((s, k) => s.style.setProperty('--_f', Math.max(0, Math.min(1, v - k)) * 100 + '%'));
      const st = this.$('.stars');
      st.setAttribute('aria-valuenow', String(this._value));
      st.setAttribute('aria-valuetext', `${this._value} / ${this.max || 5}`);
    }
    set(v) {
      if (v === this._value) return;
      this._value = v;
      this.paint(v);
      this.internals.setFormValue(String(v));
      this.emit('change', { value: v });
    }
    formResetCallback() { this._value = this._default; this.sync(); }
    get value() { return this._value ?? (Number(this.getAttribute('value')) || 0); }
    set value(v) { this._value = Number(v) || 0; if (this.shadowRoot.firstChild) this.sync(); }
    focus() { this.$('.stars')?.focus(); }
  }
  props(SavRating, { max: Number, readonly: Boolean });
  define('sav-rating', SavRating);

  /* ================================================================== sav-tooltip */

  class SavTooltip extends SavElement {
    static styles = [FLOAT, `
      :host { display: inline-block; }
      :host([block]) { display: block; }
      .tip { max-width: var(--max-width, 260px); padding: .4rem .65rem; border: 0; border-radius: var(--sav-radius-sm); background: var(--sav-color-tooltip-bg); color: var(--sav-color-tooltip-text); -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none);
             font-family: var(--sav-font); font-size: var(--sav-font-size-sm); line-height: 1.4; box-shadow: var(--sav-tooltip-shadow, var(--sav-shadow)); pointer-events: none; overflow: visible; z-index: 2147483001; }
      /* the arrow is a triangle just outside the body: nothing overlaps, so see-through colours (Glass) stay even */
      .tip::after { content: ""; position: absolute; background: inherit; }
      .tip[data-side="top"]::after { bottom: -6px; left: calc(var(--_ax) - 6px); width: 12px; height: 6px; clip-path: polygon(0 0, 100% 0, 50% 100%); }
      .tip[data-side="bottom"]::after { top: -6px; left: calc(var(--_ax) - 6px); width: 12px; height: 6px; clip-path: polygon(50% 0, 100% 100%, 0 100%); }
      .tip[data-side="left"]::after { right: -6px; top: calc(var(--_ay) - 6px); width: 6px; height: 12px; clip-path: polygon(0 0, 100% 50%, 0 100%); }
      .tip[data-side="right"]::after { left: -6px; top: calc(var(--_ay) - 6px); width: 6px; height: 12px; clip-path: polygon(100% 0, 100% 100%, 0 50%); }
      .tip:popover-open, .tip.open { animation: sav-tip calc(.14s * var(--sav-motion, 1)) var(--sav-easing); }
      @keyframes sav-tip { from { opacity: 0; transform: scale(.96); } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: var(--sav-color-tooltip-bg); }
      :host([auto-text]) .tip { color: ${AUTO_TEXT}; }
    `];
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('tip');
      this.shadowRoot.innerHTML = `<slot class="anchor"></slot><div class="tip float" part="body" role="tooltip" id="${id}" ${supportsPopover ? 'popover="manual"' : ''}><slot name="content"></slot><span class="txt"></span></div>`;
      this.sync();
      const show = () => { clearTimeout(this._h); this._s = setTimeout(() => this.show(), this.delay ?? 150); };
      const hide = () => { clearTimeout(this._s); this._h = setTimeout(() => this.hide(), 80); };
      const trig = (this.getAttribute('trigger') || 'hover focus').split(/\s+/);
      if (trig.includes('hover')) { this.addEventListener('pointerenter', (e) => e.pointerType !== 'touch' && show()); this.addEventListener('pointerleave', hide); }
      if (trig.includes('focus')) { this.addEventListener('focusin', show); this.addEventListener('focusout', hide); }
      if (trig.includes('click')) this.addEventListener('click', () => (this.open ? this.hide() : this.show()));
      this.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.open) { e.stopPropagation(); this.hide(); } });
    }
    disconnectedCallback() { this.hide(); }
    changed() { this.sync(); }
    sync() {
      const t = this.$('.txt'); if (!t) return;
      t.textContent = this.content || '';
      // describe the trigger for screen readers
      const target = this.querySelector(':scope > :not([slot])');
      if (target) target.setAttribute('aria-description', this.content || this.querySelector('[slot="content"]')?.textContent || '');
    }
    get open() { return this.hasAttribute('open'); }
    show() {
      if (this.disabled || (!this.content && !this.querySelector('[slot="content"]'))) return;
      const tip = this.$('.tip');
      showPop(tip);
      const anchor = this.querySelector(':scope > :not([slot])') || this;
      place(tip, anchor, this.placement || 'top', 8);
      this.setAttribute('open', '');
      this._anchor = anchor;
      this._reflow ||= () => { if (!this.open) return; if (anchorGone(this._anchor)) { this.hide(); return; } place(tip, this._anchor, this.placement || 'top', 8); };
      addEventListener('scroll', this._reflow, true);
      addEventListener('resize', this._reflow);
    }
    hide() {
      const tip = this.$('.tip'); if (!tip) return;
      hidePop(tip);
      this.removeAttribute('open');
      removeEventListener('scroll', this._reflow, true);
      removeEventListener('resize', this._reflow);
    }
  }
  props(SavTooltip, { content: String, placement: String, disabled: Boolean, delay: Number });
  define('sav-tooltip', SavTooltip);

  /* ================================================================== sav-dialog / sav-drawer */

  const MODAL = `
    :host { display: contents; --width: 32rem; --size: 24rem; }
    dialog { max-width: calc(100vw - 2rem); max-height: calc(100dvh - 2rem); padding: 0; border: 0; color: var(--sav-color-text); background: var(--sav-color-surface);
             font-family: var(--sav-font); box-shadow: var(--sav-shadow-lg); overflow: hidden; border: var(--sav-border-width) solid var(--sav-color-border);
             -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none); }
    dialog[open] { display: flex; flex-direction: column; }
    dialog::backdrop { background: var(--sav-color-overlay); backdrop-filter: blur(2px); }
    .head { display: flex; align-items: center; gap: .75rem; padding: 1.1rem 1.25rem .4rem; }
    .title { flex: 1; margin: 0; font-size: var(--sav-font-size-lg); font-weight: var(--sav-font-weight-bold); line-height: 1.3; }
    :host([no-header]) .head { display: none; }
    .x { display: inline-flex; padding: .35rem; margin: -.35rem -.5rem -.35rem 0; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); cursor: pointer; }
    .x:hover { color: var(--sav-color-text); background: var(--sav-color-surface-2); }
    .x svg { width: 1.2rem; height: 1.2rem; }
    .body { flex: 1; overflow: auto; padding: .6rem 1.25rem 1.25rem; line-height: 1.55; }
    .foot { display: none; gap: .5rem; justify-content: flex-end; flex-wrap: wrap; padding: .9rem 1.25rem; border-top: var(--sav-border-width) solid var(--sav-color-border); background: color-mix(in oklab, var(--sav-color-surface-2) 50%, transparent); }
    .has-foot .foot { display: flex; }
  `;

  class SavModalBase extends SavElement {
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('dlg');
      this.shadowRoot.innerHTML = `<dialog part="panel" aria-labelledby="${id}"><span class="grab" part="handle" aria-hidden="true"></span>
        <header class="head" part="header"><h2 class="title" part="title" id="${id}"><slot name="label"></slot><span class="lt"></span></h2><slot name="header-actions"></slot>
          <button class="x" part="close-button" aria-label="${esc(T(this, 'Close'))}">${svgIcon('x')}</button></header>
        <div class="body" part="body"><slot></slot></div>
        <footer class="foot" part="footer"><slot name="footer"></slot></footer>
      </dialog>`;
      const d = (this.dlg = this.$('dialog'));
      tiltWatch(d);
      this.$('.x').addEventListener('click', () => this.requestClose('close-button'));
      d.addEventListener('cancel', (e) => { e.preventDefault(); this.requestClose('keyboard'); });
      d.addEventListener('pointerdown', (e) => { this._downOnBackdrop = e.target === d; });
      d.addEventListener('click', (e) => {
        if (e.target !== d || !this._downOnBackdrop) return;
        const r = d.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) this.requestClose('overlay');
      });
      // (open as an action sheet, the dialog's sheet answers data-sav-close itself)
      this.addEventListener('click', (e) => { if (!(this._sh?.el && e.composedPath().includes(this._sh.el)) && e.target.closest?.('[data-sav-close]')) this.requestClose('button'); });
      this.$$('slot').forEach((s) => s.addEventListener('slotchange', () => this.sync()));
      this.sync();
      if (this.open) this.show(true);
    }
    changed(name) {
      if (name === 'open') this.open ? this.show(true) : this.hide(true);
      else this.sync();
    }
    sync() {
      this.$('.lt').textContent = this.label || '';
      this.dlg.classList.toggle('has-foot', this.hasSlot('footer'));
      this.$('.x').hidden = this.hasAttribute('no-close');
    }
    requestClose(source) {
      if (source === 'overlay' && this.hasAttribute('persistent')) {
        this.dlg.animate([{ transform: this.dlg.style.transform || 'none' }, { transform: 'scale(1.02)' }, { transform: 'none' }], { duration: 200 * motion(this) });
        return;
      }
      if (!this.emit('sav-request-close', { source }, true)) return;
      this.hide();
    }
    async show(fromAttr) {
      if (this.dlg.open) return;
      if (!fromAttr) { this.open = true; return; }
      if (!this.emit('sav-show', {}, true)) { this.open = false; return; }
      this._prev = document.activeElement;
      this.dlg.showModal();
      document.documentElement.style.overflow = 'hidden';
      const auto = this.querySelector('[autofocus]');
      if (auto) auto.focus();
      await this.dlg.animate(this.enterFrames(), { duration: 220 * motion(this), easing: 'cubic-bezier(.2,.7,.3,1)' }).finished.catch(() => {});
      this.emit('sav-after-show');
    }
    async hide(fromAttr) {
      if (!this.dlg?.open) return;
      if (!fromAttr) { this.open = false; return; }
      this.emit('sav-hide');
      await this.dlg.animate(this.enterFrames().reverse(), { duration: 160 * motion(this), easing: 'ease-in' }).finished.catch(() => {});
      this.dlg.close();
      if (!document.querySelector('sav-dialog[open], sav-drawer[open], sav-action-sheet[open]')) document.documentElement.style.overflow = '';
      this._prev?.focus?.();
      this.emit('sav-after-hide');
    }
  }
  props(SavModalBase, { open: Boolean, label: String });

  class SavDialog extends SavModalBase {
    static styles = [MODAL, `
      dialog { width: var(--width); border-radius: var(--sav-radius-lg); margin: auto; }
      ${panelLayer('dialog')}
      .foot { border-radius: 0 0 var(--sav-radius-lg) var(--sav-radius-lg); }
      .grab { display: none; }
      /* sheet-on-mobile: on a phone the dialog opens as a sav-action-sheet (MobileSheet), its buttons one under the other,
         the main one (the last) on top */
      .m-sheet::part(footer) { flex-direction: column-reverse; }
    `];
    enterFrames() { return [{ opacity: 0, transform: 'translateY(12px) scale(.97)' }, { opacity: 1, transform: 'none' }]; }
    /** The action sheet the dialog becomes on a phone (sheet-on-mobile): its parts keep the dialog's names. */
    get sheet() {
      return (this._sh ||= new MobileSheet(this, {
        exportparts: 'panel, handle, header, title, close-button, body, footer',
        onRequestClose: (source) => this.emit('sav-request-close', { source }, true),
        onHide: () => { this.open = false; this.emit('sav-hide'); },
        onAfterShow: () => this.emit('sav-after-show'),
        onAfterHide: () => this.emit('sav-after-hide'),
      }));
    }
    async show(fromAttr) {
      if (!fromAttr || this.dlg?.open || !MobileSheet.wanted(this)) return super.show(fromAttr);
      if (this.sheet.active) return;
      if (!this.emit('sav-show', {}, true)) { this.open = false; return; }
      // title, content, header actions and footer go into the sheet's own slots (an empty footer would still show its band)
      const nodes = [this.$('.body > slot')];
      for (const name of ['label', 'header-actions', 'footer']) {
        if (name !== 'label' && !this.hasSlot(name)) continue;
        const sl = this.$(`slot[name="${name}"]`); sl.slot = name; nodes.push(sl);
      }
      const on = (a) => this.hasAttribute(a);
      if (!this.sheet.open(nodes, { label: this.label || '', attrs: { 'no-cancel': true, 'no-close': on('no-close'), 'no-header': on('no-header'), persistent: on('persistent') } })) { this.open = false; return; }
      this.querySelector('[autofocus]')?.focus();
    }
    async hide(fromAttr) {
      if (!this._sh?.el?.dlg?.open) return super.hide(fromAttr);
      if (!fromAttr) this.open = false;
      else this._sh.close();
    }
    sync() {
      super.sync();
      if (this._sh?.active) this._sh.el.setAttribute('label', this.label || '');
    }
  }
  define('sav-dialog', SavDialog);

  class SavDrawer extends SavModalBase {
    static styles = [MODAL, `
      dialog { margin: 0; max-width: 100vw; max-height: 100dvh; border-radius: 0; }
      :host(:not([placement])) dialog, :host([placement="end"]) dialog { width: var(--size); height: 100dvh; margin-left: auto; border-radius: var(--sav-radius-lg) 0 0 var(--sav-radius-lg); }
      :host([placement="start"]) dialog { width: var(--size); height: 100dvh; margin-right: auto; border-radius: 0 var(--sav-radius-lg) var(--sav-radius-lg) 0; }
      :host([placement="top"]) dialog { width: 100vw; height: var(--size); margin-bottom: auto; border-radius: 0 0 var(--sav-radius-lg) var(--sav-radius-lg); }
      :host([placement="bottom"]) dialog { width: 100vw; height: var(--size); margin-top: auto; border-radius: var(--sav-radius-lg) var(--sav-radius-lg) 0 0; }
    `];
    enterFrames() {
      const t = { start: 'translateX(-100%)', top: 'translateY(-100%)', bottom: 'translateY(100%)' }[this.getAttribute('placement')] || 'translateX(100%)';
      return [{ transform: t }, { transform: 'none' }];
    }
  }
  define('sav-drawer', SavDrawer);

  /* ================================================================== sav-action-sheet */

  /* A list of actions (or any content) that rises from the bottom: a handle to drag it down (and up, with expandable), a title with
     a close button (an icon or a word), a tinted footer with Cancel and any buttons of your own. On wide screens it stays at the
     bottom, --width wide (for a menu next to its button on wide screens use sav-dropdown sheet-on-mobile). sheet.pick() and Sav.actionSheet()
     give the choice back. */
  class SavActionSheet extends SavModalBase {
    static styles = [MODAL, `
      :host { --width: 36rem; --max-height: 90dvh; --min-height: 0px; --half: 50dvh; }
      dialog { width: var(--width); max-width: 100vw; max-height: var(--max-height); min-height: min(var(--min-height), var(--max-height)); margin: auto auto 0;
               border-radius: var(--sav-radius-lg) var(--sav-radius-lg) 0 0; }
      ${panelLayer('dialog')}
      dialog::before { transform: none; border-bottom-width: 0; }
      dialog::after { display: none; }
      :host([size="half"]) dialog { height: var(--half); }
      :host([size="full"]) dialog, :host([expanded]) dialog { height: var(--max-height); }
      .grab { display: block; flex: none; width: 5.5rem; margin: 0 auto; padding: .55rem 0 .25rem; cursor: grab; touch-action: none; }
      .grab::before { content: ""; display: block; width: 2.5rem; height: 4px; margin: 0 auto; border-radius: 99px; background: var(--sav-color-border-strong); }
      :host([no-handle]) .grab, :host([no-drag]:not([expandable])) .grab { cursor: auto; }
      :host([no-handle]) .grab { display: none; }
      .head { padding-top: .45rem; touch-action: none; transition: box-shadow calc(.15s * var(--sav-motion, 1)); }
      :host([no-handle]) .head { padding-top: 1.1rem; }
      .head.scrolled { box-shadow: 0 var(--sav-border-width) 0 var(--sav-color-border); }
      .x.text { padding: .35rem .55rem; margin-right: -.55rem; font: inherit; font-weight: var(--sav-font-weight-bold);
                color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); }
      .x.text:hover { color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); }
      .x:focus-visible { outline: var(--sav-focus-ring-width, 2px) solid var(--sav-color-focus, var(--sav-color-primary)); outline-offset: 1px; }
      .body { min-height: 0; overscroll-behavior: contain; }
      .body.menu { padding: .2rem .45rem .6rem; }
      ::slotted(sav-menu-item) { --sav-menu-item-padding: .8rem .8rem; }
      ::slotted(sav-divider) { --spacing: .35rem; }
      ::slotted(hr) { border: 0; border-top: var(--sav-border-width) solid var(--sav-color-border); margin: .35rem .3rem; }
      .foot { flex-direction: column; align-items: stretch; justify-content: flex-start; padding: .9rem 1.25rem calc(.9rem + env(safe-area-inset-bottom));
              background: var(--footer-background, color-mix(in oklab, var(--sav-color-surface-2) 70%, transparent)); }
      .body:not(.foot-on) { padding-bottom: calc(.6rem + env(safe-area-inset-bottom)); }
      ::slotted([slot="footer"]) { width: 100%; }
      /* row: side by side, Cancel first; on phones one under the other again (row-always keeps them side by side) */
      :host(:is([footer-layout="row"], [footer-layout="row-always"])) .foot { flex-direction: row; }
      :host(:is([footer-layout="row"], [footer-layout="row-always"])) ::slotted([slot="footer"]),
      :host(:is([footer-layout="row"], [footer-layout="row-always"])) .cancel { flex: 1 1 0; width: auto; }
      :host(:is([footer-layout="row"], [footer-layout="row-always"])) .cancel { order: -1; }
      .cancel[hidden] { display: none; }
      @media (max-width: 640px) {
        dialog { width: 100vw; }
        dialog::before { border-width: var(--sav-border-width) 0 0; }
        :host([footer-layout="row"]) .foot { flex-direction: column; }
        :host([footer-layout="row"]) ::slotted([slot="footer"]), :host([footer-layout="row"]) .cancel { flex: none; width: 100%; }
        :host([footer-layout="row"]) .cancel { order: 0; }
      }
    `];
    static get observedAttributes() { return [...super.observedAttributes, 'no-cancel', 'cancel-label', 'close-style', 'close-label', 'close-icon', 'no-close', 'no-header', 'expandable', 'size']; }
    connectedCallback() {
      const first = !this.shadowRoot.firstChild;
      super.connectedCallback();
      if (!first) return;
      const foot = this.$('.foot');
      foot.insertAdjacentHTML('beforeend', '<sav-button class="cancel" part="cancel-button" appearance="outline" variant="neutral" block></sav-button>');
      this.$('.cancel').addEventListener('click', () => this.requestClose('cancel'));
      const body = this.$('.body');
      body.addEventListener('scroll', () => this.$('.head').classList.toggle('scrolled', body.scrollTop > 2), { passive: true });
      this.addEventListener('click', (e) => {
        const item = e.target.closest?.('sav-menu-item');
        if (item && item.closest('sav-action-sheet') === this && !item.hasAttribute('disabled') && !item.hasSubmenu) this.choose(item);
      });
      this.addEventListener('keydown', (e) => this.onKey(e));
      this.addEventListener('focusin', (e) => { const i = e.target.closest?.('sav-menu-item'); if (i && this.items.includes(i)) this.rove(i); });
      for (const el of [this.$('.grab'), this.$('.head')]) el.addEventListener('pointerdown', (e) => this.startDrag(e));
      this.sync();
    }
    get items() { return [...this.querySelectorAll('sav-menu-item')].filter((i) => !i.hasAttribute('disabled') && !i.closest('[hidden]') && i.closest('sav-action-sheet') === this); }
    sync() {
      super.sync();
      const cancel = this.$('.cancel');
      if (!cancel) return;
      const style = this.getAttribute('close-style') === 'text' ? 'text' : 'icon';
      const x = this.$('.x');
      x.classList.toggle('text', style === 'text');
      if (style === 'text') { x.textContent = this.getAttribute('close-label') || T(this, 'Done'); x.removeAttribute('aria-label'); }
      else {
        const name = this.getAttribute('close-icon');
        x.innerHTML = name && name !== 'x' ? `<sav-icon name="${esc(name)}"></sav-icon>` : svgIcon('x');
        x.setAttribute('aria-label', this.getAttribute('close-label') || T(this, 'Close'));
      }
      cancel.textContent = this.getAttribute('cancel-label') || T(this, 'Cancel');
      cancel.hidden = this.hasAttribute('no-cancel');
      const foot = this.hasSlot('footer') || !cancel.hidden;
      this.dlg.classList.toggle('has-foot', foot);
      const body = this.$('.body');
      body.classList.toggle('foot-on', foot);
      const menu = !!this.querySelector(':scope > sav-menu-item');
      body.classList.toggle('menu', menu);
      if (menu) { body.setAttribute('role', 'menu'); body.setAttribute('aria-labelledby', this.dlg.getAttribute('aria-labelledby')); }
      else { body.removeAttribute('role'); body.removeAttribute('aria-labelledby'); }
      const items = this.items;
      if (items.length && !items.some((i) => i.tabIndex === 0)) this.rove(items[0]);
    }
    /** one item at a time is in the Tab order: the one last focused */
    rove(item) { this.querySelectorAll('sav-menu-item').forEach((i) => { i.tabIndex = i === item ? 0 : -1; }); }
    enterFrames() {
      return [{ transform: 'translateY(100%)' }, { transform: this._dragFrom || 'none' }];
    }
    async show(fromAttr) {
      const was = this.dlg?.open;
      const p = super.show(fromAttr);
      if (fromAttr && !was && this.dlg.open) {
        this._result = null;
        this.removeAttribute('expanded');
        this.$('.body').scrollTop = 0;
        this.$('.head').classList.remove('scrolled');
        if (!this.querySelector('[autofocus]')) { const first = this.items[0]; if (first) { this.rove(first); first.focus({ preventScroll: true }); } }
      }
      return p;
    }
    async hide(fromAttr) {
      await super.hide(fromAttr);
      if (fromAttr) { this._dragFrom = ''; Object.assign(this.dlg.style, { transform: '', height: '', transition: '' }); }
    }
    /** Opens the sheet and resolves with the value of the chosen item, or null when it closes without a choice. */
    pick() {
      return new Promise((resolve) => {
        this.addEventListener('sav-after-hide', () => resolve(this._result ?? null), { once: true });
        this.show();
      });
    }
    choose(item) {
      const check = item.getAttribute('type') === 'checkbox';
      if (check) item.checked = !item.checked;
      const go = this.emit('sav-select', { item, value: item.value, checked: check ? item.checked : undefined }, true);
      if (check) this.emit('change', { value: this.value });
      if (go && !check && !this.hasAttribute('stay-open')) { this._result = item.value; this.hide(); }
    }
    /** Values of the checked items (checkbox items). */
    get value() { return [...this.querySelectorAll('sav-menu-item[checked]')].map((i) => i.value); }
    onKey(e) {
      const items = this.items, cur = items.indexOf(e.target);
      if (cur < 0) return;
      let n = null;
      if (e.key === 'ArrowDown') n = items[(cur + 1) % items.length];
      else if (e.key === 'ArrowUp') n = items[(cur - 1 + items.length) % items.length];
      else if (e.key === 'Home') n = items[0];
      else if (e.key === 'End') n = items[items.length - 1];
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.choose(items[cur]); return; }
      else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { // type-ahead
        const k = e.key.toLowerCase();
        n = items.slice(cur + 1).concat(items.slice(0, cur + 1)).find((i) => i.textContent.trim().toLowerCase().startsWith(k));
      }
      if (n) { e.preventDefault(); this.rove(n); n.focus(); }
    }
    /* drag the handle or the title: down closes (or folds an expanded sheet), up unfolds it with expandable; a tap on the handle toggles it */
    startDrag(e) {
      if (e.button > 0) return;
      if (e.composedPath().some((n) => n.localName === 'button' || n.localName === 'sav-button' || n.localName === 'a' || n.slot === 'header-actions')) return;
      const canDrag = !this.hasAttribute('no-drag'), canGrow = this.hasAttribute('expandable');
      if (!canDrag && !canGrow) return;
      const d = this.dlg, h0 = d.getBoundingClientRect().height, y0 = e.clientY, maxH = Math.min(parseFloat(getComputedStyle(d).maxHeight) || innerHeight, innerHeight);
      const fromHandle = e.currentTarget === this.$('.grab');
      let dy = 0, prev = [y0, e.timeStamp], last = prev;
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
      d.style.transition = 'none';
      const move = (ev) => {
        dy = ev.clientY - y0; prev = last; last = [ev.clientY, ev.timeStamp];
        if (dy > 0 && canDrag) { d.style.transform = `translateY(${dy}px)`; d.style.height = ''; }
        else if (dy < 0 && canGrow && !this.hasAttribute('expanded')) { d.style.transform = ''; d.style.height = `${Math.min(maxH, h0 - dy)}px`; }
      };
      const up = () => {
        removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
        const v = (last[0] - prev[0]) / Math.max(1, last[1] - prev[1]); // px per ms, downwards
        const t = 200 * motion(this);
        d.style.transition = `transform ${t}ms var(--sav-easing), height ${t}ms var(--sav-easing)`;
        const settle = (st) => requestAnimationFrame(() => Object.assign(d.style, st));
        const expanded = this.hasAttribute('expanded');
        if (Math.abs(dy) < 4) { // a tap
          if (fromHandle && canGrow) { d.style.height = `${h0}px`; this.toggleAttribute('expanded', !expanded); settle({ height: '' }); }
          else settle({ transform: '' });
          return;
        }
        if (dy > 0 && canDrag) {
          const far = dy > h0 * 0.3 || v > 0.6;
          if (expanded && !(dy > h0 * 0.55 || v > 1)) { this.removeAttribute('expanded'); settle({ transform: '' }); return; }
          if (far && !this.hasAttribute('persistent')) {
            this._dragFrom = `translateY(${dy}px)`;
            d.style.transition = '';
            this.requestClose('drag');
            if (this.open) { this._dragFrom = ''; d.style.transition = `transform ${t}ms var(--sav-easing)`; settle({ transform: '' }); }
            return;
          }
          settle({ transform: '' });
          return;
        }
        if (dy < 0 && canGrow && !expanded) { if (-dy > 40 || v < -0.4) this.setAttribute('expanded', ''); settle({ height: '' }); return; }
        settle({ transform: '', height: '' });
      };
      addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
    }
  }
  props(SavActionSheet, { size: String, expandable: Boolean });
  define('sav-action-sheet', SavActionSheet);

  /**
   * Sav.actionSheet({ label: 'Share', items: [{ label: 'Copy link', value: 'link', icon: 'link' }, '-', { label: 'Delete', variant: 'danger' }] })
   * Opens a sheet made from the list and resolves with the chosen value (the label when an item has no value), or null.
   * '-' is a divider, { heading: 'Text' } a small heading. Other options: cancelLabel, noCancel, noClose, closeStyle, closeLabel,
   * size, expandable, persistent, footerLayout.
   */
  Sav.actionSheet = (opts = {}) => {
    const s = document.createElement('sav-action-sheet');
    if (opts.label) s.setAttribute('label', opts.label);
    for (const k of ['noCancel', 'noClose', 'noHeader', 'noHandle', 'noDrag', 'persistent', 'expandable']) if (opts[k]) s.setAttribute(k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()), '');
    for (const k of ['cancelLabel', 'closeStyle', 'closeLabel', 'closeIcon', 'size', 'footerLayout']) if (opts[k]) s.setAttribute(k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()), opts[k]);
    for (const it of opts.items || []) {
      if (it === '-' || it?.divider) { s.append(document.createElement('sav-divider')); continue; }
      if (it?.heading) { const l = document.createElement('sav-menu-label'); l.textContent = it.heading; s.append(l); continue; }
      const o = typeof it === 'string' ? { label: it } : it;
      const m = document.createElement('sav-menu-item');
      m.setAttribute('value', o.value ?? o.label);
      if (o.variant) m.setAttribute('variant', o.variant);
      if (o.disabled) m.setAttribute('disabled', '');
      if (o.icon) { const i = document.createElement('sav-icon'); i.slot = 'prefix'; i.setAttribute('name', o.icon); m.append(i); }
      m.append(document.createTextNode(o.label));
      s.append(m);
    }
    document.body.append(s);
    return s.pick().then((v) => { s.remove(); return v; });
  };

  /* ================================================================== sav-tabs / sav-tab */

  class SavTab extends SavElement {
    static styles = `:host { display: block; } :host(:not([active])) { display: none; } .p { padding: var(--sav-tab-padding, 1rem 0); }`;
    connectedCallback() {
      if (!this.shadowRoot.firstChild) this.shadowRoot.innerHTML = '<div class="p" part="base"><slot></slot></div>';
      this.setAttribute('role', 'tabpanel');
      if (!this.id) this.id = nextId('tabpanel');
    }
    changed() { this.closest('sav-tabs')?.build(); }
  }
  props(SavTab, { label: String, name: String, icon: String, iconPlacement: String, disabled: Boolean, active: Boolean, level: String });
  define('sav-tab', SavTab);

  class SavTabs extends SavElement {
    static styles = `
      :host { display: block; }
      /* the bottom line is an inset shadow and the indicator sits inside the bar: nothing pokes out, so the bar only ever scrolls sideways */
      .nav { position: relative; display: flex; gap: .25rem; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; box-shadow: inset 0 calc(var(--sav-border-width) * -1) 0 var(--sav-color-border); }
      .nav::-webkit-scrollbar { display: none; }
      .tab { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: .45rem; padding: .7rem .95rem; margin: 0; border: 0; background: none; color: var(--sav-color-text-muted);
             font: inherit; font-size: var(--sav-font-size-md); font-weight: var(--sav-font-weight-semibold); white-space: nowrap; cursor: pointer; border-radius: var(--sav-radius) var(--sav-radius) 0 0; transition: color calc(var(--sav-duration) * var(--sav-motion, 1)); }
      /* the background of a tab is a layer: it leans in the tilt style, the text stays upright */
      .tab::before { content: ""; position: absolute; inset: 3px 0; z-index: -1; border-radius: inherit; background: var(--_tb, transparent); background-image: var(--_tsh-img, none); box-shadow: var(--_ts, none);
                     transform: rotate(${TILT}); transform-origin: center; transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.22s * var(--sav-motion, 1)) var(--sav-easing); }
      .tab:hover { color: var(--sav-color-text); }
      .tab[aria-selected="true"] { color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); --_tb: var(--sav-tab-active-bg, transparent); }
      .tab:disabled { opacity: .45; cursor: not-allowed; }
      .tab:focus-visible { outline-offset: -3px; }
      .tab svg, .ti sav-icon { width: 1.1em; height: 1.1em; }
      /* icon-placement: start (before the text), after (right after it), end (at the far end of the tab, space in between) */
      .ti { display: inline-flex; flex: none; }
      .tl { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
      .tab.icon-end .ti { margin-inline-start: auto; padding-inline-start: .6rem; }
      .tab.icon-end .tl { flex: 0 1 auto; }
      :host([data-vertical]) .tab { justify-content: flex-start; text-align: start; }
      .ink { position: absolute; bottom: 0; left: 0; height: 2px; background: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); border-radius: 2px; transition: transform calc(.25s * var(--sav-motion, 1)) var(--sav-easing), width calc(.25s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([appearance="pills"]) .nav { box-shadow: none; gap: .35rem; }
      :host([appearance="pills"]) .tab { border-radius: var(--sav-radius-pill); padding: .5rem 1rem; }
      :host([appearance="pills"]) .tab::before { inset: 0; }
      :host([appearance="pills"]) .tab[aria-selected="true"] { --_tb: var(--sav-tab-active-bg, color-mix(in oklab, var(--sav-color-primary) 13%, transparent)); }
      :host([appearance="pills"]) .ink { display: none; }
      :host([appearance="segmented"]) .nav { box-shadow: none; display: inline-flex; border: var(--sav-border-width) solid var(--sav-color-border); background: var(--sav-color-surface-2); padding: 3px; border-radius: var(--sav-radius); gap: 2px; max-width: 100%; }
      :host([appearance="segmented"]) .tab { border-radius: calc(var(--sav-radius) - 2px); padding: .45rem .95rem; }
      /* across, the segmented bar is as tall as a field or a button (and as the segmented radio buttons) */
      :host([appearance="segmented"]:not([data-vertical])) .tab { min-height: calc(var(--sav-control-md) - 6px - 2 * var(--sav-border-width)); padding-block: 0; }
      :host([appearance="segmented"]) .tab::before { inset: 0; }
      :host([appearance="segmented"]) .tab[aria-selected="true"] { color: var(--sav-color-text); --_tb: var(--sav-color-surface); --_tsh-img: var(--sav-sheen, none); --_ts: var(--sav-tab-segment-shadow, var(--sav-shadow-sm)); }
      :host([appearance="segmented"]) .ink { display: none; }
      .rail { display: contents; }
      .fold, .ini, .sd, .tip { display: none; }
      :host([data-vertical]) .wrap { display: flex; gap: 1.25rem; }
      /* vertical: one column holds the tabs and, when collapsible, the fold button; the rail look (background, divider) is on it */
      :host([data-vertical]) .rail { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 2px; align-self: flex-start; flex: none; min-width: 10rem;
        padding: var(--sav-tab-vertical-rail-padding, 4px); background: var(--sav-tab-vertical-rail, var(--sav-color-surface-2)); border-radius: calc(var(--sav-radius) + 2px);
        border-right: var(--sav-tab-vertical-divider, 0 solid transparent); transition: min-width calc(.28s * var(--sav-motion, 1)) var(--sav-easing); }
      /* labels fold away smoothly; the icons never move */
      :host([data-vertical]) .tl { max-width: 16rem; white-space: nowrap; transition: max-width calc(.28s * var(--sav-motion, 1)) var(--sav-easing), opacity calc(.2s * var(--sav-motion, 1)); }
      :host([data-vertical]) .tab { transition: color calc(var(--sav-duration) * var(--sav-motion, 1)), gap calc(.28s * var(--sav-motion, 1)) var(--sav-easing); }
      /* the fold button: a row like the tabs, under a thin line, with the "panel" icons */
      :host([data-vertical][collapsible]) .fold { position: relative; isolation: isolate; display: flex; align-items: center; gap: .45rem; margin: .35rem 0 0; padding: .5rem .8rem;
        border: 0; border-radius: var(--sav-radius); background: none; color: var(--sav-color-text-muted); font: inherit; font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-semibold);
        text-align: start; white-space: nowrap; cursor: pointer; transition: color calc(var(--sav-duration) * var(--sav-motion, 1)), gap calc(.28s * var(--sav-motion, 1)) var(--sav-easing); }
      .fold::before { content: ""; position: absolute; inset: 1px 0; z-index: -1; border-radius: inherit; background: var(--_fb, transparent); transform: rotate(${TILT}); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .fold::after { content: ""; position: absolute; left: .55rem; right: .55rem; top: calc(-.2rem - 1px); height: 1px; background: var(--sav-color-border); }
      .fold:hover { color: var(--sav-color-text); --_fb: var(--sav-tab-vertical-hover, color-mix(in oklab, var(--sav-color-surface) 55%, transparent)); }
      .fold:focus-visible { outline-offset: -3px; }
      .fold svg, .fold sav-icon { flex: none; width: 1.1em; height: 1.1em; }
      .fold-t { overflow: hidden; max-width: 12rem; transition: max-width calc(.28s * var(--sav-motion, 1)) var(--sav-easing), opacity calc(.2s * var(--sav-motion, 1)); }
      /* collapsed */
      :host([data-vertical][collapsed]) .rail { min-width: 0; }
      :host([data-vertical][collapsed]) :is(.tab, .fold) { gap: 0; }
      :host([data-vertical][collapsed]) :is(.tl, .fold-t) { max-width: 0; opacity: 0; }
      :host([data-vertical][collapsed]) .tab.icon-end .ti { margin: 0; padding: 0; }
      /* a tab without an icon shows its first letter, drawn like an icon */
      :host([data-vertical][collapsed]) .tab:not(.sub):not(:has(.ti)) .ini { display: inline-grid; place-items: center; flex: none; box-sizing: border-box; width: 1.1em; height: 1.1em;
        border: calc(1.1em / 12) solid currentColor; border-radius: min(var(--sav-radius-sm), 4px); font-size: 1em; line-height: 1; }
      /* the letter is drawn like the outline icons: same size and stroke, the letter small and bold inside */
      .ini-l { font-size: .6em; font-weight: var(--sav-font-weight-bold); }
      /* sub tabs become small dots under their main tab; the open one is a bigger coloured dot */
      :host([data-vertical][collapsed]) .tab.sub { margin-left: 0; padding: .28rem .8rem; }
      :host([data-vertical][collapsed]) .tab.sub::after { display: none; }
      :host([data-vertical][collapsed]) .tab.sub .ti { display: none; }
      :host([data-vertical][collapsed]) .tab.sub .sd { display: block; width: 6px; height: 6px; margin-inline: calc(.55em - 3px); border-radius: 50%; background: var(--sav-color-border-strong);
        transition: transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing), background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      :host([data-vertical][collapsed]) .tab.sub.group-on .sd { background: color-mix(in oklab, var(--sav-color-primary) 55%, var(--sav-color-border-strong)); }
      :host([data-vertical][collapsed]) .tab.sub[aria-selected="true"] { --_tb: transparent; --_ts: none; --_tsh-img: none; }
      :host([data-vertical][collapsed]) .tab.sub[aria-selected="true"] .sd { background: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); transform: scale(1.45); }
      :host([data-vertical][collapsed]) .tab.sub:hover .sd { transform: scale(1.3); }
      /* the main tab of the open sub tab is marked with a light background (also when folded, while its sub tabs are dots) */
      :host([data-vertical]) .tab.parent-on { --_tb: color-mix(in oklab, var(--sav-color-primary) 16%, transparent); }
      /* the name of a collapsed tab shows in a tooltip on hover or keyboard focus (screen readers read the hidden label) */
      :host([data-vertical][collapsed]) .tab:is(:hover, :focus-visible) { z-index: 3; }
      :host([data-vertical][collapsed]) :is(.tab, .fold):is(:hover, :focus-visible) .tip,
      :host([data-vertical][collapsible]:not([collapse-button="row"])) .fold:is(:hover, :focus-visible) .tip { display: block; position: absolute; left: calc(100% + 10px); top: 50%; transform: translateY(-50%);
        padding: .35rem .6rem; border-radius: var(--sav-radius-sm); background: var(--sav-color-tooltip-bg); color: var(--sav-color-tooltip-text); box-shadow: var(--sav-tooltip-shadow, var(--sav-shadow));
        font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-semibold); line-height: 1.3; white-space: nowrap; pointer-events: none; animation: sav-tab-tip calc(.15s * var(--sav-motion, 1)) ease-out; }
      .tip::before { content: ""; position: absolute; left: -6px; top: calc(50% - 6px); width: 6px; height: 12px; background: inherit; clip-path: polygon(100% 0, 100% 100%, 0 50%); }
      @keyframes sav-tab-tip { from { opacity: 0; transform: translate(-4px, -50%); } }
      @media (prefers-reduced-motion: reduce) { :host([data-vertical]) :is(.rail, .tl, .tab, .fold, .fold-t, .sd) { transition: none; } .tip { animation: none !important; } }
      /* collapse-button="edge" (the default): a small round handle on the right border of the rail, level with the first tab, half outside it
         (a leaning square in Tilt, since it takes the pill radius of the style) */
      :host([data-vertical][collapsible]:not([collapse-button="row"])) .fold { position: absolute; z-index: 4; top: .55rem; right: -.85rem;
        width: 1.7rem; height: 1.7rem; margin: 0; padding: 0; gap: 0; justify-content: center; border-radius: var(--sav-radius-pill); color: var(--sav-color-text-muted); }
      /* the first tab shares its row with the handle (which sticks out .85rem beyond the rail): its name shows past the handle, the others stay close */
      :host([data-vertical][collapsible]:not([collapse-button="row"])) .tab:first-child .tip { left: calc(100% + 2rem); }
      :host([data-vertical]:not([collapse-button="row"])) .fold::before { inset: 0; --_fb: var(--sav-color-surface); background: var(--_fb); background-image: var(--sav-sheen, none);
        box-shadow: 0 0 0 var(--sav-border-width) var(--sav-color-border-strong), var(--sav-shadow-sm); transform: rotate(calc(var(--sav-knob-tilt, 0deg))); }
      :host([data-vertical]:not([collapse-button="row"])) .fold:hover { color: var(--sav-color-primary); }
      :host([data-vertical]:not([collapse-button="row"])) .fold:hover::before { transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -.5)) scale(1.08); }
      :host([data-vertical]:not([collapse-button="row"])) .fold::after, :host([data-vertical]:not([collapse-button="row"])) .fold-t { display: none; }
      :host([data-vertical][collapsible]:not([collapse-button="row"])) .wrap { gap: 1.9rem; } /* room for the handle that sticks out */
      :host([data-vertical]:not([collapse-button="row"])) .fold svg, :host([data-vertical]:not([collapse-button="row"])) .fold sav-icon { width: .95rem; height: .95rem; }
      /* by default (Soft, Sharp) the tabs sit on a rail and the selected one is a raised card; Tilt and Brutal use a plain column with a divider */
      :host([data-vertical]) .nav { flex-direction: column; gap: 2px; box-shadow: none; overflow: visible; }
      :host([data-vertical]) .tab { border-radius: var(--sav-radius); padding: .5rem .8rem; }
      :host([data-vertical]) .tab::before { inset: 1px 0; transform-origin: left; }
      :host([data-vertical]) .tab:not([aria-selected="true"]):not(:disabled):hover { --_tb: var(--sav-tab-vertical-hover, color-mix(in oklab, var(--sav-color-surface) 55%, transparent)); }
      /* the selected tab follows the style: a raised card on the rail (Soft, Sharp), a filled block (Tilt),
         an inked block with a hard shadow (Brutal), a glass plate (Glass) — the --sav-tab-vertical-* tokens */
      :host([data-vertical]) .tab[aria-selected="true"] { color: var(--sav-tab-vertical-active-fg, var(--sav-color-text));
        --_tb: var(--sav-tab-vertical-active-bg, var(--sav-color-surface)); --_tsh-img: var(--sav-sheen, none);
        --_ts: var(--sav-tab-vertical-active-shadow, var(--sav-tab-vertical-active-line, 0 0 0 var(--sav-border-width) var(--sav-color-border), var(--sav-shadow-sm))); }
      :host([data-vertical]) .ink { display: none; }
      :host([data-vertical]) .panels { flex: 1; min-width: 0; }
      :host([data-vertical]) ::slotted(sav-tab) { --sav-tab-padding: .4rem 0; }
      /* two levels: a tab with level="sub" sits under the one before it, smaller and a little indented, with a thin guide line */
      .tab.sub { font-size: var(--sav-font-size-sm); font-weight: 500; }
      :host([data-vertical]) .tab.sub { margin-left: var(--sav-tab-sub-indent, .9rem); padding: .38rem .75rem; }
      :host([data-vertical]) .tab.sub::after { content: ""; position: absolute; left: calc(var(--sav-tab-sub-indent, .9rem) * -.5); top: -1px; bottom: -1px; width: 1px; background: var(--sav-color-border-strong); }
      :host([data-vertical]) .tab.sub[aria-selected="true"]::after { background: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); width: 2px; }
      /* the main tab of the open sub tab is coloured (not selected), and its group's guide line is tinted, so you see whose sub it is */
      .tab.parent-on { color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); }
      :host([data-vertical]) .tab.sub.group-on::after { background: color-mix(in oklab, oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h) 55%, var(--sav-color-border-strong)); }
      /* side="end" (vertical): the rail on the right, the content on the left; the fold handle and the tooltips sit on the outer (left) side */
      :host([data-end]) .wrap { flex-direction: row-reverse; }
      :host([data-end]) .rail { border-right: 0; border-left: var(--sav-tab-vertical-divider, 0 solid transparent); }
      :host([data-end][collapsed]) :is(.tab, .fold):is(:hover, :focus-visible) .tip,
      :host([data-end][collapsible]:not([collapse-button="row"])) .fold:is(:hover, :focus-visible) .tip { left: auto; right: calc(100% + 10px); }
      :host([data-end]) .tip::before { left: auto; right: -6px; clip-path: polygon(0 0, 100% 50%, 0 100%); }
      :host([data-end][collapsible]:not([collapse-button="row"])) .fold { right: auto; left: -.85rem; }
      :host([data-end][collapsible]:not([collapse-button="row"])) .tab:first-child .tip { left: auto; right: calc(100% + 2rem); }
      :host([data-end]) .tab::before { transform-origin: right; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: color-mix(in oklab, var(--sav-color-primary) 14%, var(--sav-color-bg)); }
      :host([appearance="segmented"]) { --_eb: var(--sav-color-bg); }
      :host([data-vertical]) { --_eb: var(--sav-tab-vertical-active-behind, var(--sav-color-bg)); }
      :host([auto-text]) .tab[aria-selected="true"] { color: ${AUTO_TEXT}; }
    `;
    connectedCallback() {
      this.syncVertical();
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = '<div class="wrap"><div class="rail" part="rail"><div class="nav" part="nav" role="tablist"></div><button type="button" class="fold" part="collapse-button"></button></div><div class="panels" part="panels"><slot></slot></div></div>';
      this.$('.fold').addEventListener('click', () => (this.collapsed ? this.expand() : this.collapse()));
      this.$('slot').addEventListener('slotchange', () => this.build());
      this.$('.nav').addEventListener('keydown', (e) => this.onKey(e));
      this._ro = new ResizeObserver(() => this.ink());
      this._ro.observe(this);
      this.build();
    }
    /** start and end are both vertical: the shared rules key on data-vertical, only the side differs */
    /* orientation="vertical" puts the tabs in a column, side="end" on the right (start, the left, is the default).
       The older placement="start" / "end" still works. */
    get vertical() { const p = this.getAttribute('placement'); return this.getAttribute('orientation') === 'vertical' || p === 'start' || p === 'end'; }
    get end() { return this.vertical && (this.getAttribute('side') === 'end' || this.getAttribute('placement') === 'end'); }
    syncVertical() { this.toggleAttribute('data-vertical', this.vertical); this.toggleAttribute('data-end', this.end); }
    changed(name) {
      if (['placement', 'orientation', 'side'].includes(name)) this.syncVertical();
      if (name === 'icon-placement') this.build();
      else if (['collapsed', 'collapsible', 'placement', 'orientation', 'side', 'collapse-label', 'expand-label', 'collapse-button'].includes(name)) this.syncFold();
    }
    /** the fold button and, when collapsed, a tooltip with the name of each tab */
    syncFold() {
      const b = this.$('.fold'); if (!b) return;
      const c = this.collapsed && this.vertical, end = this.end;
      const text = c ? this.getAttribute('expand-label') || T(this, 'Expand') : this.getAttribute('collapse-label') || T(this, 'Collapse');
      const edge = this.getAttribute('collapse-button') !== 'row'; // the handle on the border is the default; "row" puts a row at the bottom
      b.innerHTML = `${svgIcon(edge ? ((c !== end) ? 'chevrons-right' : 'chevrons-left') : `panel-${end ? 'right' : 'left'}-${c ? 'open' : 'close'}`)}<span class="fold-t">${esc(text)}</span><span class="tip" aria-hidden="true">${esc(text)}</span>`;
      b.setAttribute('aria-label', text);
      b.setAttribute('aria-expanded', String(!c));
    }
    /** only the icons (collapse), or icons and labels again (expand); both fire sav-collapse */
    collapse() { if (this.collapsed) return; this.collapsed = true; this.emit('sav-collapse', { collapsed: true }); }
    expand() { if (!this.collapsed) return; this.collapsed = false; this.emit('sav-collapse', { collapsed: false }); }
    get tabs() { return [...this.querySelectorAll(':scope > sav-tab')]; }
    build() {
      const nav = this.$('.nav'); if (!nav || this._building) return;
      this._building = true;
      const tabs = this.tabs;
      const A = (t, a) => t.getAttribute(a);
      tabs.forEach((t) => { if (!t.id) t.id = nextId('tabpanel'); });
      const want = this.getAttribute('active');
      let active = (want && tabs.find((t) => A(t, 'name') === want)) || tabs.find((t) => t.hasAttribute('active') && !t.hasAttribute('disabled')) || tabs.find((t) => !t.hasAttribute('disabled'));
      // where the icon goes: the tab's own icon-placement, else the one of sav-tabs, else before the text
      const place = (t) => { const p = A(t, 'icon-placement') || this.getAttribute('icon-placement'); return p === 'after' || p === 'end' ? p : 'start'; };
      const inner = (t, i) => {
        const ic = A(t, 'icon') ? `<span class="ti" part="tab-icon">${svgIcon(A(t, 'icon'))}</span>` : '';
        const label = A(t, 'label') || `Tab ${i + 1}`;
        const tx = `<span class="tl" part="tab-label">${esc(label)}</span>`;
        const ini = ic ? '' : `<span class="ini" aria-hidden="true"><span class="ini-l">${esc(label.trim().charAt(0).toUpperCase())}</span></span>`; // collapsed and no icon: its first letter
        const extra = `${A(t, 'level') === 'sub' ? '<span class="sd" aria-hidden="true"></span>' : ''}<span class="tip" aria-hidden="true">${esc(label)}</span>`; // collapsed: a dot for sub tabs, the name as tooltip
        return (place(t) === 'start' ? ini + ic + tx : ini + tx + ic) + extra;
      };
      nav.innerHTML = tabs.map((t, i) => `<button class="tab${A(t, 'level') === 'sub' ? ' sub' : ''}${A(t, 'icon') ? ` icon-${place(t)}` : ''}" part="tab${A(t, 'level') === 'sub' ? ' sub-tab' : ''}" role="tab" type="button" id="${t.id}-t" aria-controls="${t.id}" data-i="${i}" ${t.hasAttribute('disabled') ? 'disabled' : ''}>${inner(t, i)}</button>`).join('') + '<span class="ink" part="indicator"></span>';
      nav.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => this.select(tabs[b.dataset.i])));
      nav.querySelectorAll('.tab').forEach((b) => tiltWatch(b));
      tabs.forEach((t) => t.setAttribute('aria-labelledby', `${t.id}-t`));
      this._building = false;
      this.syncFold();
      this.select(active, false);
    }
    select(tab, fire = true) {
      if (!tab || tab.hasAttribute('disabled')) return;
      this._building = true;
      const tabs = this.tabs;
      tabs.forEach((t, i) => {
        t.toggleAttribute('active', t === tab);
        const b = this.$(`.tab[data-i="${i}"]`);
        if (b) { b.setAttribute('aria-selected', String(t === tab)); b.tabIndex = t === tab ? 0 : -1; }
      });
      // a sub tab: find its main tab (the last normal one before it) and the other sub tabs of the same group
      const btns = this.$$('.tab'), at = tabs.indexOf(tab);
      btns.forEach((b) => b.classList.remove('parent-on', 'group-on'));
      if (tab.getAttribute('level') === 'sub') {
        let p = at; while (p > 0 && btns[p]?.classList.contains('sub')) p--;
        if (btns[p] && !btns[p].classList.contains('sub')) btns[p].classList.add('parent-on');
        for (let i = p + 1; i < btns.length && btns[i].classList.contains('sub'); i++) btns[i].classList.add('group-on');
      }
      this._building = false;
      this.ink();
      if (fire) this.emit('sav-tab-show', { name: tab.getAttribute('name'), index: tabs.indexOf(tab), tab });
    }
    show(nameOrIndex) {
      const tabs = this.tabs;
      this.select(typeof nameOrIndex === 'number' ? tabs[nameOrIndex] : tabs.find((t) => t.getAttribute('name') === nameOrIndex));
    }
    ink() {
      const b = this.$('.tab[aria-selected="true"]'), ink = this.$('.ink');
      if (!b || !ink) return;
      ink.style.width = b.offsetWidth + 'px';
      ink.style.transform = `translateX(${b.offsetLeft}px)`;
    }
    onKey(e) {
      const btns = this.$$('.tab:not(:disabled)');
      const cur = btns.indexOf(this.shadowRoot.activeElement);
      const vertical = this.vertical;
      const map = vertical ? { ArrowDown: 1, ArrowUp: -1 } : { ArrowRight: 1, ArrowLeft: -1 };
      let next = null;
      if (e.key in map) next = btns[(cur + map[e.key] + btns.length) % btns.length];
      else if (e.key === 'Home') next = btns[0];
      else if (e.key === 'End') next = btns[btns.length - 1];
      if (!next) return;
      e.preventDefault();
      next.focus();
      next.click();
    }
  }
  props(SavTabs, { appearance: String, orientation: String, side: String, placement: String, iconPlacement: String, collapsible: Boolean, collapsed: Boolean, collapseLabel: String, expandLabel: String, collapseButton: String });
  define('sav-tabs', SavTabs);

  /* ================================================================== sav-details / sav-accordion */

  class SavDetails extends SavElement {
    static styles = `
      :host { display: block; }
      .d { border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius); background: var(--sav-color-surface); background-image: var(--sav-sheen, none); overflow: hidden; box-shadow: var(--sav-details-shadow, none); -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none);
           -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none); }
      :host([appearance="plain"]) .d { border: 0; border-bottom: var(--sav-border-width) solid var(--sav-color-border); border-radius: 0; background: none; }
      :host([appearance="plain"]:last-child) .d { border-bottom: 0; } /* the line separates rows: the last one has nothing under it */
      .sum { display: flex; align-items: center; gap: .75rem; width: 100%; margin: 0; padding: .9rem 1rem; border: 0; background: none; color: var(--sav-color-text);
             font: inherit; font-size: var(--sav-font-size-md); font-weight: var(--sav-font-weight-semibold); text-align: left; cursor: pointer; }
      :host([appearance="plain"]) .sum { padding-inline: var(--sav-details-plain-inline, 0); } /* Glass gives plain rows a little room on the sides */
      .sum:hover { background: color-mix(in oklab, var(--sav-color-surface-2) 60%, transparent); }
      :host([appearance="plain"]) .sum:hover { background: none; color: var(--sav-color-primary); }
      .sum:focus-visible { outline-offset: -3px; }
      .st { flex: 1; }
      .chev { width: 1.15em; height: 1.15em; color: var(--sav-color-text-muted); transition: transform calc(.25s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([open]) .chev { transform: rotate(180deg); }
      :host([disabled]) .sum { opacity: .5; cursor: not-allowed; }
      .rg { display: grid; grid-template-rows: 0fr; transition: grid-template-rows calc(.28s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([open]) .rg { grid-template-rows: 1fr; }
      .rg > div { overflow: hidden; }
      .c { padding: 0 1rem 1rem; color: var(--sav-color-text); line-height: 1.55; }
      :host([appearance="plain"]) .c { padding-inline: var(--sav-details-plain-inline, 0); }
      .rg:not(.vis) { visibility: hidden; }
    `;
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('det');
      this.shadowRoot.innerHTML = `<div class="d" part="base"><button class="sum" part="header" aria-controls="${id}" type="button"><slot name="prefix"></slot><span class="st" part="summary"><slot name="summary"></slot><span class="stx"></span></span>${svgIcon('chevron-down', 'chev')}</button>
        <div class="rg" id="${id}" role="region"><div><div class="c" part="content"><slot></slot></div></div></div></div>`;
      this.$('.sum').addEventListener('click', () => { if (!this.disabled) this.open = !this.open; });
      this.$('.rg').addEventListener('transitionend', () => { if (!this.open) this.$('.rg').classList.remove('vis'); });
      this.sync();
    }
    changed(name) {
      if (name === 'open') {
        if (this.open) { this.$('.rg').classList.add('vis'); this.closest('sav-accordion')?.onOpen(this); }
        else if (!motion(this)) this.$('.rg').classList.remove('vis'); // no animation: no transitionend to wait for
        this.emit(this.open ? 'sav-show' : 'sav-hide');
      }
      this.sync();
    }
    sync() {
      this.$('.stx').textContent = this.summary || '';
      const b = this.$('.sum');
      b.setAttribute('aria-expanded', String(this.open));
      b.disabled = this.disabled;
      this.$('.rg').classList.toggle('vis', this.open);
    }
    show() { this.open = true; } hide() { this.open = false; }
  }
  props(SavDetails, { summary: String, open: Boolean, disabled: Boolean, appearance: String });
  define('sav-details', SavDetails);

  class SavAccordion extends SavElement {
    static styles = `:host { display: flex; flex-direction: column; gap: var(--gap, .5rem); } :host([appearance="plain"]) { gap: 0; }`;
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = '<slot></slot>';
      const app = this.getAttribute('appearance');
      if (app) this.querySelectorAll(':scope > sav-details').forEach((d) => d.hasAttribute('appearance') || d.setAttribute('appearance', app));
    }
    onOpen(item) {
      if (!this.hasAttribute('exclusive')) return;
      this.querySelectorAll(':scope > sav-details[open]').forEach((d) => d !== item && d.removeAttribute('open'));
    }
  }
  define('sav-accordion', SavAccordion);

  /* ================================================================== sav-dropdown / sav-menu-item */

  class SavMenuItem extends SavElement {
    static styles = `
      :host { display: block; position: relative; outline: none; }
      .i { position: relative; isolation: isolate; display: flex; align-items: center; gap: .6rem; padding: var(--sav-menu-item-padding, .5rem .75rem); margin: 0 .3rem; border-radius: calc(var(--sav-radius) - 2px); color: var(--sav-color-text); font-size: var(--sav-font-size-md); cursor: pointer; user-select: none; white-space: nowrap; }
      :host(:focus-visible) .i, .i:hover { background: var(--sav-color-surface-2); }
      :host(:focus-visible) .i { box-shadow: inset 0 0 0 2px var(--sav-color-focus); }
      /* the current item: the same highlight as the breadcrumb and the header (tint, tile, underline, inked block, glass, by style) */
      :host([current]) > .i { color: var(--sav-breadcrumb-current-fg, color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)));
        background: var(--sav-breadcrumb-current-bg, color-mix(in oklab, var(--sav-color-primary) 12%, transparent)); box-shadow: var(--sav-breadcrumb-current-shadow, none); font-weight: var(--sav-font-weight-semibold); }
      :host([current]) ::slotted([slot="prefix"]) { color: inherit; }
      :host([data-has-current]:not([open])) > .i { font-weight: var(--sav-font-weight-semibold); }
      :host([variant="danger"]) .i { color: var(--sav-color-danger); }
      :host([variant="danger"]) .i:hover, :host([variant="danger"]:focus-visible) .i { background: color-mix(in oklab, var(--sav-color-danger) 12%, transparent); }
      :host([disabled]) .i { opacity: .45; cursor: not-allowed; background: none; }
      .lab { flex: 1; }
      ::slotted([slot="prefix"]), ::slotted([slot="suffix"]) { color: var(--sav-color-text-muted); }
      ::slotted([slot="suffix"]) { font-size: var(--sav-font-size-sm); margin-left: 1rem; }
      .chk { width: 1em; height: 1em; visibility: hidden; color: var(--sav-color-primary); }
      :host([type="checkbox"][checked]) .chk { visibility: visible; }
      :host(:not([type="checkbox"])) .chk { display: none; }
      .arr { display: none; width: 1em; height: 1em; margin-left: auto; color: var(--sav-color-text-muted); transition: transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([data-sub]) .arr { display: block; }
      :host([data-sub][open]:not([data-bar]):not([data-rail]):not([data-in-flyout])) .arr { transform: rotate(90deg); }
      :host([data-bar][data-sub]) .arr { transform: rotate(90deg); } :host([data-bar][data-sub][open]) .arr { transform: rotate(-90deg); }
      .sub { display: none; }
      :host([open]) .sub { display: block; }
      /* in a bar the submenu drops down; in a rail or inside another flyout it flies out to the side */
      :host([data-bar]) .i { margin: 0; }
      :host([data-bar]) .sub, :host([data-rail]) .sub, :host([data-in-flyout]) .sub { position: absolute; z-index: 60; }
      :host([data-bar]) .sub { top: calc(100% + .3rem); left: 0; }
      :host([data-rail]) .sub, :host([data-in-flyout]) .sub { top: calc(-.35rem + var(--_sub-dy, 0px)); left: calc(100% + .2rem); }
      /* a flyout with no room on the right opens on the left (context menu); --_sub-dy moves it up to stay on screen */
      :host { --_sub-dy: 0px; }
      :host([data-in-flyout][data-flip]) .sub { left: auto; right: calc(100% + .2rem); }
      :host([data-in-flyout][open]) > .i { background: var(--sav-color-surface-2); }
      /* rail: icons only, the label becomes the tooltip */
      :host([data-rail]) .i { justify-content: center; padding: .6rem; }
      :host([data-rail]) .lab, :host([data-rail]) ::slotted([slot="suffix"]), :host([data-rail]) .arr { display: none; }
      :host([data-rail]) ::slotted([slot="prefix"]) { font-size: 1.15rem; }
      :host([data-rail][data-sub]) .i::after { content: ""; position: absolute; right: 4px; bottom: 4px; border: 3px solid transparent; border-right-color: currentColor; border-bottom-color: currentColor; opacity: .5; }
      @media (prefers-reduced-motion: reduce) { .arr { transition: none; } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${CUR_EB(12)}; }
      :host(:is([auto-text], [data-auto-text])[current]) > .i { color: ${AUTO_TEXT}; }
    `;
    static get observedAttributes() { return ['open', 'data-rail', 'disabled', 'checked', 'type']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = `<div class="i" part="base">${svgIcon('check', 'chk')}<slot name="prefix"></slot><span class="lab" part="label"><slot></slot></span><slot name="suffix"></slot>${svgIcon('chevron-right', 'arr')}</div><div class="sub" part="submenu"><slot name="submenu"></slot></div>`;
        this.$('slot[name="submenu"]').addEventListener('slotchange', () => this.sync());
      }
      if (!this.hasAttribute('role')) this.setAttribute('role', this.getAttribute('type') === 'checkbox' ? 'menuitemcheckbox' : 'menuitem');
      if (!this.hasAttribute('tabindex')) this.tabIndex = -1;
      this.sync();
    }
    changed() { this.sync(); }
    get hasSubmenu() { return !!this.querySelector(':scope > [slot="submenu"]'); }
    get open() { return this.hasAttribute('open'); }
    set open(v) { this.toggleAttribute('open', !!v); }
    close() { this.open = false; }
    firstSubItem() { return this.querySelector(':scope > sav-menu[slot="submenu"]')?.items[0]; }
    sync() {
      this.disabled ? this.setAttribute('aria-disabled', 'true') : this.removeAttribute('aria-disabled');
      if (this.getAttribute('type') === 'checkbox') this.setAttribute('aria-checked', String(this.checked));
      const sub = this.hasSubmenu;
      this.toggleAttribute('data-sub', sub);
      const box = this.parentElement?.closest('sav-menu, sav-context-menu');
      this.toggleAttribute('data-in-flyout', !!box && (box.localName === 'sav-context-menu' ? !box.hasAttribute('data-sheet') : box.hasAttribute('data-flyout')));
      if (sub) { this.setAttribute('aria-haspopup', 'menu'); this.setAttribute('aria-expanded', String(this.open)); } else { this.removeAttribute('aria-haspopup'); this.removeAttribute('aria-expanded'); }
      // in a rail only the icon shows: the label is the tooltip and the accessible name
      const label = [...this.childNodes].filter((n) => n.nodeType === 3 || (n.nodeType === 1 && !n.slot)).map((n) => n.textContent).join('').trim();
      if (this.hasAttribute('data-rail')) { this.title = label; this.setAttribute('aria-label', label); } else if (this.title === label) { this.removeAttribute('title'); this.removeAttribute('aria-label'); }
    }
    get value() { return this.getAttribute('value') ?? this.textContent.trim(); }
    set value(v) { this.setAttribute('value', v); }
  }
  props(SavMenuItem, { disabled: Boolean, checked: Boolean, variant: String, type: String });
  define('sav-menu-item', SavMenuItem);

  class SavMenuLabel extends SavElement {
    static styles = `:host { display: block; padding: .55rem 1.05rem .25rem; font-size: .72rem; font-weight: var(--sav-font-weight-bold); text-transform: uppercase; letter-spacing: .06em; color: var(--sav-color-text-muted); }`;
    connectedCallback() { if (!this.shadowRoot.firstChild) this.shadowRoot.innerHTML = '<slot></slot>'; }
  }
  define('sav-menu-label', SavMenuLabel);

  class SavDropdown extends SavElement {
    static styles = [FLOAT, `
      :host { display: inline-block; position: relative; }
      .menu { min-width: var(--min-width, 12rem); max-height: min(var(--max-height, 22rem), calc(100vh - 2rem)); flex-direction: column; padding: 0; border: var(--sav-border-width) solid var(--sav-color-border);
              border-radius: var(--sav-radius); background: var(--sav-color-surface); color: var(--sav-color-text); box-shadow: var(--sav-shadow-lg); font-family: var(--sav-font);
              -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none); }
      .menu:popover-open, .menu.open { display: flex; animation: sav-menu calc(.16s * var(--sav-motion, 1)) var(--sav-easing); }
      .items { flex: 1 1 auto; min-height: 0; overflow: auto; overscroll-behavior: contain; padding: .3rem 0; }
      ${panelLayer('.menu')}
      ::slotted(sav-divider) { --spacing: .3rem; }
      ::slotted(hr) { border: 0; border-top: var(--sav-border-width) solid var(--sav-color-border); margin: .3rem 0; }
      @keyframes sav-menu { from { opacity: 0; transform: translateY(-4px) scale(.98); } }
      ${SHEET_MENU}
    `];
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<slot name="trigger" part="trigger"></slot><div class="menu float" part="panel" ${supportsPopover ? 'popover="auto"' : ''}><div class="items" role="menu"><slot></slot></div></div>`;
      const menu = (this.menu = this.$('.menu'));
      tiltWatch(menu);
      this.initSheet();
      this.$('slot[name="trigger"]').addEventListener('click', () => {
        if (Date.now() - (this._closedAt || 0) < 150) return; // light dismiss just closed it
        this.open ? this.hide() : this.show();
      });
      this.$('slot[name="trigger"]').addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); this.show(e.key === 'ArrowUp' ? 'last' : 'first'); }
      });
      menu.addEventListener('toggle', (e) => { if (e.newState === 'closed') this.afterHide(); });
      // on the items, not on the panel: on a phone they move into the action sheet
      const items = this.$('.items');
      items.addEventListener('keydown', (e) => this.onKey(e));
      items.addEventListener('click', (e) => {
        const item = e.target.closest('sav-menu-item');
        if (!item || item.hasAttribute('disabled')) return;
        this.choose(item);
      });
      // browsers without popovers: a press outside closes it (removed again when the element leaves the page)
      if (!supportsPopover) { this._outside = (e) => { if (this.open && !this.sheet && !e.composedPath().includes(this)) this.hide(); }; document.addEventListener('pointerdown', this._outside); }
    }
    /** sheet-on-mobile: on a phone the items open in a sav-action-sheet, titled by label (or the text of the trigger) */
    initSheet() { this._sheet = new MobileSheet(this, { onHide: () => this.afterHide(), returnFocus: () => (this.localName === 'sav-dropdown' ? this.trigger : null) }); }
    /** True while the menu is open as an action sheet. */
    get sheet() { return !!this._sheet?.active; }
    openSheet(label) {
      const items = this.$('.items');
      // several choices: the sheet closes with Done, there is nothing to cancel
      const many = this.multiple || this.hasAttribute('stay-open');
      if (!this._sheet.open([items], { label, attrs: { 'no-cancel': many, 'close-style': many ? 'text' : null } })) return false;
      items.classList.add('in-sheet');
      label ? items.setAttribute('aria-label', label) : items.removeAttribute('aria-label');
      this._sheet.el.addEventListener('sav-after-hide', () => items.classList.remove('in-sheet'), { once: true });
      return true;
    }
    get items() { return [...this.querySelectorAll('sav-menu-item')].filter((i) => !i.hasAttribute('disabled') && !i.closest('[hidden]')); }
    get trigger() { return this.querySelector(':scope > [slot="trigger"]'); }
    get open() { return this.hasAttribute('open'); }
    show(focus = 'first') {
      if (this.disabled || this.open) return;
      if (!this.emit('sav-show', {}, true)) return;
      if (this.multiple) this.querySelectorAll('sav-menu-item:not([type])').forEach((i) => i.setAttribute('type', 'checkbox'));
      if (MobileSheet.wanted(this)) { if (!this.openSheet(this.getAttribute('label') || this.trigger?.textContent.trim() || '')) return; }
      else showPop(this.menu);
      this.setAttribute('open', '');
      this.trigger?.setAttribute('aria-expanded', 'true');
      this.trigger?.toggleAttribute('data-open', true); // a tilted trigger straightens while its menu is open
      if (!this.sheet) {
        place(this.menu, this.trigger || this, this.placement || 'bottom-start', 6);
        this._reflow ||= () => { if (!this.open || this.sheet) return; const a = this.trigger || this; if (anchorGone(a)) { this.hide(); return; } place(this.menu, a, this.placement || 'bottom-start', 6); };
        addEventListener('scroll', this._reflow, true);
        addEventListener('resize', this._reflow);
      }
      const items = this.items;
      (focus === 'last' ? items[items.length - 1] : items[0])?.focus({ preventScroll: true });
    }
    hide() { if (this.sheet) { this._sheet.close(); return; } hidePop(this.menu); if (!supportsPopover) this.afterHide(); }
    afterHide() {
      if (!this.open) return;
      this._closedAt = Date.now();
      this.removeAttribute('open');
      this.trigger?.setAttribute('aria-expanded', 'false');
      this.trigger?.removeAttribute('data-open');
      removeEventListener('scroll', this._reflow, true);
      removeEventListener('resize', this._reflow);
      if (this.contains(document.activeElement) && document.activeElement !== this.trigger) this.trigger?.focus?.({ preventScroll: true });
      this.emit('sav-hide');
    }
    get multiple() { return this.hasAttribute('multiple'); }
    /** Values of the checked items (multiple dropdowns and checkbox items). */
    get value() { return [...this.querySelectorAll('sav-menu-item[checked]')].map((i) => i.value); }
    set value(list) { const v = new Set(Array.isArray(list) ? list : String(list).split(',')); this.querySelectorAll('sav-menu-item').forEach((i) => i.toggleAttribute('checked', v.has(i.value))); }
    choose(item) {
      const check = this.multiple || item.getAttribute('type') === 'checkbox';
      if (check) item.checked = !item.checked;
      this.emit('sav-select', { item, value: item.value, checked: check ? item.checked : undefined });
      if (check) this.emit('change', { value: this.value });
      if (!check && !this.hasAttribute('stay-open')) { this.hide(); this.trigger?.focus?.(); }
    }
    onKey(e) {
      const items = this.items, cur = items.indexOf(document.activeElement);
      let n = null;
      if (e.key === 'ArrowDown') n = items[(cur + 1) % items.length];
      else if (e.key === 'ArrowUp') n = items[(cur - 1 + items.length) % items.length];
      else if (e.key === 'Home') n = items[0];
      else if (e.key === 'End') n = items[items.length - 1];
      else if ((e.key === 'Enter' || e.key === ' ') && cur >= 0) { e.preventDefault(); this.choose(items[cur]); return; }
      else if (e.key === 'Tab') { if (!this.sheet) this.hide(); return; } // in the sheet Tab reaches its close and Cancel buttons
      else if (e.key === 'Escape' && !supportsPopover) { this.hide(); this.trigger?.focus(); return; }
      else if (e.key.length === 1) { // type-ahead
        const k = e.key.toLowerCase();
        n = items.slice(cur + 1).concat(items.slice(0, cur + 1)).find((i) => i.textContent.trim().toLowerCase().startsWith(k));
      }
      if (n) { e.preventDefault(); n.focus(); }
    }
    disconnectedCallback() { if (this._outside) document.removeEventListener('pointerdown', this._outside); if (this.open) this.hide?.(); }
  }
  props(SavDropdown, { placement: String, disabled: Boolean, label: String });
  define('sav-dropdown', SavDropdown);

  /* ================================================================== sav-context-menu */

  /** Where the browser's own menu stays (copy, paste, spelling): text fields and editable text. */
  const EDITABLE = 'input:not([type="checkbox"], [type="radio"], [type="button"], [type="submit"], [type="reset"], [type="range"], [type="color"], [type="file"], [type="image"]), textarea, [contenteditable]:not([contenteditable="false"])';

  class SavContextMenu extends SavDropdown {
    /* The menu of a right click on an area of the page, also opened by a long press on touch screens and by the menu key or
       Shift F10 on the focused area. for="id" names the area; without it, the area goes inside with slot="target".
       Same items as the dropdown, plus submenus that fly out: <sav-menu-item>Share <sav-menu slot="submenu">…</sav-menu></sav-menu-item>.
       The panel is the popup panel of every style (it leans in Tilt, is frosted in Glass, inked in Brutal…), and so are its submenus. */
    static styles = [...SavDropdown.styles, `
      :host { display: contents; }
      ::slotted([slot="target"]) { -webkit-touch-callout: none; }
      /* it grows from the corner at the pointer */
      .menu { transform-origin: var(--_ox, left) var(--_oy, top); }
      .menu:popover-open, .menu.open { animation-name: sav-ctx; }
      @keyframes sav-ctx { from { opacity: 0; transform: scale(.96); } }
      @media (prefers-reduced-motion: reduce) { .menu:popover-open, .menu.open { animation: none; } }
      /* with submenus nothing may clip them: the panel grows with its items instead of scrolling */
      :host([data-has-sub]) .menu { max-height: none; }
      :host([data-has-sub]) .items { overflow: visible; }
    `];
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = `<slot name="target" part="target"></slot><div class="menu float" part="panel" ${supportsPopover ? 'popover="manual"' : ''}><div class="items" role="menu"><slot></slot></div></div>`;
        const menu = (this.menu = this.$('.menu'));
        tiltWatch(menu);
        this.initSheet();
        menu.addEventListener('toggle', (e) => { if (e.newState === 'closed') this.afterHide(); });
        // on the items, not on the panel: on a phone they move into the action sheet
        const items = this.$('.items');
        items.addEventListener('keydown', (e) => this.onKey(e));
        items.addEventListener('click', (e) => {
          const path = e.composedPath(), item = path.find((n) => n.localName === 'sav-menu-item');
          // a click on the padding, a label or a divider of a submenu belongs to no item
          if (!item || item.hasAttribute('disabled') || path.slice(0, path.indexOf(item)).some((n) => n.localName === 'sav-menu')) return;
          this.choose(item);
        });
        // only a real move counts: a menu that opens under a pointer at rest does not take the item from the arrow keys
        items.addEventListener('pointermove', (e) => this.hover(e));
        items.addEventListener('contextmenu', (e) => e.preventDefault());
        // pressing an item does not move the focus: a text field that has it keeps it (and its caret) after the choice
        items.addEventListener('mousedown', (e) => e.preventDefault());
        // a submenu opened from the keyboard inside another submenu (sav-menu) is placed too
        this.addEventListener('sav-toggle', (e) => { const i = e.detail?.item; if (i?.open && this.contains(i)) this.placeSub(i); });
        this.$('slot:not([name])').addEventListener('slotchange', () => this.sync());
        this._ctx = (e) => this.onContext(e);
        this._press = (e) => this.onPress(e);
        this._keys = (e) => this.onAreaKey(e);
        this._keep = (e) => this.onDown(e);
        this._docKey = (e) => this.onDocKey(e);
        // a press outside, a scroll, a resize or leaving the window closes it (a manual popover: the right click must not close it again)
        this._outside = (e) => { if (!this.inPanel(e)) this.hide(); };
        this._away = () => { if (!this.sheet) this.hide(); };
      }
      this.attach();
    }
    disconnectedCallback() { this.detach(); if (this.open) { this.hide(); this.afterHide(); } }
    changed(name) { if (name === 'for') { this._retried = false; this.attach(); } }
    /** True when the event happened in the open menu (its panel, or its action sheet on a phone). */
    inPanel(e) { const p = e.composedPath(); return p.includes(this.menu) || (!!this._sheet?.el && p.includes(this._sheet.el)); }
    /** The area whose right click opens the menu: set from script, or named by for, or the elements inside with slot="target". */
    get target() {
      if (this._target) return this._target;
      const id = this.getAttribute('for');
      return id ? this.getRootNode().getElementById?.(id) || document.getElementById(id) : this.querySelector(':scope > [slot="target"]');
    }
    set target(el) { this._target = el || null; this.attach(); }
    attach() {
      if (!this.isConnected) return;
      const el = this._target || (this.getAttribute('for') ? this.target : this);
      if (el === this._on) return;
      this.detach();
      if (!el) { // the element named by for may come later in the page: looked for once more
        if (this._retried) return;
        this._retried = true;
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => this.attach(), { once: true });
        else requestAnimationFrame(() => this.attach());
        return;
      }
      this._on = el;
      el.addEventListener('contextmenu', this._ctx);
      el.addEventListener('pointerdown', this._press);
      el.addEventListener('keydown', this._keys);
      el.addEventListener('mousedown', this._keep);
    }
    detach() {
      this._on?.removeEventListener('contextmenu', this._ctx);
      this._on?.removeEventListener('pointerdown', this._press);
      this._on?.removeEventListener('keydown', this._keys);
      this._on?.removeEventListener('mousedown', this._keep);
      this._on = null;
    }
    /** True when the focus is on an item of the menu (not on the area inside it with slot="target"). */
    ownsFocus() { const a = document.activeElement; return !!a && [...this.children].some((c) => c.slot !== 'target' && c.contains(a)); }
    /** True when the event started in a text field of the area: there the browser's menu stays. */
    inField(e) { const path = e.composedPath(), end = path.indexOf(this._on); return path.slice(0, end < 0 ? path.length : end).some((n) => n.matches?.(EDITABLE)); }
    /** The right click must not move the focus (the browser would give it to the area, or take it away): a text field elsewhere
        keeps it, with its caret and its selection, as with the menu of the system. */
    onDown(e) {
      const ctx = e.button === 2 || (e.button === 0 && e.ctrlKey && /Mac/i.test(navigator.platform));
      if (ctx && !this.disabled && !this.inField(e) && !this.inPanel(e)) e.preventDefault();
    }
    onContext(e) {
      if (e.__savContext) return; // a context menu inside this area already answered (or let the browser's menu show)
      if (this.inPanel(e)) { e.preventDefault(); return; }
      // something inside the area already answered the right click (a menu of its own, a canvas that uses it): nothing here
      if (e.defaultPrevented) return;
      if (this.disabled || this.inField(e)) return;
      e.__savContext = true;
      // the menu key and Shift F10 open it under the focused element instead of at the pointer
      const keyboard = e.pointerType === '' || e.mozInputSource === 6 || (!e.clientX && !e.clientY);
      // already opened by the long press or by the keys (onAreaKey): the browser's event that follows only keeps its menu away
      if (this.open && (keyboard || e.pointerType === 'touch')) { e.preventDefault(); return; }
      let x = e.clientX, y = e.clientY;
      if (keyboard) [x, y] = this.under();
      if (this.show(x, y, e.target, keyboard)) e.preventDefault();
    }
    /** Shift F10 and the menu key, also in browsers that send no contextmenu event for them (Safari). */
    onAreaKey(e) {
      if (!((e.key === 'F10' && e.shiftKey) || e.key === 'ContextMenu') || e.defaultPrevented) return;
      if (this.disabled || this.inField(e) || this.inPanel(e)) return;
      const [x, y] = this.under();
      if (this.show(x, y, e.target, true)) e.preventDefault();
    }
    /** Touch screens: a long press opens it (iPhone and iPad have no contextmenu event); moving the finger cancels it. */
    onPress(e) {
      if (e.pointerType !== 'touch' || !e.isPrimary || this.disabled || this.inField(e) || this.inPanel(e)) return;
      const on = this._on, x = e.clientX, y = e.clientY, target = e.target;
      const stop = () => { clearTimeout(t); on.removeEventListener('pointermove', move); on.removeEventListener('pointerup', stop); on.removeEventListener('pointercancel', stop); };
      const move = (m) => { if (Math.hypot(m.clientX - x, m.clientY - y) > 10) stop(); };
      const t = setTimeout(() => {
        stop();
        if (this.open || !this.show(x, y, target)) return;
        // lifting the finger must not also click what is under it (a link, a button)
        const eat = (c) => { c.preventDefault(); c.stopPropagation(); };
        on.addEventListener('click', eat, { capture: true, once: true });
        setTimeout(() => on.removeEventListener('click', eat, true), 800);
      }, 500);
      on.addEventListener('pointermove', move);
      on.addEventListener('pointerup', stop);
      on.addEventListener('pointercancel', stop);
    }
    /** The point under the focused element of the area (or under the area). */
    under() {
      const f = document.activeElement, area = this.target || this;
      const a = f && f !== document.body && (this._on?.contains(f) || area.contains?.(f)) ? f : area;
      const r = a.getBoundingClientRect();
      return [r.left + Math.min(16, r.width / 2), r.bottom];
    }
    /** Opens the menu at a point of the window (clientX, clientY), leaving the focus where it is; without a point it opens under
        the area and the focus moves into it, as from the keyboard. */
    show(x, y, target = null, focus = false) {
      if (this.disabled) return false;
      if (typeof x !== 'number' || typeof y !== 'number') { [x, y] = this.under(); focus = true; }
      if (!this.emit('sav-show', { target, x, y }, true)) return false;
      const again = this.open;
      if (again && this.sheet) return true; // the sheet covers the page: it stays as it is
      if (!again) this._back = document.activeElement;
      this.contextTarget = target;
      this._hovered = null;
      const label = this.getAttribute('label') || '';
      const items = this.$('.items');
      label ? items.setAttribute('aria-label', label) : items.removeAttribute('aria-label');
      // on a phone: a sav-action-sheet, its submenus open in place under their item
      const sheet = !again && MobileSheet.wanted(this);
      this.toggleAttribute('data-sheet', sheet);
      this.sync();
      this.querySelectorAll('sav-menu-item[open]').forEach((i) => (i.open = false));
      if (sheet) {
        if (!this.openSheet(label)) { this.removeAttribute('data-sheet'); this.sync(); return false; }
        this.setAttribute('open', '');
        this.items[0]?.focus({ preventScroll: true }); // like every action sheet: the first action takes the focus
        return true;
      }
      showPop(this.menu);
      this.setAttribute('open', '');
      this.placeAt(x, y);
      if (!again) {
        document.addEventListener('pointerdown', this._outside, true);
        addEventListener('scroll', this._away, true);
        addEventListener('resize', this._away);
        addEventListener('blur', this._away);
        document.addEventListener('keydown', this._docKey, true);
      }
      // from the keyboard the first item takes the focus; after a right click or a long press the focus stays where it was
      // (onDocKey still lets the arrows reach the menu)
      if (focus) this.items[0]?.focus({ preventScroll: true });
      else if (this.ownsFocus()) this._back?.focus?.({ preventScroll: true });
      return true;
    }
    /** Puts the top-left corner at the point, or another corner when there is no room on that side. */
    placeAt(x, y) {
      const el = this.menu, w = el.offsetWidth, h = el.offsetHeight, m = 8;
      const vw = document.documentElement.clientWidth, vh = window.innerHeight;
      const left = x + w > vw - m && x - w >= m, up = y + h > vh - m && y - h >= m;
      el.style.left = `${Math.round(Math.max(m, Math.min(left ? x - w : x, vw - w - m)))}px`;
      el.style.top = `${Math.round(Math.max(m, Math.min(up ? y - h : y, vh - h - m)))}px`;
      el.style.setProperty('--_ox', left ? 'right' : 'left');
      el.style.setProperty('--_oy', up ? 'bottom' : 'top');
    }
    /** A submenu flies out on the right, or on the left when there is no room; it moves up to stay on screen. */
    placeSub(item) {
      const sub = item.shadowRoot?.querySelector('.sub');
      if (!sub || this.sheet) return;
      const m = 8, vw = document.documentElement.clientWidth, vh = window.innerHeight;
      item.removeAttribute('data-flip');
      item.style.setProperty('--_sub-dy', '0px');
      let r = sub.getBoundingClientRect();
      if (r.right > vw - m) {
        const room = item.getBoundingClientRect().left;
        if (room - r.width >= m || room > vw - r.left) item.setAttribute('data-flip', '');
      }
      r = sub.getBoundingClientRect();
      if (r.bottom > vh - m) item.style.setProperty('--_sub-dy', `${Math.round(Math.max(m - r.top, vh - m - r.bottom))}px`);
    }
    hide() {
      if (this.sheet) { this._sheet.close(); return; } // the sheet gives the focus back itself
      this._restore = this.ownsFocus(); // the focus is given back only if the menu had taken it
      hidePop(this.menu);
      if (!supportsPopover) this.afterHide();
    }
    /** Opened by the pointer, the focus stays outside (a text field keeps its caret) but the keys still work: the arrows, Home,
        End and a letter move the focus into the menu, Enter chooses the item under the pointer, Escape closes it. */
    onDocKey(e) {
      if (this.ownsFocus() || e.ctrlKey || e.metaKey || e.altKey) return; // the focus is in the menu: onKey
      const items = this.items, n = items.length, cur = items.indexOf(this._hovered);
      const done = () => { e.preventDefault(); e.stopPropagation(); };
      let to = null;
      if (e.key === 'ArrowDown') to = items[(cur + 1) % n];
      else if (e.key === 'ArrowUp') to = items[cur < 0 ? n - 1 : (cur - 1 + n) % n];
      else if (e.key === 'Home') to = items[0];
      else if (e.key === 'End') to = items[n - 1];
      else if (e.key === 'Escape') { done(); this.hide(); return; }
      else if (e.key === 'Tab') { this.hide(); return; }
      else if (e.key === 'Enter' || e.key === ' ') { done(); const h = this._hovered; if (h?.isConnected && !h.hasAttribute('disabled') && this.contains(h)) h.click(); return; }
      else if (e.key.length === 1) { done(); const k = e.key.toLowerCase(); to = items.find((i) => i.textContent.trim().toLowerCase().startsWith(k)); }
      else return;
      if (!to) return;
      done();
      to.focus({ preventScroll: true }); // from here the menu has the focus, and gives it back when it closes
    }
    afterHide() {
      // a right click while it is open closes it and opens it again at once: then nothing is closed
      if (!this.open || (supportsPopover && this.menu.matches(':popover-open'))) return;
      this.removeAttribute('open');
      if (this.hasAttribute('data-sheet')) { this.removeAttribute('data-sheet'); this.sync(); }
      this.querySelectorAll('sav-menu-item[open]').forEach((i) => (i.open = false));
      clearTimeout(this._hoverT);
      document.removeEventListener('pointerdown', this._outside, true);
      removeEventListener('scroll', this._away, true);
      removeEventListener('resize', this._away);
      removeEventListener('blur', this._away);
      document.removeEventListener('keydown', this._docKey, true);
      // if the menu had the focus, it goes back where it was, unless the chosen action moved it somewhere else (a dialog)
      const a = document.activeElement;
      if (this._restore && this._back?.isConnected && (!a || a === document.body || this.ownsFocus())) this._back.focus?.({ preventScroll: true });
      this._back = null;
      this._restore = false;
      this.emit('sav-hide');
    }
    /** Submenus inside get the panel of the context menu; the items learn that their submenus fly out. */
    sync() {
      const subs = this.querySelectorAll(':scope > sav-menu-item sav-menu[slot="submenu"]');
      const sheet = this.hasAttribute('data-sheet');
      subs.forEach((m) => { m.setAttribute('data-nested', ''); m.toggleAttribute('data-flyout', !sheet); m.setAttribute('data-context', ''); m.toggleAttribute('data-sheet', sheet); });
      subs.forEach((m) => m.sync?.());
      this.querySelectorAll(':scope > sav-menu-item, :scope > sav-menu-item sav-menu-item').forEach((i) => i.sync?.());
      this.toggleAttribute('data-has-sub', subs.length > 0);
    }
    /** The items of the first level that can take the focus. */
    get items() { return [...this.children].filter((c) => c.localName === 'sav-menu-item' && !c.hasAttribute('disabled') && !c.hidden); }
    /** The items next to this one (same menu or submenu). */
    level(item) { const p = item.parentElement; return p ? [...p.children].filter((c) => c.localName === 'sav-menu-item') : []; }
    openSub(item) {
      for (const s of this.level(item)) if (s !== item) s.open = false;
      item.open = true;
      this.placeSub(item);
    }
    /** Like the menus of the system: the pointer highlights an item (and moves the focus, if the menu has it), and resting on an
        item opens its submenu (and closes the others). */
    hover(e) {
      if (e.pointerType === 'touch') return;
      const item = e.composedPath().find((n) => n.localName === 'sav-menu-item');
      if (!item || item === this._hovered) return;
      this._hovered = item;
      clearTimeout(this._hoverT);
      const off = item.hasAttribute('disabled');
      if (!off && this.ownsFocus()) item.focus({ preventScroll: true });
      this._hoverT = setTimeout(() => {
        for (const s of this.level(item)) if (s !== item && s.open) s.open = false;
        if (!off && item.hasSubmenu && !item.open) this.openSub(item);
      }, 160);
    }
    choose(item) {
      if (item.hasSubmenu) { if (!item.open) this.openSub(item); else if (this.sheet) item.open = false; return; } // in the sheet a tap folds it again
      const check = item.getAttribute('type') === 'checkbox';
      if (check) item.checked = !item.checked;
      const detail = { item, value: item.value, checked: check ? item.checked : undefined, target: this.contextTarget };
      // closed first, so an action that opens a dialog or moves the focus keeps it
      if (!this.hasAttribute('stay-open')) this.hide();
      this.emit('sav-select', detail);
      if (check) this.emit('change', { value: this.value });
    }
    onKey(e) {
      if (e.defaultPrevented) return; // a submenu (sav-menu) already moved or went back
      const it = e.target.closest?.('sav-menu-item');
      if (e.key === 'Tab') { if (this.sheet) return; e.preventDefault(); this.hide(); return; } // in the sheet Tab reaches its buttons
      if (e.key === 'Escape') { e.preventDefault(); if (it?.open) it.open = false; else this.hide(); return; }
      if (it && it.parentElement !== this) return; // inside a submenu: sav-menu handles the arrows
      if (it?.hasSubmenu && (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        this.openSub(it);
        it.firstSubItem()?.focus(); // at once: a frame may come late in a page in the background
        return;
      }
      super.onKey(e);
    }
  }
  props(SavContextMenu, { for: String });
  define('sav-context-menu', SavContextMenu);

  /* ================================================================== sav-info-tip */

  class SavInfoTip extends SavElement {
    static styles = [FLOAT, VARIANTS, `
      :host { display: inline-flex; vertical-align: middle; --width: 18rem; --_c: var(--sav-color-neutral); }
      :host([variant="primary"]) { --_c: var(--sav-color-primary); }
      .tr { display: inline-flex; align-items: center; gap: .3rem; margin: 0; padding: .15rem; border: 0; border-radius: var(--sav-radius-sm); background: none;
            color: var(--_c-text); font: inherit; font-size: inherit; font-weight: var(--sav-font-weight-semibold); line-height: 1; cursor: help; }
      .tr:hover, :host([open]) .tr { color: var(--sav-color-text); background: var(--sav-color-surface-2); }
      .tr svg { width: 1.05em; height: 1.05em; flex: none; }
      :host([size="sm"]) .tr svg { width: .95em; height: .95em; }
      .lab:empty { display: none; }
      .tip { width: max-content; max-width: min(var(--width), calc(100vw - 16px)); padding: .8rem .9rem; border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius);
             background: var(--sav-color-surface); color: var(--sav-color-text); box-shadow: var(--sav-shadow-lg); font-family: var(--sav-font); font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-normal);
             line-height: 1.5; text-align: left; overflow: visible; }
      ${panelLayer('.tip')}
      .tip:popover-open, .tip.open { animation: sav-tip calc(.14s * var(--sav-motion, 1)) var(--sav-easing); }
      .arr { position: absolute; width: 9px; height: 9px; background: var(--sav-color-surface); border: var(--sav-border-width) solid var(--sav-color-border); transform: rotate(45deg); }
      .tip[data-side="top"] .arr { bottom: -5.5px; left: calc(var(--_ax) - 4.5px); border-width: 0 1px 1px 0; }
      .tip[data-side="bottom"] .arr { top: -5.5px; left: calc(var(--_ax) - 4.5px); border-width: 1px 0 0 1px; }
      .tip[data-side="left"] .arr { right: -5.5px; top: calc(var(--_ay) - 4.5px); border-width: 1px 1px 0 0; }
      .tip[data-side="right"] .arr { left: -5.5px; top: calc(var(--_ay) - 4.5px); border-width: 0 0 1px 1px; }
      /* the arrow belongs to a straight bubble: with a leaning panel (Tilt) it goes away */
      .arr { display: var(--sav-panel-arrow, block); }
      .head { display: flex; align-items: flex-start; gap: .5rem; }
      .h { flex: 1; font-weight: var(--sav-font-weight-bold); margin-bottom: .2rem; }
      .h:empty { display: none; }
      .x { display: inline-flex; margin: -.3rem -.4rem 0 auto; padding: .25rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); cursor: pointer; }
      .x svg { width: .95rem; height: .95rem; }
      @keyframes sav-tip { from { opacity: 0; transform: scale(.97); } }
      /* sheet-on-mobile: on a phone the text opens in a sav-action-sheet (MobileSheet) */
      .m-sheet::part(body) { padding-bottom: calc(1.25rem + env(safe-area-inset-bottom)); }
    `];
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('info');
      this.shadowRoot.innerHTML = `<button class="tr" part="trigger" type="button" aria-expanded="false" aria-controls="${id}"><slot name="trigger"></slot><span class="lab"></span></button>
        <div class="tip float" part="body" id="${id}" role="dialog" ${supportsPopover ? 'popover="auto"' : ''}><div class="head"><div class="h" part="heading"></div><button class="x" type="button" aria-label="${esc(T(this, 'Close'))}">${svgIcon('x')}</button></div><div class="content"><slot></slot><span class="txt"></span></div><span class="arr" aria-hidden="true"></span></div>`;
      // inside a <label> a click must not toggle the control it belongs to
      this.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); });
      this.$('.tr').addEventListener('click', () => (Date.now() - (this._closedAt || 0) < 150 ? 0 : this.open ? this.hide() : this.show()));
      this.$('.x').addEventListener('click', () => this.hide());
      this.$('.tip').addEventListener('toggle', (e) => { if (e.newState === 'closed') this.afterHide(); });
      this._sheet = new MobileSheet(this, { onHide: () => this.afterHide(), returnFocus: () => this.$('.tr') });
      this.$('slot[name="trigger"]').addEventListener('slotchange', () => this.sync());
      this.sync();
    }
    changed() { this.sync(); }
    sync() {
      const tr = this.$('.tr'); if (!tr) return;
      const hasTrigger = this.hasSlot('trigger');
      const icon = this.getAttribute('icon') || 'help-circle';
      tr.querySelector('svg')?.remove();
      if (!hasTrigger) tr.insertAdjacentHTML('afterbegin', svgIcon(icon));
      if (!hasTrigger && !ICONS[icon]) Sav.loadIcon(icon).then(() => this.isConnected && (tr.querySelector('svg').outerHTML = svgIcon(icon)));
      this.$('.lab').textContent = this.getAttribute('label') || '';
      tr.setAttribute('aria-label', this.getAttribute('label') || this.getAttribute('heading') || T(this, 'More information'));
      this.$('.h').textContent = this.getAttribute('heading') || '';
      this.$('.txt').textContent = this.getAttribute('content') || '';
    }
    get open() { return this.hasAttribute('open'); }
    show() {
      if (this.open) return;
      const tip = this.$('.tip');
      // sheet-on-mobile: on a phone the text opens in a sav-action-sheet, titled by the heading (or the label)
      if (MobileSheet.wanted(this)) {
        const title = this.getAttribute('heading') || this.getAttribute('label') || T(this, 'More information');
        if (!this._sheet.open([this.$('.content')], { label: title, attrs: { 'no-cancel': true } })) return;
      } else {
        tiltWatch(tip); showPop(tip);
        place(tip, this.$('.tr'), this.getAttribute('placement') || 'top', 10);
        this._reflow ||= () => { if (!this.open || this._sheet.active) return; if (anchorGone(this.$('.tr'))) { this.hide(); return; } place(tip, this.$('.tr'), this.getAttribute('placement') || 'top', 10); };
        addEventListener('scroll', this._reflow, true);
        addEventListener('resize', this._reflow);
      }
      this.setAttribute('open', '');
      this.$('.tr').setAttribute('aria-expanded', 'true');
      this.emit('sav-show');
    }
    hide() { if (this._sheet.active) { this._sheet.close(); return; } hidePop(this.$('.tip')); if (!supportsPopover) this.afterHide(); }
    afterHide() {
      if (!this.open) return;
      this._closedAt = Date.now();
      this.removeAttribute('open');
      this.$('.tr').setAttribute('aria-expanded', 'false');
      removeEventListener('scroll', this._reflow, true);
      removeEventListener('resize', this._reflow);
      this.emit('sav-hide');
    }
  }
  props(SavInfoTip, { icon: String, label: String, heading: String, content: String, placement: String, variant: String, size: String });
  define('sav-info-tip', SavInfoTip);

  /* ================================================================== sav-container */

  class SavContainer extends SavElement {
    static styles = `
      :host { display: block; box-sizing: border-box; width: 100%; max-width: var(--max-width, 60rem); margin-inline: auto; padding-inline: var(--padding, 1rem); }
      :host([size="sm"]) { --max-width: 40rem; } :host([size="lg"]) { --max-width: 75rem; } :host([size="xl"]) { --max-width: 90rem; } :host([size="full"]) { --max-width: none; }
      :host([padding="none"]) { --padding: 0; } :host([padding="lg"]) { --padding: 2rem; }
      .c { position: relative; isolation: isolate; }
      /* surface and muted: the background is a layer that leans with the style (Tilt) while the content stays upright;
         like the card, the surface has a tinted plate behind it leaning the other way (--sav-card-back) */
      :host([appearance="surface"]) .c, :host([appearance="muted"]) .c { padding: var(--inner, 1.5rem); }
      :host([appearance="surface"]) .c::before, :host([appearance="muted"]) .c::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius-lg);
             transform: rotate(${PANEL_TILT}); transition: transform calc(.3s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([appearance="surface"]) .c::before { border: var(--sav-border-width) solid var(--sav-color-border); background: var(--sav-color-surface); background-image: var(--sav-sheen, none);
             box-shadow: var(--sav-container-shadow, var(--sav-shadow-sm)); -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none); }
      :host([appearance="muted"]) .c::before { background: var(--sav-color-surface-2); }
      :host([appearance="surface"]) .c::after { content: ""; display: var(--sav-card-back, none); position: absolute; inset: 0; z-index: -2; border-radius: var(--sav-radius-lg);
             background: color-mix(in oklab, var(--sav-color-primary) 14%, transparent); transform: rotate(calc(${PANEL_TILT} * -2.2)); }
    `;
    connectedCallback() { if (!this.shadowRoot.firstChild) { this.shadowRoot.innerHTML = '<div class="c" part="base"><slot></slot></div>'; tiltWatch(this.$('.c')); } }
  }
  props(SavContainer, { size: String, padding: String, appearance: String });
  define('sav-container', SavContainer);

  /* ================================================================== sav-label */

  /** A short caption that names a section or a category (an "eyebrow"): not removable like a tag, not a status like a badge. */
  class SavLabel extends SavElement {
    static styles = [VARIANTS, `
      :host { display: inline-flex; vertical-align: middle; --_lb: var(--_c); --_lf: var(--_on); --_lbd: transparent; }
      :host([appearance="soft"]) { --_lb: var(--_c-soft); --_lf: var(--_c-text); }
      :host([appearance="outline"]) { --_lb: transparent; --_lf: var(--_c-text); --_lbd: var(--_c-line); }
      :host([appearance="plain"]) { --_lb: transparent; --_lf: var(--_c-text); }
      .l { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: .35em; padding: .3em .7em; border-radius: var(--sav-radius-sm);
           color: var(--text-color, var(--_lf)); font-size: var(--sav-label-size, .72rem); font-weight: var(--sav-font-weight-bold); letter-spacing: .09em; text-transform: uppercase; line-height: 1.2; white-space: nowrap; }
      :host([appearance="plain"]) .l { padding-inline: 0; }
      :host([case="normal"]) .l { text-transform: none; letter-spacing: .01em; }
      .l::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_lb); background-image: var(--sav-sheen, none);
           border: var(--sav-border-width) solid var(--sav-ink-border, var(--_lbd)); box-shadow: var(--sav-badge-shadow, none); transform: rotate(calc(${TILT} * 1.6)); }
      :host([appearance="plain"]) .l::before { display: none; }
      ::slotted(sav-icon) { font-size: 1.1em; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${SOLID_EB}; }
      :host([appearance="soft"]) { --_eb: ${SOFT_EB}; }
      :host(:is([appearance="outline"], [appearance="plain"])) { --_eb: var(--sav-color-bg); }
      :host([auto-text]) .l { color: ${AUTO_TEXT}; }
    `];
    connectedCallback() { if (!this.shadowRoot.firstChild) { this.shadowRoot.innerHTML = '<span class="l" part="base"><slot name="prefix"></slot><slot></slot></span>'; tiltWatch(this.$('.l')); } }
  }
  props(SavLabel, { variant: String, appearance: String });
  define('sav-label', SavLabel);

  /* ================================================================== sav-chip / sav-chip-group */

  /** A selectable chip (filter, choice): pressed or not, optionally removable. In a sav-chip-group it becomes a single or multiple choice. */
  class SavChip extends SavElement {
    static styles = [VARIANTS, SIZES, `
      :host { display: inline-flex; vertical-align: middle; }
      button { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: .4em; height: calc(var(--_h) * .82); padding: 0 .85em; margin: 0; border: 0;
               border-radius: var(--sav-radius-pill); background: none; color: var(--text-color, var(--sav-color-text)); font: inherit; font-size: calc(var(--_fs) * .92); font-weight: var(--sav-font-weight-semibold); cursor: pointer;
               --_kb: var(--sav-color-surface); --_kbd: var(--sav-color-border-strong); }
      button::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_kb); background-image: var(--sav-sheen, none);
               border: var(--sav-border-width) solid var(--_kbd); box-shadow: var(--sav-copy-shadow, none); transform: rotate(${TILT}); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
      button:hover { --_kb: var(--sav-color-surface-2); }
      :host([selected]) button { color: var(--text-color, var(--_c-text)); --_kb: var(--_c-soft); --_kbd: var(--sav-ink-border, var(--_c)); }
      :host([selected]) button::before { transform: rotate(calc(${TILT} * -1)); }
      :host([disabled]) button { opacity: .5; cursor: not-allowed; }
      .ck { display: none; width: 1em; height: 1em; }
      :host([selected]) .ck { display: inline-flex; }
      :host([selected]) ::slotted([slot="prefix"]) { display: none; }
      .x { display: inline-flex; margin-right: -.35em; padding: .15em; border-radius: 50%; color: inherit; opacity: .7; }
      .x:hover { opacity: 1; background: var(--_c-soft); }
      .x svg, .ck svg { width: 1em; height: 1em; }
      :host(:not([removable])) .x { display: none; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: var(--sav-color-surface); }
      :host([selected]) { --_eb: color-mix(in oklab, var(--_c) 13%, var(--sav-color-surface)); }
      :host(:is([auto-text], [data-auto-text])) button { color: ${AUTO_TEXT}; }
    `];
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<button type="button" part="base"><span class="ck" aria-hidden="true">${svgIcon('check')}</span><slot name="prefix"></slot><span part="label"><slot></slot></span><span class="x" part="remove-button" role="button" aria-label="${esc(this.getAttribute('remove-label') || T(this, 'Remove'))}">${svgIcon('x')}</span></button>`;
      const b = this.$('button');
      tiltWatch(b);
      b.addEventListener('click', (e) => {
        if (this.disabled) return;
        if (e.composedPath().includes(this.$('.x'))) { if (this.emit('sav-remove', {}, true)) this.remove(); return; }
        const group = this.closest('sav-chip-group');
        if (group) group.pick(this); else this.toggle();
      });
      this.sync();
    }
    changed() { this.sync(); }
    sync() { const b = this.$('button'); if (!b) return; b.setAttribute('aria-pressed', String(this.selected)); b.disabled = this.disabled; }
    toggle(force) { const next = force === undefined ? !this.selected : !!force; if (next === this.selected) return; this.toggleAttribute('selected', next); this.emit('change', { selected: next }); }
  }
  props(SavChip, { value: String, selected: Boolean, disabled: Boolean, removable: Boolean, variant: String, size: String });
  define('sav-chip', SavChip);

  class SavChipGroup extends SavElement {
    static styles = `:host { display: block; } .g { display: flex; flex-wrap: wrap; gap: var(--gap, .45rem); } .lbl { display: block; margin-bottom: .45rem; font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-semibold); } .lbl:empty { display: none; }`;
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('chips');
      this.shadowRoot.innerHTML = `<span class="lbl" id="${id}"></span><div class="g" part="base" role="group" aria-labelledby="${id}"><slot></slot></div>`;
      this.$('.lbl').textContent = this.getAttribute('label') || '';
      this.$('slot').addEventListener('slotchange', () => passAutoText(this, this.chips));
      passAutoText(this, this.chips);
      const v = this.getAttribute('value');
      if (v !== null) this.value = v;
    }
    changed(name) { if (name === 'auto-text') passAutoText(this, this.chips); }
    get chips() { return [...this.querySelectorAll('sav-chip')]; }
    /** Selected values: a list with multiple, otherwise one value (or ''). */
    /* the attributes are read, not the properties: when the group starts, its chips may not be set up yet */
    static chipValue(c) { return c.getAttribute('value') ?? c.textContent.trim(); }
    get value() { const sel = this.chips.filter((c) => c.hasAttribute('selected')).map(SavChipGroup.chipValue); return this.multiple ? sel : sel[0] || ''; }
    set value(v) { const want = new Set(Array.isArray(v) ? v : String(v).split(',').map((x) => x.trim()).filter(Boolean)); this.chips.forEach((c) => c.toggleAttribute('selected', want.has(SavChipGroup.chipValue(c)))); }
    pick(chip) {
      if (this.multiple) chip.toggleAttribute('selected');
      else { const on = !chip.selected || !this.required; this.chips.forEach((c) => c.toggleAttribute('selected', c === chip && on)); }
      this.emit('change', { value: this.value });
    }
  }
  props(SavChipGroup, { multiple: Boolean, required: Boolean, label: String, autoText: Boolean });
  define('sav-chip-group', SavChipGroup);

  /* ================================================================== sav-heading */

  /** A real heading (h1–h6) with the look of the style: an optional marker before it (a leaning tile in Tilt) and an optional caption above. */
  class SavHeading extends SavElement {
    static styles = `
      :host { display: block; margin: var(--margin, 0 0 .6em); }
      .h { margin: 0; display: flex; align-items: baseline; gap: .45em; color: var(--sav-color-text); font-family: var(--sav-heading-font, var(--sav-font)); font-weight: var(--sav-font-weight-bold); line-height: 1.15; letter-spacing: -.02em; }
      .s1 { font-size: clamp(2rem, 4.5vw, 3rem); } .s2 { font-size: 1.75rem; } .s3 { font-size: 1.35rem; } .s4 { font-size: 1.12rem; } .s5 { font-size: 1rem; } .s6 { font-size: .9rem; text-transform: uppercase; letter-spacing: .06em; }
      .mk { flex: none; width: .42em; height: .42em; align-self: center; border-radius: var(--sav-knob-radius, 2px); background: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); box-shadow: ${INK('1.5px')}; transform: rotate(var(--sav-knob-tilt, 0deg)); }
      :host(:not([marker])) .mk { display: none; }
      .eb { display: block; margin-bottom: .5em; }
      .eb:empty, :host(:not([eyebrow])) .eb { display: none; }
      .sub { display: block; margin-top: .45em; color: var(--sav-color-text-muted); font-size: var(--sav-font-size-md); font-weight: 400; letter-spacing: 0; line-height: 1.5; }
      .sub:empty { display: none; }
    `;
    static get observedAttributes() { return ['level', 'size', 'eyebrow', 'subtitle']; }
    connectedCallback() { this.render(); }
    changed() { this.render(); }
    render() {
      const lvl = Math.min(6, Math.max(1, Number(this.getAttribute('level')) || 2));
      const size = Math.min(6, Math.max(1, Number(this.getAttribute('size')) || lvl));
      this.shadowRoot.innerHTML = `<span class="eb" part="eyebrow"></span><h${lvl} class="h s${size}" part="base"><span class="mk" aria-hidden="true"></span><span><slot></slot></span></h${lvl}><span class="sub" part="subtitle"></span>`;
      const eb = this.$('.eb');
      if (this.getAttribute('eyebrow')) { eb.innerHTML = '<sav-label></sav-label>'; eb.firstChild.textContent = this.getAttribute('eyebrow'); }
      this.$('.sub').textContent = this.getAttribute('subtitle') || '';
    }
  }
  props(SavHeading, { marker: Boolean });
  define('sav-heading', SavHeading);

  /* ================================================================== sav-grid */

  /** A responsive grid: a fixed number of columns, or as many as fit with a minimum width. */
  class SavGrid extends SavElement {
    static styles = `
      :host { display: grid; gap: var(--gap, 1rem); grid-template-columns: repeat(var(--_cols, auto-fill), minmax(min(var(--min, 14rem), 100%), 1fr)); }
      :host([columns]) { grid-template-columns: repeat(var(--_cols), minmax(0, 1fr)); }
      :host([align="center"]) { align-items: center; } :host([align="start"]) { align-items: start; } :host([align="end"]) { align-items: end; }
      @media (max-width: 640px) { :host([columns]:not([keep])) { grid-template-columns: repeat(min(var(--_cols), var(--mobile-columns, 1)), minmax(0, 1fr)); } }
    `;
    static get observedAttributes() { return ['columns', 'min', 'gap']; }
    connectedCallback() { if (!this.shadowRoot.firstChild) this.shadowRoot.innerHTML = '<slot></slot>'; this.sync(); }
    changed() { this.sync(); }
    sync() {
      const c = this.getAttribute('columns'); c ? this.style.setProperty('--_cols', c) : this.style.removeProperty('--_cols');
      const m = this.getAttribute('min'); m ? this.style.setProperty('--min', m) : this.style.removeProperty('--min');
      const g = this.getAttribute('gap'); g ? this.style.setProperty('--gap', g) : this.style.removeProperty('--gap');
    }
  }
  define('sav-grid', SavGrid);

  /* ================================================================== sav-table */

  /** Styles a normal <table> placed inside: borders and stripes from the style, optional sorting by clicking a header. */
  class SavTable extends SavElement {
    static styles = `
      :host { display: block; }
      .w { overflow-x: auto; border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius); background: var(--sav-color-surface);
           background-image: var(--sav-sheen, none); box-shadow: var(--sav-shadow-sm); -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none); }
      :host([appearance="plain"]) .w { border: 0; border-radius: 0; background: none; box-shadow: none; }
    `;
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = '<div class="w" part="base"><slot></slot></div>';
      injectTableCss();
      // the frame is a stop of the Tab key only while the table is wider than it (so the keyboard can scroll it); otherwise it is just a frame
      this._ro = new ResizeObserver(() => this.scrollable());
      this._ro.observe(this.$('.w'));
      this.$('slot').addEventListener('slotchange', () => this.setup());
      this.setup();
    }
    get table() { return this.querySelector('table'); }
    scrollable() {
      const w = this.$('.w'), t = this.table;
      if (w.scrollWidth > w.clientWidth + 1) {
        w.tabIndex = 0; w.setAttribute('role', 'region');
        w.setAttribute('aria-label', this.getAttribute('label') || t?.caption?.textContent.trim() || T(this, 'Table'));
      } else if (w.hasAttribute('tabindex')) { w.removeAttribute('tabindex'); w.removeAttribute('role'); w.removeAttribute('aria-label'); }
    }
    setup() {
      const t = this.table; if (!t) return;
      if (!this._seen) { this._seen = t; this._ro.observe(t); } else if (this._seen !== t) { this._ro.unobserve(this._seen); this._seen = t; this._ro.observe(t); }
      t.classList.add('sav-table-t');
      if (!this.hasAttribute('sortable')) return;
      t.querySelectorAll('thead th').forEach((th, i) => {
        if (th.dataset.savSort || th.hasAttribute('data-no-sort')) return;
        th.dataset.savSort = '1';
        const txt = th.innerHTML;
        th.innerHTML = `<button type="button" class="sav-th-sort">${txt}<span class="sav-th-ar" aria-hidden="true"></span></button>`;
        th.setAttribute('aria-sort', 'none');
        th.querySelector('button').addEventListener('click', () => this.sort(i));
      });
    }
    /** Sorts the body by column i (numbers as numbers); a second click reverses. */
    sort(i) {
      const t = this.table; const th = t.querySelectorAll('thead th')[i];
      const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
      t.querySelectorAll('thead th').forEach((h) => h.setAttribute('aria-sort', 'none'));
      th.setAttribute('aria-sort', dir);
      const body = t.tBodies[0]; if (!body) return;
      const val = (r) => { const c = r.cells[i]; const v = (c?.dataset.value ?? c?.textContent ?? '').trim(); const n = Number(v.replace(/[^\d.-]/g, '')); return v !== '' && /\d/.test(v) && !Number.isNaN(n) ? n : v.toLowerCase(); };
      const rows = [...body.rows].sort((a, b) => { const x = val(a), y = val(b); return (x > y ? 1 : x < y ? -1 : 0) * (dir === 'ascending' ? 1 : -1); });
      rows.forEach((r) => body.append(r));
      this.emit('sav-sort', { column: i, direction: dir });
    }
  }
  props(SavTable, { striped: Boolean, hover: Boolean, compact: Boolean, sortable: Boolean });
  /** The table itself lives in the page (light DOM): its rules go in one shared stylesheet. */
  let tableCssDone = false;
  function injectTableCss() {
    if (tableCssDone) return; tableCssDone = true;
    const css = `
      sav-table table.sav-table-t { width: 100%; border-collapse: collapse; font-size: var(--sav-font-size-md); color: var(--sav-color-text); }
      sav-table .sav-table-t th, sav-table .sav-table-t td { padding: .7rem .9rem; text-align: left; border-bottom: var(--sav-border-width) solid var(--sav-color-border); vertical-align: middle; }
      sav-table[compact] .sav-table-t th, sav-table[compact] .sav-table-t td { padding: .4rem .65rem; }
      sav-table .sav-table-t thead th { font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-bold); color: var(--sav-color-text-muted); background: color-mix(in oklab, var(--sav-color-surface-2) 70%, transparent); white-space: nowrap; }
      sav-table .sav-table-t tbody tr:last-child td { border-bottom: 0; }
      sav-table[striped] .sav-table-t tbody tr:nth-child(even) { background: color-mix(in oklab, var(--sav-color-surface-2) 60%, transparent); }
      sav-table[hover] .sav-table-t tbody tr:hover { background: color-mix(in oklab, var(--sav-color-primary) 8%, transparent); }
      sav-table .sav-table-t td.num, sav-table .sav-table-t th.num { text-align: right; font-variant-numeric: tabular-nums; }
      sav-table .sav-th-sort { all: unset; display: inline-flex; align-items: center; gap: .35rem; cursor: pointer; }
      sav-table .sav-th-sort:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 2px; }
      sav-table .sav-th-ar { width: .5em; height: .5em; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor; opacity: .35; transform: rotate(45deg); }
      sav-table th[aria-sort="ascending"] .sav-th-ar { opacity: 1; transform: rotate(-135deg) translate(-2px, -2px); }
      sav-table th[aria-sort="descending"] .sav-th-ar { opacity: 1; }`;
    const s = document.createElement('style'); s.dataset.sav = 'table'; s.textContent = css; document.head.append(s);
  }
  define('sav-table', SavTable);

  /* ================================================================== sav-image */

  /** An image with a fixed ratio, the corners of the style (a leaning plate behind it in Tilt), lazy loading, a caption and an optional zoom. */
  class SavImage extends SavElement {
    static styles = `
      :host { display: block; position: relative; width: 100%; min-width: 0; }
      figure { margin: 0; display: grid; gap: .5rem; }
      .f { position: relative; isolation: isolate; }
      .f::before { content: ""; display: var(--sav-card-back, none); position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius-lg); background: color-mix(in oklab, var(--sav-color-primary) 16%, transparent); transform: rotate(calc(${TILT} * -2.2)); }
      .fr { overflow: hidden; border-radius: var(--sav-radius-lg); aspect-ratio: var(--ratio, auto); background: var(--sav-color-surface-2); box-shadow: var(--sav-shadow-sm); }
      img { display: block; width: 100%; height: 100%; object-fit: var(--fit, cover); transition: transform calc(.4s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([zoom]) .fr { cursor: zoom-in; }
      :host([zoom]) .fr:hover img { transform: scale(1.04); }
      figcaption { font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); }
      figcaption:empty { display: none; }
      dialog { padding: 0; border: 0; background: none; max-width: 94vw; max-height: 92vh; }
      dialog::backdrop { background: rgb(0 0 0 / .8); }
      /* the enlarged image sets the size of the dialog (not the other way round, or both collapse to 0) */
      dialog img { display: block; width: min(94vw, 1200px, calc(92vh * var(--_zr, 1.5))); height: auto; max-height: 92vh; object-fit: contain; border-radius: var(--sav-radius); cursor: zoom-out; }
    `;
    static get observedAttributes() { return ['src', 'alt', 'ratio', 'fit', 'caption', 'srcset', 'sizes']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = `<figure part="base"><div class="f"><div class="fr" part="frame"><img part="image" loading="lazy" decoding="async"></div></div><figcaption part="caption"><slot name="caption"></slot><span class="cap"></span></figcaption></figure><dialog part="zoom"><img alt=""></dialog>`;
        this.$('.fr').addEventListener('click', () => this.openZoom());
        this.$('.fr').addEventListener('keydown', (e) => { if (this.zoom && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this.openZoom(); } });
        this.$('dialog').addEventListener('click', () => this.$('dialog').close());
        tiltWatch(this.$('.fr'), this.$('.f'));
      }
      this.sync();
    }
    /** Opens the image large (zoom attribute); the ratio of the picture sizes the window. */
    openZoom() {
      if (!this.zoom) return;
      const d = this.$('dialog'), big = d.querySelector('img'), small = this.$('.fr img');
      if (small.naturalWidth) d.style.setProperty('--_zr', String(small.naturalWidth / small.naturalHeight));
      big.alt = small.alt; big.src = this.getAttribute('zoom-src') || this.getAttribute('src');
      d.showModal(); this.emit('sav-zoom');
    }
    changed() { this.sync(); }
    sync() {
      const img = this.$('.fr img'); if (!img) return;
      for (const a of ['src', 'srcset', 'sizes']) { const v = this.getAttribute(a); v ? img.setAttribute(a, v) : img.removeAttribute(a); }
      img.alt = this.getAttribute('alt') ?? '';
      if (this.hasAttribute('eager')) img.loading = 'eager';
      const r = this.getAttribute('ratio'); r ? this.style.setProperty('--ratio', r.replace(':', ' / ')) : this.style.removeProperty('--ratio');
      const f = this.getAttribute('fit'); f ? this.style.setProperty('--fit', f) : this.style.removeProperty('--fit');
      this.$('.cap').textContent = this.getAttribute('caption') || '';
      this.$('.fr').setAttribute('role', this.zoom ? 'button' : 'presentation');
      if (this.zoom) { this.$('.fr').tabIndex = 0; this.$('.fr').setAttribute('aria-label', T(this, 'Enlarge {name}', { name: img.alt || T(this, 'image') })); }
    }
  }
  props(SavImage, { zoom: Boolean });
  define('sav-image', SavImage);

  /* ================================================================== sav-list / sav-list-item */

  class SavList extends SavElement {
    static styles = `
      :host { display: block; }
      .l { display: grid; margin: 0; padding: 0; list-style: none; }
      :host([appearance="card"]) .l { border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius); background: var(--sav-color-surface); background-image: var(--sav-sheen, none); box-shadow: var(--sav-shadow-sm); overflow: hidden; }
      ::slotted(sav-list-item:not(:last-child)) { border-bottom: var(--sav-border-width) solid var(--sav-color-border); }
      :host([appearance="plain"]) ::slotted(sav-list-item) { border-bottom: 0 !important; }
    `;
    connectedCallback() { if (!this.shadowRoot.firstChild) { this.shadowRoot.innerHTML = '<div class="l" part="base" role="list"><slot></slot></div>'; } }
  }
  define('sav-list', SavList);

  /** A row of a list: something at the start (icon, avatar), a title with an optional description, something at the end. With href it becomes a link. */
  class SavListItem extends SavElement {
    static styles = `
      :host { display: block; }
      .i { position: relative; isolation: isolate; display: flex; align-items: center; gap: .85rem; padding: .75rem 1rem; color: var(--sav-color-text); text-decoration: none; font: inherit; width: 100%; box-sizing: border-box; border: 0; background: none; text-align: left; }
      a.i, button.i { cursor: pointer; }
      a.i::before, button.i::before { content: ""; position: absolute; inset: 2px 4px; z-index: -1; border-radius: var(--sav-radius-sm); background: var(--sav-color-surface-2); opacity: 0; transform: rotate(${TILT}); transition: opacity calc(var(--sav-duration) * var(--sav-motion, 1)); }
      a.i:hover::before, button.i:hover::before { opacity: 1; }
      .t { flex: 1; min-width: 0; display: grid; gap: .15rem; }
      .tt { font-weight: var(--sav-font-weight-semibold); }
      .d { font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); }
      .d:empty { display: none; }
      ::slotted([slot="prefix"]) { flex: none; color: var(--sav-color-text-muted); }
      ::slotted([slot="suffix"]) { flex: none; }
      .ch { width: 1rem; height: 1rem; color: var(--sav-color-text-muted); flex: none; }
      :host(:not([href]):not([button])) .ch { display: none; }
    `;
    static get observedAttributes() { return ['href', 'description', 'button']; }
    connectedCallback() { this.setAttribute('role', 'listitem'); this.render(); }
    changed() { this.render(); }
    render() {
      const href = this.getAttribute('href');
      const tag = href ? 'a' : this.hasAttribute('button') ? 'button' : 'div';
      this.shadowRoot.innerHTML = `<${tag} class="i" part="base" ${href ? `href="${esc(href)}"` : ''} ${tag === 'button' ? 'type="button"' : ''}><slot name="prefix"></slot><span class="t"><span class="tt" part="title"><slot></slot></span><span class="d" part="description"></span></span><slot name="suffix"></slot>${svgIcon('chevron-right', 'ch')}</${tag}>`;
      this.$('.d').textContent = this.getAttribute('description') || '';
      const i = this.$('.i'); if (tag !== 'div') tiltWatch(i);
    }
  }
  define('sav-list-item', SavListItem);

  /* ================================================================== sav-otp */

  const OTP_KINDS = { numeric: /^[0-9]$/, alpha: /^[a-z]$/i, alphanumeric: /^[a-z0-9]$/i, any: /^\S$/ };
  /** A one-time code split into boxes: numbers only, letters only, letters and numbers, or any character; any length. */
  class SavOtp extends SavFormControl {
    static styles = [FIELD, SIZES, `
      /* the cells keep their size while they fit, then all shrink together (never onto a second line) */
      .cells { display: flex; align-items: center; gap: var(--gap, clamp(.25rem, 1.6%, .5rem)); }
      .cell { position: relative; isolation: isolate; flex: 0 1 calc(var(--_h) * 1.05); min-width: calc(var(--_fs) * 1.35); height: calc(var(--_h) * 1.2); }
      .cell::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: min(var(--sav-radius), 30%); background: var(--sav-color-input-bg); background-image: var(--sav-field-sheen, var(--sav-sheen, none));
        border: var(--sav-border-width) solid var(--sav-color-border-strong); box-shadow: var(--sav-field-shadow, var(--sav-control-shadow, inset 0 1px 2px rgb(20 24 40 / .05))); transform: rotate(${TILT});
        -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none);
        transition: border-color calc(var(--sav-duration) * var(--sav-motion, 1)), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
      .cell:focus-within::before { transform: none; background-color: var(--sav-field-bg-focus, var(--sav-color-input-bg)); border-color: var(--sav-field-focus-border, var(--sav-color-primary));
        box-shadow: var(--sav-field-focus-shadow, 0 0 0 3px color-mix(in oklab, var(--sav-color-primary) 22%, transparent)), var(--sav-field-shadow, var(--sav-control-shadow, 0 0 transparent)); }
      .cell.on::before { border-color: color-mix(in oklab, var(--sav-color-primary) 55%, var(--sav-color-border-strong)); }
      :host([data-user-invalid]) .cell::before { border-color: var(--sav-color-danger); }
      .cell input { width: 100%; min-width: 0; height: 100%; padding: 0; margin: 0; border: 0; outline: 0; background: none; text-align: center; color: var(--sav-color-text);
        font: inherit; font-size: calc(var(--_fs) * 1.35); font-weight: var(--sav-font-weight-bold); font-variant-numeric: tabular-nums; text-transform: var(--_case, none); caret-color: var(--sav-color-primary); }
      .sep { color: var(--sav-color-text-muted); font-weight: var(--sav-font-weight-bold); }
      :host([disabled]) .cells { opacity: .55; }
    `];
    static get observedAttributes() { return [...FC, 'label', 'help', 'length', 'type', 'mask', 'separator', 'value']; }
    get length() { return Math.max(1, Math.min(12, Number(this.getAttribute('length')) || 6)); }
    get kind() { const k = this.getAttribute('type'); return OTP_KINDS[k] ? k : 'numeric'; }
    get value() { return this.$$('.cell input').map((i) => i.value).join(''); }
    set value(v) { this.fill(String(v ?? ''), 0); this.onValue(false); }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('otp');
      this.shadowRoot.innerHTML = `<div class="w" part="form-control"><span class="lbl" part="label" id="${id}-l"><slot name="label"></slot><span class="lbl-text"></span></span>
        <div class="cells" part="base" role="group" aria-labelledby="${id}-l"></div><div class="help" part="help-text"><slot name="help"></slot><span class="help-text"></span></div></div>`;
      this._default = this.getAttribute('value') || '';
      this.build();
    }
    changed(name) { if (['length', 'type', 'mask', 'separator'].includes(name)) this.build(); else if (name === 'value') this.value = this.getAttribute('value') || ''; else this.build(true); }
    build(keepOnly) {
      const box = this.$('.cells'); if (!box) return;
      this.syncLabels(this.$('.w'));
      if (keepOnly) { this.$$('.cell input').forEach((i) => (i.disabled = this.isDisabled)); return; }
      const old = this.value || this._default;
      const n = this.length, sep = Number(this.getAttribute('separator')) || 0, k = this.kind;
      this.style.setProperty('--_case', k === 'numeric' ? 'none' : 'uppercase');
      let html = '';
      for (let i = 0; i < n; i++) {
        if (sep && i && i % sep === 0) html += '<span class="sep" aria-hidden="true">–</span>';
        html += `<span class="cell" part="cell"><input part="input" type="${this.hasAttribute('mask') ? 'password' : 'text'}" maxlength="1" inputmode="${k === 'numeric' ? 'numeric' : 'text'}"
          ${i === 0 ? 'autocomplete="one-time-code"' : 'autocomplete="off"'} aria-label="${esc(T(this, 'Character {i} of {n}', { i: i + 1, n }))}" ${this.isDisabled ? 'disabled' : ''}></span>`;
      }
      box.innerHTML = html;
      this.$$('.cell input').forEach((inp, i) => {
        tiltWatch(inp.parentElement);
        inp.addEventListener('input', () => {
          const v = inp.value; inp.value = '';
          this.fill(v, i);
        });
        inp.addEventListener('keydown', (e) => this.key(e, i));
        inp.addEventListener('paste', (e) => { e.preventDefault(); this.fill((e.clipboardData || window.clipboardData).getData('text'), i); });
        inp.addEventListener('focus', () => inp.select());
      });
      this.fill(old, 0, true);
      this.onValue(false);
    }
    /** Writes text into the boxes from box i, keeping only allowed characters, then moves the focus on. */
    fill(text, i, silent) {
      const cells = this.$$('.cell input'); const ok = OTP_KINDS[this.kind];
      const chars = [...String(text)].filter((c) => ok.test(c)).map((c) => (this.kind === 'numeric' ? c : c.toUpperCase()));
      if (!chars.length && !silent) { cells[i] && (cells[i].value = ''); this.onValue(true); return; }
      let j = i;
      for (const c of chars) { if (j >= cells.length) break; cells[j].value = c; j++; }
      if (!silent) { (cells[Math.min(j, cells.length - 1)] || cells[i]).focus(); this.onValue(true); }
    }
    key(e, i) {
      const cells = this.$$('.cell input');
      if (e.key === 'Backspace' && !cells[i].value && i > 0) { e.preventDefault(); cells[i - 1].value = ''; cells[i - 1].focus(); this.onValue(true); }
      else if (e.key === 'ArrowLeft' && i > 0) { e.preventDefault(); cells[i - 1].focus(); }
      else if (e.key === 'ArrowRight' && i < cells.length - 1) { e.preventDefault(); cells[i + 1].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); cells[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); cells[cells.length - 1].focus(); }
    }
    onValue(fire) {
      const v = this.value, full = v.length === this.length;
      this.$$('.cell').forEach((c) => c.classList.toggle('on', !!c.querySelector('input').value));
      this.internals.setFormValue(v);
      if (this.required && !full) this.internals.setValidity({ valueMissing: true }, this.getAttribute('error-label') || T(this, 'Enter all {n} characters.', { n: this.length }), this.$('.cell input') || undefined);
      else this.internals.setValidity({});
      if (!fire) return;
      this.emit('input', { value: v });
      if (full && v !== this._last) { this._last = v; this.markTouched(); this.emit('change', { value: v }); this.emit('sav-complete', { value: v }); }
      if (!full) this._last = '';
    }
    formResetCallback() { this.value = this._default; }
    focus() { (this.$$('.cell input').find((i) => !i.value) || this.$('.cell input'))?.focus(); }
  }
  define('sav-otp', SavOtp);

  /* ================================================================== sav-password */

  /** A password field that measures how strong the password is, with rules you choose (length, upper and lower case, digits, symbols). */
  class SavPassword extends SavFormControl {
    static styles = [`
      :host { display: block; }
      .meter { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: .55rem; }
      .seg { height: 5px; border-radius: var(--sav-radius-pill); background: var(--sav-color-surface-2); box-shadow: inset 0 0 0 1px var(--sav-color-border); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)); transform: skewX(calc(var(--sav-knob-tilt, 0deg) * -1)); }
      .seg.on { box-shadow: none; background: var(--_sc); }
      .row { display: flex; justify-content: space-between; gap: .5rem; margin-top: .35rem; font-size: var(--sav-font-size-sm); }
      .word { font-weight: var(--sav-font-weight-semibold); color: color-mix(in oklab, var(--_sc, var(--sav-color-text-muted)) 70%, var(--sav-color-text)); }
      .rules { display: grid; gap: .25rem; margin: .55rem 0 0; padding: 0; list-style: none; font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); }
      .rules li { display: flex; align-items: center; gap: .4rem; }
      .rules svg { width: 1em; height: 1em; flex: none; }
      .rules li.ok { color: color-mix(in oklab, var(--sav-color-success) 70%, var(--sav-color-text)); }
      .rules li:not(.ok) .ck, .rules li.ok .no { display: none; }
      :host(:not([rules])) .rules, :host([no-meter]) .meter, :host([no-meter]) .row { display: none; }
    `];
    static get observedAttributes() { return [...FC, 'label', 'help', 'placeholder', 'min-length', 'min-uppercase', 'min-lowercase', 'min-digits', 'min-symbols', 'min-strength', 'autocomplete', 'size']; }
    get value() { return this.$('sav-input')?.value ?? ''; }
    set value(v) { const i = this.$('sav-input'); if (i) { i.value = v; this.onValue(false); } }
    /** The rules from the attributes: [key, how many, text]. */
    get rules() {
      const n = (a, d) => { const v = this.getAttribute(a); return v === null ? d : Number(v) || 0; };
      return [['length', n('min-length', 8), (x) => T(this, 'At least {x} characters', { x })], ['upper', n('min-uppercase', 1), (x) => T(this, x > 1 ? '{x} upper-case letters' : '{x} upper-case letter', { x })],
        ['lower', n('min-lowercase', 1), (x) => T(this, x > 1 ? '{x} lower-case letters' : '{x} lower-case letter', { x })], ['digit', n('min-digits', 1), (x) => T(this, x > 1 ? '{x} numbers' : '{x} number', { x })],
        ['symbol', n('min-symbols', 0), (x) => T(this, x > 1 ? '{x} symbols (like ! ? # @)' : '{x} symbol (like ! ? # @)', { x })]].filter((r) => r[1] > 0);
    }
    /** Score 0–4 and which rules pass. */
    measure(pw) {
      const count = { length: pw.length, upper: (pw.match(/\p{Lu}/gu) || []).length, lower: (pw.match(/\p{Ll}/gu) || []).length, digit: (pw.match(/\p{Nd}/gu) || []).length, symbol: (pw.match(/[^\p{L}\p{Nd}\s]/gu) || []).length };
      const passed = this.rules.map(([k, min]) => count[k] >= min);
      const share = passed.length ? passed.filter(Boolean).length / passed.length : 1;
      let score = !pw ? 0 : Math.ceil(share * 3);
      if (score === 3 && pw.length >= Math.max(12, (this.rules.find((r) => r[0] === 'length')?.[1] || 8) + 4)) score = 4;
      if (/^(.)\1+$/.test(pw) || /^(?:password|123456|qwerty)/i.test(pw)) score = Math.min(score, 1);
      return { score, passed };
    }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('pw');
      this.shadowRoot.innerHTML = `<sav-input part="input" type="password" password-toggle autocomplete="${esc(this.getAttribute('autocomplete') || 'new-password')}" aria-describedby="${id}"></sav-input>
        <div class="meter" part="meter" aria-hidden="true"><span class="seg"></span><span class="seg"></span><span class="seg"></span><span class="seg"></span></div>
        <div class="row" part="strength"><span class="word" id="${id}" aria-live="polite"></span></div>
        <ul class="rules" part="rules"></ul>`;
      const inp = this.$('sav-input');
      for (const a of ['label', 'help', 'placeholder', 'size', 'required', 'disabled']) if (this.hasAttribute(a)) inp.setAttribute(a, this.getAttribute(a));
      inp.addEventListener('input', () => this.onValue(true));
      inp.addEventListener('change', () => { this.markTouched(); this.emit('change', { value: this.value, score: this._score }); });
      this.onValue(false);
    }
    changed(name) {
      const inp = this.$('sav-input'); if (!inp) return;
      if (['label', 'help', 'placeholder', 'size', 'required', 'disabled'].includes(name)) { this.hasAttribute(name) ? inp.setAttribute(name, this.getAttribute(name)) : inp.removeAttribute(name); }
      this.onValue(false);
    }
    onValue(fire) {
      const pw = this.value, { score, passed } = this.measure(pw);
      this._score = score;
      const words = (this.getAttribute('labels') || T(this, 'Too weak,Weak,Fair,Good,Strong')).split(',');
      const colors = ['var(--sav-color-danger)', 'var(--sav-color-danger)', 'var(--sav-color-warning)', 'oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h)', 'var(--sav-color-success)'];
      this.style.setProperty('--_sc', colors[score]);
      this.$$('.seg').forEach((s, i) => s.classList.toggle('on', pw && i < Math.max(1, score)));
      this.$('.word').textContent = pw ? T(this, 'Strength: {word}', { word: words[score] }) : '';
      this.$('.rules').innerHTML = this.rules.map(([, min, text], i) => `<li class="${passed[i] ? 'ok' : ''}">${svgIcon('check', 'ck')}${svgIcon('x', 'no')}<span>${esc(text(min))}<span class="sr">${passed[i] ? ' — ' + esc(T(this, 'done')) : ''}</span></span></li>`).join('');
      this.internals.setFormValue(pw);
      const need = Number(this.getAttribute('min-strength')) || 0;
      if (this.required && !pw) this.internals.setValidity({ valueMissing: true }, T(this, 'Enter a password.'), this.$('sav-input'));
      else if (pw && need && score < need) this.internals.setValidity({ customError: true }, this.getAttribute('error-label') || T(this, 'Choose a stronger password.'), this.$('sav-input'));
      else this.internals.setValidity({});
      if (fire) this.emit('input', { value: pw, score });
    }
    formResetCallback() { this.value = ''; }
    focus() { this.$('sav-input')?.focus(); }
  }
  define('sav-password', SavPassword);

  /* ================================================================== sav-theme-choice */

  const THEMES = [['light', 'Light', 'sun'], ['dark', 'Dark', 'moon'], ['auto', 'Auto', 'theme-auto']];
  /** Light, dark or automatic (follows the system), each with its icon: a menu or three buttons; no-auto leaves only light and dark. With apply it switches the page by itself. */
  class SavThemeChoice extends SavElement {
    static styles = [SIZES, `
      :host { display: inline-block; vertical-align: middle; }
      /* as tall as a field or a button of the same size */
      .seg { display: inline-flex; gap: 2px; height: var(--_h); padding: 3px; border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius); background: var(--sav-color-surface-2); }
      .seg button { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: .4rem; padding: 0 .7rem; border: 0; border-radius: calc(var(--sav-radius) - 2px); background: none; color: var(--sav-color-text-muted); font: inherit; font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-semibold); cursor: pointer; }
      .seg button::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_b, transparent); background-image: var(--_bi, none); box-shadow: var(--_s, none); transform: rotate(${TILT}); }
      .seg button[aria-checked="true"] { color: var(--sav-color-text); --_b: var(--sav-color-surface); --_bi: var(--sav-sheen, none); --_s: var(--sav-tab-segment-shadow, var(--sav-shadow-sm)); }
      :host([icons-only]) .seg .t { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
    `];
    static get observedAttributes() { return ['value', 'appearance', 'icons-only', 'apply', 'size', 'no-auto', 'label', 'sheet-on-mobile']; }
    /** The choices: light, dark and auto, or only light and dark with no-auto. */
    get themes() { return this.hasAttribute('no-auto') ? THEMES.filter(([k]) => k !== 'auto') : THEMES; }
    get value() {
      const v = this.getAttribute('value') || (this.hasAttribute('apply') ? (window.Sav?.getMode?.() || 'auto') : 'auto');
      // without auto, "auto" (or nothing set) shows what the system uses right now
      return v === 'auto' && this.hasAttribute('no-auto') ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : v;
    }
    set value(v) { this.setAttribute('value', v); }
    connectedCallback() { this.render(); }
    changed(name) { if (name === 'value' && this.shadowRoot.firstChild) { this.sync(); return; } this.render(); }
    render() {
      const v = this.value;
      if (this.getAttribute('appearance') === 'buttons') {
        this.shadowRoot.innerHTML = `<div class="seg" role="radiogroup" part="base" aria-label="${esc(this.getAttribute('label') || T(this, 'Theme'))}">${this.themes.map(([k, l, ic]) => `<button type="button" role="radio" data-v="${k}" aria-checked="${k === v}" tabindex="${k === v ? 0 : -1}" title="${esc(T(this, l))}"><sav-icon name="${ic}"></sav-icon><span class="t">${esc(T(this, l))}</span></button>`).join('')}</div>`;
        this.$$('.seg button').forEach((b) => { tiltWatch(b); b.addEventListener('click', () => this.pick(b.dataset.v)); });
        this.$('.seg').addEventListener('keydown', (e) => {
          const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!d) return;
          e.preventDefault(); const list = this.themes, i = list.findIndex(([k]) => k === this.value); const n = list[(i + d + list.length) % list.length][0]; this.pick(n); this.$(`[data-v="${n}"]`).focus();
        });
      } else {
        // a menu (sheet-on-mobile: an action sheet on phones); a choice updates it in place and closes it
        this.shadowRoot.innerHTML = `<sav-dropdown part="base" label="${esc(this.getAttribute('label') || T(this, 'Theme'))}" ${this.hasAttribute('sheet-on-mobile') ? 'sheet-on-mobile' : ''}>
          <sav-button slot="trigger" size="${esc(this.getAttribute('size') || 'md')}" appearance="outline" variant="neutral"></sav-button>
          ${this.themes.map(([k, l, ic]) => `<sav-menu-item type="checkbox" value="${k}"><sav-icon slot="prefix" name="${ic}"></sav-icon>${esc(T(this, l))}</sav-menu-item>`).join('')}</sav-dropdown>`;
        const dd = this.$('sav-dropdown');
        // the menu's own change (a list of ticked items) stays inside: the theme choice sends its own, with the theme
        dd.addEventListener('change', (e) => { if (e.target === dd) e.stopPropagation(); });
        dd.addEventListener('sav-select', (e) => {
          e.stopPropagation();
          const sheet = dd.sheet;
          this.pick(e.detail.value);
          dd.hide();
          if (!sheet) dd.trigger?.focus(); // the sheet gives the focus back itself
        });
        this.sync();
      }
    }
    /** Shows the value: the chosen button, or the trigger and the tick of the menu (without drawing the menu again: it may be open). */
    sync() {
      const dd = this.$('sav-dropdown');
      if (!dd) { this.render(); return; }
      const v = this.value, cur = this.themes.find(([k]) => k === v) || this.themes[this.themes.length - 1], icons = this.hasAttribute('icons-only');
      const tr = dd.querySelector('[slot="trigger"]');
      tr.innerHTML = `<sav-icon slot="prefix" name="${cur[2]}"></sav-icon>${icons ? '' : esc(T(this, cur[1]))}<sav-icon slot="suffix" name="chevron-down"></sav-icon>`;
      icons ? tr.setAttribute('label', T(this, 'Theme: {name}', { name: T(this, cur[1]) })) : tr.removeAttribute('label');
      dd.querySelectorAll('sav-menu-item').forEach((i) => i.toggleAttribute('checked', i.value === cur[0]));
    }
    pick(v) {
      if (v === this.getAttribute('value')) { this.sync(); return; }
      this.setAttribute('value', v);
      if (this.hasAttribute('apply')) window.Sav?.setMode?.(v);
      this.emit('change', { value: v });
    }
  }
  define('sav-theme-choice', SavThemeChoice);

  /* ================================================================== sav-search */

  /** A search field with suggestions as you type: from <option> children or the suggestions property (filled live on "sav-query").
      multiple: each term becomes a chip inside the field (on the separators: comma, semicolon, Enter, Space by default), up to max-terms.
      live: sav-search fires while typing (from min-chars); otherwise only on the search keys (Enter by default). */
  class SavSearch extends SavFormControl {
    static styles = [FIELD, SIZES, FLOAT, `
      .ic { width: 1.05em; height: 1.05em; color: var(--sav-color-text-muted); flex: none; }
      .x { display: none; }
      .has-value .x { display: inline-flex; }
      /* the terms (multiple): chips and the text field wrap together */
      .flow { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; align-items: center; gap: .3rem; }
      .flow .ctl { flex: 1 1 6ch; min-width: 6ch; }
      :host([multiple]) .box { padding-block: .3rem; }
      .terms { display: contents; }
      .term { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: .15rem; max-width: 100%; min-width: 0; padding: .1rem .15rem .1rem .5rem;
              font-size: .85em; line-height: 1.35; font-weight: var(--sav-font-weight-semibold); color: var(--sav-color-text); }
      .term::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius-sm); background: var(--sav-color-surface-2);
              border: var(--sav-border-width) solid var(--sav-color-border); transform: rotate(${TILT}); }
      .tt { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .rm { display: inline-flex; flex: none; padding: 2px; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); cursor: pointer; }
      .rm:hover { color: var(--sav-color-text); background: color-mix(in oklab, var(--sav-color-text) 10%, transparent); }
      .rm:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 1px; }
      .rm svg { width: .9em; height: .9em; }
      .term.dup { animation: sav-dup calc(.5s * var(--sav-motion, 1)) var(--sav-easing); }
      @keyframes sav-dup { 30%, 70% { transform: translateX(-3px); } 50% { transform: translateX(3px); } }
      .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
      .pop { min-width: var(--_pw, 16rem); max-width: min(32rem, calc(100vw - 16px)); max-height: min(var(--popup-height, 22rem), calc(100vh - 2rem)); padding: 0; flex-direction: column;
             border-radius: var(--sav-radius); color: var(--sav-color-text); font-family: var(--sav-font); font-size: var(--sav-font-size-md); }
      .pop:popover-open, .pop.open { display: flex; animation: sav-pop calc(.14s * var(--sav-motion, 1)) var(--sav-easing); }
      ${panelLayer('.pop')}
      .list { overflow: auto; padding: .3rem; }
      .grp { padding: .5rem .6rem .2rem; font-size: .7rem; font-weight: var(--sav-font-weight-bold); letter-spacing: .07em; text-transform: uppercase; color: var(--sav-color-text-muted); }
      .opt { position: relative; isolation: isolate; display: flex; align-items: center; gap: .6rem; padding: .5rem .6rem; border-radius: calc(var(--sav-radius) - 2px); cursor: pointer; }
      .opt::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_ob, transparent); transform: rotate(${TILT}); }
      .opt.active { --_ob: var(--sav-color-surface-2); }
      .opt sav-icon { color: var(--sav-color-text-muted); flex: none; }
      .ol { flex: 1; min-width: 0; display: grid; }
      .od { font-size: .82em; color: var(--sav-color-text-muted); }
      .od:empty { display: none; }
      mark { background: color-mix(in oklab, var(--sav-color-warning) 32%, transparent); color: inherit; border-radius: 2px; padding: 0 1px; }
      .empty { padding: .8rem; font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); }
      @keyframes sav-pop { from { opacity: 0; transform: translateY(-4px); } }
      @media (prefers-reduced-motion: reduce) { .term.dup { animation: none; } }
    `];
    static get observedAttributes() { return [...FC, 'label', 'help', 'placeholder', 'value', 'multiple', 'max-terms', 'separators', 'live', 'search-keys', 'min-chars', 'max-label']; }
    get multiple() { return this.hasAttribute('multiple'); }
    set multiple(v) { this.toggleAttribute('multiple', !!v); }
    get live() { return this.hasAttribute('live'); }
    set live(v) { this.toggleAttribute('live', !!v); }
    /** what is typed in the field right now */
    get text() { return this.native?.value ?? ''; }
    /** the terms (multiple): a copy of the list */
    get terms() { return [...(this._terms ||= [])]; }
    set terms(list) { this._terms = []; for (const t of list || []) this.addTerm(t, { quiet: true }); this.renderTerms(); this.sync(); }
    /** single: the text. multiple: the list of terms (set it with a list, or a text split at commas and semicolons) */
    get value() { return this.multiple ? this.terms : this.text; }
    set value(v) {
      if (!this.native) { this._pending = v; return; }
      if (this.multiple) this.terms = Array.isArray(v) ? v : String(v ?? '').split(/[,;\n]/);
      else { this.native.value = Array.isArray(v) ? v.join(' ') : v ?? ''; this.onValue(false); }
    }
    get maxTerms() { const n = Number(this.getAttribute('max-terms')); return n > 0 ? n : Infinity; }
    /** "enter", "space", "tab", "comma", "semicolon" or any single character, separated by spaces */
    static keys(spec) {
      const map = { enter: 'Enter', return: 'Enter', space: ' ', tab: 'Tab', comma: ',', semicolon: ';' };
      return String(spec).trim().split(/\s+/).filter(Boolean).map((k) => map[k.toLowerCase()] || k);
    }
    get separators() { return SavSearch.keys(this.getAttribute('separators') ?? ', ; enter space'); }
    get searchKeys() { return SavSearch.keys(this.getAttribute('search-keys') ?? 'enter'); }
    /** The suggestions: strings or { label, value, description, icon, group, href }. */
    get suggestions() { return this._sugs ?? [...this.querySelectorAll('option')].map((o) => ({ label: o.textContent.trim(), value: o.value || o.textContent.trim(), description: o.dataset.description || '', icon: o.dataset.icon || '', group: o.closest('optgroup')?.label || '' })); }
    set suggestions(list) { this._sugs = (list || []).map((x) => (typeof x === 'string' ? { label: x, value: x } : x)); if (this.native === this.shadowRoot.activeElement) this.renderList(); }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('srch');
      this.shadowRoot.innerHTML = `<div class="w" part="form-control">
        <label class="lbl" part="label" for="${id}"><slot name="label"></slot><span class="lbl-text"></span></label>
        <div class="box" part="base">${svgIcon('search', 'ic')}
          <div class="flow"><span class="terms" part="terms" role="list"></span>
          <input class="ctl" part="input" id="${id}" type="search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${id}-l" autocomplete="off" enterkeyhint="search"></div>
          <slot name="suffix"></slot>
          <button type="button" class="ibtn x" part="clear-button" aria-label="${esc(T(this, 'Clear'))}">${svgIcon('x')}</button>
        </div>
        <div class="help" part="help-text"><slot name="help"></slot><span class="help-text"></span></div>
        <span class="sr" aria-live="polite"></span>
        <div class="pop float" part="popup" ${supportsPopover ? 'popover="manual"' : ''}><div class="list" id="${id}-l" role="listbox"></div></div>
      </div>`;
      const i = (this.native = this.$('input'));
      this.$('.pop').id = `${id}-p`;
      tiltWatch(this.$('.pop'));
      i.addEventListener('input', () => { if (this.multiple) this.splitTyped(); this.onValue(true); this.query(); this.liveSearch(); });
      i.addEventListener('paste', (e) => this.paste(e));
      i.addEventListener('focus', () => { if (i.value.length >= this.minChars) this.query(); });
      i.addEventListener('keydown', (e) => this.key(e));
      i.addEventListener('blur', () => setTimeout(() => { if (!this.shadowRoot.activeElement) this.close(); }, 120));
      this.$('.x').addEventListener('click', () => {
        const had = this.terms.length, typed = i.value.trim(); i.value = ''; this._terms = []; this.renderTerms(); this.onValue(true); this.close(); i.focus();
        this.emit('sav-clear'); if (had) this.emit('change', { value: this.value });
        // emptied: search again (with nothing, so the page can show everything), live or not
        if (this.searches && (this.live || had || typed)) this.search();
      });
      this.$('.terms').addEventListener('click', (e) => { const b = e.target.closest('.rm'); if (b) this.removeTerm(Number(b.dataset.i), true); });
      this.$('.box').addEventListener('mousedown', (e) => { if (e.target === this.$('.box') || e.target === this.$('.flow')) { e.preventDefault(); i.focus(); } });
      this.$('.list').addEventListener('mousedown', (e) => e.preventDefault());
      this.$('.list').addEventListener('click', (e) => { const o = e.target.closest('.opt'); if (o) this.choose(Number(o.dataset.i)); });
      this._reflow = () => { if (!this.isOpen) return; if (anchorGone(this.$('.box'))) { this.close(); return; } this.position(); };
      const start = this._pending ?? this.getAttribute('value');
      if (start !== null && start !== undefined) this.value = start;
      this._pending = undefined;
      this.sync();
    }
    get minChars() { return Number(this.getAttribute('min-chars') ?? 1); }
    get isOpen() { return this.$('.pop')?.matches(supportsPopover ? ':popover-open' : '.open'); }
    changed(name) {
      if (name === 'value') this.value = this.getAttribute('value');
      else if (name === 'multiple') { const was = this._terms || []; if (!this.multiple && was.length) { this.native.value = was.join(' '); this._terms = []; } this.renderTerms(); this.sync(); }
      else this.sync();
    }
    sync() {
      const i = this.native; if (!i) return;
      const full = this.multiple && this.terms.length >= this.maxTerms;
      // with chips the hint would crowd them: it shows only while the field is empty, or says the limit is reached
      i.placeholder = full ? this.getAttribute('max-label') || T(this, 'Up to {n} terms', { n: this.maxTerms }) : this.multiple && this.terms.length ? '' : this.getAttribute('placeholder') || T(this, 'Search');
      i.readOnly = full;
      i.disabled = this.isDisabled; i.name = this.getAttribute('name') || '';
      this.syncLabels(this.$('.w'));
      if (!this.getAttribute('label')) i.setAttribute('aria-label', this.getAttribute('placeholder') || T(this, 'Search'));
      this.$$('.rm').forEach((b) => { b.disabled = this.isDisabled; });
      this.onValue(false);
    }
    onValue(fire) {
      const terms = this._terms || [];
      this.$('.w').classList.toggle('has-value', !!this.text || (this.multiple && terms.length > 0));
      if (this.multiple && terms.length) {
        const name = this.getAttribute('name');
        if (name) { const fd = new FormData(); terms.forEach((t) => fd.append(name, t)); this.internals.setFormValue(fd); }
        else this.internals.setFormValue(terms.join(','));
      } else this.internals.setFormValue(this.multiple ? '' : this.text);
      if (fire) this.emit('input', { value: this.value, text: this.text });
    }
    /* ------------------------------------------------------------ terms (multiple) */
    /** adds a term; false when it is empty, already there, over the limit, or the page cancelled sav-term-add */
    addTerm(raw, { quiet = false } = {}) {
      const t = String(raw ?? '').trim(); const list = (this._terms ||= []);
      if (!t) return false;
      const dup = list.findIndex((x) => x.toLowerCase() === t.toLowerCase());
      if (dup >= 0) { if (!quiet) { const el = this.$$('.term')[dup]; el?.classList.remove('dup'); void el?.offsetWidth; el?.classList.add('dup'); this.say(T(this, '{name} is already there', { name: t })); } return false; }
      if (list.length >= this.maxTerms) { if (!quiet) this.say(this.getAttribute('max-label') || T(this, 'Up to {n} terms', { n: this.maxTerms })); return false; }
      if (!quiet && !this.emit('sav-term-add', { term: t }, true)) return false;
      list.push(t);
      if (!quiet) { this.renderTerms(); this.sync(); this.say(T(this, '{name} added', { name: t })); this.emit('change', { value: this.value }); this.liveSearch(); }
      return true;
    }
    removeTerm(n, focusInput) {
      const list = this._terms || []; const t = list[n]; if (t === undefined || this.isDisabled) return;
      if (!this.emit('sav-term-remove', { term: t }, true)) return;
      list.splice(n, 1); this.renderTerms(); this.sync(); this.say(T(this, '{name} removed', { name: t }));
      if (focusInput) this.native.focus();
      this.emit('change', { value: this.value });
      // a term taken away changes what is searched: search again now (live or not), so the results follow
      if (this.searches) this.search();
    }
    /** sav-search fires on its own when the terms change (sav-chip-input, a plain field of chips, does not search) */
    get searches() { return true; }
    renderTerms() {
      const box = this.$('.terms'); if (!box) return;
      const list = this.multiple ? this._terms || [] : [];
      box.innerHTML = list.map((t, n) => `<span class="term" part="term" role="listitem"><span class="tt" title="${esc(t)}">${esc(t)}</span><button type="button" class="rm" part="term-remove" data-i="${n}" aria-label="${esc(T(this, 'Remove {name}', { name: t }))}">${svgIcon('x')}</button></span>`).join('');
      box.querySelectorAll('.term').forEach((el) => tiltWatch(el));
    }
    /** what is typed holds a separator (typed on a phone keyboard, or pasted): the parts before it become terms */
    splitTyped() {
      const chars = this.separators.filter((k) => k.length === 1);
      if (!chars.length) return;
      const v = this.native.value; if (!chars.some((c) => v.includes(c))) return;
      const parts = v.split(new RegExp(`[${chars.map((c) => c.replace(/[\]\\^-]/g, '\\$&')).join('')}]`));
      const rest = parts.pop();
      let left = '';
      for (const p of parts) if (!this.addTerm(p) && p.trim() && this.terms.length >= this.maxTerms) left = p.trim();
      this.native.value = left || rest.replace(/^\s+/, '');
      this.close();
    }
    paste(e) {
      if (!this.multiple) return;
      const txt = e.clipboardData?.getData('text') ?? ''; if (!/[\n\r]/.test(txt)) return; // one line: the input event splits it
      e.preventDefault();
      const chars = this.separators.filter((k) => k.length === 1);
      const parts = txt.split(new RegExp(`[\\n\\r${chars.map((c) => c.replace(/[\]\\^-]/g, '\\$&')).join('')}]`));
      parts.forEach((p) => this.addTerm(p));
      this.onValue(true);
    }
    say(msg) { const s = this.$('.sr'); if (s) { s.textContent = ''; setTimeout(() => { s.textContent = msg; }, 30); } }
    /* ------------------------------------------------------------ searching */
    /** fires sav-search now: query is the text typed, terms the chips (and the text typed, if any) */
    search() {
      clearTimeout(this._lt);
      const q = this.text.trim();
      const terms = this.multiple ? [...this.terms, ...(q ? [q] : [])] : q ? [q] : [];
      this.emit('sav-search', { query: q, terms });
    }
    /** live: fires sav-search while typing, after min-chars (and when the field is emptied, so the page can show everything again) */
    liveSearch() {
      if (!this.live) return;
      clearTimeout(this._lt);
      const q = this.text.trim();
      if (q && q.length < this.minChars) return;
      this._lt = setTimeout(() => this.search(), Number(this.getAttribute('debounce') ?? 250));
    }
    /** Asks the page for suggestions (sav-query, debounced) and shows the list. */
    query() {
      const q = this.text.trim();
      clearTimeout(this._qt);
      if (q.length < this.minChars || this.native.readOnly) { this.close(); return; }
      this._qt = setTimeout(() => { this.emit('sav-query', { query: q }); this.renderList(); }, Number(this.getAttribute('debounce') ?? 120));
    }
    /** The suggestions that match (filtered here unless no-filter: then the page filters, e.g. on a server). */
    matches() {
      const q = this.text.trim().toLowerCase(); let all = this.suggestions;
      if (this.multiple) { const have = new Set(this.terms.map((t) => t.toLowerCase())); all = all.filter((s) => !have.has(String(s.value ?? s.label).toLowerCase()) && !have.has(s.label.toLowerCase())); }
      if (this.hasAttribute('no-filter') || !q) return all;
      return all.filter((s) => (s.label + ' ' + (s.description || '') + ' ' + (s.keywords || '')).toLowerCase().includes(q));
    }
    renderList() {
      const list = this.$('.list'), q = this.text.trim();
      const items = (this._items = this.matches().slice(0, Number(this.getAttribute('max')) || 8));
      const hl = (t) => { const s = esc(t); if (!q) return s; const k = s.toLowerCase().indexOf(esc(q).toLowerCase()); return k < 0 ? s : s.slice(0, k) + '<mark>' + s.slice(k, k + esc(q).length) + '</mark>' + s.slice(k + esc(q).length); };
      let html = '', group = null;
      items.forEach((it, n) => {
        if ((it.group || '') !== group) { group = it.group || ''; if (group) html += `<div class="grp" role="presentation">${esc(group)}</div>`; }
        html += `<div class="opt" role="option" id="${this.native.id}-o${n}" data-i="${n}" aria-selected="false">${it.icon ? `<sav-icon name="${esc(it.icon)}"></sav-icon>` : ''}<span class="ol"><span>${hl(it.label)}</span><span class="od">${esc(it.description || '')}</span></span></div>`;
      });
      if (!items.length) html = `<div class="empty">${esc(this.getAttribute('empty-label') || T(this, 'No results'))}</div>`;
      list.innerHTML = html;
      this._active = -1;
      list.querySelectorAll('.opt').forEach((o) => tiltWatch(o));
      this.open();
      // the first suggestion is ready: Enter takes it (Escape closes the list, then Enter searches the text as typed); no-autoselect turns this off
      if (items.length && !this.hasAttribute('no-autoselect')) this.activate(0);
    }
    open() {
      const p = this.$('.pop'); showPop(p); this.native.setAttribute('aria-expanded', 'true'); this.position();
      addEventListener('scroll', this._reflow, true); addEventListener('resize', this._reflow);
    }
    close() {
      const p = this.$('.pop'); if (!p) return; hidePop(p); this.native.setAttribute('aria-expanded', 'false'); this.native.removeAttribute('aria-activedescendant');
      removeEventListener('scroll', this._reflow, true); removeEventListener('resize', this._reflow);
    }
    position() { const p = this.$('.pop'); p.style.setProperty('--_pw', this.$('.box').getBoundingClientRect().width + 'px'); place(p, this.$('.box'), 'bottom-start', 6); }
    key(e) {
      if (e.isComposing) return;
      const opts = this.$$('.opt');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); if (!this.isOpen) { if (!this.native.readOnly) this.renderList(); return; }
        if (!opts.length) return;
        this.activate((this._active + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length);
        return;
      }
      if (e.key === 'Escape') { if (this.isOpen) { e.preventDefault(); this.close(); } return; }
      if (e.key === 'Enter' && this.isOpen && this._active >= 0) { e.preventDefault(); this.choose(this._active); return; }
      const sep = this.multiple && this.separators.includes(e.key), go = this.searchKeys.includes(e.key);
      if (this.multiple && e.key === 'Backspace' && !this.native.value && this.terms.length) { e.preventDefault(); this.removeTerm(this.terms.length - 1); return; }
      if (sep) {
        const t = this.native.value.trim();
        if (t) {
          if (e.key !== 'Tab') e.preventDefault();
          if (this.addTerm(t)) { this.native.value = ''; this.onValue(true); }
          this.close();
        } else if (e.key.length === 1) e.preventDefault(); // a separator in an empty field types nothing
      }
      if (go) {
        if (e.key !== 'Enter' && e.key !== 'Tab') e.preventDefault();
        this.close(); this.search();
      }
    }
    /** marks suggestion n as the one Enter takes */
    activate(n) {
      const opts = this.$$('.opt'); if (!opts.length) return;
      this._active = n;
      opts.forEach((o, k) => { o.classList.toggle('active', k === n); o.setAttribute('aria-selected', String(k === n)); });
      const a = opts[n]; if (!a) return; this.native.setAttribute('aria-activedescendant', a.id); a.scrollIntoView({ block: 'nearest' });
    }
    choose(n) {
      const it = this._items?.[n]; if (!it) return;
      if (!this.emit('sav-pick', { value: it.value ?? it.label, label: it.label, item: it }, true)) return;
      if (this.multiple && !it.href) { if (this.addTerm(it.label)) { this.native.value = ''; this.onValue(true); } this.close(); this.native.focus(); return; }
      this.native.value = it.label; this.onValue(true); this.close();
      this.emit('change', { value: this.value });
      if (it.href) location.href = it.href; else this.liveSearch();
    }
    focus() { this.native?.focus(); }
  }
  define('sav-search', SavSearch);


  /* ================================================================== sav-chip-input */

  /** A field whose values are chips: type one and press Enter, a comma or a semicolon (separators), paste a list, remove with × or Backspace.
      kind="color" takes colour codes and shows each one as a small swatch; kind="number" takes numbers. Suggestions come from <option> children.
      The value is the list of chips (a comma-separated text in the value attribute); the form gets one entry per chip. Built on sav-search. */
  class SavChipInput extends SavSearch {
    static styles = [...SavSearch.styles, `
      .ic { display: none; }
      .term .dot { flex: none; width: .85em; height: .85em; margin-inline-end: .1rem; border-radius: calc(var(--sav-radius-sm) * .6);
                   background: linear-gradient(var(--_v), var(--_v)), repeating-conic-gradient(color-mix(in oklab, var(--sav-color-text) 16%, transparent) 0 25%, transparent 0 50%) 50% / 6px 6px;
                   box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--sav-color-text) 25%, transparent); transform: rotate(var(--sav-knob-tilt, 0deg)); }
      :host([kind="color"]) .tt { font-family: var(--sav-font-mono, ui-monospace, monospace); font-weight: 500; }
      .box.bad { animation: sav-ci-bad calc(.35s * var(--sav-motion, 1)) var(--sav-easing); }
      @keyframes sav-ci-bad { 25%, 75% { translate: -3px 0; } 50% { translate: 3px 0; } }
      @media (prefers-reduced-motion: reduce) { .box.bad { animation: none; } }
    `];
    static get observedAttributes() { return [...SavSearch.observedAttributes, 'kind']; }
    connectedCallback() {
      if (!this.hasAttribute('multiple')) this.setAttribute('multiple', '');
      const first = !this.shadowRoot.firstChild;
      super.connectedCallback();
      if (first && this.native) { this.native.type = 'text'; this.native.setAttribute('enterkeyhint', 'enter'); this.sync(); }
    }
    /* values may hold spaces (New York): Space does not split them unless separators says so; nothing "searches" */
    get separators() { return SavSearch.keys(this.getAttribute('separators') ?? ', ; enter'); }
    get searchKeys() { return SavSearch.keys(this.getAttribute('search-keys') ?? ''); }
    get searches() { return false; }
    /** a value made tidy for its kind, or null when it is not one (#ABC becomes #aabbcc; "1,5" is not split: comma is a separator) */
    tidy(raw) {
      const t = String(raw ?? '').trim(); if (!t) return '';
      const kind = this.getAttribute('kind');
      if (kind === 'color') return toHex(t);
      if (kind === 'number') return /^-?\d+(\.\d+)?$/.test(t) ? String(Number(t)) : null;
      return t;
    }
    addTerm(raw, o = {}) {
      const t = this.tidy(raw);
      if (t === null) {
        if (!o.quiet) { const b = this.$('.box'); b?.classList.remove('bad'); void b?.offsetWidth; b?.classList.add('bad'); this.say(this.getAttribute('kind') === 'color' ? T(this, '{name} is not a colour code', { name: String(raw).trim() }) : T(this, '{name} is not a number', { name: String(raw).trim() })); }
        return false;
      }
      return super.addTerm(t, o);
    }
    /** the suggestions show only when some match: no "No results" list for a field where any value is fine */
    renderList() { if (!this.matches().length) { this.close(); return; } super.renderList(); }
    renderTerms() {
      super.renderTerms();
      if (this.getAttribute('kind') !== 'color') return;
      const list = this._terms || [];
      this.$$('.term').forEach((el, n) => el.insertAdjacentHTML('afterbegin', `<span class="dot" style="--_v:${esc(list[n] || 'transparent')}" aria-hidden="true"></span>`));
    }
    sync() {
      super.sync();
      const i = this.native; if (!i) return;
      // the hint for an empty field: what to type (the field shows none once it has chips)
      if (!this.getAttribute('placeholder') && !(this._terms || []).length && !i.readOnly) i.placeholder = this.getAttribute('kind') === 'color' ? '#3b82f6, then Enter' : 'Type, then Enter';
      if (!this.getAttribute('label') && !this.getAttribute('aria-label')) i.setAttribute('aria-label', T(this, 'Values'));
    }
  }
  define('sav-chip-input', SavChipInput);

  /* ================================================================== sav-carousel / sav-slide */

  /** Slides that scroll sideways: images, or anything (image + text). Arrows, dots, swipe, keyboard and an optional autoplay that pauses on hover and focus. */
  class SavCarousel extends SavElement {
    static styles = `
      /* full width by default: the slides take their size from the carousel, so it must not take its size from them (it would collapse in a flex row) */
      :host { display: block; position: relative; width: 100%; min-width: 0; --per-view: 1; --gap: 1rem; }
      .vp { display: grid; grid-auto-flow: column; grid-auto-columns: calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view)); gap: var(--gap);
            overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; scrollbar-width: none; overscroll-behavior-x: contain; border-radius: var(--sav-radius-lg); outline: none; }
      .vp::-webkit-scrollbar { display: none; }
      ::slotted(*) { scroll-snap-align: start; min-width: 0; }
      /* the arrows: solid, with a shadow, so they read on top of any picture; the shape follows the style */
      .nav { position: absolute; top: 50%; z-index: 2; display: grid; place-items: center; width: var(--arrow-size, 2.6rem); height: var(--arrow-size, 2.6rem); padding: 0; margin: 0;
             border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-knob-radius, 50%); background: color-mix(in oklab, var(--sav-color-surface) 92%, transparent);
             color: var(--sav-color-text); box-shadow: 0 4px 14px rgb(0 0 0 / .22), var(--sav-control-shadow, 0 0 transparent); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
             cursor: pointer; translate: 0 -50%; transform: rotate(var(--sav-knob-tilt, 0deg)); transition: transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing), opacity calc(.2s * var(--sav-motion, 1)), background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .nav svg { width: 1.3rem; height: 1.3rem; transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -1)); }
      .nav:hover { background: var(--sav-color-surface); transform: rotate(var(--sav-knob-tilt, 0deg)) scale(1.08); }
      .nav:active { transform: rotate(var(--sav-knob-tilt, 0deg)) scale(.95); }
      .nav:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 2px; }
      .nav:disabled, .nav[data-none] { opacity: 0; pointer-events: none; }
      .prev { left: .65rem; } .next { right: .65rem; }
      :host([controls="outside"]) .prev { left: calc(var(--arrow-size, 2.6rem) / -2); } :host([controls="outside"]) .next { right: calc(var(--arrow-size, 2.6rem) / -2); }
      .dots { display: flex; justify-content: center; gap: .45rem; margin-top: .75rem; }
      .dot { width: .6rem; height: .6rem; padding: 0; border: 0; border-radius: var(--sav-knob-radius, 50%); background: var(--sav-color-border-strong); cursor: pointer; transform: rotate(var(--sav-knob-tilt, 0deg)); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
      .dot[aria-current="true"] { background: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); transform: rotate(var(--sav-knob-tilt, 0deg)) scale(1.25); box-shadow: ${INK('1.5px')}; }
      :host([no-dots]) .dots, :host([no-arrows]) .nav { display: none; }
      :host(:not([no-swipe])) .vp { cursor: grab; } .vp.drag { cursor: grabbing; user-select: none; } .vp.drag ::slotted(*) { pointer-events: none; }
      :host([no-swipe]) .vp { overflow-x: hidden; touch-action: pan-y; }
      ::slotted(img) { -webkit-user-drag: none; }
      .live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
      /* touch screens: no arrows (a finger swipes), unless touch-arrows; the first time the carousel shows up, a finger "grabs and moves" it a little */
      @media (hover: none) and (pointer: coarse) { :host(:not([touch-arrows])) .nav { display: none; } }
      .hint { position: absolute; top: 50%; left: 72%; z-index: 3; width: 2.6rem; height: 2.6rem; margin: -1.3rem 0 0 -1.3rem; border-radius: 50%; pointer-events: none; opacity: 0;
              background: radial-gradient(circle, rgb(255 255 255 / .95) 0 34%, rgb(255 255 255 / .45) 36% 100%); box-shadow: 0 2px 12px rgb(0 0 0 / .35); }
      @media (prefers-reduced-motion: reduce) { .vp { scroll-behavior: auto; } .hint { display: none; } }
    `;
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.setAttribute('role', 'region'); this.setAttribute('aria-roledescription', T(this, 'carousel'));
      if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Carousel'));
      this.shadowRoot.innerHTML = `<div class="vp" part="viewport" tabindex="0"><slot></slot></div>
        <button type="button" class="nav prev" part="previous" aria-label="${esc(T(this, 'Previous slide'))}">${svgIcon('chevron-left')}</button>
        <button type="button" class="nav next" part="next" aria-label="${esc(T(this, 'Next slide'))}">${svgIcon('chevron-right')}</button>
        <div class="hint" part="hint" aria-hidden="true"></div><div class="dots" part="dots"></div><div class="live" aria-live="polite"></div>`;
      const vp = (this.vp = this.$('.vp'));
      this.$('.prev').addEventListener('click', () => this.go(this.index - 1));
      this.$('.next').addEventListener('click', () => this.go(this.index + 1));
      vp.addEventListener('keydown', (e) => { if (this.hasAttribute('no-keyboard')) return; if (e.key === 'ArrowRight') { e.preventDefault(); this.go(this.index + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); this.go(this.index - 1); } });
      // gestures: fingers swipe natively (scroll snap); a mouse or pen can drag too. no-swipe turns both off.
      vp.addEventListener('dragstart', (e) => e.preventDefault()); // no "ghost" picture while dragging
      vp.addEventListener('pointerdown', (e) => {
        if (this.hasAttribute('no-swipe') || e.pointerType === 'touch' || e.button) return;
        e.preventDefault(); // no text selection, no native image drag
        const x0 = e.clientX, s0 = vp.scrollLeft, startIndex = this.index, t0 = performance.now(); let moved = false, lastX = x0, lastT = t0, v = 0;
        const move = (m) => {
          const dx = m.clientX - x0; if (!moved && Math.abs(dx) < 5) return;
          if (!moved) { moved = true; try { vp.setPointerCapture(e.pointerId); } catch {} vp.style.scrollSnapType = 'none'; vp.style.scrollBehavior = 'auto'; vp.classList.add('drag'); }
          const now = performance.now(); v = (m.clientX - lastX) / Math.max(1, now - lastT); lastX = m.clientX; lastT = now;
          vp.scrollLeft = s0 - dx;
        };
        const up = (u) => {
          removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
          if (!moved) return;
          vp.classList.remove('drag'); vp.style.scrollBehavior = '';
          // the snap comes back only when the glide to the slide is over (restoring it earlier fights the animation)
          const resnap = () => { vp.style.scrollSnapType = ''; clearTimeout(tm); };
          const tm = setTimeout(resnap, 700); vp.addEventListener('scrollend', resnap, { once: true });
          // land on the slide nearest to where it was let go; a quick flick (or a drag past 20%) moves at least one slide
          const sl = this.slides, w = (sl[1]?.offsetLeft ?? sl[0].offsetWidth) - sl[0].offsetLeft || 1;
          let to = Math.round((vp.scrollLeft) / w);
          const dx = u.clientX - x0, speed = Math.abs(dx) / Math.max(1, performance.now() - t0), flick = Math.abs(dx) >= 20 && (Math.abs(v) > 0.35 || speed > 0.35), far = Math.abs(dx) > w * 0.2;
          if (to === startIndex && (flick || far)) to = startIndex + (dx < 0 ? 1 : -1);
          this.go(to);
          const eat = (c) => { c.preventDefault(); c.stopPropagation(); }; // a drag is not a click on the slide
          vp.addEventListener('click', eat, { capture: true, once: true }); setTimeout(() => vp.removeEventListener('click', eat, { capture: true }), 0);
        };
        addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);
      });
      vp.addEventListener('scroll', () => { clearTimeout(this._st); this._st = setTimeout(() => this.syncIndex(), 80); });
      this.$('slot').addEventListener('slotchange', () => this.build());
      for (const ev of ['mouseenter', 'focusin']) this.addEventListener(ev, () => (this._hold = true));
      for (const ev of ['mouseleave', 'focusout']) this.addEventListener(ev, () => (this._hold = false));
      const per = this.getAttribute('per-view'); if (per) this.style.setProperty('--per-view', per);
      this.build();
      const ms = Number(this.getAttribute('autoplay')) || (this.hasAttribute('autoplay') ? 5000 : 0);
      if (ms && !matchMedia('(prefers-reduced-motion: reduce)').matches) this._ap = setInterval(() => { if (!this._hold && !document.hidden) this.go(this.index + 1 >= this.positions ? 0 : this.index + 1); }, ms);
      // swipe hint, once, when at least 60% of the carousel is on screen (touch screens only; no-hint turns it off)
      if (!this.hasAttribute('no-hint') && !this.hasAttribute('no-swipe') && matchMedia('(hover: none) and (pointer: coarse)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        this._io = new IntersectionObserver((en) => { if (en.some((x) => x.isIntersecting)) { this._io.disconnect(); setTimeout(() => this.hint(), 350); } }, { threshold: 0.6 });
        this._io.observe(this);
        vp.addEventListener('touchstart', () => { this._io?.disconnect(); this._hinted = true; }, { passive: true, once: true }); // they already know
      }
    }
    disconnectedCallback() { clearInterval(this._ap); this._io?.disconnect(); }
    /** Shows that the slides can be swiped: a finger presses, drags them a little to the left, lets go and they spring back. */
    hint() {
      if (this._hinted || this.positions < 2 || this.index >= this.positions - 1 || !this.$('.hint')?.animate) return;
      this._hinted = true;
      // the finger and the slides move by the same distance, so the finger looks like it is pulling them
      const ease = 'cubic-bezier(.45,0,.25,1)', dur = 1500 * motion(this), d = Math.round(Math.min(120, this.slides[0].offsetWidth * 0.22));
      this.$('.hint').animate([
        { opacity: 0, transform: 'translateX(0) scale(1.3)', offset: 0 }, { opacity: 1, transform: 'translateX(0) scale(1)', offset: .15 },
        { opacity: 1, transform: `translateX(${-d}px) scale(1)`, offset: .6 }, { opacity: 0, transform: `translateX(${-d - 8}px) scale(.9)`, offset: .75 }, { opacity: 0, offset: 1 }
      ], { duration: dur, easing: ease });
      for (const sl of this.slides) sl.animate([
        { translate: '0 0', offset: 0 }, { translate: '0 0', offset: .15 }, { translate: `${-d}px 0`, offset: .6 }, { translate: `${Math.round(d * 0.12)}px 0`, offset: .82 }, { translate: '0 0', offset: 1 }
      ], { duration: dur, easing: ease });
    }
    get slides() { return this.$('slot')?.assignedElements() || []; }
    /** Slides visible at once, and how many positions that leaves (4 slides two at a time: 3 positions, so 3 dots). */
    get perView() { return Math.max(1, Number(this.getAttribute('per-view')) || 1); }
    get positions() { return Math.max(1, this.slides.length - this.perView + 1); }
    build() {
      const n = this.slides.length, per = this.perView;
      this.slides.forEach((s, i) => { s.setAttribute('role', 'group'); s.setAttribute('aria-roledescription', T(this, 'slide')); s.setAttribute('aria-label', T(this, '{i} of {n}', { i: i + 1, n })); });
      this.$('.dots').innerHTML = Array.from({ length: this.positions }, (_, i) => `<button type="button" class="dot" aria-label="${esc(per > 1 ? T(this, 'Slides {a} to {b}', { a: i + 1, b: Math.min(n, i + per) }) : T(this, 'Slide {i}', { i: i + 1 }))}" data-i="${i}"></button>`).join('');
      this.$$('.dot').forEach((d) => d.addEventListener('click', () => this.go(Number(d.dataset.i))));
      this.index = Math.min(this.index || 0, this.positions - 1); this.syncIndex();
    }
    go(i) {
      const s = this.slides; if (!s.length) return;
      const p = this.positions;
      i = this.hasAttribute('loop') ? ((i % p) + p) % p : Math.max(0, Math.min(p - 1, i));
      this.vp.scrollTo({ left: s[i].offsetLeft - s[0].offsetLeft });
      if (i !== this.index) this.emit('sav-slide', { index: i });
      this.index = i; this.paint();
    }
    syncIndex() {
      const s = this.slides; if (!s.length) return;
      const x = this.vp.scrollLeft + s[0].offsetLeft, max = this.vp.scrollWidth - this.vp.clientWidth;
      // at the very end of the scroll the last position counts, even if its slide cannot reach the left edge
      let best = this.vp.scrollLeft >= max - 2 && max > 0 ? this.positions - 1 : 0;
      if (best === 0) for (let i = 0; i < this.positions; i++) if (Math.abs(s[i].offsetLeft - x) < Math.abs(s[best].offsetLeft - x)) best = i;
      if (best !== this.index) { this.index = best; this.emit('sav-slide', { index: best }); }
      this.paint();
    }
    paint() {
      const p = this.positions, n = this.slides.length, per = this.perView, loop = this.hasAttribute('loop');
      this.$$('.dot').forEach((d, i) => d.setAttribute('aria-current', String(i === this.index)));
      this.$('.prev').disabled = !loop && this.index <= 0;
      this.$('.next').disabled = !loop && this.index >= p - 1;
      this.$('.dots').hidden = p < 2; this.$$('.nav').forEach((b) => b.toggleAttribute('data-none', p < 2));
      this.$('.live').textContent = per > 1 ? T(this, 'Slides {a} to {b} of {n}', { a: this.index + 1, b: Math.min(n, this.index + per), n }) : T(this, 'Slide {i} of {n}', { i: this.index + 1, n });
    }
  }
  define('sav-carousel', SavCarousel);

  /** One slide: an image with an optional title and text over it or below it (or put any content inside). */
  class SavSlide extends SavElement {
    static styles = `
      :host { display: block; position: relative; }
      .s { position: relative; height: 100%; border-radius: var(--sav-radius-lg); overflow: hidden; background: var(--sav-color-surface); border: var(--sav-border-width) solid var(--sav-color-border); }
      img { display: block; width: 100%; aspect-ratio: var(--ratio, 16 / 9); object-fit: cover; }
      .t { padding: 1rem 1.1rem 1.2rem; display: grid; gap: .3rem; }
      /* a picture without heading, text or content has no text area (no empty band under the picture) */
      :host([data-no-text]) .t { display: none; }
      .h { font-weight: var(--sav-font-weight-bold); font-size: 1.1rem; }
      .h:empty, .p:empty { display: none; }
      .p { color: var(--sav-color-text-muted); line-height: 1.5; }
      :host([overlay]) .t { position: absolute; inset: auto 0 0 0; padding: 2.5rem 1.1rem 1.1rem; color: #fff; background: linear-gradient(to top, rgb(0 0 0 / .72), transparent); }
      :host([overlay]) .p { color: rgb(255 255 255 / .85); }
      :host(:not([src])) img { display: none; }
    `;
    static get observedAttributes() { return ['src', 'alt', 'heading', 'text', 'ratio']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = '<div class="s" part="base"><img part="image" loading="lazy" draggable="false"><div class="t" part="text"><span class="h"></span><span class="p"></span><slot></slot></div></div>';
        this.$('slot').addEventListener('slotchange', () => this.sync());
      }
      this.sync();
    }
    changed() { this.sync(); }
    sync() {
      const img = this.$('img'); if (!img) return;
      const src = this.getAttribute('src'); src ? (img.src = src) : img.removeAttribute('src'); img.alt = this.getAttribute('alt') ?? '';
      this.$('.h').textContent = this.getAttribute('heading') || ''; this.$('.p').textContent = this.getAttribute('text') || '';
      const r = this.getAttribute('ratio'); r ? this.style.setProperty('--ratio', r.replace(':', ' / ')) : this.style.removeProperty('--ratio');
      this.toggleAttribute('data-no-text', !this.getAttribute('heading') && !this.getAttribute('text') && !this.hasSlot());
    }
  }
  define('sav-slide', SavSlide);

  /* The seek and volume bars of the players: drawn by the library, so they look the same in every browser and follow the style
     (the thumb takes the knob shape); --_p is the filled part, set by mediaFill(). --_mf fill, --_mt track, --_mr ring around the thumb. */
  /* the back and forward buttons: the rewind / fast-forward icon with "10" next to it (Replay keeps the round arrow, Loop the repeat icon) */
  const MEDIA_SKIP = `
    .bar button.skip { display: inline-flex; align-items: center; justify-content: center; gap: .1rem; }
    button.skip .sn { font-size: .68rem; font-weight: 800; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
    button.skip svg * { fill: currentColor; }
  `;
  const MEDIA_RANGE = `
    input.mr { -webkit-appearance: none; appearance: none; height: 1.3rem; margin: 0; padding: 0; background: transparent; cursor: pointer; --_p: 0%; }
    input.mr::-webkit-slider-runnable-track { height: .32rem; border-radius: var(--sav-radius-pill); background: linear-gradient(to right, var(--_mf) var(--_p), var(--_mt) var(--_p)); }
    input.mr::-moz-range-track { height: .32rem; border-radius: var(--sav-radius-pill); background: linear-gradient(to right, var(--_mf) var(--_p), var(--_mt) var(--_p)); }
    input.mr::-webkit-slider-thumb { -webkit-appearance: none; width: .9rem; height: .9rem; margin-top: -.29rem; border: 0; border-radius: var(--sav-knob-radius, 50%); background: var(--_mf);
      box-shadow: 0 0 0 2px var(--_mr); transform: rotate(var(--sav-knob-tilt, 0deg)); transition: transform calc(.15s * var(--sav-motion, 1)); }
    input.mr::-moz-range-thumb { width: .9rem; height: .9rem; border: 0; border-radius: var(--sav-knob-radius, 50%); background: var(--_mf); box-shadow: 0 0 0 2px var(--_mr); transform: rotate(var(--sav-knob-tilt, 0deg)); }
    input.mr:hover::-webkit-slider-thumb { transform: rotate(var(--sav-knob-tilt, 0deg)) scale(1.15); }
    input.mr:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 2px; border-radius: var(--sav-radius-sm); }
  `;
  const mediaFill = (r) => { const min = Number(r.min) || 0, max = Number(r.max) || 1; r.style.setProperty('--_p', `${Math.min(100, Math.max(0, ((Number(r.value) - min) / ((max - min) || 1)) * 100))}%`); };

  /* The "more" menu of the players: when the bar has no room, the controls that do not fit move into a small panel of the library
     (named rows: "Mute", "Speed 1×", the volume bar…), opened by the ⋯ button; with room again they come back to the bar. */
  const MEDIA_MENU = `
    .more { display: inline-grid; }
    .mm { min-width: 12.5rem; padding: .35rem; border-radius: var(--sav-radius); color: var(--sav-color-text); font-family: var(--sav-font); font-size: var(--sav-font-size-sm); flex-direction: column; gap: 2px; }
    .mm:popover-open, .mm.open { display: flex; animation: sav-mm calc(.14s * var(--sav-motion, 1)) var(--sav-easing); }
    @keyframes sav-mm { from { opacity: 0; transform: translateY(4px); } }
    ${panelLayer('.mm')}
    .mm button { display: flex; align-items: center; gap: .65rem; width: 100%; height: 2.25rem; min-width: 0; padding: 0 .6rem; border: 0; border-radius: var(--sav-radius-sm); background: none;
                 color: var(--sav-color-text); font: inherit; font-weight: var(--sav-font-weight-normal); text-align: start; cursor: pointer; }
    .mm button:hover { background: var(--sav-color-surface-2); }
    .mm button:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: -2px; }
    .mm button[aria-pressed="true"] { background: color-mix(in oklab, var(--sav-color-primary) 14%, transparent); }
    .mm button:not(.speed)::after { content: attr(aria-label); }
    .mm button svg, .mm button sav-icon { flex: none; width: 1.1rem; height: 1.1rem; font-size: 1.1rem; color: var(--sav-color-text-muted); }
    .mm .speed { font-weight: var(--sav-font-weight-semibold); }
    .mm .sn { display: none; }
    /* the volume pop-up: a mute switch and the volume bar, above the volume button */
    .vp { align-items: center; gap: .35rem; padding: .35rem .55rem; border-radius: var(--sav-radius); color: var(--sav-color-text); }
    .vp:popover-open, .vp.open { display: flex; animation: sav-mm calc(.14s * var(--sav-motion, 1)) var(--sav-easing); }
    ${panelLayer('.vp')}
    .vp input.vol { width: 7.5rem; --_mf: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); --_mt: var(--sav-color-border); --_mr: var(--sav-color-surface); }
    .vp .vmute { display: inline-grid; place-items: center; width: 2rem; height: 2rem; padding: 0; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); cursor: pointer; }
    .vp .vmute:hover { background: var(--sav-color-surface-2); color: var(--sav-color-text); }
    .vp .vmute:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 1px; }
    .vp .vmute sav-icon { font-size: 1.1rem; }
    .mm .speed::before { content: "Speed"; font-weight: var(--sav-font-weight-normal); margin-inline-end: auto; }
    .mm input.mr { width: calc(100% - 1.2rem); margin: .35rem .6rem; --_mf: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); --_mt: var(--sav-color-border); --_mr: var(--sav-color-surface); }
    .mm .time { padding: .35rem .6rem; color: var(--sav-color-text-muted); }
    @media (prefers-reduced-motion: reduce) { .mm:popover-open, .mm.open { animation: none; } }
  `;
  /** Puts the controls that do not fit in the bar into the menu (order: the first to go first), and back when there is room.
      Each control keeps a placeholder in the bar, so it returns to its place. */
  function mediaFit(bar, menu, more, order, host) {
    if (!bar || !bar.isConnected) return;
    // an entry may be a group (the two 10 s buttons) that moves together, or { el, into, flag }: it goes into its own place
    // (the volume bar into the pop-up of the volume button) and sets flag on the player instead of opening the ⋯ menu
    const entries = order.map((g) => (g && g.el ? { els: [g.el], into: g.into, flag: g.flag } : { els: [].concat(g).filter(Boolean) })).filter((e) => e.els.length);
    for (const e of entries) { if (e.flag) host?.removeAttribute(e.flag); for (const el of e.els) { el._ph ||= (el.after(document.createComment('')), el.nextSibling); if (el.parentElement !== el._ph.parentElement) el._ph.before(el); } }
    more.hidden = true;
    const over = () => bar.scrollWidth > bar.clientWidth + 4; // a few pixels of rounding are not "no room"
    for (const e of entries) {
      if (!over()) break;
      const shown = e.els.filter((el) => !el.hidden); if (!shown.length) continue;
      shown.forEach((el) => (e.into || menu).append(el));
      if (e.flag) host?.setAttribute(e.flag, ''); else more.hidden = false;
    }
    // in natural order in the menu
    [...menu.children].sort((a, b) => (a._ph.compareDocumentPosition(b._ph) & 4 ? -1 : 1)).forEach((c) => menu.append(c));
    if (!menu.children.length) { more.hidden = true; hidePop(menu); more.setAttribute('aria-expanded', 'false'); }
  }
  /** The volume button when the volume bar has no room (data-vol-pop on the player): a press opens a small panel with the bar
      and a mute switch, instead of muting. With room again the bar is back in the line and the button mutes. */
  function mediaVolume(host, btn, pop, media) {
    const isOpen = () => pop.matches(supportsPopover ? ':popover-open' : '.open');
    const close = (back) => { hidePop(pop); btn.setAttribute('aria-expanded', 'false'); document.removeEventListener('pointerdown', out, true); if (back) btn.focus({ preventScroll: true }); };
    const out = (e) => { if (!e.composedPath().includes(pop) && !e.composedPath().includes(btn)) close(false); };
    btn.addEventListener('click', (e) => {
      if (!host.hasAttribute('data-vol-pop')) return;
      e.stopImmediatePropagation();
      if (isOpen()) { close(false); return; }
      showPop(pop); tiltWatch(pop); place(pop, btn, 'top', 8); btn.setAttribute('aria-expanded', 'true');
      document.addEventListener('pointerdown', out, true);
      pop.querySelector('input')?.focus({ preventScroll: true });
    }, { capture: true });
    pop.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); } });
    pop.querySelector('.vmute').addEventListener('click', () => { media.muted = !media.muted; if (!media.muted && media.volume === 0) media.volume = .5; });
    return { close, isOpen };
  }
  /** the controls a player shows: controls="play seek time …" ("none": no controls at all); without it, the usual ones (defaults) */
  const mediaWants = (host, defaults) => {
    const v = (host.getAttribute('controls') || '').split(/[\s,]+/).filter(Boolean);
    return new Set(!v.length ? defaults : v.filter((x) => x !== 'none'));
  };
  /** the ⋯ button and its menu: opens above it, closes on Escape, outside, or a choice that is not a bar */
  function mediaMenu(host, more, menu, onOpen) {
    const close = (back) => { hidePop(menu); more.setAttribute('aria-expanded', 'false'); document.removeEventListener('pointerdown', out, true); if (back) more.focus({ preventScroll: true }); };
    const out = (e) => { if (!e.composedPath().includes(menu) && !e.composedPath().includes(more)) close(false); };
    more.addEventListener('click', () => {
      if (menu.matches(supportsPopover ? ':popover-open' : '.open')) { close(false); return; }
      showPop(menu); tiltWatch(menu); place(menu, more, 'top-end', 6); more.setAttribute('aria-expanded', 'true');
      document.addEventListener('pointerdown', out, true); onOpen?.();
      menu.querySelector('button:not([hidden]), input')?.focus({ preventScroll: true });
    });
    menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); } });
    return close;
  }
  /* ================================================================== sav-video */

  /** A video in a frame with the style's corners, a fixed ratio, a poster with a big play button and a caption (controls: see below). */
  class SavVideo extends SavElement {
    /* A video with its own control bar (the same in every browser and in every style): play, back and forward 10 s, seek, time,
       volume, speed, captions, picture-in-picture, full screen. It hides while playing and comes back on movement or focus.
       Keys: Space/K play, arrows seek and volume, M mute, F full screen, C captions. When the room is short, the controls that do not fit move
       into a ⋯ menu; controls="…" chooses which ones show; native-controls uses the browser's bar instead. */
    static styles = [MEDIA_RANGE, MEDIA_SKIP, FLOAT, MEDIA_MENU, `
      :host { display: block; width: 100%; min-width: 0; }
      figure { margin: 0; display: grid; gap: .5rem; }
      .fr { position: relative; isolation: isolate; aspect-ratio: var(--ratio, 16 / 9); border-radius: var(--sav-radius-lg); overflow: hidden; background: #000; box-shadow: var(--sav-shadow-sm); outline: none; }
      .fr:focus-visible { box-shadow: 0 0 0 var(--sav-focus-width) var(--sav-color-focus); }
      .fr:fullscreen { border-radius: 0; aspect-ratio: auto; }
      video { display: block; width: 100%; height: 100%; object-fit: var(--fit, contain); }
      .play { position: absolute; inset: 0; margin: auto; width: 4.4rem; height: 4.4rem; border: 0; border-radius: var(--sav-knob-radius, 50%); background: var(--sav-color-primary); color: var(--sav-color-on-primary);
              display: grid; place-items: center; cursor: pointer; box-shadow: 0 8px 24px rgb(0 0 0 / .35); transform: rotate(var(--sav-knob-tilt, 0deg)); transition: transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing), opacity calc(.2s * var(--sav-motion, 1)); z-index: 2; }
      .play:hover { transform: rotate(var(--sav-knob-tilt, 0deg)) scale(1.06); }
      /* waiting for the video (a jump to a part not loaded yet, a slow connection): a spinner in the middle, after a moment so a
         short wait does not flash it */
      .wait { position: absolute; inset: 0; margin: auto; z-index: 1; width: 3.6rem; height: 3.6rem; display: grid; place-items: center; border-radius: var(--sav-knob-radius, 50%); background: rgb(0 0 0 / .5);
              color: #fff; font-size: 1.9rem; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity calc(.2s * var(--sav-motion, 1)) var(--sav-easing), visibility 0s linear calc(.2s * var(--sav-motion, 1)); }
      .fr.waiting .wait { opacity: 1; visibility: visible; transition: opacity calc(.2s * var(--sav-motion, 1)) var(--sav-easing) .25s, visibility 0s linear .25s; }
      .fr.waiting .play { opacity: 0; pointer-events: none; }
      .play svg { width: 1.8rem; height: 1.8rem; margin-left: 3px; transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -1)); }
      .play svg * { fill: currentColor; }
      .started .play { opacity: 0; pointer-events: none; }
      /* the end screen: the last frame dimmed, the big button again (same shape and colour as the play button) with "Replay" under it */
      .fr.done::before { content: ""; position: absolute; inset: 0; z-index: 1; background: rgb(0 0 0 / .5); animation: sav-end-in calc(.3s * var(--sav-motion, 1)) var(--sav-easing); }
      .fr.done .play { opacity: 1; pointer-events: auto; translate: 0 -.9rem; }
      .again { display: none; position: absolute; left: 0; right: 0; top: calc(50% + 2.1rem); z-index: 2; text-align: center; color: #fff; font-weight: var(--sav-font-weight-semibold);
               font-size: var(--sav-font-size-md); text-shadow: 0 1px 3px rgb(0 0 0 / .4); pointer-events: none; }
      .fr.done .again { display: block; animation: sav-end-in calc(.3s * var(--sav-motion, 1)) var(--sav-easing); }
      @keyframes sav-end-in { from { opacity: 0; } }
      .play sav-icon { font-size: 1.9rem; width: 1.9rem; height: 1.9rem; transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -1)); }
      .bar { position: absolute; inset: auto 0 0 0; z-index: 3; display: flex; align-items: center; gap: .35rem; padding: 2.2rem .7rem .55rem; color: #fff;
             background: linear-gradient(to top, rgb(0 0 0 / .75), rgb(0 0 0 / .35) 60%, transparent); font-size: .85rem; transition: opacity calc(.25s * var(--sav-motion, 1)), translate calc(.25s * var(--sav-motion, 1)); }
      .fr:not(.started) .bar, .fr.idle .bar { opacity: 0; translate: 0 .4rem; pointer-events: none; }
      .fr.idle { cursor: none; }
      .bar button { display: inline-grid; place-items: center; flex: none; min-width: 2.1rem; height: 2.1rem; padding: 0 .3rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: inherit; font: inherit; font-weight: 700; cursor: pointer;
                    transition: background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .bar button:hover { background: rgb(255 255 255 / .16); }
      .bar button:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
      .bar button[aria-pressed="true"] { background: rgb(255 255 255 / .22); }
      .bar svg { width: 1.2rem; height: 1.2rem; }
      .bar .pp svg * { fill: currentColor; }
      .bar input[type=range] { accent-color: var(--sav-color-primary); cursor: pointer; }
      .seek { flex: 1; min-width: 4rem; }
      .vol { width: 4.5rem; }
      .time { font-variant-numeric: tabular-nums; white-space: nowrap; padding: 0 .3rem; opacity: .95; }
      .speed { font-size: .8rem; min-width: 2.8rem !important; }
      [hidden] { display: none !important; }
      .bar .vol { flex: none; }
      :host([native-controls]) .bar { display: none; }
      /* controls="none": only the video (for a muted loop that plays by itself, for example) */
      :host([data-bare]:not([native-controls])) :is(.bar, .play) { display: none; }
      figcaption { font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); }
      figcaption:empty { display: none; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host([auto-text]) .play { --_eb: var(--sav-color-primary); color: ${AUTO_TEXT}; }
      .bar input.mr { --_mf: #fff; --_mt: rgb(255 255 255 / .32); --_mr: rgb(0 0 0 / .25); }
    `];
    static get observedAttributes() { return ['src', 'poster', 'ratio', 'caption', 'label', 'controls', 'replay-label', 'loop']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const ic = (n) => `<sav-icon name="${n}"></sav-icon>`;
      this.shadowRoot.innerHTML = `<figure part="base"><div class="fr" part="frame" tabindex="-1"><video part="video" preload="metadata" playsinline><slot></slot></video>
        <button type="button" class="play" part="play-button">${svgIcon('play')}</button><span class="wait" part="loading" role="status" aria-label="${esc(T(this, 'Loading'))}" aria-hidden="true"><sav-spinner variant="current" aria-hidden="true"></sav-spinner></span><span class="again" part="replay-label" aria-hidden="true"></span>
        <div class="bar" part="controls">
          <button type="button" class="pp" aria-label="${esc(T(this, 'Play'))}">${svgIcon('play')}</button>
          <button type="button" class="skip back" aria-label="${esc(T(this, 'Back 10 seconds'))}">${svgIcon('rewind')}<span class="sn" aria-hidden="true">10</span></button>
          <button type="button" class="skip fwd" aria-label="${esc(T(this, 'Forward 10 seconds'))}"><span class="sn" aria-hidden="true">10</span>${svgIcon('fast-forward')}</button>
          <span class="time"><span class="cur">0:00</span> / <span class="dur">0:00</span></span>
          <input class="seek mr" type="range" min="0" max="100" step="0.1" value="0" aria-label="${esc(T(this, 'Position'))}">
          <button type="button" class="mute" aria-label="${esc(T(this, 'Mute'))}" aria-pressed="false">${ic('volume-2')}</button>
          <input class="vol mr" type="range" min="0" max="1" step="0.05" value="1" aria-label="${esc(T(this, 'Volume'))}">
          <button type="button" class="speed" aria-label="${esc(T(this, 'Speed {r}', { r: '1×' }))}">1×</button>
          <button type="button" class="loop" aria-label="${esc(T(this, 'Loop'))}" aria-pressed="false"><sav-icon name="repeat"></sav-icon></button>
          <button type="button" class="cc" aria-label="${esc(T(this, 'Captions'))}" aria-pressed="false" hidden>${ic('captions')}</button>
          <button type="button" class="pip" aria-label="${esc(T(this, 'Picture in picture'))}" hidden>${ic('picture-in-picture-2')}</button>
          <button type="button" class="fs" aria-label="${esc(T(this, 'Full screen'))}">${svgIcon('maximize')}</button>
          <button type="button" class="more" aria-label="${esc(T(this, 'More controls'))}" aria-haspopup="true" aria-expanded="false" hidden>${svgIcon('more-horizontal')}</button>
        </div><div class="mm float" part="more-menu" role="group" aria-label="${esc(T(this, 'More controls'))}" ${supportsPopover ? 'popover="manual"' : ''}></div>
        <div class="vp float" part="volume-popup" role="group" aria-label="${esc(T(this, 'Volume'))}" ${supportsPopover ? 'popover="manual"' : ''}><button type="button" class="vmute" aria-label="${esc(T(this, 'Mute'))}" aria-pressed="false">${ic('volume-2')}</button></div></div><figcaption part="caption"></figcaption></figure>`;
      const v = (this.video = this.$('video')), fr = this.$('.fr'), $ = (q) => this.$(q);
      for (const a of ['autoplay', 'muted', 'loop']) if (this.hasAttribute(a)) v[a] = true;
      mediaLoop(this, v, this.$('.loop'));
      if (this.hasAttribute('native-controls')) v.controls = false; // they come on with the first play
      const toggle = () => (v.paused || v.ended ? v.play() : v.pause());
      $('.play').addEventListener('click', () => { if (this.hasAttribute('native-controls')) v.controls = true; v.play(); fr.focus({ preventScroll: true }); });
      $('.pp').addEventListener('click', toggle);
      v.addEventListener('click', () => { if (!this.hasAttribute('native-controls') && !this.hasAttribute('data-bare') && fr.classList.contains('started')) toggle(); });
      $('.back').addEventListener('click', () => (v.currentTime = Math.max(0, v.currentTime - 10)));
      $('.fwd').addEventListener('click', () => (v.currentTime = Math.min(v.duration || 0, v.currentTime + 10)));
      const seek = $('.seek'), vol = $('.vol');
      seek.addEventListener('input', () => { this._seeking = true; $('.cur').textContent = fmtTime(Number(seek.value)); mediaFill(seek); });
      seek.addEventListener('change', () => { v.currentTime = Number(seek.value); this._seeking = false; });
      vol.addEventListener('input', () => { v.volume = Number(vol.value); v.muted = v.volume === 0; mediaFill(vol); });
      $('.mute').addEventListener('click', () => { v.muted = !v.muted; if (!v.muted && v.volume === 0) v.volume = .5; });
      const speeds = [1, 1.25, 1.5, 2, 0.5, 0.75];
      $('.speed').addEventListener('click', () => { const i = (speeds.indexOf(v.playbackRate) + 1) % speeds.length; v.playbackRate = speeds[i]; });
      v.addEventListener('ratechange', () => { const r = `${v.playbackRate}×`; $('.speed').textContent = r; $('.speed').setAttribute('aria-label', T(this, 'Speed {r}', { r })); });
      $('.cc').addEventListener('click', () => { const t = v.textTracks[0]; if (!t) return; t.mode = t.mode === 'showing' ? 'hidden' : 'showing'; $('.cc').setAttribute('aria-pressed', String(t.mode === 'showing')); });
      $('.pip').addEventListener('click', () => (document.pictureInPictureElement ? document.exitPictureInPicture() : v.requestPictureInPicture?.()).catch?.(() => {}));
      // iPhone has no full screen for elements: there only the video itself goes full screen, with the iOS controls
      $('.fs').addEventListener('click', () => {
        if (!fr.requestFullscreen && v.webkitEnterFullscreen) { v.webkitEnterFullscreen(); return; }
        (document.fullscreenElement ? document.exitFullscreen() : fr.requestFullscreen?.())?.catch?.(() => {});
      });
      this._fs = () => { const on = document.fullscreenElement === fr; $('.fs').innerHTML = svgIcon(on ? 'minimize' : 'maximize'); $('.fs').setAttribute('aria-label', on ? T(this, 'Exit full screen') : T(this, 'Full screen')); };
      document.addEventListener('fullscreenchange', this._fs);
      const paint = () => {
        const playing = !v.paused && !v.ended, again = v.ended;
        $('.pp').innerHTML = again ? '<sav-icon name="rotate-ccw"></sav-icon>' : svgIcon(playing ? 'pause' : 'play'); $('.pp').setAttribute('aria-label', again ? this.replayLabel : playing ? T(this, 'Pause') : T(this, T(this, 'Play')));
        const pop = this.hasAttribute('data-vol-pop'), icon = ic(v.muted || v.volume === 0 ? 'volume-x' : 'volume-2');
        $('.mute').innerHTML = icon; $('.mute').setAttribute('aria-label', pop ? 'Volume' : v.muted ? T(this, 'Unmute') : T(this, 'Mute'));
        pop ? ($('.mute').removeAttribute('aria-pressed'), $('.mute').setAttribute('aria-haspopup', 'true')) : ($('.mute').setAttribute('aria-pressed', String(v.muted)), $('.mute').removeAttribute('aria-haspopup'), $('.mute').removeAttribute('aria-expanded'));
        $('.vmute').innerHTML = icon; $('.vmute').setAttribute('aria-pressed', String(v.muted)); $('.vmute').setAttribute('aria-label', v.muted ? T(this, 'Unmute') : T(this, 'Mute'));
        if (!this._seeking) vol.value = v.muted ? 0 : v.volume;
        mediaFill(vol);
      };
      v.addEventListener('play', () => { fr.classList.add('started'); paint(); this.wake(); this.emit('play'); });
      v.addEventListener('pause', () => { paint(); this.wake(); this.emit('pause'); });
      v.addEventListener('ended', () => {
        paint(); this.wake(); this.emit('ended');
        if (v.loop) return;
        // the end screen with its Replay button (loop starts again by itself; not with native controls or without controls)
        if (this.hasAttribute('data-bare') || this.hasAttribute('native-controls')) return;
        fr.classList.add('done'); $('.play').innerHTML = '<sav-icon name="rotate-ccw"></sav-icon>'; $('.play').setAttribute('aria-label', this.replayLabel); $('.again').textContent = this.replayLabel;
      });
      v.addEventListener('play', () => { if (fr.classList.contains('done')) { fr.classList.remove('done'); $('.play').innerHTML = svgIcon('play'); this.sync(); } });
      v.addEventListener('volumechange', paint);
      // waiting for data: the spinner shows (until the video plays again, is paused, ends or fails)
      const wait = (on) => { fr.classList.toggle('waiting', on); $('.wait').setAttribute('aria-hidden', String(!on)); };
      v.addEventListener('waiting', () => wait(true));
      v.addEventListener('seeking', () => { if (v.readyState < 3) wait(true); });
      v.addEventListener('stalled', () => { if (!v.paused && v.readyState < 3) wait(true); });
      for (const ev of ['playing', 'canplay', 'canplaythrough', 'seeked', 'pause', 'ended', 'error', 'emptied']) v.addEventListener(ev, () => { if (ev !== 'seeked' || v.readyState >= 3) wait(false); });
      v.addEventListener('loadedmetadata', () => {
        $('.dur').textContent = fmtTime(v.duration); seek.max = v.duration || 100;
        this._has = { captions: !!v.textTracks.length, pip: !!document.pictureInPictureEnabled && !v.disablePictureInPicture };
        this.controlsShown();
      });
      // the menu of the controls that do not fit, and fitting them again when the player changes size
      const close = mediaMenu(this, $('.more'), $('.mm'), () => this.wake());
      this._vol = mediaVolume(this, $('.mute'), $('.vp'), v); this._paint = paint;
      $('.mm').addEventListener('click', (e) => { if (e.target.closest('.fs, .pip, .cc')) close(false); });
      this._ro = new ResizeObserver(() => this.fit()); this._ro.observe($('.bar'));
      v.addEventListener('timeupdate', () => { if (!this._seeking) seek.value = v.currentTime; mediaFill(seek); $('.cur').textContent = fmtTime(v.currentTime); seek.setAttribute('aria-valuetext', T(this, '{a} of {b}', { a: fmtTime(v.currentTime), b: fmtTime(v.duration) })); });
      // the bar hides while playing and comes back on movement, touch or focus
      fr.addEventListener('pointermove', () => this.wake());
      fr.addEventListener('focusin', () => this.wake());
      fr.addEventListener('keydown', (e) => {
        if (this.hasAttribute('native-controls') || this.hasAttribute('data-bare') || (e.target.matches('input[type=range]') && /Arrow/.test(e.key))) return;
        const k = e.key.toLowerCase(); let used = true;
        if (k === ' ' || k === 'k') { if (e.target.closest('button')) return; toggle(); }
        else if (k === 'arrowleft') v.currentTime = Math.max(0, v.currentTime - 5);
        else if (k === 'arrowright') v.currentTime = Math.min(v.duration || 0, v.currentTime + 5);
        else if (k === 'arrowup') { v.volume = Math.min(1, v.volume + .1); v.muted = false; }
        else if (k === 'arrowdown') v.volume = Math.max(0, v.volume - .1);
        else if (k === 'm') v.muted = !v.muted;
        else if (k === 'f') $('.fs').click();
        else if (k === 'c') $('.cc').click();
        else used = false;
        if (used) { e.preventDefault(); this.wake(); }
      });
      if (v.autoplay) fr.classList.add('started');
      paint(); this.sync(); this.controlsShown();
    }
    /** which controls show: controls="play skip seek time mute volume speed captions pip fullscreen" (default all), then fitted to the room */
    controlsShown() {
      if (!this.video) return;
      // by default: play / pause / replay, the progress bar, the time, mute, the volume and full screen; skip, speed, loop, captions and pip on request
      const want = mediaWants(this, ['play', 'seek', 'time', 'mute', 'volume', 'fullscreen']), has = this._has || { captions: false, pip: false };
      const map = { play: ['.pp'], skip: ['.back', '.fwd'], seek: ['.seek'], time: ['.time'], mute: ['.mute'], volume: ['.vol'], speed: ['.speed'], loop: ['.loop'], captions: ['.cc'], pip: ['.pip'], fullscreen: ['.fs'] };
      for (const [k, qs] of Object.entries(map)) for (const q of qs) { const el = this.$(q); if (el) el.hidden = !want.has(k) || (k in has && !has[k]); }
      // no controls at all (controls="none", or all of them hidden): only the video, no bar and no big play button
      this.toggleAttribute('data-bare', !want.size);
      this.fit();
    }
    /** the controls that do not fit go into the ⋯ menu: first the volume bar, then picture in picture, speed, captions, the 10 s buttons, mute, full screen, the time */
    fit() {
      const $ = (q) => this.$(q), was = this.hasAttribute('data-vol-pop');
      // first the volume bar moves into the pop-up of the volume button; then the others into the ⋯ menu
      mediaFit($('.bar'), $('.mm'), $('.more'), [{ el: $('.vol'), into: $('.vp'), flag: 'data-vol-pop' }, $('.loop'), $('.pip'), $('.speed'), $('.cc'), [$('.back'), $('.fwd')], $('.mute'), $('.fs'), $('.time')], this);
      if (was && !this.hasAttribute('data-vol-pop')) this._vol?.close(false);
      this._paint?.();
    }
    /** Shows the control bar, and hides it again after a while if the video is playing. */
    wake() {
      const fr = this.$('.fr'), v = this.video; fr.classList.remove('idle'); clearTimeout(this._idle);
      const menuOpen = this.$('.mm')?.matches(supportsPopover ? ':popover-open' : '.open') || this._vol?.isOpen();
      if (!v.paused && !v.ended && !menuOpen && !fr.matches(':focus-within:has(.bar :focus-visible)')) this._idle = setTimeout(() => fr.classList.add('idle'), 2600);
    }
    changed(name) { if (name === 'controls') this.controlsShown(); else this.sync(); }
    sync() {
      const v = this.video; if (!v) return;
      const src = this.getAttribute('src'); if (src && v.getAttribute('src') !== src) v.src = src;
      const p = this.getAttribute('poster'); p ? (v.poster = p) : v.removeAttribute('poster');
      v.loop = this.hasAttribute('loop'); this._loopPaint?.();
      const r = this.getAttribute('ratio'); r ? this.style.setProperty('--ratio', r.replace(':', ' / ')) : this.style.removeProperty('--ratio');
      this.$('figcaption').textContent = this.getAttribute('caption') || '';
      this.$('.play').setAttribute('aria-label', T(this, 'Play {name}', { name: this.getAttribute('label') || T(this, 'video') }));
    }
    get replayLabel() { return this.getAttribute('replay-label') || T(this, 'Replay'); }
    play() { return this.video?.play(); } pause() { this.video?.pause(); }
    disconnectedCallback() { if (this._fs) document.removeEventListener('fullscreenchange', this._fs); hidePop(this.$('.mm')); }
  }
  define('sav-video', SavVideo);

  /* ================================================================== sav-audio */


  /** the Loop button of the players: pressed when the media starts again by itself (the loop attribute); a press turns it on or off */
  function mediaLoop(host, media, btn) {
    const paint = () => { const on = media.loop; btn.setAttribute('aria-pressed', String(on)); btn.title = on ? T(btn, 'Loop: on') : T(btn, 'Loop: off'); };
    btn.addEventListener('click', () => { host.toggleAttribute('loop', !media.loop); });
    host._loopPaint = paint; paint();
  }
  const fmtTime = (s) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00');
  /** An audio player in the style, with the controls of the video player: play/pause, back and forward 10 s, a seek bar, time,
      mute and volume, speed; title, artist and cover. Keys (with the focus in the player): Space/K play, ← → 5 s, ↑ ↓ volume, M mute.
      When the room is short, the controls that do not fit move into a ⋯ menu. controls="…" chooses them; native-controls uses the browser's own player. */
  class SavAudio extends SavElement {
    static styles = [MEDIA_RANGE, MEDIA_SKIP, FLOAT, MEDIA_MENU, `
      :host { display: block; width: 100%; min-width: 0; }
      .p { position: relative; isolation: isolate; display: grid; grid-template-columns: auto auto minmax(0, 1fr); grid-template-areas: "cv pp head" "cv pp bar";
           align-items: center; column-gap: .85rem; row-gap: .15rem; padding: .75rem .9rem; outline: none; }
      .p::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius-lg); background: var(--sav-color-surface); background-image: var(--sav-sheen, none);
        border: var(--sav-border-width) solid var(--sav-color-border); box-shadow: var(--sav-shadow-sm); transform: rotate(${PANEL_TILT}); }
      .cv { grid-area: cv; width: 3.4rem; height: 3.4rem; border-radius: var(--sav-radius); object-fit: cover; background: var(--sav-color-surface-2); }
      :host(:not([cover])) .cv { display: none; }
      :host(:not([cover])) .p { grid-template-columns: auto minmax(0, 1fr); grid-template-areas: "pp head" "pp bar"; }
      /* very little room: the cover steps aside, so the bar keeps its space */
      :host { container-type: inline-size; }
      @container (max-width: 17rem) { .cv { display: none; } .p { grid-template-columns: auto minmax(0, 1fr); grid-template-areas: "pp head" "pp bar"; } }
      @container (max-width: 15rem) { .dur { display: none; } .bar .seek { min-width: 2.5rem; } }
      .pp { grid-area: pp; width: 2.7rem; height: 2.7rem; border: 0; border-radius: var(--sav-knob-radius, 50%); background: var(--sav-color-primary); color: var(--sav-color-on-primary); display: grid; place-items: center; cursor: pointer;
            transform: rotate(var(--sav-knob-tilt, 0deg)); transition: transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing), background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .pp:hover { transform: rotate(var(--sav-knob-tilt, 0deg)) scale(1.06); }
      .pp:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 3px; }
      .pp svg { width: 1.15rem; height: 1.15rem; transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -1)); }
      .pp svg * { fill: currentColor; }
      .pp sav-icon { font-size: 1.2rem; width: 1.2rem; height: 1.2rem; transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -1)); }
      .head { grid-area: head; min-width: 0; display: grid; }
      .ti { font-weight: var(--sav-font-weight-semibold); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ar { font-size: var(--sav-font-size-sm); color: var(--sav-color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .ti:empty, .ar:empty { display: none; }
      .bar { grid-area: bar; display: flex; align-items: center; gap: .3rem; min-width: 0; margin-inline-start: -.25rem; font-size: .78rem; color: var(--sav-color-text-muted); font-variant-numeric: tabular-nums; }
      .bar > * { flex: none; }
      .seek { flex: 1; min-width: 3rem; }
      .bar .seek { flex: 1 1 auto; }
      .vol { width: 4.5rem; }
      [hidden] { display: none !important; }
      input.mr { --_mf: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); --_mt: var(--sav-color-border); --_mr: var(--sav-color-surface); }
      .ib { display: inline-grid; place-items: center; min-width: 2rem; height: 2rem; padding: 0 .25rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted);
            font: inherit; font-size: .78rem; font-weight: var(--sav-font-weight-bold); cursor: pointer; transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), color calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .ib:hover { background: var(--sav-color-surface-2); color: var(--sav-color-text); }
      .ib:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 1px; }
      .ib[aria-pressed="true"] { color: var(--sav-color-text); }
      .ib svg, .ib sav-icon { width: 1.1rem; height: 1.1rem; font-size: 1.1rem; }
      .speed { min-width: 2.6rem; }
      .t { white-space: nowrap; }
      /* native-controls: the browser's own player instead */
      audio { display: none; width: 100%; }
      :host([native-controls]) .p { display: none; }
      :host([data-bare]) :is(.bar, .pp) { display: none; }
      :host([data-bare]) .p { grid-template-areas: "cv pp head" "cv pp head"; }
      :host([native-controls]) audio { display: block; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host([auto-text]) .pp { --_eb: var(--sav-color-primary); color: ${AUTO_TEXT}; }
    `];
    static get observedAttributes() { return ['src', 'title', 'artist', 'cover', 'native-controls', 'controls', 'replay-label', 'loop', 'autoplay', 'muted']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const ic = (n) => `<sav-icon name="${n}"></sav-icon>`;
      this.shadowRoot.innerHTML = `<div class="p" part="base" role="group" aria-label="${esc(T(this, 'Audio player'))}"><img class="cv" part="cover" alt="">
        <button type="button" class="pp" part="play-button" aria-label="${esc(T(this, 'Play'))}">${svgIcon('play')}</button>
        <div class="head"><span class="ti" part="title"></span><span class="ar" part="artist"></span></div>
        <div class="bar" part="controls"><button type="button" class="ib skip back" aria-label="${esc(T(this, 'Back 10 seconds'))}">${svgIcon('rewind')}<span class="sn" aria-hidden="true">10</span></button>
          <span class="t cur">0:00</span><input class="seek mr" type="range" min="0" max="100" step="0.1" value="0" aria-label="${esc(T(this, 'Position'))}"><span class="t dur">0:00</span>
          <button type="button" class="ib skip fwd" aria-label="${esc(T(this, 'Forward 10 seconds'))}"><span class="sn" aria-hidden="true">10</span>${svgIcon('fast-forward')}</button><button type="button" class="ib speed" aria-label="${esc(T(this, 'Speed {r}', { r: '1×' }))}">1×</button>
          <button type="button" class="ib loop" aria-label="${esc(T(this, 'Loop'))}" aria-pressed="false"><sav-icon name="repeat"></sav-icon></button>
          <button type="button" class="ib mute" part="mute-button" aria-label="${esc(T(this, 'Mute'))}" aria-pressed="false">${ic('volume-2')}</button><input class="vol mr" type="range" min="0" max="1" step="0.05" value="1" aria-label="${esc(T(this, 'Volume'))}">
          <button type="button" class="ib more" aria-label="${esc(T(this, 'More controls'))}" aria-haspopup="true" aria-expanded="false" hidden>${svgIcon('more-horizontal')}</button></div>
        <div class="mm float" part="more-menu" role="group" aria-label="${esc(T(this, 'More controls'))}" ${supportsPopover ? 'popover="manual"' : ''}></div>
        <div class="vp float" part="volume-popup" role="group" aria-label="${esc(T(this, 'Volume'))}" ${supportsPopover ? 'popover="manual"' : ''}><button type="button" class="vmute" aria-label="${esc(T(this, 'Mute'))}" aria-pressed="false">${ic('volume-2')}</button></div>
      </div><audio part="audio" preload="metadata"><slot></slot></audio>`;
      const a = (this.audio = this.$('audio')), $ = (q) => this.$(q), pp = $('.pp'), seek = $('.seek'), vol = $('.vol');
      tiltWatch($('.p'));
      const toggle = () => (a.paused || a.ended ? a.play() : a.pause());
      pp.addEventListener('click', toggle);
      $('.back').addEventListener('click', () => (a.currentTime = Math.max(0, a.currentTime - 10)));
      $('.fwd').addEventListener('click', () => (a.currentTime = Math.min(a.duration || 0, a.currentTime + 10)));
      seek.addEventListener('input', () => { this._seeking = true; $('.cur').textContent = fmtTime(Number(seek.value)); mediaFill(seek); });
      seek.addEventListener('change', () => { a.currentTime = Number(seek.value); this._seeking = false; });
      vol.addEventListener('input', () => { a.volume = Number(vol.value); a.muted = a.volume === 0; mediaFill(vol); });
      $('.mute').addEventListener('click', () => { a.muted = !a.muted; if (!a.muted && a.volume === 0) a.volume = .5; });
      const speeds = [1, 1.25, 1.5, 2, 0.5, 0.75];
      $('.speed').addEventListener('click', () => { const i = (speeds.indexOf(a.playbackRate) + 1) % speeds.length; a.playbackRate = speeds[i]; });
      a.addEventListener('ratechange', () => { const r = `${a.playbackRate}×`; $('.speed').textContent = r; $('.speed').setAttribute('aria-label', T(this, 'Speed {r}', { r })); });
      const paint = () => {
        const playing = !a.paused && !a.ended;
        const again = a.ended;
        pp.innerHTML = again ? '<sav-icon name="rotate-ccw"></sav-icon>' : svgIcon(playing ? 'pause' : 'play'); pp.setAttribute('aria-label', again ? (this.getAttribute('replay-label') || T(this, 'Replay')) : playing ? T(this, 'Pause') : T(this, 'Play'));
        const pop = this.hasAttribute('data-vol-pop'), icon = ic(a.muted || a.volume === 0 ? 'volume-x' : 'volume-2');
        $('.mute').innerHTML = icon; $('.mute').setAttribute('aria-label', pop ? 'Volume' : a.muted ? T(this, 'Unmute') : T(this, 'Mute'));
        pop ? ($('.mute').removeAttribute('aria-pressed'), $('.mute').setAttribute('aria-haspopup', 'true')) : ($('.mute').setAttribute('aria-pressed', String(a.muted)), $('.mute').removeAttribute('aria-haspopup'), $('.mute').removeAttribute('aria-expanded'));
        $('.vmute').innerHTML = icon; $('.vmute').setAttribute('aria-pressed', String(a.muted)); $('.vmute').setAttribute('aria-label', a.muted ? T(this, 'Unmute') : T(this, 'Mute'));
        vol.value = a.muted ? 0 : a.volume; mediaFill(vol);
      };
      a.addEventListener('play', () => { paint(); this.emit('play'); });
      a.addEventListener('pause', () => { paint(); this.emit('pause'); });
      a.addEventListener('ended', () => { paint(); this.emit('ended'); });
      a.addEventListener('volumechange', paint);
      a.addEventListener('loadedmetadata', () => { $('.dur').textContent = fmtTime(a.duration); seek.max = a.duration || 100; mediaFill(seek); });
      a.addEventListener('timeupdate', () => { if (!this._seeking) seek.value = a.currentTime; mediaFill(seek); $('.cur').textContent = fmtTime(a.currentTime); seek.setAttribute('aria-valuetext', T(this, '{a} of {b}', { a: fmtTime(a.currentTime), b: fmtTime(a.duration) })); });
      // keys with the focus anywhere in the player (the bars keep their own arrows)
      $('.p').addEventListener('keydown', (e) => {
        if (e.target.matches('input[type=range]') && /Arrow|Home|End|Page/.test(e.key)) return;
        const k = e.key.toLowerCase(); let used = true;
        if (k === ' ' || k === 'k') { if (e.target.closest('button')) return; toggle(); }
        else if (k === 'arrowleft') a.currentTime = Math.max(0, a.currentTime - 5);
        else if (k === 'arrowright') a.currentTime = Math.min(a.duration || 0, a.currentTime + 5);
        else if (k === 'arrowup') { a.volume = Math.min(1, a.volume + .1); a.muted = false; }
        else if (k === 'arrowdown') a.volume = Math.max(0, a.volume - .1);
        else if (k === 'm') a.muted = !a.muted;
        else used = false;
        if (used) e.preventDefault();
      });
      mediaMenu(this, $('.more'), $('.mm'));
      mediaLoop(this, a, $('.loop'));
      this._vol = mediaVolume(this, $('.mute'), $('.vp'), a); this._paint = paint;
      this._ro = new ResizeObserver(() => this.fit()); this._ro.observe($('.bar'));
      paint(); mediaFill(seek); this.sync(); this.controlsShown();
    }
    /** which controls show: controls="play skip seek time mute volume speed" (default all), then fitted to the room */
    controlsShown() {
      if (!this.audio) return;
      // by default: play / pause / replay, the progress bar, the time, mute and the volume; skip, speed and loop on request
      const want = mediaWants(this, ['play', 'seek', 'time', 'mute', 'volume']);
      const map = { play: ['.pp'], skip: ['.back', '.fwd'], seek: ['.seek'], time: ['.cur', '.dur'], mute: ['.mute'], volume: ['.vol'], speed: ['.speed'], loop: ['.loop'] };
      for (const [k, qs] of Object.entries(map)) for (const q of qs) { const el = this.$(q); if (el) el.hidden = !want.has(k); }
      // no controls at all: title, artist and cover only (it plays with autoplay or from code)
      this.toggleAttribute('data-bare', !want.size);
      this.fit();
    }
    /** the controls that do not fit go into the ⋯ menu: first the volume bar, then speed, the 10 s buttons, mute */
    fit() {
      const $ = (q) => this.$(q), was = this.hasAttribute('data-vol-pop');
      // first the volume bar moves into the pop-up of the volume button; then the others into the ⋯ menu
      mediaFit($('.bar'), $('.mm'), $('.more'), [{ el: $('.vol'), into: $('.vp'), flag: 'data-vol-pop' }, $('.loop'), $('.speed'), [$('.back'), $('.fwd')], $('.mute')], this);
      if (was && !this.hasAttribute('data-vol-pop')) this._vol?.close(false);
      this._paint?.();
    }
    disconnectedCallback() { hidePop(this.$('.mm')); }
    changed(name) { if (name === 'controls') this.controlsShown(); else this.sync(); }
    sync() {
      const a = this.audio; if (!a) return;
      const src = this.getAttribute('src'); if (src && a.getAttribute('src') !== src) a.src = src;
      a.controls = this.hasAttribute('native-controls');
      // like the video: loop starts again at the end, autoplay (browsers allow it after the person used the page), muted
      for (const x of ['loop', 'autoplay', 'muted']) a[x] = this.hasAttribute(x);
      this._loopPaint?.();
      const t = this.getAttribute('title') || '', ar = this.getAttribute('artist') || '';
      this.$('.ti').textContent = t; this.$('.ar').textContent = ar;
      this.$('.p').setAttribute('aria-label', t ? `Audio: ${t}${ar ? ', ' + ar : ''}` : T(this, 'Audio player'));
      const c = this.getAttribute('cover'); if (c) this.$('.cv').src = c;
    }
    play() { return this.audio?.play(); } pause() { this.audio?.pause(); }
  }
  define('sav-audio', SavAudio);

  /* ================================================================== sav-menu (always visible) */

  /** A menu that stays on the page — a list, a bar or a rail of icons, with submenus — made of the same sav-menu-item as the dropdown, with arrow keys. */
  class SavMenu extends SavElement {
    /* Kinds: a list (sidebar, settings), a bar (orientation="horizontal", submenus drop down), a rail (collapsed: icons only, labels as tooltips,
       submenus fly out to the side; collapsible adds the button that folds it). Any item can hold a submenu: <sav-menu slot="submenu">. */
    static styles = `
      :host { display: block; }
      .m { display: grid; gap: 2px; padding: var(--padding, .35rem); border-radius: var(--sav-radius); }
      :host([appearance="card"]) .m, :host([data-flyout]) .m { border: var(--sav-border-width) solid var(--sav-color-border); background: var(--sav-color-surface); background-image: var(--sav-sheen, none); box-shadow: var(--sav-shadow-sm); }
      :host([data-flyout]) .m { box-shadow: var(--sav-shadow-lg); min-width: 12rem; }
      :host([data-nested]:not([data-flyout])) .m { padding: 2px 0 2px .9rem; }
      :host([orientation="horizontal"]) .m { display: flex; align-items: center; flex-wrap: wrap; }
      :host([collapsed]) { width: max-content; }
      ::slotted(sav-divider) { --spacing: .3rem; }
      :host([orientation="horizontal"]) ::slotted(sav-divider) { align-self: stretch; }
      .tog { display: flex; align-items: center; gap: .6rem; margin: .2rem .3rem 0; padding: .5rem .75rem; border: 0; border-radius: calc(var(--sav-radius) - 2px); background: none; color: var(--sav-color-text-muted); font: inherit; font-size: var(--sav-font-size-sm); cursor: pointer; }
      .tog:hover { background: var(--sav-color-surface-2); color: var(--sav-color-text); } .tog:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: -2px; }
      .tog svg { width: 1.1em; height: 1.1em; flex: none; transition: transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([collapsed]) .tog { justify-content: center; } :host([collapsed]) .tog svg { transform: scaleX(-1); } :host([collapsed]) .tog span { display: none; }
      :host(:not([collapsible])) .tog { display: none; }
      /* a submenu of sav-context-menu: the same panel as the menu it flies out of */
      :host([data-context]) .m { position: relative; gap: 0; padding: .3rem 0; min-width: var(--min-width, 12rem); }
      ${panelLayer(':host([data-context]) .m')}
      /* … opened as an action sheet on a phone: the submenu opens in place, under its item */
      :host([data-context][data-sheet]) .m { padding: 2px 0 2px .9rem; min-width: 0; }
      :host([data-context][data-sheet]) .m::before, :host([data-context][data-sheet]) .m::after { display: none; }
    `;
    static get observedAttributes() { return ['collapsed', 'orientation', 'label', 'auto-text']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<div class="m" part="base" role="${this.slot === 'submenu' ? 'menu' : this.getAttribute('orientation') === 'horizontal' ? 'menubar' : 'menu'}"><slot></slot><button type="button" class="tog" part="collapse-button" aria-label="${esc(T(this, 'Fold the menu'))}">${svgIcon('chevrons-left')}<span>${esc(T(this, 'Fold'))}</span></button></div>`;
      if (this.getAttribute('label')) this.$('.m').setAttribute('aria-label', this.getAttribute('label'));
      this.$('.m').setAttribute('aria-orientation', this.horizontal ? 'horizontal' : 'vertical');
      this.$('.tog').addEventListener('click', () => { this.toggleAttribute('collapsed'); this.emit('sav-toggle', { collapsed: this.hasAttribute('collapsed') }); });
      this.$('slot').addEventListener('slotchange', () => this.sync());
      this.addEventListener('keydown', (e) => this.key(e));
      this.addEventListener('click', (e) => {
        if (this.hasAttribute('data-context')) return; // a submenu of sav-context-menu: the context menu chooses
        const item = e.target.closest('sav-menu-item'); if (!item || item.closest('sav-menu') !== this || item.hasAttribute('disabled')) return;
        const path = e.composedPath(); if (path.slice(0, path.indexOf(item)).some((n) => n.slot === 'submenu')) return; // a click inside the item's own submenu
        if (item.hasSubmenu) { this.openItem(item, !item.open); return; }
        if (item.getAttribute('type') === 'checkbox') item.checked = !item.checked;
        if (this.hasAttribute('selectable') || this.root.hasAttribute('selectable')) this.root.markCurrent(item);
        this.emit('sav-select', { item, value: item.value });
        if (this.hasAttribute('data-flyout')) { const p = this.parentElement; this.closest('sav-menu:not([data-nested])')?.closeFlyouts(); p?.focus(); }
      });
      this._out = (e) => { if (!e.composedPath().includes(this)) this.closeFlyouts(); };
      if (!this.hasAttribute('data-nested') && this.slot !== 'submenu') document.addEventListener('click', this._out);
      this.sync();
    }
    disconnectedCallback() { document.removeEventListener('click', this._out); }
    changed(name, v) {
      if (name === 'label') this.$('.m')?.setAttribute('aria-label', v || '');
      if (name === 'collapsed') this.$('.tog')?.setAttribute('aria-label', v === null ? T(this, 'Fold the menu') : T(this, 'Unfold the menu'));
      this.sync();
    }
    get horizontal() { return this.getAttribute('orientation') === 'horizontal'; }
    /** The outermost menu (submenus ask it whether items are selectable). */
    get root() { let m = this; while (m.parentElement?.closest('sav-menu')) m = m.parentElement.closest('sav-menu'); return m; }
    /** Tells each item how it is shown: in a bar, in a rail, or as a submenu that flies out. */
    sync() {
      const bar = this.horizontal, rail = this.hasAttribute('collapsed') && !bar;
      const own = [...this.querySelectorAll(':scope > sav-menu-item')];
      passAutoText(this.root, own);
      own.forEach((i) => { i.toggleAttribute('data-bar', bar); i.toggleAttribute('data-rail', rail); i.setAttribute('role', i.getAttribute('type') === 'checkbox' ? 'menuitemcheckbox' : 'menuitem'); });
      own.forEach((i) => { const sub = i.querySelector(':scope > sav-menu[slot="submenu"]'); if (!sub) return;
        sub.setAttribute('data-nested', ''); const fly = bar || rail || this.hasAttribute('data-flyout'); sub.toggleAttribute('data-flyout', fly); sub.sync?.(); i.sync?.(); });
      if (rail) own.forEach((i) => i.close?.());
      if (this.hasAttribute('data-context')) tiltWatch(this.$('.m'));
    }
    /** Items that can take the focus at this level (not those inside submenus, not disabled). */
    get items() { return [...this.querySelectorAll('sav-menu-item:not([disabled])')].filter((i) => i.closest('sav-menu') === this); }
    openItem(item, open) {
      if (open && (this.horizontal || this.hasAttribute('collapsed') || this.hasAttribute('data-flyout'))) this.items.forEach((i) => i !== item && (i.open = false)); // one flyout at a time
      item.open = open;
      this.emit('sav-toggle', { item, open });
    }
    closeFlyouts() { this.querySelectorAll('sav-menu[data-flyout]').forEach((m) => m.parentElement && (m.parentElement.open = false)); }
    markCurrent(item) {
      this.querySelectorAll('sav-menu-item').forEach((i) => i.toggleAttribute('current', i === item));
      // the item that holds the current one shows it too (useful when its submenu is closed)
      this.querySelectorAll('sav-menu-item').forEach((i) => i.toggleAttribute('data-has-current', i !== item && i.contains(item)));
    }
    key(e) {
      if (e.defaultPrevented) return;
      const items = this.items, it = e.target.closest('sav-menu-item');
      if (!it || it.closest('sav-menu') !== this) return;
      const cur = items.indexOf(it), bar = this.horizontal, parent = this.slot === 'submenu' ? this.parentElement : null;
      const next = bar ? 'ArrowRight' : 'ArrowDown', prev = bar ? 'ArrowLeft' : 'ArrowUp', into = bar ? 'ArrowDown' : 'ArrowRight';
      const moves = { [next]: cur + 1, [prev]: cur - 1, Home: 0, End: items.length - 1 };
      if (e.key in moves && items.length) { e.preventDefault(); items[(moves[e.key] + items.length) % items.length].focus(); return; }
      if ((e.key === 'Enter' || e.key === ' ') && e.target === it) { e.preventDefault(); it.click(); if (it.hasSubmenu && it.open) it.firstSubItem()?.focus(); return; }
      if (e.key === into && it.hasSubmenu) { e.preventDefault(); this.openItem(it, true); requestAnimationFrame(() => it.firstSubItem()?.focus()); return; }
      if (parent && (e.key === 'Escape' || (!bar && e.key === 'ArrowLeft'))) { e.preventDefault(); parent.open = false; parent.focus(); }
      else if (e.key === 'Escape' && it.open) { e.preventDefault(); it.open = false; }
    }
  }
  define('sav-menu', SavMenu);

  /* ================================================================== sav-bottom-nav */

  /** The bar at the bottom of a phone app: 3–5 destinations with icon and label, a badge, the current one marked.
      More than max-items (5): the first four stay and a fifth, More (three dots; more-label, more-icon), opens an action sheet with the others. A way out,
      not a design: keep the bar to 3–5 destinations whenever you can (hidden destinations are found less). */
  class SavBottomNav extends SavElement {
    static styles = `
      :host { display: block; }
      ::slotted(:is([data-overflow], [hidden])), .more[hidden] { display: none; }
      :host([fixed]) { position: fixed; inset: auto 0 0 0; z-index: 900; }
      @media (min-width: 761px) { :host([fixed][mobile-only]) { display: none; } }
      nav { display: flex; padding: .35rem .4rem calc(.35rem + env(safe-area-inset-bottom)); background: color-mix(in oklab, var(--sav-color-surface) 92%, transparent); background-image: var(--sav-sheen, none);
            border-top: var(--sav-border-width) solid var(--sav-color-border); -webkit-backdrop-filter: saturate(1.6) blur(14px); backdrop-filter: saturate(1.6) blur(14px); box-shadow: 0 -6px 20px rgb(0 0 0 / .06); }
      :host(:not([fixed])) nav { border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius-lg); }
    `;
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<nav part="base" aria-label="${esc(this.getAttribute('label') || T(this, 'Main'))}"><slot></slot>`
        + `<sav-bottom-nav-item class="more" part="more" icon="more-horizontal" data-more hidden></sav-bottom-nav-item></nav>`;
      this.addEventListener('click', (e) => {
        const it = e.target.closest('sav-bottom-nav-item'); if (!it) return;
        if (!it.hasAttribute('href')) { this.querySelectorAll('sav-bottom-nav-item').forEach((x) => x.toggleAttribute('current', x === it)); }
        this.emit('sav-select', { item: it, value: it.getAttribute('value') ?? it.getAttribute('label') });
      });
      this.$('.more').addEventListener('click', () => this.openMore());
      this.$('slot').addEventListener('slotchange', () => this.sync());
      // a destination added, removed, renamed or made current: the bar and More follow
      new MutationObserver(() => this.sync()).observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ['current', 'label', 'icon', 'badge', 'hidden'] });
      this.sync();
    }
    static get observedAttributes() { return ['label', 'max-items', 'more-label', 'more-icon']; }
    changed(name) { if (name === 'label') this.$('nav')?.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Main')); this.sync(); }
    get items() { return [...this.querySelectorAll(':scope > sav-bottom-nav-item')].filter((i) => !i.hidden); }
    /** The destinations in the More sheet: none while they fit, else all but the first max-items − 1. */
    get overflow() { const all = this.items, max = Math.max(2, Number(this.getAttribute('max-items')) || 5); return all.length > max ? all.slice(max - 1) : []; }
    sync() {
      const more = this.$('.more'); if (!more) return;
      const over = this.overflow;
      this.querySelectorAll(':scope > sav-bottom-nav-item').forEach((i) => i.toggleAttribute('data-overflow', over.includes(i)));
      more.hidden = !over.length;
      // More, its words and its icon: more-label and more-icon (default More, three dots)
      more.setAttribute('label', this.getAttribute('more-label') || T(this, 'More'));
      more.setAttribute('icon', this.getAttribute('more-icon') || 'more-horizontal');
      // the current page is among the hidden ones: More shows it (and a dot when one of them has a badge)
      more.toggleAttribute('data-current', over.some((i) => i.hasAttribute('current')));
      more.toggleAttribute('data-dot', over.some((i) => i.getAttribute('badge')));
    }
    /** Opens the sheet with the destinations that do not fit; choosing one is like pressing it in the bar. */
    async openMore() {
      const over = this.overflow; if (!over.length || this._sheet?.open) return;
      let s = this._sheet;
      if (!s) {
        s = this._sheet = document.createElement('sav-action-sheet');
        s.setAttribute('part', 'more-sheet');
        // its own events stay inside: the bar sends sav-select itself
        for (const n of ['sav-show', 'sav-after-show', 'sav-hide', 'sav-after-hide', 'sav-request-close', 'sav-select', 'change']) s.addEventListener(n, (e) => e.target === s && e.stopPropagation());
        this.shadowRoot.append(s);
      }
      s.setAttribute('label', this.getAttribute('more-label') || T(this, 'More'));
      s.replaceChildren(...over.map((it, i) => {
        const m = document.createElement('sav-menu-item');
        m.setAttribute('value', String(i));
        if (it.hasAttribute('current')) m.setAttribute('current', '');
        const ic = document.createElement('sav-icon'); ic.slot = 'prefix'; ic.setAttribute('name', it.getAttribute('icon') || 'circle'); m.append(ic);
        m.append(document.createTextNode(it.getAttribute('label') || ''));
        const b = it.getAttribute('badge');
        if (b) { const sb = document.createElement('sav-badge'); sb.slot = 'suffix'; sb.setAttribute('pill', ''); sb.setAttribute('size', 'sm'); sb.textContent = b; m.append(sb); }
        return m;
      }));
      const more = this.$('.more').shadowRoot?.querySelector('.i');
      more?.setAttribute('aria-expanded', 'true');
      const v = await s.pick();
      more?.setAttribute('aria-expanded', 'false');
      // as if it were pressed in the bar: a link opens, a button becomes current and sends sav-select
      if (v !== null) over[Number(v)]?.shadowRoot?.querySelector('.i')?.click();
    }
  }
  define('sav-bottom-nav', SavBottomNav);

  class SavBottomNavItem extends SavElement {
    static styles = `
      :host { flex: 1; min-width: 0; display: flex; }
      .i { position: relative; isolation: isolate; flex: 1; display: grid; justify-items: center; gap: .15rem; padding: .4rem .2rem; border: 0; background: none; color: var(--sav-color-text-muted);
           font: inherit; font-size: .72rem; font-weight: var(--sav-font-weight-semibold); text-decoration: none; cursor: pointer; min-height: 48px; }
      .ic { position: relative; isolation: isolate; display: grid; place-items: center; width: 3.2rem; height: 1.85rem; }
      .ic::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius-pill); background: transparent; transform: rotate(var(--sav-knob-tilt, 0deg)) scale(.6); opacity: 0; transition: transform calc(.25s * var(--sav-motion, 1)) var(--sav-easing), opacity calc(.2s * var(--sav-motion, 1)); }
      :host(:is([current], [data-current])) .i { color: var(--sav-color-text); }
      :host(:is([current], [data-current])) .ic::before { background: color-mix(in oklab, var(--sav-color-primary) 22%, transparent); transform: rotate(calc(var(--sav-knob-tilt, 0deg) * .5)) scale(1); opacity: 1; box-shadow: ${INK()}; }
      ::slotted(sav-icon), .ic sav-icon { font-size: 1.3rem; }
      .b { position: absolute; top: -.15rem; right: .45rem; }
      .b[dot] { top: .1rem; right: .8rem; }
      .l { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    `;
    static get observedAttributes() { return ['label', 'icon', 'href', 'badge', 'current', 'data-dot']; }
    connectedCallback() { this.render(); }
    changed() { this.render(); }
    render() {
      const href = this.getAttribute('href'), tag = href ? 'a' : 'button';
      const badge = this.getAttribute('badge');
      // More (made by the bar) opens a sheet: a button that says so
      const more = this.hasAttribute('data-more') ? 'aria-haspopup="dialog" aria-expanded="false"' : '';
      this.shadowRoot.innerHTML = `<${tag} class="i" part="base" ${href ? `href="${esc(href)}"` : 'type="button"'} ${this.hasAttribute('current') ? 'aria-current="page"' : ''} ${more}>
        <span class="ic"><sav-icon name="${esc(this.getAttribute('icon') || 'circle')}"></sav-icon>${badge ? `<sav-badge class="b" pill size="sm">${esc(badge)}</sav-badge>` : this.hasAttribute('data-dot') ? '<sav-badge class="b" dot></sav-badge>' : ''}</span><span class="l">${esc(this.getAttribute('label') || '')}</span></${tag}>`;
    }
  }
  define('sav-bottom-nav-item', SavBottomNavItem);

  /* ================================================================== sav-header */

  /** The top bar of a site or app: logo, links, search and actions (avatar, buttons).
      When the header is narrower than breakpoint (its own width, not the window's), the links fold behind a menu button
      and the search folds into a button that opens the field across the whole header, with an X to close it. */
  class SavHeader extends SavElement {
    static styles = `
      /* min-width: 0 lets it shrink in a flex or grid row: too narrow, it folds its links instead of overflowing */
      :host { display: block; position: relative; z-index: 50; min-width: 0; --height: 3.75rem; --padding: 1rem; --search-width: 18rem; }
      :host([sticky]) { position: sticky; top: 0; }
      :host([appearance="floating"]) { padding: .6rem; }
      .bar { position: relative; isolation: isolate; display: flex; align-items: center; gap: .75rem; min-height: var(--height); padding: 0 var(--padding); }
      /* the background is a layer, so it can lean (floating, in Tilt) without the content leaning */
      .bar::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--sav-header-bg, var(--sav-color-surface)); background-image: var(--sav-sheen, none);
        border-bottom: var(--sav-border-width) solid var(--sav-color-border); }
      :host([appearance="transparent"]) .bar::before { background: color-mix(in oklab, var(--sav-color-bg) 80%, transparent); -webkit-backdrop-filter: saturate(1.6) blur(12px); backdrop-filter: saturate(1.6) blur(12px); }
      :host([appearance="plain"]) .bar::before { background: none; border: 0; }
      :host([appearance="floating"]) .bar::before { border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius-lg); box-shadow: var(--sav-shadow-md); transform: rotate(${PANEL_TILT}); }
      .logo { display: flex; align-items: center; flex: none; min-width: 0; }
      ::slotted([slot="logo"]) { display: inline-flex; align-items: center; gap: .55rem; color: var(--sav-color-text); text-decoration: none; font-size: 1.1rem; font-weight: 800; letter-spacing: -.01em; white-space: nowrap; }
      /* the links take the free room, so search and actions always sit on the right; align moves the links inside it */
      .nav { flex: 1 1 auto; display: flex; align-items: center; gap: .2rem; min-width: 0; }
      :host([align="center"]) .nav { justify-content: center; } :host([align="end"]) .nav { justify-content: flex-end; }
      ::slotted(a) { display: inline-flex; align-items: center; gap: .4rem; padding: .45rem .7rem; border-radius: var(--sav-radius-sm); color: var(--sav-color-text-muted); text-decoration: none;
        font-weight: var(--sav-font-weight-semibold); white-space: nowrap; transition: color calc(var(--sav-duration) * var(--sav-motion, 1)), background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      ::slotted(a:hover) { color: var(--sav-color-text); background: var(--sav-color-surface-2); }
      ::slotted(a:focus-visible) { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 1px; }
      /* the current page: the same highlight as the breadcrumb (a tint, a blue tile, an underline, an inked block, glass) */
      ::slotted(a[aria-current="page"]) { color: var(--sav-breadcrumb-current-fg, color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)));
        background: var(--sav-breadcrumb-current-bg, color-mix(in oklab, var(--sav-color-primary) 12%, transparent)); box-shadow: var(--sav-breadcrumb-current-shadow, none); }
      .search { flex: 0 1 var(--search-width); min-width: min(10rem, var(--search-width)); display: flex; align-items: center; gap: .4rem; }
      .search ::slotted(*) { flex: 1; min-width: 0; }
      .actions { display: flex; align-items: center; gap: .5rem; flex: none; }
      .ib { display: none; place-items: center; flex: none; width: 2.4rem; height: 2.4rem; padding: 0; border: 0; border-radius: var(--sav-radius); background: none; color: var(--sav-color-text); cursor: pointer; }
      .ib:hover { background: var(--sav-color-surface-2); } .ib:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 1px; }
      .ib svg { width: 1.3rem; height: 1.3rem; }
      .burger { order: -1; margin-left: -.4rem; } :host([menu-button="end"]) .burger { order: 9; margin: 0 -.4rem 0 0; }
      :host(:not([data-has-nav])) .nav, :host(:not([data-has-search])) .search, :host(:not([data-has-actions])) .actions { display: none; }

      /* narrow: the links become a panel under the header, opened by the menu button */
      :host([data-compact][data-has-nav]) .burger { display: grid; }
      :host([data-compact]) .nav { position: absolute; top: calc(100% + .35rem); left: var(--padding); right: var(--padding); flex-direction: column; align-items: stretch; gap: .1rem; padding: .4rem;
        border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius); background: var(--sav-color-surface); background-image: var(--sav-sheen, none); box-shadow: var(--sav-shadow-lg); }
      :host([data-compact]:not([data-open])) .nav { display: none; }
      :host([data-compact]) ::slotted(a) { padding: .7rem .8rem; }
      :host([data-compact]) .logo { margin-right: auto; } /* logo on the left, the buttons on the right */
      /* folded search: a button; open, the field covers the whole header, with an X */
      :host([data-search-folded][data-has-search]) .search-btn { display: grid; }
      :host([data-search-folded]:not([data-searching])) .search { display: none; }
      :host([data-search-folded]) .search { flex: none; min-width: 0; }
      :host([data-searching]) .search { position: absolute; inset: 0; z-index: 3; display: flex; padding: 0 var(--padding); border-radius: inherit; background: var(--sav-header-bg, var(--sav-color-surface)); }
      :host([appearance="floating"][data-searching]) .search { border-radius: var(--sav-radius-lg); }
      .close { display: none; } :host([data-searching]) .close { display: grid; margin-right: -.4rem; }
      @media (prefers-reduced-motion: reduce) { ::slotted(a) { transition: none; } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${CUR_EB(12)}; }
      /* !important: a link colour set by the page (a { color }) would win over ::slotted; --text-color still sets it */
      :host([auto-text]) ::slotted(a[aria-current="page"]) { color: ${AUTO_TEXT} !important; }
    `;
    static get observedAttributes() { return ['breakpoint', 'search-collapse', 'label']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<header class="bar" part="base">
          <button type="button" class="ib burger" part="menu-button" aria-label="${esc(T(this, 'Open the menu'))}" aria-expanded="false" aria-controls="nav">${svgIcon('menu')}</button>
          <div class="logo" part="logo"><slot name="logo"></slot></div>
          <nav class="nav" id="nav" part="nav" aria-label="${esc(this.getAttribute('label') || T(this, 'Main'))}"><slot></slot></nav>
          <div class="search" part="search" role="search"><slot name="search"></slot><button type="button" class="ib close" part="search-close" aria-label="${esc(T(this, 'Close the search'))}">${svgIcon('x')}</button></div>
          <button type="button" class="ib search-btn" part="search-button" aria-label="${esc(T(this, 'Search'))}" aria-expanded="false">${svgIcon('search')}</button>
          <div class="actions" part="actions"><slot name="actions"></slot></div>
        </header>`;
      tiltWatch(this.$('.bar'));
      this.$$('slot').forEach((sl) => sl.addEventListener('slotchange', () => this.sync()));
      this.$('.burger').addEventListener('click', () => this.toggleMenu());
      this.$('.search-btn').addEventListener('click', () => this.toggleSearch(true));
      this.$('.close').addEventListener('click', () => this.toggleSearch(false));
      // a link chosen in the folded menu closes it
      this.$('.nav slot').addEventListener('click', (e) => { if (e.target.closest('a') && this.hasAttribute('data-compact')) this.toggleMenu(false); });
      this.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (this.hasAttribute('data-searching')) { this.toggleSearch(false); e.stopPropagation(); }
        else if (this.hasAttribute('data-open')) { this.toggleMenu(false); this.$('.burger').focus(); }
      });
      this._out = (e) => { if (this.hasAttribute('data-open') && !e.composedPath().includes(this)) this.toggleMenu(false); };
      document.addEventListener('click', this._out);
      this._ro = new ResizeObserver(() => this.measure()); this._ro.observe(this);
      this.sync(); this.measure();
    }
    disconnectedCallback() { this._ro?.disconnect(); document.removeEventListener('click', this._out); }
    changed(name, v) {
      if (name === 'label') this.$('.nav')?.setAttribute('aria-label', v || T(this, 'Main'));
      this.measure();
    }
    sync() {
      this.toggleAttribute('data-has-nav', this.hasSlot());
      this.toggleAttribute('data-has-search', this.hasSlot('search'));
      this.toggleAttribute('data-has-actions', this.hasSlot('actions'));
      this._need = 0; this.measure(); // new content: measure again what the wide layout needs
    }
    /** Narrow or wide is decided on the header itself, so it works in a sidebar layout or a preview too:
        with breakpoint, below that width; without, when logo, links, search and actions no longer fit on one line. */
    measure() {
      const w = this.getBoundingClientRect().width; if (!w) return;
      const bp = Number(this.getAttribute('breakpoint'));
      const apply = (compact) => {
        const mode = this.getAttribute('search-collapse') || 'auto';
        const folded = mode === 'always' || (mode === 'auto' && compact);
        if (!compact && this.hasAttribute('data-open')) this.toggleMenu(false);
        if (!folded && this.hasAttribute('data-searching')) this.toggleSearch(false);
        this.toggleAttribute('data-compact', compact);
        this.toggleAttribute('data-search-folded', folded);
      };
      if (bp) return apply(w < bp);
      if (this._need && w < this._need) return apply(true);
      // try the wide layout and look whether it overflows; if it does, remember the width it needs
      apply(false);
      const bar = this.$('.bar'), nav = this.$('.nav');
      const over = Math.max(bar.scrollWidth - bar.clientWidth, nav.scrollWidth - nav.clientWidth);
      if (over > 1) { this._need = w + over + 8; apply(true); }
    }
    /** Opens or closes the folded menu (narrow headers only). */
    toggleMenu(open = !this.hasAttribute('data-open')) {
      if (open === this.hasAttribute('data-open')) return;
      if (open) this.toggleSearch(false);
      this.toggleAttribute('data-open', open);
      const b = this.$('.burger'); b.setAttribute('aria-expanded', String(open)); b.setAttribute('aria-label', open ? T(this, 'Close the menu') : T(this, 'Open the menu'));
      this.emit('sav-toggle', { part: 'menu', open });
    }
    /** Opens the folded search across the header (and moves the focus into it) or closes it. */
    toggleSearch(open = !this.hasAttribute('data-searching')) {
      if (open === this.hasAttribute('data-searching')) return;
      if (open) this.toggleMenu(false);
      this.toggleAttribute('data-searching', open);
      this.$('.search-btn').setAttribute('aria-expanded', String(open));
      const field = this.querySelector(':scope > [slot="search"]');
      if (open) requestAnimationFrame(() => (field?.matches('input, sav-search, sav-input') ? field : field?.querySelector('input, sav-search, sav-input, [tabindex]'))?.focus());
      else if (this.hasAttribute('data-search-folded')) this.$('.search-btn').focus({ preventScroll: true });
      this.emit('sav-toggle', { part: 'search', open });
    }
  }
  props(SavHeader, { sticky: Boolean, appearance: String, align: String, menuButton: String });
  define('sav-header', SavHeader);

  /* ================================================================== sav-sortable (drag and drop to reorder) */

  /** Reorders its children by dragging (mouse, touch, pen) or with the keyboard: Space to pick up, arrows to move, Space to drop, Escape to cancel.
      grip shows the drag handle (six dots) in each item, at the start or with grip="end" at the end; handle="grip" lets only that handle drag. */
  class SavSortable extends SavElement {
    static styles = `
      :host { display: grid; gap: var(--gap, .5rem); }
      :host([direction="horizontal"]) { grid-auto-flow: column; justify-content: start; }
      ::slotted(*) { touch-action: none; cursor: grab; transition: transform calc(.18s * var(--sav-motion, 1)) var(--sav-easing), box-shadow calc(.18s * var(--sav-motion, 1)); }
      ::slotted([data-sav-dragging]) { cursor: grabbing; opacity: .92; box-shadow: var(--sav-shadow-lg); z-index: 5; position: relative; transform: rotate(var(--sav-knob-tilt, 0deg)) scale(1.02); }
      ::slotted([data-sav-grabbed]) { outline: var(--sav-focus-width) dashed var(--sav-color-focus); outline-offset: 3px; }
      /* with handle="grip" only the handle drags: the item itself keeps its normal pointer */
      :host([handle="grip"]) ::slotted(*) { cursor: auto; }
      .live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
    `;
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = '<slot></slot><div class="live" aria-live="assertive"></div>';
      this.setAttribute('role', 'list');
      const prep = () => { this.items.forEach((el) => { el.setAttribute('role', 'listitem'); if (!el.hasAttribute('tabindex')) el.tabIndex = 0; el.setAttribute('aria-roledescription', T(this, 'sortable item')); el.setAttribute('aria-describedby', ''); }); this.grips(); };
      this.$('slot').addEventListener('slotchange', prep); prep();
      this.addEventListener('pointerdown', (e) => this.down(e));
      this.addEventListener('keydown', (e) => this.key(e));
    }
    static get observedAttributes() { return ['grip', 'direction', 'handle']; }
    changed() { this.grips(); }
    /** the drag handle in each item (grip, grip="end"): a small icon added as the item's first or last child, left out of screen readers */
    grips() {
      const want = this.hasAttribute('grip'), end = this.getAttribute('grip') === 'end', horiz = this.getAttribute('direction') === 'horizontal', only = this.getAttribute('handle') === 'grip';
      for (const el of [...this.children]) {
        let g = el.querySelector(':scope > [data-sav-grip]');
        if (!want || el.hasAttribute('data-no-drag')) { g?.remove(); continue; }
        if (!g) { g = document.createElement('span'); g.setAttribute('data-sav-grip', ''); g.setAttribute('aria-hidden', 'true'); g.innerHTML = svgIcon('grip-vertical'); }
        g.style.cssText = `display:inline-flex;align-items:center;justify-content:center;flex:none;vertical-align:middle;color:var(--sav-color-text-muted);cursor:${only ? 'grab' : 'inherit'};touch-action:none;`
          + `${end ? 'margin-inline-start:auto;padding-inline-start:.5rem' : 'margin-inline-end:.5rem'};`;
        const svg = g.querySelector('svg'); if (svg) svg.style.cssText = `width:1.1em;height:1.1em;${horiz ? 'transform:rotate(90deg)' : ''}`;
        if (end ? el.lastElementChild !== g : el.firstElementChild !== g) end ? el.append(g) : el.prepend(g);
      }
    }
    get items() { return [...this.children].filter((c) => !c.hasAttribute('data-no-drag')); }
    say(t) { this.$('.live').textContent = t; }
    name(el) { return (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40); }
    down(e) {
      if (e.button) return;
      let el = e.target; while (el && el.parentElement !== this) el = el.parentElement; // the direct child that was grabbed
      if (!el || el.hasAttribute('data-no-drag')) return;
      const handle = this.getAttribute('handle') === 'grip' ? '[data-sav-grip]' : this.getAttribute('handle');
      if (handle ? !e.target.closest(handle) : e.target.closest('input, textarea, select, a, [contenteditable]')) return;
      const horiz = this.getAttribute('direction') === 'horizontal';
      const natural = () => { const t = el.style.translate; el.style.translate = ''; const r = el.getBoundingClientRect(); el.style.translate = t; return r; };
      const start = natural(), sx = e.clientX, sy = e.clientY, from = this.items.indexOf(el); let moved = false;
      const move = (m) => {
        if (!moved && Math.hypot(m.clientX - sx, m.clientY - sy) < 5) return;
        if (!moved) { moved = true; el.setAttribute('data-sav-dragging', ''); document.body.style.userSelect = 'none'; }
        m.preventDefault();
        const p = horiz ? m.clientX : m.clientY;
        const others = this.items.filter((x) => x !== el);
        const target = others.find((o) => { const r = o.getBoundingClientRect(); return p < (horiz ? r.left + r.width / 2 : r.top + r.height / 2); });
        if (target) { if (target !== el.nextElementSibling) this.insertBefore(el, target); } else if (el !== this.lastElementChild) this.append(el);
        const now = natural();
        el.style.translate = horiz ? `${m.clientX - sx - (now.left - start.left)}px 0` : `0 ${m.clientY - sy - (now.top - start.top)}px`;
      };
      const up = () => {
        removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
        document.body.style.userSelect = '';
        if (!moved) return;
        el.removeAttribute('data-sav-dragging'); el.style.translate = '';
        const to = this.items.indexOf(el);
        // a drag is not a click on the item
        const eat = (c) => { c.preventDefault(); c.stopPropagation(); };
        el.addEventListener('click', eat, { capture: true, once: true });
        setTimeout(() => el.removeEventListener('click', eat, { capture: true }), 0);
        if (to !== from) { this.say(T(this, '{name} moved to position {i} of {n}.', { name: this.name(el), i: to + 1, n: this.items.length })); this.emit('sav-sort', { item: el, from, to, order: this.items.map((x) => x.dataset.id ?? this.name(x)) }); }
      };
      addEventListener('pointermove', move, { passive: false }); addEventListener('pointerup', up); addEventListener('pointercancel', up);
    }
    key(e) {
      const el = e.target; if (el.parentElement !== this) return;
      const items = this.items, i = items.indexOf(el); const horiz = this.getAttribute('direction') === 'horizontal';
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (this._grab) { el.removeAttribute('data-sav-grabbed'); const to = i; this.say(T(this, '{name} dropped at position {i} of {n}.', { name: this.name(el), i: to + 1, n: items.length })); if (to !== this._grabFrom) this.emit('sav-sort', { item: el, from: this._grabFrom, to, order: items.map((x) => x.dataset.id ?? this.name(x)) }); this._grab = null; }
        else { this._grab = el; this._grabFrom = i; el.setAttribute('data-sav-grabbed', ''); this.say(T(this, '{name} picked up, position {i} of {n}. Use the arrow keys to move, Space to drop, Escape to cancel.', { name: this.name(el), i: i + 1, n: items.length })); }
        return;
      }
      if (!this._grab) return;
      const d = { ArrowDown: 1, ArrowUp: -1, ArrowRight: horiz ? 1 : 0, ArrowLeft: horiz ? -1 : 0 }[e.key];
      if (e.key === 'Escape') { e.preventDefault(); const back = items[this._grabFrom]; if (back !== el) this.insertBefore(el, this._grabFrom > i ? back.nextElementSibling : back); el.removeAttribute('data-sav-grabbed'); this._grab = null; el.focus(); this.say(T(this, 'Move cancelled.')); return; }
      if (!d) return;
      e.preventDefault();
      const j = i + d; if (j < 0 || j >= items.length) return;
      d > 0 ? items[j].after(el) : items[j].before(el);
      el.focus(); this.say(T(this, '{name}, position {i} of {n}.', { name: this.name(el), i: j + 1, n: items.length }));
    }
  }
  define('sav-sortable', SavSortable);

  /* ================================================================== sav-dropzone */

  /** A place to drop files (or click to choose them): type and size checks, a list of the chosen files; it belongs to forms. */
  class SavDropzone extends SavFormControl {
    static delegatesFocus = false;
    static styles = `
      :host { display: block; }
      .z { position: relative; isolation: isolate; display: grid; justify-items: center; gap: .4rem; padding: 1.6rem 1rem; text-align: center; cursor: pointer; color: var(--sav-color-text-muted); }
      .z::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius-lg); border: calc(var(--sav-border-width) + 1px) dashed var(--sav-color-border-strong); background: var(--sav-color-surface); transform: rotate(${PANEL_TILT}); transition: border-color calc(var(--sav-duration) * var(--sav-motion, 1)), background calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .z:hover::before, .z.over::before { border-color: var(--sav-color-primary); background: color-mix(in oklab, var(--sav-color-primary) 7%, var(--sav-color-surface)); }
      .z:focus-visible { outline: none; } .z:focus-visible::before { box-shadow: 0 0 0 3px color-mix(in oklab, var(--sav-color-primary) 30%, transparent); }
      .z sav-icon { font-size: 1.8rem; color: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); }
      .t { color: var(--sav-color-text); font-weight: var(--sav-font-weight-semibold); }
      .h { font-size: var(--sav-font-size-sm); }
      .h:empty { display: none; }
      ul { list-style: none; margin: .6rem 0 0; padding: 0; display: grid; gap: .35rem; }
      li { display: flex; align-items: center; gap: .5rem; padding: .45rem .6rem; border-radius: var(--sav-radius-sm); background: var(--sav-color-surface-2); font-size: var(--sav-font-size-sm); }
      li span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      li small { color: var(--sav-color-text-muted); }
      li button { display: inline-flex; padding: .2rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); cursor: pointer; }
      li button:hover { color: var(--sav-color-danger); }
      li svg { width: 1rem; height: 1rem; }
      .err { color: var(--sav-color-danger); font-size: var(--sav-font-size-sm); margin-top: .4rem; }
      .err:empty { display: none; }
      input { display: none; }
    `;
    static get observedAttributes() { return [...FC, 'accept', 'multiple', 'max-size', 'label', 'help', 'kind']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.files = [];
      this.shadowRoot.innerHTML = `<div class="z" part="base" role="button" tabindex="0"><sav-icon name="upload"></sav-icon><span class="t"></span><span class="h"></span></div>
        <input type="file"><div class="err" role="alert"></div><ul part="files"></ul>`;
      const z = this.$('.z'), inp = this.$('input');
      tiltWatch(z);
      z.addEventListener('click', () => { if (this.kind !== 'data') inp.click(); });
      z.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && this.kind !== 'data') { e.preventDefault(); inp.click(); } });
      inp.addEventListener('change', () => { this.add([...inp.files]); inp.value = ''; });
      for (const ev of ['dragenter', 'dragover']) z.addEventListener(ev, (e) => { e.preventDefault(); z.classList.add('over'); });
      for (const ev of ['dragleave', 'drop']) z.addEventListener(ev, () => z.classList.remove('over'));
      z.addEventListener('drop', (e) => { e.preventDefault(); this.drop(e.dataTransfer); });
      // a paste (Cmd/Ctrl+V) while the zone has focus works like a drop
      z.addEventListener('paste', (e) => { e.preventDefault(); this.drop(e.clipboardData); });
      this.$('ul').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.d !== undefined) this.dropped.splice(Number(b.dataset.d), 1); else this.files.splice(Number(b.dataset.i), 1); this.update(true); });
      this.sync();
    }
    changed() { this.sync(); }
    sync() {
      const inp = this.$('input'); if (!inp) return;
      inp.accept = this.getAttribute('accept') || ''; inp.multiple = this.hasAttribute('multiple');
      const k = this.kind;
      this.$('.t').textContent = this.getAttribute('label') || (k === 'data' ? T(this, 'Drop text or links here, or paste them') : k === 'any' ? T(this, 'Drop files, text or links here') : this.hasAttribute('multiple') ? T(this, 'Drop files here or click to choose') : T(this, 'Drop a file here or click to choose'));
      this.$('.z sav-icon').setAttribute('name', k === 'data' ? 'clipboard' : 'upload');
      this.$('.h').textContent = this.getAttribute('help') || '';
      this.$('.z').setAttribute('aria-label', this.$('.t').textContent);
      this.update(false);
    }
    /** What can be dropped: files (default), data (text, links, HTML from other pages and apps) or any. */
    get kind() { const k = this.getAttribute('kind'); return k === 'data' || k === 'any' ? k : 'files'; }
    drop(dt) {
      if (!dt) return;
      const files = [...(dt.files || [])];
      if (files.length && this.kind !== 'data') { this.add(files); return; }
      if (this.kind === 'files') { this.$('.err').textContent = files.length ? '' : 'Only files can be dropped here'; return; }
      const url = (dt.getData('text/uri-list') || '').split('\n').find((l) => l && !l.startsWith('#')) || '';
      const html = dt.getData('text/html') || '', text = dt.getData('text/plain') || '';
      if (!url && !text && !html) return;
      const item = { kind: url ? 'url' : 'text', url, text: text || url, html };
      if (!this.emit('sav-drop', item, true)) return;
      this.dropped = this.hasAttribute('multiple') ? [...(this.dropped || []), item] : [item];
      this.$('.err').textContent = '';
      this.update(true);
    }
    accepts(f) {
      const acc = (this.getAttribute('accept') || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
      if (!acc.length) return true;
      return acc.some((a) => (a.startsWith('.') ? f.name.toLowerCase().endsWith(a) : a.endsWith('/*') ? f.type.startsWith(a.slice(0, -1)) : f.type === a));
    }
    add(list) {
      const max = Number(this.getAttribute('max-size')) || 0; const bad = [];
      for (const f of list) {
        if (!this.accepts(f)) { bad.push(T(this, '{name}: this type is not accepted', { name: f.name })); continue; }
        if (max && f.size > max) { bad.push(T(this, '{name}: larger than {size}', { name: f.name, size: fmtSize(max) })); continue; }
        if (this.hasAttribute('multiple')) this.files.push(f); else this.files = [f];
      }
      this.$('.err').textContent = bad.join(' · ');
      this.update(true);
    }
    update(fire) {
      this.dropped ||= [];
      this.$('ul').innerHTML = this.files.map((f, i) => `<li><sav-icon name="file"></sav-icon><span>${esc(f.name)}</span><small>${fmtSize(f.size)}</small><button type="button" data-i="${i}" aria-label="${esc(T(this, 'Remove {name}', { name: f.name }))}">${svgIcon('x')}</button></li>`).join('')
        + this.dropped.map((d, i) => `<li><sav-icon name="${d.kind === 'url' ? 'link' : 'type'}"></sav-icon><span>${esc(d.kind === 'url' ? d.url : d.text)}</span><small>${d.kind === 'url' ? T(this, 'link') : T(this, 'text')}</small><button type="button" data-d="${i}" aria-label="${esc(T(this, 'Remove'))}">${svgIcon('x')}</button></li>`).join('');
      const fd = new FormData(); const name = this.getAttribute('name') || 'files';
      this.files.forEach((f) => fd.append(name, f));
      this.dropped.forEach((d) => fd.append(name, d.kind === 'url' ? d.url : d.text));
      const any = this.files.length + this.dropped.length;
      this.internals.setFormValue(any ? fd : null);
      if (this.required && !any) this.internals.setValidity({ valueMissing: true }, T(this, 'Choose a file.'), this.$('.z')); else this.internals.setValidity({});
      if (fire) this.emit('change', { files: [...this.files], items: [...this.dropped] });
    }
    formResetCallback() { this.files = []; this.dropped = []; this.update(false); }
  }
  const fmtSize = (b) => (b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`);
  define('sav-dropzone', SavDropzone);

  /* ================================================================== sav-showcase */

  /** A page section: screenshots on one side (one or two desktops, one to three phones, or both), label, title, text and buttons on the other.
      desktop and mobile take one address or several separated by spaces; their -alt attributes describe them, separated by |. */
  class SavShowcase extends SavElement {
    static styles = `
      :host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
      .s { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: clamp(1.5rem, 5vw, 4rem); align-items: center; }
      :host([reverse]) .media { order: 2; }
      .media { position: relative; isolation: isolate; min-height: 10rem; }
      .media::before { content: ""; position: absolute; inset: 10% 2% 0 4%; z-index: -1; border-radius: var(--sav-radius-lg); background: color-mix(in oklab, var(--sav-color-primary) 18%, transparent); transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -.4)); }
      .desk { position: relative; border-radius: calc(var(--sav-radius-lg) * .8); overflow: hidden; border: var(--sav-border-width) solid var(--sav-color-border); background: var(--sav-color-surface); box-shadow: var(--sav-shadow-lg); }
      .desk::before { content: ""; display: block; height: 1.5rem; background: var(--sav-color-surface-2) radial-gradient(circle, #ff6159 3.5px, transparent 4.5px) .75rem 50% / 12px 12px no-repeat; border-bottom: var(--sav-border-width) solid var(--sav-color-border); }
      .desk img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }
      .phone { position: relative; padding: 5px; border-radius: 1.3rem; background: #111; box-shadow: var(--sav-shadow-lg); }
      .phone img { display: block; width: 100%; aspect-ratio: 9 / 19.5; object-fit: cover; object-position: top; border-radius: 1rem; }
      /* desktops: one, or two overlapping */
      .desks { position: relative; }
      .d2 .desk:first-child { width: 86%; }
      .d2 .desk:nth-child(2) { position: absolute; width: 70%; right: 0; bottom: -12%; }
      /* phones next to a desktop: small, in a row on the bottom right */
      .with-desk { padding: 1rem 1.5rem 2.2rem 0; }
      .with-desk .phones { position: absolute; right: 0; bottom: 0; display: flex; align-items: flex-end; gap: .6rem; width: calc(var(--n) * 24%); }
      .with-desk .phone { flex: 1; transform: rotate(calc(var(--sav-knob-tilt, 0deg) * .4)); }
      .with-desk.d2 { padding-bottom: 4rem; }
      /* phones alone: a row, the middle one in front */
      .only-phones { padding: 1.2rem; }
      .only-phones .phones { display: flex; justify-content: center; align-items: center; }
      .only-phones .phone { width: min(46%, 13rem); }
      .only-phones.p2 .phone:first-child { transform: rotate(calc(var(--sav-knob-tilt, 0deg) * -.5)) translateY(6%); margin-right: -6%; z-index: 0; }
      .only-phones.p2 .phone:last-child { transform: rotate(calc(var(--sav-knob-tilt, 0deg) * .5)); z-index: 1; }
      .only-phones.p3 .phone { width: min(34%, 11rem); }
      .only-phones.p3 .phone:nth-child(1) { transform: scale(.86) rotate(calc(var(--sav-knob-tilt, 0deg) * -.6)); margin-right: -9%; z-index: 0; }
      .only-phones.p3 .phone:nth-child(2) { z-index: 2; }
      .only-phones.p3 .phone:nth-child(3) { transform: scale(.86) rotate(calc(var(--sav-knob-tilt, 0deg) * .6)); margin-left: -9%; z-index: 1; }
      .only-desk { padding: 1rem 0 1.5rem; }
      .txt { display: grid; gap: 1rem; justify-items: start; }
      .ey:empty { display: none; }
      .h { margin: 0; font-size: clamp(1.6rem, 3vw, 2.3rem); line-height: 1.15; letter-spacing: -.02em; font-weight: var(--sav-font-weight-bold); }
      .h:empty { display: none; }
      .p { margin: 0; color: var(--sav-color-text-muted); font-size: 1.05rem; line-height: 1.6; }
      .p:empty { display: none; }
      .act { display: flex; flex-wrap: wrap; gap: .6rem; }
      /* one column when the showcase itself is narrow (a phone, but also a narrow column on a wide screen) */
      @container (max-width: 760px) { .s { grid-template-columns: 1fr; } :host([reverse]) .media { order: 0; } }
    `;
    static get observedAttributes() { return ['desktop', 'mobile', 'desktop-alt', 'mobile-alt', 'heading', 'text', 'eyebrow']; }
    connectedCallback() { this.render(); }
    changed() { this.render(); }
    render() {
      const list = (a, max) => (this.getAttribute(a) || '').trim().split(/\s+/).filter(Boolean).slice(0, max);
      const alts = (a) => (this.getAttribute(a) || '').split('|').map((x) => x.trim());
      const desks = list('desktop', 2), phones = list('mobile', 3), dAlt = alts('desktop-alt'), mAlt = alts('mobile-alt');
      const deskHtml = desks.map((u, i) => `<div class="desk"><img part="desktop" src="${esc(u)}" alt="${esc(dAlt[i] || '')}" loading="lazy"></div>`).join('');
      const phoneHtml = phones.map((u, i) => `<div class="phone"><img part="mobile" src="${esc(u)}" alt="${esc(mAlt[i] || '')}" loading="lazy"></div>`).join('');
      const cls = desks.length ? `${phones.length ? 'with-desk' : 'only-desk'} d${desks.length}` : `only-phones p${phones.length}`;
      this.shadowRoot.innerHTML = `<section class="s" part="base"><div class="media ${cls}" part="media" style="--n:${phones.length}">${desks.length ? `<div class="desks ${desks.length === 2 ? 'd2' : ''}">${deskHtml}</div>` : ''}${phones.length ? `<div class="phones">${phoneHtml}</div>` : ''}</div>
        <div class="txt" part="text"><span class="ey"></span><h2 class="h"></h2><p class="p"></p><slot></slot><div class="act"><slot name="actions"></slot></div></div></section>`;
      if (!desks.length && !phones.length) this.$('.media').hidden = true;
      this.$('.h').textContent = this.getAttribute('heading') || ''; this.$('.p').textContent = this.getAttribute('text') || '';
      if (this.getAttribute('eyebrow')) { this.$('.ey').innerHTML = '<sav-label></sav-label>'; this.$('.ey sav-label').textContent = this.getAttribute('eyebrow'); }
    }
  }
  define('sav-showcase', SavShowcase);

  /* ================================================================== charts */

  /* Shared by every chart: data from the data attribute (JSON) or the .data property, colours from --sav-chart-1…8,
     redrawn when the width changes, a role="img" summary and a hidden table with the numbers for screen readers. */
  const CHART_CSS = `
    :host { display: block; color: var(--sav-color-text); font-family: var(--sav-font); font-size: .78rem;
      --sav-chart-1: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); --sav-chart-2: var(--sav-color-protected); --sav-chart-3: var(--sav-color-success);
      --sav-chart-4: var(--sav-color-warning); --sav-chart-5: var(--sav-color-danger); --sav-chart-6: #14b8a6; --sav-chart-7: #ec4899; --sav-chart-8: var(--sav-color-neutral); }
    .w { position: relative; }
    svg { display: block; width: 100%; height: auto; overflow: visible; }
    /* grid lines stay quiet in every style (in Brutal the borders are ink: the grid takes a light ink instead) */
    .grid line, .grid polygon { stroke: var(--sav-chart-grid, var(--sav-color-border)); stroke-width: 1; }
    .axis text, .lbl { fill: var(--sav-color-text-muted); }
    .val { fill: var(--sav-color-text); font-weight: 600; }
    .legend { display: flex; flex-wrap: wrap; gap: .3rem 1rem; margin-top: .6rem; font-size: .8rem; color: var(--sav-color-text-muted); }
    .legend span { display: inline-flex; align-items: center; gap: .4rem; }
    .legend i { width: .7rem; height: .7rem; border-radius: var(--sav-knob-radius, 3px); transform: rotate(var(--sav-knob-tilt, 0deg)); }
    :host([no-legend]) .legend, .legend:empty { display: none; }
    .tip { position: absolute; pointer-events: none; padding: .3rem .55rem; border-radius: var(--sav-radius-sm); background: var(--sav-color-tooltip-bg); color: var(--sav-color-tooltip-text);
      font-size: .78rem; white-space: nowrap; transform: translate(-50%, calc(-100% - 8px)); opacity: 0; transition: opacity calc(.12s * var(--sav-motion, 1)); z-index: 2; }
    .tip.on { opacity: 1; }
    .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
    [data-t] { cursor: default; transition: opacity calc(.15s * var(--sav-motion, 1)); }
    svg:hover [data-t]:not(:hover) { opacity: var(--dim, .55); }
    /* entrance: bars grow from their base, lines are drawn, slices, areas, points and cells fade in */
    .enter :is(rect, path, polygon, circle)[data-t], .enter .series { transform-box: fill-box; transform-origin: center; animation: sav-chart-in calc(.5s * var(--sav-motion, 1)) var(--sav-easing) backwards; }
    .enter[data-kind="bar"] rect[data-t] { transform-origin: bottom; animation-name: sav-chart-grow; }
    .enter[data-kind="bar-h"] rect[data-t] { transform-origin: left; animation-name: sav-chart-grow-x; }
    .enter .draw { stroke-dasharray: 1; animation: sav-chart-draw calc(.8s * var(--sav-motion, 1)) var(--sav-easing) backwards; }
    @keyframes sav-chart-in { from { opacity: 0; transform: scale(.9); } }
    @keyframes sav-chart-grow { from { transform: scaleY(0); } }
    @keyframes sav-chart-grow-x { from { transform: scaleX(0); } }
    @keyframes sav-chart-draw { from { stroke-dashoffset: 1; } }
    @media (prefers-reduced-motion: reduce) { .enter * { animation: none !important; } }
  `;
  const nfmt = (v) => (Math.abs(v) >= 1000 ? Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(v) : Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(v));
  const niceMax = (m) => { if (m <= 0) return 1; const p = 10 ** Math.floor(Math.log10(m)); const f = m / p; return ([1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((x) => f <= x) || 10) * p; };
  const col = (i) => `var(--sav-chart-${(i % 8) + 1})`;

  class SavChart extends SavElement {
    static styles = CHART_CSS;
    static get observedAttributes() { return ['data', 'label', 'height']; }
    get data() { if (this._data) return this._data; try { return JSON.parse(this.getAttribute('data') || 'null') || this.defaultData(); } catch { return this.defaultData(); } }
    set data(v) { this._data = v; this._enter = true; this.draw(); }
    defaultData() { return { labels: [], series: [] }; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = `<div class="w" part="base"><div class="svg"></div><div class="tip" aria-hidden="true"></div></div><div class="legend" part="legend"></div><table class="sr"></table>`;
        this._ro = new ResizeObserver(() => { const w = Math.round(this.getBoundingClientRect().width); if (w && w !== this._w) { this._w = w; this.draw(); } });
        this._ro.observe(this);
        this.$('.svg').addEventListener('pointermove', (e) => { const t = e.target.closest('[data-t]'); const tip = this.$('.tip'); if (!t) { tip.classList.remove('on'); return; } const r = this.$('.w').getBoundingClientRect(); tip.textContent = t.dataset.t; tip.style.left = `${e.clientX - r.left}px`; tip.style.top = `${e.clientY - r.top}px`; tip.classList.add('on'); });
        this.$('.svg').addEventListener('pointerleave', () => this.$('.tip').classList.remove('on'));
      }
      this.draw();
    }
    disconnectedCallback() { this._ro?.disconnect(); }
    changed(name) { if (name === 'data') this._enter = true; this.draw(); }
    get W() { return Math.max(240, this._w || this.getBoundingClientRect().width || 480); }
    get H() { return Number(this.getAttribute('height')) || Math.round(Math.min(360, Math.max(200, this.W * 0.55))); }
    /** Series as [{ name, values }]: also accepts { values } (one series) or plain numbers. */
    series() { const d = this.data; if (Array.isArray(d.series)) return d.series.map((s, i) => ({ name: s.name ?? T(this, 'Series {i}', { i: i + 1 }), values: s.values || [], color: s.color })); if (Array.isArray(d.values)) return [{ name: d.name || this.getAttribute('label') || T(this, 'Values'), values: d.values }]; return []; }
    draw() {
      if (!this.$('.svg')) return;
      const svg = this.render(), box = this.$('.svg');
      box.innerHTML = svg;
      // the first drawing and new data animate in; a redraw for a new width does not
      if (this._enter !== false) {
        this._enter = false;
        box.dataset.kind = this.localName === 'sav-chart-bar' ? (this.getAttribute('orientation') === 'horizontal' ? 'bar-h' : 'bar') : '';
        box.classList.add('enter'); clearTimeout(this._et);
        this._et = setTimeout(() => box.classList.remove('enter'), 900 * motion(this) + 50);
      }
      const s = this.$('svg'); s.setAttribute('role', 'img'); s.setAttribute('aria-label', (this.getAttribute('label') || T(this, 'Chart')) + '. ' + this.summary());
      this.$('.legend').innerHTML = this.legendItems().map(([n, c]) => `<span><i style="background:${c}"></i>${esc(n)}</span>`).join('');
      this.$('.legend').setAttribute('aria-hidden', 'true');
      this.$('table').innerHTML = this.tableHtml();
    }
    legendItems() { const ss = this.series(); return ss.length > 1 ? ss.map((s, i) => [s.name, s.color || col(i)]) : []; }
    summary() { const ss = this.series(); return ss.map((s) => T(this, '{name}: {n} values, highest {max}', { name: s.name, n: s.values.length, max: nfmt(Math.max(...s.values)) })).join('; '); }
    tableHtml() {
      const labels = this.data.labels || [], ss = this.series();
      return `<caption>${esc(this.getAttribute('label') || T(this, 'Chart data'))}</caption><tr><th></th>${ss.map((s) => `<th>${esc(s.name)}</th>`).join('')}</tr>` + labels.map((l, i) => `<tr><th>${esc(l)}</th>${ss.map((s) => `<td>${s.values[i] ?? ''}</td>`).join('')}</tr>`).join('');
    }
  }

  /** Bars: vertical or horizontal, grouped or stacked, with spacing, values and the corners of the style. */
  class SavChartBar extends SavChart {
    static get observedAttributes() { return ['data', 'label', 'height', 'orientation', 'stacked', 'gap', 'show-values', 'max']; }
    render() {
      const labels = this.data.labels || [], ss = this.series(); const n = labels.length; if (!n || !ss.length) return '<svg></svg>';
      const horiz = this.getAttribute('orientation') === 'horizontal', stacked = this.hasAttribute('stacked');
      const gap = Math.min(0.9, Math.max(0, Number(this.getAttribute('gap') ?? 0.3)));
      const totals = labels.map((_, i) => (stacked ? ss.reduce((a, s) => a + Math.max(0, s.values[i] || 0), 0) : Math.max(...ss.map((s) => s.values[i] || 0))));
      const max = Number(this.getAttribute('max')) || niceMax(Math.max(...totals));
      const W = this.W, H = horiz ? Math.max(this.H, n * (stacked ? 28 : 18 * ss.length + 12) + 30) : this.H;
      const pad = horiz ? { l: Math.min(140, 12 + Math.max(...labels.map((l) => String(l).length)) * 6.6), r: 36, t: 6, b: 22 } : { l: 40, r: 8, t: 14, b: 28 };
      const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
      const band = (horiz ? ih : iw) / n, inner = band * (1 - gap), barW = stacked ? inner : inner / ss.length;
      const rad = `calc(var(--sav-radius-sm) * .8)`;
      let g = '<g class="grid axis">';
      for (let k = 0; k <= 4; k++) {
        const v = (max / 4) * k;
        if (horiz) { const x = pad.l + (iw * k) / 4; g += `<line x1="${x}" x2="${x}" y1="${pad.t}" y2="${pad.t + ih}"/><text x="${x}" y="${H - 6}" text-anchor="middle">${nfmt(v)}</text>`; }
        else { const y = pad.t + ih - (ih * k) / 4; g += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y}" y2="${y}"/><text x="${pad.l - 6}" y="${y + 4}" text-anchor="end">${nfmt(v)}</text>`; }
      }
      g += '</g><g class="axis">';
      labels.forEach((l, i) => { const c = (horiz ? pad.t : pad.l) + band * i + band / 2; g += horiz ? `<text x="${pad.l - 8}" y="${c + 4}" text-anchor="end">${esc(l)}</text>` : `<text x="${c}" y="${H - 8}" text-anchor="middle">${esc(l)}</text>`; });
      g += '</g><g>';
      const showV = this.hasAttribute('show-values');
      labels.forEach((l, i) => {
        let acc = 0;
        ss.forEach((s, j) => {
          const v = Math.max(0, s.values[i] || 0), len = ((horiz ? iw : ih) * v) / max;
          const start = (horiz ? pad.t : pad.l) + band * i + (band - inner) / 2 + (stacked ? 0 : barW * j);
          const t = `${l} · ${s.name}: ${nfmt(v)}`, c = s.color || col(j);
          if (horiz) { const x = pad.l + ((stacked ? acc : 0) * iw) / max; g += `<rect data-t="${esc(t)}" x="${x}" y="${start}" width="${Math.max(0, len)}" height="${barW - (stacked ? 0 : 2)}" style="fill:${c};rx:${rad};stroke:var(--sav-ink-border, none);stroke-width:1.5;vector-effect:non-scaling-stroke"/>`; if (showV && !stacked) g += `<text class="val" x="${x + len + 5}" y="${start + barW / 2 + 4}">${nfmt(v)}</text>`; }
          else { const y = pad.t + ih - ((stacked ? acc + v : v) * ih) / max; g += `<rect data-t="${esc(t)}" x="${start}" y="${y}" width="${barW - (stacked ? 0 : 2)}" height="${Math.max(0, len)}" style="fill:${c};rx:${rad};stroke:var(--sav-ink-border, none);stroke-width:1.5;vector-effect:non-scaling-stroke"/>`; if (showV && !stacked) g += `<text class="val" x="${start + barW / 2}" y="${y - 5}" text-anchor="middle">${nfmt(v)}</text>`; }
          acc += v;
        });
        if (showV && stacked) { const tot = totals[i]; const c = (horiz ? pad.t : pad.l) + band * i + band / 2; g += horiz ? `<text class="val" x="${pad.l + (tot * iw) / max + 5}" y="${c + 4}">${nfmt(tot)}</text>` : `<text class="val" x="${c}" y="${pad.t + ih - (tot * ih) / max - 5}" text-anchor="middle">${nfmt(tot)}</text>`; }
      });
      return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</g></svg>`;
    }
  }
  define('sav-chart-bar', SavChartBar);

  /** Pie or donut: slices with gaps, percentages, a centre text. Data: { labels, values }. */
  class SavChartPie extends SavChart {
    static get observedAttributes() { return ['data', 'label', 'height', 'type', 'thickness', 'gap', 'show-values', 'center']; }
    defaultData() { return { labels: [], values: [] }; }
    legendItems() { const d = this.data; return (d.labels || []).map((l, i) => [`${l} (${nfmt(d.values[i] || 0)})`, col(i)]); }
    summary() { const d = this.data, tot = (d.values || []).reduce((a, b) => a + b, 0); return (d.labels || []).map((l, i) => `${l} ${Math.round(((d.values[i] || 0) / tot) * 100)}%`).join(', '); }
    tableHtml() { const d = this.data; return `<caption>${esc(this.getAttribute('label') || T(this, 'Chart data'))}</caption>` + (d.labels || []).map((l, i) => `<tr><th>${esc(l)}</th><td>${d.values[i]}</td></tr>`).join(''); }
    render() {
      const d = this.data, vals = (d.values || []).map((v) => Math.max(0, v)), tot = vals.reduce((a, b) => a + b, 0); if (!tot) return '<svg></svg>';
      const S = Math.min(this.W, Number(this.getAttribute('height')) || 260), R = S / 2 - 4, cx = S / 2, cy = S / 2;
      const donut = this.getAttribute('type') === 'donut', th = donut ? Math.min(R * 0.9, Number(this.getAttribute('thickness')) || R * 0.38) : R;
      const gapDeg = Number(this.getAttribute('gap') ?? 1.2), r0 = R - th;
      const pt = (r, a) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
      const slices = vals.filter(Boolean).length;
      /* The gap is a strip of constant width (the width "gap" degrees take at the edge), so it runs
         straight to the centre: each slice's sides are its two radii moved inwards by half the strip. */
      const halfGap = slices > 1 ? R * Math.sin(((Math.max(0, gapDeg) * Math.PI) / 180) / 2) : 0;
      let a0 = 0, g = '';
      vals.forEach((v, i) => {
        const sweep = (v / tot) * Math.PI * 2; if (!sweep) return;
        // a thin slice keeps at least a third of its angle at the edge
        const h = Math.min(halfGap, R * Math.sin(Math.min(sweep, Math.PI) / 6));
        const at = (r) => Math.asin(Math.min(1, h / r)); // angle the half strip takes at radius r
        const dR = at(R), s = a0 + dR, e = a0 + sweep - dR, big = e - s > Math.PI ? 1 : 0;
        const [x1, y1] = pt(R, s), [x2, y2] = pt(R, e);
        // where the two moved sides meet, on the slice's middle line
        const apex = h > 0 ? pt(h / Math.sin(sweep / 2), a0 + sweep / 2) : [cx, cy];
        let path;
        if (slices === 1) path = donut ? `M${cx} ${cy - R}A${R} ${R} 0 1 1 ${cx - 0.01} ${cy - R}ZM${cx} ${cy - r0}A${r0} ${r0} 0 1 0 ${cx + 0.01} ${cy - r0}Z` : `M${cx} ${cy - R}A${R} ${R} 0 1 1 ${cx - 0.01} ${cy - R}Z`;
        else if (r0 > 0 && h < r0 * Math.sin(Math.min(sweep / 2, Math.PI / 2))) {
          const d0 = at(r0), [x3, y3] = pt(r0, a0 + sweep - d0), [x4, y4] = pt(r0, a0 + d0), bigIn = sweep - 2 * d0 > Math.PI ? 1 : 0;
          path = `M${x1} ${y1}A${R} ${R} 0 ${big} 1 ${x2} ${y2}L${x3} ${y3}A${r0} ${r0} 0 ${bigIn} 0 ${x4} ${y4}Z`;
        } else if (sweep > Math.PI && h > 0) {
          // over half the pie the moved sides do not meet: near the centre the slice ends on a small arc around it
          const [fx, fy] = pt(h, a0 + Math.PI / 2), [gx, gy] = pt(h, a0 + sweep - Math.PI / 2);
          path = `M${x1} ${y1}A${R} ${R} 0 ${big} 1 ${x2} ${y2}L${gx} ${gy}A${h} ${h} 0 0 0 ${fx} ${fy}Z`;
        } else path = `M${apex[0]} ${apex[1]}L${x1} ${y1}A${R} ${R} 0 ${big} 1 ${x2} ${y2}Z`;
        const pct = Math.round((v / tot) * 100);
        g += `<path data-t="${esc(d.labels?.[i] ?? '')}: ${nfmt(v)} (${pct}%)" d="${path}" style="fill:${col(i)};stroke:var(--sav-ink-border, none);stroke-width:1.5;vector-effect:non-scaling-stroke" fill-rule="evenodd"/>`;
        if (this.hasAttribute('show-values') && pct >= 5) { const [tx, ty] = pt(r0 + th / 2 || R * 0.62, a0 + sweep / 2); g += `<text x="${tx}" y="${ty + 4}" text-anchor="middle" style="fill:#fff;font-weight:700;paint-order:stroke;stroke:rgb(0 0 0 / .25);stroke-width:2px">${pct}%</text>`; }
        a0 += sweep;
      });
      const ctr = this.getAttribute('center');
      if (donut && ctr) g += `<text x="${cx}" y="${cy + 7}" text-anchor="middle" style="font-size:${Math.round(r0 / 2.6)}px;font-weight:700;fill:var(--sav-color-text)">${esc(ctr)}</text>`;
      return `<svg viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" style="max-width:${S}px;margin:0 auto">${g}</svg>`;
    }
  }
  define('sav-chart-pie', SavChartPie);

  /** Radar (spider web): one axis per label, one shape per series, filled or not. */
  class SavChartRadar extends SavChart {
    static get observedAttributes() { return ['data', 'label', 'height', 'max', 'levels', 'no-fill']; }
    render() {
      const labels = this.data.labels || [], ss = this.series(), n = labels.length; if (n < 3 || !ss.length) return '<svg></svg>';
      const S = Math.min(this.W, Number(this.getAttribute('height')) || 320), cx = S / 2, cy = S / 2, R = S / 2 - 38;
      const max = Number(this.getAttribute('max')) || niceMax(Math.max(...ss.flatMap((s) => s.values))), lv = Number(this.getAttribute('levels')) || 4;
      const pt = (i, r) => { const a = (Math.PI * 2 * i) / n - Math.PI / 2; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
      let g = '<g class="grid">';
      for (let k = 1; k <= lv; k++) g += `<polygon points="${labels.map((_, i) => pt(i, (R * k) / lv).join(',')).join(' ')}" style="fill:none"/>`;
      labels.forEach((_, i) => { const [x, y] = pt(i, R); g += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; });
      g += '</g><g class="axis">';
      labels.forEach((l, i) => { const [x, y] = pt(i, R + 16); g += `<text x="${x}" y="${y + 4}" text-anchor="${Math.abs(x - cx) < 4 ? 'middle' : x > cx ? 'start' : 'end'}">${esc(l)}</text>`; });
      g += '</g>';
      ss.forEach((s, j) => {
        const c = s.color || col(j), pts = labels.map((_, i) => pt(i, (R * Math.max(0, s.values[i] || 0)) / max));
        g += `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" style="fill:${this.hasAttribute('no-fill') ? 'none' : `color-mix(in oklab, ${c} 22%, transparent)`};stroke:${c};stroke-width:2;stroke-linejoin:round"/>`;
        pts.forEach((p, i) => (g += `<circle data-t="${esc(labels[i])} · ${esc(s.name)}: ${nfmt(s.values[i] || 0)}" cx="${p[0]}" cy="${p[1]}" r="4" style="fill:${c};stroke:var(--sav-ink-border, var(--sav-color-surface));stroke-width:2"/>`));
      });
      return `<svg viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" style="max-width:${S}px;margin:0 auto">${g}</svg>`;
    }
  }
  define('sav-chart-radar', SavChartRadar);

  /** Line or area: filled area, line only, smooth curves, points, stacked areas. */
  class SavChartLine extends SavChart {
    static get observedAttributes() { return ['data', 'label', 'height', 'type', 'smooth', 'points', 'stacked', 'max', 'min']; }
    render() {
      const labels = this.data.labels || [], ss = this.series(), n = labels.length; if (n < 2 || !ss.length) return '<svg></svg>';
      const area = this.getAttribute('type') !== 'line', stacked = this.hasAttribute('stacked') && area, smooth = this.hasAttribute('smooth');
      const stack = ss.map((s, j) => s.values.map((v, i) => (stacked ? ss.slice(0, j + 1).reduce((a, x) => a + (x.values[i] || 0), 0) : v || 0)));
      const max = Number(this.getAttribute('max')) || niceMax(Math.max(0, ...stack.flat()));
      const low = Math.min(0, ...stack.flat()), lo = this.getAttribute('min') !== null ? Number(this.getAttribute('min')) : low < 0 ? -niceMax(-low) : 0;
      const W = this.W, H = this.H, pad = { l: 40, r: 10, t: 12, b: 28 }, iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
      const X = (i) => pad.l + (iw * i) / (n - 1), Y = (v) => pad.t + ih - (ih * (v - lo)) / (max - lo);
      const line = (pts) => { if (!smooth) return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(''); let d = `M${pts[0][0]} ${pts[0][1]}`; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; const mx = (x0 + x1) / 2; d += `C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`; } return d; };
      let g = '<g class="grid axis">';
      for (let k = 0; k <= 4; k++) { const y = pad.t + ih - (ih * k) / 4; g += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y}" y2="${y}"/><text x="${pad.l - 6}" y="${y + 4}" text-anchor="end">${nfmt(lo + ((max - lo) / 4) * k)}</text>`; }
      if (lo < 0) g += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${Y(0)}" y2="${Y(0)}" style="stroke:var(--sav-color-border-strong)"/>`;
      const every = Math.ceil(n / Math.max(2, Math.floor(iw / 70)));
      labels.forEach((l, i) => { if (i % every === 0 || i === n - 1) g += `<text x="${X(i)}" y="${H - 8}" text-anchor="middle">${esc(l)}</text>`; });
      g += '</g>';
      const order = stacked ? [...ss.keys()].reverse() : [...ss.keys()];
      order.forEach((j) => {
        const s = ss[j], c = s.color || col(j), pts = stack[j].map((v, i) => [X(i), Y(v)]);
        const base = stacked && j > 0 ? stack[j - 1].map((v, i) => [X(i), Y(v)]).reverse() : [[X(n - 1), Y(0)], [X(0), Y(0)]];
        if (area) g += `<path d="${line(pts)}${stacked && j > 0 ? 'L' + base.map((p) => p.join(' ')).join('L') : `L${X(n - 1)} ${Y(0)}L${X(0)} ${Y(0)}`}Z" style="fill:color-mix(in oklab, ${c} ${stacked ? 55 : 20}%, transparent)"/>`;
        g += `<path class="draw" pathLength="1" d="${line(pts)}" style="fill:none;stroke:${c};stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round"/>`;
        pts.forEach((p, i) => (g += `<circle data-t="${esc(labels[i])} · ${esc(s.name)}: ${nfmt(s.values[i] || 0)}" cx="${p[0]}" cy="${p[1]}" r="${this.hasAttribute('points') ? 3.5 : 9}" style="fill:${this.hasAttribute('points') ? c : 'transparent'};stroke:${this.hasAttribute('points') ? 'var(--sav-color-surface)' : 'none'};stroke-width:2"/>`));
      });
      return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${g}</svg>`;
    }
  }
  define('sav-chart-line', SavChartLine);

  /** Activity grid (a calendar heatmap): one column per week, one square per day, darker when the value (1–100) is higher. */
  class SavChartActivity extends SavChart {
    static get observedAttributes() { return ['data', 'label', 'start', 'end', 'levels', 'week-start', 'locale']; }
    defaultData() { return {}; }
    days() {
      const d = this.data, map = new Map(Array.isArray(d) ? d.map((x) => [x.date, x.value]) : Object.entries(d));
      const end = this.getAttribute('end') ? new Date(this.getAttribute('end') + 'T12:00') : new Date();
      const start = this.getAttribute('start') ? new Date(this.getAttribute('start') + 'T12:00') : new Date(end.getFullYear() - 1, end.getMonth(), end.getDate() + 1, 12);
      const ws = Number(this.getAttribute('week-start') ?? 1);
      const first = new Date(start); first.setDate(first.getDate() - ((first.getDay() - ws + 7) % 7));
      const out = []; for (let t = new Date(first); t <= end; t.setDate(t.getDate() + 1)) { const k = t.toISOString().slice(0, 10); out.push({ date: new Date(t), key: k, value: t < start ? null : Number(map.get(k) ?? 0) }); }
      return out;
    }
    summary() { const ds = this.days().filter((d) => d.value); return T(this, '{n} active days, highest {max}', { n: ds.length, max: Math.max(0, ...ds.map((d) => d.value)) }); }
    legendItems() { return []; }
    tableHtml() { return `<caption>${esc(this.getAttribute('label') || T(this, 'Activity'))}</caption>` + this.days().filter((d) => d.value).map((d) => `<tr><th>${d.key}</th><td>${d.value}</td></tr>`).join(''); }
    render() {
      const ds = this.days(), weeks = Math.ceil(ds.length / 7), lv = Number(this.getAttribute('levels')) || 5;
      const loc = elLocale(this) || safeLocale(document.documentElement.lang);
      const left = 28, top = 18, cell = Math.max(8, Math.min(16, Math.floor((this.W - left) / weeks) - 3)), gap = 3, step = cell + gap;
      const W = left + weeks * step, H = top + 7 * step + 4;
      let g = '<g class="axis">';
      let lastM = -1;
      for (let w = 0; w < weeks; w++) { const d = ds[w * 7]?.date; if (d && d.getMonth() !== lastM && d.getDate() <= 7) { lastM = d.getMonth(); g += `<text x="${left + w * step}" y="11">${new Intl.DateTimeFormat(loc, { month: 'short' }).format(d)}</text>`; } }
      [1, 3, 5].forEach((r) => { const d = ds[r]?.date; if (d) g += `<text x="0" y="${top + r * step + cell - 2}">${new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(d)}</text>`; });
      g += '</g>';
      const rad = 'calc(var(--sav-radius-sm) * .6)';
      ds.forEach((d, i) => {
        if (d.value === null) return;
        const w = Math.floor(i / 7), r = i % 7, k = d.value > 0 ? Math.min(lv, Math.max(1, Math.ceil((Math.min(100, d.value) / 100) * lv))) : 0;
        const fill = k ? `color-mix(in oklab, var(--sav-chart-1) ${Math.round(20 + (80 * k) / lv)}%, var(--sav-color-surface-2))` : 'var(--sav-color-surface-2)';
        g += `<rect data-t="${new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(d.date)}: ${d.value}" x="${left + w * step}" y="${top + r * step}" width="${cell}" height="${cell}" style="fill:${fill};rx:${rad};stroke:var(--sav-color-border);stroke-width:${k ? 0 : 1}"/>`;
      });
      const scale = Array.from({ length: lv + 1 }, (_, k) => `<i style="width:${cell}px;height:${cell}px;display:inline-block;border-radius:2px;background:${k ? `color-mix(in oklab, var(--sav-chart-1) ${Math.round(20 + (80 * k) / lv)}%, var(--sav-color-surface-2))` : 'var(--sav-color-surface-2)'}"></i>`).join('');
      queueMicrotask(() => { this.$('.legend').innerHTML = `<span>Less ${scale} More</span>`; });
      return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:${W}px">${g}</svg>`;
    }
  }
  define('sav-chart-activity', SavChartActivity);

  /** A world map coloured by value (choropleth), or with some countries highlighted; it can zoom on one or more countries. Data: { IT: 40, FR: 12 } (alpha-2 or alpha-3). */
  /** the countries of each continent (alpha-2); Russia belongs to Europe and to Asia, Cyprus to Europe, the Caribbean and Central America to North America */
  const CONTINENTS = {
    africa: 'DZ AO BJ BW BF BI CM CV CF TD KM CG CD CI DJ EG GQ ER ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU YT MA MZ NA NE NG RE RW SH ST SN SC SL SO ZA SS SD SZ TZ TG TN UG EH ZM ZW',
    europe: 'AX AL AD AT BY BE BA BG HR CY CZ DK EE FO FI FR DE GI GR GG HU IS IE IM IT JE XK LV LI LT LU MT MD MC ME NL MK NO PL PT RO RU SM RS SK SI ES SJ SE CH UA GB VA',
    asia: 'AF AM AZ BH BD BT BN KH CN GE HK IN ID IR IQ IL JP JO KZ KW KG LA LB MO MY MV MN MM NP KP OM PK PS PH QA RU SA SG KR LK SY TW TJ TH TL TR TM AE UZ VN YE',
    'north-america': 'AI AG AW BS BB BZ BM BQ VG CA KY CR CU CW DM DO SV GL GD GP GT HT HN JM MQ MX MS NI PA PR BL KN LC MF PM VC SX TT TC US VI',
    'south-america': 'AR BO BV BR CL CO EC FK GF GY PY PE GS SR UY VE',
    oceania: 'AS AU CK FJ PF GU KI MH FM NR NC NZ NU NF MP PW PG PN WS SB TK TO TV UM VU WF',
    antarctica: 'AQ TF HM',
  };
  const NO_ID = { Somaliland: 'africa', 'N. Cyprus': 'europe' }; // shapes of the map without a country code
  /** UN M49 codes, so the browser names each continent in the page language (Europe, Europa, Europe…) */
  const CONTINENT_M49 = { europe: '150', africa: '002', asia: '142', 'north-america': '003', 'south-america': '005', oceania: '009', antarctica: '010' };
  /** names of the continents (browsers rarely name the UN codes): en, it, fr, de, es, pt; other languages get English */
  const CONTINENT_NAMES = {
    en: { europe: 'Europe', africa: 'Africa', asia: 'Asia', 'north-america': 'North America', 'south-america': 'South America', oceania: 'Oceania', antarctica: 'Antarctica' },
    it: { europe: 'Europa', africa: 'Africa', asia: 'Asia', 'north-america': 'America del Nord', 'south-america': 'America del Sud', oceania: 'Oceania', antarctica: 'Antartide' },
    fr: { europe: 'Europe', africa: 'Afrique', asia: 'Asie', 'north-america': 'Amérique du Nord', 'south-america': 'Amérique du Sud', oceania: 'Océanie', antarctica: 'Antarctique' },
    de: { europe: 'Europa', africa: 'Afrika', asia: 'Asien', 'north-america': 'Nordamerika', 'south-america': 'Südamerika', oceania: 'Ozeanien', antarctica: 'Antarktis' },
    es: { europe: 'Europa', africa: 'África', asia: 'Asia', 'north-america': 'América del Norte', 'south-america': 'América del Sur', oceania: 'Oceanía', antarctica: 'Antártida' },
    pt: { europe: 'Europa', africa: 'África', asia: 'Ásia', 'north-america': 'América do Norte', 'south-america': 'América do Sul', oceania: 'Oceania', antarctica: 'Antártida' },
  };
  /** "Europe", "north america", "North-America" → the key of CONTINENTS */
  const contKey = (k) => { const x = String(k).trim().toLowerCase().replace(/[\s_]+/g, '-'); return CONTINENTS[x] ? x : ''; };
  /** the one continent a shape of the map belongs to (Russia: Europe, as in the UN list) */
  const continentOf = (c) => (c.id ? Object.keys(CONTINENTS).find((k) => CONTINENTS[k].split(' ').includes(c.id)) || '' : NO_ID[c.name] || '');
  /** the box of the main land of a country (its largest outline: France without French Guiana, Norway without Svalbard…) */
  const mainBox = (d) => {
    let best = null;
    for (const part of d.split(/(?=M)/)) {
      const n = (part.match(/-?\d+(\.\d+)?/g) || []).map(Number); if (n.length < 4) continue;
      const xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1);
      const b = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
      if (!best || (b[2] - b[0]) * (b[3] - b[1]) > (best[2] - best[0]) * (best[3] - best[1])) best = b;
    }
    return best;
  };
  let worldP;
  const loadWorld = () => (worldP ||= fetch(Sav.mapBase + 'world.json').then((r) => r.json()).catch(() => ({ countries: [], viewBox: '0 0 1000 520' })));
  class SavChartMap extends SavChart {
    static get observedAttributes() { return ['data', 'label', 'height', 'focus', 'highlight', 'antarctica', 'levels', 'locale', 'max', 'region', 'by']; }
    /** by="continent": data and highlight name continents ({ "europe": 40 }) and each continent is one area */
    get byContinent() { return this.getAttribute('by') === 'continent'; }
    /** the name of a country (alpha-2) or of a continent, in the language of the page */
    areaName(k) {
      const loc = elLocale(this);
      if (!CONTINENT_M49[k]) return displayName(loc, 'region', k);
      const own = T(this, CONTINENT_NAMES.en[k]); if (own !== CONTINENT_NAMES.en[k]) return own; // renamed with Sav.addStrings
      // the browser's name when it has one, else the list above (by the language of the page)
      const fromIntl = displayName(loc, 'region', CONTINENT_M49[k]);
      if (fromIntl && fromIntl !== CONTINENT_M49[k]) return fromIntl;
      const lang = String(loc || document.documentElement.lang || navigator.language || 'en').slice(0, 2).toLowerCase();
      return (CONTINENT_NAMES[lang] || CONTINENT_NAMES.en)[k];
    }
    defaultData() { return {}; }
    /** region="europe" (africa, asia, north-america, south-america, oceania, antarctica): the map frames that continent and dims the rest */
    get region() { const r = (this.getAttribute('region') || '').toLowerCase(); return CONTINENTS[r] ? r : ''; }
    connectedCallback() { super.connectedCallback(); loadWorld().then((w) => { this._world = w; this.draw(); }); if (!this._clk) { this._clk = true; this.$('.svg').addEventListener('click', (e) => { const p = e.target.closest('[data-c]'); if (p) this.emit(this.byContinent ? 'sav-continent' : 'sav-country', { code: p.dataset.c, value: this.values()[p.dataset.c] ?? null }); }); } }
    /** Values keyed by alpha-2 (alpha-3 keys are converted). */
    values() { const out = {}; for (const [k, v] of Object.entries(this.data || {})) { if (this.byContinent) { const c = contKey(k); if (c) out[c] = Number(v); continue; } const K = k.toUpperCase(); const c = K.length === 3 ? ISO_COUNTRIES.find((x) => x.a3 === K)?.a2 : K; if (c) out[c] = Number(v); } return out; }
    legendItems() { return []; }
    summary() { const v = Object.entries(this.values()).sort((a, b) => b[1] - a[1]); return v.length ? T(this, this.byContinent ? '{n} continents, highest {name} {max}' : '{n} countries, highest {name} {max}', { n: v.length, name: this.areaName(v[0][0]), max: nfmt(v[0][1]) }) : T(this, 'World map'); }
    tableHtml() { const loc = elLocale(this); return `<caption>${esc(this.getAttribute('label') || T(this, 'Map data'))}</caption>` + Object.entries(this.values()).sort((a, b) => b[1] - a[1]).map(([c, v]) => `<tr><th>${esc(this.areaName(c) || displayName(loc, 'region', c))}</th><td>${v}</td></tr>`).join(''); }
    render() {
      const w = this._world; if (!w) return '<svg viewBox="0 0 1000 520"></svg>';
      const vals = this.values(), by = this.byContinent;
      // highlight: country codes, or continents (europe…): a continent lights all its countries
      const hi = new Set((this.getAttribute('highlight') || '').split(/[\s,]+/).filter(Boolean).flatMap((h) => { const c = contKey(h); return c ? (by ? [c] : CONTINENTS[c].split(' ')) : [h.toUpperCase()]; }));
      const max = Number(this.getAttribute('max')) || Math.max(1, ...Object.values(vals)), lv = Number(this.getAttribute('levels')) || 5, loc = elLocale(this);
      const shade = (v) => { const k = Math.min(lv, Math.max(1, Math.ceil((v / max) * lv))); return `color-mix(in oklab, var(--sav-chart-1) ${Math.round(18 + (82 * k) / lv)}%, var(--sav-color-surface-2))`; };
      let g = '';
      const groups = {};
      const region = this.region, members = region ? new Set(CONTINENTS[region].split(' ')) : null;
      const inRegion = (c) => !members || (c.id ? members.has(c.id) : NO_ID[c.name] === region);
      for (const c of w.countries) {
        if (c.id === 'AQ' && !this.hasAttribute('antarctica') && region !== 'antarctica') continue;
        const v = vals[c.id], on = hi.has(c.id), out = !inRegion(c);
        const fill = v !== undefined ? shade(v) : on ? 'var(--sav-chart-1)' : 'var(--sav-color-surface-2)';
        const name = c.id ? displayName(loc, 'region', c.id) : c.name;
        if (by) { const k = continentOf(c); (groups[k] ||= []).push(c.d); continue; }
        g += `<path d="${c.d}" ${c.id ? `data-c="${c.id}"` : ''} data-t="${esc(name)}${v !== undefined ? ': ' + nfmt(v) : ''}" style="fill:${fill};stroke:var(--sav-color-surface);stroke-width:.5;vector-effect:non-scaling-stroke${out ? ';opacity:.35' : ''}"/>`;
      }
      // by continent: each continent is one shape, filled by its value (or highlighted); its countries are drawn without borders between them
      for (const [k, ds] of Object.entries(groups)) {
        if (!k) continue;
        const v = vals[k], on = hi.has(k), dim = region && k !== region;
        const fill = v !== undefined ? shade(v) : on ? 'var(--sav-chart-1)' : 'var(--sav-color-surface-2)';
        g += `<g data-c="${k}" data-t="${esc(this.areaName(k))}${v !== undefined ? ': ' + nfmt(v) : ''}" style="fill:${fill};stroke:${fill};stroke-width:.6;vector-effect:non-scaling-stroke${dim ? ';opacity:.35' : ''}">${ds.map((d) => `<path d="${d}" style="vector-effect:non-scaling-stroke"/>`).join('')}</g>`;
      }
      const vb = w.viewBox.split(' ').map(Number);
      let box = this.hasAttribute('antarctica') ? vb : [vb[0], vb[1], vb[2], vb[3] * 0.86];
      // a continent: the box around the main land of its countries (Russia only counts for Asia), with a little room
      if (region && !(this.getAttribute('focus') || '').trim()) {
        const boxes = w.countries.filter((c) => inRegion(c) && !(region === 'europe' && c.id === 'RU')).map((c) => mainBox(c.d)).filter(Boolean);
        if (boxes.length) {
          const x0 = Math.min(...boxes.map((b) => b[0])), y0 = Math.min(...boxes.map((b) => b[1])), x1 = Math.max(...boxes.map((b) => b[2])), y1 = Math.max(...boxes.map((b) => b[3]));
          const pad = Math.max(x1 - x0, y1 - y0) * 0.04 + 3;
          box = [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2];
        }
      }
      const focus = (this.getAttribute('focus') || '').toUpperCase().split(/[\s,]+/).filter(Boolean);
      if (focus.length) {
        const nums = w.countries.filter((c) => focus.includes(c.id)).flatMap((c) => (c.d.match(/-?\d+(\.\d+)?/g) || []).map(Number));
        if (nums.length) { const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1); const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys); const pad = Math.max(x1 - x0, y1 - y0) * 0.15 + 4; box = [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2]; }
      }
      const scale = Object.keys(vals).length ? Array.from({ length: lv }, (_, k) => `<i style="width:1.4rem;height:.6rem;display:inline-block;background:color-mix(in oklab, var(--sav-chart-1) ${Math.round(18 + (82 * (k + 1)) / lv)}%, var(--sav-color-surface-2))"></i>`).join('') : '';
      queueMicrotask(() => { this.$('.legend').innerHTML = scale ? `<span>0 ${scale} ${nfmt(max)}</span>` : ''; });
      return `<svg viewBox="${box.map((n) => n.toFixed(1)).join(' ')}" preserveAspectRatio="xMidYMid meet" style="overflow:hidden;max-height:${Number(this.getAttribute('height')) || 480}px">${g}</svg>`;
    }
  }
  define('sav-chart-map', SavChartMap);

  /* ================================================================== sav-breadcrumb */

  class SavBreadcrumbItem extends SavElement {
    /* Each step is a small chip: links get a background on hover, the current page is highlighted the way the style says
       (--sav-breadcrumb-current-*: a tint in Soft, a leaning tile in Tilt, an underline in Sharp, an inked block in Brutal, glass in Glass). */
    static styles = `
      :host { display: inline-flex; align-items: center; min-width: 0; }
      .i { position: relative; isolation: isolate; display: inline-flex; align-items: center; gap: .35rem; padding: .3rem .55rem; color: var(--sav-color-text-muted); text-decoration: none;
           font-size: var(--sav-font-size-md); font-weight: var(--sav-font-weight-semibold); white-space: nowrap; border-radius: var(--sav-radius-sm); transition: color calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .i::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_b, transparent); background-image: var(--_bi, none); box-shadow: var(--_s, none);
           transform: rotate(${TILT}); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
      a.i:hover { color: var(--sav-color-text); --_b: var(--sav-color-surface-2); }
      a.i:hover::before { transform: rotate(calc(${TILT} * var(--sav-tilt-hover, -1))); }
      a.i:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 1px; }
      :host([data-last]) .i { color: var(--sav-breadcrumb-current-fg, color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)));
           --_b: var(--sav-breadcrumb-current-bg, color-mix(in oklab, var(--sav-color-primary) 12%, transparent)); --_bi: var(--sav-sheen, none); --_s: var(--sav-breadcrumb-current-shadow, none); }
      ::slotted(sav-icon) { font-size: 1.05em; }
      .sep { display: inline-flex; margin: 0 .15rem; color: var(--sav-color-text-muted); opacity: .7; font-weight: 600; }
      .sep svg { width: .95em; height: .95em; }
      :host([data-last]) .sep { display: none; }
      :host([data-collapsed]) { display: none; }
      .more { display: none; }
      :host([data-ellipsis]) .more { display: inline-flex; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${CUR_EB(12)}; }
      :host(:is([auto-text], [data-auto-text])[data-last]) .i { color: ${AUTO_TEXT}; }
    `;
    connectedCallback() { this.render(); }
    changed() { this.render(); }
    render() {
      const last = this.hasAttribute('data-last');
      const sep = this.parentElement?.getAttribute('separator');
      const tag = this.href && !last ? 'a' : 'span';
      this.shadowRoot.innerHTML = `<${tag} class="i" part="label" ${tag === 'a' ? `href="${esc(this.href)}"` : ''} ${last ? 'aria-current="page"' : ''}><slot name="prefix"></slot><slot></slot></${tag}><span class="sep" part="separator" aria-hidden="true">${sep ? esc(sep) : svgIcon('chevron-right')}</span>`;
      tiltWatch(this.$('.i'));
    }
  }
  props(SavBreadcrumbItem, { href: String });
  define('sav-breadcrumb-item', SavBreadcrumbItem);

  class SavBreadcrumb extends SavElement {
    static styles = `
      :host { display: block; }
      nav { position: relative; isolation: isolate; display: flex; flex-wrap: wrap; align-items: center; row-gap: .25rem; }
      :host([appearance="contained"]) nav { padding: .3rem .4rem; }
      :host([appearance="contained"]) nav::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius); background: var(--sav-color-surface); background-image: var(--sav-sheen, none);
        border: var(--sav-border-width) solid var(--sav-color-border); box-shadow: var(--sav-shadow-sm); transform: rotate(${PANEL_TILT}); }
      .more { display: inline-flex; align-items: center; padding: .3rem .5rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); font: inherit; font-weight: 700; cursor: pointer; }
      .more:hover { background: var(--sav-color-surface-2); color: var(--sav-color-text); }
      .more[hidden] { display: none; }
      .more + .sep { display: inline-flex; margin: 0 .15rem; color: var(--sav-color-text-muted); opacity: .7; }
      .sep[hidden] { display: none; }
      .sep svg { width: .95em; height: .95em; }
    `;
    static get observedAttributes() { return ['max-items', 'separator', 'auto-text']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<nav part="base" aria-label="${esc(this.getAttribute('label') || T(this, 'Breadcrumb'))}"><slot name="first"></slot><button type="button" class="more" part="more" aria-label="${esc(T(this, 'Show the whole path'))}" hidden>…</button><span class="sep" aria-hidden="true" hidden>${svgIcon('chevron-right')}</span><slot></slot></nav>`;
      this.$('slot:not([name])').addEventListener('slotchange', () => this.sync());
      this.$('.more').addEventListener('click', () => { this._expanded = true; this.sync(); });
      tiltWatch(this.$('nav'));
      this.sync();
    }
    changed() { this.querySelectorAll(':scope > sav-breadcrumb-item').forEach((i) => i.render?.()); this.sync(); }
    /** With max-items, a long path keeps the first and the last ones and hides the middle behind a … button. */
    sync() {
      const items = [...this.querySelectorAll(':scope > sav-breadcrumb-item')];
      items.forEach((it, i) => it.toggleAttribute('data-last', i === items.length - 1));
      passAutoText(this, items);
      const max = Number(this.getAttribute('max-items')) || 0, cut = max > 1 && items.length > max && !this._expanded;
      items.forEach((it, i) => it.toggleAttribute('data-collapsed', cut && i > 0 && i < items.length - (max - 1)));
      const more = this.$('.more'); if (!more) return;
      // the … sits right after the first item
      if (cut) { items[0].slot = 'first'; } else items.forEach((it) => it.removeAttribute('slot'));
      more.hidden = !cut; this.$('.sep').hidden = !cut;
    }
  }
  define('sav-breadcrumb', SavBreadcrumb);

  /* ================================================================== sav-copy-button */

  class SavCopyButton extends SavElement {
    static styles = [SIZES, `
      :host { display: inline-flex; vertical-align: middle; }
      /* background and border on a layer (::before) that leans with the style (Tilt) while the icon and text stay upright */
      button { position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: .4rem; min-width: var(--_h); height: var(--_h); padding: 0 .55rem; margin: 0;
               border: 0; border-radius: var(--sav-radius); background: none; color: var(--sav-color-text-muted);
               font: inherit; font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-semibold); cursor: pointer; transition: color calc(var(--sav-duration) * var(--sav-motion, 1));
               --_cb: var(--sav-color-surface); --_cbd: var(--sav-color-border); }
      button::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_cb); background-image: var(--sav-sheen, none);
               border: var(--sav-border-width) solid var(--_cbd); box-shadow: var(--sav-copy-shadow, none); transform: rotate(${TILT});
               transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.22s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([appearance="ghost"]) button { --_cb: transparent; --_cbd: transparent; }
      :host([appearance="ghost"]) button::before { box-shadow: none; background-image: none; }
      :host([appearance="ghost"]) button:not(:hover):not(.ok):not(.err)::before { transform: none; }
      button:hover { color: var(--sav-color-text); --_cb: var(--sav-color-surface-2); }
      button:hover::before { transform: rotate(calc(${TILT} * var(--sav-tilt-hover, -1))); }
      button:active::before { transform: rotate(calc(${TILT} * var(--sav-tilt-hover, -1))) scale(.94); }
      /* copied: the layer turns green and gives a little "stamp" the other way */
      button.ok { color: var(--sav-color-success); --_cb: color-mix(in oklab, var(--sav-color-success) 14%, var(--sav-color-surface)); --_cbd: color-mix(in oklab, var(--sav-color-success) 45%, transparent); }
      button.ok::before { animation: sav-stamp calc(.32s * var(--sav-motion, 1)) var(--sav-easing); }
      button.err { color: var(--sav-color-danger); --_cbd: color-mix(in oklab, var(--sav-color-danger) 45%, transparent); }
      @keyframes sav-stamp { 40% { transform: rotate(calc(${TILT} * -3)) scale(1.08); } }
      .ic { display: inline-flex; }
      button.ok .ic, button.err .ic { animation: sav-pop-ic calc(.28s * var(--sav-motion, 1)) var(--sav-easing); }
      @keyframes sav-pop-ic { from { transform: scale(.4); opacity: 0; } }
      svg { width: 1.1em; height: 1.1em; }
      .txt { display: none; }
      .has-text .txt { display: inline; }
      button:not(.has-text) { width: var(--_h); padding: 0; gap: 0; }
      @media (prefers-reduced-motion: reduce) { button.ok::before, button.ok .ic, button.err .ic { animation: none; } }
    `];
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<button part="button" type="button" aria-label="${esc(this.getAttribute('copy-label') || T(this, 'Copy'))}"><span class="ic">${svgIcon('copy')}</span><span class="txt"><slot></slot></span><span class="sr" aria-live="polite"></span></button>`;
      this.$('button').addEventListener('click', () => this.copy());
      tiltWatch(this.$('button'));
      const sync = () => this.$('button').classList.toggle('has-text', this.hasSlot());
      this.$('slot').addEventListener('slotchange', sync);
      sync();
    }
    async copy() {
      let text = this.getAttribute('value');
      const from = this.getAttribute('from');
      if (text === null && from) {
        const el = document.getElementById(from);
        text = el ? (('value' in el && typeof el.value === 'string') ? el.value : el.textContent) : '';
      }
      const b = this.$('button'), ic = this.$('.ic'), live = this.$('.sr');
      let ok = true;
      try { await navigator.clipboard.writeText(text ?? ''); }
      catch {
        try { const ta = Object.assign(document.createElement('textarea'), { value: text ?? '' }); ta.style.cssText = 'position:fixed;opacity:0'; document.body.append(ta); ta.select(); ok = document.execCommand('copy'); ta.remove(); }
        catch { ok = false; }
      }
      clearTimeout(this._t);
      b.classList.toggle('ok', ok); b.classList.toggle('err', !ok);
      ic.innerHTML = svgIcon(ok ? 'check' : 'x');
      live.textContent = ok ? (this.getAttribute('success-label') || T(this, 'Copied')) : (this.getAttribute('error-label') || T(this, 'Copy failed'));
      this.emit(ok ? 'sav-copy' : 'sav-error', { value: text });
      this._t = setTimeout(() => { b.classList.remove('ok', 'err'); ic.innerHTML = svgIcon('copy'); live.textContent = ''; }, 1600);
    }
  }
  props(SavCopyButton, { value: String, from: String, size: String });
  define('sav-copy-button', SavCopyButton);

  /* ================================================================== sav-favourite-button */

  /** A toggle that marks something as a favourite: star, heart or bookmark, filled when pressed. */
  class SavFavouriteButton extends SavElement {
    static styles = [SIZES, `
      :host { display: inline-flex; vertical-align: middle; --_fc: var(--sav-color-warning); }
      :host([icon="heart"]) { --_fc: var(--sav-color-danger); }
      :host([icon="bookmark"]) { --_fc: var(--sav-color-primary); }
      /* like the copy button: background and border on a layer that leans with the style, icon and text upright */
      button { position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: .4rem; min-width: var(--_h); height: var(--_h); padding: 0 .65rem; margin: 0;
               border: 0; border-radius: var(--sav-radius); background: none; color: var(--sav-color-text-muted);
               font: inherit; font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-semibold); cursor: pointer; transition: color calc(var(--sav-duration) * var(--sav-motion, 1));
               --_cb: var(--sav-color-surface); --_cbd: var(--sav-color-border); }
      button::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_cb); background-image: var(--sav-sheen, none);
               border: var(--sav-border-width) solid var(--_cbd); box-shadow: var(--sav-copy-shadow, none); transform: rotate(${TILT});
               transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), border-color calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.22s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([appearance="ghost"]) button { --_cb: transparent; --_cbd: transparent; }
      :host([appearance="ghost"]) button::before { box-shadow: none; background-image: none; }
      :host([appearance="ghost"]) button:not(:hover)::before { transform: none; }
      button:hover { color: var(--sav-color-text); --_cb: var(--sav-color-surface-2); }
      button:hover::before { transform: rotate(calc(${TILT} * var(--sav-tilt-hover, -1))); }
      button:active::before { transform: rotate(calc(${TILT} * var(--sav-tilt-hover, -1))) scale(.94); }
      button:disabled { opacity: .5; cursor: not-allowed; }
      /* pressed: the icon fills with its colour (star yellow, heart red, bookmark blue) and the layer takes a light tint */
      :host([pressed]) button { color: color-mix(in oklab, var(--_fc) var(--sav-tint, 62%), var(--sav-color-text));
               --_cb: color-mix(in oklab, var(--_fc) 12%, var(--sav-color-surface)); --_cbd: var(--sav-ink-border, color-mix(in oklab, var(--_fc) 45%, transparent)); }
      :host([pressed][appearance="ghost"]) button { --_cb: transparent; --_cbd: transparent; }
      svg { width: 1.15em; height: 1.15em; overflow: visible; }
      svg path { transition: fill calc(var(--sav-duration) * var(--sav-motion, 1)), stroke calc(var(--sav-duration) * var(--sav-motion, 1)); }
      :host([pressed]) svg path { fill: oklch(from var(--_fc) calc(l * var(--sav-indicator-l, 1)) c h); stroke: oklch(from var(--_fc) calc(l * var(--sav-indicator-l, 1)) c h); }
      .ic { display: inline-flex; }
      button.pop .ic { animation: sav-fav-pop calc(.42s * var(--sav-motion, 1)) var(--sav-easing); }
      button.pop::before { animation: sav-fav-stamp calc(.32s * var(--sav-motion, 1)) var(--sav-easing); }
      @keyframes sav-fav-pop { 30% { transform: scale(.7); } 65% { transform: scale(1.28); } }
      @keyframes sav-fav-stamp { 40% { transform: rotate(calc(${TILT} * -3)) scale(1.08); } }
      .txt { display: none; }
      .has-text .txt { display: inline; }
      button:not(.has-text) { width: var(--_h); padding: 0; gap: 0; }
      @media (prefers-reduced-motion: reduce) { button.pop .ic, button.pop::before { animation: none; } }
    `];
    static get observedAttributes() { return ['icon', 'pressed', 'disabled', 'label']; }
    get kind() { const i = this.getAttribute('icon'); return ['star', 'heart', 'bookmark'].includes(i) ? i : 'star'; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = `<button part="button" type="button"><span class="ic" part="icon"></span><span class="txt" part="label"><slot></slot></span></button>`;
      const b = this.$('button');
      b.addEventListener('click', () => this.toggle());
      b.addEventListener('animationend', () => b.classList.remove('pop'));
      tiltWatch(b);
      const sync = () => b.classList.toggle('has-text', this.hasSlot());
      this.$('slot').addEventListener('slotchange', sync);
      sync();
      this.sync();
    }
    changed() { this.sync(); }
    sync() {
      const b = this.$('button'); if (!b) return;
      this.$('.ic').innerHTML = svgIcon(this.kind);
      b.setAttribute('aria-pressed', String(this.pressed));
      b.disabled = this.disabled;
      // the name stays the same, aria-pressed tells whether it is on (the label is only needed without visible text)
      if (this.hasSlot()) b.removeAttribute('aria-label');
      else b.setAttribute('aria-label', this.getAttribute('label') || ({ star: 'Favourite', heart: 'Like', bookmark: 'Bookmark' })[this.kind]);
    }
    /** Turns it on or off (or to the given state); a cancelable "sav-change" lets a page refuse the change. */
    toggle(force) {
      if (this.disabled) return;
      const next = force === undefined ? !this.pressed : !!force;
      if (next === this.pressed) return;
      if (!this.emit('sav-change', { pressed: next }, true)) return;
      this.toggleAttribute('pressed', next);
      const b = this.$('button');
      if (next && b) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
      this.emit('change', { pressed: next });
    }
  }
  props(SavFavouriteButton, { icon: String, pressed: Boolean, disabled: Boolean, size: String, appearance: String });
  define('sav-favourite-button', SavFavouriteButton);

  /* ================================================================== code: highlighter, sav-code, sav-code-block */

  const KW = {
    js: 'const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|from|export|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|null|undefined|true|false|yield|static|get|set|interface|type|enum|implements|public|private|protected|readonly|as',
    php: 'function|return|if|else|elseif|foreach|for|while|do|switch|case|break|continue|new|class|extends|implements|interface|use|namespace|public|private|protected|static|const|echo|print|require|require_once|include|include_once|try|catch|finally|throw|null|true|false|array|fn|match|declare|self|parent|instanceof|as|and|or|not',
    py: 'def|return|if|elif|else|for|while|break|continue|class|import|from|as|with|try|except|finally|raise|lambda|yield|pass|None|True|False|and|or|not|in|is|async|await|global|nonlocal|del|assert',
    sh: 'if|then|else|elif|fi|for|in|do|done|while|until|case|esac|function|return|export|local|echo|cd|sudo|exit|source',
    sql: 'select|from|where|and|or|not|insert|into|values|update|set|delete|create|table|drop|alter|add|primary|key|foreign|references|join|left|right|inner|outer|on|group|by|order|asc|desc|limit|offset|as|null|is|in|like|between|having|distinct|count|sum|avg|min|max|index|unique|default|if|exists|union|all|case|when|then|else|end',
  };
  const STR = `'(?:\\\\.|[^'\\\\\\n])*'|"(?:\\\\.|[^"\\\\\\n])*"`;
  const RULES = {
    js: [['comment', '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/'], ['string', STR + '|`(?:\\\\.|[^`\\\\])*`'], ['keyword', `\\b(?:${KW.js})\\b`], ['number', '\\b\\d+(?:\\.\\d+)?\\b'], ['function', '[A-Za-z_$][\\w$]*(?=\\()']],
    css: [['comment', '\\/\\*[\\s\\S]*?\\*\\/'], ['string', STR], ['keyword', '@[\\w-]+'], ['tag', '[^{}\\n;@][^{}\\n;]*(?=\\{)'], ['attr', '--[\\w-]+|[\\w-]+(?=\\s*:[^:])'], ['number', '#[0-9a-fA-F]{3,8}\\b|-?\\d*\\.?\\d+(?:px|rem|em|%|deg|ms|s|vh|vw|dvh|fr|ch)?\\b'], ['function', '[\\w-]+(?=\\()']],
    json: [['attr', '"(?:\\\\.|[^"\\\\])*"(?=\\s*:)'], ['string', '"(?:\\\\.|[^"\\\\])*"'], ['keyword', '\\b(?:true|false|null)\\b'], ['number', '-?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b']],
    php: [['comment', '\\/\\/[^\\n]*|#[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/'], ['tag', '<\\?php|\\?>'], ['string', STR], ['attr', '\\$[A-Za-z_]\\w*'], ['keyword', `\\b(?:${KW.php})\\b`], ['number', '\\b\\d+(?:\\.\\d+)?\\b'], ['function', '[A-Za-z_]\\w*(?=\\()']],
    py: [['comment', '#[^\\n]*'], ['string', '"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|' + STR], ['attr', '@[\\w.]+'], ['keyword', `\\b(?:${KW.py})\\b`], ['number', '\\b\\d+(?:\\.\\d+)?\\b'], ['function', '[A-Za-z_]\\w*(?=\\()']],
    sh: [['comment', '(?:^|(?<=\\s))#[^\\n]*'], ['string', STR], ['attr', '\\$\\{?[\\w@#?*]+\\}?|(?<=\\s)--?[\\w-]+'], ['keyword', `\\b(?:${KW.sh})\\b`], ['number', '\\b\\d+\\b']],
    sql: [['comment', '--[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/'], ['string', STR], ['keyword', `\\b(?:${KW.sql})\\b`], ['number', '\\b\\d+(?:\\.\\d+)?\\b'], ['function', '[A-Za-z_]\\w*(?=\\()']],
  };
  const LANG_ALIAS = { javascript: 'js', mjs: 'js', ts: 'js', typescript: 'js', jsx: 'js', tsx: 'js', bash: 'sh', shell: 'sh', zsh: 'sh', console: 'sh', python: 'py', htm: 'html', xml: 'html', svg: 'html', vue: 'html', scss: 'css', less: 'css', mysql: 'sql' };
  const LANG_NAME = { html: 'HTML', css: 'CSS', js: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript', jsx: 'JSX', tsx: 'TSX', json: 'JSON', php: 'PHP', py: 'Python', sh: 'Shell', sql: 'SQL', text: 'Text' };
  const ruleCache = {};

  /** Flat list of [class, text] tokens; class '' is plain text. */
  function tokenize(code, lang) {
    lang = LANG_ALIAS[lang] || lang;
    if (lang === 'html') return tokenizeHtml(code);
    const rules = RULES[lang];
    if (!rules) return [['', code]];
    const re = ruleCache[lang] ||= new RegExp(rules.map(([, r]) => `(${r})`).join('|'), lang === 'sql' ? 'gi' : 'g');
    const out = [];
    let last = 0, m;
    re.lastIndex = 0;
    while ((m = re.exec(code))) {
      if (!m[0]) { re.lastIndex++; continue; }
      if (m.index > last) out.push(['', code.slice(last, m.index)]);
      const g = m.slice(1).findIndex((x) => x !== undefined);
      out.push([rules[g][0], m[0]]);
      last = m.index + m[0].length;
    }
    if (last < code.length) out.push(['', code.slice(last)]);
    return out;
  }

  function tokenizeHtml(code) {
    const out = [];
    const re = /<!--[\s\S]*?-->|<\/?[A-Za-z][\w:-]*(?:\s+[^<>]*?)?\/?>/g;
    let last = 0, m;
    while ((m = re.exec(code))) {
      if (m.index > last) out.push(['', code.slice(last, m.index)]);
      const t = m[0];
      if (t.startsWith('<!--')) out.push(['comment', t]);
      else {
        const head = /^(<\/?)([\w:-]+)/.exec(t);
        out.push(['punct', head[1]], ['tag', head[2]]);
        const rest = t.slice(head[0].length), end = /\/?>$/.exec(rest)[0];
        const attrs = rest.slice(0, rest.length - end.length);
        const ar = /([^\s=]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"']+))?|(\s+)/g;
        let a;
        while ((a = ar.exec(attrs))) {
          if (a[4]) out.push(['', a[4]]);
          else { out.push(['attr', a[1]]); if (a[2]) out.push(['punct', a[2]], ['string', a[3]]); }
        }
        out.push(['punct', end]);
      }
      last = m.index + t.length;
    }
    if (last < code.length) out.push(['', code.slice(last)]);
    return out;
  }

  /** Highlighted HTML, one <span class="line"> per line (tokens split at line breaks). */
  function highlightLines(code, lang) {
    const lines = [[]];
    for (const [cls, text] of tokenize(code, lang)) {
      text.split('\n').forEach((part, i) => {
        if (i) lines.push([]);
        if (part) lines[lines.length - 1].push(cls ? `<span class="t-${cls}">${esc(part)}</span>` : esc(part));
      });
    }
    return lines.map((l) => `<span class="line">${l.join('') || ' '}</span>`).join('\n');
  }
  Sav.highlight = (code, lang) => tokenize(code, lang).map(([c, t]) => (c ? `<span class="t-${c}">${esc(t)}</span>` : esc(t))).join('');

  /** Removes the indentation shared by every line, and blank lines at the start and end. */
  function dedent(text) {
    const lines = text.replace(/\r\n?/g, '\n').replace(/^\s*\n/, '').replace(/\n\s*$/, '').split('\n');
    const min = Math.min(...lines.filter((l) => l.trim()).map((l) => /^[ \t]*/.exec(l)[0].length));
    return lines.map((l) => l.slice(Number.isFinite(min) ? min : 0)).join('\n');
  }

  const CODE_COLORS = `
    .t-tag { color: var(--sav-code-tag); } .t-attr { color: var(--sav-code-attr); } .t-string { color: var(--sav-code-string); }
    .t-keyword { color: var(--sav-code-keyword); } .t-number { color: var(--sav-code-number); } .t-function { color: var(--sav-code-function); }
    .t-comment { color: var(--sav-code-comment); font-style: italic; } .t-punct { color: var(--sav-code-punct); }
  `;

  class SavCode extends SavElement {
    static styles = [CODE_COLORS, `
      :host { display: inline; font-family: var(--sav-font-mono); font-size: .88em; }
      code { padding: .12em .4em; border-radius: var(--sav-radius-sm); background: var(--sav-code-bg); color: var(--sav-code-text); box-decoration-break: clone; -webkit-box-decoration-break: clone; overflow-wrap: anywhere; }
    `];
    connectedCallback() {
      if (!this.shadowRoot.firstChild) { this.shadowRoot.innerHTML = '<code part="base"></code>'; this._raw = this.textContent; }
      this.render();
    }
    changed() { this.render(); }
    render() { const c = this.$('code'); if (c) c.innerHTML = this.language ? Sav.highlight(this._raw, this.language) : esc(this._raw); }
  }
  props(SavCode, { language: String });
  define('sav-code', SavCode);

  class SavCodeBlock extends SavElement {
    static styles = [CODE_COLORS, `
      :host { display: block; min-width: 0; max-width: 100%; --max-height: none; font-family: var(--sav-font); }
      .cb { max-width: 100%; }
      .cb { position: relative; overflow: hidden; border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius); background: var(--sav-code-bg); color: var(--sav-code-text); }
      .head { display: flex; align-items: center; gap: .6rem; min-height: 2.4rem; padding: .3rem .4rem .3rem .9rem; border-bottom: var(--sav-border-width) solid color-mix(in oklab, var(--sav-color-border), transparent 30%); font-size: .75rem; }
      :host([no-header]) .head { display: none; }
      .lang { font-weight: var(--sav-font-weight-bold); letter-spacing: .06em; text-transform: uppercase; color: var(--sav-color-text-muted); }
      .title { font-family: var(--sav-font-mono); color: var(--sav-code-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .title:empty { display: none; }
      .lang + .title::before { content: "·"; margin-right: .6rem; color: var(--sav-code-gutter); }
      .sp { flex: 1; }
      .copy { display: inline-flex; align-items: center; gap: .35rem; height: 1.8rem; padding: 0 .55rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); font: inherit; font-size: .75rem; font-weight: var(--sav-font-weight-semibold); cursor: pointer; }
      .copy:hover { background: color-mix(in oklab, var(--sav-code-text) 8%, transparent); color: var(--sav-code-text); }
      .copy.ok { color: var(--sav-color-success); }
      .copy svg { width: 1rem; height: 1rem; }
      :host([no-copy]) .copy { display: none; }
      .scroll { overflow: auto; max-height: var(--max-height); }
      pre { margin: 0; padding: .85rem 0; font-family: var(--sav-font-mono); font-size: var(--sav-code-font-size, .82rem); line-height: 1.65; tab-size: 2; counter-reset: line; width: max-content; min-width: 100%; box-sizing: border-box; }
      :host([wrap]) pre { white-space: pre-wrap; width: auto; overflow-wrap: anywhere; }
      :host([wrap]) .line { display: inline-block; width: 100%; padding-left: calc(var(--_gw) + 1.7rem); text-indent: calc((var(--_gw) + 1.7rem) * -1); }
      /* each line is a full-width band of exactly one line-height, so a highlighted line and its number form one continuous strip */
      .line { display: inline-block; min-width: 100%; vertical-align: top; box-sizing: border-box; padding-right: 1.1rem; }
      /* line numbers are generated content: they are never selected or copied */
      .line::before { counter-increment: line; content: counter(line); display: inline-block; position: sticky; left: 0; width: var(--_gw); padding: 0 .9rem 0 1rem; margin-right: .7rem;
        text-align: right; color: var(--sav-code-gutter); background: var(--sav-code-bg); user-select: none; -webkit-user-select: none; text-indent: 0; }
      :host([no-line-numbers]) .line::before { content: none; }
      :host([no-line-numbers]) .line { padding-left: 1.1rem; text-indent: 0; }
      .line.hl { background: color-mix(in oklab, var(--sav-color-primary) 12%, transparent); }
      .line.hl::before { background: color-mix(in oklab, var(--sav-color-primary) 12%, var(--sav-code-bg)); color: var(--sav-color-primary); }
    `];
    static get observedAttributes() { return ['language', 'filename', 'label', 'highlight']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      if (this._code === undefined) this._code = dedent(this.textContent);
      this.shadowRoot.innerHTML = `<div class="cb" part="base"><div class="head" part="header"><span class="lang"></span><span class="title"></span><span class="sp"></span>
        <button class="copy" part="copy-button" type="button">${svgIcon('copy')}<span class="ct">${esc(T(this, 'Copy'))}</span></button></div>
        <div class="scroll" part="body"><pre><code></code></pre></div></div>`;
      this.$('.copy').addEventListener('click', () => this.copy());
      this.render();
    }
    changed() { this.render(); }
    get code() { return this._code ?? dedent(this.textContent); }
    set code(v) { this._code = String(v ?? ''); this.render(); }
    render() {
      const c = this.$('code');
      if (!c) return;
      const raw = (this.getAttribute('language') || 'text').toLowerCase();
      const lang = LANG_ALIAS[raw] || raw;
      this.$('.lang').textContent = this.getAttribute('label') || LANG_NAME[raw] || LANG_NAME[lang] || raw;
      this.$('.title').textContent = this.getAttribute('filename') || '';
      c.innerHTML = highlightLines(this._code, lang);
      const n = this._code.split('\n').length;
      this.$('pre').style.setProperty('--_gw', String(n).length + 'ch');
      const hl = new Set();
      (this.getAttribute('highlight') || '').split(',').forEach((r) => {
        const [a, b] = r.split('-').map(Number);
        if (a) for (let i = a; i <= (b || a); i++) hl.add(i);
      });
      if (hl.size) [...c.querySelectorAll('.line')].forEach((l, i) => l.classList.toggle('hl', hl.has(i + 1)));
    }
    async copy() {
      const b = this.$('.copy');
      try { await navigator.clipboard.writeText(this._code); }
      catch { const ta = Object.assign(document.createElement('textarea'), { value: this._code }); ta.style.cssText = 'position:fixed;opacity:0'; document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
      b.classList.add('ok'); b.querySelector('.ct').textContent = T(this, 'Copied'); b.querySelector('svg').outerHTML = svgIcon('check');
      this.emit('sav-copy', { value: this._code });
      clearTimeout(this._t);
      this._t = setTimeout(() => { b.classList.remove('ok'); b.querySelector('.ct').textContent = T(this, 'Copy'); b.querySelector('svg').outerHTML = svgIcon('copy'); }, 1600);
    }
  }
  define('sav-code-block', SavCodeBlock);

  /* ================================================================== sav-pagination */

  /** Page numbers for long lists: first, last, the pages around the current one and "…" in between; previous and next.
      With href="?page={page}" every page is a link; otherwise buttons that fire sav-page. simple shows only ‹ "3 of 12" ›. */
  class SavPagination extends SavElement {
    static styles = [SIZES, `
      :host { display: block; }
      nav { display: flex; flex-wrap: wrap; align-items: center; gap: .3rem; }
      :host([align="center"]) nav { justify-content: center; } :host([align="end"]) nav { justify-content: flex-end; }
      .p { position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: .3rem; min-width: var(--_h); height: var(--_h); padding: 0 .55rem;
           border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text); font: inherit; font-size: var(--_fs); font-weight: var(--sav-font-weight-semibold);
           font-variant-numeric: tabular-nums; text-decoration: none; cursor: pointer; transition: color calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .p::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_b, transparent); background-image: var(--_bi, none); box-shadow: var(--_s, none);
           transform: rotate(${TILT}); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), transform calc(.2s * var(--sav-motion, 1)) var(--sav-easing); }
      .p:hover:not([aria-current]):not(:disabled):not([aria-disabled="true"]) { --_b: var(--sav-color-surface-2); }
      .p:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 2px; }
      /* the current page: the same highlight as the breadcrumb, by style (tint, blue tile, underline, inked block, glass) */
      .p[aria-current] { cursor: default; color: var(--sav-breadcrumb-current-fg, color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)));
           --_b: var(--sav-breadcrumb-current-bg, color-mix(in oklab, var(--sav-color-primary) 14%, transparent)); --_bi: var(--sav-sheen, none); --_s: var(--sav-breadcrumb-current-shadow, none); }
      .p:disabled, .p[aria-disabled="true"] { opacity: .4; cursor: not-allowed; pointer-events: none; }
      .p svg { width: 1.05em; height: 1.05em; flex: none; }
      .gap { display: inline-flex; align-items: flex-end; justify-content: center; min-width: 1.6rem; height: var(--_h); color: var(--sav-color-text-muted); letter-spacing: .1em; user-select: none; }
      .of { padding: 0 .6rem; color: var(--sav-color-text-muted); font-size: var(--_fs); font-variant-numeric: tabular-nums; white-space: nowrap; }
      .t { display: none; } :host([labels]) .t { display: inline; }
      @media (prefers-reduced-motion: reduce) { .p::before { transition: none; } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${CUR_EB(14)}; }
      :host([auto-text]) .p[aria-current] { color: ${AUTO_TEXT}; }
    `];
    static get observedAttributes() { return ['page', 'pages', 'total', 'page-size', 'siblings', 'href', 'appearance', 'label', 'labels']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = `<nav part="base"></nav>`;
        this.$('nav').addEventListener('click', (e) => {
          const b = e.target.closest('[data-p]'); if (!b || b.disabled || b.hasAttribute('aria-current')) return;
          const n = Number(b.dataset.p);
          if (!this.emit('sav-page', { page: n, previous: this.page }, true)) { e.preventDefault(); return; }
          if (b.localName === 'button') { this.page = n; this.emit('change', { page: n }); }
        });
      }
      this.render();
    }
    changed() { this.render(); }
    get pages() { const p = Number(this.getAttribute('pages')); if (p > 0) return Math.floor(p); const t = Number(this.getAttribute('total')) || 0, s = Number(this.getAttribute('page-size')) || 10; return Math.max(1, Math.ceil(t / s)); }
    get page() { return Math.min(this.pages, Math.max(1, Math.floor(Number(this.getAttribute('page')) || 1))); }
    set page(v) { this.setAttribute('page', String(v)); }
    /** the numbers to show: 1 … 4 5 6 … 20 (siblings on each side of the current page, always the first and the last) */
    items() {
      const n = this.pages, cur = this.page, sib = Math.max(0, Number(this.getAttribute('siblings') ?? 1));
      const want = new Set([1, n]); for (let i = cur - sib; i <= cur + sib; i++) if (i >= 1 && i <= n) want.add(i);
      // a single hidden page is shown instead of "…"
      const list = [...want].sort((a, b) => a - b), out = [];
      list.forEach((p, i) => { if (i && p - list[i - 1] === 2) out.push(p - 1); else if (i && p - list[i - 1] > 2) out.push('…'); out.push(p); });
      return out;
    }
    render() {
      const nav = this.$('nav'); if (!nav) return;
      const n = this.pages, cur = this.page, tpl = this.getAttribute('href');
      nav.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Pages'));
      const one = (p, inner, extra = '') => {
        const off = p < 1 || p > n;
        if (tpl && !off) return `<a class="p" part="page" href="${esc(tpl.replace(/\{page\}/g, p))}" data-p="${p}" ${extra}>${inner}</a>`;
        return `<button type="button" class="p" part="page" data-p="${p}" ${off ? 'disabled' : ''} ${extra}>${inner}</button>`;
      };
      const prev = one(cur - 1, `${svgIcon('chevron-left')}<span class="t">${esc(T(this, 'Previous'))}</span>`, `part="page previous" aria-label="${esc(T(this, 'Previous page'))}"`);
      const next = one(cur + 1, `<span class="t">${esc(T(this, 'Next'))}</span>${svgIcon('chevron-right')}`, `part="page next" aria-label="${esc(T(this, 'Next page'))}"`);
      const mid = this.getAttribute('appearance') === 'simple'
        ? `<span class="of" part="summary" aria-live="polite">${cur} of ${n}</span>`
        : this.items().map((p) => (p === '…' ? '<span class="gap" aria-hidden="true">…</span>' : one(p, String(p), `aria-label="${esc(T(this, 'Page {n}', { n: p }))}" ${p === cur ? 'aria-current="page"' : ''}`))).join('');
      nav.innerHTML = prev + mid + next;
      this.$$('.p').forEach((b) => tiltWatch(b));
    }
  }
  props(SavPagination, { size: String });
  define('sav-pagination', SavPagination);

  /* ================================================================== sav-steps */

  /** The steps of a task (sign-up, checkout): done ones with a tick, the current one marked, the next ones waiting.
      current="2" (from 1) says where you are; clickable lets people go back to a step already done (sav-step). */
  class SavSteps extends SavElement {
    static styles = `
      :host { display: block; }
      ol { display: flex; margin: 0; padding: 0; list-style: none; counter-reset: s; }
      :host([orientation="vertical"]) ol { flex-direction: column; }
    `;
    static get observedAttributes() { return ['current', 'orientation', 'clickable', 'label', 'auto-text']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = '<ol part="base"><slot></slot></ol>';
        this.$('slot').addEventListener('slotchange', () => this.sync());
        this.addEventListener('click', (e) => {
          const st = e.target.closest('sav-step'); if (!st || !this.hasAttribute('clickable') || st.getAttribute('data-state') !== 'done') return;
          const i = this.steps.indexOf(st);
          if (this.emit('sav-step', { index: i + 1, step: st }, true)) { this.current = i + 1; this.emit('change', { current: i + 1 }); }
        });
      }
      this.sync();
    }
    changed() { this.sync(); }
    get steps() { return [...this.querySelectorAll(':scope > sav-step')]; }
    get current() { return Math.max(1, Number(this.getAttribute('current')) || 1); }
    set current(v) { this.setAttribute('current', String(v)); }
    sync() {
      const all = this.steps, cur = this.current, vert = this.getAttribute('orientation') === 'vertical';
      this.$('ol')?.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Steps'));
      passAutoText(this, all);
      all.forEach((s, i) => {
        s.setAttribute('data-state', i + 1 < cur ? 'done' : i + 1 === cur ? 'current' : 'upcoming');
        s.setAttribute('data-n', String(i + 1));
        s.toggleAttribute('data-last', i === all.length - 1);
        s.toggleAttribute('data-vertical', vert);
        s.toggleAttribute('data-clickable', this.hasAttribute('clickable') && i + 1 < cur);
        s.render?.();
      });
    }
    next() { if (this.current < this.steps.length + 1) { this.current = this.current + 1; this.emit('change', { current: this.current }); } }
    previous() { if (this.current > 1) { this.current = this.current - 1; this.emit('change', { current: this.current }); } }
  }
  define('sav-steps', SavSteps);

  class SavStep extends SavElement {
    static styles = `
      :host { flex: 1 1 0; min-width: 0; display: block; position: relative; }
      :host([data-vertical]) { flex: none; }
      .s { position: relative; display: flex; flex-direction: column; align-items: center; gap: .45rem; padding: 0 .35rem; text-align: center; border: 0; background: none; font: inherit; color: inherit; width: 100%; }
      :host([data-vertical]) .s { flex-direction: row; align-items: flex-start; text-align: start; gap: .8rem; padding: 0 0 1.4rem; }
      :host([data-vertical][data-last]) .s { padding-bottom: 0; }
      button.s { cursor: pointer; } button.s:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 3px; border-radius: var(--sav-radius-sm); }
      /* the marker: number, tick or icon; its shape and lean are those of the style's knobs */
      .m { position: relative; isolation: isolate; z-index: 1; display: grid; place-items: center; flex: none; width: 2rem; height: 2rem; color: var(--sav-color-text-muted);
           font-weight: var(--sav-font-weight-bold); font-size: .85rem; font-variant-numeric: tabular-nums; }
      .m::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-knob-radius, 50%); background: var(--sav-color-surface);
           box-shadow: inset 0 0 0 2px var(--sav-color-border-strong); transform: rotate(var(--sav-knob-tilt, 0deg)); transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .m svg { width: 1rem; height: 1rem; }
      :host([data-state="current"]) .m { color: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); }
      :host([data-state="current"]) .m::before { box-shadow: inset 0 0 0 2px oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h), 0 0 0 4px color-mix(in oklab, var(--sav-color-primary) 18%, transparent); }
      :host([data-state="done"]) .m { color: var(--sav-color-on-primary); }
      :host([data-state="done"]) .m::before { background: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); box-shadow: ${INK()}; }
      :host([status="error"]) .m { color: var(--sav-color-on-danger); } :host([status="error"]) .m::before { background: var(--sav-color-danger); box-shadow: ${INK()}; }
      /* the line to the next step: coloured once this step is done */
      .ln { position: absolute; top: calc(1rem - 1px); left: calc(50% + 1.35rem); right: calc(-50% + 1.35rem); height: 2px; border-radius: 2px; background: var(--sav-color-border-strong); }
      :host([data-vertical]) .ln { top: 2.35rem; bottom: .35rem; left: calc(1rem - 1px); right: auto; width: 2px; height: auto; }
      :host([data-last]) .ln { display: none; }
      :host([data-state="done"]) .ln { background: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); }
      .tx { display: grid; gap: .1rem; min-width: 0; }
      :host([data-vertical]) .tx { padding-top: .3rem; }
      .l { font-weight: var(--sav-font-weight-semibold); font-size: var(--sav-font-size-sm); color: var(--sav-color-text); }
      :host([data-state="upcoming"]) .l { color: var(--sav-color-text-muted); }
      .d { font-size: .8rem; color: var(--sav-color-text-muted); }
      .d:empty { display: none; }
      .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
      @media (max-width: 560px) { :host(:not([data-vertical])) .d { display: none; } :host(:not([data-vertical])) .l { font-size: .75rem; } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: var(--sav-color-bg); }
      :host([data-state="done"]) { --_eb: oklch(from var(--sav-color-primary) calc(l * var(--sav-indicator-l, 1)) c h); }
      :host([status="error"]) { --_eb: var(--sav-color-danger); }
      :host(:is([auto-text], [data-auto-text]):is([data-state="done"], [data-state="current"], [status="error"])) .m { color: ${AUTO_TEXT}; }
    `;
    static get observedAttributes() { return ['label', 'description', 'icon', 'status']; }
    connectedCallback() { this.setAttribute('role', 'listitem'); this.render(); }
    changed() { this.render(); }
    render() {
      const st = this.getAttribute('data-state') || 'upcoming', n = this.getAttribute('data-n') || '', icon = this.getAttribute('icon'), err = this.getAttribute('status') === 'error';
      const mark = err ? svgIcon('x') : st === 'done' ? svgIcon('check') : icon ? svgIcon(icon) : esc(n);
      const tag = this.hasAttribute('data-clickable') ? 'button' : 'div';
      const state = T(this, err ? 'error' : st === 'done' ? 'done' : st === 'current' ? 'current step' : 'not done yet');
      this.shadowRoot.innerHTML = `<${tag} class="s" part="base" ${tag === 'button' ? 'type="button"' : ''} ${st === 'current' ? 'aria-current="step"' : ''}><span class="m" part="marker" aria-hidden="true">${mark}</span>`
        + `<span class="tx"><span class="l" part="label">${esc(this.getAttribute('label') || '')}<slot></slot></span><span class="d" part="description">${esc(this.getAttribute('description') || '')}</span><span class="sr">, ${state}</span></span></${tag}><span class="ln" part="line" aria-hidden="true"></span>`;
    }
  }
  define('sav-step', SavStep);

  /* ================================================================== sav-level-path */

  /** The map of a course, like in learning apps: levels on a winding line, the done ones coloured (with their stars), the current
      one ready to start, the next ones locked. current="3" (from 1) says where the learner is; open makes every level open.
      Any other element inside (a heading, a divider, a card) starts a new stretch of the path, across the whole width. */
  class SavLevelPath extends SavElement {
    static styles = `
      :host { display: block; width: 100%; --sav-level-gap: 1.7rem; }
      .w { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--sav-level-gap); padding: 2.4rem 0 .5rem; }
      svg.line { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
      .line path { fill: none; stroke-linecap: var(--sav-ring-cap, round); stroke-linejoin: round; }
      /* the way ahead is dotted (round dots, or little squares where the style has square ends), the way walked is a full line */
      .line .way { stroke: var(--sav-ink-border, var(--sav-color-border-strong)); stroke-width: 9; stroke-dasharray: .1 17; opacity: .6; stroke-linecap: var(--sav-level-dot-cap, round); }
      .line .walked { stroke: var(--sav-ink-border, color-mix(in oklab, var(--sav-color-primary) 55%, transparent)); stroke-width: 9; }
      ::slotted(*) { position: relative; z-index: 1; }
      ::slotted(:not(sav-level)) { align-self: stretch; }
      :host([no-line]) svg.line { display: none; }
    `;
    static get observedAttributes() { return ['current', 'open', 'wave', 'label', 'current-label', 'no-line']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = '<div class="w" part="base"><svg class="line" part="line" aria-hidden="true"><path class="way"/><path class="walked"/></svg><slot></slot></div>';
        this.$('slot').addEventListener('slotchange', () => this.sync());
        this.addEventListener('click', (e) => {
          const lv = e.target.closest?.('sav-level'); if (!lv || lv.parentElement !== this) return;
          const index = this.levels.indexOf(lv) + 1;
          if (lv.getAttribute('data-state') === 'locked') { e.preventDefault(); this.emit('sav-locked', { index, level: lv, value: lv.getAttribute('value') }); return; }
          this.emit('sav-select', { index, level: lv, value: lv.getAttribute('value') ?? String(index) });
        });
        if (typeof ResizeObserver === 'function') { this._ro = new ResizeObserver(() => this.layout()); this._ro.observe(this); }
      }
      this.setAttribute('role', 'group');
      this.sync();
    }
    disconnectedCallback() { this._ro?.disconnect(); this._ro = null; }
    changed() { this.sync(); }
    get levels() { return [...this.querySelectorAll(':scope > sav-level')]; }
    get current() { return Math.max(1, Number(this.getAttribute('current')) || 1); }
    set current(v) { this.setAttribute('current', String(v)); }
    sync() {
      const all = this.levels, cur = this.current, open = this.hasAttribute('open'), go = this.getAttribute('current-label') ?? T(this, 'Start');
      this.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Levels'));
      all.forEach((lv, i) => {
        // a level may say its own state (status); otherwise it comes from current
        const own = lv.getAttribute('status');
        const st = own && /^(done|current|locked|open)$/.test(own) ? own : i + 1 < cur ? 'done' : i + 1 === cur ? 'current' : open ? 'open' : 'locked';
        lv.setAttribute('data-state', st);
        lv.setAttribute('data-n', String(i + 1));
        lv.setAttribute('data-of', String(all.length));
        st === 'current' ? lv.setAttribute('data-go', go) : lv.removeAttribute('data-go');
      });
      // the levels may be defined after the path: lay out once they are, and again on the next frame (fonts, icons)
      customElements.whenDefined('sav-level').then(() => { this.layout(); cancelAnimationFrame(this._raf); this._raf = requestAnimationFrame(() => this.layout()); });
    }
    /** the winding: each level moves sideways along a wave (it starts again after a heading or a divider); then the line is drawn */
    layout() {
      const w = this.getBoundingClientRect().width; if (!w) return;
      const node = this.levels[0]?.nodeSize?.() || 70;
      const want = { none: 0, sm: 40, md: 72, lg: 110 }[this.getAttribute('wave') || 'md'] ?? (parseFloat(this.getAttribute('wave')) || 72);
      const amp = Math.max(0, Math.min(want, (w - node) / 2 - 12));
      let k = 0;
      for (const el of this.children) {
        if (el.localName !== 'sav-level') { k = 0; continue; }
        el.style.setProperty('--_x', (amp * Math.sin((k * Math.PI) / 4)).toFixed(1) + 'px');
        k++;
      }
      this.draw(); // reading the positions lays the page out first, so the line follows the new places at once
    }
    draw() {
      const box = this.$('.w')?.getBoundingClientRect(); if (!box) return;
      const cur = this.current;
      let way = '', walked = '', prev = null, idx = 0;
      const curve = (a, b) => { const dy = (b.y - a.y) / 2; return ` C ${a.x.toFixed(1)} ${(a.y + dy).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y - dy).toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`; };
      for (const el of this.children) {
        if (el.localName !== 'sav-level') { prev = null; continue; }
        idx++;
        const r = el.nodeRect?.(); if (!r || !r.width) continue;
        const p = { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
        if (prev) {
          way += curve(prev.p, p).replace(/^ C/, ` M ${prev.p.x.toFixed(1)} ${prev.p.y.toFixed(1)} C`);
          // walked: up to the current level, between levels of the same stretch
          if (idx <= cur || this.levels[idx - 1]?.getAttribute('data-state') === 'done') walked += curve(prev.p, p).replace(/^ C/, ` M ${prev.p.x.toFixed(1)} ${prev.p.y.toFixed(1)} C`);
        }
        prev = { p };
      }
      this.$('.way')?.setAttribute('d', way.trim());
      this.$('.walked')?.setAttribute('d', walked.trim());
    }
  }
  define('sav-level-path', SavLevelPath);

  /** One level of sav-level-path: a node (icon, tick, lock), its name and its stars. href makes it a link. */
  class SavLevel extends SavElement {
    static styles = [VARIANTS, `
      :host { display: block; translate: var(--_x, 0) 0; --size: 4.4rem; text-align: center;
              /* the node is drawn like a solid button of the style: its fill, border, shadows, press and sheen come from the button tokens */
              --_bg: color-mix(in oklab, var(--_c) var(--sav-fill-opacity, 100%), transparent); --_bg-h: color-mix(in oklab, var(--_c-hover) var(--sav-fill-opacity, 100%), transparent);
              --_fg: var(--_on); --_bd: var(--sav-button-border-color, transparent);
              --_sh: var(--sav-button-shadow, var(--sav-shadow-sm)); --_sh-h: var(--sav-button-shadow-hover, var(--sav-button-shadow, var(--sav-shadow))); --_sh-a: var(--sav-button-shadow-active, var(--sav-button-shadow, none)); }
      :host([milestone]) { --size: 5.4rem; }
      /* room above the current level for its bubble */
      :host([data-state="current"][data-go]:not([data-go=""])) { margin-top: 1.6rem; }
      .c { position: relative; display: inline-flex; flex-direction: column; align-items: center; gap: .5rem; margin: 0; padding: 0; border: 0; background: none;
           font: inherit; color: inherit; text-decoration: none; cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent; }
      /* the node: the shape and lean of the style's knobs (round; square in Sharp; a leaning tile in Tilt), like the markers of sav-steps */
      .n { position: relative; isolation: isolate; display: grid; place-items: center; width: var(--size); height: var(--size); color: var(--text-color, var(--_fg));
           font-weight: var(--sav-font-weight-bold); font-size: calc(var(--size) * .34); font-variant-numeric: tabular-nums;
           transition: transform calc(var(--sav-duration) * var(--sav-motion, 1)) var(--sav-easing); }
      .n::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-knob-radius, 50%); transform: rotate(var(--sav-knob-tilt, 0deg));
           background: var(--_bg); background-image: var(--sav-sheen, none); border: var(--sav-border-width) solid var(--_bd); box-shadow: var(--_sh), var(--_ring, 0 0 0 0 transparent);
           -webkit-backdrop-filter: var(--sav-button-backdrop, none); backdrop-filter: var(--sav-button-backdrop, none);
           transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), box-shadow calc(var(--sav-duration) * var(--sav-motion, 1)); }
      .n svg { width: 42%; height: 42%; }
      .n sav-icon { font-size: calc(var(--size) * .42); }
      .c:hover .n { transform: var(--sav-button-hover-transform, none); }
      .c:hover .n::before { background: var(--_bg-h); background-image: var(--sav-sheen, none); box-shadow: var(--_sh-h), var(--_ring, 0 0 0 0 transparent); }
      .c:active .n { transform: var(--sav-button-active-transform, translateY(1px)); }
      .c:active .n::before { box-shadow: var(--_sh-a), var(--_ring, 0 0 0 0 transparent); }
      .c:focus-visible { --_ring: 0 0 0 3px var(--sav-color-bg), 0 0 0 calc(3px + var(--sav-focus-width, 2px)) var(--sav-color-focus, var(--sav-color-primary)); }
      /* locked: like a quiet neutral button, with a lock; it says so when touched (sav-locked on the path) */
      :host([data-state="locked"]) { --_bg: var(--sav-color-surface-2); --_bg-h: var(--sav-color-surface-2); --_fg: var(--sav-color-text-muted); --_bd: var(--sav-button-border-color, var(--sav-color-border)); --_sh-h: var(--_sh); --_sh-a: var(--_sh); }
      :host([data-state="locked"]) .c { cursor: not-allowed; }
      :host([data-state="locked"]) .c:hover .n, :host([data-state="locked"]) .c:active .n { transform: none; }
      /* open (not done yet, not locked): like an outline button */
      :host([data-state="open"]) { --_bg: var(--sav-color-surface); --_bg-h: var(--_c-soft); --_fg: var(--_c-text); --_bd: var(--sav-button-border-color, var(--_c-line)); }
      :host([data-state="open"]) .n::before { border-width: max(2px, var(--sav-border-width)); }
      /* the current level: a ring that breathes around it (ink in Brutal) and a bubble that says what to do */
      .n::after { content: ""; position: absolute; inset: -8px; z-index: -2; border-radius: var(--sav-knob-radius, 50%); transform: rotate(var(--sav-knob-tilt, 0deg));
           border: 4px solid var(--sav-ink-border, color-mix(in oklab, var(--_c) 32%, transparent)); opacity: 0; }
      :host([data-state="current"]) .n::after { opacity: 1; animation: sav-level-ring calc(1.8s * var(--sav-motion, 1)) ease-in-out infinite; }
      @keyframes sav-level-ring { 50% { inset: -13px; opacity: .45; } }
      .go { position: absolute; bottom: calc(100% + .8rem); left: 50%; z-index: 2; translate: -50% 0; padding: .3rem .7rem; border-radius: var(--sav-radius-sm);
            background: var(--sav-color-tooltip-bg, var(--sav-color-text)); color: var(--sav-color-tooltip-text, var(--sav-color-bg)); box-shadow: var(--sav-tooltip-shadow, var(--sav-shadow-sm));
            -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none);
            font-size: .8rem; font-weight: var(--sav-font-weight-bold); line-height: 1.2; white-space: nowrap; letter-spacing: var(--sav-button-letter-spacing, normal); text-transform: var(--sav-button-text-transform, none);
            animation: sav-level-bob calc(1.6s * var(--sav-motion, 1)) ease-in-out infinite; }
      .go::after { content: ""; position: absolute; top: 100%; left: 50%; translate: -50% 0; border: 6px solid transparent; border-top-color: var(--sav-color-tooltip-bg, var(--sav-color-text)); }
      @keyframes sav-level-bob { 50% { translate: -50% -4px; } }
      @media (prefers-reduced-motion: reduce) { :host([data-state="current"]) .n::after, .go { animation: none; } }
      /* auto-text: black or white, whichever is readable on the node */
      :host { --_eb: var(--_c); }
      :host([auto-text]:not([data-state="locked"]):not([data-state="open"])) .n { color: ${AUTO_TEXT}; }
      /* the name sits on the page colour, so the line passes behind it */
      .l { max-width: 10rem; padding: .1rem .5rem; border-radius: var(--sav-radius-sm); background: var(--sav-level-label-bg, var(--sav-color-bg));
           font-weight: var(--sav-font-weight-semibold); font-size: var(--sav-font-size-sm); line-height: 1.25; color: var(--sav-color-text); }
      .l:empty { display: none; }
      :host([data-state="locked"]) .l { color: var(--sav-color-text-muted); }
      .st { display: inline-flex; gap: 2px; margin-top: -.2rem; padding: .05rem .3rem; border-radius: var(--sav-radius-sm); background: var(--sav-level-label-bg, var(--sav-color-bg)); }
      .st svg, .st sav-icon { width: .95rem; height: .95rem; font-size: .95rem; }
      .st .on { color: var(--sav-color-warning); fill: currentColor; }
      .st .off { color: var(--sav-color-border-strong); }
    `];
    static get observedAttributes() { return ['label', 'icon', 'href', 'target', 'value', 'stars', 'status', 'milestone', 'variant', 'data-state', 'data-n', 'data-of', 'data-go']; }
    connectedCallback() { this.render(); }
    changed(name) {
      this.render();
      if (name === 'status' || name === 'milestone') this.parentElement?.sync?.();
    }
    nodeRect() { return this.shadowRoot.querySelector('.n')?.getBoundingClientRect(); }
    nodeSize() { return this.shadowRoot.querySelector('.n')?.offsetWidth || 70; }
    render() {
      const st = this.getAttribute('data-state') || 'open', locked = st === 'locked';
      const label = this.getAttribute('label') || '', icon = this.getAttribute('icon'), n = this.getAttribute('data-n') || '', of = this.getAttribute('data-of') || '';
      const mark = locked ? svgIcon('lock') : icon ? svgIcon(icon) : st === 'done' ? svgIcon('check') : esc(n);
      const sv = this.getAttribute('stars'), stars = sv === null || locked ? -1 : Math.max(0, Math.min(3, Number(sv) || 0));
      const starHtml = stars < 0 ? '' : `<span class="st" part="stars" aria-hidden="true">${[1, 2, 3].map((i) => svgIcon('star', i <= stars ? 'on' : 'off')).join('')}</span>`;
      const state = T(this, { done: 'done', current: 'current level', locked: 'locked', open: '' }[st]);
      const name = [label || T(this, 'Level {n}', { n }), of ? T(this, 'level {n} of {of}', { n, of }) : '', state, stars >= 0 ? T(this, '{n} of 3 stars', { n: stars }) : ''].filter(Boolean).join(', ');
      const href = this.getAttribute('href'), target = this.getAttribute('target');
      const open = href !== null && !locked
        ? `<a class="c" part="base" href="${esc(href)}"${target ? ` target="${esc(target)}"${target === '_blank' ? ' rel="noopener"' : ''}` : ''}`
        : `<button type="button" class="c" part="base"${locked ? ' aria-disabled="true"' : ''}`;
      const tag = open.startsWith('<a') ? 'a' : 'button';
      this.shadowRoot.innerHTML = `${open} aria-label="${esc(name)}"${st === 'current' ? ' aria-current="step"' : ''}>`
        + `<span class="n" part="node" aria-hidden="true">${st === 'current' && this.getAttribute('data-go') ? `<span class="go" part="bubble">${esc(this.getAttribute('data-go'))}</span>` : ''}${mark}</span>`
        + `<span class="l" part="label" aria-hidden="true">${esc(label)}</span>${starHtml}</${tag}>`;
    }
  }
  define('sav-level', SavLevel);

  /* ================================================================== sav-stat */

  /** A number that matters (a KPI): its name, the value, how it changed (green when it goes the good way) and a small trend line. */
  class SavStat extends SavElement {
    static styles = `
      :host { display: block; min-width: 0; }
      .c { position: relative; isolation: isolate; display: grid; gap: .35rem; padding: 1rem 1.1rem; }
      :host(:not([appearance="plain"])) .c::before { content: ""; position: absolute; inset: 0; z-index: -1; border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius-lg);
           background: var(--sav-color-surface); background-image: var(--sav-sheen, none); box-shadow: var(--sav-card-shadow, var(--sav-shadow-sm)); transform: rotate(${PANEL_TILT}); }
      :host([appearance="plain"]) .c { padding: 0; }
      .top { display: flex; align-items: center; gap: .5rem; color: var(--sav-color-text-muted); font-size: var(--sav-font-size-sm); font-weight: var(--sav-font-weight-semibold); }
      .ic { display: grid; place-items: center; width: 1.9rem; height: 1.9rem; margin-left: auto; position: relative; isolation: isolate; color: var(--sav-color-primary); }
      .ic::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius-sm); background: color-mix(in oklab, var(--sav-color-primary) 14%, transparent); transform: rotate(var(--sav-knob-tilt, 0deg)); }
      .ic svg, .ic sav-icon { width: 1.05rem; height: 1.05rem; }
      .ic:empty { display: none; }
      .v { font-size: var(--sav-stat-size, 1.9rem); font-weight: var(--sav-font-weight-bold); line-height: 1.1; letter-spacing: -.01em; font-variant-numeric: tabular-nums; color: var(--sav-color-text); white-space: nowrap; }
      .u { font-size: .55em; font-weight: var(--sav-font-weight-semibold); color: var(--sav-color-text-muted); margin-inline-start: .15em; }
      .u:empty { display: none; }
      /* the number never breaks; in a narrow card the trend line goes under it instead of squeezing it */
      .row { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: .5rem .75rem; min-width: 0; }
      .ch { display: inline-flex; align-items: center; gap: .2rem; padding: .1rem .4rem; border-radius: var(--sav-radius-sm); font-size: .8rem; font-weight: var(--sav-font-weight-bold); font-variant-numeric: tabular-nums;
            color: var(--_tc); background: color-mix(in oklab, var(--_tc) 12%, transparent); box-shadow: ${INK('1.5px')}; }
      .ch svg { width: .9em; height: .9em; }
      .ch:empty { display: none; }
      .good { --_tc: color-mix(in oklab, var(--sav-color-success) var(--sav-tint, 62%), var(--sav-color-text)); }
      .bad { --_tc: color-mix(in oklab, var(--sav-color-danger) var(--sav-tint, 62%), var(--sav-color-text)); }
      .flat { --_tc: var(--sav-color-text-muted); }
      .cap { font-size: .8rem; color: var(--sav-color-text-muted); }
      .cap:empty { display: none; }
      .meta { display: flex; flex-wrap: wrap; align-items: center; gap: .4rem; }
      svg.sp { flex: none; width: var(--spark-width, 6rem); height: 2.2rem; overflow: visible; }
      .sp .ar { fill: color-mix(in oklab, var(--_sc) 16%, transparent); } .sp .ln { fill: none; stroke: var(--_sc); stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; vector-effect: non-scaling-stroke; }
      .sp .dt { fill: var(--_sc); }
      /* animation: changes of colour and state ease in (paced by --sav-motion) */
      :host { animation: sav-stat-in calc(.35s * var(--sav-motion, 1)) var(--sav-easing) backwards; }
      .sp .ln { stroke-dasharray: 1; animation: sav-chart-draw calc(.8s * var(--sav-motion, 1)) var(--sav-easing) backwards; }
      @keyframes sav-stat-in { from { opacity: 0; translate: 0 6px; } }
      @keyframes sav-chart-draw { from { stroke-dashoffset: 1; } }
      @media (prefers-reduced-motion: reduce) { :host, .sp .ln { animation: none; } }
    `;
    static get observedAttributes() { return ['label', 'value', 'unit', 'prefix', 'change', 'trend', 'invert', 'caption', 'icon', 'data', 'appearance']; }
    connectedCallback() { this.render(); }
    changed() { this.render(); }
    render() {
      const A = (n) => this.getAttribute(n) ?? '';
      const ch = A('change').trim();
      const num = parseFloat(ch.replace(/[\u2212\u2013]/g, '-').replace(/[^\d.+-]/g, '')); // the typographic minus (−) counts as minus
      const trend = A('trend') || (isNaN(num) || num === 0 ? 'flat' : num > 0 ? 'up' : 'down');
      const good = trend === 'flat' ? 'flat' : (trend === 'up') !== this.hasAttribute('invert') ? 'good' : 'bad';
      const arrow = trend === 'up' ? svgIcon('trending-up') : trend === 'down' ? svgIcon('trending-down') : '';
      const vals = A('data').split(/[\s,]+/).map(Number).filter((n) => !isNaN(n));
      let spark = '';
      if (vals.length > 1) {
        const lo = Math.min(...vals), hi = Math.max(...vals), w = 100, h = 32, k = hi - lo || 1;
        const pts = vals.map((v, i) => [(i / (vals.length - 1)) * w, h - 2 - ((v - lo) / k) * (h - 4)]);
        const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
        const col = good === 'bad' ? 'var(--sav-color-danger)' : good === 'good' ? 'var(--sav-color-success)' : 'var(--sav-color-primary)';
        const [lx, ly] = pts[pts.length - 1];
        spark = `<svg class="sp" part="sparkline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="--_sc:${col}" aria-hidden="true"><path class="ar" d="${d} L${w} ${h} L0 ${h} Z"/><path class="ln" pathLength="1" d="${d}"/><circle class="dt" cx="${lx}" cy="${ly}" r="2.4" vector-effect="non-scaling-stroke"/></svg>`;
      }
      const icon = A('icon');
      const said = `${A('label')}: ${A('prefix')}${A('value')}${A('unit') ? ' ' + A('unit') : ''}${ch ? ', ' + T(this, good === 'good' ? 'better by {n}' : good === 'bad' ? 'worse by {n}' : 'changed by {n}', { n: ch }) : ''}`;
      this.shadowRoot.innerHTML = `<div class="c" part="base" role="group" aria-label="${esc(said)}">
        <div class="top"><span part="label">${esc(A('label'))}</span><span class="ic" part="icon">${icon ? svgIcon(icon) : ''}</span></div>
        <div class="row"><div><div class="v" part="value">${esc(A('prefix'))}${esc(A('value'))}<span class="u">${esc(A('unit'))}</span></div>
        <div class="meta"><span class="ch ${good}" part="change">${ch ? arrow + esc(ch) : ''}</span><span class="cap" part="caption">${esc(A('caption'))}</span></div></div>${spark}</div><slot></slot></div>`;
      tiltWatch(this.$('.c'));
    }
  }
  define('sav-stat', SavStat);

  /* ================================================================== sav-empty-state */

  /** What to show when there is nothing yet (no results, an empty inbox): a drawing, a heading, a line of text and what to do. */
  class SavEmptyState extends SavElement {
    static styles = `
      :host { display: block; }
      .e { position: relative; isolation: isolate; display: grid; justify-items: center; gap: .55rem; padding: 2.2rem 1.25rem; text-align: center; }
      :host([appearance="card"]) .e::before { content: ""; position: absolute; inset: 0; z-index: -1; border: var(--sav-border-width) dashed var(--sav-color-border-strong); border-radius: var(--sav-radius-lg);
           background: var(--sav-color-surface); transform: rotate(${PANEL_TILT}); }
      /* the drawing: the icon on a leaning tinted tile with a second one behind it, the way the style leans */
      .art { position: relative; display: grid; place-items: center; width: var(--art, 4.5rem); height: var(--art, 4.5rem); margin-bottom: .45rem; color: var(--sav-color-primary); }
      .art::before, .art::after { content: ""; position: absolute; inset: 0; border-radius: var(--sav-radius-lg); }
      .art::before { background: color-mix(in oklab, var(--sav-color-primary) 14%, var(--sav-color-surface)); transform: rotate(calc(var(--sav-knob-tilt, 0deg) - 6deg)); box-shadow: ${INK()}, ${INK_DROP('3px')}; }
      .art::after { inset: 14%; z-index: -1; background: color-mix(in oklab, var(--sav-color-primary) 30%, transparent); transform: rotate(calc(var(--sav-knob-tilt, 0deg) + 14deg)) translate(18%, -10%); opacity: .5; }
      /* the icon (or your own picture) sits on top of the two tiles */
      .art svg, .art ::slotted(*) { position: relative; z-index: 1; width: 45%; height: 45%; }
      .art ::slotted(img) { width: 70%; height: 70%; object-fit: contain; }
      :host([size="sm"]) { --art: 3.2rem; } :host([size="sm"]) .e { padding: 1.3rem 1rem; gap: .4rem; }
      :host([size="lg"]) { --art: 6rem; } :host([size="lg"]) .e { padding: 3.2rem 1.5rem; }
      .h { margin: 0; font-size: 1.15rem; font-weight: var(--sav-font-weight-bold); color: var(--sav-color-text); }
      :host([size="sm"]) .h { font-size: 1rem; } :host([size="lg"]) .h { font-size: 1.4rem; }
      .t { margin: 0; max-width: 34rem; color: var(--sav-color-text-muted); line-height: 1.55; }
      .h:empty, .t:empty { display: none; }
      .a { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; margin-top: .6rem; }
      .a[hidden] { display: none; }
      /* animation: changes of colour and state ease in (paced by --sav-motion) */
      .art { animation: sav-es-in calc(.45s * var(--sav-motion, 1)) var(--sav-easing) backwards; }
      @keyframes sav-es-in { from { opacity: 0; transform: scale(.9); } }
      @media (prefers-reduced-motion: reduce) { .art { animation: none; } }
    `;
    static get observedAttributes() { return ['icon', 'heading', 'text']; }
    connectedCallback() { this.render(); }
    changed() { this.render(); }
    render() {
      this.shadowRoot.innerHTML = `<div class="e" part="base"><div class="art" part="image" aria-hidden="true"><slot name="image">${svgIcon(this.getAttribute('icon') || 'inbox')}</slot></div>
        <p class="h" part="heading" role="heading" aria-level="${esc(this.getAttribute('level') || '3')}">${esc(this.getAttribute('heading') || '')}</p><p class="t" part="text">${esc(this.getAttribute('text') || '')}</p><slot name="text"></slot><div class="a" part="actions"><slot></slot></div></div>`;
      // no actions: no empty row under the text
      const sl = this.$('.a slot'), fill = () => (this.$('.a').hidden = !sl.assignedNodes().some((n) => n.nodeType === 1 || n.textContent.trim()));
      sl.addEventListener('slotchange', fill); fill();
      tiltWatch(this.$('.e'));
    }
  }
  define('sav-empty-state', SavEmptyState);

  /* ================================================================== sav-popover */

  /** A panel next to a button with anything inside (text, a form, a list): click the trigger to open, Esc or a click outside closes it.
      The trigger is the element in slot="trigger"; the panel follows the style (leaning in Tilt, glass in Glass). */
  class SavPopover extends SavElement {
    static styles = [FLOAT, `
      :host { display: inline-block; vertical-align: middle; --width: 20rem; }
      .pop { width: max-content; max-width: min(var(--width), calc(100vw - 16px)); padding: 1rem 1.05rem; border: var(--sav-border-width) solid var(--sav-color-border); border-radius: var(--sav-radius);
             background: var(--sav-color-surface); color: var(--sav-color-text); font-family: var(--sav-font); font-size: var(--sav-font-size-md); line-height: 1.5; text-align: start; }
      ${panelLayer('.pop')}
      .pop:popover-open, .pop.open { animation: sav-pop calc(.15s * var(--sav-motion, 1)) var(--sav-easing); }
      .head { display: flex; align-items: flex-start; gap: .5rem; margin-bottom: .4rem; }
      .h { flex: 1; font-weight: var(--sav-font-weight-bold); }
      .head:has(.h:empty):not(:has(.x:not([hidden]))) { display: none; }
      .x { display: inline-flex; margin: -.35rem -.45rem 0 auto; padding: .3rem; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); cursor: pointer; }
      .x:hover { background: var(--sav-color-surface-2); color: var(--sav-color-text); }
      .x svg { width: 1rem; height: 1rem; }
      .x[hidden] { display: none; }
      @keyframes sav-pop { from { opacity: 0; transform: translateY(4px) scale(.98); } }
      @media (prefers-reduced-motion: reduce) { .pop:popover-open, .pop.open { animation: none; } }
      /* sheet-on-mobile: on a phone the content opens in a sav-action-sheet (MobileSheet) */
      .m-sheet::part(body) { padding-bottom: calc(1.25rem + env(safe-area-inset-bottom)); }
    `];
    static get observedAttributes() { return ['heading', 'no-close', 'label']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      const id = nextId('pop');
      this.shadowRoot.innerHTML = `<slot name="trigger"></slot><div class="pop float" part="body" id="${id}" role="dialog" ${supportsPopover ? 'popover="auto"' : ''}>`
        + `<div class="head"><div class="h" part="heading"></div><button class="x" type="button" part="close-button" aria-label="${esc(T(this, 'Close'))}">${svgIcon('x')}</button></div><slot></slot></div>`;
      this._id = id;
      const trig = this.$('slot[name="trigger"]');
      trig.addEventListener('click', () => (Date.now() - (this._closedAt || 0) < 150 ? 0 : this.open ? this.hide() : this.show()));
      trig.addEventListener('slotchange', () => this.sync());
      this.$('.x').addEventListener('click', () => this.hide());
      this.$('.pop').addEventListener('toggle', (e) => { if (e.newState === 'closed') this.afterHide(); });
      this.$('.pop').addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); this.hide(); } });
      this._sheet = new MobileSheet(this, { onHide: () => this.afterHide(), returnFocus: () => this.trigger });
      if (!supportsPopover) { this._outside = (e) => { if (this.open && !this._sheet.active && !e.composedPath().includes(this)) this.hide(); }; document.addEventListener('pointerdown', this._outside); }
      this.sync();
    }
    disconnectedCallback() { if (this._outside) document.removeEventListener('pointerdown', this._outside); if (this.open) this.hide(); }
    changed() { this.sync(); }
    get trigger() { return this.querySelector(':scope > [slot="trigger"]'); }
    sync() {
      const pop = this.$('.pop'); if (!pop) return;
      this.$('.h').textContent = this.getAttribute('heading') || '';
      this.$('.x').hidden = this.hasAttribute('no-close');
      pop.setAttribute('aria-label', this.getAttribute('heading') || this.getAttribute('label') || T(this, 'Details'));
      const t = this.trigger; if (t) { t.setAttribute('aria-haspopup', 'dialog'); t.setAttribute('aria-expanded', String(this.open)); }
    }
    get open() { return this.hasAttribute('open'); }
    show() {
      const pop = this.$('.pop'), t = this.trigger; if (!t || this.open) return;
      // sheet-on-mobile: on a phone the content opens in a sav-action-sheet, titled by the heading (or the label)
      if (MobileSheet.wanted(this)) {
        const title = this.getAttribute('heading') || this.getAttribute('label') || T(this, 'Details');
        if (!this._sheet.open([this.$('.pop > slot:not([name])')], { label: title, attrs: { 'no-cancel': true, 'no-close': this.hasAttribute('no-close') } })) return;
      } else {
        tiltWatch(pop); showPop(pop);
        place(pop, t, this.getAttribute('placement') || 'bottom-start', 8);
        this._reflow ||= () => { if (!this.open || this._sheet.active) return; if (anchorGone(this.trigger)) { this.hide(); return; } place(pop, this.trigger, this.getAttribute('placement') || 'bottom-start', 8); };
        addEventListener('scroll', this._reflow, true); addEventListener('resize', this._reflow);
      }
      this.setAttribute('open', ''); t.setAttribute('aria-expanded', 'true');
      // the focus moves into the panel (its first field or button), and comes back to the trigger when it closes
      setTimeout(() => { if (!this.open) return; const F = 'input, select, textarea, button, a[href], [tabindex]:not([tabindex="-1"]), sav-input, sav-select, sav-textarea, sav-button, sav-checkbox, sav-switch, sav-copy-button, sav-search';
        const f = [...this.querySelectorAll(`:scope > :not([slot]) :is(${F}), :scope > :is(${F}):not([slot])`)].find((x) => !x.disabled && x.getClientRects().length); (f || this.$('.x:not([hidden])'))?.focus(); }, 30);
      this.emit('sav-show');
    }
    /** the focus is in the panel (checked directly: :focus-within does not match while the window is in the background) */
    get hasFocus() { return !!this.shadowRoot.activeElement || (this.contains(document.activeElement) && !this.trigger?.contains(document.activeElement)); }
    hide() { if (this._sheet.active) { this._sheet.close(); return; } this._hadFocus = this.hasFocus; hidePop(this.$('.pop')); if (!supportsPopover) this.afterHide(); }
    afterHide() {
      if (!this.open) return;
      this._closedAt = Date.now();
      this.removeAttribute('open'); this.trigger?.setAttribute('aria-expanded', 'false');
      removeEventListener('scroll', this._reflow, true); removeEventListener('resize', this._reflow);
      // the focus was in the panel (or got lost): back to the trigger
      if (this._hadFocus || this.hasFocus || document.activeElement === document.body) this.trigger?.focus?.();
      this._hadFocus = false;
      this.emit('sav-hide');
    }
  }
  props(SavPopover, { placement: String, sheetOnMobile: Boolean });
  define('sav-popover', SavPopover);

  /* ================================================================== sav-timeline */

  /** Things that happened, in order: a dot (or icon) on a line, the time, a heading and any content. */
  class SavTimeline extends SavElement {
    static styles = `:host { display: block; } ol { margin: 0; padding: 0; list-style: none; }`;
    static get observedAttributes() { return ['label', 'auto-text']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) { this.shadowRoot.innerHTML = '<ol part="base"><slot></slot></ol>'; this.$('slot').addEventListener('slotchange', () => this.sync()); }
      this.sync();
    }
    changed() { this.sync(); }
    sync() {
      this.$('ol')?.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Timeline'));
      const items = [...this.querySelectorAll(':scope > sav-timeline-item')];
      items.forEach((it, i) => it.toggleAttribute('data-last', i === items.length - 1));
      passAutoText(this, items);
    }
  }
  define('sav-timeline', SavTimeline);

  class SavTimelineItem extends SavElement {
    static styles = [VARIANTS, `
      :host { display: grid; grid-template-columns: 1.6rem minmax(0, 1fr); column-gap: .85rem; position: relative; --_c: var(--sav-color-border-strong); }
      :host([variant]) { --_c: var(--sav-color-primary); }
      :host([variant="neutral"]) { --_c: var(--sav-color-neutral); } :host([variant="success"]) { --_c: var(--sav-color-success); }
      :host([variant="warning"]) { --_c: var(--sav-color-warning); } :host([variant="danger"]) { --_c: var(--sav-color-danger); }
      .rail { position: relative; display: flex; justify-content: center; }
      .rail::after { content: ""; position: absolute; top: 1.75rem; bottom: -.25rem; left: calc(50% - 1px); width: 2px; border-radius: 2px; background: var(--sav-color-border); }
      :host([data-last]) .rail::after { display: none; }
      /* the dot (or icon) takes the style's knob shape and lean */
      .dot { position: relative; isolation: isolate; display: grid; place-items: center; width: 1.6rem; height: 1.6rem; margin-top: .05rem; color: var(--sav-color-on-primary); }
      .dot::before { content: ""; position: absolute; inset: .45rem; z-index: -1; border-radius: var(--sav-knob-radius, 50%); background: var(--_c); box-shadow: ${INK('1.5px')}, 0 0 0 4px color-mix(in oklab, var(--_c) 18%, transparent);
                     transform: rotate(var(--sav-knob-tilt, 0deg)); }
      :host([icon]) .dot::before { inset: 0; box-shadow: ${INK()}; }
      :host([icon]:not([variant])) .dot { color: var(--sav-color-text); } :host([icon]:not([variant])) .dot::before { background: var(--sav-color-surface-2); box-shadow: inset 0 0 0 1px var(--sav-color-border); }
      :host([variant="warning"]) .dot { color: var(--sav-color-on-warning); }
      .dot svg, .dot sav-icon { width: .85rem; height: .85rem; }
      .body { min-width: 0; padding-bottom: 1.4rem; }
      :host([data-last]) .body { padding-bottom: 0; }
      .time { display: block; font-size: .78rem; font-weight: var(--sav-font-weight-semibold); color: var(--sav-color-text-muted); font-variant-numeric: tabular-nums; }
      .h { display: block; margin-top: .1rem; font-weight: var(--sav-font-weight-semibold); color: var(--sav-color-text); }
      .time:empty, .h:empty { display: none; }
      .c { margin-top: .25rem; color: var(--sav-color-text-muted); line-height: 1.55; }
      .c[hidden] { display: none; }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: var(--_c); }
      :host([icon]:not([variant])) { --_eb: var(--sav-color-bg); }
      :host(:is([auto-text], [data-auto-text])[icon]) .dot { color: ${AUTO_TEXT}; }
      /* animation: changes of colour and state ease in (paced by --sav-motion) */
      :host { animation: sav-tl-in calc(.35s * var(--sav-motion, 1)) var(--sav-easing) backwards; }
      @keyframes sav-tl-in { from { opacity: 0; translate: 0 6px; } }
      @media (prefers-reduced-motion: reduce) { :host { animation: none; } }
    `];
    static get observedAttributes() { return ['time', 'heading', 'icon', 'variant', 'datetime']; }
    connectedCallback() { this.setAttribute('role', 'listitem'); this.render(); }
    changed() { this.render(); }
    render() {
      const icon = this.getAttribute('icon'), dt = this.getAttribute('datetime');
      this.shadowRoot.innerHTML = `<div class="rail" aria-hidden="true"><span class="dot" part="dot">${icon ? svgIcon(icon) : ''}</span></div><div class="body" part="base">`
        + `<time class="time" part="time" ${dt ? `datetime="${esc(dt)}"` : ''}>${esc(this.getAttribute('time') || '')}</time><span class="h" part="heading">${esc(this.getAttribute('heading') || '')}</span><div class="c" part="content"><slot></slot></div></div>`;
      const sl = this.$('.c slot'), fill = () => (this.$('.c').hidden = !sl.assignedNodes().some((n) => n.nodeType === 1 || n.textContent.trim()));
      sl.addEventListener('slotchange', fill); fill();
    }
  }
  define('sav-timeline-item', SavTimelineItem);

  /* ================================================================== sav-tree */

  /** Nested items that open and close (folders, sections): arrows move, → opens, ← closes or goes to the parent, Enter chooses.
      Items are sav-tree-item, each with its own sav-tree-item inside. */
  class SavTree extends SavElement {
    static styles = `:host { display: block; } .t { display: grid; gap: 1px; padding: .25rem; outline: none; }`;
    static get observedAttributes() { return ['label', 'selectable', 'auto-text']; }
    connectedCallback() {
      if (this.shadowRoot.firstChild) return;
      this.shadowRoot.innerHTML = '<div class="t" part="base" role="tree"><slot></slot></div>';
      this.$('.t').setAttribute('aria-label', this.getAttribute('label') || T(this, 'Tree'));
      this.$('slot').addEventListener('slotchange', () => this.sync());
      this.addEventListener('keydown', (e) => this.key(e));
      this.addEventListener('click', (e) => {
        const row = e.composedPath().find((n) => n.classList?.contains('row')); if (!row) return;
        const it = row.getRootNode().host; if (!it || it.closest('sav-tree') !== this || it.hasAttribute('disabled')) return;
        if (e.composedPath().some((n) => n.classList?.contains('tw'))) { this.toggle(it); this.focusItem(it); return; }
        this.choose(it);
      });
      this.sync();
    }
    changed(name, v) { if (name === 'label') this.$('.t')?.setAttribute('aria-label', v || T(this, 'Tree')); if (name === 'auto-text') this.sync(); }
    get items() { return [...this.querySelectorAll('sav-tree-item')]; }
    /** the items you can see right now (their parents are open) */
    get visible() { return this.items.filter((it) => { for (let p = it.parentElement; p && p !== this; p = p.parentElement) if (p.localName === 'sav-tree-item' && !p.hasAttribute('expanded')) return false; return true; }); }
    sync() {
      const all = this.items;
      passAutoText(this, all);
      all.forEach((it) => { let lv = 1; for (let p = it.parentElement; p && p !== this; p = p.parentElement) if (p.localName === 'sav-tree-item') lv++; it.setAttribute('aria-level', String(lv)); it.style.setProperty('--level', lv - 1); it.render?.(); });
      // one item takes the Tab key: the selected one, or the first
      const vis = this.visible, sel = all.find((it) => it.hasAttribute('selected') && vis.includes(it)) || vis[0];
      all.forEach((it) => (it.tabIndex = it === sel ? 0 : -1));
    }
    focusItem(it) { if (!it) return; this.items.forEach((x) => (x.tabIndex = x === it ? 0 : -1)); it.focus(); }
    toggle(it, open = !it.hasAttribute('expanded')) {
      if (!it.hasChildren) return;
      it.toggleAttribute('expanded', open);
      this.emit('sav-toggle', { item: it, expanded: open, value: it.value });
    }
    choose(it) {
      if (it.hasChildren && !this.hasAttribute('selectable')) { this.toggle(it); this.focusItem(it); return; }
      this.items.forEach((x) => x.toggleAttribute('selected', x === it));
      this.focusItem(it);
      this.emit('sav-select', { item: it, value: it.value });
    }
    key(e) {
      const it = e.target.closest?.('sav-tree-item'); if (!it || it.closest('sav-tree') !== this) return;
      const vis = this.visible, i = vis.indexOf(it), parent = it.parentElement?.closest('sav-tree-item');
      const go = (n) => { e.preventDefault(); this.focusItem(n); };
      switch (e.key) {
        case 'ArrowDown': go(vis[Math.min(vis.length - 1, i + 1)]); break;
        case 'ArrowUp': go(vis[Math.max(0, i - 1)]); break;
        case 'Home': go(vis[0]); break;
        case 'End': go(vis[vis.length - 1]); break;
        case 'ArrowRight': e.preventDefault(); if (it.hasChildren) { if (!it.hasAttribute('expanded')) this.toggle(it, true); else this.focusItem(it.querySelector(':scope > sav-tree-item')); } break;
        case 'ArrowLeft': e.preventDefault(); if (it.hasChildren && it.hasAttribute('expanded')) this.toggle(it, false); else if (parent && parent.closest('sav-tree') === this) this.focusItem(parent); break;
        case 'Enter': case ' ': e.preventDefault(); this.choose(it); break;
      }
    }
  }
  define('sav-tree', SavTree);

  class SavTreeItem extends SavElement {
    static styles = `
      :host { display: block; outline: none; }
      .row { position: relative; isolation: isolate; display: flex; align-items: center; gap: .45rem; min-height: 2rem; padding: .2rem .55rem .2rem calc(.35rem + var(--level, 0) * 1.15rem);
             border-radius: var(--sav-radius-sm); color: var(--sav-color-text); cursor: pointer; user-select: none; font-size: var(--sav-font-size-md); }
      .row::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_b, transparent); box-shadow: var(--_s, none); transform: rotate(${TILT}); }
      .row:hover { --_b: var(--sav-color-surface-2); }
      :host(:focus-visible) > .row { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: -2px; }
      /* the chosen item: the same highlight as the current page of the breadcrumb */
      :host([selected]) > .row { color: var(--sav-breadcrumb-current-fg, color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)));
             --_b: var(--sav-breadcrumb-current-bg, color-mix(in oklab, var(--sav-color-primary) 14%, transparent)); --_s: var(--sav-breadcrumb-current-shadow, none); font-weight: var(--sav-font-weight-semibold); }
      :host([disabled]) > .row { opacity: .45; cursor: not-allowed; }
      .tw { display: grid; place-items: center; flex: none; width: 1.3rem; height: 1.3rem; margin: 0; padding: 0; border: 0; border-radius: var(--sav-radius-sm); background: none; color: var(--sav-color-text-muted); cursor: pointer; }
      .tw svg { width: .95rem; height: .95rem; transition: transform calc(.18s * var(--sav-motion, 1)) var(--sav-easing); }
      :host([expanded]) > .row .tw svg { transform: rotate(90deg); }
      .tw.leaf { visibility: hidden; }
      .ic { display: inline-flex; flex: none; color: var(--sav-color-text-muted); } .ic:empty { display: none; }
      :host([selected]) > .row .ic { color: inherit; }
      .ic svg, .ic sav-icon { width: 1.05rem; height: 1.05rem; }
      .lb { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .kids { display: none; }
      :host([expanded]) > .kids { display: block; }
      @media (prefers-reduced-motion: reduce) { .tw svg { transition: none; } }
      /* auto-text: black or white, whichever is readable on what is behind the text */
      :host { --_eb: ${CUR_EB(14)}; }
      :host(:is([auto-text], [data-auto-text])[selected]) > .row { color: ${AUTO_TEXT}; }
    `;
    static get observedAttributes() { return ['label', 'icon', 'icon-open', 'expanded', 'selected', 'disabled']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = '<div class="row" part="item"><span class="tw" part="toggle" aria-hidden="true"></span><span class="ic" part="icon"></span><span class="lb" part="label"></span></div><div class="kids" role="group" part="children"><slot></slot></div>';
        this.$('slot').addEventListener('slotchange', () => this.render());
      }
      this.setAttribute('role', 'treeitem');
      if (!this.hasAttribute('tabindex')) this.tabIndex = -1;
      this.render();
    }
    changed() { this.render(); }
    get hasChildren() { return !!this.querySelector(':scope > sav-tree-item'); }
    get value() { return this.getAttribute('value') ?? this.getAttribute('label') ?? ''; }
    render() {
      if (!this.shadowRoot.firstChild) return;
      const kids = this.hasChildren, open = this.hasAttribute('expanded');
      const tw = this.$('.tw'); tw.classList.toggle('leaf', !kids); tw.innerHTML = kids ? svgIcon('chevron-right') : '';
      const ic = (open && this.getAttribute('icon-open')) || this.getAttribute('icon');
      this.$('.ic').innerHTML = ic ? svgIcon(ic) : '';
      this.$('.lb').textContent = this.getAttribute('label') || '';
      kids ? this.setAttribute('aria-expanded', String(open)) : this.removeAttribute('aria-expanded');
      this.setAttribute('aria-selected', String(this.hasAttribute('selected')));
      this.hasAttribute('disabled') ? this.setAttribute('aria-disabled', 'true') : this.removeAttribute('aria-disabled');
    }
  }
  define('sav-tree-item', SavTreeItem);

  /* ================================================================== sav-command */

  /** A command palette: a search box over the page with everything you can do or open; type, move with the arrows, Enter.
      Commands are <option> children (value, data-icon, data-shortcut, data-description, data-href, in <optgroup>s) or the commands property.
      hotkey="mod+k" opens it from anywhere (⌘K on a Mac, Ctrl+K elsewhere). */
  const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  class SavCommand extends SavElement {
    static styles = `
      :host { display: contents; }
      dialog { width: min(38rem, calc(100vw - 24px)); max-height: min(30rem, calc(100dvh - 4rem)); margin: 12vh auto auto; padding: 0; border: 0; background: transparent; color: var(--sav-color-text); overflow: visible; }
      dialog::backdrop { background: var(--sav-color-overlay, rgb(0 0 0 / .35)); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); }
      dialog[open] { animation: sav-cmd calc(.16s * var(--sav-motion, 1)) var(--sav-easing); }
      .pnl { position: relative; isolation: isolate; display: flex; flex-direction: column; max-height: inherit; border-radius: var(--sav-radius-lg); font-family: var(--sav-font); }
      .pnl::before { content: ""; position: absolute; inset: 0; z-index: -1; border: var(--sav-border-width) solid var(--sav-color-border); border-radius: inherit; background: var(--sav-color-surface);
                     background-image: var(--sav-sheen, none); box-shadow: var(--sav-panel-shadow, var(--sav-shadow-lg)); -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none); transform: rotate(${PANEL_TILT}); }
      .q { display: flex; align-items: center; gap: .65rem; padding: .85rem 1rem; border-bottom: var(--sav-border-width) solid var(--sav-color-border); }
      .q svg { width: 1.15rem; height: 1.15rem; color: var(--sav-color-text-muted); flex: none; }
      input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; color: var(--sav-color-text); font: inherit; font-size: 1.05rem; }
      input::placeholder { color: var(--sav-color-text-muted); }
      .esc { flex: none; padding: .15rem .4rem; border: 1px solid var(--sav-color-border-strong); border-radius: 4px; color: var(--sav-color-text-muted); font: 600 .7rem var(--sav-font-mono, monospace); cursor: pointer; background: none; }
      .list { flex: 1; min-height: 0; overflow: auto; padding: .4rem; overscroll-behavior: contain; }
      .grp { padding: .55rem .6rem .25rem; font-size: .7rem; font-weight: var(--sav-font-weight-bold); letter-spacing: .07em; text-transform: uppercase; color: var(--sav-color-text-muted); }
      .it { position: relative; isolation: isolate; display: flex; align-items: center; gap: .7rem; padding: .55rem .6rem; border-radius: var(--sav-radius-sm); cursor: pointer; color: var(--sav-color-text); text-decoration: none; }
      .it::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--_b, transparent); transform: rotate(${TILT}); }
      .it[aria-selected="true"] { --_b: color-mix(in oklab, var(--sav-color-primary) 14%, transparent); }
      .it .i { display: inline-flex; flex: none; color: var(--sav-color-text-muted); } .it[aria-selected="true"] .i { color: var(--sav-color-primary); }
      .it .i svg, .it .i sav-icon { width: 1.1rem; height: 1.1rem; }
      .it .t { flex: 1; min-width: 0; display: grid; } .it b { font-weight: var(--sav-font-weight-semibold); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .it small { color: var(--sav-color-text-muted); font-size: .8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .it small:empty { display: none; }
      .it mark { background: none; color: inherit; text-decoration: underline; text-decoration-thickness: 2px; text-decoration-color: color-mix(in oklab, var(--sav-color-primary) 70%, transparent); text-underline-offset: 2px; }
      .kb { display: inline-flex; gap: .2rem; flex: none; }
      .kb span { min-width: 1.35rem; padding: .05rem .35rem; border: 1px solid var(--sav-color-border-strong); border-bottom-width: 2px; border-radius: 4px; color: var(--sav-color-text-muted); font: 600 .7rem var(--sav-font-mono, monospace); text-align: center; }
      .none { padding: 1.4rem 1rem; text-align: center; color: var(--sav-color-text-muted); }
      .foot { display: flex; gap: 1rem; padding: .5rem .9rem; border-top: var(--sav-border-width) solid var(--sav-color-border); color: var(--sav-color-text-muted); font-size: .75rem; }
      .foot b { font-family: var(--sav-font-mono, monospace); font-weight: 600; }
      @keyframes sav-cmd { from { opacity: 0; transform: translateY(-6px) scale(.98); } }
      @media (prefers-reduced-motion: reduce) { dialog[open] { animation: none; } }
      @media (max-width: 560px) { dialog { margin-top: 1rem; } .foot { display: none; } }
    `;
    static get observedAttributes() { return ['placeholder', 'hotkey', 'empty-label', 'label']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        const id = nextId('cmd');
        this.shadowRoot.innerHTML = `<dialog part="dialog" aria-label="${esc(T(this, 'Commands'))}"><div class="pnl" part="base"><div class="q">${svgIcon('search')}<input part="input" role="combobox" aria-expanded="true" aria-controls="${id}" aria-autocomplete="list" autocomplete="off" spellcheck="false"><button class="esc" type="button" part="close-button" aria-label="${esc(T(this, 'Close'))}">Esc</button></div>`
          + `<div class="list" part="list" id="${id}" role="listbox"></div><div class="foot" aria-hidden="true"><span><b>↑↓</b> ${esc(T(this, 'move'))}</span><span><b>↵</b> ${esc(T(this, 'open'))}</span><span><b>Esc</b> ${esc(T(this, 'close'))}</span></div></div></dialog>`;
        const dlg = this.$('dialog'), inp = this.$('input');
        inp.addEventListener('input', () => { this._a = 0; this.paint(); });
        inp.addEventListener('keydown', (e) => {
          const n = this._shown?.length || 0;
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (n) { this._a = (this._a + (e.key === 'ArrowDown' ? 1 : -1) + n) % n; this.mark(); } }
          else if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); this.run(this._shown?.[this._a]); }
        });
        this.$('.list').addEventListener('click', (e) => { const it = e.target.closest('.it'); if (it) { e.preventDefault(); this.run(this._shown[Number(it.dataset.i)]); } });
        this.$('.list').addEventListener('pointermove', (e) => { const it = e.target.closest('.it'); if (it && Number(it.dataset.i) !== this._a) { this._a = Number(it.dataset.i); this.mark(false); } });
        this.$('.esc').addEventListener('click', () => this.hide());
        dlg.addEventListener('click', (e) => { if (e.target === dlg) this.hide(); }); // a click on the backdrop
        dlg.addEventListener('close', () => { if (this.hasAttribute('open')) { this.removeAttribute('open'); this._back?.focus?.(); this.emit('sav-hide'); } });
      }
      this._key ||= (e) => {
        const hk = (this.getAttribute('hotkey') || '').toLowerCase(); if (!hk || e.defaultPrevented) return; // two palettes with the same shortcut: only one answers
        const [mod, k] = hk.includes('+') ? hk.split('+') : ['', hk];
        const modOk = !mod || (mod === 'mod' ? (IS_MAC ? e.metaKey : e.ctrlKey) : mod === 'ctrl' ? e.ctrlKey : mod === 'meta' ? e.metaKey : mod === 'alt' ? e.altKey : mod === 'shift' ? e.shiftKey : false);
        if (modOk && e.key.toLowerCase() === k && !e.repeat) { e.preventDefault(); this.open ? this.hide() : this.show(); }
      };
      document.addEventListener('keydown', this._key);
      this.sync();
    }
    disconnectedCallback() { document.removeEventListener('keydown', this._key); }
    changed() { this.sync(); }
    sync() { const inp = this.$('input'); if (!inp) return; inp.placeholder = this.getAttribute('placeholder') || T(this, 'Type a command or search…'); inp.setAttribute('aria-label', this.getAttribute('label') || T(this, 'Search commands')); this.$('dialog').setAttribute('aria-label', this.getAttribute('label') || T(this, 'Commands')); }
    /** the commands: from <option> children (in <optgroup>s for groups) or set with this property */
    get commands() {
      return this._cmds ?? [...this.querySelectorAll('option')].map((o) => ({ label: o.textContent.trim(), value: o.value || o.textContent.trim(), icon: o.dataset.icon || '', shortcut: o.dataset.shortcut || '',
        description: o.dataset.description || '', href: o.dataset.href || '', keywords: o.dataset.keywords || '', group: o.parentElement?.localName === 'optgroup' ? o.parentElement.label : '', disabled: o.disabled }));
    }
    set commands(list) { this._cmds = (list || []).map((x) => (typeof x === 'string' ? { label: x, value: x } : x)); if (this.open) this.paint(); }
    get open() { return this.hasAttribute('open'); }
    show() {
      if (this.open) return;
      this._back = document.activeElement;
      this.setAttribute('open', '');
      const inp = this.$('input'); inp.value = ''; this._a = 0; this.paint();
      this.$('dialog').showModal(); tiltWatch(this.$('.pnl')); inp.focus();
      this.emit('sav-show');
    }
    hide() { this.$('dialog')?.open && this.$('dialog').close(); }
    paint() {
      // accents do not count ("citta" finds "Città"); every word must be somewhere in the label, description, keywords or group
      const fold = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const q = fold(this.$('input').value.trim()), words = q.split(/\s+/).filter(Boolean);
      const all = this.commands.filter((c) => !c.disabled);
      const hit = (c) => { const hay = fold(`${c.label} ${c.description || ''} ${c.keywords || ''} ${c.group || ''}`); return words.every((w) => hay.includes(w)); };
      const rank = (c) => (fold(c.label).startsWith(q) ? 2 : words.every((w) => fold(c.label).includes(w)) ? 1 : 0); // the label first, then the rest
      const shown = (this._shown = words.length ? all.filter(hit).sort((a, b) => rank(b) - rank(a)) : all);
      this._a = Math.min(this._a || 0, Math.max(0, shown.length - 1));
      const keys = (s) => s ? `<span class="kb">${s.split('+').map((k) => `<span>${esc(keyName(k, this))}</span>`).join('')}</span>` : '';
      const hl = (t) => { let h = esc(t); for (const w of words) h = h.replace(new RegExp(`(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'), '<mark>$1</mark>'); return h; };
      let html = '', group = null;
      shown.forEach((c, i) => {
        if ((c.group || '') !== group) { group = c.group || ''; if (group) html += `<div class="grp" role="presentation">${esc(group)}</div>`; }
        html += `<div class="it" role="option" id="${this.$('.list').id}-${i}" data-i="${i}" aria-selected="${i === this._a}"><span class="i">${c.icon ? svgIcon(c.icon) : ''}</span><span class="t"><b>${hl(c.label)}</b><small>${esc(c.description || '')}</small></span>${keys(c.shortcut)}</div>`;
      });
      this.$('.list').innerHTML = html || `<div class="none">${esc(this.getAttribute('empty-label') || T(this, 'Nothing found'))}</div>`;
      this.mark(false);
    }
    mark(scroll = true) {
      this.$$('.it').forEach((el) => el.setAttribute('aria-selected', String(Number(el.dataset.i) === this._a)));
      const on = this.$(`.it[data-i="${this._a}"]`);
      this.$('input').setAttribute('aria-activedescendant', on ? on.id : '');
      if (scroll) on?.scrollIntoView({ block: 'nearest' });
    }
    run(c) {
      if (!c) return;
      if (!this.emit('sav-select', { value: c.value, item: c }, true)) return;
      this.hide();
      if (c.href) location.href = c.href;
    }
  }
  /** how a key is written: ⌘ ⇧ ⌥ on a Mac, Ctrl Shift Alt elsewhere; "mod" is ⌘ on a Mac and Ctrl elsewhere */
  const keyName = (k, el) => {
    const t = k.trim().toLowerCase(), W = (w) => (el ? T(el, w) : w); // key names that are words follow the language (Maiusc, Spazio, Canc…)
    const mac = { mod: '⌘', meta: '⌘', cmd: '⌘', ctrl: '⌃', shift: '⇧', alt: '⌥', option: '⌥' }, pc = { mod: 'Ctrl', meta: 'Win', cmd: 'Ctrl', ctrl: 'Ctrl', shift: 'Shift', alt: 'Alt', option: 'Alt' };
    const any = { enter: '↵', return: '↵', esc: 'Esc', escape: 'Esc', tab: 'Tab', space: 'Space', up: '↑', down: '↓', left: '←', right: '→', backspace: '⌫', delete: 'Del', del: 'Del' };
    const name = (IS_MAC ? mac : pc)[t] || any[t];
    return name ? (/^[A-Za-z]/.test(name) ? W(name) : name) : t.length === 1 ? t.toUpperCase() : k.trim();
  };
  const keySpoken = (k, el) => {
    const w = { mod: IS_MAC ? 'Command' : 'Control', meta: IS_MAC ? 'Command' : 'Windows', cmd: 'Command', ctrl: 'Control', shift: 'Shift', alt: IS_MAC ? 'Option' : 'Alt', option: 'Option', enter: 'Enter', esc: 'Escape' }[k.trim().toLowerCase()];
    return w ? (el ? T(el, w) : w) : keyName(k, el);
  };
  define('sav-command', SavCommand);

  /* ================================================================== sav-kbd */

  /** Keys to press, as keycaps: <sav-kbd>mod+K</sav-kbd> shows ⌘ K on a Mac and Ctrl K elsewhere. */
  class SavKbd extends SavElement {
    static styles = `
      :host { display: inline-flex; vertical-align: baseline; }
      .k { display: inline-flex; align-items: center; gap: .2em; }
      .c { position: relative; isolation: isolate; display: inline-grid; place-items: center; min-width: 1.75em; padding: .15em .45em .22em; color: var(--sav-color-text); font: 600 .85em/1.2 var(--sav-font-mono, ui-monospace, monospace); }
      .c::before { content: ""; position: absolute; inset: 0; z-index: -1; border: 1px solid var(--sav-color-border-strong); border-bottom-width: 2px; border-radius: min(var(--sav-radius-sm), 5px);
                   background: var(--sav-color-surface); box-shadow: var(--sav-kbd-shadow, 0 1px 0 var(--sav-color-border)); transform: rotate(var(--sav-knob-tilt, 0deg)); }
      .p { color: var(--sav-color-text-muted); font-size: .75em; }
      :host([size="sm"]) .c { font-size: .75em; } :host([size="lg"]) .c { font-size: 1em; }
    `;
    static get observedAttributes() { return ['keys']; }
    connectedCallback() { if (!this._mo) { this._mo = new MutationObserver(() => this.render()); this._mo.observe(this, { childList: true, characterData: true, subtree: true }); } this.render(); }
    disconnectedCallback() { this._mo?.disconnect(); this._mo = null; }
    changed() { this.render(); }
    render() {
      const raw = (this.getAttribute('keys') || this.textContent || '').trim();
      // "mod+K" is one shortcut; "mod+K, mod+P" or "G then I" are several
      const combos = raw.split(/\s*(?:,|\bthen\b)\s*/i).filter(Boolean);
      const cap = (k) => `<kbd class="c" part="key">${esc(keyName(k, this))}</kbd>`, then = T(this, 'then');
      this.shadowRoot.innerHTML = `<span class="k" part="base" role="img" aria-label="${esc(combos.map((c) => c.split('+').map((k) => keySpoken(k, this)).join(' + ')).join(`, ${then} `))}">`
        + combos.map((c) => c.split('+').filter(Boolean).map(cap).join('')).join(`<span class="p">${esc(then)}</span>`) + '</span>';
    }
  }
  props(SavKbd, { size: String });
  define('sav-kbd', SavKbd);


  /* ================================================================== sav-zoom */

  /** A zoom control: "−", the percentage, "+". A click on the percentage goes back to 100%.
      With for="id" it zooms that element itself (CSS zoom); otherwise the page listens to change (detail.value). */
  class SavZoom extends SavElement {
    static styles = [SIZES, `
      :host { display: inline-flex; vertical-align: middle; }
      .z { position: relative; isolation: isolate; display: inline-flex; align-items: center; height: var(--_h); font-size: var(--_fs); color: var(--sav-color-text); }
      .z::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: var(--sav-radius); background: var(--sav-color-input-bg); background-image: var(--sav-field-sheen, var(--sav-sheen, none));
                   border: var(--sav-border-width) solid var(--sav-color-border-strong); box-shadow: var(--sav-field-shadow, var(--sav-control-shadow, inset 0 1px 2px rgb(20 24 40 / .05))); transform: rotate(${TILT});
                   -webkit-backdrop-filter: var(--sav-backdrop, none); backdrop-filter: var(--sav-backdrop, none); }
      button { position: relative; display: inline-grid; place-items: center; height: calc(100% - 6px); min-width: calc(var(--_h) - 6px); margin: 3px; padding: 0 .4rem; border: 0;
               border-radius: calc(var(--sav-radius) - 2px); background: none; color: inherit; font: inherit; cursor: pointer;
               transition: background calc(var(--sav-duration) * var(--sav-motion, 1)), color calc(var(--sav-duration) * var(--sav-motion, 1)); }
      button:hover:not(:disabled) { background: var(--sav-color-surface-2); }
      button:active:not(:disabled) { background: color-mix(in oklab, var(--sav-color-text) 12%, transparent); }
      button:focus-visible { outline: var(--sav-focus-width) solid var(--sav-color-focus); outline-offset: 0; }
      button:disabled { opacity: .4; cursor: not-allowed; }
      .v { min-width: 4.4em; margin-inline: 0; font-weight: var(--sav-font-weight-semibold); font-variant-numeric: tabular-nums; }
      /* not at 100%: the percentage is tinted, a hint that a click brings it back */
      :host(:not([data-at-reset])) .v { color: color-mix(in oklab, var(--sav-color-primary) var(--sav-tint, 62%), var(--sav-color-text)); }
      .s { flex: none; width: 1px; align-self: stretch; margin: .55em 0; background: var(--sav-color-border); }
      :host([appearance="plain"]) .z::before { display: none; }
      :host([appearance="plain"]) .s { display: none; }
      svg { width: 1em; height: 1em; }
      .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    `];
    static get observedAttributes() { return ['value', 'min', 'max', 'step', 'reset', 'for', 'label', 'reset-label', 'decrease-label', 'increase-label']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = `<div class="z" part="base" role="group"><button type="button" class="m" part="decrease">${svgIcon('minus')}</button><span class="s"></span>`
          + `<button type="button" class="v" part="value"></button><span class="s"></span><button type="button" class="p" part="increase">${svgIcon('plus')}</button></div><span class="sr" aria-live="polite"></span>`;
        this.$('.m').addEventListener('click', () => this.stepBy(-1));
        this.$('.p').addEventListener('click', () => this.stepBy(1));
        this.$('.v').addEventListener('click', () => this.reset());
        // keyboard inside the control: + and − change it, 0 goes back
        this.$('.z').addEventListener('keydown', (e) => {
          if (e.key === '+' || e.key === '=') { e.preventDefault(); this.stepBy(1); } else if (e.key === '-' || e.key === '_') { e.preventDefault(); this.stepBy(-1); } else if (e.key === '0') { e.preventDefault(); this.reset(); }
        });
        tiltWatch(this.$('.z'));
      }
      this.sync();
    }
    changed() { this.sync(); }
    num(name, d) { const v = Number(this.getAttribute(name)); return this.hasAttribute(name) && Number.isFinite(v) ? v : d; }
    get min() { return this.num('min', 25); }
    get max() { return Math.max(this.min, this.num('max', 200)); }
    get step() { return Math.max(1, this.num('step', 10)); }
    /** the value a click on the percentage goes back to (default 100) */
    get resetValue() { return this.clamp(this.num('reset', 100)); }
    clamp(v) { return Math.min(this.max, Math.max(this.min, Math.round(v))); }
    get value() { return this.clamp(this.num('value', this.num('reset', 100))); }
    set value(v) { this.setAttribute('value', String(this.clamp(Number(v)))); }
    /** one step up or down, landing on a multiple of step (from 95: + goes to 100, not 105) */
    stepBy(dir) {
      const v = this.value, s = this.step;
      this.set(dir > 0 ? Math.floor(v / s) * s + s : Math.ceil(v / s) * s - s);
    }
    reset() { this.set(this.resetValue); }
    /** sets the value as the user does: sav-zoom (cancelable), then input and change */
    set(v) {
      const n = this.clamp(v); if (n === this.value) return;
      if (!this.emit('sav-zoom', { value: n }, true)) return;
      this.value = n;
      const sr = this.$('.sr'); if (sr) sr.textContent = `${n}%`;
      this.emit('input', { value: n }); this.emit('change', { value: n });
    }
    sync() {
      if (!this.shadowRoot.firstChild) return;
      const v = this.value, r = this.resetValue, A = (n, d) => this.getAttribute(n) || d;
      this.$('.z').setAttribute('aria-label', A('label', T(this, 'Zoom')));
      this.$('.v').textContent = `${v}%`;
      this.$('.v').setAttribute('aria-label', `${v}%. ${A('reset-label', T(this, 'Back to {r}%', { r }))}`);
      this.$('.v').title = A('reset-label', T(this, 'Back to {r}%', { r }));
      this.$('.m').setAttribute('aria-label', A('decrease-label', T(this, 'Zoom out'))); this.$('.m').title = A('decrease-label', T(this, 'Zoom out'));
      this.$('.p').setAttribute('aria-label', A('increase-label', T(this, 'Zoom in'))); this.$('.p').title = A('increase-label', T(this, 'Zoom in'));
      this.$('.m').disabled = v <= this.min; this.$('.p').disabled = v >= this.max;
      this.toggleAttribute('data-at-reset', v === r);
      // for="id": that element is zoomed directly
      const id = this.getAttribute('for'), el = id && document.getElementById(id);
      if (el) el.style.zoom = v === 100 ? '' : String(v / 100);
    }
  }
  define('sav-zoom', SavZoom);

  /* ================================================================== sav-relative-time */

  /** A moment written the way people say it — "3 minutes ago", "in 2 days" — kept up to date; the full date shows on hover.
      datetime is a date ("2026-11-19T10:30"), or a number of milliseconds; format="date" or "datetime" writes the date instead. */
  const RT_ALL = new Set();
  let rtTimer = null;
  const rtTick = () => { RT_ALL.forEach((el) => el.render()); };
  class SavRelativeTime extends SavElement {
    static styles = `:host { display: inline; } time { font-variant-numeric: tabular-nums; }`;
    static get observedAttributes() { return ['datetime', 'locale', 'format', 'numeric']; }
    connectedCallback() { RT_ALL.add(this); rtTimer ||= setInterval(rtTick, 30000); this.render(); }
    disconnectedCallback() { RT_ALL.delete(this); if (!RT_ALL.size) { clearInterval(rtTimer); rtTimer = null; } }
    changed() { this.render(); }
    get date() { const v = this.getAttribute('datetime'); if (!v) return new Date(); const d = /^-?\d+$/.test(v) ? new Date(Number(v)) : new Date(v); return isNaN(d) ? null : d; }
    render() {
      const d = this.date, loc = userLocale(this);
      if (!d) { this.shadowRoot.innerHTML = `<time part="base">${esc(this.getAttribute('datetime') || '')}</time>`; return; }
      const fmt = this.getAttribute('format') || 'relative';
      const full = new Intl.DateTimeFormat(loc, { dateStyle: 'long', timeStyle: 'short' }).format(d);
      let text;
      if (fmt === 'date') text = new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(d);
      else if (fmt === 'datetime') text = full;
      else {
        const s = (d.getTime() - Date.now()) / 1000, a = Math.abs(s);
        const [n, u] = a < 45 ? [s, 'second'] : a < 2700 ? [s / 60, 'minute'] : a < 79200 ? [s / 3600, 'hour'] : a < 25 * 86400 ? [s / 86400, 'day'] : a < 320 * 86400 ? [s / (30.44 * 86400), 'month'] : [s / (365.25 * 86400), 'year'];
        const rtf = new Intl.RelativeTimeFormat(loc, { numeric: this.getAttribute('numeric') || 'auto' });
        text = u === 'second' && a < 10 ? rtf.format(0, 'second') : rtf.format(Math.round(n), u);
      }
      this.shadowRoot.innerHTML = `<time part="base" datetime="${d.toISOString()}" title="${esc(full)}">${esc(text)}</time>`;
    }
  }
  define('sav-relative-time', SavRelativeTime);

  /* ================================================================== sav-infinite-scroll */

  /** Loads more as you reach the end of a list: when the end comes near it fires sav-load; the page adds the items and calls
      done() (or done(false) when there is nothing more, or fail() on an error). In between it shows a spinner; at the end a line;
      on an error a "Try again" button. mode="button" shows a "Load more" button instead of loading by itself.
      It watches the window, or itself when it has a height and scrolls (style="max-height: 24rem; overflow: auto"). */
  class SavInfiniteScroll extends SavElement {
    static styles = `
      :host { display: block; }
      .end { display: flex; align-items: center; justify-content: center; gap: .6rem; min-height: 3rem; padding: .75rem; color: var(--sav-color-text-muted); font-size: var(--sav-font-size-sm); }
      /* loading: the spinner and its text side by side, centred on the same line, with room between them */
      .ld, .err { display: inline-flex; align-items: center; gap: .75rem; line-height: 1.3; }
      .end sav-spinner { flex: none; font-size: 1.35rem; }
      .err { flex-wrap: wrap; justify-content: center; text-align: center; }
      .line { display: flex; align-items: center; gap: .75rem; width: 100%; max-width: 26rem; }
      .line::before, .line::after { content: ""; flex: 1; height: 1px; background: var(--sav-color-border); }
      [hidden] { display: none !important; }
      .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    `;
    static get observedAttributes() { return ['threshold', 'mode', 'end-label', 'more-label', 'loading-label', 'error-label', 'retry-label']; }
    connectedCallback() {
      if (!this.shadowRoot.firstChild) {
        this.shadowRoot.innerHTML = `<div part="base"><slot></slot></div><div class="end" part="footer">
            <span class="ld" part="loading" hidden><sav-spinner aria-hidden="true"></sav-spinner><span class="ldt"></span></span>
            <sav-button class="more" part="more-button" appearance="outline" variant="neutral" hidden></sav-button>
            <span class="err" part="error" role="alert" hidden><span class="errt"></span><sav-button class="retry" size="sm" appearance="soft" variant="neutral"><sav-icon slot="prefix" name="refresh-cw"></sav-icon><span class="rt">${esc(T(this, 'Try again'))}</span></sav-button></span>
            <span class="line" part="end" hidden><span class="endt"></span></span>
          </div><span class="sentinel" aria-hidden="true" style="display:block;height:1px"></span><span class="sr" aria-live="polite"></span>`;
        this.$('.more').addEventListener('click', () => this.load());
        this.$('.retry').addEventListener('click', () => this.load());
      }
      this.page ??= 0;
      this.setAttribute('role', 'feed');
      this.sync();
      this.watch();
    }
    disconnectedCallback() { this._io?.disconnect(); this._io = null; }
    changed(name) { this.sync(); if (name === 'threshold' || name === 'mode') this.watch(); }
    /** the end is watched in the window, or in the element itself when it scrolls */
    watch() {
      this._io?.disconnect();
      if (this.getAttribute('mode') === 'button' || typeof IntersectionObserver === 'undefined') { this.sync(); return; }
      const cs = getComputedStyle(this), own = /(auto|scroll)/.test(cs.overflowY);
      const m = Number(this.getAttribute('threshold') ?? 300);
      this._io = new IntersectionObserver((en) => { if (en.some((x) => x.isIntersecting)) this.load(); }, { root: own ? this : null, rootMargin: `0px 0px ${m}px 0px` });
      this._io.observe(this.$('.sentinel'));
    }
    sync() {
      if (!this.shadowRoot.firstChild) return;
      const st = this._state || 'idle', button = this.getAttribute('mode') === 'button';
      this.$('.ldt').textContent = this.getAttribute('loading-label') || T(this, 'Loading…');
      this.$('.more').textContent = this.getAttribute('more-label') || T(this, 'Load more');
      this.$('.errt').textContent = this.getAttribute('error-label') || T(this, 'It did not load.');
      this.$('.rt').textContent = this.getAttribute('retry-label') || T(this, 'Try again');
      this.$('.endt').textContent = this.getAttribute('end-label') || T(this, 'That’s all');
      this.$('.ld').hidden = st !== 'loading';
      // the button: mode="button", or a browser that cannot watch the end of the list (no IntersectionObserver)
      this.$('.more').hidden = !((button || typeof IntersectionObserver === 'undefined') && st === 'idle');
      this.$('.err').hidden = st !== 'error';
      this.$('.line').hidden = st !== 'end';
      this.toggleAttribute('aria-busy', st === 'loading');
      this.setAttribute('data-state', st);
    }
    /** asks the page for the next items (sav-load, with the page number); nothing happens while loading or at the end */
    load() {
      if (this._state === 'loading' || this._state === 'end') return;
      this._state = 'loading'; this.sync();
      this._before = this.querySelectorAll(':scope > *').length;
      const ok = this.emit('sav-load', { page: this.page + 1 }, true);
      if (!ok) { this._state = 'idle'; this.sync(); }
    }
    /** the page added the items: more = false when there is nothing else to load */
    done(more = true) {
      this.page++;
      const added = this.querySelectorAll(':scope > *').length - (this._before || 0);
      this.$('.sr').textContent = added > 0 ? T(this, '{n} more loaded', { n: added }) : '';
      this._state = more ? 'idle' : 'end'; this.sync();
      // still room on screen (short pages): ask again
      if (more && this._io) requestAnimationFrame(() => { this._io?.disconnect(); this.watch(); });
    }
    /** loading failed: shows the message and "Try again" */
    fail() { this._state = 'error'; this.sync(); }
    /** starts again from page 0 (after a new search, for example) */
    reset() { this.page = 0; this._state = 'idle'; this.sync(); this.watch(); }
    get loading() { return this._state === 'loading'; }
  }
  define('sav-infinite-scroll', SavInfiniteScroll);

  /* ================================================================== theme helper */

  /**
   * Sav.setTheme({primary: '#0a7', radius: '12px', ...}, target = document.documentElement)
   * Keys are token names without the --sav- prefix (e.g. "color-primary") or the short aliases below.
   */
  const ALIASES = { primary: 'color-primary', success: 'color-success', warning: 'color-warning', danger: 'color-danger', neutral: 'color-neutral', font: 'font', radius: 'radius' };
  Sav.setTheme = (tokens, target = document.documentElement) => {
    for (const [k, v] of Object.entries(tokens)) {
      const name = '--sav-' + (ALIASES[k] || k);
      v === null || v === '' ? target.style.removeProperty(name) : target.style.setProperty(name, v);
    }
  };
  /** 'soft' | 'tilt' | 'sharp' | 'brutal' | 'glass' */
  Sav.styles = ['soft', 'tilt', 'sharp', 'brutal', 'glass'];
  Sav.setStyle = (style, target = document.documentElement) => {
    Sav.styles.forEach((s) => target.classList.remove('sav-style-' + s));
    if (style && style !== 'soft') target.classList.add('sav-style-' + style);
    resyncStyled();
  };
  /* a few components read style tokens in script (the start of the ring's arc): when the style class of the page changes, they read them again */
  function resyncStyled() { document.querySelectorAll('sav-progress-ring').forEach((r) => r.sync?.()); }
  if (typeof MutationObserver !== 'undefined') {
    const mo = new MutationObserver(() => resyncStyled());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    const watchBody = () => document.body && mo.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
    document.body ? watchBody() : addEventListener('DOMContentLoaded', watchBody, { once: true });
  }
  /** 'light' | 'dark' | 'auto' */
  Sav.setMode = (mode, target = document.documentElement) => {
    target.classList.remove('sav-theme-light', 'sav-theme-dark', 'sav-theme-auto');
    target.classList.add('sav-theme-' + mode);
  };
  /** The mode set on the page: 'light' | 'dark' | 'auto'. */
  Sav.getMode = (target = document.documentElement) => (['light', 'dark', 'auto'].find((m) => target.classList.contains('sav-theme-' + m)) || 'auto');
})();
