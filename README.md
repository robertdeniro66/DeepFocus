# DeepFocus Browser Extension

Transform your time-on-page into an ocean descent experience. Watch as your browsing session takes you deeper into the ocean, with gentle color shifts and marine life facts.

## Features

- 🌊 Transparent overlay shows ocean depth progression
- 🐠 Floating badge displays current depth
- 📚 Info panel with marine life facts
- ⚡ Performance optimized (≤2% CPU, ≤50MB RAM)
- ♿ WCAG-AA compliant
- 🌐 Works in Chrome, Edge, and Firefox

## Development with GitHub Codespaces

1. Click the "Code" button on this repository
2. Select the "Codespaces" tab
3. Click "Create codespace on main"
4. Wait for the environment to build (takes about 1-2 minutes)

Once the codespace is ready:

```bash
# Start development server for Chrome
npm run dev:chrome

# Or for Firefox
npm run dev:firefox
```

The extension will be built and hot-reloaded as you make changes.

## Building for Production

```bash
npm run build
```

This creates a production-ready extension in the `dist` directory.

## Project Structure

```
src/
  ├─ background.ts        # Extension background script
  ├─ content/            # Content scripts
  │   ├─ Overlay.tsx     # Main overlay component
  │   └─ InfoPanel.tsx   # Species info panel
  ├─ data/               # Static data
  │   └─ fauna.json      # Marine species data
  ├─ utils/              # Utilities
  │   └─ depth.ts        # Depth calculations
  └─ styles/             # Styles
      └─ tailwind.css    # Tailwind styles
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details 