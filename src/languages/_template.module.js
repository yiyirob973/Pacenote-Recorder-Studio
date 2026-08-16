// ---------------------------------------------------------------------------
// LANGUAGE MODULE TEMPLATE
// Copy this file to `<code>.module.js` (e.g. swedish.module.js) and fill in
// every field. See README.md in this folder for the full contract,
// including the required tooltip-definition collision audit, before this
// can be included in a build.
//
// This file is spliced directly into core's <script> block by the build
// tool (see /build/builder.html) — it is plain JS, not a full HTML file,
// and runs in the same scope as core.
// ---------------------------------------------------------------------------

window.PACENOTE_LANGUAGE_MODULES = window.PACENOTE_LANGUAGE_MODULES || {};

window.PACENOTE_LANGUAGE_MODULES.xx = {
    id: 'xx',                          // TODO: unique language code
    label: 'Language Name (Pack Name)', // TODO: shown in the dropdown and export output

    // TODO: base_token -> variant count, verified against the real archive
    wordVariantCounts: {},

    // TODO: same file names core uses for English, this language's phrase
    impactSpeechFiles: [],
    gameSpeechFiles: [],
    numberSpeechFiles: [],

    // TODO: one entry per core's ENGLISH_DISPLAY_OVERRIDES key (see core
    // index.html): batterys_flat, gearbox_broke, problem_engine,
    // steering_broke, sus_broke, water_temp, weve_got_fire, wv_lost_brakes
    brokenDisplayOverrides: {},

    // TODO: identifier fragment -> translated display word
    displayTranslations: {},

    // TODO: identifier fragment -> ENGLISH tooltip text, for words this
    // language adds beyond core's existing vocabulary. REQUIRED before
    // shipping: audit every key against ATOMIC_WORD_DEFINITIONS for
    // collisions (see README.md) - a collision that's safe for Finnish
    // isn't automatically safe here.
    atomicWordDefinitions: {},

    // TODO: any extra corner-shape base-token fragments this language uses
    cornerWordSetAdditions: [],
};

// Apply this module's additive vocabulary immediately on load.
(window.PACENOTE_LANGUAGE_MODULES.xx.cornerWordSetAdditions || []).forEach(w => CORNER_WORD_SET.add(w));

// If (and only if) this language's word identifiers don't already match
// the real plugin's expected filenames, register per-word overrides here:
// window.EXPORT_FILENAME_OVERRIDES = window.EXPORT_FILENAME_OVERRIDES || {};
// EXPORT_FILENAME_OVERRIDES.xx = { /* base_token: real_filename */ };
