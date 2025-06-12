import React from 'react';
import { createRoot } from 'react-dom/client';
import Overlay from './Overlay';

const SHADOW_ID = 'deepfocus-shadow-root';

function mountOverlay() {
  if (document.getElementById(SHADOW_ID)) return;
  const container = document.createElement('div');
  container.id = SHADOW_ID;
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.zIndex = '2147483647';
  container.style.pointerEvents = 'none';
  document.body.appendChild(container);

  const shadow = container.attachShadow({ mode: 'open' });
  const reactRoot = document.createElement('div');
  shadow.appendChild(reactRoot);

  // Inject Tailwind CSS into shadow root
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = chrome.runtime.getURL('src/styles/tailwind.css');
  shadow.appendChild(style);

  // Inject overlay.css into shadow root
  const overlayStyle = document.createElement('link');
  overlayStyle.rel = 'stylesheet';
  overlayStyle.href = chrome.runtime.getURL('extension/css/overlay.css');
  shadow.appendChild(overlayStyle);

  // Mount React app
  createRoot(reactRoot).render(<Overlay />);
}

document.addEventListener('DOMContentLoaded', mountOverlay); 