# 🎙️ Pacenote Recorder Studio

[Live demo](https://studio.cauch.uk) · [Issues](https://github.com/yiyirob973/Pacenote-Recorder-Studio/issues) · License: MIT

An all-in-one, browser-based audio engineering suite and procedural script engine designed for recording, processing, auditioning, and exporting complete custom co-driver voice packs for Richard Burns Rally (RBR) Pacenote Plugin.

This README has been updated to reflect recent additions in the single-file client app (index.html): language engine with a Finnish pack, per-profile storage and keys, two-phase recording workflow, real Ogg Vorbis encoding via a WASM encoder with a safe fallback, language-aware export packaging and generated PaceNote.ini, improved DSP preview controls, and additional UI/UX improvements such as normalization progress overlays and richer export progress feedback.

## Overview
Pacenote Recorder Studio streamlines the end-to-end workflow for creating RBR co-driver voice packs: from rhythmic recording and automated silence slicing to DSP auditioning and plug-and-play package exports. The app is a single-file, client-side web application that runs under a static server (HTTPS or localhost is required for microphone access).

## What’s new (high level)
- Language engine + Finnish pack: live switching between English and a Finnish (Numeronuotti A) pack, with per-fragment Finnish display translations, Finnish-only tooltip definitions, and a real Finnish word manifest bundled in the app.
- Language-aware export packaging: exported ZIPs use a pack folder named after your chosen codriver name and the active language label; PaceNote.ini is generated to point to that folder automatically.
- Real Ogg Vorbis encoding in-browser: attempts genuine libvorbis encoding using wasm-media-encoders (WASM libvorbis build loaded from unpkg). If the encoder is unavailable, export falls back to the previously-used WAV-with-.ogg-extension method so exports never regress.
- Two-phase recording workflow: Phase 1 produces one take of every core token (a fully functional exportable pack). Phase 2 adds variant coverage for extra variety. The app uses a single source of truth (isCoreToken()) to mark tokens that count as Phase 1.
- Profiles & per-profile storage: codriver profiles allow storing separate buffer/key namespaces so multiple voice sets can co-exist in the browser IndexedDB.
- DSP auditioning presets & controls: band-limited radio/intercom simulation with drive (saturation) and bandwidth presets (vintage/modern/aggressive) for realistic previewing.
- Improved UI & export feedback: normalization progress modal/overlay, export progress bar and master progress metrics, phase progress bars, and matrix grid state colors/quality indicators.
- Stage Fluidity Playground: construct random pacenote phrases out of recorded tokens to check transition clipping and concatenative behavior.

## Quick links
- Demo: https://studio.cauch.uk
- Repo: https://github.com/yiyirob973/Pacenote-Recorder-Studio
- Report an issue: https://github.com/yiyirob973/Pacenote-Recorder-Studio/issues
- License: MIT (see LICENSE)

## Table of contents
- Features
- What's new (detailed)
- Architecture & audio pipeline
- How to use
- Run locally (development)
- Browser support & known issues
- Privacy & data handling
- Export / Install into RBR
- Accessibility
- Troubleshooting
- Credits
- Contributing
- License

## Key features
- Procedural 20-word script engine that balances numeric distances, severities, directions, and connectors into natural reading blocks (deterministic shuffling, category weights, connector placement fixes).
- Rhythmic beat metronome with adjustable WPM and pre-roll countdown for consistent cadence.
- File upload for pre-recorded sourcing and live microphone capture with configurable pre-roll.
- RMS-based silence trimming and slice engine to extract individual pacenote tokens automatically.
- Peak volume normalization across sessions to equalize loudness; includes a normalization progress overlay during processing.
- Real-time radio/intercom DSP (bandpass, saturation/drive presets) for auditioning authentic cockpit comms.
- IndexedDB persistence (RBRStudioDB) for offline session storage and cross-tab recovery — per-profile keys are used so multiple distinct codriver profiles can be stored side-by-side.
- In-browser ZIP export that produces a plug-and-play directory matching WorkerBee's Pacenote Plugin layout; export packaging is language-aware and the tool now generates PaceNote.ini automatically.
- In-browser Ogg Vorbis encoding attempted via wasm-media-encoders (WASM libvorbis). Automatic, safe fallback to the established WAV-with-.ogg-extension approach ensures exports still succeed if the encoder fails to load.
- Two-phase recording workflow (Phase 1 = core tokens sufficient for a working pack; Phase 2 = additional variants for variety) and recording focus modes (all / required / remaining).
- Stage Fluidity Playground to audition random pacenote chains for transition testing.
- Per-token QA & severity markers surfaced in the UI with a severity legend and tooltip definitions.

## What's new (detailed)
- Language Engine and Finnish Pack
  - The app includes a FINNISH_PACK (Numeronuotti A) containing a Finnish file manifest, display translations for identifier fragments, impact/game/number spoken phrases in Finnish, and Finnish-only tooltip definitions.
  - switchLanguage(lang) toggles active resources (wordVariantCounts, impact/game/number speech files, and display overrides) between English and Finnish at runtime.
  - Fragment-level translation: formatScriptDisplayWord() centralizes how tokens are shown across scripts, the matrix grid, the Fluidity Playground, and tooltip titles. When Finnish is active, fragments are translated per FINNISH_PACK.displayTranslations.
  - auditFinnishTranslationCoverage() runs a QC pass on the Finnish manifest and logs coverage gaps to the console.

- Export packaging & PaceNote.ini generation
  - getActiveSoundsFolder() returns the active pack folder: Plugins/Pacenote/sounds/<Codriver Name> (English|Finnish) and exportStructuredZip() uses that for the package layout.
  - generatePaceNoteIni() builds a PaceNote.ini with the sounds= value pointed at your generated pack folder so the user doesn't need to edit the file manually after extraction.

- Real Ogg Vorbis encoding (WASM) + robust fallback
  - The page attempts to load wasm-media-encoders (a WASM libvorbis build) from unpkg and uses encodeAudioBufferForExport() to encode .ogg-targeted files genuinely.
  - If the encoder isn’t available (no network, loading error, incompatible browser), the exporter falls back to producing WAV files (or using the previous "WAV-with-.ogg-extension" approach when appropriate), ensuring export never fails silently or regresses.

- Per-profile keys & IndexedDB handling
  - profileBufferKey() and profileMetaKey() functions namespace stored buffers and metadata by activeProfileName so multiple distinct profiles can be saved in the same IndexedDB.
  - The IndexedDB database is `RBRStudioDB` with object stores for `meta` and `buffers`.

- Two-phase recording & recording focus modes
  - Phase 1 marks a single variant (variant 1) of all primary word-bases and includes impact/game/number/broken tokens — enough for a functional pack.
  - Phase 2 adds additional variants for variety. isCoreToken() is the single source of truth for Phase 1 membership.
  - recordingFocusMode supports 'all', 'required' (phase 1), and 'remaining' (phase 2 coverage) to help you prioritize recording.

- DSP playback & presets
  - DSP preview (Co-Driver Intercom DSP Simulation) now includes a Drive (saturation) control and bandwidth preset selector (vintage/modern/aggressive) and an ON/OFF toggle.
  - toggleDSPPlaybackState() updates UI labels and logs the state change.

- UI/UX improvements
  - Volume normalization now shows a full-screen overlay with a progress bar and status text while buffers are processed and normalized.
  - Export progress UI shows per-export progress (export-progress-bar), master overall capture progress (master-progress), and phase-specific progress (phase1/phase2 progress bars).
  - Matrix grid rendering includes state colors (recorded/impact/bonus/damage), quality-warning outlines, and an active-target highlight for single-token targeting.
  - Countdown overlay and metronome beat-bar help sync recording cadence.
  - Stage Fluidity Playground constructs random strings from recorded tokens and provides an audition button.

- Miscellaneous
  - The app ships a SILENCE_FILENAME constant (silence650.ogg) used for padding where necessary.
  - sanitizeForFolderName() and sanitizeCodriverNameForFile() help ensure filesystem-safe folder and file names for exports.
  - The app logs a running changelog and pipeline diagnostics to the embedded engine log, and has a changelog panel in the UI.

## Architecture & audio processing pipeline
[ Microphone / File Input ]
            ↓
   [ AudioContext / AudioWorklet ]
            ↓
   [ Rhythmic Beat Guidance / Capture ]
            ↓
   [ RMS Silence Trimmer ] → (trim pre/post silence)
            ↓
   [ Slice Engine ]         → (split multi-word buffers to tokens)
            ↓
   [ Peak Volume Normalizer ] → (scale amplitudes)
            ↓
   [ Radio Intercom DSP Graph ] → (audition overdrive & bandpass)
            ↓
   [ IndexedDB Cache / JSZip Export ] → (local state & export)

## How to use (end user)
1. Open the application in a modern desktop browser (Chrome, Edge, Firefox recommended; see Browser support).
2. Step 1 — Initialize audio:
   - Click "🎙️ Step 1: Initialize Audio Context Stream".
   - Choose a microphone input.
   - Note: getUserMedia requires a secure context (HTTPS or localhost).
3. Step 2 — Configure profile & language:
   - Enter Co-Driver Name (used for file/INI metadata and as the export folder name).
   - Create or select a Codriver Profile to store sets separately.
   - Choose Pacenote Language: English or Finnish (Numeronuotti A). Switching languages updates script text, display names, and export packaging.
   - Adjust Reading Pace (WPM), Pre-Roll Delay, Silence Threshold.
4. Step 3 — Record:
   - Press "🔴 Start Recording" (or use the spacebar).
   - Follow pre-roll and metronome; speak each highlighted word on the beat.
   - Press "⏹️ Stop / Process" to slice the recording into tokens.
   - Use "➡️ Accept & Next Script" to advance through generated scripts.
5. Step 4 — Audit & Normalize:
   - Use Stage Fluidity Playground: "Construct Random String" → "Audition Run".
   - Normalize volumes to target peak with the Normalize Volumes button; watch the volume normalization overlay for progress.
6. Step 5 — Export:
   - Click "📥 Export Plug-and-Play Package (.zip)".
   - The exporter attempts WASM Ogg encoding; if unavailable, it falls back to the safe WAV approach.
   - The exported ZIP contains Plugins/Pacenote/sounds/<Your Codriver Name> (English|Finnish) and a generated PaceNote.ini.

## Run locally (development)
This project is a single-file client-side app and requires a static server due to browser secure-context restrictions for microphone access.

Examples:
- Python 3: python -m http.server 8000
- Node (serve): npx serve . -p 8000
- Node (http-server): npx http-server -p 8000

Then open: http://localhost:8000 (or https://localhost with an HTTPS server). getUserMedia only works on HTTPS pages or on localhost.

If the repo later includes build tooling, follow the project's CONTRIBUTING.md for build steps. Currently there is no build step required.

## Browser support & known issues
- Recommended: Desktop Chrome, Edge, Firefox (latest versions).
- Safari (macOS/iOS): partial support — AudioWorklet and long-running recording behavior may differ; use the latest Safari and test carefully.
- Mobile browsers: not recommended for full session recording (permissions, tab suspensions, and background recording limitations).
- WASM encoder availability: Ogg Vorbis encoding requires the wasm-media-encoders WASM module to load successfully; the exporter will fall back automatically if the module fails to load.
- AudioWorklet vs ScriptProcessorNode: behavior and latency differ; check the console if the app falls back to ScriptProcessorNode.
- Autoplay restrictions: browsers may require a user interaction to enable audio playback; ensure you click/initiate before auditioning.

## Privacy & data handling
- Local-first: Recordings and session buffers are stored in your browser's IndexedDB database named `RBRStudioDB` by default. By default no audio or project data is uploaded to any external server.
- Per-profile storage: multiple codriver profiles are namespaced within the same DB so different voice sets are isolated by their profile keys.
- Clearing data:
  - Use the app's "Delete Project" or "Clear Session" UI controls (if available).
  - Or in browser DevTools: Application → IndexedDB → delete `RBRStudioDB`.
- Exported ZIPs: exporting produces files you can share. Be careful when sharing personal recordings.
- If you add telemetry, analytics, or third-party uploads later, the README will be updated to describe opt-out instructions.

## Exporting and installing into Richard Burns Rally
Export produces a ZIP structured to match WorkerBee's Pacenote Plugin layout.

Example exported folder structure:
Richard Burns Rally/
└── Plugins/
    └── Pacenote/
        ├── sounds/
        │   └── <your_codriver_name> (English|Finnish)/
        │       ├── 100_1.ogg
        │       ├── 100_2.ogg
        │       ├── acute_left1.ogg
        │       ├── dont_cut1.ogg
        │       └── Audio/
        │           └── Speech/
        │               └── Number/
        │                   ├── start1.ogg
        │                   └── start2.ogg
        └── PaceNote.ini  (generated by the app — sounds=<your_codriver_name> (English|Finnish))

Install steps:
1. Extract the exported ZIP.
2. Copy the plugins folder into your RBR installation directory so the path matches: Richard Burns Rally/Plugins/Pacenote/.
3. The tool generates PaceNote.ini for you; verify sounds=<your_codriver_name> if you changed the folder name.
4. Launch RBR and select the Pacenote plugin.

## Accessibility
- Keyboard: keyboard shortcuts are available for primary controls (initialize, record, stop, export). See the in-app help for the complete list.
- Screen readers: major UI elements include ARIA labels where applicable. If you rely on screen reader support, please test the demo and file issues for gaps.
- Color & contrast: severity markers are color-coded and accompanied by text/tooltips; color is not the only indicator.

## Troubleshooting
- No microphone found: confirm the browser has permission to access the microphone and that the device is selected in system settings.
- getUserMedia denied: refresh the page and grant permission, or change site permissions in browser settings.
- WASM encoder fails to load / encoding falls back: exports will still complete using the safe fallback approach (WAV-with-.ogg-extension or WAV). Check the console for a log about the encoder loading status.
- Large project fails to save: browser IndexedDB quota may be reached — export your project and clear session data. Different browsers enforce different quotas.
- Playback stuttering: try a lower buffer size or use a different browser; check CPU usage and close other heavy apps.
- Exported files not recognized by RBR: make sure the ZIP was extracted to the correct Plugins/Pacenote/ path and PaceNote.ini points to the codriver folder.

## Technical notes & limitations
- Storage: Long multi-hour recordings may be large; expect browser-specific storage quotas.
- Formats: Exports attempt `.ogg` (genuine libvorbis via WASM) and fall back to `.wav` or the WAV-with-.ogg-extension approach for compatibility. Sample rates and bitrates are set to browser defaults unless overridden in advanced settings.
- DSP: Radio/intercom presets are implemented with Web Audio nodes (filter + wave-shaping). Auditioning is approximate and intended for preview; final in-game sound may require fine tuning.
- Export packaging: Impact/Game/Broken/Number folders are handled consistently with how real RBR packs are structured; only the main sounds folder varies by the pack's codriver name and active language label.

## Credits & acknowledgments
Thanks to the RBR modding and pacenote communities whose terminology, tooling, and plugin formats informed this project.
- Luppis & Janne — pacenote terminology and structures
- WorkerBee (Guenter Schlupf) — RBR Pacenote Plugin (format inspiration)
- wasm-media-encoders (libvorbis WASM)
- JSZip project contributors
- The global RBR community for testing and feedback

## Contributing
Contributions are welcome. Please:
1. Fork the repo.
2. Create a feature branch: git checkout -b fix/readme
3. Commit with a clear message and open a pull request.
4. Add tests or a brief explanation for regressions.

When opening issues, include:
- Browser and version
- Operating system
- Steps to reproduce
- Console logs/screenshots if relevant

## License
This project is distributed under the MIT License — see `LICENSE` for details.

*Richard Burns Rally is a trademark of SCi Games / Warthog Games. This project is an independent community development utility not affiliated with or endorsed by SCi Games.*
