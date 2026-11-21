# SavComponents Academy

Learn SavComponents by doing: https://savcomponents.com/academy/ (an installable web app, also on Google Play through
`../academy-android/`). Not served: `.md` files are blocked by the site's `.htaccess`.

## Only SavComponents

Everything on screen is a SavComponents component (header, bottom navigation, cards, lists, headings, buttons, steps, tabs,
empty states, stats, charts, forms, code). `academy.css` only spaces them out. The few plain elements are the ones a component
asks for (the `<a>` links and the logo inside `sav-header`), the `<form>` around the fields, and the `<iframe>` of the
challenge preview, which must stay a sandboxed frame.

## What is in it

- **Paths and lessons** — *Basics* (nine hand-written lessons in `content.js`) and one path per group of the documentation.
  The lesson of every component is built from `../docs/components.js`, so it follows the library: description, live demo
  and code, a playground of its choices and on/off attributes, more examples, the accessibility section (`../docs/a11y.js`),
  then a quiz.
- **Quizzes** — generated from the documentation data (which component, which tag, what an attribute does, which value it
  takes, which event it fires). The right answer is stored first and shown shuffled. Half right finishes the lesson; stars
  follow the best score.
- **Challenges** — 34 in `content.js`, three levels. The learner writes HTML; the preview is a sandboxed iframe (no origin
  of its own, so it cannot reach the account) with the library inlined as text, and a small helper inside answers the
  checks (CSS selectors, counts, text, a JS test on the match) through `postMessage`.
- **Daily** — six questions from a seed of the date (the same for everybody) and a challenge of the day (+30 XP).
- **XP and levels** — worked out from the progress every time (never stored as a running total), so two devices merge
  without double counting: lesson 20 + 10 per right answer (best score), challenge 40/70/100, daily quiz 20 + 5 per right
  answer, challenge of the day 30, badge 25. Level n needs `100(n−1) + 25(n−1)(n−2)` XP. Ranks in `content.js`.
- **Badges** — in `content.js` (plus one per path), computed from the progress.
- **Account** — the SavComponents account (same token as the portal, `savc-token` in local storage, header `X-Sav-Token`).
  Progress is kept in local storage (`savc-academy`) and, when signed in, merged with the account (`academy.get`) and saved
  to it (`academy.save`). Username and leaderboard: `academy.profile`, `academy.board` (public, 20 learners).
- **Look** — the five styles and the mode, shared with the portal (`savc-style`, `savc-mode`).
- **Offline** — `sw.js`, network first, cache as fallback.

## Files

`index.html`, `academy.css`, `academy.js` (engine), `content.js` (Basics, challenges, badges, ranks), `manifest.webmanifest`,
`sw.js`, `icons/` (built by `python3 tools/build-academy-icons.py`).

## Local test

Run the portal (`savcomponents-portal`, port 8092) and the API on a throwaway database (`savcomponents-test`, port 8094), then
in the browser console of http://localhost:8092/academy/: `localStorage.setItem('savc-api', 'http://localhost:8094/projects/savcomponents/api/')`.
Never point it to the production database.
