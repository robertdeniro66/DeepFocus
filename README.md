# DeepFocus

A multi-browser extension that transforms your time-on-page into a gentle ocean descent, visualized as a transparent overlay with live depth, marine silhouettes, and snack-sized ocean facts.

## Features
- **Ocean Descent Overlay:** See your focus time visualized as a journey through ocean layers.
- **Floating Depth Badge:** Shows current zone and meters; click to open Info Panel.
- **Info Panel:** Learn about marine life at your current depth (NOAA-cited facts).
- **Options Page:** Toggle overlay, set idle timeout, enable color-blind mode.
- **Performance:** ≤2% CPU, ≤50MB RAM at 95th percentile sessions.
- **Accessibility:** Overlay opacity ≤8%, WCAG-AA text, keyboard shortcuts (⌥+O, ⌥+I).
- **Internationalization:** All UI text in `src/i18n/en.json`.

## Ocean Zones & Timing
- Surface: 0–30s (0m)
- Epipelagic: 0.5–2min (0–200m)
- Mesopelagic: 2–15min (200–1,000m)
- Bathypelagic: 15–45min (1,000–4,000m)
- Abyssal: >45min (4,000–6,000m)

## 🐟 How to Use DeepFocus as a Chrome Extension
1. **Clone the Repository**
 ```sh
   git clone https://github.com/robertdeniro66/DeepFocus.git
   cd DeepFocus/extension
   ```

2. **No Build Step Needed**
This version does not require a build step. All the code is ready to use in the `extension` folder.

4. **Load the Extension in Chrome**
- Open Chrome and go to chrome://extensions/
- Enable Developer mode (toggle in the top right)
- Click Load unpacked
- Select the extension folder (the one you are in now)

4. **Using the Extension**
The extension will show a floating tile and ocean overlay on any page.
Click the tile to open the info panel.
Use the options page to adjust settings (click the extension icon, then the gear/settings).

6. **Troubleshooting**
If you update the code, click the refresh icon on the extension in chrome://extensions/.
If you see errors, check the browser console for details.

## Project Structure
```
manifest.json
vite.config.ts
package.json
src/
  background.ts
  content/
    Overlay.tsx
    useDepthTimer.ts
    InfoPanel.tsx
  data/fauna.json
  utils/depth.ts
  styles/tailwind.css
  i18n/en.json
options/
  Options.tsx
  index.html
test/
  depth.test.ts
README.md
```

## Performance & Security
- CSS-only transforms, 15fps throttle on battery.
- Strict CSP, no eval, least-privilege permissions.
- Overlay in shadow DOM; no host DOM mutation.

## Credits
- Marine facts: NOAA (see `fauna.json` for species IDs)
- UI: React, TailwindCSS, shadcn/ui

---
MIT License 
