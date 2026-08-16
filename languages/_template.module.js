// ---------------------------------------------------------------------------
// LANGUAGE MODULE TEMPLATE
// Copy this file to `<code>.module.js` (e.g. swedish.module.js) and fill in
// every field. See README.md in this folder for the full contract and
// verification requirements before this can be included in a build.
//
// This file is spliced directly into core's <script> block by the build
// tool (see /build/builder.html) — it is plain JS, not a full HTML file,
// and runs in the same scope as core.
// ---------------------------------------------------------------------------

window.PACENOTE_LANGUAGE_MODULES = window.PACENOTE_LANGUAGE_MODULES || {};

window.PACENOTE_LANGUAGE_MODULES.xx = {
    id: 'xx',                          // TODO: unique language code
    label: 'Language Name (Pack Name)', // TODO: shown in the language dropdown
    soundsFolder: 'Plugins/Pacenote/sounds/REPLACE_ME', // TODO: verify against real archive

    // TODO: base_token -> variant count, verified against the real archive
    wordVariantCounts: {},

    // TODO: identifier fragment -> translated display word
    displayTranslations: {},

    // TODO: identifier fragment -> ENGLISH tooltip text, for words this
    // language adds beyond core's existing vocabulary
    atomicWordDefinitions: {},

    // TODO: one entry per core displayOverrides key (see core index.html):
    // batterys_flat, gearbox_broke, problem_engine, steering_broke,
    // sus_broke, water_temp, weve_got_fire, wv_lost_brakes
    brokenDisplayOverrides: {},

    // TODO: any extra corner-shape base-token fragments this language uses
    cornerWordSetAdditions: [],

    // TODO: same file names as core, this language's spoken phrase
    impactSpeechFiles: [],
    gameSpeechFiles: [],
    numberSpeechFiles: [],

    // REQUIRED before shipping: verified plugin config (Descriptive.ini /
    // Extended.ini / Numeric.ini content). Do not fill this from assumption.
    pluginConfig: null,
};

// Apply this module's additive vocabulary immediately on load.
(window.PACENOTE_LANGUAGE_MODULES.xx.cornerWordSetAdditions || []).forEach(w => CORNER_WORD_SET.add(w));
