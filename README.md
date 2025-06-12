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

## Getting Started

### 1. Install dependencies
```sh
npm install
```

### 2. Development
- **Chrome:**
  ```sh
  npm run dev:chrome
  ```
- **Firefox:**
  ```sh
  npm run dev:firefox
  ```

### 3. Build for production
```sh
npm run build
```

### 4. Load Extension
- **Chrome/Edge:** Load `dist/` as an unpacked extension.
- **Firefox:** Use `about:debugging` to load `dist/` as a temporary add-on.

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

## Testing
```sh
npm run test
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