// ---------------------------------------------------------------------------
// FINNISH LANGUAGE MODULE (Numeronuotti A / "Jannemod", Janne Laahanen)
// 6-level numeric severity scale.
//
// Extracted from the verified Phase-1 data previously inlined in core
// index.html. Source data verified against the real uploaded
// Janne-complete.txt manifest: 669 words, 1784 files, folder
// "Plugins/Pacenote/sounds/Janne Laahanen FiNu A". See README.md in this
// folder for the module contract this file follows.
//
// Translations (displayTranslations, impactSpeechFiles, gameSpeechFiles,
// numberSpeechFiles, brokenDisplayOverrides) are best-effort — general
// Finnish language knowledge plus the atomic dictionary below — not yet
// verified against a native Finnish rally source. Same caveat English's
// own countdown-number guess carried before it was corrected in v3.13.1.
//
// pluginConfig is intentionally null: Descriptive.ini/Extended.ini/
// Numeric.ini content for this language has not been produced or verified
// yet. Per project standing rule, do not wire or ship this module until
// that's filled in from real plugin config and validated in-game.
//
// This file is spliced into core's <script> block by the build tool
// (see /build/builder.html) — plain JS, not a full HTML file, runs in the
// same scope as core.
// ---------------------------------------------------------------------------

window.PACENOTE_LANGUAGE_MODULES = window.PACENOTE_LANGUAGE_MODULES || {};

window.PACENOTE_LANGUAGE_MODULES.fi = {
    id: 'fi',
    label: 'Finnish (Numeronuotti A)',
    soundsFolder: 'Plugins/Pacenote/sounds/Janne Laahanen FiNu A',

    wordVariantCounts: {"1000_":4,"1001_":4,"100_":4,"101_":4,"10_":4,"120_":4,"121_":4,"140_":4,"141_":4,"150_":4,"151_":4,"160_":4,"161_":4,"180_":4,"181_":4,"1_":4,"200_":4,"201_":4,"20_":4,"21_":4,"220_":4,"221_":4,"240_":4,"241_":4,"250_":4,"251_":4,"260_":4,"261_":4,"280_":4,"281_":4,"2_":4,"300_":4,"301_":4,"30_":4,"31_":4,"320_":4,"321_":4,"340_":4,"341_":4,"350_":4,"351_":4,"360_":4,"361_":4,"380_":4,"381_":4,"3_":4,"400_":4,"401_":4,"40_":4,"41_":4,"420_":4,"421_":4,"440_":4,"441_":4,"450_":4,"451_":4,"460_":4,"461_":4,"480_":4,"481_":4,"4_":4,"500_":4,"501_":4,"50_":4,"51_":4,"520_":4,"521_":4,"540_":4,"541_":4,"550_":4,"551_":4,"560_":4,"561_":4,"580_":4,"581_":4,"5_":4,"600_":4,"601_":4,"60_":4,"61_":4,"620_":4,"621_":4,"640_":4,"641_":4,"650_":4,"651_":4,"660_":4,"661_":4,"680_":4,"681_":4,"6_":4,"_acute":2,"_chevron":2,"_hairpin":2,"_road_1":2,"_road_2":4,"_road_3":3,"_road_4":4,"_road_5":3,"_road_6":4,"_road_7":3,"_road_8":4,"_sharp_1":2,"_sharp_2":4,"_sharp_3":3,"_sharp_4":4,"_sharp_5":3,"_sharp_6":4,"_sharp_7":3,"_sharp_8":4,"_smooth_1":2,"_smooth_2":4,"_smooth_3":3,"_smooth_4":4,"_smooth_5":3,"_smooth_6":4,"_smooth_7":3,"_smooth_8":4,"_tightens":1,"_tightens_1":1,"_tightens_2":1,"_tightens_3":1,"_tightens_4":1,"_tightens_5":1,"_tightens_6":1,"_tightens_7":1,"_tightens_8":1,"_opens":1,"_opens_1":1,"_opens_2":1,"_opens_3":1,"_opens_4":1,"_opens_5":1,"_opens_6":1,"_opens_7":1,"_opens_8":1,"_continues":1,"_into":1,"_flattens_1":1,"_flattens_2":1,"_flattens_3":1,"_flattens_4":1,"_flattens_5":1,"_flattens_6":1,"_flattens_7":1,"_flattens_8":1,"_more_1":1,"_more_2":1,"_more_3":1,"_more_4":1,"_more_5":1,"_more_6":1,"_more_7":1,"_more_8":1,"_less_1":1,"_less_2":1,"_less_3":1,"_less_4":1,"_less_5":1,"_less_6":1,"_less_7":1,"_less_8":1,"_and":1,"_dont":1,"_lifts":1,"_crests":1,"_straightens":1,"_into_":1,"_over":1,"_immediately":1,"_soon":1,"_late":1,"_long":1,"_short":1,"_medium":1,"_narrows":1,"_road_":4,"_sharp_":4,"_smooth_":4,"_rear":1,"_round_hp":1,"_tight_hp":1},

    displayTranslations: {"one":"yksi","two":"kaksi","three":"kolme","four":"neljä","five":"viisi","six":"kuusi","acute":"terävä","hp":"hiuskarva","flat":"tasakaasu","square":"suora kulma","max":"maksimi","min":"minimi","hairpin":"hiuskarva","chevron":"nelikulmio","road":"tie","sharp":"jyrkkä","smooth":"pehmeä","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","tightens":"kiristyy","opens":"aukeaa","continues":"jatkuu","into":"sisään","flattens":"loivenee","more":"enemmän","less":"vähemmän","and":"ja","dont":"ei","lifts":"nousee","crests":"huipentuu","straightens":"suoristuu","over":"yli","immediately":"välittömästi","soon":"pian","late":"myöhään","long":"pitkä","short":"lyhyt","medium":"keskitaso","narrows":"kavenee","rear":"takana","round":"pyöreä","tight":"tiukka"},

    // English-language tooltip definitions for the 68 Finnish-only
    // identifiers Finnish adds beyond the shared 601-word vocabulary
    // (things like round/tight hairpin subtypes, "jatkuu"/"continues").
    atomicWordDefinitions: {"rear":"Refers to the rear (back) portion of a corner or feature.","round":"Describes a rounder, more open version of the feature it modifies (e.g. a rounder hairpin).","tight":"Describes a tighter, more acute version of the feature it modifies (e.g. a tighter hairpin)."},

    // Finnish phrases for the 8 shared damage/mechanical identifiers
    // (batterys_flat, etc. - same base words as English, different
    // spoken content).
    brokenDisplayOverrides: {"batterys_flat":"Akku on tyhjä","gearbox_broke":"Vaihteisto rikki","problem_engine":"Moottorissa ongelma","steering_broke":"Ohjaus rikki","sus_broke":"Jousitus rikki","water_temp":"Jäähdyttimen lämpötila","weve_got_fire":"Palo!","wv_lost_brakes":"Jarrut pois"},

    // Three genuine new corner-shape identifiers Finnish's scale uses that
    // core's vocabulary doesn't have (round/tight hairpin subtypes, a
    // "rear" corner concept). Purely additive - core never uses these
    // exact strings, so this has zero effect on English categorization.
    cornerWordSetAdditions: ['_rear', '_round_hp', '_tight_hp'],

    impactSpeechFiles: [{"file":"Oh_no.wav","phrase":"Voi ei!"},{"file":"oh_no1.wav","phrase":"Voi ei!"},{"file":"oh_no2.wav","phrase":"Voi ei!"},{"file":"oh_no3.wav","phrase":"Voi ei!"},{"file":"oh_no4.wav","phrase":"Voi ei!"},{"file":"oh_no5.wav","phrase":"Voi ei!"},{"file":"oh_no6.wav","phrase":"Voi ei!"},{"file":"oh_no7.wav","phrase":"Voi ei!"}],
    gameSpeechFiles: [{"file":"Go.wav","phrase":"Mene!"}],
    numberSpeechFiles: [{"file":"start1.ogg","phrase":"Kolme"},{"file":"start2.ogg","phrase":"Kaksi"},{"file":"start3.ogg","phrase":"Yksi"}],

    // REQUIRED before this module can be wired (Phase 2) or shipped:
    // verified Descriptive.ini/Extended.ini/Numeric.ini content for this
    // language. Do not fill this from assumption - verify against real
    // plugin config per project standing rule.
    pluginConfig: null,
};

// Apply this module's additive vocabulary immediately on load.
window.PACENOTE_LANGUAGE_MODULES.fi.cornerWordSetAdditions.forEach(w => CORNER_WORD_SET.add(w));
