# 🎙️ Pacenote Recorder Studio

> An all-in-one browser-based audio engineering suite and procedural script engine designed for recording, processing, auditioning, and exporting custom co-driver voice packs for the **Richard Burns Rally (RBR) Pacenote Plugin**.

---

## 🤖 AI-Assisted Development & Architecture

This software was entirely architected, designed, and generated through conversational **AI collaboration**. 

* **Procedural Logic Generation**: The 20-word script balancing algorithms, token boundary slicers, and RBR variant mapping (`_1`, `_2`, `_3`, `_4`) were synthesized by AI.
* **Audio Engineering & DSP Nodes**: Real-time Web Audio API graphs—including RMS-driven silence trimming limiters, peak normalizers, and bandpass overdrive intercom filters—were engineered using AI-driven code generation.
* **Zero-Framework Architecture**: Prompted and constructed as a self-contained, single-file HTML/JS/CSS client-side web application without external heavy framework dependencies.

---

## 🙏 Credits & Acknowledgments

Credit goes to the foundational projects, developers, and community pioneers who made custom rally pacenotes possible:

* **Luppis & Janne** — For their invaluable contributions, foundational work, testing, and pioneer voice/pacenote structures that laid the groundwork for modern RBR co-driver sound sets.
* **WorkerBee (Guenter Schlupf)** — Creator and main developer of the legendary **RBR Pacenote Plugin**. His work revolutionized *Richard Burns Rally* by enabling custom callouts, extended terminology, and external `.ogg` audio mapping.
* **The Global RBR Community (Czech, French, Vauhtimurot, OverTake, and RSF)** — For pioneering extended pacenote terminology, recording standards, and keeping RBR alive as the premier rally simulator.
* **JSZip Project Team** — Stuart Knightley, David Duponchel, Franz Buchinger, and Stephen Eminizer for their client-side zip creation library (`jszip.min.js`).
* **Warthog Games & SCi Games** — Developers and publishers of the original *Richard Burns Rally* (2004).

---

## 📜 Development Origins & Pre-Repo History

Before being structured into this formal GitHub repository, **Pacenote Recorder Studio** underwent several iterative AI generation prompt sessions as a local web utility to solve the painstaking process of manual pacenote creation.

### Pre-Repository Milestone Changelog

* **Phase 1: Script & Concatenation Engine**
  * Built initial 20-word procedural script engine to balance distance calls, corner severities, and connectors into readable blocks.
  * Formatted RBR token naming patterns and established strict variant mapping (`_1`, `_2`, `_3`, `_4`).

* **Phase 2: Web Audio API Integration & RMS Trimming**
  * Integrated direct browser microphone capture with configurable pre-roll delay and metronome guidance.
  * Implemented real-time Web Audio API signal processing, adding automated RMS-based silence trimming to cleanly split recorded strings into isolated tokens.

* **Phase 3: DSP Intercom Simulation & Peak Normalization**
  * Added active bandpass filtering and saturation drive to simulate authentic cockpit comms (e.g., Stilo radio intercoms).
  * Implemented peak normalization to eliminate volume disparities across multi-hour recording sessions.

* **Phase 4: Persistence, Auditioning & Package Generation**
  * Migrated local audio buffer caching to `IndexedDB` (`RBRStudioDB`) to protect progress against browser reloads.
  * Added the *Stage Fluidity Playground* for live auditioning of procedural note chains.
  * Integrated JSZip for instant, plug-and-play `.zip` generation matching WorkerBee's plugin directory structure.

---

## 🚀 Overview

Creating a complete custom co-driver voice pack for *Richard Burns Rally* traditionally required manually recording and trimming hundreds of individual audio files with consistent volume, cadence, and naming conventions. 

**Pacenote Recorder Studio** streamlines this entire workflow into a single client-side web application. It combines a **procedural script engine** (which balances words across 20-word reading blocks), **rhythmic beat pacing**, **automatic silence trimming via RMS**, **DSP intercom simulation**, and **direct plug-and-play package generation**.

---

## ✨ Key Features

### 📋 Procedural Scripting & Workflow Engine
* **Balanced 20-Word Concatenative Scripts**: Automatically distributes distance calls, corner severities, directions, connectors, and vocabulary into natural reading blocks.
* **Targeted Individual Token Mode**: Direct matrix view to jump to and re-record specific single tokens, impacts, or countdown calls.
* **Severity & Usage Hints**: Hover tooltips show exact RBR context, call definitions, and color-coded severity markers (Urgent, Elevated, Firm, Warm, Neutral).
* **Multiple Co-Driver Profiles**: Manage distinct co-driver voice sets side-by-side within the same browser session.

### 🎙️ Rhythmic Recording & Audio Acquisition
* **Visual Beat Metronome**: Rhythmic tempo guidance (adjustable WPM) to keep callout cadence consistent across multi-hour recording sessions.
* **Pre-Roll Delay & Countdowns**: Configurable pre-roll delay before recording starts.
* **File Upload Support**: Upload pre-recorded external audio source files for slicing and processing.

### 🎛️ Web Audio API Signal Processing & DSP
* **RMS Silence Trimming**: Detects audio threshold boundaries and strips silence based on configurable millisecond breaks and RMS limiters.
* **Peak Volume Normalization**: Normalizes captured audio buffers across the entire session to target peak levels (e.g., 0.95 peak).
* **Co-Driver Intercom Radio DSP**: Real-time cockpit comms simulation featuring microphone saturation/drive and bandpass filters:
  * *Stilo Vintage Low-Fi* (300Hz - 3.5kHz)
  * *Clear Comms* (150Hz - 6.0kHz)
  * *Aggressive Cockpit Radio Distortion*

### 🎲 Stage Fluidity Playground
* **Live Cadence Auditioning**: Generates random pacenote chains strictly from your recorded voice buffers. Test transition clipping, phrasing, and speed before exporting to RBR.

### 💾 Persistence & Package Export
* **IndexedDB Session Storage**: Keeps PCM audio buffers saved safely in browser storage (`RBRStudioDB`) across browser restarts.
* **Portable Project Backups**: Export or import complete raw project archives (`.zip`) for cross-device migration.
* **Plug-and-Play Package Export**: Generates ready-to-use directory structures matching RBR's `Plugins/Pacenote/` format, complete with `_HOW_TO_INSTALL.txt` and formatted `.ogg` files.
## 🛠️ Audio Processing Pipeline

    [ Microphone / File Input ]
                │
                ▼
       [ AudioContext Stream ]
                │
                ▼
    [ Rhythmic Beat Guidance / Capture ]
                │
                ▼
       [ RMS Silence Trimmer ] ──► (Trims pre/post silence)
                │
                ▼
       [ Slice Engine ]         ──► (Slices multi-word script buffers into individual tokens)
                │
                ▼
     [ Peak Volume Normalizer ] ──► (Scales waveform amplitudes)
                │
                ▼
     [ Radio Intercom DSP Graph] ──► (Audition overdrive & bandpass clamping)
                │
                ▼
     [ IndexedDB Cache / ZIP ]  ──► (Local state & Plug-and-Play RBR export)

---

## 📖 How to Use

### Step 1: Initialize Audio Context
1. Open the application in a modern browser (Chrome, Edge, Firefox, Safari).
2. Click **🎙️ Step 1: Initialize Audio Context Stream**.
3. Select your input microphone from the dropdown menu.

### Step 2: Configure Profile & Parameters
1. Enter your **Co-Driver Name** (used for `.ini` metadata and file naming).
2. Choose or create a **Codriver Profile**.
3. Adjust **Reading Pace (WPM)**, **Pre-Roll Delay**, and **Silence Threshold** as needed.

### Step 3: Record Voice Scripts
1. Press **🔴 Start Recording** (or use the spacebar/controls).
2. Follow the yellow pre-roll countdown and speak each highlighted word on the beat.
3. Click **⏹️ Stop / Process** to slice the recording into individual pacenote tokens.
4. Click **➡️ Accept & Next Script** to advance through the manifest.

### Step 4: Audit & Normalize
1. Open the **Stage Fluidity Playground** panel and click **🎲 Construct Random String** followed by **🔊 Audition Run** to test voice transitions.
2. Click **Normalize Volumes** under *Session State Control* to ensure peak levels are balanced.

### Step 5: Export to RBR
1. Click **📥 Export Plug-and-Play Package (.ZIP)** under the *System Manifest Matrix Inventory*.
2. Extract the resulting zip file into your *Richard Burns Rally* installation directory.

---

## 📁 RBR Folder Structure & Installation

Extracted zip packages mirror the standard layout required by **WorkerBee's Pacenote Plugin**:

    Richard Burns Rally/
    └── Plugins/
        └── Pacenote/
            ├── sounds/
            │   └── <your_codriver_name>/
            │       ├── 100_1.ogg
            │       ├── 100_2.ogg
            │       ├── acute_left1.ogg
            │       ├── dont_cut1.ogg
            │       ├── Audio/
            │       │   ├── Impact/
            │       │   │   └── Speech/
            │       │   │       ├── Oh_no.wav
            │       │   │       └── ugh.wav
            │       │   ├── Game/
            │       │   │   └── Go.wav
            │       │   └── Speech/
            │       │       └── Number/
            │       │           ├── start1.ogg
            │       │           ├── start2.ogg
            │       │           └── start3.ogg
            │       └── silence650.ogg
            └── PaceNote.ini  (Update sounds=<your_codriver_name>)
## 📊 Pacenote Coverage Manifest

Pacenote Recorder Studio tracks and generates full variant coverage across:

| Call Category | Descriptions & Variants |
| :--- | :--- |
| **Numeric Distances** | `10_` through `1000_` (4 variants per distance call) |
| **Corner Severities** | `1_` through `6_`, `flat_`, `acute_`, `hp_`, `square_`, `max_` |
| **Corner Modifiers** | `plus`, `minus`, `tightens`, `opens`, `early`, `late` |
| **Directions** | `left`, `right`, `leftish`, `rightish` |
| **Connectors** | `and`, `into`, `onto`, `over`, `through`, `then`, `at`, `for` |
| **Hazards & Terrain** | `dont_cut`, `crest`, `jump`, `dip`, `bad_camber`, `ruts`, `rocks`, `bales`, etc. |
| **Special Reactions** | Impact voice lines (`oh_no`, `ugh`, `watch`), Stage Start (`Go`), and Countdowns (`start1`, `start2`, `start3`) |

---

## 🛠️ Built With

* **AI Collaboration**: Built, architected, and coded with AI assistance.
* **HTML5 & CSS3**: Responsive UI with dark-theme studio styling.
* **Vanilla JavaScript (ES6+)**: Standalone engine execution without external framework overhead.
* **Web Audio API**: Real-time audio recording, buffer manipulation, RMS threshold analysis, and DSP filtering graphs.
* **IndexedDB**: Asynchronous client-side data storage (`RBRStudioDB`) for storing recorded PCM audio buffers.
* **JSZip (v3.10.1)**: In-browser archive generation for backup and export packages.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

*Richard Burns Rally is a trademark of SCi Games / Warthog Games. This project is an independent community development utility not affiliated with or endorsed by SCi Games.*
