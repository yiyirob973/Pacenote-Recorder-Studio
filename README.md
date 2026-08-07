# 🎙️ Pacenote Recorder Studio

[Live demo](https://studio.cauch.uk) · [Issues](https://github.com/yiyirob973/Pacenote-Recorder-Studio/issues) · License: MIT

An all-in-one, browser-based audio engineering suite and procedural script engine designed for recording, processing, auditioning, and exporting complete custom co-driver voice packs for Richard Burns Rally (RBR).

## Overview
Pacenote Recorder Studio streamlines the end-to-end workflow for creating RBR co-driver voice packs: from rhythmic recording and automated silence slicing to DSP auditioning and plug-and-play package export compatible with WorkerBee's Pacenote Plugin. It is implemented as a single-file client-side web application (HTML/JS/CSS), uses the Web Audio API for recording and processing, IndexedDB for local persistence, and JSZip for in-browser ZIP generation.

## Quick links
- Demo: https://studio.cauch.uk
- Repo: https://github.com/yiyirob973/Pacenote-Recorder-Studio
- Report an issue: https://github.com/yiyirob973/Pacenote-Recorder-Studio/issues
- License: MIT (see LICENSE)

## Table of contents
- Features
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
- Procedural 20-word script engine that balances numeric distances, severities, directions, and connectors into natural reading blocks.
- Rhythmic beat metronome with adjustable WPM and pre-roll countdown for consistent cadence.
- File upload for pre-recorded sourcing and microphone capture with pre-roll.
- RMS-based silence trimming and slice engine to extract individual pacenote tokens automatically.
- Peak volume normalization across sessions to equalize loudness.
- Real-time radio/intercom DSP (bandpass, saturation/drive presets) for auditioning authentic cockpit comms.
- IndexedDB persistence (RBRStudioDB) for offline session storage and cross-tab recovery.
- In-browser ZIP export that produces a plug-and-play directory matching WorkerBee's Pacenote Plugin structure.
- Stage Fluidity Playground to audition random pacenote chains for transition testing.

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
3. Step 2 — Configure profile:
   - Enter Co-Driver Name (used for file/INI metadata).
   - Create or select a Codriver Profile.
   - Adjust Reading Pace (WPM), Pre-Roll Delay, Silence Threshold.
4. Step 3 — Record:
   - Press "🔴 Start Recording" (or use the spacebar).
   - Follow pre-roll and metronome; speak each highlighted word on the beat.
   - Press "⏹️ Stop / Process" to slice the recording into tokens.
   - Use "➡️ Accept & Next Script" to advance.
5. Step 4 — Audit & Normalize:
   - Use Stage Fluidity Playground: "Construct Random String" → "Audition Run".
   - Normalize volumes to target peak (UI control available).
6. Step 5 — Export:
   - Click "📥 Export Plug-and-Play Package (.zip)".
   - Extract into your Richard Burns Rally installation (see Export/Install section).

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
- AudioWorklet vs ScriptProcessorNode: behavior and latency differ; check the console if the app falls back to ScriptProcessorNode.
- Autoplay restrictions: browsers may require a user interaction to enable audio playback; ensure you click/initiate before auditioning.

## Privacy & data handling
- Local-first: Recordings and session buffers are stored in your browser's IndexedDB database named `RBRStudioDB`. By default no audio or project data is uploaded to any external server.
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
        │   └── <your_codriver_name>/
        │       ├── 100_1.ogg
        │       ├── 100_2.ogg
        │       ├── acute_left1.ogg
        │       ├── dont_cut1.ogg
        │       └── Audio/
        │           └── Speech/
        │               └── Number/
        │                   ├── start1.ogg
        │                   └── start2.ogg
        └── PaceNote.ini  (update sounds=<your_codriver_name>)

Install steps:
1. Extract the exported ZIP.
2. Copy the plugins folder into your RBR installation directory so the path matches: Richard Burns Rally/Plugins/Pacenote/.
3. Edit PaceNote.ini and set sounds=<your_codriver_name>.
4. Launch RBR and select the Pacenote plugin.

## Accessibility
- Keyboard: keyboard shortcuts are available for primary controls (initialize, record, stop, export). See the in-app help for the complete list.
- Screen readers: major UI elements include ARIA labels where applicable. If you rely on screen reader support, please test the demo and file issues for gaps.
- Color & contrast: severity markers are color-coded and accompanied by text/tooltips; color is not the only indicator.

## Troubleshooting
- No microphone found: confirm the browser has permission to access the microphone and that the device is selected in system settings.
- getUserMedia denied: refresh the page and grant permission, or change site permissions in browser settings.
- Large project fails to save: browser IndexedDB quota may be reached — export your project and clear session data. Different browsers enforce different quotas.
- Playback stuttering: try a lower buffer size or use a different browser; check CPU usage and close other heavy apps.
- Exported files not recognized by RBR: make sure the ZIP was extracted to the correct Plugins/Pacenote/ path and PaceNote.ini points to the codriver folder.

## Technical notes & limitations
- Storage: Long multi-hour recordings may be large; expect browser-specific storage quotas.
- Formats: Exports produce `.ogg` (and/or `.wav` depending on the UI choice). Sample rates and bitrates are set to browser defaults unless overridden in advanced settings.
- DSP: Radio/intercom presets are implemented with Web Audio nodes (filter + wave-shaping). Auditioning is approximate and intended for preview; final in-game sound may require fine tuning.

## Security & third-party dependencies
- JSZip (v3.10.1) is used for ZIP generation. If included from a CDN, a Subresource Integrity (SRI) hash is recommended.
- No remote uploads by default—any addition of analytics or remote storage will be documented and require opt-in.

## Credits & acknowledgments
Thanks to the RBR modding and pacenote communities whose terminology, tooling, and plugin formats informed this project.
- Luppis & Janne — pacenote terminology and structures
- WorkerBee (Guenter Schlupf) — RBR Pacenote Plugin (format inspiration)
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
