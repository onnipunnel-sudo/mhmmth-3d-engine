# MHMMTH 3D Engine V1 — Open World Prototype

A tiny, original, browser-based 3D engine prototype built with Three.js. Designed to be edited from an Android phone and run in a modern mobile browser.

## What works in V1
- Low-poly 3D scene with ground, road, trees and buildings
- Third-person player capsule
- Touch joystick movement
- Touch-drag camera control
- Add-building button
- Export a basic world layout as JSON
- Lightweight renderer settings for mobile

## Run it on Android
This project uses ES modules and imports Three.js from a CDN, so it needs an internet connection on first load and must be served over HTTP (opening index.html as a local file may fail).

1. Download and extract this ZIP on your Android phone.
2. Open the folder in an Android code editor that supports a local web preview/server, or upload the folder to a free static host such as GitHub Pages.
3. Ensure the project root is served, with `index.html`, `style.css`, and `src/`.
4. Open the served page in Chrome.
5. Tap HELP for controls.

## Technology
- JavaScript + Three.js + WebGL
- No paid API, no subscription, no backend
- Three.js is an open-source library; check its license and current CDN version before distributing.

## Limitations (honest V1 scope)
This is a prototype, not a full commercial game engine. It does not yet include vehicles, NPC AI, missions, terrain streaming, asset import, a visual editor, shadows, audio, physics middleware, or APK export. The world is a small fixed test map; buildings are simple placeholders.

## Next milestones
1. Add grid-based placement and editable object properties.
2. Add chunk-based terrain streaming and save/load.
3. Add a simple vehicle controller (non-combat driving prototype).
4. Add NPC pedestrians and basic navigation.
5. Add asset import and Android packaging through a proper build workflow.

## Performance notes
Start with low graphics settings, keep the map small, and test on the target phone. Mobile performance varies by browser, thermals, memory and GPU. This prototype caps pixel ratio at 1.5 and disables shadows for a lighter baseline.
