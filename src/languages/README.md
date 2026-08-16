# Pacenote Recorder Studio — Language Module Contract

## What a "language module" is

English is baked into `index.html` core and is always present — it is not a
module and is never excluded from a build.

Everything else (Finnish, and any future language) is an **additional
language module**: one self-contained `.js` file in this folder that a
hoster can choose to include or leave out at build time (see
`/build/builder.html`).

A module is **plain JavaScript, not a full HTML file**. The build tool
splices its contents directly into core's existing `<script>` block, at the
`/* @LANGUAGE_MODULES_INJECTION_POINT */` marker — right after the
registry declaration, before the dropdown gets populated. This means a
module's code runs in the same scope as core and can freely reference
core's existing `const`/`let` declarations (e.g. `CORNER_WORD_SET`) — but
it also means a module must be careful only to **add**, never reassign or
mutate core's English data.

## Required shape

Every module must register itself into the global registry under a unique
two-letter (or `xx-XX`) id:

```js
window.PACENOTE_LANGUAGE_MODULES.fi = {
  id: 'fi',                            // unique key, matches the registry property above
  label: 'Finnish (Numeronuotti A)',   // shown in the language dropdown and in export output

  // --- Word data (parallels core's ENGLISH_WORD_VARIANT_COUNTS etc.) ---
  wordVariantCounts: { /* base_token: variantCount */ },
  impactSpeechFiles: [ { file, phrase }, ... ],  // same file names as core, this language's spoken phrase
  gameSpeechFiles: [ { file, phrase }, ... ],
  numberSpeechFiles: [ { file, phrase }, ... ],
  brokenDisplayOverrides: { /* one entry per core's ENGLISH_DISPLAY_OVERRIDES key: translated mechanical-warning phrase */ },

  // --- Display / tooltip data ---
  displayTranslations: { /* identifier fragment: translated word, for UI display */ },
  atomicWordDefinitions: { /* identifier fragment: ENGLISH tooltip text, for words this language adds beyond core's vocabulary */ },

  // --- Vocabulary extensions (optional) ---
  cornerWordSetAdditions: [ /* e.g. '_rear', '_round_hp' */ ],
};

// Apply additive vocabulary immediately on registration:
window.PACENOTE_LANGUAGE_MODULES.fi.cornerWordSetAdditions.forEach(w => CORNER_WORD_SET.add(w));
```

## What does NOT belong in a module

**Plugin config (Descriptive.ini/Extended.ini/Numeric.ini) is not
per-language.** Core's `REAL_DESCRIPTIVE_INI` / `REAL_EXTENDED_INI` /
`REAL_NUMERIC_INI` are shared, language-agnostic constants bundled into
every export regardless of which language module is active — this is how
the real RBR Pacenote Plugin actually works (confirmed against real
reference files, not assumed). Only the sounds folder path differs by
language, and core's `getActiveSoundsFolder()` derives that generically
from the codriver name — a module never needs to supply it.

If (and only if) a future language's own word identifiers don't already
match the real plugin's expected filenames, the module can register
per-word overrides onto core's existing table from its own script:

```js
window.EXPORT_FILENAME_OVERRIDES = window.EXPORT_FILENAME_OVERRIDES || {};
EXPORT_FILENAME_OVERRIDES.sv = { /* base_token: real_filename */ };
```

Finnish needs none of these — verified, its identifiers already match the
real plugin's naming.

## Applying additions

A module is responsible for wiring its own additive pieces immediately
after registering itself (see `cornerWordSetAdditions` example above and
`finnish.module.js`). Core's registry-population code (right after the
injection point) then reads `label` from every registered module to build
the dropdown — nothing else in core loops over the registry automatically.

## Tooltip-definition collision audit (required per module)

`getActiveAtomicDefs()` in core merges a module's `atomicWordDefinitions`
onto `ATOMIC_WORD_DEFINITIONS` fresh on every lookup — it never mutates the
English dictionary. But if a module's keys collide with English's, whichever
resolves first at each call site matters. Finnish has exactly one collision
("round") and it was audited fragment-by-fragment to confirm the collision
is never reached ambiguously (see the comment above `getActiveAtomicDefs()`
in core). **Any new module must run the same audit for its own vocabulary
before shipping** — a collision that's safe for Finnish isn't automatically
safe for a different language's words.

## Verification requirement

Per the project's standing rule: every field must be checked against real
reference data (the actual plugin config, the actual sound archive) before
a module is considered complete — not filled in from assumption or general
language knowledge alone.

## Adding a new language

1. Copy `_template.module.js` to `<code>.module.js` (e.g. `swedish.module.js`)
2. Fill in every field against verified reference data
3. Run the tooltip-definition collision audit against `ATOMIC_WORD_DEFINITIONS`
4. Add it to `/build/builder.html`'s module list
5. Build, then validate in-game before calling it done
