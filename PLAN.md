# Ump — Umpire Quiz App: Agreed Spec

Scenario-based rules quiz app for amateur baseball umpires. Expo managed workflow,
React Native + TypeScript (strict). No backend, no auth, no paid services.
Runs with `npx expo start`.

## Content

- **Two full question banks (120 total):**
  - **Baseball Canada / OBR** — 60 questions. Where Canadian amendments diverge from
    pure OBR, follow the Canadian ruling.
  - **Little League** — 60 questions. Every correct call and explanation is
    verified against Section 3 (Rules Interpretations, pp. 15–50) of the official
    **2026 Little League Umpire's Manual** — extracted text lives at
    `reference/2026-ll-umpire-manual.txt` (gitignored; copyrighted, never commit
    or reproduce it). Baseball interpretations only — the manual also covers
    softball; skip those. A human LL umpire spot-check is still nice-to-have,
    no longer a release blocker.
  - LL scenarios must be newly invented, not adaptations of the manual's case
    plays — verify rulings against it, don't mine it for scenario text.
- All scenario text is original. Never reproduce rulebook text. Cite rule area by
  topic name only (e.g. "Obstruction").
- **Difficulty tiers are ruleset-specific:** `district` / `provincial` for OBR;
  `Majors` / `Intermediate+` for LL. The LL tier doubles as division context, and
  LL scenario text states the division whenever the ruling depends on it
  (leadoffs, balks, etc. differ between Majors and Intermediate+).
- **Fully separate topic taxonomies per bank.** OBR: interference, obstruction,
  balks, force/tag plays, batted ball rulings, appeals, substitutions. LL: designed
  independently to fit LL's signature rules (leadoff/steal restrictions, mandatory
  play, special pinch runner, etc.), using the 2026 manual's interpretation topics
  as a menu (e.g. leaving early, mandatory play, double first base, catch & carry,
  tangle/untangle, appeals, obstruction, interference, balks & illegal pitches). Code never hardcodes a topic list — Stats
  derives topics from the active bank.
- Questions live in typed TS data files (one per ruleset) sharing a `Question` type,
  so more can be added by editing data only.

## Ruleset UX

- Global ruleset toggle on the Home screen, persisted in AsyncStorage.
- Everything downstream (due counts, quiz, stats, reset) shows only the active ruleset.
- Progress state is fully independent per ruleset (namespaced storage keys).

## Spaced repetition

- Buckets: 1 / 3 / 7 / 14 / 30 days.
- Correct → advance one bucket (first-ever correct lands in the 1-day bucket).
  At 30 days: stay there, repeating monthly.
- Wrong → **drop one bucket** (floor: 1-day). A new question missed on first sight
  starts in the 1-day bucket.
- **Sessions:** all due reviews first (uncapped if more than 10 are due), then new
  never-seen questions fill up to a 10-question session cap.
  Home shows "X reviews due · Y new".
- **Same-session requeue:** a missed question goes to the back of the queue and
  repeats until answered correctly once. Retries never affect scheduling.
- **Practice mode:** when 0 due and 0 new, Home offers Practice — 10 random
  questions from the active bank, full feedback, zero effect on scheduling or stats.

## Screens

- **Navigation:** bottom tabs (Home / Stats / Settings) + Quiz as a full-screen
  stack card. React Navigation.
- **Home:** ruleset toggle, "X reviews due · Y new", Start (or Practice when caught up).
- **Quiz:** one question at a time; tap an option → immediate right/wrong feedback
  with plain-English explanation → Next.
- **Stats:** **first-attempt accuracy** per topic for the active ruleset (only the
  first answer each time a question is served in a real session counts; requeue
  retries and practice mode are excluded), shown with attempt counts.
- **Settings:** two separate reset actions — "Reset OBR progress" and "Reset Little
  League progress" — each behind a native confirm alert.
- **Dark mode:** follows the system setting; no manual toggle.

## Packaging: "store-prepared, not submitted"

- Submission-grade repo: placeholder app icon + splash, app.json fully configured
  (name, slug, iOS bundle ID, Android package, version), dark-mode-safe, clean console.
- No EAS build in this pass. Final deliverable includes a note listing the exact
  remaining steps (EAS build profiles, Apple Developer / Google Play accounts,
  screenshots, privacy policy URL).

## Constraints & stop conditions

- Dependencies: Expo defaults + `@react-native-async-storage/async-storage` +
  React Navigation (core, native-stack, bottom-tabs, and their required peers
  `react-native-screens` / `react-native-safe-area-context`). Ask before anything else.
- Only build what is specified. No monetization, notifications, or extra features.
- Stop and ask before adding any dependency beyond the list or restructuring after
  the initial scaffold.
- Progress reporting: after each major step, `✅ [done] — [files]`. Finish with run
  instructions + EAS note.

## Future features

Ideas not yet committed to the spec — scope, dependencies, and design still open.

- **Assignr integration.** Our organization assigns games through Assignr, which
  exposes an API. Connect the app to it so an umpire can:
  - Sign in to their own Assignr account (OAuth) from inside the app.
  - Pull their umpire schedule — upcoming assignments, dates, sites, positions,
    partners.
  - Accept / decline games directly in-app, writing back through the API.

  Would introduce the app's first authenticated, networked feature (today it's
  offline-first, no accounts), so it needs its own design pass: auth/token
  storage, offline caching of the schedule, and how a "Schedule" surface fits
  the current Home / tab layout.
