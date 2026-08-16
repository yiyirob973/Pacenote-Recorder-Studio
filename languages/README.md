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
`/* @LANGUAGE_MODULES_INJECTION_POINT */` marker. This means a module's code
runs in the same scope as core and can freely reference core's existing
`const`/`let` declarations (e.g. `CORNER_WORD_SET`) — but it also means a
module must be careful only to **add**, never reassign or mutate core's
English data.

## Required shape

Every module must register itself into the global registry under a unique
two-letter (or `xx-XX`) id:

```js
window.PACENOTE_LANGUAGE_MODULES.fi = {
  id: 'fi',                     // unique key, matches the registry property above
  label: 'Finnish (Numeronuotti A)',   // shown in the language dropdown
  soundsFolder: 'Plugins/Pacenote/sounds/<Name>', // export folder base (before codriver-name suffixing)

  // --- Word data (parallels core's English pacenoteWordVariantCounts) ---
  wordVariantCounts: { /* base_token: variantCount */ },

  // --- Display / tooltip data ---
  displayTranslations: { /* identifier fragment: translated word, for UI display */ },
  atomicWordDefinitions: { /* identifier fragment: ENGLISH tooltip text, for words this language adds beyond core's vocabulary */ },
  brokenDisplayOverrides: { /* one entry per core displayOverrides key: translated mechanical-warning phrase */ },

  // --- Vocabulary extensions ---
  // Any base-token fragments this language uses for corner-shape detection
  // that core's CORNER_SHAPE_WORDS / CORNER_WORD_SET don't already have.
  // The module applies these itself (see "Applying additions" below).
  cornerWordSetAdditions: [ /* e.g. '_rear', '_round_hp' */ ],

  // --- Fixed-filename speech sets (same file names as core, different spoken phrase) ---
  impactSpeechFiles: [ { file, phrase }, ... ],
  gameSpeechFiles: [ { file, phrase }, ... ],
  numberSpeechFiles: [ { file, phrase }, ... ],

  // --- Plugin config (REQUIRED before this module can be shipped/wired) ---
  // Descriptive.ini / Extended.ini / Numeric.ini content the RBR Pacenote
  // Plugin needs to map its grammar IDs to this language's filenames.
  // Per project standing rule: this must be verified against real plugin
  // config, never assumed. Leave as `null` with a TODO until confirmed.
  pluginConfig: null,
};
```

## Applying additions

A module is responsible for wiring its own additive pieces immediately after
registering itself, for example:

```js
(FINNISH_MODULE.cornerWordSetAdditions || []).forEach(w => CORNER_WORD_SET.add(w));
```

Core does **not** iterate the registry to do this on a module's behalf in
this phase — the registry is currently inert (nothing in core reads
`PACENOTE_LANGUAGE_MODULES` yet). That wiring is Phase 2. Until then, adding
a module to a build changes zero runtime behavior — it only makes the data
available and self-consistent for when Phase 2 lands.

## Verification requirement

Per the project's standing rule: every field must be checked against real
reference data (the actual plugin config, the actual sound archive) before
a module is considered complete — not filled in from assumption or general
language knowledge alone. `pluginConfig: null` is the explicit "not yet
verified, do not ship" marker.

## Adding a new language

1. Copy `_template.module.js` to `<code>.module.js` (e.g. `swedish.module.js`)
2. Fill in every field against verified reference data
3. Add it to `/build/builder.html`'s module list
4. Build, then validate in-game before calling it done
