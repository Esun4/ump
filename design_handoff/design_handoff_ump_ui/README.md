# Handoff: Ump UI Redesign (Modernist / muted-claret)

## Overview
A full visual redesign of **Ump**, the scenario-based rules-quiz app for amateur
baseball umpires. It replaces the old dark navy-and-brass "night game" theme with
a flat, grid-first, light-ground direction based on the **Modernist** design
system, using a softened "old-money" **claret** accent (`#a13f38`) in place of the
original navy/brass. Every existing screen is covered, plus the game-day tools and
the play simulator.

The app itself is unchanged in scope and behavior — this is a re-skin and layout
refresh. All existing logic (SRS engine, sessions, bookmarks, stats, simulator
timing) stays exactly as-is.

## About the Design Files
The file in this bundle — **`Ump Redesign.dc.html`** — is a **design reference
created in HTML**. It is a prototype showing the intended look, layout, and states,
**not production code to copy directly**.

Your task is to **recreate these designs in the existing codebase**: the mounted
Expo / React Native + TypeScript app (`ump/`). Reproduce the visuals using the app's
existing React Native components, `StyleSheet`, and the theme layer in
`src/theme.ts` and `src/ui.tsx` — do **not** port HTML/CSS or introduce web tech.
The HTML is a spec you translate into native styles.

> Note: the HTML uses the Modernist CSS design-system for tokens/fonts and `<div>`
> markup with a web phone-frame mock. Ignore the web scaffolding (the phone bezels,
> the `.scr` frames, the id badges like `1a`, the canvas board background). What
> matters is the screen content inside each frame.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and states are final. Recreate the
UI faithfully in React Native, mapping each value below to the theme.

## The redesign at a glance
- **Light theme only** as the default. The old dark theme can be dropped or kept as
  an option (Settings still shows Light / Dark / System), but the design is authored
  for the light ground.
- **Accent** changes from navy/brass to a **muted claret `#a13f38`** everywhere the
  old `theme.accent` / `theme.primary` was used.
- **Zero corner radius.** All the old `borderRadius: 14/16/20` values become `0`.
  Cards, buttons, tiles, badges, inputs — all square.
- **Strong 2px rules.** Major section/screen separators use a 2px ink divider
  (`#201e1d`); within-card row dividers use a 1px light line (`#cdc9c9`).
- **Archivo** replaces Barlow Condensed for display/headings and is also the body
  face. Flush-left everything (headings, hero copy, and button labels).

---

## Design Tokens

Update `src/theme.ts`. Suggested new light theme (the app's single primary theme):

| Role (theme key) | Old (light) | New value | Notes |
|---|---|---|---|
| `background` | `#F4F3EE` | `#f3f2f2` | app ground |
| `card` | `#FFFFFF` | `#ffffff` | surface |
| `cardRaised` | `#FFFFFF` | `#eae9e9` | pressed/tinted surface |
| `text` | `#1A2334` | `#201e1d` | ink |
| `subtleText` | `#5F6878` | `#6b6664` | muted |
| `faintText` | `#9AA0AC` | `#8a8583` | faint |
| `border` (row/card 1px) | `#E3E1D8` | `#cdc9c9` | hairline rule |
| `hairline` | `#EDEBE3` | `#cdc9c9` | inner rule |
| **strong divider (new)** | — | `#201e1d` @ 2px | major section rules |
| `primary` (button fill) | `#1E2A44` | `#a13f38` | claret |
| `onPrimary` | `#F4F3EE` | `#ffffff` | text on claret |
| `accent` | `#9A6C1D` | `#a13f38` | claret |
| `accentSoft` (tint) | `#F3E9D4` | `#f6ecea` | accent-100 tint |
| **accent-700 (new, text-on-tint)** | — | `#6f2c27` | claret for small text on tint |
| `correct` | `#2E7D4F` | `#2f7d54` | keep green |
| `correctBg` | `#E3F1E8` | `#e6f0e9` | |
| `wrong` | `#C0492F` | `#a13f38` | reuse claret (or `#b23c2f`) |
| `wrongBg` | `#FAE7E2` | `#f6ecea` | |

Claret ramp (from the Modernist system, for tints/hovers/pressed):
`100 #f6ecea` · `200 #ecd6d2` · `300 #dbb4ad` · `500 #a13f38` · `600 #8a352f (hover)` · `700 #6f2c27 (pressed / small text on tint)`.

**Radius:** all `0`. Replace every `borderRadius` in the screen `StyleSheet`s with `0`
(bezel/phone frame in the mock is a device chrome, not app UI — ignore it).

**Spacing:** unchanged from current values; the redesign keeps the app's padding
scale (20–24 screen padding, 14–16 card padding, 10–14 gaps).

### Typography
Swap the display face from Barlow Condensed to **Archivo** (Google Fonts: Archivo
400 / 600 / 800). Update `src/theme.ts` `fonts`:
- `display` → `Archivo_800ExtraBold`
- `displaySemi` → `Archivo_800ExtraBold` (or 600 where lighter weight reads better)
- `displayMedium` → `Archivo_600SemiBold`
- Body text: Archivo 400/600 (replace the system face).

Type roles observed in the mock:
- Wordmark **UMP**: Archivo 800, ~44px, letter-spacing tight (`-0.02em`), with a
  small 9px claret diamond (rotated square) trailing the mark.
- Section eyebrow labels: Archivo 800, 12px, `letter-spacing: 0.14em`, uppercase,
  `subtleText`.
- Big numbers (counts, streak, %): Archivo 800, tabular-nums, tight leading.
- Body/scenario copy: Archivo 400, 15–22px, line-height ~1.45.
- Tags/chips: Archivo 800, 11px, uppercase, claret text on `accentSoft` fill, **0
  radius** (was pill `999`).

---

## Screens / Views

Each maps to an existing file in `ump/src/screens/`. Layout notes describe the
**native** result; the HTML frame is the visual reference.

### 1. Home — dashboard grid  → `HomeScreen.tsx`  (mock id `1a`, mobile `1e`)
- **Purpose:** daily entry point — see what's due, start a session, jump to any
  training or game-day tool.
- **Layout (mobile / current target):** unchanged vertical `ScrollView`.
  - **Header:** wordmark `UMP` + claret diamond dot; subtitle "Scenario drills for
    umpires".
  - **Today hero:** a bordered block (**2px ink border, 0 radius**). Eyebrow
    "TODAY · {bank short label}" in claret-700. Two big counts side by side —
    `due` in ink, `new` in claret — split by a 1px vertical rule. Full-width
    **START SESSION** primary button (claret fill, white label, **flush-left label
    with a trailing arrow**, 0 radius). Caught-up state keeps the existing "All
    caught up / PRACTICE" copy.
  - **TRAIN section:** eyebrow label, then the existing `NavRow`s, restyled: a
    single bordered group (1px `border`) with 1px row dividers, each row = claret
    Lucide icon + bold title + muted subtitle + right chevron. Rows: Question
    library, Play simulator, Practice a topic, Trouble spots (with a claret count
    tag), Bookmarks.
  - **GAME DAY section:** eyebrow, then rows/tiles: Fly ball coverage, Plate
    meeting, Rule myths.
  - **Bottom tab bar** (mobile): Home / Stats / Settings, 2px top ink rule, active
    tab marked by a 2px claret top inset bar + claret icon; inactive muted.
- **Web dashboard variant (`1a`, optional / tablet+):** same content in a 3-column
  card grid with a top nav bar (Home/Library/Stats/Simulator + settings + streak
  pill) and a two-cell hero (counts | a small week bar chart). Use this only if you
  build a wide/tablet layout; the phone layout above is the primary target.

### 2. Quiz  → `QuizScreen.tsx`  (mock ids `1c` unanswered, `1d` answered, mobile `1f`)
- **Top progress track:** 5px, `hairline` background, claret fill by proportion
  cleared, 0 radius.
- **Meta row:** topic·tier tag (claret on tint) left; "{n} left" bold muted;
  bookmark icon right (filled claret when saved).
- **Scenario:** Archivo 400, ~19–22px, line-height 1.4.
- **Options:** full-width rows, **1.5px border, 0 radius**, letter badge = a **28–30px
  square** (was a 14px-radius circle) with the letter; badge is outlined/muted when
  unanswered.
  - **Answered — correct option:** border + badge fill `correct` green, badge shows
    a check glyph, row background `correctBg`, text `#1f5136`.
  - **Answered — chosen wrong option:** border/text claret (`wrong`), row background
    `wrongBg`.
  - **Other options after answering:** dim to ~55% opacity.
- **Feedback panel:** replace the rounded filled box with a **left-accent-bar panel**
  — 3px left border in green (`CORRECT CALL`) or claret (`NOT QUITE`), tinted
  background, eyebrow label + explanation. Keep the "will come back before the
  session ends" note and the "Report this question" link.
- **NEXT** button: claret, flush-left label + trailing arrow, 0 radius.
- **Done / empty states:** keep existing structure; restyle the big % number in
  Archivo 800 and the DONE button as claret 0-radius. Eyebrow "SESSION COMPLETE" in
  claret.

### 3. Library — bank picker  → `LibraryScreen.tsx`  (mock id `1g`)
- Screen header with 2px ink bottom rule: "Question banks" + subline.
- Existing grouped structure (Rulebooks / 4-Umpire Mechanics / District Interlock /
  Crew Work). Each group: eyebrow label + a 1px-bordered card with 1px row dividers,
  **0 radius**.
- **Active bank row:** background `accentSoft` tint, title in claret-700, trailing
  **filled claret check-circle**. Inactive rows: hollow circle radio in `border`.

### 4. Stats  → `StatsScreen.tsx`  (mock id `1h`)
- **Streak hero:** 2px ink bottom rule. Big streak number (Archivo 800) + "day
  streak" + status subline. Keep existing streak copy logic.
- **Heatmap:** GitHub-style contribution grid, **square cells (0 radius)**, 14px,
  3px gaps. Empty = `hairline`; active = claret at four opacity steps
  (`0.35 / 0.6 / 0.85 / 1`). Keep the LESS→MORE legend row (square swatches).
- **All-time tiles:** 3 equal cells, 1px border, 0 radius: answers / days active /
  mastered (mastered value in claret). Below: bank tag + "Mastered = 30-day bucket ·
  n of N" note.

### 5. Topics — practice picker  → `TopicsScreen.tsx`  (mock id `1i`)
- Header + 2px rule + lede. A single bordered card of topic rows (1px dividers, 0
  radius): bold topic name + a claret count tag (0 radius) + chevron. Tapping a row
  opens Quiz in practice mode for that topic (unchanged).

### 6. Settings  → `SettingsScreen.tsx`  (mock id `1j`)
- Header + 2px rule. Sections via eyebrow labels.
  - **Appearance:** a **segmented control** (Light / Dark / System) — a single
    2px-ink-bordered row split by 1px ink dividers, selected segment filled claret
    with white label, 0 radius.
  - **Daily reminder / toggles:** rows with a **square** switch (0 radius): claret
    track + white knob when on, `hairline` track when off.
  - **About:** muted body text (version, offline note).

### 7. Fly-ball coverage  → `CoverageScreen.tsx`  (mock id `1k`)
- Header block with 2px rule: a "4-Umpire · 60-ft Diamond" tag + priorities lede.
- **Duty rows:** an umpire badge (**36px-wide square**, `accent-100` fill,
  claret-700 label like `U1`/`U2`/`PU`) + duty text. Grouped in 1px-bordered cards,
  1px dividers.
- **Rotation pills:** outlined claret label (e.g. `U2 FILL`), 0 radius.
- **FIND / FREEZE / FIRE** block: 2px ink top rule inside the card, each line a
  claret-700 keyword + description.
- **Shorthand glossary:** term (claret-700, fixed ~96–104px column) + meaning rows.
- Keep all real content from `src/data/pregame.ts` (`GOING_OUT`,
  `COVERAGE_SECTIONS`, `COVERAGE_GLOSSARY`); the mock uses representative copy.

### 8. Plate meeting — checklist  → `PlateMeetingScreen.tsx`  (mock id `1l`)
- Header row: lede left + a claret **n/total** count (Archivo 800) right, 2px rule.
- Sections (from `PLATE_MEETING`): eyebrow + 1px-bordered card of tappable items,
  1px dividers, 0 radius.
- **Item:** check control + title + detail. Unchecked = hollow `border` circle,
  ink title. Checked = **filled claret check-circle**, title/detail drop to muted.
  Keep the ephemeral-checks behavior and the "checks clear when you leave" footer.

### 9. Rule myths  → `MythsScreen.tsx`  (mock id `1m`)
- Lede + stack of cards (1px border, 0 radius).
- Each card: **MYTH** eyebrow in claret, the myth in quotes (Archivo 800, ~19px),
  a 1px top rule, then **THE CALL** eyebrow in green, the ruling (bold), and detail
  (muted). Content from `RULE_MYTHS`.

### 10. Simulator hub  → `SimulatorScreen.tsx`  (mock id `1n`)
- Header + 2px rule + lede.
- **Crew toggle (2-MAN / 4-MAN):** a 2px-ink-bordered row of two cells split by a
  2px ink divider; active cell = `accent-100` fill + 2px claret bottom-inset bar +
  claret-700 label; 0 radius. (Replaces the current rounded segmented toggle.)
- **START RUN · {n} PLAYS** primary button: claret, flush-left label + arrow, 0
  radius.
- **Scenario groups:** eyebrow per group + rows (1px border, 0 radius): title +
  "You are {seat} · make the move/call" subline + a Lucide move/call icon. Data from
  `scenariosForCrew(crew)`; navigation to `SimPlay` unchanged.

### 11. Sim play — the play  → `SimPlayScreen.tsx`  (mock id `1o`)
- **Top meta bar:** crew·kind tag + "{i} of {n} · {r} right", 2px rule.
- **Field:** keep the existing `src/sim/FieldCanvas` renderer and animation clock
  **unchanged** — only restyle its container: a `#eae9e9` surface panel with a 2px
  ink bottom rule, **0 radius** (was `borderRadius:18`). Match the field to the new
  palette: ink diamond/base lines, claret for the active ("you") umpire dot and for
  the ball/your-path trail, ink for the other umpires.
- **Caption strip:** the FROZEN state uses a claret-700 "⏸ FROZEN — …" label on the
  `#eae9e9` strip; running captions in muted.
- **Question:** "You are {seat}." prefix in claret-700 + the prompt.
- **Options + feedback:** same treatment as the Quiz screen (square badges, green
  correct / dimmed others, left-accent-bar feedback panel). Feedback title is
  **RIGHT MOVE** (mechanics) / **CORRECT CALL** (call) / **NOT QUITE**.
- Keep "Replay the whole play" (claret refresh link) and the NEXT PLAY / FINISH RUN
  / DONE button (claret, 0 radius). Summary screen: big score in Archivo 800, keep
  copy logic, RUN IT AGAIN button.

---

## Interactions & Behavior
All existing behavior is preserved — reimplement styling only. Specifically keep:
- Session build (all due first, then new up to 10), requeue-on-miss, and the rule
  that only first answers touch scheduling/stats.
- Practice filters (topic / trouble / bookmarks), bookmarks toggle, question report
  flow, activity bump.
- Stats heatmap computation, streak, mastered counts.
- Simulator phases (`ready → rolling → asking → reveal → summary`), the animation
  clock, mechanics freeze-at, and replay.
- Ruleset context (active bank persists; per-bank schedule/stats).

**Pressed/hover states** (native): tinted background on press using `accent-100`
(`#f6ecea`) for list rows and tiles; primary buttons darken to `accent-600`
(`#8a352f`) pressed. Keep the current `Pressable` opacity/press patterns where
already present.

## State Management
No new state. Reuse existing hooks/contexts (`useRuleset`, SRS storage, activity
log, simulator local state). The only functional Settings addition already present
is theme mode (Light/Dark/System) — wire the segmented control to
`useColorScheme`/an override if you want the toggle live; otherwise ship Light as
the single theme.

## Assets
- **Fonts:** Archivo (400/600/800) via `@expo-google-fonts/archivo` (replaces
  `@expo-google-fonts/barlow-condensed`). Load in `App.tsx` where fonts are
  currently loaded.
- **Icons:** Lucide (per the Modernist system). The app currently uses
  `@expo/vector-icons` Ionicons — either switch to `lucide-react-native` or keep
  Ionicons and match the equivalents (library, play, target/locate, flame, bookmark,
  navigate, clipboard, alert-circle, settings, chevron-forward, checkmark-circle).
  Icon color = claret for active/leading icons, muted/faint otherwise.
- No raster imagery in these screens. App icon/splash art is separate
  (`scripts/generate-assets.js`) and out of scope.

## Files
- **This bundle:** `Ump Redesign.dc.html` — the HTML design reference (open in a
  browser; each framed screen is labeled with its id, e.g. `1a`, `1k`).
- **Codebase targets:** `ump/src/theme.ts`, `ump/src/ui.tsx`, and each
  `ump/src/screens/*.tsx` named above. Shared pieces (`SectionLabel`, `Chip`,
  `PrimaryButton`, `NavRow`, `DiamondMotif`) live in `ump/src/ui.tsx` — restyle
  those first and most screens follow.
