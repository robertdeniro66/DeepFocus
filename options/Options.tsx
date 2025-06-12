import React, { useEffect, useState } from 'react';
import i18n from '../src/i18n/en.json';

const DEFAULTS = {
  overlayOn: true,
  idleTimeout: 5,
  colorBlind: false,
};

const Options: React.FC = () => {
  const [overlayOn, setOverlayOn] = useState(DEFAULTS.overlayOn);
  const [idleTimeout, setIdleTimeout] = useState(DEFAULTS.idleTimeout);
  const [colorBlind, setColorBlind] = useState(DEFAULTS.colorBlind);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(DEFAULTS, (data) => {
      setOverlayOn(data.overlayOn);
      setIdleTimeout(data.idleTimeout);
      setColorBlind(data.colorBlind);
    });
  }, []);

  function save() {
    chrome.storage.sync.set({ overlayOn, idleTimeout, colorBlind }, () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    });
  }

  return (
    <main className="max-w-lg mx-auto mt-12 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">{i18n.options.title}</h1>
      <div className="mb-4 flex items-center justify-between">
        <label htmlFor="overlayOn" className="font-medium">{i18n.options.overlay}</label>
        <input
          id="overlayOn"
          type="checkbox"
          checked={overlayOn}
          onChange={e => setOverlayOn(e.target.checked)}
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <label htmlFor="idleTimeout" className="font-medium">{i18n.options.idleTimeout}</label>
        <input
          id="idleTimeout"
          type="number"
          min={1}
          max={10}
          value={idleTimeout}
          onChange={e => setIdleTimeout(Number(e.target.value))}
          className="w-16 border rounded px-2 py-1"
        />
      </div>
      <div className="mb-6 flex items-center justify-between">
        <label htmlFor="colorBlind" className="font-medium">{i18n.options.colorBlind}</label>
        <input
          id="colorBlind"
          type="checkbox"
          checked={colorBlind}
          onChange={e => setColorBlind(e.target.checked)}
        />
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold"
        onClick={save}
      >
        {i18n.options.save}
      </button>
      {saved && <span className="ml-4 text-green-600">{i18n.options.saved}</span>}
    </main>
  );
};

export default Options;

// Mount for Vite
import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
if (root) createRoot(root).render(<Options />); 